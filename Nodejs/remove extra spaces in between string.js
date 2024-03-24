// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```



const fs = require("fs");

function read_contenst() {
  return new Promise(function (resolve) {
    fs.readFile("read.txt", "utf-8", function (err, data) {
      x = data;
      console.log(x);
      x = x.replace(/\s+/g, " ");
      x = x.trim();
      resolve(x);
    });
  });
}

function write_content(content) {
  return new Promise(function (resolve) {
    fs.writeFile("read.txt", content, function () {
      resolve();
    });
  });
}

function callasynk() {
  read_contenst().then(function (content) {
    write_content(content);
  });
}

callasynk();
