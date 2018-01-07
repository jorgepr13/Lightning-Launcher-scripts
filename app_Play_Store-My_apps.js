var intent = new Intent("com.google.android.finsky.VIEW_MY_DOWNLOADS");
intent.setClassName("com.android.vending", "com.google.android.finsky.activities.MainActivity");
getActiveScreen().getContext().startActivity(intent);