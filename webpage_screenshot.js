const fs = require('fs');
const puppeteer = require('puppeteer');
var express = require('express');
var bodyParser = require('body-parser');
const Result = require("./BaseRequestUtils");
var app = express();

/**
 * 获取网页截屏
 * @param url
 * @param filePath
 */
async function getScreenShot(url, filePath) {
    // 启动Headless Chrome浏览器
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        timeout: 30000
    });
    try {
        // 打开一个新页面
        const page = await browser.newPage();
        // 导航到目标网页,并等待页面加载完成, 时间5秒
        await page.goto(url, {waitUntil: 'networkidle0', timeout: 10000});
        // 截取屏幕截图
        let timeout = 5500; // 超时时间
        const screenshotPromise = page.screenshot({type: 'png', fullPage: true});
        const result = await Promise.race([
            screenshotPromise,
            new Promise((_, reject) =>
                setTimeout(() => reject(`截图超时（${timeout}ms）！`), timeout)
            ) // 超时Promise对象
        ]);
        fs.writeFileSync(filePath, result); // 将截图Buffer对象写入文件
        console.log(`截图已保存为 ${filePath}。`);
    } catch (error) {
        // 输出错误信息文字
        console.log(`截图失败：${error.message}`);
    } finally {
        await browser.close(); // 关闭浏览器
    }
}


app.use(bodyParser.json());

app.post('/get-screenshot', async function (req, res) {
    var params = req.body;
    console.log("请求参数", params);
    try {
        await getScreenShot(params.web_url, params.file_path);
        Result.successResult(res, {})
    } catch (e) {
        Result.errorResult(res, e.message);
    }
});

var server = app.listen(14579, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
