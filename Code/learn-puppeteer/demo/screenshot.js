let puppeteer = require('puppeteer');
let inquirer = require('inquirer');
let http = require('http');
let fs = require('fs');

(async() => {

    console.info('请填网页地址')
    let search = await inquirer.prompt([{
        type: 'input',
        name: 'url',
        message: '请填网页地址:',
        validate: function (input) {
            let done = this.async()
            if (!input) return done('请填网页地址')
            return done(null, true)
        }
    }]);
    console.info('搜索中..');
    await printScreen(search.url);

})();

async function printScreen(url){

    let browser = await puppeteer.launch({
        executablePath: './chromium/Chromium.app/Contents/MacOS/Chromium',
        ignoreHTTPSErrors: true,
        headless: false,
    });
    let page = await browser.newPage();
    await page.goto(url);
    // 设置浏览器视窗
    await page.setViewport({ width: 1376, height: 1000 });
    await page.screenshot({path: 'img/demo.png', fullPage: true});
    page.close();

    let imgPage = await browser.newPage();
    await imgPage.setViewport({ width: 1376, height: 1000 });
    
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

}