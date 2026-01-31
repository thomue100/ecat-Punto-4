import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/");
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "3", exact: true }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "HAUPTMENU 1/7) PROGRAMMIERUNG",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "MENUE PROGRAMMIERUNG 1/3) EINGEBEN",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE PROGRAMM. 1/5) WOECHENTLICH",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE WOECHENTL. 1/4) GLOCKEN",
  );
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE WOECHENTL. 2/4) MELODIEN",
  );
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE WOECHENTL. 3/4) STUNDENSCHLAGEN",
  );
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE WOECHENTL. 4/4) DIENSTE",
  );
  await page.getByRole("button", { name: "ESC" }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "ESC" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "↵" }).click();
});
