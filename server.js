const express = require("express");
const db = require("./DB/Tracker-DB"); // ✅ import the db setup file
const app = express();
const Port = 2039;

app.use(express.json());

// 📌 GET all books
app.get("/books", (req, res) => {
  db.all("SELECT * FROM books", [], (err, rows) => {
    if (err)
      return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data: rows });
  });
});

// 📌 GET book by ID
app.get("/books/:id", (req, res) => {
  db.get("SELECT * FROM books WHERE id = ?", [req.params.id], (err, row) => {
    if (err)
      return res.status(500).json({ success: false, message: err.message });
    if (!row)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    res.json({ success: true, data: row });
  });
});

// 📌 GET completed books
app.get("/books/completed", (req, res) => {
  db.all("SELECT * FROM books WHERE completed = 1", [], (err, rows) => {
    if (err)
      return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data: rows });
  });
});

// 📌 SEARCH books by title
app.get("/books/search", (req, res) => {
  const { title } = req.query;
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Please provide a title" });

  db.all(
    "SELECT * FROM books WHERE title LIKE ?",
    [`%${title}%`],
    (err, rows) => {
      if (err)
        return res.status(500).json({ success: false, message: err.message });
      res.json({ success: true, data: rows });
    }
  );
});

// 📌 ADD a new book
app.post("/books", (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  if (year <= 1900) {
    return res
      .status(400)
      .json({ success: false, message: "Year must be greater than 1900" });
  }

  db.run(
    "INSERT INTO books (title, author, year, completed) VALUES (?, ?, ?, 0)",
    [title, author, year],
    function (err) {
      if (err)
        return res.status(500).json({ success: false, message: err.message });
      db.get("SELECT * FROM books WHERE id = ?", [this.lastID], (err, row) => {
        if (err)
          return res.status(500).json({ success: false, message: err.message });
        res.status(201).json({ success: true, data: row });
      });
    }
  );
});

// 📌 UPDATE a book
app.put("/books/:id", (req, res) => {
  const { title, author, year, completed } = req.body;

  if (year && year <= 1900) {
    return res
      .status(400)
      .json({ success: false, message: "Year must be greater than 1900" });
  }

  db.run(
    `UPDATE books 
     SET title = COALESCE(?, title), 
         author = COALESCE(?, author), 
         year = COALESCE(?, year), 
         completed = COALESCE(?, completed) 
     WHERE id = ?`,
    [title, author, year, completed, req.params.id],
    function (err) {
      if (err)
        return res.status(500).json({ success: false, message: err.message });
      if (this.changes === 0)
        return res
          .status(404)
          .json({ success: false, message: "Book not found" });

      db.get(
        "SELECT * FROM books WHERE id = ?",
        [req.params.id],
        (err, row) => {
          if (err)
            return res
              .status(500)
              .json({ success: false, message: err.message });
          res.json({ success: true, data: row });
        }
      );
    }
  );
});

// 📌 DELETE a book
app.delete("/books/:id", (req, res) => {
  db.run("DELETE FROM books WHERE id = ?", [req.params.id], function (err) {
    if (err)
      return res.status(500).json({ success: false, message: err.message });
    if (this.changes === 0)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    res.json({ success: true, message: "Book deleted successfully" });
  });
});

app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${Port}`);
});
