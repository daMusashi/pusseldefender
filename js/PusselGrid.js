/**
 * [PusselGrid description]
 * @param {[type]}
 * @param {[type]}
 * @param {[type]}
 */
function PusselGrid(numCellsX, numCellsY, cellSize){
	
	this.size = {x: numCellsX, y: numCellsY, cell: cellSize};
	this.items = []; // PusselItems i griden ordnade [x][y]
	this.selectedItem = null;
	
	this.gridToWorld = function(gridCoords)
    {
        var worldX = (gridCoords.x - this.size.x / 2 + 0.5) * this.size.cell;
        var worldY = (gridCoords.y - this.size.y / 2 + 0.5) * this.size.cell;
        return {x: worldX, y: worldY};
    };
	
	this.placePusselItem = function(pusselItem){
		var worldPosition = this.gridToWorld(pusselItem.gridPosition)
		pusselItem.setWorldPosition(worldPosition);
	};
	
	// om två items bredvid varandra
	this.isAdjacent = function(pusselItem1, pusselItem2){
		var xDisplace = pusselItem1.gridPosition.x - pusselItem2.gridPosition.x;
        xDisplace = xDisplace < 0 ? xDisplace*-1 : xDisplace;
		
        var yDisplace = pusselItem1.gridPosition.y - pusselItem2.gridPosition.y;
        yDisplace = yDisplace < 0 ? yDisplace*-1 : yDisplace;
        
		return (xDisplace + yDisplace) == 1;
	};
	
	this.getItem = function(x, y){
		if((x < 0)||(x > this.size.x)){
			return false;
		}
		if((y < 0)||(y > this.size.y)){
			return false;
		}
		return this.items[x][y];
	};
	
	this.setSelected = function(pusselItem){
		this.selectedItem = pusselItem;
	};
	
	this.getMatches = function(pusselItem){
		
		// Rekursiv sökningsfunktion efter träffar
		// Algoritm av Stephen Surtees (foxcode)
		var findMatches = function(axis, matchingItem, matchList)
        {
            var testingItem = this.items[matchingItem.gridPosition.x+axis.x] && this.items[matchingItem.gridPosition.x+axis.x][matchingItem.gridPosition.y+axis.y];
            matchingItem && testingItem && matchingItem.id == testingItem.id && !testingItem.moving && matchList.push(testingItem) && findMatches(axis, testingItem, matchList);
        };
		
		//org
		/* var createMatch = function(axis, square, match)
        {
            var square2 = !columnsLocked[square.col+axis.x] && board[square.col+axis.x] && board[square.col+axis.x][square.row+axis.y];
            square && square2 && square.type == square2.type && !square2.moving && match.push(square2) && createMatch(axis, square2, match);
        }; */
		
		// söker matchningar
		var matchesHorizontal = [];
        var matchesVertical = [];
		createMatch({x:1, y:0}, pusselItem, matchesHorizontal);
        createMatch({x:-1, y:0}, pusselItem, matchesHorizontal);
        createMatch({x:0, y:1}, pusselItem, matchesVertical);
        createMatch({x:0, y:-1}, pusselItem, matchesVertical);
        horizontalMatch.push(pusselItem);
        verticalMatch.push(pusselItem);
		
		// lägger eventuella >=3-träffar i en träfflista
		var matches = [];
        if(horizontalMatch.length > 2)
        {
            // vet inte vad matched behövs till än
			/*var counter = 0;
            for(var i=0; i<matchesHorizontal.length; i++)
            {
                horizontalMatch[i].matched && counter++;
                if(flagAsMatched)
                {
                    horizontalMatch[i].matched = true;
                }
            }
            if(counter < horizontalMatch.length)
            {*/
                matches.push(matchesHorizontal);
            //}
        }
        if(verticalMatch.length > 2)
        {
            // vet inte vad matched behövs till än
			/*counter = 0;
            for(i=0; i<verticalMatch.length; i++)
            {
                verticalMatch[i].matched && counter++;
                if(flagAsMatched)
                {
                    verticalMatch[i].matched = true;
                }
            }
            if(counter < verticalMatch.length)
            {*/
                matches.push(matchesVerticalh);
            //}
        }
        if(matches.length==0)
        {
            return false;
        }
        return matches;
	};
	
	
	this.swapItems = function(pusselItem1, pusselItem2, checkForMatches)
    {
        if (!pusselItem1 || !pusselItem2)
        {
            return false;
        }

        // Only try to swap if selected squares are adjacent
        if(!this.isAdjacent(pusselItem1, pusselItem2))
        {
            return false;
        }

        // Temporary variables
        var pItem1X = pusselItem1.gridPosition.x;
		var pItem1Y = pusselItem1.gridPosition.y;
		var pItem2X = pusselItem2.gridPosition.x;
		var pItem2Y = pusselItem2.gridPosition.y;

        // Swap the locations
        //var square1Position = square1.getPosition();
        //var square2Position = square2.getPosition();
        this.items[pusselItem1.gridPosition.x][pusselItem1.gridPosition.y] = pusselItem2;
		this.items[pusselItem2.gridPosition.x][pusselItem2.gridPosition.y] = pusselItem1;

        var pItem1NewGridPosition = {x: pusselItem2.gridPosition.x, y:pusselItem2.gridPosition.y};
		var pItem2NewGridPosition = {x: pusselItem1.gridPosition.x, y:pusselItem1.gridPosition.y};
		
		var pItem1NewWorldPosition = this.gridToWorld(pItem1NewGridPosition);
		var pItem2NewWorldPosition = this.gridToWorld(pItem2NewGridPosition);
		
		pusselItem1.gridPosition = pItem1NewGridPosition;
		pusselItem2.gridPosition = pItem2NewGridPosition;

        // Apply the swap
        pusselItem1.moveTo(pItem1NewWorldPosition.x, pItem1NewWorldPosition.y, 300);
		pusselItem2.moveTo(pItem2NewWorldPosition.x, pItem2NewWorldPosition.y, 300);

        pusselItem1.moving = true;
		pusselItem2.moving = true;

        // Lock columns
        //columnsLocked[square1.col] = true;
        //columnsLocked[square2.col] = true;
	};
	
}

//@ sourceURL=Grid.js