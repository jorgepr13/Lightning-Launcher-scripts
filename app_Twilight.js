// app Twilight

//needed to set the Tasker variable
try{eval(getScriptByName("Tasker_Functions").getText());} catch(e){Android.makeNewToast("One of the required scripts couldn't be loaded.\nPlease try again.\n\n"+e,false).show();return;}

//data = "on","off","toggle"[default]; no data (null) will resolve to "toggle"
var data = getEvent().getData() || "toggle";
var screen = getActiveScreen();
var script = getCurrentScript();
var context = screen.getContext();//var context = LL.getContext();
var screenFilter = 0;
data = data.toString().toLowerCase();

if(data == "toggle"){  
  screenFilter = getTaskerVariable("%SCREEN_FILTER");
  if(screenFilter == null){screenFilter = script.getTag("SCREEN_FILTER");}
  if(screenFilter == undefined){screenFilter = 0;}
  if(screenFilter != 0){data = "off";} else {data = "on";}
}

var extra = "";
if(data == "on"){
  extra = "start";screenFilter = 1;
} else {
  extra = "stop";screenFilter = 0;
}

var intent = new Intent();
intent.setClassName("com.urbandroid.lux", "com.urbandroid.lux.TwilightService");
intent.putExtra(extra, extra);
getActiveScreen().getContext().startService(intent);
//getActiveScreen().getContext().startActivity(intent);

script.setTag("SCREEN_FILTER",screenFilter);
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
