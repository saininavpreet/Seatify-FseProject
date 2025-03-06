const express = require("express");
const router = express.Router();
const db = require("../connection");

// Get all bookings
router.get("/", (req, res) => {
  db.query("SELECT * FROM Bookings", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get a specific booking by ID
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM Bookings WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// Create a new booking
router.post("/", (req, res) => {
  const { user_id, show_id, total_price } = req.body;
  db.query(
    "INSERT INTO Bookings (user_id, show_id, total_price) VALUES (?, ?, ?)",
    [user_id, show_id, total_price],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, message: "Booking created successfully!" });
    }
  );
});

module.exports = router;
