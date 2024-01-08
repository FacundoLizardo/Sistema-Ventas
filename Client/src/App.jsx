import "./App.module.css";
import { Routes, Route } from "react-router-dom";
import Stock from "./views/stock/Stock";
import Administration from "./views/administration/Administration";
import Sales from "./views/sales/Sales";
import Statistics from "./views/statistics/statistics";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Sales />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/administration" element={<Administration />} />
      </Routes>
    </>
  );
}

export default App;
