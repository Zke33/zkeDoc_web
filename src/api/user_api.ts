import {useAxios} from "@/api/index";
import type {ListResponse} from "@/api/index";
import type {Params} from "@/api/index";
import type {Response} from "@/api/index";


export interface LoginRequest {
    userName: string
    password: string
}

// 登录成功之后，直接返回token
export function loginApi(data: LoginRequest): Promise<Response<string>> {
    return useAxios.post("/api/login", data)
}


export function logoutApi(): Promise<Response<string>> {
    return useAxios.get("/api/logout")
}


export interface userItem {
    readonly id: number
    createdAt: string
    updatedAt: string
    avatar: string
    nickName: string
    email: string
    ip: string
    addr: string
    roleID: number
    lastLogin: string
}

export function userListApi(params: Params):Promise<ListResponse<userItem>> {
    return useAxios.get("/api/users")
}