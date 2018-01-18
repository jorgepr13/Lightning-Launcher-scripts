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
bindClass("android.widget.Toast");//Toast.LENGTH_SHORT; Toast.LENGTH_LON

//bindClass("android.graphics.PorterDuff.Mode");
//bindClass("android.graphics.drawable.Drawable");
//bindClass("android.widget.Adapter");
//bindClass("android.view.View");
//bindClass("android.R.attr");
//bindClass("android.R.layout");
//bindClass("android.R.color");
//bindClass("android.graphics.Color");
//bindClass("android.app.Activity");
//bindClass("android.view.WindowManager");
//bindClass("android.view.ViewGroup.LayoutParams");
//bindClass("android.view.ViewGroup.MarginLayoutParams");

var context = getActiveScreen().getContext();

//typeoff return: 'Array, Object, String, Date, RegExp, Function, Boolean, Number, Null, Undefined'
function typeoff(elem) {return Object.prototype.toString.call(elem).split(/\W/)[2].toLowerCase()};
function emptyVariable(myVar) {return myVar == null || myVar == undefined || myVar == "";}
function showToast(myMsg, longDuration) {if (!emptyVariable(myMsg)) {var mDuration = Toast.LENGTH_SHORT; if (emptyVariable(longDuration) || typeoff(longDuration) != "boolean") {longDuration = false}; if (longDuration) {mDuration = Toast.LENGTH_LONG;}; Toast.makeText(context, myMsg, mDuration).show();}}


var myItems = ["Easy","Medium","Hard","Very Hard"];

//dialogMessageShow(myItems.join("\n"));
//dialogListShow(myItems);
//dialogCheckboxShow(myItems);
//dialogTextInputShow("Input some text:","sample text");
dialogMenuShow();

//var dialog = new AlertDialog.Builder(context).setMessage("Hello world").show();

