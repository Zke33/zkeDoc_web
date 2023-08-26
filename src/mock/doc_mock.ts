import {mock} from "mockjs";

mock(/api\/docs\/\d+/, {
    "code": 0,
    "data": {
        "collCount|10-299": 1,
        content: "@ctitle",
        createdAt: "@dataTime",
        "diggCount|10-299": 1,
        isColl: "@boolean",
        isPwd: "@boolean",
        isSee: "@boolean",
        "lookCount|10-299": 1,
        title: "@ctitle",
    },
    "msg": "成功"
})