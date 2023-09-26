import { Config } from "drizzle-kit";
 
export default {
    schema: "./src/schema.ts",
    out: "./migrations",
    driver: "turso",
    dbCredentials: {
        url: 'file:./db.sqlite',
    },
} satisfies Config;