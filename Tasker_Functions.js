
/*Tasker Functions
About the script
Purpose: This is a script with useful Tasker functions.
Author: jorgepr13

How to use it:
1. Single variables
change %My_Var with the varaible that you need, and the value with the value that you need
setTaskerVariable("%My_Var", value);
getTaskerVariable("%My_Var");

2. Multiple variables
getTaskerVariable(["%BLUE","%LOCN","%AIR","%LOC","%SCREEN","%WIFI","%GPS"]);

3. Optional
You can have your Tasker "class" as an individual script and "import" it with the following code.
try{eval(getScriptByName("Tasker_Functions").getText());} catch(e){Android.makeNewToast("One of the required scripts couldn't be loaded.\nPlease try again.\n\n"+e,false).show();return;}
Where "Tasker_Functions" is the name of the script.

Additional
runTaskerTask(name,wait)
Where:
"name" is the task name
"wait" is the boolean to wait for the task completion

* References *
http://www.lightninglauncher.com/wiki/doku.php?id=script_music_metadata
http://mobileorchard.com/android-app-development-using-intents-to-pass-data-and-return-results-between-activities/
*/
//typeoff return: 'Array, Object, String, Date, RegExp, Function, Boolean, Number, Null, Undefined'
Object.prototype.typeoff = function(elem) {return Object.prototype.toString.call(elem).split(/\W/)[2].toLowerCase()};
function emptyVariable(myVar) {return myVar == null || myVar == undefined || myVar == "";}

var context = getActiveScreen().getContext();//var context = LL.getContext();
var taskerStatus = TaskerIntent.testStatus(context);

function runTaskerTask(name, wait) {
  if (taskerStatus != "OK") {
    Android.makeNewToast("Tasker status: " + taskerStatus, false).show(); return null;
  } else {
    if (emptyVariable(name)) {return null;}
    if (emptyVariable(wait)) {wait = true;}
    if (typeoff(wait) != "boolean") {wait = true;}
    LL.sendTaskerIntent(new TaskerIntent(name), wait);
  }
}

//setTaskerVariable("%SCREEN_FILTER", 1);
function setTaskerVariable(name, value){
  if (taskerStatus != "OK") {
    Android.makeNewToast("Tasker status: " + taskerStatus, false).show(); return null;
  } else {
    if (emptyVariable(name)) {return null;}
    if (emptyVariable(value) && value != "") {return null;}
    value = value.toString();

    var i = new TaskerIntent("Set_Var");
    i.addAction(ActionCodes.SET_VARIABLE);//547
    i.addArg(name);//"Name"
    i.addArg(value);//"To"
    i.addArg(false);//"Recurse Variables"
    i.addArg(false);//"Do Maths"
    i.addArg(false);//"Append"
    sendTaskerIntent(i, true);//true = wait for task completion
  }
}

