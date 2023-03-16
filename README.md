# 动态网页截图
> 使用nodejs使用puppeteer模块截取动态网页,可以获取vue等动态渲染的网页截图

## 项目启动
1. 安装nodejs  
> BT面板推荐使用PM2插件直接安装

2. 安装服务依赖  

安装Chromium浏览器：Chromium浏览器是Puppeteer的依赖，需要先安装Chromium浏览器。
```shell
apt install chromium-browser
```
安装中文字体：Chromium浏览器可能需要一些中文字体才能正确显示中文网页。使用以下命令安装中文字体。
```shell
apt install fonts-wqy-zenhei
```
安装依赖包
```shell
npm install
```

3. 启动服务  
```shell
node webpage_screenshot.js
```

> 服务启动后,会监听14579端口,可以通过http://127.0.0.1:14579/访问,可以使用pm2等工具进行服务管理

## 接口说明
请求地址:http://127.0.0.1:14579/get-screenshot
请求方式:POST
请求参数:
```json
{
    "web_url":"http://10.6.80.98:8080/sjzdv2/?token=6844494a464227574c464078642748787f404f545c47506329484541434c5747424a7e6b4a4d&card=220909#/horizontal/gather",
    "file_path":"/opt/app/nodejs_project/screenshot/expl.png"
}
```
请求参数说明:
|参数名|参数说明|是否必填|  
|:---|:---|:---|  
|web_url|需要截图的网页地址|是|  
|file_path|截图保存的路径|是|  

## 相关文档
- [故障排除](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md)  
- [依赖缺少,或提示file not found等信息解决](https://github.com/puppeteer/puppeteer/issues/807#issuecomment-436588786)
