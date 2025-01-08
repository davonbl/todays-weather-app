import Image from "next/image";

function CurrentWeather(props){

    const name = props.name
    const countryName = props.countryName
    const formattedMonth = props.formattedMonth
    const dayOfMonth = props.dayOfMonth
    const dayOfWeek = props.dayOfWeek
    const currentWeatherIcon = props.currentWeatherIcon
    const fahrenheit = props.fahrenheit
    const weatherDescription = props.weatherDescription
    const feelsLike_f = props.feelsLike_f
    const highTemperature = props.highTemperature
    const windByMph = props.windByMph
    const sunriseTime = props.sunriseTime
    const lowTemperature = props.lowTemperature
    const getHumidity = props.getHumidity
    const sunsetTime = props.sunsetTime

    return(
            <main className="md:flex md:gap-5">
                <section>
                  <div className=" flex flex-col justify-center">
                    <h1 className="justify-self-center text-[23px] pt-4">{name}, {countryName}</h1>
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
                        <span>{lowTemperature}</span>
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
    )
}

export default CurrentWeather;