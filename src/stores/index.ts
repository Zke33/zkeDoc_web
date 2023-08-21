import {defineStore} from 'pinia'
import type {themeType} from "@/type/type";
import {parseToken} from "@/utils/jwt";
import type {siteType} from "@/api/site_api";
import {siteApi} from "@/api/site_api";

export interface userInfoType {
    exp: number // 过期时间
    iss: string
    nickName: string // 昵称
    roleID: number// 角色id
    userID: number // 用户id
    userName: string // 用户名
    token: string
}

const userInfo: userInfoType = {
    exp: 0,
    iss: "",
    nickName: "",
    roleID: 2,
    userID: 0,
    userName: "",
    token: ""
}

const site: siteType = {
    abstract: "",
    content: "",
    icon: "",
    iconHref: "",
    title: "",
}

export const useStore = defineStore('useStore', {
    state() {
        return {
            theme: "", // 主题
            userInfo: userInfo,
            site: site,
        }
    },
    actions: {
        setTheme(val: themeType) {
            this.theme = val
        },

        setToken(token: string) {
            this.userInfo = parseToken(token)
            this.userInfo.token = token
            // 持久化
            localStorage.setItem("userInfo", JSON.stringify(this.userInfo))
        },
        loadToken() {
            const val: string | null = localStorage.getItem("userInfo")
            if (val === null) {
                return
            }
            let payload = userInfo
            try {
                payload = JSON.parse(val)
            } catch (e) {
                console.log(e)
                return;
            }
            this.userInfo = payload
        },
        clearToken(){
            localStorage.removeItem("userInfo")
            this.userInfo = userInfo
        },
        async getSiteData(){
            let res = await siteApi()
            Object.assign(this.site, res.data)
        }
    },
    getters: {
        // 是否登录
        isLogin(): boolean {
            return this.userInfo.userID !== 0
        },
        isAdmin(): boolean{
            return this.userInfo.roleID === 1
        }
    }
})
