const {
    pgTable,
    serial,
    varchar,
    text,
    integer,
    timestamp,
} = require("drizzle-orm/pg-core");
const { users } = require("./users");

const books = pgTable("books", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 256 }).notNull(),
    summary: text("summary"),
    userId: integer("user_id").references(() => users.id, {
        onDelete: "cascade",
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

module.exports = {
    books,
};
