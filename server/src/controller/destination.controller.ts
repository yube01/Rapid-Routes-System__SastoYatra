import { Request, Response } from "express";
import db from "../db";
import { PopularDestinationTable } from "../schema/schema";
import { eq } from "drizzle-orm";

const addLocation = async (req: Request, res: Response): Promise<void> => {
  try {
    const location = req.body;

    const newLocation = {
      location: location.location,
      name: location.name,
      category: location.category,
      image: location.image,
      searchCount: 0,
      lastSearchTime: 0,
    };
    const insert = await db.insert(PopularDestinationTable).values(newLocation);

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

const getAllLocations = async (req: Request, res: Response): Promise<void> => {
  try {
    const locations = await db.select().from(PopularDestinationTable);
    res.status(200).json(locations);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

const updateSearchInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { did } = req.params;

    // First, fetch current data
    const existing = await db
      .select()
      .from(PopularDestinationTable)
      .where(eq(PopularDestinationTable.did, Number(did)));

    if (existing.length === 0) {
      res.status(404).json({ message: "Location not found" });
      return;
    }

    const current = existing[0];

    // Update with incremented searchCount and latest timestamp
    await db
      .update(PopularDestinationTable)
      .set({
        searchCount: (current.searchCount ?? 0) + 1,
        lastTimeSearched: new Date(), // or use your own date if needed
      })
      .where(eq(PopularDestinationTable.did, Number(did)));

    res.status(200).json({ message: "Search info updated successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

const updateInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { did } = req.params;
    const { location, name, category, image } = req.body;

    // First, fetch current data
    const existing = await db
      .select()
      .from(PopularDestinationTable)
      .where(eq(PopularDestinationTable.did, Number(did)));

    if (existing.length === 0) {
      res.status(404).json({ message: "Location not found" });
      return;
    }

    const current = existing[0];

    // Update with incremented searchCount and latest timestamp
    await db
      .update(PopularDestinationTable)
      .set({
        location,
        name,
        category,
        image,
      })
      .where(eq(PopularDestinationTable.did, Number(did)));

    res.status(200).json({ message: "Destination info updated successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
const deleteDestination = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { did } = req.params;

    const idNum = Number(did);
    if (isNaN(idNum)) {
      res.status(400).json({ message: "Invalid destination ID" });
      return;
    }

    // Check if the destination exists
    const existing = await db
      .select()
      .from(PopularDestinationTable)
      .where(eq(PopularDestinationTable.did, idNum));

    if (existing.length === 0) {
      res.status(404).json({ message: "Destination not found" });
      return;
    }

    // Delete the destination
    await db
      .delete(PopularDestinationTable)
      .where(eq(PopularDestinationTable.did, idNum));

    res.status(200).json({ message: "Destination deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export {
  addLocation,
  getAllLocations,
  updateSearchInfo,
  updateInfo,
  deleteDestination,
};
