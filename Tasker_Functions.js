Object.prototype.typeoff     = function(elem) {return Object.prototype.toString.call(elem).split(/\W/)[2].toLowerCase()};

var context = getActiveScreen().getContext();//var context = LL.getContext();
var taskerStatus = TaskerIntent.testStatus(context);

var tVar = ["%BLUE","%LOCN","%AIR","%LOC","%SCREEN","%WIFI","%GPS"];
var tVar = "%BLUE";
var value = getTaskerVariable(tVar);
var msg = "";
if(typeoff(tVar) == "string") {var tVar = [tVar];}
for(var i=0;i<value.length;i++){msg += tVar[i] + ": " + value[i] + "\n";}
alert(msg);//Android.makeNewToast(msg,true).show();

function getTaskerVariable(taskerVar){
  if(taskerVar == null || taskerVar == undefined || taskerVar == "") {return null;}
  if(typeoff(taskerVar) != "array" && typeoff(taskerVar) != "string") {return null;}
  if(typeoff(taskerVar) == "string") {var taskerVar = [taskerVar];}
/*Tasker Variable Request
About the script
Purpose: This is a tool script to request Tasker variables without creating bindings.
Author: jorgepr13

How to use it:
1. Change the taskerVar with the variables you need, 
2. Create a Tasker task described below, (optional if you are able to run the send intent from LL) 
3. Launch the script
*/
/* Process *
-Change the configuration variables based on your needs.
-value is set to null and key is set to "var_0", "var_1" ... matching the taskerVar length
-Tasker Status is check, no need to perform any Tasker process if Tasker is not enabled
--for some reason "TaskerIntent.Status.OK" don't works for me, but the string check does

-The Broadcast Receiver is set, based on the intent/s provided
--more than one intent can be set to be received, but we are only sending the first one, and expecting to receive the same back
-Once the intent is received, the keys are checked and the value is retrieved
--if the value retrieved matches the literal variable (%LOCN was asked and %LOCN was received, instead of a lat,lon), then the value gets reset to the default (null)
--the receiver gets closed when the lastKey is matched

-The key:value pairs are combined and stored in the extra array
-Since Tasker can send only 3 extras at a time, the length of the taskerVar is checked against a multiple of 3, and the extra array gets filled with a key and no variable request
--filling the extras is done to prevent calling an undeclared index

-A send intent is attempted "on the fly"
--it keeps failing for me, so a perform task "on the fly" does the trick

-A perform task is attempted "on the fly"
--this requires a task to be made in Tasker containing: 
1. Stop, if %par1 and %par2 aren't set
2. Set variable "extra" to %par2
3. Variable split %extra with "=:=" splitter
--the splitter can be changed, but it must match the extra joiner, using a comma is not recommended because of some Tasker variables return CSV 
4. Send intent, action=%par1, extras=%extra(1),%extra(2),%extra(3), target=Broadcast Receiver

-The "on the fly" code contains a different task name to prevent Tasker ignoring the next task sent and therefore not getting the requested variables 
-It also contains a wait action, needed to allow the Broadcast Receiver get the intent and process it
--I tried to do a setTimeout and LL froze every time

-Try to stop the receiver again, if for some reason the intent wasn't received and was not stopped at that time
-Show the results

 * References *
http://www.lightninglauncher.com/wiki/doku.php?id=script_music_metadata
https://groups.google.com/forum/m/#!topic/tasker/FjOpMXN4wf0
http://mobileorchard.com/android-app-development-using-intents-to-pass-data-and-return-results-between-activities/
https://forum.xda-developers.com/showthread.php?t=2489449

 * Configuration Info *
taskerVar, the tasker variable to request
intent, can be sent to any unique name, and must not contain any space
taskerTask, used in the workaround to call a previously defined task that sends the variable/s value/s
key, auto-generated, can be set to any name, but different from the other keys, and must not contain any space
value, the requested Tasker variable value, or null by default


public void run (Screen screen, String data)
  Run this script
Parameters
  screen	screen in which to execute the script
  data	optional data to send to the script. Use JSON to pass more than a string.


if (typeof self.timeElapsed == "undefined" || typeof self.getTimeAgo == "undefined") {
  var api_script = LL.getScriptByName("f-Time");
  if (api_script === null) {
    //alert("Import script 'f-Time'. \n This script depends on it.");
    Android.makeNewToast("Import script 'f-Time'. \n This script depends on it.",false).show();
    return;
  }
  //initialize the self method
  LL.runScript("f-Time", null);
}

var taskerVar = LL.getEvent().getData() || null;
if(taskerVar == null || taskerVar == undefined || taskerVar == "") {return [null];}
*/

// Configuration
//var taskerVar  = ["%BLUE","%LOCN","%AIR","%LOC","%SCREEN","%WIFI","%GPS"];
var intent     = ["net.tasker.SHARE_VAR"];
var taskerTask = "Tasker Share Variable";
// End Configuration

var key = [];var value = [];for(var i=0;i<taskerVar.length;i++){key.push("var_"+i);value.push(null);}

//if(TaskerIntent.testStatus(context).equals(TaskerIntent.Status.OK)){}
if(taskerStatus != "OK") {
  Android.makeNewToast("Tasker status: " + taskerStatus,true).show();
} else {
  //Android.makeNewToast(taskerStatus + " | " + "enabled",true).show();

LL.bindClass("android.content.IntentFilter");
LL.bindClass("android.content.BroadcastReceiver");

var receiver = new JavaAdapter(BroadcastReceiver,{
  onReceive:function(c,i){ //context, intent //android.content.ContextWrapper
    var lastKey = 0;
    var e = i.getExtras();
    for(var i=0;i<key.length;i++){
      if(e.containsKey(key[i])){value[i] = e.get(key[i]);lastKey=i;}
      if(value[i] == taskerVar[i]){value[i] = null;}
    }
    lastKey++;
    if(lastKey == key.length){try {if(receiver != null){context.unregisterReceiver(receiver);}} catch(e){}}
  }
});
/*//Code to register multiple intents
var f = new IntentFilter();
for(var i=0;i<intent.length;i++){f.addAction(intent[i]);}
context.registerReceiver(receiver,f);
*/
context.registerReceiver(receiver, new IntentFilter(intent[0]));

//join the key:value pairs in the extra array, then add empty variable requests to prevent calling a non-existing index
var extra = [];
var len = Math.min(key.length,taskerVar.length);
for(var i=0;i<len;i++){extra.push(key[i]+":"+taskerVar[i]);}
for(var i=0;i<(2-(len-1)%3);i++){extra.push("abc_"+i);}

for(var j=0;j<key.length;j+=3){
/*
//not working; Broadcast Error: Failed to execute broadcast Task
var i = new TaskerIntent("share_variable_value"+j);
i.addAction(ActionCodes.SEND_INTENT);//877
i.addArg(intent[0]);//"Action"
i.addArg(0);//"Cat": 0="None", 1="Default", 2="Alt", 3="Browsable", 4="Car Dock", 5="Desk Dock", 6="Home", 7="Info", 8="Launcher", 9="Preference", 10="Selected Alt", 11="Tab", 12="Test", 13="Cardboard"
i.addArg("");//"Mime Type"
i.addArg("");//"Data"
i.addArg(extra[j]);//"Extra1"
i.addArg(extra[j+1]);//"Extra2"
i.addArg(extra[j+2]);//"Extra"
i.addArg("");//"Package"
i.addArg("");//"Class"
i.addArg(0);//"Target"0="Broadcast Receiver", 1="Activity", 2="Service"
i.addAction(ActionCodes.WAIT);//30
i.addArg(0);//"MS"
i.addArg(1);//"Seconds"
i.addArg(0);//"Minutes"
i.addArg(0);//"Hours"
i.addArg(0);//"Days"
LL.sendTaskerIntent(i, true);//true=wait for task completion
*/
//*
//workaround
//needs a Tasker task that puts the %par1 in the intent action, and %par2 in the extras
var i = new TaskerIntent("share_variable_value"+j);
i.addAction(ActionCodes.RUN_TASK);//130
i.addArg(taskerTask);//"Name"
i.addArg(150);//"Priority"
i.addArg(intent[0]);//"%par1"
i.addArg(extra.join("=:="));//"%par2"
i.addArg("");//"Return Value Variable"
i.addArg(false);//"Stop"
i.addAction(ActionCodes.WAIT);//30
i.addArg(500);//"MS"
i.addArg(1);//"Seconds"
i.addArg(0);//"Minutes"
i.addArg(0);//"Hours"
i.addArg(0);//"Days"
LL.sendTaskerIntent(i, true);//true=wait for task completion
extra.splice(0,3);//remove the sent requests
//*/

}//end for - 3 var at a time
//LL.sendTaskerIntent(new TaskerIntent(taskerTask), true);

try {if (receiver != null){context.unregisterReceiver(receiver);}} catch(e){}
}//end if - Tasker status check
/*
var msg = "";
for(var i=0;i<value.length;i++){msg += taskerVar[i] + ": " + value[i] + "\n";}

alert(msg);
//Android.makeNewToast(msg,true).show();
*/
return value;
}//end func getTaskerVariable