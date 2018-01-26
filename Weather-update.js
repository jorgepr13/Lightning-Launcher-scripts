/*
need support for multiple locations, providers
*/
var refresh_interval = 20 * 60000; //ms, = min * 60s * 1000ms
var weather_api_key = "e000fb1333b830be";
//var weather_loc = "47.0332559,-122.7967021";
//var weather_loc = $location_gps;
var weather_loc = LL.getVariables().getString("location_net");
var eventt = LL.getEvent();
//var event_d = eventt.getData();
var event_s = eventt.getSource();
var event_i = eventt.getItem();
//LL.getEvent().getSource() = "MENU_ITEM" //"I_LONG_CLICK", "C_LONG_CLICK"
//http://www.lightninglauncher.com/scripting/reference/api/reference/net/pierrox/lightning_launcher/script/api/Event.html

//prevent android.os.NetworkOnMainThreadException
LL.bindClass("android.os.StrictMode");
StrictMode.setThreadPolicy(new StrictMode.ThreadPolicy.Builder().permitAll().build());

//import readWebStream classes
LL.bindClass("java.net.URL");
LL.bindClass("java.net.HttpURLConnection");
LL.bindClass("java.io.BufferedInputStream");

//import readStream classes
LL.bindClass("java.io.BufferedReader");
LL.bindClass("java.io.InputStreamReader");
LL.bindClass("java.io.FileInputStream");
LL.bindClass("java.lang.StringBuilder");

var context = getActiveScreen().getContext();
bindClass("android.widget.Toast");

/*
need to check the var time updated against the time clicked
if more than 10 min has passed,then update the weather,
otherwise, get the variable and refresh it, just in case that it was manually modified
*/
//need to add hourly to the weather object
//need to get/change the data based on the hourly data vs constantly getting the data from the internet, 
// ^last update time will remain
// ^control to update the data will remain
// ^can be done changing the cur variable
// ^checking the current time vs the hourly time and doing the halfs hour changes; ex curr time 11:30, data will change to 12:00, until curr time gets to 12:30
function msgShow(msg,flag){
    if (msg == null || msg == undefined || msg == "") {return 1;}
    if (flag == null || flag == undefined || flag == "" || isNaN(flag)) {flag = false;}
    if (flag == 1) {flag = true;}
    if (typeoff(flag) == "boolean") {
    Android.makeNewToast(msg,flag).show();
    //var duration = Toast.LENGTH_SHORT; //Toast.LENGTH_LONG
    //var toast = Toast.makeText(context, text, duration)
    //Toast.makeText(context, text, duration).setGravity().show();
    //setGravity(int_Gravity_constant, int_x_offset, int_y_offset);
    //toast.setGravity(Gravity.TOP|Gravity.LEFT, 0, 0);//Gravity.CENTER_VERTICAL
    }
    else {alert(msg);}
    return 0;
}
function msgUpdating(){msgShow("Updating the weather...")}
function msgUpdateOk(){msgShow("Weather update complete.");}
function msgUpdateFailed(){msgShow("The weather could not be obtained.\nTry again later.");}

function getWeatherData(){
    //return readStream("/sdcard/Download/weather.json");
    //return readStream("/storage/emulated/0/Download/weather.json");
    //return readStream("/storage/emulated/0/Download/weather_ak.json");
    //return readStream("/storage/emulated/0/Download/weather_ak2.json");
    //return readWebStream("http://api.wunderground.com/api/" + weather_api_key + "/conditions/forecast10day/q/" + weather_loc + ".json");
    return readWebStream("http://api.wunderground.com/api/" + weather_api_key + "/conditions/hourly/forecast10day/q/" + weather_loc + ".json");
} 

var json_str = null;
var json_obj = null;

