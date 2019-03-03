"use strict";

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

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
var Person = (_dec = test(function () {
  console.info(111);
}), (_class =
/*#__PURE__*/
function () {
  function Person() {
    _classCallCheck(this, Person);
  }

  _createClass(Person, [{
    key: "run",
    value: function run() {
      console.info('run');
    }
  }]);

  return Person;
}(), (_applyDecoratedDescriptor(_class.prototype, "run", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "run"), _class.prototype)), _class));

function test(fn) {
  return function (target, name, descriptor) {
    var oldFn = descriptor.value;

    if (typeof fn !== 'function') {
      console.info('error~~~');
      return;
    }

    fn();

    descriptor.value = function () {
      return oldFn.apply(this, arguments);
    };
  };
}

var person = new Person();
person.run();
