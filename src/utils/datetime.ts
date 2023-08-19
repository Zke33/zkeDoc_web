import * as dayjs from "dayjs";

export function dateTimeFormat(date: string): string {
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}