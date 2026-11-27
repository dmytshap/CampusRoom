// backend/server.js
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(express.json());

// Use process.env.DB_PATH if set, otherwise default to the mounted path
// In Docker, __dirname is /app, so /app/database/room_booking.db works with the volume mount
const dbPath =
  process.env.DB_PATH || path.join(__dirname,"..", "database", "room_booking.db");

console.log(`Attempting to connect to database at: ${dbPath}`);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Get all rooms
app.get("/api/rooms", (req, res) => {
  db.all("SELECT * FROM rooms", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get all bookings (Added for testing)
app.get("/api/bookings", (req, res) => {
  db.all("SELECT * FROM bookings", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

app.get("/api/roles", (req, res) => {
  db.all("SELECT role_id, role_name FROM roles", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({error: err.message});
    } 
    
    res.json(rows);
  });
});

app.post("/api/auth/register", async (req,res) => {
  const {username, password, role_id} = req.body;

  if (!username || !password || !role_id) {
    return res.status(400).json({
      error: "Username, password and role are all required"
    });
  }

  const trimmedUsername = username.trim();

  if (trimmedUsername.length < 3) {
    return res.status(400).json({
      error: "Username must be at least 3 characters long."
    });
  }
 
  if (password.length < 3) {
    return res.status(400).json({
      error: "Password must be at least 3 characters long."
    });
  }
  const selectedRoleId = Number(role_id);

  if (!Number.isInteger(selectedRoleId)) {
    return res.status(400).json({
      error: "Invalid role."
    });
  }

  try {
    db.get(
      "SELECT role_id FROM roles WHERE role_id = ?",
      [selectedRoleId],
      async (err, role) => {
        if (err) {
          console.error(err.message);
          return res.status(500).json({ error: "Error on database side." });
        }

        if (!role) {
          return res.status(400).json({
            error: "Selected role does not exist."
          });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Insert the new user
        db.run(
          `INSERT INTO users (username, role_id, password_hash)
           VALUES (?, ?, ?)`,
          [trimmedUsername, selectedRoleId, passwordHash],
          function (err) {
            if (err) {
              if (err.message.includes("UNIQUE constraint failed")) {
                return res.status(409).json({
                  error: "Username already exists."
                });
              }

              console.error(err.message);
              return res.status(500).json({
                error: "Could not create user."
              });
            }

            res.status(201).json({
              message: "User registered successfully.",
              user_id: this.lastID,
              username: trimmedUsername,
              role_id: selectedRoleId
            });
          }
        );
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Registration failed."
    });
  }
});