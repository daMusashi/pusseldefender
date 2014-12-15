function PusselLevel (levelNum, name, itemTypes){
	
	this.num = levelNum;
	this.name = name;
	
	// format itemTypes:
	//types[category][lvl].category, level, id, damage, health, label, image;
	this.itemTypesByCategory = itemTypes;
	// flat types-list
	this.itemTypes = [];
	
	
	this.init = function(){
		this.i("PusselLevel >> Level init");
		this.createFlatTypeList();
	};
	
	this.createFlatTypeList = function(){
		var i = 0;
		for (var category in this.itemTypesByCategory) {

        	var categoryItems = this.itemTypesByCategory[category];

			for(var j=0; j < categoryItems.length; j++){
				this.itemTypes[i] = categoryItems[j];
				i++;
			}
		}
	};
	
	this.d = function(obj){
		wade.app.d(obj);
	};
	
	this.i = function(obj){
		wade.app.i(obj);
	};
};

//@ sourceURL=PusselLevel.js