// http://www.clockworkchilli.com/index.php/developers/tutorial/16
App = function(){
	
	this.data = {
		PusselItems: {}	
	};
	this.grid = {};
	this.gfxPath = "../gfx/";
	this.confPath = "conf/";
	
	this.load = function()
	{
		 // load behavior
        //wade.loadScript('behaviors/match3Item.js', 0, 1);
		//wade.loadJson(this.confPath + "pusselItemTypes.json", this.dataPusselItems, 0, 1);
		//console.log(this.dataPusselItems);
		wade.loadScript("Grid.js", 0, 1);
 
        // load sprites
        for (var i=0; i<6; i++)
        {
            wade.loadImage(this.gfxPath + 'item' + i + '.png');
        }
        wade.loadImage(this.gfxPath + 'cursor.png')
	};

	this.init = function()
	{
		 // define a grid
		this.grid = new Grid(8, 8, 40);
        //this.numCells = {x: 8, y: 8};
        //this.cellSize = 40;
        this.numItemTypes = 6;
 
        // create a set of game items
        this.items = [];
        for (var x=0; x < this.numCells.x; x++)
        {
            this.items[x] = [];
            for (var y=0; y < this.numCells.y; y++)
            {
                this.items[x][y] = this.createRandomItem();
                this.items[x][y].gridPosition = {x: x, y: y};
                wade.addSceneObject(this.items[x][y]);
            }
        }

	};
	
	this.createRandomItem = function()
    {
        var itemType = Math.floor(Math.random() * this.numItemTypes);
        var sprite = new Sprite('gfx/item' + itemType + '.png');
        sprite.setSize(this.cellSize * 0.95, this.cellSize * 0.95);
        var object = new SceneObject(sprite, Match3Item);
        object.itemType = itemType;
        return object;
    };
 
    this.gridToWorld = function(gridCoords)
    {
        var worldX = (gridCoords.x - this.numCells.x / 2 + 0.5) * this.cellSize;
        var worldY = (gridCoords.y - this.numCells.y / 2 + 0.5) * this.cellSize;
        return {x: worldX, y: worldY};
    };

}
//@ sourceURL=pusselshooter.js