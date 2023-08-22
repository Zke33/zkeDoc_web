import {useAxios} from "@/api/index";
import type {OptionsResponse, Response} from "@/api/index";

export function roleIDListApi(): Promise<Response<OptionsResponse[]>> {
    return useAxios.get("/api/roles/id")
}


export interface roleItem {
    readonly id: number
    createdAt: string
    updatedAt: string
    title: string
    pwd: string
    isSystem: boolean
    docCount: number
    userCount: number
}


export interface roleRequest {
    id?: number // 有id就是更新，没有就是创建
    pwd: string
    title: string
}

export function roleApi(data: roleRequest): Promise<Response<string>> {
    if (data.id === undefined) {
        return useAxios.post("/api/roles", data)
    }
    return useAxios.put("/api/roles", data)
}

export function roleRemoveApi(id: number) {
    return useAxios.delete("/api/roles", {data: {id}})
}