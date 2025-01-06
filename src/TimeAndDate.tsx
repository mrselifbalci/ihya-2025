import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import moment from "moment-hijri";

const TimeAndDate: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [islamicDate, setIslamicDate] = useState<string>("");

  useEffect(() => {
    // Set moment-hijri locale to Turkish
    moment.locale("en");

    const interval = setInterval(() => {
      // Get current time in Turkey (UTC+3)
      const timeInTurkey = DateTime.now()
        .setZone("Asia/Istanbul")
        .toFormat("HH:mm:ss");
      setCurrentTime(timeInTurkey);

      // Get Islamic lunar date with month name in Turkish
      const lunarDate = moment().format("iD iMMMM iYYYY");
      setIslamicDate(lunarDate);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "Arial", fontSize: "24px", textAlign: "center" }}>
      <div>
        <h1>Türkiye Saati</h1>
        <div>{currentTime}</div>
      </div>
      <div>
        <h2>Hicri Takvim Tarihi</h2>
        <div>{islamicDate}</div>
      </div>
    </div>
  );
};

export default TimeAndDate;
