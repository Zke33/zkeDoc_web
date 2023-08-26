import {mock} from "mockjs";

mock(/api\/role_docs\/info/, {
    "code": 0,
    "msg": "成功",
    "data": {
        "freeContent": "@title",
        "isPwd": "@boolean",
        "isSee": "@boolean",
        "roleDocPwd": "",
        "rolePwd": "",
    }
})


mock(/api\/role_docs\/\d+/, {
    "code": 0,
    "msg": "成功",
    "data": {
        "list|4-5": [
            {
                "children": [],
                "isPwd": "@boolean",
                "isSee": "@boolean",
                "key|+1": 1,
                "show": "@boolean",
                "title": "@ctitle",
            }
        ],
        docIDList: [1, 2, 3]
    }
})

mock(/api\/role_docs/, {
    "code": 0,
    "data": {
        "list|10": [
            {
                children: [],
                isPwd: "@boolean",
                isSee: "@boolean",
                isColl: "@boolean",
                unlock: "@boolean",
                "key|+1": 1,
                title: "@ctitle"
            }
        ]
    },
    "msg": "成功"
})
