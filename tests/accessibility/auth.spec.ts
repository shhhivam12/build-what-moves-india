import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("citizen registration form supports fictional account details", async ({ page }) => {
  await page.goto("/signup");
  await page.getByRole("button", { name: "Fill fictional details" }).click();

  await expect(page.getByLabel("Full name")).toHaveValue("Meera Joshi");
  await expect(page.getByLabel("Email address")).toHaveValue(/@assured\.example$/);
  await expect(page.getByLabel(/I understand/)).toBeChecked();

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""))).toEqual([]);

  await expect(page.getByRole("button", { name: "Create account" })).toBeEnabled();
});

test("one-click demo access creates or reuses the fictional citizen", async ({ page }) => {
  await page.goto("/signin");

  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""))).toEqual([]);

  await page.getByRole("button", { name: /Continue with sample account/ }).click();
  await expect(page).toHaveURL(/\/dashboard$/, { timeout: 30_000 });
  await expect(page.getByText("raghav.demo@assured.example")).toBeVisible();
});

test("database-independent sample session reaches the complete citizen dashboard", async ({ page }) => {
  const response = await page.request.post("/api/demo-access");
  expect(response.ok()).toBe(true);
  await page.goto("/dashboard");
  await expect(page.getByRole("heading", { name: /Namaste, Raghav/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Mobile service activation and ₹499 charge/ })).toBeVisible();
});
