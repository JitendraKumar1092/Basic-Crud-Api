const bodyParser = require("../util/body-parser");
const writeInFile = require("../util/writeFile");
const crypto = require("crypto");
module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      let body = await bodyParser(req);
      body.id = crypto.randomUUID();
      req.movies.push(body);
      writeInFile(req.movies);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end();
      console.log("Request received : ", body);
    } catch (err) {
      console.log(err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation failed",
          message: "Request body is not correct",
        })
      );
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ title: " not found", message: "Route not found" })
    );
  }
};
