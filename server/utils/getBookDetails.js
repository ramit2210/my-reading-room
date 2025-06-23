const axios = require("axios");
const slugify = require("slugify");

// To fetch book details from Open Library
module.exports = async (title) => {
    try {
        // Step 1: Search for the book by title
        const searchUrl = `https://openlibrary.org/search.json?title=${slugify(
            title,
            "-"
        )}`;
        const searchResponse = await axios.get(searchUrl);
        const book = searchResponse.data.docs[0];
        // console.log(book);

        if (!book) {
            return { error: "Book not found" };
        }

        // const coverId = book.key;
        const editionKey = book.cover_edition_key;
        const coverUrl = `https://covers.openlibrary.org/b/olid/${editionKey}-M.jpg`;

        const authorName = book.author_name
            ? book.author_name[0]
            : "Unknown Author";

        return {
            title: book.title,
            author: authorName,
            cover: coverUrl || "No cover available",
        };
    } catch (error) {
        console.error("Error:", error.message);
    }
};
