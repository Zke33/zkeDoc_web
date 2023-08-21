
import {useAxios} from "@/api";
import {useStore} from "@/stores";

export interface imageType {
    id: number
    createdAt: string
    userID: number
    fileName: string
    size: number // 字节
    path: string
    hash: string
    webPath: string
    nickName: string
}

export function uploadImageApi(file: File): Promise<Response<string>> {
    return new Promise((resolve, reject) => {
        const form = new FormData()
        form.set("image", file)
        const store = useStore()
        useAxios.post("/api/image", form, {
            headers: {
                token: store.userInfo.token,
                "Content-Type": "multipart/form-data"
            }
        }).then(res=>resolve(res)).catch(err=>reject(err))
    })
}