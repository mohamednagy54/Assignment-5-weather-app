// http://api.weatherapi.com/v1/forecast.json?key=c9eaffce7ace40d6930155313252906&q=cairo&days=3

/**
 * Getting all elements from the DOM
 */

var api_key = 'c9eaffce7ace40d6930155313252906'

var searchInput = document.getElementById('searchInput')
var submitBtn = document.getElementById('submitBtn')

searchInput.addEventListener('keyup', fetchWeatherData)
submitBtn.addEventListener('click', fetchWeatherData)

async function fetchWeatherData(e) {
  e.preventDefault()
  var searchValue = searchInput.value.trim()
  var URL = `http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${searchValue}&days=3`

  try {
    if (searchValue) {
      var response = await fetch(URL)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      var data = await response.json()
      console.log(data)

    } else {
      Toastify({
        text: 'Please enter a city name',
        duration: 3000,
        destination: 'https://github.com/apvarun/toastify-js',
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: {
          background: 'red',
        },
      }).showToast()
    }


    
  } catch (error) {
    console.log("Error fetching data:", error);
    
  }

  
}
