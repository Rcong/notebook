## 请解释事件代理```(event delegation)```

事件代理也称为事件委托，利用了事件冒泡。例如：

```html
<ul class="item-list">
    <li class="item">item1</li>
    <li class="item">item2</li>
    <li class="item">item3</li>
</ul>
```

当页面```li```增多时单独给每个```li```元素添加事件处理程序既繁琐又容易出错，利用事件冒泡，在```ul```去监听事件，```li```产生事件往上冒泡时去捕获，利用```e.target```来判断是否为我们的目标元素，是的话就可以做相应操作了。

## 请解释```JavaScript```中```this```是如何工作的。

* 作为独立函数的调用

```javascript
function func(){
    console.log(this);
}


func();
//Window

```

全局作用域中声明一个函数,并调用它,此时函数中的this指向全局对象。

* 作为对象方法调用

```javascript
function say(){
    console.log(this);
}

var obj = {
    name: "f2er",
    say: say
};

obj.say();
//Object {name: "f2er"}
```

当函数作为一个对象的方法调用时,函数中的```this```绑定到了这个对象。

* 使用call或apply来调用函数

```javascript
function func(){
    console.log(this);
}

var obj = {
    name:"f2er"
};

func.call(obj);
//Object {name: "f2er"}

func.apply(obj);
//Object {name: "f2er"}

```

当使用```call()```或```apply()```函数进行函数调用时,传入参数对象的将被设置为函数体内```this```的值,这两个函数都是设置调用函数体内的```this```值的,且第一个参数都为```this```,区别是第二个参数```apply()```是一个参数```arguments```(类数组对象),而```call()```,传递给他的是一系列参数。

* ```new```来调用函数

```javascript
function F2er(name){
    this.name = name;   
    console.log(this);
}

var f2er = new F2er('f2er');
// F2er {name: "f2er"}
```

当使用```new```来调用一个函数时,会创建一个新的对象,然后绑定到```Dog()```调用中的```this```。

## 请解释原型继承```(prototypal inheritance)```的原理。

先上一个例子:
```javascript
function Super(){
    this.superValue = "super";
}

Super.prototype.getSuperValue = function (){
    return this.superValue;
}

function Sub(){
    this.subValue = "sub";
}

var superInstance = new Super();

Sub.prototype = superInstance;

Sub.prototype.getSubValue = function (){
    return this.subValue;
}

var instance = new Sub();
console.log(instance.getSuperValue());
// super
```

每个函数```Sub```都有一个属性```prototype```，```prototype```指向一个原型对象，原型对象中也有一个指向函数的属性```constructor```，通过```new```一个函数```Sub```可以产生实例```instance```，调用这个```instance```的某个属性或方法时，```instance```会先查找自身是否有这个方法或者属性，没有的话就会去实例的构造函数```Sub```的原型```prototype```中查找，即```Sub.prototype```，如果给原型对象```Sub.prototype```赋予另一个类型的实例```superInstance```，则是在```superInstance```中查找的，这个```superInstance```中也有属性```prototype```指向某个原型对象，以此一级级往上最终到```Object.prototype```，这样就形成了原型继承。

利用此原理可以自己实现一个inherits函数：
```javascript
function inherits(subType, superType){
    var _prototype = Object.create(superType.prototype);
    _prototype.constructor = subType;
    subType.prototype = _prototype;
}
```

## IIFE(立即调用的函数表达式)是什么?有什么作用?

>(function fn(){..})(),函数被包含在一个括号内,变成为一个表达式,随后跟着一个(),就立即执行这个函数,

这种模式就是**立即执行函数表达式(Immediately Invoked Function Expression)**,简称IIFE。

﻿也有用(function fn(){..}())后面的括号在前面的括号内这种形式表示的,这两种形式在功能上都是一致的。

IIFE的一些作用:

* 创建作用域,内部保存一些大量临时变量的代码防止命名冲突。
* 一些库的外层用这种形式包起来防止作用域污染。
* 运行一些只执行一次的代码。

```javascript

(function(){

    var module = require('module');

    module.setup();

    module.run();

})();

```

* 用闭包保存状态

以下点击页面标签的时候，实际并不是弹出每个具体的```i```的，而是```elems.length```，因为每个```a```监听器中引用的```i```都是同一个作用域的。
```javascript
var elems = document.getElementsByTagName('a');

for (var i = 0; i < elems.length; i++) {
    elems[i].addEventListener('click', function (e) {
        e.preventDefault();
        alert('I am link #' + i);
    }, 'false');
}
```

以下点击页面标签的时候，每一个```i```传入一个```IIFE```，```IIFE```形成单独一个作用域保存了当时的```i```值，所以点击```a```标签，可以弹出不同的```i```值。
```javascript
var elems = document.getElementsByTagName('a');

for (var i = 0; i < elems.length; i++) {
    (function (lockedInIndex) {
        elems[i].addEventListener('click', function (e) {
            e.preventDefault();
            alert('I am link #' + lockedInIndex);
        }, 'false');
    })(i);
}
```

## 什么是闭包(closure)，有什么作用?

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

## 请指出 JavaScript 宿主对象和原生对象的区别？
* 宿主对象是指DOM和BOM。
* 原生对象是Object、Function、Array、String、Boolean、Number、Date、RegExp、Error、Math等对象。

## 请指出以下代码的区别:```function Person(){}、var person = Person()、var person = new Person()```?

* ```function Person(){}```

声明一个函数```Person()```。

* ```var person = Person()```

