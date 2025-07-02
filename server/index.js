require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const authRoute = require("./routes/auth");
const booksRoute = require("./routes/books");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running!");
});

app.use("/api/auth", authRoute);
app.use("/api/books", booksRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
