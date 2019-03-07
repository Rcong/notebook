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