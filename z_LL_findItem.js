//LL_findItem
/*
findItem(string txt [, bool inLL]) 
  Find item by text recursively in the desktop or through all the desktops in LL
  When the 'inLL' flag is set to any other than 'false' or empty, it will look for the item in all desktops
Returns: An array of all the found item Id, or an empty array. 
*/

bindClass("android.widget.Toast");
var context = getActiveScreen().getContext();
//typeoff return: 'Array, Object, String, Date, RegExp, Function, Boolean, Number, Null, Undefined'
function typeoff(elem) {return Object.prototype.toString.call(elem).split(/\W/)[2].toLowerCase()};
function emptyVariable(myVar) {return myVar === null || myVar === undefined || myVar === "";}
function showToast(myMsg, longDuration) {if (!emptyVariable(myMsg)) {var mDuration = Toast.LENGTH_SHORT; if (emptyVariable(longDuration) || typeoff(longDuration) != "boolean") {longDuration = false;} if (longDuration) {mDuration = Toast.LENGTH_LONG;} Toast.makeText(context, myMsg, mDuration).show();}}


//var myItm = "weather_fol"; //
var myItm = "Facebook"; //var myItm = "weather";

//var itmFind = findItem(myItm); //
var itmFind = findItem(myItm, true);

var msg = "\n";
msg += itmFind + "\n";

//var idx = itmFind[0]; //
var idx = itmFind[itmFind.length - 1];
var itm = getActiveScreen().getItemById(idx);
var cnt = itm.getParent();
var grd = itm.getProperties().getBoolean("i.onGrid");
var pos = [itm.getPositionX(), itm.getPositionY()];
var cel = itm.getCell(); //return: [x, y, x + w, y + h] //type: javaobject
var zid = cnt.getItemZIndex(idx); //0 = bottom, 1000+ = top
var dim = [itm.getWidth(), itm.getHeight()];
//*
var itmFind = findItem("counter"); //var itmFind = findItem(myItm, true);
//cnt.setItemZIndex(itmFind[0], 0); //setItemZIndex(int itemId, int index)
cnt.setItemZIndex(itmFind[0], zid + 2); //setItemZIndex(int itemId, int index)
var itm = getActiveScreen().getItemById(itmFind[0]);
//itm.getProperties().edit().setBoolean("i.onGrid", false).commit();
var cdim = [itm.getWidth(), itm.getHeight()];
itm.setPosition(pos[0] + dim[0] - cdim[0] - 10, pos[1] + 10) //setPosition(float x, float y)
//itm.setVisibility(false); //itm.setVisibility(true); 
//*/
msg += "__id: " + idx + "\n";
msg += "grid: " + grd + "\n";
msg += "posi: " + pos + "\n";
msg += "cell: " + cel + "\n";
msg += "cell: " + typeoff(cel) + "\n";
msg += "zidx: " + zid + "\n";

showToast(msg, true);
//alert(msg);

//open a folder
//getActiveScreen().getItemById(itmFind[itmFind.length - 1]).open();
//getActiveScreen().getItemById(itmFind[0]).open();


function findItem(txt, inLL, cnt, found) {
  if (emptyVariable(txt)) {return [];}
  if (emptyVariable(inLL) || !inLL) {inLL = false;} else {return findItemInLL(txt);}
  if (emptyVariable(cnt)) {cnt = getActiveScreen().getCurrentDesktop();}
  if (emptyVariable(found)) {found = [];}
  var itm = cnt.getAllItems(); //in current container, not including sub containers
  var type, name, label;
  for (var i = 0; i < itm.length; i++) {
    type = itm[i].getType().toLowerCase();
    name = itm[i].getName();
    if (name && name.toLowerCase() == txt.toLowerCase()) {found.push(itm[i].getId());} else
    if (type == "folder" || type == "shortcut") {label = itm[i].getLabel();
      if (label && label.toLowerCase() == txt.toLowerCase()) {found.push(itm[i].getId());}
    }
    if (type == "folder" || type == "panel") {found = findItem(txt, inLL, itm[i].getContainer(), found);}
  }
  return found;
}

function findItemInLL(txt) {
  if (emptyVariable(txt)) {return [];}
  var bgscreen = getBackgroundScreen();
  var found = [], dsk = getConfiguration().getAllDesktops();
  for (var i = 0; i < dsk.length; i++) {
    found = findItem(txt, false, bgscreen.getContainerById(dsk[i]), found);
  }
  return found;
}

/*
//var hscreen = getHomeScreen();
//var cscreen = getActiveScreen();
//var bgscreen = getBackgroundScreen();

//var cdsk = getActiveScreen().getCurrentDesktop();
//hscreen.goToDesktop(dsk[i]); findItem(myItm);
//hscreen.goToDesktop(cdsk);

*/
