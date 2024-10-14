"use server"

import client from '@/db'

export async function signup(username:string, password:string){

    try{
        await client.user.create({
            data:{
                username,
                password
            }
        })
    
        return {success:true}
    }catch(err){
        return {success:false}
    }
}