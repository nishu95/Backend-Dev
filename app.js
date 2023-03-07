//const http = require("http");      // create a global http object to create a node if this was ("./http.js") it will look for a local file 

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

// // starting with express after insalling express by this command (npm install --save express)

// const express=require('express');

// const app = express();

// // use method is used for making middlewares
// app.use((req,res,next)=>{
//     console.log("in the middleware");
//     next();  // allows the request to continue to next middleware in the line
// });

// app.use((req,res,next)=>{
//     console.log("in another middleware");
//     res.send('<h1> hello from express !</h1>');
// });

// app.listen(3000);

// // intro to middlewares topic

// const express=require('express');

// const app = express();

// const bodyParser=require('body-parser');    // installed body praser for this (npm install --save body-parser)

// // use method is used for making middlewares

// app.use(bodyParser.urlencoded({extended:false}));

// app.use('/add-product',(req,res,next)=>{
//     console.log("in add-product middleware");
//     res.send('<form action="/product" method="POST"><input type="text" name="title" placeholder="product"><input type="text" name="size" placeholder="size"><button type="submit">Add Product</button></form>');
// });

// app.post('/product',(req,res,next)=>{
//     console.log(req.body);
//     res.redirect("/");
// });

// app.use('/',(req,res,next)=>{
//     console.log("in another middleware");
//     res.send('<h1> hello from express !</h1>');
// });

// app.listen(3000);

// Routers and Filters Topic

const express=require('express');

const app = express();

const bodyParser=require('body-parser');    // installed body praser for this (npm install --save body-parser)

const adminRoutes= require('./routes/admin');
const storeRoutes= require('./routes/store');

// use method is used for making middlewares

app.use(bodyParser.urlencoded({extended:false}));

app.use('/admin',adminRoutes);

app.use(storeRoutes);

// for error links
// this below code is default for app.use('/',(req,res,next)=>{});
app.use((req,res,next)=>{   
    res.status(404).send('<h1>Page Not Found</h1>');
});

app.listen(3000);