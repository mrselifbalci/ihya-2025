import { Box, Typography } from "@mui/material";
import "./App.css";
import TimeAndDate from "./TimeAndDate";
import TimeGrid from "./TimeGrid";

function App() {
  return (
    <>
      <TimeAndDate />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", ml: 0.5 }}>
          <Box
            sx={{
              background: "#E57373",
              width: "10px",
              height: "10px",
            }}
          ></Box>
          <Typography variant="body2" sx={{ ml: "5px" }}>
            Gecmis saat
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
            Su anki saat
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
      <Typography variant="body1">
        İtikafa başladığınız saatte isminizin yanındaki kutuya tik atmayı
        unutmayınız. Kutucuklar sadece kendi saatlerinde aktif olacaktır.
        Önceden ya da saat geçtikten sonra değişiklik yapılmamaktadır. Eskiye
        dönük değişiklik yapmak isterseniz WhatsApp'tan yazabilirsiniz.
        Teşekkürler.
      </Typography>
      <TimeGrid />
    </>
  );
}

export default App;
