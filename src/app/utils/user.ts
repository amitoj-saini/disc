import type { Session, User } from "@prisma/client";
import { genSession, hashPassword } from "./utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (name: string, username: string, email: string,  password: string) => {
    return await prisma.user.create({
        data: {
            name: name,
            email: email,
            username: username,
            password: await hashPassword(password),
        }
    });
    
}

export const createSession = async (user: User) => {
    return await prisma.session.create({
        data: {
            id: genSession(25),
            user: {
                connect: { id: user.id }
            }
        }
    })
}

export const findUser = async (sessionId: string) => {
    return await prisma.session.findUnique({where: {id: sessionId}, include: {user: true}});
}

export const fetchUser = async (username: string) => {
    return await prisma.user.findUnique({where: {username: username}});
}