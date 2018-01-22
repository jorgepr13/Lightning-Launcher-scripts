
//import Tasker functions
//try {eval(getScriptByName("Tasker_Functions").getText());} catch (e) {bindClass("android.widget.Toast");Toast.makeText(getActiveScreen().getContext(), "One of the required scripts couldn't be loaded.\nPlease try again.\n\n" + e, Toast.LENGTH_LONG).show(); return null;}
//bindClass("android.content.pm.PackageManager");
//bindClass("android.content.pm.PackageInfo");

//set main script variables
var eventt = getEvent();
var event_cnt = eventt.getContainer();
var event_scn = eventt.getScreen();
//var event_dat = eventt.getData() || "toggle";
//var event_src = eventt.getSource();
//var event_itm = eventt.getItem();
//var event_time = eventt.getDate();
//var event_scn_x = eventt.getTouchScreenX();
//var event_scn_y = eventt.getTouchScreen();
//var event_cnt_x = eventt.getTouchX();
//var event_cnt_y = eventt.getTouchY();
//var cscreen = getActiveScreen();
//var cscript = getCurrentScript();
var context = event_scn.getContext();//var context = cscreen.getContext();
//event_dat = event_dat.toString().toLowerCase();

bindClass("android.widget.Toast");
//typeoff return: 'Array, Object, String, Date, RegExp, Function, Boolean, Number, Null, Undefined'
function typeoff(elem) {return Object.prototype.toString.call(elem).split(/\W/)[2].toLowerCase()};
function emptyVariable(myVar) {return myVar == null || myVar == undefined || myVar == "";}
function showToast(myMsg, longDuration) {if (!emptyVariable(myMsg)) {var mDuration = Toast.LENGTH_SHORT; if (emptyVariable(longDuration) || typeoff(longDuration) != "boolean") {longDuration = false;} if (longDuration) {mDuration = Toast.LENGTH_LONG;} Toast.makeText(context, myMsg, mDuration).show();}}



/*
var items = [
    [size,"call","Phone","Contacts +","com.contapps.android"],
    [size,"cal","Calendar","label sys (for search)","com.appgenix.bizcal"],
    [size,"txt","Txt","Contacts +","com.contapps.android"],
    [size,"txt_b","Txt","Messages",""]
];

item class
container class
shortcut class
panel class
folder class

*/
var apps;
var pm = context.getPackageManager();

function LLItem() {
  this.item        = null;
  this.container   = event_cnt;
  this.name        = "";
  this.position    = [0, 0]; //x, y
  this.size        = [1, 1]; //w, h
}
LLItem.prototype.getContainer = function() {return this.container;}
LLItem.prototype.setContainer = function(cnt) {if (!emptyVariable(cnt)) {this.container = cnt;}}

LLItem.prototype.getName = function() {return this.name;}
LLItem.prototype.setName = function(name) {if (!emptyVariable(name)) {this.name = name;}}

LLItem.prototype.getPosition = function() {return this.position;}
LLItem.prototype.setPosition = function(x, y) {if (!emptyVariable(x) || !isNaN(x) || !emptyVariable(y) || !isNaN(y)) {this.position = [x, y];}}

LLItem.prototype.getSize = function() {return this.size;}
LLItem.prototype.setSize = function(w, h) {if (!emptyVariable(w) || !isNaN(w) || !emptyVariable(h) || !isNaN(h)) {if (w < 1) {w = 1;} if (h < 1) {w = 1;} this.size = [w, h];}}

LLItem.prototype.setItemProperties = function() {
  if (emptyVariable(this.item)) {showToast("set Prop Error: Unable to find the item.", true); return null;}
  this.item.setName(this.name);
  //this.item.setCell(this.position[0], this.position[1], this.position[0] + this.size[0], this.position[1] + this.size[1], true);
  this.item.setPosition(this.position[0], this.position[1]);
  this.item.setSize(this.size[0], this.size[1]);
}



function LLShortcut() {
  this.intent      = new Intent();
  this.label       = "";
  this.label_size  = 20;
  this.label_color = 0x64ffffff;
  this.font_name   = "";
  this.font_path   = "";
  this.font_style  = "";
  this.icon        = null;
  this.pkg         = "";
  this.pkg_label   = "";
}
LLShortcut.prototype = new LLItem();

LLShortcut.prototype.getInfo = function() {
    var msg = "";
    msg += "item:    " + this.item + "\n";
    msg += "cont:    " + this.container + "\n";
    msg += "name:    " + this.name + "\n";
    msg += "intent:  " + this.intent + "\n";
    msg += "label:   " + this.label + "\n";
    msg += "lbl sz:  " + this.label_size + "\n";
    msg += "lbl cl:  " + this.label_color + "\n";
    msg += "pkg:     " + this.pkg + "\n";
    msg += "pkg lbl: " + this.pkg_label + "\n";
    
    alert(msg);
}

