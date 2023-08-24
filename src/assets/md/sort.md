## 用户登录

以用户登录接口为例，把入参，出参类型定义一下

```TypeScript
import {useAxios} from "@/api/index";
import type {Response} from "@/api/index";


export interface LoginRequest {
    userName :string
    password: string
}

// 登录成功之后，直接返回token
export function loginApi(data: LoginRequest): Promise<Response<string>> {
    return useAxios.post("/api/login", data)
}

```



这样在后期维护的时候，就知道这个接口需要什么参数，一目了然

