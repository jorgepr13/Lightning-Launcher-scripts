/*
Creates a Home screen - Holo
1st panel=R4xC2, will hold the
2nd panel=RxC1, will hold the

tie the locations for the weather with the time zones, 
add the weather locations to the time zone 
folder, current on top, then created/sorted by greatest first 
name, +x from UTC, DTS 

create the items then use the func finder to apply the theme

change it to categories
social, finance, fitness, educational, tools, coding, media
app tag variable in json , social = [pkg] 
tag handler, check/create the app in the folder/s fol_social
allow containers with multiple categories 

var tag = {[]};
tag[].name = "social"
tag[].item = [];
tag[].item[].label = "";
tag[].item[].pkg = "";
tag[].cont[].id = ;
tag[].cont[].name = "";

show a menu with the current tags, multi select, create tags, tag manager
tag manager, add/removes the apps to the containers (check first), add/remove tags


*/
LL.bindClass("java.io.BufferedReader");
LL.bindClass("java.io.FileReader");
LL.bindClass("java.io.File");

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
var cscreen = getActiveScreen();
var cscript = getCurrentScript();
var context = event_scn.getContext();//var context = cscreen.getContext();
//event_dat = event_dat.toString().toLowerCase();

//var json_str = self.readStream("","/sdcard/_Backup/Fonts/fonts_db.json");
var json_str = read("/sdcard/_Backup/Fonts/fonts_db.json");
//alert(json_str);
var json_obj = JSON.parse(json_str);

//var msg="w: i: "+LL.getCurrentDesktop().getWidth()+", c: "+event_cnt.getWidth()+"\nh: i: "+LL.getCurrentDesktop().getHeight()+", c: "+event_cnt.getHeight();

//alert(msg);
//Android.makeNewToast(msg,false).show();

/*
0x64ffffff //grey (transparent white)
0xff33b5e5 //blue
0xffffffff //white
0x00000000 //transparent black
*/

//addPanel(float x, float y, float width, float height)	
//addShortcut(String label, Intent intent, float x, float y)
//var base = event_c.addPanel(x, y, w, h);
//var itm  = cnt.addShortcut(lbl, new Intent(),x, y);

function make_panel(cnt, name) {
	if (cnt == null || name == "") {
		Android.makeNewToast("Error: No container or panel name were given.",false).show();
		return;
	}
	var itm = cnt.getItemByName(name);
	if (itm == null) {
		var itm = cnt.addPanel(0,0,1,1);
		itm.setName(name);
	}
	return itm;
}

function make_shortcut(cnt,name) {
	if (cnt == null || name == "") {
		Android.makeNewToast("Error: No container or panel name were given.",false).show();
		return;
	}
	var itm = cnt.getItemByName(name);
	if (itm == null) {
		var itm = cnt.addShortcut(name, new Intent(),0, 0);
		itm.setName(name);
	}
	return itm;
}

function set_panel_defaults(itm,row,col) {
	if (itm === null || row === null || col === null) {return;} //no item received
	
	var ed=itm.getProperties().edit();
	var box=ed.getBox("i.box");
	box.setColor("bt,bl,br,bb","ns",0x00000000);
	//box.setColor("bl,br,bb","ns",0xff33b5e5);
	box.setSize("bt",10);
	box.setSize("bl,br,bb",10);
	ed.commit();
	
	//draw_circle(itm);

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
}

function set_itm_defaults(itm,f_sz,al_x,al_y) {
	if (itm === null) {return;} //no item received
	if (f_sz === null) {f_sz=10;}
	if (al_x === null) {al_x="CENTER";}
	if (al_y === null) {al_y="MIDDLE";}
	var ed=itm.getProperties().edit();
	ed.setBoolean("s.iconVisibility",false);
	ed.setBoolean("s.labelVisibility",true);
	ed.setFloat("s.labelFontSize",f_sz);
	ed.setBoolean("i.enabled",false);
	ed.setString("s.labelFontStyle","BOLD"); //NORMAL|ITALIC|BOLD|BOLD_ITALIC
	//ed.setInteger("s.labelFontColor",		0x64ffffff);
	//ed.setInteger("s.selectionColorLabel",	0xffffffff);
	//ed.setInteger("s.focusColorLabel",		0xffffffff);
	//ed.setInteger("s.labelMaxLines",2);
	var box=ed.getBox("i.box");
	box.setAlignment(al_x,al_y);
	ed.commit();
	//setAlignment(String h,String v)
	//h: LEFT,CENTER,RIGHT
	//v: TOP,MIDDLE,BOTTOM
}