将函数```Person()```的结果返回给变量```person```，如果没有返回值则```person```为```undefined```。


* ```var person = new Person()```

实例化一个```Person```的对象。

## ```.call```和```.apply```的区别是什么?

共同点:```call()```和```apply()```都是用来改变函数体内```this```对象的值。

区别:第二个参数不一样。```apply()```的第二个参数是一个类数组对象```arguments```,参数都是以数组的形式传入,而```call()```,传递给他的是一系列参数。例如
```
Math.max.call(null, 1, 2, 3, 4);
//4

Math.max.apply(null, [1, 2, 3, 4]);
//4
```

## 请解释```Function.prototype.bind```

> ```Function.prototype.bind```方法会创建一个新函数，当这个新函数被调用时，它的```this```值是传递给```bind()```的第一个参数, 它的参数是```bind()```的其他参数和其原本的参数.

### ```Function.prototype.bind```的实现类似于:

```javascript
Function.prototype.bind = function (scope) {
    var fn = this;
    return function () {
        return fn.apply(scope, arguments);
    };
}
```

### ```Function.prototype.bind```的作用

* 创建绑定函数
* 一些函数的参数常常也是函数，给当做参数的函数绑定```this```值确保参数函数执行时有正确的```this```指向。


## ```Ajax```的工作原理

> ```Ajax```是无需刷新页面就能从服务器取得数据的一种方法。

### 原理
.```Ajax```通过```XmlHttpRequest```对象来向服务器发异步请求，从服务器获得数据，然后用```javascript```来操作```DOM```更新页面。

### 过程

1. 创建```XMLHttpRequest```对象。
1. 设置响应```HTTP```请求的回调函数。
1. 创建一个```HTTP```请求，指定相应的请求方法、```url```等。
1. 发送```HTTP```请求。
1. 获取服务器端返回的数据。
1. 使用```JavaScript```操作```DOM```更新页面。


### 缺点

* 对搜索引擎不友好
* 要实现```Ajax```下的前后退功能成本较大
* 跨域问题限制

## ```JSONP```的工作原理

>```JSONP（JSON with Padding）```是一种非官方跨域数据交互协议，它允许在服务器端集成```<script>```标签返回至客户端，通过```javascript```回调的形式实现跨域访问。

因为同源策略的原因，我们不能使用```XMLHttpRequest```与外部服务器进行通信，但是```<script>```可以访问外部资源，所以通过```JSON```与```<script>```相结合的办法，可以绕过同源策略从外部服务器直接取得可执行的```JavaScript```函数。

### 原理

客户端定义一个函数，比如```jsonpCallback```，然后创建```<script>```，```src```为```url + ?jsonp=jsonpCallback```这样的形式，之后服务器会生成一个和传递过来```jsonpCallback```一样名字的参数，并把需要传递的数据当做参数传入，比如```jsonpCallback(json)```，然后返回给客户端，此时客户端就执行了这个服务器端返回的```jsonpCallback(json)```回调。

通俗的说，就是客户端定义一个函数然后请求，服务器端返回的```javascript```内容就是调用这个函数，需要的数据都当做参数传入这个函数了。

* 优点 - 兼容性好，简单易用，支持浏览器与服务器双向通信

* 缺点 - 只支持GET请求；存在脚本注入以及跨站请求伪造等安全问题

补充一点，```JSONP```不使用```XMLHttpRequest```对象加载资源，不属于真正意义上的```AJAX```。


## 变量声明提升(hoisting)

>**变量的声明前置**就是把变量的声明提升到当前作用域的最前面。

**函数的声明前置**就是把整个函数提升到当前作用域的最前面(位于前置的变量声明后面)。

```javascript

//变量的声明前置

console.log(num);//undefined

var num = 1;



等价于



//变量的声明前置

var num;

console.log(num);//undefined

num = 1;

```

```javascript

//函数的声明前置

var num = 1;

console.log(doubleNum(num));//2

function doubleNum(num){

    return num*2;

}



等价于



//函数的声明前置

var num;

function doubleNum(num){

    return num*2;

}

num = 1;

console.log(doubleNum(num));//2

```


## 事件冒泡机制(event bubbling)

事件冒泡(event bubbling)，事件最开始时由触发的那个元素身上发生，然后沿着```DOM```树向上传播，直到```document```对象。如果想阻止事件起泡，可以使用```e.stopPropagation()```。


## ```JavaScript```的同源策略

> 同源策略限制了一个**源(origin)**中加载文本或脚本与来自其它**源(origin)**中资源的交互方式。同源指的是协议、域名、端口相同，同源策略是一种安全协议。

### 目的

同源策略保证了用户的信息安全，浏览器打开多个站点时，互相之间不能利用```JavaScript```获取对方站点的敏感信息。

### 一些跨域技术

* JSONP
* CORS
* 修改document.domain来进行跨域
* 使用window.name来进行跨域
* 使用window.postMessage来进行跨域

## 什么是```"use strict"```?使用它的好处和坏处分别是什么?

> 在所有语句之前放一个特定语句```"use strict"```，就会为整个script标签开启严格模式。

### 优点

* 消除```Javascript```语法的一些不严谨之处，减少一些怪异行为;
* 消除代码运行的一些不安全之处，保证代码运行的安全；
* 提高编译器效率，增加运行速度；
* 为未来新版本的```Javascript```做好铺垫。

### 缺点

* 严格模式改变了语义。依赖这些改变可能会导致没有实现严格模式的浏览器中出现问题或者错误。
