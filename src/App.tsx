import { Typography } from "@mui/material";
import "./App.css";
import TimeAndDate from "./TimeAndDate";
import TimeGrid from "./TimeGrid";

function App() {
  return (
    <>
      <TimeAndDate />
      <Typography variant="h6">
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
