//dialog with check box
bindClass("android.app.Dialog");
bindClass("android.app.AlertDialog");
bindClass("android.content.DialogInterface");
bindClass("android.graphics.drawable.ColorDrawable");
bindClass("android.view.Gravity");
//bindClass("android.R.color");
//bindClass("android.graphics.Color");
//bindClass("android.app.Activity");
//bindClass("android.view.Window");
//bindClass("android.view.WindowManager");
//bindClass("android.view.ViewGroup.LayoutParams");
bindClass("android.widget.LinearLayout");
bindClass("android.widget.TextView");
bindClass("android.widget.EditText");
bindClass("android.text.InputType");
//bindClass("android.widget.Adapter");
bindClass("android.widget.ArrayAdapter");
bindClass("android.widget.ListView");
bindClass("android.widget.AdapterView");
//bindClass("android.R.layout");
bindClass("android.R");
bindClass("android.content.res.ColorStateList");
bindClass("android.graphics.PorterDuff.Mode");
bindClass("android.graphics.drawable.Drawable");
bindClass("android.widget.Toast");//Toast.LENGTH_SHORT; Toast.LENGTH_LONG
var context = getActiveScreen().getContext();

//typeoff return: 'Array, Object, String, Date, RegExp, Function, Boolean, Number, Null, Undefined'
function typeoff(elem) {return Object.prototype.toString.call(elem).split(/\W/)[2].toLowerCase()};
function emptyVariable(myVar) {return myVar == null || myVar == undefined || myVar == "";}
function showToast(myMsg) {if (!emptyVariable(myMsg)) {Toast.makeText(context, myMsg, Toast.LENGTH_SHORT).show();}}

var colorBg = 0xbb454545;

var itemsMenu = ["Message", "List", "Checkbox List", "Text Input"];
var itemsMenuDialog = [dialogMessageShow, dialogListShow, dialogCheckboxShow, dialogTextInputShow];

//var myItemsState = [];
var myItems = ["Easy","Medium","Hard","Very Hard"];
//for(var i=0; i<myItems.length; ++i) {myItemsState.push(false);}
//myItemsState[2] = true;

dialogMenuShow();

//Android.makeNewToast("done", true).show();

//var dialog = new AlertDialog.Builder(context).setMessage("Hello world").show();

function dialogButtonHandler(button) {
  var msg = "";
  switch (button) {
    case Dialog.BUTTON_POSITIVE: msg = "positive"; break;
    case Dialog.BUTTON_NEGATIVE: msg = "negative"; break;
    case Dialog.BUTTON_NEUTRAL: msg = "neutral"; break;
  }
  msg = button + " | " + msg + " " + "\n" + "Running again";
  showToast(msg);
}

function myText(text) {
  if (typeof text == undefined) {var text = "";}
  var myTV = new TextView(context);
  myTV.setText(text);
  myTV.setTextColor(0xddffffff);
  myTV.setTextSize(22);
  //title.setBackgroundResource(R.drawable.gradient);
  //setPadding(int left, int top, int right, int bottom)
  myTV.setPadding(10, 10, 10, 10);
  myTV.setGravity(Gravity.CENTER);
  return myTV;
}




