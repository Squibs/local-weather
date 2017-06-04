/*
// lets
let userLocation = '';

// constants
const x = document.getElementById('demo');


function showPosition(position) {
  x.innerHTML = `Latitude: ${position.coords.latitude} <br>Longitude: ${position.coords.longitude}`;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = 'Geolocation is not supported by this browser.';
  }
}

const drLocation = function () { userLocation = getLocation(); return userLocation; };

$(document).ready(drLocation());

console.log(userLocation);
console.log(x.innerHTML);
console.log('hello?');
*/

const apiSuccess = function (data) {
  /*eslint-disable*/
  // FIXME: remove this; used as fake JSON information
  const fakeData = {"coord":{"lon":139.01,"lat":35.02},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"base":"stations","main":{"temp":285.514,"pressure":1013.75,"humidity":100,"temp_min":285.514,"temp_max":285.514,"sea_level":1023.22,"grnd_level":1013.75},"wind":{"speed":5.52,"deg":311},"clouds":{"all":0},"dt":1485792967,"sys":{"message":0.0025,"country":"JP","sunrise":1485726240,"sunset":1485763863},"id":1907296,"name":"Tawarano","cod":200};
 
  // FIXME: remove this; should already be set when this function is called... I hope
  data = fakeData;

  // FIXME: remove this; for visual reference
  document.write(`<br> <br> ${data} <br> <br> ${JSON.stringify(data)}`);
  /*eslint-enable*/

  const coords = `lon: ${data.coord.lon}, lat: ${data.coord.lat}`;
  const weather = data.weather[0].main;
  const temp = data.main.temp;
  const wind = data.wind.speed;

  document.write(`<br><br>Coordinates: ${coords}<br> Weather: ${weather}<br> Temperature: ${temp}<br> Wind Speed: ${wind}`);

  // weather types
  switch (true) {
    // thunderstorm
    case (data.weather[0].id >= 200 && data.weather[0].id <= 232):
      break;

    // drizzle
    case (data.weather[0].id >= 300 && data.weather[0].id <= 321):
      break;

    // rain
    case (data.weather[0].id >= 500 && data.weather[0].id <= 531):
      break;

    // snow
    case (data.weather[0].id >= 600 && data.weather[0].id <= 622):
      break;

    // atmosphere
    case (data.weather[0].id >= 701 && data.weather[0].id <= 781):
      break;

    // clear
    case (data.weather[0].id === 800):
      break;

    // clouds
    case (data.weather[0].id >= 801 && data.weather[0].id <= 804):
      break;

    // extreme
    case (data.weather[0].id >= 900 && data.weather[0].id <= 906):
      break;

    // additional
    default:
      break;
  }
};

const callAPI = function (lat, lon) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=7451b0f38a2562bb3050c05a3c01282b`;

  console.log(apiURL);

  apiSuccess();

/*
  $.ajax({
    url: 'api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}',
    success: apiSuccess(data),
    error: apiError(),
    cache: true
  });
*/
};

const showPosition = function (position) {
  // FIXME: remove this; for visual reference
  document.write(`Latitude: ${position.coords.latitude} Longitude: ${position.coords.longitude}`);
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  callAPI(lat, lon);
};

const showError = function (error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert('User denied the request for Geolocation.');
      break;
    case error.POSITION_UNAVAILABLE:
      alert('Location information is unavailable.');
      break;
    case error.TIMEOUT:
      alert('The request to get user location timed out.');
      break;
    case error.UNKNOWN_ERROR:
      alert('An unknown error occured.');
      break;
    default:
      alert('Potentially not an error');
      break;
  }
};

const getLocation = function () {
  if (navigator.geolocation) {
    const optn = {
      enableHighAccuracy: true,
      timeout: Infinity,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(showPosition, showError, optn);
  } else {
    // FIXME: replace alert with html message
    alert('Geolocation is not supported in your browser. Sorry!');
  }
};

$(document).ready(getLocation());


/*  TODO:
 *    * Figure out how to use ajax cache.
 *      - Limit API calls with it
 *      - Set some kind of timestamp to control when API can be called again
 *
 *
 *
 *
 *
 */
