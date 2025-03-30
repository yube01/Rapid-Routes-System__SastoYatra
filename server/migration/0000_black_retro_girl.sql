CREATE TABLE "password_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"passwordExpires" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "post_data" (
	"post_id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"image" text NOT NULL,
	"authorId" integer NOT NULL,
	"authorName" text NOT NULL,
	"authorAvatar" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"isUpdated" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"fullName" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL
);
