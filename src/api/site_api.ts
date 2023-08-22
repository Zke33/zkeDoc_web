import {useAxios} from "@/api/index";
import type {Response} from "@/api/index";

export interface siteType {
    abstract: string
    content: string
    footer?: string
    href?: string
    icon: string
    iconHref: string
    title: string
}


// 获取站点信息
export function siteApi(): Promise<Response<siteType>> {
    return useAxios.get("/api/site")
}

// 更新站点信息
export function siteUpdateApi(data: siteType): Promise<Response<string>> {
    return useAxios.put("/api/site", data)
}