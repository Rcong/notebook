# fetch

浏览器提供的原生AJAX的api，替代XMLHttpRequest以及jQuery中的$.ajax，毕竟XMLHttpRequest使用起来麻烦，jQuery也并不是每一个工程中都会引入。

## fetch 缺点

- fetch默认不发送或接收cookies，需自行设置。

```
fetch(url, {credentials: 'include'})。
```
- 从 fetch()返回的 Promise 将不会拒绝HTTP错误状态，服务器返回 400，500 错误码时也不会 reject，只有网络故障导致请求不完整时，fetch 才会被 reject。

- 不支持timeout属性，需要的话可以配合```Promise.race```实现超时效果。

```
Promise.race([
    fetch(url), 
    new Promise(function(resolve, reject) {
        setTimeout(() => reject('timeout'), 800);
    })
])
```