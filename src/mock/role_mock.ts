import {mock} from "mockjs";

mock(/api\/roles\/id/, {
    "code": 0,
    "msg": "成功",
    "data": [
        {label: "超级管理员", value: 1},
        {label: "测试", value: 2},
    ]
})