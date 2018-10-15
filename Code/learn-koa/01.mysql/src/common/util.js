const moment = require('moment');

exports.list2Map = (list, key) => {
    let m = {};
    list.map(l => {
        m[l[key]] = l;
    });
    return m;
}

exports.formatTime = (strTime, format = 'MMM Do YY') => {
    return moment(strTime).format(format);
}

exports.resSuc = (data = 'success') => {
    return {
        status: 200,
        data
    }
}

exports.resFail = (msg = 'fail') => {
    return {
        status: 500,
        msg
    }
}