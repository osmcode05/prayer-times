import { useEffect, useState } from "react";
import DateInfo from "./Components/DateInfo";
import PrayerTimes from "./Components/PrayerTimes";

const App = () => {

  const [city, setCity] = useState<Record<string, string>>({
    cityName: "Agadir",
    country: "Morocco",
    imgUrl:"https://cdn.pixabay.com/photo/2020/02/09/19/42/agadir-4834349_1280.jpg",
  });
  
  const [prayerTimes, setPrayerTimes] = useState<Record<string, string> | null>(null);
  const [timezone, setTimezone] = useState<string>("Africa/Casablanca");
  const [todayDate, setTodayDate] = useState<string>("");
  const [msg, setMsg] = useState<string>("Loading...");
  
  const getCityPrayerTimes = async (city: Record<string, string>) => {
    try {
      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city.cityName}&country=${city.country}`);
      if (!response.ok) {
        setMsg(`Error ${response.status}: Failed to get data from API`);
        return { timings: null, todayDate: null, Timezone: null };
      }
      const data = await response.json();

      const { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha } = data.data.timings; // get prayer timings
      const todayDate = `${data.data.date.gregorian.weekday.en}, ${data.data.date.readable}`; // get the date of the day in city select
      const Timezone = data.data.meta.timezone; // get the timezone of the city selected

      return { timings: { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha }, todayDate, Timezone };
    } catch (error) {
      setMsg(`${error}`);
      return { timings: null, todayDate: null, Timezone: null };
    }
  };

  useEffect(() => {
    (async () => {
      const { timings, todayDate, Timezone } = await getCityPrayerTimes(city);
      timings && setPrayerTimes(timings);
      todayDate && setTodayDate(todayDate);
      Timezone && setTimezone(Timezone);
    })();
  }, [city]);

  return (
    <section className="bg-light d-flex flex-column">
      <DateInfo city={city} setCity={setCity} todayDate={todayDate} timezone={timezone} />
      <PrayerTimes prayerTimes={prayerTimes} msg={msg} />
    </section>
  );

};

export default App;
