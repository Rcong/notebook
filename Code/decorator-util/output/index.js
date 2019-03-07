"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectFunc = void 0;

var injectFunc = function injectFunc(func) {
  return function (target, name, descriptor) {
    var rawFunc = descriptor.value || descriptor.initializer();
    descriptor.initializer = descriptor.initializer ? function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      func.call.apply(func, [this].concat(args));
      return rawFunc.apply(this, args);
    } : descriptor.initializer;
    descriptor.value = descriptor.value ? function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      func.call.apply(func, [this].concat(args));
      return rawFunc.apply(this, args);
    } : descriptor.value;
    return descriptor;
  };
};

exports.injectFunc = injectFunc;