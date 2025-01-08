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
  // const newNonFormmatedTime = getForecast.forecast.forecastday[0].hour[0].time
  // const newDate = parse(newNonFormmatedTime, 'yyyy-MM-dd HH:mm', new Date())
  // const followingFormattedTime = format(newDate, 'hh:mm a')
  // console.log('here is the followingFormattedTime: ', followingFormattedTime)
  

  let goingThruHours = 0
  const currentTime = parse(nonFormmatedTime, 'yyyy-MM-dd HH:mm', new Date())
  while(filteredHours.length !== 6){
    const nonFormmatedTime = getForecast.forecast.forecastday[0].hour[goingThruHours].time
    const date = parse(nonFormmatedTime, 'yyyy-MM-dd HH:mm', new Date())
    const followingFormattedTime = format(date, 'hh:mm a')
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
    <section className=" mt-10 text-black px-4 pt-6 border-2 border-black bg-yellow-400 max-w-fit mx-auto">
      {/* items-center */}
      {/* justify-center */}
      
      <h1 className=" text-center text-[24px] font-bold border-2 border-black rounded-[10px] bg-[#c0c0d9]">
        Weather App
      </h1>
      
      <div className=" flex flex-col">
      <main className="md:flex md:gap-5">
        <section>
          <div className=" flex flex-col justify-center">
            <h1 className="justify-self-center text-[23px] pt-4">{name}, {country}</h1>
            <h2 className="text-[17.5px]">{formattedMonth} {dayOfMonth}, {dayOfWeek}</h2>
          </div>
          {/* justify-center */}
          <div className=" flex gap-[11px] justify-center">
            <div>
              <Image
                src={`https:${currentWeatherIcon}`}
                width={110}
                height={110}
                alt="image of the current weather"
                />
            </div>
            <div>
              <h2 className="text-[45px] flex justify-center mt-[11px]">{fahrenheit}<span className="text-[16px]">°F</span></h2>
              <p className="text-[16px] mt-[-14px] ">{weatherDescription}</p>
              <p className=" text-[11px]">Feels like: {feelsLike_f}°F</p>
            </div>
          </div>
        </section>

          <section>
            <div className="m-[auto] border-b-2 border-black w-[85%] self-center md:hidden"></div>
            <div className="md:border-black md:border-l-[2.5px] md:h-40 md:mt-6"></div>
          </section>

        <section className="md:content-end">
          <section className="flex justify-center gap-[30px] text-center pt-5 pb-4">
              <div className="flex flex-col">
                <span>{highTemperature}</span>
                <span>High</span>
              </div>
              <div className="flex flex-col">
                <span>{windByMph} mph</span>
                <span>Wind</span>
              </div>
              <div className="flex flex-col">
                <span>{sunriseTime}</span>
                <span>Sunrise</span>
              </div>
          </section>

          <section className="flex justify-center gap-[30px] text-center pb-5">
              <div className="flex flex-col">
                <span>{highTemperature}</span>
                <span>Low</span>
              </div>
              <div className="flex flex-col">
                <span>{getHumidity}%</span>
                <span>Humidity</span>
              </div>
              <div className="flex flex-col">
                <span>{sunsetTime}</span>
                <span>Sunset</span>
              </div>
          </section>
        </section>

      </main>

        <section className="">
          <div className="m-[auto] border-b-2 border-black w-[85%] self-center md:hidden"></div>
        </section>

        <section className="pt-4">
          <h2>Today's Weather:</h2>
          <div className="pt-2 pb-4 flex gap-[7px]">
          {
            filteredHours.map((ele,index) => {
              return (
                <div 
                  key={index}
                  className=" border-2 border-black w-1/4 
                  rounded-[9px] bg-[#c8b9b9] flex flex-col 
                  justify-center text-center items-center text-[13px]"
                >
                  <p>{ele.followingHourTemperature}°F</p>
                  <Image
                    src={`https:${ele.followingHourImage}`}
                    width={60}
                    height={60}
                    alt={`image of the weather around ${ele.followingFormattedTime}`}
                  />
                  <p>{ele.followingFormattedTime}</p>
                </div>
              )
            })
          }
          </div>
        </section> 
      </div>
    </section>
  );
}
