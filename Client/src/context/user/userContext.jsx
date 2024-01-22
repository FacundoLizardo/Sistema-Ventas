import axios from "axios";
import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [validUser, setValidUser] = useState({});

	return (
		<UserContext.Provider value={{ validUser, setValidUser }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
