// localhost:8000/products?id=100&name=iPhone // after ? is queryString
const fs = require("fs");
const http = require("http");
const url = require("url");
let products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));
const html = fs.readFileSync("./template/index.html", "utf-8");
let productHtml = fs.readFileSync("./products.html", "utf-8");
let productHtmlArray = products.map((prod) => {
  let output = productHtml.replace("{{%Image%}}", prod.productImage);
  output = output.replace("{{%NAME%}}", prod.name);
  output = output.replace("{{%ModelName%}}", prod.modelName);
  output = output.replace("{{%Size%}}", prod.size);
  output = output.replace("{{%Camera%}}", prod.camera);
  output = output.replace("{{%ModelNo%}}", prod.modelNumber);
  output = output.replace("{{%Prices%}}", prod.price);
  output = output.replace("{{%Color%}}", prod.color);
  output = output.replace("{{%ID%}}", prod.id);

  return output;
});
const server = http.createServer((req, res) => {
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
      res.end("This is a product with ID = " + query.id);
    }
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-header": "Hello World",
    });
    res.end(html.replace("{{%CONTENT%}}", "Error 404: Page Not Found"));
  }
}); // callback function executes everytime the request hits the server

//STEP 2: Start a server
server.listen(8000, "127.0.0.1", () => {
  console.log("Server has started");
});
