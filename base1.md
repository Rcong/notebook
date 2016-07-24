## ```js```的数据类型

* 基本类型: ```Undefined```、```Null```、```Boolean```、```Number```、```String```
* 引用类型: ```Object```、```Array```、```Date```、```RegExp```、```Function```

## ```js```的与运算和或运算的注意点

### 逻辑与
* 如果有一个操作数为```null( NaN、undefined )```，则返回```null( NaN、undefined )```。
* 如果第一个操作数是对象则返回第二个操作数。
* 如果第二个操作数是对象，只有在第一个操作数的求值结果为```true```时才会返回该对象。

逻辑与属于短路操作，第一个操作数结果为```false```时，就不会对第二个操作数求值，直接短路返回```false```。

### 逻辑或
* 如果两个操作数都为```null( NaN、undefined )```，则返回```null( NaN、undefined )```。
* 如果第一个操作数是对象则返回第一个操作数。
* 如果第一个操作数求值结果为```false```，则返回第二个操作数。

逻辑或也属于短路操作，第一个操作数结果为```true```时，就不会对第二个操作数求值，直接短路返回```true```。

## ```js```闭包的理解

当某个函数调用时会创建一个执行环境以及作用域链，然后根据```arguments```和其它命名参数初始化形成活动对象。在外部函数调用结束后，
其执行环境与作用域链被销毁，但是其活动对象保存在了闭包之中，最后在闭包函数调用结束后才销毁。简单的说，闭包就是能够读取其他函数内部变量的函数。
在```js```中，闭包是指有权访问另一个函数作用域中的变量的函数。

### 闭包的作用
* 匿名自执行函数

有的场景下函数只需要执行一次，例如```init()```之类的函数，其内部变量无需维护，我们可以使用闭包。 我们创建了一个匿名的函数，
并立即执行它，由于外部无法引用它内部的变量，因此在函数执行完后会立刻释放资源，而且**不污染全局对象**。

* 封装

模拟面向对象的代码风格进行封装，使私有属性存在成为可能。

### 缺点
* 常驻内存，会增大内存使用量，易造成内存泄露


## ```js```跨域的解决方案

### ```JSONP```
#### 原理
网页通过添加一个```<script>```元素，向服务器请求```JSON```数据，这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。

#### 优点
* 兼容性好，简单易用，支持浏览器与服务器双向通信

#### 缺点
* 只支持GET请求
* 存在脚本注入以及跨站请求伪造等安全问题

### ```CORS```
跨域资源共享```(CORS)```允许浏览器向跨源服务器发送```AJAX```请求。需由服务器向浏览器发送一个响应标头```Access-Control-Allow-Origin```。如果浏览器检测到相应的设置，就可以允许```Ajax```进行跨域的访问。

### 通过修改```document.domain```来跨子域
在两个域名都属于同一基础域名且协议端口都一致的情况下，将子域和主域的```document.domain```设为同一个主域。

### 使用```window.name```来进行跨域
浏览器窗口有```window.name```属性。这个属性的最大特点是，无论是否同源，只要在同一个窗口里，所有的页面都是共享一个```window.name```的，每个页面对```window.name```都有读写的权限，```window.name```是持久存在一个窗口载入过的所有页面中的。

#### 优点

* ```window.name```容量很大，可以放置非常长的字符串。

#### 缺点

*  必须监听子窗口```window.name```属性的变化，影响网页性能。

### 跨文档通信 ```API（Cross-document messaging）```
使用```HTML5```的新```API```-```window.postMessage```也能完成跨域，这个```API```为```window```新增一个```postMessage```的方法，允许跨窗口通信，不论这两个窗口是否同源。这个方法通过其他窗口的一个引用来发消息，
```
var popup = window.open('https://github.com/Rcong', 'msg');
popup.postMessage('post a message!', 'https://github.com/Rcong');
```
被引用的那个窗口监听```message```事件
```
window.addEventListener("message", function(e) {
  console.log(e.data);
}, false);
```
就能取得传递过来的数据。


## ```ajax```能否跨域?
可以。通过```CORS```，跨域资源共享```(CORS)```允许浏览器向跨源服务器发送```AJAX```请求。需由服务器向浏览器发送一个响应标头```Access-Control-Allow-Origin```。如果浏览器检测到相应的设置，就可以允许```Ajax```进行跨域的访问。


## 上传跨域资源的图片的几种方案

### 表单上传
用传统的```form```表单来上传，使用```form```表单的```input[type=”file”]```控件，可以打开系统的文件选择对话框，从而达到选择文件并上传的目的。

#### 优点
* 多浏览器兼容。

#### 缺点
* 不支持多图上传、分段上传等高级特性。

### ```Ajax```无刷新上传
本质上与表单上传相同，只是把表单里的内容提出来采用```Ajax```提交，并且由前端决定请求结果回传后的展示结果，不用像直接表单上传那样刷新和跳转页面。

### 截图粘贴上传