if (event_s == "I_CLICK" || event_s == "I_LONG_CLICK") {
  //msgUpdating();
  if (event_s == "I_LONG_CLICK") {json_str = getWeatherData();}
  else {
    var time_a = new Date().getTime();
    var time_b = 0;
    var wx_old = LL.getVariables().getString("weather");
    if (wx_old == null || wx_old == undefined || wx_old == "") {time_b = time_a + refresh_interval + 1000;}
    else {var wx = JSON.parse(wx_old); time_b = wx.upd.time_ms;}
    var time_difference = getTimeDifference(time_a, time_b);
    if (time_difference > refresh_interval) {json_str = getWeatherData();} 
    else {msgShow("Unable to update at this time. \nThe next update will be available in " + Math.floor(Math.abs(time_difference - refresh_interval) / 60000) + " min."); return null;}
  }
  //else {json_str = wx_old;} //fails, unable to parse
}

if (json_str == null || json_str == undefined) {msgUpdateFailed(); return null;}

//check the weather data object
json_obj = JSON.parse(json_str);
if (json_obj == null || typeof json_obj == "undefined") {msgUpdateFailed(); return null;}

//check for a weather data object value
try {var time = json_obj.current_observation.observation_epoch;} 
catch (e) {msgUpdateFailed(); return null;}

//check the value
if (time == null || time == undefined) {msgUpdateFailed(); return null;}


//0 = current
//1+ = forecast days, 1 will be day 1, which is the same as current day.

//define weather structure, default for current weather
var wx = {};
wx.upd = {};
wx.upd.time = "";
wx.upd.time_ms = 0;
wx.loc = "";

wx.temp = {};
wx.temp.unit = "°F";
wx.temp.icon = {};
wx.temp.icon.txt = "";
wx.temp.icon.path = "";

wx.wind = {};
wx.wind.unit = "mph";
wx.wind.icon = {};
wx.wind.icon.txt = "";
wx.wind.icon.path = "";

wx.rain = {};
wx.rain.unit = "in";
wx.rain.icon = {};
wx.rain.icon.txt = "";
wx.rain.icon.path = "";

wx.snow = {};
wx.snow.unit = "in";
wx.snow.icon = {};
wx.snow.icon.txt = "";
wx.snow.icon.path = "";

wx.humid = {};
wx.humid.unit = "%";
wx.humid.icon = {};
wx.humid.icon.txt = "";
wx.humid.icon.path = "";

var i = -1;
wx.fc = [];
wx.fc[i+1] = {};
var wx_fc = wx.fc[i+1];

wx_fc.date = {};
wx_fc.date.time_ms = 0;
wx_fc.date.day = "";
wx_fc.date.date = "";

wx_fc.cond = {};
wx_fc.cond.txt = "";
wx_fc.cond.icon = {};
wx_fc.cond.icon.name = "";
wx_fc.cond.icon.txt = "";
wx_fc.cond.icon.path = "";

wx_fc.temp = {};
wx_fc.temp.min = 0;
wx_fc.temp.max = 0;

wx_fc.wind = {};
wx_fc.wind.min = 0;
wx_fc.wind.max = 0;
wx_fc.wind.deg = 0;
wx_fc.wind.dir = "";

wx_fc.rain = {};
wx_fc.rain.min = 0;
wx_fc.rain.max = 0;

wx_fc.snow = {};
wx_fc.snow.min = 0;
wx_fc.snow.max = 0;

wx_fc.humid = {};
wx_fc.humid.min = 0;
wx_fc.humid.max = 0;
//end of weather structure

//getting Weather Underground values
wx.loc = json_obj.current_observation.display_location.full;
//json_obj.current_observation.display_location.full;
//json_obj.current_observation.display_location.city;

wx.upd.time_ms = json_obj.current_observation.observation_epoch * 1000;
//var dt = new Date(wx.upd.time_ms)
wx.upd.time = getDateYYYYMMDD(wx.upd.time_ms, "/") + " " + getTimeHHMMSS(wx.upd.time_ms, ":");
//wx.upd.time = json_obj.current_observation.observation_time;
//json_obj.current_observation.observation_time;
//json_obj.current_observation.observation_epoch;

