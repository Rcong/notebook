const puppeteer = require('puppeteer');

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
    await downloadPdfs(browser, items, 10);
    // .then(res => {
    //     let endTime = new Date().getTime();
    //     console.info(`下载任务完毕 总耗时: ${(endTime - startTime) / 1000}`);
    //     browser.close();
    // });
    
    let endTime = new Date().getTime();
    console.info(`下载任务完毕 总耗时: ${(endTime - startTime) / 1000}`);

})();

async function downloadPdf(browser, item, items) {
    console.info(`开始下载 ${item.title}`);
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
        
    } catch (error) {
        console.info(`${item.title}.pdf 下载失败`);
        articlePage.close(); 
    }
}

async function downloadPdfs(browser, items, limit) {

    let index = 0,
        promises = items.map(item => downloadPdf(browser, item, items)),
        p = new Promise(resolve => resolve()),
        tasks = [];

    let length = promises.length;

    while (index * limit < length) {
        tasks.push(promises.slice(limit * index, limit * (index + 1)));
        index ++;
    }
    console.info(tasks);
    tasks.map(task => p = p.then(() => Promise.all(task)));

    p.catch(error => {
        console.info('执行失败');
    });

    // for (let taskArr of tasks) {
    //     await Promise.all(task);
    // }
}

