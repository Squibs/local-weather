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

const showPosition = function (position) {
  document.write(`Latitude: ${position.coords.latitude} Longitude: ${position.coords.longitude}`);
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
    // TODO: replace alert with html message
    alert('Geolocation is not supported in your browser. Sorry!');
  }
};

$(document).ready(getLocation());
