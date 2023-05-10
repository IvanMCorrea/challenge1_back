require("dotenv").config();
require("./database/index");
const express = require("express");
const cors = require("cors");
const path = require("path");
const initAgenda = require(path.join(__dirname, "agenda", "agenda.init.js"));
const app = express();

app.use(cors());
app.use(express.json());
/* app.use("/storage", express.static("storage")); */
app.use("/api", require("./routes"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

initAgenda();
