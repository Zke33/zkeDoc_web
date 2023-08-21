import dayjs from "dayjs";
// 引入中文语言包
import 'dayjs/locale/zh-cn'
import rTime from 'dayjs/plugin/relativeTime'
// 使用中文语言包。固定格式
dayjs.locale('zh-cn')

// 使用插件。固定格式dayjs.extend(插件)
dayjs.extend(rTime)



export function dateTimeFormat(date: string): string {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

export function dateFormat(date: string): string {
    return dayjs(date).format('YYYY-MM-DD')
}

// 相对当前时间
export function relativeToCurrentTime(date: string){
    return dayjs(date).fromNow()
}
