import type {ListResponse, Params, Response} from "@/api/index";
import {useAxios} from "@/api/index";

export interface userCollItem {
    createdAt: string// 什么时候收藏文档的
    docID: number// 文档id
    docUpdateTime: string// 文档的更新时间
    title: string// 文档标题
    isPermission: boolean// 是否有文档的访问权限
    lookCount: number// 浏览量
    diggCount: number// 点赞量
}


// 收藏文档或者取消收藏
export function userCollApi(docID: number): Promise<Response<string>> {
    return useAxios.post("/api/user_center/user_coll", {id: docID})
}

// 用户收藏的文档列表
export function userCollListApi(params: Params): Promise<ListResponse<userCollItem>> {
    return useAxios.get("/api/user_center/user_coll", {params})
}


export interface userInfoItem {
    id: number
    createdAt: string
    updatedAt: string
    avatar: string
    nickName: string
    email: string
    ip: string
    addr: string
    roleID: number // 角色id
    lastLogin: string // 上次登录时间
    userName: string // 用户名
    role: string // 角色的名称
}

export function getUserInfoApi(): Promise<Response<userInfoItem>> {
    return useAxios.get("/api/users_info")
}

export interface updateUserInfoRequest {
    avatar?: string
    nickName?: string
}

export function updateUserInfoApi(data: updateUserInfoRequest): Promise<Response<string>> {
    return useAxios.put("/api/users_info", data)
}

export interface updateUserPasswordRequest {
    oldPwd: string
    password: string
}

export function updateUserPasswordApi(data: updateUserPasswordRequest): Promise<Response<string>> {
    return useAxios.put("/api/users_password", data)
}