function dialogSettings() {
  var ds = {};//dialog settings
  //main
  ds.ac_color  = 0xff2233ff;
  ds.bg_color  = 0xdd222222;
  ds.itm_color = 0x88333333;
  ds.txt_color = 0xddffffff;
  ds.txt_size  = 18;
  //title
  ds.title_txt       = "Title";
  ds.title_txt_size  = ds.txt_size + 6;
  ds.title_txt_color = ds.txt_color;
  ds.title_bg_color  = ds.ac_color;
  ds.title_show      = true;
  //item
  ds.item_txt       = "Text";
  ds.item_txt_size  = ds.txt_size;
  ds.item_txt_color = ds.txt_color;
  ds.item_bg_color  = ds.itm_color;
  ds.item_div_color = 0x00000000;
  ds.item_div_size  = 12;
  ds.item_hnt_color = 0x55ffffff;
  //buttons
  ds.btn_pos_txt       = "OK";
  ds.btn_pos_txt_size  = ds.txt_size - 6;
  ds.btn_pos_txt_color = ds.txt_color;
  ds.btn_pos_bg_color  = ds.itm_color;
  ds.btn_pos_show      = true;

  ds.btn_neg_txt       = "Close";
  ds.btn_neg_txt_size  = ds.txt_size - 6;
  ds.btn_neg_txt_color = ds.txt_color;
  ds.btn_neg_bg_color  = ds.itm_color;
  ds.btn_neg_show      = true;

  ds.btn_neu_txt       = "Test";
  ds.btn_neu_txt_size  = ds.txt_size - 6;
  ds.btn_neu_txt_color = ds.txt_color;
  ds.btn_neu_bg_color  = ds.itm_color;
  ds.btn_neu_show      = true;

  return ds;
}

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
  var ds = dialogSettings();
  ds.item_act = [dialogMessageShow, dialogListShow, dialogCheckboxShow, dialogTextInputShow];
  ds.item_txt = ["Message", "List", "Checkbox List", "Text Input"];
  ds.title_show   = true;  ds.title_txt = "Select the Dialog to show:";
  ds.btn_pos_show = false; //ds.btn_pos_txt = "OK";
  ds.btn_neg_show = true;  //ds.btn_neg_txt = "Close";
  ds.btn_neu_show = false; //ds.btn_neu_txt = "Test";
  
  var dialogExit = false;
  var builder = new AlertDialog.Builder(context);

  if (ds.title_show) {
    var myTVtitle = new TextView(context);
    myTVtitle.setText(ds.title_txt);
    myTVtitle.setTextColor(ds.title_txt_color);
    myTVtitle.setTextSize(ds.title_txt_size);
    myTVtitle.setBackgroundColor(ds.title_bg_color);
    myTVtitle.setPadding(10, 20, 10, 20);//setPadding(int left, int top, int right, int bottom)
    myTVtitle.setGravity(Gravity.CENTER);
    //myTVtitle.setBackgroundResource(R.drawable.gradient);
    builder.setCustomTitle(myTVtitle);
    //builder.setTitle(ds.title_txt);
  }

  var adapter = new JavaAdapter(ArrayAdapter, {
    getView:function(position, convertView, parent) {
      var view = this.super$getView(position, convertView, parent);
      view.setBackgroundColor(ds.item_bg_color);
      view.setTextColor(ds.item_txt_color);
      view.setTextSize(ds.item_txt_size);
      //view.setPadding(10,10,10,10);
      return view;
    }
  }, context, R.layout.simple_list_item_1, ds.item_txt);

  builder.setAdapter(adapter, new DialogInterface.OnClickListener() {
    onClick:function(dialog, position) {dialog.cancel(); dialogMenuHandler(position, ds.item_act);}
  });
  /*
    //default list dialog, no need for the adapter
    builder.setItems(item_txt, new DialogInterface.OnClickListener() {
      onClick:function(dialog, position) {dialog.cancel(); dialogMenuHandler(position, ds.item_act);}
    });
  */
  if (ds.btn_pos_show) {
    builder.setPositiveButton(ds.btn_pos_txt, new DialogInterface.OnClickListener() {
      onClick:function(dialog, buttonId) {dialogButtonHandler(buttonId);}
    });
  }
  if (ds.btn_neg_show) {
    builder.setNegativeButton(ds.btn_neg_txt, new DialogInterface.OnClickListener() {
      onClick:function(dialog, buttonId) {dialog.cancel();}
    });
  }
  if (ds.btn_neu_show) {
    builder.setNeutralButton(ds.btn_neu_txt, new DialogInterface.OnClickListener() {
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

  if (!ds.title_show) {dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);}

  var window = dialog.getWindow();
  window.setBackgroundDrawable(new ColorDrawable(ds.bg_color));
  //window.setGravity(Gravity.FILL_VERTICAL);//window.setGravity(Gravity.CENTER);

  var lv = dialog.getListView();
  lv.setDivider(new ColorDrawable(ds.item_div_color));
  lv.setDividerHeight(ds.item_div_size);
  //lv.setHeaderDividersEnabled(false);
  //lv.setFooterDividersEnabled(false);
  //lv.setCacheColorHint(0xaa00aa00);

  dialog.show();

  lv.getLayoutParams().setMargins(ds.item_div_size, 0, ds.item_div_size, 0);

  var btn;
  if (ds.btn_pos_show) {
    btn = dialog.getButton(Dialog.BUTTON_POSITIVE);
    btn.setTextSize(ds.btn_pos_txt_size); btn.setTextColor(ds.btn_pos_txt_color); btn.setBackgroundColor(ds.btn_pos_bg_color);
    //btn.setPadding(10, 10, 10, 10); 
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
  }
  if (ds.btn_neg_show) {
    btn = dialog.getButton(Dialog.BUTTON_NEGATIVE);
    btn.setTextSize(ds.btn_neg_txt_size); btn.setTextColor(ds.btn_neg_txt_color); btn.setBackgroundColor(ds.btn_neg_bg_color);
    //btn.setPadding(10, 10, 10, 10); 
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
  }
  if (ds.btn_neu_show) {
    btn = dialog.getButton(Dialog.BUTTON_NEUTRAL);
    btn.setTextSize(ds.btn_neu_txt_size); btn.setTextColor(ds.btn_neu_txt_color); btn.setBackgroundColor(ds.btn_neu_bg_color);
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

function dialogMessageShow(message){
  if (emptyVariable(message)) {message = "";}
  
  var ds = dialogSettings();
  ds.item_txt = message;
  ds.title_show   = true;  ds.title_txt = "Message Dialog";
  ds.btn_pos_show = true;  //ds.btn_pos_txt = "OK";
  ds.btn_neg_show = true;  //ds.btn_neg_txt = "Close";
  ds.btn_neu_show = false; //ds.btn_neu_txt = "Test";
  
  var dialogExit = false;
  var builder = new AlertDialog.Builder(context);

  if (ds.title_show) {
    var myTVtitle = new TextView(context);
    myTVtitle.setText(ds.title_txt);
    myTVtitle.setTextColor(ds.title_txt_color);
    myTVtitle.setTextSize(ds.title_txt_size);
    myTVtitle.setBackgroundColor(ds.title_bg_color);
    myTVtitle.setPadding(10, 20, 10, 20);//setPadding(int left, int top, int right, int bottom)
    myTVtitle.setGravity(Gravity.CENTER);
    //myTVtitle.setBackgroundResource(R.drawable.gradient);
    builder.setCustomTitle(myTVtitle);
    //builder.setTitle(ds.title_txt);
  }

  if (ds.item_txt != "") {
    var myTVitem = new TextView(context);
    myTVitem.setText(ds.item_txt);
    myTVitem.setTextColor(ds.item_txt_color);
    myTVitem.setTextSize(ds.item_txt_size);
    myTVitem.setBackgroundColor(ds.item_bg_color);
    myTVitem.setPadding(10, 20, 10, 20);//setPadding(int left, int top, int right, int bottom)
    myTVitem.setGravity(Gravity.CENTER);
    //myTVitem.setBackgroundResource(R.drawable.gradient);
    builder.setView(myTVitem);
    //builder.setMessage(ds.item_txt);
  }

  if (ds.btn_pos_show) {
    builder.setPositiveButton(ds.btn_pos_txt, new DialogInterface.OnClickListener() {
      onClick:function(dialog, buttonId) {dialogButtonHandler(buttonId);}
    });
  }
  if (ds.btn_neg_show) {
    builder.setNegativeButton(ds.btn_neg_txt, new DialogInterface.OnClickListener() {
      onClick:function(dialog, buttonId) {dialog.cancel();}
    });
  }
  if (ds.btn_neu_show) {
    builder.setNeutralButton(ds.btn_neu_txt, new DialogInterface.OnClickListener() {
      onClick:function(dialog, buttonId) {dialogButtonHandler(buttonId);}
    });
  }
  builder.setOnCancelListener(new DialogInterface.OnCancelListener() {
    onCancel:function(dialog) {dialogExit = true;}
  });

  //cancel is called when explicit set, pressing the back key / default action is dismiss / after cancel, dissmiss gets called too
  builder.setOnDismissListener(new DialogInterface.OnDismissListener() {
    onDismiss:function(dialog) {
      if (dialogExit) {dialogMenuShow();} else {dialogMessageShow(ds.item_txt);}
    }
  });

  var dialog = builder.create();
  //dialog.setCancelable(true); //dialog.setCancelable(false);
  //dialog.setCanceledOnTouchOutside(false); //default = true

  if (!ds.title_show) {dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);}

  var window = dialog.getWindow();
  window.setBackgroundDrawable(new ColorDrawable(ds.bg_color));
  //window.setGravity(Gravity.FILL_VERTICAL); //window.setGravity(Gravity.CENTER);

  dialog.show();
  
  myTVitem.getLayoutParams().setMargins(20, 20, 20, 20);
  
  var btn;
  if (ds.btn_pos_show) {
    btn = dialog.getButton(Dialog.BUTTON_POSITIVE);
    btn.setTextSize(ds.btn_pos_txt_size); btn.setTextColor(ds.btn_pos_txt_color); btn.setBackgroundColor(ds.btn_pos_bg_color);
    //btn.setPadding(10, 10, 10, 10); 
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
  }
  if (ds.btn_neg_show) {
    btn = dialog.getButton(Dialog.BUTTON_NEGATIVE);
    btn.setTextSize(ds.btn_neg_txt_size); btn.setTextColor(ds.btn_neg_txt_color); btn.setBackgroundColor(ds.btn_neg_bg_color);
    //btn.setPadding(10, 10, 10, 10); 
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
  }
  if (ds.btn_neu_show) {
    btn = dialog.getButton(Dialog.BUTTON_NEUTRAL);
    btn.setTextSize(ds.btn_neu_txt_size); btn.setTextColor(ds.btn_neu_txt_color); btn.setBackgroundColor(ds.btn_neu_bg_color);
    //btn.setPadding(10, 10, 10, 10); 
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
  }
}


function dialogListShow(items){
  if (emptyVariable(items)) {return null;}
  
  var ds = dialogSettings();
  ds.item_txt = items;
  ds.title_show   = true;  ds.title_txt = "List Dialog";
  ds.btn_pos_show = false; //ds.btn_pos_txt = "OK";
  ds.btn_neg_show = true;  //ds.btn_neg_txt = "Close";
  ds.btn_neu_show = false; //ds.btn_neu_txt = "Test";

  var dialogExit = false;
  var builder = new AlertDialog.Builder(context);

  if (ds.title_show) {
    var myTVtitle = new TextView(context);
    myTVtitle.setText(ds.title_txt);
    myTVtitle.setTextColor(ds.title_txt_color);
    myTVtitle.setTextSize(ds.title_txt_size);
    myTVtitle.setBackgroundColor(ds.title_bg_color);
    myTVtitle.setPadding(10, 20, 10, 20);//setPadding(int left, int top, int right, int bottom)
    myTVtitle.setGravity(Gravity.CENTER);
    //myTVtitle.setBackgroundResource(R.drawable.gradient);
    builder.setCustomTitle(myTVtitle);
    //builder.setTitle(ds.title_txt);
  }

  var adapter = new JavaAdapter(ArrayAdapter, {
    getView:function(position, convertView, parent) {
      var view = this.super$getView(position, convertView, parent);
      view.setBackgroundColor(ds.item_bg_color);
      view.setTextColor(ds.item_txt_color);
      view.setTextSize(ds.item_txt_size);
      //view.setPadding(10,10,10,10);
      return view;
    }
  }, context, R.layout.simple_list_item_1, ds.item_txt);

  builder.setAdapter(adapter, new DialogInterface.OnClickListener() {
    //onClick:function(dialog, position) {showToast(items[position]);}
    onClick:function(dialog, position) {showToast(ds.item_txt[position]);}
  });
/*
  //default list dialog, no need for the adapter
  builder.setItems(ds.item_txt, new DialogInterface.OnClickListener() {
    onClick:function(dialog, position) {showToast(ds.item_txt[position]);}
  });
*/
  if (ds.btn_pos_show) {
    builder.setPositiveButton(ds.btn_pos_txt, new DialogInterface.OnClickListener() {
      onClick:function(dialog, buttonId) {dialogButtonHandler(buttonId);}
    });
  }
  if (ds.btn_neg_show) {
    builder.setNegativeButton(ds.btn_neg_txt, new DialogInterface.OnClickListener() {
      onClick:function(dialog, buttonId) {dialog.cancel();}
    });
  }
  if (ds.btn_neu_show) {
    builder.setNeutralButton(ds.btn_neu_txt, new DialogInterface.OnClickListener() {
      onClick:function(dialog, buttonId) {dialogButtonHandler(buttonId);}
    });
  }
  builder.setOnCancelListener(new DialogInterface.OnCancelListener() {
    onCancel:function(dialog) {dialogExit = true;}
  });

  //cancel is called when explicit set, pressing the back key / default action is dismiss / after cancel, dissmiss gets called too
  builder.setOnDismissListener(new DialogInterface.OnDismissListener() {
    onDismiss:function(dialog) {
      if (dialogExit) {dialogMenuShow();} else {dialogListShow(ds.item_txt);}
    }
  });

  var dialog = builder.create();
  //dialog.setCancelable(true); //dialog.setCancelable(false);
  //dialog.setCanceledOnTouchOutside(false); //default = true

  if (!ds.title_show) {dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);}

  var window = dialog.getWindow();
  window.setBackgroundDrawable(new ColorDrawable(ds.bg_color));
  //window.setGravity(Gravity.FILL_VERTICAL);//window.setGravity(Gravity.CENTER);

  var lv = dialog.getListView();
  lv.setDivider(new ColorDrawable(ds.item_div_color));
  lv.setDividerHeight(ds.item_div_size);
  //lv.setHeaderDividersEnabled(false);
  //lv.setFooterDividersEnabled(false);
  //lv.setCacheColorHint(0xaa00aa00);
  
  dialog.show();

  lv.getLayoutParams().setMargins(ds.item_div_size, 0, ds.item_div_size, 0);

  var btn;
  if (ds.btn_pos_show) {
    btn = dialog.getButton(Dialog.BUTTON_POSITIVE);
    btn.setTextSize(ds.btn_pos_txt_size); btn.setTextColor(ds.btn_pos_txt_color); btn.setBackgroundColor(ds.btn_pos_bg_color);
    //btn.setPadding(10, 10, 10, 10); 
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
  }
  if (ds.btn_neg_show) {
    btn = dialog.getButton(Dialog.BUTTON_NEGATIVE);
    btn.setTextSize(ds.btn_neg_txt_size); btn.setTextColor(ds.btn_neg_txt_color); btn.setBackgroundColor(ds.btn_neg_bg_color);
    //btn.setPadding(10, 10, 10, 10); 
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
  }
  if (ds.btn_neu_show) {
    btn = dialog.getButton(Dialog.BUTTON_NEUTRAL);
    btn.setTextSize(ds.btn_neu_txt_size); btn.setTextColor(ds.btn_neu_txt_color); btn.setBackgroundColor(ds.btn_neu_bg_color);
    //btn.setPadding(10, 10, 10, 10); 
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
  }
}


function dialogCheckboxShow(items, itemsState) {
  if (emptyVariable(items)) {return;}
  if (emptyVariable(itemsState)) {itemsState = []; for (var i = 0; i < items.length; ++i) {itemsState.push(false);}}
  
  var ds = dialogSettings();
  ds.item_txt = items;
  ds.title_show   = true;  ds.title_txt = "Select The Difficulty Level - Checkbox";
  ds.btn_pos_show = true;  ds.btn_pos_txt = "Selected";
  ds.btn_neg_show = true;  //ds.btn_neg_txt = "Close";
  ds.btn_neu_show = true;  ds.btn_neu_txt = "Deselected";

  var colorStateList = [[
  [-R.attr.state_checked],//unchecked
  [ R.attr.state_checked]],
  [ds.ac_color, ds.ac_color]];
  colorStateList = new ColorStateList(colorStateList[0], colorStateList[1]);

  var dialogExit = false;
  var builder = new AlertDialog.Builder(context);
  
  if (ds.title_show) {
    var myTVtitle = new TextView(context);
    myTVtitle.setText(ds.title_txt);
    myTVtitle.setTextColor(ds.title_txt_color);
    myTVtitle.setTextSize(ds.title_txt_size);
    myTVtitle.setBackgroundColor(ds.title_bg_color);
    myTVtitle.setPadding(10, 20, 10, 20);//setPadding(int left, int top, int right, int bottom)
    myTVtitle.setGravity(Gravity.CENTER);
    //myTVtitle.setBackgroundResource(R.drawable.gradient);
    builder.setCustomTitle(myTVtitle);
    //builder.setTitle(ds.title_txt);
  }
  
  var adapter = new JavaAdapter(ArrayAdapter, {
    getView:function(position, convertView, parent) {
      var view = this.super$getView(position, convertView, parent);
      view.setBackgroundColor(ds.item_bg_color);
      view.setTextColor(ds.item_txt_color);
      view.setTextSize(ds.item_txt_size);
      //view.setPadding(10,10,10,10);
      view.setCheckMarkTintList(colorStateList);
      return view;
    }
  //{}, context, R.layout.select_dialog_multichoice, ds.item_txt);
  }, context, R.layout.simple_list_item_multiple_choice, ds.item_txt);
  builder.setAdapter(adapter, null);
/*
  builder.setMultiChoiceItems(ds.item_txt, itemsState, new DialogInterface.OnMultiChoiceClickListener() {
    onClick:function(dialog, position, isChecked) {
      if (isChecked) {itemsState[position] = true;}
      else {itemsState[position] = false;}
    }
  });
*/
  if (ds.btn_pos_show) {
    builder.setPositiveButton(ds.btn_pos_txt, new DialogInterface.OnClickListener() {
      onClick:function(dialog, buttonId) {
        var itemsChecked = [];
        for (i = 0; i < items.length; i++) {
          if (itemsState[i]) {itemsChecked.push(items[i]);}
        }
        showToast(buttonId + " | " + itemsChecked.join(", ") + "\n" + itemsChecked + "\n" + itemsState);
      }
    });
  }
  if (ds.btn_neg_show) {
    builder.setNegativeButton(ds.btn_neg_txt, new DialogInterface.OnClickListener() {
      onClick:function(dialog, buttonId) {dialog.cancel();}
    });
  }
  if (ds.btn_neu_show) {
    builder.setNeutralButton(ds.btn_neu_txt, new DialogInterface.OnClickListener() {
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
      if (dialogExit) {dialogMenuShow();} else {dialogCheckboxShow(ds.item_txt, itemsState);}
    }
  });

  var dialog = builder.create();
  //dialog.setCancelable(true); //dialog.setCancelable(false);
  //dialog.setCanceledOnTouchOutside(false); //default = true

  if (!ds.title_show) {dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);}

  var window = dialog.getWindow();
  window.setBackgroundDrawable(new ColorDrawable(ds.bg_color));
  //window.setGravity(Gravity.FILL_VERTICAL);//window.setGravity(Gravity.CENTER);

  var lv = dialog.getListView();
  lv.setDivider(new ColorDrawable(ds.item_div_color));
  lv.setDividerHeight(ds.item_div_size);
  //lv.setHeaderDividersEnabled(false);
  //lv.setFooterDividersEnabled(false);
  //lv.setCacheColorHint(0xaa00aa00);
  lv.setChoiceMode(ListView.CHOICE_MODE_MULTIPLE);

  lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
    onItemClick:function(dialog, view, position, id) {
      if (view.isChecked()) {itemsState[position] = true;} else {itemsState[position] = false;}
      //view.setBackgroundColor(ds.item_bg_color);
      //view is a checkedTextView
    }
  });
  
  dialog.show();

  lv.getLayoutParams().setMargins(ds.item_div_size, 0, ds.item_div_size, 0);
  //lv.getChildCount(); //like array.length
  for (var i = 0; i < ds.item_txt.length; i++) {lv.setItemChecked(i, itemsState[i]);}

  var btn;
  if (ds.btn_pos_show) {
    btn = dialog.getButton(Dialog.BUTTON_POSITIVE);
    btn.setTextSize(ds.btn_pos_txt_size); btn.setTextColor(ds.btn_pos_txt_color); btn.setBackgroundColor(ds.btn_pos_bg_color);
    //btn.setPadding(10, 10, 10, 10); 
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
  }
  if (ds.btn_neg_show) {
    btn = dialog.getButton(Dialog.BUTTON_NEGATIVE);
    btn.setTextSize(ds.btn_neg_txt_size); btn.setTextColor(ds.btn_neg_txt_color); btn.setBackgroundColor(ds.btn_neg_bg_color);
    //btn.setPadding(10, 10, 10, 10); 
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
  }
  if (ds.btn_neu_show) {
    btn = dialog.getButton(Dialog.BUTTON_NEUTRAL);
    btn.setTextSize(ds.btn_neu_txt_size); btn.setTextColor(ds.btn_neu_txt_color); btn.setBackgroundColor(ds.btn_neu_bg_color);
    //btn.setPadding(10, 10, 10, 10); 
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
  }
}


