const fetchWeatherData = async(passIpAddress) => {
    try {
      const weatherURL = `${process.env.NEXT_PUBLIC_WEATHER_API_BASE_URL}`
      const fetchForecast = await fetch(`${weatherURL}?key=${process.env.WEATHER_API_KEY}&q=${passIpAddress}&days=1`)
      const data = await fetchForecast.json()
      return data
    } catch (error) {
      console.error(error)
      
    }
  }


export default fetchWeatherData;