/*
want to:
add more weather providers 
add more locations 
use the dialogs to get the ingo

have a menu on long press 
set categories on long press menu 
set/create badges

create my badges
find parent info, location 
get child (badge) info to parent 
show/hide badge on zero 
find the parent and position the badge automatically 
do it if the parent gets moved 

find item by label, by package in app drawer 

have a more direct / easier way to perform modifications to shortcuts 
do something without selecting the parent and it will still be good 

music widget 

shopping list with keep or tasks or business calendar 

category of apps in drop down style 
set categories on long press menu 
recent contacts, phone, whatsapp, Kakao 

icons per category 

drawing class 



badge class

default shortcut

label shortcut


create individual functions passing the item to apply the action to 
-needs check for the type of item passed 




workout timing plan 
*/
/*
function show/hide label (item) {
  var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {
    item.getProperties().edit().setBoolean("s.labelVisibility", true).commit();
  }
}



badges

create my badges
find parent info, location 
get child (badge) info to parent 
show/hide badge on zero 
find the parent and position the badge automatically 
do it if the parent gets moved

var itm = getActiveScreen().getItemById(itmFind[0]);
//var cnt = itm.getParent();
var grd = itm.getProperties().getBoolean("i.onGrid");
var pos = [itm.getPositionX(), itm.getPositionY()];
var cel = itm.getCell();




Item
public Container getParent ()
Returns the container containing this item.

public RectL getCell ()
Returns the cell allocated to this item (only works when attached to the grid).

public float getPositionX ()
Returns
this item X position (only available when the script is not run in background).
public float getPositionY ()
Returns
this item Y position (only available when the script is not run in background).
public PropertySet getProperties ()
Retrieve properties for this item. Please note that modifying properties is expensive and not well suited for item animation.

public String getTag (String id)
Returns the value associated with this item and id. Can be undefined if it has never been set. Using a null id is the same as calling getTag() without argument

See Also
setTag(String, String)

public int getHeight ()
Returns this item view height.

public int getWidth ()
Returns this item view width.

public boolean isVisible ()
Returns true if the item is visible.

See Also
setVisibility(boolean)


*/

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
item class
container class
shortcut class
panel class
folder class

find item
  check by id, by name, provide feedback
  recursive
  used before creating the item
  used for the badges

create my clases based on the shortcut but with my defauts, 
only aplying what I'm going to change

discard the imsges upon applying them, to free up the memory
clear image func
the image can be obtained and applied to another item
*/

/* //colors
0x64ffffff //grey (transparent white)
0xff33b5e5 //blue
0xffffffff //white
0x00000000 //transparent black
*/


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


public boolean  getBoolean (String name) 
public Box  getBox (String name) 
public EventHandler  getEventHandler (String name) 
public float  getFloat (String name) 
public int  getInteger (String name) 
public String  getString (String name) 
*/

//get current container
function makeShortcut(container, name) {
  if (emptyVariable(container) || emptyVariable(name)) {showToast("makeShortcut Error: No container or name were set."); return;}
  item = container.getItemByName(name);
  if (item == null) {
    item = container.addShortcut("", intent, 0, 0); //label, intent, x, y
    item.setName(name);
  }
  return item;
}

function getName(item) {if (emptyVariable(item)) {return;}
  item.getName();
}
function setName(item, name) {if (emptyVariable(item)) {return;}
  if (emptyVariable(name)) {name = "";}
  item.setName(name);
}

function showLabel(item) {if (emptyVariable(item)) {return;}
  var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {item.getProperties().edit().setBoolean("s.labelVisibility", true).commit();}
}
function hideLabel(item) {if (emptyVariable(item)) {return;}
  var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {item.getProperties().edit().setBoolean("s.labelVisibility", false).commit();}
}

// label
function getLabel(item) {if (emptyVariable(item)) {return;}
  var label = ""; var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {label = item.getLabel();}
  return label;
}
function setLabel(item, label) {if (emptyVariable(item)) {return;}
  if (emptyVariable(label)) {label = "";}
  var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {item.setLabel(label, true);}
}

