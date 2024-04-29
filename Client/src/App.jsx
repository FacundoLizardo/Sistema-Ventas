import "./App.module.css";
import { Routes, Route } from "react-router-dom";
import Stock from "./views/stock/Stock";
import Administration from "./views/administration/Administration";
import Sales from "./views/sales/Sales";
import Statistics from "./views/statistics/Statistics.jsx";
import Navbar from "./components/navbar/Navbar";
import Login from "./views/login/Login";
import Register from "./views/register/Register.jsx";
import VerifyUserEmail from "./views/verification/verification.jsx";
// TODO poner componentes a renderizar como lazy para carga mas rapidas
function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Sales />} />
				<Route path="/stock" element={<Stock />} />
				<Route path="/statistics" element={<Statistics />} />
				<Route path="/administration" element={<Administration />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/verification/:token" element={<VerifyUserEmail />} />
			</Routes>
		</>
	);
}

export default App;
