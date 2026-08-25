import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/accessibility",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium-compact",
      use: { ...devices["Desktop Chrome"], viewport: { width: 320, height: 568 } },
    },
    {
      name: "chromium-wide",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
  ],
  webServer: {
    command: "pnpm dev",
    url: "http://127.0.0.1:3000/design-lab/critical-components",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
