const express = require("express");
const router = express.Router();
const db = require("../connection");

// Get all users
router.get("/", (req, res) => {
  db.query("SELECT * FROM Users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get user by ID
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM Users WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// Create user
router.post("/", (req, res) => {
  const { name, email, password, phone, role } = req.body;
  db.query(
    "INSERT INTO Users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
    [name, email, password, phone, role],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, message: "User created successfully!" });
    }
  );
});

module.exports = router;
