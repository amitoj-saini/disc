ALTER TABLE users ADD `verifacationCode` integer NOT NULL;--> statement-breakpoint
ALTER TABLE users ADD `verified_at` integer;--> statement-breakpoint
ALTER TABLE users ADD `created_at` integer NOT NULL;