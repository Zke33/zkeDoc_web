import type {Params} from "@/api/index";
import {useAxios} from "@/api/index";
import type {ListResponse, Response} from "@/api/index";


export function listApi(url: string, params: Params): Promise<ListResponse> {
    return useAxios.get(url, {params})
}

export function deleteApi(url: string, idList: number[]): Promise<Response> {
    return useAxios.delete(url, {
        data: {
            idList
        }
    })
}