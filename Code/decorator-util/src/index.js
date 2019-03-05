export const injectFunc = func => (target, name, descriptor) => {

    const rawFunc = descriptor.value || descriptor.initializer();

    descriptor.value = function(...args) {
        func.call(this, ...args)
        return rawFunc.apply(this, args);
    };

    return descriptor;
}