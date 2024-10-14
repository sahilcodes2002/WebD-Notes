"use server"

import client from "@/db"

export async function signup(email:string,password:string){

    try{
        const user = await client.user.create({
            data:{
                email:email,
                password:password
            }
        })
        return true;
    }catch(e){
        return false;
    }
} 


export async function anyuser (){
    try{
        const user = await client.user.findFirst();
        return ({
            email:user?.email,
            password:user?.password
        })
    }catch(e){
        return ({
            email:"email",
            password:"password"
        })
    }
}