LLShortcut.prototype.getLabel = function() {return this.label;}
LLShortcut.prototype.setLabel = function(label) {if (!emptyVariable(label)) {this.label = label;}}

LLShortcut.prototype.getLabelSize = function() {return this.label_size;}
LLShortcut.prototype.setLabelSize = function(size) {if (!emptyVariable(size) || !isNaN(size)) {this.label_size = size;}}

LLShortcut.prototype.getPkg = function() {return this.pkg;}
LLShortcut.prototype.setPkg = function(pkg) {if (!emptyVariable(pkg)) {this.pkg = pkg;}}

LLShortcut.prototype.getPkgLabel = function() {return this.pkg_label;}
LLShortcut.prototype.setPkgLabel = function(label) {if (!emptyVariable(label)) {this.pkg_label = label;}}

LLShortcut.prototype.getIntent = function() {return this.intent;}
LLShortcut.prototype.setIntent = function(intent) {if (!emptyVariable(intent)) {this.intent = intent;}}

LLShortcut.prototype.getIcon = function() {return this.icon;}
LLShortcut.prototype.setIcon = function(icon) {if (!emptyVariable(icon)) {this.icon = icon;}}

LLShortcut.prototype.create = function() {this.getAppInfo(); this.makeShortcut(); this.setProperties();}
//this.item = makeShortcut(this.container, this.name, this.label, this.intent);}
//shortcut_make_mod(null,this.name,this.size,this.label,this.pkg_label,this.pkg,this.intent);

LLShortcut.prototype.getAppInfo = function() {
  if (emptyVariable(this.pkg) && emptyVariable(this.pkg_label)) {showToast("getAppInfo  Error: Not enough data to find the app.", true); return;}
  if (this.container.getItemByName(this.name) != null) {return;}
  var myIntent = null;
  //var pm = context.getPackageManager();
  if (!emptyVariable(this.pkg)) {
    try {myIntent = pm.getLaunchIntentForPackage(this.pkg);} catch (e) {myIntent = null;}
  } 
  if (!emptyVariable(this.pkg_label) && myIntent == null) {
    var labelLow = this.pkg_label.toLowerCase();
    var pkg_name = [];
    
    var intent = new Intent(Intent.ACTION_MAIN);
    intent.addCategory(Intent.CATEGORY_LAUNCHER);
    if (emptyVariable(apps)) {apps = pm.queryIntentActivities(intent, 0);}
    var len = apps.size();
    for (var j = 0; j < len; j++) {
      var app = apps.get(j);
      var name = app.activityInfo.name;
      var pkg = app.activityInfo.packageName;
      var lbl = app.loadLabel(pm).toLowerCase();
      if (lbl == labelLow) {intent.setClassName(pkg, name); myIntent = intent; break;}
      if (lbl.search(labelLow) != -1) {pkg_name.push([pkg, name]);}
    }
    if (myIntent == null && pkg_name.length > 0) {intent.setClassName(pkg_name[0][0], pkg_name[0][1]); myIntent = intent;}
  }
  if (myIntent != null) {
    var app = pm.queryIntentActivities(myIntent, 0).get(0);
    var bmp = pm.getActivityIcon(myIntent).getBitmap();
    var img = Image.createImage(bmp.getWidth(), bmp.getHeight());
    img.draw().drawBitmap(bmp, 0, 0, null);
    this.intent = myIntent;
    this.pkg_label = app.loadLabel(pm);
    this.pkg = app.activityInfo.packageName;
    this.icon = img;
  }
}

LLShortcut.prototype.makeShortcut = function() {
  if (emptyVariable(this.container) || emptyVariable(this.name)) {showToast("makeShortcut Error: No container or name were set."); return;}
  this.item = this.container.getItemByName(this.name);
  if (this.item == null) {
    this.item = this.container.addShortcut(this.label, this.intent, this.position[0], this.position[1]);
    this.item.setName(this.name);
  }
}

