# typeof

基本类型:undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、Symbol中除了null都返回正确结果。
引用类型:Array、Object、Function、Date中除了Function都返回错误结果。

# instanceof

- 只能判断两个对象是否属于实例关系， 而不能判断一个对象实例具体属于哪种类型。
- Array.isArray()判断数组

# toString
```
Object.prototype.toString.call(obj).slice(8,-1).toLowerCase()
```