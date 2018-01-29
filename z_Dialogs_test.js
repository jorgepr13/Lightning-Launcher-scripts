bindClass("android.app.Dialog");
bindClass("android.app.AlertDialog");
bindClass("android.content.DialogInterface");
bindClass("android.content.res.ColorStateList");
bindClass("android.graphics.drawable.ColorDrawable");
bindClass("android.R");
bindClass("android.view.View");
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
function emptyVariable(myVar) {return myVar === null || myVar === undefined || myVar === "" || myVar === '';}
function showToast(myMsg, longDuration) {if (!emptyVariable(myMsg)) {var mDuration = Toast.LENGTH_SHORT; if (emptyVariable(longDuration) || typeoff(longDuration) != "boolean") {longDuration = false;} if (longDuration) {mDuration = Toast.LENGTH_LONG;} Toast.makeText(context, myMsg, mDuration).show();}}

//bind the classes
bindClass("android.content.IntentFilter");
bindClass("android.content.BroadcastReceiver");
//bindClass("android.support.v4.content.LocalBroadcastManager");

//https://stackoverflow.com/questions/8802157/how-to-use-localbroadcastmanager
//https://github.com/NativeScript/NativeScript/issues/4007


//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//                Settings
//////////////////////////////////////////////

var dialogIntent = "custom-event-name"; var dialogIntentKey = "data";
function dialogCallback(txt) {
  if (emptyVariable(txt)) {return;}
  var i = new Intent(dialogIntent); i.putExtra(dialogIntentKey, txt.toString());
  context.sendBroadcast(i); //LocalBroadcastManager.context.sendBroadcast(i);
}
function dialogSettings() {
  //main
  this.name         = Math.floor((Math.random() * 1000) + 1); //number between 1 and 1000
  this.ac_color     = 0xff2233ff;
  this.bg_color     = 0xdd222222;
  this.bg_itm_color = 0x88333333;
  this.txt_color    = 0xddffffff;
  this.txt_size     = 18;
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
dialogSettings.prototype.getName = function() {return this.name;}}
dialogSettings.prototype.setName = function(txt) {if (!emptyVariable(txt) && (typeoff(txt) == "string" || typeoff(txt) == "number")) {this.name = txt;}}
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
dialogSettings.prototype.setButtonNegativeText = function(txt) {if (!emptyVariable(txt) && typeoff(txt) == "string") {this.btn_neg_txt = txt;}}
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
//                Message
//////////////////////////////////////////////
//var dialog = new AlertDialog.Builder(context).setMessage("Hello world").show();
function dialogMessage(message) {
  if (emptyVariable(message)) {message = "";}
  this.item_txt = message;
  this.btn_pos_txt = "Yes";
  this.btn_neg_txt = "No";
  this.btn_neu_txt = "Maybe";
}
dialogMessage.prototype = new dialogSettings();
dialogMessage.prototype.getMessage = function() {return this.item_txt;}
dialogMessage.prototype.setMessage = function(txt) {if (!emptyVariable(txt) && typeoff(txt) == "string") {this.item_txt = txt;}}

