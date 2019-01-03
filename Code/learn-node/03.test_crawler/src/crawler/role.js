import requestPromise from 'request-promise';
import cheerio from 'cheerio';
import async from 'async';
import { writeFileSync } from 'fs'
import { resolve } from 'path'

let dbPath = dbName => resolve(__dirname, `../db/${dbName}.json`);

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
            let roleId = $(node).find('a').attr('href').match(/\d+/g).join(',');
            let { roleName, roleDesc } = await fetchRoleDetail(roleId);
            callback(null, { roleId, roleName, avatar, roleDesc });
        }, (err, res) => {
            resolve();
            roleList = res;
        });
    });

    // 写入文件
    writeFileSync(dbPath('roleList'), JSON.stringify(roleList, null, 4), 'utf-8');
    console.info(`爬起角色列表的数据`);
    return roleList;
}

// 爬取角色详情
let fetchRoleDetail = async(roleId) => {
    let $ = await requestPromise({ uri: `http://wxwy.dragonest.com/doc/role/id/${roleId}.html`, transform: body => cheerio.load(body) });
    let roleName = $('.abstract .roleName').text(),
        roleDesc = $('.abstract .roleText').text(),
        roleWallpaper = $('.roleBox .show-img').attr('src') || '', 
        roleVoice = $('#music_voiceActor').attr('src') || '',
        voiceActor = $('.abstract .voiceActor').text().slice(3), 
        roleSkillNodes = $('.abstract2 li'),
        strategyNodes = $('.abstract3 li'),
        roleSkills = [],
        strategy = [];

    roleSkillNodes.each((index, node) => {
        let skillName = ( $(node).find('.name span').text() || '' ).slice(0, -1),
            skillIcon = $(node).find('.name .nameimg').attr('src'),
            skillDesc = $(node).find('.text').text();
        roleSkills.push({ skillName, skillIcon, skillDesc });
    });

    strategyNodes.each((index, node) => {
        let strategyId = $(node).find('a').attr('href').match(/\d+/g).join(','),
            strategyName = $(node).find('.name').text();
        strategy.push({ strategyId, strategyName });
    });

    let roleDetail = { roleId, roleName, roleWallpaper, roleDesc, roleSkills, strategy };
    voiceActor && ( roleDetail['voiceActor'] = voiceActor );   //存在角色的声音才存入
    roleVoice && ( roleDetail['roleVoice'] = roleVoice );   //存在角色的声音才存入

    // 写入文件
    writeFileSync(dbPath(`roleDetail-${roleId}`), JSON.stringify(roleDetail, null, 2), 'utf-8');
    console.info(`爬起${roleName}的数据`);
    return roleDetail;
}

export default {
    fetchRoleList,
    fetchRoleDetail
}