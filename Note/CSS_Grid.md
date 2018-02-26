
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


# 参考
- [MDN 网格布局](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout)
- [CSS Grid 布局完全指南(图解 Grid 详细教程)](http://www.css88.com/archives/8510)
- [Things I’ve Learned About CSS Grid Layout](https://css-tricks.com/things-ive-learned-css-grid-layout/)