const express = require("express");
const router = express.Router();
const db = require("../connection");
const sendEmail = require("../utils/sendEmail"); // ✅ Import the email utility

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
  const { user_id, show_id, total_price, user_email } = req.body; // include email from frontend

  db.query(
    "INSERT INTO Bookings (user_id, show_id, total_price) VALUES (?, ?, ?)",
    [user_id, show_id, total_price],
    async (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      // After successful booking, send confirmation email
      const bookingId = result.insertId;

      const subject = "🎟️ Seatify Booking Confirmed!";
      const text = `Your booking (ID: ${bookingId}) has been confirmed.\nShow ID: ${show_id}\nTotal Paid: ₹${total_price}`;

      try {
        await sendEmail(user_email, subject, text);
        res.json({ id: bookingId, message: "Booking created & email sent successfully!" });
      } catch (emailErr) {
        res.json({
          id: bookingId,
          message: "Booking created, but failed to send email.",
          error: emailErr.message,
        });
      }
    }
  );
});

app.get("/api/test", (req, res) => {
  res.send("✅ Frontend and Backend are connected!");
});


module.exports = router;
