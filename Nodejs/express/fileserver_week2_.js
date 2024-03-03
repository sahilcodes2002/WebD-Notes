const express=require("express");
const port=3030;

const path = require('path');

const app=express();

app.use(express.json());

const fs=require("fs");

function readasync(name){
    return new Promise(function(resolve){
        fs.readFile(name,"utf-8",function(err,data){
            if(err){
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}

function readDirAsync(dirname){
    return new Promise(function(resolve){
        fs.readdir(dirname, function(err,files){
            if(err){
                reject(err);
                return;
            }
            resolve(files);
            
        });
    });
}

app.get("/file/:filename",function(req,res){
    let n=req.params.filename;
    let name="newdir/"+n;
    console.log(name);
    readasync(name).then(function(data){
        res.send({data});
    }).catch(function(error){
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    })
    
})

app.get("/:dirName",function(req,res){
    const dirName=req.params.dirName;
    readDirAsync(dirName).then(function(files){
        res.send({files});
    }).catch(function(err){
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    })
})



app.listen(port,function(){
    console.log(`listening to port : ${port}`);
})
