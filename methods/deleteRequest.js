const writeInFile = require("../util/writeFile");
module.exports = (req, res) => {
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
      req.movies.splice(index, 1);
      writeInFile(req.movies);
      res.writeHead(204, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "movie deleted" }));
    }
  }
};

