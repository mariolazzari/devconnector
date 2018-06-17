const router = require("express").Router();

// @route   GET api/profile/test
// @desc    Testing profile route
// @access  Public
router.get("/test", (req, res) => {
    res.json({ msg: "Testing profile route" });
});

module.exports = router;
