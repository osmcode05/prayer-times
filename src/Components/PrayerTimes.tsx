interface PrayerTimesProps {
  prayerTimes: Record<string, string> | null;
  msg: string;
}

export default function PrayerTimes({ prayerTimes, msg }: PrayerTimesProps) {

  if (!prayerTimes) return <div className="m-auto">{msg}</div>;

  return (
    <div className="prayer_times d-flex flex-grow-1">
      <div className="container m-auto mt-3 mb-3">
        <div className="row row-gap-2">
          {Object.keys(prayerTimes).map((prayer) => {
            return (
              <div key={prayer} className="col-6 col-lg-2 col-md-4">
                <div className="card border-0 text-light">
                  <h6 className="text-center fw-bold m-0 p-2 bg-black">{prayer}</h6>
                  <div id={prayer} className="card-body d-flex">
                    <h3 className="m-auto fw-bold">{prayerTimes[prayer]}</h3>
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
