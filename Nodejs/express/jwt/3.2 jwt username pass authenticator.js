const express=require("express");
const jwt=require("jsonwebtoken");
const jwtPassword="1234";
const app=express();
app.use(express.json());


const arr = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function verifyUser(username,password){
  for(let i=0;i<arr.length;i++){
    if(arr[i].username===username && arr[i].password===password){
      return true;
    }
  }
  return false;
}

function generateToken(username){
  let token= jwt.sign({username:username},jwtPassword);
  return token;
}

app.post("/signin",function(req,res){
  const username=req.body.username;
  const password=req.body.password;
  console.log(username);
  console.log(password);
  if(verifyUser(username,password)){
    const token=generateToken(username)
    res.send({
      token,
    })
  }
  else{
    res.status(411).send("wrong credentials !!")
  }
})

app.get("/users",function(req,res){
  var token=req.headers.authorization;
  try{
    const decoded= jwt.verify(token,jwtPassword);
    const username=decoded.username;
    console.log(decoded);
    let resultArr=arr.filter(function(it){
      return (it.username!=username)
    })
    res.send({users:resultArr});
  }
  catch(err){
    res.status(403).send({message:"wrong token"});
  }
})


app.listen(3000);
