import {mock, Random} from "mockjs";

mock(/api\/images/, {
    "code": 0,
    "msg": "成功",
    "data": {
        "count": 20,
        "list|20": [
            {
                "id|+1": 1,
                createdAt: "@dateTime",
                fileName: Random.pick(["xxxx.png", "yyyy.png"]),
                "size|5673-128454": 0,
                path: Random.image("200x100"),
                webPath: Random.image("200x100"),
                nickName: "@cname",
            }
        ]
    }
})

mock(/api\/image/, {
    "code": 0,
    "data": "https://docs.fengfengzhidao.com/static/avatar/zzf-1.png",
    "msg": "上传成功",
})