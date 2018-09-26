//import Dialog "class"
try {eval(getScriptByName("class_Dialog").getText());} catch (e) {bindClass("android.widget.Toast");Toast.makeText(getActiveScreen().getContext(), "One of the required scripts couldn't be loaded.\nPlease try again.\n\n" + e, Toast.LENGTH_LONG).show(); return null;}

bindClass("java.io.BufferedReader");
bindClass("java.io.FileReader");
bindClass("java.io.File");

var LLvars, LLlist;
var title = "Variable Editor";
var msg = new dialogMessage();    msg.setId("msg");   msg.setTitleText(title); msg.setButtonPositiveText("OK"); msg.setButtonNegativeText("Cancel");
var chk = new dialogCheckbox();   chk.setId("check"); chk.setTitleText(title); chk.setButtonNeutralText("Select All");
var txt = new dialogTextInput(2); txt.setId("text");  txt.setTitleText(title); txt.setLabelText(["Name", "Value"]); txt.setHintText(["Name", "Value"]); txt.setButtonPositiveText("Save"); txt.setButtonNegativeText("Close"); txt.setButtonNeutralText("Delete"); txt.stayOnClickButtonPositive();
var mnu = new dialogList();       mnu.setId("menu");  mnu.setTitleText(title); mnu.exitOnClick(); mnu.setButtonPositiveText("Add"); mnu.setButtonNegativeText("Exit"); mnu.setButtonNeutralText("Delete Menu");
getLLVars();
mnu.show();

var prevDialog;
function dialogHandler(dialogData) {
  if (emptyVariable(dialogData)) {return;}
  var myDialog = JSON.parse(dialogData);
  //if (emptyVariable(prevDialog)) {prevDialog = myDialog;}

if (myDialog.id == mnu.getId()) {
  if (myDialog.position != -1) {
    var type = getVariables().getType(LLvars.v[myDialog.position].n);
    txt.setLabelText(["Name", "Value [" + type + "]"]);
    txt.setInputText([LLvars.v[myDialog.position].n, LLvars.v[myDialog.position].v]); txt.show(); txt.setLabelText(["Name", "Value"]);
  } else //variable edit
  //if (myDialog.button == Dialog.BUTTON_NEGATIVE) {try {if (receiver != null) {context.unregisterReceiver(receiver);}} catch (e) {alert(e.toString());}} else //exit
  if (myDialog.button == Dialog.BUTTON_POSITIVE) {txt.hideButtonNeutral(); txt.setInputText(["", ""]); txt.show(); txt.showButtonNeutral();} else //create var
  if (myDialog.button == Dialog.BUTTON_NEUTRAL) {chk.show();} //delete menu
} else

if (myDialog.id == txt.getId()) {
  if (!emptyVariable(myDialog.text[0])) {var name = myDialog.text[0]; name = name.trim(); name = name.replace(/\s+/gm, "_"); myDialog.text[0] = name;}
  if (myDialog.button == Dialog.BUTTON_NEGATIVE) {mnu.show();} else
  if (myDialog.button == Dialog.BUTTON_POSITIVE) {if (!emptyVariable(myDialog.text[0])) {msg.setMessage("\nDo you want to SAVE '" + myDialog.text[0] + "'?\n"); msg.show();}} else //save
  if (myDialog.button == Dialog.BUTTON_NEUTRAL) {msg.setMessage("\nDo you want to DELETE '" + myDialog.text[0] + "'?\n"); msg.show();} //delete
} else

if (myDialog.id == chk.getId()) {
  if (myDialog.button == Dialog.BUTTON_NEGATIVE) {mnu.show();} else //close
  if (myDialog.button == Dialog.BUTTON_POSITIVE) { //delete
    if (myDialog.state.indexOf(true) != -1) {
      var itemsChecked = []; for (var i = 0; i < myDialog.state.length; i++) {if (myDialog.state[i]) {itemsChecked.push(LLvars.v[i].n);}}
      msg.setMessage("\nDo you want to DELETE the following variables?\n\n" + itemsChecked.join("\n") + "\n"); msg.show();
    } else {chk.show();}
  } else
  if (myDialog.button == Dialog.BUTTON_NEUTRAL) { //select/deselect all
    var itemsState = [], state = (myDialog.state.indexOf(false) != -1);
    for (var i = 0; i < myDialog.state.length; i++) {itemsState.push(state);}
    chk.setItemsState(itemsState); chk.show();
  }
} else

if (myDialog.id == msg.getId()) {
  if (myDialog.button == Dialog.BUTTON_POSITIVE) {
    if (prevDialog.id == txt.getId()) {
      if (prevDialog.button == Dialog.BUTTON_POSITIVE) {setLLVar(prevDialog.text[0], prevDialog.text[1]);} else
      if (prevDialog.button == Dialog.BUTTON_NEUTRAL) {deleteLLVar(prevDialog.text[0]);}
    } else
    if (prevDialog.id == chk.getId()) {
      if (prevDialog.button == Dialog.BUTTON_POSITIVE) {for (var i = 0; i < prevDialog.state.length; i++) {if (prevDialog.state[i]) {deleteLLVar(LLvars.v[i].n);}}  }
    }
  }

  if (prevDialog.id == chk.getId()) {chk.show();} else
  if (prevDialog.id == txt.getId() && prevDialog.button == Dialog.BUTTON_NEUTRAL) {mnu.show();}
}

  if (!myDialog.exit) {prevDialog = myDialog;}
} //dialogHandler

