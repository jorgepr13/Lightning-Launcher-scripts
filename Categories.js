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