LLShortcut.prototype.setProperties = function() {
  if (emptyVariable(this.item)) {this.makeShortcut();}
  if (emptyVariable(this.item)) {showToast("set Prop Error: Unable to find the item.", true); return null;}
  this.setItemProperties();
  //this.item.setLabel(this.label, true);
  //this.item.setIntent(this.intent);
  this.item.setDefaultIcon(this.icon);
  
  var ed = this.item.getProperties().edit();
  //ed.setBoolean("s.iconVisibility", 	     false);
  ed.setBoolean("s.iconVisibility", 	     true);
  ed.setFloat(  "s.labelFontSize",		       this.label_size);
  ed.setString( "s.labelFontStyle",	     "NORMAL");
  ed.setInteger("s.labelFontColor", 	     this.label_color);
  ed.setInteger("s.selectionColorLabel", 	this.label_color);
  ed.setInteger("s.focusColorLabel", 	    this.label_color);
  ed.commit();
}


//########################
//########################
//########################
function LLPanel() {
  this.item_cnt    = null;
  this.label       = "";
  this.label_size  = 20;
  this.label_color = 0x64ffffff;
  this.font_name   = "";
  this.font_path   = "";
  this.font_style  = "";
  this.icon        = null;
  this.pkg         = "";
  this.pkg_label   = "";
}
LLPanel.prototype = new LLItem();

LLPanel.prototype.getContainer = function() {return this.item_cnt;}
LLPanel.prototype.setContainer = function(cnt) {if (!emptyVariable(cnt)) {this.item_cnt = cnt;}}

LLPanel.prototype.makePanel = function() {
  if (emptyVariable(this.container) || emptyVariable(this.name)) {showToast("makeShortcut Error: No container or name were set."); return;}
  this.item = this.container.getItemByName(this.name);
  if (this.item == null) {
    this.item = this.container.addPanel(this.position[0], this.position[1], this.size[0], this.size[1]);
    this.item.setName(this.name);
  }
  if (this.item != null) {this.item_cnt = this.item.getContainer();}
}






/*
addCustomView (float x, float y)
Create a new custom view using default values.

addFolder (String label, float x, float y)
Create a new empty folder with the default icon and size.
Parameters
label	folder name
x	absolute position (rounded to nearest cell when attached to grid)
y	absolute position (rounded to nearest cell when attached to grid)
Returns the new folder

public PageIndicator addPageIndicator (float x, float y)
Create a new page indicator using default values.

addPanel (float x, float y, float width, float height)
Create a new empty panel. All coordinates are in pixels and rounded to the nearest cell when the item is attached to the grid.
Returns the new panel

addShortcut (String label, Intent intent, float x, float y)
Create a new shortcut with the default icon and size.
Parameters
label	shortcut text
intent	shortcut action, see http://developer.android.com/reference/android/content/Intent.html
x	absolute position (rounded to nearest cell when attached to grid)
y	absolute position (rounded to nearest cell when attached to grid)
Returns the new shortcut

addStopPoint (float x, float y)
Create a new stop point with the default configuration.
Parameters
x	absolute position (rounded to nearest cell when attached to grid)
y	absolute position (rounded to nearest cell when attached to grid)
Returns the new stop point

getType ()
Used to identify the kind of this container.
Returns 'Desktop', or 'Container' for any other type of container (folder, panel).

getType ()
Returns the item type has a text
Returns one of: Shortcut, Folder, Panel, Widget, StopPoint, DynamicText, Unlocker, PageIndicator or Unknown

public Container getParent ()
Returns the parent container for this container, or null if this container is a desktop.

public Container getParent ()
Returns the container containing this item.


*/



//########################
//########################
//########################



var soc = new LLPanel(); soc.setName("social_test"); soc.setPosition(7, 2); soc.setSize(2, 2); soc.makePanel(); soc.setItemProperties();
//soc.create();
save();

//var fb = new LLShortcut(); fb.setName("fb_test"); fb.setLabel("FBx"); fb.setPosition(7, 2); fb.setPkgLabel("Facebook"); //fb.setPkg(""); //fb.getInfo();
var fb = new LLShortcut(); fb.setContainer(soc.getContainer()); fb.setName("fb_test"); fb.setLabel("FBx"); fb.setPosition(0, 0); fb.setPkgLabel("Facebook"); //fb.setPkg(""); //fb.getInfo();
fb.setLabelSize(30); fb.create();

//var sc = new LLShortcut(); sc.setName("sc_test"); sc.setLabel("SCx"); sc.setPosition(8, 2); sc.setPkgLabel("Snapchat"); //sc.setPkg(""); //sc.getInfo();
var sc = new LLShortcut(); sc.setContainer(soc.getContainer()); sc.setName("sc_test"); sc.setLabel("SCx"); sc.setPosition(0, 1); sc.setPkgLabel("Snapchat"); //sc.setPkg(""); //sc.getInfo();
sc.setLabelSize(20); sc.create();



save();
/*
bindClass("java.lang.System");
//restart the launcher
System.runFinalization();
System.exit(0);
*/
