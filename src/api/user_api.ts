import {useAxios} from "@/api/index";
import type {Response} from "@/api/index";


export interface LoginRequest {
    userName :string
    password: string
}

// 登录成功之后，直接返回token
export function loginApi(data: LoginRequest): Promise<Response<string>> {
    return useAxios.post("/api/login", data)
}


export function logoutApi():Promise<Response<string>> {
    return useAxios.get("/api/logout")
}