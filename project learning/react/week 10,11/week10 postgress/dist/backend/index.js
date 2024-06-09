"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: "postgresql://postgres:postgres@localhost:5432/postgres"
});
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const result = yield client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
        console.log(result);
    });
}
function insertData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const result = yield client.query(`
            INSERT into users (username, email, password)
            values ('sahil4sinha1', 'sahils4@1gmail.com', '212s445670');
        `);
            console.log(result);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            yield client.end();
        }
    });
}
function insert2() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const queryInsert = "insert into users (username, email, password) values($1, $2, $3);";
            const values = ["newUser", "new@gmail.com", "12345674"];
            const result = yield client.query(queryInsert, values);
            console.log(result);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            client.end();
        }
    });
}
function getUserbyEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const newQuerry = `select * from users where email = $1`;
            const result = yield client.query(newQuerry, [email]);
            if (result.rows.length > 0) {
                console.log(result.rows[0]);
            }
            else {
                console.log("no users found");
            }
        }
        catch (err) {
            console.error(err);
        }
        finally {
            client.end();
        }
    });
}
function createAddressTable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const result = yield client.query(`create table address(
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
        }
        catch (err) {
            console.error(err);
        }
        finally {
            client.end();
        }
    });
}
function insertAddress() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const insertQuerry = `insert into address(user_id, city, country, street, pincode)
        values($1, $2, $3, $4, $5)    
        `;
            const values = ["3", "delhi", "india", "xyz", "201010"];
            const result = yield client.query(insertQuerry, values);
            console.log(result);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            client.end();
        }
    });
}
function getAddressbyId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const queryget = `select city, country, street, pincode
        from address
        where user_id=$1;`;
            const result = yield client.query(queryget, [id]);
            console.log(result);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            client.end();
        }
    });
}
function getAllData(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const newQuerry = `select u.username, u.email, a.city, a.country, a.street, a.pincode 
            from users u
            join address a on u.id = a.user_id
            where u.id = $1;`;
            const result = yield client.query(newQuerry, [id]);
            console.log(result);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            client.end();
        }
    });
}
//createUsersTable();
//insert2();
//insertData();
//getUserbyEmail("sahil@gmail.com");
//createAddressTable();
//insertAddress();
//getAddressbyId("3");
getAllData("3");
