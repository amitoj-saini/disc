import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { getRandomInt } from "./functions";
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


export const createSession = async (userId: number) => {
    return await db.insert(sessions).values({
        id: getRandomInt(1111111111, 9999999999),
        userId: userId
    }).returning().get();
}