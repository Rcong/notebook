const axios = require('axios');
const request = require('request');
const CronJob = require('cron').CronJob;
const url = 'https://oapi.dingtalk.com/robot/send?access_token=c4d3b28bd2e63dcf12ae8c266e97f31b2a482b10ce22a36fe8c37c18b3d3b39d';

new CronJob('* * * * * *', () => {
    request({
        url: url,
        method: 'POST',
        json: true,
        headers: { 'content-type': 'application/json'},
        body: {
            msgtype:'text',
            "text": {
                "content": "お兄さん 今日は何を食べますか？（小哥 今天吃啥）"
            },
            "at": {
                "isAtAll": true
            }
        }
    })
}, null, true, 'Asia/Shanghai');