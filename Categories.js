//Categories

//main = {categories[], containers[]}
//categories = [{name,container[{name, id}],app[{name, id}]}]
//containers = [{name, id, categories[]}] //probably not needed


//shortcuts can be added manually while adding them to a category
//during the dulicate process, the newly duplicated item id will be added to the id list,
//if it don't have a pkg or if it's a shortcut

/*
adding an item to a category
-check type, shortcut or folder are only allowed
-look for the label in the apps var
--if exist, check if the id is in the list, otherwise, add it
--if not, add the name to the list
-look for the name in the categories selected
--add it if necessary
--check the id, and add it if necessary

-get the containers for the categories selected
--check if the container is repeated/have multi categories by matching the id
--get all the apps for the categories
--get all the items in the container



*/

/*
var main = {};
main.categories = [];


var catt = []; //[{name,container,app},{...}]
var cat = catt[0];
cat = {};
cat.name = "";
cat.cont = []; //[{name, id},{...}]
cat.apps = []; //[{name, id},{...}]

var cont = cat.cont[0];
cont = {};
cont.name = "";
cont.id = "";

var apps = cat.apps[0];
apps = {};
apps.name = "";
apps.id = "";


cont.name = "";
cont.id = "";
cont.cat = [];
//apps, can be retrieved by get all items
//this can be added to the folder tag, to avoid having a duplicate here... maybe


//apps variable containing the apps in the drawer
apps = []; //[{id, lbl, pkg}, {...}]
apps.id = [];
apps.lbl = "";
apps.pkg = "";
*/



//main = {categories[], containers[]}
//categories = [{name,container[{name, id}],app[{name, id}]}]


var categories = []; //[{name,container,apps},{...}]
categories[0] = {};
var cat = categories[0];
cat.name = "";
cat.cont = []; //[{name, id},{...}]
cat.apps = []; //[{name, id},{...}]
cat.cont[0] = {};
cat.apps[0] = {};

var cont = cat.cont[0];
cont.name = "";
cont.id = "";

var apps = cat.apps[0];
apps.name = "";
apps.id = "";




var inCat = [];
var inApp = [];
//add app
//given categories, given app
for (i = 0; i < categories.length; i++) {
  for (j = 0; j < inCat.length; j++) {
    if (categories[i] == inCat[j]) {
      //some code
      for (m = 0; m < categories[i].apps.length; n++) {
        for (n = 0; n < inApp.length; n++) {
          if (categories[i].apps[m].id == inApp[n].id) {
            //some code
          }
        }//inApp
      }//apps
    }//categories match
  }//inCat
}//categories








//samples

json_obj = JSON.parse(json_str);
var wx_str = JSON.stringify(categories, null, '  ');

function get_itm_icon(elem) {
  if (elem == null) {return;} //no element received
  if (json_str == null || json_str == "") {return;} //no file contents
  if (typeof json_obj.fonts.font[0] == "undefined") {return;} //no object

  var data = {};
  data.path = "";
  data.icon = "";
  for (i = 0; i < json_obj.fonts.font.length; i++) {
    for (j = 0; j < json_obj.fonts.font[i].element.length; j++) {
      if (json_obj.fonts.font[i].element[j].name.indexOf(elem) != -1) {
        data.path = json_obj.fonts.font[i].path;
        data.icon = json_obj.fonts.font[i].element[j].icon;
        break;
      }
    }
  }
  data = JSON.stringify(data);
  if (typeof data == "undefined" || data == null)  {return;}
  else {return data;}
}



