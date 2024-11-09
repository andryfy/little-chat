// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Connexion à MongoDB
mongoose
  .connect("mongodb://localhost:27017/messenger", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));
//Utiliser les routes
app.use("/api", routes);
// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
