/* eslint no-alert: 0 */

/* dynamic favicon - cannot figure out a way to get this to work on any browser;
*  leaving this here for the future
*/
/*
document.head = document.head || (document.head = document.getElementsByTagName('head')[0]);

const changeFavicon = function (imgLink) {
  const favLink = document.createElement('link');
  const oldFav = document.getElementById('dynamic-favicon');
  let imgLoc = imgLink.replace('svg', 'png');

  imgLoc = imgLoc.replace('svg', 'png');
  imgLoc = `${imgLoc}?=${Math.random()}`;

  console.log(imgLoc);

  favLink.id = 'dynamic-favicon';
  favLink.rel = 'shortcut icon';
  favLink.href = imgLoc;

  if (oldFav) {
    document.head.removeChild(oldFav);
  }

  document.head.appendChild(favLink);
};
*/

const apiSuccess = function (data) {
  const currentTime = new Date(data.currently.time * 1000);
  const sunriseTime = new Date(data.daily.data[0].sunriseTime * 1000);
  const sunsetTime = new Date(data.daily.data[0].sunsetTime * 1000);
  let weatherIcon = '';

  // weather types
  switch (true) {
    // clear-day or clear-night
    case (data.currently.icon === 'clear-day' || data.currently.icon === 'clear-night'):
      if (currentTime > sunriseTime && currentTime < sunsetTime) {
        weatherIcon = '/img/meteocons/svg/icon-sun.svg';
      } else { weatherIcon = '/img/meteocons/svg/icon-moon-inv.svg'; }
      break;

    // rain
    case (data.currently.icon === 'rain'):
      if (data.currently.windSpeed >= 32) {
        if (currentTime > sunriseTime && currentTime < sunsetTime) {
          weatherIcon = '/img/meteocons/svg/icon-windy-rain.svg';
        } else { weatherIcon = '/img/meteocons/svg/icon-windy-rain-inv.svg'; }
      } else if (currentTime > sunriseTime && currentTime < sunsetTime) {
        weatherIcon = '/img/meteocons/svg/icon-rain.svg';
      } else { weatherIcon = '/img/meteocons/svg/icon-rain-inv.svg'; }
      break;

    // snow or sleet
    case (data.currently.icon === 'snow' || data.currently.icon === 'sleet'):
      if (data.daily.precipIntensityMax > 3.5) {
        if (currentTime > sunriseTime && currentTime < sunsetTime) {
          weatherIcon = '/img/meteocons/svg/icon-snow-heavy.svg';
        } else { weatherIcon = '/img/meteocons/svg/icon-snow-heavy-inv.svg'; }
      } else if (currentTime > sunriseTime && currentTime < sunsetTime) {
        weatherIcon = '/img/meteocons/svg/icon-snow.svg';
      } else { weatherIcon = '/img/meteocons/svg/icon-snow-inv.svg'; }
      break;

    // wind
    case (data.currently.icon === 'wind'):
      weatherIcon = '/img/meteocons/svg/icon-wind.svg';
      break;

    // fog
    case (data.currently.icon === 'fog'):
      if (data.currently.cloudCover > 0.55) {
        weatherIcon = '/img/meteocons/svg/icon-fog-cloud.svg';
      } else if (currentTime > sunriseTime && currentTime < sunsetTime) {
        weatherIcon = '/img/meteocons/svg/icon-fog-sun.svg';
      } else { weatherIcon = '/img/meteocons/svg/icon-fog-moon.svg'; }
      break;

    // cloudy, partly-cloudy-day, or partly-cloudy-night
    case (data.currently.icon === 'cloudy' || data.currently.icon === 'partly-cloudy-day' || data.currently.icon === 'partly-cloudy-night'):
      if (data.currently.cloudCover > 0.69) {
        if (currentTime > sunriseTime && currentTime < sunsetTime) {
          weatherIcon = '/img/meteocons/svg/icon-clouds.png';
        } else { weatherIcon = '/img/meteocons/svg/icon-clouds-inv.svg'; }
      } else if (data.currently.cloudCover <= 0.69 && data.currently.cloudCover > 51) {
        if (data.currently.windSpeed >= 25) {
          if (currentTime > sunriseTime && currentTime < sunsetTime) {
            weatherIcon = '/img/meteocons/svg/icon-windy.svg';
          } else { weatherIcon = '/img/meteocons/svg/icon-windy-inv.svg'; }
        } else if (currentTime > sunriseTime && currentTime < sunsetTime) {
          weatherIcon = '/img/meteocons/svg/icon-cloud.svg';
        } else { weatherIcon = '/img/meteocons/svg/icon-cloud-inv.svg'; }
      } else if (currentTime > sunriseTime && currentTime < sunsetTime) {
        weatherIcon = '/img/meteocons/svg/icon-cloud-sun.svg';
      } else { weatherIcon = '/img/meteocons/svg/icon-cloud-moon-inv.svg'; }
      break;

    // default
    default:
      weatherIcon = '/img/icon-question-mark.svg';
      break;
  }
};

const apiError = function (textStatus, errorThrown) {
  alert(`Status: ${textStatus}\nError: ${errorThrown}`);
};

const getData = function (apiURL) {
  return $.ajax({
    format: 'jsonp',
    dataType: 'jsonp',
    headers: { 'Cache-Control': 'max-age=600' },
    cache: true,
    url: apiURL,
  });
};

const callAPI = function (lat, lon) {
  const apiURL = `https://api.darksky.net/forecast/d8dfa4936dd40016ba877875ed576b46/${lat},${lon}`;
  getData(apiURL).done(apiSuccess).fail(apiError);
};

const showPosition = function (position) {
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
