const express = require("express");
const router = express.Router();
const db = require("../connection");

// Get all movies
router.get("/", (req, res) => {
  db.query("SELECT * FROM Movies", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get movie by ID
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM Movies WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// Create a new movie
router.post("/", (req, res) => {
  const { title, description, duration, language, genre, release_date } = req.body;
  db.query(
    "INSERT INTO Movies (title, description, duration, language, genre, release_date) VALUES (?, ?, ?, ?, ?, ?)",
    [title, description, duration, language, genre, release_date],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, message: "Movie added successfully!" });
    }
  );
});

module.exports = router;
