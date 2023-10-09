CREATE TABLE `discs` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`icon` integer NOT NULL,
	`description` text,
	`user_id` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);