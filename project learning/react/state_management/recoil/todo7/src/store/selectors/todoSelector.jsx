import { selector, useRecoilValue } from "recoil";
import { filterKey } from "../atoms/filterKey";
import { todos } from "../atoms/todos";

export const selectedTodo = selector({
    key:"selectedTodo",
    get:({get})=>{
        const allTodo = get(todos); // Use get to access the current value of todos
        const filter = get(filterKey); // Use get to access the current value of filterKey
        const tds = allTodo.filter(todo=>todo[0].includes(filter) || todo[1].includes(filter))
        return tds;
    }
}) 