function getLabelSize(item) {if (emptyVariable(item)) {return;}
  var size = 0; var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {size = item.getProperties().getFloat("s.labelFontSize");}
  return size;
}
function setLabelSize(item, size) {if (emptyVariable(item)) {return;}
  if (emptyVariable(size)) {size = 10;}
  var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {item.getProperties().edit().setFloat("s.labelFontSize", size).commit();}
}

function getLabelStyles() {return ["NORMAL", "ITALIC", "BOLD", "BOLD_ITALIC"];}
function getLabelStyle(item) {if (emptyVariable(item)) {return;}
  var style = ""; var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {style = item.getProperties().getString("s.labelFontStyle");}
  return style;
}
function setLabelStyle(item, style) {if (emptyVariable(item)) {return;}
  if (emptyVariable(style)) {style = "NORMAL";}
  var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {item.getProperties().edit().setString("s.labelFontStyle", style).commit();}
}

function getLabelFont(item) {if (emptyVariable(item)) {return;}
  var font = ""; var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {font = item.getProperties().getString("s.labelFontTypeFace");}
  return font;
}
function setLabelFont(item, font) {if (emptyVariable(item)) {return;}
  if (emptyVariable(font)) {font = "";}
  var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {item.getProperties().edit().setString("s.labelFontTypeFace", font).commit();}
}

function getLabelColor(item) {if (emptyVariable(item)) {return;}
  var color = 0xffffffff; var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {color = item.getProperties().getFloat("s.labelFontColor");}
  return color;
}
function setLabelColor(item, color) {if (emptyVariable(item)) {return;}
  if (emptyVariable(color)) {color = 0xffffffff;}
  var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {item.getProperties().edit().setInteger("s.labelFontColor", color).commit();}
}

function getLabelColorFocused(item) {if (emptyVariable(item)) {return;}
  var color = 0xffffffff; var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {color = item.getProperties().getInteger("s.focusColorLabel");}
  return color;
}
function setLabelColorFocused(item, color) {if (emptyVariable(item)) {return;}
  if (emptyVariable(color)) {color = 0xffffffff;}
  var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {item.getProperties().edit().setInteger("s.focusColorLabel", color).commit();}
}

function getLabelColorSelected(item) {if (emptyVariable(item)) {return;}
  var color = 0xffffffff; var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {color = item.getProperties().getInteger("s.selectionColorLabel");}
  return color;
}
function setLabelColorSelected(item, color) {if (emptyVariable(item)) {return;}
  if (emptyVariable(color)) {color = 0xffffffff;}
  var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {item.getProperties().edit().setInteger("s.selectionColorLabel", color).commit();}
}




// icon
function showIcon(item) {if (emptyVariable(item)) {return;}
  var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {item.getProperties().edit().setBoolean("s.iconVisibility", true).commit();}
}
function hideIcon(item) {if (emptyVariable(item)) {return;}
  var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {item.getProperties().edit().setBoolean("s.iconVisibility", false).commit();}
}

function getIconModes() {return ["STANDARD", "REAL", "FULL_SCALE"];}
function getIconMode(item) {if (emptyVariable(item)) {return;}
  var mode = ""; var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {mode = item.getProperties().getString("s.iconSizeMode");}
  return mode;
}
function setIconMode(item, mode) {if (emptyVariable(item)) {return;}
  if (emptyVariable(mode)) {mode = "NORMAL";}
  var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {item.getProperties().edit().setString("s.iconSizeMode", mode).commit();}
}

function getIconScale(item) {if (emptyVariable(item)) {return;}
  var scale = 1; var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {scale = item.getProperties().getFloat("s.iconScale");}
  return scale;
}
function setIconScale(item, scale) {if (emptyVariable(item)) {return;}
  //Default = 100%, you may enlarge or shrink icons by a factor up to 4. Keep in mind that enlarging icons will require much more memory, because the number of pixels is the square of the icon dimension. 
  if (emptyVariable(scale)) {scale = 10;}
  var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {item.getProperties().edit().setFloat("s.iconScale", scale).commit();}
}

function showIconReflection(item) {if (emptyVariable(item)) {return;}
  var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {item.getProperties().edit().setBoolean("s.iconReflection", true).commit();}
}
function hideIconReflection(item) {if (emptyVariable(item)) {return;}
  var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {item.getProperties().edit().setBoolean("s.iconReflection", false).commit();}
}

