// app Twilight

/*
The intents must be addressed as target Service to the service class com.urbandroid.lux.TwilightService in the package com.urbandroid.lux. The commands are supplied as extras. The extras are of type string and the value can be set to an arbitrary value.
However, it is recommended to set the value to the same name as the extras name.

The supported list of extras are:
* update
* refresh
* preview
* profile_next
* quick_settings
* profile = <profile name>
* toggle
* start
* stop
*/


var intent = new Intent();
intent.setClassName("com.urbandroid.lux", "com.urbandroid.lux.TwilightService");
//intent.putExtra("toggle", ""); //needs to be started prior to perform the toggle
//intent.putExtra("start", "");
intent.putExtra("stop", "");
getActiveScreen().getContext().startService(intent);
//getActiveScreen().getContext().startActivity(intent);

