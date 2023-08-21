import {mock} from "mockjs";

mock(/api\/site/, {
    "code": 0,
    "msg": "成功",
    "data": {
        abstract: "@paragraph(1, 2)",
        content: "欢迎光临",
        icon: "https://docs.fengfengzhidao.com/static/avatar/zzf-1.png",
        iconHref: "<img src=\"https://img.shields.io/badge/fengfengdoc-2.0.1-red\"><img src=\"https://img.shields.io/badge/%E6%9E%AB%E6%9E%AB%E7%9F%A5%E9%81%93-6.0.2-brightgreen\">",
        title: "@title",
    }
})