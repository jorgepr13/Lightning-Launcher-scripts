//import Tasker functions
try {eval(getScriptByName("class_Tasker").getText());} catch (e) {bindClass("android.widget.Toast");Toast.makeText(getActiveScreen().getContext(), "One of the required scripts couldn't be loaded.\nPlease try again.\n\n" + e, Toast.LENGTH_LONG).show(); return null;}

runTaskerTask("Screenshot take");