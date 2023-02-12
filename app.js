const http = require("http");      // create a global http object to create a node if this was ("./http.js") it will look for a local file 

// // this will keep on running until proceess.exit() is written
// const server = http.createServer((req,res)=>{
//     console.log("NITISH");
//     // console.log(req);
//     // process.exit();   // this hard exits the event loop and work stops
//     console.log(req.url,req.method,req.headers);
// });

// server.listen(3000);

// // response-request
// const server = http.createServer((req,res)=>{
//     console.log("NITISH");
//     console.log(req.url,req.method,req.headers);
//     res.setHeader("Content-Type","text/html");
//     const url= req.url;
//     if(url === "/"){
//         res.write("<html>");
//         res.write("<head><title>My First Page</title></head>");
//         res.write("<body><h1>Hello My Node.js Server</h1></body>");
//         res.write("</html>");
//     }
//     if(url === "/home"){
//         res.write("<html>");
//         res.write("<head><title>My First Page</title></head>");
//         res.write("<body><h1>Welcome Home</h1></body>");
//         res.write("</html>");
//     }
//     if(url === "/about"){
//         res.write("<html>");
//         res.write("<head><title>My First Page</title></head>");
//         res.write("<body><h1>Welcome About</h1></body>");
//         res.write("</html>");
//     }
//     if(url === "/node"){
//         res.write("<html>");
//         res.write("<head><title>My First Page</title></head>");
//         res.write("<body><h1>Welcome node.js project</h1></body>");
//         res.write("</html>");
//     }


//     res.end();

// });

// server.listen(3000);


// // video 9 to 13
// const fs=require("fs");

// const server = http.createServer((req,res)=>{
//     res.setHeader("Content-Type","text/html");
//     const url= req.url;
//     const method=req.method;
//     if(url === "/"){
//         fs.readFile("message.txt",{encoding:"utf-8"},(err,data)=>{
//             if(err){
//                 console.log(err);
//             }
//             console.log("data from file:"+data);
//             res.write("<html>");
//             res.write("<head><title>My First Page</title></head>");
//             res.write(`<body>${data}</body>`);
//             res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
//             res.write("</html>");
//             return res.end();
//         });
//     }
//     else if(url=== "/message" && method === 'POST'){
//         const body=[];
//         req.on("data",(chunk)=>{
//             console.log(chunk);
//             body.push(chunk);
//         });

//         return req.on("end",()=>{
//             const parsedBody=Buffer.concat(body).toString();
//             console.log(parsedBody);
//             const InputMessage=parsedBody.split("=")[1];
//             fs.writeFile("message.txt",InputMessage,(err)=>{
//                 res.statusCode=302;
//                 res.setHeader("location","/");
//                 return res.end();
//             });
//         });
//     }
//     else{
//         res.write("<html>");
//         res.write("<head><title>My First Page</title></head>");
//         res.write("<body><h1>Hello My Node.js Server</h1></body>");
//         res.write("</html>");
//         return res.end();
//     }
// });

// server.listen(3000);

// video number 15 (routes.js is created now)


const routes=require("./routes"); // will look for a js file named routes in the app.js file

// //1 export
// const server = http.createServer(routes);

//2 export
const server = http.createServer(routes.handler);
console.log(routes.someText);


server.listen(3000);