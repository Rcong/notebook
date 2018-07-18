const puppeteer = require('puppeteer');
const mapLimit = require('async/mapLimit');


(async () => {

    let browser = await puppeteer.launch({
        executablePath: './chromium/Chromium.app/Contents/MacOS/Chromium',
        ignoreHTTPSErrors: true,
        headless: true
    });

    let page = await browser.newPage();
    await page.goto('https://survivor.ruanyifeng.com/index.html');
    await page.waitForSelector('.article', { timeout: 50000 });

    let items = await page.evaluate(() => {
        let links = [...document.querySelectorAll('.article .chapter-level-1 .chapter-item a')];
        return links.map(link => { return { href: link.href.trim(), title: link.text } });
    });
    page.close();

    let startTime = new Date().getTime();
    downloadPdfs(browser, items).then(res => {
        let endTime = new Date().getTime();
        console.info(`下载任务完毕 总耗时: ${(endTime - startTime) / 1000}`);
        browser.close();
    });
    
})();

async function downloadPdf(browser, item, items, callback) {
    let articlePage = await browser.newPage();
    try {
        await articlePage.goto(item.href);

        let scrollEnable = true
        let scrollStep = 1000 //每次滚动的步长
        while (scrollEnable) {
            scrollEnable = await articlePage.evaluate(async scrollStep => {
                let scrollTop = document.scrollingElement.scrollTop
                document.scrollingElement.scrollTop = scrollTop + scrollStep
                await new Promise(res => setTimeout(res, 200))
                return document.body.clientHeight > scrollTop + 1080 ? true : false
            }, scrollStep)
        }

        let startTime = new Date().getTime();
        await articlePage.pdf({path: `./pdf/${item.title}.pdf`});
        let endTime = new Date().getTime();
        console.info(`一共${items.length}份文件 => 下载...${items.indexOf(item) + 1}.. ${item.title}, 耗时: ${(endTime - startTime) / 1000}`);

        articlePage.close();
        callback(null, item.title);
    } catch (error) {
        console.info(`${item.title}.pdf 下载失败`);
        articlePage.close(); 
        callback(null);
    }
}

function downloadPdfs(browser, items) {
    return new Promise((resolve, reject) => {
        // 并发量控制为 10
        mapLimit(items, 10, (item, callback) => {
            downloadPdf(browser, item, items, callback);
        }, (err, res) => {
            err ? reject() : resolve(res);
        });
    });
}