import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import moment from "moment-hijri";

const TimeAndDate: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [islamicDate, setIslamicDate] = useState<string>("");

  useEffect(() => {
    // Set moment-hijri locale to Turkish
    moment.locale("en");

    // Calculate time until the next hour
    const now = DateTime.now().setZone("Asia/Istanbul");
    const nextHour = now.plus({ hours: 1 }).startOf("hour");
    const timeUntilNextHour = nextHour.diff(now).as("milliseconds");

    // Set a timeout to refresh the page at the start of the next hour
    const timeout = setTimeout(() => {
      window.location.reload(); // Refresh the page
    }, timeUntilNextHour);

    // Regular time and date updates every second
    const interval = setInterval(() => {
      const timeInTurkey = DateTime.now()
        .setZone("Asia/Istanbul")
        .toFormat("HH:mm:ss");
      setCurrentTime(timeInTurkey);

      const lunarDate = moment().format("iD iMMMM iYYYY");
      setIslamicDate(lunarDate);
    }, 1000);

    // Cleanup interval and timeout
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      style={{
        fontFamily: "Arial",
        fontSize: "24px",
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: "50px",
        paddingRight: "50px",
      }}
    >
      <div>
        <h2>Türkiye Saati</h2>
        <h3 style={{ marginLeft: "20px" }}>{currentTime}</h3>
      </div>
      <div>
        <h2>Hicri Takvim Tarihi</h2>
        <div>{islamicDate}</div>
      </div>
    </div>
  );
};

export default TimeAndDate;
