// app_Sleep_Track-start.js
// app_Sleep_Track-pause.js
// app_Sleep_Track-stop.js

//var intent = new Intent("com.urbandroid.sleep.alarmclock.START_SLEEP_TRACK");
var intent = new Intent("com.urbandroid.sleep.alarmclock.STOP_SLEEP_TRACK");
//var intent = new Intent("com.urbandroid.sleep.ACTION_PAUSE_TRACKING");
//intent.setClassName("com.urbandroid.sleep", "com.urbandroid.lux.TwilightService");
//intent.putExtra("start", "");
getActiveScreen().getContext().sendBroadcast(intent);
//getActiveScreen().getContext().startService(intent);
//getActiveScreen().getContext().startActivity(intent);




/*
Actions

Sleep tracking start intent (Broadcast)
com.urbandroid.sleep.alarmclock.START_SLEEP_TRACK

Optional EXTRA to start in battery saving mode: START_IN_BATTERY_SAVING_MODE = true

Sleep tracking start + set an alarm for ideal sleep length(Broadcast)
com.urbandroid.sleep.alarmclock.START_SLEEP_TRACK_WITH_IDEAL_ALARM_ACTION

Sleep tracking stop intent (Broadcast)
com.urbandroid.sleep.alarmclock.STOP_SLEEP_TRACK

Sleep tracking 5 minute pause intent (Broadcast)
com.urbandroid.sleep.ACTION_PAUSE_TRACKING

Snooze Alarm (Broadcast)
com.urbandroid.sleep.alarmclock.ALARM_SNOOZE
 
Dismiss Alarm (Broadcast)
com.urbandroid.sleep.alarmclock.ALARM_DISMISS_CAPTCHA

Lullaby Stop (Broadcast)
com.urbandroid.sleep.ACTION_LULLABY_STOP_PLAYBACK
 
Lullaby start (Service)
start a Service with 
package: “com.urbandroid.sleep”
class: “com.urbandroid.sleep.media.lullaby.LullabyService”
EXTRA: extra_lullaby = “lullaby name”

Lullaby names:
NONE, WHALE, STORM, STREAM, CAVE, FIREPLACE, SEA, WIND, CLOCK, TIBER, NIGHT, FROGS, HORSE, SHEEP, CHIMES, OM, BELLS, FLUTE, PIANO, CAT, TRAIN, MARCH, MUSICBOX, BABY, GIRL, SUB, NASA, LAVA, JUNGLE, TIBET, BABY, SCIFI, CHOR, BREATH…

Request Backup (Broadcast)
“com.urbandroid.sleep.REQUEST_SYNC” will start the backup sync – export a CSV file, backup to Sleepcloud, Dropbox and Google Drive if connected


Events:

Sleep tracking started 
com.urbandroid.sleep.alarmclock.SLEEP_TRACKING_STARTED
 
Sleep tracking stopped
com.urbandroid.sleep.alarmclock.SLEEP_TRACKING_STOPPED

Snoozed by user
com.urbandroid.sleep.alarmclock.ALARM_SNOOZE_CLICKED_ACTION
 
Time to bed notification
com.urbandroid.sleep.alarmclock.TIME_TO_BED_ALARM_ALERT
 
Alarm triggered
com.urbandroid.sleep.alarmclock.ALARM_ALERT_START

Alarm dismissed
com.urbandroid.sleep.alarmclock.ALARM_ALERT_DISMISS

Lullaby started
com.urbandroid.sleep.ACTION_LULLABY_START_PLAYBACK

Lullaby stopped
com.urbandroid.sleep.ACTION_LULLABY_STOPPED_PLAYBACK

Lucid dreaming cue:
com.urbandroid.sleep.LUCID_CUE_ACTION
NOTE: enable settings-lucid dreaming
 
Antisnoring sound:
com.urbandroid.sleep.ANTISNORING_ACTION
 
45 minutes before smart period:
com.urbandroid.sleep.alarmclock.AUTO_START_SLEEP_TRACK

Using Tasker with Sleep as Android
React on Sleep as Android events in Tasker
Event -> System -> Intent (previously Misc -> Intent received) and add one of the Intents described above.
For example you can start you weather app when alarm is dismissed, by listening for the com.urbandroid.sleep.alarmclock.ALARM_ALERT_DISMISS intent.
 
Start an Sleep as Android action from Tasker
Event -> System -> Intent (previously Misc -> Intent send)
For example, create a new task, click + and choose “Action Intent” from the Misc category and there you fill in com.urbandroid.sleep.alarmclock.START_SLEEP_TRACK into the action text field. So you can start sleep tracking when you plug your phone to charger for example.

Adding alarm

android.intent.action.SET_ALARM
EXTRA_MESSAGE = “android.intent.extra.alarm.MESSAGE”;
EXTRA_HOUR = “android.intent.extra.alarm.HOUR”;
EXTRA_MINUTES = “android.intent.extra.alarm.MINUTES”;
EXTRA_SKIP_UI = “android.intent.extra.alarm.SKIP_UI”;


Enabling/disabling alarm by label
com.urbandroid.sleep.alarmclock.ALARM_STATE_CHANGE
Extras:
“alarm_label”: String representing a label of alarm to be changed. If there are more such alarms, only one of them is going to be changed (no guarantees which).

“alarm_enabled”: Boolean saying whether alarm should be enabled or disabled.

Tip: use Reactor to handle Sleep as Android Intents.
*/

