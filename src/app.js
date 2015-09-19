/**
* Pebble Cube V1.0
* By Trevor Edwards and Gabe "Boozye" Ngam
*/

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');
var Light = require('ui/light');
var Vibe = require('ui/vibe');

var titleMenu = new UI.Window();

Light.on();

var placeData;
  ajax(
  {
    url:'http://cornelldata.org/api/v0/map-data/buildings',
    // url:'http://api.openweathermap.org/data/2.5/forecast?q=London',
    type:'json'
  },
  function(data) {
  //  console.log(data);
  //  console.log(JSON.stringify(data, null, 2));
    placeData = [];
    for(var i = 0; i < data.length; i++){
    //  console.log(data[i]);
      placeData.push(data[i].Name);
    }
  },
  function(error) {
    console.log('Download failed: ' + error);
  }
);
  

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
  var G = new Game("lolname", null, 5, 2,2,2,2,4,3,"N");
  var game = roomRender(0,true,"N");
  game.show();
  titleMenu.hide();
  
  var doorClosed = true;
  
  function gameTransition(type){
    if(type === 1){
      G.myPerson.turnRight();
    }
    else if(type === 2){
      G.myPerson.turnLeft();
    }
    else if(type === 3){
      G.myPerson.lookUP();
    }
    else if(type === 4){
      G.myPerson.lookDOWN();
    }
    var hasDoor = G.shouldHaveDoor();
        var roomType;
        if( G.myPerson.UDDirection == "U"){
          roomType = 2;
        } else if ( G.myPerson.UDDirection == "D"){
          roomType = 1;
        } 
    else{
          roomType = 0;
        }
    var direction;
        if (G.myPerson.UDDirection != "STRAIGHT"){
          direction = "";
        } else{
          direction = G.myPerson.NSEWDirection;
        }
        doorClosed = true;
       var descrip = G.rooms[G.currentX][G.currentY][G.currentZ].displayText;
        var temp = roomRender(roomType,hasDoor, direction, descrip);
        if(type === 0){
          var card = new UI.Card({
          title: ''
          });
          card.body(descrip);
          game.transition(temp,card);
        }else{
          temp.show();
          game.hide();
        }
        game = temp;
        game.on('click','select', function(){gameLoop();});
        game.on('click','up', function(){gameTransition(1);});
        game.on('click','down', function(){gameTransition(2);});
        game.on('longClick','up', function(){gameTransition(3);});
        game.on('longClick','down', function(){gameTransition(4);});
  }
  
  function gameLoop(){
  if( doorClosed ){
      game.openAnimate( );
      doorClosed = false;
      Vibe.vibrate('short');
    } else {
      if( G.attemptMove() ){
        gameTransition(0);
        Vibe.vibrate('long');
      }
    }
  }
  
  game.on('click','select', gameLoop);
  game.on('click','up', function(){gameTransition(1);});
  game.on('click','down', function(){gameTransition(2);});
  
};


titleMenu.on('click', 'up', titleToGame );
titleMenu.on('click', 'down', titleToGame );
titleMenu.on('click', 'select', titleToGame );
titleMenu.on('click', 'back', titleToGame );

var files = [new UI.Image({
    position: new Vector2(0, 0),
    size: new Vector2(144, 168),
    image: 'images/wall1.png'
  }),
               new UI.Image({
    position: new Vector2(0, 0),
    size: new Vector2(144, 168),
    image: 'images/floor.png'
  }),
               new UI.Image({
    position: new Vector2(0, 0),
    size: new Vector2(144, 168),
    image: 'images/ceiling.png'
  })];

/**
* Returns a Window with the desired view rendered (0 = wall, 1 = floor, 2 = ceiling)
*/
function roomRender(view, hasDoor, direction){
  
  var wind = new UI.Window({
    fullscreen: true
  });
  
  var mypic = files[view];
  wind.add(mypic);
  
  var directionText = new UI.Text({
  position: new Vector2(61,25),
  size: new Vector2(30,30),
  text: direction,
  font: 'gothic-14',
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
       knob.animate('position',  new Vector2(81, 76), 1600);
      }, 600);
     
     setTimeout(function() {
        knob.remove();
      }, 2300);

    
 };
    
    wind.transition = function(nextRoom, card){
      
        knob.remove();
        mypic.remove();
        door.animate('position', new Vector2(0,0),1000)
            .animate('size', new Vector2(144,168),1000);
     
      setTimeout(function() {
        nextRoom.show();
             wind.hide();
         card.show();
      }, 1600);
      
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
        this.NSEWDirection = "N";
        this.UDDirection = "STRAIGHT";
}
  

function getDescriptionString(){
  var length = placeData.length;
  var rand = Math.floor(Math.random() * length );
  return "This place reminds you of " + placeData[rand];
}

var generateRooms = function(size) {
    
      var rooms = [];
        for (var i = 0; i < size; i++ ){
            rooms[i] = [];
                for(var j = 0; j < size; j++) {
                    rooms[i][j] = [];
                }
        }
        for(var x = 0; x < size; x++){
          for(var y = 0; y < size; y++){
            for(var z = 0; z < size; z++){
                rooms[x][y][z] = new room("dank", getDescriptionString(), x, y, z);
            }
          }
        }
  return rooms;
};


