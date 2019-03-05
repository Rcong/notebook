"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectFunc = void 0;

var injectFunc = function injectFunc(func) {
  return function (target, name, descriptor) {
    var rawFunc = descriptor.value || descriptor.initializer();

    descriptor.value = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      func.call.apply(func, [this].concat(args));
      return rawFunc.apply(this, args);
    };

    return descriptor;
  };
};

exports.injectFunc = injectFunc;