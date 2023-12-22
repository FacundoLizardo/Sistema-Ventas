import "./App.module.css";
import { Routes, Route } from "react-router-dom";
import Stock from "./views/stock/Stock";
import Administration from "./views/administration/Administration";
import Layout from "./views/layout/Layout";
import Sales from "./views/sales/Sales";
import Statistics from "./views/statistics/statistics";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/administration" element={<Administration />} />
      </Routes>
    </>
  );
}

export default App;
