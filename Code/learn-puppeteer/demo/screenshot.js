let puppeteer = require('puppeteer');
let http = require('http');
let fs = require('fs');

(async() => {
    let browser = await puppeteer.launch({
        executablePath: './chromium/Chromium.app/Contents/MacOS/Chromium',
        ignoreHTTPSErrors: true,
        headless: false,
    });
    let page = await browser.newPage();
    await page.goto('http://www.ruanyifeng.com/road/');
    // 设置浏览器视窗
    await page.setViewport({ width: 1376, height: 1000 });
    await page.screenshot({path: 'img/demo.png', fullPage: true});
    page.close();

    let imgPage = await browser.newPage();

    fs.readFile('img/demo.png','binary',function(err, file) {
        if (err) {
            console.log(err);
            return;
        }else{
            http.createServer(function(req, res) {
                res.writeHead(200, {'Content-Type': 'image/jpeg'});
                res.write(file,'binary');
                res.end();
                return;
            }).listen(8888);
            
            imgPage.goto('http://localhost:8888');
        }
    });

    // await browser.close();
})();