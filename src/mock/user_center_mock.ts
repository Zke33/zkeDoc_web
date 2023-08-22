import {mock, Random} from "mockjs";

mock(/api\/user_center\/user_coll/, {
    "code": 0,
    "data": {
        "count": 10,
        "list|8-20": [
            {
                "createdAt": "@dateTime",
                "docID|+1": 1,
                "docUpdateTime": "@dateTime",
                "title": "@ctitle",
                "isPermission": "@boolean",
                "lookCount|10-3782": 1,
                "diggCount|10-189": 1,
            }
        ]
    },
    "msg": "成功"
})


mock(/api\/users_info/, {
    "code": 0,
    "data": {
        "id|5-11": 1,
        "createdAt": "@dateTime",
        "avatar": Random.image("100X100", "Adobe", "fff", "png", "Avatar"),
        "nickName": "@cname",
        "email": "@email(qq.com)",
        "addr": "@city(true)",
        "lastLogin": "@dateTime",
        "userName": "@name",
        "role": "超级管理员",
    },
    "msg": "成功"
})
