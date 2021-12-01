import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

if (process.env.DATABASE_URL) {
    const config = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthroized: false,
        },
    };
} else {
    const config = {
        user: "david",
        host: "localhost",
        database: "flashcards",
        port: 5432,
    };
}

const pool = new Pool(config);

export default pool;
