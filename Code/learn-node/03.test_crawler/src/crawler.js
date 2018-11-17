import requestPromise from 'request-promise';
import cheerio from 'cheerio';
import async from 'async';

// 爬取角色列表
let fetchRoleList = async() => {

    // 爬取导航复制给cheerio的$对象
    let $ = await requestPromise({
        uri: 'http://wxwy.dragonest.com/doc/role.html',
        transform: body => cheerio.load(body) // 转成相应的爬虫
    });

    let roleList = [];

    //要爬取数据的角色的dom节点
    let roleLiNodes = $('.roleUl .roleLi');
    await new Promise((resolve, reject) => {
        async.mapLimit(roleLiNodes, 5, async(node, callback) => {
            let avatar = $(node).find('img').attr('src');
            let roleUrl = $(node).find('a').attr('href');
            let roleName = await fetchRoleName(roleUrl);
            callback(null, { avatar, roleName, roleUrl });
        }, (err, res) => {
            resolve();
            roleList = res;
        });
    });

    // 写入文件
    // writeFileSync('./server/crawerdb/heroList.json', JSON.stringify(result, null, 2), 'utf-8')
    return roleList;
}

// 爬取角色名字
let fetchRoleName = async(roleUrl) => {
    let $ = await requestPromise({ uri: `http://wxwy.dragonest.com${roleUrl}`, transform: body => cheerio.load(body) });
    let roleName = $('.abstract .roleName').text();
    return roleName;
}

fetchRoleList();
