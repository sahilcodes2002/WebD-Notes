const express=require("express");
const app=express();
app.use(express.json());
const cors=require("cors");

// app.use((req, res, next) => {//this was doing the same job as #app.use(cors())
//     res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // Replace with your origin
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

function calcIntrest(principle,rate,time){
    const int=(principle * rate * time)/100;
    const am=principle+int;
    return({
        int:int,
        am:am
    })
}

app.use(cors());

app.get("/add",function(req,res){
    let a= parseFloat(req.query.a);
    let b= parseFloat(req.query.b);
    res.send((a+b).toString());
})

app.get("/intrest",function(req,res){
    let principle= parseFloat(req.query.p);
    let rate= parseFloat(req.query.r);
    let time= parseFloat(req.query.t);
    res.json(calcIntrest(principle,rate,time));
})



app.listen(3003);