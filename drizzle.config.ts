import { Config } from "drizzle-kit";
 
const config: Config = {
    schema: "./src/schema.ts",
    out: "./migrations",
    driver: "turso",
    dbCredentials: {
        url: 'file:./db.sqlite',
    }
};

export default config;