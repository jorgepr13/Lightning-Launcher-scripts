/*
Creates a forecast "widget"
1st panel = R1xC5, will hold the weather items for 10 days using a 2nd row, not shown but scrollable
2nd panel = R7xC4, will hold the date, conditions, temperature, wind, rain, snow, humidity information
//JSON.
(LL.getScriptTag())


//add checks for existing itm

//reduce the use of variables
add time_epoch to the variables and get everything date and time related based on it (add the code to the binders)



var days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];\n
var mydate=new Date($time + '+ i +' * 24*60*60*1000);\n
return days[mydate.getDay()];

*/
var event = LL.getEvent();
if (event.getItem() != null) {
    alert("Run from empty. \n Do NOT set 'item menu'. \n Only set 'Lightning menu' in script-editor.");
    return;
}

var event_c = event.getContainer();
if (event_c.getId() == 99) {
    alert("Don't run from the app drawer.");
    return;
}

var my_script = LL.getScriptByName("Weather-update");
if (my_script == null) {
    alert("Also install 'Weather-update'.");
    return;
}

//create the folder containing the Weather
var r = 3;
var c = 4;
var fol_i = event_c.addFolder("Weather", 0, 0);
fol_i.setName("weather_fol");
fol_i.setCell(c,r,c+1,r+1,true);
var fol_c = fol_i.getContainer();
set_panel_defaults(fol_i,3,5);
var ed = fol_i.getProperties().edit();
ed.setBoolean("s.iconVisibility",false);
ed.setInteger("f.wW",Math.min(event_c.getWidth(),event_c.getCellHeight()*4));
ed.setInteger("f.wH",event_c.getCellHeight()*4);
//ed.setInteger("f.wH",Math.max(event_c.getWidth(),event_c.getCellHeight()*4));
ed.setString("f.wAH","CENTER");	//LEFT|CENTER|RIGHT|CUSTOM
ed.setString("f.wAV","TOP");	//TOP|CENTER|BOTTOM|CUSTOM
ed.setBoolean("f.titleVisibility",true);

//var box=ed.getBox("f.box");
//box.setColor("c","ns",0xDD000000);
ed.getBox("f.box").setColor("c","ns",0xDD000000);

ed.commit();
//fol_c.getProperties().edit().setInteger("bgColor",0xFF000000).commit();

fol_i.open();



//create the items
var r = 0;
var itm = fol_c.addShortcut("location", new Intent(), 0, 0);
itm.setName("weather_location");
itm.setCell(1,r,3,r+1,true);
set_itm_defaults(itm,12);
//itm.setBinding("s.label",'$weather_loc',true);
itm.setBinding("s.label",'var wx_str = $weather;\n' + 'var wx = JSON.parse(wx_str);\n' + 'return wx.loc;', true);

var itm = fol_c.addShortcut("date", new Intent(),0,0);
itm.setName("weather_update_time");
itm.setCell(3,r,5,r+1,true);
set_itm_defaults(itm);
var ed = itm.getProperties().edit();
ed.setBoolean("i.enabled",true);
ed.setEventHandler("i.tap",		EventHandler.RUN_SCRIPT,my_script.getId());
//ed.setEventHandler("i.resumed",	EventHandler.RUN_SCRIPT,my_script.getId());
//ed.setEventHandler("i.paused",	EventHandler.RUN_SCRIPT,my_script.getId());
ed.setEventHandler("i.longTap",	EventHandler.RUN_SCRIPT,my_script.getId()+"/long");
ed.setInteger("s.labelMaxLines", 2);
ed.commit();
//itm.setBinding("s.label",'"Updated: \\n"+$weather_upd_time',true);
itm.setBinding("s.label",'var wx_str = $weather;\n' + 'var wx = JSON.parse(wx_str);\n' + 'return "Updated:\\n" + wx.upd.time;',true);


//current weather
var weather_i = fol_c.addPanel(0, 0,1,1);
weather_i.setName("weather_current");
weather_i.setCell(0,r,1,r+1,true);
set_panel_defaults(weather_i,7,4)
var weather_c = weather_i.getContainer();
weather_c.getProperties().edit().setBoolean("i.enabled", false).commit();


//create the items
var r=0;
var itm = weather_c.addShortcut("day", new Intent(), 0, 0);
itm.setName("day");
itm.setCell(0,r,2,r+1,true);
set_itm_defaults(itm,12);
//itm.setBinding("s.label",'$weather_day_name_f0',true);
itm.setBinding("s.label",'var wx_str = $weather;\n' + 'var wx = JSON.parse(wx_str);\n' + 'var wx_fc = wx.fc[' + '0' + '];\n' + 'return wx_fc.date.day;', true);

