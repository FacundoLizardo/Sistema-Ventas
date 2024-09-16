import { User } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserInterface } from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET;

export class LoginService {
  async authenticate(
    email: string,
    password: string
  ): Promise<UserInterface | null> {
    const user = (await User.findOne({
      where: { email },
    })) as UserInterface | null;

    if (!user) {
      console.error(`User with the email: ${email} not found.`);
      return null;
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      console.error("Invalid password.");
      return null; 
    }

    return user;
  }

  generateToken(user: UserInterface): string {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined.");
    }

    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
  }
}

export default new LoginService();

//---------- TESTS ----------

/* 
    {
      "email": "ltamburlini@gmail.com",
      "password": "lucas1234"
    } 
*/
