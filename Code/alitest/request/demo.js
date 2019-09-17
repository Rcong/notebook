function chunks(arr, size) {
    if (!Array.isArray(arr)) {
        throw new TypeError('arr必须是数组');
    }

    if (typeof size !== 'number') {
        throw new TypeError('size必须是number类型');
    }

    var result = [];
    for (var i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, size + i));
    }

    return result;
}

function toQueryString (queryObj){
    let queryString = Object.keys(queryObj).map((key, index) => `${index ? '&' : ''}${key}=${queryObj[key]}`).join('');
    return queryString;
}

function batchRequest(urlList, options, timeout) {

    return new Promise((resolve, reject) => {
        let result = [];
        let counts = 0;
        
        for (let index = 0, length = urlList.length; index < length; index++) {
            let url = urlList[index];
            Promise.race([
                fetch(url, options).then(res => res.json()),
                new Promise(resolve => setTimeout(() => resolve(null), timeout))
            ]).then(data => {
                counts++;
                result[index] = data;
                if (counts === length) {
                    resolve(result)
                }
            }).catch(error => {
                console.info(error);
                counts++;
                result[index] = null;
                if (counts === length) {
                    resolve(result)
                }
            })
        }
    })

}

function batch(urlList, options, timeout){
    return new Promise(resolve => {
        let result = [];
        let counts = 0;
        
        for (let index = 0, length = urlList.length; index < length; index++) {
            let urls = urlList[index];

            batchRequest(urls, options, timeout).then(data => {
                counts++;
                result = result.concat(data);
                if (counts === length) {
                    resolve(result);
                }
            })
        }
    })
}

function request(urlList, params = { method: 'GET', timeout: 20000 }) {

    if (!Array.isArray(urlList)) {
        throw new TypeError('urlList必须是数组');
    }

    let method = params.method || 'GET',
        timeout = params.timeout || 2000,
        data = params.data,
        size = params.size || 5,
        queryString = data ? toQueryString(data) : '';



    let options = { method: method, mode: 'cors' };

    if (params.credentials) { options.credentials = params.credentials }
    if (params.mode) { options.mode = params.mode }


    if (method === 'GET' && queryString) {
        urlList = urlList.map(url => `${url}?${queryString}`);
    } else if(method === 'POST'){
        options = { ...options,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: queryString
        };
    }

    urlList = chunks(urlList, size);

    return batch(urlList, options, timeout);

}

request([
    'https://api.nasa.gov/planetary/apod',
    'https://api.nasa.gov/planetary/apod',
    'https://api.nasa.gov/planetary/apod',
    'https://api.nasa.gov/planetary/apod',
    'https://api.nasa.gov/planetary/apod',
    'https://api.nasa.gov/planetary/apod',
    'https://api.nasa.gov/planetary/apod',
    'https://api.nasa.gov/planetary/apod',
    'https://api.nasa.gov/planetary/apod',
    'https://api.nasa.gov/planetary/apod',
    'https://api.nasa.gov/planetary/apod',
    'https://api.nasa.gov/planetary/apod',
    'https://api.nasa.gov/planetary/apod'
], {
    method: 'GET',
    timeout: 2000,  
    data: { api_key: 'DEMO_KEY', date: '2018-09-17' }
}).then(res => {
    console.info(res)
}).catch(error => {
    console.info(error)
})