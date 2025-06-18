require("dotenv").config();
const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = require("pg");
const schema = require("./schema");

// Create a connection pool using pg
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Initialize Drizzle with pool and schema
const db = drizzle(pool, { schema });

module.exports = { db, pool };
