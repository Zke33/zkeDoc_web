import { useAxios} from "@/api/index";
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


export function getDocDetailApi(id: number):Promise<Response<docItem>> {
    return useAxios("/api/docs/" + id.toString())
}