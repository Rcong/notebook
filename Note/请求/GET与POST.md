# ```POST```与```GET```
- 最大的区别就是get，参数是通过query传递，传递信息有限，因为他的主要作用是拉取，不是传送。post通过body传送数据，数据量大，因为他的主要作用就是发送数据。
- GET的URL会被放在浏览器历史和WEB 服务器日志里面，POST 发完基本就木有了，关键数据放在GET里面，被人偷窥了浏览器，或者WEB服务器被入侵日志被人倒去了，基本泄露可能性100%。