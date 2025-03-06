const express = require("express");
const router = express.Router();
const db = require("../connection");

// ✅ Get all shows
router.get("/", (req, res) => {
  db.query("SELECT * FROM Shows", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Get a specific show by ID
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM Shows WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Show not found!" });
    res.json(results[0]);
  });
});

// ✅ Add a new show
router.post("/", (req, res) => {
  const { movie_id, cinema_hall_id, show_time, ticket_price } = req.body;
  if (!movie_id || !cinema_hall_id || !show_time || !ticket_price) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  db.query(
    "INSERT INTO Shows (movie_id, cinema_hall_id, show_time, ticket_price) VALUES (?, ?, ?, ?)",
    [movie_id, cinema_hall_id, show_time, ticket_price],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, message: "Show added successfully!" });
    }
  );
});

// ✅ Update a show
router.put("/:id", (req, res) => {
  const { movie_id, cinema_hall_id, show_time, ticket_price } = req.body;
  
  db.query(
    "UPDATE Shows SET movie_id = ?, cinema_hall_id = ?, show_time = ?, ticket_price = ? WHERE id = ?",
    [movie_id, cinema_hall_id, show_time, ticket_price, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Show not found!" });
      res.json({ message: "Show updated successfully!" });
    }
  );
});

// ✅ Delete a show
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM Shows WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Show not found!" });
    res.json({ message: "Show deleted successfully!" });
  });
});

module.exports = router;
