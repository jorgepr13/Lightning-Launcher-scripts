bindClass("android.app.Dialog");
bindClass("android.app.AlertDialog");
bindClass("android.content.DialogInterface");
bindClass("android.content.res.ColorStateList");
bindClass("android.graphics.drawable.ColorDrawable");
bindClass("android.R");
bindClass("android.view.Window");
bindClass("android.view.Gravity");
bindClass("android.text.InputType");
bindClass("android.widget.TextView");
bindClass("android.widget.EditText");
bindClass("android.widget.LinearLayout");
bindClass("android.widget.ArrayAdapter");
bindClass("android.widget.AdapterView");
bindClass("android.widget.ListView");

//bindClass("android.graphics.PorterDuff.Mode");
//bindClass("android.graphics.drawable.Drawable");
//bindClass("android.widget.Adapter");
bindClass("android.view.View");
//bindClass("android.R.attr");
//bindClass("android.R.layout");
//bindClass("android.R.color");
//bindClass("android.graphics.Color");
//bindClass("android.app.Activity");
//bindClass("android.view.WindowManager");
//bindClass("android.view.ViewGroup.LayoutParams");
//bindClass("android.view.ViewGroup.MarginLayoutParams");

bindClass("android.widget.Toast");
var context = getActiveScreen().getContext();
//typeoff return: 'Array, Object, String, Date, RegExp, Function, Boolean, Number, Null, Undefined'
function typeoff(elem) {return Object.prototype.toString.call(elem).split(/\W/)[2].toLowerCase()};
function emptyVariable(myVar) {return myVar == null || myVar == undefined || myVar == "";}
function showToast(myMsg, longDuration) {if (!emptyVariable(myMsg)) {var mDuration = Toast.LENGTH_SHORT; if (emptyVariable(longDuration) || typeoff(longDuration) != "boolean") {longDuration = false;} if (longDuration) {mDuration = Toast.LENGTH_LONG;} Toast.makeText(context, myMsg, mDuration).show();}}

//bind the classes
bindClass("android.content.IntentFilter");
bindClass("android.content.BroadcastReceiver");
//bindClass("android.support.v4.content.LocalBroadcastManager");
//https://stackoverflow.com/questions/8802157/how-to-use-localbroadcastmanager




var myItems = ["Easy","Medium","Hard","Very Hard"];

//dialogMessageShow(myItems.join("\n"));
//dialogListShow(myItems);
//dialogCheckboxShow(myItems);
//dialogTextInputShow("Input some text:","sample text");
//dialogMenuShow();

//var dialog = new AlertDialog.Builder(context).setMessage("Hello world").show();


var dialogIntent = "custom-event-name"; var dialogDataKey = "data"; var dialogExitKey = "exit";
function dialogDataCallback(txt) {
  if (emptyVariable(txt)) {return;}
  var i = new Intent(dialogIntent); i.putExtra(dialogDataKey, txt.toString());
  context.sendBroadcast(i);
  //LocalBroadcastManager.context.sendBroadcast(i);
}
function dialogExitCallback() {
  var i = new Intent(dialogIntent); i.putExtra(dialogExitKey, "true");
  context.sendBroadcast(i);
  //LocalBroadcastManager.context.sendBroadcast(i);
}
function dialogSettings() {
  //main
  this.ac_color  = 0xff2233ff;
  this.bg_color  = 0xdd222222;
  this.bg_itm_color = 0x88333333;
  this.txt_color = 0xddffffff;
  this.txt_size  = 18;
  this.exit_on_click  = false;
  //title
  this.title_show      = true;
  this.title_txt       = "Title";
  this.title_txt_size  = this.txt_size + 6;
  this.title_txt_color = this.txt_color;
  this.title_bg_color  = this.ac_color;
  //item
  this.item_txt       = "Text";
  this.item_txt_size  = this.txt_size;
  this.item_txt_color = this.txt_color;
  this.item_bg_color  = this.bg_itm_color;
  this.item_div_color = 0x00000000;
  this.item_div_size  = 12;
  this.item_hnt_color = 0x55ffffff;
  //buttons
  this.btn_pos_show      = true;
  this.btn_pos_exit      = this.exit_on_click;
  this.btn_pos_txt       = "OK";
  this.btn_pos_txt_size  = this.txt_size - 6;
  this.btn_pos_txt_color = this.txt_color;
  this.btn_pos_bg_color  = this.bg_itm_color;

  this.btn_neg_show      = true;
  this.btn_neg_exit      = true;
  this.btn_neg_txt       = "Close";
  this.btn_neg_txt_size  = this.txt_size - 6;
  this.btn_neg_txt_color = this.txt_color;
  this.btn_neg_bg_color  = this.bg_itm_color;

  this.btn_neu_show      = true;
  this.btn_neu_exit      = this.exit_on_click;
  this.btn_neu_txt       = "Test";
  this.btn_neu_txt_size  = this.txt_size - 6;
  this.btn_neu_txt_color = this.txt_color;
  this.btn_neu_bg_color  = this.bg_itm_color;
}