//get forecast values
for (i = 0; i < json_obj.forecast.simpleforecast.forecastday.length; i++) {
    wx.fc[i+1] = {};
    var wx_fc = wx.fc[i+1];
    
    wx_fc.date = {};
    wx_fc.date.time_ms = json_obj.forecast.simpleforecast.forecastday[i].date.epoch*1000;
    wx_fc.date.day = json_obj.forecast.simpleforecast.forecastday[i].date.weekday_short.substr(0,3);
    wx_fc.date.date = getDateMMDD(wx_fc.date.time_ms, "/");
    //wx_fc.date.date = json_obj.forecast.simpleforecast.forecastday[i].date.month + "" + json_obj.forecast.simpleforecast.forecastday[i].date.day; //needs format 1 to 01
    
    wx_fc.cond = {};
    wx_fc.cond.txt = json_obj.forecast.simpleforecast.forecastday[i].conditions;
    wx_fc.cond.icon = {};
    wx_fc.cond.icon.name = json_obj.forecast.simpleforecast.forecastday[i].icon;
    wx_fc.cond.icon.txt = "";
    wx_fc.cond.icon.path = "";
    
    wx_fc.temp = {};
    wx_fc.temp.min = getNumber(json_obj.forecast.simpleforecast.forecastday[i].low.fahrenheit);
    wx_fc.temp.max = getNumber(json_obj.forecast.simpleforecast.forecastday[i].high.fahrenheit);
    //wx_fc.temp.txt = wx_fc.temp.min + "/" + wx_fc.temp.max + wx.temp.unit;
    
    wx_fc.wind = {};
    wx_fc.wind.min = Math.min(getNumber(json_obj.forecast.simpleforecast.forecastday[i].avewind.mph), getNumber(json_obj.forecast.simpleforecast.forecastday[i].maxwind.mph));
    wx_fc.wind.max = Math.max(getNumber(json_obj.forecast.simpleforecast.forecastday[i].avewind.mph), getNumber(json_obj.forecast.simpleforecast.forecastday[i].maxwind.mph));
    wx_fc.wind.deg = getNumber(json_obj.forecast.simpleforecast.forecastday[i].avewind.degrees);
    wx_fc.wind.dir = getCardinalZones(wx_fc.wind.deg);
    //wx_fc.wind.dir = json_obj.forecast.simpleforecast.forecastday[i].avewind.dir;
    //wx_fc.wind.txt = wx_fc.wind.min + "/" + wx_fc.wind.max + " " + wx.wind.unit;
    if (wx_fc.wind.min < 0) {wx_fc.wind.min = 0;}
    
    wx_fc.rain = {};
    wx_fc.rain.min = Math.min(getNumber(json_obj.forecast.simpleforecast.forecastday[i].qpf_allday.in), getNumber(json_obj.forecast.simpleforecast.forecastday[i].qpf_day.in), getNumber(json_obj.forecast.simpleforecast.forecastday[i].qpf_night.in));
    wx_fc.rain.max = Math.max(getNumber(json_obj.forecast.simpleforecast.forecastday[i].qpf_allday.in), getNumber(json_obj.forecast.simpleforecast.forecastday[i].qpf_day.in), getNumber(json_obj.forecast.simpleforecast.forecastday[i].qpf_night.in));
    if (wx_fc.rain.min < 0) {wx_fc.rain.min = 0;}
    
    wx_fc.snow = {};
    wx_fc.snow.min = Math.min(getNumber(json_obj.forecast.simpleforecast.forecastday[i].snow_allday.in), getNumber(json_obj.forecast.simpleforecast.forecastday[i].snow_day.in), getNumber(json_obj.forecast.simpleforecast.forecastday[i].snow_night.in));
    wx_fc.snow.max = Math.max(getNumber(json_obj.forecast.simpleforecast.forecastday[i].snow_allday.in), getNumber(json_obj.forecast.simpleforecast.forecastday[i].snow_day.in), getNumber(json_obj.forecast.simpleforecast.forecastday[i].snow_night.in));
    if (wx_fc.snow.min < 0) {wx_fc.snow.min = 0;}
    
    wx_fc.humid = {};
    wx_fc.humid.min = Math.min(getNumber(json_obj.forecast.simpleforecast.forecastday[i].minhumidity),getNumber(json_obj.forecast.simpleforecast.forecastday[i].avehumidity),getNumber(json_obj.forecast.simpleforecast.forecastday[i].maxhumidity));
    wx_fc.humid.max = Math.max(getNumber(json_obj.forecast.simpleforecast.forecastday[i].minhumidity),getNumber(json_obj.forecast.simpleforecast.forecastday[i].avehumidity),getNumber(json_obj.forecast.simpleforecast.forecastday[i].maxhumidity));
    if (wx_fc.humid.min < 0) {wx_fc.humid.min = 0;}
	
}

