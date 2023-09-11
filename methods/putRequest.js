const bodyParser = require("../util/body-parser");
const writeInFile = require("../util/writeFile");
module.exports = async (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);

  let id = req.url.split("/")[3];

  const regexv4 = new RegExp(
    "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    "i"
  );
  if (!regexv4.test(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation failed",
        message: "uuid is not correct",
      })
    );
  } else if (baseUrl === "/api/movies/" && regexv4.test(id)) {
    try {
      let body = await bodyParser(req);
      const index = req.movies.findIndex((movie) => {
        return movie.id === id;
      });
      if (index === -1) {
        res.statusCode = 404;
        res.write(
          JSON.stringify({
            title: " not found",
            message: "your movie could not be  not found",
          })
        );
        res.end();
      } else {
        req.movies[index] = { id, ...body };
        writeInFile(req.movies);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(req.movies[index]));
      }
    } catch (err) {
      console.log(err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation failed",
          message: "Request movie  is not available in the database",
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
