function apiSuccess(data) {
  let currentTimeUnix = '';
  let sunriseTimeUnix = '';
  let sunsetTimeUnix = '';

  // FIXME: remove this; for visual reference
  document.write(`<br><br>${JSON.stringify(data)}`);

  // convert unix time to hours
  if (data.dt && data.sys.sunrise && data.sys.sunset) {
    currentTimeUnix = new Date(data.dt * 1000);
    sunriseTimeUnix = new Date(data.sys.sunrise * 1000);
    sunsetTimeUnix = new Date(data.sys.sunset * 1000);
  } else {
    const tempTime = new Date();
    currentTimeUnix = tempTime.getHours();
    sunriseTimeUnix = tempTime.getHours();
    sunsetTimeUnix = tempTime.getHours();
    console.log(currentTimeUnix);
  }

  let weatherIcon = '';
  let faviconIcon = '';

  console.log(`Current: ${currentTimeUnix}, Sunrise: ${sunriseTimeUnix}, Sunset: ${sunsetTimeUnix}`);
  console.log(data.weather[0].id);

  // weather types
  switch (true) {
    // thunderstorm
    case (data.weather[0].id >= 200 && data.weather[0].id <= 232):
      if (data.clouds.all > 75) {
        if (currentTimeUnix >= sunriseTimeUnix && currentTimeUnix <= sunsetTimeUnix) {
          weatherIcon = 'img/meteocons/svg/icon-clouds-flash.svg';
          faviconIcon = 'img/meteocons/png/icon-clouds-flash.png';
        } else {
          weatherIcon = 'img/meteocons/svg/icon-clouds-flash-inv.svg';
          faviconIcon = 'img/meteocons/png/icon-clouds-flash-inv.png';
        }
      } else if (currentTimeUnix >= sunriseTimeUnix && currentTimeUnix <= sunsetTimeUnix) {
        weatherIcon = 'img/meteocons/svg/icon-cloud-flash.svg';
        faviconIcon = 'img/meteocons/png/icon-cloud-flash.png';
      } else {
        weatherIcon = 'img/meteocons/svg/icon-cloud-flash-inv.svg';
        faviconIcon = 'img/meteocons/png/icon-cloud-flash-inv.png';
      }
      break;

    // drizzle
    case (data.weather[0].id >= 300 && data.weather[0].id <= 321):
      if (currentTimeUnix >= sunriseTimeUnix && currentTimeUnix <= sunsetTimeUnix) {
        weatherIcon = 'img/meteocons/svg/icon-drizzle.svg';
        faviconIcon = 'img/meteocons/png/icon-drizzle.png';
      } else {
        weatherIcon = 'img/meteocons/svg/icon-drizzle-inv.svg';
        faviconIcon = 'img/meteocons/png/icon-drizzle-inv.png';
      }
      break;

    // rain
    case (data.weather[0].id >= 500 && data.weather[0].id <= 531):
      if (data.wind.speed >= 10.8) {
        if (currentTimeUnix >= sunriseTimeUnix && currentTimeUnix <= sunsetTimeUnix) {
          weatherIcon = 'img/meteocons/svg/icon-windy-rain.svg';
          faviconIcon = 'img/meteocons/png/icon-windy-rain.png';
        } else {
          weatherIcon = 'img/meteocons/svg/icon-windy-rain-inv.svg';
          faviconIcon = 'img/meteocons/png/icon-windy-rain-inv.png';
        }
      } else if (currentTimeUnix >= sunriseTimeUnix && currentTimeUnix <= sunsetTimeUnix) {
        weatherIcon = 'img/meteocons/svg/icon-rain.svg';
        faviconIcon = 'img/meteocons/png/icon-rain.png';
      } else {
        weatherIcon = 'img/meteocons/svg/icon-rain-inv.svg';
        faviconIcon = 'img/meteocons/png/icon-rain-inv.png';
      }
      break;

    // snow
    case (data.weather[0].id >= 600 && data.weather[0].id <= 622):
      if (data.weather[0].id === 602 || data.weather[0].id === 622) {
        if (currentTimeUnix >= sunriseTimeUnix && currentTimeUnix <= sunsetTimeUnix) {
          weatherIcon = 'img/meteocons/svg/icon-snow-heavy.svg';
          faviconIcon = 'img/meteocons/png/icon-snow-heavy.png';
        } else {
          weatherIcon = 'img/meteocons/svg/icon-snow-heavy-inv.svg';
          faviconIcon = 'img/meteocons/png/icon-snow-heavy.inv.png';
        }
      } else if (currentTimeUnix >= sunriseTimeUnix && currentTimeUnix <= sunsetTimeUnix) {
        weatherIcon = 'img/meteocons/svg/icon-snow.svg';
        faviconIcon = 'img/meteocons/png/icon-snow.png';
      } else {
        weatherIcon = 'img/meteocons/svg/icon-snow-inv.svg';
        faviconIcon = 'img/meteocons/png/icon-snow-inv.png';
      }
      break;

    // atmosphere
    case (data.weather[0].id >= 701 && data.weather[0].id <= 781):
      if (data.weather[0].id === 741) {
        if (data.clouds.all > 74) {
          weatherIcon = 'img/meteocons/svg/icon-fog-cloud.svg';
          faviconIcon = 'img/meteocons/png/icon-fog-cloud.png';
        } else if (currentTimeUnix >= sunriseTimeUnix && currentTimeUnix <= sunsetTimeUnix) {
          weatherIcon = 'img/meteocons/svg/icon-fog-sun.svg';
          faviconIcon = 'img/meteocons/png/icon-fog-sun.png';
        } else {
          weatherIcon = 'img/meteocons/svg/icon-fog-moon.svg';
          faviconIcon = 'img/meteocons/png/icon-fog-moon.png';
        }
      } else if (data.weather[0].id === 701) {
        weatherIcon = 'img/meteocons/svg/icon-mist.svg';
        faviconIcon = 'img/meteocons/png/icon-mist.png';
      } else {
        weatherIcon = 'img/meteocons/svg/icon-fog.svg';
        faviconIcon = 'img/meteocons/png/icon-fog.png';
      }
      break;

    // clear
    case (data.weather[0].id === 800):
      if (currentTimeUnix >= sunriseTimeUnix && currentTimeUnix <= sunsetTimeUnix) {
        weatherIcon = 'img/meteocons/svg/icon-sun.svg';
        faviconIcon = 'img/meteocons/png/icon-sun.png';
      } else {
        weatherIcon = 'img/meteocons/svg/icon-moon.svg';
        faviconIcon = 'img/meteocons/png/icon-moon.png';
      }
      break;

    // clouds
    case (data.weather[0].id >= 801 && data.weather[0].id <= 804):
      if (data.clouds.all > 48) {
        if (currentTimeUnix >= sunriseTimeUnix && currentTimeUnix <= sunsetTimeUnix) {
          weatherIcon = 'img/meteocons/svg/icon-clouds.svg';
          faviconIcon = 'img/meteocons/png/icon-clouds.png';
        } else {
          weatherIcon = 'img/meteocons/svg/icon-clouds-inv.svg';
          faviconIcon = 'img/meteocons/png/icon-clouds-inv.png';
        }
      } else if (data.clouds.all <= 48 && data.clouds.all > 24) {
        if (data.wind.speed >= 10.8) {
          if (currentTimeUnix >= sunriseTimeUnix && currentTimeUnix <= sunsetTimeUnix) {
            weatherIcon = 'img/meteocons/svg/icon-windy.svg';
            faviconIcon = 'img/meteocons/png/icon-windy.png';
          } else {
            weatherIcon = 'img/meteocons/svg/icon-windy-inv.svg';
            faviconIcon = 'img/meteocons/png/icon-windy-inv.png';
          }
        } else if (currentTimeUnix >= sunriseTimeUnix && currentTimeUnix <= sunsetTimeUnix) {
          weatherIcon = 'img/meteocons/svg/icon-cloud.svg';
          faviconIcon = 'img/meteocons/png/icon-cloud.png';
        } else {
          weatherIcon = 'img/meteocons/svg/icon-cloud-inv.svg';
          faviconIcon = 'img/meteocons/png/icon-cloud-inv.png';
        }
      } else if (currentTimeUnix >= sunriseTimeUnix && currentTimeUnix <= sunsetTimeUnix) {
        weatherIcon = 'img/meteocons/svg/icon-cloud-sun.svg';
        faviconIcon = 'img/meteocons/png/icon-cloud-sun.png';
      } else {
        weatherIcon = 'img/meteocons/svg/icon-cloud-moon.svg';
        faviconIcon = 'img/meteocons/png-icon-cloud-moon.png';
      }
      break;

    // extreme
    case (data.weather[0].id >= 900 && data.weather[0].id <= 906):
      switch (data.weather[0].id) {
        // tornado
        case 900:
          weatherIcon = 'img/icon-tornado.svg';
          faviconIcon = 'img/icon-tornado.png';
          break;

        // tropical storm
        case 901:
          weatherIcon = 'img/icon-tropical-storm.svg';
          faviconIcon = 'img/icon-tropical-storm.png';
          break;

        // hurricane
        case 902:
          weatherIcon = 'img/icon-hurricane.svg';
          faviconIcon = 'img/icon-hurricane.png';
          break;

        // cold
        case 903:
          weatherIcon = 'img/meteocons/svg/icon-temperature.svg';
          faviconIcon = 'img/meteocons/png/icon-temperature.png';
          break;

        // hot
        case 904:
          weatherIcon = 'img/meteocons/svg/icon-temperature.svg';
          faviconIcon = 'img/meteocons/png/icon-temperature.png';
          break;

        // windy
        case 905:
          weatherIcon = 'img/meteocons/svg/icon-wind.svg';
          faviconIcon = 'img/meteocons/png/icon-wind.png';
          break;

        // hail
        case 906:
          if (currentTimeUnix >= sunriseTimeUnix && currentTimeUnix <= sunsetTimeUnix) {
            weatherIcon = 'img/meteocons/svg/icon-hail.svg';
            faviconIcon = 'img/meteocons/png/icon-hail.png';
          } else {
            weatherIcon = 'img/meteocons/svg/icon-hail-inv.svg';
            faviconIcon = 'img/meteocons/png/icon-hail-inv.png';
          }
          break;

        // default
        default:
          break;
      }
      break;

    // default
    default:
      weatherIcon = 'img/icon-question-mark.svg';
      faviconIcon = 'img/icon-question-mark.png';
      break;
  }

  document.write(`<br><br>Weather: ${weatherIcon}, Favicon: ${faviconIcon}`);
  document.write(`<img src=${weatherIcon} alt="weather icon" height="42" width="42"/>`);
}

const callAPI = function (lat, lon) {
  const apiURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=7451b0f38a2562bb3050c05a3c01282b`;

  console.log(apiURL);

  $.getJSON(apiURL, (data) => { apiSuccess(data); });
};

const showPosition = function (position) {
  // FIXME: remove this; for visual reference
  document.write(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
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
