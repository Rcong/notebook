'use strict';

export const injectFunc = func => (target, name, descriptor) => {

    const rawFunc = descriptor.value || descriptor.initializer();

    descriptor.initializer = descriptor.initializer ? function(...args) {
        func.call(this, ...args)
        return rawFunc.apply(this, args);
    } : descriptor.initializer;

    descriptor.value = descriptor.value ? function(...args) {
        func.call(this, ...args)
        return rawFunc.apply(this, args);
    } : descriptor.value;

    return descriptor;
}

export const debounce = (time = 500) => (target, name, descriptor) => {

    const value = descriptor.value || descriptor.initializer();
    
    if (typeof value !== 'function') {
        throw new TypeError('Can not decorate without function!');
    }

    descriptor.value = function(...args) {
        
        clearTimeout(value.id);
        value.id = setTimeout(() => {
            value.apply(this, args);
        }, time)

    };

    return descriptor;

};
