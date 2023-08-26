import {mock} from "mockjs";

mock(/api\/data\/sum/, {
    "code": 0,
    "data": {
        "userCount": 3,
        "docCount": 8,
        "diggCount": 0,
        "lookCount": 0
    },
    "msg": "成功"
})


mock(/api\/data\/login_date/, {
    "code": 0,
    "data": {
        "dateList": [
            "2023-08-20",
            "2023-08-21",
            "2023-08-22",
            "2023-08-23",
            "2023-08-24",
            "2023-08-25",
            "2023-08-26"
        ],
        "countList": [
            3,
            3,
            5,
            1,
            1,
            0,
            3
        ]
    },
    "msg": "成功"
})

mock(/api\/data\/look_date/, {
    "code": 0,
    "data": {
        "dateList": [
            "2023-08-20",
            "2023-08-21",
            "2023-08-22",
            "2023-08-23",
            "2023-08-24",
            "2023-08-25",
            "2023-08-26"
        ],
        "countList": [
            6,
            6,
            6,
            6,
            6,
            0,
            0
        ]
    },
    "msg": "成功"
})