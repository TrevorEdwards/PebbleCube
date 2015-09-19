/**
* Pebble Cube V1.0
* By Angela Yang, Trevor Edwards, and that jerk Gabe
*/

var UI = require('ui');

var titleMenu = new UI.Window();


// Construct URL
var cityName = 'Hong Kong';
var URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName;

// Create a Card with title and subtitle
var card = new UI.Card({
  title:'Weather',
  subtitle:'Fetching...'
});

// Display the Card
card.show();

// Make the request
// Make request to openweathermap.org
ajax(
  {
    url:'http://api.openweathermap.org/data/2.5/forecast?q=London',
    type:'json'
  },
  function(data) {
    console.log(JSON.stringify(data, null, 2));
  },
  function(error) {
    console.log('Download failed: ' + error);
  }
);