function getIconReflectionOffset(item) {if (emptyVariable(item)) {return;}
  var offset = 0.3; var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {offset = item.getProperties().getFloat("s.iconReflectionOverlap");}
  return offset;
}
function setIconReflectionOffset(item, offset) {if (emptyVariable(item)) {return;}
  //Default = 30%, the amount of the icon reflection which is drawn under the original icon.
  if (emptyVariable(offset)) {offset = .3;}
  var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {item.getProperties().edit().setFloat("s.iconReflectionOverlap", offset).commit();}
}

function getIconReflectionSize(item) {if (emptyVariable(item)) {return;}
  var size = 1; var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {size = item.getProperties().getFloat("s.iconReflectionSize");}
  return size;
}
function setIconReflectionSize(item, size) {if (emptyVariable(item)) {return;}
	//Default = 100%, controls which parts of the original icon is used to build the mirror.
  if (emptyVariable(size)) {size = 1;}
  var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {item.getProperties().edit().setFloat("s.iconReflectionSize", size).commit();}
}

function getIconReflectionScale(item) {if (emptyVariable(item)) {return;}
  var scale = 1; var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {scale = item.getProperties().getFloat("s.iconReflectionScale");}
  return scale;
}
function setIconReflectionScale(item, scale) {if (emptyVariable(item)) {return;}
	//Default = 100%, enable an additional scale of the mirror effect.
  if (emptyVariable(scale)) {scale = 1;}
  var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {item.getProperties().edit().setFloat("s.iconReflectionScale", scale).commit();}
}

function showIconFilter(item) {if (emptyVariable(item)) {return;}
  //Default: off, reduce scaling artefacts due to one type of icon provided, ie. high resolution only
  var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {item.getProperties().edit().setBoolean("s.iconFilter", true).commit();}
}
function hideIconFilter(item) {if (emptyVariable(item)) {return;}
  var type = item.getType().toLowerCase();
  if (type == "folder" || type == "shortcut") {item.getProperties().edit().setBoolean("s.iconFilter", false).commit();}
}

//item.setDefaultIcon(icon);
//itm.setBoxBackground(img, "ns", true);

//var img = LL.createImage(drawing, -1, -1);
//var bmp = pm.getActivityIcon(myIntent).getBitmap();
//var img = Image.createImage(bmp.getWidth(), bmp.getHeight());
//img.draw().drawBitmap(bmp, 0, 0, null);


/*
public boolean  getBoolean (String name) 
public float  getFloat (String name) 
public int  getInteger (String name) 
public String  getString (String name)

*/



















