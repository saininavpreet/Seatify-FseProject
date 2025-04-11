const express = require("express");
const router = express.Router();
const db = require("../connection");

// ✅ Get all cinemas
router.get("/", (req, res) => {
  db.query("SELECT * FROM Cinemas", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Get a cinema by ID
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM Cinemas WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Cinema not found!" });
    res.json(results[0]);
  });
});

// ✅ Add a new cinema
router.post("/", (req, res) => {
  const { name, location } = req.body;
  if (!name || !location) return res.status(400).json({ message: "Name and location are required!" });

  db.query(
    "INSERT INTO Cinemas (name, location) VALUES (?, ?)",
    [name, location],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, message: "Cinema added successfully!" });
    }
  );
});

// ✅ Update cinema details
router.put("/:id", (req, res) => {
  const { name, location } = req.body;
  db.query(
    "UPDATE Cinemas SET name = ?, location = ? WHERE id = ?",
    [name, location, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Cinema not found!" });
      res.json({ message: "Cinema updated successfully!" });
    }
  );
});

// ✅ Delete a cinema
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM Cinemas WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Cinema not found!" });
    res.json({ message: "Cinema deleted successfully!" });
  });
});

module.exports = router;
