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
  return (
    <div>
    </div>
  );
}