var itm = weather_c.addShortcut("date", new Intent(), 0, 0);
itm.setName("date");
itm.setCell(0,r+1,2,r+2,true);
set_itm_defaults(itm);
//itm.setBinding("s.label",'$weather_date_f0',true);
itm.setBinding("s.label",'var wx_str = $weather;\n' + 'var wx = JSON.parse(wx_str);\n' + 'var wx_fc = wx.fc[' + '0' + '];\n' + 'return wx_fc.date.date;', true);

var itm = weather_c.addShortcut("condition_icon", new Intent(), 0, 0);
itm.setName("condition_icon");
itm.setCell(2,r,4,r+2,true);
set_itm_defaults(itm);
//itm.setBinding("s.label",'$weather_cond_cur',true);
//itm.setBinding("s.label",'$weather_cond_icon_cur',true);
itm.setBinding("s.label",'var wx_str = $weather;\n' + 'var wx = JSON.parse(wx_str);\n' + 'var wx_fc = wx.fc[' + '0' + '];\n' + 'return wx_fc.cond.icon.name;', true);
//itm.getProperties().edit().setString("s.labelFontTypeFace", "font_path").commit();
itm.getProperties().edit().setInteger("s.labelMaxLines", 2).commit();


r=r+2;
var itm = weather_c.addShortcut("temp_icon", new Intent(), 0, 0);
itm.setName("temp_icon");
itm.setCell(0,r,1,r+1,true);
set_itm_defaults(itm);
itm.getProperties().edit().setString("s.label", "T:").commit();
//itm.getProperties().edit().setString("s.labelFontTypeFace", "font_path").commit();

var itm = weather_c.addShortcut("temp_txt", new Intent(), 0, 0);
itm.setName("temp_txt");
itm.setCell(1,r,4,r+1,true);
set_itm_defaults(itm);
//itm.setBinding("s.label",'$weather_temp_cur',true);
itm.setBinding("s.label",'var wx_str = $weather;\n' + 'var wx = JSON.parse(wx_str);\n' + 'var wx_fc = wx.fc[' + '0' + '];\n' + 'return wx_fc.temp.cur + wx.temp.unit;', true);


r=r+1;
var itm = weather_c.addShortcut("wind_icon", new Intent(), 0, 0);
itm.setName("wind_icon");
itm.setCell(0,r,1,r+1,true);
set_itm_defaults(itm);
itm.getProperties().edit().setString("s.label", "W:").commit();
//itm.getProperties().edit().setString("s.labelFontTypeFace", "font_path").commit();

var itm = weather_c.addShortcut("wind_txt", new Intent(), 0, 0);
itm.setName("wind_txt");
itm.setCell(1,r,3,r+1,true);
set_itm_defaults(itm,7);
//itm.setBinding("s.label",'$weather_wind_cur',true);
itm.setBinding("s.label",'var wx_str = $weather;\n' + 'var wx = JSON.parse(wx_str);\n' + 'var wx_fc = wx.fc[' + '0' + '];\n' + 'return wx_fc.wind.cur + " " + wx.wind.unit;', true);

var itm = weather_c.addShortcut("wind_dir_icon", new Intent(), 0, 0);
itm.setName("wind_dir_icon");
itm.setCell(3,r,4,r+1,true);
set_itm_defaults(itm,8);
//itm.getProperties().edit().setString("s.label", "V").commit();
//itm.setBinding("s.label",'$weather_wind_dir_cur',true);
itm.setBinding("s.label",'var wx_str = $weather;\n' + 'var wx = JSON.parse(wx_str);\n' + 'var wx_fc = wx.fc[' + '0' + '];\n' + 'return wx_fc.wind.dir;', true);
//itm.getProperties().edit().setString("s.labelFontTypeFace", "font_path").commit();


r=r+1;
var itm = weather_c.addShortcut("rain_icon", new Intent(), 0, 0);
itm.setName("rain_icon");
itm.setCell(0,r,1,r+1,true);
set_itm_defaults(itm);
itm.getProperties().edit().setString("s.label", "R:").commit();
//itm.getProperties().edit().setString("s.labelFontTypeFace", "font_path").commit();

var itm = weather_c.addShortcut("rain_txt", new Intent(), 0, 0);
itm.setName("rain_txt");
itm.setCell(1,r,4,r+1,true);
set_itm_defaults(itm);
//itm.setBinding("s.label",'$weather_rain_cur',true);
itm.setBinding("s.label",'var wx_str = $weather;\n' + 'var wx = JSON.parse(wx_str);\n' + 'var wx_fc = wx.fc[' + '0' + '];\n' + 'return wx_fc.rain.cur + " " + wx.rain.unit;', true);


