import {mock} from "mockjs";
import type {MockjsRequestOptions} from "mockjs";
import queryString from 'query-string';

const content = `<div class="log_upload">
        <div class="log_upload_head">
            <span class="log_upload_file_key">image</span>
            <span class="log_upload_file_name">18.png</span>
            <span class="log_upload__file_size">1.44 MB</span>
        </div>
    </div>
<div class="log_request_header">
\t<div class="log_request_body">
\t\t<pre class="log_json_body">{"Accept":["*/*"],"Accept-Encoding":["gzip, deflate, br"],"Accept-Language":["zh-CN,zh;q=0.9,en;q=0.8"],"Connection":["close"],"Content-Length":["1513652"],"Content-Type":["multipart/form-data; boundary=----WebKitFormBoundaryXTd35B3sBJ7YzNxs"],"Cookie":["Pycharm-26f20cf2=9f383634-8b6a-4108-a633-cfea97bdb2ca; Webstorm-9a4d9191=6024cfb0-b510-443e-8f52-8f6d20d0b4e8; Webstorm-9a4d9553=3c18cb09-f102-4940-bbd9-f7d4846c9bda; Pycharm-26f210b4=e2cbf539-d79c-4a8e-a149-4f25ea48b9bf; Goland-dbfd2d1=55ed4c46-458f-4218-b384-b7b973053354; Webstorm-9a4d9554=1487ed03-09c2-434e-9131-8f2f0f47314b; _pk_id.100001.1fff=ca323ce3186eafed.1684157339.1.1684157339.1684157339.; __utma=111872281.352842777.1684157340.1684157340.1684157340.1; __utmz=111872281.1684157340.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); _vwo_uuid_v2=DC0E9D1C9213CCA9C80211F75270AB46E|9b5467fa8b2679a1c418c541f50d0351; Webstorm-9a4d9913=84208f9a-5a9f-425d-810b-cc993bd5c018; Hm_lvt_7989d84fb765832ccc8f74c6a620d93c=1690682055; Hm_lvt_f3cd8238138d11b92f82f00e78961aa9=1690813256; session_id=s%3Aga_wxdevXjS4UFe77j0d5iYowjCoRGRd.qw1LiDUG2YGAWcBws6fdXq2Hxo2OEpEjo3TKeK9EZJ8"],"Origin":["http://localhost"],"Referer":["http://localhost/admin/settings/images"],"Sec-Ch-Ua":["\\"Not/A)Brand\\";v=\\"99\\", \\"Google Chrome\\";v=\\"115\\", \\"Chromium\\";v=\\"115\\""],"Sec-Ch-Ua-Mobile":["?0"],"Sec-Ch-Ua-Platform":["\\"Windows\\""],"Sec-Fetch-Dest":["empty"],"Sec-Fetch-Mode":["cors"],"Sec-Fetch-Site":["same-origin"],"Token":["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrTmFtZSI6Iuaeq-aeqyIsInJvbGVJRCI6MSwidXNlcklEIjo2LCJ1c2VyTmFtZSI6ImZlbmdmZW5nIiwiZXhwIjoxNjkyNTMzMzc2Ljk0MzU1MiwiaXNzIjoiZmVuZ2ZlbmcifQ.YzRmqjun-Y8-A_ku2m3nB7sB-jCE49BUVtASEBZB85Q"],"User-Agent":["Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"]}</pre>
\t</div>
</div>
<div class="log_request">
\t<div class="log_request_head">
\t\t<span class="log_request_method">POST</span>
\t\t<span class="log_request_path">/api/image</span>
\t</div>
\t<div class="log_request_body">
\t\t<pre class="log_json_body"></pre>
\t</div>
</div>
<div class="log_image"/><img src="/uploads/枫枫/18.png"></div>


<div class="log_response">
\t<pre class="log_json_body">{"code":0,"data":"/uploads/枫枫/18.png","msg":"图片上传成功"}</pre>
</div>
`


mock(/api\/logs/, function (options: MockjsRequestOptions) {
    let url = queryString.parse(options.url)
    switch (url.type) {
        case "1": // 登录日志
            return mock({
                "code": 0,
                "msg": "成功",
                "data": {
                    "count": 10,
                    "list|10": [
                        {
                            "id|+1": 1,
                            "ip": "@ip",
                            "addr": "@city(true)",
                            "title": "@title",
                            "status": "@boolean",
                            "userName": "@cname",
                            "content": "--",
                            "createdAt": "@dateTime",
                        }
                    ]
                }
            })
        case "2": // 操作日志
            return mock({
                "code": 0,
                "msg": "成功",
                "data": {
                    "count": 10,
                    "list|10": [
                        {
                            "id|+1": 1,
                            "ip": "@ip",
                            "addr": "@city(true)",
                            "title": "@title",
                            "level": "info",
                            "userName": "@cname",
                            "content": content,
                            "readStatus": "@boolean",
                            "createdAt": "@dateTime",
                        }
                    ]
                }
            })
        case "3": // 运行日志
            return mock({
                "code": 0,
                "msg": "成功",
                "data": {
                    "count": 10,
                    "list|10": [
                        {
                            "id|+1": 1,
                            "serviceName": "同步服务",
                            "title": "@title",
                            "level": "info",
                            "content": content,
                            "createdAt": "@dateTime",
                        }
                    ]
                }
            })
    }
    return mock({
        "code": 0,
        "msg": "成功",
        "data": {
            "count": 10,
            "list|10": [
                {
                    "id|+1": 1,
                    "serviceName": "同步服务",
                    "title": "@title",
                    "level": "info",
                    "content": "--",
                    "createdAt": "@dateTime",
                }
            ]
        }
    })
})
