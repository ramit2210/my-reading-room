require("dotenv").config();
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { users } = require("../db/schema/users");
const { db } = require("../db");
const { eq } = require("drizzle-orm");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

function generateToken(userId) {
    const payload = { user: { id: userId } };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}

// @route   POST /api/auth
// @desc    Register user
// @access  Public
router.post(
    "/register",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Email format is invalid").isEmail(),
        check(
            "password",
            "Please enter a password with 6 or more characters"
        ).isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let [user] = await db
                .select()
                .from(users)
                .where(eq(users.email, email))
                .limit(1);
            if (user) {
                return res.status(400).json({ massege: "User already exists" });
            }

            [user] = await db
                .select()
                .from(users)
                .where(eq(users.name, name))
                .limit(1);
            if (user) {
                return res
                    .status(400)
                    .json({ massege: "Username is already taken" });
            }

            [user] = await db
                .insert(users)
                .values({
                    name,
                    email,
                    password: await bcrypt.hash(
                        password,
                        Number(process.env.SALT_ROUNDS)
                    ),
                })
                .returning();

            const token = generateToken(user.id);
            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ massege: "Server error" });
        }
    }
);

//@route    POST /api/auth/login
//@desc     Login user
//@access   Public
router.post(
    "/login",
    [
        check("email", "Email format is invalid").isEmail(),
        check("password", "password is required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);
        if (!user) {
            return res.status(400).json({ massege: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ massege: "Invalid credentials" });
        }

        const token = generateToken(user.id);
        res.json({ token });
    }
);

//@route    GET /api/auth/user
//@desc     Get user
//@access   Private
router.get("/user", auth, async (req, res) => {
    try {
        const [user] = await db
            .select({
                id: users.id,
                name: users.name,
                email: users.email,
            })
            .from(users)
            .where(eq(users.id, req.user.id));
        console.log(user);
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ massege: "Server error" });
    }
});

module.exports = router;