//str_btn_pos_txt, int_btn_pos_txt_color, int_btn_pos_txt_size, int_btn_pos_bg_color
function dialogMenuShow() {
  var ds = {};//dialog settings
  //int_dialog_bg_color,
  ds.ac_color = 0xbb454545;
  ds.bg_color = 0xbb454545;
  ds.txt_color = 0xddffffff;
  ds.txt_size = 18;
  //str_title_txt, int_title_txt_size, int_title_color
  ds.title_txt = "Select the Dialog to show:";
  ds.title_txt_color = ds.txt_color;
  ds.title_txt_size = ds.txt_size + 4;
  //arr_items, int_items_txt_color, int_items_txt_size, int_items_bg_color, int_items_div_color, int_items_div_size
  ds.items_txt = ["Message", "List", "Checkbox List", "Text Input"];
  ds.items_act = [dialogMessageShow, dialogListShow, dialogCheckboxShow, dialogTextInputShow];
  ds.items_bg_color = ds.bg_color;
  ds.items_txt_color = ds.txt_color;
  ds.items_txt_size = ds.txt_size;
  ds.items_div_color = ds.ac_color;
  ds.items_div_size = 4;
  //str_btn_pos_txt, int_btn_pos_txt_color, int_btn_pos_txt_size, int_btn_pos_bg_color
  ds.btn_pos_txt = "OK";
  ds.btn_pos_txt_color = ds.txt_color;
  ds.btn_pos_txt_size = ds.txt_size;
  ds.btn_pos_bg_color = ds.bg_color;

  ds.btn_neg_txt = "Close";
  ds.btn_neg_txt_color = ds.txt_color;
  ds.btn_neg_txt_size = ds.txt_size;
  ds.btn_neg_bg_color = ds.bg_color;

  ds.btn_neu_txt = "Test";
  ds.btn_neu_txt_color = ds.txt_color;
  ds.btn_neu_txt_size = ds.txt_size;
  ds.btn_neu_bg_color = ds.bg_color;

  var dialogExit = false;
  var builder = new AlertDialog.Builder(context);

  var myTV = new TextView(context);
  myTV.setText(ds.title_txt);
  myTV.setTextColor(ds.title_txt_color);
  myTV.setTextSize(ds.title_txt_size);
  //myTV.setPadding(10, 10, 10, 10);//setPadding(int left, int top, int right, int bottom)
  //myTV.setGravity(Gravity.CENTER);
  //myTV.setBackgroundResource(R.drawable.gradient);

  builder.setCustomTitle(myTV);
  //builder.setTitle(ds.title_txt);

  var adapter = new JavaAdapter(ArrayAdapter, {
    getView:function(position, convertView, parent) {
      var view = this.super$getView(position, convertView, parent);
      view.setBackgroundColor(ds.items_bg_color);
      view.setTextColor(ds.items_txt_color);
      view.setTextSize(ds.items_txt_size);
      //view.setPadding(10,10,10,10);
      return view;
    }
  }, context, R.layout.simple_list_item_1, ds.items_txt);

  builder.setAdapter(adapter, new DialogInterface.OnClickListener() {
    onClick:function(dialog, position) {dialog.cancel(); dialogMenuHandler(position, ds.items_act);}
  });
  /*
    //default list dialog, no need for the adapter
    builder.setItems(ds.items_txt, new DialogInterface.OnClickListener() {
      onClick:function(dialog, position) {dialog.cancel(); dialogMenuHandler(position);}
    });
  */
  builder.setPositiveButton(ds.btn_pos_txt, new DialogInterface.OnClickListener() {
    onClick:function(dialog, buttonId) {dialogButtonHandler(buttonId);}
  });

  builder.setNegativeButton(ds.btn_neg_txt, new DialogInterface.OnClickListener() {
    onClick:function(dialog, buttonId) {dialog.cancel(); dialogButtonHandler(buttonId);}
  });

  builder.setNeutralButton(ds.btn_neu_txt, new DialogInterface.OnClickListener() {
    onClick:function(dialog, buttonId) {dialogButtonHandler(buttonId);}
  });

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

  var window = dialog.getWindow();
  window.setBackgroundDrawable(new ColorDrawable(ds.bg_color));
  //window.setGravity(Gravity.FILL_VERTICAL);//window.setGravity(Gravity.CENTER);

  dialog.show();

  var btn = dialog.getButton(Dialog.BUTTON_POSITIVE);
  btn.setTextSize(ds.btn_pos_txt_size); btn.setTextColor(ds.btn_pos_txt_color); btn.setBackgroundColor(ds.btn_pos_bg_color);
  btn = dialog.getButton(Dialog.BUTTON_NEGATIVE);
  btn.setTextSize(ds.btn_neg_txt_size); btn.setTextColor(ds.btn_neg_txt_color); btn.setBackgroundColor(ds.btn_neg_bg_color);
  btn = dialog.getButton(Dialog.BUTTON_NEUTRAL);
  btn.setTextSize(ds.btn_neu_txt_size); btn.setTextColor(ds.btn_neu_txt_color); btn.setBackgroundColor(ds.btn_neu_bg_color);
  //btn.setText("Cancel");

  var lv = dialog.getListView();
  //lv.setCacheColorHint(0xaa00aa00);
  lv.setFooterDividersEnabled(true);
  lv.setHeaderDividersEnabled(true);
  lv.setDivider(new ColorDrawable(ds.items_div_color));
  lv.setDividerHeight(ds.items_div_size);
}
function dialogMenuHandler(position, actions){
  switch (position) {
    case 0: actions[position](myItems.join(", "));
      break; //Message
    case 1: actions[position](myItems);
      break; //List
    case 2: //actions[position](myItems, myItemsState);
      actions[position](myItems);
      break; //Checkbox
    case 3: actions[position]("Input some text:","sample text");
      break; //Text Input
    case 4: actions[position](myItems);
      break; //Custom List
  }
}