dialogSettings.prototype.setColorAccent = function(num) {if (!emptyVariable(num) && !isNaN(num)) {this.ac_color = num; this.title_bg_color = this.ac_color;}}
dialogSettings.prototype.setColorBgDialog = function(num) {if (!emptyVariable(num) && !isNaN(num)) {this.bg_color = num;}}
dialogSettings.prototype.setColorBgItem = function(num) {if (!emptyVariable(num) && !isNaN(num)) {this.bg_itm_color = num; this.item_bg_color  = this.bg_itm_color; this.btn_pos_bg_color  = this.bg_itm_color; this.btn_neg_bg_color  = this.bg_itm_color; this.btn_neu_bg_color  = this.bg_itm_color;}}
dialogSettings.prototype.setColorText = function(num) {if (!emptyVariable(num) && !isNaN(num)) {this.txt_color = num; this.title_txt_color = this.txt_color; this.item_txt_color = this.txt_color; this.btn_pos_txt_color = this.txt_color; this.btn_neg_txt_color = this.txt_color; this.btn_neu_txt_color = this.txt_color;}}
dialogSettings.prototype.setSizeText = function(num) {if (!emptyVariable(num) && !isNaN(num) && num > 0) {this.txt_size = num; this.title_txt_size  = this.txt_size + 6; this.item_txt_size = this.txt_size; this.btn_pos_txt_size = this.txt_size - 6; this.btn_neg_txt_size = this.txt_size - 6; this.btn_neu_txt_size = this.txt_size - 6;}}
dialogSettings.prototype.exitOnClick = function() {this.exit_on_click = true; this.btn_pos_exit = this.exit_on_click; this.btn_neu_exit = this.exit_on_click;}
dialogSettings.prototype.stayOnClick = function() {this.exit_on_click = false; this.btn_pos_exit = this.exit_on_click; this.btn_neu_exit = this.exit_on_click;}

dialogSettings.prototype.showTitle = function() {this.title_show = true;}
dialogSettings.prototype.hideTitle = function() {this.title_show = false;}
dialogSettings.prototype.setTitleText = function(txt) {if (!emptyVariable(txt) && typeoff(txt) == "string") {this.title_txt = txt;}}
dialogSettings.prototype.setTitleTextSize = function(num) {if (!emptyVariable(num) && !isNaN(num) && num > 0) {this.title_txt_size = num;}}
dialogSettings.prototype.setTitleTextColor = function(num) {if (!emptyVariable(num) && !isNaN(num)) {this.title_txt_color = num;}}
dialogSettings.prototype.setTitleBgColor = function(num) {if (!emptyVariable(num) && !isNaN(num)) {this.title_bg_color = num;}}

dialogSettings.prototype.setItemText = function(txt) {if (!emptyVariable(txt) && (typeoff(txt) == "string" || typeoff(txt) == "array")) {this.item_txt = txt;}}
dialogSettings.prototype.setItemTextSize = function(num) {if (!emptyVariable(num) && !isNaN(num) && num > 0) {this.item_txt_size = num;}}
dialogSettings.prototype.setItemTextColor = function(num) {if (!emptyVariable(num) && !isNaN(num)) {this.item_txt_color = num;}}
dialogSettings.prototype.setItemBgColor = function(num) {if (!emptyVariable(num) && !isNaN(num)) {this.item_bg_color = num;}}
dialogSettings.prototype.setItemDividerColor = function(num) {if (!emptyVariable(num) && !isNaN(num)) {this.item_div_color = num;}}
dialogSettings.prototype.setItemDividerSize = function(num) {if (!emptyVariable(num) && !isNaN(num) && num > 0) {this.item_div_size = num;}}
dialogSettings.prototype.setItemHintColor = function(num) {if (!emptyVariable(num) && !isNaN(num)) {this.item_hnt_color = num;}}

dialogSettings.prototype.showButtonPositive = function() {this.btn_pos_show = true;}
dialogSettings.prototype.hideButtonPositive = function() {this.btn_pos_show = false;}
dialogSettings.prototype.exitOnClickButtonPositive = function() {this.btn_pos_exit = true;}
dialogSettings.prototype.stayOnClickButtonPositive = function() {this.btn_pos_exit = false;}
dialogSettings.prototype.setButtonPositiveText = function(txt) {if (!emptyVariable(txt) && typeoff(txt) == "string") {this.btn_pos_txt = txt;}}
dialogSettings.prototype.setButtonPositiveTextSize = function(num) {if (!emptyVariable(num) && !isNaN(num) && num > 0) {this.btn_pos_txt_size = num;}}
dialogSettings.prototype.setButtonPositiveTextColor = function(num) {if (!emptyVariable(num) && !isNaN(num)) {this.btn_pos_txt_color = num;}}
dialogSettings.prototype.setButtonPositiveBgColor = function(num) {if (!emptyVariable(num) && !isNaN(num)) {this.btn_pos_bg_color = num;}}

dialogSettings.prototype.showButtonNegative = function() {this.btn_neg_show = true;}
dialogSettings.prototype.hideButtonNegative = function() {this.btn_neg_show = false;}
dialogSettings.prototype.exitOnClickButtonNegative = function() {this.btn_neg_exit = true;}
dialogSettings.prototype.stayOnClickButtonNegative = function() {this.btn_neg_exit = false;}
dialogSettings.prototype.setButtonNegativeText = function(txt) {if (!emptyVariable(txt) && typeoff(txt) == "string") {this.btn_pos_txt = txt;}}
dialogSettings.prototype.setButtonNegativeTextSize = function(num) {if (!emptyVariable(num) && !isNaN(num) && num > 0) {this.btn_neg_txt_size = num;}}
dialogSettings.prototype.setButtonNegativeTextColor = function(num) {if (!emptyVariable(num) && !isNaN(num)) {this.btn_neg_txt_color = num;}}
dialogSettings.prototype.setButtonNegativeBgColor = function(num) {if (!emptyVariable(num) && !isNaN(num)) {this.btn_neg_bg_color = num;}}

dialogSettings.prototype.showButtonNeutral = function() {this.btn_neu_show = true;}
dialogSettings.prototype.hideButtonNeutral = function() {this.btn_neu_show = false;}
dialogSettings.prototype.exitOnClickButtonNeutral = function() {this.btn_neu_exit = true;}
dialogSettings.prototype.stayOnClickButtonNeutral = function() {this.btn_neu_exit = false;}
dialogSettings.prototype.setButtonNeutralText = function(txt) {if (!emptyVariable(txt) && typeoff(txt) == "string") {this.btn_neu_txt = txt;}}
dialogSettings.prototype.setButtonNeutralTextSize = function(num) {if (!emptyVariable(num) && !isNaN(num) && num > 0) {this.btn_neu_txt_size = num;}}
dialogSettings.prototype.setButtonNeutralTextColor = function(num) {if (!emptyVariable(num) && !isNaN(num)) {this.btn_pos_neu_color = num;}}
dialogSettings.prototype.setButtonNeutralBgColor = function(num) {if (!emptyVariable(num) && !isNaN(num)) {this.btn_neu_bg_color = num;}}

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//////////////////////////////////////////////

