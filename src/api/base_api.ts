import type {Params} from "@/api/index";
import {useAxios} from "@/api/index";
import type {ListResponse} from "@/api/index";


export function listApi(url: string, params: Params):Promise<ListResponse>{
    return useAxios.get(url, {params})
}