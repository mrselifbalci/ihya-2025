import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import Grid from '@mui/material/Grid';

type HourData = {
  time: string;
  names: string[];
};

const data: HourData[] = [
  { time: "1:00", names: ["NURAY"] },
  { time: "2:00", names: ["Safiye Erbey"] },
  { time: "3:00", names: ["ŞENGÜL"] },
  { time: "4:00", names: ["ŞENGÜL"] },
  { time: "5:00", names: ["inci"] },
  { time: "6:00", names: ["inci", "Meral"] },
  { time: "7:00", names: ["inci", "AAyse"] },
  { time: "8:00", names: ["Mine", "E.Mazma"] },
  { time: "9:00", names: ["Htc Dem"] },
  { time: "10:00", names: ["E Aytan"] },
  { time: "11:00", names: ["Hayriye"] },
  { time: "12:00", names: ["Mrym Glsm Esm"] },
  { time: "13:00", names: ["aysegulg"] },
  { time: "14:00", names: ["F.Kaplan"] },
  { time: "15:00", names: ["Orby"] },
  { time: "16:00", names: ["Habibe"] },
  { time: "17:00", names: ["Faimana"] },
  { time: "18:00", names: ["Buket"] },
  { time: "19:00", names: ["H.Kara"] },
  { time: "20:00", names: ["E.üçok"] },
  { time: "21:00", names: ["Bahar", "Vuslat"] },
  { time: "22:00", names: ["Hale"] },
  { time: "23:00", names: ["AyselA.Çevik"] },
  { time: "24:00", names: ["elif", "R.Yasar"] },
];

const TimeGrid: React.FC = () => {
  const [currentHour, setCurrentHour] = useState<number>(
    DateTime.now().setZone("Asia/Istanbul").hour
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(DateTime.now().setZone("Asia/Istanbul").hour);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getTileColor = (hour: number): string => {
    const adjustedHour = hour === 24 ? 0 : hour; // Handle 24:00 as 0 (midnight)
    if (adjustedHour < currentHour) return "#F5A3A3";
    if (adjustedHour === currentHour) return "#FFB347";
    return "#4CAF50";
  };

  return (
    <Grid container spacing={2} style={{ padding: "20px" }}>
    {data.map((hourData, index) => {
      const hour = parseInt(hourData.time.split(":")[0], 10);
      const color = getTileColor(hour);
      const isCurrentHour = (hour === 24 ? 0 : hour) === currentHour;

      return (
        <Grid
          item
          xs={12} // Full-width on mobile
          sm={6} // Two columns on tablets
          md={4} // Three columns on desktops
          key={index}
        >
          <div
            style={{
              backgroundColor: color,
              padding: "10px",
              borderRadius: "8px",
              color: "white",
              textAlign: "center",
            }}
          >
            <strong>🤲🏻 Saat {hourData.time}</strong>
            <Grid container spacing={1} style={{ marginTop: "10px" }}>
              {hourData.names.map((name, i) => (
                <Grid item xs={12} key={i}>
                  {isCurrentHour ? (
                    <>
                      <span>{name}</span>
                      <input
                        type="checkbox"
                        style={{
                          marginLeft: "10px",
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                      />
                    </>
                  ) : (
                    <span>{name}</span> // Non-editable for past and future hours
                  )}
                </Grid>
              ))}
            </Grid>
          </div>
        </Grid>
      );
    })}
  </Grid>)
};

export default TimeGrid;
