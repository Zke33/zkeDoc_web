import {useAxios} from "@/api/index";
import type {Response} from "@/api/index"

export interface dataSumItem {
    userCount: number
    docCount: number
    diggCount: number
    lookCount: number
}

export function dataSumApi(): Promise<Response<dataSumItem>> {
    return useAxios.get("/api/data/sum")
}