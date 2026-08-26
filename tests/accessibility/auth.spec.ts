import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("citizen can create a fictional account and reach the protected dashboard", async ({ page }) => {
  await page.goto("/signup");
  await page.getByRole("button", { name: "Fill fictional details" }).click();

  await expect(page.getByLabel("Full name")).toHaveValue("Meera Joshi");
  await expect(page.getByLabel("Email address")).toHaveValue(/@assured\.example$/);
  await expect(page.getByLabel(/I understand/)).toBeChecked();

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""))).toEqual([]);

  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page).toHaveURL(/\/dashboard$/, { timeout: 30_000 });
  await expect(page.getByRole("heading", { name: /Namaste, Meera/ })).toBeVisible();
});

test("one-click demo access creates or reuses the fictional citizen", async ({ page }) => {
  await page.goto("/signin");

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""))).toEqual([]);

  await page.getByRole("button", { name: /Enter as demo citizen/ }).click();
  await expect(page).toHaveURL(/\/dashboard$/, { timeout: 30_000 });
  await expect(page.getByText("raghav.demo@assured.example")).toBeVisible();
});
