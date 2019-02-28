
// track by decorator
/* class SomeComponent {
 *     @track(before(() => console.log('hello, trackpoint')))
 *     onClick = () => {
 *         ...
 *     }
 * }*/
// 

export let test = fn => (target, name, descriptor) {
    const fn = descriptor.value;

    descriptor.value = function() {
        let value = fn.apply(this, arguments);
        msgChannel.publish(topic, value);
    };
}