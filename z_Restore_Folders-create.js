
LL.bindClass("java.io.File");
var dirs_created = [];

function msgShow(msg,flag){
    if (msg == null || msg == undefined || msg == "") {return 1;}
    if (flag == null || flag == undefined || flag == "" || isNaN(flag)) {var flag = false;}
    if (flag == 1) {var flag = true;}
    if (typeof flag == "boolean") {Android.makeNewToast(msg,flag).show();}
    else {alert(msg);}
    return 0;
}

function mkDir(str_dir){
    try{
        var mydir = new File(str_dir);
        // if the directory does not exist, create it
        if (!mydir.exists()) {
            var result = false;
            //mydir.mkdir(); // Create one directory
            mydir.mkdirs(); // Create multiple directories (subdirectories)
            result = true;
            if(result) {dirs_created.push(str_dir);} //msgShow("Dir created\n" + str_dir);
        }
    } catch(e){msgShow("Dir could not be created\n" + str_dir + "\n\n" + e);}
}

var dirs = [];
dirs.push("_Backup/Fonts");
dirs.push("_Backup/0-Scripts");
dirs.push("_Backup/BG-DP");
dirs.push("AutoShare");
dirs.push("AutoTools");
dirs.push("BusinessCalendar2");
dirs.push("FolderSync");
dirs.push("FStopMediaGallery/backup");
dirs.push("LightningLauncher");
dirs.push("Locus/backup");
dirs.push("Locus/mapsVector");
dirs.push("Download");
//dirs.push("PopupWidget_backup");
dirs.push("Download/SeriesGuide");
//dirs.push("SkySafari 4 Pro/Saved Settings");
//dirs.push("sleep-data");
dirs.push("Tasker/configs");
dirs.push("Tasker/projects");
dirs.push("Tasker/tasks");
dirs.push("Wrkout");
//dirs.push("SMSBackupRestore");

var main_path = "/storage/emulated/0/"; //File.Separator + "sdcard" + File.Separator;
for (var i = 0; i < dirs.length; i++) {mkDir(main_path + dirs[i]);}

if (dirs_created.length > 0) {
msgShow("Dir created:\n\n" + dirs_created.join("\n"),1);
msgShow("Dir created:\n\n" + dirs_created.join("\n"),1);
msgShow("Dir created:\n\n" + dirs_created.join("\n"),1);
}

msgShow("Process complete");
