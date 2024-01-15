async function comparePasswords(password, hashedPassword) {
	try {
		const match = await bcrypt.compare(password, hashedPassword);
		return match;
	} catch (error) {
		throw new Error("Error while compare password whit hashed password.");
	}
}
