interface Store{
    id: string;
    name:string;
    age:number;
    email: string;
    password:string;
}

type updatedstore = Pick<Store,'name' | 'age' | 'email' | 'password'>; 

type updatedstoreOptional = Partial<updatedstore>;

interface i1{
    name:string;
    age:number;
    email:string;
}

function ab(A:i1,B:i1){
    return (A.age + B.age);
}

function a(A:updatedstoreOptional,B:updatedstoreOptional){
    const aage = A.age??0;
    const bage = B.age??0;
    return (aage+bage);
}

let ans:number = ab({name:"sahil",age:22,email:"a@gmail.com"},{name:"neha",age:26, email: "a@gmail.com"});
console.log(ans);


type users = Record<string,{name:string, age:number}>;

const obj : users={
    "abc":{
        name:"Sahil",
        age:22
    },
    "bcd":{
        name:"Guddy",
        age:13
    }
}

interface user{
    name:string;
    age:number;
}

const users = new Map<string,user>();
users.set("sahil",{name:"sahil",age:22});
users.set("srijan",{name:"sahil",age:13});

console.log(users.get("sahil")?.age); // ? mark is to avoid runtime error(it check if users has a key as "sahil" if sahil was not there then users.get("sahil").age will give runtime error. "?" will then give undefind if sahil was not present).


type events = 'click'| 'mousemove' | 'scroll';
type exclueEvent = Exclude<events,'scroll'>

const handleEvents = (event:exclueEvent)=>{
    console.log(`handeling event ${event}`);
}

handleEvents('click'); //we cant put "scroll" here .

