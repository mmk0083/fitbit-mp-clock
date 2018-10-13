import { SETTINGS_COLORS, SETTINGS_DEFAULTS, SETTINGS_KEYS } from "../common/constants";
import { zeroPad } from "../common/utils";

// Given a string value for minutes since midnight, returns the corresponding time
const toTime = (value) => {
  const sinceMidnight = parseInt(value);
  const hours = Math.floor(sinceMidnight / 60);
  const minutes = sinceMidnight % 60;
  return `${hours % 12 || 12}:${zeroPad(minutes)} ${hours < 12 ? 'AM' : 'PM'}`;
}

const ClockSettings = ({ settings, settingsStorage }) => {
  // Make sure we have initial values for all the settings
  Object.values(SETTINGS_KEYS).forEach((key) => {
    if (typeof settings[key] === "undefined") {
      settingsStorage.setItem(key, SETTINGS_DEFAULTS[key]);
    }
  });
  return (
    <Page>
      <Section title={<Text bold>Clock Color</Text>}>
        <ColorSelect
          settingsKey={SETTINGS_KEYS.CLOCK_COLOR}
          colors={SETTINGS_COLORS}
        />
      </Section>
      <Section title={<Text bold>Night Mode</Text>}>
        <Toggle
          settingsKey={SETTINGS_KEYS.NIGHT_MODE}
          label={settings[SETTINGS_KEYS.NIGHT_MODE] === "true" ? "Enabled" : "Off"}
        />
        { settings[SETTINGS_KEYS.NIGHT_MODE] === "true" &&
          <Section>
            <Text>Start Time: { toTime(settings[SETTINGS_KEYS.NIGHT_MODE_START]) }</Text>
            <Slider settingsKey={SETTINGS_KEYS.NIGHT_MODE_START} min="0" max="1425" step="15" />
            <Text>End Time: { toTime(settings[SETTINGS_KEYS.NIGHT_MODE_END]) }</Text>
            <Slider settingsKey={SETTINGS_KEYS.NIGHT_MODE_END} min="0" max="1425" step="15" />
          </Section>
        }
      </Section>
    </Page>
  );
}

registerSettingsPage(ClockSettings);
