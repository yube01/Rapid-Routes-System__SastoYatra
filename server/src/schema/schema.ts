import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const UserTable = pgTable("user_data", {
  id: serial("id").primaryKey(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: text("password").notNull(),
  isAdmin: boolean("isAdmin").notNull().default(false),
});

export const PopularDestinationTable = pgTable("popular_destination_data", {
  did: serial("did").primaryKey(),
  location: varchar("location", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  image: text("image").notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  lastTimeSearched: timestamp("lastTimeSearched").defaultNow(),
  searchCount: integer("searchCount").default(0),
});

export const SearchHistoryTable = pgTable("history", {
  hid: serial("hid").primaryKey(),
  id: varchar("id", { length: 255 }).notNull(),
  source: varchar("source", { length: 255 }).notNull(),
  destination: varchar("destination", { length: 255 }).notNull(),
});
