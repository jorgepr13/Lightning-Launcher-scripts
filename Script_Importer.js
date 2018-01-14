
/*
http://www.lightninglauncher.com/wiki/doku.php?id=script_external_editor_script_importer

About the script
Purpose: automatically import .js files elsewhere on your device into lightning launcher when they have changed. This allows you to use external script editors!
Author: cdfa
Version: 1.3
Link: https://plus.google.com/100430440392224314007/posts/KAoKQ317trG
Changelog
1.3

Add support for subfolders
1.2

fixed importing of large scripts
updated to new api
How to use the script
Recommended to run the script on resumed event of the container which is your test environment, but you can use it really anytime anywhere.

Script code
*/

var scriptFolder = "/storage/emulated/0/_Backup/0-Scripts/Import_to_LL";
var importPath = "/";

bindClass("java.io.FileReader");
bindClass("java.io.BufferedReader");
bindClass("java.io.File");
bindClass("java.lang.StringBuilder");
bindClass("android.widget.Toast");

var context = getActiveScreen().getContext();

function read(filePath){
  try {
    var r = new BufferedReader(new FileReader(filePath)); 
    var s = new StringBuilder(); 
    var l; 
    while((l = r.readLine())!=null) s.append(l + "\n");
    return s;
  } catch(e){
    alert(e);
    return ""; 
  }
}

function updateScripts(folder){
  folder.listFiles().forEach(function(file){
    var fileName = file.getName();
    var length = fileName.length;
    if (file.isDirectory()){updateScripts(file);}
    else if (fileName.substring(length-3,length) == ".js"){
      var name = fileName.slice(0,-3);
      var path = folder.getPath().substring(scriptFolder.length);
      var script = getScriptByName(name);
      //var script = getScriptByPathAndName(path, name);
      if (script == null){
        Toast.makeText(context, "Creating new script: " + name, Toast.LENGTH_SHORT).show();
        script = createScript(path, name,"",0);
        var tagdate = 0;
      } else {
        var tagdate = script.getTag("lmdate");}
        var lmdate = file.lastModified();
        if (lmdate > tagdate || typeof tagdate == "undefined"){
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
 
if (updatedScripts.length > 0) {Toast.makeText(context, "Updated scripts: " + updatedScripts.join(", "), Toast.LENGTH_LONG).show();}

//Toast.makeText(context, "Importing scripts complete.", Toast.LENGTH_LONG).show();

/*
script_external_editor_script_importer.txt · Last modified: 2017/07/06 15:15 by cdfa
Except where otherwise noted, content on this wiki is licensed under the following license: CC Attribution-Share Alike 3.0 Unported
CC Attribution-Share Alike 3.0 Unported  Donate  Powered by PHP  Valid HTML5 Valid CSS  Driven by DokuWiki
*/
