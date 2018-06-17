const router = require("express").Router();

// @route   GET api/posts/test
// @desc    Testing posts routing
// @access  Public
router.get("/test", (req, res) => {
    res.json({ msg: "Testing posts routing" });
});

module.exports = router;
