CREATE TABLE "popular_destination_data" (
	"did" serial PRIMARY KEY NOT NULL,
	"location" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" text NOT NULL,
	"category" varchar(255) NOT NULL,
	"lastTimeSearched" timestamp DEFAULT now(),
	"searchCount" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "history" (
	"hid" serial PRIMARY KEY NOT NULL,
	"id" varchar(255) NOT NULL,
	"source" varchar(255) NOT NULL,
	"destination" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_data" ADD COLUMN "isAdmin" boolean NOT NULL;