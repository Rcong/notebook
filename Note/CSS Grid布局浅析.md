
**CSS Grid**是一种创建网格布局的方式，他的出现作为对flexbox不足的一种补充(一维布局)，可以同时处理列和行。与flexbox类似，通过对 **父容器(Grid Container)和子元素(Grid Items)** 设置相应的CSS Grid规则，可以比较容易的实现网格布局和定义组件内部元素间大小、位置和图层之间的关系。

# 浏览器支持
截止至2017年底，浏览器对CSS Grid的支持度:

![css-grid-caniuse](http://7xrunf.com1.z0.glb.clouddn.com/blog/cssgrid/css-grid-caniuse.png)

# 重要概念

## 网格容器(Grid Container)

网格子元素的直接父元素，类似于flex布局中的父级容器的概念。下面这个例子中```wrapper```就是网格容器。
```
<div class="wrapper">
    <div class="one">One</div>
    <div class="two">Two</div>
    <div class="three">Three</div>
</div>
```

## 网格项(Grid Item)

网格容器(Grid Container)的**直接子元素**。划重点，直接子元素哦。
这里的```one```、```two```、```three```都是网格项，但是```four```并不是。
```
<div class="wrapper">
    <div class="one">One</div>
    <div class="two">
        <div class="four"></div>
    </div>
    <div class="three">Three</div>
</div>
```

## 网格线(Grid Line)

构成网格结构的水平垂直分割线。例如:

![grid_line](http://7xrunf.com1.z0.glb.clouddn.com/blog/cssgrid/grid_line1.png)

这里的橙色线条就是网格线，网格线有数字索引，也可以自定义命名。

## 网格轨道(Grid Track)
相邻网格线之间行程的内容空间。即某一列或者某一行，```one```、```two```、```three```形成的行或者```one```、```four```形成的列都是。
![grid_track](http://7xrunf.com1.z0.glb.clouddn.com/blog/cssgrid/grid_track.png)

## 网格单元格(Grid Cell)
相邻列网格线和相邻行网格线形成的内容区域格子。
![grid_cell](http://7xrunf.com1.z0.glb.clouddn.com/blog/cssgrid/grid_cell.png)

## 网格区域(Grid Area)
两条列网格线(不一定是相邻)和两条行网格线(不一定是相邻)形成的内容区域格子。

![grid_area](http://7xrunf.com1.z0.glb.clouddn.com/blog/cssgrid/grid_area.png)


# 实例

## 基本例子

使用CSS Grid来布局的时候，设置一个Dom元素为父容器，然后设置其属性```display```为```grid```、```subgrid```、```inline-grid```的其中一项，则这个Dom元素的子元素就会就会成为网格项目（grid item）,给父容器设置```grid-template-rows```与```grid-template-columns```属性来规定网格的行与列，这样一个基本的网格布局就形成了。

```
.wrapper {
    display: grid;
    grid-template-columns: 50px 100px 200px;
    grid-template-rows: 100px 200px;
}
.wrapper div {
    background: #ffd8a8;
    opacity: 0.5;
    border: 1px solid #ffa94d;
}
```
![demo1](http://7xrunf.com1.z0.glb.clouddn.com/blog/cssgridcss_grid_demo.png)

其中```grid-template-columns: 50px 100px 200px;```代表设置3列，每列分别为50px 100px 200px，如果没有则默认一列，宽度撑满父元素。```grid-template-rows: 100px 200px;```也是类似，代表两行，分别为100px和200px。```grid-template-columns```与```grid-template-rows```还有更丰富的设置样式方式:

```
//一列100px，剩余一列填满屏幕剩下区域
grid-template-columns: 100px 1fr;
//自定义网格线名字
grid-template-columns: [linename] 100px;
//自定义网格线多个名字
grid-template-columns: [linename1] 100px [linename2 linename3];
//最小100px, 最大满屏
grid-template-columns: minmax(100px, 1fr);
//最大值不超过屏宽40%
grid-template-columns: fit-content(40%);
//重复三列200px
grid-template-columns: repeat(3, 200px);
```

详情参考[MDN grid-template-columns](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-columns)

## 圣杯布局
```css
.wrapper {
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: 100px 1fr 50px;
    min-height: 100vh;
    height: 100vh;
}
.wrapper div {
    background: #ffd8a8;
    opacity: 0.5;
    border: 1px solid #ffa94d;
}
.header {
    grid-column: 1 / 4;
    grid-row: 1 / 2;
}
.footer {
    grid-column: 1 / 4;
    grid-row: 3 / 4;
}
```
```html
<div class="wrapper">
    <div class="header">header</div>
    <div class="left-side">left-side</div>
    <div class="main">main</div>
    <div class="right-side">right-side</div>
    <div class="footer">footer</div>
</div>
```

# 参考
- [MDN 网格布局](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout)
- [CSS Grid 布局完全指南(图解 Grid 详细教程)](http://www.css88.com/archives/8510)
- [Things I’ve Learned About CSS Grid Layout](https://css-tricks.com/things-ive-learned-css-grid-layout/)