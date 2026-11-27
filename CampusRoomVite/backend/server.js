// backend/server.js
const express = require("express");
const session = require("express-session");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs");


const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || "development-secret-change-me",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24
    }
}));

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


app.post("/api/auth/login", async(req,res) => {
  const { username, password } = req.body;

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !username.trim() ||
    !password
  ) {
    return res.status(400).json({
      error: "Username and password are required."
    });
  }

  try {
    // Retrieve user info from database

    const user = await new Promise((resolve, reject) => {
      db.get('SELECT users.user_id, users.username, users.password_hash, users.role_id, roles.role_name FROM users JOIN roles ON users.role_id = roles.role_id WHERE users.username = ?',
        [username.trim()], (err, row) => {if (err) reject(err); else resolve(row);}
      );
    });

    if (!user) {
      return res.status(401).json({
        error: "Invalid username or password."
      });
    }

    // Compare password given by user with stored hash

    const passwordMatches = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        error: "Invalid username or password."
      });
    }

      // Session creation

      req.session.userId = user.user_id;

      req.session.save((err) => {
        if (err) {
          console.error("SESSION ERROR:", err);
          return res.status(500).json({
            error: "Could not create session."
          });
        }

          res.json({
            message: "Login successful.",
            user: {
              user_id: user.user_id,
              username: user.username,
              role_id: user.role_id,
              role_name: user.role_name
            }
          });
        });
      } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({
          error: "Login failed."
        });
    }
  });

// Check current session
app.get("/api/auth/me", async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({
            error: "Not authenticated."
        });
    }

    try {
        const user = await new Promise((resolve, reject) => {
            db.get(
                `SELECT users.user_id, users.username,
                        users.role_id, roles.role_name
                 FROM users
                 JOIN roles ON users.role_id = roles.role_id
                 WHERE users.user_id = ?`,
                [req.session.userId],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                }
            );
        });

        if (!user) {
            return res.status(401).json({
                error: "User no longer exists."
            });
        }

        res.json({ user });

    } catch (error) {
        console.error("SESSION CHECK ERROR:", error);

        res.status(500).json({
            error: "Could not verify session."
        });
    }
});

// Logout
app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("LOGOUT ERROR:", err);

            return res.status(500).json({
                error: "Could not log out."
            });
        }

        res.clearCookie("connect.sid");

        res.json({
            message: "Logged out successfully."
        });
    });
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



// This should be at the bottom
// This should run only after every /api/ is created.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});