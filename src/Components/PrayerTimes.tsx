import { useContext } from "react";
import { AppContext } from "../App";
import jsonData from "../data/db.json";

export default function PrayerTimes() {
  const { apiData }: any = useContext(AppContext);

  const cardBgImg: Record<string, string> = jsonData.cardBg;

  // List of prayers to exclude
  const excludedPrayers = [
    "Imsak",
    "Midnight",
    "Firstthird",
    "Lastthird",
    "Sunset",
  ];

  // Filter out the excluded prayers
  const prayersToDisplay = Object.keys(apiData.timings).filter(
    (prayer) => !excludedPrayers.includes(prayer)
  );

  return (
    <div className="prayer_times d-flex flex-grow-1">
      <div className="container m-auto mt-3 mb-3">
        <div className="row row-gap-2">
          {prayersToDisplay.map((prayer) => {
            return (
              <div key={prayer} className="col-6 col-lg-2 col-md-4">
                <div className="card border-0 text-light">
                  <h6 className="text-center fw-bold m-0 p-2 bg-black">
                    {prayer}
                  </h6>
                  <div
                    className="card-body d-flex"
                    style={{
                      backgroundImage: `linear-gradient(#0000008c, #0000008c), url(${cardBgImg[prayer]})`,
                    }}
                  >
                    <h3 className="m-auto fw-bold">
                      {apiData.timings[prayer]}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
