import Image from "next/image";


function TodaysWeather({filteredHours}){
    return(
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
                        priority={true}
                      />
                      <p>{ele.followingFormattedTime}</p>
                    </div>
                  )
                })
              }
              </div>
            </section>
        )
}


export default TodaysWeather