function dialogMessageShow(message){
  if (typeof message == undefined || message == null) {message = "";}
  var dialogExit = false;
  var builder = new AlertDialog.Builder(context);
  //builder.setTitle("Select The Difficulty Level");
  builder.setCustomTitle(myText("Message Dialog"));

  var myTV = myText(message);myTV.setTextColor(0xFF0000AA);
  builder.setView(myTV);
  //builder.setMessage(message);

  builder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
    onClick:function(dialog, buttonId) {dialogButtonHandler(buttonId);}
  });

  builder.setNeutralButton("Test", new DialogInterface.OnClickListener() {
    onClick:function(dialog, buttonId) {dialogButtonHandler(buttonId);}
  });

  builder.setNegativeButton("Close", new DialogInterface.OnClickListener() {
    onClick:function(dialog, buttonId) {dialog.cancel();dialogButtonHandler(buttonId);}
  });

  builder.setOnCancelListener(new DialogInterface.OnCancelListener() {
    onCancel:function(dialog) {dialogExit = true;}
  });

  builder.setOnDismissListener(new DialogInterface.OnDismissListener() {
    onDismiss:function(dialog) {
      if (dialogExit) {dialogMenuShow();}
      else {dialogMessageShow(message);}
      //setTimeout(dialogListShow(),0);//shows the list again. On a timeout so the startActivity() is correctly launched before
      //cancell is called when explicit set, pressing the back key / default action is dismiss / after cancel, dissmiss gets called too
    }
  });

  var dialog = builder.create();
  //dialog.setCancelable(true); //dialog.setCancelable(false);
  //dialog.setCanceledOnTouchOutside(false); //default = true

  var window = dialog.getWindow();
  window.setBackgroundDrawable(new ColorDrawable(colorBg));
  //window.setGravity(Gravity.FILL_VERTICAL); //window.setGravity(Gravity.CENTER);

  dialog.show();
}