//get current values
wx.fc[0] = {};
var wx_fc = wx.fc[0];

wx_fc.date = {};
wx_fc.date.time_ms = wx.upd.time_ms;
wx_fc.date.day = wx.fc[1].date.day;
wx_fc.date.date = wx.fc[1].date.date;

wx_fc.cond = {};
wx_fc.cond.txt = json_obj.current_observation.weather;
wx_fc.cond.icon = {};
wx_fc.cond.icon.name = json_obj.current_observation.icon;
wx_fc.cond.icon.txt = "";
wx_fc.cond.icon.path = "";

wx_fc.temp = {};
//wx.temp.cur = getNumber(json_obj.current_observation.temp_f);
wx_fc.temp.cur = getNumber(json_obj.current_observation.feelslike_f);
wx_fc.temp.min = wx.fc[1].temp.min;
wx_fc.temp.max = wx.fc[1].temp.max;

wx_fc.wind = {};
wx_fc.wind.cur = getNumber(json_obj.current_observation.wind_mph);
//alert(json_obj.current_observation.wind_mph + "\n" + getNumber(json_obj.current_observation.wind_mph));
wx_fc.wind.min = wx.fc[1].wind.min;
wx_fc.wind.max = wx.fc[1].wind.max;
wx_fc.wind.deg = getNumber(json_obj.current_observation.wind_degrees);
//wx_fc.wind.dir = json_obj.current_observation.wind_dir;
wx_fc.wind.dir = getCardinalZones(wx_fc.wind.deg);

wx_fc.rain = {};
wx_fc.rain.cur = getNumber(json_obj.current_observation.precip_today_in);
wx_fc.rain.min = wx.fc[1].rain.min;
wx_fc.rain.max = wx.fc[1].rain.max;

wx_fc.snow = {};
wx_fc.snow.cur = wx.fc[1].snow.max;
wx_fc.snow.min = wx.fc[1].snow.min;
wx_fc.snow.max = wx.fc[1].snow.max;

wx_fc.humid = {};
wx_fc.humid.cur = getNumber(json_obj.current_observation.relative_humidity);
wx_fc.humid.min = wx.fc[1].humid.min;
wx_fc.humid.max = wx.fc[1].humid.max;
//needs % removed from value


var wx_str = JSON.stringify(wx, null, '  ');

//alert(wx_str);


//write the updated weather to the variable
if (wx_str != LL.getVariables().getString("weather") && wx.upd.time_ms != 0) {LL.getVariables().edit().setString("weather", wx_str).commit();}

//write the updated weather to the script tag
//if (wx_str != LL.getCurrentScript().getTag() && wx.upd.time_ms != 0) {LL.getCurrentScript().setTag(wx_str)};

/*
//create bindings
var wx_str = LL.getCurrentScript().getTag();                 //not self update
var wx_str = LL.getScriptByName("Weather_Update").getTag();  //not self update
var wx_str = LL.getVariables().getString("weather");         //not self update
var wx_str = $weather; //yes, self update

itm.setBinding("s.label",
'var wx_str = $weather;\n' + 
'var wx = JSON.parse(wx_str);\n' + 
'var wx_fc = wx.fc[' + i + '];\n' + 
'return wx_fc.wind.min + "/" + wx_fc.wind.max + " " + wx.wind.unit;'
,true);

*/

msgUpdateOk();

//
//FUNCTIONS
//

