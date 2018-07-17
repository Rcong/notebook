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
    await page.waitForSelector('.article', { timeout: 30000 });

    let links = await page.evaluate(() => {
        let items = [...document.querySelectorAll('.article .chapter-level-1 .chapter-link a')];
        return links.map(item => { return { href: item.href.trim(), title: item.text } });
    });
    page.close();

    let startTime = new Date().getTime();
    downloadPdfs(browser, links).then(res => {
        let endTime = new Date().getTime();
        console.info(`下载任务完毕 总耗时: ${(endTime - startTime) / 1000}`);
        browser.close();
    });
    
})();

async function downloadPdf(link, links, callback) {
    try {
        let articlePage = await browser.newPage()

        await articlePage.goto(link.href);

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
        await articlePage.pdf({path: `./pdf/${link.title}.pdf`});
        let endTime = new Date().getTime();
        console.info(`一共${links.length}份文件 => 下载...${links.indexOf(link) + 1}.. ${link.title}, 耗时: ${(endTime - startTime) / 1000}`);

        articlePage.close();
        callback(null, link.title);
    } catch (error) {
        console.info(`${link.title}.pdf 下载失败`);    
        callback(null, error);
    }
}

function downloadPdfs(browser, links) {
    return new Promise((resolve, reject) => {
        // 并发量控制为 10
        mapLimit(links, 10, (link, callback) => {
            downloadPdf(link, links, callback);
        }, (err, res) => {
            err ? reject() : resolve(res);
        });
    });
}