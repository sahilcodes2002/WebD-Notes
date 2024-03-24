const express=require("express");

const app=express();

const port=3001;

app.use(express.json());

let users=[{
    name:"sahil",
    kidney: [{
        healthy:false
    },{
        healthy:true
    }],
},{
    name:"Harshita",
    kidney: [{
        healthy:true
    },{
        healthy:true
    }],
}]

// app.get("/",function(req,res){
//     res.send({
//         number: users[0].kidney.length,
//         health :users[0].kidney,
//     })
// })
app.get("/",function(req,res){
    const ask=req.body.name;

    let x = users.findIndex(function(p){
        return p.name===ask;
    });
    console.log(x);

    res.send({
        name:users[x].name,
        total_kidneys:users[x].kidney.length,
        healthy_number_of_kidneys: users[x].kidney.filter(function(it){
            return it.healthy==true;
        }).length,
        health :users[x].kidney,
    })
})
app.post("/",function(req,res){
    const new_kid=req.body;
    let nn=new_kid.name;
    let x= users.findIndex(function(it){
        return it.name===nn;
    })
    users[x].kidney.push({healthy:new_kid.healthy});
    console.log(users[x].kidney);
    res.send("new kidney added");
})

app.put("/",function(req,res){
    let obj=req.body;
    let nn=obj.name;
    let x=users.findIndex(function(it){
        return it.name===nn;
    })
    console.log(x);
    for(let i=0;i<users[x].kidney.length;i++){
        if(users[x].kidney[i].healthy==false){
            users[x].kidney[i].healthy=true;
            break;
        }
    }
    console.log(users[x].kidney);
    res.send("kidney updated");
})

// app.delete("/",function(req,res){
//     const obj=req.body;
//     let n=obj.name;

//     let x=users.findIndex(function(it){
//         return it.name===n;
//     })

//     let y=users[x].kidney.findIndex(function(it){
//         return it.healthy===false;
//     })

//     if(y!=-1){
//         users[x].kidney.splice(y,1);
//     }
//     else{
//         users[x].kidney.splice(0,1);
//     }
//     console.log("kidney removed");
//     console.log(users[x].kidney);
//     res.send("kidney removed");
// })


app.delete("/",function(req,res){
    const obj=req.body;
    let n=obj.name;

    let x=users.findIndex(function(it){
        return it.name===n;
    })

    let newarr=users[x].kidney.filter(function(it){
        return it.healthy==true;
    })

    if(newarr.length===users[x].kidney.length){
        res.status(411).send("no unhealthy Kidney");
        console.log(users[x].kidney);
    }
    else{
        console.log("kidney removed");
     console.log(users[x].kidney);
     res.send("kidney removed");
    }
    users[x].kidney=newarr;


    // let y=users[x].kidney.findIndex(function(it){
    //     return it.healthy===false;
    // })

    // if(y!=-1){
    //     users[x].kidney.splice(y,1);
    // }
    // else{
    //     users[x].kidney.splice(0,1);
    // }
     
})




app.listen(port,function(){
    console.log(`listening to ${port}`);
})