/*
//test data
var tVar = ["%BLUE","%LOCN","%AIR","%LOC","%SCREEN","%WIFI","%GPS"];
var tVar = "%BLUE";
var value = getTaskerVariable(tVar);

//Show the results
var msg = "";
if (typeoff(tVar) == "string") {var tVar = [tVar];}
for (var i = 0; i < value.length; i++) {msg += tVar[i] + ": " + value[i] + "\n";}
alert(msg);//Android.makeNewToast(msg, true).show();
*/
function getTaskerVariable(taskerVar) {
  var typeStr = false;
  if (emptyVariable(taskerVar)) {return null;}
  if (typeoff(taskerVar) != "array" && typeoff(taskerVar) != "string") {return null;}
  if (typeoff(taskerVar) == "string") {var taskerVar = [taskerVar]; typeStr = true;}
  // Configuration
  //var taskerVar  = ["%BLUE","%LOCN","%AIR","%LOC","%SCREEN","%WIFI","%GPS"];
  var intent     = ["net.tasker.SHARE_VAR"];
  var taskerTask = "Tasker Share Variable";
  // End Configuration

  //"value" is set to null and "key" is set to "var_0", "var_1",... matching the taskerVar length
  var key = []; var value = []; for (var i = 0; i < taskerVar.length; i++) {key.push("var_" + i); value.push(null);}

  //Tasker Status is check, no need to perform any Tasker process if Tasker is not enabled
  //--for some reason "TaskerIntent.Status.OK" don't works for me, but the string check does
  //if(TaskerIntent.testStatus(context).equals(TaskerIntent.Status.OK)){}
  if (taskerStatus != "OK") {
    Android.makeNewToast("Tasker status: " + taskerStatus, true).show();
    if (typeStr) {return value[0];} else {return value;}
  } else {
    //Android.makeNewToast(taskerStatus + " | " + "enabled",true).show();

    //bind the classes
    LL.bindClass("android.content.IntentFilter");
    LL.bindClass("android.content.BroadcastReceiver");

    //The Broadcast Receiver is set, based on the intent/s provided
    //--more than one intent can be set to be received, but we are only sending the first one, and expecting to receive the same back
    //Once the intent is received, the keys are checked and the value is retrieved
    //--if the value retrieved matches the literal variable (%LOCN was asked and %LOCN was received, instead of a lat,lon), then the value gets reset to the default (null)
    //--the receiver gets closed when the lastKey is matched
    var receiver = new JavaAdapter(BroadcastReceiver, {
      onReceive:function(c, i) { //context, intent //android.content.ContextWrapper
        var lastKey = 0;
        var e = i.getExtras();
        for (var i = 0; i < key.length; i++) {
          if (e.containsKey(key[i])) {value[i] = e.get(key[i]); lastKey = i;}
          if (value[i] == taskerVar[i]) {value[i] = null;}
        }
        lastKey++;
        if (lastKey == key.length) {try {if (receiver != null) {context.unregisterReceiver(receiver);}} catch(e) {}}
      }
    });
    context.registerReceiver(receiver, new IntentFilter(intent[0]));
    /*//Code to register multiple intents
    var f = new IntentFilter();
    for(var i=0;i<intent.length;i++){f.addAction(intent[i]);}
    context.registerReceiver(receiver,f);
    */

    //The key:value pairs are combined and stored in the extra array
    //Since Tasker can send only 3 extras at a time, the length of the taskerVar is checked against a multiple of 3, and the extra array gets filled with a key and no variable request
    //--filling the extras is done to prevent calling an undeclared index, when we use extra[j+1], extra[j+2]
    var extra = [];
    var len = Math.min(key.length,taskerVar.length);
    for(var i=0;i<len;i++){extra.push(key[i]+":"+taskerVar[i]);}
    for(var i=0;i<(2-(len-1)%3);i++){extra.push("abc_"+i);}

    for(var j=0;j<key.length;j+=3){
      //The "on the fly" code contains a different task name to prevent Tasker ignoring the next task sent and therefore not getting the requested variables
      //It also contains a wait action, needed to allow the Broadcast Receiver get the intent and process it
      //--I tried to do a setTimeout and LL froze every time
      /*
      //A send intent is attempted "on the fly"
      //--it keeps failing for me, so a perform task "on the fly" does the trick
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
      //A perform task is attempted "on the fly"
      //--this requires a task to be made in Tasker containing:
      //1. Stop, if %par1 and %par2 aren't set
      //2. Set variable "extra" to %par2
      //3. Variable split %extra with "=:=" splitter
      //   --the splitter can be changed, but it must match the extra joiner, using a comma is not recommended because of some Tasker variables return CSV
      //4. Send intent, action=%par1, extras=%extra(1),%extra(2),%extra(3), target=Broadcast Receiver
      var i = new TaskerIntent("share_variable_value" + j);
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

    //Try to stop the receiver again, if for some reason the intent wasn't received and was not stopped at that time
    try {if (receiver != null) {context.unregisterReceiver(receiver);}} catch(e) {}
  }//end if - Tasker status check

  if (typeStr) {return value[0];} else {return value;}
}//end func getTaskerVariable
