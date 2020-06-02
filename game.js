
    var grid = [];
    var gridRows, gridColumns, context, count = 0, mushroomsEaten = 0;
   
    var marioPosition = {
        x: 0,
        y: 0
    }

    var defaultSize = {
        width: 40,
        height: 40
    }

  
    function drawCanvas(){
        context.clearRect(0,0,1200,600);
        for(let row=0; row<grid.length; row++){
            for(let col=0; col< grid[row].length; col++){
                let x = col*defaultSize.width;
                let y = row*defaultSize.height;
                if(grid[row][col] === 2){
                    
                    var mario = new Image;
                    mario.onload = function() {
                        context.drawImage(mario,x,y,defaultSize.width, defaultSize.height);
                    }
                    mario.src = "mario.jpg";
                }else if(grid[row][col] === 0){
                    
                    var mushroom = new Image;
                    mushroom.onload = function() {
                    context.drawImage(mushroom,x,y, defaultSize.width, defaultSize.height);
                    }
                    mushroom.src = "mush.jpg";
                
                }else if(grid[row][col] === 1){
                    context.rect(x, y, defaultSize.width, defaultSize.height);
                    context.stroke();
                }
                
            }
        }
    }
   
    document.onkeydown = function(event){
        if(mushroomsEaten === parseInt(gridRows)){
            alert("All mushrooms eaten in "+count +" steps.")
        }
        
        if(event.keyCode === 37){
            if(marioPosition.y > 0){
                if(grid[marioPosition.x][marioPosition.y-1] === 0){
                    mushroomsEaten++;
                }
                grid[marioPosition.x][marioPosition.y] = 1;
                marioPosition.y = marioPosition.y - 1;
                grid[marioPosition.x][marioPosition.y] = 2;
                count++;
                drawCanvas();
            }
        }else if(event.keyCode === 38){
            if(marioPosition.x > 0){
                if(grid[marioPosition.x - 1][marioPosition.y] === 0){
                    mushroomsEaten++;
                }
                grid[marioPosition.x][marioPosition.y] = 1;
                marioPosition.x = marioPosition.x - 1;
                grid[marioPosition.x][marioPosition.y] = 2;
                count++;
                drawCanvas();
            }
            
        }else if(event.keyCode === 39){
            if(marioPosition.y < grid[0].length - 1){
                if(grid[marioPosition.x][marioPosition.y+1] === 0){
                    mushroomsEaten++;
                }
                grid[marioPosition.x][marioPosition.y] = 1;
                marioPosition.y = marioPosition.y +1;
                grid[marioPosition.x][marioPosition.y] = 2;
                count++;
                drawCanvas();
            }
            
        }else if(event.keyCode === 40){
            if(marioPosition.x < grid.length - 1){
                if(grid[marioPosition.x+1][marioPosition.y] === 0){
                    mushroomsEaten++;
                }
                grid[marioPosition.x][marioPosition.y] = 1;
                marioPosition.x = marioPosition.x +1;
                grid[marioPosition.x][marioPosition.y] = 2;
                count++;
                drawCanvas();
            }
        }
    }

    function generateGrid(gridRows, gridColumns){
        grid = [];

        var tmpArr = [] 
        for (var i = 0; i < gridRows * gridColumns - gridRows; i = i+1) {
            tmpArr.push(1);
        }
        var i =0;
        while(i< gridRows){
            var index = Math.round(Math.random() * (tmpArr.length + 1));
            if(index !== 0){
                tmpArr.splice(index, 0, 0);
                i = i+1;
            }
        }
        for (var i = 0; i < gridRows; i += 1) {
            var row = tmpArr.slice(i * gridColumns, (i + 1) * gridColumns);
            grid.push(row);
        }
        grid[0][0] = 2;
        drawCanvas();
    }

    window.onload = function(){
        var canvas = document.getElementById('marioCanvas');
        context = canvas.getContext('2d');
        gridRows = prompt('Please Enter The Number Of Rows');
        gridColumns = prompt('Please Enter Number Of Columns');
        generateGrid(gridRows, gridColumns);
    }



  