dialogMessage.prototype.show = function() {
  var returnData = {};
  returnData.name = this.name;
  returnData.dialog = "Message";
  returnData.button = null;
  returnData.exit = false;

  var builder = new AlertDialog.Builder(context);

  if (this.title_show) {
    var myTVtitle = new TextView(context);
    myTVtitle.setText(this.title_txt);
    myTVtitle.setTextColor(this.title_txt_color);
    myTVtitle.setTextSize(this.title_txt_size);
    myTVtitle.setBackgroundColor(this.title_bg_color);
    myTVtitle.setPadding(10, 20, 10, 20);//setPadding(int left, int top, int right, int bottom)
    //myTVtitle.setGravity(Gravity.CENTER);
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
    //myTVitem.setGravity(Gravity.CENTER);
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
  //builder.setOnCancelListener(new DialogInterface.OnCancelListener() {onCancel:function(dialog) {showToast("Cancel");}});
  builder.setOnDismissListener(new DialogInterface.OnDismissListener() {onDismiss:function(dialog) {
    returnData.exit = true; var returnDataJ = JSON.stringify(returnData); dialogCallback(returnDataJ);
  }});

  var dialog = builder.create();
  //dialog.setCancelable(true); //default = true
  //dialog.setCanceledOnTouchOutside(false); //default = true

  if (!this.title_show) {dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);}

  var window = dialog.getWindow();
  window.setBackgroundDrawable(new ColorDrawable(this.bg_color));
  //window.setGravity(Gravity.FILL_VERTICAL);

  dialog.show();

  myTVitem.getLayoutParams().setMargins(20, 20, 20, 20);

  var btn;
  if (this.btn_pos_show) {
    var btn_pos__exit = this.btn_pos_exit;
    btn = dialog.getButton(Dialog.BUTTON_POSITIVE);
    btn.setTextSize(this.btn_pos_txt_size); btn.setTextColor(this.btn_pos_txt_color); btn.setBackgroundColor(this.btn_pos_bg_color); //btn.setPadding(10, 10, 10, 10);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
    btn.setOnClickListener(new View.OnClickListener() {onClick:function(view) {if (btn_pos__exit) {dialog.dismiss();}
      returnData.button = Dialog.BUTTON_POSITIVE; var returnDataJ = JSON.stringify(returnData); dialogCallback(returnDataJ); returnData.button = null;
    }});
  }
  if (this.btn_neg_show) {
    var btn_neg__exit = this.btn_neg_exit;
    btn = dialog.getButton(Dialog.BUTTON_NEGATIVE);
    btn.setTextSize(this.btn_neg_txt_size); btn.setTextColor(this.btn_neg_txt_color); btn.setBackgroundColor(this.btn_neg_bg_color); //btn.setPadding(10, 10, 10, 10);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
    btn.setOnClickListener(new View.OnClickListener() {onClick:function(view) {if (btn_neg__exit) {dialog.dismiss();}
      returnData.button = Dialog.BUTTON_NEGATIVE; var returnDataJ = JSON.stringify(returnData); dialogCallback(returnDataJ); returnData.button = null;
    }});
  }
  if (this.btn_neu_show) {
    var btn_neu__exit = this.btn_neu_exit;
    btn = dialog.getButton(Dialog.BUTTON_NEUTRAL);
    btn.setTextSize(this.btn_neu_txt_size); btn.setTextColor(this.btn_neu_txt_color); btn.setBackgroundColor(this.btn_neu_bg_color); //btn.setPadding(10, 10, 10, 10);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
    btn.setOnClickListener(new View.OnClickListener() {onClick:function(view) {if (btn_neu__exit) {dialog.dismiss();}
      returnData.button = Dialog.BUTTON_NEUTRAL; var returnDataJ = JSON.stringify(returnData); dialogCallback(returnDataJ); returnData.button = null;
    }});
  }
}

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//                List
//////////////////////////////////////////////

function dialogList(items) {
  if (emptyVariable(items) || typeoff(items) != "array") {items = ["empty list"];}
  this.item_txt = items;
  this.item_exit = false;
  this.btn_pos_txt = "Yes";
  this.btn_neg_txt = "No";
  this.btn_neu_txt = "Maybe";
}
dialogList.prototype = new dialogSettings();
dialogList.prototype.getItems = function() {return this.item_txt;}
dialogList.prototype.setItems = function(items) {if (!emptyVariable(items) && typeoff(items) == "array") {this.item_txt = items;}}
dialogList.prototype.exitOnClickItem = function() {this.item_exit = true;}
dialogList.prototype.stayOnClickItem = function() {this.item_exit = false;}

