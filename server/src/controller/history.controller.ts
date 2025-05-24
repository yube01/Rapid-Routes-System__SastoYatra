import { Request, Response } from "express";
import db from "../db";
import { SearchHistoryTable } from "../schema/schema";
import { eq } from "drizzle-orm";

const createHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const location = req.body;

    const newHistory = {
      id: location.id,
      source: location.source,
      destination: location.destination,
    };
    const insert = await db.insert(SearchHistoryTable).values(newHistory);

    if (insert) {
      res.status(200).json({ msg: "Location added Sucessfully!" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

const getUserHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const history = await db
      .select()
      .from(SearchHistoryTable)
      .where(eq(SearchHistoryTable.id, id)); // Compare with user ID

    if (history.length === 0) {
      res.status(404).json({ message: "No history found for this user" });
      return;
    }

    res.status(200).json(history);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export { createHistory, getUserHistory };
