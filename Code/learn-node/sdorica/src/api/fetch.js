let getUrl = url => `http://localhost:7878${url}`;
let getOption = option => ({ ...option, ...{
    headers: {
        'content-type': 'application/json; charset=utf-8'
    },
    credentials: 'include'
}});

let request = (url, option = {}) => {
    url = getUrl(url);
    option = getOption(option);

    return fetch(url, option)
        .then(res => res.json())
        .then(res => {
            if (res.status === 200) {
                return res.data;
            }
            throw res;
        });
}

let get = (path, data) => {
    if (data instanceof Object) {
        if (!~path.indexOf('?')) {
            path += '?';
        }
        let params = [];
        for (let key in data) {
            params.push(`${key}=${data[key]}`);
        }
        path += params.join('&');
    }
    return request(path);
}

let post = (path, data = {}) => request(path, { method: 'POST', body: JSON.stringify(data) });

let comRes = method => {
    return async (...args) => {
        try {
            return await method(...args);
        } catch(e) {
            if (e && e.status === 501) {
                window.location.href = '/login';
            }
        }
    }
}

get = comRes(get);
post = comRes(post);

export { get }
export { post }