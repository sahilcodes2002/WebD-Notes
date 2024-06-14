import {Client} from 'pg'

const connectionString : string  = "postgresql://postgres:password@localhost:5432/postgres"

const client = new Client({
    connectionString: connectionString
});

client.connect(err=>{
    if(err){
        console.log("connection failed")
    }else{
        console.log("connection successful")
    }
})

client.query('select now()', (err,res)=>{
    if(err){
        console.error(err);
    }else{
        console.log(res);
    }
})
