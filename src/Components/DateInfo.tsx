import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import jsonData from "../data/db.json";

type City = {
  EnCityName: string;
  ArCityName: string;
  EnCountryName: string;
  ArCountryName: string;
  imgUrl: string;
};

const DateInfo = () => {
  const { city, setCity, apiData }: any = useContext(AppContext);
  const [time, setTime] = useState(new Date());
  const cities: City[] = jsonData.cities;

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (cityName: string) => {
    const selectedCity = cities.find((c) => c.EnCityName === cityName);
    if (selectedCity) {
      setCity(selectedCity);
    }
  };

  const clock = time.toLocaleTimeString("en-GB", {
    timeZone: apiData.Timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div
      className="date_info text-light"
      style={{
        backgroundImage: `linear-gradient(#00000080, #00000080), url(${city.imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container h-100 position-relative d-flex">
        <div className="mt-md-auto w-100 d-flex flex-wrap">
          <ul className="list-unstyled me-auto">
            <li>
              <i className="text-uppercase fw-bold">{city.EnCityName}</i>,{" "}
              {city.EnCountryName}
            </li>
            <li>{apiData.EnTodayDate}</li>
          </ul>
          <ul className="list-unstyled text-end">
            <li>
              <i className="text-uppercase fw-bold">{city.ArCityName}</i>,{" "}
              {city.ArCountryName}
            </li>
            <li>{apiData.ArTodayDate}</li>
          </ul>
        </div>
        <h1 className="clock position-absolute fw-bold w-100 text-center">
          {clock}
        </h1>
        <select
          className="form-select position-absolute"
          value={city.EnCityName}
          onChange={(e) => handleSelect(e.target.value)}
        >
          {cities.map((c, i) => (
            <option key={i} value={c.EnCityName}>
              {c.EnCityName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DateInfo;
