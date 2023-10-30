import { createClient } from "@libsql/client";
//import { drizzle } from "drizzle-orm/libsql";
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
//const client = createClient({url: "file:db.sqlite"});
const sqlite = new Database("db.sqlite");
export const db = drizzle(sqlite);