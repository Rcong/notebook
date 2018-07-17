const puppeteer = require('puppeteer');
const ProgressBar = require('progress');
const mapLimit = require('async/mapLimit');

async function downloadPdf(browser, item, bar) {
    try {
        let articlePage = await browser.newPage()

        bar.tick({ title: item.title });

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

        await articlePage.waitForSelector('.article', { timeout: 30000 });
        await articlePage.pdf({path: `./pdf/${item.title}.pdf`, format: 'A4'});

        articlePage.close();
    } catch (error) {
        console.info('下载失败', error);        
    }
}

(async () => {

    let browser = await puppeteer.launch({
        executablePath: './chromium/Chromium.app/Contents/MacOS/Chromium',
        ignoreHTTPSErrors: true,
        headless: true
    });

    let page = await browser.newPage();
    await page.goto('https://survivor.ruanyifeng.com/index.html');
    await page.waitForSelector('.chapter-level-1', { timeout: 30000 });

    let items = await page.evaluate(() => {
        let links = [...document.querySelectorAll('.chapter-level-1 .chapter-item a')];
        return links.map(link => { return { href: link.href.trim(), title: link.text } });
    });

    let bar = new ProgressBar('Download: :current/:total [:bar]  :title', {
        complete: '=',
        width: 100,
        total: items.length
    });

    await downloadPdf(browser, items[0], bar);
    page.close();
    browser.close();

    // mapLimit(items, 3, (item, callback) => {
    //     downloadPdf(browser, item, bar);
    //     callback(null);
    // }, (err, res) => {
    //     // browser.close();
    // })

    // items.forEach(item => downloadPdf(browser, item, bar));
    
    // 这里也可以使用promise all，但cpu可能吃紧，谨慎操作
    // for (var i = 1; i < links.length; i++) {
    //     let articlePage = await browser.newPage()

    //     let a = links[i];

    //     bar.tick({ title: a.title });

    //     await articlePage.goto(a.href);

    //     let scrollEnable = true
    //     let scrollStep = 1000 //每次滚动的步长
    //     while (scrollEnable) {
    //         scrollEnable = await articlePage.evaluate(async scrollStep => {
    //             let scrollTop = document.scrollingElement.scrollTop
    //             document.scrollingElement.scrollTop = scrollTop + scrollStep
    //             await new Promise(res => setTimeout(res, 200))
    //             return document.body.clientHeight > scrollTop + 1080 ? true : false
    //         }, scrollStep)
    //     }

    //     await page.waitForSelector('.chapter-level-1', { timeout: 30000 })

    //     await articlePage.pdf({path: `./pdf/${a.name}.pdf`});

    //     articlePage.close();
    // }

    // browser.close();

})();