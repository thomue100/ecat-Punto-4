// js/menuData.js
export const menuData = [
  {
    name: "HAUPTMENU",
    displayname: "HAUPTMENU",
    submenu: [
      {
        name: "1/7) PROGRAMMIERUNG",
        displayName: "MENUE PROGRAMMIERUNG",
        submenu: [
          {
            name: "1/3) EINGEBEN",
            displayName: "EINGABE PROGRAMM.",
            submenu: [
              {
                name: "1/5) WOECHENTLICH",
                displayName: "EINGABE WOECHENTL.",
                submenu: [
                  {
                    name: "1/4) GLOCKEN",
                    action: "START_PROGRAM_INPUT",
                    configKey: "W_GLOCKEN",
                  },
                  {
                    name: "2/4) MELODIEN",
                    action: "START_PROGRAM_INPUT",
                    configKey: "W_MELODIEN",
                  },
                  {
                    name: "3/4) STUNDENSCHLAGEN",
                    action: "START_PROGRAM_INPUT",
                    configKey: "W_STUNDENSCHLAGEN",
                  },
                  {
                    name: "4/4) DIENSTE",
                    action: "START_PROGRAM_INPUT",
                    configKey: "W_DIENSTE",
                  },
                ],
              },
              {
                name: "2/5) PERIODISCH",
                displayName: "EINGABE PERIODISCH",
                submenu: [
                  {
                    name: "1/4) GLOCKEN",
                    action: "START_PROGRAM_INPUT",
                    configKey: "P_GLOCKEN",
                  },
                  {
                    name: "2/4) MELODIEN",
                    action: "START_PROGRAM_INPUT",
                    configKey: "P_MELODIEN",
                  },
                  {
                    name: "3/4) STUNDENSCHLAGEN",
                    action: "START_PROGRAM_INPUT",
                    configKey: "P_STUNDENSCHLAGEN",
                  },
                  {
                    name: "4/4) DIENSTE",
                    action: "START_PROGRAM_INPUT",
                    configKey: "P_DIENSTE",
                  },
                ],
              },
              {
                name: "3/5) BESONDERE",
                displayName: "EINGABE BESONDERE",
                submenu: [
                  {
                    name: "1/4) GLOCKEN",
                    action: "START_PROGRAM_INPUT",
                    configKey: "B_GLOCKEN",
                  },
                  {
                    name: "2/4) MELODIEN",
                    action: "START_PROGRAM_INPUT",
                    configKey: "B_MELODIEN",
                  },
                  {
                    name: "3/4) STUNDENSCHLAGEN",
                    action: "START_PROGRAM_INPUT",
                    configKey: "B_STUNDENSCHLAGEN",
                  },
                  {
                    name: "4/4) DIENSTE",
                    action: "START_PROGRAM_INPUT",
                    configKey: "B_DIENSTE",
                  },
                ],
              },
              {
                name: "4/5) ZYKLISCH",
                displayName: "EINGABE ZYKLISCH",
                submenu: [
                  {
                    name: "1/4) GLOCKEN",
                    action: "START_PROGRAM_INPUT",
                    configKey: "Z_GLOCKEN",
                  },
                  {
                    name: "2/4) MELODIEN",
                    action: "START_PROGRAM_INPUT",
                    configKey: "Z_MELODIEN",
                  },
                  {
                    name: "3/4) STUNDENSCHLAGEN",
                    action: "START_PROGRAM_INPUT",
                    configKey: "Z_STUNDENSCHLAGEN",
                  },
                  {
                    name: "4/4) DIENSTE",
                    action: "START_PROGRAM_INPUT",
                    configKey: "Z_DIENSTE",
                  },
                ],
              },
              {
                name: "5/5) UNTERDRUECKEN",
                displayName: "EINGABE UNTERDRUECK.",
                submenu: [
                  {
                    name: "1/4) GLOCKEN",
                    action: "START_PROGRAM_INPUT",
                    configKey: "U_GLOCKEN",
                  },
                  {
                    name: "2/4) MELODIEN",
                    action: "START_PROGRAM_INPUT",
                    configKey: "U_MELODIEN",
                  },
                  {
                    name: "3/4) STUNDENSCHLAGEN",
                    action: "START_PROGRAM_INPUT",
                    configKey: "U_STUNDENSCHLAGEN",
                  },
                  {
                    name: "4/4) DIENSTE",
                    action: "START_PROGRAM_INPUT",
                    configKey: "U_DIENSTE",
                  },
                ],
              },
            ],
          },
          {
            name: "2/3) LESEN",
            displayName: "SUCHE PROGRAMM.",
            submenu: [
              {
                name: "1/5) WOECHENTLICH",
                action: "READ_PROGRAM_FLOW",
                configKey: "W",
              },
              {
                name: "2/5) PERIODISCH",
                action: "READ_PROGRAM_FLOW",
                configKey: "P",
              },
              {
                name: "3/5) BESONDERE",
                action: "READ_PROGRAM_FLOW",
                configKey: "B",
              },
              {
                name: "4/5) ZYKLISCH",
                action: "READ_PROGRAM_FLOW",
                configKey: "Z",
              },
              {
                name: "5/5) UNTERDRUECKEN",
                action: "READ_PROGRAM_FLOW",
                configKey: "U",
              },
            ],
          },
          {
            name: "3/3) LOESCHEN",
            displayName: "LOESCHE PROGRAMM.",
            submenu: [
              {
                name: "1/5) WOECHENTLICH",
                action: "DELETE_PROGRAM_FLOW",
                configKey: "W",
              },
              {
                name: "2/5) PERIODISCH",
                action: "DELETE_PROGRAM_FLOW",
                configKey: "P",
              },
              {
                name: "3/5) BESONDERE",
                action: "DELETE_PROGRAM_FLOW",
                configKey: "B",
              },
              {
                name: "4/5) ZYKLISCH",
                action: "DELETE_PROGRAM_FLOW",
                configKey: "Z",
              },
              {
                name: "5/5) UNTERDRUECKEN",
                action: "DELETE_PROGRAM_FLOW",
                configKey: "U",
              },
            ],
          },
        ],
      },
      {
        name: "2/7) UHR KORRIGIEREN",
        displayName: "UHR-BERICHTIGUNG",
        action: "CORRECT_CLOCK",
        configKey: "UHR_KORRIGIEREN",
      },
      {
        name: "3/7) SEK. KORRIGIEREN",
        displayName: "ZEIT...EINGEBEN",
        action: "CORRECT_SECONDARY_TIME",
      },
      {
        name: "4/7) TURMUHR KORRIG.",
        displayName: "ZEITEINGABE VOM",
        action: "DIRECT_COMMAND",
        configKey: "TURMUHR_KORRIGIEREN",
      },
      {
        name: "5/7) SOMMERZEIT",
        displayName: "MENUE SOMMERZEIT",
        action: "SET_SUMMER_TIME", // Direkt hier die Action
        configKey: "SOMMERZEIT",
      },
      {
        name: "6/7) MELOD. SPEICHERN",
        displayName: "SPEICHERE",
        action: "START_MELODY_RECORD",
      },
      {
        name: "7/7) NAME DER MELODI.",
        displayName: "NAME DER MELODI.", // Kein expliziter displayName im Blueprint, verwende name
        action: "EDIT_MELODY_NAMES",
      },
    ],
  },
];
