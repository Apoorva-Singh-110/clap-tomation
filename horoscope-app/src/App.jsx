import StarField from "./components/StarField";
import ZodiacHeader from "./components/ZodiacHeader";
import DailyInsight from "./components/DailyInsight";
import LuckyStrip from "./components/LuckyStrip";
import HoroscopeCarousel from "./components/HoroscopeCarousel";
import { horoscopeData } from "./data/horoscopeData";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="background-atmosphere">
        <div className="nebula nebula-1" />
        <div className="nebula nebula-2" />
        <div className="nebula nebula-3" />
        <StarField />
      </div>

      <main className="content">
        <ZodiacHeader zodiac={horoscopeData.zodiac} />
        <DailyInsight insight={horoscopeData.dailyInsight} />
        <LuckyStrip data={horoscopeData.luckyStrip} />
        <HoroscopeCarousel cards={horoscopeData.horoscopeCards} />
      </main>
    </div>
  );
}

export default App;
