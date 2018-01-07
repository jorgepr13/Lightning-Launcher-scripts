// app Twilight

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
* toggle
* start
* stop
*/


var intent = new Intent();
intent.setClassName("com.urbandroid.lux", "com.urbandroid.lux.TwilightService");

intent.putExtra("start", "");
//intent.putExtra("toggle", ""); //needs to be started prior to perform the toggle
//intent.putExtra("stop", "");
getActiveScreen().getContext().startService(intent);
//return;
//getActiveScreen().getContext().startActivity(intent);

/*
"" argCount="0"/>
<action code="548" nameLocal="Flash" catNameLocal="Alert" argCount="2">
	<arg num="0" nameLocal="Text" dataType="str" optional="false" privacy="public" contentType="str"/>
	<arg num="1" nameLocal="Long" dataType="bool" optional="false" privacy="public" contentType="bool"/>
</action>
*/

//add timeout using while, date before, and date during execution

var i = new TaskerIntent("Set_Var");
i.addAction(ActionCodes.SET_VARIABLE);
//i.addAction(547);
i.addArg("%SCREEN_FILTER");//"Name"
i.addArg("1");//"To"
i.addArg(false);//"Recurse Variables"
i.addArg(false);//"Do Maths"
i.addArg(false);//"Append"
//LL.sendTaskerIntent(i, false);
sendTaskerIntent(i, true);//true=wait for task completion

//alert("done");

/*

https://groups.google.com/forum/m/#!topic/tasker/0QUYCjx4MH8

Abdullah Alahdal
Before the beta I used to run a task on the fly through lightning launcher script as follows: 

var i = new TaskerIntent("Set_VAR"); 
i.addAction(ActionCodes.SET_VARIABLE); 
i.addArg("%Record_ID"); 
i.addArg("555"); 
i.addArg(false); 
i.addArg(false); 
i.addArg(false); 
LL.sendTaskerIntent(i, true); 


And run existing Task as follows: 

LL.sendTaskerIntent(new TaskerIntent("TASK_NAME"),false); 


Non of above ways works in the last beta.



Abdullah Alahdal

> This is an external app which sends a broadcast to Tasker ?
> 
> I havn't changed any of that and just tested an external app call, which
> included setting a Tasker variable, and it worked fine. Check you have
> Allow External Access enabled in Prefs / Misc maybe. 
> 
> Pent
Uninstall and reinstall Lightning Launcher, fixes the issue.



public boolean sendTaskerIntent (TaskerIntent intent, boolean synchronous)

Send a tasker intent, optionally waiting for its completion to return.

Parameters: 
intent
an intent built with TaskerIntent (see http://tasker.dinglisch.net/invoketasks.html for samples)
synchronous
when true, Lightning will wait for Tasker task completion before to return, otherwise it will return immediately

Returns:
when synchronous is true, returns true if the intent has been sent successfully and Tasker reports a success too, 
when synchronous is false, this method always returns true.


*/

