import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

async function createCitizen(page: Page, leaveGuideOpen = false) {
  const response = await page.request.post("/api/demo-access");
  expect(response.ok()).toBe(true);
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/dashboard$/, { timeout: 30_000 });
  if (!leaveGuideOpen) {
    const closeGuide = page.getByRole("button", { name: "Close interactive guide" });
    await expect(closeGuide).toBeVisible({ timeout: 5_000 });
    await closeGuide.click();
  }
}

test("public homepage uses official identity and contains no hard-coded persona", async ({ page }) => {
  await page.goto("/");
  const skip = page.getByRole("button", { name: "Close", exact: true });
  if (await skip.isVisible()) await skip.click();
  await expect(page.getByAltText("Department of Administrative Reforms and Public Grievances")).toBeVisible();
  await expect(page.getByRole("heading", { name: /Public Grievance Redressal Portal/ })).toBeVisible();
  await expect(page).toHaveTitle("CPGRAMS — Public Grievance Portal");
  await expect(page.getByRole("heading", { name: "Mahatma Gandhi" })).toBeVisible();
  await expect(page.getByAltText("Shri Narendra Modi, Prime Minister of India")).toBeVisible();
  await expect(page.getByText(/fictional citizen account/i)).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations.filter((violation) => ["critical", "serious"].includes(violation.impact ?? ""))).toEqual([]);
});

test("English and Hindi switch updates the core citizen landing experience", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Public Grievance Redressal Portal" })).toBeVisible();
  const menu = page.getByRole("button", { name: "Toggle navigation" });
  if (await menu.isVisible()) {
    await expect(async () => {
      if ((await menu.getAttribute("aria-expanded")) !== "true") await menu.click();
      await expect(menu).toHaveAttribute("aria-expanded", "true");
    }).toPass();
  }
  const languageOptions = page.getByLabel("Choose language").locator("option");
  await expect(languageOptions.nth(0)).toHaveText("English");
  await expect(languageOptions.nth(1)).toHaveText("हिन्दी");
  await expect(languageOptions.nth(2)).toHaveAttribute("disabled", "");
  await page.getByLabel("Choose language").selectOption("hi");
  await expect(page.getByRole("heading", { name: "लोक शिकायत निवारण पोर्टल" })).toBeVisible();
  await expect(page.getByRole("link", { name: "शिकायत दर्ज करें", exact: true })).toBeVisible();
  await page.getByLabel("भाषा चुनें").selectOption("en");
  await expect(page.getByRole("heading", { name: "Public Grievance Redressal Portal" })).toBeVisible();
});

test("signed-in citizens are kept in the account experience", async ({ page }) => {
  await createCitizen(page);
  await expect(page).toHaveTitle("CPGRAMS — Dashboard");
  await page.goto("/");
  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole("link", { name: "Home", exact: true })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "CPGRAMS home" })).toHaveAttribute("href", "/dashboard");
});

test("multilingual assistant carries a grievance draft into the citizen workflow", async ({ page }) => {
  await createCitizen(page);
  await page.getByRole("button", { name: "Open Samadhan Sahayak" }).click();
  await page.getByRole("button", { name: "Lodge grievance", exact: true }).click();
  const draft = "My mobile service was not activated after payment and I need the charge reversed.";
  await page.getByRole("textbox", { name: "Type in English or Hindi…" }).fill(draft);
  await page.getByRole("button", { name: "Send", exact: true }).click();
  await page.getByRole("button", { name: "Continue grievance" }).click();
  await expect(page).toHaveURL(/\/grievances\/new\?assistant=1$/);
  await expect(page.getByRole("textbox", { name: /What happened/ })).toHaveValue(draft);
});

test("signed-in dashboard presents the interactive visual citizen guide", async ({ page }) => {
  await createCitizen(page, true);
  const guide = page.getByRole("dialog", { name: "Your citizen workspace" });
  await expect(guide).toBeVisible();
  await expect(page.locator("[data-tour='welcome']")).toBeVisible();
  await expect(page.locator("[class*='spotlight']")).toBeVisible();
  await guide.getByRole("button", { name: /Next/ }).click();
  await expect(page.getByRole("heading", { name: "Understand every case instantly" })).toBeVisible();
  await expect(page.locator("[data-tour='summary']")).toBeVisible();
});

test("citizen can submit a persistent describe-first grievance", async ({ page }) => {
  await createCitizen(page);
  await page.goto("/grievances/new");
  await page.getByRole("button", { name: "Use realistic sample" }).click();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: /Understand and suggest route/ }).click();
  await expect(page.getByRole("heading", { name: "Select concerned organisation" })).toBeVisible({ timeout: 15_000 });
  await page.getByRole("button", { name: /Review grievance/ }).click();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Submit grievance" }).click();
  await expect(page).toHaveURL(/\/grievances\/CPG-/, { timeout: 30_000 });
  await expect(page.getByText("Grievance registered successfully")).toBeVisible();
});

test("signed-in citizen can inspect an Action Taken Report and submit an appeal", async ({ page }) => {
  await createCitizen(page);
  await page.getByRole("link", { name: /Open grievance record/ }).click();
  await expect(page).toHaveURL(/\/grievances\/CPG-DEMO-2026-001$/);
  await expect(page.getByRole("heading", { name: /Relief requested and action taken/ })).toBeVisible();
  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations.filter((violation) => ["critical", "serious"].includes(violation.impact ?? ""))).toEqual([]);
  await page.getByRole("button", { name: /File appeal/ }).click();
  await page.getByRole("button", { name: "Submit appeal" }).click();
  await expect(page.getByText(/Appeal .* is under consideration/)).toBeVisible({ timeout: 30_000 });
});

test("routing assistance hands RTI matters to the correct official channel", async ({ page }) => {
  await createCitizen(page);
  await page.goto("/grievances/new");
  await page.getByLabel("What happened?").fill("I need records under the Right to Information Act about this public service decision.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: /Understand and suggest route/ }).click();
  await expect(page.getByRole("heading", { name: "Use the designated service" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Open RTI Online/ })).toHaveAttribute("href", "https://rtionline.gov.in/");
});

test("tracking uses the signed-in account instead of asking for contact details again", async ({ page }) => {
  await createCitizen(page);
  await page.goto("/track");
  await page.getByRole("button", { name: "Use sample registration number" }).click();
  await page.getByRole("button", { name: /View status/ }).click();
  await expect(page.getByText("Registration found")).toBeVisible();
  await expect(page.getByRole("link", { name: /Open grievance record/ })).toBeVisible();
});

test("service directory keeps official-equivalent information concise and navigable", async ({ page }) => {
  test.slow();
  await page.goto("/services");
  await expect(page.getByRole("heading", { name: "Services, process and official contacts" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Open official pension service/ }).first()).toHaveAttribute("href", "https://pgportal.gov.in/Pension/");
  await expect(page.getByRole("heading", { name: "Official nodal officer directories" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Frequently asked questions" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Find a page" })).toBeVisible();
  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations.filter((violation) => ["critical", "serious"].includes(violation.impact ?? ""))).toEqual([]);
});

test("citizen dashboard supports record search and decision filtering", async ({ page }) => {
  await createCitizen(page);
  const search = page.getByPlaceholder("Reference, subject or organisation");
  await search.fill("no such case");
  await expect(page.getByText("No matching grievances")).toBeVisible();
  await search.fill("");
  await page.getByRole("button", { name: "Decisions", exact: true }).click();
  await expect(page.getByRole("link", { name: "CPG-DEMO-2026-001" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Appeals and further review" })).toBeVisible();
});
