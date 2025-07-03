require("dotenv").config();
const { drizzle } = require("drizzle-orm/neon-http");
const { users } = require("./schema/users");
const { books } = require("./schema/books");

const db = drizzle(process.env.DATABASE_URL, {
    schema: { users, books },
});

module.exports = { db };
