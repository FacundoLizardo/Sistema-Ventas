import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extiende la interfaz Request para incluir el campo user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token not found." });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res.status(500).json({ message: "JWT_SECRET is not defined." });
  }

  jwt.verify(token || "", secret || "", (err, user) => {
    if (err) {
      res.status(403).json({ message: "Token not valid" });
    }
    req.user = user as JwtPayload;
    next();
  });
}