function getCardinalZones(degrees, zones) {
    //function checks
    if (isNaN(degrees) || degrees == null || degrees == undefined) {
        //alert("getCardinalZones Error: No number received.");
        console.log("getCardinalZones Error: No number received.");
        return;
    }

    //check for zones type of variable
    if (typeoff(zones) !== "array") {zones = null;}

    //avoid number below 0, or above 360 (using recursion)
    if (degrees < 0) {return getCardinalZones(degrees + 360, zones);}
    if (degrees > 360) {return getCardinalZones(degrees - 360, zones);}

    //set the cardinal zones if they were not given
    if (zones == null || zones == undefined || zones.length == 0) {
        var zones = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    }

    //get the amount of degrees by cardinal zone, then get one half of it, to get half before and half after (assuming that var zones starts from 0 deg)
    var zones_deg = 180 / zones.length; //360/zones.length/2; Default: 180/16 = 11.25 deg

    //get the cardinal zone index
    for (var i = 0; i < zones.length; i++) {
        if (degrees < zones_deg * (1 + 2 * i)) {break;}
    }
    //return 0 if the index was not found in the zones; between the N range ex. 350 and 10.
    if (degrees < 360 && i == zones.length) {i = 0;}
    return zones[i];
    //return zones[zone_i];
}

function get_itm_icon(elem) {
    if (elem == null) {return;} //no element received
    if (json_str == null || json_str == "") {return;} //no file contents
    if (typeof json_obj.fonts.font[0] == "undefined") {return;} //no object
    
    var data = {};
    data.path = "";
    data.icon = "";
    for (i = 0; i < json_obj.fonts.font.length; i++) {
        for (j = 0; j < json_obj.fonts.font[i].element.length; j++) {
            if (json_obj.fonts.font[i].element[j].name.indexOf(elem) != -1) {
                data.path = json_obj.fonts.font[i].path;
                data.icon = json_obj.fonts.font[i].element[j].icon;
                break;
            }
        }
    }
    data = JSON.stringify(data);
    if (typeof data == "undefined" || data == null)  {return;} 
    else {return data;}
}

function get_itm_color(status) {
    if (json_str == null || json_str == "" || json_str == undefined) {return;} //no file contents
    if (typeof json_obj.fonts.colors[0] == "undefined") {return;} //no object
    if (status == null) {status = 0;}
    status = status.toString();
    
    var color = null;
    for (i = 0; i < json_obj.fonts.colors.length; i++) {
        if (json_obj.fonts.colors[i].status.indexOf(status) != -1) {
            color = json_obj.fonts.colors[i].color;
            break;
        }
    }
    return color;
}


//Object.prototype.typeoff = function(elem)
function typeoff(elem) {return Object.prototype.toString.call(elem).split(/\W/)[2].toLowerCase();}


function getNumber(str) {
    if (str == 0) {return 0};
    if (str == null || str == undefined || str == "") {return null;}
    var str = str.toString();
    var myArray = str.match(/-?\d+\.?\d*/g);
    if (myArray) {var myArray = myArray[0]};
    return myArray * 1;
}


function formatNumber(num, digits) {
    if (isNaN(num) || num == null || num == undefined) {
        console.log("formatNumber Error: Wrong number received.");
        return;
    }
    if (isNaN(digits) || digits == null || digits == undefined) {digits = 1};
    
    //convert num to string
    var num = num.toString();
    while (num.length < digits) {num = "0" + num;}
    return num;
}

function checkTime(time, caller) {
    if (caller == null || caller == undefined) {caller = "checkTime"};
    if (time == null || time == undefined || time == "") {
        //console.log(caller + " Error: No time was received.");
        var time = new Date();
    } else {
        //alert(typeof time.getTime);
        //typeof new Date() === 'object';
        if (typeof time.getTime == "undefined") {
            var time = new Date(time);
        }
    }
    return time;
}

function getDateDD(time) {
    time = checkTime(time, "getDateDD");
    return formatNumber(time.getDate(),2);
}

function getDateMM(time) {
    time = checkTime(time, "getDateMM");
    return formatNumber(time.getMonth()+1,2);
}

