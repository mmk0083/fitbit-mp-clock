// Utilities for working with clock settings
export const SETTINGS_FILE_NAME = "settings.cbor";
export const SETTINGS_FILE_TYPE = "cbor";

export const SETTINGS_KEYS = {
  CLOCK_COLOR: "clockColor",
  NIGHT_MODE: "nightMode",
  NIGHT_MODE_START: "nightModeStart",
  NIGHT_MODE_END: "nightModeEnd"
};

// Options for the clock face color
export const SETTINGS_COLORS = [
  { color: "#00FFFF" }, // cyan
  { color: "#F80070" }, // fb-magenta
  { color: "#32CD32" }, // limegreen
  { color: "#FF7F50" }, // coral
  { color: "#FFE4B5" }, // moccasin
  { color: "#F0F8FF" }  // aliceblue
];

export const SETTINGS_NIGHT_COLOR = "#FF4500"; // orangered

// Map to minor tick mark colors
export const MINOR_COLORS = {
  '#00FFFF': '#004D4D',
  '#F80070': '#4A0022',
  '#32CD32': '#0F3E0F',
  '#FF7F50': '#4D2618',
  '#FFE4B5': '#4D4436',
  '#F0F8FF': '#484A4D',
  '#FF4500': '#4D1500'
};

// Default settings
export const SETTINGS_DEFAULTS = {
  [SETTINGS_KEYS.CLOCK_COLOR]: `"${SETTINGS_COLORS[0].color}"`,
  [SETTINGS_KEYS.NIGHT_MODE]: "false",
  [SETTINGS_KEYS.NIGHT_MODE_START]: "1260",
  [SETTINGS_KEYS.NIGHT_MODE_END]: "420"
};
