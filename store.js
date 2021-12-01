import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

let config;

if (process.env.DATABASE_URL) {
    config = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    };
} else {
    config = {
        user: "david",
        host: "localhost",
        database: "flashcards",
        port: 5432,
    };
}

const pool = new Pool(config);

export default pool;
