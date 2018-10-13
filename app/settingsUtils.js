// Utilities for working with the stored settings file
import { readFileSync } from "fs";
import { SETTINGS_DEFAULTS, SETTINGS_FILE_NAME, SETTINGS_FILE_TYPE, SETTINGS_KEYS } from "../common/constants";

// Retrieves the persisted settings file
export const loadSettings = () => {
  let settings;
  try {
    settings = readFileSync(SETTINGS_FILE_NAME, SETTINGS_FILE_TYPE);
  } catch (error) {
    console.log(error);
    settings = SETTINGS_DEFAULTS;
  }

  return {
    [SETTINGS_KEYS.CLOCK_COLOR]: JSON.parse(settings[SETTINGS_KEYS.CLOCK_COLOR]),
    [SETTINGS_KEYS.NIGHT_MODE]: settings[SETTINGS_KEYS.NIGHT_MODE] === "true",
    [SETTINGS_KEYS.NIGHT_MODE_START]: parseInt(settings[SETTINGS_KEYS.NIGHT_MODE_START]),
    [SETTINGS_KEYS.NIGHT_MODE_END]: parseInt(settings[SETTINGS_KEYS.NIGHT_MODE_END])
  };
}
