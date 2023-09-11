const http = require("http");
const getReq = require("./methods/getRequest");
const putReq = require("./methods/putRequest");
const postReq = require("./methods/postRequest");
const deleteReq = require("./methods/deleteRequest");
let movies = require("./dummyData/data.json");
require("dotenv").config();
const port = process.env.PORT || 5001;
const server = http.createServer((req, res) => {
  req.movies = movies;
  switch (req.method) {
    case "GET":
      getReq(req, res);
      break;
    case "POST":
      postReq(req, res);
      break;
    case "PUT":
      putReq(req, res);
      break;
    case "DELETE":
      deleteReq(req, res);
      break;
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write(
        JSON.stringify({ title: " not found", message: "Route not found" })
      );
      res.end();
  }
});
server.listen(port, () => {
  console.log(`server started on port ${port}`);
});
