"use client"

import useSWR from 'swr';
import { format, parse, parseISO } from "date-fns";
import fetcher from '@/api/fetcherData';
import fetchWeatherData from "@/api/fetchWeatherData";
import CurrentWeather from "@/components/CurrentWeather";
import TodaysWeather from "@/components/TodaysWeather";

function MainContent(){
  
  const ipApiUrl = `${process.env.NEXT_PUBLIC_IP_API_BASE_URL}?token=${process.env.IP_API_KEY}`;
  const weatherApiBaseUrl = process.env.NEXT_PUBLIC_WEATHER_API_BASE_URL;
  const weatherApiKey = process.env.WEATHER_API_KEY;

  const { data: ipData, error: ipError } = useSWR(ipApiUrl, fetcher);
  const weatherApiUrl = ipData ? `${weatherApiBaseUrl}?key=${weatherApiKey}&q=${ipData.ip}&days=1` : null;
  const { data: weatherData, error: weatherError } = useSWR(weatherApiUrl, fetcher);

  if (ipError) return <div>failed to load IP data</div>;
  if (!ipData) return <div>loading IP data...</div>;

  if (weatherError) return <div>failed to load weather data</div>;
  if (!weatherData) return <div>loading weather data...</div>;

  const getGeneralLocation = ipData
  // const getGeneralLocation = await getIpData()
  console.log("json-ip-data: ", getGeneralLocation)
  console.log("json-ip: ", getGeneralLocation.ip)
  console.log("json-country: ", getGeneralLocation.country)

  const passIpAddress = getGeneralLocation.ip
  const countryName = getGeneralLocation.country

  const getForecast = weatherData
  // const getForecast = await fetchWeatherData(passIpAddress)
  console.log('here is the current forecast: ', getForecast)


  const name = getForecast.location.name
  // const country = getForecast.location.country

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
  // const date = parse(nonFormmatedTime, 'yyyy-MM-dd HH:mm', new Date())
  const date = parseISO(nonFormmatedTime)
  const dayOfWeek = format(date, 'EEEE')
  const formattedMonth = format(date, 'MMM')
  const dayOfMonth = format(date, 'd')

  let filteredHours = []

  let goingThruHours = 0
  const currentTime = parseISO(nonFormmatedTime, 'yyyy-MM-dd HH:mm', new Date())
  // const currentTime = parse(nonFormmatedTime, 'yyyy-MM-dd HH:mm', new Date())

  while(filteredHours.length !== 6){
    const nonFormmatedTime = getForecast.forecast.forecastday[0].hour[goingThruHours].time
    // console.log('here is the followingFormattedTime: ', followingFormattedTime)
    // const date = parse(nonFormmatedTime, 'yyyy-MM-dd HH:mm', new Date())
    const date = parseISO(nonFormmatedTime, 'yyyy-MM-dd HH:mm', new Date())
    const followingFormattedTime = format(date, 'hh:mm a')
    // console.log('here is the followingFormattedTime: ', followingFormattedTime)
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

  // console.log('here are the filtered hours: ', filteredHours)

  return (
    <section className=" mt-10 text-black px-4 pt-6 border-2 border-black bg-yellow-400 max-w-fit mx-auto">
      <h1 className=" text-center text-[24px] font-bold border-2 border-black rounded-[10px] bg-[#c0c0d9]">
        Weather App
      </h1>
      
      <div className=" flex flex-col">
      <CurrentWeather
            name={name}
            countryName={countryName}
            formattedMonth={formattedMonth}
            dayOfMonth={dayOfMonth}
            dayOfWeek={dayOfWeek}
            currentWeatherIcon={currentWeatherIcon}
            fahrenheit={fahrenheit}
            weatherDescription={weatherDescription}
            feelsLike_f={feelsLike_f}
            highTemperature={highTemperature}
            windByMph={windByMph}
            sunriseTime={sunriseTime}
            lowTemperature={lowTemperature}
            getHumidity= {getHumidity}
            sunsetTime={sunsetTime}
          />

        <section className="">
          <div className="m-[auto] border-b-2 border-black w-[85%] self-center md:hidden"></div>
        </section>
        
        <TodaysWeather
          filteredHours={filteredHours}
        />
      </div>
    </section>
  );

}

export default MainContent;