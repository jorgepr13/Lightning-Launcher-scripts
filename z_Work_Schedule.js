bindClass("android.widget.Toast");
var context = getActiveScreen().getContext();
//typeoff return: 'Array, Object, String, Date, RegExp, Function, Boolean, Number, Null, Undefined'
function typeoff(elem) {
  return Object.prototype.toString.call(elem).split(/\W/)[2].toLowerCase()
};

function emptyVariable(myVar) {
  return myVar === null || myVar === undefined || myVar === "";
}

function showToast(myMsg, longDuration) {
  if (!emptyVariable(myMsg)) {
    var mDuration = Toast.LENGTH_SHORT;
    if (emptyVariable(longDuration) || typeoff(longDuration) != "boolean") {
      longDuration = false;
    }
    if (longDuration) {
      mDuration = Toast.LENGTH_LONG;
    }
    Toast.makeText(context, myMsg, mDuration).show();
  }
}


/*

Date.prototype.getDay()
Returns the day of the week (0-6) for the specified date according to local time.
0 = Sunday
1 = Monday

Date.prototype.getDate()
Returns the day of the month (1-31) for the specified date according to local time.
*/

//panama schedule, starting on monday
//var schedule = [1,1,0,0,1,1,1,0,0,1,1,0,0,0];
var schedule = ["w", "w", "o", "o", "w", "w", "w", "o", "o", "w", "w", "o", "o", "o"];

var mDate = new Date();
var mDay = mDate.getDay();
var monthDay = mDate.getDate();
//mDay = Number(mDay) + Number(-1);
mDay = mDay - 1;
if (mDay < 0) {
  mDay = 6;
}

var workDay = mDay; // - 1;
//var workDay = 5;

var nextWorkDay = workDay + 1;
if (nextWorkDay >= schedule.length) {
  nextWorkDay = 0;
}

var msg = "mDay/workDay/nextWorkDay/schedule\n";
msg += mDay + "/" + workDay + "/" + nextWorkDay + "/" + schedule.length + "\n";
msg += "mDay: " + mDay + ": " + schedule[mDay] + "\n";
msg += "work: " + workDay + ": " + schedule[workDay] + "\n";
msg += "next: " + nextWorkDay + ": " + schedule[nextWorkDay] + "\n";
msg += "month: " + monthDay + ": " + monthDay % schedule.length + "\n";

if (schedule[workDay] != schedule[nextWorkDay]) {
  if (schedule[nextWorkDay] == "w") {
    enableAlarm();
  } else {
    disableAlarm();
  }
} else {
  msg = "No Change \n" + msg;
}

function enableAlarm() {
  msg = "Enable Alarm \n" + msg;
  //showToast("Enable Alarm " + msg, true);
}

function disableAlarm() {
  msg = "Disable Alarm \n" + msg;
  //showToast("Disable Alarm " + msg, true);
}

showToast(msg, true);



function formatNumber(num, digits) {
  if (isNaN(num) || num == null || num == undefined) {
    return;
  }
  if (isNaN(digits) || digits == null || digits == undefined) {
    return num;
  }

  //convert num to string
  var num = num.toString();
  while (num.length < digits) {
    num = "0" + num;
  }
  num = num.slice(-digits);

  return num;
}

msg += "\n\n";
//var msg = "";
var time = new Date();
msg += formatNumber(time.getFullYear(),4);
msg += formatNumber(time.getMonth()+1,2);
msg += formatNumber(time.getDate(),2);
msg += "_";
msg += formatNumber(time.getHours(),2);
msg += formatNumber(time.getMinutes(),2);
msg += formatNumber(time.getSeconds(),2);

//showToast(msg, true);


msg += "\n\n";
//var msg = "";
var time = new Date();
msg += time.getFullYear();
msg += time.getMonth()+1;
msg += time.getDate();
msg += "_";
msg += time.getHours();
msg += time.getMinutes();
msg += time.getSeconds();

showToast(msg, true);
