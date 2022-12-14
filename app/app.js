const http = require("http");
const fs = require("fs");
const url = require("url");
const events = require("events");
const eventEmitter = new events.EventEmitter();

const myEventHandler = () => {
  console.log("Event trigger");
}

eventEmitter.on("on", myEventHandler);

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  let q = url.parse(req.url, true);
  let filename = "." + q.pathname;

  if (filename === "./") {
    filename = "./index.html";
  }

  fs.readFile(`./view/${filename}`, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("404 Not Found");
    }

    res.setHeader("Content-Type", "text/html");
    res.statusCode = 200;
    res.write(data);
    eventEmitter.emit("on");
    res.end();
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
