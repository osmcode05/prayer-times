import { useState } from "react";

interface DateInfoProps {
  city: Record<string, string>;
  setCity: (city: Record<string, string>) => void;
  todayDate: string ;
  timezone: string;
}

const DateInfo = ({ city, setCity, todayDate, timezone}: DateInfoProps) => {

  const Cities: Record<string, string>[] = [
    { cityName: "Agadir", country: "Morocco", imgUrl: "https://cdn.pixabay.com/photo/2020/02/09/19/42/agadir-4834349_1280.jpg" },
    { cityName: "Fés", country: "Morocco",  imgUrl: "https://cdn.pixabay.com/photo/2014/10/11/11/06/morocco-484481_1280.jpg" },
    { cityName: "Al-Qods", country: "Palestine",  imgUrl: "https://cdn.pixabay.com/photo/2019/11/27/21/06/jerusalem-4657867_1280.jpg" },
    { cityName: "Makkah", country: "KSA",  imgUrl: "https://cdn.pixabay.com/photo/2019/09/18/23/29/the-pilgrims-guide-4487889_1280.jpg" },
    { cityName: "Cairo", country: "Egypt",  imgUrl: "https://cdn.pixabay.com/photo/2018/03/24/15/07/pyramid-3256883_1280.jpg" },
    { cityName: "Barcelona", country: "Spain",  imgUrl: "https://cdn.pixabay.com/photo/2018/03/14/23/00/barcelona-3226639_1280.jpg" },
    { cityName: "Madrid", country: "Spain",  imgUrl: "https://cdn.pixabay.com/photo/2017/03/27/18/43/madrid-2179954_1280.jpg" },
    { cityName: "Paris", country: "French",  imgUrl: "https://cdn.pixabay.com/photo/2019/02/21/18/52/paris-4011964_1280.jpg" },
    { cityName: "London", country: "UK",  imgUrl: "https://cdn.pixabay.com/photo/2023/05/02/18/13/london-7965770_1280.jpg" },
  ];

  // Handel select a city
  const handleSelect = (cityNameSelected: string) => {
    const selectedCity = Cities.find(city => city.cityName === cityNameSelected);
    selectedCity && setCity(selectedCity);
  };
  
  // show the moment time
  const [time, setTime] = useState(new Date());
  setInterval(() => setTime(new Date()), 1000);
  const options: Intl.DateTimeFormatOptions = { timeZone: timezone, hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const clock = time.toLocaleTimeString("en-GB", options);
  
  return (
    <div className="date_info text-light" style={{ backgroundImage:`linear-gradient(#00000080, #00000080),url(${city.imgUrl})`}}>
      <div className="container h-100 position-relative d-flex">
        <ul className="list-unstyled lh-sm mt-md-auto text-md-start text-center w-100">
          <li><i className="text-uppercase fw-bold">{city.cityName}</i>, {city.country}</li>
          <li>{todayDate}</li>
        </ul>
        <h1 className="clock position-absolute fw-bold w-100 text-center">{clock}</h1>
        <select className="form-select position-absolute" value={city.cityName} onChange={(e)=>handleSelect(e.target.value)}>
          {Cities.map(city => <option key={city.cityName}>{city.cityName}</option>)}
        </select>
      </div>
    </div>
  );
}

export default DateInfo;