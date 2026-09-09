"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchHistoryTable = exports.PopularDestinationTable = exports.UserTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.UserTable = (0, pg_core_1.pgTable)("user_data", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    fullName: (0, pg_core_1.varchar)("fullName", { length: 255 }).notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull(),
    password: (0, pg_core_1.text)("password").notNull(),
    isAdmin: (0, pg_core_1.boolean)("isAdmin").notNull().default(false),
});
exports.PopularDestinationTable = (0, pg_core_1.pgTable)("popular_destination_data", {
    did: (0, pg_core_1.serial)("did").primaryKey(),
    location: (0, pg_core_1.varchar)("location", { length: 255 }).notNull(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    image: (0, pg_core_1.text)("image").notNull(),
    category: (0, pg_core_1.varchar)("category", { length: 255 }).notNull(),
    lastTimeSearched: (0, pg_core_1.timestamp)("lastTimeSearched").defaultNow(),
    searchCount: (0, pg_core_1.integer)("searchCount").default(0),
});
exports.SearchHistoryTable = (0, pg_core_1.pgTable)("history", {
    hid: (0, pg_core_1.serial)("hid").primaryKey(),
    id: (0, pg_core_1.varchar)("id", { length: 255 }).notNull(),
    source: (0, pg_core_1.varchar)("source", { length: 255 }).notNull(),
    destination: (0, pg_core_1.varchar)("destination", { length: 255 }).notNull(),
});
