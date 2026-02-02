import { test, expect } from "@playwright/test";

test("4/7 TURMUHR KORRIG.", async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/");

  // Login: 123 + Enter
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "3", exact: true }).click();
  await page.getByRole("button", { name: "↵" }).click();

  // Navigation zum Menüpunkt (3x Plus für Turmuhr-Korrektur)
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "↵" }).click();

  // Eingabe der Zeit: 2245
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "4", exact: true }).click();
  await page.getByRole("button", { name: "5", exact: true }).click();

  // Prüfung der Anzeige vor dem Speichern
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "ZEITEINGABE VOM TURMUHR: 22:45",
  );

  // Bestätigen (Löst onComplete in flows.js aus)
  await page.getByRole("button", { name: "↵" }).click();

  // --- NEU: LocalStorage Überprüfung ---
  const storedTime = await page.evaluate(() =>
    localStorage.getItem("punto4_turmuhr_zeit"),
  );
  expect(storedTime).toBe("2245");

  // Rückkehr zum Hauptmenü prüfen
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "HAUPTMENUE 1/7) PROGRAMMIERUNG",
  );
});
