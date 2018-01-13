/*
http://www.lightninglauncher.com/wiki/doku.php?id=script_customviewlog
About the script
Purpose : With this script you can create a log in a custom view which lets you log things. Any errors in your script will also be written to this log
Author : cdfa
Link : https://plus.google.com/100430440392224314007/posts/ht4aZS8LSWg
Version: 1.0.6.3
How to use the script
If you're in the script repository app (you should be) click search and import and chose “logScript”. Tick the “Lightning Menu” box and make sure it says “logScript” on top. (this is very important!! If you really want to name it differently modify the script where is says “if (LL.getCurrentScript().getName() == “logScript”)” and replace logScript with the new name) 
Run this script in a container to set up the log view. If you want to use the log function and automatic error logging put exactly these two lines somewhere in the top of your script:

(copy/paste)
?
1

//function log(){}try{return(function(){var logScript=getScriptByName('logScript');if(logScript){eval('function run(){'+logScript.getText()+'}');return run();}})();}catch(e){alert("At line "+e.lineNumber+": "+e);}//logScriptEnd

(before this gets executed you can't use the log function and errors won't get caught)

usage: log(text, logLevel, replacements..)

Loglevels are accessed through logScript.logLevel. If you need some number or something to be inside the the text you can enter “{}” where the text should be and it will get replaced by the extra argument you passed. So for example:

log(“This {} has id: {}”, logScript.logLevel.NORMAL, item.getType(), item.getId())

will write: This Shortcut had id: 18894.

please report any bugs/feature suggestion in the google plus post

Changelog
1.0.1

Fixed a small bug with linenumbers
1.0.2

Fixed a bug that occured when a script causes the container to reload, because of which logs before then wouldn't be saved and displayed after the reload.
1.0.3

fixed slow writing speed which caused duplicates and wrong order of logs
1.0.4

There is now a clear log button, so you don't have to delete it wherever you are saving it
You can now reduce your whole script to one line without the line that starts this script breaking your script
1.0.5

The logs are now saved on pause of the custom view instead of after the script has finished running. (But for some reason the paused event doesn't get fired when you restart the app, so keep that in mind)
you can now pass replacements to the log function (see above)
Some Errors in the logscript won't cause your script to break anymore.
Be sure to update the line that enables logscript.
1.0.5.1

Small fix for the log getting too big.
You can now run the script from an item to create a custom view with the same dimensions as the item.
1.0.6

Your code isn't executed in eval anymore!
1.0.6.1

Fixed a bug with the script name
1.0.6.2

Fixed a few bugs related to unreachable logfile
1.0.6.3

Fixed date
Things to keep in mind
The log won't catch syntax errors
For some reason the paused event doesn't get fired when you restart the app, so new logs since the last pause won't be saved
logScript
?
*/

/*-----------
put this in script to use logScript
 
function log(){}try{return(function(){var logScript=getScriptByName('logScript');if(logScript){eval('function run(){'+logScript.getText()+'}');return run();}})();}catch(e){alert("At line "+e.lineNumber+": "+e);}/*logScriptEnd*/
//CONFIG
var logScript = {
  //logFilePath: "/storage/sdcard0/LightningLauncher/script/logScriptLog.html"
  logFilePath: "/storage/emulated/0/LightningLauncher/script/logScriptLog.html"
  , lineWrapping: true // might require app restart
  , bgColor: 0xff191919
  , textColors: ["#d0d0d0", "#ee7600"] // the script iterates through these colors with each new "session"
  , logLevel: {
    NORMAL: {
      name: "[NORMAL]"
      , color: "#ffffff"
    }
    , DEBUG: {
      name: "[DEBUG]"
      , color: "#0000ff"
    }
    , ERROR: {
      name: "[ERROR]"
      , color: "#ff0000"
    }
  }
  , defaultLogLevel: "NORMAL"
  , saveMode: true
    // END CONFIG
  , currentScript: getCurrentScript()
  , getScript: function() {
    return this.script = this.script || getScriptByName("logScript");
  }
  , scrollDown: function(sv) {
    sv.post(new Runnable() {
      run: function() {
        sv.fullScroll(ScrollView.FOCUS_DOWN);
      }
    });
  }
  , getCVItem: function() {
    if(!this.cvItem) {
      this.cvItem = getActiveScreen().getAllItemsById(this.getScript().getTag("cvId"))[0];
      if(!this.cvItem) throw new Error("Custom view not found!")
    }
    return this.cvItem
  }
  , getCV: function() {
    if(!this.cv) {
      this.cv = this.getCVItem().getView()
      if(!this.cv) throw new Error("Custom view not loaded!");
    }
    return this.cv
  }
  , getSV: function() {
    if(!this.sv) {
      var cv = this.getCV()
      for(var i = 0; i < cv.getChildCount(); i++) {
        this.sv = cv.getChildAt(i);
        if(this.sv.getTag() == "sv")
          break;
      }
    }
    return this.sv
  }
  , getTV: function() {
    if(!this.tv)
      this.tv = this.getSV().getChildAt(0);
    return this.tv
  }
  , createCVItem: function(c) {
    var script = getCurrentScript();
    var scriptId = script.getId();
    var cv = c.addCustomView(0, 0);
    var prop = cv.getProperties().edit();
    script.setTag("cvId", cv.getId());
    prop.getBox("i.box").setColor("c", "n", logScript.bgColor);
    prop.setString("v.onCreate", scriptId).commit();
    prop.setEventHandler("i.resumed", EventHandler.RUN_SCRIPT, scriptId);
    prop.setEventHandler("i.paused", EventHandler.RUN_SCRIPT, scriptId);
    prop.commit();
    return cv;
  }
  , isTVAvailable: function() {
    try {
      logScript.getTV()
      return true;
    } catch(e) {
      if(e.message != "Custom view not found!" && e.message != "Custom view not loaded!") {
        throw e;
      }
      return false;
    }
  }
};
 
