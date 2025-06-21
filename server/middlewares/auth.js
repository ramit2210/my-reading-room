require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("authorization").split(" ")[1];

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode.user;
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Token is not valid" });
    }
};
