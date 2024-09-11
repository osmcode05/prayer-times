import jsonData from "../data/db.json";

interface PrayerTimesProps {
  timings: any;
  msg: string;
}

export default function PrayerTimes({ timings, msg }: PrayerTimesProps) {
  if (!timings) return <div className="m-auto">{msg}</div>;

  const cardBgImg: Record<string, string> = jsonData.cardBg;

  return (
    <div className="prayer_times d-flex flex-grow-1">
      <div className="container m-auto mt-3 mb-3">
        <div className="row row-gap-2">
          {Object.keys(timings).map((prayer) => {
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
                    <h3 className="m-auto fw-bold">{timings[prayer]}</h3>
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
