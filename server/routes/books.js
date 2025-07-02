const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { books } = require("../db/schema/books");
const { db } = require("../db");
const { eq, asc, desc } = require("drizzle-orm");
const auth = require("../middlewares/auth");
const getBookDetails = require("../utils/getBookDetails");
const _ = require("lodash");

/**
 * @route    GET /api/books
 * @desc     Get all books for the authenticated user
 * @access   Private
 */
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

/**
 * @route    GET /api/books/filter
 * @desc     Get filtered books for the authenticated user
 * @access   Private
 */
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

        // FIX: Add user filtering
        let query = db
            .select()
            .from(books)
            .where(eq(books.userId, req.user.id)); // Filter by authenticated user

        if (orderConditions.length > 0) {
            query = query.orderBy(...orderConditions);
        }

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

/**
 * @route    POST /api/books
 * @desc     Create a new book for the authenticated user
 * @access   Private
 */
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

/**
 * @route    PUT /api/books/:id
 * @desc     Update a book by ID for the authenticated user
 * @access   Private
 */
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, summary } = req.body;
    try {
        const [updatedBook] = await db
            .update(books)
            .set({ title: _.startCase(_.toLower(title)), summary: summary })
            .where(eq(books.id, id))
            .returning();

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        // const updatedBookDetails = await db.select().from(books);

        res.json(updatedBook);
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});

/**
 * @route    DELETE /api/books/:id
 * @desc     Delete a book by ID for the authenticated user
 * @access   Private
 */
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await db.delete(books).where(eq(books.id, id));
        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
