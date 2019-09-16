// //校验/过滤
// class Person {
//     constructor(name) {
//         this.name = name;
//     }
// }

// const proxy = new Proxy(Person, {
//     construct(target, args) {
//         console.log('constructor called');
//         // 可以在这里检查 new 对象的时候传的参数是否正确
//         return new target(...args);
//     },
// });

// new proxy('咸鱼君');



//日志/统计
let data = { name: '咸鱼君', money: '123' };

let proxy = new Proxy(data, {
    set: (target, key, value) => {
        console.log(`设置 ${key}: ${target[key]} -> ${value}`);
        target[key] = value;
    },
});

proxy.name = '等风的飞机';
// 设置 name: 咸鱼君 -> 等风的飞机

proxy.money = '99999999';
//设置 money: 123 -> 99999999
