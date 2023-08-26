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

export interface loginData {
    dateList: string[]
    countList: number[]
}

export interface dataLoginParams {
    type: number // 0 七天内 1 一个月 2 一年
}


// 0 七天内 1 一个月 2 一年
export function dataLoginList(params: dataLoginParams) :Promise<Response<loginData>>{
    return useAxios.get("/api/data/login_date", {params})
}