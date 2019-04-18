/*
https://maker.ifttt.com/trigger/{event}/with/key/{api_key}

kitchen_light
bedroom_light
living_room_light
living_room_speakers

*/
//import Dialog and File "class"
try {eval(getScriptByName("class_Dialog").getText());} catch (e) {bindClass("android.widget.Toast");Toast.makeText(getActiveScreen().getContext(), "One of the required scripts couldn't be loaded.\nPlease try again.\n\n" + e, Toast.LENGTH_LONG).show(); return null;}
try {eval(getScriptByName("class_File").getText());} catch (e) {bindClass("android.widget.Toast");Toast.makeText(getActiveScreen().getContext(), "One of the required scripts couldn't be loaded.\nPlease try again.\n\n" + e, Toast.LENGTH_LONG).show(); return null;}

var api_key = getVariables().getString("api_key_webhooks");
var eventt = getEvent();
var event_d = eventt.getData();

//check api key
if (emptyVariable(api_key)) {showToast("You need a WebHooks api key!", true); return;}

//check data
var device = null; var num = 0;
var devices = [["bedroom_light_toggle", "Bedroom light"], ["living_room_light_toggle", "Living room light"], ["living_room_speakers_toggle", "Speakers"], ["kitchen_light_toggle", "Kitchen light"], ["bedroom_light_on", "Bedroom light On"], ["bedroom_light_off", "Bedroom light Off"],["living_room_light_on", "Living room light On"], ["living_room_light_off", "Living room light Off"], ["living_room_speakers_on", "Speakers On"], ["living_room_speakers_off", "Speakers Off"], ["kitchen_light_on", "Kitchen light On"], ["kitchen_light_off", "Kitchen light Off"]];
var mnu = new dialogList(); mnu.setId("menu"); mnu.setTitleText("Select a device"); mnu.exitOnClick(); mnu.hideButtonPositive(); mnu.hideButtonNegative(); mnu.hideButtonNeutral();

//if (emptyVariable(event_d)) {showToast("You need to pass an event data!", true); return;}
if (!emptyVariable(event_d)) {device = event_d; runEvent();}
else {
  //prepare a list of devices to show on a prompt
  var lst = [];
  for (var i = 0; i < devices.length; i++) {lst.push(devices[i][1]);}
  mnu.setItems(lst); mnu.show();
}

function runEvent(){
//run the event
  var result = readWebStream("https://maker.ifttt.com/trigger/" + device + "/with/key/" + api_key);
  showToast(result, true);
}

function dialogHandler(dialogData){
  if (emptyVariable(dialogData)) {return;}
  var myDialog = JSON.parse(dialogData);

  if (myDialog.id == mnu.getId()) {
    if (myDialog.position != -1) {
      device = devices[myDialog.position][0];
      runEvent();
    }
  }

} //dialogHandler