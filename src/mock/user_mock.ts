import {mock, Random} from "mockjs";
import type {MockjsRequestOptions} from "mockjs";
import type {LoginRequest} from "@/api/user_api";

mock(/api\/login/, function (options: MockjsRequestOptions) {
    const body: LoginRequest = JSON.parse(options.body)
    if (body.userName === "admin" && body.password === "1234") {
        return {
            "code": 0,
            "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrTmFtZSI6Iuaeq-aeqyIsInJvbGVJRCI6MSwidXNlcklEIjo2LCJ1c2VyTmFtZSI6ImZlbmdmZW5nIiwiZXhwIjoxNjkyMzk2MDE5LjMyNzY5MSwiaXNzIjoiZmVuZ2ZlbmcifQ.s9cMkXY-domu3cJiU_j582-x6a8dp3kcTVVSa9H047E",
            "msg": "登录成功"
        }
    }

    return {
        "code": 7,
        "data": "",
        "msg": "用户名或密码错误"
    }
})


mock("/api/logout", {
        "code": 0,
        "data": "",
        "msg": "注销成功"
    }
)


mock("/api/users", {
    "code": 0,
    "data": {
        "count": 10,
        "list|2-10": [
            {
                "addr": "@city(true)",
                "avatar": Random.image("100X100", "Adobe", "fff", "png", "Avatar"),
                "createdAt": "@dateTime",
                "email": "@email",
                "id|+1": 1,
                "ip": "@ip",
                "lastLogin": "@date",
                "nickName": "@cname",
                "roleID": 1,
                "updatedAt": "@date"
            }
        ]
    },
    "msg": "成功"
})
