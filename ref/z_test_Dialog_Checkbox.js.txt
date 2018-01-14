//dialog with check box
bindClass("android.app.Dialog");
bindClass("android.app.AlertDialog");
bindClass("android.content.DialogInterface");
bindClass("android.graphics.drawable.ColorDrawable");
bindClass("android.view.Gravity");
//LL.bindClass("android.R.color");
//LL.bindClass("android.graphics.Color");
//LL.bindClass("android.app.Activity");
//LL.bindClass("android.view.Window");
//LL.bindClass("android.view.WindowManager");
//LL.bindClass("android.view.ViewGroup.LayoutParams");
LL.bindClass("android.widget.LinearLayout");
LL.bindClass("android.widget.TextView");
LL.bindClass("android.widget.EditText");
LL.bindClass("android.text.InputType");
//LL.bindClass("android.widget.Adapter");
LL.bindClass("android.widget.ArrayAdapter");
LL.bindClass("android.widget.ListView");
LL.bindClass("android.widget.AdapterView");
//LL.bindClass("android.R.layout");
LL.bindClass("android.R");
LL.bindClass("android.content.res.ColorStateList");
LL.bindClass("android.graphics.PorterDuff.Mode");
LL.bindClass("android.graphics.drawable.Drawable");
var context = getActiveScreen().getContext();

var colorBg = 0xbb454545;

var itemsMenu = ["Message","List","Checkbox List","Text Input"];
var itemsMenuDialog = [dialogMessageShow,dialogListShow,dialogCheckboxShow,dialogTextInputShow];

//var myItemsState = [];
var myItems = ["Easy","Medium","Hard","Very Hard"];
//for(var i=0; i<myItems.length; ++i) {myItemsState.push(false);}
//myItemsState[2] = true;

dialogMenuShow();

//Android.makeNewToast("done", true).show();

//var dialog = new AlertDialog.Builder(context).setMessage("Hello world").show();

function dialogButtonHandler(button){
  var msg = "";
  switch (button) {
    case Dialog.BUTTON_POSITIVE: msg = "positive";
      break;
    case Dialog.BUTTON_NEGATIVE: msg = "negative";
      break;
    case Dialog.BUTTON_NEUTRAL: msg = "neutral";
      break;
  }
  msg = button + " | " + msg + " " + "\n" + "Running again";
  Android.makeNewToast(msg,true).show();
}

function myText(text){
  if (typeof text == undefined){var text="";}
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

function dialogMenuShow(){
  var dialogExit = false;
  
  var builder = new AlertDialog.Builder(context);
  //builder.setTitle("Select the Dialog to show");
  builder.setCustomTitle(myText("Select the Dialog to show:"));
/*
  builder.setItems(itemsMenu,new DialogInterface.OnClickListener(){
    onClick:function(dialog, position) {dialog.cancel();dialogMenuHandler(position);}
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
  },context,R.layout.simple_list_item_1,itemsMenu);

  builder.setAdapter(adapter, new DialogInterface.OnClickListener(){
    onClick:function(dialog, position) {dialog.cancel();dialogMenuHandler(position);}
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
      if (dialogExit) {//dialogMenuShow();{}
      } else {dialogMenuShow();}
      //setTimeout(dialogListShow(),0);//shows the list again. On a timeout so the startActivity() is correctly launched before
      //cancell is called when explicit set, pressing the back key / default action is dismiss / after cancel, dissmiss gets called too
    }
  });
  
  var dialog = builder.create();
  //dialog.setCancelable(true); //dialog.setCancelable(false);
  //dialog.setCanceledOnTouchOutside(false); //default = true

  var window = dialog.getWindow();
  window.setBackgroundDrawable(new ColorDrawable(colorBg));
  //window.setGravity(Gravity.FILL_VERTICAL);
  //window.setGravity(Gravity.CENTER);

  dialog.show();

  var btn
  btn = dialog.getButton(Dialog.BUTTON_POSITIVE);
  btn.setTextSize(24);btn.setTextColor(0xBBDDDDDD);btn.setBackgroundColor(0xFF556644);
  btn = dialog.getButton(Dialog.BUTTON_NEGATIVE);
  btn.setTextSize(12);
  btn = dialog.getButton(Dialog.BUTTON_NEUTRAL);
  btn.setTextSize(24);btn.setTextColor(0xFF0000AA);
  //btn.setText("Cancel");
  
  var lv = dialog.getListView();
  //lv.setCacheColorHint(0xaa00aa00);
  lv.setFooterDividersEnabled(true);
  lv.setHeaderDividersEnabled(true);
  lv.setDivider(new ColorDrawable(0xff2233ff));
  lv.setDividerHeight(4);
  
}
function dialogMenuHandler(position){
  //Android.makeNewToast(parent.getItemAtPosition(position).toString(),true).show();
  switch (position) {
    case 0: itemsMenuDialog[position](myItems.join(", "));
      break; //Message
    case 1: itemsMenuDialog[position](myItems);
      break; //List
    case 2: //itemsMenuDialog[position](myItems,myItemsState);
      itemsMenuDialog[position](myItems);
      break; //Checkbox
    case 3: itemsMenuDialog[position]("Input some text:","sample text");
      break; //Text Input
    case 4: itemsMenuDialog[position](myItems);
      break; //Custom List
  }
}

function dialogMessageShow(message){
  if (typeof message == undefined || message == null){message = "";}
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
  for(var i=0; i<items.length; ++i) {
    lv.setItemChecked(i, itemsState[i]);
  }

}


var etcolorStateList = [[
[R.attr.state_pressed],
[R.attr.state_focused],
[R.attr.state_enabled]],
[0xaabb0000, 0xdd00aacc, 0xcc11dd11]];
var etcolorStateList = new ColorStateList(etcolorStateList[0],etcolorStateList[1]);

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



