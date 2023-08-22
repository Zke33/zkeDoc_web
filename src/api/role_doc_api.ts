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
    sort: number
}

export function roleDocTreeUpdateApi(roleID: number, docList: roleDocUpdateItem[]): Promise<Response<string>> {
    return useAxios.put("/api/role_docs", {
        roleID,
        docList,
    })
}
