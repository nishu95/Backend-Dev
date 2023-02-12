const fs=require("fs");

const requestHandler=(req,res)=>{
    const url=req.url;
    const method=req.method;
    if(url === "/"){
        fs.readFile("message.txt",{encoding:"utf-8"},(err,data)=>{
            if(err){
                console.log(err);
            }
            console.log("data from file:"+data);
            res.write("<html>");
            res.write("<head><title>My First Page</title></head>");
            res.write(`<body>${data}</body>`);
            res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
            res.write("</html>");
            return res.end();
        });
    }
    else if(url=== "/message" && method === 'POST'){
        const body=[];
        req.on("data",(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });
    
        return req.on("end",()=>{
            const parsedBody=Buffer.concat(body).toString();
            console.log(parsedBody);
            const InputMessage=parsedBody.split("=")[1];
            fs.writeFile("message.txt",InputMessage,(err)=>{
                res.statusCode=302;
                res.setHeader("location","/");
                return res.end();
            });
        });
    }
    else{
        res.write("<html>");
        res.write("<head><title>My First Page</title></head>");
        res.write("<body><h1>Hello My Node.js Server</h1></body>");
        res.write("</html>");
        return res.end();
    }
}


// ways of exporting eventHandler
//1
// module.exports=requestHandler;

//2
// module.exports={
//     handler:requestHandler,
//     someText:"this is hard"
// };

//3
exports.handler=requestHandler;
exports.someText="this is too hard";