r=r+1;
var itm = weather_c.addShortcut("humid_icon", new Intent(), 0, 0);
itm.setName("humid_icon");
itm.setCell(0,r,1,r+1,true);
set_itm_defaults(itm);
itm.getProperties().edit().setString("s.label", "H:").commit();
//itm.getProperties().edit().setString("s.labelFontTypeFace", "font_path").commit();

var itm = weather_c.addShortcut("humid_txt", new Intent(), 0, 0);
itm.setName("humid_txt");
itm.setCell(1,r,4,r+1,true);
set_itm_defaults(itm);
//itm.setBinding("s.label",'$weather_humid_cur',true);
itm.setBinding("s.label",'var wx_str = $weather;\n' + 'var wx = JSON.parse(wx_str);\n' + 'var wx_fc = wx.fc[' + '0' + '];\n' + 'return wx_fc.humid.cur + wx.humid.unit;', true);


	r=r+1;
	var itm = weather_c.addShortcut("snow_icon", new Intent(), 0, 0);
  itm.setName("snow_icon");
	itm.setCell(0,r,1,r+1,true);
	set_itm_defaults(itm);
	itm.getProperties().edit().setString("s.label", "S:").commit();
	//itm.getProperties().edit().setString("s.labelFontTypeFace", "font_path").commit();

	var itm = weather_c.addShortcut("snow_txt", new Intent(), 0, 0);
  itm.setName("snow_txt");
	itm.setCell(1,r,4,r+1,true);
	set_itm_defaults(itm);
	//itm.setBinding("s.label",'$weather_snow_f'+i,true);
	itm.setBinding("s.label",'var wx_str = $weather;\n' + 'var wx = JSON.parse(wx_str);\n' + 'var wx_fc = wx.fc[' + '0' + '];\n' + 'return wx_fc.snow.min + "/" + wx_fc.snow.max + " " + wx.snow.unit;',true);





//create the base panel, where all the forecast will be held
//var base_i = fol_c.addPanel(0,0,fol_c.getWidth()-10,fol_c.getCellHeight());
var base_i = fol_c.addPanel(0,0,1,1);
base_i.setName("weather_forecast");
set_panel_defaults(base_i,2,5)
var base_c = base_i.getContainer();
var r=1;
base_i.setCell(0,r,5,r+2,true);


/*
//the % (modulus) result = 0, indicate the beginning of a new row
var msg=[];
var row=-1;
for (i = 0; i < 25; i++) {
  if (i%5 == 0) {row++;}
  msg.push("i:"+(i)+",%:"+(i)%5+",r:"+row+"  ");
}
alert(msg);
return;
*/

//divide by the number of desired columns, if the number has a decimal, then continue in the same row
//create a counter with the integer number resulting from the above computation, starting with 0
//weather_i.setCell((i-row_stay), 1, ((i-row_stay) + 1), 2,true);


