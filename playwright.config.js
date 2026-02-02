// @ts-check
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  reporter: "html",

  use: {
    headless: false, // 🔴 erzwingt Headless global
    trace: "on-first-retry", // optional, aber sinnvoll

    launchOptions: {
      slowMo: 300, // 300ms nach jeder Aktion
    },
  },

  projects: [
    {
      name: "chromium",
      use: devices["Desktop Chrome"],
    },
    {
      name: "firefox",
      use: devices["Desktop Firefox"],
    },
    {
      name: "webkit",
      use: devices["Desktop Safari"],
    },
  ],
});
