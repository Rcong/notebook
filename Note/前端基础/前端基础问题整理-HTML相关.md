## ```DOCTYPE```的作用以及常见的```DOCTYPE```类型
```<!DOCTYPE>```声明位于文档中的最前面的位置,处于 <html> 标签之前,用来告知浏览器页面目前的文件是用哪种版本的```HTML```(或```XML```)撰写。

### 常见类型
* HTML 5
```<!DOCTYPE html>```


* HTML 4.01
三种文档类型:```Strict```、```Transitional```、```Frameset```。


* XHTML 1.0
三种```XML```文档类型:```Strict```、```Transitional```、```Frameset```。


## 浏览器标准模式和怪异模式之间的区别

* **标准模式**:严格遵循W3C标准来呈现网页的渲染模式。
* **怪异模式**:兼容旧版本浏览器,不会严格遵循W3C标准的网页的一种渲染模式

每个```HTML```文档的首行都是一个文档声明,这种文档声明是用来表示后面的那些个页面标签遵循哪一个原则的,这是HTML5的文档类型声明：
```html
<!DOCTYPE html>
```
 这个是XHTML 1.0严格模式的文档类型声明：
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD *XHTML 1.0* Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```
保留文档类型声明主要是历史原因,没有文档声明的话大多数浏览器都将会转换到为**怪异模式(quirk mode)**,这种模式下浏览器会以老版本的浏览器使用的规则来渲染页面,并且不同浏览器的怪异模式还是不一样的,我们在平时码代码时应该尽量回避这种错误。

在添加了文档类型声明之后,浏览器使用的就是**标准模式(standard mode)**,这种情况下浏览器会用W3C的标准来渲染网页。

附上两篇
[Mozilla Quirks Mode Behavior](https://developer.mozilla.org/en-US/docs/Mozilla_Quirks_Mode_Behavior)
[怪异模式（Quirks Mode）对 HTML 页面的影响](http://www.ibm.com/developerworks/cn/web/1310_shatao_quirks/)


## ```HTML```和```XHTML```有什么区别?
* ```XHTML```中的标签都必须被正确地嵌套,```HTML```中的某些标签可以彼此不正确的嵌套。
* ```XHTML```中的所有标签必须要关闭。
* ```XHTML```中规范定义：标签名和属性对大小写敏感,所有```XHTML```标签名必须用小写字母。
* ```XHTML```文档必须拥有根元素。
* ```XHTML```中标签的属性值要使用双引号```"```。


## 如果页面使用```'application/xhtml+xml'```会有什么问题吗？
使用```xhtml```,页面结构中必须包含```head```标签,并且每个标签结构都要关闭,包括空标签。所有标签都要小写。使用了```'application/xhtml+xml'```之后,部分老浏览器不会支持。


## 使用```data-```属性的好处是什么？
通过```data-```可以自定义属性,可以通过```HTMLElement.dataset```获取这些属性的值,```data-```中```-```后接自定义属性的名字,例如```data-url```。实际开发中可以利用这一点在生成```DOM```结构时把数据储存在自定义属性中,通过一系列交互操作,可以再获得这些数据,而不用再去```ajax```去后台取得数据。


## ```cookies```、```sessionStorage```和```localStorage```的区别。
```sessionStorage```和```localStorage```是```web storage```的两种储存方式,其中```sessionStorage```是会话级别储存,在浏览器或页面关闭时数据就会销毁,而```localStorage```是持久化的本地储存,不刻意去删除数据,数据是不会销毁的。以上这两种方式只是客户端的储存,不会涉及到服务器储存。与之相比,每次发送HTTP请求时会将```cookie```添加到```Cookie```头字段,发送给服务器。

在储存量方面也有差异,单个```cookie```保存的数据不能超过4K,而```localStorage```和```sessionStorage```一般有5-10M。

除此之外,每个域名下```cookie```的个数会有限制,依据浏览器不同会有不同,而```localStorage```数量是无限制的。


##  ```<script>```、```<script async>```和```<script defer>```的区别
```<script>```加载js文件会阻塞页面的渲染和交互,而```<script async>```和```<script defer>```都是异步加载js文件,期间不会才生阻塞,区别在于```<script async>```是加载完之后自动执行,```<script defer>```需要等到页面加载之后再执行。


## 为什么通常将```css```的```<link>```放置在```<head></head>```之间,而将```js```的```<script>```放置在```</body>```之前?有哪些例外吗?
浏览器在处理```HTML```页面渲染和```JavaScript```脚本执行的时候是单一进程的,所以在当浏览器在渲染```HTML```遇到了```<script>```标签会先去执行标签内的代码(如果是使用```src```属性加载的外链文件,则先下载再执行),在这个过程中,页面渲染和交互都会被阻塞。所以将```<script>```放在```</body>```之前,当页面渲染完成再去执行```<script>```。

一般希望```DOM```还没加载必须需要先加载的```js```会放置在```<head>```中,有些加了```defer```、```async```的```<script>```也会放在```<head>```中。

## 渐进增强 (progressive enhancement) 和优雅降级 (graceful degradation) 的区别
* 渐进增强: 先保证低版本浏览器的基本功能,再去兼容高版本浏览器效果和交互。
* 优雅降级: 先保证高版本浏览器的效果和交互等,再去兼容低版本的浏览器。


## 白屏和FOUC (无样式内容闪烁)是什么?如何来避免?
** 白屏与无样式内容闪烁(FOUC)是因为不同浏览器加载与显示页面的机制不同而造成的。**

当把```css```样式放在底部或者使用```@import```方式引入样式时

* 一些浏览器例如chrome,他的加载和渲染机制是等```css```全部加载解析完后再渲染展示页面,而这个等待的时间就为**白屏**。
* 另一些浏览器例如Firefox,他会在```css```未加载前先展现页面,等```css```加载后再重绘一次,这就造成了**FOUC (无样式内容闪烁)**。

所以为了避免这些问题,最好**使用LINK标签将样式表放在文档的HEAD中。**
