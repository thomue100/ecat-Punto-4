// renderer.js
import { HelpHandler } from "./handlers/helpHandler.js";

const $helpOverlay = document.getElementById("helpOverlay");
const $helpList = document.getElementById("helpList");
const $list = document.getElementById("menuList");
const LCD_WIDTH = 21;

/** Mapping für die Cursor-Positionen im 10-stelligen Datums-String: DD-MM-YY HH:MM */
const DateTimeCursorMap = [0, 1, 3, 4, 6, 7, 9, 10, 12, 13];

export const Renderer = {
  // --- BASIS-METHODEN ---

  prepareLine: (text = "", cursorIdx = -1, useBlockCursor = false) => {
    let plainText = text
      .replace(/<[^>]*>/g, "") // HTML-Tags entfernen
      .padEnd(LCD_WIDTH, " ")
      .substring(0, LCD_WIDTH);

    if (cursorIdx < 0 || cursorIdx >= LCD_WIDTH) {
      return plainText || " ";
    }

    if (useBlockCursor) {
      const char = plainText[cursorIdx];
      const displayChar = char === " " ? "&nbsp;" : char;
      return (
        plainText.substring(0, cursorIdx) +
        `<span class="cursor-block">${displayChar}</span>` +
        plainText.substring(cursorIdx + 1)
      );
    } else {
      return (
        plainText.substring(0, cursorIdx) +
        `<span class="cursor-question">?</span>` +
        plainText.substring(cursorIdx + 1)
      );
    }
  },

  draw: (l1, l2, c1 = -1, c2 = -1, useBlock = false) => {
    let lines = $list.querySelectorAll(".lcd-line");
    if (lines.length === 0) {
      $list.innerHTML = `<div class="lcd-line"></div><div class="lcd-line"></div>`;
      lines = $list.querySelectorAll(".lcd-line");
    }

    lines[0].innerHTML = Renderer.prepareLine(l1, c1, useBlock);
    lines[1].innerHTML = Renderer.prepareLine(l2, c2, useBlock);
  },

  // --- SPEZIAL-ANSICHTEN (VIEWS) ---

  renderLogin: (s) => {
    const now = new Date(Date.now() + (s.timeOffset || 0));
    const days = ["SO", "MO", "DI", "MI", "DO", "FR", "SA"];
    const dateStr = `${days[now.getDay()]} ${String(now.getDate()).padStart(2, "0")}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getFullYear()).slice(-2)} CODE`;

    const timeStr = now
      .toLocaleTimeString("de-DE", { hour12: false })
      .padEnd(12);
    const stars = "*".repeat(s.loginInput.length);
    const line2 = timeStr + stars.padEnd(4, ".");

    const cursorPosition =
      s.loginInput.length >= 4 ? -1 : 12 + s.loginInput.length;
    Renderer.draw(dateStr, line2, -1, cursorPosition, true);
  },

  /** * NEU: Spezial-View für Uhrzeit korrigieren (analog zu MelodyEdit)
   * Nutzt die Daten aus dem dateTimeHandler
   */
  renderDateTimeEdit: (s) => {
    const label = "UHR KORRIGIEREN";
    const raw = s.dateTimeEdit.digits;
    // Formatierung: DD-MM-YY HH:MM
    const display = `${raw.slice(0, 2)}-${raw.slice(2, 4)}-${raw.slice(4, 6)} ${raw.slice(6, 8)}:${raw.slice(8, 10)}`;
    // Nutzt das Mapping für die Cursor-Position im formatierten String
    const cursorIdx = DateTimeCursorMap[s.dateTimeEdit.cursor];
    Renderer.draw(label, display, -1, cursorIdx, true);
  },

  /**
   * View für "Sekundaere korrigieren"
   * Maske: SEKUNDAERE: HH:MM
   */
  renderSecondaryEdit: (s) => {
    // Verhindert den Crash, falls das Objekt im State noch nicht initialisiert wurde
    if (!s.secondaryEdit || !s.secondaryEdit.digits) {
      return;
    }

    const label = "ZEIT...EINGEBEN";
    const raw = s.secondaryEdit.digits; // Jetzt sicher: "0000" o.ä.

    // Formatierung für das Display: "SEKUNDAERE: HH:MM"
    const hours = raw.slice(0, 2);
    const minutes = raw.slice(2, 4);
    const display = `SEKUNDAERE: ${hours}:${minutes}`;

    // Mapping für den Cursor (überspringt den Doppelpunkt)
    const secondaryCursorMap = [0, 1, 3, 4];

    // "SEKUNDAERE: " hat 12 Zeichen.
    const displayPrefixOffset = 12;
    const cursorIdx =
      displayPrefixOffset + secondaryCursorMap[s.secondaryEdit.cursor];

    // Zeichnen (label, display, lineIndex, cursorIndex, blink)
    Renderer.draw(label, display, -1, cursorIdx, true);
  },

  renderMelodyEdit: (s) => {
    // 1. Die ID berechnen (1-8)
    const id = (s.melodyIdx + 1).toString();

    // 2. Den Namen aus dem neuen Melodie-Objekt extrahieren
    const name = s.melodies[id]?.name || "";

    // 3. Anzeigezeilen generieren
    const line1 = `${id} - ${name}`;
    const isEdit = s.melodyEditStep === "EDIT";
    const line2 = isEdit ? "+ - ESC BS ENT 1..9" : "+ - ESC ENTER=EDIT";

    // 4. Cursor-Position:
    // "4 + s.melodyCursor" passt weiterhin, da "1 - " genau 4 Zeichen sind.
    Renderer.draw(line1, line2, isEdit ? 4 + s.melodyCursor : -1, -1, true);
  },

  renderSummerTime: (s) => {
    // ==================================
    // 1) AUSWAHL 1/4 – 4/4
    // ==================================
    if (s.summerTimeEditStep === "SELECT") {
      const titles = [
        "1/4) NICHT VORHANDEN",
        "2/4) UEBER RADIO",
        "3/4) NORMAL",
        "4/4) FESTES DATUM",
      ];

      Renderer.draw("MENUE SOMMERZEIT", titles[s.summerTime.modeIdx]);
      return;
    }

    // ==================================
    // 2) FESTES DATUM
    // ==================================

    const ws = s.summerTime.ws; // DDMM
    const sw = s.summerTime.sw; // DDMM

    const line1 = `W/S-WECHSEL: ${ws.substring(0, 2)}-${ws.substring(2, 4)}`;
    const line2 = `S/W-WECHSEL: ${sw.substring(0, 2)}-${sw.substring(2, 4)}`;

    // Cursor-Positionen innerhalb der Strings
    // "W/S-WECHSEL: DD-MM"
    const cursorMap = [13, 14, 16, 17];

    const cursorPos = cursorMap[s.summerTime.cursor];

    const cursorLine1 = s.summerTimeEditStep === "DATE_WS" ? cursorPos : -1;

    const cursorLine2 = s.summerTimeEditStep === "DATE_SW" ? cursorPos : -1;

    Renderer.draw(line1, line2, cursorLine1, cursorLine2, true);
  },

  renderFlow: (s) => {
    const step = s.activeFlow.steps[s.flowStepIdx];
    // Wenn es sich um das Datum handelt, leiten wir an den Spezial-Renderer um
    if (step.id === "fullDateTime") return Renderer.renderDateTimeEdit(s);

    const progPrefix =
      s.flowData.type !== "TURMUHR_STELLEN"
        ? (s.flowData.programId || "").trim()
        : "";

    if (step.inputInLine2) {
      const rawInput = s.currentInput.padEnd(step.length, " ");
      let display = "";
      let cursorIdx = -1;

      if (s.flowData.type === "TURMUHR_STELLEN" || step.id === "turmuhrTime") {
        display = `${rawInput.slice(0, 2)}:${rawInput.slice(2, 4)}`;
        cursorIdx = s.currentInput.length;
        if (cursorIdx > 1) cursorIdx += 1;
        if (s.currentInput.length >= 4) cursorIdx = -1;
      } else {
        // Generische Maske (z.B. für Dauer __s)
        let charCounter = 0;
        let firstEmptyIdx = -1;
        const mask = step.subLabel || "";
        for (let i = 0; i < mask.length; i++) {
          if (mask[i] === "_") {
            if (charCounter < s.currentInput.length) {
              display += s.currentInput[charCounter];
            } else {
              if (firstEmptyIdx === -1) firstEmptyIdx = i;
              display += "_";
            }
            charCounter++;
          } else {
            display += mask[i];
          }
        }
        cursorIdx = s.currentInput.length >= step.length ? -1 : firstEmptyIdx;
      }
      Renderer.draw(step.label, display, -1, cursorIdx, true);
    } else {
      const fullL1 = `${progPrefix} ${step.label}`.trim();
      let displayL1 = fullL1;
      for (const char of s.currentInput) {
        displayL1 = displayL1.replace("_", char);
      }
      Renderer.draw(displayL1, step.subLabel || "", displayL1.indexOf("_"), -1);
    }
  },

  renderReadDelete: (s, isDelete) => {
    const list = isDelete ? s.deleteList : s.readList;
    const idx = isDelete ? s.deleteIdx : s.readIdx;
    const prog = list[idx];

    if (!prog) return Renderer.draw("KEINE DATEN", "ESC = ZURUECK");

    const typeLabel = (prog.category.split("_")[1] || "").substring(0, 4);
    const rawTime = prog.data.startTime || prog.data.time || "----";
    const time =
      rawTime.length === 4
        ? `${rawTime.slice(0, 2)}:${rawTime.slice(2, 4)}`
        : "--:--";
    const line1 = `${prog.programId} ${typeLabel} ${String(prog.data.selection || "").padStart(2)} ${time}`;

    if (isDelete && s.deleteConfirm) {
      return Renderer.draw(line1, "LOESCHE ? [1=JA]: _", -1, 18, true);
    }

    let line2 =
      s.readDetailStep === 0
        ? prog.data.days
          ? `T:${prog.data.days}`
          : `D:${prog.data.duration}s`
        : prog.data.endTime
          ? `E:${prog.data.endTime.slice(0, 2)}:${prog.data.endTime.slice(2, 4)}`
          : "E:--:--";

    Renderer.draw(line1, line2.padEnd(10) + "ENTER=WEITER");
  },

  renderMelodyRecord: (s) => {
    const rd = s.recordData;
    if (s.recordStep === "NUMBER") {
      const line2 = `DIE MELODIE NR.: ${rd.id || "_"}`;
      Renderer.draw("SPEICHERE", line2, -1, line2.indexOf("_"), true);
    } else if (s.recordStep === "RECORD") {
      const elapsed = Math.floor((Date.now() - rd.startTime) / 1000);
      const time = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}`;
      Renderer.draw(
        `FREI ${String(rd.remainingHits).padStart(3)}       ${time}`,
        "ENTER UM ZU BEENDEN",
      );
    } else if (s.recordStep === "CONFIRM") {
      Renderer.draw("SPEICHERN [1=JA]", `DIE MELODIE NR.: ${rd.id}`);
    }
  },

  renderMenu: (s) => {
    const item = s.stack[s.stack.length - 1];
    const title =
      s.stack.length === 1 ? item.name : item.displayName || item.name;
    const sub = item.submenu ? item.submenu[s.index].name : "";
    Renderer.draw(title, sub);
  },

  // --- HAUPT-STEUERUNG (ROUTING) ---
  render: (state) => {
    if (!state.isLoggedIn) return Renderer.renderLogin(state);

    const allButtons = document.querySelectorAll(".btn, .f-btn");
    const allowedKeys = ["5", "6", "7", "8", "SecFunc", "Escape", "Help"];

    allButtons.forEach((btn) => {
      const key = btn.dataset.key;

      if (state.secFuncActive && !allowedKeys.includes(key)) {
        btn.classList.add("btn-disabled");
      } else {
        btn.classList.remove("btn-disabled");
      }
    });

    if (state.showHelp) {
      const lines = HelpHandler.getHelpText(state);
      $helpList.innerHTML = lines.map((line) => `<li>${line}</li>`).join("");
      $helpOverlay.classList.remove("hidden");
    } else {
      $helpOverlay.classList.add("hidden");
    }

    // Prioritäten-Routing
    if (state.melodyRecordMode) return Renderer.renderMelodyRecord(state);
    if (state.dateTimeEditMode) return Renderer.renderDateTimeEdit(state);
    if (state.summerTimeEditMode) return Renderer.renderSummerTime(state);
    if (state.secondaryEditMode) return Renderer.renderSecondaryEdit(state);
    if (state.melodyEditMode) return Renderer.renderMelodyEdit(state);
    if (state.activeFlow) return Renderer.renderFlow(state);
    if (state.deleteMode) return Renderer.renderReadDelete(state, true);
    if (state.readMode) return Renderer.renderReadDelete(state, false);

    return Renderer.renderMenu(state);
  },
};
