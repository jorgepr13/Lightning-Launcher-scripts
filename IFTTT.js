/*
https://maker.ifttt.com/trigger/{event}/with/key/{api_key}

kitchen_light
bedroom_light
living_room_light
living_room_speakers
*/
var api_key = LL.getVariables().getString("api_key_webhooks");
var eventt = LL.getEvent();
var event_d = eventt.getData();

//prevent android.os.NetworkOnMainThreadException
LL.bindClass("android.os.StrictMode");
StrictMode.setThreadPolicy(new StrictMode.ThreadPolicy.Builder().permitAll().build());

//import readWebStream classes
LL.bindClass("java.net.URL");
LL.bindClass("java.net.HttpURLConnection");
LL.bindClass("java.io.BufferedInputStream");

//import readStream classes
LL.bindClass("java.io.BufferedReader");
LL.bindClass("java.io.InputStreamReader");
LL.bindClass("java.io.FileInputStream");
LL.bindClass("java.lang.StringBuilder");

bindClass("android.widget.Toast");
var context = getActiveScreen().getContext();
//typeoff return: 'Array, Object, String, Date, RegExp, Function, Boolean, Number, Null, Undefined'
function typeoff(elem) {return Object.prototype.toString.call(elem).split(/\W/)[2].toLowerCase()};
function emptyVariable(myVar) {return myVar === null || myVar === undefined || myVar === "";}
function showToast(myMsg, longDuration) {if (!emptyVariable(myMsg)) {var mDuration = Toast.LENGTH_SHORT; if (emptyVariable(longDuration) || typeoff(longDuration) != "boolean") {longDuration = false;} if (longDuration) {mDuration = Toast.LENGTH_LONG;} Toast.makeText(context, myMsg, mDuration).show();}}

//check api key
if (emptyVariable(api_key)) {showToast("You need a WebHooks api key!", true); return;}

//check data
if (emptyVariable(event_d)) {showToast("You need to pass an event data!", true); return;}

//run the event
var result = readWebStream("https://maker.ifttt.com/trigger/" + event_d + "/with/key/" + api_key);
showToast(result, true);

function readWebStream (my_url) {
    var conn = null;
    var conn_stream = null;
    var result = null;
    try {
        //conn = new URL(encodeURI(my_url)).openConnection();
        conn = new URL(my_url).openConnection();
        conn.setReadTimeout(20000); //ms, Timeout for reading InputStream
        conn.setConnectTimeout(15000); //ms, Timeout for connection.connect()
        conn.setRequestMethod("GET"); //set HTTP method to GET
        conn.connect(); // Open communications link (network traffic occurs here)
        var responseCode = conn.getResponseCode();
        if (responseCode != HttpURLConnection.HTTP_OK) {
            throw new IOException("HTTP error code: " + responseCode);
        }
        //conn_stream = new BufferedInputStream(conn.getInputStream());
        conn_stream = conn.getInputStream(); //Retrieve the response body as an InputStream.
        if (conn_stream != null) {
            result = readStream(conn_stream); //Converts Stream to String
        }
    } catch (e) {
        showToast(e + "\n\nNo Internet or site connection!\n*If the error persist, check that you have the necessary permissions.*");
        result = null;
    } finally {
        if (conn_stream !== null) {conn_stream.close();}
        if (conn != null) {conn.disconnect();}
    }
    return result;
}

function readStream (stream, path) {
    if (typeoff(stream) == "string") {path = stream; var stream = new FileInputStream(stream);}

    var result = null;
    var reader = null;
    try {
        reader = new BufferedReader(new InputStreamReader(stream, "UTF-8"));
        var bld = new StringBuilder();
        var line = "";
        while ((line = reader.readLine()) !== null) {bld.append(line);}
        result = bld.toString();
    } catch (e) {
        showToast(e); result = null;
    } finally {
        if (reader != null) {reader.close();}
        if (path != null) {stream.close();}
    }
    return result;
}
