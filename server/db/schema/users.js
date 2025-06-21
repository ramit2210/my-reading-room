const { pgTable, serial, varchar, timestamp } = require("drizzle-orm/pg-core");

const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull().unique(),
    email: varchar("email", { length: 256 }).notNull().unique(),
    password: varchar("password", { length: 256 }),
    createdAt: timestamp("created_at").defaultNow(),
});

module.exports = {
    users,
};
