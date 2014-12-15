function PusselItem(itemData, pusselGrid, gridPosition, size, layer){
	
	var sprite = new Sprite(itemData.image, layer);
	sprite.setSize(size, size);
	
	SceneObject.call(this, sprite); // call super constructor.
	
	this.grid = pusselGrid;
	this.gridPosition = gridPosition; //{x: gridX, y: gridY}
	
	this.category = itemData.category;
	this.typeid = itemData.id;
	this.level = itemData.level;
	this.health = itemData.health;
	this.damage = itemData.damage;
	
	this.moving = false;    // Används för att hindra användaren att pilla med items när de rör sig
	this.matched = false;    // Används för att flagga som redan matchad vid matchnings-analyser INTE implemeterat än (behövs det?)
	
	this.onAddToScene = function()
    {
        var worldPosition = this.grid.gridToWorld(this.gridPosition);
		this.setPosition(worldPosition);
		//this.d(this);
    };
	
	this.getLeftItem = function(){
		return this.grid.getItem(this.gridPosition.x-1, this.gridPosition.y);
	};
	this.getRightItem = function(){
		return this.grid.getItem(this.gridPosition.x+1, this.gridPosition.y);
	};
	this.getTopItem = function(){
		return this.grid.getItem(this.gridPosition.x, this.gridPosition.y-1);
	};
	this.getBottomItem = function(){
		return this.grid.getItem(this.gridPosition.x, this.gridPosition.y+1);
	};

	
	this.onSwipeLeft = function ()
	{
		this.i("* Swipe Left *");
		if (this.gridPosition.x == 0)
		{
			return true;
		}
		//selectorObject.setVisible(false);
		this.grid.swapItems(this, this.getLeftItem(), true);
		this.selectedItem = null;
		return true;
	};

	this.onSwipeRight = function ()
	{
		this.i("* Swipe Right *");
		if (this.gridPosition.x == this.grid.size.x - 1)
		{
			return true;
		}
		//selectorObject.setVisible(false);
		this.grid.swapItems(this, this.getRightItem(), true);
		this.selectedItem = null;
		return true;
	};

	this.onSwipeUp = function ()
	{
		this.i("* Swipe Up *");
		if (this.gridPosition.y == 0)
		{
			return true;
		}
		//selectorObject.setVisible(false);
		this.grid.swapItems(this, this.getTopItem(), true);
		this.selectedItem = null;
		return true;
	};

	this.onSwipeDown = function ()
	{
		this.i("* Swipe Down *");
		if (this.gridPosition.y == this.grid.size.y - 1)
		{
			return true;
		}
		//selectorObject.setVisible(false);
		this.grid.swapItems(this, this.getBottomItem(), true);
		this.selectedItem = null;
		return true;
	};

	this.onMouseDown = function ()
	{
		console.log("* Mouse Down *");
		//if (columnsLocked[this.col] || this.moving)
		if (this.moving)
		{
			return true;
		}

		/*else if (selectedSquare) // Square already selected
		{
			// Swap with given square if move is legal
			selectorObject.setVisible(false);
			swap(board[selectedSquare.x][selectedSquare.y], board[this.col][this.row], true);
			selectedSquare = null;
			return true;
		}*/
		this.grid.setSelected(this);
		return true;
	};
	
	

	this.d = function(obj){
		wade.app.d(obj);
	};
	
	this.i = function(obj){
		wade.app.i(obj);
	};

}

/*var a = new PusselItem('gfx/item' + 1 + '.png', 1, {x: 222, y: 444});
debugObject(a);
debugObject(a.prototype);*/

// Ärver SceneObject, se https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
PusselItem.prototype = Object.create(SceneObject.prototype);
//PusselItem.prototype.constructor = PusselItem;

/*var b = new PusselItem('gfx/item' + 2 + '.png', 2, {x: 222, y: 444});
debugObject(b);
debugObject(b.prototype);*/

//@ sourceURL=PusselItem.js