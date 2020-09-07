import { me } from "appbit";
import clock from "clock";
import { display } from "display";
import document from "document";
import { inbox } from "file-transfer";
import { vibration } from "haptics";
import { today } from "user-activity";
import { MINOR_COLORS, SETTINGS_KEYS, SETTINGS_NIGHT_COLOR } from "../common/constants";
import * as analog from "./analog";
import { monthNames } from "./dateUtils";
import { loadSettings } from "./settingsUtils";

// Element handles
const background = document.getElementById("background");
const dial = document.getElementById("dial");
const dialMinor = document.getElementById("dialMinor");
const dateDisplay = document.getElementById("dateDisplay");
const stepsIcon = document.getElementById("stepsIcon");
const stepsDisplay = document.getElementById("stepsDisplay");
const lockIcon = document.getElementById("lockIcon");
const hourHand = document.getElementById("hourHand");
const minuteHand = document.getElementById("minuteHand");
const secondHand = document.getElementById("secondHand");
const displayToggle = document.getElementById("displayToggle");

let settings;

// Applies clock face color settings
const applySettings = (now) => {
  let displayColor = settings[SETTINGS_KEYS.CLOCK_COLOR];

  // When night mode is enabled and it is between the start and end time we adjust
  // the face to an orange-red color that is easier on the eyes in dim light.
  if (settings[SETTINGS_KEYS.NIGHT_MODE]) {
    const minutes = now.getHours() * 60 + now.getMinutes();
    if (
      settings[SETTINGS_KEYS.NIGHT_MODE_START] <= minutes ||
      settings[SETTINGS_KEYS.NIGHT_MODE_END] >= minutes
    ) {
      displayColor = SETTINGS_NIGHT_COLOR;
    }
  }

  background.style.fill = displayColor;
  dial.style.fill = displayColor;
  dialMinor.style.fill = MINOR_COLORS[displayColor];
}

// Handler to receive updated settings files
const receiveSettings = () => {
  while (inbox.nextFile()) { /* no-op */ }
  settings = loadSettings();
  applySettings(new Date());
}

inbox.onnewfile = receiveSettings;
receiveSettings();

// Initialize display
lockIcon.style.opacity = display.autoOff ? 0 : 1;

// Update the clock every second
clock.granularity = "seconds";

clock.ontick = (evt) => {
  const now = evt.date;

  // Update the date display
  const monthName = monthNames[now.getMonth()];
  const day = now.getDate();
  dateDisplay.text = `${monthName} ${day}`;

  // Update the hands
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  hourHand.groupTransform.rotate.angle = analog.hoursAngle(hours, minutes);
  minuteHand.groupTransform.rotate.angle = analog.minutesAngle(minutes, seconds);
  secondHand.groupTransform.rotate.angle = analog.secondsAngle(seconds);

  // Update steps display
  if (me.permissions.granted("access_activity")) {
    stepsDisplay.text = today.adjusted.steps.toLocaleString("en-US");
    stepsIcon.x = stepsDisplay.getBBox().x - 30;
  } else {
    stepsDisplay.style.opacity = 0;
    stepsIcon.style.opacity = 0;
  }

  // Update display if needed
  applySettings(now);
}

// Allow user to toggle the display autoOff capability. In the interest of saving battery life
// we re-enable the autoOff if the clock face is closed or the screen is turned off.
displayToggle.onclick = () => {
  display.autoOff = !display.autoOff;
  lockIcon.style.opacity = display.autoOff ? 0 : 1;
  vibration.start("confirmation");
}

display.onchange = () => {
  if (!display.on) display.autoOff = true;
  lockIcon.style.opacity = display.autoOff ? 0 : 1;
}

me.onunload = () => { display.autoOff = true; }