function getLLVars() {
  save();//force update the file
  LLvars = JSON.parse(read("data/data/net.pierrox.lightning_launcher_extreme/files/variables"));//reads the content of the file
  //var result = (condition) ? (value1) : (value2) ;
  //LLlist = LLvars.v == null?[]:LLvars.v.map(function(a){var txt = a.v; if (txt.length > 100) {txt = txt.substring(0, 100) + " ...";} return a.n + ": '" + txt + "'";}); //extracts the variable names, if any
  if (LLvars.v == null) {LLlist = [];}
  else {LLlist = LLvars.v.map(function(a) {
    var txt = a.v; if (txt.length > 100) {txt = txt.substring(0, 100) + " ...";}
    return a.n + ": '" + txt + "'";
  });}
  mnu.setItems(LLlist); chk.setItems(LLlist);
}
function deleteLLVar(name) { //showToast("Delete:\n" + name );
  if (!emptyVariable(name)) {name = name.trim(); name = name.replace(/\s+/gm, "_"); getVariables().edit().setString(name, null).commit();}
  getLLVars();
}
function setLLVar(name, value) {
  if (emptyVariable(name)) {return;}
  if (!emptyVariable(value)) {value = value.trim();}
  name = name.trim(); name = name.replace(/\s+/gm, "_");
  var gVar = getVariables();
  //showToast("Set:\n" + name + "\n" + varType(value) + " | " + typeoff(value) + " | " + "\n\n" + value, true);
  //var type = gVar.getType(name); //boolean, float, int, String, UNSET
  var type = varTypeVal(value);
  if (type[0] == "boolean") {gVar.edit().setBoolean(name, type[1]).commit();}
  if (type[0] == "float")   {gVar.edit().setFloat(  name, type[1]).commit();}
  if (type[0] == "int")     {gVar.edit().setInteger(name, type[1]).commit();}
  if (type[0] == "string")  {gVar.edit().setString( name, type[1]).commit();}
  getLLVars();
}

function varTypeVal(str) {
  //if (str == "null") {return null;}
  if (!str) {return ["string", ""];}
  var match; str = str.toString();
  match = str.match(/^true$|^false$/); if (match) {return ["boolean", (match[0] == "true")];}
  match = str.match(/^-?\d+\.\d+$/);   if (match) {return ["float",   Number(match[0])];}
  match = str.match(/^-?\d+$/);        if (match) {return ["int",     Number(match[0])];}
  return ["string", str];
}

function read(filePath) {
  var file = new File(filePath);
  var r = new BufferedReader(new FileReader(file));
  var s = "", l;
  while ((l = r.readLine()) != null) {s += (l + "\n");}
  return s.substring(0, s.length - 1);
}