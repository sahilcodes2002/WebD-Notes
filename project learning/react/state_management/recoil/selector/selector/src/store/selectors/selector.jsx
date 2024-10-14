import { selector } from "recoil";
import { countAtom } from "../atoms/countAtom";

export const countSelector = selector({
    key: "countSelector",
    get: ({get})=>{
        const count = get(countAtom);
        return count % 2
    }
});