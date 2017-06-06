const apiSuccess = function (data, textStatus, jqXHR) {
  console.log('Success');

  let currentTimeHour = '';
  let sunriseTimeHour = '';
  let sunsetTimeHour = '';
  let weatherIcon = '';

  // FIXME: remove this; for visual reference
  document.write(`<br><br>${JSON.stringify(data)}`);

  currentTimeHour = new Date(data.currently.time * 1000);
  sunriseTimeHour = new Date(data.daily.data[0].sunriseTime * 1000);
  sunsetTimeHour = new Date(data.daily.data[0].sunsetTime * 1000);

  console.log(`Current: ${currentTimeHour}, Sunrise: ${sunriseTimeHour}, Sunset: ${sunsetTimeHour}`);
  console.log(data.weather[0].id);

  // weather types
  switch (true) {
    // thunderstorm
    case (data.weather[0].id >= 200 && data.weather[0].id <= 232):
      if (data.clouds.all > 75) {
        if (currentTimeHour >= sunriseTimeHour && currentTimeHour <= sunsetTimeHour) {
          weatherIcon = 'img/meteocons/svg/icon-clouds-flash.svg';
        } else { weatherIcon = 'img/meteocons/svg/icon-clouds-flash-inv.svg'; }
      } else if (currentTimeHour >= sunriseTimeHour && currentTimeHour <= sunsetTimeHour) {
        weatherIcon = 'img/meteocons/svg/icon-cloud-flash.svg';
      } else { weatherIcon = 'img/meteocons/svg/icon-cloud-flash-inv.svg'; }
      break;

    // drizzle
    case (data.weather[0].id >= 300 && data.weather[0].id <= 321):
      if (currentTimeHour >= sunriseTimeHour && currentTimeHour <= sunsetTimeHour) {
        weatherIcon = 'img/meteocons/svg/icon-drizzle.svg';
      } else { weatherIcon = 'img/meteocons/svg/icon-drizzle-inv.svg'; }
      break;

    // rain
    case (data.weather[0].id >= 500 && data.weather[0].id <= 531):
      if (data.wind.speed >= 10.8) {
        if (currentTimeHour >= sunriseTimeHour && currentTimeHour <= sunsetTimeHour) {
          weatherIcon = 'img/meteocons/svg/icon-windy-rain.svg';
        } else { weatherIcon = 'img/meteocons/svg/icon-windy-rain-inv.svg'; }
      } else if (currentTimeHour >= sunriseTimeHour && currentTimeHour <= sunsetTimeHour) {
        weatherIcon = 'img/meteocons/svg/icon-rain.svg';
      } else { weatherIcon = 'img/meteocons/svg/icon-rain-inv.svg'; }
      break;

    // snow
    case (data.weather[0].id >= 600 && data.weather[0].id <= 622):
      if (data.weather[0].id === 602 || data.weather[0].id === 622) {
        if (currentTimeHour >= sunriseTimeHour && currentTimeHour <= sunsetTimeHour) {
          weatherIcon = 'img/meteocons/svg/icon-snow-heavy.svg';
        } else { weatherIcon = 'img/meteocons/svg/icon-snow-heavy-inv.svg'; }
      } else if (currentTimeHour >= sunriseTimeHour && currentTimeHour <= sunsetTimeHour) {
        weatherIcon = 'img/meteocons/svg/icon-snow.svg';
      } else { weatherIcon = 'img/meteocons/svg/icon-snow-inv.svg'; }
      break;

    // atmosphere
    case (data.weather[0].id >= 701 && data.weather[0].id <= 781):
      if (data.weather[0].id === 741) {
        if (data.clouds.all > 74) {
          weatherIcon = 'img/meteocons/svg/icon-fog-cloud.svg';
        } else if (currentTimeHour >= sunriseTimeHour && currentTimeHour <= sunsetTimeHour) {
          weatherIcon = 'img/meteocons/svg/icon-fog-sun.svg';
        } else { weatherIcon = 'img/meteocons/svg/icon-fog-moon.svg'; }
      } else if (data.weather[0].id === 701) {
        weatherIcon = 'img/meteocons/svg/icon-mist.svg';
      } else { weatherIcon = 'img/meteocons/svg/icon-fog.svg'; }
      break;

    // clear
    case (data.weather[0].id === 800):
      if (currentTimeHour >= sunriseTimeHour && currentTimeHour <= sunsetTimeHour) {
        weatherIcon = 'img/meteocons/svg/icon-sun.svg';
      } else { weatherIcon = 'img/meteocons/svg/icon-moon.svg'; }
      break;

    // clouds
    case (data.weather[0].id >= 801 && data.weather[0].id <= 804):
      if (data.clouds.all > 48) {
        if (currentTimeHour >= sunriseTimeHour && currentTimeHour <= sunsetTimeHour) {
          weatherIcon = 'img/meteocons/svg/icon-clouds.svg';
        } else { weatherIcon = 'img/meteocons/svg/icon-clouds-inv.svg'; }
      } else if (data.clouds.all <= 48 && data.clouds.all > 24) {
        if (data.wind.speed >= 10.8) {
          if (currentTimeHour >= sunriseTimeHour && currentTimeHour <= sunsetTimeHour) {
            weatherIcon = 'img/meteocons/svg/icon-windy.svg';
          } else { weatherIcon = 'img/meteocons/svg/icon-windy-inv.svg'; }
        } else if (currentTimeHour >= sunriseTimeHour && currentTimeHour <= sunsetTimeHour) {
          weatherIcon = 'img/meteocons/svg/icon-cloud.svg';
        } else { weatherIcon = 'img/meteocons/svg/icon-cloud-inv.svg'; }
      } else if (currentTimeHour >= sunriseTimeHour && currentTimeHour <= sunsetTimeHour) {
        weatherIcon = 'img/meteocons/svg/icon-cloud-sun.svg';
      } else { weatherIcon = 'img/meteocons/svg/icon-cloud-moon.svg'; }
      break;

    // extreme
    case (data.weather[0].id >= 900 && data.weather[0].id <= 906):
      switch (data.weather[0].id) {
        // tornado
        case 900:
          weatherIcon = 'img/icon-tornado.svg';
          break;

        // tropical storm
        case 901:
          weatherIcon = 'img/icon-tropical-storm.svg';
          break;

        // hurricane
        case 902:
          weatherIcon = 'img/icon-hurricane.svg';
          break;

        // cold
        case 903:
          weatherIcon = 'img/meteocons/svg/icon-temperature.svg';
          break;

        // hot
        case 904:
          weatherIcon = 'img/meteocons/svg/icon-temperature.svg';
          break;

        // windy
        case 905:
          weatherIcon = 'img/meteocons/svg/icon-wind.svg';
          break;

        // hail
        case 906:
          if (currentTimeHour >= sunriseTimeHour && currentTimeHour <= sunsetTimeHour) {
            weatherIcon = 'img/meteocons/svg/icon-hail.svg';
          } else { weatherIcon = 'img/meteocons/svg/icon-hail-inv.svg'; }
          break;

        // default
        default:
          break;
      }
      break;

    // default
    default:
      weatherIcon = 'img/icon-question-mark.svg';
      break;
  }

  document.write(`<br><br>Weather: ${weatherIcon}`);
  document.write(`<img src=${weatherIcon} alt="weather icon" height="42" width="42"/>`);
};

const apiError = function (jqXHR, textStatus, errorThrown) {
  alert(`Status: ${textStatus}\nError: ${errorThrown}`);
};

const getData = function (apiURL) {
  return $.ajax({
    url: apiURL,
    type: 'GET',
    headers: { 'Cache-Control': 'max-age=600' },
    cache: true,
  });
};

const callAPI = function (lat, lon) {
  const apiURL = `https://api.darksky.net/forecast/d8dfa4936dd40016ba877875ed576b46/${lat},${lon}`;

  console.log(apiURL);

  getData(apiURL).done(apiSuccess).fail(apiError);
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
