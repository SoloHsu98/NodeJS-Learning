const fs = require("fs");
const http = require("http");
const url = require("url");
const events = require("events");

const user = require("./modules/user");
const replaceHtml = require("./modules/replaceHtml");
let products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));
const html = fs.readFileSync("./template/index.html", "utf-8");
let productHtml = fs.readFileSync("./products.html", "utf-8");
let productDetailHtml = fs.readFileSync(
  "./template/product-details.html",
  "utf-8"
);
let productHtmlArray = products.map((prod) => {
  return replaceHtml(productHtml, prod);
});
const server = http.createServer();
server.on("request", (req, res) => {
  let { query, pathname: path } = url.parse(req.url, true);
  // let path = req.url;
  if (path === "/" || path.toLocaleLowerCase() === "/home") {
    res.writeHead(200, {
      "Content-Type": "text/html", // what type of content we response
      "my-header": "Hello World",
    }); // always at top before res.end
    res.end(html.replace("{{%CONTENT%}}", "You are in home page"));
  } else if (path.toLocaleLowerCase() === "/about") {
    res.writeHead(200, {
      "Content-Type": "text/html",
      "my-header": "Hello World",
    });
    res.end(html.replace("{{%CONTENT%}}", "You are in about page"));
  } else if (path.toLocaleLowerCase() === "/contact") {
    res.writeHead(200, {
      "Content-Type": "text/html",
      "my-header": "Hello World",
    });
    res.end(html.replace("{{%CONTENT%}}", "You are in contact page"));
  } else if (path.toLocaleLowerCase() === "/products") {
    if (!query.id) {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      let productRes = html.replace(
        "{{%CONTENT%}}",
        productHtmlArray.join(",")
      );
      res.end(productRes);
    } else {
      let prod = products[query.id];
      let productDetailRes = replaceHtml(productDetailHtml, prod);
      res.end(html.replace("{{%CONTENT%}}", productDetailRes));
    }
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-header": "Hello World",
    });
    res.end(html.replace("{{%CONTENT%}}", "Error 404: Page Not Found"));
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Server has started");
});

//server obj is instance of node js event emitter class

//so event emitting & listening logic is called as Observer Pattern in JS

//Emitting & Handling Custom Events
let myEmitter = new user();

myEmitter.on("userCreated", (id, name) => {
  console.log(`A new user ${name} with ID ${id} is created`);
});

myEmitter.on("userCreated", (id, name) => {
  console.log(`A new user ${name} with ID ${id} is added to database`);
});

myEmitter.emit("userCreated", 1, "Solo");
