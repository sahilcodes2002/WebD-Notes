import { atomFamily } from "recoil";
import { todos } from "./todos";

export const todosAtomFamily = atomFamily({
    id: "TodosAtomFamily",
    default : id=>{
        return todos.find(x=>x.id===id)
    }
})