#浮动(Floats)原理与清除浮动

##浮动概念

浮动元素会脱离文档的普通流,根据```float```的值向左或向右移动,直到它的外边界碰到父元素的内边界或另一个浮动元素的外边界为止。由于浮动框不在文档的普通流中,所以文档的普通流中的块级元素表现得就像浮动元素不存在一样。

##浮动影响

###浮动元素会造成父元素塌陷###

当给元素设置```float```之后,元素脱离文档流,父元素没有设置```height```,造成塌陷。

```
<div class="super">
	<div class="sub"></div>
</div>

.super{
	border:1px solid blue;
}

.sub{
  float: left;
  background: pink;
  border: 1px solid red;
  width: 100px;
  height: 100px;
}
```
![clipboard.png](https://sfault-image.b0.upaiyun.com/240/264/2402642223-577d1c30844e7)

###浮动元素的左(右)外边界不能超出其父元素的左(右)内边界。###

在不设置```margin```为负值和父元素还有剩余空间的情况下,浮动元素的外边界```(margin)```不会超出父元素的内边界```(padding)```。

```
<div class="super">
    <div class="sub1"></div>
    <div class="sub2"></div>
</div>

.super{
	margin: 0 auto;
	padding: 10px;
	border:1px solid blue;
 	width: 300px;
}

.super:after{
  clear: both;
  content: '';
  display: block;
}

.sub1{
  float: left;
  background: pink;
  border: 1px solid red;
  width: 100px;
  height: 100px;
}

.sub2{
  float: right;
  background: pink;
  border: 1px solid red;
  width: 100px;
  height: 100px;
}
```
![clipboard.png](https://sfault-image.b0.upaiyun.com/368/077/3680778964-577d1f45e911f)

###浮动元素不会重叠。###

这个也是在```margin```不会为负值和父元素还有剩余空间的条件下适用的。
这个是我对《CSS权威指南》中浮动这一章节中规则二和规则三的理解,以下是原文。

>2.The left (or right) outer edge of a floated element must be to the right (or left) of the right (left) outer edge of a left-floating (or right-floating) element that occurs earlier in the document’s source, unless the top of the later element is below the bottom of the former.

>3.The right outer edge of a left-floating element may not be to the right of the left outer edge of any right-floating element to its right. The left outer edge of a right- floating element may not be to the left of the right outer edge of any left-floating element to its left.

这两个规则是保证两个浮动元素不重叠的基础。

表现为当一个浮动元素往左(右)靠的时候,在这个元素左(右)边已经存在一个浮动元素,他们不会重叠,后来者紧挨着先来者排列。如果浮动元素们的总宽度已经超过父元素的宽度,浮动元素之间也不会重叠,依照```HTML```结构的顺序,从在一行排列不下的浮动元素开始会移动到下一行。

[例子戳这里!](http://codepen.io/Rcong/pen/QErjXa)
![clipboard.png](https://sfault-image.b0.upaiyun.com/113/134/1131348872-577d2c703bd8f)

### 浮动元素的顶端不能比其父元素的内顶端更高,不能比之前出现的浮动元素顶端高。

这个规则也是在```margin-top```不为负值的情况下成立。

父元素的顶端会限制浮动元素,防止一直浮动到页面顶端。
对于下图右边的例子,```sub2```在```sub1```下面,```sub1```右边的空间已经不足以容纳```sub2```,但是足够容纳```sub3```,而```sub3```没有上浮,那是因为他的的顶端就不能超过```sub2```的顶端,这个例子足以印证**浮动元素的顶端不能比之前出现的浮动元素顶端高**。

[例子戳这里!](http://codepen.io/Rcong/pen/zBdABQ)
![clipboard.png](https://sfault-image.b0.upaiyun.com/185/836/1858363307-577e55af59bf1)


##清除浮动

清除浮动的目的是为了解决高度塌陷的问题,撑开浮动父元素。常用的一般有几种方法:

### 增加一个样式为```clear:both```的空标签

```javascipt
<div style="clear:both;"></div>
```

把上面这句标签放到浮动元素的父元素的最后。

**原理**:```clear```会在元素的```margin-top```之上增加一个```清除区域(clearance)```,这个区域会在元素的```margin-top```上增加额外间隔,并且不允许浮动元素进入这个区域。

* 优点:方便,兼容性强。
* 缺点:多出许多无意义的标签,增加维护成本,而且稍不注意中间多了个空格会产生一段空白高度。


### 父元素设置浮动

优点:简单,代码少,浏览器支持好。
缺点:父级使用浮动之后,浮动造成的影响仍旧存在,并且不可能父级往上一级级都使用浮动。


### 使用```overflow```、```zoom```属性

```css
.fix{
    overflow:hidden(auto、scroll);
    zoom:1;
}
```

* 优点:代码简洁,兼容性好,不产生多余标签。
* 缺点:设置该```fix```类的标签的内容超出该标签的时候会被隐藏(或产生滚动条)。


### 父元素设置浮动

优点:简单,代码少,浏览器支持好。
缺点:父级使用浮动之后,浮动造成的影响仍旧存在,并且不可能父级往上一级级都使用浮动。


### 父元素设置```position```

原理:在```position```的值不为```relative```或```static```的情况下,会形成BFC。

这种方式在父元素原本就需要设置```position```为```fixed```或者```absolute```的时候可以优先采用。

优点:简单,代码少,浏览器支持好。
缺点:改变父元素布局,影响整体布局。


### 使用```：after```

```css
.fix:after{
    display:block;
    content:'';
    clear:both;
}
```
原理类似添加新的标签然后设置```clear:both;```,但使用伪类的方法没有多余标签。

* 优点:代码简洁,兼容性好,不产生多余标签。


以上方法中,第一种增加一个样式为```clear:both```的空标签的方法不建议使用,会增加无意义标签,其他设置父元素浮动,改变父元素```position```、```overflow```的方法依情况而定,如果父元素本身就有这方面的样式需求,那很合适,如果没有的话还是采用最后一种伪元素的```:after```的方式最为常见。

## 总结
关于浮动的学问还有更可深入的空间,这篇博客也只是对自己学习的成果起到梳理作用,对于浮动在各场景产生的影响,需要大量的实践去累积去体会,才能深刻掌握```float```,在日后有新的认识的时候会再回来更新,如有不同见解也欢迎大家前来指正。


## 参考
* 《CSS权威指南》
* [CSS float浮动的深入研究、详解及拓展(一) by 张鑫旭](http://www.zhangxinxu.com/wordpress/2010/01/css-float%E6%B5%AE%E5%8A%A8%E7%9A%84%E6%B7%B1%E5%85%A5%E7%A0%94%E7%A9%B6%E3%80%81%E8%AF%A6%E8%A7%A3%E5%8F%8A%E6%8B%93%E5%B1%95%E4%B8%80/)
* [CSS float浮动的深入研究、详解及拓展(二) by 张鑫旭](http://www.zhangxinxu.com/wordpress/2010/01/css-float%E6%B5%AE%E5%8A%A8%E7%9A%84%E6%B7%B1%E5%85%A5%E7%A0%94%E7%A9%B6%E3%80%81%E8%AF%A6%E8%A7%A3%E5%8F%8A%E6%8B%93%E5%B1%95%E4%BA%8C/#)