function get_itm_icon(elem) {
	if (elem === null) {return;} //no element received
	if (json_str === null || json_str === "") {return;} //no file contents
	if (typeof json_obj.fonts.font[0] == "undefined") {return;} //no object

	var data={};
	data.path="";
	data.icon="";
	for (i = 0; i < json_obj.fonts.font.length; i++) {
		for (j = 0; j < json_obj.fonts.font[i].element.length; j++) {
			if (json_obj.fonts.font[i].element[j].name.indexOf(elem) != -1){
				data.path=json_obj.fonts.font[i].path;
				data.icon=json_obj.fonts.font[i].element[j].icon;
				break;
			}
		}
	}
	data = JSON.stringify(data);
	if (typeof data == "undefined"||data === null)  {
		return;} else {return data;}
}

function get_itm_color(status) {
	if (json_str === null || json_str == "" || json_str == undefined) {return;} //no file contents
	if (typeof json_obj.fonts.colors[0] == "undefined") {return;} //no object
	if (status == null) {status=0;}
	status.toString();
	var color=null;
	for (i = 0; i < json_obj.fonts.colors.length; i++) {
		if (json_obj.fonts.colors[i].status.indexOf(status) != -1){
			color=json_obj.fonts.colors[i].color;
			break;
		}
	}
	return color;
}

/*
//bitmap
function draw_circle(itm){
	var itm_w = itm.getWidth();
	var itm_h = itm.getHeight();
	var itm_sz = Math.min(itm_w,itm_h)/2;
	
	var img = LL.createImage(itm_sz,itm_sz);
	
	//itm.setBoxBackground(img, "ns", true);
	
	// create a paint object bg
	var p = new Paint(Paint.ANTI_ALIAS_FLAG);
	//var p = new Paint();
	//p.setAntiAlias(true);
	p.setStyle(Paint.Style.FILL);
	//p.setStrokeWidth(3);
	//p.setColor(0xAAFFFFFF);
	//p.setColor(0x20FFFFFF);
	p.setColor(0x00000000);
	
	// retrieve the canvas
	var canvas = img.draw();
	canvas.drawRect(0,0,itm_w,itm_h,p);
	canvas.save();
	img.update();
	
	
	var color_end=0x00000000;
	var color_start=0xFF33B5E5;
	//var tile_mode=Shader.TileMode.MIRROR;
	//var tile_mode=Shader.TileMode.REPEAT;
	var tile_mode=Shader.TileMode.CLAMP;
	var stk_w=3;
	
	// create a paint object
	var p = new Paint(Paint.ANTI_ALIAS_FLAG);
	p.setStyle(Paint.Style.STROKE);
	p.setStrokeWidth(stk_w);
	p.setShader(new LinearGradient(0, 0, 0, itm_sz/2, color_end, color_start, tile_mode));
	
	img.draw().drawCircle(itm_sz/2,itm_sz/2,(itm_sz-stk_w)/2,p);
	
	img.save();
	img.update();
	
	itm.setBoxBackground(img, "ns", true);
}
*/

function draw_circle(itm){
	var drawing = {
		draw: function(context) {
			var canvas = context.getCanvas();
			var itm_w = context.getWidth();
			var itm_h = context.getHeight();
			//var itm_sz = Math.min(itm_w,itm_h)/2;
			var itm_sz = Math.min(itm_w,itm_h);
			var stk_w = 6;
			var color_end = 0x00000000;
			var color_start = 0xFF33B5E5;
			//canvas.save();
		
			// create a paint object
			var tile_mode = Shader.TileMode.CLAMP; //var tile_mode = Shader.TileMode.MIRROR; //var tile_mode = Shader.TileMode.REPEAT;
			var p = new Paint(Paint.ANTI_ALIAS_FLAG);
			p.setStyle(Paint.Style.STROKE);
			p.setStrokeWidth(stk_w);
			//p.setShader(new LinearGradient(0, 0, 0, itm_sz/2, color_end, color_start, tile_mode));
			p.setShader(new LinearGradient(0, 0, 0, itm_sz, color_end, color_start, tile_mode));
			
			canvas.drawCircle(itm_sz/2,itm_sz/2,(itm_sz-stk_w)/2,p);
			canvas.save(); canvas.restore();
		}
	};

	var img = Image.createImage(drawing, -1, -1);
	//var img = LL.createImage(drawing, -1, -1);
	itm.setBoxBackground(img, "ns", true);
	
	//itm.setDefaultIcon(img);
	//itm.setCustomIcon(img);
	/*
	var ed = itm.getProperties().edit();
	ed.setBoolean("s.iconVisibility",  true);
	ed.setBoolean("s.labelVisibility", false);
	ed.commit();
	*/
	return img;
}

