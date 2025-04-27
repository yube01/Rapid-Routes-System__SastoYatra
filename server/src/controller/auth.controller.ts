import { Request, Response } from "express";
import bcrypt from "bcrypt";
import db from "../db";
import { and, eq } from "drizzle-orm";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserTable } from "../schema/schema";

interface JwtPayloadWithUserId extends JwtPayload {
  insertedId: string;
  userName: string;
}

const JWT_SECRET = process.env.JWT_SECRET;

const tokenExpires = new Date(Date.now() + 10 * 60 * 1000);

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = req.body;

    const users = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, newUser.email));

    const hashedPassword = await bcrypt.hash(newUser.password, 5);

    if (users.length > 0) {
      const user = users[0];
      res.status(400).json({ msg: "Email is already registered" });
      return;
    }

    const newUserData = {
      fullName: newUser.fullName,
      email: newUser.email,
      password: hashedPassword,
    };
    const [insertedUser] = await db
      .insert(UserTable)
      .values(newUserData)
      .returning({ insertedId: UserTable.id });

    const userId = insertedUser;

    if (insertedUser) {
      res
        .status(200)
        .json({ msg: "User added Sucessfully!", users: insertedUser });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Fetch user with the given email
    const users = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, email));

    // Check if a user exists with the given email
    if (users.length === 0) {
      res.status(401).json({ message: "User doesn't exist!" });
      return;
    }

    const user = users[0];

    // Compare the password with the stored password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Incorrect Password!" });
      return;
    }

    // Generate JWT token for the user
    const token = jwt.sign({ userId: user.id }, JWT_SECRET!, {
      expiresIn: "30d",
    });

    // Return the token as a response
    res
      .status(200)
      .json({ token: token, user: user.fullName, isAdmin: user.isAdmin });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export { register, login };
