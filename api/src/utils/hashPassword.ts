import bcrypt from "bcrypt";

export const  hashPassword = async (password: string) => {
	const saltRounds = 10;

	try {
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		return hashedPassword;
	} catch (error) {
		throw new Error("There was a problem hashing the password.");
	}
}

