import Image from "next/image";
import { format, parse } from "date-fns";

const fetchData = async() => {
  try {
    const weatherURL = 'https://api.weatherapi.com/v1/'
    const fetchForecast = await fetch(`${weatherURL}forecast.json?key=${process.env.WEATHER_API_KEY}&q=auto:ip&days=1`)
    const data = await fetchForecast.json()
    return data
  } catch (error) {
    console.error(error)
    
  }
}

export default async function Home() {
  const getForecast = await fetchData()
  console.log('here is the current forecast: ', getForecast)

  const name = getForecast.location.name
  const country = getForecast.location.country

  const fahrenheit = getForecast.current.temp_f
  const feelsLike_f = getForecast.current.feelslike_f
  const currentWeatherIcon = getForecast.current.condition.icon
  const weatherDescription = getForecast.current.condition.text


  const highTemperature = getForecast.forecast.forecastday[0].day.maxtemp_f
  const lowTemperature = getForecast.forecast.forecastday[0].day.mintemp_f
  const windByMph = getForecast.current.wind_mph
  const getHumidity = getForecast.current.humidity

  const sunriseTime = getForecast.forecast.forecastday[0].astro.sunrise
  const sunsetTime = getForecast.forecast.forecastday[0].astro.sunset

  const nonFormmatedTime = getForecast.location.localtime
  const date = parse(nonFormmatedTime, 'yyyy-MM-dd HH:mm', new Date())
  const dayOfWeek = format(date, 'EEEE')
  const formattedTime = format(date, 'hh:mm a')
  const formattedMonth = format(date, 'MMM')
  const dayOfMonth = format(date, 'd')
  const dayOfWeek_short = format(date, 'eee')

  // console.log('dayOfWeek: ', dayOfWeek)
  // console.log('formattedTime: ', formattedTime)
  // console.log('formattedMonth: ', formattedMonth)
  // console.log('dayOfMonth: ', dayOfMonth)
  // console.log('dayOfWeek_short: ', dayOfWeek_short)
  // console.log('country: ', country)

  let filteredHours = []
  const newNonFormmatedTime = getForecast.forecast.forecastday[0].hour[0].time
  const newDate = parse(newNonFormmatedTime, 'yyyy-MM-dd HH:mm', new Date())
  const followingFormattedTime = format(newDate, 'hh:mm a')
  console.log('here is the followingFormattedTime: ', followingFormattedTime)
  

  let goingThruHours = 0
  const currentTime = parse(nonFormmatedTime, 'yyyy-MM-dd HH:mm', new Date())
  while(filteredHours.length !== 6){
    const nonFormmatedTime = getForecast.forecast.forecastday[0].hour[goingThruHours].time
    const date = parse(nonFormmatedTime, 'yyyy-MM-dd HH:mm', new Date())
    // const followingFormattedTime = format(date, 'hh:mm a')
    console.log('here is the followingFormattedTime: ', followingFormattedTime)
    const followingHourImage = getForecast.forecast.forecastday[0].hour[goingThruHours].condition.icon
    const followingHourText = (getForecast.forecast.forecastday[0].hour[goingThruHours].condition.text).trim()
    const followingHourTemperature = getForecast.forecast.forecastday[0].hour[goingThruHours].temp_f


    const followingHourTempObject = {
      followingFormattedTime,
      followingHourImage,
      followingHourTemperature,
      followingHourText
    }
    if(date.getTime() > currentTime){
      filteredHours = [...filteredHours, followingHourTempObject]
      goingThruHours = goingThruHours + 1
    }else{
      goingThruHours = goingThruHours + 1
    }
  }

  // filteredHours.splice(0,1)
  console.log('here are the filtered hours: ', filteredHours)

  return (
    <div>
    </div>
  );
}
