// http://api.weatherapi.com/v1/forecast.json?key=c9eaffce7ace40d6930155313252906&q=cairo&days=3

/**
 * Getting all elements from the DOM
 */

var api_key = 'c9eaffce7ace40d6930155313252906'

var searchInput = document.getElementById('searchInput')
var submitBtn = document.getElementById('submitBtn')

const nextDaysConteiners = document.querySelectorAll(
  '.weather-container .forcast:not(.today)'
)

searchInput.addEventListener('input', fetchWeatherData)
submitBtn.addEventListener('click', fetchWeatherData)

// Array of month and day names for formatting date based on index
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

async function fetchWeatherData(e) {
  if (e) e.preventDefault()
  var searchValue = searchInput.value.trim() || 'cairo'
  var URL = `http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${searchValue}&days=3`

  try {
    if (searchValue) {
      var response = await fetch(URL)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      var data = await response.json()

      displayToday(data)
      displayNextDays(data)
    } else {
      showToast('Please enter a city name', 'error')
    }
  } catch (error) {
    console.log('Error fetching data:', error)
  }
}

function showToast(message, type) {
  var backgroundColor

  switch (type) {
    case 'success':
      backgroundColor = 'green'
      break
    case 'error':
      backgroundColor = 'red'
      break

    default:
      break
  }

  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'right',
    stopOnFocus: true,
    style: {
      background: backgroundColor,
    },
  }).showToast()
}

function displayToday(data) {
  const { name: countryName, localtime: date } = data.location
  const {
    temp_c: currentTemp,
    condition: { text: conditionText, icon: conditionImg },
  } = data.current

  const currentDate = formatDate(date)
  const todayForcast = document.querySelector('.forcast.today')

  todayForcast.innerHTML = `
  <div class="forcast-head d-flex justify-content-between align-items-center" id="todayForcastHead">
              <span class="day">${currentDate.dayName}</span>
              <span class="date">${currentDate.day}${currentDate.month}</span>
            </div>

            <div class="forcast-content">
              <h2 class="country">${countryName}</h2>
              <div class="temp">
                <h3 class="num">
                  ${currentTemp}<sup>o</sup>C
                </h3>

                <div class="icon">
                  <img src=${conditionImg} alt="">
                </div>
                

              </div>
              <p class="forcast-condition">${conditionText}</p>
              
              <div class="info d-flex align-items-center gap-4">
                <div>
                  <img src="images/icon-umberella.png" alt="">
                  20%
                </div>
                <div>
                  <img src="images/icon-wind.png" alt="">
                  18km/h
                </div>
                <div>
                  <img src="images/icon-compass.png" alt="">
                  East
                </div>
              </div>

            </div>
  `
}

function displayNextDays(data) {
  const forcastDaysArray = data.forecast.forecastday
  const nextTwoDays = forcastDaysArray.slice(1, 3)

  nextTwoDays.forEach(function (day, index) {
    const forcastContainer = nextDaysConteiners[index]
    const {
      date,
      day: {
        maxtemp_c: maxTemp,
        mintemp_c: minTemp,
        condition: { icon: conditionImg, text: conditionText },
      },
    } = day

    const formattedDate = formatDate(date)
    forcastContainer.innerHTML = `
    <div class="forcast-head text-center">
              <span class="day">${formattedDate.dayName}</span>
            </div>

            <div class="forcast-content text-center">

              <div class="forcast-icon">
                <img src=${conditionImg} width="50" alt="">
              </div>

              <h3 class="degree">
                ${maxTemp}<sup>o</sup>C
              </h3>

              <p>${minTemp}<sup>o</sup></p>

              <p class="forcast-condition">
                ${conditionText}
              </p>


            </div>


    `
  })
}

function formatDate(dateString) {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = monthNames[date.getMonth()]
  const dayName = dayNames[date.getDay()]

  return {
    day: day,
    month: month,
    dayName: dayName,
  }
}

window.addEventListener('load', function () {
  fetchWeatherData(null)
})
