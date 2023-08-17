import {logoutApi} from "@/api/user_api";
import {useStore} from "@/stores";
import {Message} from "@arco-design/web-vue";

export function logout() {
    logoutApi()

    const store = useStore()
    store.clearToken()

    // 清除tabs的数据
    localStorage.removeItem("tabList")

    Message.success("注销成功")
}