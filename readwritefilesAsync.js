const fs = require("fs");

fs.readFile("./files/start.txt", "utf-8", (error1, data1) => {
  console.log("data1", data1);
  fs.readFile(`./files/${data1}.txt`, "utf-8", (err2, data2) => {
    console.log("data2", data2);
    fs.readFile("./files/append.txt", "utf-8", (error3, data3) => {
      console.log("data3", data3);
      fs.writeFile(
        "./files/output2.txt",
        `${data2}\n\n ${data3}\n Date created: ${new Date()}`,
        () => {
          console.log("File written successfully");
        }
      );
    });
  });
});

console.log("reading files ...");
