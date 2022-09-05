const express = require("express");
const searchRoutes = require("./backend/routes/search");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

const cors = require("cors");

app.use(cors());

app.use(searchRoutes);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is on port", PORT);
});
