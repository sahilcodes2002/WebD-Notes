import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

async function insertUser(username:string, password:string, firstName: string, lastName:string, email:string) {
    const res = await prisma.user.create({
        data:{
            username,
            password,
            firstName,
            lastName,
            email
        }
    })

    console.log(res);
}

interface updateParams{
    firstName: string;
    lastName: string;
}

async function updataUser(username:string, {
    firstName,
    lastName
}:updateParams){
    const res = await prisma.user.update({
        where:{username},
        data:{
            firstName,
            lastName
        }
    })

    console.log(res);
}


async function getUserDetails(username:string) {
    const res = await prisma.user.findFirst({
        where:{
            username
        }
    })
    console.log(res);
}

async function addTodos(title: string, description:string, User_id:number) {
    const res = await prisma.todos.create({
        data:{
            title,
            description,
            User_id
        }
    })

    console.log(res);
}

async function getTodosgivenUser(username:string) {
    const res = await prisma.user.findMany({
        where:{
            username
        },
        select:{
            firstName:true,
            lastName:true,
            todos:true
        }
    })
    console.log(res);
}

async function  getUserandTodos(id:number) {
    const res = await prisma.todos.findMany({
        where:{
            User_id:id
        },
        select:{
            title:true,
            description:true,
            user:true
        }
    })
    console.log(res);
}


//insertUser("sahil","1234556","sahil","sinha","sahil@gmail.com");

// updataUser("sahil",{
//     firstName:"sahil ks",
//     lastName:"sinha ji"
// })

//getUserDetails("sahil");

//addTodos("DSA","Codeforces",1);

getUserandTodos(1);