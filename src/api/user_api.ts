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
    readonly userName: string
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

export function userListApi(params: Params): Promise<ListResponse<userItem>> {
    return useAxios.get("/api/users", {params})
}


export interface userCreateRequest {
    nickName?: string
    password: string
    roleID?: number
    userName: string
    rePassword: string
}

export function userCreateApi(data: userCreateRequest): Promise<Response<string>> {
    return useAxios.post("/api/users", data)
}

export interface userUpdateRequest {
    id: number
    nickName?: string
    password?: string
    roleID?: number
}

export function userUpdateApi(data: userUpdateRequest): Promise<Response<string>> {
    return useAxios.put("/api/users", data)
}