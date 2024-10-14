const express=require("express");
const jwt=require("jsonwebtoken");
const mongoose = require("mongoose");
const cors=require("cors");
const jwtPassword="1234";
const app=express();
app.use(cors());


app.use(express.json());


mongoose.connect(
  "mongodb+srv://codessahil:PvxGwLdbxpwarmlR@cluster0.vkpiqoz.mongodb.net/user_app"
  );


  
const User= mongoose.model("NewTable",{
  name:String,
  username:String,
  password:String
})

const Todos= mongoose.model("NewTable1",{
  username:String,
  todos:{
    title:String,
    description:String,
    id:Number,
    done:Boolean
  }
})

const Id= mongoose.model("NewTable2",{
  username:String,
  id:Number
})


app.post("/makeID",async function(req,res){
  const username=req.body.username;
  try{
    const idis=await Id.find({ username: username }).exec();
    if (idis.length==0){
      throw new Error('error');
    }
    else{
      res.send(idis[0]);
    }
  }
  catch(err){
    const idd=new Id({
      username:username,
      id:0
    })
  
    try{
      await idd.save();
      res.json({
      id:0
      })
    }catch(err){
      
      res.json({
      message:"problem in user.save"
      })
    }
  }
  
})


async function updateTOdoId(username,updateFields){
  try{
    //console.log(updateFields);
    const updateTodo= await Id.findOneAndUpdate(
      {username:username },
      {$set: {id:updateFields.id}},
      {new:true}
    ).exec();
    return updateTodo
  }
  catch(err){
    console.error("Update Error:", err);
    return null;
  }
}

app.post("/increaseID",async function(req,res){
  const id=req.body.id;
  const username=req.body.username;
  const idupdated= await updateTOdoId(username,{id:id});
  if(!idupdated){
    console.log("error in updating id");
  }
  else{
    res.send({id:id});
  }
})




async function newUser(username){
  const exist= await User.findOne({
    username:username
  })
  //console.log(exist);
  return !exist;
}

function generateToken(username){
  let token= jwt.sign({username:username},jwtPassword);
  return token;
}

async function newusertodo(username) {
  try {
    const todos = await Todos.find({ username: username }).exec();
    //console.log(todos); 
    return todos; 
  } catch (err) {
    console.error(err);
    return null; 
  }
}

app.post("/gettodos", async function(req, res) {
  const username = req.body.username;
  var alltodos = await newusertodo(username);
  if (!alltodos) { 
    res.send("server error");
  } else if (alltodos.length === 0) {
    res.send("does not exist");
  } else {
    const todosOnly = alltodos.map(todo => todo.todos);
    res.json({todos:todosOnly});
  }
});


app.post("/addtodos",async function(req,res){
  const username=req.body.username;
  const idd=req.body.id;
  const title=req.body.title;
  const description=req.body.description;
  const todo=new Todos({
    username:username,
    todos:{
    title:title,
    description:description,
    id:idd,
    done:false
  }
  })

  try{
    await todo.save();
    res.json({
    message:"todo added"
    })
  }catch(err){
    
    res.json({
    message:"problem in user.save"
    })
  }
  
})

async function updateTOdoByUsernameAndId(username, id, updateFields){
  try{
    //console.log(updateFields);
    const updateTodo= await Todos.findOneAndUpdate(
      {username:username , 'todos.id':id},
      {$set: {'todos.done':updateFields.done}},
      {new:true}
    ).exec();
    return updateTodo
  }
  catch(err){
    console.error("Update Error:", err);
    return null;
  }
}

app.post("/updatetodo",async function(req,res){
  const username=req.body.username;
  const id=req.body.id;
  const updateFields=req.body.updateFields;
  const updateF= await updateTOdoByUsernameAndId(username, id, updateFields);
  if(!updateF){
    res.json({message:"update got fuked"});
  }
  else{
    //console.log(updateF);
    res.json(updateF);
  }
})

async function deleteTodosByUsernameAndIds(username, id) {
  try {
    const result = await Todos.deleteMany(
      { username: username, 'todos.id':id} 
    ).exec();
    return result.deletedCount; 
  } catch (err) {
    console.error(err);
    return null; 
  }
}

app.get("/",function(req,res){
  res.send("hello");
})

app.post("/deletetodo",async function(req,res){
  const username=req.body.username;
  const id=req.body.id;
  const delcount=await deleteTodosByUsernameAndIds(username,id);
  if(!delcount){
    res.json({message:"not deleted"});
  }
  else{
    res.json({deletedCount:delcount});
  }
})

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