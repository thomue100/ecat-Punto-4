import { test, expect } from "@playwright/test";

test("1/7) PROGRAMMIERUNG 1/3) EINGEBEN 1/5) WOECHENTLICH 1-4", async ({
  page,
}) => {
  test.slow();
  await page.locator("body").click();
  await page.goto("http://localhost:5500/");
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "3", exact: true }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "↵" }).click();
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
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W01 DAUER: 11 SEK. 0 FUER ANFANG-ENDE",
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
  await page.getByRole("button", { name: "0" }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "3", exact: true }).click();
  await page.getByRole("button", { name: "4", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W02 GLOCKEN: 1234 WAEHLE (1..4)",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "0" }).click();
  await page.getByRole("button", { name: "0" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W02 DAUER: 00 SEK. 0 FUER ANFANG-ENDE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W02 BEGINNSTUN.:11:1100:MM-FORMAT",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W02 ENDESTUNDE:22:22 00:MM-FORMAT",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W02 ETAGE:1 1-MON...7-SON 0-ALLE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "ESC" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE WOECHENTL. 2/4) MELODIEN",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "3", exact: true }).click();
  await page.getByRole("button", { name: "4", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W03 MELODIEN: 1234 WAEHLE (1..4)",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W03 DAUER: 11 SEK. 0 FUER ANFANG-ENDE",
  );
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W03 DAUER: 11 SEK. 0 FUER ANFANG-ENDE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W03 BEGINNSTUN.:11:1100:MM-FORMAT",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W03 ETAGE:1 1-MON...7-SON 0-ALLE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "ESC" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE WOECHENTL. 3/4) STUNDENSCHLAGEN",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W04 DAUER: 11 SEK. 0 FUER ANFANG-ENDE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W04 BEGINNSTUN.:11:1100:MM-FORMAT",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W04 ETAGE:1 1-MON...7-SON 0-ALLE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "ESC" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE WOECHENTL. 4/4) DIENSTE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W05 DIENSTE: 1? WAEHLE (1..2)",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W05 DAUER: 11 SEK. 0 FUER ANFANG-ENDE",
  );
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W05 DAUER: 11 SEK. 0 FUER ANFANG-ENDE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W05 BEGINNSTUN.:11:1100:MM-FORMAT",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W05 ETAGE:1 1-MON...7-SON 0-ALLE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "W06 DIENSTE: ?_ WAEHLE (1..2)",
  );
  await page.getByRole("button", { name: "ESC" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE WOECHENTL. 4/4) DIENSTE",
  );
  await page.getByRole("button", { name: "ESC" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE PROGRAMM. 1/5) WOECHENTLICH",
  );
  await page.getByRole("button", { name: "ESC" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "MENUE PROGRAMMIERUNG 1/3) EINGEBEN",
  );
  await page.getByRole("button", { name: "ESC" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "HAUPTMENUE 1/7) PROGRAMMIERUNG",
  );
});

test("1/7) PROGRAMMIERUNG 1/3) EINGEBEN 2/5) PERIODISCH 1-4", async ({
  page,
}) => {
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

test("1/7) PROGRAMMIERUNG 1/3) EINGEBEN 3/5) BESONDERE 1-4", async ({
  page,
}) => {
  test.slow();
  await page.goto("http://localhost:5500/");
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "3", exact: true }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE PROGRAMM. 3/5) BESONDERE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE BESONDERE 1/4) GLOCKEN",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "3", exact: true }).click();
  await page.getByRole("button", { name: "4", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "B01 GLOCKEN: 1234 WAEHLE (1..4)",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "B01 DAUER: 11 SEK. 0 FUER ANFANG-ENDE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "B01 BEGINNSTUN.:11:1100:MM-FORMAT",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "B01 BDATUM:11:11:11 FORMAT TT-MM-JJ",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "ESC" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE BESONDERE 2/4) MELODIEN",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "3", exact: true }).click();
  await page.getByRole("button", { name: "4", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "B02 MELODIEN: 1234 WAEHLE (1..4)",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "B02 DAUER: 11 SEK. 0 FUER ANFANG-ENDE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "B02 BEGINNSTUN.:11:1100:MM-FORMAT",
  );
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "B02 BEGINNSTUN.:11:1100:MM-FORMAT",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "B02 BDATUM:11:11:11 FORMAT TT-MM-JJ",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "ESC" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "B03 DAUER: 11 SEK. 0 FUER ANFANG-ENDE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "B03 BEGINNSTUN.:11:1100:MM-FORMAT",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "B03 BDATUM:11:11:11 FORMAT TT-MM-JJ",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "ESC" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE BESONDERE 3/4) STUNDENSCHLAGEN",
  );
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE BESONDERE 4/4) DIENSTE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "B04 DIENSTE: 1? WAEHLE (1..2)",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "B04 DAUER: 11 SEK. 0 FUER ANFANG-ENDE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "B04 BEGINNSTUN.:11:1100:MM-FORMAT",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "B04 BDATUM:11:11:11 FORMAT TT-MM-JJ",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "ESC" }).click();
  await page.getByRole("button", { name: "ESC" }).click();
  await page.getByRole("button", { name: "ESC" }).click();
  await page.getByRole("button", { name: "ESC" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "HAUPTMENUE 1/7) PROGRAMMIERUNG",
  );
});

test("1/7) PROGRAMMIERUNG 1/3) EINGEBEN 4/5) ZYKLISCH 1-4", async ({
  page,
}) => {
  test.slow();
  await page.goto("http://localhost:5500/");
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "3", exact: true }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "4", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE PROGRAMM. 4/5) ZYKLISCH",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "3", exact: true }).click();
  await page.getByRole("button", { name: "4", exact: true }).click();
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "Z01 DAUER: 11 SEK. 0 FUER ANFANG-ENDE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "Z01 BEGINNSTUN.:11:1100:MM-FORMAT",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "6" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "Z01 BEG.DAT.:11:11:26FORMAT TT-MM-JJ",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "Z01 BEZEICHENABST.:12IN TAGEN [2..99]",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "ESC" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE ZYKLISCH 2/4) MELODIEN",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "3", exact: true }).click();
  await page.getByRole("button", { name: "4", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "Z02 MELODIEN: 1234 WAEHLE (1..4)",
  );
  await page.getByRole("list", { name: "Menüeinträge" }).click();
  await page.getByRole("list", { name: "Menüeinträge" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "Z02 MELODIEN: 1234 WAEHLE (1..4)",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "Z02 DAUER: 12 SEK. 0 FUER ANFANG-ENDE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "Z02 BEGINNSTUN.:11:1100:MM-FORMAT",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "6" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "Z02 BEG.DAT.:11:11:26FORMAT TT-MM-JJ",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "Z02 BEZEICHENABST.:22IN TAGEN [2..99]",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "ESC" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE ZYKLISCH 3/4) STUNDENSCHLAGEN",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).dblclick();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "Z03 DAUER: 11 SEK. 0 FUER ANFANG-ENDE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "Z03 BEGINNSTUN.:11:1100:MM-FORMAT",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "6", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "Z03 BEG.DAT.:11:11:26FORMAT TT-MM-JJ",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "Z03 BEZEICHENABST.:11IN TAGEN [2..99]",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "Z04 DAUER: ?_ SEK. 0 FUER ANFANG-ENDE",
  );
  await page.getByRole("button", { name: "ESC" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE ZYKLISCH 3/4) STUNDENSCHLAGEN",
  );
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "EINGABE ZYKLISCH 4/4) DIENSTE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "Z04 DIENSTE: 1? WAEHLE (1..2)",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "Z04 DAUER: 11 SEK. 0 FUER ANFANG-ENDE",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "Z04 BEGINNSTUN.:11:1100:MM-FORMAT",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "6" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "Z04 BEG.DAT.:11:11:26FORMAT TT-MM-JJ",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await page.getByRole("button", { name: "1", exact: true }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "Z04 BEZEICHENABST.:11IN TAGEN [2..99]",
  );
  await page.getByRole("button", { name: "↵" }).click();
  await expect(page.getByLabel("Menüeinträge")).toContainText(
    "Z05 DIENSTE: ?_ WAEHLE (1..2)",
  );
});
