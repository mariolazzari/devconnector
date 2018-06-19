const router = require("express").Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// @route   GET api/users/test
// @desc    Testing users routing
// @access  Public
router.get("/test", (req, res) => {
    res.json({ msg: "Testing users route" });
});

// @route   POST api/users/register
// @desc    User registration
// @access  Public
router.post("/register", (req, res) => {
    // check user input
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json({ errors });
    }

    // check if user already exists
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                // user already exists
                errors.email = "Email address already present.";
                res.status(400).json(errors);
            } else {
                // get user avatar
                const avatar = gravatar.url(req.body.email, {
                    s: "200",
                    r: "pg",
                    d: "mm"
                });
                // register new user
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                // encrypt user password
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;

                        // save new user
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        })
        .catch(err => console.log("User registration error:", err));
});

// @route   GET api/users/logi
// @desc    User login and jwt token
// @access  Public
router.post("/login", (req, res) => {
    // validate user input
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).send(errors);
    }

    // search user by email
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                // user found: check password
                bcrypt
                    .compare(req.body.password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            // create jwt payload: user data to embed in token
                            const payload = {
                                id: user.id,
                                name: user.name,
                                avatar: user.avatar
                            };

                            jwt.sign(
                                payload,
                                keys.secretOrKey,
                                {
                                    expiresIn: 3600
                                },
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        token: "Bearer " + token
                                    });
                                }
                            );
                        } else {
                            return res
                                .status(400)
                                .json({ msg: "Invalid password" });
                        }
                    })
                    .catch(err => console.log(err));
            } else {
                errors.email = "Email not registered";
                return res.status(404).json(errors);
            }
        })
        .catch(err => console.log(err));
});

// @route   GET api/users/current
// @desc    Return current user (token owner)
// @access  Private
router.get(
    "/current",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.json({
            name: req.user.name,
            email: req.user.email,
            avatar: req.user.avatar
        });
    }
);

module.exports = router;
