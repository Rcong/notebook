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

> 闭包是指有权访问另一个函数作用域中的变量的函数。

### 闭包的作用
* 避免全局变量的污染
* 实现内部变量真正的私有化

### 闭包的缺点
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
