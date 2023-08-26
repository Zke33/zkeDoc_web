import {useAxios} from "@/api/index";
import type {Response} from "@/api/index";

export interface docItem {
    collCount: number
    content: string
    createdAt: string
    diggCount: number
    isColl: boolean
    isPwd: boolean
    isSee: boolean
    lookCount: number
    title: string
}


export function getDocDetailApi(id: number): Promise<Response<docItem>> {
    return useAxios("/api/docs/" + id.toString())
}

export function docDiggApi(id: number): Promise<Response<string>> {
    return useAxios("/api/docs/digg/" + id.toString())
}


export function docPwdContent(docID: number, pwd: string): Promise<Response<docItem>> {
    return useAxios.post("/api/docs/pwd", {docID, pwd})
}


export interface docCreateItem {
    content: string
    parentID?: number
    title: string
}

export function docCreateApi(data: docCreateItem): Promise<Response<number>> {
    return useAxios.post("/api/docs", data)
}

export function removeDocApi(id: number): Promise<Response<string>> {
    return useAxios.delete("/api/docs/" + id.toString())
}
export interface docUpdateItem {
    content: string
    title: string
}

export function getEditFullContentApi(id: number): Promise<Response<docUpdateItem>> {
    return useAxios.get("/api/docs/edit/" + id.toString())
}



export function docUpdateApi(id: number, data: docUpdateItem): Promise<Response<string>> {
    return useAxios.put("/api/docs/" + id.toString(), data)
}