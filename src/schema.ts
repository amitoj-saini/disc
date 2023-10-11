import { getRandomInt, hashPassword, comparePasswords } from "./functions";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { eq } from "drizzle-orm";
import { db } from "./db";


export const users = sqliteTable("users", {
    id: integer("id").primaryKey().notNull(),
    email: text("email").notNull().unique(),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
    isVerified: integer("verified").notNull(),
    verifacationCode: integer("verifacationCode"),
    verified_at: integer("verified_at"),
    created_at: integer("created_at").notNull(),
    // users are only allowed to be logged in at one place at one time
    session: integer("session").notNull()
});

export const discs = sqliteTable("discs", {
    id: integer("id").primaryKey().notNull(),
    name: text("name"),
    icon: integer("icon").notNull(),
    descrition: text("description"),
    userId: integer("user_id").notNull().references(() => users.id),
});

export const createUser = async (email: string, username: string, password: string, isverified: number) => {
    return await db.insert(users).values({
        email: email,
        username: username,
        password: await hashPassword(password),
        isVerified: isverified,
        created_at: new Date().getTime(),
        session: getRandomInt(1111111111, 9999999999)
    }).returning().get()
}

export const getUserFromSession = async(sessionId: number) => {
    return await db.select().from(users).where(eq(users.session, sessionId));
}

export const setVerifacationCode = async(userid: number) => {
    return await db.update(users).set({verifacationCode: getRandomInt(1111111111, 9999999999)}).where(eq(users.id, userid)).returning()
}

export const getUsersDiscs = async(userid: number) => {
    return await db.select().from(discs).where(eq(discs.userId, userid));
}

export const authenticateUser = async (username: string, password: string) => {
    let user_response = await db.select().from(users).where(eq(users.username, username));
    if (user_response.length >= 1) {
        let user = user_response[0];
        if (await comparePasswords(password, user.password)) {
            user.session = getRandomInt(1111111111, 9999999999);
            await db.update(users).set({ session: user.session }).where(eq(users.id, user.id));
            return user;
        }
        else return false;
    }
}