LLShortcut.prototype.setProperties = function() {
  if (emptyVariable(this.item)) {this.makeShortcut();}
  if (emptyVariable(this.item)) {showToast("set Prop Error: Unable to find the item.", true); return;}
  this.setItemProperties();
  if (emptyVariable(this.label)) {this.item.setLabel(this.pkg_label, true);}
  //this.item.setIntent(this.intent);
  //this.item.setDefaultIcon(this.icon);

  var ed = this.item.getProperties().edit();
  //ed.setBoolean("s.iconVisibility", 	     false);
  ed.setBoolean("s.iconVisibility",       true);
  ed.commit();
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
  //if (emptyVariable(this.pkg) && emptyVariable(this.pkg_label)) {showToast("getAppInfo  Error: Not enough data to find the app.", true); return;}
  if (emptyVariable(this.pkg) && emptyVariable(this.pkg_label)) {return;}
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



////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

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

/*

//item
itm.setBinding("s.label",'$weather_day_name_f0',true);
itm.setBinding("s.label",'var wx_str = $weather;\n' + 'var wx = JSON.parse(wx_str);\n' + 'var wx_fc = wx.fc[' + '0' + '];\n' + 'return wx_fc.date.day;', true);

var ed=itm.getProperties().edit();
ed.setBoolean("i.enabled",false);
ed.setEventHandler("i.tap",		EventHandler.RUN_SCRIPT,my_script.getId());
ed.setEventHandler("i.resumed",	EventHandler.RUN_SCRIPT,my_script.getId());
ed.setEventHandler("i.paused",	EventHandler.RUN_SCRIPT,my_script.getId());
ed.setEventHandler("i.longTap",	EventHandler.RUN_SCRIPT,my_script.getId()+"/long");

ed.setBoolean("i.onGrid", false);
var box = ed.getBox("i.box");
box.setSize("bl,br,bt,bb",0); //border: left,right,top,bottom
box.setSize("pl,pr,pt,pb,ml,mr,mt,mb",0); //padding, margin
box.setAlignment("CENTER","MIDDLE");//h: LEFT,CENTER,RIGHT | v: TOP,MIDDLE,BOTTOM
box.setColor("bt,bl,br,bb","ns",0x00000000);
ed.commit();





ed.setBoolean("s.iconVisibility",false);
ed.setBoolean("s.labelVisibility",true);
ed.setFloat(  "s.labelFontSize",f_sz);
ed.setString( "s.labelFontTypeFace", "font_path");
ed.setString( "s.labelFontStyle","BOLD"); //NORMAL|ITALIC|BOLD|BOLD_ITALIC
ed.setInteger("s.labelFontColor",		0x64ffffff);
ed.setInteger("s.selectionColorLabel",	0xffffffff);
ed.setInteger("s.focusColorLabel",		0xffffffff);
ed.setInteger("s.labelMaxLines",2);




//panel
itm.getProperties().edit().setBoolean("i.onGrid", false).commit();
var ed = itm.getProperties().edit();
var box = ed.getBox("i.box");
box.setSize("bl,br,bt,bb",0);
box.setSize("bl,br,bt,bb",1);
box.setSize("pl,pr,pt,pb,ml,mr,mt,mb",0);
box.setAlignment("CENTER","MIDDLE");
ed.commit();

var ed=itm.getProperties().edit();
var box=ed.getBox("i.box");

//box.setColor("bl,br,bb","ns",0xff33b5e5);
box.setSize("bt",10);
box.setSize("bl,br,bb",10);
ed.commit();

//folder
var fol_i = event_c.addFolder("Weather", 0, 0);
fol_i.setName("weather_fol");
fol_i.setCell(c,r,c+1,r+1,true);
var fol_c = fol_i.getContainer();
set_panel_defaults(fol_i,3,5);
var ed = fol_i.getProperties().edit();
ed.setBoolean("s.iconVisibility",false);

ed.setInteger("f.wW",Math.min(event_c.getWidth(),event_c.getCellHeight()*4));
ed.setInteger("f.wH",event_c.getCellHeight()*4); //ed.setInteger("f.wH",Math.max(event_c.getWidth(),event_c.getCellHeight()*4));
ed.setString("f.wAH","CENTER");	//LEFT|*CENTER*|RIGHT|CUSTOM  //Horizontal alignment
ed.setString("f.wAV","TOP");	//TOP|*CENTER*|BOTTOM|CUSTOM //Vertical alignment
ed.setBoolean("f.titleVisibility",true);

f.wX	int	Read/Write	Position X - Needs alignment set to custom - 0 = defeault
f.wY	int	Read/Write	Position y - Needs alignment set to custom - 0 = defeault
f.wW	int	Read/Write	Size X - 0 = defeault
f.wH	int	Read/Write	Size Y - 0 = defeault

//var box=ed.getBox("f.box");
//box.setColor("c","ns",0xDD000000);
ed.getBox("f.box").setColor("c","ns",0xDD000000);

ed.commit();
//fol_c.getProperties().edit().setInteger("bgColor",0xFF000000).commit();

fol_i.open();


*/
}

