const http = require("http");      // create a global http object to create a node if this was ("./http.js") it will look for a local file 

const server = http.createServer((req,res)=>{
    console.log("NITISH");
    // console.log(req);
});

server.listen(3000);