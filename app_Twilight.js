// app Twilight

//needed to set the Tasker variable
try{eval(getScriptByName("Tasker_Functions").getText());} catch(e){Android.makeNewToast("One of the required scripts couldn't be loaded.\nPlease try again.\n\n"+e,false).show();return;}

var eventt = getEvent();
var event_src = eventt.getSource();
//event_dat = "on","off","toggle"[default]; no event_dat (null) will resolve to "toggle"
var event_dat = eventt.getData() || "toggle";
var cscreen = getActiveScreen();
var cscript = getCurrentScript();
var context = cscreen.getContext();//var context = LL.getContext();
var screenFilter = 0;
//if (event_src == "I_CLICK" && event_dat == "toggle") {event_dat == "toggle"}
if (event_src == "I_LONG_CLICK"  && event_dat == "toggle") {event_dat == "off"}
event_dat = event_dat.toString().toLowerCase();

if(event_dat == "toggle"){
  screenFilter = getTaskerVariable("%SCREEN_FILTER");
  if(screenFilter === null){screenFilter = cscript.getTag("SCREEN_FILTER");}
  if(screenFilter === undefined){screenFilter = 0;}
  if(screenFilter !== 0){event_dat = "off";} else {event_dat = "on";}
}

var extra = "";
if(event_dat == "on"){
  extra = "start";screenFilter = 1;
} else {
  extra = "stop";screenFilter = 0;
}

var intentt = new Intent();
intentt.setClassName("com.urbandroid.lux", "com.urbandroid.lux.TwilightService");
intentt.putExtra(extra, extra);
getActiveScreen().getContext().startService(intentt);
//getActiveScreen().getContext().startActivity(intentt);

cscript.setTag("SCREEN_FILTER",screenFilter);
setTaskerVariable("%SCREEN_FILTER",screenFilter);

/*
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