dialogList.prototype.show = function() {
  var returnData = {};
  returnData.name = this.name;
  returnData.dialog = "List";
  returnData.button = null;
  returnData.position = -1;
  returnData.exit = false;

  var builder = new AlertDialog.Builder(context);

  if (this.title_show) {
    var myTVtitle = new TextView(context);
    myTVtitle.setText(this.title_txt);
    myTVtitle.setTextColor(this.title_txt_color);
    myTVtitle.setTextSize(this.title_txt_size);
    myTVtitle.setBackgroundColor(this.title_bg_color);
    myTVtitle.setPadding(10, 20, 10, 20);//setPadding(int left, int top, int right, int bottom)
    //myTVtitle.setGravity(Gravity.CENTER);
    //myTVtitle.setBackgroundResource(R.drawable.gradient);
    builder.setCustomTitle(myTVtitle);
    //builder.setTitle(this.title_txt);
  }
  var item_bg__color = this.item_bg_color; var item_txt__color = this.item_txt_color; var item_txt__size = this.item_txt_size;
/*
  var adapter = new ArrayAdapter(context, R.layout.simple_list_item_1, this.item_txt) {
  //var adapter = new ArrayAdapter(context, R.layout.simple_list_item_1, this.item_txt);
  //adapter.prototype.getView = function(position, convertView, parent) {
    getView:function(position, convertView, parent) {
      var view = this.getView(position, convertView, parent);
      //var view = convertView;
      if (view == null) {return view;}
      view.setBackgroundColor(item_bg__color);
      view.setTextColor(item_txt__color);
      view.setTextSize(item_txt__size);
      //view.setPadding(10,10,10,10);
      return view;
    }
  }
*/
  var adapter = new JavaAdapter(ArrayAdapter, {
    getView:function(position, convertView, parent) {
      var view = this.super$getView(position, convertView, parent);
      view.setBackgroundColor(item_bg__color);
      view.setTextColor(item_txt__color);
      view.setTextSize(item_txt__size);
      //view.setGravity(Gravity.CENTER);
      //view.setPadding(10,10,10,10);
      return view;
    }
  }, context, R.layout.simple_list_item_1, this.item_txt);

  builder.setAdapter(adapter, null);
  //builder.setAdapter(adapter, new DialogInterface.OnClickListener() {onClick:function(dialog, position) {returnData.position = position; var returnDataJ = JSON.stringify(returnData); dialogCallback(returnDataJ); returnData.position = -1; if (this.item_exit) {dialog.dismiss();}}});

  //default list dialog, no need for the adapter
  //builder.setItems(this.item_txt, new DialogInterface.OnClickListener() {onClick:function(dialog, position) {returnData.position = position; var returnDataJ = JSON.stringify(returnData); dialogCallback(returnDataJ); returnData.position = -1; if (this.item_exit) {dialog.dismiss();}}});
  //builder.setItems(this.item_txt, null);

  if (this.btn_pos_show) {builder.setPositiveButton(this.btn_pos_txt, null);}
  if (this.btn_neg_show) {builder.setNegativeButton(this.btn_neg_txt, null);}
  if (this.btn_neu_show) {builder.setNeutralButton(this.btn_neu_txt, null);}

  //builder.setOnCancelListener(new DialogInterface.OnCancelListener() {onCancel:function(dialog) {showToast("Cancel");}});
  builder.setOnDismissListener(new DialogInterface.OnDismissListener() {onDismiss:function(dialog) {
    returnData.exit = true; var returnDataJ = JSON.stringify(returnData); dialogCallback(returnDataJ);
  }});

  var dialog = builder.create();
  //dialog.setCancelable(true); //default = true
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

  //dialog.show();

  var item__exit = this.item_exit;
  lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {onItemClick:function(dialogg, view, position, id) {if (item__exit) {dialog.dismiss();}
    //view.setBackgroundColor(this.item_bg_color);
    returnData.position = position; var returnDataJ = JSON.stringify(returnData); dialogCallback(returnDataJ); returnData.position = -1;
  }});

  dialog.show();

  lv.getLayoutParams().setMargins(this.item_div_size, 0, this.item_div_size, 0);

  var btn;
  if (this.btn_pos_show) {
    var btn_pos__exit = this.btn_pos_exit;
    btn = dialog.getButton(Dialog.BUTTON_POSITIVE);
    btn.setTextSize(this.btn_pos_txt_size); btn.setTextColor(this.btn_pos_txt_color); btn.setBackgroundColor(this.btn_pos_bg_color); //btn.setPadding(10, 10, 10, 10);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
    btn.setOnClickListener(new View.OnClickListener() {onClick:function(view) {if (btn_pos__exit) {dialog.dismiss();}
      returnData.button = Dialog.BUTTON_POSITIVE; var returnDataJ = JSON.stringify(returnData); dialogCallback(returnDataJ); returnData.button = null;
    }});
  }
  if (this.btn_neg_show) {
    var btn_neg__exit = this.btn_neg_exit;
    btn = dialog.getButton(Dialog.BUTTON_NEGATIVE);
    btn.setTextSize(this.btn_neg_txt_size); btn.setTextColor(this.btn_neg_txt_color); btn.setBackgroundColor(this.btn_neg_bg_color); //btn.setPadding(10, 10, 10, 10);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
    btn.setOnClickListener(new View.OnClickListener() {onClick:function(view) {if (btn_neg__exit) {dialog.dismiss();}
      returnData.button = Dialog.BUTTON_NEGATIVE; var returnDataJ = JSON.stringify(returnData); dialogCallback(returnDataJ); returnData.button = null;
    }});
  }
  if (this.btn_neu_show) {
    var btn_neu__exit = this.btn_neu_exit;
    btn = dialog.getButton(Dialog.BUTTON_NEUTRAL);
    btn.setTextSize(this.btn_neu_txt_size); btn.setTextColor(this.btn_neu_txt_color); btn.setBackgroundColor(this.btn_neu_bg_color); //btn.setPadding(10, 10, 10, 10);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
    btn.setOnClickListener(new View.OnClickListener() {onClick:function(view) {if (btn_neu__exit) {dialog.dismiss();}
      returnData.button = Dialog.BUTTON_NEUTRAL; var returnDataJ = JSON.stringify(returnData); dialogCallback(returnDataJ); returnData.button = null;
    }});
  }
}

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//                Checkbox
//////////////////////////////////////////////