function dialogListShow(items){
  if (typeof items == undefined || items == null){return;}
  var dialogExit = false;
  var builder = new AlertDialog.Builder(context);
  //builder.setTitle("Select The Difficulty Level");
  builder.setCustomTitle(myText("Select The Difficulty Level - List"));

/*
  builder.setItems(items,new DialogInterface.OnClickListener(){
    onClick:function(dialog, position) {
      Android.makeNewToast(items[position],true).show();
    }
  });
*/
  var adapter = new JavaAdapter(ArrayAdapter, {
    getView:function(position,convertView,parent){
      var view = this.super$getView(position,convertView,parent);
      view.setTextColor(0xFF00FF00);
      //view.setTextSize(24);
      //view.setPadding(10,10,10,10);
      //view.setBackgroundColor(0xaaff0000);
      return view;
    }
  },context,R.layout.simple_list_item_1,items);

  builder.setAdapter(adapter, new DialogInterface.OnClickListener(){
    onClick:function(dialog, position) {
      Android.makeNewToast(items[position],true).show();
    }
  });

  builder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
    onClick:function(dialog, buttonId) {dialogButtonHandler(buttonId);}
  });

  builder.setNeutralButton("Test", new DialogInterface.OnClickListener() {
    onClick:function(dialog, buttonId) {dialogButtonHandler(buttonId);}
  });

  builder.setNegativeButton("Close", new DialogInterface.OnClickListener() {
    onClick:function(dialog, buttonId) {dialog.cancel();dialogButtonHandler(buttonId);}
  });

  builder.setOnCancelListener(new DialogInterface.OnCancelListener() {
    onCancel:function(dialog) {dialogExit = true;}
  });

  builder.setOnDismissListener(new DialogInterface.OnDismissListener() {
    onDismiss:function(dialog) {
      if (dialogExit) {dialogMenuShow();}
      else {dialogListShow(items);}
      //setTimeout(dialogListShow(),0);//shows the list again. On a timeout so the startActivity() is correctly launched before
      //cancell is called when explicit set, pressing the back key / default action is dismiss / after cancel, dissmiss gets called too
    }
  });

  var dialog = builder.create();
  //dialog.setCancelable(true); //dialog.setCancelable(false);
  //dialog.setCanceledOnTouchOutside(false); //default = true

  var window = dialog.getWindow();
  window.setBackgroundDrawable(new ColorDrawable(colorBg));
  //window.setGravity(Gravity.FILL_VERTICAL); //window.setGravity(Gravity.CENTER);

  var lv = dialog.getListView();
  //lv.setCacheColorHint(0xaa00aa00);
  lv.setFooterDividersEnabled(true);
  lv.setHeaderDividersEnabled(true);
  lv.setDivider(new ColorDrawable(0xff2233ff));
  lv.setDividerHeight(4);

  dialog.show();
}

var colorStateList = [[
[-R.attr.state_checked],//unchecked
[ R.attr.state_checked]],
[0xaabb0000, 0xdd00aacc]];
var colorStateList = new ColorStateList(colorStateList[0],colorStateList[1]);

