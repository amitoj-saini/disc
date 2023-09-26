import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { db } from "./db";

export const users = sqliteTable("users", {
    id: integer("id").primaryKey(),
    email: text("email"),
    username: text("username"),
    password: text("password"),
    isVerified: integer("verified"),
});

/*export const createUser = (data) => {
    db.insert(users).values(data).returning().get()
}*/
