# Fitbit Medical Professional Clockface
This clockface is meant to make it easy for medical professionals to take vitals. Simply tap the screen and the display will remain on until you tap the screen again. Other features include:
* Date and steps display (steps require permission to read activity)
* Ability to select a color from the settings page
* Night mode

With night mode enabled, the face will shift to an orange-red color that is easier on the eyes in dim light. The face will remain this color during the hours you select in the settings page.
### Development Notes
* Uses the file transfer api to sync settings. This api is more robust than the messaging api provided by Fitbit. It handles things like transfering the file even if the device was off or out of range when settings were updated.
* Hides the steps display if permission isn't given for reading activity.