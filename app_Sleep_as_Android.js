
var eventt = LL.getEvent();
//var event_dat = eventt.getData();
var event_src = eventt.getSource();
var event_itm = eventt.getItem();
//LL.getEvent().getSource() = "MENU_ITEM" //"I_LONG_CLICK", "C_LONG_CLICK"


if (event_s == "I_CLICK" || event_s == "I_LONG_CLICK") {
  //msgUpdating();
  if (event_s == "I_LONG_CLICK") {json_str = getWeatherData();}
  else {
    var time_a = new Date().getTime();
    var time_b = 0;
    var wx_old = LL.getVariables().getString("weather");
    if (wx_old === null || wx_old === undefined || wx_old === "") {time_b = time_a + refresh_interval + 1000;}
    else {var wx = JSON.parse(wx_old);time_b = wx.upd.time_ms;}
    var time_difference = getTimeDifference(time_a,time_b);
    if (time_difference > refresh_interval) {json_str = getWeatherData();} 
    else {msgShow("Unable to update at this time. \nThe next update will be available in " + Math.floor(Math.abs(time_difference - refresh_interval) / 60000) + " min.");return null;}
  }
  //else {json_str = wx_old;} //fails, unable to parse
}
