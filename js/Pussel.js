function Pussel(data, layers){
	this.data = {};
	this.data.levels = data.pusselLevels;
	this.data.itemTypes = data.pusselItemTypes;
	this.layers = layers;
	
	this.level = {}; // level data
	this.grid = []; // grid
	//this.items = []; // match items FLYTTAD till PusselGrid
	
	this.loadLevel = function(levelNum){
		this.i("Pussel >> Load Level");
		var itemTypes = [];
		
		var levelData = this.data.levels[levelNum];
		
		this.grid = new PusselGrid(levelData.grid.x, levelData.grid.y, levelData.grid.size);

		for (var category in levelData.itemTypes) {
        	var itemMaxLevel = levelData.itemTypes[category];
			
			// laddar item-data från this.data.itemTypes m h a category om levlar och skapar sceneObject-items
			var typesInCategory = this.data.itemTypes[category];
			itemTypes[category] = [];
			
			for(var i=0; i < itemMaxLevel; i++){
				var itemData = {};
				itemData.category = category;
				itemData.level = i+1;
				itemData.id = typesInCategory[i].id;
				itemData.damage = typesInCategory[i].damage;
				itemData.health = typesInCategory[i].health;
				itemData.label = typesInCategory[i].label;
				itemData.image = wade.app.gfxPath + typesInCategory[i].image;
				itemData.layer = this.layers.pusselItems;

				itemTypes[category][i] = itemData;
				
			}
    	}

		this.level = new PusselLevel(levelNum, levelData.name, itemTypes);
		this.level.init();
	};
	
	
	this.createLevel = function(){
		this.i("Pussel >> Create Level");
		// skapa spelplan	
		 // create a set of game items
        for (var x=0; x < this.grid.size.x; x++)
        {
            this.grid.items[x] = [];
            for (var y=0; y < this.grid.size.y; y++)
            {
                var itemTypeRandom = Math.floor(Math.random() * this.level.itemTypes.length);

				var itemTypeData = this.level.itemTypes[itemTypeRandom];

				var pusselItem = new PusselItem(itemTypeData, this.grid, {x: x, y: y}, this.grid.size.cell * 0.95);
				//console.log(pusselItem);
				this.grid.items[x][y] = pusselItem; //this.createRandomItem();
                //this.pusselItems[x][y].gridPosition = {x: x, y: y};
                wade.addSceneObject(this.grid.items[x][y], true);
				
            }
        }
	};
	
	this.update = function(){
		
	};
	
	// returns list of imege & sound files needed  (to be used for preloading)
	this.getAssetsList = function(){
		this.i("Creating Assets list");
		var assetList = [];
		var i = 0;
		
		for (var category in this.data.itemTypes) {
			var categoryItems = this.data.itemTypes[category];
			
			for(var j=0; j < categoryItems.length; j++){
				var itm = categoryItems[j];
				var image = wade.app.gfxPath + itm.image;
				this.d("- extract image "+ image);
				assetList[i] = image;
				i++;
			}
    	}
		
		return assetList;
	};
	
	this.d = function(obj){
		wade.app.d(obj);
	};
	
	this.i = function(obj){
		wade.app.i(obj);
	};
}

//@ sourceURL=Pussel.js