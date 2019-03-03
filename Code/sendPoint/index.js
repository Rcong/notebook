class Person {

    @test(() => { console.info(111) })
    run(){
        console.info('run')
    }

}

function test(fn){
    return function(target, name, descriptor){
        const oldFn = descriptor.value;

        if (typeof fn !== 'function') {
            console.info('error~~~');
            return;
        }
    
        fn()
        descriptor.value = function() {
            return oldFn.apply(this, arguments);
        };
    }
}

const person = new Person();
person.run();