function dialogMessage(message) {
  if (emptyVariable(message)) {message = "";}
  this.item_txt = message;
  this.btn_pos_txt = "Yes";
  this.btn_neg_txt = "No";
  this.btn_neu_txt = "Maybe";
}
dialogMessage.prototype = new dialogSettings();
dialogMessage.prototype.setMessage = function(txt) {if (!emptyVariable(txt) && typeoff(txt) == "string") {this.item_txt = txt;}}

dialogMessage.prototype.show = function() {
  var returnData = {};
  returnData.dialog = "Message";
  returnData.button = null;

  var builder = new AlertDialog.Builder(context);

  if (this.title_show) {
    var myTVtitle = new TextView(context);
    myTVtitle.setText(this.title_txt);
    myTVtitle.setTextColor(this.title_txt_color);
    myTVtitle.setTextSize(this.title_txt_size);
    myTVtitle.setBackgroundColor(this.title_bg_color);
    myTVtitle.setPadding(10, 20, 10, 20);//setPadding(int left, int top, int right, int bottom)
    myTVtitle.setGravity(Gravity.CENTER);
    //myTVtitle.setBackgroundResource(R.drawable.gradient);
    builder.setCustomTitle(myTVtitle);
    //builder.setTitle(this.title_txt);
  }

  if (this.item_txt != "") {
    var myTVitem = new TextView(context);
    myTVitem.setText(this.item_txt);
    myTVitem.setTextColor(this.item_txt_color);
    myTVitem.setTextSize(this.item_txt_size);
    myTVitem.setBackgroundColor(this.item_bg_color);
    myTVitem.setPadding(10, 20, 10, 20);//setPadding(int left, int top, int right, int bottom)
    myTVitem.setGravity(Gravity.CENTER);
    //myTVitem.setBackgroundResource(R.drawable.gradient);
    builder.setView(myTVitem);
    //builder.setMessage(this.item_txt);
  }
  //builder.setPositiveButton(this.btn_pos_txt, new DialogInterface.OnClickListener() {onClick:function(dialog, buttonId) {}});
  //builder.setNegativeButton(this.btn_neg_txt, new DialogInterface.OnClickListener() {onClick:function(dialog, buttonId) {}});
  //builder.setNeutralButton(this.btn_neu_txt, new DialogInterface.OnClickListener() {onClick:function(dialog, buttonId) {}})
  if (this.btn_pos_show) {builder.setPositiveButton(this.btn_pos_txt, null);}
  if (this.btn_neg_show) {builder.setNegativeButton(this.btn_neg_txt, null);}
  if (this.btn_neu_show) {builder.setNeutralButton(this.btn_neu_txt, null);}

  //cancel is called when explicit set, pressing the back key / default action is dismiss / after cancel, dissmiss gets called too
  //builder.setOnCancelListener(new DialogInterface.OnCancelListener() {onCancel:function(dialog) {dialogExitCallback();}});
  builder.setOnDismissListener(new DialogInterface.OnDismissListener() {onDismiss:function(dialog) {dialogExitCallback();}});

  var dialog = builder.create();
  dialog.setCancelable(true); //default = true
  //dialog.setCanceledOnTouchOutside(false); //default = true

  if (!this.title_show) {dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);}

  var window = dialog.getWindow();
  window.setBackgroundDrawable(new ColorDrawable(this.bg_color));
  //window.setGravity(Gravity.FILL_VERTICAL);

  dialog.show();

  myTVitem.getLayoutParams().setMargins(20, 20, 20, 20);

  var btn;
  if (this.btn_pos_show) {
    btn = dialog.getButton(Dialog.BUTTON_POSITIVE);
    btn.setTextSize(this.btn_pos_txt_size); btn.setTextColor(this.btn_pos_txt_color); btn.setBackgroundColor(this.btn_pos_bg_color); //btn.setPadding(10, 10, 10, 10);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
    btn.setOnClickListener(new View.OnClickListener() {onClick:function(view) {if (this.btn_pos_exit) {dialog.cancel();}
      returnData.button = Dialog.BUTTON_POSITIVE; dialogDataCallback(JSON.stringify(returnData);); returnData.button = null;
    }});
  }
  if (this.btn_neg_show) {
    btn = dialog.getButton(Dialog.BUTTON_NEGATIVE);
    btn.setTextSize(this.btn_neg_txt_size); btn.setTextColor(this.btn_neg_txt_color); btn.setBackgroundColor(this.btn_neg_bg_color); //btn.setPadding(10, 10, 10, 10);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
    btn.setOnClickListener(new View.OnClickListener() {onClick:function(view) {if (this.btn_neg_exit) {dialog.cancel();}
      returnData.button = Dialog.BUTTON_NEGATIVE; dialogDataCallback(JSON.stringify(returnData);); returnData.button = null;
    }});
  }
  if (this.btn_neu_show) {
    btn = dialog.getButton(Dialog.BUTTON_NEUTRAL);
    btn.setTextSize(this.btn_neu_txt_size); btn.setTextColor(this.btn_neu_txt_color); btn.setBackgroundColor(this.btn_neu_bg_color); //btn.setPadding(10, 10, 10, 10);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
    btn.setOnClickListener(new View.OnClickListener() {onClick:function(view) {if (this.btn_neu_exit) {dialog.cancel();}
      returnData.button = Dialog.BUTTON_NEUTRAL; dialogDataCallback(JSON.stringify(returnData);); returnData.button = null;
    }});
  }
}

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//////////////////////////////////////////////

