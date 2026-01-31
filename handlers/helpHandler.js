// handlers/helpHandler.js
import { helpData } from "../help.js";

export const HelpHandler = {
  getHelpText(state) {
    // Bestimme den Kontext: Entweder ein aktiver Flow, ein Menüpunkt oder Standard
    let key = "DEFAULT";

    if (state.activeFlow) {
      key = state.flowData.type; // z.B. "W_GLOCKEN"
    } else if (state.melodyEditMode) {
      key = "EDIT_MELODY_NAMES";
    } else {
      const currentItem = state.stack[state.stack.length - 1];
      if (currentItem && currentItem.configKey) key = currentItem.configKey;
    }

    return helpData[key] || helpData["DEFAULT"];
  },
};
