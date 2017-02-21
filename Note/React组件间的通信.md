# 父组件 => 子组件
- 父组件可以向子组件通过传```props```的方式,向子组件进行通讯
```
class Parent extends Component {
    state = {
        info: 'Hello'
    };

    render() {
        return <Child info={this.state.info}/>;
    }
}

class Child extends Component {
    render() {
        return (
            <div>{this.props.info}</div>
        )
    }
}
```
- 使用Ref属性

# 子组件 => 父组件
- 通过回调函数,父组件把作用域为自身的函数当做props传给子组件,子组件调用该函数,将(子组件)想要传递的信息,作为参数,传递到父组件的作用域中

# 任意组件间通信
- 使用一些开发模式,例如观察者模式、发布订阅模式