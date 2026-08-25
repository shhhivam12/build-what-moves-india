import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("critical component lab has no automated accessibility violations", async ({ page }) => {
  await page.goto("/design-lab/critical-components");
  await expect(page.getByRole("heading", { level: 1, name: "Describe your grievance" })).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("Hindi state and session warning retain accessible names and structure", async ({ page }) => {
  await page.goto("/design-lab/critical-components");
  await page.getByRole("combobox", { name: "Language" }).selectOption("hi");
  await expect(page.getByRole("heading", { level: 1, name: "अपनी शिकायत बताएँ" })).toBeVisible();

  await page.getByRole("button", { name: "सत्र चेतावनी जाँचें" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
