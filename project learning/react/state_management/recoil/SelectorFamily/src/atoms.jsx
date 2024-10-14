import { atomFamily, selector, selectorFamily } from "recoil";
import axios from "axios";

export const todosAtomFamily = atomFamily({
    id: "todosAtomFamily",
    default : selectorFamily({
        key: "todoSelectorFamily",
        get: (id)=> async({get}) => {
            await new Promise(x=>setTimeout(x,2000));
            const res = await axios.get(`https://sum-server.100xdevs.com/todo?id=${id}`);
            throw new Error("Backend call failed")
            console.log(res.data.todo);
            return res.data.todo;
        }
    })
})