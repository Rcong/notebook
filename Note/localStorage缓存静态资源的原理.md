- ajax请求静态资源(js、css),回调中获取的就是静态资源的内容(js、css),取到内容后储存在localStorage中.

```
function requestStatic(options){

    if(!options.url || typeof options.url !== 'string'){
        throw new Error('url格式错误');
    }

    let opt = Object.assign({}, {
        success: function(res) {},
        error: function(res) {}
    }, options);

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            opt.success(xhr.responseText);
        }
        if (xhr.readyState === 4 && xhr.status === 404) {
            opt.error(xhr.status);
        }
    }
    xhr.open('GET',opt.url,true);
    xhr.send();

}

requestStatic({
    url:'https://cdn.staticfile.org/jquery/3.1.1/jquery.slim.js',
    success: function(res){
        localStorage.setItem('jquery',res);
    },
    error: function(res){
        console.log(res);
    }
});

```