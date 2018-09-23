// Twilight
//event_dat = "on","off","toggle"[default]; no event_dat (null) will resolve to "toggle"

//import Tasker functions
try {eval(getScriptByName("class_Tasker").getText());} catch (e) {bindClass("android.widget.Toast");Toast.makeText(getActiveScreen().getContext(), "One of the required scripts couldn't be loaded.\nPlease try again.\n\n" + e, Toast.LENGTH_LONG).show(); return null;}

//set main script variables
var eventt = getEvent();
var event_src = eventt.getSource();
var event_dat = eventt.getData() || "toggle";
var cscreen = getActiveScreen();
var cscript = getCurrentScript();
var context = cscreen.getContext();//var context = LL.getContext();
event_dat = event_dat.toString().toLowerCase();

//get the current status
var screenFilter;
//screenFilter = getTaskerVariable("%SCREEN_FILTER");
//if (screenFilter == null) {screenFilter = cscript.getTag("SCREEN_FILTER");}
//screenFilter = cscript.getTag("SCREEN_FILTER");
screenFilter = getVariables().getInteger("SCREEN_FILTER");
if (screenFilter == undefined) {screenFilter = 0;}

//set the action to perform
var action = "";
if (screenFilter == 0) {action = "on";} else {action = "off";}
if (event_src == "I_LONG_CLICK") {action = "off";}
if (event_dat == "off") {action = "off";}

//prepare the action
var extra = "";
if (action == "on") {
  extra = "start"; screenFilter = 1;
} else {
  extra = "stop"; screenFilter = 0;
}

//execute the action
var intentt = new Intent();
intentt.setClassName("com.urbandroid.lux", "com.urbandroid.lux.TwilightService");
intentt.putExtra(extra, extra);
context.startService(intentt);

//update the tag and variable
getVariables().edit().setInteger("SCREEN_FILTER", screenFilter).commit();
//cscript.setTag("SCREEN_FILTER", screenFilter);
setTaskerVariable("%SCREEN_FILTER", screenFilter);


/*
//getActiveScreen().getContext().sendBroadcast(intent);
//getActiveScreen().getContext().startService(intent);
//getActiveScreen().getContext().startActivity(intent);

The intents must be addressed as target Service to the
service class com.urbandroid.lux.TwilightService in the
package com.urbandroid.lux.
The commands are supplied as extras.
The extras are of type string and the value can be set to an arbitrary value.
However, it is recommended to set the value to the same name as the extras name.

The supported list of extras are:
* update
* refresh
* preview
* profile_next
* quick_settings
* profile = <profile name>
* toggle //pauses twiglight, needs to be started prior to perform the toggle
* start
* stop
*/
