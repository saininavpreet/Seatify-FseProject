// require("dotenv").config();
// console.log("Loaded PORT from env:", process.env.PORT);

// const connection = require("./connection");
// const express = require("express");
// const app = express(); // ✅ define app FIRST

// app.use(express.json()); // ✅ then use middleware

// const PORT = process.env.PORT || 5000;


// // Fetch all bookings
// app.get("/", (req, res) => {
//   connection.query("SELECT * FROM Bookings", (err, result) => {
//     if (err) {
//       return res.status(400).json({ msg: "Error in SQL" });
//     } else {
//       return res.status(200).json({ msg: result });
//     }
//   });
// });

// // Fetch all users
// app.get("/users", (req, res) => {
//   connection.query("SELECT id, name, email, phone, role, created_at FROM Users", (err, results) =>  {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// });

// // Fetch a user by ID
// app.get("/users/:id", (req, res) => {
//   connection.query("SELECT * FROM Users WHERE id = ?", [req.params.id], (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results[0]);
//   });
// });

// // Insert a new user
// app.post("/users", (req, res) => {
//   const { name, email, password, phone, role } = req.body;
//   connection.query(
//     "INSERT INTO Users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
//     [name, email, password, phone, role],
//     (err, result) => {
//       if (err) return res.status(500).json({ error: err.message });
//       res.json({ id: result.insertId, message: "User created successfully!" });
//     }
//   );
// });

// // Fetch all cinemas
// app.get("/cinemas", (req, res) => {
//   connection.query("SELECT * FROM Cinemas", (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(result);
//   });
// });

// // Fetch a cinema by ID
// app.get("/cinemas/:id", (req, res) => {
//   connection.query("SELECT * FROM Cinemas WHERE id = ?", [req.params.id], (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });
//     if (result.length === 0) return res.status(404).json({ message: "Cinema not found!" });
//     res.json(result[0]);
//   });
// });


// // Fetch a single booking by ID
// app.get("/:id", (req, res) => {
//   let id = req.params.id;
//   connection.query("SELECT * FROM Bookings WHERE id = ?", [id], (err, result) => {
//     if (err) {
//       return res.status(400).json({ msg: "Error in SQL" });
//     } else {
//       return res.status(200).json({ msg: result });
//     }
//   });
// });

// // Insert a new booking
// app.post("/", (req, res) => {
//   let body = req.body;
//   if (!body.user_id || !body.show_id || !body.total_price) {
//     return res.status(404).json({ msg: "Mandatory field is missing." });
//   }
//   connection.query(
//     `INSERT INTO Bookings (user_id, show_id, total_price) VALUES (?, ?, ?)`,
//     [body.user_id, body.show_id, body.total_price],
//     (error, result) => {
//       if (error) {
//         return res.status(404).json({ msg: error });
//       } else {
//         return res.status(200).json({ msg: "Booking created successfully!" });
//       }
//     }
//   );
// });

// // Delete a Booking
// app.delete("/:id", (req, res) => {
//   let id = req.params.id;
//   connection.query("DELETE FROM Bookings WHERE id = ?", [id], (err, result) => {
//     if (err) {
//       return res.status(400).json({ msg: "Error in SQL" });
//     } else {
//       return res.status(200).json({ msg: "Booking deleted successfully." });
//     }
//   });
// });

// // Update a booking partially
// app.patch("/", (req, res) => {
//   let body = req.body;
//   let id = body.id;
//   if (!body.user_id || !body.show_id || !body.total_price) {
//     return res.status(404).json({ msg: "Mandatory field is missing!" });
//   }
//   connection.query(
//     `UPDATE Bookings SET user_id = ?, show_id = ?, total_price = ? WHERE id = ?`,
//     [body.user_id, body.show_id, body.total_price, id],
//     (err, result) => {
//       if (err) {
//         return res.status(400).json({ msg: err });
//       } else {
//         return res.status(200).json({ msg: "Booking updated successfully" });
//       }
//     }
//   );
// });




// app.listen(PORT, () => {
//   console.log(`App is running on port ${PORT}`);
// });


// module.exports = app;



require("dotenv").config(); // ✅ Load env first
console.log("Loaded PORT from env:", process.env.PORT);

const express = require("express");
const app = express();
const connection = require("./connection");

// Middleware
app.use(express.json());

const PORT = process.env.PORT || 5000; // ✅ Read from .env

// Simple route for test
app.get("/", (req, res) => {
  connection.query("SELECT * FROM Bookings", (err, result) => {
    if (err) {
      return res.status(400).json({ msg: "Error in SQL" });
    } else {
      return res.status(200).json({ msg: result });
    }
  });
});

// Connect to DB
connection.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  }
  console.log("✅ Database Connected Successfully!");

  // ✅ Start server *after* DB connects
  app.listen(PORT, () => {
    console.log(`🚀 App is running on port ${PORT}`);
  });
});
