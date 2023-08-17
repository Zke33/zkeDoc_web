import {useAxios} from "@/api/index";

export function loginApi(data:any){
    return useAxios.post("/api/login", data)
}