bindClass("java.io.File");
bindClass("java.io.FileWriter");
bindClass("java.io.PrintWriter");
bindClass("java.io.BufferedWriter");
bindClass("android.widget.TextView");
bindClass("android.text.method.ScrollingMovementMethod");
bindClass("android.text.Html");
bindClass("java.io.BufferedReader");
bindClass("java.io.FileReader");
bindClass("android.widget.ScrollView");
bindClass("android.view.View");
bindClass("java.lang.Runnable");
bindClass("android.widget.Button");
bindClass("android.widget.FrameLayout");
bindClass("android.view.Gravity");
 
//function log(text, logLevel /**/ ) {
function log(text, logLevel) {
  logLevel = logLevel || logScript.logLevel[logScript.defaultLogLevel];
 
  for(var i = 2; i < arguments.length; i++) {
    var newText = text.replace("{}", arguments[i]);
    if(newText == text) {
      break;
    } else {
      text = newText;
    }
  }
 
  var date = new Date();
  var logText = "<font color=#add8e6>" + date.getDate() + "-" + (date.getMonth() + 1) +
    "</font>" + " <font color=#ffff00>" + date.toTimeString().slice(0, 8) +
    "</font>" + " <font color=#00ff00>" + logScript.currentScript.getName() + "</font>" +
    " <font color=" + logLevel.color + ">" + logLevel.name + "</font>" + ": " +
    " <font color=" + logScript.textColors[logScript.ind] + ">" + text +
    "</font>";
 
  if(logScript.isTVAvailable()) {
    var tv = logScript.getTV()
    var tvOldLength = tv.length()
    tv.append(Html.fromHtml(logText).append("\n"));
    logScript.scrollDown(logScript.getSV());
    if(logScript.saveMode) {
      var script = logScript.getScript()
      var prevLogInd = script.getTag("prevLogInd") || -1
      var prevLog = JSON.parse(script.getTag("log" + prevLogInd))
      var tvNewLength = tv.length()
      if(prevLog && prevLog[1] == tvOldLength) {
        prevLog[1] = tv.length()
        script.setTag("log" + prevLogInd, JSON.stringify(prevLog));
      } else {
        prevLogInd++
        script.setTag("log" + prevLogInd, JSON.stringify([tvOldLength, tvNewLength]))
        script.setTag("prevLogInd", prevLogInd)
      }
    }
  } else {
    logScript.logText += logText;
  }
}
 
function cleanEval(text) {
  eval('function execute() {' + text + '}');
  execute();
}
 
