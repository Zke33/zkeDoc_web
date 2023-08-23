import {useAxios} from "@/api/index";
import type {Response} from "@/api/index";

export interface roleDocListResponse {
    List: roleDocItem[]
    docIDList: number[]
}

export interface roleDocItem {
    children: roleDocItem[]
    isPwd: boolean
    isSee: boolean
    key: number
    show: boolean
    title: string
}

export function roleDocTreeApi(roleID: number): Promise<Response<roleDocListResponse>> {
    return useAxios.get("/api/role_docs/" + roleID)
}

export interface roleDocUpdateItem {
    docID: number
    sort?: number
}

export function roleDocTreeUpdateApi(roleID: number, docList: roleDocUpdateItem[]): Promise<Response<string>> {
    return useAxios.put("/api/role_docs", {
        roleID,
        docList,
    })
}

export function roleAddDocApi(roleID: number, docID: number): Promise<Response<string>> {
    return useAxios.post("/api/role_docs", {roleID, docID})
}



export interface roleDocConfigItem {
    freeContent: string
    isPwd: boolean
    isSee: boolean
    roleDocPwd: string
    rolePwd: string
}


export interface roleDocConfigUpdateItem extends roleDocConfigItem {
    docID: number
    roleID: number
}

export function roleDocGetConfigApi(roleID: number, docID: number): Promise<Response<roleDocConfigItem>> {
    return useAxios.get("/api/role_docs/info", {params: {roleID, docID}})
}


export function roleDocUpdateConfigApi(data: roleDocConfigUpdateItem): Promise<Response<string>> {
    return useAxios.put("/api/role_docs/info", data)
}