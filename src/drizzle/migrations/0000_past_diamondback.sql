CREATE TABLE "properties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"street" varchar(256) NOT NULL,
	"city" varchar(256) NOT NULL,
	"state" varchar(256) NOT NULL,
	"postal_code" varchar(9) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