return(function() {
  function read(filePath) {
    try {
      var r = new BufferedReader(new FileReader(filePath));
      var s = "";
      var l;
      while((l = r.readLine()) != null) s += (l + "\n");
      return s;
    } catch(e) {
      return "";
    }
  }
 
  if(logScript.currentScript.getName() == "logScript") {
    try {
      typeof item;
    } catch(e) {
      // in create
      var cv = item;
      var context = getActiveScreen().getContext();
      var tv = new TextView(context);
      var sv = new ScrollView(context);
      sv.addView(tv);
      sv.setTag("sv");
 
      tv.setMovementMethod(new ScrollingMovementMethod());
      tv.setTextColor(0xffffffff)
 
      cv.setVerticalGrab(true);
      tv.setVerticalScrollBarEnabled(true);
 
      if(!logScript.lineWrapping) {
        tv.setHorizontallyScrolling(true);
        cv.setHorizontalGrab(true);
      }
 
      var button = new Button(context);
      button.setText("clear log");
      button.setOnClickListener(new View.OnClickListener() {
        onClick: function(v) {
          new File(logScript.logFilePath).delete();
          try {
            logScript.getTV();
            tv.setText("");
            logScript.getScript().setTag("prevLogInd", null)
          } catch(e) {}
        }
      });
      button.setLayoutParams(new FrameLayout.LayoutParams(FrameLayout.LayoutParams.WRAP_CONTENT, FrameLayout.LayoutParams.WRAP_CONTENT, Gravity.TOP | Gravity.RIGHT));
 
      var layout = new FrameLayout(context);
      layout.addView(sv);
      layout.addView(button);
 
      logScript.scrollDown(sv);
      return layout;
    }
 
    var e = getEvent();
    var src = e.getSource();
    switch(src) {
      case "MENU_APP":
        //in container
        var cv = logScript.createCVItem(e.getContainer())
        cv.setPosition(e.getTouchX(), e.getTouchY())
        break;
      case "MENU_ITEM":
        var it = e.getItem();
        var c = it.getParent();
        var cv = logScript.createCVItem(c);
        cv.setSize(it.getWidth(), it.getHeight());
        cv.setPosition(it.getPositionX(), it.getPositionY())
        c.removeItem(it);
        break;
      case "I_RESUMED":
        // in resume
        var tv = logScript.getTV();
        try {
          var logFile = new File(logScript.logFilePath);
        } catch(e) {}
 
        if(logFile !== null && tv.getText().length() == 0 || logFile.lastModified() > logScript.getScript().getTag("lastLoaded")) {
          var savedLogText = read(logScript.logFilePath)
 
          if(savedLogText.length > 30000) {
            savedLogText = savedLogText.substring(savedLogText.length - 20000, savedLogText.length)
            savedLogText = savedLogText.substring(savedLogText.indexOf("<br>"), savedLogText.length);
          }
          tv.setText(Html.fromHtml(savedLogText));
          try {
            var pw = new PrintWriter(new File(logScript.logFilePath));
            pw.print("");
            pw.write(savedLogText);
          } catch(e) {} finally {
            if(pw) pw.close();
          }
          logScript.getScript().setTag("lastLoaded", new Date().getTime())
        }
        logScript.scrollDown(logScript.getSV());
        break;
      case "I_PAUSED":
        try {
          var bfWriter = new BufferedWriter(new FileWriter(new File(logScript.logFilePath), true));
          var unsavedLog;
          var i = 0;
          var script = logScript.getScript()
          while(unsavedLog = script.getTag("log" + i)) {
            var unsavedLog = JSON.parse(unsavedLog)
            var fullText = logScript.getTV().getEditableText();
            if(fullText && fullText.length() != 0 && fullText.length() >= unsavedLog[1]) {
              var unsavedLogTextString = Html.toHtml(fullText.subSequence(unsavedLog[0], unsavedLog[1]));
              bfWriter.append(unsavedLogTextString.substring(unsavedLogTextString.indexOf('>') + 1, unsavedLogTextString.lastIndexOf('<')));
            }
            script.setTag("log" + i, null)
            i++;
          }
          script.setTag("prevLogInd", null);
        } catch(e) {} finally {
          if(bfWriter) bfWriter.close();
        }
        break;
    }
  } else {
    //in eval()
    logScript.ind = parseInt(logScript.getScript().getTag("prevColorIndex") || "0");
    var tvAvailable = logScript.isTVAvailable()
    if(!tvAvailable)
      logScript.logText = "";
 
    var text = logScript.currentScript.getText();
    var returns = "";
    for(var i = 0; i < text.substr(0, text.search("var logScript")).split("\n").length; i++) {
      returns += "\n";
    }
    text = text.substr(text.search("logScriptEnd") + 12);
    if(text.charAt(0) == "*") {
      text = text.slice(2, text.length);
      returns = returns.slice(1, returns.length);
    }
    var counter = 0;
    for(var i = 0; i < text.length; i++) {
      if(text.charAt(i) == "{")
        counter++;
      else if(text.charAt(i) == "}")
        counter--;
 
      if(counter < 0) {
        break;
      }
    }
    text = returns + text.slice(0, i);
 
    try {
      return cleanEval(text);
    } catch(e) {
      log("At line " + e.lineNumber + ": " + e, logScript.logLevel.ERROR);
    } finally {
      logScript.getScript().setTag("prevColorIndex", logScript.ind == logScript.textColors.length - 1 ? 0 : logScript.ind + 1);
    }
 
    if(!tvAvailable) {
      try {
        var bfWriter = new BufferedWriter(new FileWriter(new File(logScript.logFilePath), true));
        bfWriter.append(logScript.logText)
      } catch(e) {
        alert("At line " + e.lineNumber + ": " + e);
      } finally {
        if(bfWriter) bfWriter.close();
      }
    }
  }
})();

/*
script_customviewlog.txt · Last modified: 2016/11/18 16:24 by cdfa
Except where otherwise noted, content on this wiki is licensed under the following license: CC Attribution-Share Alike 3.0 Unported
*/
