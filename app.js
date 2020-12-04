const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  try {
    const Note = require("./models/Note");
    const notes = await Note.find({});
    return res.status(200).send(
      `<!DOCTYPE html>
      <html lang="en">
      
      <head>
          <title>My Notes</title>
          <style>
              html {
                  text-align: center;
                  background-color: #93c5fd;
                  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                  color: white;
                  font-size: 2rem;
              }
      
              textarea {
                  resize: none;
                  border: 2px solid #9ca3af;
                  border-radius: 4px;
                  background-color: #f3f4f6;
                  padding: 0.5rem;
                  width: 90%;
              }
      
              button {
                  padding-left: 2rem;
                  padding-right: 2rem;
                  padding-top: 7px;
                  padding-bottom: 7px;
                  background-color: #f3f4f6;
                  border: 2px solid #9ca3af;
                  color: #4b5563;
                  border-radius: 4px;
              }
      
              p {
                  border-bottom: 2px solid;
                  padding: 1rem;
                  text-align: left;
              }
          </style>
      </head>
      
      <body>
      
          <h1>My Notes</h1>
      
          <form method="POST">
              <textarea required name="text" rows="5" cols="50" placeholder="Create a new note"></textarea>
              <button type="submit">Save</button>
          </form>
      
          ${notes.map((n) => `<p>${n.text}</p>`).join("")}
      
      </body>
      
      </html>`
    );
  } catch (e) {
    console.error(e);
    return res.send(e);
  }
});

app.post("/", async (req, res) => {
  try {
    const Note = require("./models/Note");
    const note = new Note(req.body);
    await note.save();
    return res.send("Note saved. <a href=''>Refresh</a>");
  } catch (e) {
    return res.send(e);
  }
});

module.exports = app;