/*//container

var cnt = itm.getContainer();
cnt.getProperties().edit().setString("gridPColumnMode","SIZE").setString("gridPRowMode","SIZE").commit();
cnt.getProperties().edit().setInteger("gridPColumnSize",w).setInteger("gridPRowSize",w).commit();
//cnt.getProperties().edit().setInteger("gridPColumnNum", 1).setInteger("gridPRowNum", 5).commit();
fol_c.getProperties().edit().setInteger("bgColor",0xFF000000).commit();

var itm_c=itm.getContainer();
var ed=itm_c.getProperties().edit();
ed.setBoolean("newOnGrid",true);
ed.setBoolean("allowDualPosition",false);
ed.setBoolean("useDesktopSize",false);
ed.setString("scrollingDirection","NONE");
ed.setString("gridPColumnMode","NUM");
ed.setString("gridLColumnMode","NUM");
ed.setString("gridPRowMode","NUM");
ed.setString("gridLRowMode","NUM");
ed.setInteger("gridPColumnNum",col);
ed.setInteger("gridLColumnNum",col);
ed.setInteger("gridPRowNum",row);
ed.setInteger("gridLRowNum",row);
ed.setBoolean("swapItems",true);
ed.commit();

var weather_c = weather_i.getContainer();
weather_c.getProperties().edit().setBoolean("i.enabled", false).commit();



Container properties:
Name	Type	Access	Admissible values
newOnGrid",         true      	boolean 	Read/Write	true/false
allowDualPosition", false     	boolean	Read/Write	true/false
gridPColumnMode",   "AUTO"    	string	Read/Write	AUTO|NUM|SIZE
gridPColumnNum",    1         	int	Read/Write	>0
gridPColumnSize",   1         	int	Read/Write	>0
gridPRowMode",      "AUTO"    	string	Read/Write	AUTO|NUM|SIZE
gridPRowNum",       1         	int	Read/Write	>0
gridPRowSize",      1         	int	Read/Write	>0
gridLColumnMode",   ""        	string	Read/Write	AUTO|NUM|SIZE
gridLColumnNum",    1         	int	Read/Write	>0
gridLColumnSize",   1         	int	Read/Write	>0
gridLRowMode",      ""        	string	Read/Write	AUTO|NUM|SIZE
gridLRowNum",                 	int	Read/Write	>0
gridLRowSize",                	int	Read/Write	>0
gridPL",                      	boolean	Read/Write	true/false
gridLayoutModeHorizontalLineColor",       	int	Read/Write	argb color
gridLayoutModeHorizontalLineThickness",   	float	Read/Write	>=0
gridLayoutModeVerticalLineColor",         	int	Read/Write	argb color
gridLayoutModeVerticalLineThickness",     	float	Read/Write	>=0
gridAbove",                   	boolean	Read/Write	true/false
bgSystemWPScroll",            	boolean	Read/Write	true/false
bgSystemWPWidth",             	int	Read/Write	>0
bgSystemWPHeight",            	int	Read/Write	>0
bgColor",                     	int	Read/Write	argb color
statusBarHide",               	boolean	Read/Write	true/false
statusBarColor",              	int	Read/Write	argb color
navigationBarColor",          	int	Read/Write	argb color
statusBarOverlap",            	boolean	Read/Write	true/false
navigationBarOverlap",        	boolean	Read/Write	true/false
screenOrientation", ""        	string	Read/Write	AUTO|PORTRAIT|LANDSCAPE|SYSTEM
scrollingDirection", ""       	string	Read/Write	AUTO|X|Y|XY|NONE
overScrollMode", ""           	string	Read/Write	DECELERATE|BOUNCE|NONE
noDiagonalScrolling",         	boolean	Read/Write	true/false
pinchZoomEnable",             	boolean	Read/Write	true/false
snapToPages",                 	boolean	Read/Write	true/false
fitDesktopToItems",           	boolean	Read/Write	true/false
autoExit",                    	boolean	Read/Write	true/false
rearrangeItems",              	boolean	Read/Write	true/false
swapItems",                   	boolean	Read/Write	true/false
freeModeSnap",                	string	Read/Write	NONE|CENTER|EDGE|CENTER_EDGE
useDesktopSize",              	boolean	Read/Write	true/false
noScrollLimit",               	boolean	Read/Write	true/false
wrapX",                       	boolean	Read/Write	true/false
wrapY",                       	boolean	Read/Write	true/false
iconPack", ""                 	string	Read/Write	package name or null (see applyIconPack(boolean))
lwpStdEvents",                	boolean	Read/Write	true/false





*/