function dialogCheckbox(items, itemsState) {
  if (emptyVariable(items) || typeoff(items) != "array") {items = ["empty list"];}
  if (emptyVariable(itemsState)) {itemsState = []; for (var i = 0; i < items.length; i++) {itemsState.push(false);}}
  this.item_txt = items;
  this.item_exit = false;
  this.item_state = itemsState;
  this.btn_pos_txt = "Checked";
  this.btn_neg_txt = "Close";
  this.btn_neu_txt = "Unchecked";
}
dialogCheckbox.prototype = new dialogSettings();
dialogCheckbox.prototype.getItems = function() {return this.item_txt;}
dialogCheckbox.prototype.setItems = function(items) {if (!emptyVariable(items) && typeoff(items) == "array") {this.item_txt = items; var itemsState = []; for (var i = 0; i < items.length; i++) {itemsState.push(false);} this.item_state = itemsState;}}
dialogCheckbox.prototype.setItemsState = function(items) {if (!emptyVariable(items) && typeoff(items) == "array") {var itemsState = []; for (var i = 0; i < this.item_txt.length; i++) {if (typeoff(items[i]) == "boolean") {itemsState.push(items[i]);} else {itemsState.push(false);}} this.item_state = itemsState;}}

dialogCheckbox.prototype.show = function() {
  var returnData = {};
  returnData.name = this.name;
  returnData.dialog = "Checkbox";
  returnData.button = null;
  returnData.position = -1;
  returnData.exit = false;
  returnData.state = this.item_state;

  var colorStateList = [[
  [-R.attr.state_checked],//unchecked
  [ R.attr.state_checked]],
  [this.ac_color, this.ac_color]];
  colorStateList = new ColorStateList(colorStateList[0], colorStateList[1]);

  var builder = new AlertDialog.Builder(context);

  if (this.title_show) {
    var myTVtitle = new TextView(context);
    myTVtitle.setText(this.title_txt);
    myTVtitle.setTextColor(this.title_txt_color);
    myTVtitle.setTextSize(this.title_txt_size);
    myTVtitle.setBackgroundColor(this.title_bg_color);
    myTVtitle.setPadding(10, 20, 10, 20);//setPadding(int left, int top, int right, int bottom)
    //myTVtitle.setGravity(Gravity.CENTER);
    //myTVtitle.setBackgroundResource(R.drawable.gradient);
    builder.setCustomTitle(myTVtitle);
    //builder.setTitle(this.title_txt);
  }

  var item_bg__color = this.item_bg_color; var item_txt__color = this.item_txt_color; var item_txt__size = this.item_txt_size;
  var adapter = new JavaAdapter(ArrayAdapter, {
    getView:function(position, convertView, parent) {
      var view = this.super$getView(position, convertView, parent);
      view.setBackgroundColor(item_bg__color);
      view.setTextColor(item_txt__color);
      view.setTextSize(item_txt__size);
      //view.setGravity(Gravity.CENTER);
      //view.setPadding(10,10,10,10);
      view.setCheckMarkTintList(colorStateList);
      return view;
    }
  //{}, context, R.layout.select_dialog_multichoice, this.item_txt);
  }, context, R.layout.simple_list_item_multiple_choice, this.item_txt);
  builder.setAdapter(adapter, null);
/* //default Checkbox dialog, no need for the adapter
  builder.setMultiChoiceItems(this.item_txt, this.item_state, new DialogInterface.OnMultiChoiceClickListener() {onClick:function(dialog, position, isChecked) {
      if (isChecked) {returnData.state[position] = true;} else {returnData.state[position] = false;}
  }});
  */
  if (this.btn_pos_show) {builder.setPositiveButton(this.btn_pos_txt, null);}
  if (this.btn_neg_show) {builder.setNegativeButton(this.btn_neg_txt, null);}
  if (this.btn_neu_show) {builder.setNeutralButton(this.btn_neu_txt, null);}

  //builder.setOnCancelListener(new DialogInterface.OnCancelListener() {onCancel:function(dialog) {showToast("Cancel");}});
  builder.setOnDismissListener(new DialogInterface.OnDismissListener() {onDismiss:function(dialog) {
    returnData.exit = true; var returnDataJ = JSON.stringify(returnData); dialogCallback(returnDataJ);
  }});

  var dialog = builder.create();
  //dialog.setCancelable(true); //default = true
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

  var item__exit = this.item_exit;
  lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {onItemClick:function(dialogg, view, position, id) {//view is a checkedTextView
    if (view.isChecked()) {returnData.state[position] = true;} else {returnData.state[position] = false;}
    //view.setBackgroundColor(item_bg__color); //focus color, if position match last position, reset prev color
    //returnData.position = position; var returnDataJ = JSON.stringify(returnData); dialogCallback(returnDataJ); returnData.position = -1;
  }});

  dialog.show();

  lv.getLayoutParams().setMargins(this.item_div_size, 0, this.item_div_size, 0);
  for (var i = 0; i < this.item_txt.length; i++) {lv.setItemChecked(i, returnData.state[i]);}  //lv.getChildCount(); //like array.length

  var btn;
  if (this.btn_pos_show) {
    var btn_pos__exit = this.btn_pos_exit;
    btn = dialog.getButton(Dialog.BUTTON_POSITIVE);
    btn.setTextSize(this.btn_pos_txt_size); btn.setTextColor(this.btn_pos_txt_color); btn.setBackgroundColor(this.btn_pos_bg_color); //btn.setPadding(10, 10, 10, 10);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
    btn.setOnClickListener(new View.OnClickListener() {onClick:function(view) {if (btn_pos__exit) {dialog.dismiss();}
      returnData.button = Dialog.BUTTON_POSITIVE; var returnDataJ = JSON.stringify(returnData); dialogCallback(returnDataJ); returnData.button = null;
    }});
  }
  if (this.btn_neg_show) {
    var btn_neg__exit = this.btn_neg_exit;
    btn = dialog.getButton(Dialog.BUTTON_NEGATIVE);
    btn.setTextSize(this.btn_neg_txt_size); btn.setTextColor(this.btn_neg_txt_color); btn.setBackgroundColor(this.btn_neg_bg_color); //btn.setPadding(10, 10, 10, 10);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
    btn.setOnClickListener(new View.OnClickListener() {onClick:function(view) {if (btn_neg__exit) {dialog.dismiss();}
      returnData.button = Dialog.BUTTON_NEGATIVE; var returnDataJ = JSON.stringify(returnData); dialogCallback(returnDataJ); returnData.button = null;
    }});
  }
  if (this.btn_neu_show) {
    var btn_neu__exit = this.btn_neu_exit;
    btn = dialog.getButton(Dialog.BUTTON_NEUTRAL);
    btn.setTextSize(this.btn_neu_txt_size); btn.setTextColor(this.btn_neu_txt_color); btn.setBackgroundColor(this.btn_neu_bg_color); //btn.setPadding(10, 10, 10, 10);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
    btn.setOnClickListener(new View.OnClickListener() {onClick:function(view) {if (btn_neu__exit) {dialog.dismiss();}
      returnData.button = Dialog.BUTTON_NEUTRAL; var returnDataJ = JSON.stringify(returnData); dialogCallback(returnDataJ); returnData.button = null;
    }});
  }
}

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//                TextInput
//////////////////////////////////////////////

