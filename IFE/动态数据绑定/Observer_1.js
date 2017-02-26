function Observer(data) {
    this.data = data;
    this.traversal(data);
}

Observer.prototype.traversal = function(obj){
    let val;
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            val = obj[key];

            if(typeof val === 'object'){
                new Observer(val);
            }
            this.convert(key, val);
        }
    }
}

Observer.prototype.convert = function(key, val){
    Object.defineProperty(this.data, key, {
        configurable: true,
        enumerable: true,
        get: function(){

        },
        set: function(newVal){
            console.log(`你设置了 ${key}, 新的值为${newVal}`);
            if(val === newVal) return;
            val = newVal;
        }
    });
} 