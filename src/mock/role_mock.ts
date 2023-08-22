import {mock} from "mockjs";

mock(/api\/roles\/id/, {
    "code": 0,
    "msg": "成功",
    "data": [
        {label: "超级管理员", value: 1},
        {label: "测试", value: 2},
    ]
})


mock(/api\/roles/, {
    "code": 0,
    "msg": "成功",
    "data": {
        "count": 10,
        "list|10":[
            {
                "id|+1": 1,
                "createdAt": "@dateTime",
                "updatedAt": "@dateTime",
                "title": "@ctitle",
                "pwd": "1234",
                "isSystem": "@boolean",
                "docCount|10-23": 1,
                "userCount|0-5": 1,
            }
        ]
    }
})