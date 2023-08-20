import dayjs from "dayjs";

export function dateTimeFormat(date: string): string {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

export function dateFormat(date: string): string {
    return dayjs(date).format('YYYY-MM-DD')
}