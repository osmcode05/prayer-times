import { useEffect, useState } from "react";
import DateInfo from "./Components/DateInfo";
import PrayerTimes from "./Components/PrayerTimes";

interface apiDataTypes {
  timings: any;
  EnTodayDate: string | null;
  ArTodayDate: string | null;
  Timezone: string;
}

const App = () => {
  const [city, setCity] = useState<Record<string, string>>({
    EnCityName: "Agadir",
    ArCityName: "أكادير",
    EnCountryName: "Morocco",
    ArCountryName: "المغرب",
    imgUrl:
      "https://cdn.pixabay.com/photo/2020/02/09/19/42/agadir-4834349_1280.jpg",
  });

  const [apiData, setApiData] = useState<apiDataTypes>({
    timings: "",
    EnTodayDate: "",
    ArTodayDate: "",
    Timezone: "Africa/Casablanca",
  });

  const [msg, setMsg] = useState<string>("Loading...");

  const getCityPrayerTimes = async (city: Record<string, string>) => {
    try {
      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city.EnCityName}&country=${city.EnCountryName}`);
      if (!response.ok) throw new Error(`(${response.status}) Failed to get data from API`);
      const data = await response.json();
      const { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha } = data.data.timings;
      const DataFromApi = {
        timings: { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha },
        EnTodayDate: `${data.data.date.gregorian.weekday.en}, ${data.data.date.readable}`,
        ArTodayDate: `${data.data.date.hijri.year} ${data.data.date.hijri.weekday.ar} ${data.data.date.hijri.day} ${data.data.date.hijri.month.ar}`,
        Timezone: data.data.meta.timezone,
      };
      return DataFromApi;
    } catch (error) {
      setMsg(`${error}`);
    }
    return null;
  };

  useEffect(() => {
    (async () => {
      const DataFromApi = await getCityPrayerTimes(city);
      DataFromApi && setApiData(DataFromApi);
    })();
  }, [city]);

  return (
    <section className="bg-light d-flex flex-column">
      <DateInfo city={city} setCity={setCity} apiData={apiData} />
      <PrayerTimes timings={apiData.timings} msg={msg} />
    </section>
  );
};

export default App;
