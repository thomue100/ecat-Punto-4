import { test, expect } from "@playwright/test";

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
