const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { books } = require("../db/schema/books");
const { db } = require("../db");
const { eq, asc, desc } = require("drizzle-orm");
const auth = require("../middlewares/auth");
const getBookDetails = require("../utils/getBookDetails");
const _ = require("lodash");

// @router   GET /api/books
// @desc     Get all books
// @access   Private
router.get("/", auth, async (req, res) => {
    try {
        const userBooks = await db
            .select()
            .from(books)
            .where(eq(books.userId, req.user.id));

        // console.log(userBooks);

        const getBookDetailsPromises = userBooks.map((book) =>
            getBookDetails(book.title)
        );

        const userBooksData = await Promise.all(getBookDetailsPromises);

        const combinedBooks = userBooks.map((book, index) => ({
            ...book,
            details: userBooksData[index],
        }));

        res.json(combinedBooks);
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});

//@filter    GET /api/books/filter
// @desc     Filter books by title and date
// @access   Private
router.get("/filter", auth, async (req, res) => {
    try {
        const { sortingOrder, dateOrder } = req.query;

        const validSorting = ["asc", "desc"];
        const validDateOrder = ["newest", "oldest"];

        const orderConditions = [];

        if (validSorting.includes(sortingOrder)) {
            orderConditions.push(
                sortingOrder === "asc" ? asc(books.title) : desc(books.title)
            );
        }

        if (validDateOrder.includes(dateOrder)) {
            orderConditions.push(
                dateOrder === "newest"
                    ? desc(books.createdAt)
                    : asc(books.createdAt)
            );
        }

        let query = db.select().from(books);
        if (orderConditions.length > 0) {
            query = query.orderBy(...orderConditions);
        }

        console.log(orderConditions);

        const filteredBooks = await query;

        if (filteredBooks.length === 0) {
            return res.status(404).json({ message: "No books found." });
        }

        res.json(filteredBooks);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

// @router   POST /api/books
// @desc     Create a new book
// @access   Private
router.post(
    "/",
    [auth, check("title", "Title is required").not().isEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, summary } = req.body;
        try {
            const [book] = await db
                .insert(books)
                .values({
                    title: _.startCase(_.toLower(title)),
                    summary,
                    userId: req.user.id,
                })
                .returning();

            res.json(book);
        } catch (error) {
            return res.status(500).json({ message: "Server error" });
        }
    }
);

module.exports = router;
