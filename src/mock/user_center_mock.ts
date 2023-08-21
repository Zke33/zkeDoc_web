import {mock} from "mockjs";

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
