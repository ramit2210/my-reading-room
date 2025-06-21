require("dotenv").config();
const express = require("express");
const app = express();
const authRoute = require("./routes/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("API is running!");
});

app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
