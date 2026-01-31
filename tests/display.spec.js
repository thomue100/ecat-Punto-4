import { test, expect } from "@playwright/test";

test.describe("Ecat Punto 4 Trainer - Display Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Pfad zu deiner index.html (oder zum lokalen Server)
    // await page.goto('http://localhost:5500');
    await page.goto("http://127.0.0.1:5500/index.html");
  });

  test("Menüpunkt W_GLOCKEN", async ({ page }) => {
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="2"]').click();
    await page.locator('button[data-key="3"]').click();
    await page.locator('button[data-key="Enter"]').click();

    let lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "HAUPTMENU            ",
      "1/7) PROGRAMMIERUNG  ",
    ]);

    await page.locator('button[data-key="Enter"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "MENUE PROGRAMMIERUNG ",
      "1/3) EINGEBEN        ",
    ]);

    await page.locator('button[data-key="Enter"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "EINGABE PROGRAMM.    ",
      "1/5) WOECHENTLICH    ",
    ]);

    await page.locator('button[data-key="Enter"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "EINGABE WOECHENTL.   ",
      "1/4) GLOCKEN         ",
    ]);

    await page.locator('button[data-key="Enter"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="2"]').click();
    await page.locator('button[data-key="3"]').click();
    await page.locator('button[data-key="4"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "W01 GLOCKEN: 1234    ",
      "WAEHLE (1..4)        ",
    ]);

    await page.locator('button[data-key="Enter"]').click();
    await page.locator('button[data-key="0"]').click();
    await page.locator('button[data-key="0"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "W01 DAUER: 00 SEK.   ",
      "0 FUER ANFANG-ENDE   ",
    ]);

    await page.locator('button[data-key="Enter"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="1"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "W01 BEGINNSTUN.:11:11",
      "00:MM-FORMAT         ",
    ]);

    await page.locator('button[data-key="Enter"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="1"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "W01 ENDESTUNDE:11:11 ",
      "00:MM-FORMAT         ",
    ]);

    await page.locator('button[data-key="Enter"]').click();
    await page.locator('button[data-key="1"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "W01 ETAGE:1          ",
      "1-MON...7-SON 0-ALLE ",
    ]);

    await page.locator('button[data-key="Enter"]').click();
    // Wenn der blinkende Cursor Probleme macht, könnte man auch
    // 1,2,3,4 eingeben und auf "W02 GLOCKEN: 1234    " prüfen.
    //await page.locator('button[data-key="1"]').click();
    //await page.locator('button[data-key="2"]').click();
    //await page.locator('button[data-key="3"]').click();
    //await page.locator('button[data-key="4"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "W02 GLOCKEN: ?___    ",
      "WAEHLE (1..4)        ",
    ]);
  });

  test("Menüpunkt W_MELODIEN", async ({ page }) => {
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="2"]').click();
    await page.locator('button[data-key="3"]').click();
    await page.locator('button[data-key="Enter"]').click();

    let lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "HAUPTMENU            ",
      "1/7) PROGRAMMIERUNG  ",
    ]);

    await page.locator('button[data-key="Enter"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "MENUE PROGRAMMIERUNG ",
      "1/3) EINGEBEN        ",
    ]);

    await page.locator('button[data-key="Enter"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "EINGABE PROGRAMM.    ",
      "1/5) WOECHENTLICH    ",
    ]);

    await page.locator('button[data-key="Enter"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "EINGABE WOECHENTL.   ",
      "1/4) GLOCKEN         ",
    ]);

    await page.locator('button[data-key="Plus"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "EINGABE WOECHENTL.   ",
      "2/4) MELODIEN        ",
    ]);

    await page.locator('button[data-key="Enter"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="2"]').click();
    await page.locator('button[data-key="3"]').click();
    await page.locator('button[data-key="4"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "W01 MELODIEN: 1234   ",
      "WAEHLE (1..4)        ",
    ]);

    await page.locator('button[data-key="Enter"]').click();
    await page.locator('button[data-key="0"]').click();
    await page.locator('button[data-key="0"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "W01 DAUER: 00 SEK.   ",
      "0 FUER ANFANG-ENDE   ",
    ]);

    await page.locator('button[data-key="Enter"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="1"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "W01 BEGINNSTUN.:11:11",
      "00:MM-FORMAT         ",
    ]);

    await page.locator('button[data-key="Enter"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="1"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "W01 ENDESTUNDE:11:11 ",
      "00:MM-FORMAT         ",
    ]);

    await page.locator('button[data-key="Enter"]').click();
    await page.locator('button[data-key="1"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "W01 ETAGE:1          ",
      "1-MON...7-SON 0-ALLE ",
    ]);

    await page.locator('button[data-key="Enter"]').click();
    // Wenn der blinkende Cursor Probleme macht, könnte man auch
    // 1,2,3,4 eingeben und auf "W02 GLOCKEN: 1234    " prüfen.
    //await page.locator('button[data-key="1"]').click();
    //await page.locator('button[data-key="2"]').click();
    //await page.locator('button[data-key="3"]').click();
    //await page.locator('button[data-key="4"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "W02 MELODIEN: ?___   ",
      "WAEHLE (1..4)        ",
    ]);
  });

  test("Menüpunkt W_STUNDENSCHLAGEN", async ({ page }) => {
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="2"]').click();
    await page.locator('button[data-key="3"]').click();
    await page.locator('button[data-key="Enter"]').click();

    let lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "HAUPTMENU            ",
      "1/7) PROGRAMMIERUNG  ",
    ]);

    await page.locator('button[data-key="Enter"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "MENUE PROGRAMMIERUNG ",
      "1/3) EINGEBEN        ",
    ]);

    await page.locator('button[data-key="Enter"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "EINGABE PROGRAMM.    ",
      "1/5) WOECHENTLICH    ",
    ]);

    await page.locator('button[data-key="Enter"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "EINGABE WOECHENTL.   ",
      "1/4) GLOCKEN         ",
    ]);

    await page.locator('button[data-key="Plus"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "EINGABE WOECHENTL.   ",
      "2/4) MELODIEN        ",
    ]);

    await page.locator('button[data-key="Plus"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "EINGABE WOECHENTL.   ",
      "3/4) STUNDENSCHLAGEN ",
    ]);

    await page.locator('button[data-key="Enter"]').click();
    await page.locator('button[data-key="0"]').click();
    await page.locator('button[data-key="0"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "W01 DAUER: 00 SEK.   ",
      "0 FUER ANFANG-ENDE   ",
    ]);

    await page.locator('button[data-key="Enter"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="1"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "W01 BEGINNSTUN.:11:11",
      "00:MM-FORMAT         ",
    ]);

    await page.locator('button[data-key="Enter"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="1"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "W01 ENDESTUNDE:11:11 ",
      "00:MM-FORMAT         ",
    ]);

    await page.locator('button[data-key="Enter"]').click();
    await page.locator('button[data-key="1"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "W01 ETAGE:1          ",
      "1-MON...7-SON 0-ALLE ",
    ]);

    await page.locator('button[data-key="Enter"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "W02 DAUER: ?_ SEK.   ",
      "0 FUER ANFANG-ENDE   ",
    ]);
  });

  test("Menüpunkt W_DIENSTE", async ({ page }) => {
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="2"]').click();
    await page.locator('button[data-key="3"]').click();
    await page.locator('button[data-key="Enter"]').click();

    let lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "HAUPTMENU            ",
      "1/7) PROGRAMMIERUNG  ",
    ]);

    await page.locator('button[data-key="Enter"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "MENUE PROGRAMMIERUNG ",
      "1/3) EINGEBEN        ",
    ]);

    await page.locator('button[data-key="Enter"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "EINGABE PROGRAMM.    ",
      "1/5) WOECHENTLICH    ",
    ]);

    await page.locator('button[data-key="Enter"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "EINGABE WOECHENTL.   ",
      "1/4) GLOCKEN         ",
    ]);

    await page.locator('button[data-key="Minus"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "EINGABE WOECHENTL.   ",
      "4/4) DIENSTE         ",
    ]);

    await page.locator('button[data-key="Enter"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="2"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "W01 DIENSTE: 12      ",
      "WAEHLE (1..2)        ",
    ]);

    await page.locator('button[data-key="Enter"]').click();
    await page.locator('button[data-key="0"]').click();
    await page.locator('button[data-key="0"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "W01 DAUER: 00 SEK.   ",
      "0 FUER ANFANG-ENDE   ",
    ]);

    await page.locator('button[data-key="Enter"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="1"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "W01 BEGINNSTUN.:11:11",
      "00:MM-FORMAT         ",
    ]);

    await page.locator('button[data-key="Enter"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="1"]').click();
    await page.locator('button[data-key="1"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "W01 ENDESTUNDE:11:11 ",
      "00:MM-FORMAT         ",
    ]);

    await page.locator('button[data-key="Enter"]').click();
    await page.locator('button[data-key="1"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "W01 ETAGE:1          ",
      "1-MON...7-SON 0-ALLE ",
    ]);

    await page.locator('button[data-key="Enter"]').click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "W02 DIENSTE: ?_      ",
      "WAEHLE (1..2)        ",
    ]);
  });

  test("Menüpunt 2/5) PERIODISCH - alles", async ({ page }) => {
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
    await page.getByRole("button", { name: "4", exact: true }).click();

    let lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P01 GLOCKEN: 1234    ",
      "WAEHLE (1..4)        ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "0" }).dblclick();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P01 DAUER: 00 SEK.   ",
      "0 FUER ANFANG-ENDE   ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P01 BEGINNSTUN.:11:11",
      "00:MM-FORMAT         ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P01 ENDESTUNDE:11:11 ",
      "00:MM-FORMAT         ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P01 BEGINNDAT.:11:11 ",
      "FORMAT TT-MM         ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P01 ENDEDATUM :11:11 ",
      "FORMAT TT-MM         ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "0" }).click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P01 ETAGE:0          ",
      "1-MON...7-SON 0-ALLE ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "ESC" }).click();
    await page.getByRole("button", { name: "+" }).click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "EINGABE PERIODISCH   ",
      "2/4) MELODIEN        ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "1", exact: true }).click();
    await page.getByRole("button", { name: "2", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "4", exact: true }).click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P02 MELODIEN: 1234   ",
      "WAEHLE (1..4)        ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "0" }).dblclick();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P02 DAUER: 00 SEK.   ",
      "0 FUER ANFANG-ENDE   ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P02 BEGINNSTUN.:11:11",
      "00:MM-FORMAT         ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P02 ENDESTUNDE:11:11 ",
      "00:MM-FORMAT         ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P02 BEGINNDAT.:11:11 ",
      "FORMAT TT-MM         ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P02 ENDEDATUM :11:11 ",
      "FORMAT TT-MM         ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "0" }).click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P02 ETAGE:0          ",
      "1-MON...7-SON 0-ALLE ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "ESC" }).click();
    await page.getByRole("button", { name: "+" }).click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "EINGABE PERIODISCH   ",
      "3/4) STUNDENSCHLAGEN ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P03 DAUER: 11 SEK.   ",
      "0 FUER ANFANG-ENDE   ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();
    await page.getByRole("button", { name: "1", exact: true }).click();
    await page.getByRole("button", { name: "1", exact: true }).click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P03 BEGINNSTUN.:11:11",
      "00:MM-FORMAT         ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();
    await page.getByRole("button", { name: "1", exact: true }).click();
    await page.getByRole("button", { name: "1", exact: true }).click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P03 BEGINNDAT.:11:11 ",
      "FORMAT TT-MM         ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P03 ENDEDATUM :11:11 ",
      "FORMAT TT-MM         ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "0" }).click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P03 ETAGE:0          ",
      "1-MON...7-SON 0-ALLE ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "ESC" }).click();
    await page.getByRole("button", { name: "+" }).click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "EINGABE PERIODISCH   ",
      "4/4) DIENSTE         ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "1", exact: true }).click();
    await page.getByRole("button", { name: "2", exact: true }).click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P04 DIENSTE: 12      ",
      "WAEHLE (1..2)        ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "0" }).dblclick();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P04 DAUER: 00 SEK.   ",
      "0 FUER ANFANG-ENDE   ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P04 BEGINNSTUN.:11:11",
      "00:MM-FORMAT         ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P04 ENDESTUNDE:11:11 ",
      "00:MM-FORMAT         ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P04 BEGINNDAT.:11:11 ",
      "FORMAT TT-MM         ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();
    await page.getByRole("button", { name: "1", exact: true }).click();
    await page.getByRole("button", { name: "1", exact: true }).click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P04 ENDEDATUM :11:11 ",
      "FORMAT TT-MM         ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "0" }).click();

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P04 ETAGE:0          ",
      "1-MON...7-SON 0-ALLE ",
    ]);

    await page.getByRole("button", { name: "↵" }).click();
    await expect(page.getByLabel("Menüeinträge")).toContainText(
      "P05 DIENSTE: ?_ WAEHLE (1..2)",
    );

    lines = page.locator("#menuList .lcd-line");
    await expect(lines).toHaveText([
      "P05 DIENSTE: __      ",
      "WAEHLE (1..2)        ",
    ]);
  });

  test("4/7 Turmuhr korrigieren", async ({ page }) => {
    await page.goto("http://localhost:5500/index.html");
    await page.getByRole("button", { name: "1", exact: true }).click();
    await page.getByRole("button", { name: "2", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("button", { name: "+" }).click();
    await expect(page.getByLabel("Menüeinträge")).toContainText(
      "HAUPTMENU 4/7) TURMUHR KORRIG.",
    );
    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "1", exact: true }).click();
    await page.getByRole("button", { name: "4", exact: true }).click();
    await page.getByRole("button", { name: "1", exact: true }).click();
    await page.getByRole("button", { name: "2", exact: true }).click();
    await expect(page.getByLabel("Menüeinträge")).toContainText(
      "TURMUHR: 14:12",
    );
    await page.getByRole("button", { name: "↵" }).click();
    await expect(page.getByLabel("Menüeinträge")).toContainText(
      "HAUPTMENU 1/7) PROGRAMMIERUNG",
    );
  });

  test("Menüpunkt B_GLOCKEN", async ({ page }) => {
    await page.goto("http://localhost:5500/index.html");
    await page.getByRole("button", { name: "1", exact: true }).click();
    await page.getByRole("button", { name: "2", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "1", exact: true }).click();
    await page.getByRole("button", { name: "2", exact: true }).click();
    await page.getByRole("button", { name: "3", exact: true }).click();
    await page.getByRole("button", { name: "4", exact: true }).click();
    await expect(page.getByLabel("Menüeinträge")).toContainText(
      "B01 GLOCKEN: 1234 WAEHLE (1..4)",
    );
    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "0" }).click();
    await page.getByRole("button", { name: "0" }).click();
    await expect(page.getByLabel("Menüeinträge")).toContainText(
      "B01 DAUER: 00 SEK. 0 FUER ANFANG-ENDE",
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
    await page.getByRole("button", { name: "1", exact: true }).dblclick();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();
    await expect(page.getByLabel("Menüeinträge")).toContainText(
      "B01 ENDESTUNDE:11:11 00:MM-FORMAT",
    );
    await page.getByRole("button", { name: "↵" }).click();
    await page.getByRole("button", { name: "1", exact: true }).click();
    await page.getByRole("button", { name: "1", exact: true }).click();
    await page.getByRole("button", { name: "1", exact: true }).dblclick();
    await page.getByRole("button", { name: "2", exact: true }).click();
    await page.getByRole("button", { name: "6" }).click();
    await expect(page.getByLabel("Menüeinträge")).toContainText(
      "B01 BDATUM:11:11:26 FORMAT TT-MM-JJ",
    );
    await page.getByRole("button", { name: "↵" }).click();
    await expect(page.getByLabel("Menüeinträge")).toContainText(
      "B02 GLOCKEN: ?__ WAEHLE (1..4)",
    );
  });

  /*
   test('sollte das Hilfe-Overlay öffnen, wenn HELP geklickt wird', async ({ page }) => {
     await page.locator('button[data-key="Help"]').click();
     
     const overlay = page.locator('#helpOverlay');
     await expect(overlay).not.toHaveClass(/hidden/);
     await expect(page.locator('#helpTitle')).toHaveText('HANDBUCH / HILFE');
   });

   test('Funktionstasten-LED sollte bei Klick aktiv werden', async ({ page }) => {
     const f1Button = page.locator('button[data-key="F1"]');
     await f1Button.click();
     
     // Prüfe, ob die LED im Button nun eine aktive Klasse hat (falls dein JS das steuert)
     const led = f1Button.locator('.led');
     await expect(led).toHaveClass(/active/); // Beispielklasse
   });
   */
});
