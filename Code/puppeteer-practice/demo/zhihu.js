let program = require('commander');
let inquirer = require('inquirer');
let puppeteer = require('puppeteer');

// program
//     .version('0.1.0')
//     .command('search')
//     .description('请填搜索关键字')
//     .parse(process.argv)
//     .action(async () => {
//         console.info('请填搜索关键字')
//         let search = await inquirer.prompt([{
//             type: 'input',
//             name: 'searchKey',
//             message: '请输入搜索关键字:',
//             validate: function (input) {
//                 let done = this.async()
//                 if (!input) return done('请输入搜索关键字')
//                 return done(null, true)
//             }
//         }]);
//         console.info('搜索中..');
//         await start(search.searchKey);
//     });

(async () => {
    console.info('请填搜索关键字')
    let search = await inquirer.prompt([{
        type: 'input',
        name: 'searchKey',
        message: '请输入搜索关键字:',
        validate: function (input) {
            let done = this.async()
            if (!input) return done('请输入搜索关键字')
            return done(null, true)
        }
    }]);
    console.info('搜索中..');
    await start(search.searchKey);

    program.parse(process.argv);
})();

async function start(searchKey) {
    let browser = await puppeteer.launch({
        executablePath: './chromium/Chromium.app/Contents/MacOS/Chromium',
        ignoreHTTPSErrors: true,
        headless: false,
    });

    let page = await browser.newPage();
    //打开知乎
    await page.goto('https://www.zhihu.com/');
    // 设置浏览器视窗
    page.setViewport({ width: 1376, height: 1000 });
    //等待搜索区域
    await page.waitForSelector('.SearchBar-input input', { timeout: 30000 });
    //搜索
    await page.type('.SearchBar-input input', String(searchKey));
    await page.click('.SearchBar-searchIcon');
}