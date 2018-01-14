bindClass("android.app.AlertDialog");
bindClass("android.widget.ArrayAdapter");
bindClass("android.R");
bindClass("android.widget.TextView");

var items = ["item A","item B"];
var context = getActiveScreen().getContext();
var adapter = new JavaAdapter(ArrayAdapter, {
getView:function(position,convertView,parent){
var view = this.super$getView(position,convertView,parent);
view.setTextColor(0xFF00FF00);
view.setTextSize(24);
view.setBackgroundColor(0xffff0000);
return view;
}
},context,R.layout.simple_list_item_1,items);
new AlertDialog.Builder(context).setAdapter(adapter,function(dialog,which){
Toast.makeText(context,items[which],Toast.LENGTH_SHORT).show();}).show();
