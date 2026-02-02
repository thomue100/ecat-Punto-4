import { test, expect } from "@playwright/test";

// Diese Zeile erzwingt den Headless-Modus für alle Tests in dieser Datei
//test.use({ headless: true });

test("HAUPTMENUEtest", async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/");
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "3", exact: true }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "HAUPTMENUE 1/7) PROGRAMMIERUNG",
  );
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "HAUPTMENUE 2/7) UHR KORRIGIEREN",
  );
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "HAUPTMENUE 3/7) SEK. KORRIGIEREN",
  );
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "HAUPTMENUE 4/7) TURMUHR KORRIG.",
  );
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "HAUPTMENUE 5/7) SOMMERZEIT",
  );
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "HAUPTMENUE 6/7) MELOD. SPEICHERN",
  );
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "HAUPTMENUE 7/7) NAME DER MELODI.",
  );
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "HAUPTMENUE 1/7) PROGRAMMIERUNG",
  );
  await page.getByRole("button", { name: "−" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "HAUPTMENUE 7/7) NAME DER MELODI.",
  );
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "HAUPTMENUE 7/7) NAME DER MELODI.",
  );
});
