const fetchWeatherData = async(passIpAddress) => {
    try {
      const weatherURL = 'https://api.weatherapi.com/v1/'
      const fetchForecast = await fetch(`${weatherURL}forecast.json?key=${process.env.WEATHER_API_KEY}&q=${passIpAddress}&days=1`)
      const data = await fetchForecast.json()
      return data
    } catch (error) {
      console.error(error)
      
    }
  }


export default fetchWeatherData;