function dialogTextInput(num) {
  if (emptyVariable(num) || typeoff(num) != "number") {num = 1;}
  this.item_txt = [];
  this.item_txt_in = [];
  this.item_txt_hnt = [];
  this.item_txt_num = num;
  this.item_exit = false;
  this.btn_pos_txt = "Ok";
  this.btn_neg_txt = "Close";
  this.btn_neu_txt = "Test";
  for (var i = 0; i < num; ++i) {this.item_txt.push(""); this.item_txt_in.push(""); this.item_txt_hnt.push("");}
}
dialogTextInput.prototype = new dialogSettings();

dialogTextInput.prototype.setInputTextNumber = function(num) {if (!emptyVariable(num) && typeoff(num) == "number") {
  this.item_txt_num = num; this.item_txt = []; this.item_txt_in = []; this.item_txt_hnt = [];
  for (var i = 0; i < num; ++i) {this.item_txt.push(""); this.item_txt_in.push(""); this.item_txt_hnt.push("");}
}}
dialogTextInput.prototype.setLabelText = function(items) {if (emptyVariable(items)) {return;}
  if (typeoff(items) == "array") {this.item_txt = []; for (var i = 0; i < items.length; i++) {this.item_txt.push(items[i].toString());}}
  else {this.item_txt[0] = items.toString();}
  this.normalizeLength();
}
dialogTextInput.prototype.setInputText = function(items) {if (emptyVariable(items)) {return;}
  if (typeoff(items) == "array") {this.item_txt_in = []; for (var i = 0; i < items.length; i++) {this.item_txt_in.push(items[i].toString());}}
  else {this.item_txt_in[0] = items.toString();}
  this.normalizeLength();
}
dialogTextInput.prototype.setHintText = function(items) {if (emptyVariable(items)) {return;}
  if (typeoff(items) == "array") {this.item_txt_hnt = []; for (var i = 0; i < items.length; i++) {this.item_txt_hnt.push(items[i].toString());}}
  else {this.item_txt_hnt[0] = items.toString();}
  this.normalizeLength();
}
dialogTextInput.prototype.normalizeLength = function() {
  var num = Math.max(this.item_txt.length, this.item_txt_in.length, this.item_txt_hnt.length);
  if (num > this.item_txt_num) {this.item_txt_num = num;}
  for (var i = 0; i < this.item_txt_num; i++) {
    if (i > this.item_txt.length - 1) {this.item_txt.push("");}
    if (i > this.item_txt_in.length - 1) {this.item_txt_in.push("");}
    if (i > this.item_txt_hnt.length - 1) {this.item_txt_hnt.push("");}
  }
}
dialogTextInput.prototype.show = function() {
  var returnData = {};
  returnData.name = this.name;
  returnData.dialog = "TextInput";
  returnData.button = null;
  returnData.exit = false;
  returnData.text = [];
  returnData.num = this.item_txt_num;

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

  var myTVitem = []; var editText = [];
  for (var i = 0; i < returnData.num; i++) {
    //Label
    if (this.item_txt[i] == "") {myTVitem.push(null);} else {
      myTVitem.push(new TextView(context));
      myTVitem[i].setText(this.item_txt[i]);
      myTVitem[i].setTextColor(this.item_txt_color);
      myTVitem[i].setTextSize(this.item_txt_size);
      myTVitem[i].setBackgroundColor(this.item_bg_color);
      myTVitem[i].setPadding(10, 20, 10, 20);//setPadding(int left, int top, int right, int bottom)
      myTVitem[i].setGravity(Gravity.CENTER);
      //myTVitem.setBackgroundResource(R.drawable.gradient);
      myLL.addView(myTVitem[i]);
    }

    editText.push(new EditText(context));
    editText[i].setText(this.item_txt_in[i]);
    editText[i].setHint(this.item_txt_hnt[i]);
    editText[i].setTextColor(this.item_txt_color);
    editText[i].setHintTextColor(this.item_hnt_color);
    editText[i].setBackgroundTintList(colorStateList); //editText[i].setBackgroundTintList(ColorStateList.valueOf(0xcc00aaee));
    //editText[i].setInputType(InputType.TYPE_CLASS_TEXT); //editText[i].setInputType(InputType.TYPE_CLASS_NUMBER); //editText[i].setInputType(InputType.TYPE_CLASS_DATETIME);
    //editText[i].setBackgroundColor(this.item_bg_color);
    //set the width/height of edittext
    //editText[i].setLayoutParams(new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT));
    //editText[i].setCompoundDrawables(Drawable left, Drawable top, Drawable right, Drawable bottom)
    //editText[i].setCompoundDrawables(new ColorDrawable(0x00000000), new ColorDrawable(0x00000000), new ColorDrawable(0x00000000), new ColorDrawable(0xcc00aaee))
    //setEllipsize(TextUtils.TruncateAt where)
    //Causes worthis.in the text that are longer than the view's width to be ellipsized instead of broken in the middle.
    //setHighlightColor(int color)
    //setCursorDrawableColor(editText[i], 0xff00ff00);
    //builder.setView(editText);
    myLL.addView(editText[i]);
  }
  myTVitem = null;

  builder.setView(myLL);

  if (this.btn_pos_show) {builder.setPositiveButton(this.btn_pos_txt, null);}
  if (this.btn_neg_show) {builder.setNegativeButton(this.btn_neg_txt, null);}
  if (this.btn_neu_show) {builder.setNeutralButton(this.btn_neu_txt, null);}

  //builder.setOnCancelListener(new DialogInterface.OnCancelListener() {onCancel:function(dialog) {showToast("Cancel");}});
  builder.setOnDismissListener(new DialogInterface.OnDismissListener() {onDismiss:function(dialog) {
    returnData.exit = true; var returnDataJ = JSON.stringify(returnData); dialogCallback(returnDataJ);
  }});

  var dialog = builder.create();
  //dialog.setCancelable(true); //default = true
  //dialog.setCanceledOnTouchOutside(false); //default = true

  if (!this.title_show) {dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);}

  var window = dialog.getWindow();
  window.setBackgroundDrawable(new ColorDrawable(this.bg_color));
  //window.setGravity(Gravity.FILL_VERTICAL);//window.setGravity(Gravity.CENTER);

  dialog.show();

  myLL.getLayoutParams().setMargins(this.item_div_size, 0, this.item_div_size, 0);

  var btn;
  if (this.btn_pos_show) {
    var btn_pos__exit = this.btn_pos_exit;
    btn = dialog.getButton(Dialog.BUTTON_POSITIVE);
    btn.setTextSize(this.btn_pos_txt_size); btn.setTextColor(this.btn_pos_txt_color); btn.setBackgroundColor(this.btn_pos_bg_color); //btn.setPadding(10, 10, 10, 10);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
    btn.setOnClickListener(new View.OnClickListener() {onClick:function(view) {if (btn_pos__exit) {dialog.dismiss();}
      for (var i = 0; i < returnData.num; i++) {returnData.text.push(editText[i].getText().toString());}
      returnData.button = Dialog.BUTTON_POSITIVE; var returnDataJ = JSON.stringify(returnData); dialogCallback(returnDataJ); returnData.button = null; returnData.text = [];
    }});
  }
  if (this.btn_neg_show) {
    var btn_neg__exit = this.btn_neg_exit;
    btn = dialog.getButton(Dialog.BUTTON_NEGATIVE);
    btn.setTextSize(this.btn_neg_txt_size); btn.setTextColor(this.btn_neg_txt_color); btn.setBackgroundColor(this.btn_neg_bg_color); //btn.setPadding(10, 10, 10, 10);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
    btn.setOnClickListener(new View.OnClickListener() {onClick:function(view) {if (btn_neg__exit) {dialog.dismiss();}
      for (var i = 0; i < returnData.num; i++) {returnData.text.push(editText[i].getText().toString());}
      returnData.button = Dialog.BUTTON_NEGATIVE; var returnDataJ = JSON.stringify(returnData); dialogCallback(returnDataJ); returnData.button = null; returnData.text = [];
    }});
  }
  if (this.btn_neu_show) {
    var btn_neu__exit = this.btn_neu_exit;
    btn = dialog.getButton(Dialog.BUTTON_NEUTRAL);
    btn.setTextSize(this.btn_neu_txt_size); btn.setTextColor(this.btn_neu_txt_color); btn.setBackgroundColor(this.btn_neu_bg_color); //btn.setPadding(10, 10, 10, 10);
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
    btn.setOnClickListener(new View.OnClickListener() {onClick:function(view) {if (btn_neu__exit) {dialog.dismiss();}
      for (var i = 0; i < returnData.num; i++) {returnData.text.push(editText[i].getText().toString());}
      returnData.button = Dialog.BUTTON_NEUTRAL; var returnDataJ = JSON.stringify(returnData); dialogCallback(returnDataJ); returnData.button = null; returnData.text = [];
    }});
  }
}

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//                Your Code
//////////////////////////////////////////////

