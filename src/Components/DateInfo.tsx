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
    { cityName: "Algiers", country: "Algeria",  imgUrl: "https://cdn.pixabay.com/photo/2017/06/20/22/13/ain-taya-2425120_1280.jpg" },
    { cityName: "Tunis", country: "Tunisia",  imgUrl: "https://cdn.pixabay.com/photo/2014/01/24/20/29/mosque-251183_1280.jpg" },
    { cityName: "Cairo", country: "Egypt",  imgUrl: "https://cdn.pixabay.com/photo/2018/03/24/15/07/pyramid-3256883_1280.jpg" },
    { cityName: "Al-Qods", country: "Palestine",  imgUrl: "https://cdn.pixabay.com/photo/2019/11/27/21/06/jerusalem-4657867_1280.jpg" },
    { cityName: "Makkah", country: "KSA",  imgUrl: "https://cdn.pixabay.com/photo/2019/09/18/23/29/the-pilgrims-guide-4487889_1280.jpg" },
    { cityName: "Istanbul", country: "Turkey",  imgUrl: "https://cdn.pixabay.com/photo/2019/03/08/19/52/galata-4043037_1280.jpg" },
    { cityName: "Moscow", country: "Russia",  imgUrl: "https://cdn.pixabay.com/photo/2016/07/30/08/13/moscow-1556561_1280.jpg" },
    { cityName: "Tokyo", country: "Japan",  imgUrl: "https://cdn.pixabay.com/photo/2019/06/08/11/30/people-4259948_1280.jpg" },
    { cityName: "Jakarta", country: "Indonesia",  imgUrl: "https://cdn.pixabay.com/photo/2019/11/29/04/14/jakarta-4660555_1280.jpg" },
    { cityName: "Canberra", country: "Australia",  imgUrl: "https://cdn.pixabay.com/photo/2019/10/19/03/05/australia-canberra-4560441_1280.jpg" },
    { cityName: "New York", country: "USA",  imgUrl: "https://cdn.pixabay.com/photo/2016/11/29/05/34/new-york-1867569_1280.jpg" },
    { cityName: "Juneau", country: "USA",  imgUrl: "https://cdn.pixabay.com/photo/2017/05/04/17/08/harbor-2284564_1280.jpg" },
    { cityName: "Ottawa", country: "Canada",  imgUrl: "https://cdn.pixabay.com/photo/2018/06/22/13/29/ottawa-3490766_1280.jpg" },
    { cityName: "London", country: "UK",  imgUrl: "https://cdn.pixabay.com/photo/2023/05/02/18/13/london-7965770_1280.jpg" },
    { cityName: "Barcelona", country: "Spain",  imgUrl: "https://cdn.pixabay.com/photo/2018/03/14/23/00/barcelona-3226639_1280.jpg" },
    { cityName: "Rome", country: "Italy",  imgUrl: "https://cdn.pixabay.com/photo/2018/07/20/14/02/rome-3550739_1280.jpg" },
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
          {Cities.map((city, index) => <option key={index}>{city.cityName}</option>)}
        </select>
      </div>
    </div>
  );
}

export default DateInfo;