var weather_row=-1;
//forecaste create
for (var i = 0; i < 10; ++i) {
    var j = i + 1;
	//create the item panel, where all the information for a specific day will be held
	var weather_i = base_c.addPanel(0, 0,1,1);
  weather_i.setName("weather_forecast_day" + i);
  set_panel_defaults(weather_i,7,4)
  var weather_c = weather_i.getContainer();
  weather_c.getProperties().edit().setBoolean("i.enabled", false).commit();

  //the % (modulus) result = 0, indicate the beginning of a new row
  if (i%5 == 0) {weather_row++;}
	weather_i.setCell((i-5*weather_row),weather_row, ((i-5*weather_row) + 1),weather_row+1,true);


	//create the items
	var r=0;
	var itm = weather_c.addShortcut("day", new Intent(), 0, 0);
  itm.setName("day");
	itm.setCell(0,r,2,r+1,true);
	set_itm_defaults(itm,12);
	//itm.setBinding("s.label",'$weather_day_name_f'+i,true);
	itm.setBinding("s.label",'var wx_str = $weather;\n' + 'var wx = JSON.parse(wx_str);\n' + 'var wx_fc = wx.fc[' + j + '];\n' + 'return wx_fc.date.day;', true);


	var itm = weather_c.addShortcut("date", new Intent(), 0, 0);
  itm.setName("date");
	itm.setCell(0,r+1,2,r+2,true);
	set_itm_defaults(itm);
	//itm.setBinding("s.label",'$weather_date_f'+i,true);
	itm.setBinding("s.label",'var wx_str = $weather;\n' + 'var wx = JSON.parse(wx_str);\n' + 'var wx_fc = wx.fc[' + j + '];\n' + 'return wx_fc.date.date;', true);

	var itm = weather_c.addShortcut("condition_icon", new Intent(), 0, 0);
  itm.setName("condition_icon");
	itm.setCell(2,r,4,r+2,true);
	set_itm_defaults(itm);
  //itm.setBinding("s.label",'$weather_cond_f'+i,true);
	//itm.setBinding("s.label",'$weather_cond_icon_f'+i,true);
	itm.setBinding("s.label",'var wx_str = $weather;\n' + 'var wx = JSON.parse(wx_str);\n' + 'var wx_fc = wx.fc[' + j + '];\n' + 'return wx_fc.cond.icon.name;', true);
	//itm.getProperties().edit().setString("s.labelFontTypeFace", "font_path").commit();
	itm.getProperties().edit().setInteger("s.labelMaxLines", 2).commit();

	r=r+2;
	var itm = weather_c.addShortcut("temp_icon", new Intent(), 0, 0);
  itm.setName("temp_icon");
	itm.setCell(0,r,1,r+1,true);
	set_itm_defaults(itm);
	itm.getProperties().edit().setString("s.label", "T:").commit();
	//itm.getProperties().edit().setString("s.labelFontTypeFace", "font_path").commit();

	var itm = weather_c.addShortcut("temp_txt", new Intent(), 0, 0);
  itm.setName("temp_txt");
	itm.setCell(1,r,4,r+1,true);
	set_itm_defaults(itm);
	//itm.setBinding("s.label",'$weather_temp_f'+i,true);
	itm.setBinding("s.label",'var wx_str = $weather;\n' + 'var wx = JSON.parse(wx_str);\n' + 'var wx_fc = wx.fc[' + j + '];\n' + 'return wx_fc.temp.min + "/" + wx_fc.temp.max + wx.temp.unit;',true);

	r=r+1;
	var itm = weather_c.addShortcut("wind_icon", new Intent(), 0, 0);
  itm.setName("wind_icon");
	itm.setCell(0,r,1,r+1,true);
	set_itm_defaults(itm);
	itm.getProperties().edit().setString("s.label", "W:").commit();
	//itm.getProperties().edit().setString("s.labelFontTypeFace", "font_path").commit();

	var itm = weather_c.addShortcut("wind_txt", new Intent(), 0, 0);
  itm.setName("wind_txt");
	itm.setCell(1,r,3,r+1,true);
	set_itm_defaults(itm,7);
	//itm.setBinding("s.label",'$weather_wind_f'+i,true);
	itm.setBinding("s.label",'var wx_str = $weather;\n' + 'var wx = JSON.parse(wx_str);\n' + 'var wx_fc = wx.fc[' + j + '];\n' + 'return wx_fc.wind.min + "/" + wx_fc.wind.max + " " + wx.wind.unit;',true);

	var itm = weather_c.addShortcut("wind_dir_icon", new Intent(), 0, 0);
  itm.setName("wind_dir_icon");
	itm.setCell(3,r,4,r+1,true);
	set_itm_defaults(itm,8);
	//itm.getProperties().edit().setString("s.label", "V").commit();
  //itm.setBinding("s.label",'$weather_wind_dir_f'+i,true);
  itm.setBinding("s.label",'var wx_str = $weather;\n' + 'var wx = JSON.parse(wx_str);\n' + 'var wx_fc = wx.fc[' + j + '];\n' + 'return wx_fc.wind.dir;',true);
	//itm.getProperties().edit().setString("s.labelFontTypeFace", "font_path").commit();
/*
	var w = weather_c.getCellWidth();
	var h = weather_c.getCellHeight();
	var x = weather_c.getCellWidth()*(3*5);
	var y = weather_c.getCellHeight()*(r+3);
  Android.makeNewToast("i: "+i+"\nw: "+w+", "+event_c.getWidth()+"\nh: "+h+", "+event_c.getHeight()+"\nx: "+x+"\ny: "+y,false).show();
	if(x/3 < y/r) {
		var w = y/r; var h = y/r;
	} else {
		var w = x/3; var h = x/3;
	}
	itm.getProperties().edit().setBoolean("i.onGrid", false).commit();
	itm.setSize(w, h);
	itm.setPosition(x, y);
	itm.setBinding("t.a",'$weather_wind_dir_f'+i,true);
*/

	r=r+1;
	var itm = weather_c.addShortcut("rain_icon", new Intent(), 0, 0);
  itm.setName("rain_icon");
	itm.setCell(0,r,1,r+1,true);
	set_itm_defaults(itm);
	itm.getProperties().edit().setString("s.label", "R:").commit();
	//itm.getProperties().edit().setString("s.labelFontTypeFace", "font_path").commit();

	var itm = weather_c.addShortcut("rain_txt", new Intent(), 0, 0);
  itm.setName("rain_txt");
	itm.setCell(1,r,4,r+1,true);
	set_itm_defaults(itm);
	//itm.setBinding("s.label",'$weather_rain_f'+i,true);
	itm.setBinding("s.label",'var wx_str = $weather;\n' + 'var wx = JSON.parse(wx_str);\n' + 'var wx_fc = wx.fc[' + j + '];\n' + 'return wx_fc.rain.min + "/" + wx_fc.rain.max + " " + wx.rain.unit;',true);


	r=r+1;
	var itm = weather_c.addShortcut("humid_icon", new Intent(), 0, 0);
  itm.setName("humid_icon");
	itm.setCell(0,r,1,r+1,true);
	set_itm_defaults(itm);
	itm.getProperties().edit().setString("s.label", "H:").commit();
	//itm.getProperties().edit().setString("s.labelFontTypeFace", "font_path").commit();

	var itm = weather_c.addShortcut("humid_txt", new Intent(), 0, 0);
  itm.setName("humid_txt");
	itm.setCell(1,r,4,r+1,true);
	set_itm_defaults(itm);
	//itm.setBinding("s.label",'$weather_humid_f'+i,true);
	itm.setBinding("s.label",'var wx_str = $weather;\n' + 'var wx = JSON.parse(wx_str);\n' + 'var wx_fc = wx.fc[' + j + '];\n' + 'return wx_fc.humid.min + "/" + wx_fc.humid.max + wx.humid.unit;',true);


	r=r+1;
	var itm = weather_c.addShortcut("snow_icon", new Intent(), 0, 0);
  itm.setName("snow_icon");
	itm.setCell(0,r,1,r+1,true);
	set_itm_defaults(itm);
	itm.getProperties().edit().setString("s.label", "S:").commit();
	//itm.getProperties().edit().setString("s.labelFontTypeFace", "font_path").commit();

	var itm = weather_c.addShortcut("snow_txt", new Intent(), 0, 0);
  itm.setName("snow_txt");
	itm.setCell(1,r,4,r+1,true);
	set_itm_defaults(itm);
	//itm.setBinding("s.label",'$weather_snow_f'+i,true);
	itm.setBinding("s.label",'var wx_str = $weather;\n' + 'var wx = JSON.parse(wx_str);\n' + 'var wx_fc = wx.fc[' + j + '];\n' + 'return wx_fc.snow.min + "/" + wx_fc.snow.max + " " + wx.snow.unit;',true);

}

