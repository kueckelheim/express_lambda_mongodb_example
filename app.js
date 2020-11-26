const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  try {
    const Note = require("./models/Note");
    const notes = await Note.find({});
    notes && notes.forEach((n) => console.log(n.text));
    return res.status(200).send(
      `<!DOCTYPE html>
    <html lang="en">
  
    <head>
        <title>My Notes</title>
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
  const Note = require("./models/Note");
  const note = new Note(req.body);
  await note.save();
  return res.send("<a href=''>Refresh</a<");
});

module.exports = app;
