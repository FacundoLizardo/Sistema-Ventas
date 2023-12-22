import "./App.module.css";
import { Routes, Route } from "react-router-dom";
import Sales from "./Views/Sales/Sales";
import Stock from "./Views/Stock/Stock";
import Statistics from "./Views/Statistics/Statistics";
import Administration from "./Views/Administration/Administration";
import Layout from "./Views/Layout/Layout";

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
