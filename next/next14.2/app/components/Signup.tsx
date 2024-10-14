"use client"

import axios from "axios";
import { ChangeEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "../actions/user";


export function Signup(){
    const [username, setUsername] = useState("");
    const [password, setPass] = useState("");
    const router = useRouter();

    return (
        <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            Sign up
                        </div>
                    </div>
                    <div className="pt-2">
                        <LabledInput type="text" label="username" placeholder="sahil@gmail.com" onchange={(e)=>{
                            setUsername(e.target.value)
                        }}></LabledInput>
                        <LabledInput type="password" label="password" placeholder="12345678" onchange={(e)=>{
                            setPass(e.target.value)
                        }}></LabledInput>
                        <button className="mt-5 text-center bg-green-300 hover:bg-green-500 w-full rounded-md p-1" onClick={async()=>{
                            const res = await signup(username,password);
                            console.log(res);
                            router.push('/')
                        }}>Submit</button>
                    </div>
                </div>
            </a>
        </div>
    </div>

    )
}

interface labledInputType{
    type?: string;
    label: string;
    placeholder: string;
    onchange: ChangeEventHandler<HTMLInputElement>
}

function LabledInput({type, label,placeholder,onchange}: labledInputType){
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input className="border p-1" onChange={onchange} type = {type || "text"} placeholder={placeholder} required></input>
    </div>
}