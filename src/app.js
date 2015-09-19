/**
* Pebble Cube V1.0
* By Angela Yang, Trevor Edwards, and Gabe "Boozye" Ngam
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
  var game = roomRender(0,true);
  game.show();
  titleMenu.hide();
  game.on('click','up', function(){
    game.openAnimate( roomRender(0,true) );
  });
  //Initialize game
  //Render initial view
};

titleMenu.on('click', 'up', titleToGame );
titleMenu.on('click', 'down', titleToGame );
titleMenu.on('click', 'select', titleToGame );
titleMenu.on('click', 'back', titleToGame );

/**
* Returns a Window with the desired view rendered (0 = wall, 1 = floor, 2 = ceiling)
*/
function roomRender(view, hasDoor){
  
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
       knob.animate('position',  new Vector2(79, 75), 500);
      }, 600);
     
     setTimeout(function() {
        knob.remove();
        mypic.remove();
        door.animate('position', new Vector2(0,0),1000)
            .animate('size', new Vector2(144,168),1000);
      }, 1200);
     
      setTimeout(function() {
        nextRoom.show();
             wind.hide();
      }, 2400);
    
 };
  }
  
  return wind;
  
}