function dialogList(items) {
  if (emptyVariable(items)) {items = ["empty list"];}
  this.item_txt = items;
  this.item_exit = false;
  this.btn_pos_txt = "Yes";
  this.btn_neg_txt = "No";
  this.btn_neu_txt = "Maybe";
}
dialogList.prototype = new dialogSettings();
dialogList.prototype.setItems = function(items) {if (!emptyVariable(items) && typeoff(items) == "array") {this.item_txt = items;}}
dialogList.prototype.exitOnClickItem = function() {this.item_exit = true;}
dialogList.prototype.stayOnClickItem = function() {this.item_exit = false;}

dialogList.prototype.show = function() {
  var returnData = {};
  returnData.dialog = "List";
  returnData.button = null;
  returnData.position = -1;

  var builder = new AlertDialog.Builder(context);

  if (this.title_show) {
    var myTVtitle = new TextView(context);
    myTVtitle.setText(this.title_txt);
    myTVtitle.setTextColor(this.title_txt_color);
    myTVtitle.setTextSize(this.title_txt_size);
    myTVtitle.setBackgroundColor(this.title_bg_color);
    myTVtitle.setPadding(10, 20, 10, 20);//setPadding(int left, int top, int right, int bottom)
    myTVtitle.setGravity(Gravity.CENTER);
    //myTVtitle.setBackgroundResource(R.drawable.gradient);
    builder.setCustomTitle(myTVtitle);
    //builder.setTitle(this.title_txt);
  }

  var adapter = new JavaAdapter(ArrayAdapter, {
    getView:function(position, convertView, parent) {
      var view = this.super$getView(position, convertView, parent);
      view.setBackgroundColor(this.item_bg_color);
      view.setTextColor(this.item_txt_color);
      view.setTextSize(this.item_txt_size);
      //view.setPadding(10,10,10,10);
      return view;
    }
  }, context, R.layout.simple_list_item_1, this.item_txt);
  builder.setAdapter(adapter, null);
  //builder.setAdapter(adapter, new DialogInterface.OnClickListener() {onClick:function(dialog, position) {showToast(this.item_txt[position]);}});

  //default list dialog, no need for the adapter
  //builder.setItems(this.item_txt, new DialogInterface.OnClickListener() {onClick:function(dialog, position) {showToast(this.item_txt[position]);}});

  if (this.btn_pos_show) {builder.setPositiveButton(this.btn_pos_txt, null);}
  if (this.btn_neg_show) {builder.setNegativeButton(this.btn_neg_txt, null);}
  if (this.btn_neu_show) {builder.setNeutralButton(this.btn_neu_txt, null);}

  //builder.setOnCancelListener(new DialogInterface.OnCancelListener() {onCancel:function(dialog) {dialogExitCallback();}});
  builder.setOnDismissListener(new DialogInterface.OnDismissListener() {onDismiss:function(dialog) {dialogExitCallback();}});

  var dialog = builder.create();
  dialog.setCancelable(true); //default = true
  //dialog.setCanceledOnTouchOutside(false); //default = true

  if (!this.title_show) {dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);}

  var window = dialog.getWindow();
  window.setBackgroundDrawable(new ColorDrawable(this.bg_color));
  //window.setGravity(Gravity.FILL_VERTICAL);

  var lv = dialog.getListView();
  lv.setDivider(new ColorDrawable(this.item_div_color));
  lv.setDividerHeight(this.item_div_size);
  //lv.setHeaderDividersEnabled(false);
  //lv.setFooterDividersEnabled(false);
  //lv.setCacheColorHint(0xaa00aa00);
  lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {onItemClick:function(dialog, view, position, id) {
    //view.setBackgroundColor(this.item_bg_color);
    returnData.position = position; dialogDataCallback(JSON.stringify(returnData);); returnData.position = -1;
    if (this.item_exit) {dialog.cancel();}
  }});

  dialog.show();

  lv.getLayoutParams().setMargins(this.item_div_size, 0, this.item_div_size, 0);

  var btn;
  if (this.btn_pos_show) {
    btn = dialog.getButton(Dialog.BUTTON_POSITIVE);
    btn.setTextSize(this.btn_pos_txt_size); btn.setTextColor(this.btn_pos_txt_color); btn.setBackgroundColor(this.btn_pos_bg_color); //btn.setPadding(10, 10, 10, 10);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
    btn.setOnClickListener(new View.OnClickListener() {onClick:function(view) {if (this.btn_pos_exit) {dialog.cancel();}
      returnData.button = Dialog.BUTTON_POSITIVE; dialogDataCallback(JSON.stringify(returnData);); returnData.button = null;
    }});
  }
  if (this.btn_neg_show) {
    btn = dialog.getButton(Dialog.BUTTON_NEGATIVE);
    btn.setTextSize(this.btn_neg_txt_size); btn.setTextColor(this.btn_neg_txt_color); btn.setBackgroundColor(this.btn_neg_bg_color); //btn.setPadding(10, 10, 10, 10);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
    btn.setOnClickListener(new View.OnClickListener() {onClick:function(view) {if (this.btn_neg_exit) {dialog.cancel();}
      returnData.button = Dialog.BUTTON_NEGATIVE; dialogDataCallback(JSON.stringify(returnData);); returnData.button = null;
    }});
  }
  if (this.btn_neu_show) {
    btn = dialog.getButton(Dialog.BUTTON_NEUTRAL);
    btn.setTextSize(this.btn_neu_txt_size); btn.setTextColor(this.btn_neu_txt_color); btn.setBackgroundColor(this.btn_neu_bg_color); //btn.setPadding(10, 10, 10, 10);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
    btn.setOnClickListener(new View.OnClickListener() {onClick:function(view) {if (this.btn_neu_exit) {dialog.cancel();}
      returnData.button = Dialog.BUTTON_NEUTRAL; dialogDataCallback(JSON.stringify(returnData);); returnData.button = null;
    }});
  }
}

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//////////////////////////////////////////////