function dialogTextInputShow(message, text){
  if (emptyVariable(message)) {message = "";}
  if (emptyVariable(text)) {text = "";}
  
  var ds = dialogSettings();
  ds.item_txt = message;
  ds.title_show   = true;  ds.title_txt = "Input Text Dialog";
  ds.btn_pos_show = true;  //ds.btn_pos_txt = "OK";
  ds.btn_neg_show = true;  //ds.btn_neg_txt = "Close";
  ds.btn_neu_show = true;  //ds.btn_neu_txt = "Test";

  var colorStateList = [[
  [R.attr.state_pressed],
  [R.attr.state_focused],
  [R.attr.state_enabled]],
  [ds.ac_color, ds.ac_color, ds.item_hnt_color]];
  colorStateList = new ColorStateList(colorStateList[0], colorStateList[1]);

  var dialogExit = false;
  var builder = new AlertDialog.Builder(context);

  if (ds.title_show) {
    var myTVtitle = new TextView(context);
    myTVtitle.setText(ds.title_txt);
    myTVtitle.setTextColor(ds.title_txt_color);
    myTVtitle.setTextSize(ds.title_txt_size);
    myTVtitle.setBackgroundColor(ds.title_bg_color);
    myTVtitle.setPadding(10, 20, 10, 20);//setPadding(int left, int top, int right, int bottom)
    myTVtitle.setGravity(Gravity.CENTER);
    //myTVtitle.setBackgroundResource(R.drawable.gradient);
    builder.setCustomTitle(myTVtitle);
    //builder.setTitle(ds.title_txt);
  }

  myLL = new LinearLayout(context);
  myLL.setOrientation(LinearLayout.VERTICAL);//myLL.setOrientation(LinearLayout.HORIZONTAL);

  if (ds.item_txt != "") {
    var myTVitem = new TextView(context);
    myTVitem.setText(ds.item_txt);
    myTVitem.setTextColor(ds.item_txt_color);
    myTVitem.setTextSize(ds.item_txt_size);
    myTVitem.setBackgroundColor(ds.item_bg_color);
    myTVitem.setPadding(10, 20, 10, 20);//setPadding(int left, int top, int right, int bottom)
    myTVitem.setGravity(Gravity.CENTER);
    //myTVitem.setBackgroundResource(R.drawable.gradient);
    builder.setView(myTVitem);
    //builder.setMessage(ds.item_txt);
  }

  var editText = new EditText(context);
  editText.setText(text);
  editText.setHint("gpa");
  editText.setTextColor(ds.item_txt_color);
  editText.setHintTextColor(ds.item_hnt_color);
  editText.setBackgroundTintList(colorStateList);
  //editText.setBackgroundColor(ds.item_bg_color);
  //editText.setInputType(InputType.TYPE_CLASS_NUMBER);
  //editText.setInputType(InputType.TYPE_CLASS_TEXT);
  //set the width/height of edittext
  //editText.setLayoutParams(new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT));
  //editText.setCompoundDrawables(Drawable left, Drawable top, Drawable right, Drawable bottom)
  //editText.setCompoundDrawables(new ColorDrawable(0x00000000), new ColorDrawable(0x00000000), new ColorDrawable(0x00000000), new ColorDrawable(0xcc00aaee))
  //setEllipsize(TextUtils.TruncateAt where)
  //Causes words in the text that are longer than the view's width to be ellipsized instead of broken in the middle.
  //builder.setView(editText);
  //setHighlightColor(int color)
  //	setHintTextColor(ColorStateList colors)
  //editText.setBackgroundTintList(ColorStateList.valueOf(0xcc00aaee));
  //setCursorDrawableColor(editText, 0xff00ff00);
  myLL.addView(editText);

  var editTextB = new EditText(context);
  editTextB.setHint("Number");
  editTextB.setTextColor(ds.item_txt_color);
  editTextB.setHintTextColor(ds.item_hnt_color);
  editTextB.setBackgroundTintList(colorStateList);
  editTextB.setInputType(InputType.TYPE_CLASS_NUMBER);
  //editTextB.setBackgroundColor(ds.item_bg_color);
  myLL.addView(editTextB);

  var editTextC = new EditText(context);
  editTextC.setHint("Password");
  editTextC.setTextColor(ds.item_txt_color);
  editTextC.setHintTextColor(ds.item_hnt_color);
  editTextC.setBackgroundTintList(colorStateList);
  editTextC.setInputType(InputType.TYPE_MASK_CLASS);
  //editTextC.setInputType(InputType.TYPE_TEXT_VARIATION_PASSWORD|InputType.TYPE_MASK_CLASS);
  //editTextC.setInputType(InputType.TYPE_TEXT_VARIATION_WEB_PASSWORD);
  //editTextC.setBackgroundColor(ds.item_bg_color);
  myLL.addView(editTextC);

  var editTextD = new EditText(context);
  editTextD.setHint("Date");
  editTextD.setInputType(InputType.TYPE_CLASS_DATETIME);
  editTextD.setTextColor(ds.item_txt_color);
  editTextD.setHintTextColor(ds.item_hnt_color);
  editTextD.setBackgroundTintList(colorStateList);
  myLL.addView(editTextD);

  builder.setView(myLL);

  if (ds.btn_pos_show) {
    builder.setPositiveButton(ds.btn_pos_txt, new DialogInterface.OnClickListener() {
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
  if (ds.btn_neg_show) {
    builder.setNegativeButton(ds.btn_neg_txt, new DialogInterface.OnClickListener() {
      onClick:function(dialog, buttonId) {dialog.cancel();}
    });
  }
  if (ds.btn_neu_show) {
    builder.setNeutralButton(ds.btn_neu_txt, new DialogInterface.OnClickListener() {
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

  if (!ds.title_show) {dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);}

  var window = dialog.getWindow();
  window.setBackgroundDrawable(new ColorDrawable(ds.bg_color));
  //window.setGravity(Gravity.FILL_VERTICAL);//window.setGravity(Gravity.CENTER);
  
  dialog.show();

  myLL.getLayoutParams().setMargins(ds.item_div_size, 0, ds.item_div_size, 0);

  var btn;
  if (ds.btn_pos_show) {
    btn = dialog.getButton(Dialog.BUTTON_POSITIVE);
    btn.setTextSize(ds.btn_pos_txt_size); btn.setTextColor(ds.btn_pos_txt_color); btn.setBackgroundColor(ds.btn_pos_bg_color);
    //btn.setPadding(10, 0, 10, 0); 
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
  }
  if (ds.btn_neg_show) {
    btn = dialog.getButton(Dialog.BUTTON_NEGATIVE);
    btn.setTextSize(ds.btn_neg_txt_size); btn.setTextColor(ds.btn_neg_txt_color); btn.setBackgroundColor(ds.btn_neg_bg_color);
    //btn.setPadding(10, 0, 10, 0); 
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
  }
  if (ds.btn_neu_show) {
    btn = dialog.getButton(Dialog.BUTTON_NEUTRAL);
    btn.setTextSize(ds.btn_neu_txt_size); btn.setTextColor(ds.btn_neu_txt_color); btn.setBackgroundColor(ds.btn_neu_bg_color);
    //btn.setPadding(10, 0, 10, 0); 
    btn.getLayoutParams().setMargins(10, 0, 10, 0);
  }
}

//setTimeout(dialogListShow(),0);//shows the list again. On a timeout so the startActivity() is correctly launched before

/*
function setCursorDrawableColor(editText, color){
  try {
    //var fCursorDrawableRes = TextView.class.getDeclaredField("mCursorDrawableRes");
    var fCursorDrawableRes = TextView.getDeclaredField("mCursorDrawableRes");
    //var fCursorDrawableRes = TextView.getClass().getDeclaredField("mCursorDrawableRes");
    //var fCursorDrawableRes = editText.getClass().getDeclaredField("mCursorDrawableRes");
    //var fCursorDrawableRes = editText.getClass().getDeclaredFields();
    //alert(fCursorDrawableRes.toString());
    fCursorDrawableRes.setAccessible(true);
    var mCursorDrawableRes = fCursorDrawableRes.getInt(editText);
    //var fEditor = TextView.class.getDeclaredField("mEditor");
    //var fEditor = TextView.getClass().getDeclaredField("mEditor");
    var fEditor = editText.getClass().getDeclaredField("mEditor");
    fEditor.setAccessible(true);
    var editor = fEditor.get(editText);
    var clazz = editor.getClass();
    var fCursorDrawable = clazz.getDeclaredField("mCursorDrawable");
    fCursorDrawable.setAccessible(true);
    var drawables = new Drawable[2];
    drawables[0] = editText.getContext().getResources().getDrawable(mCursorDrawableRes);
    drawables[1] = editText.getContext().getResources().getDrawable(mCursorDrawableRes);
    drawables[0].setColorFilter(color, PorterDuff.Mode.SRC_IN);
    drawables[1].setColorFilter(color, PorterDuff.Mode.SRC_IN);
    fCursorDrawable.set(editor, drawables);
  } catch (ignored) {Android.makeNewToast(ignored,true).show();alert(ignored.toString());}
}
*/
