const express = require("express");
const { connectToDb, getDb } = require("./database");
const app = express();

let db;
connectToDb((error) => {
  if (!error) {
    app.listen(3000, () => {
      console.log("Server is running on port 3000 ");
    });
    db = getDb();
  }
});
app.get("/Books", (req, res) => {
  let info = [];
  db.collection("Books")
    .find()
    .sort({ age: 1 })
    .forEach((existingBook) => info.push(existingBook))
    .then(() => {
      res.status(200).json(info);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch data" });
    });
});
