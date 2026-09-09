import process from "node:process";
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migration",
  schema: "./src/schema/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL || "postgres://postgres:yube@localhost:5432/sasto_yatra",
  },
});

// npx drizzle-kit generate