//fol_i.close();
save();
/*
//restart the launcher
bindClass("java.lang.System");
System.runFinalization(); System.exit(0);
*/



function set_panel_defaults(itm,row,col) {
	if (itm === null || row === null || col === null) {return;} //no item received

	var ed=itm.getProperties().edit();
	var box=ed.getBox("i.box");
	box.setColor("bt","ns",0x64ffffff);
	box.setColor("bl,br,bb","ns",0x64ffffff);//0xff33b5e5);
	//box.setSize("bt",10);
	//box.setSize("bl,br,bb",10);
	ed.commit();

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
	if (itm === null || itm === undefined) {return;} //no item received
	if (f_sz === null || f_sz === undefined) {f_sz=9;}
	if (al_x === null || al_x === undefined) {al_x="CENTER";}
	if (al_y === null || al_y === undefined) {al_y="MIDDLE";}
	var ed=itm.getProperties().edit();
	ed.setBoolean("s.iconVisibility",false);
	ed.setBoolean("s.labelVisibility",true);
	ed.setFloat("s.labelFontSize",f_sz);
	ed.setBoolean("i.enabled",false);
	//ed.setString("s.labelFontStyle","BOLD"); //NORMAL|ITALIC|BOLD|BOLD_ITALIC
	//ed.setInteger("s.labelFontColor",		0x64ffffff);
	//ed.setInteger("s.selectionColorLabel",	0xffffffff);
	//ed.setInteger("s.focusColorLabel",		0xffffffff);
	//ed.setInteger("s.labelMaxLines",2);
	var box=ed.getBox("i.box");
	box.setAlignment(al_x,al_y);
	ed.commit();
}

/*
0x64ffffff //grey (transparent white)
0xff33b5e5 //blue
0xffffffff //white
0x00000000 //transparent black
*/


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