function dialogCheckboxShow(items,itemsState){
  if (typeof items == undefined || items == null){return;}
  if (typeof itemsState == undefined || itemsState == null){
    var itemsState = [];
    for(var i=0; i<items.length; ++i) {itemsState.push(false);}
  }
  var dialogExit = false;
  var builder = new AlertDialog.Builder(context);
  //builder.setTitle("Select The Difficulty Level");
  builder.setCustomTitle(myText("Select The Difficulty Level - Checkbox"));
/*
  builder.setMultiChoiceItems(items, itemsState, new DialogInterface.OnMultiChoiceClickListener() {
    onClick:function(dialog, position, isChecked) {
      if (isChecked) {itemsState[position] = true;}
      else {itemsState[position] = false;}
    }
  });
*/
  var adapter = new JavaAdapter(ArrayAdapter, {
    getView:function(position,convertView,parent){
      var view = this.super$getView(position,convertView,parent); //view is a checkedTextView
      view.setTextColor(0xFF00FF00);
      //view.setTextSize(24);
      //view.setPadding(10,10,10,10);
      //view.setBackgroundColor(0xaaff0000);
      //view.setChecked(itemsState[position]);
      view.setCheckMarkTintList(colorStateList);
      return view;
    }
  //{},context,R.layout.select_dialog_multichoice,items);
  },context,R.layout.simple_list_item_multiple_choice,items);
  builder.setAdapter(adapter, null);

  builder.setPositiveButton("Selected", new DialogInterface.OnClickListener() {
    onClick:function(dialog, buttonId) {dialogButtonHandler(buttonId);
      var itemsChecked = [];
      for (i = 0; i < items.length; i++) {
        if(itemsState[i] == true){itemsChecked.push(items[i]);}
      }
      Android.makeNewToast(buttonId + " | " + itemsChecked.join(", ") + "\n" + itemsChecked + "\n" + itemsState,true).show();
    }
  });

  builder.setNeutralButton("Deselected", new DialogInterface.OnClickListener() {
    onClick:function(dialog, buttonId) {dialogButtonHandler(buttonId);
      var itemsChecked = [];
      for (i = 0; i < items.length; i++) {
        if(itemsState[i] == false){itemsChecked.push(items[i]);}
      }
      Android.makeNewToast(buttonId + " | " + itemsChecked.join(", ") + "\n" + itemsChecked + "\n" + itemsState,true).show();
    }
  });

  builder.setNegativeButton("Close", new DialogInterface.OnClickListener() {
    onClick:function(dialog, buttonId) {dialog.cancel();dialogButtonHandler(buttonId);}
  });

  builder.setOnCancelListener(new DialogInterface.OnCancelListener() {
    onCancel:function(dialog) {dialogExit = true;}
  });

  builder.setOnDismissListener(new DialogInterface.OnDismissListener() {
    onDismiss:function(dialog) {
      if (dialogExit) {dialogMenuShow();}
      else {dialogCheckboxShow(items,itemsState);}
      //setTimeout(dialogCheckboxShow(),0);//shows the list again. On a timeout so the startActivity() is correctly launched before
      //cancel is called when explicit set, pressing the back key / default action is dismiss / after cancel, dissmiss gets called too
    }
  });

  var dialog = builder.create();
  //dialog.setCancelable(true); //dialog.setCancelable(false);
  //dialog.setCanceledOnTouchOutside(false); //default = true

  var window = dialog.getWindow();
  window.setBackgroundDrawable(new ColorDrawable(colorBg));
  //window.setGravity(Gravity.FILL_VERTICAL); //window.setGravity(Gravity.CENTER);

  var lv = dialog.getListView();
  //lv.setCacheColorHint(0xaa00aa00);
  lv.setFooterDividersEnabled(true);
  lv.setHeaderDividersEnabled(true);
  lv.setDivider(new ColorDrawable(0xff2233ff));
  lv.setDividerHeight(4);
  lv.setChoiceMode(ListView.CHOICE_MODE_MULTIPLE);

  lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
    onItemClick:function(dialog, view, position, id) {
      if (view.isChecked()) {itemsState[position] = true;}
      else {itemsState[position] = false;}
      //view.setBackgroundColor(0xaabb0022);
      //view is a checkedTextView
    }
  });

  dialog.show();

  //lv.getChildCount(); //like array.length
  for (var i=0; i < items.length; ++i) {lv.setItemChecked(i, itemsState[i]);}

}


var etcolorStateList = [[
[R.attr.state_pressed],
[R.attr.state_focused],
[R.attr.state_enabled]],
[0xaabb0000, 0xdd00aacc, 0xcc11dd11]];
etcolorStateList = new ColorStateList(etcolorStateList[0], etcolorStateList[1]);

