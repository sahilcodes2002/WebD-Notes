const express=require("express");
const jwt=require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword="1234";
const app=express();


app.use(express.json());


mongoose.connect(
  "mongodb+srv://codessahil:PvxGwLdbxpwarmlR@cluster0.vkpiqoz.mongodb.net/user_app"
  );


  
const User= mongoose.model("NewTable",{
  name:String,
  username:String,
  password:String
})



async function newUser(username){
  const exist= await User.findOne({
    username:username
  })
  console.log(exist);
  return !exist;
}

function generateToken(username){
  let token= jwt.sign({username:username},jwtPassword);
  return token;
}




app.post("/signup",async function(req,res){
  const name=req.body.name;
  const username=req.body.username;
  const password=req.body.password;

  console.log(username);

  if(await newUser(username)){
    console.log(username)
    const user=new User({
      name:name,
      username:username,
      password:password
    })
    user.save().then(function(){
      res.json({
        message:"Sign up completed"
      })
    })
  }
  else{
    res.status(403).send("username already exists");
  }
})

app.post("/signin",async function(req,res){
  const username=req.body.username;
  const password=req.body.password;
  console.log(username);
  console.log(password);
  if(!(await newUser(username,password))){
    const token=generateToken(username)
    res.send({
      token,
    })
  }
  else{
    res.status(411).send("wrong credentials !!")
  }
})

app.get("/users",async function(req,res){
  var token=req.headers.authorization;
  try{
    const decoded= jwt.verify(token,jwtPassword);
    const username=decoded.username;
    console.log(decoded);
    const users = await User.find();
    let resultArr=users.filter(function(it){
      return (it.username!=username)
    })
    res.send({Allusers:resultArr});
  }
  catch(err){
    res.status(403).send({message:"wrong token"});
  }
})


app.listen(3000);
