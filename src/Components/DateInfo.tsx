import { useState } from "react";
import jsonData from "../data/db.json";

interface DateInfoProps {
  city: Record<string, string>;
  setCity: (city: Record<string, string>) => void;
  apiData: Record<string, any>;
}

const DateInfo = ({ city, setCity, apiData }: DateInfoProps) => {
  // get All cities info from json file
  const Cities: Record<string, string>[] = jsonData.cities;

  // Handel select a city
  const handleSelect = (cityNameSelected: string) => {
    const selectedCity = Cities.find(
      (city) => city.EnCityName === cityNameSelected
    );
    selectedCity && setCity(selectedCity);
  };

  // show the moment time
  const [time, setTime] = useState(new Date());
  setInterval(() => setTime(new Date()), 1000);
  const options: Intl.DateTimeFormatOptions = {
    timeZone: apiData.Timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const clock = time.toLocaleTimeString("en-GB", options);

  return (
    <div
      className="date_info text-light"
      style={{
        backgroundImage: `linear-gradient(#00000080, #00000080),url(${city.imgUrl})`,
      }}
    >
      <div className="container h-100 position-relative d-flex">
        <div className="mt-md-auto w-100 d-flex">
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
          {Cities.map((city, index) => (
            <option key={index}>{city.EnCityName}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DateInfo;
