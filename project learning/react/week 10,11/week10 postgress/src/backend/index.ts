import {Client} from 'pg'

const client =  new Client({
    connectionString: "postgresql://postgres:postgres@localhost:5432/postgres"
})




async function createUsersTable(){
    await client.connect();
    const result = await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `)
    console.log(result);
}

async function insertData() {
    try{
        await client.connect();
        const result = await client.query(`
            INSERT into users (username, email, password)
            values ('sahil4sinha1', 'sahils4@1gmail.com', '212s445670');
        `);
        console.log(result);
    }catch(err){
        console.log(err);
    }finally{
        await client.end();
    }

}

async function insert2(){
    try{
        await client.connect();
        const queryInsert = "insert into users (username, email, password) values($1, $2, $3);"
        const values=["newUser", "new@gmail.com", "12345674"];
        const result = await client.query(queryInsert,values);
        console.log(result);
    }catch(err){
        console.error(err);
    }finally{
        client.end();
    }
}

async function getUserbyEmail(email:string){
    try{
        await client.connect();
        const newQuerry = `select * from users where email = $1`;
        const result = await client.query(newQuerry,[email]);
        if(result.rows.length>0){
            console.log(result.rows[0]);
        }else{
            console.log("no users found");
        }
    }catch(err){
        console.error(err);
    }finally{
        client.end();
    }
}

async function createAddressTable(){
    try{
        await client.connect();
        const result  = await client.query(`create table address(
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            city VARCHAR(100) NOT NULL,
            country VARCHAR(100) NOT NULL,
            street VARCHAR(100) NOT NULL, 
            pincode VARCHAR(20) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) on DELETE CASCADE      
            )`);

            console.log(result);
    }catch(err){
        console.error(err);
    }finally{
        client.end();
    }
}

async function insertAddress(){
    try{
        await client.connect();
        const insertQuerry = `insert into address(user_id, city, country, street, pincode)
        values($1, $2, $3, $4, $5)    
        `
        const values = ["3","delhi","india","xyz","201010"];
        const result = await client.query(insertQuerry,values);
        console.log(result);
    }catch(err){
        console.error(err);
    }finally{
        client.end();
    }
}

async function getAddressbyId(id:string) {
    try{
        await client.connect();
        const queryget = `select city, country, street, pincode
        from address
        where user_id=$1;`
        const result = await client.query(queryget,[id]);
        console.log(result);
    }catch(err){
        console.error(err);
    }finally{
        client.end();
    }
}

async function getAllData(id:string){
    try{
        await client.connect();
        const newQuerry = `select u.username, u.email, a.city, a.country, a.street, a.pincode 
            from users u
            join address a on u.id = a.user_id
            where u.id = $1;`
        const result = await client.query(newQuerry, [id]);
        console.log(result);
    }catch(err){
        console.error(err);
    }finally{
        client.end();
    }
}
//createUsersTable();
//insert2();
//insertData();
//getUserbyEmail("sahil@gmail.com");
//createAddressTable();
//insertAddress();
//getAddressbyId("3");
getAllData("3");