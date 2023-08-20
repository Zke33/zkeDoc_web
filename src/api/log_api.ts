import {useAxios} from "@/api/index";

export enum logLevel {
    info = 1,
    warning = 2,
    error = 3,
}

export enum logStringLevel {
    info = "info",
    warning = "warning",
    error = "error",
}

export enum logTypeEnum {
    loginType = 1,
    actionType,
    runningType
}

export interface logType {
    addr: string
    content: string
    createdAt: string
    readonly id: number
    ip: string
    level: logStringLevel  // 映射   1 info  2 warning  3  error
    readStatus: boolean
    serviceName: string
    status: boolean  // 登录的状态
    title: string
    type: logTypeEnum // 日志类型  1 登录日志  2 操作日志  3 运行日志
    updatedAt: string
    userID: number
    userName: string
}


export function logReadApi(id: number) {
    return useAxios.get("/api/logs/read", {params: {id}})
}