function dialogMsgButtonHandler(button) {
  showToast("my handler" + button);
  var msg = "";
  switch (button) {
    case Dialog.BUTTON_POSITIVE: msg = "positive";
      break;
    case Dialog.BUTTON_NEGATIVE: msg = "negative";
      break;
    case Dialog.BUTTON_NEUTRAL:  msg = "neutral";
      break;
  }
  msg = button + " | " + msg + " " + "\n" + "Running again";
  showToast(msg);
}





//var msg = new dialogMessage("test").setTitleText("Message Dialog").show();
//var msg = new dialogMessage("test"); msg.setTitleText("Message Dialog"); msg.hideTitle(); msg.setMessage("overwiten"): msg.show();
var msg = new dialogMessage("test"); msg.setTitleText("Message Dialog"); msg.setColorAccent(0xdd00ff00); msg.show();
var lst = new dialogList(); lst.setTitleText("List Dialog"); lst.setColorAccent(0xdd00ff00); lst.setItems(["Easy","Medium","Hard","Very Hard"]);

var myData = null;
var rep = 0;
var receiver = new JavaAdapter(BroadcastReceiver, {onReceive:function(c, i) { //context, intent //android.content.ContextWrapper
  var e = i.getExtras();
  if (e.containsKey(dialogDataKey)) {
    var value = e.get(dialogDataKey); showToast("receiver: " + value);
    myData = JSON.parse(value);
  }
  if (e.containsKey(dialogExitKey)) {
    if (myData.dialog == "Message") {lst.show();}
    if (myData.dialog == "List") {msg.show();}
    if (rep > 3) {
      try {if (receiver != null) {context.unregisterReceiver(receiver);}} catch (e) {}
    }
    rep++
  }

}});
context.registerReceiver(receiver, new IntentFilter(dialogIntent));
//LocalBroadcastManager.context.registerReceiver(receiver, new IntentFilter(dialogIntent));



//try {if (receiver != null) {context.unregisterReceiver(receiver);}} catch (e) {}






















function dialogButtonHandler(button) {
  var msg = "";
  switch (button) {
    case Dialog.BUTTON_POSITIVE: msg = "positive";
      break;
    case Dialog.BUTTON_NEGATIVE: msg = "negative";
      break;
    case Dialog.BUTTON_NEUTRAL:  msg = "neutral";
      break;
  }
  msg = button + " | " + msg + " " + "\n" + "Running again";
  showToast(msg, false);
}

function dialogMenuShow() {
  //var this.= dialogSettings();
  this.item_act = [dialogMessageShow, dialogListShow, dialogCheckboxShow, dialogTextInputShow];
  this.item_txt = ["Message", "List", "Checkbox List", "Text Input"];
  this.title_show   = true;  this.title_txt = "Select the Dialog to show:";
  this.btn_pos_show = false; //this.btn_pos_txt = "OK";
  this.btn_neg_show = true;  //this.btn_neg_txt = "Close";
  this.btn_neu_show = false; //this.btn_neu_txt = "Test";

  var dialogExit = false;
  var builder = new AlertDialog.Builder(context);

  if (this.title_show) {
    var myTVtitle = new TextView(context);
    myTVtitle.setText(this.title_txt);
    myTVtitle.setTextColor(this.title_txt_color);
    myTVtitle.setTextSize(this.title_txt_size);
    myTVtitle.setBackgroundColor(this.title_bg_color);
    myTVtitle.setPadding(10, 20, 10, 20);//setPadding(int left, int top, int right, int bottom)
    myTVtitle.setGravity(Gravity.CENTER);
    //myTVtitle.setBackgroundResource(R.drawable.gradient);
    builder.setCustomTitle(myTVtitle);
    //builder.setTitle(this.title_txt);
  }

  var adapter = new JavaAdapter(ArrayAdapter, {
    getView:function(position, convertView, parent) {
      var view = this.super$getView(position, convertView, parent);
      view.setBackgroundColor(this.item_bg_color);
      view.setTextColor(this.item_txt_color);
      view.setTextSize(this.item_txt_size);
      //view.setPadding(10,10,10,10);
      return view;
    }
  }, context, R.layout.simple_list_item_1, this.item_txt);

  builder.setAdapter(adapter, new DialogInterface.OnClickListener() {
    onClick:function(dialog, position) {dialog.cancel(); dialogMenuHandler(position, this.item_act);}
  });
  /*
    //default list dialog, no need for the adapter
    builder.setItems(item_txt, new DialogInterface.OnClickListener() {
      onClick:function(dialog, position) {dialog.cancel(); dialogMenuHandler(position, this.item_act);}
    });
  */
  if (this.btn_pos_show) {
    builder.setPositiveButton(this.btn_pos_txt, new DialogInterface.OnClickListener() {
      onClick:function(dialog, buttonId) {dialogButtonHandler(buttonId);}
    });
  }
  if (this.btn_neg_show) {
    builder.setNegativeButton(this.btn_neg_txt, new DialogInterface.OnClickListener() {
      onClick:function(dialog, buttonId) {dialog.cancel();}
    });
  }
  if (this.btn_neu_show) {
    builder.setNeutralButton(this.btn_neu_txt, new DialogInterface.OnClickListener() {
      onClick:function(dialog, buttonId) {dialogButtonHandler(buttonId);}
    });
  }
  builder.setOnCancelListener(new DialogInterface.OnCancelListener() {
    onCancel:function(dialog) {dialogExit = true;}
  });

  //cancel is called when it's explicit set, pressing the back key / default action is dismiss / after a cancel, dissmiss gets called too
  builder.setOnDismissListener(new DialogInterface.OnDismissListener() {
    onDismiss:function(dialog) {if (!dialogExit) {dialogMenuShow();}}
  });

  var dialog = builder.create();
  //dialog.setCancelable(true); //dialog.setCancelable(false);
  //dialog.setCanceledOnTouchOutside(false); //default = true

  if (!this.title_show) {dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);}

  var window = dialog.getWindow();
  window.setBackgroundDrawable(new ColorDrawable(this.bg_color));
  //window.setGravity(Gravity.FILL_VERTICAL);//window.setGravity(Gravity.CENTER);

  var lv = dialog.getListView();
  lv.setDivider(new ColorDrawable(this.item_div_color));
  lv.setDividerHeight(this.item_div_size);
  //lv.setHeaderDividersEnabled(false);
  //lv.setFooterDividersEnabled(false);
  //lv.setCacheColorHint(0xaa00aa00);

  dialog.show();

  lv.getLayoutParams().setMargins(this.item_div_size, 0, this.item_div_size, 0);

  var btn;
  if (this.btn_pos_show) {
    btn = dialog.getButton(Dialog.BUTTON_POSITIVE);
    btn.setTextSize(this.btn_pos_txt_size); btn.setTextColor(this.btn_pos_txt_color); btn.setBackgroundColor(this.btn_pos_bg_color);
    //btn.setPadding(10, 10, 10, 10);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
  }
  if (this.btn_neg_show) {
    btn = dialog.getButton(Dialog.BUTTON_NEGATIVE);
    btn.setTextSize(this.btn_neg_txt_size); btn.setTextColor(this.btn_neg_txt_color); btn.setBackgroundColor(this.btn_neg_bg_color);
    //btn.setPadding(10, 10, 10, 10);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
  }
  if (this.btn_neu_show) {
    btn = dialog.getButton(Dialog.BUTTON_NEUTRAL);
    btn.setTextSize(this.btn_neu_txt_size); btn.setTextColor(this.btn_neu_txt_color); btn.setBackgroundColor(this.btn_neu_bg_color);
    //btn.setPadding(10, 10, 10, 10);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
  }
}
function dialogMenuHandler(position, action){
  switch (position) {
    case 0: action[position](myItems.join("\n"));
      break; //Message
    case 1: action[position](myItems);
      break; //List
    case 2: //action[position](myItems, myItemsState);
      action[position](myItems);
      break; //Checkbox
    case 3: action[position]("Input some text:","sample text");
      break; //Text Input
    case 4: action[position](myItems);
      break; //Custom List
  }
}



