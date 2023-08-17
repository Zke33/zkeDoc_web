import {defineStore} from 'pinia'
import type {themeType} from "@/type/type";
import {parseToken} from "@/utils/jwt";

export interface userInfoType {
    exp: number // 过期时间
    iss: string
    nickName: string // 昵称
    roleID: number// 角色id
    userID: number // 用户id
    userName: string // 用户名
}

const userInfo: userInfoType = {
    exp: 0,
    iss: "",
    nickName: "",
    roleID: 2,
    userID: 0,
    userName: "",
}

export const useStore = defineStore('useStore', {
    state() {
        return {
            theme: "", // 主题
            userInfo: userInfo,
        }
    },
    actions: {
        setTheme(val: themeType) {
            this.theme = val
        },

        setToken(token: string){
            this.userInfo = parseToken(token)
            // 持久化
            localStorage.setItem("userInfo", JSON.stringify(this.userInfo))
        },
        loadToken(){
            const  val:string|null = localStorage.getItem("userInfo")
            if (val === null){
                return
            }
            let payload = userInfo
            try {
                payload = JSON.parse(val)
            }catch (e) {
                console.log(e)
                return;
            }
            this.userInfo = payload
        }
    }
})