function LLShortcut() {
  this.intent      = new Intent();
  this.label       = "";
  this.label_size  = 20;
  this.label_color = 0x64ffffff;
  this.font_name   = "";
  this.font_path   = "";
  this.font_style  = ""; //NORMAL|ITALIC|BOLD|BOLD_ITALIC
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
  //if (emptyVariable(this.pkg) && emptyVariable(this.pkg_label)) {showToast("getAppInfo  Error: Not enough data to find the app.", true); return;}
  if (emptyVariable(this.pkg) && emptyVariable(this.pkg_label)) {return;}
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
  if (emptyVariable(this.item)) {showToast("set Prop Error: Unable to find the item.", true); return;}
  this.setItemProperties();
  if (emptyVariable(this.label)) {this.item.setLabel(this.pkg_label, true);}
  //this.item.setIntent(this.intent);
  //this.item.setDefaultIcon(this.icon);

  var ed = this.item.getProperties().edit();
  //ed.setBoolean("s.iconVisibility", 	     false);
  ed.setBoolean("s.iconVisibility",       true);
  ed.setBoolean("s.labelVisibility",      true);
  ed.setFloat(  "s.labelFontSize",	        this.label_size);
  ed.setString( "s.labelFontStyle",      "NORMAL");
  //ed.setString("s.labelFontTypeFace", "font_path");
  ed.setInteger("s.labelFontColor",       this.label_color);
  ed.setInteger("s.selectionColorLabel",  this.label_color);
  ed.setInteger("s.focusColorLabel",      this.label_color);
  ed.commit();
}


//########################
//########################
//########################
function LLPanel() {
  this.pcontainer    = null;
}
LLPanel.prototype = new LLItem();
LLPanel.prototype.getContainer = function() {return this.pcontainer;}
//LLPanel.prototype.setContainer = function(cnt) {if (!emptyVariable(cnt)) {this.pcontainer = cnt;}}

LLPanel.prototype.makePanel = function() {
  if (emptyVariable(this.container) || emptyVariable(this.name)) {showToast("makeShortcut Error: No container or name were set."); return;}
  this.item = this.container.getItemByName(this.name);
  if (this.item == null) {
    this.item = this.container.addPanel(this.position[0], this.position[1], this.size[0], this.size[1]);
    this.item.setName(this.name);
  }
  if (this.item != null) {this.pcontainer = this.item.getContainer();}
}






/*
function draw_circle(itm){
	var drawing = {
		draw: function(context) {
			var canvas = context.getCanvas();
			var itm_w = context.getWidth();
			var itm_h = context.getHeight();
			var itm_sz = Math.min(itm_w,itm_h);
			var stk_w=6;
			var color_end=0x00000000;
			var color_start=0xFF33B5E5;
			canvas.save();

			//var tile_mode=Shader.TileMode.MIRROR;
			//var tile_mode=Shader.TileMode.REPEAT;
			var tile_mode=Shader.TileMode.CLAMP;

      // create a paint object
			var p = new Paint(Paint.ANTI_ALIAS_FLAG);
			p.setStyle(Paint.Style.STROKE); //FILL (default), FILL_AND_STROKE. STROKE
			p.setStrokeWidth(stk_w);



			//p.setShader(new LinearGradient(0, 0, 0, itm_sz/2, color_end, color_start, tile_mode));
			p.setShader(new LinearGradient(0, 0, 0, itm_sz, color_end, color_start, tile_mode));

			canvas.drawCircle(itm_sz/2,itm_sz/2,(itm_sz-stk_w)/2,p);

/*
//arc code

//p.setShader(new LinearGradient(0, (itm_sz-stk_w)/2, 0, 2*itm_sz/3, color_start, color_end, tile_mode));
//canvas.drawArc(new RectF(stk_w, itm_h/3,(itm_w-stk_w), itm_h), -180, 180, true, p);
//canvas.drawOval(new RectF(stk_w, itm_h/2,(itm_w-stk_w), itm_h * 1.5), p);

p.setShader(new LinearGradient(0, (itm_sz-stk_w)*(2/3), 0, itm_sz, color_start, color_end, tile_mode));
canvas.drawOval(new RectF(stk_w, itm_h *(2/3),(itm_w-stk_w), itm_h *(1+2/3)), p);

//p.setShader(new LinearGradient(0, (itm_sz-stk_w)/2, 0, itm_sz, color_start, color_end, tile_mode));
//canvas.drawCircle(itm_w/2,itm_sz *1.5,(itm_sz-stk_w),p);

var myvars = LL.getVariables();
var mytxt = myvars.getString("ll_day_name") + ", " + myvars.getString("ll_month_name") + " " + myvars.getInteger("ll_day");
//var mytxt = myvars.getString("ll_day_name") + ", " + myvars.getString("ll_month_name") + " " + myvars.getInteger("ll_day") + " " + myvars.getInteger("ll_second");
//var mytxt = "Wednesday, September 30";
var myarc = new Path();
myarc.addArc(new RectF(stk_w, itm_h/6,(itm_w-stk_w), itm_h), -180, 180);
var pt = new Paint(Paint.ANTI_ALIAS_FLAG);
pt.setStyle(Paint.Style.FILL_AND_STROKE);
pt.setColor(Color.WHITE);
pt.setTextSize(68);
pt.setTextAlign(Paint.Align.CENTER); //LEFT, RIGHT
pt.setTypeface(Typeface.create(Typeface.DEFAULT, Typeface.BOLD));

//canvas.drawTextOnPath(mytxt.toUpperCase(), myarc, 0, itm_h/4, pt);
canvas.drawTextOnPath(mytxt.toUpperCase(), myarc, 0, itm_h*(7/16), pt);


*/
/*
			canvas.restore();
		}
	};

	var img = LL.createImage(drawing, -1, -1);
	itm.setBoxBackground(img, "ns", true);
}
*/
/*
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;

import android.graphics.RectF;
import android.view.View;

*/



