// Utilities for working with analog watch faces

// Returns the angle (0-360) for the hour hand
export const hoursAngle = (hours, minutes) => (30 * hours) + (minutes / 2);

// Returns the angle (0-360) for the minute hand
export const minutesAngle = (minutes, seconds) => (6 * minutes) + (seconds / 10);

// Returns the angle (0-360) for the second hand
export const secondsAngle = (seconds) => 6 * seconds;
