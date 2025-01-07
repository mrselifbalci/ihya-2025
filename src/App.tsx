import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import "./App.css";
import TimeAndDate from "./TimeAndDate";
import TimeGrid from "./TimeGrid";

const App: React.FC = () => {
  const [selectedIslamicDate, setSelectedIslamicDate] = useState<string>("");

  const handleDateChange = (date: string) => {
    setSelectedIslamicDate(date);
  };

  return (
    <>
      <TimeAndDate onDateChange={handleDateChange} />
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", ml: 0.5 }}>
          <Box
            sx={{
              background: "#E57373",
              width: "10px",
              height: "10px",
            }}
          ></Box>
          <Typography variant="body2" sx={{ ml: "5px" }}>
            Geçmiş saat
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", ml: 0.5 }}>
          <Box
            sx={{
              background: "#4CAF50",
              width: "10px",
              height: "10px",
            }}
          ></Box>
          <Typography variant="body2" sx={{ ml: "5px" }}>
            Şu anki saat
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", ml: 0.5 }}>
          <Box
            sx={{
              background: "grey",
              width: "10px",
              height: "10px",
            }}
          ></Box>
          <Typography variant="body2" sx={{ ml: "5px" }}>
            Gelecek saat
          </Typography>
        </Box>
      </Box>
      <Typography variant="body1" sx={{ mb: 2 }}>
        İtikafa başladığınız saatte isminizin yanındaki kutuya tik atmayı
        unutmayınız. Kutucuklar sadece kendi saatlerinde aktif olacaktır.
        Önceden ya da saat geçtikten sonra değişiklik yapılmamaktadır. Eskiye
        dönük değişiklik yapmak isterseniz WhatsApp'tan yazabilirsiniz.
        Teşekkürler.
      </Typography>
      <TimeGrid selectedIslamicDate={selectedIslamicDate} />
    </>
  );
};

export default App;
