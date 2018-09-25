// Tasker screenshot organizer

function listFiles(a1,a2){return ' ';}
function flash(a1){}
function flashLong(a1){}


src
dest
dest_prefix
current app
time
time_threshold

notif_icon
notif_title

src_full

var src = "";
var files = listFiles(src, "");

for (let i = 0; i < files.length; i++) {
  const date = new Date(files[i].lastModified);
  flash(files[i].name + ' has a last modified date of ' + date);
  //alert(files[i].name + ' has a last modified date of ' + date);
}




<action code="412" nameLocal="List Files" catNameLocal="File" argCount="6">
	<arg num="0" nameLocal="Dir" dataType="str" optional="false" privacy="public" contentType="str"/>
	<arg num="1" nameLocal="Match" dataType="str" optional="true" privacy="public" contentType="str"/>
	<arg num="2" nameLocal="Include Hidden Files" dataType="bool" optional="false" privacy="public" contentType="bool"/>
	<arg num="3" nameLocal="Use Root" dataType="bool" optional="false" privacy="public" contentType="bool"/>
	<arg num="4" nameLocal="Sort Select" dataType="int" optional="false" privacy="public" contentType="option">
		<option num="0" labelLocal="Alphabetic"/>
		<option num="1" labelLocal="Alphabetic, Reverse"/>
		<option num="2" labelLocal="Directory Then File"/>
		<option num="3" labelLocal="File Extension"/>
		<option num="4" labelLocal="File Extension, Reverse"/>
		<option num="5" labelLocal="File Then Directory"/>
		<option num="6" labelLocal="Modification Date"/>
		<option num="7" labelLocal="Modification Date, Reverse"/>
		<option num="8" labelLocal="Size"/>
		<option num="9" labelLocal="Size, Reverse"/>
	</arg>
	<arg num="5" nameLocal="Variable" dataType="str" optional="false" privacy="public" contentType="str"/>
</action>
