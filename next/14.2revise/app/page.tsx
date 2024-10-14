// import { PrismaClient } from "@prisma/client";

// const client = new PrismaClient();

import client from "@/db"
import { anyuser } from "./actions/user";

async function getUserDetails() {
  try{
    const user = await client.user.findFirst();
    console.log(user);
    return {
      email:user?.email,
      password:user?.password
    }
  }catch(e){
    return {
      e
    }
  }
}
export default async function Home() {
  const userDetails = await anyuser();
  return (
    <div>
      {userDetails.email}
      {userDetails.password}
    </div>
  );
}
