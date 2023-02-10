const http = require("http");      // create a global http object to create a node if this was ("./http.js") it will look for a local file 

// // this will keep on running until proceess.exit() is written
// const server = http.createServer((req,res)=>{
//     console.log("NITISH");
//     // console.log(req);
//     // process.exit();   // this hard exits the event loop and work stops
//     console.log(req.url,req.method,req.headers);
// });

// server.listen(3000);

// response-request
const server = http.createServer((req,res)=>{
    console.log("NITISH");
    console.log(req.url,req.method,req.headers);
    res.setHeader("Content-Type","text/html");
    const url= req.url;
    if(url === "/"){
        res.write("<html>");
        res.write("<head><title>My First Page</title></head>");
        res.write("<body><h1>Hello My Node.js Server</h1></body>");
        res.write("</html>");
    }
    if(url === "/home"){
        res.write("<html>");
        res.write("<head><title>My First Page</title></head>");
        res.write("<body><h1>Welcome Home</h1></body>");
        res.write("</html>");
    }
    if(url === "/about"){
        res.write("<html>");
        res.write("<head><title>My First Page</title></head>");
        res.write("<body><h1>Welcome About</h1></body>");
        res.write("</html>");
    }
    if(url === "/node"){
        res.write("<html>");
        res.write("<head><title>My First Page</title></head>");
        res.write("<body><h1>Welcome node.js project</h1></body>");
        res.write("</html>");
    }

    
    res.end();

});

server.listen(3000);


