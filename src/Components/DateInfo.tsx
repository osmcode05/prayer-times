import { useState, useEffect, useContext } from "react";
import moment from "moment-timezone";
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
  const { EnTodayDate, ArTodayDate, Timezone } = apiData;
  const { EnCityName, ArCityName, EnCountryName, ArCountryName, imgUrl } = city;
  const cities: City[] = jsonData.cities;

  const [time, setTime] = useState(moment().tz(Timezone).format("HH:mm:ss"));
  useEffect(() => {
    const interval = setInterval(() => setTime(moment().tz(Timezone).format("HH:mm:ss")), 1000);
    return () => clearInterval(interval);
  }, [Timezone]);
  
  const handleSelect = (cityName: string) => setCity(cities.find(c => c.EnCityName === cityName));

  return (
    <div className="date_info text-light" style={{ backgroundImage: `linear-gradient(#00000080, #00000080), url(${imgUrl})` }}>
      <div className="container h-100 position-relative d-flex">
        <div className="mt-md-auto w-100 d-flex flex-wrap">
          <ul className="list-unstyled me-auto">
            <li><i className="text-uppercase fw-bold">{EnCityName}</i>, {EnCountryName}</li>
            <li>{EnTodayDate}</li>
          </ul>
          <ul className="list-unstyled text-end">
            <li><i className="text-uppercase fw-bold">{ArCityName}</i>, {ArCountryName}</li>
            <li>{ArTodayDate}</li>
          </ul>
        </div>
        <h1 className="clock position-absolute fw-bold w-100 text-center">{time}</h1>
        <select className="form-select position-absolute" value={EnCityName} onChange={e => handleSelect(e.target.value)}>
          {cities.map((c, i) => <option key={i} value={c.EnCityName}>{c.EnCityName}</option>)}
        </select>
      </div>
    </div>
  );
};

export default DateInfo;