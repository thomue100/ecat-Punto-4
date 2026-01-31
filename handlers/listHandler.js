// listHandler.js
export const ListHandler = {
  /**
   * Gemeinsame Logik für die Navigation in Listen (Lesen & Löschen)
   */
  handleNavigation(state, k, KEYS, listType) {
    const list = state[`${listType}List`];
    let idx = state[`${listType}Idx`];

    // 1. Blättern (+/-) zwischen den Programmen
    if (KEYS.UP.includes(k) || KEYS.DOWN.includes(k)) {
      const delta = KEYS.UP.includes(k) ? 1 : -1;
      state[`${listType}Idx`] = (idx + delta + list.length) % list.length;
      state.readDetailStep = 0;
      state.deleteConfirm = false; // Bricht Dialog beim Blättern ab
    }
    // 2. Detail-Ansicht umschalten / Weiterblättern (Enter)
    else if (k === KEYS.ENTER) {
      if (listType === "delete") {
        if (state.readDetailStep === 0) {
          state.readDetailStep = 1;
        } else if (state.readDetailStep === 1) {
          state.deleteConfirm = true; // "Ganz unten" -> Dialog aktivieren
        }
      } else {
        state.readDetailStep = state.readDetailStep === 0 ? 1 : 0;
      }
    }
    // 3. Modus verlassen (ESC)
    else if (k === KEYS.ESC) {
      state[`${listType}Mode`] = false;
      state.readDetailStep = 0;
      state.deleteConfirm = false;
    }
  },

  handleRead(state, k, KEYS) {
    this.handleNavigation(state, k, KEYS, "read");
  },

  handleDelete(state, k, KEYS) {
    const list = state.deleteList;
    const idx = state.deleteIdx;

    // Logik wenn der Lösch-Dialog aktiv ist
    if (state.deleteConfirm) {
      if (k === "1") {
        const programToDelete = list[idx];
        if (programToDelete) {
          let allPrograms = JSON.parse(
            localStorage.getItem("punto4_programs") || "[]",
          );
          allPrograms = allPrograms.filter(
            (p) => p.programId !== programToDelete.programId,
          );
          localStorage.setItem("punto4_programs", JSON.stringify(allPrograms));

          state.deleteList.splice(idx, 1);

          if (state.deleteList.length === 0) {
            state.deleteMode = false;
          } else {
            state.deleteIdx = Math.max(0, state.deleteIdx - 1);
          }
        }
        state.deleteConfirm = false;
        state.readDetailStep = 0;
      } else {
        // JEDE andere Taste (ESC, +, -, etc.) bricht den Dialog ab
        state.deleteConfirm = false;
        // Falls es eine Navigationstaste war, diese ausführen
        if (KEYS.UP.includes(k) || KEYS.DOWN.includes(k) || k === KEYS.ESC) {
          this.handleNavigation(state, k, KEYS, "delete");
        }
      }
      return;
    }

    // Backspace wird hier bewusst ignoriert (keine Rolle mehr)
    if (k !== KEYS.BACKSPACE) {
      this.handleNavigation(state, k, KEYS, "delete");
    }
  },
};
