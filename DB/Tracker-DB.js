const sqlite3 = require("sqlite3").verbose();

// Create a database (file will be created if it doesn’t exist)
const db = new sqlite3.Database("./books.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

// Create table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    year INTEGER NOT NULL,
    completed BOOLEAN DEFAULT 0,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;