/*
facebook         - com.facebook.katana
messenger         - com.facebook.orca
google+             - com.google.android.apps.plus
hangouts         - com.google.android.talk
instagram         - com.instagram.android
kakao             - com.kakao.talk
kik                 - kik.android
line             - jp.naver.line.android
oovoo             - com.oovoo
skype             - com.skype.raider
snapchat         - com.snapchat.android
tango             - com.sgiggle.production
twitter             - com.twitter.android
whatsapp         - com.whatsapp
maildroid         - com.maildroid.pro
gmail             - com.google.android.gm

Business Calendar     - com.appgenix.bizcal
Contacts +         - com.contapps.android

3C Toolbox         - ccc71.at
chrome             - com.android.chrome
F-Stop Media Gallery - com.fstop.photo
Locus Map         - menion.android.locus.pro
Maps             - com.google.android.apps.maps
Sleep as Android - com.urbandroid.sleep
gentle alarm     - com.mobitobi.android.gentlealarm


Popup Widget     - com.ss.popupWidget
Tasker             - net.dinglisch.android.taskerm
Zooper Widget     - org.zooper.zwpro
*/


//########################
//########################
//########################
// find item > name, id, container
//check container, from current desktop recursive skip container, check all desktops recursive skip prev desktop
//check drawer
//if not found, ask to create it
//return array of items
//will help at the creation, with badges positioning, removal

//var soc = new LLPanel(); soc.setName("social_test"); soc.setPosition(7, 2); soc.setSize(2, 2); soc.makePanel(); soc.setItemProperties();
//soc.create();
//save();

var fb = new LLShortcut(); fb.setName("fb_test"); fb.setLabel("FBx"); fb.setPosition(7, 2); fb.setPkgLabel("Facebook"); //fb.setPkg(""); //fb.getInfo();
//var fb = new LLShortcut(); fb.setContainer(soc.getContainer()); fb.setName("fb_test"); fb.setLabel("FBx"); fb.setPosition(0, 0); fb.setPkgLabel("Facebook"); //fb.setPkg(""); //fb.getInfo();
fb.setLabelSize(30); fb.setProperties();//fb.create();

//var sc = new LLShortcut(); sc.setContainer(soc.getContainer()); sc.setName("sc_test"); sc.setLabel("SCx"); sc.setPosition(0, 1); sc.setPkgLabel("Snapchat"); //sc.setPkg(""); //sc.getInfo();
//sc.setLabelSize(20); sc.create();

//var fbb = fb; fbb.setPosition(8, 2); fbb.create(); //not creating another shortcut 


save();
/*//restart the launcher
bindClass("java.lang.System");
System.runFinalization(); System.exit(0);
*/
