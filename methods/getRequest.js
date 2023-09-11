module.exports = (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);

  let id = req.url.split("/")[3];

  const regexv4 = new RegExp(
    "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    "i"
  );
  if (req.url === "/api/movies") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(req.movies));
    res.end();
  } else if (!regexv4.test(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation failed",
        message: "uuid is not correct",
      })
    );
  } else if (baseUrl === "/api/movies/" && regexv4.test(id)) {
    res.setHeader("Content-Type", "application/json");
    let perticularMovie = req.movies.filter((movie) => {
      return movie.id === id;
    });
    if (perticularMovie.length > 0) {
      res.statusCode = 200;
      res.write(JSON.stringify(perticularMovie[0])); // Send the first matching movie
      res.end();
    } else {
      res.statusCode = 404;
      res.write(
        JSON.stringify({
          title: " not found",
          message: "your movie could not be  not found",
        })
      );
      res.end();
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ title: " not found", message: "Route not found" })
    );
  }
};
