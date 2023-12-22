import "./App.module.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={""} />
        <Route path="/" element={""} />
        <Route path="/" element={""} />
        <Route path="/" element={""} />
        <Route path="/" element={""} />
      </Routes>
    </>
  );
}
export default App;