function draw_semicircle(itm){
	var drawing = {
		draw: function(context) {
			var canvas = context.getCanvas();
			var itm_w = context.getWidth();
			var itm_h = context.getHeight();
			var itm_sz = Math.min(itm_w,itm_h);
			var stk_w=6;
			var color_end=0x00000000;
			var color_start=0xFF33B5E5;
			//canvas.save();
		
			// create a paint object
			//var tile_mode=Shader.TileMode.MIRROR;
			//var tile_mode=Shader.TileMode.REPEAT;
			var tile_mode=Shader.TileMode.CLAMP;
			var p = new Paint(Paint.ANTI_ALIAS_FLAG);
			p.setStyle(Paint.Style.STROKE);
			p.setStrokeWidth(stk_w);
			
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
			pt = new Paint(Paint.ANTI_ALIAS_FLAG); 
			pt.setStyle(Paint.Style.FILL_AND_STROKE);
			pt.setColor(Color.WHITE);
			pt.setTextSize(68);
			pt.setTextAlign(Paint.Align.CENTER); //LEFT, RIGHT
			pt.setTypeface(Typeface.create(Typeface.DEFAULT, Typeface.BOLD));
			
			//canvas.drawTextOnPath(mytxt.toUpperCase(), myarc, 0, itm_h/4, pt);
			canvas.drawTextOnPath(mytxt.toUpperCase(), myarc, 0, itm_h*(7/16), pt);
			canvas.save(); canvas.restore();
		}
	}
	var img = Image.createImage(drawing, -1, -1);
	//var img = Image.createImage(drawing, itm.getWidth()*2, itm.getHeight());
	//var img = LL.createImage(drawing, -1, -1);
	itm.setBoxBackground(img, "ns", true);
	//itm.setBoxBackground(img, "n", true);
	//itm.setIconLayer(img, "b");
	//itm.setDefaultIcon(img);
	//itm.setCustomIcon(img);
	//itm.setImage(img); //only one working besides bg, but img size doesn't gets extended more than 1x1 cell
	//itm.setImage(null);
	/*
	var ed = itm.getProperties().edit();
	ed.setBoolean("s.iconVisibility",  true);
	//ed.setBoolean("s.iconVisibility",  false);
	ed.setBoolean("s.labelVisibility", false);
	ed.commit();
	*/
	return img;
}


/*
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;

import android.graphics.RectF;
import android.view.View;

*/


//
//
// Items below
//
//

//get the smallest dimension of the parent container, between h and w
var pw=event_cnt.getWidth();
var ph=event_cnt.getHeight();
var sd=pw;Math.min(pw,ph);


//Time items
//calculate the w,h,x,y
var w=sd/2;
var h=w;
var x=(pw-w)/2;
var y=(ph/2)-h-ph/32;

//create the base panel
var base_i = make_panel(event_cnt, "HS_time");
base_i.getProperties().edit().setBoolean("i.onGrid",false).commit();
base_i.setSize(w,h);
base_i.setPosition(x,y);
set_panel_defaults(base_i,4,2)
var base_c = base_i.getContainer();
draw_circle(base_i);

//create the items
var r=0;
/*
var itm = make_shortcut(base_c,"holo_time");
itm.setCell(0,r,2,r+4,true);
set_itm_defaults(itm,76,"LEFT","MIDDLE");
draw_circle(itm);
*/
var itm = make_shortcut(base_c,"hours");
itm.setCell(0,r,2,r+4,true);
set_itm_defaults(itm,76,"LEFT","MIDDLE");
//set_itm_defaults(itm,76,"CENTER","MIDDLE");
itm.setBinding("s.label",'$ll_hour24',true);
var ed=itm.getProperties().edit();
var box=ed.getBox("i.box");
box.setSize("pt",-48);
box.setSize("pl",24);
box.setSize("ml",24);
//box.setSize("pl",-32);
ed.commit();

