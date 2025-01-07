import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import Grid from "@mui/material/Grid";
import { Box, Checkbox } from "@mui/material";

type NameStatus = {
  name: string;
  status: boolean;
};

type HourData = {
  hour: string; // Example: "00:00"
  names: NameStatus[]; // Array of names with their status
};

const TimeGrid: React.FC = () => {
  const [data, setData] = useState<HourData[]>([]); // State to hold grid data
  const [currentHour, setCurrentHour] = useState<number>(
    DateTime.now().setZone("Asia/Istanbul").hour
  );

  // Fetch data from backend
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://ihya-2025-be0afcce5189.herokuapp.com/date/${today}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log(result);
        setData(result.data); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Update the current hour every minute
    const interval = setInterval(() => {
      setCurrentHour(DateTime.now().setZone("Asia/Istanbul").hour);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Determine tile color
  const getTileColor = (hour: number): string => {
    if (hour < currentHour) return "#F5A3A3"; // Red for past hours
    if (hour === currentHour) return "#FFB347"; // Orange for the current hour
    return "#4CAF50"; // Green for future hours
  };

  return (
    <Grid container spacing={2} style={{ padding: "20px" }}>
      {data?.map((hourData, index) => {
        const hour = parseInt(hourData.hour.split(":")[0], 10);
        const color = getTileColor(hour);
        const isCurrentHour = hour === currentHour;
        const isPastHour = hour < currentHour;

        return (
          <Grid
            item
            xs={6} // Full-width on mobile
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
                height: "150px", // Fixed height
                display: "flex", // Align content inside
                flexDirection: "column",
                justifyContent: "center", // Center vertically
                alignItems: "center", // Center horizontally
              }}
            >
              <strong>🤲🏻 Saat {hourData.hour}</strong>
              <Grid container spacing={1} style={{ marginTop: "10px" }}>
                {hourData.names.map((nameStatus, i) => (
                  <Grid item xs={12} key={i}>
                    {isCurrentHour || isPastHour ? (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <span style={{ minWidth: "20%" }}>
                          {nameStatus.name}
                        </span>
                        <Checkbox
                          checked={nameStatus.status}
                          disabled={isPastHour} // Disable for past hours
                          sx={{
                            marginLeft: "10px",
                            "&.Mui-checked": {
                              color: "primary.main", // Material-UI blue
                            },
                          }}
                          onChange={(e) => {
                            console.log(
                              `${nameStatus.name} checked: ${e.target.checked}`
                            );
                          }}
                        />
                      </Box>
                    ) : (
                      <span>{nameStatus.name}</span> // Display names without checkboxes for future hours
                    )}
                  </Grid>
                ))}
              </Grid>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TimeGrid;