#### 原理
监听粘贴事件 -> 获取剪切板中的数据 -> 如果是一张图片，则触发上传事件

当进行粘贴(右键```paste/ctrl+v```)操作时，触发剪贴板事件```paste```，从系统剪切板获取内容，而系统剪切板的数据在不同浏览器保存在不同的位置

* ```IE```内核：```windows.clipboardData```
* 其它浏览器：```e.originalEvent.clipboardData```

#### 缺点
* 浏览器支持力度不够,目前对剪切板支持的比较好的只有```Chrome```的高版本浏览器，```IE```的```window```对象的```clipboardData```和```FF```事件对象的```clipboardData```，都无法获取图片文。

### 拖拽上传
利用了```HTML5```的两个新的属性
* ```Drag and Drop```[(http://caniuse.com/#search=drag)](http://caniuse.com/#search=drag)
* ```File API```[(http://caniuse.com/#search=file)](http://caniuse.com/#search=file)

#### 核心代码
```
var textarea = document.querySelector('textarea');
textarea.addEventListener('drop', function(e){
  e.stopPropagation();
  e.preventDefault();
  var files = e.dataTransfer.files;
  for (var i = 0, len = files.length; i < len; i++) {
      var file = files[i];
      if(!/^image*/.test(file.type)){
          return;
      }
      var fileReader = new FileReader();
      fileReader.onload = function(){
          //调用上传图片的方法
      }
      fileReader.readAsDataURL(file);
  }
});
```

#### 原理
* 监听上传区域的```drop```事件
* 触发后通过```e.dataTransfer.files```获取拖拽文件列表
* 根据文件对象中```file.type```判断上传类型
* 创建```FileReader```对象使用二进制方式读取图片，当读取完之后执行上传图片的方法。

#### 缺点
* 只有高级浏览器支持


## ```AMD```、```CMD```、```CommonJS```规范

### ```AMD```
**AMD** 是```RequireJS```在推广过程中对模块定义的规范化产出。
**AMD**异步加载模块，它的模块支持对象、函数、构造器、字符串、```JSON```等各种类型的模块。
通过数组引入依赖，回调函数通过形参传入依赖
```
define(['jquery'], function( $ ){
    
    var jsGoTop = (function(){
      
      //一些函数....
      
      return {
        init: init,
        create: create
      }
      
    })();
    
    return jsGoTop;

});
```
对于依赖的模块```AMD```是提前执行。

### ```CMD```
**CMD** 是```SeaJS```在推广过程中对模块定义的规范化产出。
```
define(function( $ ){

  var jsGoTop = require('./jsGoTop');
  jsGoTop.init();

})
```
对于依赖的模块```CMD```是延迟执行。

### ```CommonJS```
**CommonJS**是服务器端模块化的规范，```Node.js```就是采用这个规范的。

**CommonJS**的规范中，一个单独文件就是一个模块，使用```require```方法加载模块，这个方法会读取文件并执行，然后返回文件内部的```exports```对象。

**CommonJS**采用**同步**加载模块的方式，不适用浏览器环境。


## 事件委托
事件委托也称为事件代理，利用了事件冒泡机制(一个元素上的事件被触发，则同样的事件将会在那个元素的所有祖先元素中被触发)，通过在这任意一个祖先元素添加监听，当子元素触发事件时，事件就会一层层冒泡上来，在添加监听的那一层级被捕获，然后通过```e.target```判断目标元素。

### 优点
* 不同挨个为多个子元素添加监听，减少驻留在内存中的事件处理器。


## 前端性能优化

* 减少HTTP请求次数

合并```js```、合并```css```、使用图```sprite```

* 压缩静态资源减少文件体积

图片、```CSS```、```JS```在发布前要压缩，服务器开启```Gzip```，还能能减少**50%**以上的传输。 

* 静态资源使用```CDN```存储

用户与网站服务器的距离会影响响应时间的长短。可以把静态资源放到内容分发网络```(Content Delivery Network，CDN)```中加快访问速度。

* 延迟加载内容

一些图片资源采用使用懒加载的策略。

* 优化```DOM```操作

缓存已经访问过的有关元素
避免使用```JavaScript```来修改页面布局，减少```DOM```操作次数。

* 优化算法

在```js```处理中优化查找、排序算法。尽量少使用嵌套循环。

* 使用事件代理

* 减少DNS查找次数

* 根据域名划分页面内容

* 缓存的```AJAX```

* 使iframe的数量最小

**ifrmae**元素可以在父文档中插入一个新的HTML文档。

**iframe**优点： 解决加载缓慢的第三方内容如图标和广告等的加载问题; Security sandbox; 并行加载脚本;

**iframe**的缺点： 即时内容为空，加载也需要时间; 会阻止页面加载; 没有语意;

* 为文件头指定```Expires```或```Cache-Control```

* 避免使用```CSS```表达式```（Expression）```

**CSS**表达式计算频率高，对页面性能产生影响。

* 不要在```HTML```中缩放图像