var msg = new dialogMessage("test"); msg.setName("msg");   msg.setTitleText("Message Dialog"); msg.setColorAccent(0xdd00ff00); msg.setButtonNegativeText("Close");
var lst = new dialogList();          lst.setName("list");  lst.setTitleText("List Dialog"); lst.setColorAccent(0xdd00ff00); lst.setItems(["Easy", "Medium", "Hard", "Very Hard"]); lst.setButtonNegativeText("Close");
var chk = new dialogCheckbox();      chk.setName("check"); chk.setTitleText("Checkbox Dialog"); chk.setItems(["Easy", "Medium", "Hard", "Very Hard"]); //chk.setButtonNegativeText("Close");
var txt = new dialogTextInput(2);    txt.setName("text");  txt.setTitleText("Text Input Dialog"); txt.setLabelText("Difficulty"); txt.setHintText(["Easy", "Hard"]);
var mnu = new dialogList();          mnu.setName("menu");  mnu.setTitleText("Dialog Menu"); mnu.setItems(["Message", "List", "Checkbox", "Text"]); mnu.exitOnClickItem(); mnu.setButtonNegativeText("Exit"); mnu.hideButtonPositive(); mnu.hideButtonNeutral();
var menu_act = [msg, lst, chk, txt];
mnu.show(); //msg.show(); //lst.show();

