const router = require("express").Router();

// @route   GET api/posts/test
// @desc    Testing users routing
// @access  Public

router.get("/test", (req, res) => {
    res.json({ msg: "Testing users route" });
});

module.exports = router;
