/**
* Pebble Cube V1.0
* By Trevor Edwards and Gabe "Boozye" Ngam
*/

var UI = require('ui');
var Vector2 = require('vector2');

var titleMenu = new UI.Window();

// Create a background Rect
var bgRect = new UI.Rect({
  position: new Vector2(10, 20),
  size: new Vector2(124, 60),
  backgroundColor: 'white'
});

// Add Rect to Window
titleMenu.add(bgRect);

// Create TimeText
var timeText = new UI.Text({
  position: new Vector2(0, 50),
  size: new Vector2(144, 30),
  text: "Pebble",
  font: 'bitham-30-black',
  color: 'black',
  textAlign: 'center'
});

var starty = new UI.Text({
  position: new Vector2(0, 75),
  size: new Vector2(144, 30),
  text: "Cube",
  font: 'bitham-30-black',
  color: 'white',
  textAlign: 'center'
});

var starty2 = new UI.Text({
  position: new Vector2(0, 120),
  size: new Vector2(144, 30),
  text: "Press a button",
  font: 'gothic-14',
  color: 'white',
  textAlign: 'center'
});
// Add the TimeText
titleMenu.add(timeText);
titleMenu.add(starty);
titleMenu.add(starty2);


// Show the Window
titleMenu.show();

//END OF TITLE STUFF
//BEGINNING OF NEW STUFF

var titleToGame = function(e){
  var G = new Game("lolname", null, 5, 3,3,3);
  var game = roomRender(0,true);
  game.show();
  titleMenu.hide();
  
  var doorClosed = true;
  
  function gameLoop(){
  if( doorClosed ){
      game.openAnimate( );
      doorClosed = false;
    } else {
      if( G.attemptMove() ){
        var hasDoor = true;
        var roomType = 0;
        var direction = "N";
        doorClosed = true;
        var temp = roomRender(roomType,hasDoor);
        game.transition( temp );
        game = temp;
        game.on('click','up', gameLoop);
      }
    }
  }
  
  game.on('click','up', gameLoop);
  
};


titleMenu.on('click', 'up', titleToGame );
titleMenu.on('click', 'down', titleToGame );
titleMenu.on('click', 'select', titleToGame );
titleMenu.on('click', 'back', titleToGame );

/**
* Returns a Window with the desired view rendered (0 = wall, 1 = floor, 2 = ceiling)
*/
function roomRender(view, hasDoor, direction){
  
  var wind = new UI.Window({
    fullscreen: true
  });
  
  //try to get rid of stupid animations, api doesnt support this well
 // wind.on('show', function() {
   // return false;
//  });
  
  
  var files = ['images/wall1.png','images/floor.png','images/ceiling.png'];
  
  var mypic = new UI.Image({
    position: new Vector2(0, 0),
    size: new Vector2(144, 168),
    image: files[view]
  });
  
  wind.add(mypic);
  
  var directionText = new UI.Text({
  position: new Vector2(61,52),
  size: new Vector2(30,30),
  text: direction,
  font: 'gothic-10',
  color: 'white',
  textAlign: 'center'
  });
  
  wind.add(directionText);
  
  if( hasDoor ){
  var door = new UI.Rect({
    position: new Vector2(60,64),
    size: new Vector2(26,26),
    backgroundColor: 'black',
    borderColor: 'white'
  });
  
  var knob = new UI.Rect({
    position: new Vector2(71,75),
    size: new Vector2(5,5),
    backgroundColor: 'white',
    borderColor: 'clear'
  });
    
    wind.add(door);
    wind.add(knob);
    
   wind.openAnimate = function(nextRoom){
     
     //If any pebble devs read this, your queue function appears to be broken so I had to use setTimeout.
   knob
     .animate('size',  new Vector2(3, 3), 500)
     .animate('position',  new Vector2(72, 76), 500);
     
     setTimeout(function() {
       knob.animate('position',  new Vector2(81, 76), 1000);
      }, 600);
     
     setTimeout(function() {
        knob.remove();
      }, 1700);

    
 };
    
    wind.transition = function(nextRoom){
      
        knob.remove();
        mypic.remove();
        door.animate('position', new Vector2(0,0),1000)
            .animate('size', new Vector2(144,168),1000);
     
      setTimeout(function() {
        nextRoom.show();
             wind.hide();
      }, 1050);
      
    };
  }
  
  return wind;
  
}




/**
* BEGIN GAME.JS -------------------------------------------------------------------------
*/

function room(trap, displayText, xCoordinate, yCoordinate, zCoordinate) {
        this.trap = trap;
        this.displayText = displayText;
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.zCoordiante = zCoordinate;
}

function Person (name) {
        this.name = name;
        this.NSEWDirection = "NORTH";
        this.UDDirection = "STRAIGHT";
        this.Items = [];
}

