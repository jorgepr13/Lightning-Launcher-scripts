/*
Create full blown settings screen
Available at V14b3+.

Although the feature is not part of the official script API, Lightning offers a set of public java classes for creating settings screens. It consists in ready to use controls to select a color, a number, a text, a value in a list or a boolean value. These controls are the one used by the app in its own settings screen.

These classes consist in

a set of LLPreference* to manage color, number, text and other settings
a LLPreferenceListView class, used to display the LLPreference* instances
The api doc can be found at http://www.lightninglauncher.com/scripting/reference/api-alpha/reference/net/pierrox/lightning_launcher/prefs/package-summary.html

The following script, extracted from the Clock-2.1.tar.gz sample, construct a settings dialog box using the preferences classes.
*/

bindClass("android.app.AlertDialog");
bindClass("net.pierrox.lightning_launcher.prefs.LLPreferenceListView");
bindClass("net.pierrox.lightning_launcher.prefs.LLPreferenceColor");
bindClass("net.pierrox.lightning_launcher.prefs.LLPreferenceCheckBox");
 
// build and show a dialog with clock preferences
showSettings();
function showSettings() {
    var screen = getActiveScreen();
    var context = screen.getContext();
 
    // extract settings stored in the item tag
    //var settings = JSON.parse(item.getTag("settings"));
    var settings = {}
    settings.color = 0xff00ff00;
    settings.showSeconds = true;
 
    // description of our preferences
    var prefColor = new LLPreferenceColor(0, "Color", null, settings.color, null, true);
    var prefShowSeconds = new LLPreferenceCheckBox(0, "Show seconds", null, settings.showSeconds, null);
 
    // create a list view to display our preferences
    var listView = new LLPreferenceListView(context, null);
    listView.setPreferences([ prefColor, prefShowSeconds ]);
 
    // setup the dialog and assign its content view with the preference list view
    var builder=new AlertDialog.Builder(context);
    builder.setView(listView);
    builder.setTitle("Clock settings");
    builder.setPositiveButton("Save",{onClick:function(dialog,id){
        // update the settings and save them back in the item's tag
        //settings.color = prefColor.getColor();
        //settings.showSeconds = prefShowSeconds.isChecked();
        //item.setTag("settings", JSON.stringify(settings));
        //dialog.dismiss();
    }});
    builder.setNegativeButton("Cancel", null);
    builder.show();
}
/*
create_full_blown_settings_screen.txt · Last modified: 2016/11/11 13:13 by pierrox
Except where otherwise noted, content on this wiki is licensed under the following license: CC Attribution-Share Alike 3.0 Unported
CC Attribution-Share Alike 3.0 Unported  Donate  Powered by PHP  Valid HTML5 Valid CSS  Driven by DokuWiki
*/
