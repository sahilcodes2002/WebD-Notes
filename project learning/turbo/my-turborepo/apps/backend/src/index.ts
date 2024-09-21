import express from 'express'
import {url} from '@repo/common/config'
import {newschema} from '@repo/common/config'
const app = express();


console.log(url);

app.get('/', (req,res)=>{
    //const body = req.body;
    //const check = newschema.safeParse(body);
    const databse = url;
    return res.json({
        message:"hiiii",
        databse
    })
})
app.post('/', (req,res)=>{
    const databse = url;
    return res.json({
        message:"hiiii",
        databse
    })
})

app.listen(3003);