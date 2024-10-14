"use client"

import { signup } from "@/app/actions/user";
import { useState } from "react"
import { useRouter } from "next/navigation";

export function Signup(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    return <div>
        <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <div className="flex flex-col mb-2">
                    <input onChange={(e)=>{
                        setEmail(e.target.value);
                    }} className="p-1 rounded bg-slate-300 mb-2" type="text" placeholder="email"></input>
                    <input onChange={(e)=>{
                        setPassword(e.target.value);
                    }} className="p-1 rounded bg-slate-300 mb-2" type="password" placeholder="password"></input>
                    <div className="flex justify-center w-full">
                    <button className="bg-blue-600 rounded p-1" onClick={async()=>{
                        await signup(email,password);
                        router.push("/");
                    }}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}