function dialogTextInputShow(message,text){
  if (typeof message == undefined || message == null){message = "";}
  if (typeof text == undefined || text == null){message = "";}
  var dialogExit = false;
  var builder = new AlertDialog.Builder(context);
  //builder.setTitle("Select The Difficulty Level");
  builder.setCustomTitle(myText("Text Input Dialog"));

  tempLL = new LinearLayout(context);
  tempLL.setOrientation(LinearLayout.VERTICAL);//tempLL.setOrientation(LinearLayout.HORIZONTAL);

  //builder.setMessage(message);
  tempLL.addView(myText(message));

  var editText = new EditText(context);
  editText.setText(text);
  editText.setHint("gpa");
  //editText.setInputType(InputType.TYPE_CLASS_NUMBER);
  //editText.setInputType(InputType.TYPE_CLASS_TEXT);
  //set the width/height of edittext
  //editText.setLayoutParams(new LayoutParams(LayoutParams.FILL_PARENT, LayoutParams.FILL_PARENT));
  editText.setTextColor(0xFF00FF00);
  //editText.setCompoundDrawables(Drawable left, Drawable top, Drawable right, Drawable bottom)
  //editText.setCompoundDrawables(new ColorDrawable(0x00000000), new ColorDrawable(0x00000000), new ColorDrawable(0x00000000), new ColorDrawable(0xcc00aaee))
  //setEllipsize(TextUtils.TruncateAt where)
  //Causes words in the text that are longer than the view's width to be ellipsized instead of broken in the middle.
  //builder.setView(editText);
  //setHighlightColor(int color)
  //	setHintTextColor(ColorStateList colors)
  //	editText.setHintTextColor(0x88ababff);
  //editText.setBackgroundTintList(ColorStateList.valueOf(0xcc00aaee));
  editText.setBackgroundTintList(etcolorStateList);
  //setCursorDrawableColor(editText, 0xff00ff00);
  tempLL.addView(editText);

  var editTextB = new EditText(context);
  editTextB.setHint("Number");
  editTextB.setHintTextColor(0x88ababff);
  editTextB.setInputType(InputType.TYPE_CLASS_NUMBER);
  editTextB.setTextColor(0xFFFF0000);
  tempLL.addView(editTextB);

  var editTextC = new EditText(context);
  editTextC.setHint("Password");
  //editTextC.setInputType(InputType.TYPE_TEXT_VARIATION_PASSWORD|InputType.TYPE_MASK_CLASS);
  editTextC.setInputType(InputType.TYPE_MASK_CLASS);
  //editTextC.setInputType(InputType.TYPE_TEXT_VARIATION_WEB_PASSWORD);
  editTextC.setTextColor(0xFF0000FF);
  tempLL.addView(editTextC);

  var editTextD = new EditText(context);
  editTextD.setHint("Date");
  editTextD.setInputType(InputType.TYPE_CLASS_DATETIME);
  editTextD.setTextColor(0xFF0000FF);
  tempLL.addView(editTextD);

  builder.setView(tempLL);

  builder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
    onClick:function(dialog, buttonId) {dialogButtonHandler(buttonId);
      text = editText.getText().toString();
      text += "\nnum:  " + editTextB.getText().toString();
      text += "\npass: " + editTextC.getText().toString();
      text += "\ndate: " + editTextD.getText().toString();
      text += "\n";
      Android.makeNewToast(text,true).show();
    }
  });

  builder.setNeutralButton("Test", new DialogInterface.OnClickListener() {
    onClick:function(dialog, buttonId) {dialogButtonHandler(buttonId);}
  });

  builder.setNegativeButton("Close", new DialogInterface.OnClickListener() {
    onClick:function(dialog, buttonId) {dialog.cancel();dialogButtonHandler(buttonId);}
  });

  builder.setOnCancelListener(new DialogInterface.OnCancelListener() {
    onCancel:function(dialog) {dialogExit = true;}
  });

  builder.setOnDismissListener(new DialogInterface.OnDismissListener() {
    onDismiss:function(dialog) {
      if (dialogExit) {dialogMenuShow();}
      else {dialogTextInputShow(message,text);}
      //setTimeout(dialogListShow(),0);//shows the list again. On a timeout so the startActivity() is correctly launched before
      //cancell is called when explicit set, pressing the back key / default action is dismiss / after cancel, dissmiss gets called too
    }
  });

  var dialog = builder.create();
  //dialog.setCancelable(true); //dialog.setCancelable(false);
  //dialog.setCanceledOnTouchOutside(false); //default = true

  var window = dialog.getWindow();
  window.setBackgroundDrawable(new ColorDrawable(colorBg));
  //window.setGravity(Gravity.FILL_VERTICAL); //window.setGravity(Gravity.CENTER);

  dialog.show();
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
