import cbor from "cbor";
import { me } from "companion";
import { outbox } from "file-transfer";
import { settingsStorage } from "settings";
import { SETTINGS_KEYS, SETTINGS_FILE_NAME } from "../common/constants";
import { debounce } from "../common/utils";

// Retrieve all the clock settings
const getAllSettings = () => Object.values(SETTINGS_KEYS)
  .reduce((settings, key) => ({ ...settings, [key]: settingsStorage.getItem(key) }), {});

// Transfer settings to the device as a file
const sendSettings = () => { outbox.enqueue(SETTINGS_FILE_NAME, cbor.encode(getAllSettings())); }

// Handle settings change events - debounce so the settings sliders don't flood the outbox
settingsStorage.onchange = debounce(sendSettings, 500);

// Handle settings change events while either the companion was off
if (me.launchReasons.settingsChanged) sendSettings();
