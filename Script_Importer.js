
//http://www.lightninglauncher.com/wiki/doku.php?id=script_external_editor_script_importer

var scriptFolder = "/storage/emulated/0/_Backup/0-Scripts/Import_to_LL";
var importPath = "/";

bindClass("java.io.FileReader");
bindClass("java.io.BufferedReader");
bindClass("java.io.File");
bindClass("java.lang.StringBuilder");

bindClass("android.widget.Toast");
var context = getActiveScreen().getContext();
//typeoff return: 'Array, Object, String, Date, RegExp, Function, Boolean, Number, Null, Undefined'
function typeoff(elem) {return Object.prototype.toString.call(elem).split(/\W/)[2].toLowerCase()};
function emptyVariable(myVar) {return myVar == null || myVar == undefined || myVar == "";}
function showToast(myMsg, longDuration) {if (!emptyVariable(myMsg)) {var mDuration = Toast.LENGTH_SHORT; if (emptyVariable(longDuration) || typeoff(longDuration) != "boolean") {longDuration = false;} if (longDuration) {mDuration = Toast.LENGTH_LONG;} Toast.makeText(context, myMsg, mDuration).show();}}

function read(filePath) {
  try {
    var r = new BufferedReader(new FileReader(filePath)); 
    var s = new StringBuilder(); 
    var l; 
    while ((l = r.readLine())!=null) {s.append(l + "\n");}
    return s;
  } catch (e) {
    alert(e);
    return ""; 
  }
}

function updateScripts(folder) {
  folder.listFiles().forEach(function(file) {
    var fileName = file.getName();
    var length = fileName.length;
    if (file.isDirectory()) {updateScripts(file);
    } else if (fileName.substring(length - 3, length) == ".js") {
      var name = fileName.slice(0,-3);
      var path = folder.getPath().substring(scriptFolder.length);
      var script = getScriptByName(name);
      //var script = getScriptByPathAndName(path, name);
      var tagdate = 0;
      if (script == null) {
        showToast("Creating new script: " + name);
        script = createScript(path, name, "", 0);
      } else {tagdate = script.getTag("lmdate");}
      var lmdate = file.lastModified();
      if (lmdate > tagdate || typeof tagdate == "undefined") {
        updatedScripts.push(name);
        script.setText(read(folder.getPath()+"/"+fileName));
        script.setTag("lmdate",time);
      }
    }
  });
}
 
//var scriptNames = []
var time = new Date().getTime();
var updatedScripts = [];
var folder = new File(scriptFolder);
updateScripts(folder);
 
if (updatedScripts.length > 0) {showToast("Updated scripts: " + updatedScripts.join(", "), true);}

//showToast("Importing scripts complete.", true);
