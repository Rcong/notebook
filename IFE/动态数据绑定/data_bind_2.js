function Observer(data) {
    this.data = data;
    this.handlers = {};
    this.traversal(data);
}

Observer.prototype.traversal = function(obj) {
    let val;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            val = obj[key];

            if (typeof val === 'object') {
                new Observer(val);
            }
            this.convert(key, val);
        }
    }
}

Observer.prototype.convert = function(key, val) {
    var self = this;
    Object.defineProperty(this.data, key, {
        configurable: true,
        enumerable: true,
        get: function() {
            console.log(`你访问了 ${key}`);
            return val;
        },
        set: function(newVal) {
            console.log(`你设置了 ${key}, 新的值为${newVal}`);
            if (val === newVal) return;
            self.$emit(key, newVal);
            if (typeof newVal === 'object') {
                new Observer(newVal);
            }
            val = newVal;
        }
    });
}

Observer.prototype.$watch = function(key, callback) {
    !this.handlers[key] && (this.handlers[key] = []);
    this.handlers[key].push(callback);
}

Observer.prototype.$emit = function(key) {
    if (this.handlers[key]) {
        var callbackArgs = Array.prototype.slice.call(arguments, 1);
        for (var i = 0; i < this.handlers[key].length; i++) {
            this.handlers[key][i].apply(this, callbackArgs);
        }
    }
}

let app1 = new Observer({
    name: 'youngwind',
    age: 25
});

// 你需要实现 $watch 这个 API
app1.$watch('age', function(age) {
    console.log(`我的年纪变了，现在已经是：${age}岁了`)
});

app1.data.age = 100; // 输出：'我的年纪变了，现在已经是100岁了'