var generateRooms = function(size) {
    
      var rooms = [];
        for (var i = 0; i < size; i++ ){
            rooms[i] = [];
                for(var j = 0; j < size; j++) {
                    rooms[i][j] = [];
                }
        }
         var possibleNames = getDisplaynames();
        for(var x = 0; x < size; x++){
          for(var y = 0; y < size; y++){
            for(var z = 0; z < size; z++){
                rooms[x][y][z] = new room("dank", possibleNames[x*y*z % possibleNames.length], x, y, z);
            }
          }
        }
  return rooms;
};


function Game(name, room, size, startx, starty, startz) {
        this.myPerson = new Person(name);
        this.mySize = size;
        this.rooms = generateRooms(size);
        this.currentX = startx;
        this.currentY = starty;
        this.currentZ = startz;
}

function getDisplaynames() {
    var possibleNames = [];
        possibleNames.push("This is the dankest meme Room");
        possibleNames.push("Congratulations, you win the room!");
        possibleNames.push("Wow, this room has the rarest pepe room");
        possibleNames.push("Trevor Edwards");
        possibleNames.push("Darude Sandstorm");
        possibleNames.push("duududududu");
  return possibleNames;
}

//Used when you have an invalid funciton and you need to prompt a message to the player that 
//are doing some screwed up shit
var  displayInvalid = function() {
        //do some shit
};


Game.prototype.attemptMove = function() {
        if(this.currentX === 0 && this.myPerson.NSEWDirection == "WEST") {
                displayInvalid();
                return false;
        } else if(this.currentX == this.mySize-1 && this.myPerson.NSEWDirection == "EAST") {
                displayInvalid();
                return false;
        } else if(this.currentY === 0 &&this.myPersonNSEWDirection == "SOUTH"){
                displayInvalid();
                return false;
        } else if(this.currentY == this.mySize-1 && this.myPerson.NSEWDirection == "NORTH") {
                displayInvalid();
                return false;
        } else if(this.currentZ === 0 && this.myPerson.UDDirection == "DOWN") {
                displayInvalid();
                return false;
        } else if(this.currentZ == this.mySize-1 && this.myPerson.UDDirection == "UP") {
                displayInvalid();
                return false;
        } else {
                this.enter();
                return true;
        }

};

Game.prototype.displayRoomInfo = function() {
        //display room info based on this.rooms[this.currentX][this.currentY][this.currentZ].displayText;
};

Game.prototype.enter = function() {
        if(this.myPerson.UDDirection != "STRAIGHT"){
                switch(this.myPerson.UDDirection){
                        case "UP":
                                this.currentZ++;
                                break;
                                //execute based on trap here

                        case "DOWN":
                                this.currentZ--;
                                break;
                                //execute based on trap here
                        default:        
                                break;
                                //what the FUCK
                } } else {
                switch(this.myPerson.NSEWDirection){
                        case "NORTH":
                                this.currentY++;
                                break;
                                //execute based on trap here
                        case "SOUTH":
                                this.currentY--;
                                break;
                                //execute based on trap here
                        case "EAST":
                                this.currentX++;
                                break;
                                //execute based on trap here
                        case "WEST":
                                this.currentX--;
                                break;
                                //execute based on trap here
                        default: 
                                break;
                                //WTF
                }
        }
        this.displayRoomInfo();
        switch(this.rooms[this.currentX][this.currentY][this.currentZ].trap){
                case "FINALDOOR":
                case "FIERYDEATH":
                case "EBOLA":
                case "SPIKEDEATH":
            case "GASDEATH":
        }

};

Game.prototype.interactWithRoom = function() {
        if(this.rooms[this.currentX][this.currentY][this.currentZ].trap == "do somethign"){
                //display based on trap
        }
}
          
            
            

Person.prototype.turnRight = function () {
        if(this.NSEWDirection == "NORTH") {
                this.NSEWDirection = "EAST";
        } else if(this.NSEWDirection == "EAST") {
                this.NSEWDirection = "SOUTH";
        } else if(this.NSEWDirection == "SOUTH") {
                this.NSEWDirection = "WEST";
        } else if(this.NSEWDirection  == "WEST") {
                this.NSEWDirection = "NORTH";
        }
};

Person.prototype.turnLeft = function () {
        if(this.NSEWDirection == "NORTH") {
                this.NSEWDirection = "WEST";
        } else if(this.NSEWDirection == "WEST") {
                this.NSEWDirection = "SOUTH";
        } else if(this.NSEWDirection == "SOUTH") {
                this.NSEWDirection = "EAST";
        } else if(this.NSEWDirection  == "EAST") {
                this.NSEWDirection = "NORTH";
        }
};

Person.prototype.lookUP = function() {
        if(this.UDDirection == "STRAIGHT") {
                this.UDDirection = "UP";
        } else if (this.UDDirection == "DOWN") {
                this.UDDirection = "STRAIGHT";
        }
};

Person.prototype.lookDOWN = function() {
        if(this.UDDirection == "UP") {
                this.UDDirection = "STRAIGHT";
        } else if (this.UDDirection == "STRAIGHT") {
                this.UDDirection = "DOWN";
        }
};

Person.prototype.takeItem = function(item) {
  
  //TODO
        //Items.push(item);
} ;         