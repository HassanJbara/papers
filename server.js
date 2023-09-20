const express = require("express");
const serveStatic = require("serve-static");
const compression = require("compression");
const path = require("path");
const app = express();

app.use(compression()); // <-- use the library

app.use("/", serveStatic(path.join(__dirname, "/dist")));

app.get(/.*/, function(req, res) {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

const port = process.env.PORT || 80;
app.listen(port);
console.log(`app is listening on port: ${port}`);