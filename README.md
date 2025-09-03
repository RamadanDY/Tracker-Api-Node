# Tracker-Api-Node
#Yakubu Ramadan
Book Tracker API Project
• Goal
Build a simple Book Tracker APl using Node.js and
Express that supports CRUD operations.
* Project Requirements
Each book should have:
- id (number)
- title (string)

- yoar. sovo, compicia. tar
Done
J;
app.get('/books', (req, res) → { res.json({ success: true, data: books });
3);
app.get(/books/:id', (req, res) => {
const id = parseInt(req.params.id);
const book = books.find(b => b.id === id);
if (.book) return res.status(404).json({ success: false, message: "Book not found" }); res json({ success: true, data: book });
7);
app.post(/books', (req, res) = 1
const { title, author, year, = req.body;
if (title | author || !year){
return res.status(400).json({ success: false, message: "All fields are required" });
const newBook = { id: books.length + 1, title, author, year,
completed: false}; books.push(newBook);
res.status(201).json({ success: true, data: newBook });
});
const PORT = 3000;
app. listen(PORT, 0 => console.log(Book Tracker API running on http://localhost:${PORT}*));
V Assignment
﻿﻿﻿Add a GET /books/completed endpoint → returns only completed books.
﻿﻿﻿Add validation so a book's year must be greater than 1900.
﻿﻿﻿Add a search feature → GET /books/search? title=atomic should return books matching the word.
﻿﻿﻿Add a createdAt field when a book is added.
﻿﻿﻿Add a PUT /books/:id endpoint → edits a book by the
ID and returns a response whether the operation was successful or not.
﻿﻿﻿Add a DELETE /books/:id endpoint → Delete's a book by the ID and returns a response whether the operation was successful or not.
﻿﻿﻿(Optional) Use SQLite instead of in-memory storage to persist data.
