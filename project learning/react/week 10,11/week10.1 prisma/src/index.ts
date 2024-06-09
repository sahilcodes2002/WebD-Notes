import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function insertFunction(username:string, password:string, firstname:string, lastname:string ) {
    try{
        const res = await prisma.user.create({
            data: {
                email: username,
                password,
                firstname,
                lastname
            },
            select: {
                id: true,
                email: true,
                firstname: true
            }
        })
        console.log(res);
    }catch(err){
        console.error(err);
    }
}



interface updateParams{
    firstname: string
    lastname: string
}


async function updateInfo(username:string, {
    firstname,
    lastname
}:updateParams){
    try{
        const res = await prisma.user.update({
            where: {
                email : username
            },
            data:{
                firstname,
                lastname
            }
        })

        console.log(res);
    }catch(err){
        console.error(err);
    }
}


async function deleteROw(username:string) {
    try{
        const res = await prisma.user.delete({
            where: {
                email: username
            }
        })

        console.log(res);
    }catch(err){
        console.log(err);
    }
}

async function getDetails(username:string) {
    try{
        const res = await prisma.user.findUnique({
            where: {
                email: username
            }
        })
    }catch(err){
        console.error(err);
    }
}

//insertFunction("sahil2@gmail.com","12345657", "sahil", "sinha");
// updateInfo("sahil1@gmail.com", {
//     firstname: "Sahil Kumar",
//     lastname: "Sinha"
// })

//deleteROw("sahil1@gmail.com");