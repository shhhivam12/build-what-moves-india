import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("judge can complete the focused appeal journey without serious accessibility violations", async ({ page }) => {
  await page.goto("/demo");
  await expect(page.getByRole("heading", { name: /Know what happened/ })).toBeVisible();

  await page.getByRole("button", { name: "Try as Asha Verma" }).click();
  await page.getByRole("button", { name: /BWMI-TEL-2026-00499/ }).click();
  await page.getByRole("button", { name: /Start focused appeal/ }).click();

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((violation) => ["critical", "serious"].includes(violation.impact ?? ""))).toEqual([]);

  await page.getByRole("button", { name: /Submit demonstration appeal/ }).click();
  await expect(page.getByRole("heading", { name: "You did not have to start again" })).toBeVisible();
});

test("judge can submit the describe-first grievance journey", async ({ page }) => {
  await page.goto("/demo");
  await page.getByRole("button", { name: "Try as Asha Verma" }).click();
  await page.getByRole("button", { name: "Lodge a grievance" }).first().click();
  await page.getByRole("button", { name: /Find the right route/ }).click();
  await page.getByRole("button", { name: "Use this route" }).click();
  await page.getByRole("button", { name: /Review grievance/ }).click();
  await page.getByRole("button", { name: /Submit demonstration grievance/ }).click();

  await expect(page.getByRole("heading", { name: "Your grievance has been received" })).toBeVisible();
  await expect(page.getByText("BWMI-TEL-2026-00499", { exact: true })).toBeVisible();
});

test("manual routing works when assistance is unavailable", async ({ page }) => {
  await page.goto("/demo");
  await page.getByRole("button", { name: "Try as Asha Verma" }).click();
  await page.getByRole("button", { name: "Lodge a grievance" }).first().click();
  await page.getByRole("button", { name: /Find the right route/ }).click();
  await page.getByRole("checkbox", { name: "Assistance available" }).uncheck();
  await page.getByText("Financial services", { exact: true }).click();
  await page.getByRole("button", { name: "Confirm selected route" }).click();
  await page.getByRole("button", { name: /Review grievance/ }).click();

  await expect(page.getByText("Financial services", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Change route" }).click();
  await expect(page.getByRole("heading", { name: "Confirm where this should go" })).toBeVisible();
});

test("the primary journey remains usable in Hindi", async ({ page }) => {
  await page.goto("/demo");
  await page.getByRole("combobox", { name: "Language" }).selectOption("hi");
  await expect(page.getByRole("heading", { name: /जानें क्या हुआ/ })).toBeVisible();
  await page.getByRole("button", { name: "आशा वर्मा के रूप में देखें" }).click();
  await page.getByRole("button", { name: "शिकायत दर्ज करें" }).first().click();
  await expect(page.getByRole("heading", { name: "बताएँ क्या हुआ" })).toBeVisible();
  await page.getByRole("button", { name: /सही मार्ग खोजें/ }).click();
  await page.getByRole("button", { name: "यह मार्ग चुनें" }).click();
  await page.getByRole("button", { name: /शिकायत की समीक्षा करें/ }).click();
  await page.getByRole("button", { name: /प्रदर्शन शिकायत जमा करें/ }).click();
  await expect(page.getByRole("heading", { name: "आपकी शिकायत प्राप्त हो गई है" })).toBeVisible();
});
