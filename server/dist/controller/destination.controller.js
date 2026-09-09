"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDestination = exports.updateInfo = exports.updateSearchInfo = exports.getAllLocations = exports.addLocation = void 0;
const db_1 = __importDefault(require("../db"));
const schema_1 = require("../schema/schema");
const drizzle_orm_1 = require("drizzle-orm");
const addLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const insert = yield db_1.default.insert(schema_1.PopularDestinationTable).values(newLocation);
        if (insert) {
            res.status(200).json({ msg: "Location added Sucessfully!" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});
exports.addLocation = addLocation;
const getAllLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const locations = yield db_1.default.select().from(schema_1.PopularDestinationTable);
        res.status(200).json(locations);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});
exports.getAllLocations = getAllLocations;
const updateSearchInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { did } = req.params;
        // First, fetch current data
        const existing = yield db_1.default
            .select()
            .from(schema_1.PopularDestinationTable)
            .where((0, drizzle_orm_1.eq)(schema_1.PopularDestinationTable.did, Number(did)));
        if (existing.length === 0) {
            res.status(404).json({ message: "Location not found" });
            return;
        }
        const current = existing[0];
        // Update with incremented searchCount and latest timestamp
        yield db_1.default
            .update(schema_1.PopularDestinationTable)
            .set({
            searchCount: ((_a = current.searchCount) !== null && _a !== void 0 ? _a : 0) + 1,
            lastTimeSearched: new Date(), // or use your own date if needed
        })
            .where((0, drizzle_orm_1.eq)(schema_1.PopularDestinationTable.did, Number(did)));
        res.status(200).json({ message: "Search info updated successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});
exports.updateSearchInfo = updateSearchInfo;
const updateInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { did } = req.params;
        const { location, name, category, image } = req.body;
        // First, fetch current data
        const existing = yield db_1.default
            .select()
            .from(schema_1.PopularDestinationTable)
            .where((0, drizzle_orm_1.eq)(schema_1.PopularDestinationTable.did, Number(did)));
        if (existing.length === 0) {
            res.status(404).json({ message: "Location not found" });
            return;
        }
        const current = existing[0];
        // Update with incremented searchCount and latest timestamp
        yield db_1.default
            .update(schema_1.PopularDestinationTable)
            .set({
            location,
            name,
            category,
            image,
        })
            .where((0, drizzle_orm_1.eq)(schema_1.PopularDestinationTable.did, Number(did)));
        res.status(200).json({ message: "Destination info updated successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});
exports.updateInfo = updateInfo;
const deleteDestination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { did } = req.params;
        const idNum = Number(did);
        if (isNaN(idNum)) {
            res.status(400).json({ message: "Invalid destination ID" });
            return;
        }
        // Check if the destination exists
        const existing = yield db_1.default
            .select()
            .from(schema_1.PopularDestinationTable)
            .where((0, drizzle_orm_1.eq)(schema_1.PopularDestinationTable.did, idNum));
        if (existing.length === 0) {
            res.status(404).json({ message: "Destination not found" });
            return;
        }
        // Delete the destination
        yield db_1.default
            .delete(schema_1.PopularDestinationTable)
            .where((0, drizzle_orm_1.eq)(schema_1.PopularDestinationTable.did, idNum));
        res.status(200).json({ message: "Destination deleted successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});
exports.deleteDestination = deleteDestination;
