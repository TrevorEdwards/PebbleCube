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
  var game = roomRender(0,0);
  game.show();
  titleMenu.hide();
  //Initialize game
  //Render initial view
};

titleMenu.on('click', 'up', titleToGame );
titleMenu.on('click', 'down', titleToGame );
titleMenu.on('click', 'select', titleToGame );
titleMenu.on('click', 'back', titleToGame );

var roomRender = function(tileType, viewEnum){
  var wind = new UI.Window({
    fullscreen: true
  });
  
  var myTile = new UI.Image({
    position: new Vector2(0, 0),
    size: new Vector2(144, 168),
    image: 'images/wall1.png'
  });
  
  wind.add(myTile);
  
  return wind;
  
}