//var receiver = new JavaAdapter(BroadcastReceiver, {onReceive:function(c, i) { //context, intent //android.content.ContextWrapper
var receiver = new BroadcastReceiver() {onReceive:function(c, i) {
  var e = i.getExtras();
  if (e.containsKey(dialogIntentKey)) {
    var value = e.get(dialogIntentKey); //showToast("receiver: " + value);
    var myData = JSON.parse(value); //if (emptyVariable(myData.position) && myData.position != 0) {myData.position = -1;}
    //showToast("dia: " + myData.dialog + "\nbtn: " + myData.button + "\nexit: " + myData.exit + "\nname: " + myData.name);

    switch (myData.dialog) {
      case "Message":
      /*
      myData.name = this.name;
      myData.dialog = "Message";
      myData.button = null;
      myData.exit = false;
      */
        if (myData.name == "msg") {
          if (myData.button == Dialog.BUTTON_POSITIVE) {showToast("Button: Positive");}
          //if (myData.button == Dialog.BUTTON_NEGATIVE) {showToast("Button: Negative");}
          if (myData.button == Dialog.BUTTON_NEUTRAL) {showToast("Button: Neutral");}
        }
        break;
      case "List":
      /*
      myData.name = this.name;
      myData.dialog = "List";
      myData.button = null;
      myData.position = -1;
      myData.exit = false;
      */
        if (myData.name == mnu.getName()) {
          if (myData.position != -1) {menu_act[myData.position].show();}
          if (myData.button == Dialog.BUTTON_POSITIVE) {showToast("Button: Positive");}
          if (myData.button == Dialog.BUTTON_NEGATIVE) {try {if (receiver != null) {context.unregisterReceiver(receiver);}} catch (e) {alert(e.toString());}}
          if (myData.button == Dialog.BUTTON_NEUTRAL) {showToast("Button: Neutral");}
        }
        if (myData.name == lst.getName()) {
          if (myData.position != -1) {showToast(lst.getItems()[myData.position]);}
          if (myData.button == Dialog.BUTTON_POSITIVE) {showToast("Button: Positive");}
          //if (myData.button == Dialog.BUTTON_NEGATIVE) {showToast("Button: Negative");}
          if (myData.button == Dialog.BUTTON_NEUTRAL) {showToast("Button: Neutral");}
        }
        break;
      case "Checkbox":
      /*
      myData.name = this.name;
      myData.dialog = "Checkbox";
      myData.button = null;
      myData.position = -1;
      myData.exit = false;
      myData.state = this.item_state;
      */
        if (myData.name == chk.getName()) {
          if (myData.position != -1) {showToast(chk.getItems()[myData.position]);}
          if (myData.button == Dialog.BUTTON_POSITIVE) {
            var itemsChecked = []; var items = chk.getItems();
            for (i = 0; i < myData.state.length; i++) {if (myData.state[i]) {itemsChecked.push(items[i]);}}
            showToast(itemsChecked.join(", ") + "\n\n" + myData.state);
          }
          if (myData.button == Dialog.BUTTON_NEGATIVE) {chk.setItemsState(myData.state);}
          if (myData.button == Dialog.BUTTON_NEUTRAL) {
            var itemsChecked = []; var items = chk.getItems();
            for (i = 0; i < myData.state.length; i++) {if (!myData.state[i]) {itemsChecked.push(items[i]);}}
            showToast(itemsChecked.join(", ") + "\n\n" + myData.state);
          }
        }
        break;
      case "TextInput":
      /*
      myData.name = this.name;
      myData.dialog = "TextInput";
      myData.button = null;
      myData.exit = false;
      myData.text = [];
      myData.num = this.item_txt_num;
      */
        if (myData.name == txt.getName()) {
          //var items = []; for (i = 0; i < myData.text.length; i++) {if (myData.state[i]) {items.push(myData.text[i]);}}
          if (myData.button == Dialog.BUTTON_POSITIVE) {showToast(myData.text.join("\n\n"));}
          if (myData.button == Dialog.BUTTON_NEGATIVE) {txt.setInputText(myData.text);}
          if (myData.button == Dialog.BUTTON_NEUTRAL) {showToast(myData.text.join("\n\n"));}
        }
        break;
    }
    if (myData.exit && myData.name != "menu") {mnu.show();}
  }
}};
context.registerReceiver(receiver, new IntentFilter(dialogIntent));
//LocalBroadcastManager.context.registerReceiver(receiver, new IntentFilter(dialogIntent));

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
