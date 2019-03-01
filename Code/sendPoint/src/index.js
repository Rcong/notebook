
// track by decorator
/* class SomeComponent {
 *     @track(before(() => console.log('hello, trackpoint')))
 *     onClick = () => {
 *         ...
 *     }
 * }*/
// export const track = partical => (target, key, descriptor) => {

//     const value = function (...args) {
//         return partical.call(this, descriptor.value, this).apply(this, args)
//     }

//     if (descriptor.initializer) {
//         return propSet('initializer', function() {
//                 const value = descriptor.initializer.apply(this);
//                 return function (...args) {
//                 return partical.call(this, value, this).apply(this, args);
//             }
//         }, descriptor);
//     }

//     return propSet('value', value, descriptor)
// }


export let test = fn => (target, name, descriptor) => {
    
    const oldFn = descriptor.value;

    if (typeof fn !== 'function') {
        console.info('error~~~');
        return oldFn.apply(this, arguments);
    }

    descriptor.value = function() {
        return oldFn.apply(this, arguments);
    };

}