function dialogCheckboxShow(items, itemsState) {
  if (emptyVariable(items)) {return;}
  if (emptyVariable(itemsState)) {itemsState = []; for (var i = 0; i < items.length; ++i) {itemsState.push(false);}}

  //var this.= dialogSettings();
  this.item_txt = items;
  this.title_show   = true;  this.title_txt = "Select The Difficulty Level - Checkbox";
  this.btn_pos_show = true;  this.btn_pos_txt = "Selected";
  this.btn_neg_show = true;  //this.btn_neg_txt = "Close";
  this.btn_neu_show = true;  this.btn_neu_txt = "Deselected";

  var colorStateList = [[
  [-R.attr.state_checked],//unchecked
  [ R.attr.state_checked]],
  [this.ac_color, this.ac_color]];
  colorStateList = new ColorStateList(colorStateList[0], colorStateList[1]);

  var dialogExit = false;
  var builder = new AlertDialog.Builder(context);

  if (this.title_show) {
    var myTVtitle = new TextView(context);
    myTVtitle.setText(this.title_txt);
    myTVtitle.setTextColor(this.title_txt_color);
    myTVtitle.setTextSize(this.title_txt_size);
    myTVtitle.setBackgroundColor(this.title_bg_color);
    myTVtitle.setPadding(10, 20, 10, 20);//setPadding(int left, int top, int right, int bottom)
    myTVtitle.setGravity(Gravity.CENTER);
    //myTVtitle.setBackgroundResource(R.drawable.gradient);
    builder.setCustomTitle(myTVtitle);
    //builder.setTitle(this.title_txt);
  }

  var adapter = new JavaAdapter(ArrayAdapter, {
    getView:function(position, convertView, parent) {
      var view = this.super$getView(position, convertView, parent);
      view.setBackgroundColor(this.item_bg_color);
      view.setTextColor(this.item_txt_color);
      view.setTextSize(this.item_txt_size);
      //view.setPadding(10,10,10,10);
      view.setCheckMarkTintList(colorStateList);
      return view;
    }
  //{}, context, R.layout.select_dialog_multichoice, this.item_txt);
  }, context, R.layout.simple_list_item_multiple_choice, this.item_txt);
  builder.setAdapter(adapter, null);
/*
  builder.setMultiChoiceItems(this.item_txt, itemsState, new DialogInterface.OnMultiChoiceClickListener() {
    onClick:function(dialog, position, isChecked) {
      if (isChecked) {itemsState[position] = true;}
      else {itemsState[position] = false;}
    }
  });
*/
  if (this.btn_pos_show) {
    builder.setPositiveButton(this.btn_pos_txt, new DialogInterface.OnClickListener() {
      onClick:function(dialog, buttonId) {
        var itemsChecked = [];
        for (i = 0; i < items.length; i++) {
          if (itemsState[i]) {itemsChecked.push(items[i]);}
        }
        showToast(buttonId + " | " + itemsChecked.join(", ") + "\n" + itemsChecked + "\n" + itemsState);
      }
    });
  }
  if (this.btn_neg_show) {
    builder.setNegativeButton(this.btn_neg_txt, new DialogInterface.OnClickListener() {
      onClick:function(dialog, buttonId) {dialog.cancel();}
    });
  }
  if (this.btn_neu_show) {
    builder.setNeutralButton(this.btn_neu_txt, new DialogInterface.OnClickListener() {
      onClick:function(dialog, buttonId) {
        var itemsChecked = [];
        for (i = 0; i < items.length; i++) {
          if (!itemsState[i]) {itemsChecked.push(items[i]);}
        }
        showToast(buttonId + " | " + itemsChecked.join(", ") + "\n" + itemsChecked + "\n" + itemsState);
      }
    });
  }
  builder.setOnCancelListener(new DialogInterface.OnCancelListener() {
    onCancel:function(dialog) {dialogExit = true;}
  });

  //cancel is called when explicit set, pressing the back key / default action is dismiss / after cancel, dissmiss gets called too
  builder.setOnDismissListener(new DialogInterface.OnDismissListener() {
    onDismiss:function(dialog) {
      if (dialogExit) {dialogMenuShow();} else {dialogCheckboxShow(this.item_txt, itemsState);}
    }
  });

  var dialog = builder.create();
  //dialog.setCancelable(true); //dialog.setCancelable(false);
  //dialog.setCanceledOnTouchOutside(false); //default = true

  if (!this.title_show) {dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);}

  var window = dialog.getWindow();
  window.setBackgroundDrawable(new ColorDrawable(this.bg_color));
  //window.setGravity(Gravity.FILL_VERTICAL);//window.setGravity(Gravity.CENTER);

  var lv = dialog.getListView();
  lv.setDivider(new ColorDrawable(this.item_div_color));
  lv.setDividerHeight(this.item_div_size);
  //lv.setHeaderDividersEnabled(false);
  //lv.setFooterDividersEnabled(false);
  //lv.setCacheColorHint(0xaa00aa00);
  lv.setChoiceMode(ListView.CHOICE_MODE_MULTIPLE);

  lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
    onItemClick:function(dialog, view, position, id) {
      if (view.isChecked()) {itemsState[position] = true;} else {itemsState[position] = false;}
      //view.setBackgroundColor(this.item_bg_color);
      //view is a checkedTextView
    }
  });

  dialog.show();

  lv.getLayoutParams().setMargins(this.item_div_size, 0, this.item_div_size, 0);
  //lv.getChildCount(); //like array.length
  for (var i = 0; i < this.item_txt.length; i++) {lv.setItemChecked(i, itemsState[i]);}

  var btn;
  if (this.btn_pos_show) {
    btn = dialog.getButton(Dialog.BUTTON_POSITIVE);
    btn.setTextSize(this.btn_pos_txt_size); btn.setTextColor(this.btn_pos_txt_color); btn.setBackgroundColor(this.btn_pos_bg_color);
    //btn.setPadding(10, 10, 10, 10);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
  }
  if (this.btn_neg_show) {
    btn = dialog.getButton(Dialog.BUTTON_NEGATIVE);
    btn.setTextSize(this.btn_neg_txt_size); btn.setTextColor(this.btn_neg_txt_color); btn.setBackgroundColor(this.btn_neg_bg_color);
    //btn.setPadding(10, 10, 10, 10);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
  }
  if (this.btn_neu_show) {
    btn = dialog.getButton(Dialog.BUTTON_NEUTRAL);
    btn.setTextSize(this.btn_neu_txt_size); btn.setTextColor(this.btn_neu_txt_color); btn.setBackgroundColor(this.btn_neu_bg_color);
    //btn.setPadding(10, 10, 10, 10);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
  }
}


