// import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import client from "@/db"

// const client = new PrismaClient();

export async function GET (){
    const user = await client.user.findFirst();
    return Response.json({
        email:user?.email,
        password:user?.password
    })
}
 
export async function POST(req:NextRequest){
    const body = await req.json();
    console.log(body);
   try{
        const user = await client.user.create({
            data:{
                email:body.email,
                password:body.password
            }
        })

        return NextResponse.json({
            user,
            message:"you are logged in"
        })
   }catch(e){
        return NextResponse.json({
            message:"error while signing up"
        },{
            status:411
        })
   }
    
}