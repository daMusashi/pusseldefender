// http://www.clockworkchilli.com/index.php/developers/tutorial/16
App = function(){
	
	this.gfxPath = "gfx/";
	this.dataPath = "data/";
	this.scriptPath = "js/";
	this.layers = {background:40, pusselItems:30, pusselFront:20, ui:10};
	this.debug = true;
	
	this.level = {};
	this.pussel = {};
	
	// Load JSON data
	this.loadedData = {};
	this.loadedData.done = false;
	this.loadedData.files = [
		"pusselItemTypes.json",
		"pusselLevels.json"
	];
	this.loadedData.numFiles = this.loadedData.files.length;
	
	// Load JS data
	this.loadedJs = {};
	this.loadedJs.done = false;
	this.loadedJs.files = [
		"PusselGrid.js",
		"PusselItem.js",
		"PusselLevel.js",
		"Pussel.js"
	];
	this.loadedJs.numFiles = this.loadedJs.files.length;

	this.load = function()
	{
		this.i("* LOAD *");
		
		this.i("Loading " + this.loadedJs.numFiles + " JS files");
		for(var i=0; i < this.loadedJs.numFiles; i++){
			var fil = this.scriptPath + this.loadedJs.files[i];
			this.d("- Loading "+fil);
			wade.loadScript(fil, this.jsLoadedCallback, 1);
		}
		//wade.loadScript(this.scriptPath + "Grid.js", this.jsLoadedCallback, 1);
		//wade.loadScript(this.scriptPath + "PusselItem.js", this.jsLoadedCallback, 1);
		//wade.loadScript(this.scriptPath + "Level.js", this.jsLoadedCallback, 1);
		
		this.i("Loading " + this.loadedData.numFiles + " Data files");
		for(var i=0; i < this.loadedData.numFiles; i++){
			var fil = this.dataPath + this.loadedData.files[i];
			this.d("- Loading "+fil);
			wade.loadJson(fil, this.loadedData, this.dataLoadedCallback, 1);
		}
        //wade.loadJson(this.dataPath + 'pusselItemTypes.json', this.loadedData, this.dataLoadedCallback);
		//wade.loadJson(this.dataPath + 'pusselLevels.json', this.loadedData, this.dataLoadedCallback);
		
		
		// UI
        wade.loadImage(this.gfxPath + 'cursor.png');
	};
	
	this.dataLoadedCallback = function() {
		--wade.app.loadedData.numFiles;
		wade.app.d('Data files left: '+wade.app.loadedData.numFiles);
		for (var attr in wade.app.loadedData.data) {
        	wade.app.loadedData[attr] = wade.app.loadedData.data[attr];
    	}
		
		if (wade.app.loadedData.numFiles <= 0) {
			wade.app.loadedData.done = true;
			wade.app.d(wade.app.loadedData);
			wade.app.i('Data load DONE');
			wade.app.i('create objects and load assets');
			
			if(wade.app.loadedJs.done){
				wade.app.loadAssets();
			}
			/*setTimeout(function() {
				$("#goButton").show();
				$("#loading_text").hide();
			},1000); */
		}
	};	// end loadCallback
	
	this.jsLoadedCallback = function() {
		--wade.app.loadedJs.numFiles;
		wade.app.d('JS files left: '+wade.app.loadedJs.numFiles);
		if (wade.app.loadedJs.numFiles <= 0) {
			wade.app.loadedJs.done = true;
			wade.app.i('JS load DONE');
			
			if(wade.app.loadedData.done){
				wade.app.loadAssets();
			}
			
			/*setTimeout(function() {
				$("#goButton").show();
				$("#loading_text").hide();
			},1000); */
		}
	};	// end loadCallback
	
	this.loadAssets = function(){
		this.i('* Load Assets *');
		this.d(this.loadedData);
		this.pussel = new Pussel(this.loadedData, this.layers);
		var assetList = this.pussel.getAssetsList();
		this.d(assetList);
		for(var i=0; i < assetList.length; i++){
				this.i('- Loads '+assetList[i]);
				wade.loadImage(assetList[i]);
		}
		// wade.loadImage(this.gfxPath + 'item' + i + '.png');
		//this.level = new Level(this.gfxPath, this.dataPath);
		//this.level.load();
		
	};
	
	this.init = function()
	{
		
 		this.i("* INIT *");
		wade.setSwipeTolerance(1, 2);
		this.pussel.loadLevel(0);
		
       	this.start();

	};
	
	this.start = function() {
		this.pussel.createLevel();
		
		wade.setMainLoopCallback(this.update,'update');
		//this.updateGame();
	};
	
	this.update = function(){
		//console.log("* updating *");
		wade.app.pussel.update();
	};
	
	this.d = function(obj){
		if(this.debug){
			console.log(obj);	
		}
	};
	this.i = function(obj){
		console.log(obj);	
	};
	

}

//@ sourceURL=pusselDefender.js