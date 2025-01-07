import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import moment from "moment-hijri";
import {
  Select,
  MenuItem,
  Box,
  Typography,
  SelectChangeEvent,
} from "@mui/material";

type TimeAndDateProps = {
  onDateChange: (selectedDate: string) => void;
};

const TimeAndDate: React.FC<TimeAndDateProps> = ({ onDateChange }) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [islamicDate, setIslamicDate] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>(
    moment().format("iD") // Default to the current Islamic day
  );
  const currentIslamicDay = parseInt(moment().format("iD"), 10); // Current Islamic day as a number

  useEffect(() => {
    moment.locale("en");

    const interval = setInterval(() => {
      const timeInTurkey = DateTime.now()
        .setZone("Asia/Istanbul")
        .toFormat("HH:mm:ss");
      setCurrentTime(timeInTurkey);

      const adjustedDate = moment()
        .iDate(parseInt(selectedDay, 10))
        .format("iD iMMMM");
      setIslamicDate(adjustedDate);

      // Notify parent of the date change
      onDateChange(
        moment().iDate(parseInt(selectedDay, 10)).format("YYYY-MM-DD")
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedDay, onDateChange]);

  const handleDateChange = (event: SelectChangeEvent) => {
    setSelectedDay(event.target.value); // Update the selected day
  };

  return (
    <Box
      sx={{
        fontFamily: "Arial",
        fontSize: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <Box>
        <Typography variant="h6">Türkiye Saati</Typography>
        <Typography variant="h5">{currentTime}</Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Hicri Tarih</Typography>
        <Typography variant="h5">8 Rajab</Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">Tarihi değiştir:</Typography>
        {/* <Select
          value={selectedDay}
          onChange={handleDateChange}
          sx={{
            mt: 1,
            minWidth: "150px",
            color: "white", // Text color for the selected item
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "white", // Border color
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white", // Border color when focused
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white", // Border color on hover
            },
            ".MuiSvgIcon-root": {
              color: "white", // Dropdown arrow color
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: "black", // Background color for dropdown
                color: "white", // Text color for dropdown items
              },
            },
          }}
        >
          {Array.from({ length: 24 }, (_, i) => i + 7).map((day) => (
            <MenuItem
              key={day}
              value={day.toString()}
              disabled={day > currentIslamicDay} // Disable future days
              sx={{
                backgroundColor: "black", // Background color for each item
                "&:hover": {
                  backgroundColor: "grey", // Background color on hover
                },
                color: day > currentIslamicDay ? "grey" : "white", // Grey out future dates
              }}
            >
              {day}
            </MenuItem>
          ))}
        </Select> */}
      </Box>
    </Box>
  );
};

export default TimeAndDate;
