import { test, expect } from "@playwright/test";

test("W_GLOCKEN_ANFANG_ENDE", async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/index.html");
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "3", exact: true }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "HAUPTMENUE 1/7) PROGRAMMIERUNG",
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
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "3", exact: true }).click();
  await page.getByRole("button", { name: "4", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W01 GLOCKEN: 1234 WAEHLE (1..4)",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "0" }).dblclick();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W01 DAUER: 00 SEK. 0 FUER ANFANG-ENDE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W01 BEGINNSTUN.:11:1100:MM-FORMAT",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W01 ENDESTUNDE:22:22 00:MM-FORMAT",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "0" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W01 ETAGE:0 1-MON...7-SON 0-ALLE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "3", exact: true }).click();
  await page.getByRole("button", { name: "4", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W02 GLOCKEN: 1234 WAEHLE (1..4)",
  );
});

test("7/7) NAME DER MELODI.", async ({ page }) => {
  await page.goto("http://127.0.0.1:5500/index.html");
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "3", exact: true }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "−" }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "1 - TIM1______ + - ESC ENTER=EDIT",
  );
  await page.getByRole("button", { name: "ESC" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "HAUPTMENUE 7/7) NAME DER MELODI.",
  );
});
