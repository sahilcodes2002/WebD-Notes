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
    connectionString: "postgresql://postgres:password@localhost:5432/postgres"
});
client.connect(err => {
    if (err) {
        console.log("error in connecting to DB");
    }
    else {
        console.log("connections succesfull");
    }
});
function q() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield client.query(`create table users(
            id serial primary key,
            username varchar(50) unique not null,
            email varchar(255) unique not null,
            password varchar(255) unique not null,
            created_at timestamp with time zone default current_timestamp
            );`);
            console.log(res);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            client.end();
        }
    });
}
function qinsert() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield client.query(`insert into users(
            username ,
            email ,
            password)
            values($1, $2, $3) RETURNING *;`, ["sahil", "s@gmail.com", "12345678"]);
            console.log(res);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            client.end();
        }
    });
}
function addresscreate() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield client.query(`create table address(
            id serial primary key,
            user_id integer not null,
            city varchar(50) not null,
            state varchar(255) not null,
            street varchar(255) not null,
            created_at timestamp with time zone default current_timestamp,
            foreign key (user_id) references users(id) on delete cascade
            );`);
            console.log(res);
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
            const insertQuerry = `insert into address(user_id, city, state, street)
        values($1,$2,$3,$4);`;
            const res = yield client.query(insertQuerry, [1, "delhi", "delhi", "s1"]);
            console.log(res);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            client.end();
        }
    });
}
function join() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const joinQuerry = `select u.id, u.username, u.email, a.city, a.state, a.street
        from users u
        join address a on u.id=a.user_id
        where u.id='1';`;
            const res = yield client.query(joinQuerry);
            console.log(res);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            client.end();
        }
    });
}
//addresscreate();
join();
