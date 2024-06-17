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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function insertUser(username, password, firstName, lastName, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.create({
            data: {
                username,
                password,
                firstName,
                lastName,
                email
            }
        });
        console.log(res);
    });
}
function updataUser(username_1, _a) {
    return __awaiter(this, arguments, void 0, function* (username, { firstName, lastName }) {
        const res = yield prisma.user.update({
            where: { username },
            data: {
                firstName,
                lastName
            }
        });
        console.log(res);
    });
}
function getUserDetails(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.findFirst({
            where: {
                username
            }
        });
        console.log(res);
    });
}
function addTodos(title, description, User_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.todos.create({
            data: {
                title,
                description,
                User_id
            }
        });
        console.log(res);
    });
}
function getTodosgivenUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.findMany({
            where: {
                username
            },
            select: {
                firstName: true,
                lastName: true,
                todos: true
            }
        });
        console.log(res);
    });
}
function getUserandTodos(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.todos.findMany({
            where: {
                User_id: id
            },
            select: {
                title: true,
                description: true,
                user: true
            }
        });
        console.log(res);
    });
}
//insertUser("sahil","1234556","sahil","sinha","sahil@gmail.com");
// updataUser("sahil",{
//     firstName:"sahil ks",
//     lastName:"sinha ji"
// })
//getUserDetails("sahil");
//addTodos("DSA","Codeforces",1);
getUserandTodos(1);
