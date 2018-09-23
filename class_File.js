//import File "class"
//try {eval(getScriptByName("class_File").getText());} catch (e) {bindClass("android.widget.Toast");Toast.makeText(getActiveScreen().getContext(), "One of the required scripts couldn't be loaded.\nPlease try again.\n\n" + e, Toast.LENGTH_LONG).show(); return null;}

//prevent android.os.NetworkOnMainThreadException
bindClass("android.os.StrictMode");
StrictMode.setThreadPolicy(new StrictMode.ThreadPolicy.Builder().permitAll().build());

//import readWebStream classes
bindClass("java.net.URL");
bindClass("java.net.HttpURLConnection");
bindClass("java.io.BufferedInputStream");

//import readStream classes
bindClass("java.io.BufferedReader");
bindClass("java.io.InputStreamReader");
bindClass("java.io.FileInputStream");
bindClass("java.lang.StringBuilder");

//import readFile classes
bindClass("java.io.File");
bindClass("java.io.FileReader");
//bindClass("java.io.BufferedReader");

bindClass("android.widget.Toast");
var context = getActiveScreen().getContext();
//typeoff return: 'Array, Object, String, Date, RegExp, Function, Boolean, Number, Null, Undefined'
function typeoff(elem) {return Object.prototype.toString.call(elem).split(/\W/)[2].toLowerCase()};
function emptyVariable(myVar) {return myVar === null || myVar === undefined || myVar === "";}
function showToast(myMsg, longDuration) {if (!emptyVariable(myMsg)) {var mDuration = Toast.LENGTH_SHORT; if (emptyVariable(longDuration) || typeoff(longDuration) != "boolean") {longDuration = false;} if (longDuration) {mDuration = Toast.LENGTH_LONG;} Toast.makeText(context, myMsg, mDuration).show();}}

function readWebStream (my_url) {
    var conn = null;
    var conn_stream = null;
    var result = null;
    try {
        conn = new URL(encodeURI(my_url)).openConnection();
        //conn = new URL(my_url).openConnection();
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
        if (conn_stream != null) {conn_stream.close();}
        if (conn != null) {conn.disconnect();}
    }
    return result;
}

function readStream (stream) {
    var path = null; var result = null; var reader = null;
    if (typeoff(stream) == "string") {path = stream; var stream = new FileInputStream(stream);}

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

function readFile(filePath) {
    var result = null;
    try {
        var file = new File(filePath);
        var r = new BufferedReader(new FileReader(file));
        var s = "", l;
        while ((l = r.readLine()) != null) {s += (l + "\n");}
        result = s.substring(0, s.length - 1);
    } catch (e) {
        showToast(e); result = null;
    } finally {
        if (r != null) {r.close();}
    }
    return result;
}
