const http = require("http");
const host = 'http://localhost';
const port = 3001;
const stats = require('./memoriaRAM.js');

http.createServer((req, res) => {
    var url = req.url;
    if (url === "/stats") {
      res.end(JSON.stringify(stats, null, 2)); 
    } else {
      res.write("<h1>Working</h1>"); 
      res.write("<h1>Va para /stats para continuar</h1>"); 
      res.end();
    }
}).listen(port, console.log(`Server is running in ${host}:${port}`));