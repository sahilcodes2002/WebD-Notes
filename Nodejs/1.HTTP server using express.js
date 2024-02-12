
const express=require("express");
const bodyparser=require("body-parser");

const app=express();
const port=process.env.PORT||3000;  //process.env.PORT is a way to access environment variable
app.use(bodyparser.json());

app.post("/conversation",function(req,res){
    console.log(req.query.message);//reads what is after url :?message=123
    console.log(req.body.message);//reads message in body
    res.send({
        mes:"2+2 is 4"
    })
})

app.get("/conversation",function(req,res){
    res.send("<p>hi this is a test message</p>")
})

app.listen(port,function(){
    console.log(`example: listening to ${port}`);
})
