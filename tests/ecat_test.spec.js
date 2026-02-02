import { test, expect } from "@playwright/test";

test("2/5) PERIODISCH - Komplett", async ({ page }) => {
  //test.slow(); für headless = true -Tests, damit sie nicht timeouten
  test.slow();
  await page.goto("http://localhost:5500/index.html");
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "3", exact: true }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE PROGRAMM. 2/5) PERIODISCH",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE PERIODISCH 1/4) GLOCKEN",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "3", exact: true }).click();
  await page.getByText("7 8 9 ← 4 5 6 + 1 2 3 − sec.").click();
  await page.getByRole("button", { name: "4", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P01 GLOCKEN: 1234 WAEHLE (1..4)",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "0" }).dblclick();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P01 DAUER: 00 SEK. 0 FUER ANFANG-ENDE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P01 BEGINNSTUN.:11:1100:MM-FORMAT",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P01 ENDESTUNDE:11:11 00:MM-FORMAT",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P01 BEGINNDAT.:11:11 FORMAT TT-MM",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P01 ENDEDATUM :11:11 FORMAT TT-MM",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "0" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P01 ETAGE:0 1-MON...7-SON 0-ALLE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "ESC" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE PERIODISCH 2/4) MELODIEN",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "3", exact: true }).click();
  await page.getByRole("button", { name: "4", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P02 MELODIEN: 1234 WAEHLE (1..4)",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "0" }).dblclick();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P02 DAUER: 00 SEK. 0 FUER ANFANG-ENDE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P02 BEGINNSTUN.:11:1100:MM-FORMAT",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P02 ENDESTUNDE:11:11 00:MM-FORMAT",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P02 BEGINNDAT.:11:11 FORMAT TT-MM",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P02 ENDEDATUM :11:11 FORMAT TT-MM",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "0" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P02 ETAGE:0 1-MON...7-SON 0-ALLE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "ESC" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE PERIODISCH 3/4) STUNDENSCHLAGEN",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P03 DAUER: 11 SEK. 0 FUER ANFANG-ENDE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P03 BEGINNSTUN.:11:1100:MM-FORMAT",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P03 BEGINNDAT.:11:11 FORMAT TT-MM",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P03 ENDEDATUM :11:11 FORMAT TT-MM",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "0" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P03 ETAGE:0 1-MON...7-SON 0-ALLE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "ESC" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE PERIODISCH 4/4) DIENSTE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P04 DIENSTE: 12 WAEHLE (1..2)",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "0" }).dblclick();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P04 DAUER: 00 SEK. 0 FUER ANFANG-ENDE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P04 BEGINNSTUN.:11:1100:MM-FORMAT",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P04 ENDESTUNDE:11:11 00:MM-FORMAT",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P04 BEGINNDAT.:11:11 FORMAT TT-MM",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P04 ENDEDATUM :11:11 FORMAT TT-MM",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "0" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P04 ETAGE:0 1-MON...7-SON 0-ALLE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "P05 DIENSTE:",
    "WAEHLE (1..2)",
  );
});
