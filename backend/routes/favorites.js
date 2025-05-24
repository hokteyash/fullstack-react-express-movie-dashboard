const express = require("express");
const router = express.Router();
// const verifyToken = require("../middleware/verifyToken");
const User = require("../models/User");

// GET: fetch user's favorites
router.get("/", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    res.json({ status_code: 200, favorites: user.favorites || [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status_code: 500, message: "Server Error" });
  }
});

// PUT: update user's favorites
router.put("/", async (req, res) => {
  const { favorites, email } = req.body;
  try {
    const updated = await User.findOneAndUpdate(
      { email: email },
      { $set: { favorites } },
      { new: true }
    );
    res.json({
      status_code: 200,
      message: "Favorites Updated Successfully",
      favorites: updated.favorites,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status_code: 500, message: "Server Error" });
  }
});

module.exports = router;