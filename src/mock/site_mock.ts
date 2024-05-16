import {mock} from "mockjs";

mock(/api\/site/, {
  code: 0,
  msg: "成功",
  data: {
    abstract:
      "枫枫知道官方文档，致力于帮助更多的人学好知识\n" +
      "哔哩哔哩视频总播放量突破10w\n" +
      "文档浏览量突破3w\n" +
      "越来越多的人，开始了解枫枫知道",
    content: "欢迎光临",
    icon: "https://docs.fengfengzhidao.com/static/avatar/zzf-1.png",
    iconHref:
      '<img src="https://img.shields.io/badge/fengfengdoc-2.0.1-red">' +
      '<img src="https://img.shields.io/badge/%E6%9E%AB%E6%9E%AB%E7%9F%A5%E9%81%93-6.0.2-brightgreen">' +
      "<img src='https://img.shields.io/badge/python-3.8.6-yellowgreen'>" +
      "<img src='https://img.shields.io/badge/golang-1.19-orange'>",
    title: "mingyue docs",
  },
});