function dialogTextInputShow(message, text){
  if (emptyVariable(message)) {message = "";}
  if (emptyVariable(text)) {text = "";}

  //var this.= dialogSettings();
  this.item_txt = message;
  this.title_show   = true;  this.title_txt = "Input Text Dialog";
  this.btn_pos_show = true;  //this.btn_pos_txt = "OK";
  this.btn_neg_show = true;  //this.btn_neg_txt = "Close";
  this.btn_neu_show = true;  //this.btn_neu_txt = "Test";

  var colorStateList = [[
  [R.attr.state_pressed],
  [R.attr.state_focused],
  [R.attr.state_enabled]],
  [this.ac_color, this.ac_color, this.item_hnt_color]];
  colorStateList = new ColorStateList(colorStateList[0], colorStateList[1]);

  var dialogExit = false;
  var builder = new AlertDialog.Builder(context);

  if (this.title_show) {
    var myTVtitle = new TextView(context);
    myTVtitle.setText(this.title_txt);
    myTVtitle.setTextColor(this.title_txt_color);
    myTVtitle.setTextSize(this.title_txt_size);
    myTVtitle.setBackgroundColor(this.title_bg_color);
    myTVtitle.setPadding(10, 20, 10, 20);//setPadding(int left, int top, int right, int bottom)
    myTVtitle.setGravity(Gravity.CENTER);
    //myTVtitle.setBackgroundResource(R.drawable.gradient);
    builder.setCustomTitle(myTVtitle);
    //builder.setTitle(this.title_txt);
  }

  myLL = new LinearLayout(context);
  myLL.setOrientation(LinearLayout.VERTICAL);//myLL.setOrientation(LinearLayout.HORIZONTAL);

  if (this.item_txt != "") {
    var myTVitem = new TextView(context);
    myTVitem.setText(this.item_txt);
    myTVitem.setTextColor(this.item_txt_color);
    myTVitem.setTextSize(this.item_txt_size);
    myTVitem.setBackgroundColor(this.item_bg_color);
    myTVitem.setPadding(10, 20, 10, 20);//setPadding(int left, int top, int right, int bottom)
    myTVitem.setGravity(Gravity.CENTER);
    //myTVitem.setBackgroundResource(R.drawable.gradient);
    builder.setView(myTVitem);
    //builder.setMessage(this.item_txt);
  }

  var editText = new EditText(context);
  editText.setText(text);
  editText.setHint("gpa");
  editText.setTextColor(this.item_txt_color);
  editText.setHintTextColor(this.item_hnt_color);
  editText.setBackgroundTintList(colorStateList);
  //editText.setBackgroundColor(this.item_bg_color);
  //editText.setInputType(InputType.TYPE_CLASS_NUMBER);
  //editText.setInputType(InputType.TYPE_CLASS_TEXT);
  //set the width/height of edittext
  //editText.setLayoutParams(new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT));
  //editText.setCompoundDrawables(Drawable left, Drawable top, Drawable right, Drawable bottom)
  //editText.setCompoundDrawables(new ColorDrawable(0x00000000), new ColorDrawable(0x00000000), new ColorDrawable(0x00000000), new ColorDrawable(0xcc00aaee))
  //setEllipsize(TextUtils.TruncateAt where)
  //Causes worthis.in the text that are longer than the view's width to be ellipsized instead of broken in the middle.
  //builder.setView(editText);
  //setHighlightColor(int color)
  //	setHintTextColor(ColorStateList colors)
  //editText.setBackgroundTintList(ColorStateList.valueOf(0xcc00aaee));
  //setCursorDrawableColor(editText, 0xff00ff00);
  myLL.addView(editText);

  var editTextB = new EditText(context);
  editTextB.setHint("Number");
  editTextB.setTextColor(this.item_txt_color);
  editTextB.setHintTextColor(this.item_hnt_color);
  editTextB.setBackgroundTintList(colorStateList);
  editTextB.setInputType(InputType.TYPE_CLASS_NUMBER);
  //editTextB.setBackgroundColor(this.item_bg_color);
  myLL.addView(editTextB);

  var editTextC = new EditText(context);
  editTextC.setHint("Password");
  editTextC.setTextColor(this.item_txt_color);
  editTextC.setHintTextColor(this.item_hnt_color);
  editTextC.setBackgroundTintList(colorStateList);
  editTextC.setInputType(InputType.TYPE_MASK_CLASS);
  //editTextC.setInputType(InputType.TYPE_TEXT_VARIATION_PASSWORD|InputType.TYPE_MASK_CLASS);
  //editTextC.setInputType(InputType.TYPE_TEXT_VARIATION_WEB_PASSWORD);
  //editTextC.setBackgroundColor(this.item_bg_color);
  myLL.addView(editTextC);

  var editTextD = new EditText(context);
  editTextD.setHint("Date");
  editTextD.setInputType(InputType.TYPE_CLASS_DATETIME);
  editTextD.setTextColor(this.item_txt_color);
  editTextD.setHintTextColor(this.item_hnt_color);
  editTextD.setBackgroundTintList(colorStateList);
  myLL.addView(editTextD);

  builder.setView(myLL);

  if (this.btn_pos_show) {
    builder.setPositiveButton(this.btn_pos_txt, new DialogInterface.OnClickListener() {
      onClick:function(dialog, buttonId) {
        text = editText.getText().toString();
        text += "\nnum:  " + editTextB.getText().toString();
        text += "\npass: " + editTextC.getText().toString();
        text += "\ndate: " + editTextD.getText().toString();
        text += "\n";
        showToast(text);
      }
    });
  }
  if (this.btn_neg_show) {
    builder.setNegativeButton(this.btn_neg_txt, new DialogInterface.OnClickListener() {
      onClick:function(dialog, buttonId) {dialog.cancel();}
    });
  }
  if (this.btn_neu_show) {
    builder.setNeutralButton(this.btn_neu_txt, new DialogInterface.OnClickListener() {
      onClick:function(dialog, buttonId) {dialogButtonHandler(buttonId);}
    });
  }
  builder.setOnCancelListener(new DialogInterface.OnCancelListener() {
    onCancel:function(dialog) {dialogExit = true;}
  });

  //cancel is called when explicit set, pressing the back key / default action is dismiss / after cancel, dissmiss gets called too
  builder.setOnDismissListener(new DialogInterface.OnDismissListener() {
    onDismiss:function(dialog) {
      if (dialogExit) {dialogMenuShow();} else {dialogTextInputShow(message, text);}
    }
  });

  var dialog = builder.create();
  //dialog.setCancelable(true); //dialog.setCancelable(false);
  //dialog.setCanceledOnTouchOutside(false); //default = true

  if (!this.title_show) {dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);}

  var window = dialog.getWindow();
  window.setBackgroundDrawable(new ColorDrawable(this.bg_color));
  //window.setGravity(Gravity.FILL_VERTICAL);//window.setGravity(Gravity.CENTER);

  dialog.show();

  myLL.getLayoutParams().setMargins(this.item_div_size, 0, this.item_div_size, 0);

  var btn;
  if (this.btn_pos_show) {
    btn = dialog.getButton(Dialog.BUTTON_POSITIVE);
    btn.setTextSize(this.btn_pos_txt_size); btn.setTextColor(this.btn_pos_txt_color); btn.setBackgroundColor(this.btn_pos_bg_color);
    //btn.setPadding(10, 0, 10, 0);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
  }
  if (this.btn_neg_show) {
    btn = dialog.getButton(Dialog.BUTTON_NEGATIVE);
    btn.setTextSize(this.btn_neg_txt_size); btn.setTextColor(this.btn_neg_txt_color); btn.setBackgroundColor(this.btn_neg_bg_color);
    //btn.setPadding(10, 0, 10, 0);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
  }
  if (this.btn_neu_show) {
    btn = dialog.getButton(Dialog.BUTTON_NEUTRAL);
    btn.setTextSize(this.btn_neu_txt_size); btn.setTextColor(this.btn_neu_txt_color); btn.setBackgroundColor(this.btn_neu_bg_color);
    //btn.setPadding(10, 0, 10, 0);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
  }
}

/*
http://www.lightninglauncher.com/wiki/doku.php?id=script_app_drawer

LL.bindClass("android.app.ProgressDialog");
var progress = new ProgressDialog(LL.getContext());
progress.setTitle("Initializing App Drawer")
progress.setMessage("Please wait...");
progress.setProgressStyle(ProgressDialog.STYLE_SPINNER);
progress.show();
//program code
if (typeof progress !== 'undefined') {progress.dismiss();}
}


*/


//setTimeout(dialogListShow(),0);//shows the list again. On a timeout so the startActivity() is correctly launched before
