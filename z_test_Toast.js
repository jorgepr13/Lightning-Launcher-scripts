var context = getActiveScreen().getContext();
bindClass("android.widget.Toast");
bindClass("android.view.Gravity");


//https://developer.android.com/reference/android/widget/Toast.html
//setDuration(int duration);
//0=Toast.LENGTH_SHORT / Default
//1=Toast.LENGTH_LONG

//https://developer.android.com/reference/android/view/Gravity.html
//setGravity(int gravity, int xOffset, int yOffset);
// 80=Gravity.BOTTOM
// 17=Gravity.CENTER
//  1=Gravity.CENTER_HORIZONTAL
// 16=Gravity.CENTER_VERTICAL
//119=Gravity.FILL
//  7=Gravity.FILL_HORIZONTAL
//112=Gravity.FILL_VERTICAL
//  3=Gravity.LEFT
//  0=Gravity.NO_GRAVITY
//  5=Gravity.RIGHT
// 48=Gravity.TOP



var duration = Toast.LENGTH_SHORT; //Toast.LENGTH_LONG
//var duration = Toast.LENGTH_LONG;
//var toast = Toast.makeText(context, text, duration)
//Toast.makeText(context, text, duration).setGravity().show();
//setGravity(int_Gravity_constant, int_x_offset, int_y_offset);
//toast.setGravity(Gravity.TOP|Gravity.LEFT, 0, 0);//Gravity.CENTER_VERTICAL

var t = null;
t=Toast.makeText(context, "top-9000", duration);
t.setGravity(Gravity.TOP,9000,0);
t.show();
t=Toast.makeText(context, "top-200", duration);
t.setGravity(Gravity.TOP,200,0);
t.show();
t=Toast.makeText(context, "top-100", duration);
t.setGravity(Gravity.TOP,100,0);
t.show();
t=Toast.makeText(context, "top", duration);
t.setGravity(Gravity.TOP,0,0);
t.show();
t=Toast.makeText(context, "top-left", duration);
t.setGravity(Gravity.TOP|Gravity.LEFT,0,0);
t.show();
t=Toast.makeText(context, "top", duration);
t.setGravity(Gravity.TOP,0,0);
t.show();
t=Toast.makeText(context, "top-right", duration);
t.setGravity(Gravity.TOP|Gravity.RIGHT,0,0);
t.show();
t=Toast.makeText(context, "right", duration);
t.setGravity(Gravity.RIGHT,0,0);
t.show();
t=Toast.makeText(context, "bottom-right", duration);
t.setGravity(Gravity.BOTTOM|Gravity.RIGHT,0,0);
t.show();
t=Toast.makeText(context, "bottom", duration);
t.setGravity(Gravity.BOTTOM,0,0);
t.show();
t=Toast.makeText(context, "bottom-left", duration);
t.setGravity(Gravity.BOTTOM|Gravity.LEFT,0,0);
t.show();
t=Toast.makeText(context, "left", duration);
t.setGravity(Gravity.LEFT,0,0);
t.show();
t=Toast.makeText(context, "center y\n1\n2\n3\n4\n5\n6\n7\n8\n9\n0\n1234567890", duration);
t.setGravity(Gravity.CENTER_VERTICAL,0,0);
t.show();
t=Toast.makeText(context, "center x\n1\n2\n3\n4\n5\n6\n7\n8\n9\n0\n1234567890", duration);
t.setGravity(Gravity.CENTER_HORIZONTAL,0,0);
t.show();
t=Toast.makeText(context, "center\n1\n2\n3\n4\n5\n6\n7\n8\n9\n0\n1234567890", duration);
t.setGravity(Gravity.CENTER,0,0);
t.show();
t=Toast.makeText(context, "fill y", duration);
t.setGravity(Gravity.FILL_VERTICAL,0,0);
t.show();
t=Toast.makeText(context, "fill x", duration);
t.setGravity(Gravity.FILL_HORIZONTAL,0,0);
t.show();
t=Toast.makeText(context, "fill", duration);
t.setGravity(Gravity.FILL,0,0);
t.show();
t=Toast.makeText(context, "default", duration);
//t.setGravity(Gravity.CENTER_VERTICAL,0,0);
t.show();




