import axios from 'axios'
import {atom, selector} from 'recoil'

export const allAtom = atom({
    key: "allAtom",
    default: selector({
        key:"asyncValue",
        get: async()=>{
            await new Promise(r=>{setTimeout(r,3000)})//this will halt the futher process for 3sec
            const res = await axios.get("https://sum-server.100xdevs.com/notifications")
            return res.data;
        }
    })
})

