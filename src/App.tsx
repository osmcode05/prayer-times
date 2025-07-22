import { useEffect, useState, createContext } from "react";
import DateInfo from "./Components/DateInfo";
import PrayerTimes from "./Components/PrayerTimes";

type ApiData = {
  timings: Record<string, string>;
  EnTodayDate: string;
  ArTodayDate: string;
  Timezone: string;
};

type CityData = {
  EnCityName: string;
  ArCityName: string;
  EnCountryName: string;
  ArCountryName: string;
  imgUrl: string;
};

type AppContextType = {
  city: CityData;
  setCity: React.Dispatch<React.SetStateAction<CityData>>;
  apiData: ApiData;
  msg: string;
};

export const AppContext = createContext<AppContextType | null>(null);

const App = () => {
  const [city, setCity] = useState<CityData>({
    EnCityName: "Agadir",
    ArCityName: "أكادير",
    EnCountryName: "Morocco",
    ArCountryName: "المغرب",
    imgUrl:
      "https://cdn.pixabay.com/photo/2020/02/09/19/42/agadir-4834349_1280.jpg",
  });

  const [apiData, setApiData] = useState<ApiData>({
    timings: {},
    EnTodayDate: "",
    ArTodayDate: "",
    Timezone: "Africa/Casablanca",
  });

  const [msg, setMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city.EnCityName}&country=${city.EnCountryName}`
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch prayer times (HTTP ${res.status})`);
        }
        const data = await res.json();
        setApiData({
          timings: data.data.timings,
          EnTodayDate: `${data.data.date.gregorian.weekday.en}, ${data.data.date.readable}`,
          ArTodayDate: `${data.data.date.hijri.year} ${data.data.date.hijri.weekday.ar} ${data.data.date.hijri.day} ${data.data.date.hijri.month.ar}`,
          Timezone: data.data.meta.timezone,
        });
        setMsg("");
        setIsLoading(false);
      } catch (error) {
        setMsg(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
        setIsLoading(false);
      }
    };

    fetchData();
  }, [city]);

  return (
    <AppContext.Provider value={{ city, setCity, apiData, msg }}>
      <section className="bg-light d-flex flex-column">
        <DateInfo />
        {isLoading ? (
          <div className="m-auto">Loading...</div>
        ) : msg ? (
          <div className="m-auto text-danger">{msg}</div> // Show error if exists
        ) : (
          <PrayerTimes /> // Show data if no errors
        )}
      </section>
    </AppContext.Provider>
  );
};

export default App;
