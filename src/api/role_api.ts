import { useAxios} from "@/api/index";
import type {OptionsResponse, Response} from "@/api/index";

export function roleIDListApi():Promise<Response<OptionsResponse[]>>{
    return useAxios.get("/api/roles/id")
}