
import { PrismaClient } from "@prisma/client";
import client from '@/db'

async function getUserDetails() {
  await new Promise((r)=>{
    setTimeout(r,2000);// to check the loading is woring properly
  }) 
  const res = await client.user.findFirst({});
  console.log(res);
  return res;
}

export default async function Home() {
  const userDetails = await getUserDetails();
  return (
    <div>
    <div className="flex flex-col justify-center h-screen">
      <div className=" flex justify-center ">
        <div className="border p-8">
          <div className="text-center">
            {userDetails?.username}
          </div>
          <div className="text-center">
            {userDetails?.password}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
