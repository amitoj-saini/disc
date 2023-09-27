import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { db } from "./db";

export const users = sqliteTable("users", {
    id: integer("id").primaryKey(),
    email: text("email"),
    username: text("username"),
    password: text("password"),
    isVerified: integer("verified"),
});

export const sessions = sqliteTable("sessions", {
    id: integer("id").primaryKey(),
    userId: integer("user_id").references(() => users.id)
})



export const createUser = async (email: string, username: string, passwword: string, isverified: number) => {
    return await db.insert(users).values({
        email: email,
        username: username,
        password: passwword,
        isVerified: isverified
    }).returning().get()
}
