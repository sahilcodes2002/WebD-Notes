import { selector } from "recoil";
import { allAtom} from "./atoms";

export const sumSelector = selector({
    key: "sumSelector",
    get: ({get})=>{
        const all = get(allAtom)
        
        return all.network+
        all.jobs+
        all.messaging+
        all.notifications;
    }
}) 