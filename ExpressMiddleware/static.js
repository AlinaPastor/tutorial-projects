// static.js
var express = require("express");
var path = require("path");
var app = express();

var publicPath = path.resolve(__dirname, "static");
app.use(express.static(publicPath)); // serve static folder

app.use(function(req, res) {
  res.status(404);
  res.send("File not found!");
});

app.listen(3000, function() {
  console.log("Web Server started on port 3000");
});