function getDateYYYY(time) {
    time = checkTime(time, "getDateYYYY");
    return formatNumber(time.getFullYear(),4);
}

function getDateMMDD(time, sep) {
    if (sep == null || sep == undefined) {sep = ""};
    time = checkTime(time, "getDateMMDD");
    return getDateMM(time) + sep + getDateDD(time);
}

function getDateYYYYMMDD(time, sep) {
    if (sep == null || sep == undefined) {sep = ""};
    time = checkTime(time, "getDateYYYYMMDD");
    return getDateYYYY(time) + sep + getDateMM(time) + sep + getDateDD(time);
}

function getTimeHH(time) {
    time = checkTime(time, "getTimeHH");
    return formatNumber(time.getHours(),2);
}

function getTimeMM(time) {
    time = checkTime(time, "getTimeMM");
    return formatNumber(time.getMinutes(),2);
}

function getTimeSS(time) {
    time = checkTime(time, "getTimeSS");
    return formatNumber(time.getSeconds(),2);
}

function getTimeHHMMSS(time, sep) {
    if (sep == null || sep == undefined) {sep = ""};
    time = checkTime(time, "getTimeHHMMSS");
    return getTimeHH(time) + sep + getTimeMM(time) + sep + getTimeSS(time);
}

function getTimeHHMM(time, sep) {
    if (sep == null || sep == undefined) {sep = ""};
    time = checkTime(time, "getTimeHHMMSS");
    return getTimeHH(time) + sep + getTimeMM(time);
}

function getTimeDifference(time_a,time_b) {
    time_a = checkTime(time_a, "getTimeDifference");
    time_b = checkTime(time_b, "getTimeDifference");
    
    //set both times in the same format, (ms)
    time_a = time_a.getTime();
    time_b = time_b.getTime();
    
    //check that numbers were passed and no error occurred
    if (isNaN(time_a) || isNaN(time_b)) {
        alert("timeElapsed Error: Wrong numbers were received.");
        return 0;
    }
    return Math.abs(time_a - time_b);
}


function readWebStream (my_url) {
    if (my_url == null || my_url == undefined || my_url == "") {return null;}

    var conn = null;
    var conn_stream = null;
    var result = null;
    try {
        //conn = new URL(encodeURI(my_url)).openConnection();
        conn = new URL(my_url).openConnection();
        conn.setReadTimeout(20000); //ms, Timeout for reading InputStream
        conn.setConnectTimeout(15000); //ms, Timeout for connection.connect()
        conn.setRequestMethod("GET"); //set HTTP method to GET
        conn.connect(); // Open communications link (network traffic occurs here)
        var responseCode = conn.getResponseCode();
        if (responseCode != HttpURLConnection.HTTP_OK) {
            throw new IOException("HTTP error code: " + responseCode);
        }
        //conn_stream = new BufferedInputStream(conn.getInputStream());
        conn_stream = conn.getInputStream(); //Retrieve the response body as an InputStream.
        if (conn_stream != null) {
            result = readStream(conn_stream); //Converts Stream to String
        }
    } catch (e) {
        msgShow(e + "\n\nNo Internet or site connection!\n*If the error persist, check that you have the necessary permissions.*"); return null;
    } finally {
        if (conn_stream !== null) {conn_stream.close();}
        if (conn != null) {conn.disconnect();}
    }
    return result;
}

function readStream (stream, path) {
    if (stream == null || stream == "" || stream == undefined) {return null;}
    //if (typeoff(stream) == "string") {msgShow("path")} else {msgShow("web")};
    if (typeoff(stream) == "string") {var stream = new FileInputStream(stream);}

    var reader = null;
    try {
        reader = new BufferedReader(new InputStreamReader(stream, "UTF-8"));
        var bld = new StringBuilder();
        var line = "";
        while ((line = reader.readLine()) !== null) {bld.append(line);}
    } catch (e) {
        msgShow(e); return null;
    } finally {
        if (reader != null) {reader.close();}
        if (path != null) {stream.close();}
    }
    return bld.toString();
}