var itm = make_shortcut(base_c,"minutes");
itm.setCell(1,r,2,r+4,true);
//set_itm_defaults(itm,60,"RIGHT","MIDDLE");
set_itm_defaults(itm,60,"LEFT","MIDDLE");
itm.setBinding("s.label",'$ll_minute',true);
//70

var itm = make_shortcut(base_c,"time12");
itm.setCell(1,r+1,2,r+2,true);
set_itm_defaults(itm,20,"LEFT","MIDDLE");
//set_itm_defaults(itm,20,"CENTER","MIDDLE");
itm.setBinding("s.label",'$ll_hour12+""+$ll_minute',true);
itm.getProperties().edit().setInteger("s.labelFontColor",0x70ffffff).commit();
var ed=itm.getProperties().edit();
var box=ed.getBox("i.box");
box.setSize("pb",24);
//box.setSize("pl",18);
//box.setSize("pl",-32);
ed.commit();

r+=3;
var itm = make_shortcut(base_c,"bat_icon");
//itm.getProperties().edit().setString("s.label", "B:").commit();
itm.setLabel("B:", true);
itm.setCell(0,r,1,r+1,true);
set_itm_defaults(itm,20,"RIGHT","TOP");


var itm = make_shortcut(base_c,"bat_level");
itm.setCell(1,r,2,r+1,true);
set_itm_defaults(itm,20,"LEFT","TOP");
itm.setBinding("s.label",'$bat_level+"\%"',true);



//Alarm
//calculate the w,h,x,y
var w=sd/3;
var h=w;
var x=pw/3-w/2-pw/16;
var y=ph/2;

//create the base panel
var base_i = make_panel(event_cnt, "HS_alarm");
base_i.getProperties().edit().setBoolean("i.onGrid",false).commit();
base_i.setSize(w,h);
base_i.setPosition(x,y);
set_panel_defaults(base_i,4,1)
var base_c = base_i.getContainer();
draw_circle(base_i);

//get the alarm icon
var font_path = null;
var elem_icon = null;
var elem_data = get_itm_icon("alarm");
//alert(elem_data);

if (elem_data !== null) {
	var elem=JSON.parse(elem_data);
	elem_icon=elem.icon;
	font_path=elem.path;
} else {elem_icon = "Alarm";}
//alert("icon: "+elem_icon+"\npath: "+font_path);

//create the items
var r=0;
/*
var itm = make_shortcut(base_c,"holo_alarm");
itm.setCell(0,r,1,r+4,true);
//set_itm_defaults(itm,36,"LEFT","MIDDLE");
draw_circle(itm);
*/
var itm = make_shortcut(base_c,"icon");
itm.setLabel(elem_icon, true);
itm.setCell(0,r,1,r+2,true);
set_itm_defaults(itm,38,"CENTER","BOTTOM");
if (font_path !== null) {itm.getProperties().edit().setString("s.labelFontTypeFace", font_path).commit();}
itm.getProperties().edit().setString("s.labelFontStyle","NORMAL").commit();

var itm = make_shortcut(base_c,"time");
itm.setLabel("00:00", true);
itm.setCell(0,r+2,1,r+3,true);
set_itm_defaults(itm,14,"CENTER","MIDDLE");
//itm.setBinding("s.label",'$weather_temp_low_f0+" / "+$weather_temp_hi_f0+" F"',true);



//Weather
//calculate the w,h,x,y
var w=sd/3;
var h=w;
var x=2*pw/3-w/2+pw/16;
var y=ph/2;

//create the base panel
var base_i = make_panel(event_cnt, "HS_weather");
base_i.getProperties().edit().setBoolean("i.onGrid",false).commit();
base_i.setSize(w,h);
base_i.setPosition(x,y);
set_panel_defaults(base_i,4,1)
var base_c = base_i.getContainer();
draw_circle(base_i);
//not working -base_i.getProperties().edit().setEventHandler("i.tap", EventHandler.OPEN_FOLDER,event_cnt.getItemByName("weather_fol").getContainer().getId()).commit();


