import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

async function createCitizen(page: Page) {
  await page.goto("/signin");
  await page.getByRole("button", { name: /Continue with sample account/ }).click();
  await expect(page).toHaveURL(/\/dashboard$/, { timeout: 30_000 });
}

test("public homepage uses official identity and contains no hard-coded persona", async ({ page }) => {
  await page.goto("/");
  const skip = page.getByRole("button", { name: "Close", exact: true });
  if (await skip.isVisible()) await skip.click();
  await expect(page.getByAltText("Department of Administrative Reforms and Public Grievances")).toBeVisible();
  await expect(page.getByRole("heading", { name: /Public Grievance Redressal Portal/ })).toBeVisible();
  await expect(page.getByText(/fictional citizen account/i)).toHaveCount(0);
  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations.filter((violation) => ["critical", "serious"].includes(violation.impact ?? ""))).toEqual([]);
});

test("citizen can submit a persistent describe-first grievance", async ({ page }) => {
  await createCitizen(page);
  await page.goto("/grievances/new");
  await page.getByRole("button", { name: "Use realistic sample" }).click();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: /Understand and suggest route/ }).click();
  await expect(page.getByRole("heading", { name: "Select concerned organisation" })).toBeVisible();
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
