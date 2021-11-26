import pg from "pg";

const { Pool } = pg;

const config = {
    user: "david",
    host: "localhost",
    database: "flashcards",
    port: 5432,
};

const pool = new Pool(config);

export default pool;