//create the items
var r=0;
/*
var itm = make_shortcut(base_c,"holo_weather");
itm.setCell(0,r,1,r+4,true);
//set_itm_defaults(itm,36,"LEFT","MIDDLE");
var img = draw_circle(itm);
//itm.setDefaultIcon(img);
itm.setCustomIcon(img);

//var ed = itm.getProperties().edit();
//ed.setBoolean("s.iconVisibility",  true);	//ed.setBoolean("s.iconVisibility",  false);
//ed.setBoolean("s.labelVisibility", false); ed.commit();

//try {itm.setImage(null);} catch (e) {}
*/
var itm = make_shortcut(base_c,"icon");
itm.setCell(0,r,1,r+2,true);
set_itm_defaults(itm,20,"CENTER","BOTTOM");
//itm.setBinding("s.label",'$weather_cond_icon_cur',true);
itm.setBinding("s.label",'var wx_str = $weather;\n' + 'var wx = JSON.parse(wx_str);\n' + 'var wx_fc = wx.fc[' + '0' + '];\n' + 'return wx_fc.cond.icon.name;', true);
//itm.getProperties().edit().setInteger("s.labelMaxLines",2).commit();

var itm = make_shortcut(base_c,"condition");
itm.setCell(0,r+2,1,r+3,true);
set_itm_defaults(itm,14,"CENTER","MIDDLE");
//itm.setBinding("s.label",'$weather_cond_cur',true);
itm.setBinding("s.label",'var wx_str = $weather;\n' + 'var wx = JSON.parse(wx_str);\n' + 'var wx_fc = wx.fc[' + '0' + '];\n' + 'return wx_fc.cond.txt;', true);

var itm = make_shortcut(base_c,"temp");
itm.setCell(0,r+3,1,r+4,true);
set_itm_defaults(itm,14,"CENTER","MIDDLE");
//itm.setBinding("s.label",'$weather_temp_cur',true);
itm.setBinding("s.label",'var wx_str = $weather;\n' + 'var wx = JSON.parse(wx_str);\n' + 'var wx_fc = wx.fc[' + '0' + '];\n' + 'return wx_fc.temp.cur + wx.temp.unit;', true);

var itm = make_shortcut(base_c,"launch");
itm.setLabel("", true);
set_itm_defaults(itm,20,"CENTER","BOTTOM");
var ed=itm.getProperties().edit();
//ed.setBoolean("i.onGrid",false);
ed.setBoolean("i.onGrid",true);
//ed.setEventHandler("i.tap", EventHandler.OPEN_FOLDER,event_cnt.getItemByName("weather_fol").getContainer().getId());
ed.setBoolean("s.labelVisibility",false);
ed.setBoolean("i.enabled",true);
ed.commit();
//itm.setSize(w,h);
//itm.setPosition(x,y);
itm.setCell(0,0,1,4,true);


//Date items
//calculate the w,h,x,y
var w=sd*(2/3);
var h=w/4;
var x=(pw-w)/2;
var y=ph-h;

//create the base panel
var base_i = make_panel(event_cnt, "HS_date");
base_i.getProperties().edit().setBoolean("i.onGrid",false).commit();
base_i.setSize(w,h);
base_i.setPosition(x,y);
set_panel_defaults(base_i,3,1)
var base_c = base_i.getContainer();
draw_semicircle(base_i);

//create the items
/*
var r=0;
var itm = make_shortcut(base_c,"date");
//itm.setCell(0,r,1,r+2,true);
itm.setCell(0,r,1,r+2,true);
//set_itm_defaults(itm,18,"CENTER","MIDDLE");
//set_itm_defaults(itm,76,"CENTER","MIDDLE");
//itm.setBinding("s.label",'$ll_day_name.toUpperCase() + ", " + $ll_month_name.toUpperCase() + " " + $ll_day',true);
draw_semicircle(itm);
*/

//Lightning.save();
save();
/*//restart the launcher
bindClass("java.lang.System");
System.runFinalization(); System.exit(0);
*/

function read(filePath) {
  var file = new File(filePath);
  var r = new BufferedReader(new FileReader(file));
  var s = "", l;
  while ((l = r.readLine()) != null) {s += (l + "\n");}
  return s.substring(0, s.length - 1);
}