function Game(name, room, size, startx, starty, startz, endx,endy,endz,enddir) {
        this.myPerson = new Person(name);
        this.mySize = size;
        this.rooms = generateRooms(size);
        this.currentX = startx;
        this.currentY = starty;
        this.currentZ = startz;
        this.endX = endx;
        this.endY = endy;
        this.endZ = endz;
        this.endDir = enddir;
}


Game.prototype.attemptMove = function() {
        if(this.currentX === this.endX && this.currentY === this.endY && this.currentZ === this.endZ && this.myPerson.NSEWDirection === this.endDir  && this.myPerson.UDDirection == "STRAIGHT") {
              victoryEnd();
              return false;
        }
        else if(this.currentX === 0 && this.myPerson.NSEWDirection == "W") {
               // displayInvalid();
                return false;
        } else if(this.currentX == this.mySize-1 && this.myPerson.NSEWDirection == "E") {
               // displayInvalid();
                return false;
        } else if(this.currentY === 0 &&this.myPersonNSEWDirection == "S"){
               // displayInvalid();
                return false;
        } else if(this.currentY == this.mySize-1 && this.myPerson.NSEWDirection == "N") {
              //  displayInvalid();
                return false;
        } else if(this.currentZ === 0 && this.myPerson.UDDirection == "D") {
               // displayInvalid();
                return false;
        } else if(this.currentZ == this.mySize-1 && this.myPerson.UDDirection == "U") {
                displayInvalid();
                return false;
        } else {
                this.enter();
                return true;
        }

};

Game.prototype.shouldHaveDoor = function() {
        if(this.currentX === this.endX && this.currentY === this.endY && this.currentZ === this.endZ && this.myPerson.NSEWDirection === this.endDir  && this.myPerson.UDDirection == "STRAIGHT") {
                return true;
        }
        else if(this.currentX === 0 && this.myPerson.NSEWDirection == "W") {
                return false;
        } else if(this.currentX == this.mySize-1 && this.myPerson.NSEWDirection == "E") {
                return false;
        } else if(this.currentY === 0 &&this.myPersonNSEWDirection == "S"){
                return false;
        } else if(this.currentY == this.mySize-1 && this.myPerson.NSEWDirection == "N") {
                return false;
        } else if(this.currentZ === 0 && this.myPerson.UDDirection == "D") {
                return false;
        } else if(this.currentZ == this.mySize-1 && this.myPerson.UDDirection == "U") {
                return false;
        } else {
                return true;
        }

};

Game.prototype.enter = function() {
        if(this.myPerson.UDDirection != "STRAIGHT"){
                switch(this.myPerson.UDDirection){
                        case "U":
                                this.currentZ++;
                                break;
                                //execute based on trap here

                        case "D":
                                this.currentZ--;
                                break;
                                //execute based on trap here
                        default:        
                                break;
                                //what the FUCK
                } } else {
                switch(this.myPerson.NSEWDirection){
                        case "N":
                                this.currentY++;
                                break;
                                //execute based on trap here
                        case "S":
                                this.currentY--;
                                break;
                                //execute based on trap here
                        case "E":
                                this.currentX++;
                                break;
                                //execute based on trap here
                        case "W":
                                this.currentX--;
                                break;
                                //execute based on trap here
                        default: 
                                break;
                                //WTF
                }
        }
   this.UDDirection = "STRAIGHT";

};

function victoryEnd(){
  
  var card = new UI.Card({
          title: 'You won'
          });
          card.body('You escaped the cube of Kanye');
          //game.hide();
        card.show();
  
}
            

Person.prototype.turnRight = function () {
        if(this.NSEWDirection == "N") {
                this.NSEWDirection = "E";
        } else if(this.NSEWDirection == "E") {
                this.NSEWDirection = "S";
        } else if(this.NSEWDirection == "S") {
                this.NSEWDirection = "W";
        } else if(this.NSEWDirection  == "W") {
                this.NSEWDirection = "N";
        }
};

Person.prototype.turnLeft = function () {
        if(this.NSEWDirection == "N") {
                this.NSEWDirection = "W";
        } else if(this.NSEWDirection == "W") {
                this.NSEWDirection = "S";
        } else if(this.NSEWDirection == "S") {
                this.NSEWDirection = "E";
        } else if(this.NSEWDirection  == "E") {
                this.NSEWDirection = "N";
        }
};

Person.prototype.lookUP = function() {
        if(this.UDDirection == "STRAIGHT") {
                this.UDDirection = "U";
        } else if (this.UDDirection == "D") {
                this.UDDirection = "STRAIGHT";
        }
};

Person.prototype.lookDOWN = function() {
        if(this.UDDirection == "U") {
                this.UDDirection = "STRAIGHT";
        } else if (this.UDDirection == "STRAIGHT") {
                this.UDDirection = "D";
        }
};        