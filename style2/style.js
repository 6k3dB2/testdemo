/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 9662:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

    var isCallable = __webpack_require__(614);
    var tryToString = __webpack_require__(6330);
    
    var $TypeError = TypeError;
    
    // `Assert: IsCallable(argument) is true`
    module.exports = function (argument) {
      if (isCallable(argument)) return argument;
      throw $TypeError(tryToString(argument) + ' is not a function');
    };
    
    
    /***/ }),
    
    /***/ 9670:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var isObject = __webpack_require__(111);
    
    var $String = String;
    var $TypeError = TypeError;
    
    // `Assert: Type(argument) is Object`
    module.exports = function (argument) {
      if (isObject(argument)) return argument;
      throw $TypeError($String(argument) + ' is not an object');
    };
    
    
    /***/ }),
    
    /***/ 1318:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var toIndexedObject = __webpack_require__(5656);
    var toAbsoluteIndex = __webpack_require__(1400);
    var lengthOfArrayLike = __webpack_require__(6244);
    
    // `Array.prototype.{ indexOf, includes }` methods implementation
    var createMethod = function (IS_INCLUDES) {
      return function ($this, el, fromIndex) {
        var O = toIndexedObject($this);
        var length = lengthOfArrayLike(O);
        var index = toAbsoluteIndex(fromIndex, length);
        var value;
        // Array#includes uses SameValueZero equality algorithm
        // eslint-disable-next-line no-self-compare -- NaN check
        if (IS_INCLUDES && el != el) while (length > index) {
          value = O[index++];
          // eslint-disable-next-line no-self-compare -- NaN check
          if (value != value) return true;
        // Array#indexOf ignores holes, Array#includes - not
        } else for (;length > index; index++) {
          if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
        } return !IS_INCLUDES && -1;
      };
    };
    
    module.exports = {
      // `Array.prototype.includes` method
      // https://tc39.es/ecma262/#sec-array.prototype.includes
      includes: createMethod(true),
      // `Array.prototype.indexOf` method
      // https://tc39.es/ecma262/#sec-array.prototype.indexof
      indexOf: createMethod(false)
    };
    
    
    /***/ }),
    
    /***/ 3658:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    "use strict";
    
    var DESCRIPTORS = __webpack_require__(9781);
    var isArray = __webpack_require__(3157);
    
    var $TypeError = TypeError;
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    
    // Safari < 13 does not throw an error in this case
    var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
      // makes no sense without proper strict mode support
      if (this !== undefined) return true;
      try {
        // eslint-disable-next-line es/no-object-defineproperty -- safe
        Object.defineProperty([], 'length', { writable: false }).length = 1;
      } catch (error) {
        return error instanceof TypeError;
      }
    }();
    
    module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
      if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
        throw $TypeError('Cannot set read only .length');
      } return O.length = length;
    } : function (O, length) {
      return O.length = length;
    };
    
    
    /***/ }),
    
    /***/ 4326:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var uncurryThis = __webpack_require__(1702);
    
    var toString = uncurryThis({}.toString);
    var stringSlice = uncurryThis(''.slice);
    
    module.exports = function (it) {
      return stringSlice(toString(it), 8, -1);
    };
    
    
    /***/ }),
    
    /***/ 9920:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var hasOwn = __webpack_require__(2597);
    var ownKeys = __webpack_require__(3887);
    var getOwnPropertyDescriptorModule = __webpack_require__(1236);
    var definePropertyModule = __webpack_require__(3070);
    
    module.exports = function (target, source, exceptions) {
      var keys = ownKeys(source);
      var defineProperty = definePropertyModule.f;
      var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
          defineProperty(target, key, getOwnPropertyDescriptor(source, key));
        }
      }
    };
    
    
    /***/ }),
    
    /***/ 8880:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var DESCRIPTORS = __webpack_require__(9781);
    var definePropertyModule = __webpack_require__(3070);
    var createPropertyDescriptor = __webpack_require__(9114);
    
    module.exports = DESCRIPTORS ? function (object, key, value) {
      return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
    } : function (object, key, value) {
      object[key] = value;
      return object;
    };
    
    
    /***/ }),
    
    /***/ 9114:
    /***/ (function(module) {
    
    module.exports = function (bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
      };
    };
    
    
    /***/ }),
    
    /***/ 8052:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var isCallable = __webpack_require__(614);
    var definePropertyModule = __webpack_require__(3070);
    var makeBuiltIn = __webpack_require__(6339);
    var defineGlobalProperty = __webpack_require__(3072);
    
    module.exports = function (O, key, value, options) {
      if (!options) options = {};
      var simple = options.enumerable;
      var name = options.name !== undefined ? options.name : key;
      if (isCallable(value)) makeBuiltIn(value, name, options);
      if (options.global) {
        if (simple) O[key] = value;
        else defineGlobalProperty(key, value);
      } else {
        try {
          if (!options.unsafe) delete O[key];
          else if (O[key]) simple = true;
        } catch (error) { /* empty */ }
        if (simple) O[key] = value;
        else definePropertyModule.f(O, key, {
          value: value,
          enumerable: false,
          configurable: !options.nonConfigurable,
          writable: !options.nonWritable
        });
      } return O;
    };
    
    
    /***/ }),
    
    /***/ 3072:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var global = __webpack_require__(7854);
    
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    var defineProperty = Object.defineProperty;
    
    module.exports = function (key, value) {
      try {
        defineProperty(global, key, { value: value, configurable: true, writable: true });
      } catch (error) {
        global[key] = value;
      } return value;
    };
    
    
    /***/ }),
    
    /***/ 9781:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var fails = __webpack_require__(7293);
    
    // Detect IE8's incomplete defineProperty implementation
    module.exports = !fails(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- required for testing
      return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
    });
    
    
    /***/ }),
    
    /***/ 4154:
    /***/ (function(module) {
    
    var documentAll = typeof document == 'object' && document.all;
    
    // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
    // eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
    var IS_HTMLDDA = typeof documentAll == 'undefined' && documentAll !== undefined;
    
    module.exports = {
      all: documentAll,
      IS_HTMLDDA: IS_HTMLDDA
    };
    
    
    /***/ }),
    
    /***/ 317:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var global = __webpack_require__(7854);
    var isObject = __webpack_require__(111);
    
    var document = global.document;
    // typeof document.createElement is 'object' in old IE
    var EXISTS = isObject(document) && isObject(document.createElement);
    
    module.exports = function (it) {
      return EXISTS ? document.createElement(it) : {};
    };
    
    
    /***/ }),
    
    /***/ 7207:
    /***/ (function(module) {
    
    var $TypeError = TypeError;
    var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991
    
    module.exports = function (it) {
      if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
      return it;
    };
    
    
    /***/ }),
    
    /***/ 8113:
    /***/ (function(module) {
    
    module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';
    
    
    /***/ }),
    
    /***/ 7392:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var global = __webpack_require__(7854);
    var userAgent = __webpack_require__(8113);
    
    var process = global.process;
    var Deno = global.Deno;
    var versions = process && process.versions || Deno && Deno.version;
    var v8 = versions && versions.v8;
    var match, version;
    
    if (v8) {
      match = v8.split('.');
      // in old Chrome, versions of V8 isn't V8 = Chrome / 10
      // but their correct versions are not interesting for us
      version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
    }
    
    // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
    // so check `userAgent` even if `.v8` exists, but 0
    if (!version && userAgent) {
      match = userAgent.match(/Edge\/(\d+)/);
      if (!match || match[1] >= 74) {
        match = userAgent.match(/Chrome\/(\d+)/);
        if (match) version = +match[1];
      }
    }
    
    module.exports = version;
    
    
    /***/ }),
    
    /***/ 748:
    /***/ (function(module) {
    
    // IE8- don't enum bug keys
    module.exports = [
      'constructor',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf'
    ];
    
    
    /***/ }),
    
    /***/ 2109:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var global = __webpack_require__(7854);
    var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
    var createNonEnumerableProperty = __webpack_require__(8880);
    var defineBuiltIn = __webpack_require__(8052);
    var defineGlobalProperty = __webpack_require__(3072);
    var copyConstructorProperties = __webpack_require__(9920);
    var isForced = __webpack_require__(4705);
    
    /*
      options.target         - name of the target object
      options.global         - target is the global object
      options.stat           - export as static methods of target
      options.proto          - export as prototype methods of target
      options.real           - real prototype method for the `pure` version
      options.forced         - export even if the native feature is available
      options.bind           - bind methods to the target, required for the `pure` version
      options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
      options.unsafe         - use the simple assignment of property instead of delete + defineProperty
      options.sham           - add a flag to not completely full polyfills
      options.enumerable     - export as enumerable property
      options.dontCallGetSet - prevent calling a getter on target
      options.name           - the .name of the function if it does not match the key
    */
    module.exports = function (options, source) {
      var TARGET = options.target;
      var GLOBAL = options.global;
      var STATIC = options.stat;
      var FORCED, target, key, targetProperty, sourceProperty, descriptor;
      if (GLOBAL) {
        target = global;
      } else if (STATIC) {
        target = global[TARGET] || defineGlobalProperty(TARGET, {});
      } else {
        target = (global[TARGET] || {}).prototype;
      }
      if (target) for (key in source) {
        sourceProperty = source[key];
        if (options.dontCallGetSet) {
          descriptor = getOwnPropertyDescriptor(target, key);
          targetProperty = descriptor && descriptor.value;
        } else targetProperty = target[key];
        FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
        // contained in target
        if (!FORCED && targetProperty !== undefined) {
          if (typeof sourceProperty == typeof targetProperty) continue;
          copyConstructorProperties(sourceProperty, targetProperty);
        }
        // add a flag to not completely full polyfills
        if (options.sham || (targetProperty && targetProperty.sham)) {
          createNonEnumerableProperty(sourceProperty, 'sham', true);
        }
        defineBuiltIn(target, key, sourceProperty, options);
      }
    };
    
    
    /***/ }),
    
    /***/ 7293:
    /***/ (function(module) {
    
    module.exports = function (exec) {
      try {
        return !!exec();
      } catch (error) {
        return true;
      }
    };
    
    
    /***/ }),
    
    /***/ 4374:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var fails = __webpack_require__(7293);
    
    module.exports = !fails(function () {
      // eslint-disable-next-line es/no-function-prototype-bind -- safe
      var test = (function () { /* empty */ }).bind();
      // eslint-disable-next-line no-prototype-builtins -- safe
      return typeof test != 'function' || test.hasOwnProperty('prototype');
    });
    
    
    /***/ }),
    
    /***/ 6916:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var NATIVE_BIND = __webpack_require__(4374);
    
    var call = Function.prototype.call;
    
    module.exports = NATIVE_BIND ? call.bind(call) : function () {
      return call.apply(call, arguments);
    };
    
    
    /***/ }),
    
    /***/ 6530:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var DESCRIPTORS = __webpack_require__(9781);
    var hasOwn = __webpack_require__(2597);
    
    var FunctionPrototype = Function.prototype;
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
    
    var EXISTS = hasOwn(FunctionPrototype, 'name');
    // additional protection from minified / mangled / dropped function names
    var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
    var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));
    
    module.exports = {
      EXISTS: EXISTS,
      PROPER: PROPER,
      CONFIGURABLE: CONFIGURABLE
    };
    
    
    /***/ }),
    
    /***/ 1702:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var NATIVE_BIND = __webpack_require__(4374);
    
    var FunctionPrototype = Function.prototype;
    var call = FunctionPrototype.call;
    var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);
    
    module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
      return function () {
        return call.apply(fn, arguments);
      };
    };
    
    
    /***/ }),
    
    /***/ 5005:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var global = __webpack_require__(7854);
    var isCallable = __webpack_require__(614);
    
    var aFunction = function (argument) {
      return isCallable(argument) ? argument : undefined;
    };
    
    module.exports = function (namespace, method) {
      return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
    };
    
    
    /***/ }),
    
    /***/ 8173:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var aCallable = __webpack_require__(9662);
    var isNullOrUndefined = __webpack_require__(8554);
    
    // `GetMethod` abstract operation
    // https://tc39.es/ecma262/#sec-getmethod
    module.exports = function (V, P) {
      var func = V[P];
      return isNullOrUndefined(func) ? undefined : aCallable(func);
    };
    
    
    /***/ }),
    
    /***/ 7854:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var check = function (it) {
      return it && it.Math == Math && it;
    };
    
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    module.exports =
      // eslint-disable-next-line es/no-global-this -- safe
      check(typeof globalThis == 'object' && globalThis) ||
      check(typeof window == 'object' && window) ||
      // eslint-disable-next-line no-restricted-globals -- safe
      check(typeof self == 'object' && self) ||
      check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
      // eslint-disable-next-line no-new-func -- fallback
      (function () { return this; })() || Function('return this')();
    
    
    /***/ }),
    
    /***/ 2597:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var uncurryThis = __webpack_require__(1702);
    var toObject = __webpack_require__(7908);
    
    var hasOwnProperty = uncurryThis({}.hasOwnProperty);
    
    // `HasOwnProperty` abstract operation
    // https://tc39.es/ecma262/#sec-hasownproperty
    // eslint-disable-next-line es/no-object-hasown -- safe
    module.exports = Object.hasOwn || function hasOwn(it, key) {
      return hasOwnProperty(toObject(it), key);
    };
    
    
    /***/ }),
    
    /***/ 3501:
    /***/ (function(module) {
    
    module.exports = {};
    
    
    /***/ }),
    
    /***/ 4664:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var DESCRIPTORS = __webpack_require__(9781);
    var fails = __webpack_require__(7293);
    var createElement = __webpack_require__(317);
    
    // Thanks to IE8 for its funny defineProperty
    module.exports = !DESCRIPTORS && !fails(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- required for testing
      return Object.defineProperty(createElement('div'), 'a', {
        get: function () { return 7; }
      }).a != 7;
    });
    
    
    /***/ }),
    
    /***/ 8361:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var uncurryThis = __webpack_require__(1702);
    var fails = __webpack_require__(7293);
    var classof = __webpack_require__(4326);
    
    var $Object = Object;
    var split = uncurryThis(''.split);
    
    // fallback for non-array-like ES3 and non-enumerable old V8 strings
    module.exports = fails(function () {
      // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
      // eslint-disable-next-line no-prototype-builtins -- safe
      return !$Object('z').propertyIsEnumerable(0);
    }) ? function (it) {
      return classof(it) == 'String' ? split(it, '') : $Object(it);
    } : $Object;
    
    
    /***/ }),
    
    /***/ 2788:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var uncurryThis = __webpack_require__(1702);
    var isCallable = __webpack_require__(614);
    var store = __webpack_require__(5465);
    
    var functionToString = uncurryThis(Function.toString);
    
    // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
    if (!isCallable(store.inspectSource)) {
      store.inspectSource = function (it) {
        return functionToString(it);
      };
    }
    
    module.exports = store.inspectSource;
    
    
    /***/ }),
    
    /***/ 9909:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var NATIVE_WEAK_MAP = __webpack_require__(4811);
    var global = __webpack_require__(7854);
    var isObject = __webpack_require__(111);
    var createNonEnumerableProperty = __webpack_require__(8880);
    var hasOwn = __webpack_require__(2597);
    var shared = __webpack_require__(5465);
    var sharedKey = __webpack_require__(6200);
    var hiddenKeys = __webpack_require__(3501);
    
    var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
    var TypeError = global.TypeError;
    var WeakMap = global.WeakMap;
    var set, get, has;
    
    var enforce = function (it) {
      return has(it) ? get(it) : set(it, {});
    };
    
    var getterFor = function (TYPE) {
      return function (it) {
        var state;
        if (!isObject(it) || (state = get(it)).type !== TYPE) {
          throw TypeError('Incompatible receiver, ' + TYPE + ' required');
        } return state;
      };
    };
    
    if (NATIVE_WEAK_MAP || shared.state) {
      var store = shared.state || (shared.state = new WeakMap());
      /* eslint-disable no-self-assign -- prototype methods protection */
      store.get = store.get;
      store.has = store.has;
      store.set = store.set;
      /* eslint-enable no-self-assign -- prototype methods protection */
      set = function (it, metadata) {
        if (store.has(it)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        store.set(it, metadata);
        return metadata;
      };
      get = function (it) {
        return store.get(it) || {};
      };
      has = function (it) {
        return store.has(it);
      };
    } else {
      var STATE = sharedKey('state');
      hiddenKeys[STATE] = true;
      set = function (it, metadata) {
        if (hasOwn(it, STATE)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        createNonEnumerableProperty(it, STATE, metadata);
        return metadata;
      };
      get = function (it) {
        return hasOwn(it, STATE) ? it[STATE] : {};
      };
      has = function (it) {
        return hasOwn(it, STATE);
      };
    }
    
    module.exports = {
      set: set,
      get: get,
      has: has,
      enforce: enforce,
      getterFor: getterFor
    };
    
    
    /***/ }),
    
    /***/ 3157:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var classof = __webpack_require__(4326);
    
    // `IsArray` abstract operation
    // https://tc39.es/ecma262/#sec-isarray
    // eslint-disable-next-line es/no-array-isarray -- safe
    module.exports = Array.isArray || function isArray(argument) {
      return classof(argument) == 'Array';
    };
    
    
    /***/ }),
    
    /***/ 614:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var $documentAll = __webpack_require__(4154);
    
    var documentAll = $documentAll.all;
    
    // `IsCallable` abstract operation
    // https://tc39.es/ecma262/#sec-iscallable
    module.exports = $documentAll.IS_HTMLDDA ? function (argument) {
      return typeof argument == 'function' || argument === documentAll;
    } : function (argument) {
      return typeof argument == 'function';
    };
    
    
    /***/ }),
    
    /***/ 4705:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var fails = __webpack_require__(7293);
    var isCallable = __webpack_require__(614);
    
    var replacement = /#|\.prototype\./;
    
    var isForced = function (feature, detection) {
      var value = data[normalize(feature)];
      return value == POLYFILL ? true
        : value == NATIVE ? false
        : isCallable(detection) ? fails(detection)
        : !!detection;
    };
    
    var normalize = isForced.normalize = function (string) {
      return String(string).replace(replacement, '.').toLowerCase();
    };
    
    var data = isForced.data = {};
    var NATIVE = isForced.NATIVE = 'N';
    var POLYFILL = isForced.POLYFILL = 'P';
    
    module.exports = isForced;
    
    
    /***/ }),
    
    /***/ 8554:
    /***/ (function(module) {
    
    // we can't use just `it == null` since of `document.all` special case
    // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
    module.exports = function (it) {
      return it === null || it === undefined;
    };
    
    
    /***/ }),
    
    /***/ 111:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var isCallable = __webpack_require__(614);
    var $documentAll = __webpack_require__(4154);
    
    var documentAll = $documentAll.all;
    
    module.exports = $documentAll.IS_HTMLDDA ? function (it) {
      return typeof it == 'object' ? it !== null : isCallable(it) || it === documentAll;
    } : function (it) {
      return typeof it == 'object' ? it !== null : isCallable(it);
    };
    
    
    /***/ }),
    
    /***/ 1913:
    /***/ (function(module) {
    
    module.exports = false;
    
    
    /***/ }),
    
    /***/ 2190:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var getBuiltIn = __webpack_require__(5005);
    var isCallable = __webpack_require__(614);
    var isPrototypeOf = __webpack_require__(7976);
    var USE_SYMBOL_AS_UID = __webpack_require__(3307);
    
    var $Object = Object;
    
    module.exports = USE_SYMBOL_AS_UID ? function (it) {
      return typeof it == 'symbol';
    } : function (it) {
      var $Symbol = getBuiltIn('Symbol');
      return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
    };
    
    
    /***/ }),
    
    /***/ 6244:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var toLength = __webpack_require__(7466);
    
    // `LengthOfArrayLike` abstract operation
    // https://tc39.es/ecma262/#sec-lengthofarraylike
    module.exports = function (obj) {
      return toLength(obj.length);
    };
    
    
    /***/ }),
    
    /***/ 6339:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var uncurryThis = __webpack_require__(1702);
    var fails = __webpack_require__(7293);
    var isCallable = __webpack_require__(614);
    var hasOwn = __webpack_require__(2597);
    var DESCRIPTORS = __webpack_require__(9781);
    var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(6530).CONFIGURABLE);
    var inspectSource = __webpack_require__(2788);
    var InternalStateModule = __webpack_require__(9909);
    
    var enforceInternalState = InternalStateModule.enforce;
    var getInternalState = InternalStateModule.get;
    var $String = String;
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    var defineProperty = Object.defineProperty;
    var stringSlice = uncurryThis(''.slice);
    var replace = uncurryThis(''.replace);
    var join = uncurryThis([].join);
    
    var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
      return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
    });
    
    var TEMPLATE = String(String).split('String');
    
    var makeBuiltIn = module.exports = function (value, name, options) {
      if (stringSlice($String(name), 0, 7) === 'Symbol(') {
        name = '[' + replace($String(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
      }
      if (options && options.getter) name = 'get ' + name;
      if (options && options.setter) name = 'set ' + name;
      if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
        if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
        else value.name = name;
      }
      if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
        defineProperty(value, 'length', { value: options.arity });
      }
      try {
        if (options && hasOwn(options, 'constructor') && options.constructor) {
          if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
        // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
        } else if (value.prototype) value.prototype = undefined;
      } catch (error) { /* empty */ }
      var state = enforceInternalState(value);
      if (!hasOwn(state, 'source')) {
        state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
      } return value;
    };
    
    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    // eslint-disable-next-line no-extend-native -- required
    Function.prototype.toString = makeBuiltIn(function toString() {
      return isCallable(this) && getInternalState(this).source || inspectSource(this);
    }, 'toString');
    
    
    /***/ }),
    
    /***/ 4758:
    /***/ (function(module) {
    
    var ceil = Math.ceil;
    var floor = Math.floor;
    
    // `Math.trunc` method
    // https://tc39.es/ecma262/#sec-math.trunc
    // eslint-disable-next-line es/no-math-trunc -- safe
    module.exports = Math.trunc || function trunc(x) {
      var n = +x;
      return (n > 0 ? floor : ceil)(n);
    };
    
    
    /***/ }),
    
    /***/ 3070:
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    var DESCRIPTORS = __webpack_require__(9781);
    var IE8_DOM_DEFINE = __webpack_require__(4664);
    var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(3353);
    var anObject = __webpack_require__(9670);
    var toPropertyKey = __webpack_require__(4948);
    
    var $TypeError = TypeError;
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    var $defineProperty = Object.defineProperty;
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var ENUMERABLE = 'enumerable';
    var CONFIGURABLE = 'configurable';
    var WRITABLE = 'writable';
    
    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
      anObject(O);
      P = toPropertyKey(P);
      anObject(Attributes);
      if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
        var current = $getOwnPropertyDescriptor(O, P);
        if (current && current[WRITABLE]) {
          O[P] = Attributes.value;
          Attributes = {
            configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
            enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
            writable: false
          };
        }
      } return $defineProperty(O, P, Attributes);
    } : $defineProperty : function defineProperty(O, P, Attributes) {
      anObject(O);
      P = toPropertyKey(P);
      anObject(Attributes);
      if (IE8_DOM_DEFINE) try {
        return $defineProperty(O, P, Attributes);
      } catch (error) { /* empty */ }
      if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
      if ('value' in Attributes) O[P] = Attributes.value;
      return O;
    };
    
    
    /***/ }),
    
    /***/ 1236:
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    var DESCRIPTORS = __webpack_require__(9781);
    var call = __webpack_require__(6916);
    var propertyIsEnumerableModule = __webpack_require__(5296);
    var createPropertyDescriptor = __webpack_require__(9114);
    var toIndexedObject = __webpack_require__(5656);
    var toPropertyKey = __webpack_require__(4948);
    var hasOwn = __webpack_require__(2597);
    var IE8_DOM_DEFINE = __webpack_require__(4664);
    
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    
    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
    exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject(O);
      P = toPropertyKey(P);
      if (IE8_DOM_DEFINE) try {
        return $getOwnPropertyDescriptor(O, P);
      } catch (error) { /* empty */ }
      if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
    };
    
    
    /***/ }),
    
    /***/ 8006:
    /***/ (function(__unused_webpack_module, exports, __webpack_require__) {
    
    var internalObjectKeys = __webpack_require__(6324);
    var enumBugKeys = __webpack_require__(748);
    
    var hiddenKeys = enumBugKeys.concat('length', 'prototype');
    
    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    // eslint-disable-next-line es/no-object-getownpropertynames -- safe
    exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
      return internalObjectKeys(O, hiddenKeys);
    };
    
    
    /***/ }),
    
    /***/ 5181:
    /***/ (function(__unused_webpack_module, exports) {
    
    // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
    exports.f = Object.getOwnPropertySymbols;
    
    
    /***/ }),
    
    /***/ 7976:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var uncurryThis = __webpack_require__(1702);
    
    module.exports = uncurryThis({}.isPrototypeOf);
    
    
    /***/ }),
    
    /***/ 6324:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var uncurryThis = __webpack_require__(1702);
    var hasOwn = __webpack_require__(2597);
    var toIndexedObject = __webpack_require__(5656);
    var indexOf = (__webpack_require__(1318).indexOf);
    var hiddenKeys = __webpack_require__(3501);
    
    var push = uncurryThis([].push);
    
    module.exports = function (object, names) {
      var O = toIndexedObject(object);
      var i = 0;
      var result = [];
      var key;
      for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
      // Don't enum bug & hidden keys
      while (names.length > i) if (hasOwn(O, key = names[i++])) {
        ~indexOf(result, key) || push(result, key);
      }
      return result;
    };
    
    
    /***/ }),
    
    /***/ 5296:
    /***/ (function(__unused_webpack_module, exports) {
    
    "use strict";
    
    var $propertyIsEnumerable = {}.propertyIsEnumerable;
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    
    // Nashorn ~ JDK8 bug
    var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);
    
    // `Object.prototype.propertyIsEnumerable` method implementation
    // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
    exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor(this, V);
      return !!descriptor && descriptor.enumerable;
    } : $propertyIsEnumerable;
    
    
    /***/ }),
    
    /***/ 2140:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var call = __webpack_require__(6916);
    var isCallable = __webpack_require__(614);
    var isObject = __webpack_require__(111);
    
    var $TypeError = TypeError;
    
    // `OrdinaryToPrimitive` abstract operation
    // https://tc39.es/ecma262/#sec-ordinarytoprimitive
    module.exports = function (input, pref) {
      var fn, val;
      if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
      if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
      if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
      throw $TypeError("Can't convert object to primitive value");
    };
    
    
    /***/ }),
    
    /***/ 3887:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var getBuiltIn = __webpack_require__(5005);
    var uncurryThis = __webpack_require__(1702);
    var getOwnPropertyNamesModule = __webpack_require__(8006);
    var getOwnPropertySymbolsModule = __webpack_require__(5181);
    var anObject = __webpack_require__(9670);
    
    var concat = uncurryThis([].concat);
    
    // all object keys, includes non-enumerable and symbols
    module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
      var keys = getOwnPropertyNamesModule.f(anObject(it));
      var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
      return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
    };
    
    
    /***/ }),
    
    /***/ 4488:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var isNullOrUndefined = __webpack_require__(8554);
    
    var $TypeError = TypeError;
    
    // `RequireObjectCoercible` abstract operation
    // https://tc39.es/ecma262/#sec-requireobjectcoercible
    module.exports = function (it) {
      if (isNullOrUndefined(it)) throw $TypeError("Can't call method on " + it);
      return it;
    };
    
    
    /***/ }),
    
    /***/ 6200:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var shared = __webpack_require__(2309);
    var uid = __webpack_require__(9711);
    
    var keys = shared('keys');
    
    module.exports = function (key) {
      return keys[key] || (keys[key] = uid(key));
    };
    
    
    /***/ }),
    
    /***/ 5465:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var global = __webpack_require__(7854);
    var defineGlobalProperty = __webpack_require__(3072);
    
    var SHARED = '__core-js_shared__';
    var store = global[SHARED] || defineGlobalProperty(SHARED, {});
    
    module.exports = store;
    
    
    /***/ }),
    
    /***/ 2309:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var IS_PURE = __webpack_require__(1913);
    var store = __webpack_require__(5465);
    
    (module.exports = function (key, value) {
      return store[key] || (store[key] = value !== undefined ? value : {});
    })('versions', []).push({
      version: '3.27.2',
      mode: IS_PURE ? 'pure' : 'global',
      copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
      license: 'https://github.com/zloirock/core-js/blob/v3.27.2/LICENSE',
      source: 'https://github.com/zloirock/core-js'
    });
    
    
    /***/ }),
    
    /***/ 6293:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    /* eslint-disable es/no-symbol -- required for testing */
    var V8_VERSION = __webpack_require__(7392);
    var fails = __webpack_require__(7293);
    
    // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
    module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
      var symbol = Symbol();
      // Chrome 38 Symbol has incorrect toString conversion
      // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
      return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
        // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
        !Symbol.sham && V8_VERSION && V8_VERSION < 41;
    });
    
    
    /***/ }),
    
    /***/ 1400:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var toIntegerOrInfinity = __webpack_require__(9303);
    
    var max = Math.max;
    var min = Math.min;
    
    // Helper for a popular repeating case of the spec:
    // Let integer be ? ToInteger(index).
    // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
    module.exports = function (index, length) {
      var integer = toIntegerOrInfinity(index);
      return integer < 0 ? max(integer + length, 0) : min(integer, length);
    };
    
    
    /***/ }),
    
    /***/ 5656:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    // toObject with fallback for non-array-like ES3 strings
    var IndexedObject = __webpack_require__(8361);
    var requireObjectCoercible = __webpack_require__(4488);
    
    module.exports = function (it) {
      return IndexedObject(requireObjectCoercible(it));
    };
    
    
    /***/ }),
    
    /***/ 9303:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var trunc = __webpack_require__(4758);
    
    // `ToIntegerOrInfinity` abstract operation
    // https://tc39.es/ecma262/#sec-tointegerorinfinity
    module.exports = function (argument) {
      var number = +argument;
      // eslint-disable-next-line no-self-compare -- NaN check
      return number !== number || number === 0 ? 0 : trunc(number);
    };
    
    
    /***/ }),
    
    /***/ 7466:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var toIntegerOrInfinity = __webpack_require__(9303);
    
    var min = Math.min;
    
    // `ToLength` abstract operation
    // https://tc39.es/ecma262/#sec-tolength
    module.exports = function (argument) {
      return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
    };
    
    
    /***/ }),
    
    /***/ 7908:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var requireObjectCoercible = __webpack_require__(4488);
    
    var $Object = Object;
    
    // `ToObject` abstract operation
    // https://tc39.es/ecma262/#sec-toobject
    module.exports = function (argument) {
      return $Object(requireObjectCoercible(argument));
    };
    
    
    /***/ }),
    
    /***/ 7593:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var call = __webpack_require__(6916);
    var isObject = __webpack_require__(111);
    var isSymbol = __webpack_require__(2190);
    var getMethod = __webpack_require__(8173);
    var ordinaryToPrimitive = __webpack_require__(2140);
    var wellKnownSymbol = __webpack_require__(5112);
    
    var $TypeError = TypeError;
    var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
    
    // `ToPrimitive` abstract operation
    // https://tc39.es/ecma262/#sec-toprimitive
    module.exports = function (input, pref) {
      if (!isObject(input) || isSymbol(input)) return input;
      var exoticToPrim = getMethod(input, TO_PRIMITIVE);
      var result;
      if (exoticToPrim) {
        if (pref === undefined) pref = 'default';
        result = call(exoticToPrim, input, pref);
        if (!isObject(result) || isSymbol(result)) return result;
        throw $TypeError("Can't convert object to primitive value");
      }
      if (pref === undefined) pref = 'number';
      return ordinaryToPrimitive(input, pref);
    };
    
    
    /***/ }),
    
    /***/ 4948:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var toPrimitive = __webpack_require__(7593);
    var isSymbol = __webpack_require__(2190);
    
    // `ToPropertyKey` abstract operation
    // https://tc39.es/ecma262/#sec-topropertykey
    module.exports = function (argument) {
      var key = toPrimitive(argument, 'string');
      return isSymbol(key) ? key : key + '';
    };
    
    
    /***/ }),
    
    /***/ 6330:
    /***/ (function(module) {
    
    var $String = String;
    
    module.exports = function (argument) {
      try {
        return $String(argument);
      } catch (error) {
        return 'Object';
      }
    };
    
    
    /***/ }),
    
    /***/ 9711:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var uncurryThis = __webpack_require__(1702);
    
    var id = 0;
    var postfix = Math.random();
    var toString = uncurryThis(1.0.toString);
    
    module.exports = function (key) {
      return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
    };
    
    
    /***/ }),
    
    /***/ 3307:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    /* eslint-disable es/no-symbol -- required for testing */
    var NATIVE_SYMBOL = __webpack_require__(6293);
    
    module.exports = NATIVE_SYMBOL
      && !Symbol.sham
      && typeof Symbol.iterator == 'symbol';
    
    
    /***/ }),
    
    /***/ 3353:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var DESCRIPTORS = __webpack_require__(9781);
    var fails = __webpack_require__(7293);
    
    // V8 ~ Chrome 36-
    // https://bugs.chromium.org/p/v8/issues/detail?id=3334
    module.exports = DESCRIPTORS && fails(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- required for testing
      return Object.defineProperty(function () { /* empty */ }, 'prototype', {
        value: 42,
        writable: false
      }).prototype != 42;
    });
    
    
    /***/ }),
    
    /***/ 4811:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var global = __webpack_require__(7854);
    var isCallable = __webpack_require__(614);
    
    var WeakMap = global.WeakMap;
    
    module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));
    
    
    /***/ }),
    
    /***/ 5112:
    /***/ (function(module, __unused_webpack_exports, __webpack_require__) {
    
    var global = __webpack_require__(7854);
    var shared = __webpack_require__(2309);
    var hasOwn = __webpack_require__(2597);
    var uid = __webpack_require__(9711);
    var NATIVE_SYMBOL = __webpack_require__(6293);
    var USE_SYMBOL_AS_UID = __webpack_require__(3307);
    
    var Symbol = global.Symbol;
    var WellKnownSymbolsStore = shared('wks');
    var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;
    
    module.exports = function (name) {
      if (!hasOwn(WellKnownSymbolsStore, name)) {
        WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
          ? Symbol[name]
          : createWellKnownSymbol('Symbol.' + name);
      } return WellKnownSymbolsStore[name];
    };
    
    
    /***/ }),
    
    /***/ 7658:
    /***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {
    
    "use strict";
    
    var $ = __webpack_require__(2109);
    var toObject = __webpack_require__(7908);
    var lengthOfArrayLike = __webpack_require__(6244);
    var setArrayLength = __webpack_require__(3658);
    var doesNotExceedSafeInteger = __webpack_require__(7207);
    var fails = __webpack_require__(7293);
    
    var INCORRECT_TO_LENGTH = fails(function () {
      return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
    });
    
    // V8 and Safari <= 15.4, FF < 23 throws InternalError
    // https://bugs.chromium.org/p/v8/issues/detail?id=12681
    var properErrorOnNonWritableLength = function () {
      try {
        // eslint-disable-next-line es/no-object-defineproperty -- safe
        Object.defineProperty([], 'length', { writable: false }).push();
      } catch (error) {
        return error instanceof TypeError;
      }
    };
    
    var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();
    
    // `Array.prototype.push` method
    // https://tc39.es/ecma262/#sec-array.prototype.push
    $({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      push: function push(item) {
        var O = toObject(this);
        var len = lengthOfArrayLike(O);
        var argCount = arguments.length;
        doesNotExceedSafeInteger(len + argCount);
        for (var i = 0; i < argCount; i++) {
          O[len] = arguments[i];
          len++;
        }
        setArrayLength(O, len);
        return len;
      }
    });
    
    
    /***/ }),
    
    /***/ 7631:
    /***/ (function(module) {
    
    /*!
     * headroom.js v0.12.0 - Give your page some headroom. Hide your header until you need it
     * Copyright (c) 2020 Nick Williams - http://wicky.nillia.ms/headroom.js
     * License: MIT
     */
    
    (function (global, factory) {
       true ? module.exports = factory() :
      0;
    }(this, function () { 'use strict';
    
      function isBrowser() {
        return typeof window !== "undefined";
      }
    
      /**
       * Used to detect browser support for adding an event listener with options
       * Credit: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
       */
      function passiveEventsSupported() {
        var supported = false;
    
        try {
          var options = {
            // eslint-disable-next-line getter-return
            get passive() {
              supported = true;
            }
          };
          window.addEventListener("test", options, options);
          window.removeEventListener("test", options, options);
        } catch (err) {
          supported = false;
        }
    
        return supported;
      }
    
      function isSupported() {
        return !!(
          isBrowser() &&
          function() {}.bind &&
          "classList" in document.documentElement &&
          Object.assign &&
          Object.keys &&
          requestAnimationFrame
        );
      }
    
      function isDocument(obj) {
        return obj.nodeType === 9; // Node.DOCUMENT_NODE === 9
      }
    
      function isWindow(obj) {
        // `obj === window` or `obj instanceof Window` is not sufficient,
        // as the obj may be the window of an iframe.
        return obj && obj.document && isDocument(obj.document);
      }
    
      function windowScroller(win) {
        var doc = win.document;
        var body = doc.body;
        var html = doc.documentElement;
    
        return {
          /**
           * @see http://james.padolsey.com/javascript/get-document-height-cross-browser/
           * @return {Number} the scroll height of the document in pixels
           */
          scrollHeight: function() {
            return Math.max(
              body.scrollHeight,
              html.scrollHeight,
              body.offsetHeight,
              html.offsetHeight,
              body.clientHeight,
              html.clientHeight
            );
          },
    
          /**
           * @see http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
           * @return {Number} the height of the viewport in pixels
           */
          height: function() {
            return win.innerHeight || html.clientHeight || body.clientHeight;
          },
    
          /**
           * Gets the Y scroll position
           * @return {Number} pixels the page has scrolled along the Y-axis
           */
          scrollY: function() {
            if (win.pageYOffset !== undefined) {
              return win.pageYOffset;
            }
    
            return (html || body.parentNode || body).scrollTop;
          }
        };
      }
    
      function elementScroller(element) {
        return {
          /**
           * @return {Number} the scroll height of the element in pixels
           */
          scrollHeight: function() {
            return Math.max(
              element.scrollHeight,
              element.offsetHeight,
              element.clientHeight
            );
          },
    
          /**
           * @return {Number} the height of the element in pixels
           */
          height: function() {
            return Math.max(element.offsetHeight, element.clientHeight);
          },
    
          /**
           * Gets the Y scroll position
           * @return {Number} pixels the element has scrolled along the Y-axis
           */
          scrollY: function() {
            return element.scrollTop;
          }
        };
      }
    
      function createScroller(element) {
        return isWindow(element) ? windowScroller(element) : elementScroller(element);
      }
    
      /**
       * @param element EventTarget
       */
      function trackScroll(element, options, callback) {
        var isPassiveSupported = passiveEventsSupported();
        var rafId;
        var scrolled = false;
        var scroller = createScroller(element);
        var lastScrollY = scroller.scrollY();
        var details = {};
    
        function update() {
          var scrollY = Math.round(scroller.scrollY());
          var height = scroller.height();
          var scrollHeight = scroller.scrollHeight();
    
          // reuse object for less memory churn
          details.scrollY = scrollY;
          details.lastScrollY = lastScrollY;
          details.direction = scrollY > lastScrollY ? "down" : "up";
          details.distance = Math.abs(scrollY - lastScrollY);
          details.isOutOfBounds = scrollY < 0 || scrollY + height > scrollHeight;
          details.top = scrollY <= options.offset[details.direction];
          details.bottom = scrollY + height >= scrollHeight;
          details.toleranceExceeded =
            details.distance > options.tolerance[details.direction];
    
          callback(details);
    
          lastScrollY = scrollY;
          scrolled = false;
        }
    
        function handleScroll() {
          if (!scrolled) {
            scrolled = true;
            rafId = requestAnimationFrame(update);
          }
        }
    
        var eventOptions = isPassiveSupported
          ? { passive: true, capture: false }
          : false;
    
        element.addEventListener("scroll", handleScroll, eventOptions);
        update();
    
        return {
          destroy: function() {
            cancelAnimationFrame(rafId);
            element.removeEventListener("scroll", handleScroll, eventOptions);
          }
        };
      }
    
      function normalizeUpDown(t) {
        return t === Object(t) ? t : { down: t, up: t };
      }
    
      /**
       * UI enhancement for fixed headers.
       * Hides header when scrolling down
       * Shows header when scrolling up
       * @constructor
       * @param {DOMElement} elem the header element
       * @param {Object} options options for the widget
       */
      function Headroom(elem, options) {
        options = options || {};
        Object.assign(this, Headroom.options, options);
        this.classes = Object.assign({}, Headroom.options.classes, options.classes);
    
        this.elem = elem;
        this.tolerance = normalizeUpDown(this.tolerance);
        this.offset = normalizeUpDown(this.offset);
        this.initialised = false;
        this.frozen = false;
      }
      Headroom.prototype = {
        constructor: Headroom,
    
        /**
         * Start listening to scrolling
         * @public
         */
        init: function() {
          if (Headroom.cutsTheMustard && !this.initialised) {
            this.addClass("initial");
            this.initialised = true;
    
            // defer event registration to handle browser
            // potentially restoring previous scroll position
            setTimeout(
              function(self) {
                self.scrollTracker = trackScroll(
                  self.scroller,
                  { offset: self.offset, tolerance: self.tolerance },
                  self.update.bind(self)
                );
              },
              100,
              this
            );
          }
    
          return this;
        },
    
        /**
         * Destroy the widget, clearing up after itself
         * @public
         */
        destroy: function() {
          this.initialised = false;
          Object.keys(this.classes).forEach(this.removeClass, this);
          this.scrollTracker.destroy();
        },
    
        /**
         * Unpin the element
         * @public
         */
        unpin: function() {
          if (this.hasClass("pinned") || !this.hasClass("unpinned")) {
            this.addClass("unpinned");
            this.removeClass("pinned");
    
            if (this.onUnpin) {
              this.onUnpin.call(this);
            }
          }
        },
    
        /**
         * Pin the element
         * @public
         */
        pin: function() {
          if (this.hasClass("unpinned")) {
            this.addClass("pinned");
            this.removeClass("unpinned");
    
            if (this.onPin) {
              this.onPin.call(this);
            }
          }
        },
    
        /**
         * Freezes the current state of the widget
         * @public
         */
        freeze: function() {
          this.frozen = true;
          this.addClass("frozen");
        },
    
        /**
         * Re-enables the default behaviour of the widget
         * @public
         */
        unfreeze: function() {
          this.frozen = false;
          this.removeClass("frozen");
        },
    
        top: function() {
          if (!this.hasClass("top")) {
            this.addClass("top");
            this.removeClass("notTop");
    
            if (this.onTop) {
              this.onTop.call(this);
            }
          }
        },
    
        notTop: function() {
          if (!this.hasClass("notTop")) {
            this.addClass("notTop");
            this.removeClass("top");
    
            if (this.onNotTop) {
              this.onNotTop.call(this);
            }
          }
        },
    
        bottom: function() {
          if (!this.hasClass("bottom")) {
            this.addClass("bottom");
            this.removeClass("notBottom");
    
            if (this.onBottom) {
              this.onBottom.call(this);
            }
          }
        },
    
        notBottom: function() {
          if (!this.hasClass("notBottom")) {
            this.addClass("notBottom");
            this.removeClass("bottom");
    
            if (this.onNotBottom) {
              this.onNotBottom.call(this);
            }
          }
        },
    
        shouldUnpin: function(details) {
          var scrollingDown = details.direction === "down";
    
          return scrollingDown && !details.top && details.toleranceExceeded;
        },
    
        shouldPin: function(details) {
          var scrollingUp = details.direction === "up";
    
          return (scrollingUp && details.toleranceExceeded) || details.top;
        },
    
        addClass: function(className) {
          this.elem.classList.add.apply(
            this.elem.classList,
            this.classes[className].split(" ")
          );
        },
    
        removeClass: function(className) {
          this.elem.classList.remove.apply(
            this.elem.classList,
            this.classes[className].split(" ")
          );
        },
    
        hasClass: function(className) {
          return this.classes[className].split(" ").every(function(cls) {
            return this.classList.contains(cls);
          }, this.elem);
        },
    
        update: function(details) {
          if (details.isOutOfBounds) {
            // Ignore bouncy scrolling in OSX
            return;
          }
    
          if (this.frozen === true) {
            return;
          }
    
          if (details.top) {
            this.top();
          } else {
            this.notTop();
          }
    
          if (details.bottom) {
            this.bottom();
          } else {
            this.notBottom();
          }
    
          if (this.shouldUnpin(details)) {
            this.unpin();
          } else if (this.shouldPin(details)) {
            this.pin();
          }
        }
      };
    
      /**
       * Default options
       * @type {Object}
       */
      Headroom.options = {
        tolerance: {
          up: 0,
          down: 0
        },
        offset: 0,
        scroller: isBrowser() ? window : null,
        classes: {
          frozen: "headroom--frozen",
          pinned: "headroom--pinned",
          unpinned: "headroom--unpinned",
          top: "headroom--top",
          notTop: "headroom--not-top",
          bottom: "headroom--bottom",
          notBottom: "headroom--not-bottom",
          initial: "headroom"
        }
      };
    
      Headroom.cutsTheMustard = isSupported();
    
      return Headroom;
    
    }));
    
    
    /***/ }),
    
    /***/ 4850:
    /***/ (function(module, exports) {
    
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
        if (true) {
            !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
            (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
            __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        } else { var mod; }
    })(this, function (module, exports) {
        "use strict";
    
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
    
        exports.default = function ($) {
    
            $.extend($.ui, { datepicker: { version: "1.12.1" } });
    
            var datepicker_instActive;
    
            function datepicker_getZindex(elem) {
                var position, value;
                while (elem.length && elem[0] !== document) {
    
                    // Ignore z-index if position is set to a value where z-index is ignored by the browser
                    // This makes behavior of this function consistent across browsers
                    // WebKit always returns auto if the element is positioned
                    position = elem.css("position");
                    if (position === "absolute" || position === "relative" || position === "fixed") {
    
                        // IE returns 0 when zIndex is not specified
                        // other browsers return a string
                        // we ignore the case of nested elements with an explicit value of 0
                        // <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
                        value = parseInt(elem.css("zIndex"), 10);
                        if (!isNaN(value) && value !== 0) {
                            return value;
                        }
                    }
                    elem = elem.parent();
                }
    
                return 0;
            }
            /* Date picker manager.
         Use the singleton instance of this class, $.datepicker, to interact with the date picker.
         Settings for (groups of) date pickers are maintained in an instance object,
         allowing multiple different settings on the same page. */
    
            function Datepicker() {
                this._curInst = null; // The current instance in use
                this._keyEvent = false; // If the last event was a key event
                this._disabledInputs = []; // List of date picker inputs that have been disabled
                this._datepickerShowing = false; // True if the popup picker is showing , false if not
                this._inDialog = false; // True if showing within a "dialog", false if not
                this._mainDivId = "ui-datepicker-div"; // The ID of the main datepicker division
                this._inlineClass = "ui-datepicker-inline"; // The name of the inline marker class
                this._appendClass = "ui-datepicker-append"; // The name of the append marker class
                this._triggerClass = "ui-datepicker-trigger"; // The name of the trigger marker class
                this._dialogClass = "ui-datepicker-dialog"; // The name of the dialog marker class
                this._disableClass = "ui-datepicker-disabled"; // The name of the disabled covering marker class
                this._unselectableClass = "ui-datepicker-unselectable"; // The name of the unselectable cell marker class
                this._currentClass = "ui-datepicker-current-day"; // The name of the current day marker class
                this._dayOverClass = "ui-datepicker-days-cell-over"; // The name of the day hover marker class
                this.regional = []; // Available regional settings, indexed by language code
                this.regional[""] = { // Default regional settings
                    closeText: "Done", // Display text for close link
                    prevText: "Prev", // Display text for previous month link
                    nextText: "Next", // Display text for next month link
                    currentText: "Today", // Display text for current month link
                    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], // Names of months for drop-down and formatting
                    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // For formatting
                    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], // For formatting
                    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // For formatting
                    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], // Column headings for days starting at Sunday
                    weekHeader: "Wk", // Column header for week of the year
                    dateFormat: "mm/dd/yy", // See format options on parseDate
                    firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
                    isRTL: false, // True if right-to-left language, false if left-to-right
                    showMonthAfterYear: false, // True if the year select precedes month, false for month then year
                    yearSuffix: "" // Additional text to append to the year in the month headers
                };
                this._defaults = { // Global defaults for all the date picker instances
                    showOn: "focus", // "focus" for popup on focus,
                    // "button" for trigger button, or "both" for either
                    showAnim: "fadeIn", // Name of jQuery animation for popup
                    showOptions: {}, // Options for enhanced animations
                    defaultDate: null, // Used when field is blank: actual date,
                    // +/-number for offset from today, null for today
                    appendText: "", // Display text following the input box, e.g. showing the format
                    buttonText: "...", // Text for trigger button
                    buttonImage: "", // URL for trigger button image
                    buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
                    hideIfNoPrevNext: false, // True to hide next/previous month links
                    // if not applicable, false to just disable them
                    navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
                    gotoCurrent: false, // True if today link goes back to current selection instead
                    changeMonth: false, // True if month can be selected directly, false if only prev/next
                    changeYear: false, // True if year can be selected directly, false if only prev/next
                    yearRange: "c-10:c+10", // Range of years to display in drop-down,
                    // either relative to today's year (-nn:+nn), relative to currently displayed year
                    // (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
                    showOtherMonths: false, // True to show dates in other months, false to leave blank
                    selectOtherMonths: false, // True to allow selection of dates in other months, false for unselectable
                    showWeek: false, // True to show week of the year, false to not show it
                    calculateWeek: this.iso8601Week, // How to calculate the week of the year,
                    // takes a Date and returns the number of the week for it
                    shortYearCutoff: "+10", // Short year values < this are in the current century,
                    // > this are in the previous century,
                    // string value starting with "+" for current year + value
                    minDate: null, // The earliest selectable date, or null for no limit
                    maxDate: null, // The latest selectable date, or null for no limit
                    duration: "fast", // Duration of display/closure
                    beforeShowDay: null, // Function that takes a date and returns an array with
                    // [0] = true if selectable, false if not, [1] = custom CSS class name(s) or "",
                    // [2] = cell title (optional), e.g. $.datepicker.noWeekends
                    beforeShow: null, // Function that takes an input field and
                    // returns a set of custom settings for the date picker
                    onSelect: null, // Define a callback function when a date is selected
                    onChangeMonthYear: null, // Define a callback function when the month or year is changed
                    onClose: null, // Define a callback function when the datepicker is closed
                    numberOfMonths: 1, // Number of months to show at a time
                    showCurrentAtPos: 0, // The position in multipe months at which to show the current month (starting at 0)
                    stepMonths: 1, // Number of months to step back/forward
                    stepBigMonths: 12, // Number of months to step back/forward for the big links
                    altField: "", // Selector for an alternate field to store selected dates into
                    altFormat: "", // The date format to use for the alternate field
                    constrainInput: true, // The input is constrained by the current date format
                    showButtonPanel: false, // True to show button panel, false to not show it
                    autoSize: false, // True to size the input for the date format, false to leave as is
                    disabled: false // The initial disabled state
                };
                $.extend(this._defaults, this.regional[""]);
                this.regional.en = $.extend(true, {}, this.regional[""]);
                this.regional["en-US"] = $.extend(true, {}, this.regional.en);
                this.dpDiv = datepicker_bindHover($("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
            }
    
            $.extend(Datepicker.prototype, {
                /* Class name added to elements to indicate already configured with a date picker. */
                markerClassName: "hasDatepicker",
    
                //Keep track of the maximum number of rows displayed (see #7043)
                maxRows: 4,
    
                // TODO rename to "widget" when switching to widget factory
                _widgetDatepicker: function () {
                    return this.dpDiv;
                },
    
                /* Override the default settings for all instances of the date picker.
        * @param  settings  object - the new settings to use as defaults (anonymous object)
        * @return the manager object
        */
                setDefaults: function (settings) {
                    datepicker_extendRemove(this._defaults, settings || {});
                    return this;
                },
    
                /* Attach the date picker to a jQuery selection.
        * @param  target	element - the target input field or division or span
        * @param  settings  object - the new settings to use for this date picker instance (anonymous)
        */
                _attachDatepicker: function (target, settings) {
                    var nodeName, inline, inst;
                    nodeName = target.nodeName.toLowerCase();
                    inline = nodeName === "div" || nodeName === "span";
                    if (!target.id) {
                        this.uuid += 1;
                        target.id = "dp" + this.uuid;
                    }
                    inst = this._newInst($(target), inline);
                    inst.settings = $.extend({}, settings || {});
                    if (nodeName === "input") {
                        this._connectDatepicker(target, inst);
                    } else if (inline) {
                        this._inlineDatepicker(target, inst);
                    }
                },
    
                /* Create a new instance object. */
                _newInst: function (target, inline) {
                    var id = target[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"); // escape jQuery meta chars
                    return { id: id, input: target, // associated target
                        selectedDay: 0, selectedMonth: 0, selectedYear: 0, // current selection
                        drawMonth: 0, drawYear: 0, // month being drawn
                        inline: inline, // is datepicker inline or not
                        dpDiv: !inline ? this.dpDiv : // presentation div
                        datepicker_bindHover($("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) };
                },
    
                /* Attach the date picker to an input field. */
                _connectDatepicker: function (target, inst) {
                    var input = $(target);
                    inst.append = $([]);
                    inst.trigger = $([]);
                    if (input.hasClass(this.markerClassName)) {
                        return;
                    }
                    this._attachments(input, inst);
                    input.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp);
                    this._autoSize(inst);
                    $.data(target, "datepicker", inst);
    
                    //If disabled option is true, disable the datepicker once it has been attached to the input (see ticket #5665)
                    if (inst.settings.disabled) {
                        this._disableDatepicker(target);
                    }
                },
    
                /* Make attachments based on settings. */
                _attachments: function (input, inst) {
                    var showOn,
                        buttonText,
                        buttonImage,
                        appendText = this._get(inst, "appendText"),
                        isRTL = this._get(inst, "isRTL");
    
                    if (inst.append) {
                        inst.append.remove();
                    }
                    if (appendText) {
                        inst.append = $("<span class='" + this._appendClass + "'>" + appendText + "</span>");
                        input[isRTL ? "before" : "after"](inst.append);
                    }
    
                    input.off("focus", this._showDatepicker);
    
                    if (inst.trigger) {
                        inst.trigger.remove();
                    }
    
                    showOn = this._get(inst, "showOn");
                    if (showOn === "focus" || showOn === "both") {
                        // pop-up date picker when in the marked field
                        input.on("focus", this._showDatepicker);
                    }
                    if (showOn === "button" || showOn === "both") {
                        // pop-up date picker when button clicked
                        buttonText = this._get(inst, "buttonText");
                        buttonImage = this._get(inst, "buttonImage");
                        inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({ src: buttonImage, alt: buttonText, title: buttonText }) : $("<button type='button'></button>").addClass(this._triggerClass).html(!buttonImage ? buttonText : $("<img/>").attr({ src: buttonImage, alt: buttonText, title: buttonText })));
                        input[isRTL ? "before" : "after"](inst.trigger);
                        inst.trigger.on("click", function () {
                            if ($.datepicker._datepickerShowing && $.datepicker._lastInput === input[0]) {
                                $.datepicker._hideDatepicker();
                            } else if ($.datepicker._datepickerShowing && $.datepicker._lastInput !== input[0]) {
                                $.datepicker._hideDatepicker();
                                $.datepicker._showDatepicker(input[0]);
                            } else {
                                $.datepicker._showDatepicker(input[0]);
                            }
                            return false;
                        });
                    }
                },
    
                /* Apply the maximum length for the date format. */
                _autoSize: function (inst) {
                    if (this._get(inst, "autoSize") && !inst.inline) {
                        var findMax,
                            max,
                            maxI,
                            i,
                            date = new Date(2009, 12 - 1, 20),
                            // Ensure double digits
                        dateFormat = this._get(inst, "dateFormat");
    
                        if (dateFormat.match(/[DM]/)) {
                            findMax = function (names) {
                                max = 0;
                                maxI = 0;
                                for (i = 0; i < names.length; i++) {
                                    if (names[i].length > max) {
                                        max = names[i].length;
                                        maxI = i;
                                    }
                                }
                                return maxI;
                            };
                            date.setMonth(findMax(this._get(inst, dateFormat.match(/MM/) ? "monthNames" : "monthNamesShort")));
                            date.setDate(findMax(this._get(inst, dateFormat.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - date.getDay());
                        }
                        inst.input.attr("size", this._formatDate(inst, date).length);
                    }
                },
    
                /* Attach an inline date picker to a div. */
                _inlineDatepicker: function (target, inst) {
                    var divSpan = $(target);
                    if (divSpan.hasClass(this.markerClassName)) {
                        return;
                    }
                    divSpan.addClass(this.markerClassName).append(inst.dpDiv);
                    $.data(target, "datepicker", inst);
                    this._setDate(inst, this._getDefaultDate(inst), true);
                    this._updateDatepicker(inst);
                    this._updateAlternate(inst);
    
                    //If disabled option is true, disable the datepicker before showing it (see ticket #5665)
                    if (inst.settings.disabled) {
                        this._disableDatepicker(target);
                    }
    
                    // Set display:block in place of inst.dpDiv.show() which won't work on disconnected elements
                    // http://bugs.jqueryui.com/ticket/7552 - A Datepicker created on a detached div has zero height
                    inst.dpDiv.css("display", "block");
                },
    
                /* Pop-up the date picker in a "dialog" box.
        * @param  input element - ignored
        * @param  date	string or Date - the initial date to display
        * @param  onSelect  function - the function to call when a date is selected
        * @param  settings  object - update the dialog date picker instance's settings (anonymous object)
        * @param  pos int[2] - coordinates for the dialog's position within the screen or
        *					event - with x/y coordinates or
        *					leave empty for default (screen centre)
        * @return the manager object
        */
                _dialogDatepicker: function (input, date, onSelect, settings, pos) {
                    var id,
                        browserWidth,
                        browserHeight,
                        scrollX,
                        scrollY,
                        inst = this._dialogInst; // internal instance
    
                    if (!inst) {
                        this.uuid += 1;
                        id = "dp" + this.uuid;
                        this._dialogInput = $("<input type='text' id='" + id + "' style='position: absolute; top: -100px; width: 0px;'/>");
                        this._dialogInput.on("keydown", this._doKeyDown);
                        $("body").append(this._dialogInput);
                        inst = this._dialogInst = this._newInst(this._dialogInput, false);
                        inst.settings = {};
                        $.data(this._dialogInput[0], "datepicker", inst);
                    }
                    datepicker_extendRemove(inst.settings, settings || {});
                    date = date && date.constructor === Date ? this._formatDate(inst, date) : date;
                    this._dialogInput.val(date);
    
                    this._pos = pos ? pos.length ? pos : [pos.pageX, pos.pageY] : null;
                    if (!this._pos) {
                        browserWidth = document.documentElement.clientWidth;
                        browserHeight = document.documentElement.clientHeight;
                        scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                        scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                        this._pos = // should use actual width/height below
                        [browserWidth / 2 - 100 + scrollX, browserHeight / 2 - 150 + scrollY];
                    }
    
                    // Move input on screen for focus, but hidden behind dialog
                    this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px");
                    inst.settings.onSelect = onSelect;
                    this._inDialog = true;
                    this.dpDiv.addClass(this._dialogClass);
                    this._showDatepicker(this._dialogInput[0]);
                    if ($.blockUI) {
                        $.blockUI(this.dpDiv);
                    }
                    $.data(this._dialogInput[0], "datepicker", inst);
                    return this;
                },
    
                /* Detach a datepicker from its control.
        * @param  target	element - the target input field or division or span
        */
                _destroyDatepicker: function (target) {
                    var nodeName,
                        $target = $(target),
                        inst = $.data(target, "datepicker");
    
                    if (!$target.hasClass(this.markerClassName)) {
                        return;
                    }
    
                    nodeName = target.nodeName.toLowerCase();
                    $.removeData(target, "datepicker");
                    if (nodeName === "input") {
                        inst.append.remove();
                        inst.trigger.remove();
                        $target.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp);
                    } else if (nodeName === "div" || nodeName === "span") {
                        $target.removeClass(this.markerClassName).empty();
                    }
    
                    if (datepicker_instActive === inst) {
                        datepicker_instActive = null;
                    }
                },
    
                /* Enable the date picker to a jQuery selection.
        * @param  target	element - the target input field or division or span
        */
                _enableDatepicker: function (target) {
                    var nodeName,
                        inline,
                        $target = $(target),
                        inst = $.data(target, "datepicker");
    
                    if (!$target.hasClass(this.markerClassName)) {
                        return;
                    }
    
                    nodeName = target.nodeName.toLowerCase();
                    if (nodeName === "input") {
                        target.disabled = false;
                        inst.trigger.filter("button").each(function () {
                            this.disabled = false;
                        }).end().filter("img").css({ opacity: "1.0", cursor: "" });
                    } else if (nodeName === "div" || nodeName === "span") {
                        inline = $target.children("." + this._inlineClass);
                        inline.children().removeClass("ui-state-disabled");
                        inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", false);
                    }
                    this._disabledInputs = $.map(this._disabledInputs, function (value) {
                        return value === target ? null : value;
                    }); // delete entry
                },
    
                /* Disable the date picker to a jQuery selection.
        * @param  target	element - the target input field or division or span
        */
                _disableDatepicker: function (target) {
                    var nodeName,
                        inline,
                        $target = $(target),
                        inst = $.data(target, "datepicker");
    
                    if (!$target.hasClass(this.markerClassName)) {
                        return;
                    }
    
                    nodeName = target.nodeName.toLowerCase();
                    if (nodeName === "input") {
                        target.disabled = true;
                        inst.trigger.filter("button").each(function () {
                            this.disabled = true;
                        }).end().filter("img").css({ opacity: "0.5", cursor: "default" });
                    } else if (nodeName === "div" || nodeName === "span") {
                        inline = $target.children("." + this._inlineClass);
                        inline.children().addClass("ui-state-disabled");
                        inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", true);
                    }
                    this._disabledInputs = $.map(this._disabledInputs, function (value) {
                        return value === target ? null : value;
                    }); // delete entry
                    this._disabledInputs[this._disabledInputs.length] = target;
                },
    
                /* Is the first field in a jQuery collection disabled as a datepicker?
        * @param  target	element - the target input field or division or span
        * @return boolean - true if disabled, false if enabled
        */
                _isDisabledDatepicker: function (target) {
                    if (!target) {
                        return false;
                    }
                    for (var i = 0; i < this._disabledInputs.length; i++) {
                        if (this._disabledInputs[i] === target) {
                            return true;
                        }
                    }
                    return false;
                },
    
                /* Retrieve the instance data for the target control.
        * @param  target  element - the target input field or division or span
        * @return  object - the associated instance data
        * @throws  error if a jQuery problem getting data
        */
                _getInst: function (target) {
                    try {
                        return $.data(target, "datepicker");
                    } catch (err) {
                        throw "Missing instance data for this datepicker";
                    }
                },
    
                /* Update or retrieve the settings for a date picker attached to an input field or division.
        * @param  target  element - the target input field or division or span
        * @param  name	object - the new settings to update or
        *				string - the name of the setting to change or retrieve,
        *				when retrieving also "all" for all instance settings or
        *				"defaults" for all global defaults
        * @param  value   any - the new value for the setting
        *				(omit if above is an object or to retrieve a value)
        */
                _optionDatepicker: function (target, name, value) {
                    var settings,
                        date,
                        minDate,
                        maxDate,
                        inst = this._getInst(target);
    
                    if (arguments.length === 2 && typeof name === "string") {
                        return name === "defaults" ? $.extend({}, $.datepicker._defaults) : inst ? name === "all" ? $.extend({}, inst.settings) : this._get(inst, name) : null;
                    }
    
                    settings = name || {};
                    if (typeof name === "string") {
                        settings = {};
                        settings[name] = value;
                    }
    
                    if (inst) {
                        if (this._curInst === inst) {
                            this._hideDatepicker();
                        }
    
                        date = this._getDateDatepicker(target, true);
                        minDate = this._getMinMaxDate(inst, "min");
                        maxDate = this._getMinMaxDate(inst, "max");
                        datepicker_extendRemove(inst.settings, settings);
    
                        // reformat the old minDate/maxDate values if dateFormat changes and a new minDate/maxDate isn't provided
                        if (minDate !== null && settings.dateFormat !== undefined && settings.minDate === undefined) {
                            inst.settings.minDate = this._formatDate(inst, minDate);
                        }
                        if (maxDate !== null && settings.dateFormat !== undefined && settings.maxDate === undefined) {
                            inst.settings.maxDate = this._formatDate(inst, maxDate);
                        }
                        if ("disabled" in settings) {
                            if (settings.disabled) {
                                this._disableDatepicker(target);
                            } else {
                                this._enableDatepicker(target);
                            }
                        }
                        this._attachments($(target), inst);
                        this._autoSize(inst);
                        this._setDate(inst, date);
                        this._updateAlternate(inst);
                        this._updateDatepicker(inst);
                    }
                },
    
                // Change method deprecated
                _changeDatepicker: function (target, name, value) {
                    this._optionDatepicker(target, name, value);
                },
    
                /* Redraw the date picker attached to an input field or division.
        * @param  target  element - the target input field or division or span
        */
                _refreshDatepicker: function (target) {
                    var inst = this._getInst(target);
                    if (inst) {
                        this._updateDatepicker(inst);
                    }
                },
    
                /* Set the dates for a jQuery selection.
        * @param  target element - the target input field or division or span
        * @param  date	Date - the new date
        */
                _setDateDatepicker: function (target, date) {
                    var inst = this._getInst(target);
                    if (inst) {
                        this._setDate(inst, date);
                        this._updateDatepicker(inst);
                        this._updateAlternate(inst);
                    }
                },
    
                /* Get the date(s) for the first entry in a jQuery selection.
        * @param  target element - the target input field or division or span
        * @param  noDefault boolean - true if no default date is to be used
        * @return Date - the current date
        */
                _getDateDatepicker: function (target, noDefault) {
                    var inst = this._getInst(target);
                    if (inst && !inst.inline) {
                        this._setDateFromField(inst, noDefault);
                    }
                    return inst ? this._getDate(inst) : null;
                },
    
                /* Handle keystrokes. */
                _doKeyDown: function (event) {
                    var onSelect,
                        dateStr,
                        sel,
                        inst = $.datepicker._getInst(event.target),
                        handled = true,
                        isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
    
                    inst._keyEvent = true;
                    if ($.datepicker._datepickerShowing) {
                        switch (event.keyCode) {
                            case 9:
                                $.datepicker._hideDatepicker();
                                handled = false;
                                break; // hide on tab out
                            case 13:
                                sel = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", inst.dpDiv);
                                if (sel[0]) {
                                    $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
                                }
    
                                onSelect = $.datepicker._get(inst, "onSelect");
                                if (onSelect) {
                                    dateStr = $.datepicker._formatDate(inst);
    
                                    // Trigger custom callback
                                    onSelect.apply(inst.input ? inst.input[0] : null, [dateStr, inst]);
                                } else {
                                    $.datepicker._hideDatepicker();
                                }
    
                                return false; // don't submit the form
                            case 27:
                                $.datepicker._hideDatepicker();
                                break; // hide on escape
                            case 33:
                                $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
                                break; // previous month/year on page up/+ ctrl
                            case 34:
                                $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
                                break; // next month/year on page down/+ ctrl
                            case 35:
                                if (event.ctrlKey || event.metaKey) {
                                    $.datepicker._clearDate(event.target);
                                }
                                handled = event.ctrlKey || event.metaKey;
                                break; // clear on ctrl or command +end
                            case 36:
                                if (event.ctrlKey || event.metaKey) {
                                    $.datepicker._gotoToday(event.target);
                                }
                                handled = event.ctrlKey || event.metaKey;
                                break; // current on ctrl or command +home
                            case 37:
                                if (event.ctrlKey || event.metaKey) {
                                    $.datepicker._adjustDate(event.target, isRTL ? +1 : -1, "D");
                                }
                                handled = event.ctrlKey || event.metaKey;
    
                                // -1 day on ctrl or command +left
                                if (event.originalEvent.altKey) {
                                    $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
                                }
    
                                // next month/year on alt +left on Mac
                                break;
                            case 38:
                                if (event.ctrlKey || event.metaKey) {
                                    $.datepicker._adjustDate(event.target, -7, "D");
                                }
                                handled = event.ctrlKey || event.metaKey;
                                break; // -1 week on ctrl or command +up
                            case 39:
                                if (event.ctrlKey || event.metaKey) {
                                    $.datepicker._adjustDate(event.target, isRTL ? -1 : +1, "D");
                                }
                                handled = event.ctrlKey || event.metaKey;
    
                                // +1 day on ctrl or command +right
                                if (event.originalEvent.altKey) {
                                    $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
                                }
    
                                // next month/year on alt +right
                                break;
                            case 40:
                                if (event.ctrlKey || event.metaKey) {
                                    $.datepicker._adjustDate(event.target, +7, "D");
                                }
                                handled = event.ctrlKey || event.metaKey;
                                break; // +1 week on ctrl or command +down
                            default:
                                handled = false;
                        }
                    } else if (event.keyCode === 36 && event.ctrlKey) {
                        // display the date picker on ctrl+home
                        $.datepicker._showDatepicker(this);
                    } else {
                        handled = false;
                    }
    
                    if (handled) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                },
    
                /* Filter entered characters - based on date format. */
                _doKeyPress: function (event) {
                    var chars,
                        chr,
                        inst = $.datepicker._getInst(event.target);
    
                    if ($.datepicker._get(inst, "constrainInput")) {
                        chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
                        chr = String.fromCharCode(event.charCode == null ? event.keyCode : event.charCode);
                        return event.ctrlKey || event.metaKey || chr < " " || !chars || chars.indexOf(chr) > -1;
                    }
                },
    
                /* Synchronise manual entry and field/alternate field. */
                _doKeyUp: function (event) {
                    var date,
                        inst = $.datepicker._getInst(event.target);
    
                    if (inst.input.val() !== inst.lastVal) {
                        try {
                            date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), inst.input ? inst.input.val() : null, $.datepicker._getFormatConfig(inst));
    
                            if (date) {
                                // only if valid
                                $.datepicker._setDateFromField(inst);
                                $.datepicker._updateAlternate(inst);
                                $.datepicker._updateDatepicker(inst);
                            }
                        } catch (err) {}
                    }
                    return true;
                },
    
                /* Pop-up the date picker for a given input field.
        * If false returned from beforeShow event handler do not show.
        * @param  input  element - the input field attached to the date picker or
        *					event - if triggered by focus
        */
                _showDatepicker: function (input) {
                    input = input.target || input;
                    if (input.nodeName.toLowerCase() !== "input") {
                        // find from button/image trigger
                        input = $("input", input.parentNode)[0];
                    }
    
                    if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput === input) {
                        // already here
                        return;
                    }
    
                    var inst, beforeShow, beforeShowSettings, isFixed, offset, showAnim, duration;
    
                    inst = $.datepicker._getInst(input);
                    if ($.datepicker._curInst && $.datepicker._curInst !== inst) {
                        $.datepicker._curInst.dpDiv.stop(true, true);
                        if (inst && $.datepicker._datepickerShowing) {
                            $.datepicker._hideDatepicker($.datepicker._curInst.input[0]);
                        }
                    }
    
                    beforeShow = $.datepicker._get(inst, "beforeShow");
                    beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
                    if (beforeShowSettings === false) {
                        return;
                    }
                    datepicker_extendRemove(inst.settings, beforeShowSettings);
    
                    inst.lastVal = null;
                    $.datepicker._lastInput = input;
                    $.datepicker._setDateFromField(inst);
    
                    if ($.datepicker._inDialog) {
                        // hide cursor
                        input.value = "";
                    }
                    if (!$.datepicker._pos) {
                        // position below input
                        $.datepicker._pos = $.datepicker._findPos(input);
                        $.datepicker._pos[1] += input.offsetHeight; // add the height
                    }
    
                    isFixed = false;
                    $(input).parents().each(function () {
                        isFixed |= $(this).css("position") === "fixed";
                        return !isFixed;
                    });
    
                    offset = { left: $.datepicker._pos[0], top: $.datepicker._pos[1] };
                    $.datepicker._pos = null;
    
                    //to avoid flashes on Firefox
                    inst.dpDiv.empty();
    
                    // determine sizing offscreen
                    inst.dpDiv.css({ position: "absolute", display: "block", top: "-1000px" });
                    $.datepicker._updateDatepicker(inst);
    
                    // fix width for dynamic number of date pickers
                    // and adjust position before showing
                    offset = $.datepicker._checkOffset(inst, offset, isFixed);
                    inst.dpDiv.css({ position: $.datepicker._inDialog && $.blockUI ? "static" : isFixed ? "fixed" : "absolute", display: "none",
                        left: offset.left + "px", top: offset.top + "px" });
    
                    if (!inst.inline) {
                        showAnim = $.datepicker._get(inst, "showAnim");
                        duration = $.datepicker._get(inst, "duration");
                        inst.dpDiv.css("z-index", datepicker_getZindex($(input)) + 1);
                        $.datepicker._datepickerShowing = true;
    
                        if ($.effects && $.effects.effect[showAnim]) {
                            inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration);
                        } else {
                            inst.dpDiv[showAnim || "show"](showAnim ? duration : null);
                        }
    
                        if ($.datepicker._shouldFocusInput(inst)) {
                            inst.input.trigger("focus");
                        }
    
                        $.datepicker._curInst = inst;
                    }
                },
    
                /* Generate the date picker content. */
                _updateDatepicker: function (inst) {
                    this.maxRows = 4; //Reset the max number of rows being displayed (see #7043)
                    datepicker_instActive = inst; // for delegate hover events
                    inst.dpDiv.empty().append(this._generateHTML(inst));
                    this._attachHandlers(inst);
    
                    var origyearshtml,
                        numMonths = this._getNumberOfMonths(inst),
                        cols = numMonths[1],
                        width = 17,
                        activeCell = inst.dpDiv.find("." + this._dayOverClass + " a");
    
                    if (activeCell.length > 0) {
                        datepicker_handleMouseover.apply(activeCell.get(0));
                    }
    
                    inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
                    if (cols > 1) {
                        inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", width * cols + "em");
                    }
                    inst.dpDiv[(numMonths[0] !== 1 || numMonths[1] !== 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
                    inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
    
                    if (inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput(inst)) {
                        inst.input.trigger("focus");
                    }
    
                    // Deffered render of the years select (to avoid flashes on Firefox)
                    if (inst.yearshtml) {
                        origyearshtml = inst.yearshtml;
                        setTimeout(function () {
    
                            //assure that inst.yearshtml didn't change.
                            if (origyearshtml === inst.yearshtml && inst.yearshtml) {
                                inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml);
                            }
                            origyearshtml = inst.yearshtml = null;
                        }, 0);
                    }
                },
    
                // #6694 - don't focus the input if it's already focused
                // this breaks the change event in IE
                // Support: IE and jQuery <1.9
                _shouldFocusInput: function (inst) {
                    return inst.input && inst.input.is(":visible") && !inst.input.is(":disabled") && !inst.input.is(":focus");
                },
    
                /* Check positioning to remain on screen. */
                _checkOffset: function (inst, offset, isFixed) {
                    var dpWidth = inst.dpDiv.outerWidth(),
                        dpHeight = inst.dpDiv.outerHeight(),
                        inputWidth = inst.input ? inst.input.outerWidth() : 0,
                        inputHeight = inst.input ? inst.input.outerHeight() : 0,
                        viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft()),
                        viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());
    
                    offset.left -= this._get(inst, "isRTL") ? dpWidth - inputWidth : 0;
                    offset.left -= isFixed && offset.left === inst.input.offset().left ? $(document).scrollLeft() : 0;
                    offset.top -= isFixed && offset.top === inst.input.offset().top + inputHeight ? $(document).scrollTop() : 0;
    
                    // Now check if datepicker is showing outside window viewport - move to a better place if so.
                    offset.left -= Math.min(offset.left, offset.left + dpWidth > viewWidth && viewWidth > dpWidth ? Math.abs(offset.left + dpWidth - viewWidth) : 0);
                    offset.top -= Math.min(offset.top, offset.top + dpHeight > viewHeight && viewHeight > dpHeight ? Math.abs(dpHeight + inputHeight) : 0);
    
                    return offset;
                },
    
                /* Find an object's position on the screen. */
                _findPos: function (obj) {
                    var position,
                        inst = this._getInst(obj),
                        isRTL = this._get(inst, "isRTL");
    
                    while (obj && (obj.type === "hidden" || obj.nodeType !== 1 || $.expr.filters.hidden(obj))) {
                        obj = obj[isRTL ? "previousSibling" : "nextSibling"];
                    }
    
                    position = $(obj).offset();
                    return [position.left, position.top];
                },
    
                /* Hide the date picker from view.
        * @param  input  element - the input field attached to the date picker
        */
                _hideDatepicker: function (input) {
                    var showAnim,
                        duration,
                        postProcess,
                        onClose,
                        inst = this._curInst;
    
                    if (!inst || input && inst !== $.data(input, "datepicker")) {
                        return;
                    }
    
                    if (this._datepickerShowing) {
                        showAnim = this._get(inst, "showAnim");
                        duration = this._get(inst, "duration");
                        postProcess = function () {
                            $.datepicker._tidyDialog(inst);
                        };
    
                        // DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
                        if ($.effects && ($.effects.effect[showAnim] || $.effects[showAnim])) {
                            inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess);
                        } else {
                            inst.dpDiv[showAnim === "slideDown" ? "slideUp" : showAnim === "fadeIn" ? "fadeOut" : "hide"](showAnim ? duration : null, postProcess);
                        }
    
                        if (!showAnim) {
                            postProcess();
                        }
                        this._datepickerShowing = false;
    
                        onClose = this._get(inst, "onClose");
                        if (onClose) {
                            onClose.apply(inst.input ? inst.input[0] : null, [inst.input ? inst.input.val() : "", inst]);
                        }
    
                        this._lastInput = null;
                        if (this._inDialog) {
                            this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" });
                            if ($.blockUI) {
                                $.unblockUI();
                                $("body").append(this.dpDiv);
                            }
                        }
                        this._inDialog = false;
                    }
                },
    
                /* Tidy up after a dialog display. */
                _tidyDialog: function (inst) {
                    inst.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar");
                },
    
                /* Close date picker if clicked elsewhere. */
                _checkExternalClick: function (event) {
                    if (!$.datepicker._curInst) {
                        return;
                    }
    
                    var $target = $(event.target),
                        inst = $.datepicker._getInst($target[0]);
    
                    if ($target[0].id !== $.datepicker._mainDivId && $target.parents("#" + $.datepicker._mainDivId).length === 0 && !$target.hasClass($.datepicker.markerClassName) && !$target.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI) || $target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst !== inst) {
                        $.datepicker._hideDatepicker();
                    }
                },
    
                /* Adjust one of the date sub-fields. */
                _adjustDate: function (id, offset, period) {
                    var target = $(id),
                        inst = this._getInst(target[0]);
    
                    if (this._isDisabledDatepicker(target[0])) {
                        return;
                    }
                    this._adjustInstDate(inst, offset, period);
                    this._updateDatepicker(inst);
                },
    
                /* Action for current link. */
                _gotoToday: function (id) {
                    var date,
                        target = $(id),
                        inst = this._getInst(target[0]);
    
                    if (this._get(inst, "gotoCurrent") && inst.currentDay) {
                        inst.selectedDay = inst.currentDay;
                        inst.drawMonth = inst.selectedMonth = inst.currentMonth;
                        inst.drawYear = inst.selectedYear = inst.currentYear;
                    } else {
                        date = new Date();
                        inst.selectedDay = date.getDate();
                        inst.drawMonth = inst.selectedMonth = date.getMonth();
                        inst.drawYear = inst.selectedYear = date.getFullYear();
                    }
                    this._notifyChange(inst);
                    this._adjustDate(target);
                },
    
                /* Action for selecting a new month/year. */
                _selectMonthYear: function (id, select, period) {
                    var target = $(id),
                        inst = this._getInst(target[0]);
    
                    inst["selected" + (period === "M" ? "Month" : "Year")] = inst["draw" + (period === "M" ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10);
    
                    this._notifyChange(inst);
                    this._adjustDate(target);
                },
    
                /* Action for selecting a day. */
                _selectDay: function (id, month, year, td) {
                    var inst,
                        target = $(id);
    
                    if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
                        return;
                    }
    
                    inst = this._getInst(target[0]);
                    inst.selectedDay = inst.currentDay = $("a", td).html();
                    inst.selectedMonth = inst.currentMonth = month;
                    inst.selectedYear = inst.currentYear = year;
                    this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear));
                },
    
                /* Erase the input field and hide the date picker. */
                _clearDate: function (id) {
                    var target = $(id);
                    this._selectDate(target, "");
                },
    
                /* Update the input field with the selected date. */
                _selectDate: function (id, dateStr) {
                    var onSelect,
                        target = $(id),
                        inst = this._getInst(target[0]);
    
                    dateStr = dateStr != null ? dateStr : this._formatDate(inst);
                    if (inst.input) {
                        inst.input.val(dateStr);
                    }
                    this._updateAlternate(inst);
    
                    onSelect = this._get(inst, "onSelect");
                    if (onSelect) {
                        onSelect.apply(inst.input ? inst.input[0] : null, [dateStr, inst]); // trigger custom callback
                    } else if (inst.input) {
                        inst.input.trigger("change"); // fire the change event
                    }
    
                    if (inst.inline) {
                        this._updateDatepicker(inst);
                    } else {
                        this._hideDatepicker();
                        this._lastInput = inst.input[0];
                        if (typeof inst.input[0] !== "object") {
                            inst.input.trigger("focus"); // restore focus
                        }
                        this._lastInput = null;
                    }
                },
    
                /* Update any alternate field to synchronise with the main field. */
                _updateAlternate: function (inst) {
                    var altFormat,
                        date,
                        dateStr,
                        altField = this._get(inst, "altField");
    
                    if (altField) {
                        // update alternate field too
                        altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
                        date = this._getDate(inst);
                        dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
                        $(altField).val(dateStr);
                    }
                },
    
                /* Set as beforeShowDay function to prevent selection of weekends.
        * @param  date  Date - the date to customise
        * @return [boolean, string] - is this date selectable?, what is its CSS class?
        */
                noWeekends: function (date) {
                    var day = date.getDay();
                    return [day > 0 && day < 6, ""];
                },
    
                /* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
        * @param  date  Date - the date to get the week for
        * @return  number - the number of the week within the year that contains this date
        */
                iso8601Week: function (date) {
                    var time,
                        checkDate = new Date(date.getTime());
    
                    // Find Thursday of this week starting on Monday
                    checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
    
                    time = checkDate.getTime();
                    checkDate.setMonth(0); // Compare with Jan 1
                    checkDate.setDate(1);
                    return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
                },
    
                /* Parse a string value into a date object.
        * See formatDate below for the possible formats.
        *
        * @param  format string - the expected format of the date
        * @param  value string - the date in the above format
        * @param  settings Object - attributes include:
        *					shortYearCutoff  number - the cutoff year for determining the century (optional)
        *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
        *					dayNames		string[7] - names of the days from Sunday (optional)
        *					monthNamesShort string[12] - abbreviated names of the months (optional)
        *					monthNames		string[12] - names of the months (optional)
        * @return  Date - the extracted date value or null if value is blank
        */
                parseDate: function (format, value, settings) {
                    if (format == null || value == null) {
                        throw "Invalid arguments";
                    }
    
                    value = typeof value === "object" ? value.toString() : value + "";
                    if (value === "") {
                        return null;
                    }
    
                    var iFormat,
                        dim,
                        extra,
                        iValue = 0,
                        shortYearCutoffTemp = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                        shortYearCutoff = typeof shortYearCutoffTemp !== "string" ? shortYearCutoffTemp : new Date().getFullYear() % 100 + parseInt(shortYearCutoffTemp, 10),
                        dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
                        dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
                        monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
                        monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
                        year = -1,
                        month = -1,
                        day = -1,
                        doy = -1,
                        literal = false,
                        date,
    
    
                    // Check whether a format character is doubled
                    lookAhead = function (match) {
                        var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                        if (matches) {
                            iFormat++;
                        }
                        return matches;
                    },
    
    
                    // Extract a number from the string value
                    getNumber = function (match) {
                        var isDoubled = lookAhead(match),
                            size = match === "@" ? 14 : match === "!" ? 20 : match === "y" && isDoubled ? 4 : match === "o" ? 3 : 2,
                            minSize = match === "y" ? size : 1,
                            digits = new RegExp("^\\d{" + minSize + "," + size + "}"),
                            num = value.substring(iValue).match(digits);
                        if (!num) {
                            throw "Missing number at position " + iValue;
                        }
                        iValue += num[0].length;
                        return parseInt(num[0], 10);
                    },
    
    
                    // Extract a name from the string value and convert to an index
                    getName = function (match, shortNames, longNames) {
                        var index = -1,
                            names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
                            return [[k, v]];
                        }).sort(function (a, b) {
                            return -(a[1].length - b[1].length);
                        });
    
                        $.each(names, function (i, pair) {
                            var name = pair[1];
                            if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
                                index = pair[0];
                                iValue += name.length;
                                return false;
                            }
                        });
                        if (index !== -1) {
                            return index + 1;
                        } else {
                            throw "Unknown name at position " + iValue;
                        }
                    },
    
    
                    // Confirm that a literal character matches the string value
                    checkLiteral = function () {
                        if (value.charAt(iValue) !== format.charAt(iFormat)) {
                            throw "Unexpected literal at position " + iValue;
                        }
                        iValue++;
                    };
    
                    for (iFormat = 0; iFormat < format.length; iFormat++) {
                        if (literal) {
                            if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                                literal = false;
                            } else {
                                checkLiteral();
                            }
                        } else {
                            switch (format.charAt(iFormat)) {
                                case "d":
                                    day = getNumber("d");
                                    break;
                                case "D":
                                    getName("D", dayNamesShort, dayNames);
                                    break;
                                case "o":
                                    doy = getNumber("o");
                                    break;
                                case "m":
                                    month = getNumber("m");
                                    break;
                                case "M":
                                    month = getName("M", monthNamesShort, monthNames);
                                    break;
                                case "y":
                                    year = getNumber("y");
                                    break;
                                case "@":
                                    date = new Date(getNumber("@"));
                                    year = date.getFullYear();
                                    month = date.getMonth() + 1;
                                    day = date.getDate();
                                    break;
                                case "!":
                                    date = new Date((getNumber("!") - this._ticksTo1970) / 10000);
                                    year = date.getFullYear();
                                    month = date.getMonth() + 1;
                                    day = date.getDate();
                                    break;
                                case "'":
                                    if (lookAhead("'")) {
                                        checkLiteral();
                                    } else {
                                        literal = true;
                                    }
                                    break;
                                default:
                                    checkLiteral();
                            }
                        }
                    }
    
                    if (iValue < value.length) {
                        extra = value.substr(iValue);
                        if (!/^\s+/.test(extra)) {
                            throw "Extra/unparsed characters found in date: " + extra;
                        }
                    }
    
                    if (year === -1) {
                        year = new Date().getFullYear();
                    } else if (year < 100) {
                        year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100);
                    }
    
                    if (doy > -1) {
                        month = 1;
                        day = doy;
                        do {
                            dim = this._getDaysInMonth(year, month - 1);
                            if (day <= dim) {
                                break;
                            }
                            month++;
                            day -= dim;
                        } while (true);
                    }
    
                    date = this._daylightSavingAdjust(new Date(year, month - 1, day));
                    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
                        throw "Invalid date"; // E.g. 31/02/00
                    }
                    return date;
                },
    
                /* Standard date formats. */
                ATOM: "yy-mm-dd", // RFC 3339 (ISO 8601)
                COOKIE: "D, dd M yy",
                ISO_8601: "yy-mm-dd",
                RFC_822: "D, d M y",
                RFC_850: "DD, dd-M-y",
                RFC_1036: "D, d M y",
                RFC_1123: "D, d M yy",
                RFC_2822: "D, d M yy",
                RSS: "D, d M y", // RFC 822
                TICKS: "!",
                TIMESTAMP: "@",
                W3C: "yy-mm-dd", // ISO 8601
    
                _ticksTo1970: ((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000,
    
                /* Format a date object into a string value.
        * The format can be combinations of the following:
        * d  - day of month (no leading zero)
        * dd - day of month (two digit)
        * o  - day of year (no leading zeros)
        * oo - day of year (three digit)
        * D  - day name short
        * DD - day name long
        * m  - month of year (no leading zero)
        * mm - month of year (two digit)
        * M  - month name short
        * MM - month name long
        * y  - year (two digit)
        * yy - year (four digit)
        * @ - Unix timestamp (ms since 01/01/1970)
        * ! - Windows ticks (100ns since 01/01/0001)
        * "..." - literal text
        * '' - single quote
        *
        * @param  format string - the desired format of the date
        * @param  date Date - the date value to format
        * @param  settings Object - attributes include:
        *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
        *					dayNames		string[7] - names of the days from Sunday (optional)
        *					monthNamesShort string[12] - abbreviated names of the months (optional)
        *					monthNames		string[12] - names of the months (optional)
        * @return  string - the date in the above format
        */
                formatDate: function (format, date, settings) {
                    if (!date) {
                        return "";
                    }
    
                    var iFormat,
                        dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
                        dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
                        monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
                        monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
    
    
                    // Check whether a format character is doubled
                    lookAhead = function (match) {
                        var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                        if (matches) {
                            iFormat++;
                        }
                        return matches;
                    },
    
    
                    // Format a number, with leading zero if necessary
                    formatNumber = function (match, value, len) {
                        var num = "" + value;
                        if (lookAhead(match)) {
                            while (num.length < len) {
                                num = "0" + num;
                            }
                        }
                        return num;
                    },
    
    
                    // Format a name, short or long as requested
                    formatName = function (match, value, shortNames, longNames) {
                        return lookAhead(match) ? longNames[value] : shortNames[value];
                    },
                        output = "",
                        literal = false;
    
                    if (date) {
                        for (iFormat = 0; iFormat < format.length; iFormat++) {
                            if (literal) {
                                if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                                    literal = false;
                                } else {
                                    output += format.charAt(iFormat);
                                }
                            } else {
                                switch (format.charAt(iFormat)) {
                                    case "d":
                                        output += formatNumber("d", date.getDate(), 2);
                                        break;
                                    case "D":
                                        output += formatName("D", date.getDay(), dayNamesShort, dayNames);
                                        break;
                                    case "o":
                                        output += formatNumber("o", Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                                        break;
                                    case "m":
                                        output += formatNumber("m", date.getMonth() + 1, 2);
                                        break;
                                    case "M":
                                        output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
                                        break;
                                    case "y":
                                        output += lookAhead("y") ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? "0" : "") + date.getFullYear() % 100;
                                        break;
                                    case "@":
                                        output += date.getTime();
                                        break;
                                    case "!":
                                        output += date.getTime() * 10000 + this._ticksTo1970;
                                        break;
                                    case "'":
                                        if (lookAhead("'")) {
                                            output += "'";
                                        } else {
                                            literal = true;
                                        }
                                        break;
                                    default:
                                        output += format.charAt(iFormat);
                                }
                            }
                        }
                    }
                    return output;
                },
    
                /* Extract all possible characters from the date format. */
                _possibleChars: function (format) {
                    var iFormat,
                        chars = "",
                        literal = false,
    
    
                    // Check whether a format character is doubled
                    lookAhead = function (match) {
                        var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
                        if (matches) {
                            iFormat++;
                        }
                        return matches;
                    };
    
                    for (iFormat = 0; iFormat < format.length; iFormat++) {
                        if (literal) {
                            if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                                literal = false;
                            } else {
                                chars += format.charAt(iFormat);
                            }
                        } else {
                            switch (format.charAt(iFormat)) {
                                case "d":case "m":case "y":case "@":
                                    chars += "0123456789";
                                    break;
                                case "D":case "M":
                                    return null; // Accept anything
                                case "'":
                                    if (lookAhead("'")) {
                                        chars += "'";
                                    } else {
                                        literal = true;
                                    }
                                    break;
                                default:
                                    chars += format.charAt(iFormat);
                            }
                        }
                    }
                    return chars;
                },
    
                /* Get a setting value, defaulting if necessary. */
                _get: function (inst, name) {
                    return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name];
                },
    
                /* Parse existing date and initialise date picker. */
                _setDateFromField: function (inst, noDefault) {
                    if (inst.input.val() === inst.lastVal) {
                        return;
                    }
    
                    var dateFormat = this._get(inst, "dateFormat"),
                        dates = inst.lastVal = inst.input ? inst.input.val() : null,
                        defaultDate = this._getDefaultDate(inst),
                        date = defaultDate,
                        settings = this._getFormatConfig(inst);
    
                    try {
                        date = this.parseDate(dateFormat, dates, settings) || defaultDate;
                    } catch (event) {
                        dates = noDefault ? "" : dates;
                    }
                    inst.selectedDay = date.getDate();
                    inst.drawMonth = inst.selectedMonth = date.getMonth();
                    inst.drawYear = inst.selectedYear = date.getFullYear();
                    inst.currentDay = dates ? date.getDate() : 0;
                    inst.currentMonth = dates ? date.getMonth() : 0;
                    inst.currentYear = dates ? date.getFullYear() : 0;
                    this._adjustInstDate(inst);
                },
    
                /* Retrieve the default date shown on opening. */
                _getDefaultDate: function (inst) {
                    return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, "defaultDate"), new Date()));
                },
    
                /* A date may be specified as an exact value or a relative one. */
                _determineDate: function (inst, date, defaultDate) {
                    var offsetNumeric = function (offset) {
                        var date = new Date();
                        date.setDate(date.getDate() + offset);
                        return date;
                    },
                        offsetString = function (offset) {
                        try {
                            return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), offset, $.datepicker._getFormatConfig(inst));
                        } catch (e) {
    
                            // Ignore
                        }
    
                        var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date(),
                            year = date.getFullYear(),
                            month = date.getMonth(),
                            day = date.getDate(),
                            pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
                            matches = pattern.exec(offset);
    
                        while (matches) {
                            switch (matches[2] || "d") {
                                case "d":case "D":
                                    day += parseInt(matches[1], 10);break;
                                case "w":case "W":
                                    day += parseInt(matches[1], 10) * 7;break;
                                case "m":case "M":
                                    month += parseInt(matches[1], 10);
                                    day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                                    break;
                                case "y":case "Y":
                                    year += parseInt(matches[1], 10);
                                    day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                                    break;
                            }
                            matches = pattern.exec(offset);
                        }
                        return new Date(year, month, day);
                    },
                        newDate = date == null || date === "" ? defaultDate : typeof date === "string" ? offsetString(date) : typeof date === "number" ? isNaN(date) ? defaultDate : offsetNumeric(date) : new Date(date.getTime());
    
                    newDate = newDate && newDate.toString() === "Invalid Date" ? defaultDate : newDate;
                    if (newDate) {
                        newDate.setHours(0);
                        newDate.setMinutes(0);
                        newDate.setSeconds(0);
                        newDate.setMilliseconds(0);
                    }
                    return this._daylightSavingAdjust(newDate);
                },
    
                /* Handle switch to/from daylight saving.
        * Hours may be non-zero on daylight saving cut-over:
        * > 12 when midnight changeover, but then cannot generate
        * midnight datetime, so jump to 1AM, otherwise reset.
        * @param  date  (Date) the date to check
        * @return  (Date) the corrected date
        */
                _daylightSavingAdjust: function (date) {
                    if (!date) {
                        return null;
                    }
                    date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
                    return date;
                },
    
                /* Set the date(s) directly. */
                _setDate: function (inst, date, noChange) {
                    var clear = !date,
                        origMonth = inst.selectedMonth,
                        origYear = inst.selectedYear,
                        newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
    
                    inst.selectedDay = inst.currentDay = newDate.getDate();
                    inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
                    inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
                    if ((origMonth !== inst.selectedMonth || origYear !== inst.selectedYear) && !noChange) {
                        this._notifyChange(inst);
                    }
                    this._adjustInstDate(inst);
                    if (inst.input) {
                        inst.input.val(clear ? "" : this._formatDate(inst));
                    }
                },
    
                /* Retrieve the date(s) directly. */
                _getDate: function (inst) {
                    var startDate = !inst.currentYear || inst.input && inst.input.val() === "" ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
                    return startDate;
                },
    
                /* Attach the onxxx handlers.  These are declared statically so
        * they work with static code transformers like Caja.
        */
                _attachHandlers: function (inst) {
                    var stepMonths = this._get(inst, "stepMonths"),
                        id = "#" + inst.id.replace(/\\\\/g, "\\");
                    inst.dpDiv.find("[data-handler]").map(function () {
                        var handler = {
                            prev: function () {
                                $.datepicker._adjustDate(id, -stepMonths, "M");
                            },
                            next: function () {
                                $.datepicker._adjustDate(id, +stepMonths, "M");
                            },
                            hide: function () {
                                $.datepicker._hideDatepicker();
                            },
                            today: function () {
                                $.datepicker._gotoToday(id);
                            },
                            selectDay: function () {
                                $.datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
                                return false;
                            },
                            selectMonth: function () {
                                $.datepicker._selectMonthYear(id, this, "M");
                                return false;
                            },
                            selectYear: function () {
                                $.datepicker._selectMonthYear(id, this, "Y");
                                return false;
                            }
                        };
                        $(this).on(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")]);
                    });
                },
    
                /* Generate the HTML for the current state of the date picker. */
                _generateHTML: function (inst) {
                    var maxDraw,
                        prevText,
                        prev,
                        nextText,
                        next,
                        currentText,
                        gotoDate,
                        controls,
                        buttonPanel,
                        firstDay,
                        showWeek,
                        dayNames,
                        dayNamesMin,
                        monthNames,
                        monthNamesShort,
                        beforeShowDay,
                        showOtherMonths,
                        selectOtherMonths,
                        defaultDate,
                        html,
                        dow,
                        row,
                        group,
                        col,
                        selectedDate,
                        cornerClass,
                        calender,
                        thead,
                        day,
                        daysInMonth,
                        leadDays,
                        curRows,
                        numRows,
                        printDate,
                        dRow,
                        tbody,
                        daySettings,
                        otherMonth,
                        unselectable,
                        tempDate = new Date(),
                        today = this._daylightSavingAdjust(new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())),
                        // clear time
                    isRTL = this._get(inst, "isRTL"),
                        showButtonPanel = this._get(inst, "showButtonPanel"),
                        hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"),
                        navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"),
                        numMonths = this._getNumberOfMonths(inst),
                        showCurrentAtPos = this._get(inst, "showCurrentAtPos"),
                        stepMonths = this._get(inst, "stepMonths"),
                        isMultiMonth = numMonths[0] !== 1 || numMonths[1] !== 1,
                        currentDate = this._daylightSavingAdjust(!inst.currentDay ? new Date(9999, 9, 9) : new Date(inst.currentYear, inst.currentMonth, inst.currentDay)),
                        minDate = this._getMinMaxDate(inst, "min"),
                        maxDate = this._getMinMaxDate(inst, "max"),
                        drawMonth = inst.drawMonth - showCurrentAtPos,
                        drawYear = inst.drawYear;
    
                    if (drawMonth < 0) {
                        drawMonth += 12;
                        drawYear--;
                    }
                    if (maxDate) {
                        maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - numMonths[0] * numMonths[1] + 1, maxDate.getDate()));
                        maxDraw = minDate && maxDraw < minDate ? minDate : maxDraw;
                        while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
                            drawMonth--;
                            if (drawMonth < 0) {
                                drawMonth = 11;
                                drawYear--;
                            }
                        }
                    }
                    inst.drawMonth = drawMonth;
                    inst.drawYear = drawYear;
    
                    prevText = this._get(inst, "prevText");
                    prevText = !navigationAsDateFormat ? prevText : this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst));
    
                    prev = this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click'" + " title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + prevText + "</span></a>" : hideIfNoPrevNext ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + prevText + "</span></a>";
    
                    nextText = this._get(inst, "nextText");
                    nextText = !navigationAsDateFormat ? nextText : this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst));
    
                    next = this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click'" + " title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + nextText + "</span></a>" : hideIfNoPrevNext ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + nextText + "</span></a>";
    
                    currentText = this._get(inst, "currentText");
                    gotoDate = this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today;
                    currentText = !navigationAsDateFormat ? currentText : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst));
    
                    controls = !inst.inline ? "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(inst, "closeText") + "</button>" : "";
    
                    buttonPanel = showButtonPanel ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (isRTL ? controls : "") + (this._isInRange(inst, gotoDate) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'" + ">" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "";
    
                    firstDay = parseInt(this._get(inst, "firstDay"), 10);
                    firstDay = isNaN(firstDay) ? 0 : firstDay;
    
                    showWeek = this._get(inst, "showWeek");
                    dayNames = this._get(inst, "dayNames");
                    dayNamesMin = this._get(inst, "dayNamesMin");
                    monthNames = this._get(inst, "monthNames");
                    monthNamesShort = this._get(inst, "monthNamesShort");
                    beforeShowDay = this._get(inst, "beforeShowDay");
                    showOtherMonths = this._get(inst, "showOtherMonths");
                    selectOtherMonths = this._get(inst, "selectOtherMonths");
                    defaultDate = this._getDefaultDate(inst);
                    html = "";
    
                    for (row = 0; row < numMonths[0]; row++) {
                        group = "";
                        this.maxRows = 4;
                        for (col = 0; col < numMonths[1]; col++) {
                            selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
                            cornerClass = " ui-corner-all";
                            calender = "";
                            if (isMultiMonth) {
                                calender += "<div class='ui-datepicker-group";
                                if (numMonths[1] > 1) {
                                    switch (col) {
                                        case 0:
                                            calender += " ui-datepicker-group-first";
                                            cornerClass = " ui-corner-" + (isRTL ? "right" : "left");break;
                                        case numMonths[1] - 1:
                                            calender += " ui-datepicker-group-last";
                                            cornerClass = " ui-corner-" + (isRTL ? "left" : "right");break;
                                        default:
                                            calender += " ui-datepicker-group-middle";cornerClass = "";break;
                                    }
                                }
                                calender += "'>";
                            }
                            calender += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + cornerClass + "'>" + (/all|left/.test(cornerClass) && row === 0 ? isRTL ? next : prev : "") + (/all|right/.test(cornerClass) && row === 0 ? isRTL ? prev : next : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
                            "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>";
                            thead = showWeek ? "<th class='ui-datepicker-week-col'>" + this._get(inst, "weekHeader") + "</th>" : "";
                            for (dow = 0; dow < 7; dow++) {
                                // days of the week
                                day = (dow + firstDay) % 7;
                                thead += "<th scope='col'" + ((dow + firstDay + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + dayNames[day] + "'>" + dayNamesMin[day] + "</span></th>";
                            }
                            calender += thead + "</tr></thead><tbody>";
                            daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
                            if (drawYear === inst.selectedYear && drawMonth === inst.selectedMonth) {
                                inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
                            }
                            leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
                            curRows = Math.ceil((leadDays + daysInMonth) / 7); // calculate the number of rows to generate
                            numRows = isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows; //If multiple months, use the higher number of rows (see #7043)
                            this.maxRows = numRows;
                            printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
                            for (dRow = 0; dRow < numRows; dRow++) {
                                // create date picker rows
                                calender += "<tr>";
                                tbody = !showWeek ? "" : "<td class='ui-datepicker-week-col'>" + this._get(inst, "calculateWeek")(printDate) + "</td>";
                                for (dow = 0; dow < 7; dow++) {
                                    // create date picker days
                                    daySettings = beforeShowDay ? beforeShowDay.apply(inst.input ? inst.input[0] : null, [printDate]) : [true, ""];
                                    otherMonth = printDate.getMonth() !== drawMonth;
                                    unselectable = otherMonth && !selectOtherMonths || !daySettings[0] || minDate && printDate < minDate || maxDate && printDate > maxDate;
                                    tbody += "<td class='" + ((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + ( // highlight weekends
                                    otherMonth ? " ui-datepicker-other-month" : "") + ( // highlight days from other months
                                    printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent || // user pressed key
                                    defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime() ?
    
                                    // or defaultDate is current printedDate and defaultDate is selectedDate
                                    " " + this._dayOverClass : "") + ( // highlight selected day
                                    unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + ( // highlight unselectable days
                                    otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + ( // highlight custom dates
                                    printDate.getTime() === currentDate.getTime() ? " " + this._currentClass : "") + ( // highlight selected day
                                    printDate.getTime() === today.getTime() ? " ui-datepicker-today" : "")) + "'" + ( // highlight today (if different)
                                    (!otherMonth || showOtherMonths) && daySettings[2] ? " title='" + daySettings[2].replace(/'/g, "&#39;") + "'" : "") + ( // cell title
                                    unselectable ? "" : " data-handler='selectDay' data-event='click' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" + ( // actions
                                    otherMonth && !showOtherMonths ? "&#xa0;" : // display for other months
                                    unselectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>" : "<a class='ui-state-default" + (printDate.getTime() === today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() === currentDate.getTime() ? " ui-state-active" : "") + ( // highlight selected day
                                    otherMonth ? " ui-priority-secondary" : "") + // distinguish dates from other months
                                    "' href='#'>" + printDate.getDate() + "</a>") + "</td>"; // display selectable date
                                    printDate.setDate(printDate.getDate() + 1);
                                    printDate = this._daylightSavingAdjust(printDate);
                                }
                                calender += tbody + "</tr>";
                            }
                            drawMonth++;
                            if (drawMonth > 11) {
                                drawMonth = 0;
                                drawYear++;
                            }
                            calender += "</tbody></table>" + (isMultiMonth ? "</div>" + (numMonths[0] > 0 && col === numMonths[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : "");
                            group += calender;
                        }
                        html += group;
                    }
                    html += buttonPanel;
                    inst._keyEvent = false;
                    return html;
                },
    
                /* Generate the month and year header. */
                _generateMonthYearHeader: function (inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
    
                    var inMinYear,
                        inMaxYear,
                        month,
                        years,
                        thisYear,
                        determineYear,
                        year,
                        endYear,
                        changeMonth = this._get(inst, "changeMonth"),
                        changeYear = this._get(inst, "changeYear"),
                        showMonthAfterYear = this._get(inst, "showMonthAfterYear"),
                        html = "<div class='ui-datepicker-title'>",
                        monthHtml = "";
    
                    // Month selection
                    if (secondary || !changeMonth) {
                        monthHtml += "<span class='ui-datepicker-month'>" + monthNames[drawMonth] + "</span>";
                    } else {
                        inMinYear = minDate && minDate.getFullYear() === drawYear;
                        inMaxYear = maxDate && maxDate.getFullYear() === drawYear;
                        monthHtml += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
                        for (month = 0; month < 12; month++) {
                            if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
                                monthHtml += "<option value='" + month + "'" + (month === drawMonth ? " selected='selected'" : "") + ">" + monthNamesShort[month] + "</option>";
                            }
                        }
                        monthHtml += "</select>";
                    }
    
                    if (!showMonthAfterYear) {
                        html += monthHtml + (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "");
                    }
    
                    // Year selection
                    if (!inst.yearshtml) {
                        inst.yearshtml = "";
                        if (secondary || !changeYear) {
                            html += "<span class='ui-datepicker-year'>" + drawYear + "</span>";
                        } else {
    
                            // determine range of years to display
                            years = this._get(inst, "yearRange").split(":");
                            thisYear = new Date().getFullYear();
                            determineYear = function (value) {
                                var year = value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) : value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10);
                                return isNaN(year) ? thisYear : year;
                            };
                            year = determineYear(years[0]);
                            endYear = Math.max(year, determineYear(years[1] || ""));
                            year = minDate ? Math.max(year, minDate.getFullYear()) : year;
                            endYear = maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear;
                            inst.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
                            for (; year <= endYear; year++) {
                                inst.yearshtml += "<option value='" + year + "'" + (year === drawYear ? " selected='selected'" : "") + ">" + year + "</option>";
                            }
                            inst.yearshtml += "</select>";
    
                            html += inst.yearshtml;
                            inst.yearshtml = null;
                        }
                    }
    
                    html += this._get(inst, "yearSuffix");
                    if (showMonthAfterYear) {
                        html += (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "") + monthHtml;
                    }
                    html += "</div>"; // Close datepicker_header
                    return html;
                },
    
                /* Adjust one of the date sub-fields. */
                _adjustInstDate: function (inst, offset, period) {
                    var year = inst.selectedYear + (period === "Y" ? offset : 0),
                        month = inst.selectedMonth + (period === "M" ? offset : 0),
                        day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period === "D" ? offset : 0),
                        date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
    
                    inst.selectedDay = date.getDate();
                    inst.drawMonth = inst.selectedMonth = date.getMonth();
                    inst.drawYear = inst.selectedYear = date.getFullYear();
                    if (period === "M" || period === "Y") {
                        this._notifyChange(inst);
                    }
                },
    
                /* Ensure a date is within any min/max bounds. */
                _restrictMinMax: function (inst, date) {
                    var minDate = this._getMinMaxDate(inst, "min"),
                        maxDate = this._getMinMaxDate(inst, "max"),
                        newDate = minDate && date < minDate ? minDate : date;
                    return maxDate && newDate > maxDate ? maxDate : newDate;
                },
    
                /* Notify change of month/year. */
                _notifyChange: function (inst) {
                    var onChange = this._get(inst, "onChangeMonthYear");
                    if (onChange) {
                        onChange.apply(inst.input ? inst.input[0] : null, [inst.selectedYear, inst.selectedMonth + 1, inst]);
                    }
                },
    
                /* Determine the number of months to show. */
                _getNumberOfMonths: function (inst) {
                    var numMonths = this._get(inst, "numberOfMonths");
                    return numMonths == null ? [1, 1] : typeof numMonths === "number" ? [1, numMonths] : numMonths;
                },
    
                /* Determine the current maximum date - ensure no time components are set. */
                _getMinMaxDate: function (inst, minMax) {
                    return this._determineDate(inst, this._get(inst, minMax + "Date"), null);
                },
    
                /* Find the number of days in a given month. */
                _getDaysInMonth: function (year, month) {
                    return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
                },
    
                /* Find the day of the week of the first of a month. */
                _getFirstDayOfMonth: function (year, month) {
                    return new Date(year, month, 1).getDay();
                },
    
                /* Determines if we should allow a "next/prev" month display change. */
                _canAdjustMonth: function (inst, offset, curYear, curMonth) {
                    var numMonths = this._getNumberOfMonths(inst),
                        date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
    
                    if (offset < 0) {
                        date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
                    }
                    return this._isInRange(inst, date);
                },
    
                /* Is the given date in the accepted range? */
                _isInRange: function (inst, date) {
                    var yearSplit,
                        currentYear,
                        minDate = this._getMinMaxDate(inst, "min"),
                        maxDate = this._getMinMaxDate(inst, "max"),
                        minYear = null,
                        maxYear = null,
                        years = this._get(inst, "yearRange");
                    if (years) {
                        yearSplit = years.split(":");
                        currentYear = new Date().getFullYear();
                        minYear = parseInt(yearSplit[0], 10);
                        maxYear = parseInt(yearSplit[1], 10);
                        if (yearSplit[0].match(/[+\-].*/)) {
                            minYear += currentYear;
                        }
                        if (yearSplit[1].match(/[+\-].*/)) {
                            maxYear += currentYear;
                        }
                    }
    
                    return (!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()) && (!minYear || date.getFullYear() >= minYear) && (!maxYear || date.getFullYear() <= maxYear);
                },
    
                /* Provide the configuration settings for formatting/parsing. */
                _getFormatConfig: function (inst) {
                    var shortYearCutoff = this._get(inst, "shortYearCutoff");
                    shortYearCutoff = typeof shortYearCutoff !== "string" ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10);
                    return { shortYearCutoff: shortYearCutoff,
                        dayNamesShort: this._get(inst, "dayNamesShort"), dayNames: this._get(inst, "dayNames"),
                        monthNamesShort: this._get(inst, "monthNamesShort"), monthNames: this._get(inst, "monthNames") };
                },
    
                /* Format the given date for display. */
                _formatDate: function (inst, day, month, year) {
                    if (!day) {
                        inst.currentDay = inst.selectedDay;
                        inst.currentMonth = inst.selectedMonth;
                        inst.currentYear = inst.selectedYear;
                    }
                    var date = day ? typeof day === "object" ? day : this._daylightSavingAdjust(new Date(year, month, day)) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay));
                    return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst));
                }
            });
    
            /*
       * Bind hover events for datepicker elements.
       * Done via delegate so the binding only occurs once in the lifetime of the parent div.
       * Global datepicker_instActive, set by _updateDatepicker allows the handlers to find their way back to the active picker.
       */
            function datepicker_bindHover(dpDiv) {
                var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
                return dpDiv.on("mouseout", selector, function () {
                    $(this).removeClass("ui-state-hover");
                    if (this.className.indexOf("ui-datepicker-prev") !== -1) {
                        $(this).removeClass("ui-datepicker-prev-hover");
                    }
                    if (this.className.indexOf("ui-datepicker-next") !== -1) {
                        $(this).removeClass("ui-datepicker-next-hover");
                    }
                }).on("mouseover", selector, datepicker_handleMouseover);
            }
    
            function datepicker_handleMouseover() {
                if (!$.datepicker._isDisabledDatepicker(datepicker_instActive.inline ? datepicker_instActive.dpDiv.parent()[0] : datepicker_instActive.input[0])) {
                    $(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
                    $(this).addClass("ui-state-hover");
                    if (this.className.indexOf("ui-datepicker-prev") !== -1) {
                        $(this).addClass("ui-datepicker-prev-hover");
                    }
                    if (this.className.indexOf("ui-datepicker-next") !== -1) {
                        $(this).addClass("ui-datepicker-next-hover");
                    }
                }
            }
    
            /* jQuery extend now ignores nulls! */
            function datepicker_extendRemove(target, props) {
                $.extend(target, props);
                for (var name in props) {
                    if (props[name] == null) {
                        target[name] = props[name];
                    }
                }
                return target;
            }
    
            /* Invoke the datepicker functionality.
         @param  options  string - a command, optionally followed by additional parameters or
                          Object - settings for attaching new datepicker functionality
         @return  jQuery object */
            $.fn.datepicker = function (options) {
    
                /* Verify an empty collection wasn't passed - Fixes #6976 */
                if (!this.length) {
                    return this;
                }
    
                /* Initialise the date picker. */
                if (!$.datepicker.initialized) {
                    $(document).on("mousedown", $.datepicker._checkExternalClick);
                    $.datepicker.initialized = true;
                }
    
                /* Append datepicker main container to body if not exist. */
                if ($("#" + $.datepicker._mainDivId).length === 0) {
                    $("body").append($.datepicker.dpDiv);
                }
    
                var otherArgs = Array.prototype.slice.call(arguments, 1);
                if (typeof options === "string" && (options === "isDisabled" || options === "getDate" || options === "widget")) {
                    return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs));
                }
                if (options === "option" && arguments.length === 2 && typeof arguments[1] === "string") {
                    return $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs));
                }
                return this.each(function () {
                    typeof options === "string" ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options);
                });
            };
    
            $.datepicker = new Datepicker(); // singleton instance
            $.datepicker.initialized = false;
            $.datepicker.uuid = new Date().getTime();
            $.datepicker.version = "1.12.1";
    
            return $.datepicker;
        };
    
        ; /*!
        * jQuery UI Datepicker 1.12.1
        * http://jqueryui.com
        *
        * Copyright jQuery Foundation and other contributors
        * Released under the MIT license.
        * http://jquery.org/license
        */
    
        module.exports = exports["default"];
    });
    
    /***/ }),
    
    /***/ 3587:
    /***/ (function(module, exports, __webpack_require__) {
    
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
     * jQuery Validation Plugin v1.19.5
     *
     * https://jqueryvalidation.org/
     *
     * Copyright (c) 2022 Jörn Zaefferer
     * Released under the MIT license
     */
    (function( factory ) {
        if ( true ) {
            !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(9755)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
            (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
            __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        } else {}
    }(function( $ ) {
    
    $.extend( $.fn, {
    
        // https://jqueryvalidation.org/validate/
        validate: function( options ) {
    
            // If nothing is selected, return nothing; can't chain anyway
            if ( !this.length ) {
                if ( options && options.debug && window.console ) {
                    console.warn( "Nothing selected, can't validate, returning nothing." );
                }
                return;
            }
    
            // Check if a validator for this form was already created
            var validator = $.data( this[ 0 ], "validator" );
            if ( validator ) {
                return validator;
            }
    
            // Add novalidate tag if HTML5.
            this.attr( "novalidate", "novalidate" );
    
            validator = new $.validator( options, this[ 0 ] );
            $.data( this[ 0 ], "validator", validator );
    
            if ( validator.settings.onsubmit ) {
    
                this.on( "click.validate", ":submit", function( event ) {
    
                    // Track the used submit button to properly handle scripted
                    // submits later.
                    validator.submitButton = event.currentTarget;
    
                    // Allow suppressing validation by adding a cancel class to the submit button
                    if ( $( this ).hasClass( "cancel" ) ) {
                        validator.cancelSubmit = true;
                    }
    
                    // Allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
                    if ( $( this ).attr( "formnovalidate" ) !== undefined ) {
                        validator.cancelSubmit = true;
                    }
                } );
    
                // Validate the form on submit
                this.on( "submit.validate", function( event ) {
                    if ( validator.settings.debug ) {
    
                        // Prevent form submit to be able to see console output
                        event.preventDefault();
                    }
    
                    function handle() {
                        var hidden, result;
    
                        // Insert a hidden input as a replacement for the missing submit button
                        // The hidden input is inserted in two cases:
                        //   - A user defined a `submitHandler`
                        //   - There was a pending request due to `remote` method and `stopRequest()`
                        //     was called to submit the form in case it's valid
                        if ( validator.submitButton && ( validator.settings.submitHandler || validator.formSubmitted ) ) {
                            hidden = $( "<input type='hidden'/>" )
                                .attr( "name", validator.submitButton.name )
                                .val( $( validator.submitButton ).val() )
                                .appendTo( validator.currentForm );
                        }
    
                        if ( validator.settings.submitHandler && !validator.settings.debug ) {
                            result = validator.settings.submitHandler.call( validator, validator.currentForm, event );
                            if ( hidden ) {
    
                                // And clean up afterwards; thanks to no-block-scope, hidden can be referenced
                                hidden.remove();
                            }
                            if ( result !== undefined ) {
                                return result;
                            }
                            return false;
                        }
                        return true;
                    }
    
                    // Prevent submit for invalid forms or custom submit handlers
                    if ( validator.cancelSubmit ) {
                        validator.cancelSubmit = false;
                        return handle();
                    }
                    if ( validator.form() ) {
                        if ( validator.pendingRequest ) {
                            validator.formSubmitted = true;
                            return false;
                        }
                        return handle();
                    } else {
                        validator.focusInvalid();
                        return false;
                    }
                } );
            }
    
            return validator;
        },
    
        // https://jqueryvalidation.org/valid/
        valid: function() {
            var valid, validator, errorList;
    
            if ( $( this[ 0 ] ).is( "form" ) ) {
                valid = this.validate().form();
            } else {
                errorList = [];
                valid = true;
                validator = $( this[ 0 ].form ).validate();
                this.each( function() {
                    valid = validator.element( this ) && valid;
                    if ( !valid ) {
                        errorList = errorList.concat( validator.errorList );
                    }
                } );
                validator.errorList = errorList;
            }
            return valid;
        },
    
        // https://jqueryvalidation.org/rules/
        rules: function( command, argument ) {
            var element = this[ 0 ],
                isContentEditable = typeof this.attr( "contenteditable" ) !== "undefined" && this.attr( "contenteditable" ) !== "false",
                settings, staticRules, existingRules, data, param, filtered;
    
            // If nothing is selected, return empty object; can't chain anyway
            if ( element == null ) {
                return;
            }
    
            if ( !element.form && isContentEditable ) {
                element.form = this.closest( "form" )[ 0 ];
                element.name = this.attr( "name" );
            }
    
            if ( element.form == null ) {
                return;
            }
    
            if ( command ) {
                settings = $.data( element.form, "validator" ).settings;
                staticRules = settings.rules;
                existingRules = $.validator.staticRules( element );
                switch ( command ) {
                case "add":
                    $.extend( existingRules, $.validator.normalizeRule( argument ) );
    
                    // Remove messages from rules, but allow them to be set separately
                    delete existingRules.messages;
                    staticRules[ element.name ] = existingRules;
                    if ( argument.messages ) {
                        settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
                    }
                    break;
                case "remove":
                    if ( !argument ) {
                        delete staticRules[ element.name ];
                        return existingRules;
                    }
                    filtered = {};
                    $.each( argument.split( /\s/ ), function( index, method ) {
                        filtered[ method ] = existingRules[ method ];
                        delete existingRules[ method ];
                    } );
                    return filtered;
                }
            }
    
            data = $.validator.normalizeRules(
            $.extend(
                {},
                $.validator.classRules( element ),
                $.validator.attributeRules( element ),
                $.validator.dataRules( element ),
                $.validator.staticRules( element )
            ), element );
    
            // Make sure required is at front
            if ( data.required ) {
                param = data.required;
                delete data.required;
                data = $.extend( { required: param }, data );
            }
    
            // Make sure remote is at back
            if ( data.remote ) {
                param = data.remote;
                delete data.remote;
                data = $.extend( data, { remote: param } );
            }
    
            return data;
        }
    } );
    
    // JQuery trim is deprecated, provide a trim method based on String.prototype.trim
    var trim = function( str ) {
    
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim#Polyfill
        return str.replace( /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "" );
    };
    
    // Custom selectors
    $.extend( $.expr.pseudos || $.expr[ ":" ], {		// '|| $.expr[ ":" ]' here enables backwards compatibility to jQuery 1.7. Can be removed when dropping jQ 1.7.x support
    
        // https://jqueryvalidation.org/blank-selector/
        blank: function( a ) {
            return !trim( "" + $( a ).val() );
        },
    
        // https://jqueryvalidation.org/filled-selector/
        filled: function( a ) {
            var val = $( a ).val();
            return val !== null && !!trim( "" + val );
        },
    
        // https://jqueryvalidation.org/unchecked-selector/
        unchecked: function( a ) {
            return !$( a ).prop( "checked" );
        }
    } );
    
    // Constructor for validator
    $.validator = function( options, form ) {
        this.settings = $.extend( true, {}, $.validator.defaults, options );
        this.currentForm = form;
        this.init();
    };
    
    // https://jqueryvalidation.org/jQuery.validator.format/
    $.validator.format = function( source, params ) {
        if ( arguments.length === 1 ) {
            return function() {
                var args = $.makeArray( arguments );
                args.unshift( source );
                return $.validator.format.apply( this, args );
            };
        }
        if ( params === undefined ) {
            return source;
        }
        if ( arguments.length > 2 && params.constructor !== Array  ) {
            params = $.makeArray( arguments ).slice( 1 );
        }
        if ( params.constructor !== Array ) {
            params = [ params ];
        }
        $.each( params, function( i, n ) {
            source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
                return n;
            } );
        } );
        return source;
    };
    
    $.extend( $.validator, {
    
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            pendingClass: "pending",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: false,
            focusInvalid: true,
            errorContainer: $( [] ),
            errorLabelContainer: $( [] ),
            onsubmit: true,
            ignore: ":hidden",
            ignoreTitle: false,
            onfocusin: function( element ) {
                this.lastActive = element;
    
                // Hide error label and remove error class on focus if enabled
                if ( this.settings.focusCleanup ) {
                    if ( this.settings.unhighlight ) {
                        this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
                    }
                    this.hideThese( this.errorsFor( element ) );
                }
            },
            onfocusout: function( element ) {
                if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
                    this.element( element );
                }
            },
            onkeyup: function( element, event ) {
    
                // Avoid revalidate the field when pressing one of the following keys
                // Shift       => 16
                // Ctrl        => 17
                // Alt         => 18
                // Caps lock   => 20
                // End         => 35
                // Home        => 36
                // Left arrow  => 37
                // Up arrow    => 38
                // Right arrow => 39
                // Down arrow  => 40
                // Insert      => 45
                // Num lock    => 144
                // AltGr key   => 225
                var excludedKeys = [
                    16, 17, 18, 20, 35, 36, 37,
                    38, 39, 40, 45, 144, 225
                ];
    
                if ( event.which === 9 && this.elementValue( element ) === "" || $.inArray( event.keyCode, excludedKeys ) !== -1 ) {
                    return;
                } else if ( element.name in this.submitted || element.name in this.invalid ) {
                    this.element( element );
                }
            },
            onclick: function( element ) {
    
                // Click on selects, radiobuttons and checkboxes
                if ( element.name in this.submitted ) {
                    this.element( element );
    
                // Or option elements, check parent select in that case
                } else if ( element.parentNode.name in this.submitted ) {
                    this.element( element.parentNode );
                }
            },
            highlight: function( element, errorClass, validClass ) {
                if ( element.type === "radio" ) {
                    this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
                } else {
                    $( element ).addClass( errorClass ).removeClass( validClass );
                }
            },
            unhighlight: function( element, errorClass, validClass ) {
                if ( element.type === "radio" ) {
                    this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
                } else {
                    $( element ).removeClass( errorClass ).addClass( validClass );
                }
            }
        },
    
        // https://jqueryvalidation.org/jQuery.validator.setDefaults/
        setDefaults: function( settings ) {
            $.extend( $.validator.defaults, settings );
        },
    
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            equalTo: "Please enter the same value again.",
            maxlength: $.validator.format( "Please enter no more than {0} characters." ),
            minlength: $.validator.format( "Please enter at least {0} characters." ),
            rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
            range: $.validator.format( "Please enter a value between {0} and {1}." ),
            max: $.validator.format( "Please enter a value less than or equal to {0}." ),
            min: $.validator.format( "Please enter a value greater than or equal to {0}." ),
            step: $.validator.format( "Please enter a multiple of {0}." )
        },
    
        autoCreateRanges: false,
    
        prototype: {
    
            init: function() {
                this.labelContainer = $( this.settings.errorLabelContainer );
                this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
                this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
    
                var currentForm = this.currentForm,
                    groups = ( this.groups = {} ),
                    rules;
                $.each( this.settings.groups, function( key, value ) {
                    if ( typeof value === "string" ) {
                        value = value.split( /\s/ );
                    }
                    $.each( value, function( index, name ) {
                        groups[ name ] = key;
                    } );
                } );
                rules = this.settings.rules;
                $.each( rules, function( key, value ) {
                    rules[ key ] = $.validator.normalizeRule( value );
                } );
    
                function delegate( event ) {
                    var isContentEditable = typeof $( this ).attr( "contenteditable" ) !== "undefined" && $( this ).attr( "contenteditable" ) !== "false";
    
                    // Set form expando on contenteditable
                    if ( !this.form && isContentEditable ) {
                        this.form = $( this ).closest( "form" )[ 0 ];
                        this.name = $( this ).attr( "name" );
                    }
    
                    // Ignore the element if it belongs to another form. This will happen mainly
                    // when setting the `form` attribute of an input to the id of another form.
                    if ( currentForm !== this.form ) {
                        return;
                    }
    
                    var validator = $.data( this.form, "validator" ),
                        eventType = "on" + event.type.replace( /^validate/, "" ),
                        settings = validator.settings;
                    if ( settings[ eventType ] && !$( this ).is( settings.ignore ) ) {
                        settings[ eventType ].call( validator, this, event );
                    }
                }
    
                $( this.currentForm )
                    .on( "focusin.validate focusout.validate keyup.validate",
                        ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
                        "[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " +
                        "[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
                        "[type='radio'], [type='checkbox'], [contenteditable], [type='button']", delegate )
    
                    // Support: Chrome, oldIE
                    // "select" is provided as event.target when clicking a option
                    .on( "click.validate", "select, option, [type='radio'], [type='checkbox']", delegate );
    
                if ( this.settings.invalidHandler ) {
                    $( this.currentForm ).on( "invalid-form.validate", this.settings.invalidHandler );
                }
            },
    
            // https://jqueryvalidation.org/Validator.form/
            form: function() {
                this.checkForm();
                $.extend( this.submitted, this.errorMap );
                this.invalid = $.extend( {}, this.errorMap );
                if ( !this.valid() ) {
                    $( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
                }
                this.showErrors();
                return this.valid();
            },
    
            checkForm: function() {
                this.prepareForm();
                for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
                    this.check( elements[ i ] );
                }
                return this.valid();
            },
    
            // https://jqueryvalidation.org/Validator.element/
            element: function( element ) {
                var cleanElement = this.clean( element ),
                    checkElement = this.validationTargetFor( cleanElement ),
                    v = this,
                    result = true,
                    rs, group;
    
                if ( checkElement === undefined ) {
                    delete this.invalid[ cleanElement.name ];
                } else {
                    this.prepareElement( checkElement );
                    this.currentElements = $( checkElement );
    
                    // If this element is grouped, then validate all group elements already
                    // containing a value
                    group = this.groups[ checkElement.name ];
                    if ( group ) {
                        $.each( this.groups, function( name, testgroup ) {
                            if ( testgroup === group && name !== checkElement.name ) {
                                cleanElement = v.validationTargetFor( v.clean( v.findByName( name ) ) );
                                if ( cleanElement && cleanElement.name in v.invalid ) {
                                    v.currentElements.push( cleanElement );
                                    result = v.check( cleanElement ) && result;
                                }
                            }
                        } );
                    }
    
                    rs = this.check( checkElement ) !== false;
                    result = result && rs;
                    if ( rs ) {
                        this.invalid[ checkElement.name ] = false;
                    } else {
                        this.invalid[ checkElement.name ] = true;
                    }
    
                    if ( !this.numberOfInvalids() ) {
    
                        // Hide error containers on last error
                        this.toHide = this.toHide.add( this.containers );
                    }
                    this.showErrors();
    
                    // Add aria-invalid status for screen readers
                    $( element ).attr( "aria-invalid", !rs );
                }
    
                return result;
            },
    
            // https://jqueryvalidation.org/Validator.showErrors/
            showErrors: function( errors ) {
                if ( errors ) {
                    var validator = this;
    
                    // Add items to error list and map
                    $.extend( this.errorMap, errors );
                    this.errorList = $.map( this.errorMap, function( message, name ) {
                        return {
                            message: message,
                            element: validator.findByName( name )[ 0 ]
                        };
                    } );
    
                    // Remove items from success list
                    this.successList = $.grep( this.successList, function( element ) {
                        return !( element.name in errors );
                    } );
                }
                if ( this.settings.showErrors ) {
                    this.settings.showErrors.call( this, this.errorMap, this.errorList );
                } else {
                    this.defaultShowErrors();
                }
            },
    
            // https://jqueryvalidation.org/Validator.resetForm/
            resetForm: function() {
                if ( $.fn.resetForm ) {
                    $( this.currentForm ).resetForm();
                }
                this.invalid = {};
                this.submitted = {};
                this.prepareForm();
                this.hideErrors();
                var elements = this.elements()
                    .removeData( "previousValue" )
                    .removeAttr( "aria-invalid" );
    
                this.resetElements( elements );
            },
    
            resetElements: function( elements ) {
                var i;
    
                if ( this.settings.unhighlight ) {
                    for ( i = 0; elements[ i ]; i++ ) {
                        this.settings.unhighlight.call( this, elements[ i ],
                            this.settings.errorClass, "" );
                        this.findByName( elements[ i ].name ).removeClass( this.settings.validClass );
                    }
                } else {
                    elements
                        .removeClass( this.settings.errorClass )
                        .removeClass( this.settings.validClass );
                }
            },
    
            numberOfInvalids: function() {
                return this.objectLength( this.invalid );
            },
    
            objectLength: function( obj ) {
                /* jshint unused: false */
                var count = 0,
                    i;
                for ( i in obj ) {
    
                    // This check allows counting elements with empty error
                    // message as invalid elements
                    if ( obj[ i ] !== undefined && obj[ i ] !== null && obj[ i ] !== false ) {
                        count++;
                    }
                }
                return count;
            },
    
            hideErrors: function() {
                this.hideThese( this.toHide );
            },
    
            hideThese: function( errors ) {
                errors.not( this.containers ).text( "" );
                this.addWrapper( errors ).hide();
            },
    
            valid: function() {
                return this.size() === 0;
            },
    
            size: function() {
                return this.errorList.length;
            },
    
            focusInvalid: function() {
                if ( this.settings.focusInvalid ) {
                    try {
                        $( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [] )
                        .filter( ":visible" )
                        .trigger( "focus" )
    
                        // Manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
                        .trigger( "focusin" );
                    } catch ( e ) {
    
                        // Ignore IE throwing errors when focusing hidden elements
                    }
                }
            },
    
            findLastActive: function() {
                var lastActive = this.lastActive;
                return lastActive && $.grep( this.errorList, function( n ) {
                    return n.element.name === lastActive.name;
                } ).length === 1 && lastActive;
            },
    
            elements: function() {
                var validator = this,
                    rulesCache = {};
    
                // Select all valid inputs inside the form (no submit or reset buttons)
                return $( this.currentForm )
                .find( "input, select, textarea, [contenteditable]" )
                .not( ":submit, :reset, :image, :disabled" )
                .not( this.settings.ignore )
                .filter( function() {
                    var name = this.name || $( this ).attr( "name" ); // For contenteditable
                    var isContentEditable = typeof $( this ).attr( "contenteditable" ) !== "undefined" && $( this ).attr( "contenteditable" ) !== "false";
    
                    if ( !name && validator.settings.debug && window.console ) {
                        console.error( "%o has no name assigned", this );
                    }
    
                    // Set form expando on contenteditable
                    if ( isContentEditable ) {
                        this.form = $( this ).closest( "form" )[ 0 ];
                        this.name = name;
                    }
    
                    // Ignore elements that belong to other/nested forms
                    if ( this.form !== validator.currentForm ) {
                        return false;
                    }
    
                    // Select only the first element for each name, and only those with rules specified
                    if ( name in rulesCache || !validator.objectLength( $( this ).rules() ) ) {
                        return false;
                    }
    
                    rulesCache[ name ] = true;
                    return true;
                } );
            },
    
            clean: function( selector ) {
                return $( selector )[ 0 ];
            },
    
            errors: function() {
                var errorClass = this.settings.errorClass.split( " " ).join( "." );
                return $( this.settings.errorElement + "." + errorClass, this.errorContext );
            },
    
            resetInternals: function() {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = $( [] );
                this.toHide = $( [] );
            },
    
            reset: function() {
                this.resetInternals();
                this.currentElements = $( [] );
            },
    
            prepareForm: function() {
                this.reset();
                this.toHide = this.errors().add( this.containers );
            },
    
            prepareElement: function( element ) {
                this.reset();
                this.toHide = this.errorsFor( element );
            },
    
            elementValue: function( element ) {
                var $element = $( element ),
                    type = element.type,
                    isContentEditable = typeof $element.attr( "contenteditable" ) !== "undefined" && $element.attr( "contenteditable" ) !== "false",
                    val, idx;
    
                if ( type === "radio" || type === "checkbox" ) {
                    return this.findByName( element.name ).filter( ":checked" ).val();
                } else if ( type === "number" && typeof element.validity !== "undefined" ) {
                    return element.validity.badInput ? "NaN" : $element.val();
                }
    
                if ( isContentEditable ) {
                    val = $element.text();
                } else {
                    val = $element.val();
                }
    
                if ( type === "file" ) {
    
                    // Modern browser (chrome & safari)
                    if ( val.substr( 0, 12 ) === "C:\\fakepath\\" ) {
                        return val.substr( 12 );
                    }
    
                    // Legacy browsers
                    // Unix-based path
                    idx = val.lastIndexOf( "/" );
                    if ( idx >= 0 ) {
                        return val.substr( idx + 1 );
                    }
    
                    // Windows-based path
                    idx = val.lastIndexOf( "\\" );
                    if ( idx >= 0 ) {
                        return val.substr( idx + 1 );
                    }
    
                    // Just the file name
                    return val;
                }
    
                if ( typeof val === "string" ) {
                    return val.replace( /\r/g, "" );
                }
                return val;
            },
    
            check: function( element ) {
                element = this.validationTargetFor( this.clean( element ) );
    
                var rules = $( element ).rules(),
                    rulesCount = $.map( rules, function( n, i ) {
                        return i;
                    } ).length,
                    dependencyMismatch = false,
                    val = this.elementValue( element ),
                    result, method, rule, normalizer;
    
                // Prioritize the local normalizer defined for this element over the global one
                // if the former exists, otherwise user the global one in case it exists.
                if ( typeof rules.normalizer === "function" ) {
                    normalizer = rules.normalizer;
                } else if (	typeof this.settings.normalizer === "function" ) {
                    normalizer = this.settings.normalizer;
                }
    
                // If normalizer is defined, then call it to retreive the changed value instead
                // of using the real one.
                // Note that `this` in the normalizer is `element`.
                if ( normalizer ) {
                    val = normalizer.call( element, val );
    
                    // Delete the normalizer from rules to avoid treating it as a pre-defined method.
                    delete rules.normalizer;
                }
    
                for ( method in rules ) {
                    rule = { method: method, parameters: rules[ method ] };
                    try {
                        result = $.validator.methods[ method ].call( this, val, element, rule.parameters );
    
                        // If a method indicates that the field is optional and therefore valid,
                        // don't mark it as valid when there are no other rules
                        if ( result === "dependency-mismatch" && rulesCount === 1 ) {
                            dependencyMismatch = true;
                            continue;
                        }
                        dependencyMismatch = false;
    
                        if ( result === "pending" ) {
                            this.toHide = this.toHide.not( this.errorsFor( element ) );
                            return;
                        }
    
                        if ( !result ) {
                            this.formatAndAdd( element, rule );
                            return false;
                        }
                    } catch ( e ) {
                        if ( this.settings.debug && window.console ) {
                            console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
                        }
                        if ( e instanceof TypeError ) {
                            e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
                        }
    
                        throw e;
                    }
                }
                if ( dependencyMismatch ) {
                    return;
                }
                if ( this.objectLength( rules ) ) {
                    this.successList.push( element );
                }
                return true;
            },
    
            // Return the custom message for the given element and validation method
            // specified in the element's HTML5 data attribute
            // return the generic message if present and no method specific message is present
            customDataMessage: function( element, method ) {
                return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
                    method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
            },
    
            // Return the custom message for the given element name and validation method
            customMessage: function( name, method ) {
                var m = this.settings.messages[ name ];
                return m && ( m.constructor === String ? m : m[ method ] );
            },
    
            // Return the first defined argument, allowing empty strings
            findDefined: function() {
                for ( var i = 0; i < arguments.length; i++ ) {
                    if ( arguments[ i ] !== undefined ) {
                        return arguments[ i ];
                    }
                }
                return undefined;
            },
    
            // The second parameter 'rule' used to be a string, and extended to an object literal
            // of the following form:
            // rule = {
            //     method: "method name",
            //     parameters: "the given method parameters"
            // }
            //
            // The old behavior still supported, kept to maintain backward compatibility with
            // old code, and will be removed in the next major release.
            defaultMessage: function( element, rule ) {
                if ( typeof rule === "string" ) {
                    rule = { method: rule };
                }
    
                var message = this.findDefined(
                        this.customMessage( element.name, rule.method ),
                        this.customDataMessage( element, rule.method ),
    
                        // 'title' is never undefined, so handle empty string as undefined
                        !this.settings.ignoreTitle && element.title || undefined,
                        $.validator.messages[ rule.method ],
                        "<strong>Warning: No message defined for " + element.name + "</strong>"
                    ),
                    theregex = /\$?\{(\d+)\}/g;
                if ( typeof message === "function" ) {
                    message = message.call( this, rule.parameters, element );
                } else if ( theregex.test( message ) ) {
                    message = $.validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
                }
    
                return message;
            },
    
            formatAndAdd: function( element, rule ) {
                var message = this.defaultMessage( element, rule );
    
                this.errorList.push( {
                    message: message,
                    element: element,
                    method: rule.method
                } );
    
                this.errorMap[ element.name ] = message;
                this.submitted[ element.name ] = message;
            },
    
            addWrapper: function( toToggle ) {
                if ( this.settings.wrapper ) {
                    toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
                }
                return toToggle;
            },
    
            defaultShowErrors: function() {
                var i, elements, error;
                for ( i = 0; this.errorList[ i ]; i++ ) {
                    error = this.errorList[ i ];
                    if ( this.settings.highlight ) {
                        this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
                    }
                    this.showLabel( error.element, error.message );
                }
                if ( this.errorList.length ) {
                    this.toShow = this.toShow.add( this.containers );
                }
                if ( this.settings.success ) {
                    for ( i = 0; this.successList[ i ]; i++ ) {
                        this.showLabel( this.successList[ i ] );
                    }
                }
                if ( this.settings.unhighlight ) {
                    for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
                        this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
                    }
                }
                this.toHide = this.toHide.not( this.toShow );
                this.hideErrors();
                this.addWrapper( this.toShow ).show();
            },
    
            validElements: function() {
                return this.currentElements.not( this.invalidElements() );
            },
    
            invalidElements: function() {
                return $( this.errorList ).map( function() {
                    return this.element;
                } );
            },
    
            showLabel: function( element, message ) {
                var place, group, errorID, v,
                    error = this.errorsFor( element ),
                    elementID = this.idOrName( element ),
                    describedBy = $( element ).attr( "aria-describedby" );
    
                if ( error.length ) {
    
                    // Refresh error/success class
                    error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );
    
                    // Replace message on existing label
                    error.html( message );
                } else {
    
                    // Create error element
                    error = $( "<" + this.settings.errorElement + ">" )
                        .attr( "id", elementID + "-error" )
                        .addClass( this.settings.errorClass )
                        .html( message || "" );
    
                    // Maintain reference to the element to be placed into the DOM
                    place = error;
                    if ( this.settings.wrapper ) {
    
                        // Make sure the element is visible, even in IE
                        // actually showing the wrapped element is handled elsewhere
                        place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
                    }
                    if ( this.labelContainer.length ) {
                        this.labelContainer.append( place );
                    } else if ( this.settings.errorPlacement ) {
                        this.settings.errorPlacement.call( this, place, $( element ) );
                    } else {
                        place.insertAfter( element );
                    }
    
                    // Link error back to the element
                    if ( error.is( "label" ) ) {
    
                        // If the error is a label, then associate using 'for'
                        error.attr( "for", elementID );
    
                        // If the element is not a child of an associated label, then it's necessary
                        // to explicitly apply aria-describedby
                    } else if ( error.parents( "label[for='" + this.escapeCssMeta( elementID ) + "']" ).length === 0 ) {
                        errorID = error.attr( "id" );
    
                        // Respect existing non-error aria-describedby
                        if ( !describedBy ) {
                            describedBy = errorID;
                        } else if ( !describedBy.match( new RegExp( "\\b" + this.escapeCssMeta( errorID ) + "\\b" ) ) ) {
    
                            // Add to end of list if not already present
                            describedBy += " " + errorID;
                        }
                        $( element ).attr( "aria-describedby", describedBy );
    
                        // If this element is grouped, then assign to all elements in the same group
                        group = this.groups[ element.name ];
                        if ( group ) {
                            v = this;
                            $.each( v.groups, function( name, testgroup ) {
                                if ( testgroup === group ) {
                                    $( "[name='" + v.escapeCssMeta( name ) + "']", v.currentForm )
                                        .attr( "aria-describedby", error.attr( "id" ) );
                                }
                            } );
                        }
                    }
                }
                if ( !message && this.settings.success ) {
                    error.text( "" );
                    if ( typeof this.settings.success === "string" ) {
                        error.addClass( this.settings.success );
                    } else {
                        this.settings.success( error, element );
                    }
                }
                this.toShow = this.toShow.add( error );
            },
    
            errorsFor: function( element ) {
                var name = this.escapeCssMeta( this.idOrName( element ) ),
                    describer = $( element ).attr( "aria-describedby" ),
                    selector = "label[for='" + name + "'], label[for='" + name + "'] *";
    
                // 'aria-describedby' should directly reference the error element
                if ( describer ) {
                    selector = selector + ", #" + this.escapeCssMeta( describer )
                        .replace( /\s+/g, ", #" );
                }
    
                return this
                    .errors()
                    .filter( selector );
            },
    
            // See https://api.jquery.com/category/selectors/, for CSS
            // meta-characters that should be escaped in order to be used with JQuery
            // as a literal part of a name/id or any selector.
            escapeCssMeta: function( string ) {
                if ( string === undefined ) {
                    return "";
                }
    
                return string.replace( /([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1" );
            },
    
            idOrName: function( element ) {
                return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
            },
    
            validationTargetFor: function( element ) {
    
                // If radio/checkbox, validate first element in group instead
                if ( this.checkable( element ) ) {
                    element = this.findByName( element.name );
                }
    
                // Always apply ignore filter
                return $( element ).not( this.settings.ignore )[ 0 ];
            },
    
            checkable: function( element ) {
                return ( /radio|checkbox/i ).test( element.type );
            },
    
            findByName: function( name ) {
                return $( this.currentForm ).find( "[name='" + this.escapeCssMeta( name ) + "']" );
            },
    
            getLength: function( value, element ) {
                switch ( element.nodeName.toLowerCase() ) {
                case "select":
                    return $( "option:selected", element ).length;
                case "input":
                    if ( this.checkable( element ) ) {
                        return this.findByName( element.name ).filter( ":checked" ).length;
                    }
                }
                return value.length;
            },
    
            depend: function( param, element ) {
                return this.dependTypes[ typeof param ] ? this.dependTypes[ typeof param ]( param, element ) : true;
            },
    
            dependTypes: {
                "boolean": function( param ) {
                    return param;
                },
                "string": function( param, element ) {
                    return !!$( param, element.form ).length;
                },
                "function": function( param, element ) {
                    return param( element );
                }
            },
    
            optional: function( element ) {
                var val = this.elementValue( element );
                return !$.validator.methods.required.call( this, val, element ) && "dependency-mismatch";
            },
    
            startRequest: function( element ) {
                if ( !this.pending[ element.name ] ) {
                    this.pendingRequest++;
                    $( element ).addClass( this.settings.pendingClass );
                    this.pending[ element.name ] = true;
                }
            },
    
            stopRequest: function( element, valid ) {
                this.pendingRequest--;
    
                // Sometimes synchronization fails, make sure pendingRequest is never < 0
                if ( this.pendingRequest < 0 ) {
                    this.pendingRequest = 0;
                }
                delete this.pending[ element.name ];
                $( element ).removeClass( this.settings.pendingClass );
                if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() && this.pendingRequest === 0 ) {
                    $( this.currentForm ).trigger( "submit" );
    
                    // Remove the hidden input that was used as a replacement for the
                    // missing submit button. The hidden input is added by `handle()`
                    // to ensure that the value of the used submit button is passed on
                    // for scripted submits triggered by this method
                    if ( this.submitButton ) {
                        $( "input:hidden[name='" + this.submitButton.name + "']", this.currentForm ).remove();
                    }
    
                    this.formSubmitted = false;
                } else if ( !valid && this.pendingRequest === 0 && this.formSubmitted ) {
                    $( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
                    this.formSubmitted = false;
                }
            },
    
            previousValue: function( element, method ) {
                method = typeof method === "string" && method || "remote";
    
                return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
                    old: null,
                    valid: true,
                    message: this.defaultMessage( element, { method: method } )
                } );
            },
    
            // Cleans up all forms and elements, removes validator-specific events
            destroy: function() {
                this.resetForm();
    
                $( this.currentForm )
                    .off( ".validate" )
                    .removeData( "validator" )
                    .find( ".validate-equalTo-blur" )
                        .off( ".validate-equalTo" )
                        .removeClass( "validate-equalTo-blur" )
                    .find( ".validate-lessThan-blur" )
                        .off( ".validate-lessThan" )
                        .removeClass( "validate-lessThan-blur" )
                    .find( ".validate-lessThanEqual-blur" )
                        .off( ".validate-lessThanEqual" )
                        .removeClass( "validate-lessThanEqual-blur" )
                    .find( ".validate-greaterThanEqual-blur" )
                        .off( ".validate-greaterThanEqual" )
                        .removeClass( "validate-greaterThanEqual-blur" )
                    .find( ".validate-greaterThan-blur" )
                        .off( ".validate-greaterThan" )
                        .removeClass( "validate-greaterThan-blur" );
            }
    
        },
    
        classRuleSettings: {
            required: { required: true },
            email: { email: true },
            url: { url: true },
            date: { date: true },
            dateISO: { dateISO: true },
            number: { number: true },
            digits: { digits: true },
            creditcard: { creditcard: true }
        },
    
        addClassRules: function( className, rules ) {
            if ( className.constructor === String ) {
                this.classRuleSettings[ className ] = rules;
            } else {
                $.extend( this.classRuleSettings, className );
            }
        },
    
        classRules: function( element ) {
            var rules = {},
                classes = $( element ).attr( "class" );
    
            if ( classes ) {
                $.each( classes.split( " " ), function() {
                    if ( this in $.validator.classRuleSettings ) {
                        $.extend( rules, $.validator.classRuleSettings[ this ] );
                    }
                } );
            }
            return rules;
        },
    
        normalizeAttributeRule: function( rules, type, method, value ) {
    
            // Convert the value to a number for number inputs, and for text for backwards compability
            // allows type="date" and others to be compared as strings
            if ( /min|max|step/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
                value = Number( value );
    
                // Support Opera Mini, which returns NaN for undefined minlength
                if ( isNaN( value ) ) {
                    value = undefined;
                }
            }
    
            if ( value || value === 0 ) {
                rules[ method ] = value;
            } else if ( type === method && type !== "range" ) {
    
                // Exception: the jquery validate 'range' method
                // does not test for the html5 'range' type
                rules[ type === "date" ? "dateISO" : method ] = true;
            }
        },
    
        attributeRules: function( element ) {
            var rules = {},
                $element = $( element ),
                type = element.getAttribute( "type" ),
                method, value;
    
            for ( method in $.validator.methods ) {
    
                // Support for <input required> in both html5 and older browsers
                if ( method === "required" ) {
                    value = element.getAttribute( method );
    
                    // Some browsers return an empty string for the required attribute
                    // and non-HTML5 browsers might have required="" markup
                    if ( value === "" ) {
                        value = true;
                    }
    
                    // Force non-HTML5 browsers to return bool
                    value = !!value;
                } else {
                    value = $element.attr( method );
                }
    
                this.normalizeAttributeRule( rules, type, method, value );
            }
    
            // 'maxlength' may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
            if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
                delete rules.maxlength;
            }
    
            return rules;
        },
    
        dataRules: function( element ) {
            var rules = {},
                $element = $( element ),
                type = element.getAttribute( "type" ),
                method, value;
    
            for ( method in $.validator.methods ) {
                value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );
    
                // Cast empty attributes like `data-rule-required` to `true`
                if ( value === "" ) {
                    value = true;
                }
    
                this.normalizeAttributeRule( rules, type, method, value );
            }
            return rules;
        },
    
        staticRules: function( element ) {
            var rules = {},
                validator = $.data( element.form, "validator" );
    
            if ( validator.settings.rules ) {
                rules = $.validator.normalizeRule( validator.settings.rules[ element.name ] ) || {};
            }
            return rules;
        },
    
        normalizeRules: function( rules, element ) {
    
            // Handle dependency check
            $.each( rules, function( prop, val ) {
    
                // Ignore rule when param is explicitly false, eg. required:false
                if ( val === false ) {
                    delete rules[ prop ];
                    return;
                }
                if ( val.param || val.depends ) {
                    var keepRule = true;
                    switch ( typeof val.depends ) {
                    case "string":
                        keepRule = !!$( val.depends, element.form ).length;
                        break;
                    case "function":
                        keepRule = val.depends.call( element, element );
                        break;
                    }
                    if ( keepRule ) {
                        rules[ prop ] = val.param !== undefined ? val.param : true;
                    } else {
                        $.data( element.form, "validator" ).resetElements( $( element ) );
                        delete rules[ prop ];
                    }
                }
            } );
    
            // Evaluate parameters
            $.each( rules, function( rule, parameter ) {
                rules[ rule ] = typeof parameter === "function" && rule !== "normalizer" ? parameter( element ) : parameter;
            } );
    
            // Clean number parameters
            $.each( [ "minlength", "maxlength" ], function() {
                if ( rules[ this ] ) {
                    rules[ this ] = Number( rules[ this ] );
                }
            } );
            $.each( [ "rangelength", "range" ], function() {
                var parts;
                if ( rules[ this ] ) {
                    if ( Array.isArray( rules[ this ] ) ) {
                        rules[ this ] = [ Number( rules[ this ][ 0 ] ), Number( rules[ this ][ 1 ] ) ];
                    } else if ( typeof rules[ this ] === "string" ) {
                        parts = rules[ this ].replace( /[\[\]]/g, "" ).split( /[\s,]+/ );
                        rules[ this ] = [ Number( parts[ 0 ] ), Number( parts[ 1 ] ) ];
                    }
                }
            } );
    
            if ( $.validator.autoCreateRanges ) {
    
                // Auto-create ranges
                if ( rules.min != null && rules.max != null ) {
                    rules.range = [ rules.min, rules.max ];
                    delete rules.min;
                    delete rules.max;
                }
                if ( rules.minlength != null && rules.maxlength != null ) {
                    rules.rangelength = [ rules.minlength, rules.maxlength ];
                    delete rules.minlength;
                    delete rules.maxlength;
                }
            }
    
            return rules;
        },
    
        // Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
        normalizeRule: function( data ) {
            if ( typeof data === "string" ) {
                var transformed = {};
                $.each( data.split( /\s/ ), function() {
                    transformed[ this ] = true;
                } );
                data = transformed;
            }
            return data;
        },
    
        // https://jqueryvalidation.org/jQuery.validator.addMethod/
        addMethod: function( name, method, message ) {
            $.validator.methods[ name ] = method;
            $.validator.messages[ name ] = message !== undefined ? message : $.validator.messages[ name ];
            if ( method.length < 3 ) {
                $.validator.addClassRules( name, $.validator.normalizeRule( name ) );
            }
        },
    
        // https://jqueryvalidation.org/jQuery.validator.methods/
        methods: {
    
            // https://jqueryvalidation.org/required-method/
            required: function( value, element, param ) {
    
                // Check if dependency is met
                if ( !this.depend( param, element ) ) {
                    return "dependency-mismatch";
                }
                if ( element.nodeName.toLowerCase() === "select" ) {
    
                    // Could be an array for select-multiple or a string, both are fine this way
                    var val = $( element ).val();
                    return val && val.length > 0;
                }
                if ( this.checkable( element ) ) {
                    return this.getLength( value, element ) > 0;
                }
                return value !== undefined && value !== null && value.length > 0;
            },
    
            // https://jqueryvalidation.org/email-method/
            email: function( value, element ) {
    
                // From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
                // Retrieved 2014-01-14
                // If you have a problem with this implementation, report a bug against the above spec
                // Or use custom methods to implement your own email validation
                return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
            },
    
            // https://jqueryvalidation.org/url-method/
            url: function( value, element ) {
    
                // Copyright (c) 2010-2013 Diego Perini, MIT licensed
                // https://gist.github.com/dperini/729294
                // see also https://mathiasbynens.be/demo/url-regex
                // modified to allow protocol-relative URLs
                return this.optional( element ) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:(?:[^\]\[?\/<~#`!@$^&*()+=}|:";',>{ ]|%[0-9A-Fa-f]{2})+(?::(?:[^\]\[?\/<~#`!@$^&*()+=}|:";',>{ ]|%[0-9A-Fa-f]{2})*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
            },
    
            // https://jqueryvalidation.org/date-method/
            date: ( function() {
                var called = false;
    
                return function( value, element ) {
                    if ( !called ) {
                        called = true;
                        if ( this.settings.debug && window.console ) {
                            console.warn(
                                "The `date` method is deprecated and will be removed in version '2.0.0'.\n" +
                                "Please don't use it, since it relies on the Date constructor, which\n" +
                                "behaves very differently across browsers and locales. Use `dateISO`\n" +
                                "instead or one of the locale specific methods in `localizations/`\n" +
                                "and `additional-methods.js`."
                            );
                        }
                    }
    
                    return this.optional( element ) || !/Invalid|NaN/.test( new Date( value ).toString() );
                };
            }() ),
    
            // https://jqueryvalidation.org/dateISO-method/
            dateISO: function( value, element ) {
                return this.optional( element ) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
            },
    
            // https://jqueryvalidation.org/number-method/
            number: function( value, element ) {
                return this.optional( element ) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
            },
    
            // https://jqueryvalidation.org/digits-method/
            digits: function( value, element ) {
                return this.optional( element ) || /^\d+$/.test( value );
            },
    
            // https://jqueryvalidation.org/minlength-method/
            minlength: function( value, element, param ) {
                var length = Array.isArray( value ) ? value.length : this.getLength( value, element );
                return this.optional( element ) || length >= param;
            },
    
            // https://jqueryvalidation.org/maxlength-method/
            maxlength: function( value, element, param ) {
                var length = Array.isArray( value ) ? value.length : this.getLength( value, element );
                return this.optional( element ) || length <= param;
            },
    
            // https://jqueryvalidation.org/rangelength-method/
            rangelength: function( value, element, param ) {
                var length = Array.isArray( value ) ? value.length : this.getLength( value, element );
                return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
            },
    
            // https://jqueryvalidation.org/min-method/
            min: function( value, element, param ) {
                return this.optional( element ) || value >= param;
            },
    
            // https://jqueryvalidation.org/max-method/
            max: function( value, element, param ) {
                return this.optional( element ) || value <= param;
            },
    
            // https://jqueryvalidation.org/range-method/
            range: function( value, element, param ) {
                return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
            },
    
            // https://jqueryvalidation.org/step-method/
            step: function( value, element, param ) {
                var type = $( element ).attr( "type" ),
                    errorMessage = "Step attribute on input type " + type + " is not supported.",
                    supportedTypes = [ "text", "number", "range" ],
                    re = new RegExp( "\\b" + type + "\\b" ),
                    notSupported = type && !re.test( supportedTypes.join() ),
                    decimalPlaces = function( num ) {
                        var match = ( "" + num ).match( /(?:\.(\d+))?$/ );
                        if ( !match ) {
                            return 0;
                        }
    
                        // Number of digits right of decimal point.
                        return match[ 1 ] ? match[ 1 ].length : 0;
                    },
                    toInt = function( num ) {
                        return Math.round( num * Math.pow( 10, decimals ) );
                    },
                    valid = true,
                    decimals;
    
                // Works only for text, number and range input types
                // TODO find a way to support input types date, datetime, datetime-local, month, time and week
                if ( notSupported ) {
                    throw new Error( errorMessage );
                }
    
                decimals = decimalPlaces( param );
    
                // Value can't have too many decimals
                if ( decimalPlaces( value ) > decimals || toInt( value ) % toInt( param ) !== 0 ) {
                    valid = false;
                }
    
                return this.optional( element ) || valid;
            },
    
            // https://jqueryvalidation.org/equalTo-method/
            equalTo: function( value, element, param ) {
    
                // Bind to the blur event of the target in order to revalidate whenever the target field is updated
                var target = $( param );
                if ( this.settings.onfocusout && target.not( ".validate-equalTo-blur" ).length ) {
                    target.addClass( "validate-equalTo-blur" ).on( "blur.validate-equalTo", function() {
                        $( element ).valid();
                    } );
                }
                return value === target.val();
            },
    
            // https://jqueryvalidation.org/remote-method/
            remote: function( value, element, param, method ) {
                if ( this.optional( element ) ) {
                    return "dependency-mismatch";
                }
    
                method = typeof method === "string" && method || "remote";
    
                var previous = this.previousValue( element, method ),
                    validator, data, optionDataString;
    
                if ( !this.settings.messages[ element.name ] ) {
                    this.settings.messages[ element.name ] = {};
                }
                previous.originalMessage = previous.originalMessage || this.settings.messages[ element.name ][ method ];
                this.settings.messages[ element.name ][ method ] = previous.message;
    
                param = typeof param === "string" && { url: param } || param;
                optionDataString = $.param( $.extend( { data: value }, param.data ) );
                if ( previous.old === optionDataString ) {
                    return previous.valid;
                }
    
                previous.old = optionDataString;
                validator = this;
                this.startRequest( element );
                data = {};
                data[ element.name ] = value;
                $.ajax( $.extend( true, {
                    mode: "abort",
                    port: "validate" + element.name,
                    dataType: "json",
                    data: data,
                    context: validator.currentForm,
                    success: function( response ) {
                        var valid = response === true || response === "true",
                            errors, message, submitted;
    
                        validator.settings.messages[ element.name ][ method ] = previous.originalMessage;
                        if ( valid ) {
                            submitted = validator.formSubmitted;
                            validator.resetInternals();
                            validator.toHide = validator.errorsFor( element );
                            validator.formSubmitted = submitted;
                            validator.successList.push( element );
                            validator.invalid[ element.name ] = false;
                            validator.showErrors();
                        } else {
                            errors = {};
                            message = response || validator.defaultMessage( element, { method: method, parameters: value } );
                            errors[ element.name ] = previous.message = message;
                            validator.invalid[ element.name ] = true;
                            validator.showErrors( errors );
                        }
                        previous.valid = valid;
                        validator.stopRequest( element, valid );
                    }
                }, param ) );
                return "pending";
            }
        }
    
    } );
    
    // Ajax mode: abort
    // usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
    // if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
    
    var pendingRequests = {},
        ajax;
    
    // Use a prefilter if available (1.5+)
    if ( $.ajaxPrefilter ) {
        $.ajaxPrefilter( function( settings, _, xhr ) {
            var port = settings.port;
            if ( settings.mode === "abort" ) {
                if ( pendingRequests[ port ] ) {
                    pendingRequests[ port ].abort();
                }
                pendingRequests[ port ] = xhr;
            }
        } );
    } else {
    
        // Proxy ajax
        ajax = $.ajax;
        $.ajax = function( settings ) {
            var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
                port = ( "port" in settings ? settings : $.ajaxSettings ).port;
            if ( mode === "abort" ) {
                if ( pendingRequests[ port ] ) {
                    pendingRequests[ port ].abort();
                }
                pendingRequests[ port ] = ajax.apply( this, arguments );
                return pendingRequests[ port ];
            }
            return ajax.apply( this, arguments );
        };
    }
    return $;
    }));
    
    /***/ }),
    
    /***/ 9755:
    /***/ (function(module, exports) {
    
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
     * jQuery JavaScript Library v3.6.3
     * https://jquery.com/
     *
     * Includes Sizzle.js
     * https://sizzlejs.com/
     *
     * Copyright OpenJS Foundation and other contributors
     * Released under the MIT license
     * https://jquery.org/license
     *
     * Date: 2022-12-20T21:28Z
     */
    ( function( global, factory ) {
    
        "use strict";
    
        if (  true && typeof module.exports === "object" ) {
    
            // For CommonJS and CommonJS-like environments where a proper `window`
            // is present, execute the factory and get jQuery.
            // For environments that do not have a `window` with a `document`
            // (such as Node.js), expose a factory as module.exports.
            // This accentuates the need for the creation of a real `window`.
            // e.g. var jQuery = require("jquery")(window);
            // See ticket trac-14549 for more info.
            module.exports = global.document ?
                factory( global, true ) :
                function( w ) {
                    if ( !w.document ) {
                        throw new Error( "jQuery requires a window with a document" );
                    }
                    return factory( w );
                };
        } else {
            factory( global );
        }
    
    // Pass this if window is not defined yet
    } )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
    
    // Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
    // throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
    // arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
    // enough that all such attempts are guarded in a try block.
    "use strict";
    
    var arr = [];
    
    var getProto = Object.getPrototypeOf;
    
    var slice = arr.slice;
    
    var flat = arr.flat ? function( array ) {
        return arr.flat.call( array );
    } : function( array ) {
        return arr.concat.apply( [], array );
    };
    
    
    var push = arr.push;
    
    var indexOf = arr.indexOf;
    
    var class2type = {};
    
    var toString = class2type.toString;
    
    var hasOwn = class2type.hasOwnProperty;
    
    var fnToString = hasOwn.toString;
    
    var ObjectFunctionString = fnToString.call( Object );
    
    var support = {};
    
    var isFunction = function isFunction( obj ) {
    
            // Support: Chrome <=57, Firefox <=52
            // In some browsers, typeof returns "function" for HTML <object> elements
            // (i.e., `typeof document.createElement( "object" ) === "function"`).
            // We don't want to classify *any* DOM node as a function.
            // Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
            // Plus for old WebKit, typeof returns "function" for HTML collections
            // (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
            return typeof obj === "function" && typeof obj.nodeType !== "number" &&
                typeof obj.item !== "function";
        };
    
    
    var isWindow = function isWindow( obj ) {
            return obj != null && obj === obj.window;
        };
    
    
    var document = window.document;
    
    
    
        var preservedScriptAttributes = {
            type: true,
            src: true,
            nonce: true,
            noModule: true
        };
    
        function DOMEval( code, node, doc ) {
            doc = doc || document;
    
            var i, val,
                script = doc.createElement( "script" );
    
            script.text = code;
            if ( node ) {
                for ( i in preservedScriptAttributes ) {
    
                    // Support: Firefox 64+, Edge 18+
                    // Some browsers don't support the "nonce" property on scripts.
                    // On the other hand, just using `getAttribute` is not enough as
                    // the `nonce` attribute is reset to an empty string whenever it
                    // becomes browsing-context connected.
                    // See https://github.com/whatwg/html/issues/2369
                    // See https://html.spec.whatwg.org/#nonce-attributes
                    // The `node.getAttribute` check was added for the sake of
                    // `jQuery.globalEval` so that it can fake a nonce-containing node
                    // via an object.
                    val = node[ i ] || node.getAttribute && node.getAttribute( i );
                    if ( val ) {
                        script.setAttribute( i, val );
                    }
                }
            }
            doc.head.appendChild( script ).parentNode.removeChild( script );
        }
    
    
    function toType( obj ) {
        if ( obj == null ) {
            return obj + "";
        }
    
        // Support: Android <=2.3 only (functionish RegExp)
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[ toString.call( obj ) ] || "object" :
            typeof obj;
    }
    /* global Symbol */
    // Defining this global in .eslintrc.json would create a danger of using the global
    // unguarded in another place, it seems safer to define global only for this module
    
    
    
    var
        version = "3.6.3",
    
        // Define a local copy of jQuery
        jQuery = function( selector, context ) {
    
            // The jQuery object is actually just the init constructor 'enhanced'
            // Need init if jQuery is called (just allow error to be thrown if not included)
            return new jQuery.fn.init( selector, context );
        };
    
    jQuery.fn = jQuery.prototype = {
    
        // The current version of jQuery being used
        jquery: version,
    
        constructor: jQuery,
    
        // The default length of a jQuery object is 0
        length: 0,
    
        toArray: function() {
            return slice.call( this );
        },
    
        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function( num ) {
    
            // Return all the elements in a clean array
            if ( num == null ) {
                return slice.call( this );
            }
    
            // Return just the one element from the set
            return num < 0 ? this[ num + this.length ] : this[ num ];
        },
    
        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function( elems ) {
    
            // Build a new jQuery matched element set
            var ret = jQuery.merge( this.constructor(), elems );
    
            // Add the old object onto the stack (as a reference)
            ret.prevObject = this;
    
            // Return the newly-formed element set
            return ret;
        },
    
        // Execute a callback for every element in the matched set.
        each: function( callback ) {
            return jQuery.each( this, callback );
        },
    
        map: function( callback ) {
            return this.pushStack( jQuery.map( this, function( elem, i ) {
                return callback.call( elem, i, elem );
            } ) );
        },
    
        slice: function() {
            return this.pushStack( slice.apply( this, arguments ) );
        },
    
        first: function() {
            return this.eq( 0 );
        },
    
        last: function() {
            return this.eq( -1 );
        },
    
        even: function() {
            return this.pushStack( jQuery.grep( this, function( _elem, i ) {
                return ( i + 1 ) % 2;
            } ) );
        },
    
        odd: function() {
            return this.pushStack( jQuery.grep( this, function( _elem, i ) {
                return i % 2;
            } ) );
        },
    
        eq: function( i ) {
            var len = this.length,
                j = +i + ( i < 0 ? len : 0 );
            return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
        },
    
        end: function() {
            return this.prevObject || this.constructor();
        },
    
        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push: push,
        sort: arr.sort,
        splice: arr.splice
    };
    
    jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[ 0 ] || {},
            i = 1,
            length = arguments.length,
            deep = false;
    
        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
            deep = target;
    
            // Skip the boolean and the target
            target = arguments[ i ] || {};
            i++;
        }
    
        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !isFunction( target ) ) {
            target = {};
        }
    
        // Extend jQuery itself if only one argument is passed
        if ( i === length ) {
            target = this;
            i--;
        }
    
        for ( ; i < length; i++ ) {
    
            // Only deal with non-null/undefined values
            if ( ( options = arguments[ i ] ) != null ) {
    
                // Extend the base object
                for ( name in options ) {
                    copy = options[ name ];
    
                    // Prevent Object.prototype pollution
                    // Prevent never-ending loop
                    if ( name === "__proto__" || target === copy ) {
                        continue;
                    }
    
                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
                        ( copyIsArray = Array.isArray( copy ) ) ) ) {
                        src = target[ name ];
    
                        // Ensure proper type for the source value
                        if ( copyIsArray && !Array.isArray( src ) ) {
                            clone = [];
                        } else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
                            clone = {};
                        } else {
                            clone = src;
                        }
                        copyIsArray = false;
    
                        // Never move original objects, clone them
                        target[ name ] = jQuery.extend( deep, clone, copy );
    
                    // Don't bring in undefined values
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }
    
        // Return the modified object
        return target;
    };
    
    jQuery.extend( {
    
        // Unique for each copy of jQuery on the page
        expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
    
        // Assume jQuery is ready without the ready module
        isReady: true,
    
        error: function( msg ) {
            throw new Error( msg );
        },
    
        noop: function() {},
    
        isPlainObject: function( obj ) {
            var proto, Ctor;
    
            // Detect obvious negatives
            // Use toString instead of jQuery.type to catch host objects
            if ( !obj || toString.call( obj ) !== "[object Object]" ) {
                return false;
            }
    
            proto = getProto( obj );
    
            // Objects with no prototype (e.g., `Object.create( null )`) are plain
            if ( !proto ) {
                return true;
            }
    
            // Objects with prototype are plain iff they were constructed by a global Object function
            Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
            return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
        },
    
        isEmptyObject: function( obj ) {
            var name;
    
            for ( name in obj ) {
                return false;
            }
            return true;
        },
    
        // Evaluates a script in a provided context; falls back to the global one
        // if not specified.
        globalEval: function( code, options, doc ) {
            DOMEval( code, { nonce: options && options.nonce }, doc );
        },
    
        each: function( obj, callback ) {
            var length, i = 0;
    
            if ( isArrayLike( obj ) ) {
                length = obj.length;
                for ( ; i < length; i++ ) {
                    if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
                        break;
                    }
                }
            } else {
                for ( i in obj ) {
                    if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
                        break;
                    }
                }
            }
    
            return obj;
        },
    
        // results is for internal usage only
        makeArray: function( arr, results ) {
            var ret = results || [];
    
            if ( arr != null ) {
                if ( isArrayLike( Object( arr ) ) ) {
                    jQuery.merge( ret,
                        typeof arr === "string" ?
                            [ arr ] : arr
                    );
                } else {
                    push.call( ret, arr );
                }
            }
    
            return ret;
        },
    
        inArray: function( elem, arr, i ) {
            return arr == null ? -1 : indexOf.call( arr, elem, i );
        },
    
        // Support: Android <=4.0 only, PhantomJS 1 only
        // push.apply(_, arraylike) throws on ancient WebKit
        merge: function( first, second ) {
            var len = +second.length,
                j = 0,
                i = first.length;
    
            for ( ; j < len; j++ ) {
                first[ i++ ] = second[ j ];
            }
    
            first.length = i;
    
            return first;
        },
    
        grep: function( elems, callback, invert ) {
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;
    
            // Go through the array, only saving the items
            // that pass the validator function
            for ( ; i < length; i++ ) {
                callbackInverse = !callback( elems[ i ], i );
                if ( callbackInverse !== callbackExpect ) {
                    matches.push( elems[ i ] );
                }
            }
    
            return matches;
        },
    
        // arg is for internal usage only
        map: function( elems, callback, arg ) {
            var length, value,
                i = 0,
                ret = [];
    
            // Go through the array, translating each of the items to their new values
            if ( isArrayLike( elems ) ) {
                length = elems.length;
                for ( ; i < length; i++ ) {
                    value = callback( elems[ i ], i, arg );
    
                    if ( value != null ) {
                        ret.push( value );
                    }
                }
    
            // Go through every key on the object,
            } else {
                for ( i in elems ) {
                    value = callback( elems[ i ], i, arg );
    
                    if ( value != null ) {
                        ret.push( value );
                    }
                }
            }
    
            // Flatten any nested arrays
            return flat( ret );
        },
    
        // A global GUID counter for objects
        guid: 1,
    
        // jQuery.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support: support
    } );
    
    if ( typeof Symbol === "function" ) {
        jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
    }
    
    // Populate the class2type map
    jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
        function( _i, name ) {
            class2type[ "[object " + name + "]" ] = name.toLowerCase();
        } );
    
    function isArrayLike( obj ) {
    
        // Support: real iOS 8.2 only (not reproducible in simulator)
        // `in` check used to prevent JIT error (gh-2145)
        // hasOwn isn't used here due to false negatives
        // regarding Nodelist length in IE
        var length = !!obj && "length" in obj && obj.length,
            type = toType( obj );
    
        if ( isFunction( obj ) || isWindow( obj ) ) {
            return false;
        }
    
        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && ( length - 1 ) in obj;
    }
    var Sizzle =
    /*!
     * Sizzle CSS Selector Engine v2.3.9
     * https://sizzlejs.com/
     *
     * Copyright JS Foundation and other contributors
     * Released under the MIT license
     * https://js.foundation/
     *
     * Date: 2022-12-19
     */
    ( function( window ) {
    var i,
        support,
        Expr,
        getText,
        isXML,
        tokenize,
        compile,
        select,
        outermostContext,
        sortInput,
        hasDuplicate,
    
        // Local document vars
        setDocument,
        document,
        docElem,
        documentIsHTML,
        rbuggyQSA,
        rbuggyMatches,
        matches,
        contains,
    
        // Instance-specific data
        expando = "sizzle" + 1 * new Date(),
        preferredDoc = window.document,
        dirruns = 0,
        done = 0,
        classCache = createCache(),
        tokenCache = createCache(),
        compilerCache = createCache(),
        nonnativeSelectorCache = createCache(),
        sortOrder = function( a, b ) {
            if ( a === b ) {
                hasDuplicate = true;
            }
            return 0;
        },
    
        // Instance methods
        hasOwn = ( {} ).hasOwnProperty,
        arr = [],
        pop = arr.pop,
        pushNative = arr.push,
        push = arr.push,
        slice = arr.slice,
    
        // Use a stripped-down indexOf as it's faster than native
        // https://jsperf.com/thor-indexof-vs-for/5
        indexOf = function( list, elem ) {
            var i = 0,
                len = list.length;
            for ( ; i < len; i++ ) {
                if ( list[ i ] === elem ) {
                    return i;
                }
            }
            return -1;
        },
    
        booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
            "ismap|loop|multiple|open|readonly|required|scoped",
    
        // Regular expressions
    
        // http://www.w3.org/TR/css3-selectors/#whitespace
        whitespace = "[\\x20\\t\\r\\n\\f]",
    
        // https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
        identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
            "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
    
        // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
        attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
    
            // Operator (capture 2)
            "*([*^$|!~]?=)" + whitespace +
    
            // "Attribute values must be CSS identifiers [capture 5]
            // or strings [capture 3 or capture 4]"
            "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
            whitespace + "*\\]",
    
        pseudos = ":(" + identifier + ")(?:\\((" +
    
            // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
            // 1. quoted (capture 3; capture 4 or capture 5)
            "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
    
            // 2. simple (capture 6)
            "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
    
            // 3. anything else (capture 2)
            ".*" +
            ")\\)|)",
    
        // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
        rwhitespace = new RegExp( whitespace + "+", "g" ),
        rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
            whitespace + "+$", "g" ),
    
        rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
        rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
            "*" ),
        rdescend = new RegExp( whitespace + "|>" ),
    
        rpseudo = new RegExp( pseudos ),
        ridentifier = new RegExp( "^" + identifier + "$" ),
    
        matchExpr = {
            "ID": new RegExp( "^#(" + identifier + ")" ),
            "CLASS": new RegExp( "^\\.(" + identifier + ")" ),
            "TAG": new RegExp( "^(" + identifier + "|[*])" ),
            "ATTR": new RegExp( "^" + attributes ),
            "PSEUDO": new RegExp( "^" + pseudos ),
            "CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
                whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
            "bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
    
            // For use in libraries implementing .is()
            // We use this for POS matching in `select`
            "needsContext": new RegExp( "^" + whitespace +
                "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
                "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
        },
    
        rhtml = /HTML$/i,
        rinputs = /^(?:input|select|textarea|button)$/i,
        rheader = /^h\d$/i,
    
        rnative = /^[^{]+\{\s*\[native \w/,
    
        // Easily-parseable/retrievable ID or TAG or CLASS selectors
        rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
    
        rsibling = /[+~]/,
    
        // CSS escapes
        // http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
        runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g" ),
        funescape = function( escape, nonHex ) {
            var high = "0x" + escape.slice( 1 ) - 0x10000;
    
            return nonHex ?
    
                // Strip the backslash prefix from a non-hex escape sequence
                nonHex :
    
                // Replace a hexadecimal escape sequence with the encoded Unicode code point
                // Support: IE <=11+
                // For values outside the Basic Multilingual Plane (BMP), manually construct a
                // surrogate pair
                high < 0 ?
                    String.fromCharCode( high + 0x10000 ) :
                    String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
        },
    
        // CSS string/identifier serialization
        // https://drafts.csswg.org/cssom/#common-serializing-idioms
        rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        fcssescape = function( ch, asCodePoint ) {
            if ( asCodePoint ) {
    
                // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
                if ( ch === "\0" ) {
                    return "\uFFFD";
                }
    
                // Control characters and (dependent upon position) numbers get escaped as code points
                return ch.slice( 0, -1 ) + "\\" +
                    ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
            }
    
            // Other potentially-special ASCII characters get backslash-escaped
            return "\\" + ch;
        },
    
        // Used for iframes
        // See setDocument()
        // Removing the function wrapper causes a "Permission Denied"
        // error in IE
        unloadHandler = function() {
            setDocument();
        },
    
        inDisabledFieldset = addCombinator(
            function( elem ) {
                return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
            },
            { dir: "parentNode", next: "legend" }
        );
    
    // Optimize for push.apply( _, NodeList )
    try {
        push.apply(
            ( arr = slice.call( preferredDoc.childNodes ) ),
            preferredDoc.childNodes
        );
    
        // Support: Android<4.0
        // Detect silently failing push.apply
        // eslint-disable-next-line no-unused-expressions
        arr[ preferredDoc.childNodes.length ].nodeType;
    } catch ( e ) {
        push = { apply: arr.length ?
    
            // Leverage slice if possible
            function( target, els ) {
                pushNative.apply( target, slice.call( els ) );
            } :
    
            // Support: IE<9
            // Otherwise append directly
            function( target, els ) {
                var j = target.length,
                    i = 0;
    
                // Can't trust NodeList.length
                while ( ( target[ j++ ] = els[ i++ ] ) ) {}
                target.length = j - 1;
            }
        };
    }
    
    function Sizzle( selector, context, results, seed ) {
        var m, i, elem, nid, match, groups, newSelector,
            newContext = context && context.ownerDocument,
    
            // nodeType defaults to 9, since context defaults to document
            nodeType = context ? context.nodeType : 9;
    
        results = results || [];
    
        // Return early from calls with invalid selector or context
        if ( typeof selector !== "string" || !selector ||
            nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {
    
            return results;
        }
    
        // Try to shortcut find operations (as opposed to filters) in HTML documents
        if ( !seed ) {
            setDocument( context );
            context = context || document;
    
            if ( documentIsHTML ) {
    
                // If the selector is sufficiently simple, try using a "get*By*" DOM method
                // (excepting DocumentFragment context, where the methods don't exist)
                if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {
    
                    // ID selector
                    if ( ( m = match[ 1 ] ) ) {
    
                        // Document context
                        if ( nodeType === 9 ) {
                            if ( ( elem = context.getElementById( m ) ) ) {
    
                                // Support: IE, Opera, Webkit
                                // TODO: identify versions
                                // getElementById can match elements by name instead of ID
                                if ( elem.id === m ) {
                                    results.push( elem );
                                    return results;
                                }
                            } else {
                                return results;
                            }
    
                        // Element context
                        } else {
    
                            // Support: IE, Opera, Webkit
                            // TODO: identify versions
                            // getElementById can match elements by name instead of ID
                            if ( newContext && ( elem = newContext.getElementById( m ) ) &&
                                contains( context, elem ) &&
                                elem.id === m ) {
    
                                results.push( elem );
                                return results;
                            }
                        }
    
                    // Type selector
                    } else if ( match[ 2 ] ) {
                        push.apply( results, context.getElementsByTagName( selector ) );
                        return results;
    
                    // Class selector
                    } else if ( ( m = match[ 3 ] ) && support.getElementsByClassName &&
                        context.getElementsByClassName ) {
    
                        push.apply( results, context.getElementsByClassName( m ) );
                        return results;
                    }
                }
    
                // Take advantage of querySelectorAll
                if ( support.qsa &&
                    !nonnativeSelectorCache[ selector + " " ] &&
                    ( !rbuggyQSA || !rbuggyQSA.test( selector ) ) &&
    
                    // Support: IE 8 only
                    // Exclude object elements
                    ( nodeType !== 1 || context.nodeName.toLowerCase() !== "object" ) ) {
    
                    newSelector = selector;
                    newContext = context;
    
                    // qSA considers elements outside a scoping root when evaluating child or
                    // descendant combinators, which is not what we want.
                    // In such cases, we work around the behavior by prefixing every selector in the
                    // list with an ID selector referencing the scope context.
                    // The technique has to be used as well when a leading combinator is used
                    // as such selectors are not recognized by querySelectorAll.
                    // Thanks to Andrew Dupont for this technique.
                    if ( nodeType === 1 &&
                        ( rdescend.test( selector ) || rcombinators.test( selector ) ) ) {
    
                        // Expand context for sibling selectors
                        newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
                            context;
    
                        // We can use :scope instead of the ID hack if the browser
                        // supports it & if we're not changing the context.
                        if ( newContext !== context || !support.scope ) {
    
                            // Capture the context ID, setting it first if necessary
                            if ( ( nid = context.getAttribute( "id" ) ) ) {
                                nid = nid.replace( rcssescape, fcssescape );
                            } else {
                                context.setAttribute( "id", ( nid = expando ) );
                            }
                        }
    
                        // Prefix every selector in the list
                        groups = tokenize( selector );
                        i = groups.length;
                        while ( i-- ) {
                            groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
                                toSelector( groups[ i ] );
                        }
                        newSelector = groups.join( "," );
                    }
    
                    try {
    
                        // `qSA` may not throw for unrecognized parts using forgiving parsing:
                        // https://drafts.csswg.org/selectors/#forgiving-selector
                        // like the `:has()` pseudo-class:
                        // https://drafts.csswg.org/selectors/#relational
                        // `CSS.supports` is still expected to return `false` then:
                        // https://drafts.csswg.org/css-conditional-4/#typedef-supports-selector-fn
                        // https://drafts.csswg.org/css-conditional-4/#dfn-support-selector
                        if ( support.cssSupportsSelector &&
    
                            // eslint-disable-next-line no-undef
                            !CSS.supports( "selector(:is(" + newSelector + "))" ) ) {
    
                            // Support: IE 11+
                            // Throw to get to the same code path as an error directly in qSA.
                            // Note: once we only support browser supporting
                            // `CSS.supports('selector(...)')`, we can most likely drop
                            // the `try-catch`. IE doesn't implement the API.
                            throw new Error();
                        }
    
                        push.apply( results,
                            newContext.querySelectorAll( newSelector )
                        );
                        return results;
                    } catch ( qsaError ) {
                        nonnativeSelectorCache( selector, true );
                    } finally {
                        if ( nid === expando ) {
                            context.removeAttribute( "id" );
                        }
                    }
                }
            }
        }
    
        // All others
        return select( selector.replace( rtrim, "$1" ), context, results, seed );
    }
    
    /**
     * Create key-value caches of limited size
     * @returns {function(string, object)} Returns the Object data after storing it on itself with
     *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
     *	deleting the oldest entry
     */
    function createCache() {
        var keys = [];
    
        function cache( key, value ) {
    
            // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
            if ( keys.push( key + " " ) > Expr.cacheLength ) {
    
                // Only keep the most recent entries
                delete cache[ keys.shift() ];
            }
            return ( cache[ key + " " ] = value );
        }
        return cache;
    }
    
    /**
     * Mark a function for special use by Sizzle
     * @param {Function} fn The function to mark
     */
    function markFunction( fn ) {
        fn[ expando ] = true;
        return fn;
    }
    
    /**
     * Support testing using an element
     * @param {Function} fn Passed the created element and returns a boolean result
     */
    function assert( fn ) {
        var el = document.createElement( "fieldset" );
    
        try {
            return !!fn( el );
        } catch ( e ) {
            return false;
        } finally {
    
            // Remove from its parent by default
            if ( el.parentNode ) {
                el.parentNode.removeChild( el );
            }
    
            // release memory in IE
            el = null;
        }
    }
    
    /**
     * Adds the same handler for all of the specified attrs
     * @param {String} attrs Pipe-separated list of attributes
     * @param {Function} handler The method that will be applied
     */
    function addHandle( attrs, handler ) {
        var arr = attrs.split( "|" ),
            i = arr.length;
    
        while ( i-- ) {
            Expr.attrHandle[ arr[ i ] ] = handler;
        }
    }
    
    /**
     * Checks document order of two siblings
     * @param {Element} a
     * @param {Element} b
     * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
     */
    function siblingCheck( a, b ) {
        var cur = b && a,
            diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
                a.sourceIndex - b.sourceIndex;
    
        // Use IE sourceIndex if available on both nodes
        if ( diff ) {
            return diff;
        }
    
        // Check if b follows a
        if ( cur ) {
            while ( ( cur = cur.nextSibling ) ) {
                if ( cur === b ) {
                    return -1;
                }
            }
        }
    
        return a ? 1 : -1;
    }
    
    /**
     * Returns a function to use in pseudos for input types
     * @param {String} type
     */
    function createInputPseudo( type ) {
        return function( elem ) {
            var name = elem.nodeName.toLowerCase();
            return name === "input" && elem.type === type;
        };
    }
    
    /**
     * Returns a function to use in pseudos for buttons
     * @param {String} type
     */
    function createButtonPseudo( type ) {
        return function( elem ) {
            var name = elem.nodeName.toLowerCase();
            return ( name === "input" || name === "button" ) && elem.type === type;
        };
    }
    
    /**
     * Returns a function to use in pseudos for :enabled/:disabled
     * @param {Boolean} disabled true for :disabled; false for :enabled
     */
    function createDisabledPseudo( disabled ) {
    
        // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
        return function( elem ) {
    
            // Only certain elements can match :enabled or :disabled
            // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
            // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
            if ( "form" in elem ) {
    
                // Check for inherited disabledness on relevant non-disabled elements:
                // * listed form-associated elements in a disabled fieldset
                //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
                //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
                // * option elements in a disabled optgroup
                //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
                // All such elements have a "form" property.
                if ( elem.parentNode && elem.disabled === false ) {
    
                    // Option elements defer to a parent optgroup if present
                    if ( "label" in elem ) {
                        if ( "label" in elem.parentNode ) {
                            return elem.parentNode.disabled === disabled;
                        } else {
                            return elem.disabled === disabled;
                        }
                    }
    
                    // Support: IE 6 - 11
                    // Use the isDisabled shortcut property to check for disabled fieldset ancestors
                    return elem.isDisabled === disabled ||
    
                        // Where there is no isDisabled, check manually
                        /* jshint -W018 */
                        elem.isDisabled !== !disabled &&
                        inDisabledFieldset( elem ) === disabled;
                }
    
                return elem.disabled === disabled;
    
            // Try to winnow out elements that can't be disabled before trusting the disabled property.
            // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
            // even exist on them, let alone have a boolean value.
            } else if ( "label" in elem ) {
                return elem.disabled === disabled;
            }
    
            // Remaining elements are neither :enabled nor :disabled
            return false;
        };
    }
    
    /**
     * Returns a function to use in pseudos for positionals
     * @param {Function} fn
     */
    function createPositionalPseudo( fn ) {
        return markFunction( function( argument ) {
            argument = +argument;
            return markFunction( function( seed, matches ) {
                var j,
                    matchIndexes = fn( [], seed.length, argument ),
                    i = matchIndexes.length;
    
                // Match elements found at the specified indexes
                while ( i-- ) {
                    if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
                        seed[ j ] = !( matches[ j ] = seed[ j ] );
                    }
                }
            } );
        } );
    }
    
    /**
     * Checks a node for validity as a Sizzle context
     * @param {Element|Object=} context
     * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
     */
    function testContext( context ) {
        return context && typeof context.getElementsByTagName !== "undefined" && context;
    }
    
    // Expose support vars for convenience
    support = Sizzle.support = {};
    
    /**
     * Detects XML nodes
     * @param {Element|Object} elem An element or a document
     * @returns {Boolean} True iff elem is a non-HTML XML node
     */
    isXML = Sizzle.isXML = function( elem ) {
        var namespace = elem && elem.namespaceURI,
            docElem = elem && ( elem.ownerDocument || elem ).documentElement;
    
        // Support: IE <=8
        // Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
        // https://bugs.jquery.com/ticket/4833
        return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
    };
    
    /**
     * Sets document-related variables once based on the current document
     * @param {Element|Object} [doc] An element or document object to use to set the document
     * @returns {Object} Returns the current document
     */
    setDocument = Sizzle.setDocument = function( node ) {
        var hasCompare, subWindow,
            doc = node ? node.ownerDocument || node : preferredDoc;
    
        // Return early if doc is invalid or already selected
        // Support: IE 11+, Edge 17 - 18+
        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
        // two documents; shallow comparisons work.
        // eslint-disable-next-line eqeqeq
        if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
            return document;
        }
    
        // Update global variables
        document = doc;
        docElem = document.documentElement;
        documentIsHTML = !isXML( document );
    
        // Support: IE 9 - 11+, Edge 12 - 18+
        // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
        // Support: IE 11+, Edge 17 - 18+
        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
        // two documents; shallow comparisons work.
        // eslint-disable-next-line eqeqeq
        if ( preferredDoc != document &&
            ( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {
    
            // Support: IE 11, Edge
            if ( subWindow.addEventListener ) {
                subWindow.addEventListener( "unload", unloadHandler, false );
    
            // Support: IE 9 - 10 only
            } else if ( subWindow.attachEvent ) {
                subWindow.attachEvent( "onunload", unloadHandler );
            }
        }
    
        // Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
        // Safari 4 - 5 only, Opera <=11.6 - 12.x only
        // IE/Edge & older browsers don't support the :scope pseudo-class.
        // Support: Safari 6.0 only
        // Safari 6.0 supports :scope but it's an alias of :root there.
        support.scope = assert( function( el ) {
            docElem.appendChild( el ).appendChild( document.createElement( "div" ) );
            return typeof el.querySelectorAll !== "undefined" &&
                !el.querySelectorAll( ":scope fieldset div" ).length;
        } );
    
        // Support: Chrome 105+, Firefox 104+, Safari 15.4+
        // Make sure forgiving mode is not used in `CSS.supports( "selector(...)" )`.
        //
        // `:is()` uses a forgiving selector list as an argument and is widely
        // implemented, so it's a good one to test against.
        support.cssSupportsSelector = assert( function() {
            /* eslint-disable no-undef */
    
            return CSS.supports( "selector(*)" ) &&
    
                // Support: Firefox 78-81 only
                // In old Firefox, `:is()` didn't use forgiving parsing. In that case,
                // fail this test as there's no selector to test against that.
                // `CSS.supports` uses unforgiving parsing
                document.querySelectorAll( ":is(:jqfake)" ) &&
    
                // `*` is needed as Safari & newer Chrome implemented something in between
                // for `:has()` - it throws in `qSA` if it only contains an unsupported
                // argument but multiple ones, one of which is supported, are fine.
                // We want to play safe in case `:is()` gets the same treatment.
                !CSS.supports( "selector(:is(*,:jqfake))" );
    
            /* eslint-enable */
        } );
    
        /* Attributes
        ---------------------------------------------------------------------- */
    
        // Support: IE<8
        // Verify that getAttribute really returns attributes and not properties
        // (excepting IE8 booleans)
        support.attributes = assert( function( el ) {
            el.className = "i";
            return !el.getAttribute( "className" );
        } );
    
        /* getElement(s)By*
        ---------------------------------------------------------------------- */
    
        // Check if getElementsByTagName("*") returns only elements
        support.getElementsByTagName = assert( function( el ) {
            el.appendChild( document.createComment( "" ) );
            return !el.getElementsByTagName( "*" ).length;
        } );
    
        // Support: IE<9
        support.getElementsByClassName = rnative.test( document.getElementsByClassName );
    
        // Support: IE<10
        // Check if getElementById returns elements by name
        // The broken getElementById methods don't pick up programmatically-set names,
        // so use a roundabout getElementsByName test
        support.getById = assert( function( el ) {
            docElem.appendChild( el ).id = expando;
            return !document.getElementsByName || !document.getElementsByName( expando ).length;
        } );
    
        // ID filter and find
        if ( support.getById ) {
            Expr.filter[ "ID" ] = function( id ) {
                var attrId = id.replace( runescape, funescape );
                return function( elem ) {
                    return elem.getAttribute( "id" ) === attrId;
                };
            };
            Expr.find[ "ID" ] = function( id, context ) {
                if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
                    var elem = context.getElementById( id );
                    return elem ? [ elem ] : [];
                }
            };
        } else {
            Expr.filter[ "ID" ] =  function( id ) {
                var attrId = id.replace( runescape, funescape );
                return function( elem ) {
                    var node = typeof elem.getAttributeNode !== "undefined" &&
                        elem.getAttributeNode( "id" );
                    return node && node.value === attrId;
                };
            };
    
            // Support: IE 6 - 7 only
            // getElementById is not reliable as a find shortcut
            Expr.find[ "ID" ] = function( id, context ) {
                if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
                    var node, i, elems,
                        elem = context.getElementById( id );
    
                    if ( elem ) {
    
                        // Verify the id attribute
                        node = elem.getAttributeNode( "id" );
                        if ( node && node.value === id ) {
                            return [ elem ];
                        }
    
                        // Fall back on getElementsByName
                        elems = context.getElementsByName( id );
                        i = 0;
                        while ( ( elem = elems[ i++ ] ) ) {
                            node = elem.getAttributeNode( "id" );
                            if ( node && node.value === id ) {
                                return [ elem ];
                            }
                        }
                    }
    
                    return [];
                }
            };
        }
    
        // Tag
        Expr.find[ "TAG" ] = support.getElementsByTagName ?
            function( tag, context ) {
                if ( typeof context.getElementsByTagName !== "undefined" ) {
                    return context.getElementsByTagName( tag );
    
                // DocumentFragment nodes don't have gEBTN
                } else if ( support.qsa ) {
                    return context.querySelectorAll( tag );
                }
            } :
    
            function( tag, context ) {
                var elem,
                    tmp = [],
                    i = 0,
    
                    // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
                    results = context.getElementsByTagName( tag );
    
                // Filter out possible comments
                if ( tag === "*" ) {
                    while ( ( elem = results[ i++ ] ) ) {
                        if ( elem.nodeType === 1 ) {
                            tmp.push( elem );
                        }
                    }
    
                    return tmp;
                }
                return results;
            };
    
        // Class
        Expr.find[ "CLASS" ] = support.getElementsByClassName && function( className, context ) {
            if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
                return context.getElementsByClassName( className );
            }
        };
    
        /* QSA/matchesSelector
        ---------------------------------------------------------------------- */
    
        // QSA and matchesSelector support
    
        // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
        rbuggyMatches = [];
    
        // qSa(:focus) reports false when true (Chrome 21)
        // We allow this because of a bug in IE8/9 that throws an error
        // whenever `document.activeElement` is accessed on an iframe
        // So, we allow :focus to pass through QSA all the time to avoid the IE error
        // See https://bugs.jquery.com/ticket/13378
        rbuggyQSA = [];
    
        if ( ( support.qsa = rnative.test( document.querySelectorAll ) ) ) {
    
            // Build QSA regex
            // Regex strategy adopted from Diego Perini
            assert( function( el ) {
    
                var input;
    
                // Select is set to empty string on purpose
                // This is to test IE's treatment of not explicitly
                // setting a boolean content attribute,
                // since its presence should be enough
                // https://bugs.jquery.com/ticket/12359
                docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
                    "<select id='" + expando + "-\r\\' msallowcapture=''>" +
                    "<option selected=''></option></select>";
    
                // Support: IE8, Opera 11-12.16
                // Nothing should be selected when empty strings follow ^= or $= or *=
                // The test attribute must be unknown in Opera but "safe" for WinRT
                // https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
                if ( el.querySelectorAll( "[msallowcapture^='']" ).length ) {
                    rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
                }
    
                // Support: IE8
                // Boolean attributes and "value" are not treated correctly
                if ( !el.querySelectorAll( "[selected]" ).length ) {
                    rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
                }
    
                // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
                if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
                    rbuggyQSA.push( "~=" );
                }
    
                // Support: IE 11+, Edge 15 - 18+
                // IE 11/Edge don't find elements on a `[name='']` query in some cases.
                // Adding a temporary attribute to the document before the selection works
                // around the issue.
                // Interestingly, IE 10 & older don't seem to have the issue.
                input = document.createElement( "input" );
                input.setAttribute( "name", "" );
                el.appendChild( input );
                if ( !el.querySelectorAll( "[name='']" ).length ) {
                    rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
                        whitespace + "*(?:''|\"\")" );
                }
    
                // Webkit/Opera - :checked should return selected option elements
                // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                // IE8 throws error here and will not see later tests
                if ( !el.querySelectorAll( ":checked" ).length ) {
                    rbuggyQSA.push( ":checked" );
                }
    
                // Support: Safari 8+, iOS 8+
                // https://bugs.webkit.org/show_bug.cgi?id=136851
                // In-page `selector#id sibling-combinator selector` fails
                if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
                    rbuggyQSA.push( ".#.+[+~]" );
                }
    
                // Support: Firefox <=3.6 - 5 only
                // Old Firefox doesn't throw on a badly-escaped identifier.
                el.querySelectorAll( "\\\f" );
                rbuggyQSA.push( "[\\r\\n\\f]" );
            } );
    
            assert( function( el ) {
                el.innerHTML = "<a href='' disabled='disabled'></a>" +
                    "<select disabled='disabled'><option/></select>";
    
                // Support: Windows 8 Native Apps
                // The type and name attributes are restricted during .innerHTML assignment
                var input = document.createElement( "input" );
                input.setAttribute( "type", "hidden" );
                el.appendChild( input ).setAttribute( "name", "D" );
    
                // Support: IE8
                // Enforce case-sensitivity of name attribute
                if ( el.querySelectorAll( "[name=d]" ).length ) {
                    rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
                }
    
                // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                // IE8 throws error here and will not see later tests
                if ( el.querySelectorAll( ":enabled" ).length !== 2 ) {
                    rbuggyQSA.push( ":enabled", ":disabled" );
                }
    
                // Support: IE9-11+
                // IE's :disabled selector does not pick up the children of disabled fieldsets
                docElem.appendChild( el ).disabled = true;
                if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
                    rbuggyQSA.push( ":enabled", ":disabled" );
                }
    
                // Support: Opera 10 - 11 only
                // Opera 10-11 does not throw on post-comma invalid pseudos
                el.querySelectorAll( "*,:x" );
                rbuggyQSA.push( ",.*:" );
            } );
        }
    
        if ( ( support.matchesSelector = rnative.test( ( matches = docElem.matches ||
            docElem.webkitMatchesSelector ||
            docElem.mozMatchesSelector ||
            docElem.oMatchesSelector ||
            docElem.msMatchesSelector ) ) ) ) {
    
            assert( function( el ) {
    
                // Check to see if it's possible to do matchesSelector
                // on a disconnected node (IE 9)
                support.disconnectedMatch = matches.call( el, "*" );
    
                // This should fail with an exception
                // Gecko does not error, returns false instead
                matches.call( el, "[s!='']:x" );
                rbuggyMatches.push( "!=", pseudos );
            } );
        }
    
        if ( !support.cssSupportsSelector ) {
    
            // Support: Chrome 105+, Safari 15.4+
            // `:has()` uses a forgiving selector list as an argument so our regular
            // `try-catch` mechanism fails to catch `:has()` with arguments not supported
            // natively like `:has(:contains("Foo"))`. Where supported & spec-compliant,
            // we now use `CSS.supports("selector(:is(SELECTOR_TO_BE_TESTED))")`, but
            // outside that we mark `:has` as buggy.
            rbuggyQSA.push( ":has" );
        }
    
        rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );
        rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join( "|" ) );
    
        /* Contains
        ---------------------------------------------------------------------- */
        hasCompare = rnative.test( docElem.compareDocumentPosition );
    
        // Element contains another
        // Purposefully self-exclusive
        // As in, an element does not contain itself
        contains = hasCompare || rnative.test( docElem.contains ) ?
            function( a, b ) {
    
                // Support: IE <9 only
                // IE doesn't have `contains` on `document` so we need to check for
                // `documentElement` presence.
                // We need to fall back to `a` when `documentElement` is missing
                // as `ownerDocument` of elements within `<template/>` may have
                // a null one - a default behavior of all modern browsers.
                var adown = a.nodeType === 9 && a.documentElement || a,
                    bup = b && b.parentNode;
                return a === bup || !!( bup && bup.nodeType === 1 && (
                    adown.contains ?
                        adown.contains( bup ) :
                        a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
                ) );
            } :
            function( a, b ) {
                if ( b ) {
                    while ( ( b = b.parentNode ) ) {
                        if ( b === a ) {
                            return true;
                        }
                    }
                }
                return false;
            };
    
        /* Sorting
        ---------------------------------------------------------------------- */
    
        // Document order sorting
        sortOrder = hasCompare ?
        function( a, b ) {
    
            // Flag for duplicate removal
            if ( a === b ) {
                hasDuplicate = true;
                return 0;
            }
    
            // Sort on method existence if only one input has compareDocumentPosition
            var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
            if ( compare ) {
                return compare;
            }
    
            // Calculate position if both inputs belong to the same document
            // Support: IE 11+, Edge 17 - 18+
            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
            // two documents; shallow comparisons work.
            // eslint-disable-next-line eqeqeq
            compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
                a.compareDocumentPosition( b ) :
    
                // Otherwise we know they are disconnected
                1;
    
            // Disconnected nodes
            if ( compare & 1 ||
                ( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {
    
                // Choose the first element that is related to our preferred document
                // Support: IE 11+, Edge 17 - 18+
                // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                // two documents; shallow comparisons work.
                // eslint-disable-next-line eqeqeq
                if ( a == document || a.ownerDocument == preferredDoc &&
                    contains( preferredDoc, a ) ) {
                    return -1;
                }
    
                // Support: IE 11+, Edge 17 - 18+
                // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                // two documents; shallow comparisons work.
                // eslint-disable-next-line eqeqeq
                if ( b == document || b.ownerDocument == preferredDoc &&
                    contains( preferredDoc, b ) ) {
                    return 1;
                }
    
                // Maintain original order
                return sortInput ?
                    ( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
                    0;
            }
    
            return compare & 4 ? -1 : 1;
        } :
        function( a, b ) {
    
            // Exit early if the nodes are identical
            if ( a === b ) {
                hasDuplicate = true;
                return 0;
            }
    
            var cur,
                i = 0,
                aup = a.parentNode,
                bup = b.parentNode,
                ap = [ a ],
                bp = [ b ];
    
            // Parentless nodes are either documents or disconnected
            if ( !aup || !bup ) {
    
                // Support: IE 11+, Edge 17 - 18+
                // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                // two documents; shallow comparisons work.
                /* eslint-disable eqeqeq */
                return a == document ? -1 :
                    b == document ? 1 :
                    /* eslint-enable eqeqeq */
                    aup ? -1 :
                    bup ? 1 :
                    sortInput ?
                    ( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
                    0;
    
            // If the nodes are siblings, we can do a quick check
            } else if ( aup === bup ) {
                return siblingCheck( a, b );
            }
    
            // Otherwise we need full lists of their ancestors for comparison
            cur = a;
            while ( ( cur = cur.parentNode ) ) {
                ap.unshift( cur );
            }
            cur = b;
            while ( ( cur = cur.parentNode ) ) {
                bp.unshift( cur );
            }
    
            // Walk down the tree looking for a discrepancy
            while ( ap[ i ] === bp[ i ] ) {
                i++;
            }
    
            return i ?
    
                // Do a sibling check if the nodes have a common ancestor
                siblingCheck( ap[ i ], bp[ i ] ) :
    
                // Otherwise nodes in our document sort first
                // Support: IE 11+, Edge 17 - 18+
                // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                // two documents; shallow comparisons work.
                /* eslint-disable eqeqeq */
                ap[ i ] == preferredDoc ? -1 :
                bp[ i ] == preferredDoc ? 1 :
                /* eslint-enable eqeqeq */
                0;
        };
    
        return document;
    };
    
    Sizzle.matches = function( expr, elements ) {
        return Sizzle( expr, null, null, elements );
    };
    
    Sizzle.matchesSelector = function( elem, expr ) {
        setDocument( elem );
    
        if ( support.matchesSelector && documentIsHTML &&
            !nonnativeSelectorCache[ expr + " " ] &&
            ( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
            ( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {
    
            try {
                var ret = matches.call( elem, expr );
    
                // IE 9's matchesSelector returns false on disconnected nodes
                if ( ret || support.disconnectedMatch ||
    
                    // As well, disconnected nodes are said to be in a document
                    // fragment in IE 9
                    elem.document && elem.document.nodeType !== 11 ) {
                    return ret;
                }
            } catch ( e ) {
                nonnativeSelectorCache( expr, true );
            }
        }
    
        return Sizzle( expr, document, null, [ elem ] ).length > 0;
    };
    
    Sizzle.contains = function( context, elem ) {
    
        // Set document vars if needed
        // Support: IE 11+, Edge 17 - 18+
        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
        // two documents; shallow comparisons work.
        // eslint-disable-next-line eqeqeq
        if ( ( context.ownerDocument || context ) != document ) {
            setDocument( context );
        }
        return contains( context, elem );
    };
    
    Sizzle.attr = function( elem, name ) {
    
        // Set document vars if needed
        // Support: IE 11+, Edge 17 - 18+
        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
        // two documents; shallow comparisons work.
        // eslint-disable-next-line eqeqeq
        if ( ( elem.ownerDocument || elem ) != document ) {
            setDocument( elem );
        }
    
        var fn = Expr.attrHandle[ name.toLowerCase() ],
    
            // Don't get fooled by Object.prototype properties (jQuery #13807)
            val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
                fn( elem, name, !documentIsHTML ) :
                undefined;
    
        return val !== undefined ?
            val :
            support.attributes || !documentIsHTML ?
                elem.getAttribute( name ) :
                ( val = elem.getAttributeNode( name ) ) && val.specified ?
                    val.value :
                    null;
    };
    
    Sizzle.escape = function( sel ) {
        return ( sel + "" ).replace( rcssescape, fcssescape );
    };
    
    Sizzle.error = function( msg ) {
        throw new Error( "Syntax error, unrecognized expression: " + msg );
    };
    
    /**
     * Document sorting and removing duplicates
     * @param {ArrayLike} results
     */
    Sizzle.uniqueSort = function( results ) {
        var elem,
            duplicates = [],
            j = 0,
            i = 0;
    
        // Unless we *know* we can detect duplicates, assume their presence
        hasDuplicate = !support.detectDuplicates;
        sortInput = !support.sortStable && results.slice( 0 );
        results.sort( sortOrder );
    
        if ( hasDuplicate ) {
            while ( ( elem = results[ i++ ] ) ) {
                if ( elem === results[ i ] ) {
                    j = duplicates.push( i );
                }
            }
            while ( j-- ) {
                results.splice( duplicates[ j ], 1 );
            }
        }
    
        // Clear input after sorting to release objects
        // See https://github.com/jquery/sizzle/pull/225
        sortInput = null;
    
        return results;
    };
    
    /**
     * Utility function for retrieving the text value of an array of DOM nodes
     * @param {Array|Element} elem
     */
    getText = Sizzle.getText = function( elem ) {
        var node,
            ret = "",
            i = 0,
            nodeType = elem.nodeType;
    
        if ( !nodeType ) {
    
            // If no nodeType, this is expected to be an array
            while ( ( node = elem[ i++ ] ) ) {
    
                // Do not traverse comment nodes
                ret += getText( node );
            }
        } else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
    
            // Use textContent for elements
            // innerText usage removed for consistency of new lines (jQuery #11153)
            if ( typeof elem.textContent === "string" ) {
                return elem.textContent;
            } else {
    
                // Traverse its children
                for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                    ret += getText( elem );
                }
            }
        } else if ( nodeType === 3 || nodeType === 4 ) {
            return elem.nodeValue;
        }
    
        // Do not include comment or processing instruction nodes
    
        return ret;
    };
    
    Expr = Sizzle.selectors = {
    
        // Can be adjusted by the user
        cacheLength: 50,
    
        createPseudo: markFunction,
    
        match: matchExpr,
    
        attrHandle: {},
    
        find: {},
    
        relative: {
            ">": { dir: "parentNode", first: true },
            " ": { dir: "parentNode" },
            "+": { dir: "previousSibling", first: true },
            "~": { dir: "previousSibling" }
        },
    
        preFilter: {
            "ATTR": function( match ) {
                match[ 1 ] = match[ 1 ].replace( runescape, funescape );
    
                // Move the given value to match[3] whether quoted or unquoted
                match[ 3 ] = ( match[ 3 ] || match[ 4 ] ||
                    match[ 5 ] || "" ).replace( runescape, funescape );
    
                if ( match[ 2 ] === "~=" ) {
                    match[ 3 ] = " " + match[ 3 ] + " ";
                }
    
                return match.slice( 0, 4 );
            },
    
            "CHILD": function( match ) {
    
                /* matches from matchExpr["CHILD"]
                    1 type (only|nth|...)
                    2 what (child|of-type)
                    3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                    4 xn-component of xn+y argument ([+-]?\d*n|)
                    5 sign of xn-component
                    6 x of xn-component
                    7 sign of y-component
                    8 y of y-component
                */
                match[ 1 ] = match[ 1 ].toLowerCase();
    
                if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {
    
                    // nth-* requires argument
                    if ( !match[ 3 ] ) {
                        Sizzle.error( match[ 0 ] );
                    }
    
                    // numeric x and y parameters for Expr.filter.CHILD
                    // remember that false/true cast respectively to 0/1
                    match[ 4 ] = +( match[ 4 ] ?
                        match[ 5 ] + ( match[ 6 ] || 1 ) :
                        2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" ) );
                    match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );
    
                    // other types prohibit arguments
                } else if ( match[ 3 ] ) {
                    Sizzle.error( match[ 0 ] );
                }
    
                return match;
            },
    
            "PSEUDO": function( match ) {
                var excess,
                    unquoted = !match[ 6 ] && match[ 2 ];
    
                if ( matchExpr[ "CHILD" ].test( match[ 0 ] ) ) {
                    return null;
                }
    
                // Accept quoted arguments as-is
                if ( match[ 3 ] ) {
                    match[ 2 ] = match[ 4 ] || match[ 5 ] || "";
    
                // Strip excess characters from unquoted arguments
                } else if ( unquoted && rpseudo.test( unquoted ) &&
    
                    // Get excess from tokenize (recursively)
                    ( excess = tokenize( unquoted, true ) ) &&
    
                    // advance to the next closing parenthesis
                    ( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {
    
                    // excess is a negative index
                    match[ 0 ] = match[ 0 ].slice( 0, excess );
                    match[ 2 ] = unquoted.slice( 0, excess );
                }
    
                // Return only captures needed by the pseudo filter method (type and argument)
                return match.slice( 0, 3 );
            }
        },
    
        filter: {
    
            "TAG": function( nodeNameSelector ) {
                var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
                return nodeNameSelector === "*" ?
                    function() {
                        return true;
                    } :
                    function( elem ) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
            },
    
            "CLASS": function( className ) {
                var pattern = classCache[ className + " " ];
    
                return pattern ||
                    ( pattern = new RegExp( "(^|" + whitespace +
                        ")" + className + "(" + whitespace + "|$)" ) ) && classCache(
                            className, function( elem ) {
                                return pattern.test(
                                    typeof elem.className === "string" && elem.className ||
                                    typeof elem.getAttribute !== "undefined" &&
                                        elem.getAttribute( "class" ) ||
                                    ""
                                );
                    } );
            },
    
            "ATTR": function( name, operator, check ) {
                return function( elem ) {
                    var result = Sizzle.attr( elem, name );
    
                    if ( result == null ) {
                        return operator === "!=";
                    }
                    if ( !operator ) {
                        return true;
                    }
    
                    result += "";
    
                    /* eslint-disable max-len */
    
                    return operator === "=" ? result === check :
                        operator === "!=" ? result !== check :
                        operator === "^=" ? check && result.indexOf( check ) === 0 :
                        operator === "*=" ? check && result.indexOf( check ) > -1 :
                        operator === "$=" ? check && result.slice( -check.length ) === check :
                        operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
                        operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
                        false;
                    /* eslint-enable max-len */
    
                };
            },
    
            "CHILD": function( type, what, _argument, first, last ) {
                var simple = type.slice( 0, 3 ) !== "nth",
                    forward = type.slice( -4 ) !== "last",
                    ofType = what === "of-type";
    
                return first === 1 && last === 0 ?
    
                    // Shortcut for :nth-*(n)
                    function( elem ) {
                        return !!elem.parentNode;
                    } :
    
                    function( elem, _context, xml ) {
                        var cache, uniqueCache, outerCache, node, nodeIndex, start,
                            dir = simple !== forward ? "nextSibling" : "previousSibling",
                            parent = elem.parentNode,
                            name = ofType && elem.nodeName.toLowerCase(),
                            useCache = !xml && !ofType,
                            diff = false;
    
                        if ( parent ) {
    
                            // :(first|last|only)-(child|of-type)
                            if ( simple ) {
                                while ( dir ) {
                                    node = elem;
                                    while ( ( node = node[ dir ] ) ) {
                                        if ( ofType ?
                                            node.nodeName.toLowerCase() === name :
                                            node.nodeType === 1 ) {
    
                                            return false;
                                        }
                                    }
    
                                    // Reverse direction for :only-* (if we haven't yet done so)
                                    start = dir = type === "only" && !start && "nextSibling";
                                }
                                return true;
                            }
    
                            start = [ forward ? parent.firstChild : parent.lastChild ];
    
                            // non-xml :nth-child(...) stores cache data on `parent`
                            if ( forward && useCache ) {
    
                                // Seek `elem` from a previously-cached index
    
                                // ...in a gzip-friendly way
                                node = parent;
                                outerCache = node[ expando ] || ( node[ expando ] = {} );
    
                                // Support: IE <9 only
                                // Defend against cloned attroperties (jQuery gh-1709)
                                uniqueCache = outerCache[ node.uniqueID ] ||
                                    ( outerCache[ node.uniqueID ] = {} );
    
                                cache = uniqueCache[ type ] || [];
                                nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
                                diff = nodeIndex && cache[ 2 ];
                                node = nodeIndex && parent.childNodes[ nodeIndex ];
    
                                while ( ( node = ++nodeIndex && node && node[ dir ] ||
    
                                    // Fallback to seeking `elem` from the start
                                    ( diff = nodeIndex = 0 ) || start.pop() ) ) {
    
                                    // When found, cache indexes on `parent` and break
                                    if ( node.nodeType === 1 && ++diff && node === elem ) {
                                        uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
                                        break;
                                    }
                                }
    
                            } else {
    
                                // Use previously-cached element index if available
                                if ( useCache ) {
    
                                    // ...in a gzip-friendly way
                                    node = elem;
                                    outerCache = node[ expando ] || ( node[ expando ] = {} );
    
                                    // Support: IE <9 only
                                    // Defend against cloned attroperties (jQuery gh-1709)
                                    uniqueCache = outerCache[ node.uniqueID ] ||
                                        ( outerCache[ node.uniqueID ] = {} );
    
                                    cache = uniqueCache[ type ] || [];
                                    nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
                                    diff = nodeIndex;
                                }
    
                                // xml :nth-child(...)
                                // or :nth-last-child(...) or :nth(-last)?-of-type(...)
                                if ( diff === false ) {
    
                                    // Use the same loop as above to seek `elem` from the start
                                    while ( ( node = ++nodeIndex && node && node[ dir ] ||
                                        ( diff = nodeIndex = 0 ) || start.pop() ) ) {
    
                                        if ( ( ofType ?
                                            node.nodeName.toLowerCase() === name :
                                            node.nodeType === 1 ) &&
                                            ++diff ) {
    
                                            // Cache the index of each encountered element
                                            if ( useCache ) {
                                                outerCache = node[ expando ] ||
                                                    ( node[ expando ] = {} );
    
                                                // Support: IE <9 only
                                                // Defend against cloned attroperties (jQuery gh-1709)
                                                uniqueCache = outerCache[ node.uniqueID ] ||
                                                    ( outerCache[ node.uniqueID ] = {} );
    
                                                uniqueCache[ type ] = [ dirruns, diff ];
                                            }
    
                                            if ( node === elem ) {
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
    
                            // Incorporate the offset, then check against cycle size
                            diff -= last;
                            return diff === first || ( diff % first === 0 && diff / first >= 0 );
                        }
                    };
            },
    
            "PSEUDO": function( pseudo, argument ) {
    
                // pseudo-class names are case-insensitive
                // http://www.w3.org/TR/selectors/#pseudo-classes
                // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                // Remember that setFilters inherits from pseudos
                var args,
                    fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
                        Sizzle.error( "unsupported pseudo: " + pseudo );
    
                // The user may use createPseudo to indicate that
                // arguments are needed to create the filter function
                // just as Sizzle does
                if ( fn[ expando ] ) {
                    return fn( argument );
                }
    
                // But maintain support for old signatures
                if ( fn.length > 1 ) {
                    args = [ pseudo, pseudo, "", argument ];
                    return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
                        markFunction( function( seed, matches ) {
                            var idx,
                                matched = fn( seed, argument ),
                                i = matched.length;
                            while ( i-- ) {
                                idx = indexOf( seed, matched[ i ] );
                                seed[ idx ] = !( matches[ idx ] = matched[ i ] );
                            }
                        } ) :
                        function( elem ) {
                            return fn( elem, 0, args );
                        };
                }
    
                return fn;
            }
        },
    
        pseudos: {
    
            // Potentially complex pseudos
            "not": markFunction( function( selector ) {
    
                // Trim the selector passed to compile
                // to avoid treating leading and trailing
                // spaces as combinators
                var input = [],
                    results = [],
                    matcher = compile( selector.replace( rtrim, "$1" ) );
    
                return matcher[ expando ] ?
                    markFunction( function( seed, matches, _context, xml ) {
                        var elem,
                            unmatched = matcher( seed, null, xml, [] ),
                            i = seed.length;
    
                        // Match elements unmatched by `matcher`
                        while ( i-- ) {
                            if ( ( elem = unmatched[ i ] ) ) {
                                seed[ i ] = !( matches[ i ] = elem );
                            }
                        }
                    } ) :
                    function( elem, _context, xml ) {
                        input[ 0 ] = elem;
                        matcher( input, null, xml, results );
    
                        // Don't keep the element (issue #299)
                        input[ 0 ] = null;
                        return !results.pop();
                    };
            } ),
    
            "has": markFunction( function( selector ) {
                return function( elem ) {
                    return Sizzle( selector, elem ).length > 0;
                };
            } ),
    
            "contains": markFunction( function( text ) {
                text = text.replace( runescape, funescape );
                return function( elem ) {
                    return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
                };
            } ),
    
            // "Whether an element is represented by a :lang() selector
            // is based solely on the element's language value
            // being equal to the identifier C,
            // or beginning with the identifier C immediately followed by "-".
            // The matching of C against the element's language value is performed case-insensitively.
            // The identifier C does not have to be a valid language name."
            // http://www.w3.org/TR/selectors/#lang-pseudo
            "lang": markFunction( function( lang ) {
    
                // lang value must be a valid identifier
                if ( !ridentifier.test( lang || "" ) ) {
                    Sizzle.error( "unsupported lang: " + lang );
                }
                lang = lang.replace( runescape, funescape ).toLowerCase();
                return function( elem ) {
                    var elemLang;
                    do {
                        if ( ( elemLang = documentIsHTML ?
                            elem.lang :
                            elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {
    
                            elemLang = elemLang.toLowerCase();
                            return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
                        }
                    } while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
                    return false;
                };
            } ),
    
            // Miscellaneous
            "target": function( elem ) {
                var hash = window.location && window.location.hash;
                return hash && hash.slice( 1 ) === elem.id;
            },
    
            "root": function( elem ) {
                return elem === docElem;
            },
    
            "focus": function( elem ) {
                return elem === document.activeElement &&
                    ( !document.hasFocus || document.hasFocus() ) &&
                    !!( elem.type || elem.href || ~elem.tabIndex );
            },
    
            // Boolean properties
            "enabled": createDisabledPseudo( false ),
            "disabled": createDisabledPseudo( true ),
    
            "checked": function( elem ) {
    
                // In CSS3, :checked should return both checked and selected elements
                // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                var nodeName = elem.nodeName.toLowerCase();
                return ( nodeName === "input" && !!elem.checked ) ||
                    ( nodeName === "option" && !!elem.selected );
            },
    
            "selected": function( elem ) {
    
                // Accessing this property makes selected-by-default
                // options in Safari work properly
                if ( elem.parentNode ) {
                    // eslint-disable-next-line no-unused-expressions
                    elem.parentNode.selectedIndex;
                }
    
                return elem.selected === true;
            },
    
            // Contents
            "empty": function( elem ) {
    
                // http://www.w3.org/TR/selectors/#empty-pseudo
                // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                //   but not by others (comment: 8; processing instruction: 7; etc.)
                // nodeType < 6 works because attributes (2) do not appear as children
                for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                    if ( elem.nodeType < 6 ) {
                        return false;
                    }
                }
                return true;
            },
    
            "parent": function( elem ) {
                return !Expr.pseudos[ "empty" ]( elem );
            },
    
            // Element/input types
            "header": function( elem ) {
                return rheader.test( elem.nodeName );
            },
    
            "input": function( elem ) {
                return rinputs.test( elem.nodeName );
            },
    
            "button": function( elem ) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === "button" || name === "button";
            },
    
            "text": function( elem ) {
                var attr;
                return elem.nodeName.toLowerCase() === "input" &&
                    elem.type === "text" &&
    
                    // Support: IE <10 only
                    // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                    ( ( attr = elem.getAttribute( "type" ) ) == null ||
                        attr.toLowerCase() === "text" );
            },
    
            // Position-in-collection
            "first": createPositionalPseudo( function() {
                return [ 0 ];
            } ),
    
            "last": createPositionalPseudo( function( _matchIndexes, length ) {
                return [ length - 1 ];
            } ),
    
            "eq": createPositionalPseudo( function( _matchIndexes, length, argument ) {
                return [ argument < 0 ? argument + length : argument ];
            } ),
    
            "even": createPositionalPseudo( function( matchIndexes, length ) {
                var i = 0;
                for ( ; i < length; i += 2 ) {
                    matchIndexes.push( i );
                }
                return matchIndexes;
            } ),
    
            "odd": createPositionalPseudo( function( matchIndexes, length ) {
                var i = 1;
                for ( ; i < length; i += 2 ) {
                    matchIndexes.push( i );
                }
                return matchIndexes;
            } ),
    
            "lt": createPositionalPseudo( function( matchIndexes, length, argument ) {
                var i = argument < 0 ?
                    argument + length :
                    argument > length ?
                        length :
                        argument;
                for ( ; --i >= 0; ) {
                    matchIndexes.push( i );
                }
                return matchIndexes;
            } ),
    
            "gt": createPositionalPseudo( function( matchIndexes, length, argument ) {
                var i = argument < 0 ? argument + length : argument;
                for ( ; ++i < length; ) {
                    matchIndexes.push( i );
                }
                return matchIndexes;
            } )
        }
    };
    
    Expr.pseudos[ "nth" ] = Expr.pseudos[ "eq" ];
    
    // Add button/input type pseudos
    for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
        Expr.pseudos[ i ] = createInputPseudo( i );
    }
    for ( i in { submit: true, reset: true } ) {
        Expr.pseudos[ i ] = createButtonPseudo( i );
    }
    
    // Easy API for creating new setFilters
    function setFilters() {}
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();
    
    tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
        var matched, match, tokens, type,
            soFar, groups, preFilters,
            cached = tokenCache[ selector + " " ];
    
        if ( cached ) {
            return parseOnly ? 0 : cached.slice( 0 );
        }
    
        soFar = selector;
        groups = [];
        preFilters = Expr.preFilter;
    
        while ( soFar ) {
    
            // Comma and first run
            if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
                if ( match ) {
    
                    // Don't consume trailing commas as valid
                    soFar = soFar.slice( match[ 0 ].length ) || soFar;
                }
                groups.push( ( tokens = [] ) );
            }
    
            matched = false;
    
            // Combinators
            if ( ( match = rcombinators.exec( soFar ) ) ) {
                matched = match.shift();
                tokens.push( {
                    value: matched,
    
                    // Cast descendant combinators to space
                    type: match[ 0 ].replace( rtrim, " " )
                } );
                soFar = soFar.slice( matched.length );
            }
    
            // Filters
            for ( type in Expr.filter ) {
                if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
                    ( match = preFilters[ type ]( match ) ) ) ) {
                    matched = match.shift();
                    tokens.push( {
                        value: matched,
                        type: type,
                        matches: match
                    } );
                    soFar = soFar.slice( matched.length );
                }
            }
    
            if ( !matched ) {
                break;
            }
        }
    
        // Return the length of the invalid excess
        // if we're just parsing
        // Otherwise, throw an error or return tokens
        return parseOnly ?
            soFar.length :
            soFar ?
                Sizzle.error( selector ) :
    
                // Cache the tokens
                tokenCache( selector, groups ).slice( 0 );
    };
    
    function toSelector( tokens ) {
        var i = 0,
            len = tokens.length,
            selector = "";
        for ( ; i < len; i++ ) {
            selector += tokens[ i ].value;
        }
        return selector;
    }
    
    function addCombinator( matcher, combinator, base ) {
        var dir = combinator.dir,
            skip = combinator.next,
            key = skip || dir,
            checkNonElements = base && key === "parentNode",
            doneName = done++;
    
        return combinator.first ?
    
            // Check against closest ancestor/preceding element
            function( elem, context, xml ) {
                while ( ( elem = elem[ dir ] ) ) {
                    if ( elem.nodeType === 1 || checkNonElements ) {
                        return matcher( elem, context, xml );
                    }
                }
                return false;
            } :
    
            // Check against all ancestor/preceding elements
            function( elem, context, xml ) {
                var oldCache, uniqueCache, outerCache,
                    newCache = [ dirruns, doneName ];
    
                // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
                if ( xml ) {
                    while ( ( elem = elem[ dir ] ) ) {
                        if ( elem.nodeType === 1 || checkNonElements ) {
                            if ( matcher( elem, context, xml ) ) {
                                return true;
                            }
                        }
                    }
                } else {
                    while ( ( elem = elem[ dir ] ) ) {
                        if ( elem.nodeType === 1 || checkNonElements ) {
                            outerCache = elem[ expando ] || ( elem[ expando ] = {} );
    
                            // Support: IE <9 only
                            // Defend against cloned attroperties (jQuery gh-1709)
                            uniqueCache = outerCache[ elem.uniqueID ] ||
                                ( outerCache[ elem.uniqueID ] = {} );
    
                            if ( skip && skip === elem.nodeName.toLowerCase() ) {
                                elem = elem[ dir ] || elem;
                            } else if ( ( oldCache = uniqueCache[ key ] ) &&
                                oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {
    
                                // Assign to newCache so results back-propagate to previous elements
                                return ( newCache[ 2 ] = oldCache[ 2 ] );
                            } else {
    
                                // Reuse newcache so results back-propagate to previous elements
                                uniqueCache[ key ] = newCache;
    
                                // A match means we're done; a fail means we have to keep checking
                                if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
                                    return true;
                                }
                            }
                        }
                    }
                }
                return false;
            };
    }
    
    function elementMatcher( matchers ) {
        return matchers.length > 1 ?
            function( elem, context, xml ) {
                var i = matchers.length;
                while ( i-- ) {
                    if ( !matchers[ i ]( elem, context, xml ) ) {
                        return false;
                    }
                }
                return true;
            } :
            matchers[ 0 ];
    }
    
    function multipleContexts( selector, contexts, results ) {
        var i = 0,
            len = contexts.length;
        for ( ; i < len; i++ ) {
            Sizzle( selector, contexts[ i ], results );
        }
        return results;
    }
    
    function condense( unmatched, map, filter, context, xml ) {
        var elem,
            newUnmatched = [],
            i = 0,
            len = unmatched.length,
            mapped = map != null;
    
        for ( ; i < len; i++ ) {
            if ( ( elem = unmatched[ i ] ) ) {
                if ( !filter || filter( elem, context, xml ) ) {
                    newUnmatched.push( elem );
                    if ( mapped ) {
                        map.push( i );
                    }
                }
            }
        }
    
        return newUnmatched;
    }
    
    function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
        if ( postFilter && !postFilter[ expando ] ) {
            postFilter = setMatcher( postFilter );
        }
        if ( postFinder && !postFinder[ expando ] ) {
            postFinder = setMatcher( postFinder, postSelector );
        }
        return markFunction( function( seed, results, context, xml ) {
            var temp, i, elem,
                preMap = [],
                postMap = [],
                preexisting = results.length,
    
                // Get initial elements from seed or context
                elems = seed || multipleContexts(
                    selector || "*",
                    context.nodeType ? [ context ] : context,
                    []
                ),
    
                // Prefilter to get matcher input, preserving a map for seed-results synchronization
                matcherIn = preFilter && ( seed || !selector ) ?
                    condense( elems, preMap, preFilter, context, xml ) :
                    elems,
    
                matcherOut = matcher ?
    
                    // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                    postFinder || ( seed ? preFilter : preexisting || postFilter ) ?
    
                        // ...intermediate processing is necessary
                        [] :
    
                        // ...otherwise use results directly
                        results :
                    matcherIn;
    
            // Find primary matches
            if ( matcher ) {
                matcher( matcherIn, matcherOut, context, xml );
            }
    
            // Apply postFilter
            if ( postFilter ) {
                temp = condense( matcherOut, postMap );
                postFilter( temp, [], context, xml );
    
                // Un-match failing elements by moving them back to matcherIn
                i = temp.length;
                while ( i-- ) {
                    if ( ( elem = temp[ i ] ) ) {
                        matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
                    }
                }
            }
    
            if ( seed ) {
                if ( postFinder || preFilter ) {
                    if ( postFinder ) {
    
                        // Get the final matcherOut by condensing this intermediate into postFinder contexts
                        temp = [];
                        i = matcherOut.length;
                        while ( i-- ) {
                            if ( ( elem = matcherOut[ i ] ) ) {
    
                                // Restore matcherIn since elem is not yet a final match
                                temp.push( ( matcherIn[ i ] = elem ) );
                            }
                        }
                        postFinder( null, ( matcherOut = [] ), temp, xml );
                    }
    
                    // Move matched elements from seed to results to keep them synchronized
                    i = matcherOut.length;
                    while ( i-- ) {
                        if ( ( elem = matcherOut[ i ] ) &&
                            ( temp = postFinder ? indexOf( seed, elem ) : preMap[ i ] ) > -1 ) {
    
                            seed[ temp ] = !( results[ temp ] = elem );
                        }
                    }
                }
    
            // Add elements to results, through postFinder if defined
            } else {
                matcherOut = condense(
                    matcherOut === results ?
                        matcherOut.splice( preexisting, matcherOut.length ) :
                        matcherOut
                );
                if ( postFinder ) {
                    postFinder( null, results, matcherOut, xml );
                } else {
                    push.apply( results, matcherOut );
                }
            }
        } );
    }
    
    function matcherFromTokens( tokens ) {
        var checkContext, matcher, j,
            len = tokens.length,
            leadingRelative = Expr.relative[ tokens[ 0 ].type ],
            implicitRelative = leadingRelative || Expr.relative[ " " ],
            i = leadingRelative ? 1 : 0,
    
            // The foundational matcher ensures that elements are reachable from top-level context(s)
            matchContext = addCombinator( function( elem ) {
                return elem === checkContext;
            }, implicitRelative, true ),
            matchAnyContext = addCombinator( function( elem ) {
                return indexOf( checkContext, elem ) > -1;
            }, implicitRelative, true ),
            matchers = [ function( elem, context, xml ) {
                var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
                    ( checkContext = context ).nodeType ?
                        matchContext( elem, context, xml ) :
                        matchAnyContext( elem, context, xml ) );
    
                // Avoid hanging onto element (issue #299)
                checkContext = null;
                return ret;
            } ];
    
        for ( ; i < len; i++ ) {
            if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
                matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
            } else {
                matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );
    
                // Return special upon seeing a positional matcher
                if ( matcher[ expando ] ) {
    
                    // Find the next relative operator (if any) for proper handling
                    j = ++i;
                    for ( ; j < len; j++ ) {
                        if ( Expr.relative[ tokens[ j ].type ] ) {
                            break;
                        }
                    }
                    return setMatcher(
                        i > 1 && elementMatcher( matchers ),
                        i > 1 && toSelector(
    
                        // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                        tokens
                            .slice( 0, i - 1 )
                            .concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
                        ).replace( rtrim, "$1" ),
                        matcher,
                        i < j && matcherFromTokens( tokens.slice( i, j ) ),
                        j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
                        j < len && toSelector( tokens )
                    );
                }
                matchers.push( matcher );
            }
        }
    
        return elementMatcher( matchers );
    }
    
    function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
        var bySet = setMatchers.length > 0,
            byElement = elementMatchers.length > 0,
            superMatcher = function( seed, context, xml, results, outermost ) {
                var elem, j, matcher,
                    matchedCount = 0,
                    i = "0",
                    unmatched = seed && [],
                    setMatched = [],
                    contextBackup = outermostContext,
    
                    // We must always have either seed elements or outermost context
                    elems = seed || byElement && Expr.find[ "TAG" ]( "*", outermost ),
    
                    // Use integer dirruns iff this is the outermost matcher
                    dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
                    len = elems.length;
    
                if ( outermost ) {
    
                    // Support: IE 11+, Edge 17 - 18+
                    // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                    // two documents; shallow comparisons work.
                    // eslint-disable-next-line eqeqeq
                    outermostContext = context == document || context || outermost;
                }
    
                // Add elements passing elementMatchers directly to results
                // Support: IE<9, Safari
                // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
                for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
                    if ( byElement && elem ) {
                        j = 0;
    
                        // Support: IE 11+, Edge 17 - 18+
                        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                        // two documents; shallow comparisons work.
                        // eslint-disable-next-line eqeqeq
                        if ( !context && elem.ownerDocument != document ) {
                            setDocument( elem );
                            xml = !documentIsHTML;
                        }
                        while ( ( matcher = elementMatchers[ j++ ] ) ) {
                            if ( matcher( elem, context || document, xml ) ) {
                                results.push( elem );
                                break;
                            }
                        }
                        if ( outermost ) {
                            dirruns = dirrunsUnique;
                        }
                    }
    
                    // Track unmatched elements for set filters
                    if ( bySet ) {
    
                        // They will have gone through all possible matchers
                        if ( ( elem = !matcher && elem ) ) {
                            matchedCount--;
                        }
    
                        // Lengthen the array for every element, matched or not
                        if ( seed ) {
                            unmatched.push( elem );
                        }
                    }
                }
    
                // `i` is now the count of elements visited above, and adding it to `matchedCount`
                // makes the latter nonnegative.
                matchedCount += i;
    
                // Apply set filters to unmatched elements
                // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
                // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
                // no element matchers and no seed.
                // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
                // case, which will result in a "00" `matchedCount` that differs from `i` but is also
                // numerically zero.
                if ( bySet && i !== matchedCount ) {
                    j = 0;
                    while ( ( matcher = setMatchers[ j++ ] ) ) {
                        matcher( unmatched, setMatched, context, xml );
                    }
    
                    if ( seed ) {
    
                        // Reintegrate element matches to eliminate the need for sorting
                        if ( matchedCount > 0 ) {
                            while ( i-- ) {
                                if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
                                    setMatched[ i ] = pop.call( results );
                                }
                            }
                        }
    
                        // Discard index placeholder values to get only actual matches
                        setMatched = condense( setMatched );
                    }
    
                    // Add matches to results
                    push.apply( results, setMatched );
    
                    // Seedless set matches succeeding multiple successful matchers stipulate sorting
                    if ( outermost && !seed && setMatched.length > 0 &&
                        ( matchedCount + setMatchers.length ) > 1 ) {
    
                        Sizzle.uniqueSort( results );
                    }
                }
    
                // Override manipulation of globals by nested matchers
                if ( outermost ) {
                    dirruns = dirrunsUnique;
                    outermostContext = contextBackup;
                }
    
                return unmatched;
            };
    
        return bySet ?
            markFunction( superMatcher ) :
            superMatcher;
    }
    
    compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
        var i,
            setMatchers = [],
            elementMatchers = [],
            cached = compilerCache[ selector + " " ];
    
        if ( !cached ) {
    
            // Generate a function of recursive functions that can be used to check each element
            if ( !match ) {
                match = tokenize( selector );
            }
            i = match.length;
            while ( i-- ) {
                cached = matcherFromTokens( match[ i ] );
                if ( cached[ expando ] ) {
                    setMatchers.push( cached );
                } else {
                    elementMatchers.push( cached );
                }
            }
    
            // Cache the compiled function
            cached = compilerCache(
                selector,
                matcherFromGroupMatchers( elementMatchers, setMatchers )
            );
    
            // Save selector and tokenization
            cached.selector = selector;
        }
        return cached;
    };
    
    /**
     * A low-level selection function that works with Sizzle's compiled
     *  selector functions
     * @param {String|Function} selector A selector or a pre-compiled
     *  selector function built with Sizzle.compile
     * @param {Element} context
     * @param {Array} [results]
     * @param {Array} [seed] A set of elements to match against
     */
    select = Sizzle.select = function( selector, context, results, seed ) {
        var i, tokens, token, type, find,
            compiled = typeof selector === "function" && selector,
            match = !seed && tokenize( ( selector = compiled.selector || selector ) );
    
        results = results || [];
    
        // Try to minimize operations if there is only one selector in the list and no seed
        // (the latter of which guarantees us context)
        if ( match.length === 1 ) {
    
            // Reduce context if the leading compound selector is an ID
            tokens = match[ 0 ] = match[ 0 ].slice( 0 );
            if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
                context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {
    
                context = ( Expr.find[ "ID" ]( token.matches[ 0 ]
                    .replace( runescape, funescape ), context ) || [] )[ 0 ];
                if ( !context ) {
                    return results;
    
                // Precompiled matchers will still verify ancestry, so step up a level
                } else if ( compiled ) {
                    context = context.parentNode;
                }
    
                selector = selector.slice( tokens.shift().value.length );
            }
    
            // Fetch a seed set for right-to-left matching
            i = matchExpr[ "needsContext" ].test( selector ) ? 0 : tokens.length;
            while ( i-- ) {
                token = tokens[ i ];
    
                // Abort if we hit a combinator
                if ( Expr.relative[ ( type = token.type ) ] ) {
                    break;
                }
                if ( ( find = Expr.find[ type ] ) ) {
    
                    // Search, expanding context for leading sibling combinators
                    if ( ( seed = find(
                        token.matches[ 0 ].replace( runescape, funescape ),
                        rsibling.test( tokens[ 0 ].type ) && testContext( context.parentNode ) ||
                            context
                    ) ) ) {
    
                        // If seed is empty or no tokens remain, we can return early
                        tokens.splice( i, 1 );
                        selector = seed.length && toSelector( tokens );
                        if ( !selector ) {
                            push.apply( results, seed );
                            return results;
                        }
    
                        break;
                    }
                }
            }
        }
    
        // Compile and execute a filtering function if one is not provided
        // Provide `match` to avoid retokenization if we modified the selector above
        ( compiled || compile( selector, match ) )(
            seed,
            context,
            !documentIsHTML,
            results,
            !context || rsibling.test( selector ) && testContext( context.parentNode ) || context
        );
        return results;
    };
    
    // One-time assignments
    
    // Sort stability
    support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;
    
    // Support: Chrome 14-35+
    // Always assume duplicates if they aren't passed to the comparison function
    support.detectDuplicates = !!hasDuplicate;
    
    // Initialize against the default document
    setDocument();
    
    // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
    // Detached nodes confoundingly follow *each other*
    support.sortDetached = assert( function( el ) {
    
        // Should return 1, but returns 4 (following)
        return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
    } );
    
    // Support: IE<8
    // Prevent attribute/property "interpolation"
    // https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
    if ( !assert( function( el ) {
        el.innerHTML = "<a href='#'></a>";
        return el.firstChild.getAttribute( "href" ) === "#";
    } ) ) {
        addHandle( "type|href|height|width", function( elem, name, isXML ) {
            if ( !isXML ) {
                return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
            }
        } );
    }
    
    // Support: IE<9
    // Use defaultValue in place of getAttribute("value")
    if ( !support.attributes || !assert( function( el ) {
        el.innerHTML = "<input/>";
        el.firstChild.setAttribute( "value", "" );
        return el.firstChild.getAttribute( "value" ) === "";
    } ) ) {
        addHandle( "value", function( elem, _name, isXML ) {
            if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
                return elem.defaultValue;
            }
        } );
    }
    
    // Support: IE<9
    // Use getAttributeNode to fetch booleans when getAttribute lies
    if ( !assert( function( el ) {
        return el.getAttribute( "disabled" ) == null;
    } ) ) {
        addHandle( booleans, function( elem, name, isXML ) {
            var val;
            if ( !isXML ) {
                return elem[ name ] === true ? name.toLowerCase() :
                    ( val = elem.getAttributeNode( name ) ) && val.specified ?
                        val.value :
                        null;
            }
        } );
    }
    
    return Sizzle;
    
    } )( window );
    
    
    
    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    
    // Deprecated
    jQuery.expr[ ":" ] = jQuery.expr.pseudos;
    jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
    jQuery.escapeSelector = Sizzle.escape;
    
    
    
    
    var dir = function( elem, dir, until ) {
        var matched = [],
            truncate = until !== undefined;
    
        while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
            if ( elem.nodeType === 1 ) {
                if ( truncate && jQuery( elem ).is( until ) ) {
                    break;
                }
                matched.push( elem );
            }
        }
        return matched;
    };
    
    
    var siblings = function( n, elem ) {
        var matched = [];
    
        for ( ; n; n = n.nextSibling ) {
            if ( n.nodeType === 1 && n !== elem ) {
                matched.push( n );
            }
        }
    
        return matched;
    };
    
    
    var rneedsContext = jQuery.expr.match.needsContext;
    
    
    
    function nodeName( elem, name ) {
    
        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    
    }
    var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );
    
    
    
    // Implement the identical functionality for filter and not
    function winnow( elements, qualifier, not ) {
        if ( isFunction( qualifier ) ) {
            return jQuery.grep( elements, function( elem, i ) {
                return !!qualifier.call( elem, i, elem ) !== not;
            } );
        }
    
        // Single element
        if ( qualifier.nodeType ) {
            return jQuery.grep( elements, function( elem ) {
                return ( elem === qualifier ) !== not;
            } );
        }
    
        // Arraylike of elements (jQuery, arguments, Array)
        if ( typeof qualifier !== "string" ) {
            return jQuery.grep( elements, function( elem ) {
                return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
            } );
        }
    
        // Filtered directly for both simple and complex selectors
        return jQuery.filter( qualifier, elements, not );
    }
    
    jQuery.filter = function( expr, elems, not ) {
        var elem = elems[ 0 ];
    
        if ( not ) {
            expr = ":not(" + expr + ")";
        }
    
        if ( elems.length === 1 && elem.nodeType === 1 ) {
            return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
        }
    
        return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
            return elem.nodeType === 1;
        } ) );
    };
    
    jQuery.fn.extend( {
        find: function( selector ) {
            var i, ret,
                len = this.length,
                self = this;
    
            if ( typeof selector !== "string" ) {
                return this.pushStack( jQuery( selector ).filter( function() {
                    for ( i = 0; i < len; i++ ) {
                        if ( jQuery.contains( self[ i ], this ) ) {
                            return true;
                        }
                    }
                } ) );
            }
    
            ret = this.pushStack( [] );
    
            for ( i = 0; i < len; i++ ) {
                jQuery.find( selector, self[ i ], ret );
            }
    
            return len > 1 ? jQuery.uniqueSort( ret ) : ret;
        },
        filter: function( selector ) {
            return this.pushStack( winnow( this, selector || [], false ) );
        },
        not: function( selector ) {
            return this.pushStack( winnow( this, selector || [], true ) );
        },
        is: function( selector ) {
            return !!winnow(
                this,
    
                // If this is a positional/relative selector, check membership in the returned set
                // so $("p:first").is("p:last") won't return true for a doc with two "p".
                typeof selector === "string" && rneedsContext.test( selector ) ?
                    jQuery( selector ) :
                    selector || [],
                false
            ).length;
        }
    } );
    
    
    // Initialize a jQuery object
    
    
    // A central reference to the root jQuery(document)
    var rootjQuery,
    
        // A simple way to check for HTML strings
        // Prioritize #id over <tag> to avoid XSS via location.hash (trac-9521)
        // Strict HTML recognition (trac-11290: must start with <)
        // Shortcut simple #id case for speed
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
    
        init = jQuery.fn.init = function( selector, context, root ) {
            var match, elem;
    
            // HANDLE: $(""), $(null), $(undefined), $(false)
            if ( !selector ) {
                return this;
            }
    
            // Method init() accepts an alternate rootjQuery
            // so migrate can support jQuery.sub (gh-2101)
            root = root || rootjQuery;
    
            // Handle HTML strings
            if ( typeof selector === "string" ) {
                if ( selector[ 0 ] === "<" &&
                    selector[ selector.length - 1 ] === ">" &&
                    selector.length >= 3 ) {
    
                    // Assume that strings that start and end with <> are HTML and skip the regex check
                    match = [ null, selector, null ];
    
                } else {
                    match = rquickExpr.exec( selector );
                }
    
                // Match html or make sure no context is specified for #id
                if ( match && ( match[ 1 ] || !context ) ) {
    
                    // HANDLE: $(html) -> $(array)
                    if ( match[ 1 ] ) {
                        context = context instanceof jQuery ? context[ 0 ] : context;
    
                        // Option to run scripts is true for back-compat
                        // Intentionally let the error be thrown if parseHTML is not present
                        jQuery.merge( this, jQuery.parseHTML(
                            match[ 1 ],
                            context && context.nodeType ? context.ownerDocument || context : document,
                            true
                        ) );
    
                        // HANDLE: $(html, props)
                        if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
                            for ( match in context ) {
    
                                // Properties of context are called as methods if possible
                                if ( isFunction( this[ match ] ) ) {
                                    this[ match ]( context[ match ] );
    
                                // ...and otherwise set as attributes
                                } else {
                                    this.attr( match, context[ match ] );
                                }
                            }
                        }
    
                        return this;
    
                    // HANDLE: $(#id)
                    } else {
                        elem = document.getElementById( match[ 2 ] );
    
                        if ( elem ) {
    
                            // Inject the element directly into the jQuery object
                            this[ 0 ] = elem;
                            this.length = 1;
                        }
                        return this;
                    }
    
                // HANDLE: $(expr, $(...))
                } else if ( !context || context.jquery ) {
                    return ( context || root ).find( selector );
    
                // HANDLE: $(expr, context)
                // (which is just equivalent to: $(context).find(expr)
                } else {
                    return this.constructor( context ).find( selector );
                }
    
            // HANDLE: $(DOMElement)
            } else if ( selector.nodeType ) {
                this[ 0 ] = selector;
                this.length = 1;
                return this;
    
            // HANDLE: $(function)
            // Shortcut for document ready
            } else if ( isFunction( selector ) ) {
                return root.ready !== undefined ?
                    root.ready( selector ) :
    
                    // Execute immediately if ready is not present
                    selector( jQuery );
            }
    
            return jQuery.makeArray( selector, this );
        };
    
    // Give the init function the jQuery prototype for later instantiation
    init.prototype = jQuery.fn;
    
    // Initialize central reference
    rootjQuery = jQuery( document );
    
    
    var rparentsprev = /^(?:parents|prev(?:Until|All))/,
    
        // Methods guaranteed to produce a unique set when starting from a unique set
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
    
    jQuery.fn.extend( {
        has: function( target ) {
            var targets = jQuery( target, this ),
                l = targets.length;
    
            return this.filter( function() {
                var i = 0;
                for ( ; i < l; i++ ) {
                    if ( jQuery.contains( this, targets[ i ] ) ) {
                        return true;
                    }
                }
            } );
        },
    
        closest: function( selectors, context ) {
            var cur,
                i = 0,
                l = this.length,
                matched = [],
                targets = typeof selectors !== "string" && jQuery( selectors );
    
            // Positional selectors never match, since there's no _selection_ context
            if ( !rneedsContext.test( selectors ) ) {
                for ( ; i < l; i++ ) {
                    for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {
    
                        // Always skip document fragments
                        if ( cur.nodeType < 11 && ( targets ?
                            targets.index( cur ) > -1 :
    
                            // Don't pass non-elements to Sizzle
                            cur.nodeType === 1 &&
                                jQuery.find.matchesSelector( cur, selectors ) ) ) {
    
                            matched.push( cur );
                            break;
                        }
                    }
                }
            }
    
            return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
        },
    
        // Determine the position of an element within the set
        index: function( elem ) {
    
            // No argument, return index in parent
            if ( !elem ) {
                return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
            }
    
            // Index in selector
            if ( typeof elem === "string" ) {
                return indexOf.call( jQuery( elem ), this[ 0 ] );
            }
    
            // Locate the position of the desired element
            return indexOf.call( this,
    
                // If it receives a jQuery object, the first element is used
                elem.jquery ? elem[ 0 ] : elem
            );
        },
    
        add: function( selector, context ) {
            return this.pushStack(
                jQuery.uniqueSort(
                    jQuery.merge( this.get(), jQuery( selector, context ) )
                )
            );
        },
    
        addBack: function( selector ) {
            return this.add( selector == null ?
                this.prevObject : this.prevObject.filter( selector )
            );
        }
    } );
    
    function sibling( cur, dir ) {
        while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
        return cur;
    }
    
    jQuery.each( {
        parent: function( elem ) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function( elem ) {
            return dir( elem, "parentNode" );
        },
        parentsUntil: function( elem, _i, until ) {
            return dir( elem, "parentNode", until );
        },
        next: function( elem ) {
            return sibling( elem, "nextSibling" );
        },
        prev: function( elem ) {
            return sibling( elem, "previousSibling" );
        },
        nextAll: function( elem ) {
            return dir( elem, "nextSibling" );
        },
        prevAll: function( elem ) {
            return dir( elem, "previousSibling" );
        },
        nextUntil: function( elem, _i, until ) {
            return dir( elem, "nextSibling", until );
        },
        prevUntil: function( elem, _i, until ) {
            return dir( elem, "previousSibling", until );
        },
        siblings: function( elem ) {
            return siblings( ( elem.parentNode || {} ).firstChild, elem );
        },
        children: function( elem ) {
            return siblings( elem.firstChild );
        },
        contents: function( elem ) {
            if ( elem.contentDocument != null &&
    
                // Support: IE 11+
                // <object> elements with no `data` attribute has an object
                // `contentDocument` with a `null` prototype.
                getProto( elem.contentDocument ) ) {
    
                return elem.contentDocument;
            }
    
            // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
            // Treat the template element as a regular one in browsers that
            // don't support it.
            if ( nodeName( elem, "template" ) ) {
                elem = elem.content || elem;
            }
    
            return jQuery.merge( [], elem.childNodes );
        }
    }, function( name, fn ) {
        jQuery.fn[ name ] = function( until, selector ) {
            var matched = jQuery.map( this, fn, until );
    
            if ( name.slice( -5 ) !== "Until" ) {
                selector = until;
            }
    
            if ( selector && typeof selector === "string" ) {
                matched = jQuery.filter( selector, matched );
            }
    
            if ( this.length > 1 ) {
    
                // Remove duplicates
                if ( !guaranteedUnique[ name ] ) {
                    jQuery.uniqueSort( matched );
                }
    
                // Reverse order for parents* and prev-derivatives
                if ( rparentsprev.test( name ) ) {
                    matched.reverse();
                }
            }
    
            return this.pushStack( matched );
        };
    } );
    var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );
    
    
    
    // Convert String-formatted options into Object-formatted ones
    function createOptions( options ) {
        var object = {};
        jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
            object[ flag ] = true;
        } );
        return object;
    }
    
    /*
     * Create a callback list using the following parameters:
     *
     *	options: an optional list of space-separated options that will change how
     *			the callback list behaves or a more traditional option object
     *
     * By default a callback list will act like an event callback list and can be
     * "fired" multiple times.
     *
     * Possible options:
     *
     *	once:			will ensure the callback list can only be fired once (like a Deferred)
     *
     *	memory:			will keep track of previous values and will call any callback added
     *					after the list has been fired right away with the latest "memorized"
     *					values (like a Deferred)
     *
     *	unique:			will ensure a callback can only be added once (no duplicate in the list)
     *
     *	stopOnFalse:	interrupt callings when a callback returns false
     *
     */
    jQuery.Callbacks = function( options ) {
    
        // Convert options from String-formatted to Object-formatted if needed
        // (we check in cache first)
        options = typeof options === "string" ?
            createOptions( options ) :
            jQuery.extend( {}, options );
    
        var // Flag to know if list is currently firing
            firing,
    
            // Last fire value for non-forgettable lists
            memory,
    
            // Flag to know if list was already fired
            fired,
    
            // Flag to prevent firing
            locked,
    
            // Actual callback list
            list = [],
    
            // Queue of execution data for repeatable lists
            queue = [],
    
            // Index of currently firing callback (modified by add/remove as needed)
            firingIndex = -1,
    
            // Fire callbacks
            fire = function() {
    
                // Enforce single-firing
                locked = locked || options.once;
    
                // Execute callbacks for all pending executions,
                // respecting firingIndex overrides and runtime changes
                fired = firing = true;
                for ( ; queue.length; firingIndex = -1 ) {
                    memory = queue.shift();
                    while ( ++firingIndex < list.length ) {
    
                        // Run callback and check for early termination
                        if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
                            options.stopOnFalse ) {
    
                            // Jump to end and forget the data so .add doesn't re-fire
                            firingIndex = list.length;
                            memory = false;
                        }
                    }
                }
    
                // Forget the data if we're done with it
                if ( !options.memory ) {
                    memory = false;
                }
    
                firing = false;
    
                // Clean up if we're done firing for good
                if ( locked ) {
    
                    // Keep an empty list if we have data for future add calls
                    if ( memory ) {
                        list = [];
    
                    // Otherwise, this object is spent
                    } else {
                        list = "";
                    }
                }
            },
    
            // Actual Callbacks object
            self = {
    
                // Add a callback or a collection of callbacks to the list
                add: function() {
                    if ( list ) {
    
                        // If we have memory from a past run, we should fire after adding
                        if ( memory && !firing ) {
                            firingIndex = list.length - 1;
                            queue.push( memory );
                        }
    
                        ( function add( args ) {
                            jQuery.each( args, function( _, arg ) {
                                if ( isFunction( arg ) ) {
                                    if ( !options.unique || !self.has( arg ) ) {
                                        list.push( arg );
                                    }
                                } else if ( arg && arg.length && toType( arg ) !== "string" ) {
    
                                    // Inspect recursively
                                    add( arg );
                                }
                            } );
                        } )( arguments );
    
                        if ( memory && !firing ) {
                            fire();
                        }
                    }
                    return this;
                },
    
                // Remove a callback from the list
                remove: function() {
                    jQuery.each( arguments, function( _, arg ) {
                        var index;
                        while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
                            list.splice( index, 1 );
    
                            // Handle firing indexes
                            if ( index <= firingIndex ) {
                                firingIndex--;
                            }
                        }
                    } );
                    return this;
                },
    
                // Check if a given callback is in the list.
                // If no argument is given, return whether or not list has callbacks attached.
                has: function( fn ) {
                    return fn ?
                        jQuery.inArray( fn, list ) > -1 :
                        list.length > 0;
                },
    
                // Remove all callbacks from the list
                empty: function() {
                    if ( list ) {
                        list = [];
                    }
                    return this;
                },
    
                // Disable .fire and .add
                // Abort any current/pending executions
                // Clear all callbacks and values
                disable: function() {
                    locked = queue = [];
                    list = memory = "";
                    return this;
                },
                disabled: function() {
                    return !list;
                },
    
                // Disable .fire
                // Also disable .add unless we have memory (since it would have no effect)
                // Abort any pending executions
                lock: function() {
                    locked = queue = [];
                    if ( !memory && !firing ) {
                        list = memory = "";
                    }
                    return this;
                },
                locked: function() {
                    return !!locked;
                },
    
                // Call all callbacks with the given context and arguments
                fireWith: function( context, args ) {
                    if ( !locked ) {
                        args = args || [];
                        args = [ context, args.slice ? args.slice() : args ];
                        queue.push( args );
                        if ( !firing ) {
                            fire();
                        }
                    }
                    return this;
                },
    
                // Call all the callbacks with the given arguments
                fire: function() {
                    self.fireWith( this, arguments );
                    return this;
                },
    
                // To know if the callbacks have already been called at least once
                fired: function() {
                    return !!fired;
                }
            };
    
        return self;
    };
    
    
    function Identity( v ) {
        return v;
    }
    function Thrower( ex ) {
        throw ex;
    }
    
    function adoptValue( value, resolve, reject, noValue ) {
        var method;
    
        try {
    
            // Check for promise aspect first to privilege synchronous behavior
            if ( value && isFunction( ( method = value.promise ) ) ) {
                method.call( value ).done( resolve ).fail( reject );
    
            // Other thenables
            } else if ( value && isFunction( ( method = value.then ) ) ) {
                method.call( value, resolve, reject );
    
            // Other non-thenables
            } else {
    
                // Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
                // * false: [ value ].slice( 0 ) => resolve( value )
                // * true: [ value ].slice( 1 ) => resolve()
                resolve.apply( undefined, [ value ].slice( noValue ) );
            }
    
        // For Promises/A+, convert exceptions into rejections
        // Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
        // Deferred#then to conditionally suppress rejection.
        } catch ( value ) {
    
            // Support: Android 4.0 only
            // Strict mode functions invoked without .call/.apply get global-object context
            reject.apply( undefined, [ value ] );
        }
    }
    
    jQuery.extend( {
    
        Deferred: function( func ) {
            var tuples = [
    
                    // action, add listener, callbacks,
                    // ... .then handlers, argument index, [final state]
                    [ "notify", "progress", jQuery.Callbacks( "memory" ),
                        jQuery.Callbacks( "memory" ), 2 ],
                    [ "resolve", "done", jQuery.Callbacks( "once memory" ),
                        jQuery.Callbacks( "once memory" ), 0, "resolved" ],
                    [ "reject", "fail", jQuery.Callbacks( "once memory" ),
                        jQuery.Callbacks( "once memory" ), 1, "rejected" ]
                ],
                state = "pending",
                promise = {
                    state: function() {
                        return state;
                    },
                    always: function() {
                        deferred.done( arguments ).fail( arguments );
                        return this;
                    },
                    "catch": function( fn ) {
                        return promise.then( null, fn );
                    },
    
                    // Keep pipe for back-compat
                    pipe: function( /* fnDone, fnFail, fnProgress */ ) {
                        var fns = arguments;
    
                        return jQuery.Deferred( function( newDefer ) {
                            jQuery.each( tuples, function( _i, tuple ) {
    
                                // Map tuples (progress, done, fail) to arguments (done, fail, progress)
                                var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];
    
                                // deferred.progress(function() { bind to newDefer or newDefer.notify })
                                // deferred.done(function() { bind to newDefer or newDefer.resolve })
                                // deferred.fail(function() { bind to newDefer or newDefer.reject })
                                deferred[ tuple[ 1 ] ]( function() {
                                    var returned = fn && fn.apply( this, arguments );
                                    if ( returned && isFunction( returned.promise ) ) {
                                        returned.promise()
                                            .progress( newDefer.notify )
                                            .done( newDefer.resolve )
                                            .fail( newDefer.reject );
                                    } else {
                                        newDefer[ tuple[ 0 ] + "With" ](
                                            this,
                                            fn ? [ returned ] : arguments
                                        );
                                    }
                                } );
                            } );
                            fns = null;
                        } ).promise();
                    },
                    then: function( onFulfilled, onRejected, onProgress ) {
                        var maxDepth = 0;
                        function resolve( depth, deferred, handler, special ) {
                            return function() {
                                var that = this,
                                    args = arguments,
                                    mightThrow = function() {
                                        var returned, then;
    
                                        // Support: Promises/A+ section 2.3.3.3.3
                                        // https://promisesaplus.com/#point-59
                                        // Ignore double-resolution attempts
                                        if ( depth < maxDepth ) {
                                            return;
                                        }
    
                                        returned = handler.apply( that, args );
    
                                        // Support: Promises/A+ section 2.3.1
                                        // https://promisesaplus.com/#point-48
                                        if ( returned === deferred.promise() ) {
                                            throw new TypeError( "Thenable self-resolution" );
                                        }
    
                                        // Support: Promises/A+ sections 2.3.3.1, 3.5
                                        // https://promisesaplus.com/#point-54
                                        // https://promisesaplus.com/#point-75
                                        // Retrieve `then` only once
                                        then = returned &&
    
                                            // Support: Promises/A+ section 2.3.4
                                            // https://promisesaplus.com/#point-64
                                            // Only check objects and functions for thenability
                                            ( typeof returned === "object" ||
                                                typeof returned === "function" ) &&
                                            returned.then;
    
                                        // Handle a returned thenable
                                        if ( isFunction( then ) ) {
    
                                            // Special processors (notify) just wait for resolution
                                            if ( special ) {
                                                then.call(
                                                    returned,
                                                    resolve( maxDepth, deferred, Identity, special ),
                                                    resolve( maxDepth, deferred, Thrower, special )
                                                );
    
                                            // Normal processors (resolve) also hook into progress
                                            } else {
    
                                                // ...and disregard older resolution values
                                                maxDepth++;
    
                                                then.call(
                                                    returned,
                                                    resolve( maxDepth, deferred, Identity, special ),
                                                    resolve( maxDepth, deferred, Thrower, special ),
                                                    resolve( maxDepth, deferred, Identity,
                                                        deferred.notifyWith )
                                                );
                                            }
    
                                        // Handle all other returned values
                                        } else {
    
                                            // Only substitute handlers pass on context
                                            // and multiple values (non-spec behavior)
                                            if ( handler !== Identity ) {
                                                that = undefined;
                                                args = [ returned ];
                                            }
    
                                            // Process the value(s)
                                            // Default process is resolve
                                            ( special || deferred.resolveWith )( that, args );
                                        }
                                    },
    
                                    // Only normal processors (resolve) catch and reject exceptions
                                    process = special ?
                                        mightThrow :
                                        function() {
                                            try {
                                                mightThrow();
                                            } catch ( e ) {
    
                                                if ( jQuery.Deferred.exceptionHook ) {
                                                    jQuery.Deferred.exceptionHook( e,
                                                        process.stackTrace );
                                                }
    
                                                // Support: Promises/A+ section 2.3.3.3.4.1
                                                // https://promisesaplus.com/#point-61
                                                // Ignore post-resolution exceptions
                                                if ( depth + 1 >= maxDepth ) {
    
                                                    // Only substitute handlers pass on context
                                                    // and multiple values (non-spec behavior)
                                                    if ( handler !== Thrower ) {
                                                        that = undefined;
                                                        args = [ e ];
                                                    }
    
                                                    deferred.rejectWith( that, args );
                                                }
                                            }
                                        };
    
                                // Support: Promises/A+ section 2.3.3.3.1
                                // https://promisesaplus.com/#point-57
                                // Re-resolve promises immediately to dodge false rejection from
                                // subsequent errors
                                if ( depth ) {
                                    process();
                                } else {
    
                                    // Call an optional hook to record the stack, in case of exception
                                    // since it's otherwise lost when execution goes async
                                    if ( jQuery.Deferred.getStackHook ) {
                                        process.stackTrace = jQuery.Deferred.getStackHook();
                                    }
                                    window.setTimeout( process );
                                }
                            };
                        }
    
                        return jQuery.Deferred( function( newDefer ) {
    
                            // progress_handlers.add( ... )
                            tuples[ 0 ][ 3 ].add(
                                resolve(
                                    0,
                                    newDefer,
                                    isFunction( onProgress ) ?
                                        onProgress :
                                        Identity,
                                    newDefer.notifyWith
                                )
                            );
    
                            // fulfilled_handlers.add( ... )
                            tuples[ 1 ][ 3 ].add(
                                resolve(
                                    0,
                                    newDefer,
                                    isFunction( onFulfilled ) ?
                                        onFulfilled :
                                        Identity
                                )
                            );
    
                            // rejected_handlers.add( ... )
                            tuples[ 2 ][ 3 ].add(
                                resolve(
                                    0,
                                    newDefer,
                                    isFunction( onRejected ) ?
                                        onRejected :
                                        Thrower
                                )
                            );
                        } ).promise();
                    },
    
                    // Get a promise for this deferred
                    // If obj is provided, the promise aspect is added to the object
                    promise: function( obj ) {
                        return obj != null ? jQuery.extend( obj, promise ) : promise;
                    }
                },
                deferred = {};
    
            // Add list-specific methods
            jQuery.each( tuples, function( i, tuple ) {
                var list = tuple[ 2 ],
                    stateString = tuple[ 5 ];
    
                // promise.progress = list.add
                // promise.done = list.add
                // promise.fail = list.add
                promise[ tuple[ 1 ] ] = list.add;
    
                // Handle state
                if ( stateString ) {
                    list.add(
                        function() {
    
                            // state = "resolved" (i.e., fulfilled)
                            // state = "rejected"
                            state = stateString;
                        },
    
                        // rejected_callbacks.disable
                        // fulfilled_callbacks.disable
                        tuples[ 3 - i ][ 2 ].disable,
    
                        // rejected_handlers.disable
                        // fulfilled_handlers.disable
                        tuples[ 3 - i ][ 3 ].disable,
    
                        // progress_callbacks.lock
                        tuples[ 0 ][ 2 ].lock,
    
                        // progress_handlers.lock
                        tuples[ 0 ][ 3 ].lock
                    );
                }
    
                // progress_handlers.fire
                // fulfilled_handlers.fire
                // rejected_handlers.fire
                list.add( tuple[ 3 ].fire );
    
                // deferred.notify = function() { deferred.notifyWith(...) }
                // deferred.resolve = function() { deferred.resolveWith(...) }
                // deferred.reject = function() { deferred.rejectWith(...) }
                deferred[ tuple[ 0 ] ] = function() {
                    deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
                    return this;
                };
    
                // deferred.notifyWith = list.fireWith
                // deferred.resolveWith = list.fireWith
                // deferred.rejectWith = list.fireWith
                deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
            } );
    
            // Make the deferred a promise
            promise.promise( deferred );
    
            // Call given func if any
            if ( func ) {
                func.call( deferred, deferred );
            }
    
            // All done!
            return deferred;
        },
    
        // Deferred helper
        when: function( singleValue ) {
            var
    
                // count of uncompleted subordinates
                remaining = arguments.length,
    
                // count of unprocessed arguments
                i = remaining,
    
                // subordinate fulfillment data
                resolveContexts = Array( i ),
                resolveValues = slice.call( arguments ),
    
                // the primary Deferred
                primary = jQuery.Deferred(),
    
                // subordinate callback factory
                updateFunc = function( i ) {
                    return function( value ) {
                        resolveContexts[ i ] = this;
                        resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
                        if ( !( --remaining ) ) {
                            primary.resolveWith( resolveContexts, resolveValues );
                        }
                    };
                };
    
            // Single- and empty arguments are adopted like Promise.resolve
            if ( remaining <= 1 ) {
                adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
                    !remaining );
    
                // Use .then() to unwrap secondary thenables (cf. gh-3000)
                if ( primary.state() === "pending" ||
                    isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {
    
                    return primary.then();
                }
            }
    
            // Multiple arguments are aggregated like Promise.all array elements
            while ( i-- ) {
                adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
            }
    
            return primary.promise();
        }
    } );
    
    
    // These usually indicate a programmer mistake during development,
    // warn about them ASAP rather than swallowing them by default.
    var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    
    jQuery.Deferred.exceptionHook = function( error, stack ) {
    
        // Support: IE 8 - 9 only
        // Console exists when dev tools are open, which can happen at any time
        if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
            window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
        }
    };
    
    
    
    
    jQuery.readyException = function( error ) {
        window.setTimeout( function() {
            throw error;
        } );
    };
    
    
    
    
    // The deferred used on DOM ready
    var readyList = jQuery.Deferred();
    
    jQuery.fn.ready = function( fn ) {
    
        readyList
            .then( fn )
    
            // Wrap jQuery.readyException in a function so that the lookup
            // happens at the time of error handling instead of callback
            // registration.
            .catch( function( error ) {
                jQuery.readyException( error );
            } );
    
        return this;
    };
    
    jQuery.extend( {
    
        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: false,
    
        // A counter to track how many items to wait for before
        // the ready event fires. See trac-6781
        readyWait: 1,
    
        // Handle when the DOM is ready
        ready: function( wait ) {
    
            // Abort if there are pending holds or we're already ready
            if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
                return;
            }
    
            // Remember that the DOM is ready
            jQuery.isReady = true;
    
            // If a normal DOM Ready event fired, decrement, and wait if need be
            if ( wait !== true && --jQuery.readyWait > 0 ) {
                return;
            }
    
            // If there are functions bound, to execute
            readyList.resolveWith( document, [ jQuery ] );
        }
    } );
    
    jQuery.ready.then = readyList.then;
    
    // The ready event handler and self cleanup method
    function completed() {
        document.removeEventListener( "DOMContentLoaded", completed );
        window.removeEventListener( "load", completed );
        jQuery.ready();
    }
    
    // Catch cases where $(document).ready() is called
    // after the browser event has already occurred.
    // Support: IE <=9 - 10 only
    // Older IE sometimes signals "interactive" too soon
    if ( document.readyState === "complete" ||
        ( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {
    
        // Handle it asynchronously to allow scripts the opportunity to delay ready
        window.setTimeout( jQuery.ready );
    
    } else {
    
        // Use the handy event callback
        document.addEventListener( "DOMContentLoaded", completed );
    
        // A fallback to window.onload, that will always work
        window.addEventListener( "load", completed );
    }
    
    
    
    
    // Multifunctional method to get and set values of a collection
    // The value/s can optionally be executed if it's a function
    var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
        var i = 0,
            len = elems.length,
            bulk = key == null;
    
        // Sets many values
        if ( toType( key ) === "object" ) {
            chainable = true;
            for ( i in key ) {
                access( elems, fn, i, key[ i ], true, emptyGet, raw );
            }
    
        // Sets one value
        } else if ( value !== undefined ) {
            chainable = true;
    
            if ( !isFunction( value ) ) {
                raw = true;
            }
    
            if ( bulk ) {
    
                // Bulk operations run against the entire set
                if ( raw ) {
                    fn.call( elems, value );
                    fn = null;
    
                // ...except when executing function values
                } else {
                    bulk = fn;
                    fn = function( elem, _key, value ) {
                        return bulk.call( jQuery( elem ), value );
                    };
                }
            }
    
            if ( fn ) {
                for ( ; i < len; i++ ) {
                    fn(
                        elems[ i ], key, raw ?
                            value :
                            value.call( elems[ i ], i, fn( elems[ i ], key ) )
                    );
                }
            }
        }
    
        if ( chainable ) {
            return elems;
        }
    
        // Gets
        if ( bulk ) {
            return fn.call( elems );
        }
    
        return len ? fn( elems[ 0 ], key ) : emptyGet;
    };
    
    
    // Matches dashed string for camelizing
    var rmsPrefix = /^-ms-/,
        rdashAlpha = /-([a-z])/g;
    
    // Used by camelCase as callback to replace()
    function fcamelCase( _all, letter ) {
        return letter.toUpperCase();
    }
    
    // Convert dashed to camelCase; used by the css and data modules
    // Support: IE <=9 - 11, Edge 12 - 15
    // Microsoft forgot to hump their vendor prefix (trac-9572)
    function camelCase( string ) {
        return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
    }
    var acceptData = function( owner ) {
    
        // Accepts only:
        //  - Node
        //    - Node.ELEMENT_NODE
        //    - Node.DOCUMENT_NODE
        //  - Object
        //    - Any
        return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
    };
    
    
    
    
    function Data() {
        this.expando = jQuery.expando + Data.uid++;
    }
    
    Data.uid = 1;
    
    Data.prototype = {
    
        cache: function( owner ) {
    
            // Check if the owner object already has a cache
            var value = owner[ this.expando ];
    
            // If not, create one
            if ( !value ) {
                value = {};
    
                // We can accept data for non-element nodes in modern browsers,
                // but we should not, see trac-8335.
                // Always return an empty object.
                if ( acceptData( owner ) ) {
    
                    // If it is a node unlikely to be stringify-ed or looped over
                    // use plain assignment
                    if ( owner.nodeType ) {
                        owner[ this.expando ] = value;
    
                    // Otherwise secure it in a non-enumerable property
                    // configurable must be true to allow the property to be
                    // deleted when data is removed
                    } else {
                        Object.defineProperty( owner, this.expando, {
                            value: value,
                            configurable: true
                        } );
                    }
                }
            }
    
            return value;
        },
        set: function( owner, data, value ) {
            var prop,
                cache = this.cache( owner );
    
            // Handle: [ owner, key, value ] args
            // Always use camelCase key (gh-2257)
            if ( typeof data === "string" ) {
                cache[ camelCase( data ) ] = value;
    
            // Handle: [ owner, { properties } ] args
            } else {
    
                // Copy the properties one-by-one to the cache object
                for ( prop in data ) {
                    cache[ camelCase( prop ) ] = data[ prop ];
                }
            }
            return cache;
        },
        get: function( owner, key ) {
            return key === undefined ?
                this.cache( owner ) :
    
                // Always use camelCase key (gh-2257)
                owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
        },
        access: function( owner, key, value ) {
    
            // In cases where either:
            //
            //   1. No key was specified
            //   2. A string key was specified, but no value provided
            //
            // Take the "read" path and allow the get method to determine
            // which value to return, respectively either:
            //
            //   1. The entire cache object
            //   2. The data stored at the key
            //
            if ( key === undefined ||
                    ( ( key && typeof key === "string" ) && value === undefined ) ) {
    
                return this.get( owner, key );
            }
    
            // When the key is not a string, or both a key and value
            // are specified, set or extend (existing objects) with either:
            //
            //   1. An object of properties
            //   2. A key and value
            //
            this.set( owner, key, value );
    
            // Since the "set" path can have two possible entry points
            // return the expected data based on which path was taken[*]
            return value !== undefined ? value : key;
        },
        remove: function( owner, key ) {
            var i,
                cache = owner[ this.expando ];
    
            if ( cache === undefined ) {
                return;
            }
    
            if ( key !== undefined ) {
    
                // Support array or space separated string of keys
                if ( Array.isArray( key ) ) {
    
                    // If key is an array of keys...
                    // We always set camelCase keys, so remove that.
                    key = key.map( camelCase );
                } else {
                    key = camelCase( key );
    
                    // If a key with the spaces exists, use it.
                    // Otherwise, create an array by matching non-whitespace
                    key = key in cache ?
                        [ key ] :
                        ( key.match( rnothtmlwhite ) || [] );
                }
    
                i = key.length;
    
                while ( i-- ) {
                    delete cache[ key[ i ] ];
                }
            }
    
            // Remove the expando if there's no more data
            if ( key === undefined || jQuery.isEmptyObject( cache ) ) {
    
                // Support: Chrome <=35 - 45
                // Webkit & Blink performance suffers when deleting properties
                // from DOM nodes, so set to undefined instead
                // https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
                if ( owner.nodeType ) {
                    owner[ this.expando ] = undefined;
                } else {
                    delete owner[ this.expando ];
                }
            }
        },
        hasData: function( owner ) {
            var cache = owner[ this.expando ];
            return cache !== undefined && !jQuery.isEmptyObject( cache );
        }
    };
    var dataPriv = new Data();
    
    var dataUser = new Data();
    
    
    
    //	Implementation Summary
    //
    //	1. Enforce API surface and semantic compatibility with 1.9.x branch
    //	2. Improve the module's maintainability by reducing the storage
    //		paths to a single mechanism.
    //	3. Use the same single mechanism to support "private" and "user" data.
    //	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
    //	5. Avoid exposing implementation details on user objects (eg. expando properties)
    //	6. Provide a clear path for implementation upgrade to WeakMap in 2014
    
    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        rmultiDash = /[A-Z]/g;
    
    function getData( data ) {
        if ( data === "true" ) {
            return true;
        }
    
        if ( data === "false" ) {
            return false;
        }
    
        if ( data === "null" ) {
            return null;
        }
    
        // Only convert to a number if it doesn't change the string
        if ( data === +data + "" ) {
            return +data;
        }
    
        if ( rbrace.test( data ) ) {
            return JSON.parse( data );
        }
    
        return data;
    }
    
    function dataAttr( elem, key, data ) {
        var name;
    
        // If nothing was found internally, try to fetch any
        // data from the HTML5 data-* attribute
        if ( data === undefined && elem.nodeType === 1 ) {
            name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
            data = elem.getAttribute( name );
    
            if ( typeof data === "string" ) {
                try {
                    data = getData( data );
                } catch ( e ) {}
    
                // Make sure we set the data so it isn't changed later
                dataUser.set( elem, key, data );
            } else {
                data = undefined;
            }
        }
        return data;
    }
    
    jQuery.extend( {
        hasData: function( elem ) {
            return dataUser.hasData( elem ) || dataPriv.hasData( elem );
        },
    
        data: function( elem, name, data ) {
            return dataUser.access( elem, name, data );
        },
    
        removeData: function( elem, name ) {
            dataUser.remove( elem, name );
        },
    
        // TODO: Now that all calls to _data and _removeData have been replaced
        // with direct calls to dataPriv methods, these can be deprecated.
        _data: function( elem, name, data ) {
            return dataPriv.access( elem, name, data );
        },
    
        _removeData: function( elem, name ) {
            dataPriv.remove( elem, name );
        }
    } );
    
    jQuery.fn.extend( {
        data: function( key, value ) {
            var i, name, data,
                elem = this[ 0 ],
                attrs = elem && elem.attributes;
    
            // Gets all values
            if ( key === undefined ) {
                if ( this.length ) {
                    data = dataUser.get( elem );
    
                    if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
                        i = attrs.length;
                        while ( i-- ) {
    
                            // Support: IE 11 only
                            // The attrs elements can be null (trac-14894)
                            if ( attrs[ i ] ) {
                                name = attrs[ i ].name;
                                if ( name.indexOf( "data-" ) === 0 ) {
                                    name = camelCase( name.slice( 5 ) );
                                    dataAttr( elem, name, data[ name ] );
                                }
                            }
                        }
                        dataPriv.set( elem, "hasDataAttrs", true );
                    }
                }
    
                return data;
            }
    
            // Sets multiple values
            if ( typeof key === "object" ) {
                return this.each( function() {
                    dataUser.set( this, key );
                } );
            }
    
            return access( this, function( value ) {
                var data;
    
                // The calling jQuery object (element matches) is not empty
                // (and therefore has an element appears at this[ 0 ]) and the
                // `value` parameter was not undefined. An empty jQuery object
                // will result in `undefined` for elem = this[ 0 ] which will
                // throw an exception if an attempt to read a data cache is made.
                if ( elem && value === undefined ) {
    
                    // Attempt to get data from the cache
                    // The key will always be camelCased in Data
                    data = dataUser.get( elem, key );
                    if ( data !== undefined ) {
                        return data;
                    }
    
                    // Attempt to "discover" the data in
                    // HTML5 custom data-* attrs
                    data = dataAttr( elem, key );
                    if ( data !== undefined ) {
                        return data;
                    }
    
                    // We tried really hard, but the data doesn't exist.
                    return;
                }
    
                // Set the data...
                this.each( function() {
    
                    // We always store the camelCased key
                    dataUser.set( this, key, value );
                } );
            }, null, value, arguments.length > 1, null, true );
        },
    
        removeData: function( key ) {
            return this.each( function() {
                dataUser.remove( this, key );
            } );
        }
    } );
    
    
    jQuery.extend( {
        queue: function( elem, type, data ) {
            var queue;
    
            if ( elem ) {
                type = ( type || "fx" ) + "queue";
                queue = dataPriv.get( elem, type );
    
                // Speed up dequeue by getting out quickly if this is just a lookup
                if ( data ) {
                    if ( !queue || Array.isArray( data ) ) {
                        queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
                    } else {
                        queue.push( data );
                    }
                }
                return queue || [];
            }
        },
    
        dequeue: function( elem, type ) {
            type = type || "fx";
    
            var queue = jQuery.queue( elem, type ),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks( elem, type ),
                next = function() {
                    jQuery.dequeue( elem, type );
                };
    
            // If the fx queue is dequeued, always remove the progress sentinel
            if ( fn === "inprogress" ) {
                fn = queue.shift();
                startLength--;
            }
    
            if ( fn ) {
    
                // Add a progress sentinel to prevent the fx queue from being
                // automatically dequeued
                if ( type === "fx" ) {
                    queue.unshift( "inprogress" );
                }
    
                // Clear up the last queue stop function
                delete hooks.stop;
                fn.call( elem, next, hooks );
            }
    
            if ( !startLength && hooks ) {
                hooks.empty.fire();
            }
        },
    
        // Not public - generate a queueHooks object, or return the current one
        _queueHooks: function( elem, type ) {
            var key = type + "queueHooks";
            return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
                empty: jQuery.Callbacks( "once memory" ).add( function() {
                    dataPriv.remove( elem, [ type + "queue", key ] );
                } )
            } );
        }
    } );
    
    jQuery.fn.extend( {
        queue: function( type, data ) {
            var setter = 2;
    
            if ( typeof type !== "string" ) {
                data = type;
                type = "fx";
                setter--;
            }
    
            if ( arguments.length < setter ) {
                return jQuery.queue( this[ 0 ], type );
            }
    
            return data === undefined ?
                this :
                this.each( function() {
                    var queue = jQuery.queue( this, type, data );
    
                    // Ensure a hooks for this queue
                    jQuery._queueHooks( this, type );
    
                    if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
                        jQuery.dequeue( this, type );
                    }
                } );
        },
        dequeue: function( type ) {
            return this.each( function() {
                jQuery.dequeue( this, type );
            } );
        },
        clearQueue: function( type ) {
            return this.queue( type || "fx", [] );
        },
    
        // Get a promise resolved when queues of a certain type
        // are emptied (fx is the type by default)
        promise: function( type, obj ) {
            var tmp,
                count = 1,
                defer = jQuery.Deferred(),
                elements = this,
                i = this.length,
                resolve = function() {
                    if ( !( --count ) ) {
                        defer.resolveWith( elements, [ elements ] );
                    }
                };
    
            if ( typeof type !== "string" ) {
                obj = type;
                type = undefined;
            }
            type = type || "fx";
    
            while ( i-- ) {
                tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
                if ( tmp && tmp.empty ) {
                    count++;
                    tmp.empty.add( resolve );
                }
            }
            resolve();
            return defer.promise( obj );
        }
    } );
    var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;
    
    var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );
    
    
    var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
    
    var documentElement = document.documentElement;
    
    
    
        var isAttached = function( elem ) {
                return jQuery.contains( elem.ownerDocument, elem );
            },
            composed = { composed: true };
    
        // Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
        // Check attachment across shadow DOM boundaries when possible (gh-3504)
        // Support: iOS 10.0-10.2 only
        // Early iOS 10 versions support `attachShadow` but not `getRootNode`,
        // leading to errors. We need to check for `getRootNode`.
        if ( documentElement.getRootNode ) {
            isAttached = function( elem ) {
                return jQuery.contains( elem.ownerDocument, elem ) ||
                    elem.getRootNode( composed ) === elem.ownerDocument;
            };
        }
    var isHiddenWithinTree = function( elem, el ) {
    
            // isHiddenWithinTree might be called from jQuery#filter function;
            // in that case, element will be second argument
            elem = el || elem;
    
            // Inline style trumps all
            return elem.style.display === "none" ||
                elem.style.display === "" &&
    
                // Otherwise, check computed style
                // Support: Firefox <=43 - 45
                // Disconnected elements can have computed display: none, so first confirm that elem is
                // in the document.
                isAttached( elem ) &&
    
                jQuery.css( elem, "display" ) === "none";
        };
    
    
    
    function adjustCSS( elem, prop, valueParts, tween ) {
        var adjusted, scale,
            maxIterations = 20,
            currentValue = tween ?
                function() {
                    return tween.cur();
                } :
                function() {
                    return jQuery.css( elem, prop, "" );
                },
            initial = currentValue(),
            unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),
    
            // Starting value computation is required for potential unit mismatches
            initialInUnit = elem.nodeType &&
                ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
                rcssNum.exec( jQuery.css( elem, prop ) );
    
        if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {
    
            // Support: Firefox <=54
            // Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
            initial = initial / 2;
    
            // Trust units reported by jQuery.css
            unit = unit || initialInUnit[ 3 ];
    
            // Iteratively approximate from a nonzero starting point
            initialInUnit = +initial || 1;
    
            while ( maxIterations-- ) {
    
                // Evaluate and update our best guess (doubling guesses that zero out).
                // Finish if the scale equals or crosses 1 (making the old*new product non-positive).
                jQuery.style( elem, prop, initialInUnit + unit );
                if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
                    maxIterations = 0;
                }
                initialInUnit = initialInUnit / scale;
    
            }
    
            initialInUnit = initialInUnit * 2;
            jQuery.style( elem, prop, initialInUnit + unit );
    
            // Make sure we update the tween properties later on
            valueParts = valueParts || [];
        }
    
        if ( valueParts ) {
            initialInUnit = +initialInUnit || +initial || 0;
    
            // Apply relative offset (+=/-=) if specified
            adjusted = valueParts[ 1 ] ?
                initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
                +valueParts[ 2 ];
            if ( tween ) {
                tween.unit = unit;
                tween.start = initialInUnit;
                tween.end = adjusted;
            }
        }
        return adjusted;
    }
    
    
    var defaultDisplayMap = {};
    
    function getDefaultDisplay( elem ) {
        var temp,
            doc = elem.ownerDocument,
            nodeName = elem.nodeName,
            display = defaultDisplayMap[ nodeName ];
    
        if ( display ) {
            return display;
        }
    
        temp = doc.body.appendChild( doc.createElement( nodeName ) );
        display = jQuery.css( temp, "display" );
    
        temp.parentNode.removeChild( temp );
    
        if ( display === "none" ) {
            display = "block";
        }
        defaultDisplayMap[ nodeName ] = display;
    
        return display;
    }
    
    function showHide( elements, show ) {
        var display, elem,
            values = [],
            index = 0,
            length = elements.length;
    
        // Determine new display value for elements that need to change
        for ( ; index < length; index++ ) {
            elem = elements[ index ];
            if ( !elem.style ) {
                continue;
            }
    
            display = elem.style.display;
            if ( show ) {
    
                // Since we force visibility upon cascade-hidden elements, an immediate (and slow)
                // check is required in this first loop unless we have a nonempty display value (either
                // inline or about-to-be-restored)
                if ( display === "none" ) {
                    values[ index ] = dataPriv.get( elem, "display" ) || null;
                    if ( !values[ index ] ) {
                        elem.style.display = "";
                    }
                }
                if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
                    values[ index ] = getDefaultDisplay( elem );
                }
            } else {
                if ( display !== "none" ) {
                    values[ index ] = "none";
    
                    // Remember what we're overwriting
                    dataPriv.set( elem, "display", display );
                }
            }
        }
    
        // Set the display of the elements in a second loop to avoid constant reflow
        for ( index = 0; index < length; index++ ) {
            if ( values[ index ] != null ) {
                elements[ index ].style.display = values[ index ];
            }
        }
    
        return elements;
    }
    
    jQuery.fn.extend( {
        show: function() {
            return showHide( this, true );
        },
        hide: function() {
            return showHide( this );
        },
        toggle: function( state ) {
            if ( typeof state === "boolean" ) {
                return state ? this.show() : this.hide();
            }
    
            return this.each( function() {
                if ( isHiddenWithinTree( this ) ) {
                    jQuery( this ).show();
                } else {
                    jQuery( this ).hide();
                }
            } );
        }
    } );
    var rcheckableType = ( /^(?:checkbox|radio)$/i );
    
    var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );
    
    var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );
    
    
    
    ( function() {
        var fragment = document.createDocumentFragment(),
            div = fragment.appendChild( document.createElement( "div" ) ),
            input = document.createElement( "input" );
    
        // Support: Android 4.0 - 4.3 only
        // Check state lost if the name is set (trac-11217)
        // Support: Windows Web Apps (WWA)
        // `name` and `type` must use .setAttribute for WWA (trac-14901)
        input.setAttribute( "type", "radio" );
        input.setAttribute( "checked", "checked" );
        input.setAttribute( "name", "t" );
    
        div.appendChild( input );
    
        // Support: Android <=4.1 only
        // Older WebKit doesn't clone checked state correctly in fragments
        support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;
    
        // Support: IE <=11 only
        // Make sure textarea (and checkbox) defaultValue is properly cloned
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
    
        // Support: IE <=9 only
        // IE <=9 replaces <option> tags with their contents when inserted outside of
        // the select element.
        div.innerHTML = "<option></option>";
        support.option = !!div.lastChild;
    } )();
    
    
    // We have to close these tags to support XHTML (trac-13200)
    var wrapMap = {
    
        // XHTML parsers do not magically insert elements in the
        // same way that tag soup parsers do. So we cannot shorten
        // this by omitting <tbody> or other required elements.
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
    
        _default: [ 0, "", "" ]
    };
    
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    
    // Support: IE <=9 only
    if ( !support.option ) {
        wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
    }
    
    
    function getAll( context, tag ) {
    
        // Support: IE <=9 - 11 only
        // Use typeof to avoid zero-argument method invocation on host objects (trac-15151)
        var ret;
    
        if ( typeof context.getElementsByTagName !== "undefined" ) {
            ret = context.getElementsByTagName( tag || "*" );
    
        } else if ( typeof context.querySelectorAll !== "undefined" ) {
            ret = context.querySelectorAll( tag || "*" );
    
        } else {
            ret = [];
        }
    
        if ( tag === undefined || tag && nodeName( context, tag ) ) {
            return jQuery.merge( [ context ], ret );
        }
    
        return ret;
    }
    
    
    // Mark scripts as having already been evaluated
    function setGlobalEval( elems, refElements ) {
        var i = 0,
            l = elems.length;
    
        for ( ; i < l; i++ ) {
            dataPriv.set(
                elems[ i ],
                "globalEval",
                !refElements || dataPriv.get( refElements[ i ], "globalEval" )
            );
        }
    }
    
    
    var rhtml = /<|&#?\w+;/;
    
    function buildFragment( elems, context, scripts, selection, ignored ) {
        var elem, tmp, tag, wrap, attached, j,
            fragment = context.createDocumentFragment(),
            nodes = [],
            i = 0,
            l = elems.length;
    
        for ( ; i < l; i++ ) {
            elem = elems[ i ];
    
            if ( elem || elem === 0 ) {
    
                // Add nodes directly
                if ( toType( elem ) === "object" ) {
    
                    // Support: Android <=4.0 only, PhantomJS 1 only
                    // push.apply(_, arraylike) throws on ancient WebKit
                    jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );
    
                // Convert non-html into a text node
                } else if ( !rhtml.test( elem ) ) {
                    nodes.push( context.createTextNode( elem ) );
    
                // Convert html into DOM nodes
                } else {
                    tmp = tmp || fragment.appendChild( context.createElement( "div" ) );
    
                    // Deserialize a standard representation
                    tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
                    wrap = wrapMap[ tag ] || wrapMap._default;
                    tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];
    
                    // Descend through wrappers to the right content
                    j = wrap[ 0 ];
                    while ( j-- ) {
                        tmp = tmp.lastChild;
                    }
    
                    // Support: Android <=4.0 only, PhantomJS 1 only
                    // push.apply(_, arraylike) throws on ancient WebKit
                    jQuery.merge( nodes, tmp.childNodes );
    
                    // Remember the top-level container
                    tmp = fragment.firstChild;
    
                    // Ensure the created nodes are orphaned (trac-12392)
                    tmp.textContent = "";
                }
            }
        }
    
        // Remove wrapper from fragment
        fragment.textContent = "";
    
        i = 0;
        while ( ( elem = nodes[ i++ ] ) ) {
    
            // Skip elements already in the context collection (trac-4087)
            if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
                if ( ignored ) {
                    ignored.push( elem );
                }
                continue;
            }
    
            attached = isAttached( elem );
    
            // Append to fragment
            tmp = getAll( fragment.appendChild( elem ), "script" );
    
            // Preserve script evaluation history
            if ( attached ) {
                setGlobalEval( tmp );
            }
    
            // Capture executables
            if ( scripts ) {
                j = 0;
                while ( ( elem = tmp[ j++ ] ) ) {
                    if ( rscriptType.test( elem.type || "" ) ) {
                        scripts.push( elem );
                    }
                }
            }
        }
    
        return fragment;
    }
    
    
    var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
    
    function returnTrue() {
        return true;
    }
    
    function returnFalse() {
        return false;
    }
    
    // Support: IE <=9 - 11+
    // focus() and blur() are asynchronous, except when they are no-op.
    // So expect focus to be synchronous when the element is already active,
    // and blur to be synchronous when the element is not already active.
    // (focus and blur are always synchronous in other supported browsers,
    // this just defines when we can count on it).
    function expectSync( elem, type ) {
        return ( elem === safeActiveElement() ) === ( type === "focus" );
    }
    
    // Support: IE <=9 only
    // Accessing document.activeElement can throw unexpectedly
    // https://bugs.jquery.com/ticket/13393
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch ( err ) { }
    }
    
    function on( elem, types, selector, data, fn, one ) {
        var origFn, type;
    
        // Types can be a map of types/handlers
        if ( typeof types === "object" ) {
    
            // ( types-Object, selector, data )
            if ( typeof selector !== "string" ) {
    
                // ( types-Object, data )
                data = data || selector;
                selector = undefined;
            }
            for ( type in types ) {
                on( elem, type, selector, data, types[ type ], one );
            }
            return elem;
        }
    
        if ( data == null && fn == null ) {
    
            // ( types, fn )
            fn = selector;
            data = selector = undefined;
        } else if ( fn == null ) {
            if ( typeof selector === "string" ) {
    
                // ( types, selector, fn )
                fn = data;
                data = undefined;
            } else {
    
                // ( types, data, fn )
                fn = data;
                data = selector;
                selector = undefined;
            }
        }
        if ( fn === false ) {
            fn = returnFalse;
        } else if ( !fn ) {
            return elem;
        }
    
        if ( one === 1 ) {
            origFn = fn;
            fn = function( event ) {
    
                // Can use an empty set, since event contains the info
                jQuery().off( event );
                return origFn.apply( this, arguments );
            };
    
            // Use same guid so caller can remove using origFn
            fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
        }
        return elem.each( function() {
            jQuery.event.add( this, types, fn, data, selector );
        } );
    }
    
    /*
     * Helper functions for managing events -- not part of the public interface.
     * Props to Dean Edwards' addEvent library for many of the ideas.
     */
    jQuery.event = {
    
        global: {},
    
        add: function( elem, types, handler, data, selector ) {
    
            var handleObjIn, eventHandle, tmp,
                events, t, handleObj,
                special, handlers, type, namespaces, origType,
                elemData = dataPriv.get( elem );
    
            // Only attach events to objects that accept data
            if ( !acceptData( elem ) ) {
                return;
            }
    
            // Caller can pass in an object of custom data in lieu of the handler
            if ( handler.handler ) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }
    
            // Ensure that invalid selectors throw exceptions at attach time
            // Evaluate against documentElement in case elem is a non-element node (e.g., document)
            if ( selector ) {
                jQuery.find.matchesSelector( documentElement, selector );
            }
    
            // Make sure that the handler has a unique ID, used to find/remove it later
            if ( !handler.guid ) {
                handler.guid = jQuery.guid++;
            }
    
            // Init the element's event structure and main handler, if this is the first
            if ( !( events = elemData.events ) ) {
                events = elemData.events = Object.create( null );
            }
            if ( !( eventHandle = elemData.handle ) ) {
                eventHandle = elemData.handle = function( e ) {
    
                    // Discard the second event of a jQuery.event.trigger() and
                    // when an event is called after a page has unloaded
                    return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
                        jQuery.event.dispatch.apply( elem, arguments ) : undefined;
                };
            }
    
            // Handle multiple events separated by a space
            types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
            t = types.length;
            while ( t-- ) {
                tmp = rtypenamespace.exec( types[ t ] ) || [];
                type = origType = tmp[ 1 ];
                namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
    
                // There *must* be a type, no attaching namespace-only handlers
                if ( !type ) {
                    continue;
                }
    
                // If event changes its type, use the special event handlers for the changed type
                special = jQuery.event.special[ type ] || {};
    
                // If selector defined, determine special event api type, otherwise given type
                type = ( selector ? special.delegateType : special.bindType ) || type;
    
                // Update special based on newly reset type
                special = jQuery.event.special[ type ] || {};
    
                // handleObj is passed to all event handlers
                handleObj = jQuery.extend( {
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
                    namespace: namespaces.join( "." )
                }, handleObjIn );
    
                // Init the event handler queue if we're the first
                if ( !( handlers = events[ type ] ) ) {
                    handlers = events[ type ] = [];
                    handlers.delegateCount = 0;
    
                    // Only use addEventListener if the special events handler returns false
                    if ( !special.setup ||
                        special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
    
                        if ( elem.addEventListener ) {
                            elem.addEventListener( type, eventHandle );
                        }
                    }
                }
    
                if ( special.add ) {
                    special.add.call( elem, handleObj );
    
                    if ( !handleObj.handler.guid ) {
                        handleObj.handler.guid = handler.guid;
                    }
                }
    
                // Add to the element's handler list, delegates in front
                if ( selector ) {
                    handlers.splice( handlers.delegateCount++, 0, handleObj );
                } else {
                    handlers.push( handleObj );
                }
    
                // Keep track of which events have ever been used, for event optimization
                jQuery.event.global[ type ] = true;
            }
    
        },
    
        // Detach an event or set of events from an element
        remove: function( elem, types, handler, selector, mappedTypes ) {
    
            var j, origCount, tmp,
                events, t, handleObj,
                special, handlers, type, namespaces, origType,
                elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );
    
            if ( !elemData || !( events = elemData.events ) ) {
                return;
            }
    
            // Once for each type.namespace in types; type may be omitted
            types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
            t = types.length;
            while ( t-- ) {
                tmp = rtypenamespace.exec( types[ t ] ) || [];
                type = origType = tmp[ 1 ];
                namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
    
                // Unbind all events (on this namespace, if provided) for the element
                if ( !type ) {
                    for ( type in events ) {
                        jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
                    }
                    continue;
                }
    
                special = jQuery.event.special[ type ] || {};
                type = ( selector ? special.delegateType : special.bindType ) || type;
                handlers = events[ type ] || [];
                tmp = tmp[ 2 ] &&
                    new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );
    
                // Remove matching events
                origCount = j = handlers.length;
                while ( j-- ) {
                    handleObj = handlers[ j ];
    
                    if ( ( mappedTypes || origType === handleObj.origType ) &&
                        ( !handler || handler.guid === handleObj.guid ) &&
                        ( !tmp || tmp.test( handleObj.namespace ) ) &&
                        ( !selector || selector === handleObj.selector ||
                            selector === "**" && handleObj.selector ) ) {
                        handlers.splice( j, 1 );
    
                        if ( handleObj.selector ) {
                            handlers.delegateCount--;
                        }
                        if ( special.remove ) {
                            special.remove.call( elem, handleObj );
                        }
                    }
                }
    
                // Remove generic event handler if we removed something and no more handlers exist
                // (avoids potential for endless recursion during removal of special event handlers)
                if ( origCount && !handlers.length ) {
                    if ( !special.teardown ||
                        special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
    
                        jQuery.removeEvent( elem, type, elemData.handle );
                    }
    
                    delete events[ type ];
                }
            }
    
            // Remove data and the expando if it's no longer used
            if ( jQuery.isEmptyObject( events ) ) {
                dataPriv.remove( elem, "handle events" );
            }
        },
    
        dispatch: function( nativeEvent ) {
    
            var i, j, ret, matched, handleObj, handlerQueue,
                args = new Array( arguments.length ),
    
                // Make a writable jQuery.Event from the native event object
                event = jQuery.event.fix( nativeEvent ),
    
                handlers = (
                    dataPriv.get( this, "events" ) || Object.create( null )
                )[ event.type ] || [],
                special = jQuery.event.special[ event.type ] || {};
    
            // Use the fix-ed jQuery.Event rather than the (read-only) native event
            args[ 0 ] = event;
    
            for ( i = 1; i < arguments.length; i++ ) {
                args[ i ] = arguments[ i ];
            }
    
            event.delegateTarget = this;
    
            // Call the preDispatch hook for the mapped type, and let it bail if desired
            if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
                return;
            }
    
            // Determine handlers
            handlerQueue = jQuery.event.handlers.call( this, event, handlers );
    
            // Run delegates first; they may want to stop propagation beneath us
            i = 0;
            while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
                event.currentTarget = matched.elem;
    
                j = 0;
                while ( ( handleObj = matched.handlers[ j++ ] ) &&
                    !event.isImmediatePropagationStopped() ) {
    
                    // If the event is namespaced, then each handler is only invoked if it is
                    // specially universal or its namespaces are a superset of the event's.
                    if ( !event.rnamespace || handleObj.namespace === false ||
                        event.rnamespace.test( handleObj.namespace ) ) {
    
                        event.handleObj = handleObj;
                        event.data = handleObj.data;
    
                        ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
                            handleObj.handler ).apply( matched.elem, args );
    
                        if ( ret !== undefined ) {
                            if ( ( event.result = ret ) === false ) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }
    
            // Call the postDispatch hook for the mapped type
            if ( special.postDispatch ) {
                special.postDispatch.call( this, event );
            }
    
            return event.result;
        },
    
        handlers: function( event, handlers ) {
            var i, handleObj, sel, matchedHandlers, matchedSelectors,
                handlerQueue = [],
                delegateCount = handlers.delegateCount,
                cur = event.target;
    
            // Find delegate handlers
            if ( delegateCount &&
    
                // Support: IE <=9
                // Black-hole SVG <use> instance trees (trac-13180)
                cur.nodeType &&
    
                // Support: Firefox <=42
                // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
                // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
                // Support: IE 11 only
                // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
                !( event.type === "click" && event.button >= 1 ) ) {
    
                for ( ; cur !== this; cur = cur.parentNode || this ) {
    
                    // Don't check non-elements (trac-13208)
                    // Don't process clicks on disabled elements (trac-6911, trac-8165, trac-11382, trac-11764)
                    if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
                        matchedHandlers = [];
                        matchedSelectors = {};
                        for ( i = 0; i < delegateCount; i++ ) {
                            handleObj = handlers[ i ];
    
                            // Don't conflict with Object.prototype properties (trac-13203)
                            sel = handleObj.selector + " ";
    
                            if ( matchedSelectors[ sel ] === undefined ) {
                                matchedSelectors[ sel ] = handleObj.needsContext ?
                                    jQuery( sel, this ).index( cur ) > -1 :
                                    jQuery.find( sel, this, null, [ cur ] ).length;
                            }
                            if ( matchedSelectors[ sel ] ) {
                                matchedHandlers.push( handleObj );
                            }
                        }
                        if ( matchedHandlers.length ) {
                            handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
                        }
                    }
                }
            }
    
            // Add the remaining (directly-bound) handlers
            cur = this;
            if ( delegateCount < handlers.length ) {
                handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
            }
    
            return handlerQueue;
        },
    
        addProp: function( name, hook ) {
            Object.defineProperty( jQuery.Event.prototype, name, {
                enumerable: true,
                configurable: true,
    
                get: isFunction( hook ) ?
                    function() {
                        if ( this.originalEvent ) {
                            return hook( this.originalEvent );
                        }
                    } :
                    function() {
                        if ( this.originalEvent ) {
                            return this.originalEvent[ name ];
                        }
                    },
    
                set: function( value ) {
                    Object.defineProperty( this, name, {
                        enumerable: true,
                        configurable: true,
                        writable: true,
                        value: value
                    } );
                }
            } );
        },
    
        fix: function( originalEvent ) {
            return originalEvent[ jQuery.expando ] ?
                originalEvent :
                new jQuery.Event( originalEvent );
        },
    
        special: {
            load: {
    
                // Prevent triggered image.load events from bubbling to window.load
                noBubble: true
            },
            click: {
    
                // Utilize native event to ensure correct state for checkable inputs
                setup: function( data ) {
    
                    // For mutual compressibility with _default, replace `this` access with a local var.
                    // `|| data` is dead code meant only to preserve the variable through minification.
                    var el = this || data;
    
                    // Claim the first handler
                    if ( rcheckableType.test( el.type ) &&
                        el.click && nodeName( el, "input" ) ) {
    
                        // dataPriv.set( el, "click", ... )
                        leverageNative( el, "click", returnTrue );
                    }
    
                    // Return false to allow normal processing in the caller
                    return false;
                },
                trigger: function( data ) {
    
                    // For mutual compressibility with _default, replace `this` access with a local var.
                    // `|| data` is dead code meant only to preserve the variable through minification.
                    var el = this || data;
    
                    // Force setup before triggering a click
                    if ( rcheckableType.test( el.type ) &&
                        el.click && nodeName( el, "input" ) ) {
    
                        leverageNative( el, "click" );
                    }
    
                    // Return non-false to allow normal event-path propagation
                    return true;
                },
    
                // For cross-browser consistency, suppress native .click() on links
                // Also prevent it if we're currently inside a leveraged native-event stack
                _default: function( event ) {
                    var target = event.target;
                    return rcheckableType.test( target.type ) &&
                        target.click && nodeName( target, "input" ) &&
                        dataPriv.get( target, "click" ) ||
                        nodeName( target, "a" );
                }
            },
    
            beforeunload: {
                postDispatch: function( event ) {
    
                    // Support: Firefox 20+
                    // Firefox doesn't alert if the returnValue field is not set.
                    if ( event.result !== undefined && event.originalEvent ) {
                        event.originalEvent.returnValue = event.result;
                    }
                }
            }
        }
    };
    
    // Ensure the presence of an event listener that handles manually-triggered
    // synthetic events by interrupting progress until reinvoked in response to
    // *native* events that it fires directly, ensuring that state changes have
    // already occurred before other listeners are invoked.
    function leverageNative( el, type, expectSync ) {
    
        // Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
        if ( !expectSync ) {
            if ( dataPriv.get( el, type ) === undefined ) {
                jQuery.event.add( el, type, returnTrue );
            }
            return;
        }
    
        // Register the controller as a special universal handler for all event namespaces
        dataPriv.set( el, type, false );
        jQuery.event.add( el, type, {
            namespace: false,
            handler: function( event ) {
                var notAsync, result,
                    saved = dataPriv.get( this, type );
    
                if ( ( event.isTrigger & 1 ) && this[ type ] ) {
    
                    // Interrupt processing of the outer synthetic .trigger()ed event
                    // Saved data should be false in such cases, but might be a leftover capture object
                    // from an async native handler (gh-4350)
                    if ( !saved.length ) {
    
                        // Store arguments for use when handling the inner native event
                        // There will always be at least one argument (an event object), so this array
                        // will not be confused with a leftover capture object.
                        saved = slice.call( arguments );
                        dataPriv.set( this, type, saved );
    
                        // Trigger the native event and capture its result
                        // Support: IE <=9 - 11+
                        // focus() and blur() are asynchronous
                        notAsync = expectSync( this, type );
                        this[ type ]();
                        result = dataPriv.get( this, type );
                        if ( saved !== result || notAsync ) {
                            dataPriv.set( this, type, false );
                        } else {
                            result = {};
                        }
                        if ( saved !== result ) {
    
                            // Cancel the outer synthetic event
                            event.stopImmediatePropagation();
                            event.preventDefault();
    
                            // Support: Chrome 86+
                            // In Chrome, if an element having a focusout handler is blurred by
                            // clicking outside of it, it invokes the handler synchronously. If
                            // that handler calls `.remove()` on the element, the data is cleared,
                            // leaving `result` undefined. We need to guard against this.
                            return result && result.value;
                        }
    
                    // If this is an inner synthetic event for an event with a bubbling surrogate
                    // (focus or blur), assume that the surrogate already propagated from triggering the
                    // native event and prevent that from happening again here.
                    // This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
                    // bubbling surrogate propagates *after* the non-bubbling base), but that seems
                    // less bad than duplication.
                    } else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
                        event.stopPropagation();
                    }
    
                // If this is a native event triggered above, everything is now in order
                // Fire an inner synthetic event with the original arguments
                } else if ( saved.length ) {
    
                    // ...and capture the result
                    dataPriv.set( this, type, {
                        value: jQuery.event.trigger(
    
                            // Support: IE <=9 - 11+
                            // Extend with the prototype to reset the above stopImmediatePropagation()
                            jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
                            saved.slice( 1 ),
                            this
                        )
                    } );
    
                    // Abort handling of the native event
                    event.stopImmediatePropagation();
                }
            }
        } );
    }
    
    jQuery.removeEvent = function( elem, type, handle ) {
    
        // This "if" is needed for plain objects
        if ( elem.removeEventListener ) {
            elem.removeEventListener( type, handle );
        }
    };
    
    jQuery.Event = function( src, props ) {
    
        // Allow instantiation without the 'new' keyword
        if ( !( this instanceof jQuery.Event ) ) {
            return new jQuery.Event( src, props );
        }
    
        // Event object
        if ( src && src.type ) {
            this.originalEvent = src;
            this.type = src.type;
    
            // Events bubbling up the document may have been marked as prevented
            // by a handler lower down the tree; reflect the correct value.
            this.isDefaultPrevented = src.defaultPrevented ||
                    src.defaultPrevented === undefined &&
    
                    // Support: Android <=2.3 only
                    src.returnValue === false ?
                returnTrue :
                returnFalse;
    
            // Create target properties
            // Support: Safari <=6 - 7 only
            // Target should not be a text node (trac-504, trac-13143)
            this.target = ( src.target && src.target.nodeType === 3 ) ?
                src.target.parentNode :
                src.target;
    
            this.currentTarget = src.currentTarget;
            this.relatedTarget = src.relatedTarget;
    
        // Event type
        } else {
            this.type = src;
        }
    
        // Put explicitly provided properties onto the event object
        if ( props ) {
            jQuery.extend( this, props );
        }
    
        // Create a timestamp if incoming event doesn't have one
        this.timeStamp = src && src.timeStamp || Date.now();
    
        // Mark it as fixed
        this[ jQuery.expando ] = true;
    };
    
    // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
    // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    jQuery.Event.prototype = {
        constructor: jQuery.Event,
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        isSimulated: false,
    
        preventDefault: function() {
            var e = this.originalEvent;
    
            this.isDefaultPrevented = returnTrue;
    
            if ( e && !this.isSimulated ) {
                e.preventDefault();
            }
        },
        stopPropagation: function() {
            var e = this.originalEvent;
    
            this.isPropagationStopped = returnTrue;
    
            if ( e && !this.isSimulated ) {
                e.stopPropagation();
            }
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
    
            this.isImmediatePropagationStopped = returnTrue;
    
            if ( e && !this.isSimulated ) {
                e.stopImmediatePropagation();
            }
    
            this.stopPropagation();
        }
    };
    
    // Includes all common event props including KeyEvent and MouseEvent specific props
    jQuery.each( {
        altKey: true,
        bubbles: true,
        cancelable: true,
        changedTouches: true,
        ctrlKey: true,
        detail: true,
        eventPhase: true,
        metaKey: true,
        pageX: true,
        pageY: true,
        shiftKey: true,
        view: true,
        "char": true,
        code: true,
        charCode: true,
        key: true,
        keyCode: true,
        button: true,
        buttons: true,
        clientX: true,
        clientY: true,
        offsetX: true,
        offsetY: true,
        pointerId: true,
        pointerType: true,
        screenX: true,
        screenY: true,
        targetTouches: true,
        toElement: true,
        touches: true,
        which: true
    }, jQuery.event.addProp );
    
    jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
        jQuery.event.special[ type ] = {
    
            // Utilize native event if possible so blur/focus sequence is correct
            setup: function() {
    
                // Claim the first handler
                // dataPriv.set( this, "focus", ... )
                // dataPriv.set( this, "blur", ... )
                leverageNative( this, type, expectSync );
    
                // Return false to allow normal processing in the caller
                return false;
            },
            trigger: function() {
    
                // Force setup before trigger
                leverageNative( this, type );
    
                // Return non-false to allow normal event-path propagation
                return true;
            },
    
            // Suppress native focus or blur if we're currently inside
            // a leveraged native-event stack
            _default: function( event ) {
                return dataPriv.get( event.target, type );
            },
    
            delegateType: delegateType
        };
    } );
    
    // Create mouseenter/leave events using mouseover/out and event-time checks
    // so that event delegation works in jQuery.
    // Do the same for pointerenter/pointerleave and pointerover/pointerout
    //
    // Support: Safari 7 only
    // Safari sends mouseenter too often; see:
    // https://bugs.chromium.org/p/chromium/issues/detail?id=470258
    // for the description of the bug (it existed in older Chrome versions as well).
    jQuery.each( {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function( orig, fix ) {
        jQuery.event.special[ orig ] = {
            delegateType: fix,
            bindType: fix,
    
            handle: function( event ) {
                var ret,
                    target = this,
                    related = event.relatedTarget,
                    handleObj = event.handleObj;
    
                // For mouseenter/leave call the handler if related is outside the target.
                // NB: No relatedTarget if the mouse left/entered the browser window
                if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply( this, arguments );
                    event.type = fix;
                }
                return ret;
            }
        };
    } );
    
    jQuery.fn.extend( {
    
        on: function( types, selector, data, fn ) {
            return on( this, types, selector, data, fn );
        },
        one: function( types, selector, data, fn ) {
            return on( this, types, selector, data, fn, 1 );
        },
        off: function( types, selector, fn ) {
            var handleObj, type;
            if ( types && types.preventDefault && types.handleObj ) {
    
                // ( event )  dispatched jQuery.Event
                handleObj = types.handleObj;
                jQuery( types.delegateTarget ).off(
                    handleObj.namespace ?
                        handleObj.origType + "." + handleObj.namespace :
                        handleObj.origType,
                    handleObj.selector,
                    handleObj.handler
                );
                return this;
            }
            if ( typeof types === "object" ) {
    
                // ( types-object [, selector] )
                for ( type in types ) {
                    this.off( type, selector, types[ type ] );
                }
                return this;
            }
            if ( selector === false || typeof selector === "function" ) {
    
                // ( types [, fn] )
                fn = selector;
                selector = undefined;
            }
            if ( fn === false ) {
                fn = returnFalse;
            }
            return this.each( function() {
                jQuery.event.remove( this, types, fn, selector );
            } );
        }
    } );
    
    
    var
    
        // Support: IE <=10 - 11, Edge 12 - 13 only
        // In IE/Edge using regex groups here causes severe slowdowns.
        // See https://connect.microsoft.com/IE/feedback/details/1736512/
        rnoInnerhtml = /<script|<style|<link/i,
    
        // checked="checked" or checked
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
    
        rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
    
    // Prefer a tbody over its parent table for containing new rows
    function manipulationTarget( elem, content ) {
        if ( nodeName( elem, "table" ) &&
            nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {
    
            return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
        }
    
        return elem;
    }
    
    // Replace/restore the type attribute of script elements for safe DOM manipulation
    function disableScript( elem ) {
        elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
        return elem;
    }
    function restoreScript( elem ) {
        if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
            elem.type = elem.type.slice( 5 );
        } else {
            elem.removeAttribute( "type" );
        }
    
        return elem;
    }
    
    function cloneCopyEvent( src, dest ) {
        var i, l, type, pdataOld, udataOld, udataCur, events;
    
        if ( dest.nodeType !== 1 ) {
            return;
        }
    
        // 1. Copy private data: events, handlers, etc.
        if ( dataPriv.hasData( src ) ) {
            pdataOld = dataPriv.get( src );
            events = pdataOld.events;
    
            if ( events ) {
                dataPriv.remove( dest, "handle events" );
    
                for ( type in events ) {
                    for ( i = 0, l = events[ type ].length; i < l; i++ ) {
                        jQuery.event.add( dest, type, events[ type ][ i ] );
                    }
                }
            }
        }
    
        // 2. Copy user data
        if ( dataUser.hasData( src ) ) {
            udataOld = dataUser.access( src );
            udataCur = jQuery.extend( {}, udataOld );
    
            dataUser.set( dest, udataCur );
        }
    }
    
    // Fix IE bugs, see support tests
    function fixInput( src, dest ) {
        var nodeName = dest.nodeName.toLowerCase();
    
        // Fails to persist the checked state of a cloned checkbox or radio button.
        if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
            dest.checked = src.checked;
    
        // Fails to return the selected option to the default selected state when cloning options
        } else if ( nodeName === "input" || nodeName === "textarea" ) {
            dest.defaultValue = src.defaultValue;
        }
    }
    
    function domManip( collection, args, callback, ignored ) {
    
        // Flatten any nested arrays
        args = flat( args );
    
        var fragment, first, scripts, hasScripts, node, doc,
            i = 0,
            l = collection.length,
            iNoClone = l - 1,
            value = args[ 0 ],
            valueIsFunction = isFunction( value );
    
        // We can't cloneNode fragments that contain checked, in WebKit
        if ( valueIsFunction ||
                ( l > 1 && typeof value === "string" &&
                    !support.checkClone && rchecked.test( value ) ) ) {
            return collection.each( function( index ) {
                var self = collection.eq( index );
                if ( valueIsFunction ) {
                    args[ 0 ] = value.call( this, index, self.html() );
                }
                domManip( self, args, callback, ignored );
            } );
        }
    
        if ( l ) {
            fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
            first = fragment.firstChild;
    
            if ( fragment.childNodes.length === 1 ) {
                fragment = first;
            }
    
            // Require either new content or an interest in ignored elements to invoke the callback
            if ( first || ignored ) {
                scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
                hasScripts = scripts.length;
    
                // Use the original fragment for the last item
                // instead of the first because it can end up
                // being emptied incorrectly in certain situations (trac-8070).
                for ( ; i < l; i++ ) {
                    node = fragment;
    
                    if ( i !== iNoClone ) {
                        node = jQuery.clone( node, true, true );
    
                        // Keep references to cloned scripts for later restoration
                        if ( hasScripts ) {
    
                            // Support: Android <=4.0 only, PhantomJS 1 only
                            // push.apply(_, arraylike) throws on ancient WebKit
                            jQuery.merge( scripts, getAll( node, "script" ) );
                        }
                    }
    
                    callback.call( collection[ i ], node, i );
                }
    
                if ( hasScripts ) {
                    doc = scripts[ scripts.length - 1 ].ownerDocument;
    
                    // Reenable scripts
                    jQuery.map( scripts, restoreScript );
    
                    // Evaluate executable scripts on first document insertion
                    for ( i = 0; i < hasScripts; i++ ) {
                        node = scripts[ i ];
                        if ( rscriptType.test( node.type || "" ) &&
                            !dataPriv.access( node, "globalEval" ) &&
                            jQuery.contains( doc, node ) ) {
    
                            if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {
    
                                // Optional AJAX dependency, but won't run scripts if not present
                                if ( jQuery._evalUrl && !node.noModule ) {
                                    jQuery._evalUrl( node.src, {
                                        nonce: node.nonce || node.getAttribute( "nonce" )
                                    }, doc );
                                }
                            } else {
    
                                // Unwrap a CDATA section containing script contents. This shouldn't be
                                // needed as in XML documents they're already not visible when
                                // inspecting element contents and in HTML documents they have no
                                // meaning but we're preserving that logic for backwards compatibility.
                                // This will be removed completely in 4.0. See gh-4904.
                                DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
                            }
                        }
                    }
                }
            }
        }
    
        return collection;
    }
    
    function remove( elem, selector, keepData ) {
        var node,
            nodes = selector ? jQuery.filter( selector, elem ) : elem,
            i = 0;
    
        for ( ; ( node = nodes[ i ] ) != null; i++ ) {
            if ( !keepData && node.nodeType === 1 ) {
                jQuery.cleanData( getAll( node ) );
            }
    
            if ( node.parentNode ) {
                if ( keepData && isAttached( node ) ) {
                    setGlobalEval( getAll( node, "script" ) );
                }
                node.parentNode.removeChild( node );
            }
        }
    
        return elem;
    }
    
    jQuery.extend( {
        htmlPrefilter: function( html ) {
            return html;
        },
    
        clone: function( elem, dataAndEvents, deepDataAndEvents ) {
            var i, l, srcElements, destElements,
                clone = elem.cloneNode( true ),
                inPage = isAttached( elem );
    
            // Fix IE cloning issues
            if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
                    !jQuery.isXMLDoc( elem ) ) {
    
                // We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
                destElements = getAll( clone );
                srcElements = getAll( elem );
    
                for ( i = 0, l = srcElements.length; i < l; i++ ) {
                    fixInput( srcElements[ i ], destElements[ i ] );
                }
            }
    
            // Copy the events from the original to the clone
            if ( dataAndEvents ) {
                if ( deepDataAndEvents ) {
                    srcElements = srcElements || getAll( elem );
                    destElements = destElements || getAll( clone );
    
                    for ( i = 0, l = srcElements.length; i < l; i++ ) {
                        cloneCopyEvent( srcElements[ i ], destElements[ i ] );
                    }
                } else {
                    cloneCopyEvent( elem, clone );
                }
            }
    
            // Preserve script evaluation history
            destElements = getAll( clone, "script" );
            if ( destElements.length > 0 ) {
                setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
            }
    
            // Return the cloned set
            return clone;
        },
    
        cleanData: function( elems ) {
            var data, elem, type,
                special = jQuery.event.special,
                i = 0;
    
            for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
                if ( acceptData( elem ) ) {
                    if ( ( data = elem[ dataPriv.expando ] ) ) {
                        if ( data.events ) {
                            for ( type in data.events ) {
                                if ( special[ type ] ) {
                                    jQuery.event.remove( elem, type );
    
                                // This is a shortcut to avoid jQuery.event.remove's overhead
                                } else {
                                    jQuery.removeEvent( elem, type, data.handle );
                                }
                            }
                        }
    
                        // Support: Chrome <=35 - 45+
                        // Assign undefined instead of using delete, see Data#remove
                        elem[ dataPriv.expando ] = undefined;
                    }
                    if ( elem[ dataUser.expando ] ) {
    
                        // Support: Chrome <=35 - 45+
                        // Assign undefined instead of using delete, see Data#remove
                        elem[ dataUser.expando ] = undefined;
                    }
                }
            }
        }
    } );
    
    jQuery.fn.extend( {
        detach: function( selector ) {
            return remove( this, selector, true );
        },
    
        remove: function( selector ) {
            return remove( this, selector );
        },
    
        text: function( value ) {
            return access( this, function( value ) {
                return value === undefined ?
                    jQuery.text( this ) :
                    this.empty().each( function() {
                        if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                            this.textContent = value;
                        }
                    } );
            }, null, value, arguments.length );
        },
    
        append: function() {
            return domManip( this, arguments, function( elem ) {
                if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                    var target = manipulationTarget( this, elem );
                    target.appendChild( elem );
                }
            } );
        },
    
        prepend: function() {
            return domManip( this, arguments, function( elem ) {
                if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
                    var target = manipulationTarget( this, elem );
                    target.insertBefore( elem, target.firstChild );
                }
            } );
        },
    
        before: function() {
            return domManip( this, arguments, function( elem ) {
                if ( this.parentNode ) {
                    this.parentNode.insertBefore( elem, this );
                }
            } );
        },
    
        after: function() {
            return domManip( this, arguments, function( elem ) {
                if ( this.parentNode ) {
                    this.parentNode.insertBefore( elem, this.nextSibling );
                }
            } );
        },
    
        empty: function() {
            var elem,
                i = 0;
    
            for ( ; ( elem = this[ i ] ) != null; i++ ) {
                if ( elem.nodeType === 1 ) {
    
                    // Prevent memory leaks
                    jQuery.cleanData( getAll( elem, false ) );
    
                    // Remove any remaining nodes
                    elem.textContent = "";
                }
            }
    
            return this;
        },
    
        clone: function( dataAndEvents, deepDataAndEvents ) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
    
            return this.map( function() {
                return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
            } );
        },
    
        html: function( value ) {
            return access( this, function( value ) {
                var elem = this[ 0 ] || {},
                    i = 0,
                    l = this.length;
    
                if ( value === undefined && elem.nodeType === 1 ) {
                    return elem.innerHTML;
                }
    
                // See if we can take a shortcut and just use innerHTML
                if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
                    !wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {
    
                    value = jQuery.htmlPrefilter( value );
    
                    try {
                        for ( ; i < l; i++ ) {
                            elem = this[ i ] || {};
    
                            // Remove element nodes and prevent memory leaks
                            if ( elem.nodeType === 1 ) {
                                jQuery.cleanData( getAll( elem, false ) );
                                elem.innerHTML = value;
                            }
                        }
    
                        elem = 0;
    
                    // If using innerHTML throws an exception, use the fallback method
                    } catch ( e ) {}
                }
    
                if ( elem ) {
                    this.empty().append( value );
                }
            }, null, value, arguments.length );
        },
    
        replaceWith: function() {
            var ignored = [];
    
            // Make the changes, replacing each non-ignored context element with the new content
            return domManip( this, arguments, function( elem ) {
                var parent = this.parentNode;
    
                if ( jQuery.inArray( this, ignored ) < 0 ) {
                    jQuery.cleanData( getAll( this ) );
                    if ( parent ) {
                        parent.replaceChild( elem, this );
                    }
                }
    
            // Force callback invocation
            }, ignored );
        }
    } );
    
    jQuery.each( {
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function( name, original ) {
        jQuery.fn[ name ] = function( selector ) {
            var elems,
                ret = [],
                insert = jQuery( selector ),
                last = insert.length - 1,
                i = 0;
    
            for ( ; i <= last; i++ ) {
                elems = i === last ? this : this.clone( true );
                jQuery( insert[ i ] )[ original ]( elems );
    
                // Support: Android <=4.0 only, PhantomJS 1 only
                // .get() because push.apply(_, arraylike) throws on ancient WebKit
                push.apply( ret, elems.get() );
            }
    
            return this.pushStack( ret );
        };
    } );
    var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );
    
    var rcustomProp = /^--/;
    
    
    var getStyles = function( elem ) {
    
            // Support: IE <=11 only, Firefox <=30 (trac-15098, trac-14150)
            // IE throws on elements created in popups
            // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
            var view = elem.ownerDocument.defaultView;
    
            if ( !view || !view.opener ) {
                view = window;
            }
    
            return view.getComputedStyle( elem );
        };
    
    var swap = function( elem, options, callback ) {
        var ret, name,
            old = {};
    
        // Remember the old values, and insert the new ones
        for ( name in options ) {
            old[ name ] = elem.style[ name ];
            elem.style[ name ] = options[ name ];
        }
    
        ret = callback.call( elem );
    
        // Revert the old values
        for ( name in options ) {
            elem.style[ name ] = old[ name ];
        }
    
        return ret;
    };
    
    
    var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );
    
    var whitespace = "[\\x20\\t\\r\\n\\f]";
    
    
    var rtrimCSS = new RegExp(
        "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
        "g"
    );
    
    
    
    
    ( function() {
    
        // Executing both pixelPosition & boxSizingReliable tests require only one layout
        // so they're executed at the same time to save the second computation.
        function computeStyleTests() {
    
            // This is a singleton, we need to execute it only once
            if ( !div ) {
                return;
            }
    
            container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
                "margin-top:1px;padding:0;border:0";
            div.style.cssText =
                "position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
                "margin:auto;border:1px;padding:1px;" +
                "width:60%;top:1%";
            documentElement.appendChild( container ).appendChild( div );
    
            var divStyle = window.getComputedStyle( div );
            pixelPositionVal = divStyle.top !== "1%";
    
            // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
            reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;
    
            // Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
            // Some styles come back with percentage values, even though they shouldn't
            div.style.right = "60%";
            pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;
    
            // Support: IE 9 - 11 only
            // Detect misreporting of content dimensions for box-sizing:border-box elements
            boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;
    
            // Support: IE 9 only
            // Detect overflow:scroll screwiness (gh-3699)
            // Support: Chrome <=64
            // Don't get tricked when zoom affects offsetWidth (gh-4029)
            div.style.position = "absolute";
            scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;
    
            documentElement.removeChild( container );
    
            // Nullify the div so it wouldn't be stored in the memory and
            // it will also be a sign that checks already performed
            div = null;
        }
    
        function roundPixelMeasures( measure ) {
            return Math.round( parseFloat( measure ) );
        }
    
        var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
            reliableTrDimensionsVal, reliableMarginLeftVal,
            container = document.createElement( "div" ),
            div = document.createElement( "div" );
    
        // Finish early in limited (non-browser) environments
        if ( !div.style ) {
            return;
        }
    
        // Support: IE <=9 - 11 only
        // Style of cloned element affects source element cloned (trac-8908)
        div.style.backgroundClip = "content-box";
        div.cloneNode( true ).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";
    
        jQuery.extend( support, {
            boxSizingReliable: function() {
                computeStyleTests();
                return boxSizingReliableVal;
            },
            pixelBoxStyles: function() {
                computeStyleTests();
                return pixelBoxStylesVal;
            },
            pixelPosition: function() {
                computeStyleTests();
                return pixelPositionVal;
            },
            reliableMarginLeft: function() {
                computeStyleTests();
                return reliableMarginLeftVal;
            },
            scrollboxSize: function() {
                computeStyleTests();
                return scrollboxSizeVal;
            },
    
            // Support: IE 9 - 11+, Edge 15 - 18+
            // IE/Edge misreport `getComputedStyle` of table rows with width/height
            // set in CSS while `offset*` properties report correct values.
            // Behavior in IE 9 is more subtle than in newer versions & it passes
            // some versions of this test; make sure not to make it pass there!
            //
            // Support: Firefox 70+
            // Only Firefox includes border widths
            // in computed dimensions. (gh-4529)
            reliableTrDimensions: function() {
                var table, tr, trChild, trStyle;
                if ( reliableTrDimensionsVal == null ) {
                    table = document.createElement( "table" );
                    tr = document.createElement( "tr" );
                    trChild = document.createElement( "div" );
    
                    table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
                    tr.style.cssText = "border:1px solid";
    
                    // Support: Chrome 86+
                    // Height set through cssText does not get applied.
                    // Computed height then comes back as 0.
                    tr.style.height = "1px";
                    trChild.style.height = "9px";
    
                    // Support: Android 8 Chrome 86+
                    // In our bodyBackground.html iframe,
                    // display for all div elements is set to "inline",
                    // which causes a problem only in Android 8 Chrome 86.
                    // Ensuring the div is display: block
                    // gets around this issue.
                    trChild.style.display = "block";
    
                    documentElement
                        .appendChild( table )
                        .appendChild( tr )
                        .appendChild( trChild );
    
                    trStyle = window.getComputedStyle( tr );
                    reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
                        parseInt( trStyle.borderTopWidth, 10 ) +
                        parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;
    
                    documentElement.removeChild( table );
                }
                return reliableTrDimensionsVal;
            }
        } );
    } )();
    
    
    function curCSS( elem, name, computed ) {
        var width, minWidth, maxWidth, ret,
            isCustomProp = rcustomProp.test( name ),
    
            // Support: Firefox 51+
            // Retrieving style before computed somehow
            // fixes an issue with getting wrong values
            // on detached elements
            style = elem.style;
    
        computed = computed || getStyles( elem );
    
        // getPropertyValue is needed for:
        //   .css('filter') (IE 9 only, trac-12537)
        //   .css('--customProperty) (gh-3144)
        if ( computed ) {
    
            // Support: IE <=9 - 11+
            // IE only supports `"float"` in `getPropertyValue`; in computed styles
            // it's only available as `"cssFloat"`. We no longer modify properties
            // sent to `.css()` apart from camelCasing, so we need to check both.
            // Normally, this would create difference in behavior: if
            // `getPropertyValue` returns an empty string, the value returned
            // by `.css()` would be `undefined`. This is usually the case for
            // disconnected elements. However, in IE even disconnected elements
            // with no styles return `"none"` for `getPropertyValue( "float" )`
            ret = computed.getPropertyValue( name ) || computed[ name ];
    
            if ( isCustomProp && ret ) {
    
                // Support: Firefox 105+, Chrome <=105+
                // Spec requires trimming whitespace for custom properties (gh-4926).
                // Firefox only trims leading whitespace. Chrome just collapses
                // both leading & trailing whitespace to a single space.
                //
                // Fall back to `undefined` if empty string returned.
                // This collapses a missing definition with property defined
                // and set to an empty string but there's no standard API
                // allowing us to differentiate them without a performance penalty
                // and returning `undefined` aligns with older jQuery.
                //
                // rtrimCSS treats U+000D CARRIAGE RETURN and U+000C FORM FEED
                // as whitespace while CSS does not, but this is not a problem
                // because CSS preprocessing replaces them with U+000A LINE FEED
                // (which *is* CSS whitespace)
                // https://www.w3.org/TR/css-syntax-3/#input-preprocessing
                ret = ret.replace( rtrimCSS, "$1" ) || undefined;
            }
    
            if ( ret === "" && !isAttached( elem ) ) {
                ret = jQuery.style( elem, name );
            }
    
            // A tribute to the "awesome hack by Dean Edwards"
            // Android Browser returns percentage for some values,
            // but width seems to be reliably pixels.
            // This is against the CSSOM draft spec:
            // https://drafts.csswg.org/cssom/#resolved-values
            if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {
    
                // Remember the original values
                width = style.width;
                minWidth = style.minWidth;
                maxWidth = style.maxWidth;
    
                // Put in the new values to get a computed value out
                style.minWidth = style.maxWidth = style.width = ret;
                ret = computed.width;
    
                // Revert the changed values
                style.width = width;
                style.minWidth = minWidth;
                style.maxWidth = maxWidth;
            }
        }
    
        return ret !== undefined ?
    
            // Support: IE <=9 - 11 only
            // IE returns zIndex value as an integer.
            ret + "" :
            ret;
    }
    
    
    function addGetHookIf( conditionFn, hookFn ) {
    
        // Define the hook, we'll check on the first run if it's really needed.
        return {
            get: function() {
                if ( conditionFn() ) {
    
                    // Hook not needed (or it's not possible to use it due
                    // to missing dependency), remove it.
                    delete this.get;
                    return;
                }
    
                // Hook needed; redefine it so that the support test is not executed again.
                return ( this.get = hookFn ).apply( this, arguments );
            }
        };
    }
    
    
    var cssPrefixes = [ "Webkit", "Moz", "ms" ],
        emptyStyle = document.createElement( "div" ).style,
        vendorProps = {};
    
    // Return a vendor-prefixed property or undefined
    function vendorPropName( name ) {
    
        // Check for vendor prefixed names
        var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
            i = cssPrefixes.length;
    
        while ( i-- ) {
            name = cssPrefixes[ i ] + capName;
            if ( name in emptyStyle ) {
                return name;
            }
        }
    }
    
    // Return a potentially-mapped jQuery.cssProps or vendor prefixed property
    function finalPropName( name ) {
        var final = jQuery.cssProps[ name ] || vendorProps[ name ];
    
        if ( final ) {
            return final;
        }
        if ( name in emptyStyle ) {
            return name;
        }
        return vendorProps[ name ] = vendorPropName( name ) || name;
    }
    
    
    var
    
        // Swappable if display is none or starts with table
        // except "table", "table-cell", or "table-caption"
        // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        cssShow = { position: "absolute", visibility: "hidden", display: "block" },
        cssNormalTransform = {
            letterSpacing: "0",
            fontWeight: "400"
        };
    
    function setPositiveNumber( _elem, value, subtract ) {
    
        // Any relative (+/-) values have already been
        // normalized at this point
        var matches = rcssNum.exec( value );
        return matches ?
    
            // Guard against undefined "subtract", e.g., when used as in cssHooks
            Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
            value;
    }
    
    function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
        var i = dimension === "width" ? 1 : 0,
            extra = 0,
            delta = 0;
    
        // Adjustment may not be necessary
        if ( box === ( isBorderBox ? "border" : "content" ) ) {
            return 0;
        }
    
        for ( ; i < 4; i += 2 ) {
    
            // Both box models exclude margin
            if ( box === "margin" ) {
                delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
            }
    
            // If we get here with a content-box, we're seeking "padding" or "border" or "margin"
            if ( !isBorderBox ) {
    
                // Add padding
                delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
    
                // For "border" or "margin", add border
                if ( box !== "padding" ) {
                    delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
    
                // But still keep track of it otherwise
                } else {
                    extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
                }
    
            // If we get here with a border-box (content + padding + border), we're seeking "content" or
            // "padding" or "margin"
            } else {
    
                // For "content", subtract padding
                if ( box === "content" ) {
                    delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
                }
    
                // For "content" or "padding", subtract border
                if ( box !== "margin" ) {
                    delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
                }
            }
        }
    
        // Account for positive content-box scroll gutter when requested by providing computedVal
        if ( !isBorderBox && computedVal >= 0 ) {
    
            // offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
            // Assuming integer scroll gutter, subtract the rest and round down
            delta += Math.max( 0, Math.ceil(
                elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
                computedVal -
                delta -
                extra -
                0.5
    
            // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
            // Use an explicit zero to avoid NaN (gh-3964)
            ) ) || 0;
        }
    
        return delta;
    }
    
    function getWidthOrHeight( elem, dimension, extra ) {
    
        // Start with computed style
        var styles = getStyles( elem ),
    
            // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
            // Fake content-box until we know it's needed to know the true value.
            boxSizingNeeded = !support.boxSizingReliable() || extra,
            isBorderBox = boxSizingNeeded &&
                jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
            valueIsBorderBox = isBorderBox,
    
            val = curCSS( elem, dimension, styles ),
            offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );
    
        // Support: Firefox <=54
        // Return a confounding non-pixel value or feign ignorance, as appropriate.
        if ( rnumnonpx.test( val ) ) {
            if ( !extra ) {
                return val;
            }
            val = "auto";
        }
    
    
        // Support: IE 9 - 11 only
        // Use offsetWidth/offsetHeight for when box sizing is unreliable.
        // In those cases, the computed value can be trusted to be border-box.
        if ( ( !support.boxSizingReliable() && isBorderBox ||
    
            // Support: IE 10 - 11+, Edge 15 - 18+
            // IE/Edge misreport `getComputedStyle` of table rows with width/height
            // set in CSS while `offset*` properties report correct values.
            // Interestingly, in some cases IE 9 doesn't suffer from this issue.
            !support.reliableTrDimensions() && nodeName( elem, "tr" ) ||
    
            // Fall back to offsetWidth/offsetHeight when value is "auto"
            // This happens for inline elements with no explicit setting (gh-3571)
            val === "auto" ||
    
            // Support: Android <=4.1 - 4.3 only
            // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
            !parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&
    
            // Make sure the element is visible & connected
            elem.getClientRects().length ) {
    
            isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";
    
            // Where available, offsetWidth/offsetHeight approximate border box dimensions.
            // Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
            // retrieved value as a content box dimension.
            valueIsBorderBox = offsetProp in elem;
            if ( valueIsBorderBox ) {
                val = elem[ offsetProp ];
            }
        }
    
        // Normalize "" and auto
        val = parseFloat( val ) || 0;
    
        // Adjust for the element's box model
        return ( val +
            boxModelAdjustment(
                elem,
                dimension,
                extra || ( isBorderBox ? "border" : "content" ),
                valueIsBorderBox,
                styles,
    
                // Provide the current computed size to request scroll gutter calculation (gh-3589)
                val
            )
        ) + "px";
    }
    
    jQuery.extend( {
    
        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks: {
            opacity: {
                get: function( elem, computed ) {
                    if ( computed ) {
    
                        // We should always get a number back from opacity
                        var ret = curCSS( elem, "opacity" );
                        return ret === "" ? "1" : ret;
                    }
                }
            }
        },
    
        // Don't automatically add "px" to these possibly-unitless properties
        cssNumber: {
            "animationIterationCount": true,
            "columnCount": true,
            "fillOpacity": true,
            "flexGrow": true,
            "flexShrink": true,
            "fontWeight": true,
            "gridArea": true,
            "gridColumn": true,
            "gridColumnEnd": true,
            "gridColumnStart": true,
            "gridRow": true,
            "gridRowEnd": true,
            "gridRowStart": true,
            "lineHeight": true,
            "opacity": true,
            "order": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },
    
        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps: {},
    
        // Get and set the style property on a DOM Node
        style: function( elem, name, value, extra ) {
    
            // Don't set styles on text and comment nodes
            if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
                return;
            }
    
            // Make sure that we're working with the right name
            var ret, type, hooks,
                origName = camelCase( name ),
                isCustomProp = rcustomProp.test( name ),
                style = elem.style;
    
            // Make sure that we're working with the right name. We don't
            // want to query the value if it is a CSS custom property
            // since they are user-defined.
            if ( !isCustomProp ) {
                name = finalPropName( origName );
            }
    
            // Gets hook for the prefixed version, then unprefixed version
            hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
    
            // Check if we're setting a value
            if ( value !== undefined ) {
                type = typeof value;
    
                // Convert "+=" or "-=" to relative numbers (trac-7345)
                if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
                    value = adjustCSS( elem, name, ret );
    
                    // Fixes bug trac-9237
                    type = "number";
                }
    
                // Make sure that null and NaN values aren't set (trac-7116)
                if ( value == null || value !== value ) {
                    return;
                }
    
                // If a number was passed in, add the unit (except for certain CSS properties)
                // The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
                // "px" to a few hardcoded values.
                if ( type === "number" && !isCustomProp ) {
                    value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
                }
    
                // background-* props affect original clone's values
                if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
                    style[ name ] = "inherit";
                }
    
                // If a hook was provided, use that value, otherwise just set the specified value
                if ( !hooks || !( "set" in hooks ) ||
                    ( value = hooks.set( elem, value, extra ) ) !== undefined ) {
    
                    if ( isCustomProp ) {
                        style.setProperty( name, value );
                    } else {
                        style[ name ] = value;
                    }
                }
    
            } else {
    
                // If a hook was provided get the non-computed value from there
                if ( hooks && "get" in hooks &&
                    ( ret = hooks.get( elem, false, extra ) ) !== undefined ) {
    
                    return ret;
                }
    
                // Otherwise just get the value from the style object
                return style[ name ];
            }
        },
    
        css: function( elem, name, extra, styles ) {
            var val, num, hooks,
                origName = camelCase( name ),
                isCustomProp = rcustomProp.test( name );
    
            // Make sure that we're working with the right name. We don't
            // want to modify the value if it is a CSS custom property
            // since they are user-defined.
            if ( !isCustomProp ) {
                name = finalPropName( origName );
            }
    
            // Try prefixed name followed by the unprefixed name
            hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
    
            // If a hook was provided get the computed value from there
            if ( hooks && "get" in hooks ) {
                val = hooks.get( elem, true, extra );
            }
    
            // Otherwise, if a way to get the computed value exists, use that
            if ( val === undefined ) {
                val = curCSS( elem, name, styles );
            }
    
            // Convert "normal" to computed value
            if ( val === "normal" && name in cssNormalTransform ) {
                val = cssNormalTransform[ name ];
            }
    
            // Make numeric if forced or a qualifier was provided and val looks numeric
            if ( extra === "" || extra ) {
                num = parseFloat( val );
                return extra === true || isFinite( num ) ? num || 0 : val;
            }
    
            return val;
        }
    } );
    
    jQuery.each( [ "height", "width" ], function( _i, dimension ) {
        jQuery.cssHooks[ dimension ] = {
            get: function( elem, computed, extra ) {
                if ( computed ) {
    
                    // Certain elements can have dimension info if we invisibly show them
                    // but it must have a current display style that would benefit
                    return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
    
                        // Support: Safari 8+
                        // Table columns in Safari have non-zero offsetWidth & zero
                        // getBoundingClientRect().width unless display is changed.
                        // Support: IE <=11 only
                        // Running getBoundingClientRect on a disconnected node
                        // in IE throws an error.
                        ( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
                        swap( elem, cssShow, function() {
                            return getWidthOrHeight( elem, dimension, extra );
                        } ) :
                        getWidthOrHeight( elem, dimension, extra );
                }
            },
    
            set: function( elem, value, extra ) {
                var matches,
                    styles = getStyles( elem ),
    
                    // Only read styles.position if the test has a chance to fail
                    // to avoid forcing a reflow.
                    scrollboxSizeBuggy = !support.scrollboxSize() &&
                        styles.position === "absolute",
    
                    // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
                    boxSizingNeeded = scrollboxSizeBuggy || extra,
                    isBorderBox = boxSizingNeeded &&
                        jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
                    subtract = extra ?
                        boxModelAdjustment(
                            elem,
                            dimension,
                            extra,
                            isBorderBox,
                            styles
                        ) :
                        0;
    
                // Account for unreliable border-box dimensions by comparing offset* to computed and
                // faking a content-box to get border and padding (gh-3699)
                if ( isBorderBox && scrollboxSizeBuggy ) {
                    subtract -= Math.ceil(
                        elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
                        parseFloat( styles[ dimension ] ) -
                        boxModelAdjustment( elem, dimension, "border", false, styles ) -
                        0.5
                    );
                }
    
                // Convert to pixels if value adjustment is needed
                if ( subtract && ( matches = rcssNum.exec( value ) ) &&
                    ( matches[ 3 ] || "px" ) !== "px" ) {
    
                    elem.style[ dimension ] = value;
                    value = jQuery.css( elem, dimension );
                }
    
                return setPositiveNumber( elem, value, subtract );
            }
        };
    } );
    
    jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
        function( elem, computed ) {
            if ( computed ) {
                return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
                    elem.getBoundingClientRect().left -
                        swap( elem, { marginLeft: 0 }, function() {
                            return elem.getBoundingClientRect().left;
                        } )
                ) + "px";
            }
        }
    );
    
    // These hooks are used by animate to expand properties
    jQuery.each( {
        margin: "",
        padding: "",
        border: "Width"
    }, function( prefix, suffix ) {
        jQuery.cssHooks[ prefix + suffix ] = {
            expand: function( value ) {
                var i = 0,
                    expanded = {},
    
                    // Assumes a single number if not a string
                    parts = typeof value === "string" ? value.split( " " ) : [ value ];
    
                for ( ; i < 4; i++ ) {
                    expanded[ prefix + cssExpand[ i ] + suffix ] =
                        parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
                }
    
                return expanded;
            }
        };
    
        if ( prefix !== "margin" ) {
            jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
        }
    } );
    
    jQuery.fn.extend( {
        css: function( name, value ) {
            return access( this, function( elem, name, value ) {
                var styles, len,
                    map = {},
                    i = 0;
    
                if ( Array.isArray( name ) ) {
                    styles = getStyles( elem );
                    len = name.length;
    
                    for ( ; i < len; i++ ) {
                        map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
                    }
    
                    return map;
                }
    
                return value !== undefined ?
                    jQuery.style( elem, name, value ) :
                    jQuery.css( elem, name );
            }, name, value, arguments.length > 1 );
        }
    } );
    
    
    function Tween( elem, options, prop, end, easing ) {
        return new Tween.prototype.init( elem, options, prop, end, easing );
    }
    jQuery.Tween = Tween;
    
    Tween.prototype = {
        constructor: Tween,
        init: function( elem, options, prop, end, easing, unit ) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || jQuery.easing._default;
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
        },
        cur: function() {
            var hooks = Tween.propHooks[ this.prop ];
    
            return hooks && hooks.get ?
                hooks.get( this ) :
                Tween.propHooks._default.get( this );
        },
        run: function( percent ) {
            var eased,
                hooks = Tween.propHooks[ this.prop ];
    
            if ( this.options.duration ) {
                this.pos = eased = jQuery.easing[ this.easing ](
                    percent, this.options.duration * percent, 0, 1, this.options.duration
                );
            } else {
                this.pos = eased = percent;
            }
            this.now = ( this.end - this.start ) * eased + this.start;
    
            if ( this.options.step ) {
                this.options.step.call( this.elem, this.now, this );
            }
    
            if ( hooks && hooks.set ) {
                hooks.set( this );
            } else {
                Tween.propHooks._default.set( this );
            }
            return this;
        }
    };
    
    Tween.prototype.init.prototype = Tween.prototype;
    
    Tween.propHooks = {
        _default: {
            get: function( tween ) {
                var result;
    
                // Use a property on the element directly when it is not a DOM element,
                // or when there is no matching style property that exists.
                if ( tween.elem.nodeType !== 1 ||
                    tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
                    return tween.elem[ tween.prop ];
                }
    
                // Passing an empty string as a 3rd parameter to .css will automatically
                // attempt a parseFloat and fallback to a string if the parse fails.
                // Simple values such as "10px" are parsed to Float;
                // complex values such as "rotate(1rad)" are returned as-is.
                result = jQuery.css( tween.elem, tween.prop, "" );
    
                // Empty strings, null, undefined and "auto" are converted to 0.
                return !result || result === "auto" ? 0 : result;
            },
            set: function( tween ) {
    
                // Use step hook for back compat.
                // Use cssHook if its there.
                // Use .style if available and use plain properties where available.
                if ( jQuery.fx.step[ tween.prop ] ) {
                    jQuery.fx.step[ tween.prop ]( tween );
                } else if ( tween.elem.nodeType === 1 && (
                    jQuery.cssHooks[ tween.prop ] ||
                        tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
                    jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
                } else {
                    tween.elem[ tween.prop ] = tween.now;
                }
            }
        }
    };
    
    // Support: IE <=9 only
    // Panic based approach to setting things on disconnected nodes
    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function( tween ) {
            if ( tween.elem.nodeType && tween.elem.parentNode ) {
                tween.elem[ tween.prop ] = tween.now;
            }
        }
    };
    
    jQuery.easing = {
        linear: function( p ) {
            return p;
        },
        swing: function( p ) {
            return 0.5 - Math.cos( p * Math.PI ) / 2;
        },
        _default: "swing"
    };
    
    jQuery.fx = Tween.prototype.init;
    
    // Back compat <1.8 extension point
    jQuery.fx.step = {};
    
    
    
    
    var
        fxNow, inProgress,
        rfxtypes = /^(?:toggle|show|hide)$/,
        rrun = /queueHooks$/;
    
    function schedule() {
        if ( inProgress ) {
            if ( document.hidden === false && window.requestAnimationFrame ) {
                window.requestAnimationFrame( schedule );
            } else {
                window.setTimeout( schedule, jQuery.fx.interval );
            }
    
            jQuery.fx.tick();
        }
    }
    
    // Animations created synchronously will run synchronously
    function createFxNow() {
        window.setTimeout( function() {
            fxNow = undefined;
        } );
        return ( fxNow = Date.now() );
    }
    
    // Generate parameters to create a standard animation
    function genFx( type, includeWidth ) {
        var which,
            i = 0,
            attrs = { height: type };
    
        // If we include width, step value is 1 to do all cssExpand values,
        // otherwise step value is 2 to skip over Left and Right
        includeWidth = includeWidth ? 1 : 0;
        for ( ; i < 4; i += 2 - includeWidth ) {
            which = cssExpand[ i ];
            attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
        }
    
        if ( includeWidth ) {
            attrs.opacity = attrs.width = type;
        }
    
        return attrs;
    }
    
    function createTween( value, prop, animation ) {
        var tween,
            collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
            index = 0,
            length = collection.length;
        for ( ; index < length; index++ ) {
            if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {
    
                // We're done with this property
                return tween;
            }
        }
    }
    
    function defaultPrefilter( elem, props, opts ) {
        var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
            isBox = "width" in props || "height" in props,
            anim = this,
            orig = {},
            style = elem.style,
            hidden = elem.nodeType && isHiddenWithinTree( elem ),
            dataShow = dataPriv.get( elem, "fxshow" );
    
        // Queue-skipping animations hijack the fx hooks
        if ( !opts.queue ) {
            hooks = jQuery._queueHooks( elem, "fx" );
            if ( hooks.unqueued == null ) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function() {
                    if ( !hooks.unqueued ) {
                        oldfire();
                    }
                };
            }
            hooks.unqueued++;
    
            anim.always( function() {
    
                // Ensure the complete handler is called before this completes
                anim.always( function() {
                    hooks.unqueued--;
                    if ( !jQuery.queue( elem, "fx" ).length ) {
                        hooks.empty.fire();
                    }
                } );
            } );
        }
    
        // Detect show/hide animations
        for ( prop in props ) {
            value = props[ prop ];
            if ( rfxtypes.test( value ) ) {
                delete props[ prop ];
                toggle = toggle || value === "toggle";
                if ( value === ( hidden ? "hide" : "show" ) ) {
    
                    // Pretend to be hidden if this is a "show" and
                    // there is still data from a stopped show/hide
                    if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
                        hidden = true;
    
                    // Ignore all other no-op show/hide data
                    } else {
                        continue;
                    }
                }
                orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
            }
        }
    
        // Bail out if this is a no-op like .hide().hide()
        propTween = !jQuery.isEmptyObject( props );
        if ( !propTween && jQuery.isEmptyObject( orig ) ) {
            return;
        }
    
        // Restrict "overflow" and "display" styles during box animations
        if ( isBox && elem.nodeType === 1 ) {
    
            // Support: IE <=9 - 11, Edge 12 - 15
            // Record all 3 overflow attributes because IE does not infer the shorthand
            // from identically-valued overflowX and overflowY and Edge just mirrors
            // the overflowX value there.
            opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
    
            // Identify a display type, preferring old show/hide data over the CSS cascade
            restoreDisplay = dataShow && dataShow.display;
            if ( restoreDisplay == null ) {
                restoreDisplay = dataPriv.get( elem, "display" );
            }
            display = jQuery.css( elem, "display" );
            if ( display === "none" ) {
                if ( restoreDisplay ) {
                    display = restoreDisplay;
                } else {
    
                    // Get nonempty value(s) by temporarily forcing visibility
                    showHide( [ elem ], true );
                    restoreDisplay = elem.style.display || restoreDisplay;
                    display = jQuery.css( elem, "display" );
                    showHide( [ elem ] );
                }
            }
    
            // Animate inline elements as inline-block
            if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
                if ( jQuery.css( elem, "float" ) === "none" ) {
    
                    // Restore the original display value at the end of pure show/hide animations
                    if ( !propTween ) {
                        anim.done( function() {
                            style.display = restoreDisplay;
                        } );
                        if ( restoreDisplay == null ) {
                            display = style.display;
                            restoreDisplay = display === "none" ? "" : display;
                        }
                    }
                    style.display = "inline-block";
                }
            }
        }
    
        if ( opts.overflow ) {
            style.overflow = "hidden";
            anim.always( function() {
                style.overflow = opts.overflow[ 0 ];
                style.overflowX = opts.overflow[ 1 ];
                style.overflowY = opts.overflow[ 2 ];
            } );
        }
    
        // Implement show/hide animations
        propTween = false;
        for ( prop in orig ) {
    
            // General show/hide setup for this element animation
            if ( !propTween ) {
                if ( dataShow ) {
                    if ( "hidden" in dataShow ) {
                        hidden = dataShow.hidden;
                    }
                } else {
                    dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
                }
    
                // Store hidden/visible for toggle so `.stop().toggle()` "reverses"
                if ( toggle ) {
                    dataShow.hidden = !hidden;
                }
    
                // Show elements before animating them
                if ( hidden ) {
                    showHide( [ elem ], true );
                }
    
                /* eslint-disable no-loop-func */
    
                anim.done( function() {
    
                    /* eslint-enable no-loop-func */
    
                    // The final step of a "hide" animation is actually hiding the element
                    if ( !hidden ) {
                        showHide( [ elem ] );
                    }
                    dataPriv.remove( elem, "fxshow" );
                    for ( prop in orig ) {
                        jQuery.style( elem, prop, orig[ prop ] );
                    }
                } );
            }
    
            // Per-property setup
            propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
            if ( !( prop in dataShow ) ) {
                dataShow[ prop ] = propTween.start;
                if ( hidden ) {
                    propTween.end = propTween.start;
                    propTween.start = 0;
                }
            }
        }
    }
    
    function propFilter( props, specialEasing ) {
        var index, name, easing, value, hooks;
    
        // camelCase, specialEasing and expand cssHook pass
        for ( index in props ) {
            name = camelCase( index );
            easing = specialEasing[ name ];
            value = props[ index ];
            if ( Array.isArray( value ) ) {
                easing = value[ 1 ];
                value = props[ index ] = value[ 0 ];
            }
    
            if ( index !== name ) {
                props[ name ] = value;
                delete props[ index ];
            }
    
            hooks = jQuery.cssHooks[ name ];
            if ( hooks && "expand" in hooks ) {
                value = hooks.expand( value );
                delete props[ name ];
    
                // Not quite $.extend, this won't overwrite existing keys.
                // Reusing 'index' because we have the correct "name"
                for ( index in value ) {
                    if ( !( index in props ) ) {
                        props[ index ] = value[ index ];
                        specialEasing[ index ] = easing;
                    }
                }
            } else {
                specialEasing[ name ] = easing;
            }
        }
    }
    
    function Animation( elem, properties, options ) {
        var result,
            stopped,
            index = 0,
            length = Animation.prefilters.length,
            deferred = jQuery.Deferred().always( function() {
    
                // Don't match elem in the :animated selector
                delete tick.elem;
            } ),
            tick = function() {
                if ( stopped ) {
                    return false;
                }
                var currentTime = fxNow || createFxNow(),
                    remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
    
                    // Support: Android 2.3 only
                    // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (trac-12497)
                    temp = remaining / animation.duration || 0,
                    percent = 1 - temp,
                    index = 0,
                    length = animation.tweens.length;
    
                for ( ; index < length; index++ ) {
                    animation.tweens[ index ].run( percent );
                }
    
                deferred.notifyWith( elem, [ animation, percent, remaining ] );
    
                // If there's more to do, yield
                if ( percent < 1 && length ) {
                    return remaining;
                }
    
                // If this was an empty animation, synthesize a final progress notification
                if ( !length ) {
                    deferred.notifyWith( elem, [ animation, 1, 0 ] );
                }
    
                // Resolve the animation and report its conclusion
                deferred.resolveWith( elem, [ animation ] );
                return false;
            },
            animation = deferred.promise( {
                elem: elem,
                props: jQuery.extend( {}, properties ),
                opts: jQuery.extend( true, {
                    specialEasing: {},
                    easing: jQuery.easing._default
                }, options ),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function( prop, end ) {
                    var tween = jQuery.Tween( elem, animation.opts, prop, end,
                        animation.opts.specialEasing[ prop ] || animation.opts.easing );
                    animation.tweens.push( tween );
                    return tween;
                },
                stop: function( gotoEnd ) {
                    var index = 0,
    
                        // If we are going to the end, we want to run all the tweens
                        // otherwise we skip this part
                        length = gotoEnd ? animation.tweens.length : 0;
                    if ( stopped ) {
                        return this;
                    }
                    stopped = true;
                    for ( ; index < length; index++ ) {
                        animation.tweens[ index ].run( 1 );
                    }
    
                    // Resolve when we played the last frame; otherwise, reject
                    if ( gotoEnd ) {
                        deferred.notifyWith( elem, [ animation, 1, 0 ] );
                        deferred.resolveWith( elem, [ animation, gotoEnd ] );
                    } else {
                        deferred.rejectWith( elem, [ animation, gotoEnd ] );
                    }
                    return this;
                }
            } ),
            props = animation.props;
    
        propFilter( props, animation.opts.specialEasing );
    
        for ( ; index < length; index++ ) {
            result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
            if ( result ) {
                if ( isFunction( result.stop ) ) {
                    jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
                        result.stop.bind( result );
                }
                return result;
            }
        }
    
        jQuery.map( props, createTween, animation );
    
        if ( isFunction( animation.opts.start ) ) {
            animation.opts.start.call( elem, animation );
        }
    
        // Attach callbacks from options
        animation
            .progress( animation.opts.progress )
            .done( animation.opts.done, animation.opts.complete )
            .fail( animation.opts.fail )
            .always( animation.opts.always );
    
        jQuery.fx.timer(
            jQuery.extend( tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue
            } )
        );
    
        return animation;
    }
    
    jQuery.Animation = jQuery.extend( Animation, {
    
        tweeners: {
            "*": [ function( prop, value ) {
                var tween = this.createTween( prop, value );
                adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
                return tween;
            } ]
        },
    
        tweener: function( props, callback ) {
            if ( isFunction( props ) ) {
                callback = props;
                props = [ "*" ];
            } else {
                props = props.match( rnothtmlwhite );
            }
    
            var prop,
                index = 0,
                length = props.length;
    
            for ( ; index < length; index++ ) {
                prop = props[ index ];
                Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
                Animation.tweeners[ prop ].unshift( callback );
            }
        },
    
        prefilters: [ defaultPrefilter ],
    
        prefilter: function( callback, prepend ) {
            if ( prepend ) {
                Animation.prefilters.unshift( callback );
            } else {
                Animation.prefilters.push( callback );
            }
        }
    } );
    
    jQuery.speed = function( speed, easing, fn ) {
        var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
            complete: fn || !fn && easing ||
                isFunction( speed ) && speed,
            duration: speed,
            easing: fn && easing || easing && !isFunction( easing ) && easing
        };
    
        // Go to the end state if fx are off
        if ( jQuery.fx.off ) {
            opt.duration = 0;
    
        } else {
            if ( typeof opt.duration !== "number" ) {
                if ( opt.duration in jQuery.fx.speeds ) {
                    opt.duration = jQuery.fx.speeds[ opt.duration ];
    
                } else {
                    opt.duration = jQuery.fx.speeds._default;
                }
            }
        }
    
        // Normalize opt.queue - true/undefined/null -> "fx"
        if ( opt.queue == null || opt.queue === true ) {
            opt.queue = "fx";
        }
    
        // Queueing
        opt.old = opt.complete;
    
        opt.complete = function() {
            if ( isFunction( opt.old ) ) {
                opt.old.call( this );
            }
    
            if ( opt.queue ) {
                jQuery.dequeue( this, opt.queue );
            }
        };
    
        return opt;
    };
    
    jQuery.fn.extend( {
        fadeTo: function( speed, to, easing, callback ) {
    
            // Show any hidden elements after setting opacity to 0
            return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()
    
                // Animate to the value specified
                .end().animate( { opacity: to }, speed, easing, callback );
        },
        animate: function( prop, speed, easing, callback ) {
            var empty = jQuery.isEmptyObject( prop ),
                optall = jQuery.speed( speed, easing, callback ),
                doAnimation = function() {
    
                    // Operate on a copy of prop so per-property easing won't be lost
                    var anim = Animation( this, jQuery.extend( {}, prop ), optall );
    
                    // Empty animations, or finishing resolves immediately
                    if ( empty || dataPriv.get( this, "finish" ) ) {
                        anim.stop( true );
                    }
                };
    
            doAnimation.finish = doAnimation;
    
            return empty || optall.queue === false ?
                this.each( doAnimation ) :
                this.queue( optall.queue, doAnimation );
        },
        stop: function( type, clearQueue, gotoEnd ) {
            var stopQueue = function( hooks ) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop( gotoEnd );
            };
    
            if ( typeof type !== "string" ) {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if ( clearQueue ) {
                this.queue( type || "fx", [] );
            }
    
            return this.each( function() {
                var dequeue = true,
                    index = type != null && type + "queueHooks",
                    timers = jQuery.timers,
                    data = dataPriv.get( this );
    
                if ( index ) {
                    if ( data[ index ] && data[ index ].stop ) {
                        stopQueue( data[ index ] );
                    }
                } else {
                    for ( index in data ) {
                        if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
                            stopQueue( data[ index ] );
                        }
                    }
                }
    
                for ( index = timers.length; index--; ) {
                    if ( timers[ index ].elem === this &&
                        ( type == null || timers[ index ].queue === type ) ) {
    
                        timers[ index ].anim.stop( gotoEnd );
                        dequeue = false;
                        timers.splice( index, 1 );
                    }
                }
    
                // Start the next in the queue if the last step wasn't forced.
                // Timers currently will call their complete callbacks, which
                // will dequeue but only if they were gotoEnd.
                if ( dequeue || !gotoEnd ) {
                    jQuery.dequeue( this, type );
                }
            } );
        },
        finish: function( type ) {
            if ( type !== false ) {
                type = type || "fx";
            }
            return this.each( function() {
                var index,
                    data = dataPriv.get( this ),
                    queue = data[ type + "queue" ],
                    hooks = data[ type + "queueHooks" ],
                    timers = jQuery.timers,
                    length = queue ? queue.length : 0;
    
                // Enable finishing flag on private data
                data.finish = true;
    
                // Empty the queue first
                jQuery.queue( this, type, [] );
    
                if ( hooks && hooks.stop ) {
                    hooks.stop.call( this, true );
                }
    
                // Look for any active animations, and finish them
                for ( index = timers.length; index--; ) {
                    if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
                        timers[ index ].anim.stop( true );
                        timers.splice( index, 1 );
                    }
                }
    
                // Look for any animations in the old queue and finish them
                for ( index = 0; index < length; index++ ) {
                    if ( queue[ index ] && queue[ index ].finish ) {
                        queue[ index ].finish.call( this );
                    }
                }
    
                // Turn off finishing flag
                delete data.finish;
            } );
        }
    } );
    
    jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
        var cssFn = jQuery.fn[ name ];
        jQuery.fn[ name ] = function( speed, easing, callback ) {
            return speed == null || typeof speed === "boolean" ?
                cssFn.apply( this, arguments ) :
                this.animate( genFx( name, true ), speed, easing, callback );
        };
    } );
    
    // Generate shortcuts for custom animations
    jQuery.each( {
        slideDown: genFx( "show" ),
        slideUp: genFx( "hide" ),
        slideToggle: genFx( "toggle" ),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" }
    }, function( name, props ) {
        jQuery.fn[ name ] = function( speed, easing, callback ) {
            return this.animate( props, speed, easing, callback );
        };
    } );
    
    jQuery.timers = [];
    jQuery.fx.tick = function() {
        var timer,
            i = 0,
            timers = jQuery.timers;
    
        fxNow = Date.now();
    
        for ( ; i < timers.length; i++ ) {
            timer = timers[ i ];
    
            // Run the timer and safely remove it when done (allowing for external removal)
            if ( !timer() && timers[ i ] === timer ) {
                timers.splice( i--, 1 );
            }
        }
    
        if ( !timers.length ) {
            jQuery.fx.stop();
        }
        fxNow = undefined;
    };
    
    jQuery.fx.timer = function( timer ) {
        jQuery.timers.push( timer );
        jQuery.fx.start();
    };
    
    jQuery.fx.interval = 13;
    jQuery.fx.start = function() {
        if ( inProgress ) {
            return;
        }
    
        inProgress = true;
        schedule();
    };
    
    jQuery.fx.stop = function() {
        inProgress = null;
    };
    
    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
    
        // Default speed
        _default: 400
    };
    
    
    // Based off of the plugin by Clint Helfers, with permission.
    jQuery.fn.delay = function( time, type ) {
        time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
        type = type || "fx";
    
        return this.queue( type, function( next, hooks ) {
            var timeout = window.setTimeout( next, time );
            hooks.stop = function() {
                window.clearTimeout( timeout );
            };
        } );
    };
    
    
    ( function() {
        var input = document.createElement( "input" ),
            select = document.createElement( "select" ),
            opt = select.appendChild( document.createElement( "option" ) );
    
        input.type = "checkbox";
    
        // Support: Android <=4.3 only
        // Default value for a checkbox should be "on"
        support.checkOn = input.value !== "";
    
        // Support: IE <=11 only
        // Must access selectedIndex to make default options select
        support.optSelected = opt.selected;
    
        // Support: IE <=11 only
        // An input loses its value after becoming a radio
        input = document.createElement( "input" );
        input.value = "t";
        input.type = "radio";
        support.radioValue = input.value === "t";
    } )();
    
    
    var boolHook,
        attrHandle = jQuery.expr.attrHandle;
    
    jQuery.fn.extend( {
        attr: function( name, value ) {
            return access( this, jQuery.attr, name, value, arguments.length > 1 );
        },
    
        removeAttr: function( name ) {
            return this.each( function() {
                jQuery.removeAttr( this, name );
            } );
        }
    } );
    
    jQuery.extend( {
        attr: function( elem, name, value ) {
            var ret, hooks,
                nType = elem.nodeType;
    
            // Don't get/set attributes on text, comment and attribute nodes
            if ( nType === 3 || nType === 8 || nType === 2 ) {
                return;
            }
    
            // Fallback to prop when attributes are not supported
            if ( typeof elem.getAttribute === "undefined" ) {
                return jQuery.prop( elem, name, value );
            }
    
            // Attribute hooks are determined by the lowercase version
            // Grab necessary hook if one is defined
            if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
                hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
                    ( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
            }
    
            if ( value !== undefined ) {
                if ( value === null ) {
                    jQuery.removeAttr( elem, name );
                    return;
                }
    
                if ( hooks && "set" in hooks &&
                    ( ret = hooks.set( elem, value, name ) ) !== undefined ) {
                    return ret;
                }
    
                elem.setAttribute( name, value + "" );
                return value;
            }
    
            if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
                return ret;
            }
    
            ret = jQuery.find.attr( elem, name );
    
            // Non-existent attributes return null, we normalize to undefined
            return ret == null ? undefined : ret;
        },
    
        attrHooks: {
            type: {
                set: function( elem, value ) {
                    if ( !support.radioValue && value === "radio" &&
                        nodeName( elem, "input" ) ) {
                        var val = elem.value;
                        elem.setAttribute( "type", value );
                        if ( val ) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            }
        },
    
        removeAttr: function( elem, value ) {
            var name,
                i = 0,
    
                // Attribute names can contain non-HTML whitespace characters
                // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
                attrNames = value && value.match( rnothtmlwhite );
    
            if ( attrNames && elem.nodeType === 1 ) {
                while ( ( name = attrNames[ i++ ] ) ) {
                    elem.removeAttribute( name );
                }
            }
        }
    } );
    
    // Hooks for boolean attributes
    boolHook = {
        set: function( elem, value, name ) {
            if ( value === false ) {
    
                // Remove boolean attributes when set to false
                jQuery.removeAttr( elem, name );
            } else {
                elem.setAttribute( name, name );
            }
            return name;
        }
    };
    
    jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
        var getter = attrHandle[ name ] || jQuery.find.attr;
    
        attrHandle[ name ] = function( elem, name, isXML ) {
            var ret, handle,
                lowercaseName = name.toLowerCase();
    
            if ( !isXML ) {
    
                // Avoid an infinite loop by temporarily removing this function from the getter
                handle = attrHandle[ lowercaseName ];
                attrHandle[ lowercaseName ] = ret;
                ret = getter( elem, name, isXML ) != null ?
                    lowercaseName :
                    null;
                attrHandle[ lowercaseName ] = handle;
            }
            return ret;
        };
    } );
    
    
    
    
    var rfocusable = /^(?:input|select|textarea|button)$/i,
        rclickable = /^(?:a|area)$/i;
    
    jQuery.fn.extend( {
        prop: function( name, value ) {
            return access( this, jQuery.prop, name, value, arguments.length > 1 );
        },
    
        removeProp: function( name ) {
            return this.each( function() {
                delete this[ jQuery.propFix[ name ] || name ];
            } );
        }
    } );
    
    jQuery.extend( {
        prop: function( elem, name, value ) {
            var ret, hooks,
                nType = elem.nodeType;
    
            // Don't get/set properties on text, comment and attribute nodes
            if ( nType === 3 || nType === 8 || nType === 2 ) {
                return;
            }
    
            if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
    
                // Fix name and attach hooks
                name = jQuery.propFix[ name ] || name;
                hooks = jQuery.propHooks[ name ];
            }
    
            if ( value !== undefined ) {
                if ( hooks && "set" in hooks &&
                    ( ret = hooks.set( elem, value, name ) ) !== undefined ) {
                    return ret;
                }
    
                return ( elem[ name ] = value );
            }
    
            if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
                return ret;
            }
    
            return elem[ name ];
        },
    
        propHooks: {
            tabIndex: {
                get: function( elem ) {
    
                    // Support: IE <=9 - 11 only
                    // elem.tabIndex doesn't always return the
                    // correct value when it hasn't been explicitly set
                    // Use proper attribute retrieval (trac-12072)
                    var tabindex = jQuery.find.attr( elem, "tabindex" );
    
                    if ( tabindex ) {
                        return parseInt( tabindex, 10 );
                    }
    
                    if (
                        rfocusable.test( elem.nodeName ) ||
                        rclickable.test( elem.nodeName ) &&
                        elem.href
                    ) {
                        return 0;
                    }
    
                    return -1;
                }
            }
        },
    
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    } );
    
    // Support: IE <=11 only
    // Accessing the selectedIndex property
    // forces the browser to respect setting selected
    // on the option
    // The getter ensures a default option is selected
    // when in an optgroup
    // eslint rule "no-unused-expressions" is disabled for this code
    // since it considers such accessions noop
    if ( !support.optSelected ) {
        jQuery.propHooks.selected = {
            get: function( elem ) {
    
                /* eslint no-unused-expressions: "off" */
    
                var parent = elem.parentNode;
                if ( parent && parent.parentNode ) {
                    parent.parentNode.selectedIndex;
                }
                return null;
            },
            set: function( elem ) {
    
                /* eslint no-unused-expressions: "off" */
    
                var parent = elem.parentNode;
                if ( parent ) {
                    parent.selectedIndex;
    
                    if ( parent.parentNode ) {
                        parent.parentNode.selectedIndex;
                    }
                }
            }
        };
    }
    
    jQuery.each( [
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable"
    ], function() {
        jQuery.propFix[ this.toLowerCase() ] = this;
    } );
    
    
    
    
        // Strip and collapse whitespace according to HTML spec
        // https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
        function stripAndCollapse( value ) {
            var tokens = value.match( rnothtmlwhite ) || [];
            return tokens.join( " " );
        }
    
    
    function getClass( elem ) {
        return elem.getAttribute && elem.getAttribute( "class" ) || "";
    }
    
    function classesToArray( value ) {
        if ( Array.isArray( value ) ) {
            return value;
        }
        if ( typeof value === "string" ) {
            return value.match( rnothtmlwhite ) || [];
        }
        return [];
    }
    
    jQuery.fn.extend( {
        addClass: function( value ) {
            var classNames, cur, curValue, className, i, finalValue;
    
            if ( isFunction( value ) ) {
                return this.each( function( j ) {
                    jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
                } );
            }
    
            classNames = classesToArray( value );
    
            if ( classNames.length ) {
                return this.each( function() {
                    curValue = getClass( this );
                    cur = this.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );
    
                    if ( cur ) {
                        for ( i = 0; i < classNames.length; i++ ) {
                            className = classNames[ i ];
                            if ( cur.indexOf( " " + className + " " ) < 0 ) {
                                cur += className + " ";
                            }
                        }
    
                        // Only assign if different to avoid unneeded rendering.
                        finalValue = stripAndCollapse( cur );
                        if ( curValue !== finalValue ) {
                            this.setAttribute( "class", finalValue );
                        }
                    }
                } );
            }
    
            return this;
        },
    
        removeClass: function( value ) {
            var classNames, cur, curValue, className, i, finalValue;
    
            if ( isFunction( value ) ) {
                return this.each( function( j ) {
                    jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
                } );
            }
    
            if ( !arguments.length ) {
                return this.attr( "class", "" );
            }
    
            classNames = classesToArray( value );
    
            if ( classNames.length ) {
                return this.each( function() {
                    curValue = getClass( this );
    
                    // This expression is here for better compressibility (see addClass)
                    cur = this.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );
    
                    if ( cur ) {
                        for ( i = 0; i < classNames.length; i++ ) {
                            className = classNames[ i ];
    
                            // Remove *all* instances
                            while ( cur.indexOf( " " + className + " " ) > -1 ) {
                                cur = cur.replace( " " + className + " ", " " );
                            }
                        }
    
                        // Only assign if different to avoid unneeded rendering.
                        finalValue = stripAndCollapse( cur );
                        if ( curValue !== finalValue ) {
                            this.setAttribute( "class", finalValue );
                        }
                    }
                } );
            }
    
            return this;
        },
    
        toggleClass: function( value, stateVal ) {
            var classNames, className, i, self,
                type = typeof value,
                isValidValue = type === "string" || Array.isArray( value );
    
            if ( isFunction( value ) ) {
                return this.each( function( i ) {
                    jQuery( this ).toggleClass(
                        value.call( this, i, getClass( this ), stateVal ),
                        stateVal
                    );
                } );
            }
    
            if ( typeof stateVal === "boolean" && isValidValue ) {
                return stateVal ? this.addClass( value ) : this.removeClass( value );
            }
    
            classNames = classesToArray( value );
    
            return this.each( function() {
                if ( isValidValue ) {
    
                    // Toggle individual class names
                    self = jQuery( this );
    
                    for ( i = 0; i < classNames.length; i++ ) {
                        className = classNames[ i ];
    
                        // Check each className given, space separated list
                        if ( self.hasClass( className ) ) {
                            self.removeClass( className );
                        } else {
                            self.addClass( className );
                        }
                    }
    
                // Toggle whole class name
                } else if ( value === undefined || type === "boolean" ) {
                    className = getClass( this );
                    if ( className ) {
    
                        // Store className if set
                        dataPriv.set( this, "__className__", className );
                    }
    
                    // If the element has a class name or if we're passed `false`,
                    // then remove the whole classname (if there was one, the above saved it).
                    // Otherwise bring back whatever was previously saved (if anything),
                    // falling back to the empty string if nothing was stored.
                    if ( this.setAttribute ) {
                        this.setAttribute( "class",
                            className || value === false ?
                                "" :
                                dataPriv.get( this, "__className__" ) || ""
                        );
                    }
                }
            } );
        },
    
        hasClass: function( selector ) {
            var className, elem,
                i = 0;
    
            className = " " + selector + " ";
            while ( ( elem = this[ i++ ] ) ) {
                if ( elem.nodeType === 1 &&
                    ( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
                    return true;
                }
            }
    
            return false;
        }
    } );
    
    
    
    
    var rreturn = /\r/g;
    
    jQuery.fn.extend( {
        val: function( value ) {
            var hooks, ret, valueIsFunction,
                elem = this[ 0 ];
    
            if ( !arguments.length ) {
                if ( elem ) {
                    hooks = jQuery.valHooks[ elem.type ] ||
                        jQuery.valHooks[ elem.nodeName.toLowerCase() ];
    
                    if ( hooks &&
                        "get" in hooks &&
                        ( ret = hooks.get( elem, "value" ) ) !== undefined
                    ) {
                        return ret;
                    }
    
                    ret = elem.value;
    
                    // Handle most common string cases
                    if ( typeof ret === "string" ) {
                        return ret.replace( rreturn, "" );
                    }
    
                    // Handle cases where value is null/undef or number
                    return ret == null ? "" : ret;
                }
    
                return;
            }
    
            valueIsFunction = isFunction( value );
    
            return this.each( function( i ) {
                var val;
    
                if ( this.nodeType !== 1 ) {
                    return;
                }
    
                if ( valueIsFunction ) {
                    val = value.call( this, i, jQuery( this ).val() );
                } else {
                    val = value;
                }
    
                // Treat null/undefined as ""; convert numbers to string
                if ( val == null ) {
                    val = "";
    
                } else if ( typeof val === "number" ) {
                    val += "";
    
                } else if ( Array.isArray( val ) ) {
                    val = jQuery.map( val, function( value ) {
                        return value == null ? "" : value + "";
                    } );
                }
    
                hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];
    
                // If set returns undefined, fall back to normal setting
                if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
                    this.value = val;
                }
            } );
        }
    } );
    
    jQuery.extend( {
        valHooks: {
            option: {
                get: function( elem ) {
    
                    var val = jQuery.find.attr( elem, "value" );
                    return val != null ?
                        val :
    
                        // Support: IE <=10 - 11 only
                        // option.text throws exceptions (trac-14686, trac-14858)
                        // Strip and collapse whitespace
                        // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
                        stripAndCollapse( jQuery.text( elem ) );
                }
            },
            select: {
                get: function( elem ) {
                    var value, option, i,
                        options = elem.options,
                        index = elem.selectedIndex,
                        one = elem.type === "select-one",
                        values = one ? null : [],
                        max = one ? index + 1 : options.length;
    
                    if ( index < 0 ) {
                        i = max;
    
                    } else {
                        i = one ? index : 0;
                    }
    
                    // Loop through all the selected options
                    for ( ; i < max; i++ ) {
                        option = options[ i ];
    
                        // Support: IE <=9 only
                        // IE8-9 doesn't update selected after form reset (trac-2551)
                        if ( ( option.selected || i === index ) &&
    
                                // Don't return options that are disabled or in a disabled optgroup
                                !option.disabled &&
                                ( !option.parentNode.disabled ||
                                    !nodeName( option.parentNode, "optgroup" ) ) ) {
    
                            // Get the specific value for the option
                            value = jQuery( option ).val();
    
                            // We don't need an array for one selects
                            if ( one ) {
                                return value;
                            }
    
                            // Multi-Selects return an array
                            values.push( value );
                        }
                    }
    
                    return values;
                },
    
                set: function( elem, value ) {
                    var optionSet, option,
                        options = elem.options,
                        values = jQuery.makeArray( value ),
                        i = options.length;
    
                    while ( i-- ) {
                        option = options[ i ];
    
                        /* eslint-disable no-cond-assign */
    
                        if ( option.selected =
                            jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
                        ) {
                            optionSet = true;
                        }
    
                        /* eslint-enable no-cond-assign */
                    }
    
                    // Force browsers to behave consistently when non-matching value is set
                    if ( !optionSet ) {
                        elem.selectedIndex = -1;
                    }
                    return values;
                }
            }
        }
    } );
    
    // Radios and checkboxes getter/setter
    jQuery.each( [ "radio", "checkbox" ], function() {
        jQuery.valHooks[ this ] = {
            set: function( elem, value ) {
                if ( Array.isArray( value ) ) {
                    return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
                }
            }
        };
        if ( !support.checkOn ) {
            jQuery.valHooks[ this ].get = function( elem ) {
                return elem.getAttribute( "value" ) === null ? "on" : elem.value;
            };
        }
    } );
    
    
    
    
    // Return jQuery for attributes-only inclusion
    
    
    support.focusin = "onfocusin" in window;
    
    
    var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        stopPropagationCallback = function( e ) {
            e.stopPropagation();
        };
    
    jQuery.extend( jQuery.event, {
    
        trigger: function( event, data, elem, onlyHandlers ) {
    
            var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
                eventPath = [ elem || document ],
                type = hasOwn.call( event, "type" ) ? event.type : event,
                namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];
    
            cur = lastElement = tmp = elem = elem || document;
    
            // Don't do events on text and comment nodes
            if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
                return;
            }
    
            // focus/blur morphs to focusin/out; ensure we're not firing them right now
            if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
                return;
            }
    
            if ( type.indexOf( "." ) > -1 ) {
    
                // Namespaced trigger; create a regexp to match event type in handle()
                namespaces = type.split( "." );
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf( ":" ) < 0 && "on" + type;
    
            // Caller can pass in a jQuery.Event object, Object, or just an event type string
            event = event[ jQuery.expando ] ?
                event :
                new jQuery.Event( type, typeof event === "object" && event );
    
            // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join( "." );
            event.rnamespace = event.namespace ?
                new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
                null;
    
            // Clean up the event in case it is being reused
            event.result = undefined;
            if ( !event.target ) {
                event.target = elem;
            }
    
            // Clone any incoming data and prepend the event, creating the handler arg list
            data = data == null ?
                [ event ] :
                jQuery.makeArray( data, [ event ] );
    
            // Allow special events to draw outside the lines
            special = jQuery.event.special[ type ] || {};
            if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
                return;
            }
    
            // Determine event propagation path in advance, per W3C events spec (trac-9951)
            // Bubble up to document, then to window; watch for a global ownerDocument var (trac-9724)
            if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {
    
                bubbleType = special.delegateType || type;
                if ( !rfocusMorph.test( bubbleType + type ) ) {
                    cur = cur.parentNode;
                }
                for ( ; cur; cur = cur.parentNode ) {
                    eventPath.push( cur );
                    tmp = cur;
                }
    
                // Only add window if we got to document (e.g., not plain obj or detached DOM)
                if ( tmp === ( elem.ownerDocument || document ) ) {
                    eventPath.push( tmp.defaultView || tmp.parentWindow || window );
                }
            }
    
            // Fire handlers on the event path
            i = 0;
            while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
                lastElement = cur;
                event.type = i > 1 ?
                    bubbleType :
                    special.bindType || type;
    
                // jQuery handler
                handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
                    dataPriv.get( cur, "handle" );
                if ( handle ) {
                    handle.apply( cur, data );
                }
    
                // Native handler
                handle = ontype && cur[ ontype ];
                if ( handle && handle.apply && acceptData( cur ) ) {
                    event.result = handle.apply( cur, data );
                    if ( event.result === false ) {
                        event.preventDefault();
                    }
                }
            }
            event.type = type;
    
            // If nobody prevented the default action, do it now
            if ( !onlyHandlers && !event.isDefaultPrevented() ) {
    
                if ( ( !special._default ||
                    special._default.apply( eventPath.pop(), data ) === false ) &&
                    acceptData( elem ) ) {
    
                    // Call a native DOM method on the target with the same name as the event.
                    // Don't do default actions on window, that's where global variables be (trac-6170)
                    if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {
    
                        // Don't re-trigger an onFOO event when we call its FOO() method
                        tmp = elem[ ontype ];
    
                        if ( tmp ) {
                            elem[ ontype ] = null;
                        }
    
                        // Prevent re-triggering of the same event, since we already bubbled it above
                        jQuery.event.triggered = type;
    
                        if ( event.isPropagationStopped() ) {
                            lastElement.addEventListener( type, stopPropagationCallback );
                        }
    
                        elem[ type ]();
    
                        if ( event.isPropagationStopped() ) {
                            lastElement.removeEventListener( type, stopPropagationCallback );
                        }
    
                        jQuery.event.triggered = undefined;
    
                        if ( tmp ) {
                            elem[ ontype ] = tmp;
                        }
                    }
                }
            }
    
            return event.result;
        },
    
        // Piggyback on a donor event to simulate a different one
        // Used only for `focus(in | out)` events
        simulate: function( type, elem, event ) {
            var e = jQuery.extend(
                new jQuery.Event(),
                event,
                {
                    type: type,
                    isSimulated: true
                }
            );
    
            jQuery.event.trigger( e, null, elem );
        }
    
    } );
    
    jQuery.fn.extend( {
    
        trigger: function( type, data ) {
            return this.each( function() {
                jQuery.event.trigger( type, data, this );
            } );
        },
        triggerHandler: function( type, data ) {
            var elem = this[ 0 ];
            if ( elem ) {
                return jQuery.event.trigger( type, data, elem, true );
            }
        }
    } );
    
    
    // Support: Firefox <=44
    // Firefox doesn't have focus(in | out) events
    // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
    //
    // Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
    // focus(in | out) events fire after focus & blur events,
    // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
    // Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
    if ( !support.focusin ) {
        jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {
    
            // Attach a single capturing handler on the document while someone wants focusin/focusout
            var handler = function( event ) {
                jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
            };
    
            jQuery.event.special[ fix ] = {
                setup: function() {
    
                    // Handle: regular nodes (via `this.ownerDocument`), window
                    // (via `this.document`) & document (via `this`).
                    var doc = this.ownerDocument || this.document || this,
                        attaches = dataPriv.access( doc, fix );
    
                    if ( !attaches ) {
                        doc.addEventListener( orig, handler, true );
                    }
                    dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
                },
                teardown: function() {
                    var doc = this.ownerDocument || this.document || this,
                        attaches = dataPriv.access( doc, fix ) - 1;
    
                    if ( !attaches ) {
                        doc.removeEventListener( orig, handler, true );
                        dataPriv.remove( doc, fix );
    
                    } else {
                        dataPriv.access( doc, fix, attaches );
                    }
                }
            };
        } );
    }
    var location = window.location;
    
    var nonce = { guid: Date.now() };
    
    var rquery = ( /\?/ );
    
    
    
    // Cross-browser xml parsing
    jQuery.parseXML = function( data ) {
        var xml, parserErrorElem;
        if ( !data || typeof data !== "string" ) {
            return null;
        }
    
        // Support: IE 9 - 11 only
        // IE throws on parseFromString with invalid input.
        try {
            xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
        } catch ( e ) {}
    
        parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
        if ( !xml || parserErrorElem ) {
            jQuery.error( "Invalid XML: " + (
                parserErrorElem ?
                    jQuery.map( parserErrorElem.childNodes, function( el ) {
                        return el.textContent;
                    } ).join( "\n" ) :
                    data
            ) );
        }
        return xml;
    };
    
    
    var
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;
    
    function buildParams( prefix, obj, traditional, add ) {
        var name;
    
        if ( Array.isArray( obj ) ) {
    
            // Serialize array item.
            jQuery.each( obj, function( i, v ) {
                if ( traditional || rbracket.test( prefix ) ) {
    
                    // Treat each array item as a scalar.
                    add( prefix, v );
    
                } else {
    
                    // Item is non-scalar (array or object), encode its numeric index.
                    buildParams(
                        prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
                        v,
                        traditional,
                        add
                    );
                }
            } );
    
        } else if ( !traditional && toType( obj ) === "object" ) {
    
            // Serialize object item.
            for ( name in obj ) {
                buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
            }
    
        } else {
    
            // Serialize scalar item.
            add( prefix, obj );
        }
    }
    
    // Serialize an array of form elements or a set of
    // key/values into a query string
    jQuery.param = function( a, traditional ) {
        var prefix,
            s = [],
            add = function( key, valueOrFunction ) {
    
                // If value is a function, invoke it and use its return value
                var value = isFunction( valueOrFunction ) ?
                    valueOrFunction() :
                    valueOrFunction;
    
                s[ s.length ] = encodeURIComponent( key ) + "=" +
                    encodeURIComponent( value == null ? "" : value );
            };
    
        if ( a == null ) {
            return "";
        }
    
        // If an array was passed in, assume that it is an array of form elements.
        if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
    
            // Serialize the form elements
            jQuery.each( a, function() {
                add( this.name, this.value );
            } );
    
        } else {
    
            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for ( prefix in a ) {
                buildParams( prefix, a[ prefix ], traditional, add );
            }
        }
    
        // Return the resulting serialization
        return s.join( "&" );
    };
    
    jQuery.fn.extend( {
        serialize: function() {
            return jQuery.param( this.serializeArray() );
        },
        serializeArray: function() {
            return this.map( function() {
    
                // Can add propHook for "elements" to filter or add form elements
                var elements = jQuery.prop( this, "elements" );
                return elements ? jQuery.makeArray( elements ) : this;
            } ).filter( function() {
                var type = this.type;
    
                // Use .is( ":disabled" ) so that fieldset[disabled] works
                return this.name && !jQuery( this ).is( ":disabled" ) &&
                    rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
                    ( this.checked || !rcheckableType.test( type ) );
            } ).map( function( _i, elem ) {
                var val = jQuery( this ).val();
    
                if ( val == null ) {
                    return null;
                }
    
                if ( Array.isArray( val ) ) {
                    return jQuery.map( val, function( val ) {
                        return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
                    } );
                }
    
                return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
            } ).get();
        }
    } );
    
    
    var
        r20 = /%20/g,
        rhash = /#.*$/,
        rantiCache = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
    
        // trac-7653, trac-8125, trac-8152: local protocol detection
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
    
        /* Prefilters
         * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
         * 2) These are called:
         *    - BEFORE asking for a transport
         *    - AFTER param serialization (s.data is a string if s.processData is true)
         * 3) key is the dataType
         * 4) the catchall symbol "*" can be used
         * 5) execution will start with transport dataType and THEN continue down to "*" if needed
         */
        prefilters = {},
    
        /* Transports bindings
         * 1) key is the dataType
         * 2) the catchall symbol "*" can be used
         * 3) selection will start with transport dataType and THEN go to "*" if needed
         */
        transports = {},
    
        // Avoid comment-prolog char sequence (trac-10098); must appease lint and evade compression
        allTypes = "*/".concat( "*" ),
    
        // Anchor tag for parsing the document origin
        originAnchor = document.createElement( "a" );
    
    originAnchor.href = location.href;
    
    // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
    function addToPrefiltersOrTransports( structure ) {
    
        // dataTypeExpression is optional and defaults to "*"
        return function( dataTypeExpression, func ) {
    
            if ( typeof dataTypeExpression !== "string" ) {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }
    
            var dataType,
                i = 0,
                dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];
    
            if ( isFunction( func ) ) {
    
                // For each dataType in the dataTypeExpression
                while ( ( dataType = dataTypes[ i++ ] ) ) {
    
                    // Prepend if requested
                    if ( dataType[ 0 ] === "+" ) {
                        dataType = dataType.slice( 1 ) || "*";
                        ( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );
    
                    // Otherwise append
                    } else {
                        ( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
                    }
                }
            }
        };
    }
    
    // Base inspection function for prefilters and transports
    function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {
    
        var inspected = {},
            seekingTransport = ( structure === transports );
    
        function inspect( dataType ) {
            var selected;
            inspected[ dataType ] = true;
            jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
                var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
                if ( typeof dataTypeOrTransport === "string" &&
                    !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
    
                    options.dataTypes.unshift( dataTypeOrTransport );
                    inspect( dataTypeOrTransport );
                    return false;
                } else if ( seekingTransport ) {
                    return !( selected = dataTypeOrTransport );
                }
            } );
            return selected;
        }
    
        return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
    }
    
    // A special extend for ajax options
    // that takes "flat" options (not to be deep extended)
    // Fixes trac-9887
    function ajaxExtend( target, src ) {
        var key, deep,
            flatOptions = jQuery.ajaxSettings.flatOptions || {};
    
        for ( key in src ) {
            if ( src[ key ] !== undefined ) {
                ( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
            }
        }
        if ( deep ) {
            jQuery.extend( true, target, deep );
        }
    
        return target;
    }
    
    /* Handles responses to an ajax request:
     * - finds the right dataType (mediates between content-type and expected dataType)
     * - returns the corresponding response
     */
    function ajaxHandleResponses( s, jqXHR, responses ) {
    
        var ct, type, finalDataType, firstDataType,
            contents = s.contents,
            dataTypes = s.dataTypes;
    
        // Remove auto dataType and get content-type in the process
        while ( dataTypes[ 0 ] === "*" ) {
            dataTypes.shift();
            if ( ct === undefined ) {
                ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
            }
        }
    
        // Check if we're dealing with a known content-type
        if ( ct ) {
            for ( type in contents ) {
                if ( contents[ type ] && contents[ type ].test( ct ) ) {
                    dataTypes.unshift( type );
                    break;
                }
            }
        }
    
        // Check to see if we have a response for the expected dataType
        if ( dataTypes[ 0 ] in responses ) {
            finalDataType = dataTypes[ 0 ];
        } else {
    
            // Try convertible dataTypes
            for ( type in responses ) {
                if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
                    finalDataType = type;
                    break;
                }
                if ( !firstDataType ) {
                    firstDataType = type;
                }
            }
    
            // Or just use first one
            finalDataType = finalDataType || firstDataType;
        }
    
        // If we found a dataType
        // We add the dataType to the list if needed
        // and return the corresponding response
        if ( finalDataType ) {
            if ( finalDataType !== dataTypes[ 0 ] ) {
                dataTypes.unshift( finalDataType );
            }
            return responses[ finalDataType ];
        }
    }
    
    /* Chain conversions given the request and the original response
     * Also sets the responseXXX fields on the jqXHR instance
     */
    function ajaxConvert( s, response, jqXHR, isSuccess ) {
        var conv2, current, conv, tmp, prev,
            converters = {},
    
            // Work with a copy of dataTypes in case we need to modify it for conversion
            dataTypes = s.dataTypes.slice();
    
        // Create converters map with lowercased keys
        if ( dataTypes[ 1 ] ) {
            for ( conv in s.converters ) {
                converters[ conv.toLowerCase() ] = s.converters[ conv ];
            }
        }
    
        current = dataTypes.shift();
    
        // Convert to each sequential dataType
        while ( current ) {
    
            if ( s.responseFields[ current ] ) {
                jqXHR[ s.responseFields[ current ] ] = response;
            }
    
            // Apply the dataFilter if provided
            if ( !prev && isSuccess && s.dataFilter ) {
                response = s.dataFilter( response, s.dataType );
            }
    
            prev = current;
            current = dataTypes.shift();
    
            if ( current ) {
    
                // There's only work to do if current dataType is non-auto
                if ( current === "*" ) {
    
                    current = prev;
    
                // Convert response if prev dataType is non-auto and differs from current
                } else if ( prev !== "*" && prev !== current ) {
    
                    // Seek a direct converter
                    conv = converters[ prev + " " + current ] || converters[ "* " + current ];
    
                    // If none found, seek a pair
                    if ( !conv ) {
                        for ( conv2 in converters ) {
    
                            // If conv2 outputs current
                            tmp = conv2.split( " " );
                            if ( tmp[ 1 ] === current ) {
    
                                // If prev can be converted to accepted input
                                conv = converters[ prev + " " + tmp[ 0 ] ] ||
                                    converters[ "* " + tmp[ 0 ] ];
                                if ( conv ) {
    
                                    // Condense equivalence converters
                                    if ( conv === true ) {
                                        conv = converters[ conv2 ];
    
                                    // Otherwise, insert the intermediate dataType
                                    } else if ( converters[ conv2 ] !== true ) {
                                        current = tmp[ 0 ];
                                        dataTypes.unshift( tmp[ 1 ] );
                                    }
                                    break;
                                }
                            }
                        }
                    }
    
                    // Apply converter (if not an equivalence)
                    if ( conv !== true ) {
    
                        // Unless errors are allowed to bubble, catch and return them
                        if ( conv && s.throws ) {
                            response = conv( response );
                        } else {
                            try {
                                response = conv( response );
                            } catch ( e ) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                };
                            }
                        }
                    }
                }
            }
        }
    
        return { state: "success", data: response };
    }
    
    jQuery.extend( {
    
        // Counter for holding the number of active queries
        active: 0,
    
        // Last-Modified header cache for next request
        lastModified: {},
        etag: {},
    
        ajaxSettings: {
            url: location.href,
            type: "GET",
            isLocal: rlocalProtocol.test( location.protocol ),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    
            /*
            timeout: 0,
            data: null,
            dataType: null,
            username: null,
            password: null,
            cache: null,
            throws: false,
            traditional: false,
            headers: {},
            */
    
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
    
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
    
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
    
            // Data converters
            // Keys separate source (or catchall "*") and destination types with a single space
            converters: {
    
                // Convert anything to text
                "* text": String,
    
                // Text to html (true = no transformation)
                "text html": true,
    
                // Evaluate text as a json expression
                "text json": JSON.parse,
    
                // Parse text as xml
                "text xml": jQuery.parseXML
            },
    
            // For options that shouldn't be deep extended:
            // you can add your own custom options here if
            // and when you create one that shouldn't be
            // deep extended (see ajaxExtend)
            flatOptions: {
                url: true,
                context: true
            }
        },
    
        // Creates a full fledged settings object into target
        // with both ajaxSettings and settings fields.
        // If target is omitted, writes into ajaxSettings.
        ajaxSetup: function( target, settings ) {
            return settings ?
    
                // Building a settings object
                ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :
    
                // Extending ajaxSettings
                ajaxExtend( jQuery.ajaxSettings, target );
        },
    
        ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
        ajaxTransport: addToPrefiltersOrTransports( transports ),
    
        // Main method
        ajax: function( url, options ) {
    
            // If url is an object, simulate pre-1.5 signature
            if ( typeof url === "object" ) {
                options = url;
                url = undefined;
            }
    
            // Force options to be an object
            options = options || {};
    
            var transport,
    
                // URL without anti-cache param
                cacheURL,
    
                // Response headers
                responseHeadersString,
                responseHeaders,
    
                // timeout handle
                timeoutTimer,
    
                // Url cleanup var
                urlAnchor,
    
                // Request state (becomes false upon send and true upon completion)
                completed,
    
                // To know if global events are to be dispatched
                fireGlobals,
    
                // Loop variable
                i,
    
                // uncached part of the url
                uncached,
    
                // Create the final options object
                s = jQuery.ajaxSetup( {}, options ),
    
                // Callbacks context
                callbackContext = s.context || s,
    
                // Context for global events is callbackContext if it is a DOM node or jQuery collection
                globalEventContext = s.context &&
                    ( callbackContext.nodeType || callbackContext.jquery ) ?
                    jQuery( callbackContext ) :
                    jQuery.event,
    
                // Deferreds
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks( "once memory" ),
    
                // Status-dependent callbacks
                statusCode = s.statusCode || {},
    
                // Headers (they are sent all at once)
                requestHeaders = {},
                requestHeadersNames = {},
    
                // Default abort message
                strAbort = "canceled",
    
                // Fake xhr
                jqXHR = {
                    readyState: 0,
    
                    // Builds headers hashtable if needed
                    getResponseHeader: function( key ) {
                        var match;
                        if ( completed ) {
                            if ( !responseHeaders ) {
                                responseHeaders = {};
                                while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
                                    responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
                                        ( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
                                            .concat( match[ 2 ] );
                                }
                            }
                            match = responseHeaders[ key.toLowerCase() + " " ];
                        }
                        return match == null ? null : match.join( ", " );
                    },
    
                    // Raw string
                    getAllResponseHeaders: function() {
                        return completed ? responseHeadersString : null;
                    },
    
                    // Caches the header
                    setRequestHeader: function( name, value ) {
                        if ( completed == null ) {
                            name = requestHeadersNames[ name.toLowerCase() ] =
                                requestHeadersNames[ name.toLowerCase() ] || name;
                            requestHeaders[ name ] = value;
                        }
                        return this;
                    },
    
                    // Overrides response content-type header
                    overrideMimeType: function( type ) {
                        if ( completed == null ) {
                            s.mimeType = type;
                        }
                        return this;
                    },
    
                    // Status-dependent callbacks
                    statusCode: function( map ) {
                        var code;
                        if ( map ) {
                            if ( completed ) {
    
                                // Execute the appropriate callbacks
                                jqXHR.always( map[ jqXHR.status ] );
                            } else {
    
                                // Lazy-add the new callbacks in a way that preserves old ones
                                for ( code in map ) {
                                    statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
                                }
                            }
                        }
                        return this;
                    },
    
                    // Cancel the request
                    abort: function( statusText ) {
                        var finalText = statusText || strAbort;
                        if ( transport ) {
                            transport.abort( finalText );
                        }
                        done( 0, finalText );
                        return this;
                    }
                };
    
            // Attach deferreds
            deferred.promise( jqXHR );
    
            // Add protocol if not provided (prefilters might expect it)
            // Handle falsy url in the settings object (trac-10093: consistency with old signature)
            // We also use the url parameter if available
            s.url = ( ( url || s.url || location.href ) + "" )
                .replace( rprotocol, location.protocol + "//" );
    
            // Alias method option to type as per ticket trac-12004
            s.type = options.method || options.type || s.method || s.type;
    
            // Extract dataTypes list
            s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];
    
            // A cross-domain request is in order when the origin doesn't match the current origin.
            if ( s.crossDomain == null ) {
                urlAnchor = document.createElement( "a" );
    
                // Support: IE <=8 - 11, Edge 12 - 15
                // IE throws exception on accessing the href property if url is malformed,
                // e.g. http://example.com:80x/
                try {
                    urlAnchor.href = s.url;
    
                    // Support: IE <=8 - 11 only
                    // Anchor's host property isn't correctly set when s.url is relative
                    urlAnchor.href = urlAnchor.href;
                    s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
                        urlAnchor.protocol + "//" + urlAnchor.host;
                } catch ( e ) {
    
                    // If there is an error parsing the URL, assume it is crossDomain,
                    // it can be rejected by the transport if it is invalid
                    s.crossDomain = true;
                }
            }
    
            // Convert data if not already a string
            if ( s.data && s.processData && typeof s.data !== "string" ) {
                s.data = jQuery.param( s.data, s.traditional );
            }
    
            // Apply prefilters
            inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );
    
            // If request was aborted inside a prefilter, stop there
            if ( completed ) {
                return jqXHR;
            }
    
            // We can fire global events as of now if asked to
            // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (trac-15118)
            fireGlobals = jQuery.event && s.global;
    
            // Watch for a new set of requests
            if ( fireGlobals && jQuery.active++ === 0 ) {
                jQuery.event.trigger( "ajaxStart" );
            }
    
            // Uppercase the type
            s.type = s.type.toUpperCase();
    
            // Determine if request has content
            s.hasContent = !rnoContent.test( s.type );
    
            // Save the URL in case we're toying with the If-Modified-Since
            // and/or If-None-Match header later on
            // Remove hash to simplify url manipulation
            cacheURL = s.url.replace( rhash, "" );
    
            // More options handling for requests with no content
            if ( !s.hasContent ) {
    
                // Remember the hash so we can put it back
                uncached = s.url.slice( cacheURL.length );
    
                // If data is available and should be processed, append data to url
                if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
                    cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;
    
                    // trac-9682: remove data so that it's not used in an eventual retry
                    delete s.data;
                }
    
                // Add or update anti-cache param if needed
                if ( s.cache === false ) {
                    cacheURL = cacheURL.replace( rantiCache, "$1" );
                    uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
                        uncached;
                }
    
                // Put hash and anti-cache on the URL that will be requested (gh-1732)
                s.url = cacheURL + uncached;
    
            // Change '%20' to '+' if this is encoded form body content (gh-2658)
            } else if ( s.data && s.processData &&
                ( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
                s.data = s.data.replace( r20, "+" );
            }
    
            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
            if ( s.ifModified ) {
                if ( jQuery.lastModified[ cacheURL ] ) {
                    jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
                }
                if ( jQuery.etag[ cacheURL ] ) {
                    jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
                }
            }
    
            // Set the correct header, if data is being sent
            if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
                jqXHR.setRequestHeader( "Content-Type", s.contentType );
            }
    
            // Set the Accepts header for the server, depending on the dataType
            jqXHR.setRequestHeader(
                "Accept",
                s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
                    s.accepts[ s.dataTypes[ 0 ] ] +
                        ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
                    s.accepts[ "*" ]
            );
    
            // Check for headers option
            for ( i in s.headers ) {
                jqXHR.setRequestHeader( i, s.headers[ i ] );
            }
    
            // Allow custom headers/mimetypes and early abort
            if ( s.beforeSend &&
                ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {
    
                // Abort if not done already and return
                return jqXHR.abort();
            }
    
            // Aborting is no longer a cancellation
            strAbort = "abort";
    
            // Install callbacks on deferreds
            completeDeferred.add( s.complete );
            jqXHR.done( s.success );
            jqXHR.fail( s.error );
    
            // Get transport
            transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );
    
            // If no transport, we auto-abort
            if ( !transport ) {
                done( -1, "No Transport" );
            } else {
                jqXHR.readyState = 1;
    
                // Send global event
                if ( fireGlobals ) {
                    globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
                }
    
                // If request was aborted inside ajaxSend, stop there
                if ( completed ) {
                    return jqXHR;
                }
    
                // Timeout
                if ( s.async && s.timeout > 0 ) {
                    timeoutTimer = window.setTimeout( function() {
                        jqXHR.abort( "timeout" );
                    }, s.timeout );
                }
    
                try {
                    completed = false;
                    transport.send( requestHeaders, done );
                } catch ( e ) {
    
                    // Rethrow post-completion exceptions
                    if ( completed ) {
                        throw e;
                    }
    
                    // Propagate others as results
                    done( -1, e );
                }
            }
    
            // Callback for when everything is done
            function done( status, nativeStatusText, responses, headers ) {
                var isSuccess, success, error, response, modified,
                    statusText = nativeStatusText;
    
                // Ignore repeat invocations
                if ( completed ) {
                    return;
                }
    
                completed = true;
    
                // Clear timeout if it exists
                if ( timeoutTimer ) {
                    window.clearTimeout( timeoutTimer );
                }
    
                // Dereference transport for early garbage collection
                // (no matter how long the jqXHR object will be used)
                transport = undefined;
    
                // Cache response headers
                responseHeadersString = headers || "";
    
                // Set readyState
                jqXHR.readyState = status > 0 ? 4 : 0;
    
                // Determine if successful
                isSuccess = status >= 200 && status < 300 || status === 304;
    
                // Get response data
                if ( responses ) {
                    response = ajaxHandleResponses( s, jqXHR, responses );
                }
    
                // Use a noop converter for missing script but not if jsonp
                if ( !isSuccess &&
                    jQuery.inArray( "script", s.dataTypes ) > -1 &&
                    jQuery.inArray( "json", s.dataTypes ) < 0 ) {
                    s.converters[ "text script" ] = function() {};
                }
    
                // Convert no matter what (that way responseXXX fields are always set)
                response = ajaxConvert( s, response, jqXHR, isSuccess );
    
                // If successful, handle type chaining
                if ( isSuccess ) {
    
                    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                    if ( s.ifModified ) {
                        modified = jqXHR.getResponseHeader( "Last-Modified" );
                        if ( modified ) {
                            jQuery.lastModified[ cacheURL ] = modified;
                        }
                        modified = jqXHR.getResponseHeader( "etag" );
                        if ( modified ) {
                            jQuery.etag[ cacheURL ] = modified;
                        }
                    }
    
                    // if no content
                    if ( status === 204 || s.type === "HEAD" ) {
                        statusText = "nocontent";
    
                    // if not modified
                    } else if ( status === 304 ) {
                        statusText = "notmodified";
    
                    // If we have data, let's convert it
                    } else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error;
                    }
                } else {
    
                    // Extract error from statusText and normalize for non-aborts
                    error = statusText;
                    if ( status || !statusText ) {
                        statusText = "error";
                        if ( status < 0 ) {
                            status = 0;
                        }
                    }
                }
    
                // Set data for the fake xhr object
                jqXHR.status = status;
                jqXHR.statusText = ( nativeStatusText || statusText ) + "";
    
                // Success/Error
                if ( isSuccess ) {
                    deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
                } else {
                    deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
                }
    
                // Status-dependent callbacks
                jqXHR.statusCode( statusCode );
                statusCode = undefined;
    
                if ( fireGlobals ) {
                    globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
                        [ jqXHR, s, isSuccess ? success : error ] );
                }
    
                // Complete
                completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );
    
                if ( fireGlobals ) {
                    globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
    
                    // Handle the global AJAX counter
                    if ( !( --jQuery.active ) ) {
                        jQuery.event.trigger( "ajaxStop" );
                    }
                }
            }
    
            return jqXHR;
        },
    
        getJSON: function( url, data, callback ) {
            return jQuery.get( url, data, callback, "json" );
        },
    
        getScript: function( url, callback ) {
            return jQuery.get( url, undefined, callback, "script" );
        }
    } );
    
    jQuery.each( [ "get", "post" ], function( _i, method ) {
        jQuery[ method ] = function( url, data, callback, type ) {
    
            // Shift arguments if data argument was omitted
            if ( isFunction( data ) ) {
                type = type || callback;
                callback = data;
                data = undefined;
            }
    
            // The url can be an options object (which then must have .url)
            return jQuery.ajax( jQuery.extend( {
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            }, jQuery.isPlainObject( url ) && url ) );
        };
    } );
    
    jQuery.ajaxPrefilter( function( s ) {
        var i;
        for ( i in s.headers ) {
            if ( i.toLowerCase() === "content-type" ) {
                s.contentType = s.headers[ i ] || "";
            }
        }
    } );
    
    
    jQuery._evalUrl = function( url, options, doc ) {
        return jQuery.ajax( {
            url: url,
    
            // Make this explicit, since user can override this through ajaxSetup (trac-11264)
            type: "GET",
            dataType: "script",
            cache: true,
            async: false,
            global: false,
    
            // Only evaluate the response if it is successful (gh-4126)
            // dataFilter is not invoked for failure responses, so using it instead
            // of the default converter is kludgy but it works.
            converters: {
                "text script": function() {}
            },
            dataFilter: function( response ) {
                jQuery.globalEval( response, options, doc );
            }
        } );
    };
    
    
    jQuery.fn.extend( {
        wrapAll: function( html ) {
            var wrap;
    
            if ( this[ 0 ] ) {
                if ( isFunction( html ) ) {
                    html = html.call( this[ 0 ] );
                }
    
                // The elements to wrap the target around
                wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );
    
                if ( this[ 0 ].parentNode ) {
                    wrap.insertBefore( this[ 0 ] );
                }
    
                wrap.map( function() {
                    var elem = this;
    
                    while ( elem.firstElementChild ) {
                        elem = elem.firstElementChild;
                    }
    
                    return elem;
                } ).append( this );
            }
    
            return this;
        },
    
        wrapInner: function( html ) {
            if ( isFunction( html ) ) {
                return this.each( function( i ) {
                    jQuery( this ).wrapInner( html.call( this, i ) );
                } );
            }
    
            return this.each( function() {
                var self = jQuery( this ),
                    contents = self.contents();
    
                if ( contents.length ) {
                    contents.wrapAll( html );
    
                } else {
                    self.append( html );
                }
            } );
        },
    
        wrap: function( html ) {
            var htmlIsFunction = isFunction( html );
    
            return this.each( function( i ) {
                jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
            } );
        },
    
        unwrap: function( selector ) {
            this.parent( selector ).not( "body" ).each( function() {
                jQuery( this ).replaceWith( this.childNodes );
            } );
            return this;
        }
    } );
    
    
    jQuery.expr.pseudos.hidden = function( elem ) {
        return !jQuery.expr.pseudos.visible( elem );
    };
    jQuery.expr.pseudos.visible = function( elem ) {
        return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
    };
    
    
    
    
    jQuery.ajaxSettings.xhr = function() {
        try {
            return new window.XMLHttpRequest();
        } catch ( e ) {}
    };
    
    var xhrSuccessStatus = {
    
            // File protocol always yields status code 0, assume 200
            0: 200,
    
            // Support: IE <=9 only
            // trac-1450: sometimes IE returns 1223 when it should be 204
            1223: 204
        },
        xhrSupported = jQuery.ajaxSettings.xhr();
    
    support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
    support.ajax = xhrSupported = !!xhrSupported;
    
    jQuery.ajaxTransport( function( options ) {
        var callback, errorCallback;
    
        // Cross domain only allowed if supported through XMLHttpRequest
        if ( support.cors || xhrSupported && !options.crossDomain ) {
            return {
                send: function( headers, complete ) {
                    var i,
                        xhr = options.xhr();
    
                    xhr.open(
                        options.type,
                        options.url,
                        options.async,
                        options.username,
                        options.password
                    );
    
                    // Apply custom fields if provided
                    if ( options.xhrFields ) {
                        for ( i in options.xhrFields ) {
                            xhr[ i ] = options.xhrFields[ i ];
                        }
                    }
    
                    // Override mime type if needed
                    if ( options.mimeType && xhr.overrideMimeType ) {
                        xhr.overrideMimeType( options.mimeType );
                    }
    
                    // X-Requested-With header
                    // For cross-domain requests, seeing as conditions for a preflight are
                    // akin to a jigsaw puzzle, we simply never set it to be sure.
                    // (it can always be set on a per-request basis or even using ajaxSetup)
                    // For same-domain requests, won't change header if already provided.
                    if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
                        headers[ "X-Requested-With" ] = "XMLHttpRequest";
                    }
    
                    // Set headers
                    for ( i in headers ) {
                        xhr.setRequestHeader( i, headers[ i ] );
                    }
    
                    // Callback
                    callback = function( type ) {
                        return function() {
                            if ( callback ) {
                                callback = errorCallback = xhr.onload =
                                    xhr.onerror = xhr.onabort = xhr.ontimeout =
                                        xhr.onreadystatechange = null;
    
                                if ( type === "abort" ) {
                                    xhr.abort();
                                } else if ( type === "error" ) {
    
                                    // Support: IE <=9 only
                                    // On a manual native abort, IE9 throws
                                    // errors on any property access that is not readyState
                                    if ( typeof xhr.status !== "number" ) {
                                        complete( 0, "error" );
                                    } else {
                                        complete(
    
                                            // File: protocol always yields status 0; see trac-8605, trac-14207
                                            xhr.status,
                                            xhr.statusText
                                        );
                                    }
                                } else {
                                    complete(
                                        xhrSuccessStatus[ xhr.status ] || xhr.status,
                                        xhr.statusText,
    
                                        // Support: IE <=9 only
                                        // IE9 has no XHR2 but throws on binary (trac-11426)
                                        // For XHR2 non-text, let the caller handle it (gh-2498)
                                        ( xhr.responseType || "text" ) !== "text"  ||
                                        typeof xhr.responseText !== "string" ?
                                            { binary: xhr.response } :
                                            { text: xhr.responseText },
                                        xhr.getAllResponseHeaders()
                                    );
                                }
                            }
                        };
                    };
    
                    // Listen to events
                    xhr.onload = callback();
                    errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );
    
                    // Support: IE 9 only
                    // Use onreadystatechange to replace onabort
                    // to handle uncaught aborts
                    if ( xhr.onabort !== undefined ) {
                        xhr.onabort = errorCallback;
                    } else {
                        xhr.onreadystatechange = function() {
    
                            // Check readyState before timeout as it changes
                            if ( xhr.readyState === 4 ) {
    
                                // Allow onerror to be called first,
                                // but that will not handle a native abort
                                // Also, save errorCallback to a variable
                                // as xhr.onerror cannot be accessed
                                window.setTimeout( function() {
                                    if ( callback ) {
                                        errorCallback();
                                    }
                                } );
                            }
                        };
                    }
    
                    // Create the abort callback
                    callback = callback( "abort" );
    
                    try {
    
                        // Do send the request (this may raise an exception)
                        xhr.send( options.hasContent && options.data || null );
                    } catch ( e ) {
    
                        // trac-14683: Only rethrow if this hasn't been notified as an error yet
                        if ( callback ) {
                            throw e;
                        }
                    }
                },
    
                abort: function() {
                    if ( callback ) {
                        callback();
                    }
                }
            };
        }
    } );
    
    
    
    
    // Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
    jQuery.ajaxPrefilter( function( s ) {
        if ( s.crossDomain ) {
            s.contents.script = false;
        }
    } );
    
    // Install script dataType
    jQuery.ajaxSetup( {
        accepts: {
            script: "text/javascript, application/javascript, " +
                "application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function( text ) {
                jQuery.globalEval( text );
                return text;
            }
        }
    } );
    
    // Handle cache's special case and crossDomain
    jQuery.ajaxPrefilter( "script", function( s ) {
        if ( s.cache === undefined ) {
            s.cache = false;
        }
        if ( s.crossDomain ) {
            s.type = "GET";
        }
    } );
    
    // Bind script tag hack transport
    jQuery.ajaxTransport( "script", function( s ) {
    
        // This transport only deals with cross domain or forced-by-attrs requests
        if ( s.crossDomain || s.scriptAttrs ) {
            var script, callback;
            return {
                send: function( _, complete ) {
                    script = jQuery( "<script>" )
                        .attr( s.scriptAttrs || {} )
                        .prop( { charset: s.scriptCharset, src: s.url } )
                        .on( "load error", callback = function( evt ) {
                            script.remove();
                            callback = null;
                            if ( evt ) {
                                complete( evt.type === "error" ? 404 : 200, evt.type );
                            }
                        } );
    
                    // Use native DOM manipulation to avoid our domManip AJAX trickery
                    document.head.appendChild( script[ 0 ] );
                },
                abort: function() {
                    if ( callback ) {
                        callback();
                    }
                }
            };
        }
    } );
    
    
    
    
    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;
    
    // Default jsonp settings
    jQuery.ajaxSetup( {
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
            this[ callback ] = true;
            return callback;
        }
    } );
    
    // Detect, normalize options and install callbacks for jsonp requests
    jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {
    
        var callbackName, overwritten, responseContainer,
            jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
                "url" :
                typeof s.data === "string" &&
                    ( s.contentType || "" )
                        .indexOf( "application/x-www-form-urlencoded" ) === 0 &&
                    rjsonp.test( s.data ) && "data"
            );
    
        // Handle iff the expected data type is "jsonp" or we have a parameter to set
        if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {
    
            // Get callback name, remembering preexisting value associated with it
            callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
                s.jsonpCallback() :
                s.jsonpCallback;
    
            // Insert callback into url or form data
            if ( jsonProp ) {
                s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
            } else if ( s.jsonp !== false ) {
                s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
            }
    
            // Use data converter to retrieve json after script execution
            s.converters[ "script json" ] = function() {
                if ( !responseContainer ) {
                    jQuery.error( callbackName + " was not called" );
                }
                return responseContainer[ 0 ];
            };
    
            // Force json dataType
            s.dataTypes[ 0 ] = "json";
    
            // Install callback
            overwritten = window[ callbackName ];
            window[ callbackName ] = function() {
                responseContainer = arguments;
            };
    
            // Clean-up function (fires after converters)
            jqXHR.always( function() {
    
                // If previous value didn't exist - remove it
                if ( overwritten === undefined ) {
                    jQuery( window ).removeProp( callbackName );
    
                // Otherwise restore preexisting value
                } else {
                    window[ callbackName ] = overwritten;
                }
    
                // Save back as free
                if ( s[ callbackName ] ) {
    
                    // Make sure that re-using the options doesn't screw things around
                    s.jsonpCallback = originalSettings.jsonpCallback;
    
                    // Save the callback name for future use
                    oldCallbacks.push( callbackName );
                }
    
                // Call if it was a function and we have a response
                if ( responseContainer && isFunction( overwritten ) ) {
                    overwritten( responseContainer[ 0 ] );
                }
    
                responseContainer = overwritten = undefined;
            } );
    
            // Delegate to script
            return "script";
        }
    } );
    
    
    
    
    // Support: Safari 8 only
    // In Safari 8 documents created via document.implementation.createHTMLDocument
    // collapse sibling forms: the second one becomes a child of the first one.
    // Because of that, this security measure has to be disabled in Safari 8.
    // https://bugs.webkit.org/show_bug.cgi?id=137337
    support.createHTMLDocument = ( function() {
        var body = document.implementation.createHTMLDocument( "" ).body;
        body.innerHTML = "<form></form><form></form>";
        return body.childNodes.length === 2;
    } )();
    
    
    // Argument "data" should be string of html
    // context (optional): If specified, the fragment will be created in this context,
    // defaults to document
    // keepScripts (optional): If true, will include scripts passed in the html string
    jQuery.parseHTML = function( data, context, keepScripts ) {
        if ( typeof data !== "string" ) {
            return [];
        }
        if ( typeof context === "boolean" ) {
            keepScripts = context;
            context = false;
        }
    
        var base, parsed, scripts;
    
        if ( !context ) {
    
            // Stop scripts or inline event handlers from being executed immediately
            // by using document.implementation
            if ( support.createHTMLDocument ) {
                context = document.implementation.createHTMLDocument( "" );
    
                // Set the base href for the created document
                // so any parsed elements with URLs
                // are based on the document's URL (gh-2965)
                base = context.createElement( "base" );
                base.href = document.location.href;
                context.head.appendChild( base );
            } else {
                context = document;
            }
        }
    
        parsed = rsingleTag.exec( data );
        scripts = !keepScripts && [];
    
        // Single tag
        if ( parsed ) {
            return [ context.createElement( parsed[ 1 ] ) ];
        }
    
        parsed = buildFragment( [ data ], context, scripts );
    
        if ( scripts && scripts.length ) {
            jQuery( scripts ).remove();
        }
    
        return jQuery.merge( [], parsed.childNodes );
    };
    
    
    /**
     * Load a url into a page
     */
    jQuery.fn.load = function( url, params, callback ) {
        var selector, type, response,
            self = this,
            off = url.indexOf( " " );
    
        if ( off > -1 ) {
            selector = stripAndCollapse( url.slice( off ) );
            url = url.slice( 0, off );
        }
    
        // If it's a function
        if ( isFunction( params ) ) {
    
            // We assume that it's the callback
            callback = params;
            params = undefined;
    
        // Otherwise, build a param string
        } else if ( params && typeof params === "object" ) {
            type = "POST";
        }
    
        // If we have elements to modify, make the request
        if ( self.length > 0 ) {
            jQuery.ajax( {
                url: url,
    
                // If "type" variable is undefined, then "GET" method will be used.
                // Make value of this field explicit since
                // user can override it through ajaxSetup method
                type: type || "GET",
                dataType: "html",
                data: params
            } ).done( function( responseText ) {
    
                // Save response for use in complete callback
                response = arguments;
    
                self.html( selector ?
    
                    // If a selector was specified, locate the right elements in a dummy div
                    // Exclude scripts to avoid IE 'Permission Denied' errors
                    jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :
    
                    // Otherwise use the full result
                    responseText );
    
            // If the request succeeds, this function gets "data", "status", "jqXHR"
            // but they are ignored because response was set above.
            // If it fails, this function gets "jqXHR", "status", "error"
            } ).always( callback && function( jqXHR, status ) {
                self.each( function() {
                    callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
                } );
            } );
        }
    
        return this;
    };
    
    
    
    
    jQuery.expr.pseudos.animated = function( elem ) {
        return jQuery.grep( jQuery.timers, function( fn ) {
            return elem === fn.elem;
        } ).length;
    };
    
    
    
    
    jQuery.offset = {
        setOffset: function( elem, options, i ) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
                position = jQuery.css( elem, "position" ),
                curElem = jQuery( elem ),
                props = {};
    
            // Set position first, in-case top/left are set even on static elem
            if ( position === "static" ) {
                elem.style.position = "relative";
            }
    
            curOffset = curElem.offset();
            curCSSTop = jQuery.css( elem, "top" );
            curCSSLeft = jQuery.css( elem, "left" );
            calculatePosition = ( position === "absolute" || position === "fixed" ) &&
                ( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;
    
            // Need to be able to calculate position if either
            // top or left is auto and position is either absolute or fixed
            if ( calculatePosition ) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;
    
            } else {
                curTop = parseFloat( curCSSTop ) || 0;
                curLeft = parseFloat( curCSSLeft ) || 0;
            }
    
            if ( isFunction( options ) ) {
    
                // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
                options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
            }
    
            if ( options.top != null ) {
                props.top = ( options.top - curOffset.top ) + curTop;
            }
            if ( options.left != null ) {
                props.left = ( options.left - curOffset.left ) + curLeft;
            }
    
            if ( "using" in options ) {
                options.using.call( elem, props );
    
            } else {
                curElem.css( props );
            }
        }
    };
    
    jQuery.fn.extend( {
    
        // offset() relates an element's border box to the document origin
        offset: function( options ) {
    
            // Preserve chaining for setter
            if ( arguments.length ) {
                return options === undefined ?
                    this :
                    this.each( function( i ) {
                        jQuery.offset.setOffset( this, options, i );
                    } );
            }
    
            var rect, win,
                elem = this[ 0 ];
    
            if ( !elem ) {
                return;
            }
    
            // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
            // Support: IE <=11 only
            // Running getBoundingClientRect on a
            // disconnected node in IE throws an error
            if ( !elem.getClientRects().length ) {
                return { top: 0, left: 0 };
            }
    
            // Get document-relative position by adding viewport scroll to viewport-relative gBCR
            rect = elem.getBoundingClientRect();
            win = elem.ownerDocument.defaultView;
            return {
                top: rect.top + win.pageYOffset,
                left: rect.left + win.pageXOffset
            };
        },
    
        // position() relates an element's margin box to its offset parent's padding box
        // This corresponds to the behavior of CSS absolute positioning
        position: function() {
            if ( !this[ 0 ] ) {
                return;
            }
    
            var offsetParent, offset, doc,
                elem = this[ 0 ],
                parentOffset = { top: 0, left: 0 };
    
            // position:fixed elements are offset from the viewport, which itself always has zero offset
            if ( jQuery.css( elem, "position" ) === "fixed" ) {
    
                // Assume position:fixed implies availability of getBoundingClientRect
                offset = elem.getBoundingClientRect();
    
            } else {
                offset = this.offset();
    
                // Account for the *real* offset parent, which can be the document or its root element
                // when a statically positioned element is identified
                doc = elem.ownerDocument;
                offsetParent = elem.offsetParent || doc.documentElement;
                while ( offsetParent &&
                    ( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
                    jQuery.css( offsetParent, "position" ) === "static" ) {
    
                    offsetParent = offsetParent.parentNode;
                }
                if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {
    
                    // Incorporate borders into its offset, since they are outside its content origin
                    parentOffset = jQuery( offsetParent ).offset();
                    parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
                    parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
                }
            }
    
            // Subtract parent offsets and element margins
            return {
                top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
                left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
            };
        },
    
        // This method will return documentElement in the following cases:
        // 1) For the element inside the iframe without offsetParent, this method will return
        //    documentElement of the parent window
        // 2) For the hidden or detached element
        // 3) For body or html element, i.e. in case of the html node - it will return itself
        //
        // but those exceptions were never presented as a real life use-cases
        // and might be considered as more preferable results.
        //
        // This logic, however, is not guaranteed and can change at any point in the future
        offsetParent: function() {
            return this.map( function() {
                var offsetParent = this.offsetParent;
    
                while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
                    offsetParent = offsetParent.offsetParent;
                }
    
                return offsetParent || documentElement;
            } );
        }
    } );
    
    // Create scrollLeft and scrollTop methods
    jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
        var top = "pageYOffset" === prop;
    
        jQuery.fn[ method ] = function( val ) {
            return access( this, function( elem, method, val ) {
    
                // Coalesce documents and windows
                var win;
                if ( isWindow( elem ) ) {
                    win = elem;
                } else if ( elem.nodeType === 9 ) {
                    win = elem.defaultView;
                }
    
                if ( val === undefined ) {
                    return win ? win[ prop ] : elem[ method ];
                }
    
                if ( win ) {
                    win.scrollTo(
                        !top ? val : win.pageXOffset,
                        top ? val : win.pageYOffset
                    );
    
                } else {
                    elem[ method ] = val;
                }
            }, method, val, arguments.length );
        };
    } );
    
    // Support: Safari <=7 - 9.1, Chrome <=37 - 49
    // Add the top/left cssHooks using jQuery.fn.position
    // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
    // Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
    // getComputedStyle returns percent when specified for top/left/bottom/right;
    // rather than make the css module depend on the offset module, just check for it here
    jQuery.each( [ "top", "left" ], function( _i, prop ) {
        jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
            function( elem, computed ) {
                if ( computed ) {
                    computed = curCSS( elem, prop );
    
                    // If curCSS returns percentage, fallback to offset
                    return rnumnonpx.test( computed ) ?
                        jQuery( elem ).position()[ prop ] + "px" :
                        computed;
                }
            }
        );
    } );
    
    
    // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
    jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
        jQuery.each( {
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function( defaultExtra, funcName ) {
    
            // Margin is only for outerHeight, outerWidth
            jQuery.fn[ funcName ] = function( margin, value ) {
                var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
                    extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );
    
                return access( this, function( elem, type, value ) {
                    var doc;
    
                    if ( isWindow( elem ) ) {
    
                        // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
                        return funcName.indexOf( "outer" ) === 0 ?
                            elem[ "inner" + name ] :
                            elem.document.documentElement[ "client" + name ];
                    }
    
                    // Get document width or height
                    if ( elem.nodeType === 9 ) {
                        doc = elem.documentElement;
    
                        // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
                        // whichever is greatest
                        return Math.max(
                            elem.body[ "scroll" + name ], doc[ "scroll" + name ],
                            elem.body[ "offset" + name ], doc[ "offset" + name ],
                            doc[ "client" + name ]
                        );
                    }
    
                    return value === undefined ?
    
                        // Get width or height on the element, requesting but not forcing parseFloat
                        jQuery.css( elem, type, extra ) :
    
                        // Set width or height on the element
                        jQuery.style( elem, type, value, extra );
                }, type, chainable ? margin : undefined, chainable );
            };
        } );
    } );
    
    
    jQuery.each( [
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend"
    ], function( _i, type ) {
        jQuery.fn[ type ] = function( fn ) {
            return this.on( type, fn );
        };
    } );
    
    
    
    
    jQuery.fn.extend( {
    
        bind: function( types, data, fn ) {
            return this.on( types, null, data, fn );
        },
        unbind: function( types, fn ) {
            return this.off( types, null, fn );
        },
    
        delegate: function( selector, types, data, fn ) {
            return this.on( types, selector, data, fn );
        },
        undelegate: function( selector, types, fn ) {
    
            // ( namespace ) or ( selector, types [, fn] )
            return arguments.length === 1 ?
                this.off( selector, "**" ) :
                this.off( types, selector || "**", fn );
        },
    
        hover: function( fnOver, fnOut ) {
            return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
        }
    } );
    
    jQuery.each(
        ( "blur focus focusin focusout resize scroll click dblclick " +
        "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
        "change select submit keydown keypress keyup contextmenu" ).split( " " ),
        function( _i, name ) {
    
            // Handle event binding
            jQuery.fn[ name ] = function( data, fn ) {
                return arguments.length > 0 ?
                    this.on( name, null, data, fn ) :
                    this.trigger( name );
            };
        }
    );
    
    
    
    
    // Support: Android <=4.0 only
    // Make sure we trim BOM and NBSP
    // Require that the "whitespace run" starts from a non-whitespace
    // to avoid O(N^2) behavior when the engine would try matching "\s+$" at each space position.
    var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
    
    // Bind a function to a context, optionally partially applying any
    // arguments.
    // jQuery.proxy is deprecated to promote standards (specifically Function#bind)
    // However, it is not slated for removal any time soon
    jQuery.proxy = function( fn, context ) {
        var tmp, args, proxy;
    
        if ( typeof context === "string" ) {
            tmp = fn[ context ];
            context = fn;
            fn = tmp;
        }
    
        // Quick check to determine if target is callable, in the spec
        // this throws a TypeError, but we will just return undefined.
        if ( !isFunction( fn ) ) {
            return undefined;
        }
    
        // Simulated bind
        args = slice.call( arguments, 2 );
        proxy = function() {
            return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
        };
    
        // Set the guid of unique handler to the same of original handler, so it can be removed
        proxy.guid = fn.guid = fn.guid || jQuery.guid++;
    
        return proxy;
    };
    
    jQuery.holdReady = function( hold ) {
        if ( hold ) {
            jQuery.readyWait++;
        } else {
            jQuery.ready( true );
        }
    };
    jQuery.isArray = Array.isArray;
    jQuery.parseJSON = JSON.parse;
    jQuery.nodeName = nodeName;
    jQuery.isFunction = isFunction;
    jQuery.isWindow = isWindow;
    jQuery.camelCase = camelCase;
    jQuery.type = toType;
    
    jQuery.now = Date.now;
    
    jQuery.isNumeric = function( obj ) {
    
        // As of jQuery 3.0, isNumeric is limited to
        // strings and numbers (primitives or objects)
        // that can be coerced to finite numbers (gh-2662)
        var type = jQuery.type( obj );
        return ( type === "number" || type === "string" ) &&
    
            // parseFloat NaNs numeric-cast false positives ("")
            // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
            // subtraction forces infinities to NaN
            !isNaN( obj - parseFloat( obj ) );
    };
    
    jQuery.trim = function( text ) {
        return text == null ?
            "" :
            ( text + "" ).replace( rtrim, "$1" );
    };
    
    
    
    // Register as a named AMD module, since jQuery can be concatenated with other
    // files that may use define, but not via a proper concatenation script that
    // understands anonymous AMD modules. A named AMD is safest and most robust
    // way to register. Lowercase jquery is used because AMD module names are
    // derived from file names, and jQuery is normally delivered in a lowercase
    // file name. Do this after creating the global so that if an AMD module wants
    // to call noConflict to hide this version of jQuery, it will work.
    
    // Note that for maximum portability, libraries that are not jQuery should
    // declare themselves as anonymous modules, and avoid setting a global if an
    // AMD loader is present. jQuery is a special case. For more information, see
    // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
    
    if ( true ) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
            return jQuery;
        }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
            __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
    
    
    
    
    var
    
        // Map over jQuery in case of overwrite
        _jQuery = window.jQuery,
    
        // Map over the $ in case of overwrite
        _$ = window.$;
    
    jQuery.noConflict = function( deep ) {
        if ( window.$ === jQuery ) {
            window.$ = _$;
        }
    
        if ( deep && window.jQuery === jQuery ) {
            window.jQuery = _jQuery;
        }
    
        return jQuery;
    };
    
    // Expose jQuery and $ identifiers, even in AMD
    // (trac-7102#comment:10, https://github.com/jquery/jquery/pull/557)
    // and CommonJS for browser emulators (trac-13566)
    if ( typeof noGlobal === "undefined" ) {
        window.jQuery = window.$ = jQuery;
    }
    
    
    
    
    return jQuery;
    } );
    
    
    /***/ }),
    
    /***/ 7729:
    /***/ (function(module, exports, __webpack_require__) {
    
    /* provided dependency */ var __webpack_provided_window_dot_jQuery = __webpack_require__(9755);
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! Magnific Popup - v1.1.0 - 2016-02-20
    * http://dimsemenov.com/plugins/magnific-popup/
    * Copyright (c) 2016 Dmitry Semenov; */
    ;(function (factory) { 
    if (true) { 
     // AMD. Register as an anonymous module. 
     !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(9755)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
            (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
            __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); 
     } else {} 
     }(function($) { 
    
    /*>>core*/
    /**
     * 
     * Magnific Popup Core JS file
     * 
     */
    
    
    /**
     * Private static constants
     */
    var CLOSE_EVENT = 'Close',
        BEFORE_CLOSE_EVENT = 'BeforeClose',
        AFTER_CLOSE_EVENT = 'AfterClose',
        BEFORE_APPEND_EVENT = 'BeforeAppend',
        MARKUP_PARSE_EVENT = 'MarkupParse',
        OPEN_EVENT = 'Open',
        CHANGE_EVENT = 'Change',
        NS = 'mfp',
        EVENT_NS = '.' + NS,
        READY_CLASS = 'mfp-ready',
        REMOVING_CLASS = 'mfp-removing',
        PREVENT_CLOSE_CLASS = 'mfp-prevent-close';
    
    
    /**
     * Private vars 
     */
    /*jshint -W079 */
    var mfp, // As we have only one instance of MagnificPopup object, we define it locally to not to use 'this'
        MagnificPopup = function(){},
        _isJQ = !!(__webpack_provided_window_dot_jQuery),
        _prevStatus,
        _window = $(window),
        _document,
        _prevContentType,
        _wrapClasses,
        _currPopupType;
    
    
    /**
     * Private functions
     */
    var _mfpOn = function(name, f) {
            mfp.ev.on(NS + name + EVENT_NS, f);
        },
        _getEl = function(className, appendTo, html, raw) {
            var el = document.createElement('div');
            el.className = 'mfp-'+className;
            if(html) {
                el.innerHTML = html;
            }
            if(!raw) {
                el = $(el);
                if(appendTo) {
                    el.appendTo(appendTo);
                }
            } else if(appendTo) {
                appendTo.appendChild(el);
            }
            return el;
        },
        _mfpTrigger = function(e, data) {
            mfp.ev.triggerHandler(NS + e, data);
    
            if(mfp.st.callbacks) {
                // converts "mfpEventName" to "eventName" callback and triggers it if it's present
                e = e.charAt(0).toLowerCase() + e.slice(1);
                if(mfp.st.callbacks[e]) {
                    mfp.st.callbacks[e].apply(mfp, $.isArray(data) ? data : [data]);
                }
            }
        },
        _getCloseBtn = function(type) {
            if(type !== _currPopupType || !mfp.currTemplate.closeBtn) {
                mfp.currTemplate.closeBtn = $( mfp.st.closeMarkup.replace('%title%', mfp.st.tClose ) );
                _currPopupType = type;
            }
            return mfp.currTemplate.closeBtn;
        },
        // Initialize Magnific Popup only when called at least once
        _checkInstance = function() {
            if(!$.magnificPopup.instance) {
                /*jshint -W020 */
                mfp = new MagnificPopup();
                mfp.init();
                $.magnificPopup.instance = mfp;
            }
        },
        // CSS transition detection, http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
        supportsTransitions = function() {
            var s = document.createElement('p').style, // 's' for style. better to create an element if body yet to exist
                v = ['ms','O','Moz','Webkit']; // 'v' for vendor
    
            if( s['transition'] !== undefined ) {
                return true; 
            }
                
            while( v.length ) {
                if( v.pop() + 'Transition' in s ) {
                    return true;
                }
            }
                    
            return false;
        };
    
    
    
    /**
     * Public functions
     */
    MagnificPopup.prototype = {
    
        constructor: MagnificPopup,
    
        /**
         * Initializes Magnific Popup plugin. 
         * This function is triggered only once when $.fn.magnificPopup or $.magnificPopup is executed
         */
        init: function() {
            var appVersion = navigator.appVersion;
            mfp.isLowIE = mfp.isIE8 = document.all && !document.addEventListener;
            mfp.isAndroid = (/android/gi).test(appVersion);
            mfp.isIOS = (/iphone|ipad|ipod/gi).test(appVersion);
            mfp.supportsTransition = supportsTransitions();
    
            // We disable fixed positioned lightbox on devices that don't handle it nicely.
            // If you know a better way of detecting this - let me know.
            mfp.probablyMobile = (mfp.isAndroid || mfp.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent) );
            _document = $(document);
    
            mfp.popupsCache = {};
        },
    
        /**
         * Opens popup
         * @param  data [description]
         */
        open: function(data) {
    
            var i;
    
            if(data.isObj === false) { 
                // convert jQuery collection to array to avoid conflicts later
                mfp.items = data.items.toArray();
    
                mfp.index = 0;
                var items = data.items,
                    item;
                for(i = 0; i < items.length; i++) {
                    item = items[i];
                    if(item.parsed) {
                        item = item.el[0];
                    }
                    if(item === data.el[0]) {
                        mfp.index = i;
                        break;
                    }
                }
            } else {
                mfp.items = $.isArray(data.items) ? data.items : [data.items];
                mfp.index = data.index || 0;
            }
    
            // if popup is already opened - we just update the content
            if(mfp.isOpen) {
                mfp.updateItemHTML();
                return;
            }
            
            mfp.types = []; 
            _wrapClasses = '';
            if(data.mainEl && data.mainEl.length) {
                mfp.ev = data.mainEl.eq(0);
            } else {
                mfp.ev = _document;
            }
    
            if(data.key) {
                if(!mfp.popupsCache[data.key]) {
                    mfp.popupsCache[data.key] = {};
                }
                mfp.currTemplate = mfp.popupsCache[data.key];
            } else {
                mfp.currTemplate = {};
            }
    
    
    
            mfp.st = $.extend(true, {}, $.magnificPopup.defaults, data ); 
            mfp.fixedContentPos = mfp.st.fixedContentPos === 'auto' ? !mfp.probablyMobile : mfp.st.fixedContentPos;
    
            if(mfp.st.modal) {
                mfp.st.closeOnContentClick = false;
                mfp.st.closeOnBgClick = false;
                mfp.st.showCloseBtn = false;
                mfp.st.enableEscapeKey = false;
            }
            
    
            // Building markup
            // main containers are created only once
            if(!mfp.bgOverlay) {
    
                // Dark overlay
                mfp.bgOverlay = _getEl('bg').on('click'+EVENT_NS, function() {
                    mfp.close();
                });
    
                mfp.wrap = _getEl('wrap').attr('tabindex', -1).on('click'+EVENT_NS, function(e) {
                    if(mfp._checkIfClose(e.target)) {
                        mfp.close();
                    }
                });
    
                mfp.container = _getEl('container', mfp.wrap);
            }
    
            mfp.contentContainer = _getEl('content');
            if(mfp.st.preloader) {
                mfp.preloader = _getEl('preloader', mfp.container, mfp.st.tLoading);
            }
    
    
            // Initializing modules
            var modules = $.magnificPopup.modules;
            for(i = 0; i < modules.length; i++) {
                var n = modules[i];
                n = n.charAt(0).toUpperCase() + n.slice(1);
                mfp['init'+n].call(mfp);
            }
            _mfpTrigger('BeforeOpen');
    
    
            if(mfp.st.showCloseBtn) {
                // Close button
                if(!mfp.st.closeBtnInside) {
                    mfp.wrap.append( _getCloseBtn() );
                } else {
                    _mfpOn(MARKUP_PARSE_EVENT, function(e, template, values, item) {
                        values.close_replaceWith = _getCloseBtn(item.type);
                    });
                    _wrapClasses += ' mfp-close-btn-in';
                }
            }
    
            if(mfp.st.alignTop) {
                _wrapClasses += ' mfp-align-top';
            }
    
        
    
            if(mfp.fixedContentPos) {
                mfp.wrap.css({
                    overflow: mfp.st.overflowY,
                    overflowX: 'hidden',
                    overflowY: mfp.st.overflowY
                });
            } else {
                mfp.wrap.css({ 
                    top: _window.scrollTop(),
                    position: 'absolute'
                });
            }
            if( mfp.st.fixedBgPos === false || (mfp.st.fixedBgPos === 'auto' && !mfp.fixedContentPos) ) {
                mfp.bgOverlay.css({
                    height: _document.height(),
                    position: 'absolute'
                });
            }
    
            
    
            if(mfp.st.enableEscapeKey) {
                // Close on ESC key
                _document.on('keyup' + EVENT_NS, function(e) {
                    if(e.keyCode === 27) {
                        mfp.close();
                    }
                });
            }
    
            _window.on('resize' + EVENT_NS, function() {
                mfp.updateSize();
            });
    
    
            if(!mfp.st.closeOnContentClick) {
                _wrapClasses += ' mfp-auto-cursor';
            }
            
            if(_wrapClasses)
                mfp.wrap.addClass(_wrapClasses);
    
    
            // this triggers recalculation of layout, so we get it once to not to trigger twice
            var windowHeight = mfp.wH = _window.height();
    
            
            var windowStyles = {};
    
            if( mfp.fixedContentPos ) {
                if(mfp._hasScrollBar(windowHeight)){
                    var s = mfp._getScrollbarSize();
                    if(s) {
                        windowStyles.marginRight = s;
                    }
                }
            }
    
            if(mfp.fixedContentPos) {
                if(!mfp.isIE7) {
                    windowStyles.overflow = 'hidden';
                } else {
                    // ie7 double-scroll bug
                    $('body, html').css('overflow', 'hidden');
                }
            }
    
            
            
            var classesToadd = mfp.st.mainClass;
            if(mfp.isIE7) {
                classesToadd += ' mfp-ie7';
            }
            if(classesToadd) {
                mfp._addClassToMFP( classesToadd );
            }
    
            // add content
            mfp.updateItemHTML();
    
            _mfpTrigger('BuildControls');
    
            // remove scrollbar, add margin e.t.c
            $('html').css(windowStyles);
            
            // add everything to DOM
            mfp.bgOverlay.add(mfp.wrap).prependTo( mfp.st.prependTo || $(document.body) );
    
            // Save last focused element
            mfp._lastFocusedEl = document.activeElement;
            
            // Wait for next cycle to allow CSS transition
            setTimeout(function() {
                
                if(mfp.content) {
                    mfp._addClassToMFP(READY_CLASS);
                    mfp._setFocus();
                } else {
                    // if content is not defined (not loaded e.t.c) we add class only for BG
                    mfp.bgOverlay.addClass(READY_CLASS);
                }
                
                // Trap the focus in popup
                _document.on('focusin' + EVENT_NS, mfp._onFocusIn);
    
            }, 16);
    
            mfp.isOpen = true;
            mfp.updateSize(windowHeight);
            _mfpTrigger(OPEN_EVENT);
    
            return data;
        },
    
        /**
         * Closes the popup
         */
        close: function() {
            if(!mfp.isOpen) return;
            _mfpTrigger(BEFORE_CLOSE_EVENT);
    
            mfp.isOpen = false;
            // for CSS3 animation
            if(mfp.st.removalDelay && !mfp.isLowIE && mfp.supportsTransition )  {
                mfp._addClassToMFP(REMOVING_CLASS);
                setTimeout(function() {
                    mfp._close();
                }, mfp.st.removalDelay);
            } else {
                mfp._close();
            }
        },
    
        /**
         * Helper for close() function
         */
        _close: function() {
            _mfpTrigger(CLOSE_EVENT);
    
            var classesToRemove = REMOVING_CLASS + ' ' + READY_CLASS + ' ';
    
            mfp.bgOverlay.detach();
            mfp.wrap.detach();
            mfp.container.empty();
    
            if(mfp.st.mainClass) {
                classesToRemove += mfp.st.mainClass + ' ';
            }
    
            mfp._removeClassFromMFP(classesToRemove);
    
            if(mfp.fixedContentPos) {
                var windowStyles = {marginRight: ''};
                if(mfp.isIE7) {
                    $('body, html').css('overflow', '');
                } else {
                    windowStyles.overflow = '';
                }
                $('html').css(windowStyles);
            }
            
            _document.off('keyup' + EVENT_NS + ' focusin' + EVENT_NS);
            mfp.ev.off(EVENT_NS);
    
            // clean up DOM elements that aren't removed
            mfp.wrap.attr('class', 'mfp-wrap').removeAttr('style');
            mfp.bgOverlay.attr('class', 'mfp-bg');
            mfp.container.attr('class', 'mfp-container');
    
            // remove close button from target element
            if(mfp.st.showCloseBtn &&
            (!mfp.st.closeBtnInside || mfp.currTemplate[mfp.currItem.type] === true)) {
                if(mfp.currTemplate.closeBtn)
                    mfp.currTemplate.closeBtn.detach();
            }
    
    
            if(mfp.st.autoFocusLast && mfp._lastFocusedEl) {
                $(mfp._lastFocusedEl).focus(); // put tab focus back
            }
            mfp.currItem = null;	
            mfp.content = null;
            mfp.currTemplate = null;
            mfp.prevHeight = 0;
    
            _mfpTrigger(AFTER_CLOSE_EVENT);
        },
        
        updateSize: function(winHeight) {
    
            if(mfp.isIOS) {
                // fixes iOS nav bars https://github.com/dimsemenov/Magnific-Popup/issues/2
                var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
                var height = window.innerHeight * zoomLevel;
                mfp.wrap.css('height', height);
                mfp.wH = height;
            } else {
                mfp.wH = winHeight || _window.height();
            }
            // Fixes #84: popup incorrectly positioned with position:relative on body
            if(!mfp.fixedContentPos) {
                mfp.wrap.css('height', mfp.wH);
            }
    
            _mfpTrigger('Resize');
    
        },
    
        /**
         * Set content of popup based on current index
         */
        updateItemHTML: function() {
            var item = mfp.items[mfp.index];
    
            // Detach and perform modifications
            mfp.contentContainer.detach();
    
            if(mfp.content)
                mfp.content.detach();
    
            if(!item.parsed) {
                item = mfp.parseEl( mfp.index );
            }
    
            var type = item.type;
    
            _mfpTrigger('BeforeChange', [mfp.currItem ? mfp.currItem.type : '', type]);
            // BeforeChange event works like so:
            // _mfpOn('BeforeChange', function(e, prevType, newType) { });
    
            mfp.currItem = item;
    
            if(!mfp.currTemplate[type]) {
                var markup = mfp.st[type] ? mfp.st[type].markup : false;
    
                // allows to modify markup
                _mfpTrigger('FirstMarkupParse', markup);
    
                if(markup) {
                    mfp.currTemplate[type] = $(markup);
                } else {
                    // if there is no markup found we just define that template is parsed
                    mfp.currTemplate[type] = true;
                }
            }
    
            if(_prevContentType && _prevContentType !== item.type) {
                mfp.container.removeClass('mfp-'+_prevContentType+'-holder');
            }
    
            var newContent = mfp['get' + type.charAt(0).toUpperCase() + type.slice(1)](item, mfp.currTemplate[type]);
            mfp.appendContent(newContent, type);
    
            item.preloaded = true;
    
            _mfpTrigger(CHANGE_EVENT, item);
            _prevContentType = item.type;
    
            // Append container back after its content changed
            mfp.container.prepend(mfp.contentContainer);
    
            _mfpTrigger('AfterChange');
        },
    
    
        /**
         * Set HTML content of popup
         */
        appendContent: function(newContent, type) {
            mfp.content = newContent;
    
            if(newContent) {
                if(mfp.st.showCloseBtn && mfp.st.closeBtnInside &&
                    mfp.currTemplate[type] === true) {
                    // if there is no markup, we just append close button element inside
                    if(!mfp.content.find('.mfp-close').length) {
                        mfp.content.append(_getCloseBtn());
                    }
                } else {
                    mfp.content = newContent;
                }
            } else {
                mfp.content = '';
            }
    
            _mfpTrigger(BEFORE_APPEND_EVENT);
            mfp.container.addClass('mfp-'+type+'-holder');
    
            mfp.contentContainer.append(mfp.content);
        },
    
    
        /**
         * Creates Magnific Popup data object based on given data
         * @param  {int} index Index of item to parse
         */
        parseEl: function(index) {
            var item = mfp.items[index],
                type;
    
            if(item.tagName) {
                item = { el: $(item) };
            } else {
                type = item.type;
                item = { data: item, src: item.src };
            }
    
            if(item.el) {
                var types = mfp.types;
    
                // check for 'mfp-TYPE' class
                for(var i = 0; i < types.length; i++) {
                    if( item.el.hasClass('mfp-'+types[i]) ) {
                        type = types[i];
                        break;
                    }
                }
    
                item.src = item.el.attr('data-mfp-src');
                if(!item.src) {
                    item.src = item.el.attr('href');
                }
            }
    
            item.type = type || mfp.st.type || 'inline';
            item.index = index;
            item.parsed = true;
            mfp.items[index] = item;
            _mfpTrigger('ElementParse', item);
    
            return mfp.items[index];
        },
    
    
        /**
         * Initializes single popup or a group of popups
         */
        addGroup: function(el, options) {
            var eHandler = function(e) {
                e.mfpEl = this;
                mfp._openClick(e, el, options);
            };
    
            if(!options) {
                options = {};
            }
    
            var eName = 'click.magnificPopup';
            options.mainEl = el;
    
            if(options.items) {
                options.isObj = true;
                el.off(eName).on(eName, eHandler);
            } else {
                options.isObj = false;
                if(options.delegate) {
                    el.off(eName).on(eName, options.delegate , eHandler);
                } else {
                    options.items = el;
                    el.off(eName).on(eName, eHandler);
                }
            }
        },
        _openClick: function(e, el, options) {
            var midClick = options.midClick !== undefined ? options.midClick : $.magnificPopup.defaults.midClick;
    
    
            if(!midClick && ( e.which === 2 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey ) ) {
                return;
            }
    
            var disableOn = options.disableOn !== undefined ? options.disableOn : $.magnificPopup.defaults.disableOn;
    
            if(disableOn) {
                if($.isFunction(disableOn)) {
                    if( !disableOn.call(mfp) ) {
                        return true;
                    }
                } else { // else it's number
                    if( _window.width() < disableOn ) {
                        return true;
                    }
                }
            }
    
            if(e.type) {
                e.preventDefault();
    
                // This will prevent popup from closing if element is inside and popup is already opened
                if(mfp.isOpen) {
                    e.stopPropagation();
                }
            }
    
            options.el = $(e.mfpEl);
            if(options.delegate) {
                options.items = el.find(options.delegate);
            }
            mfp.open(options);
        },
    
    
        /**
         * Updates text on preloader
         */
        updateStatus: function(status, text) {
    
            if(mfp.preloader) {
                if(_prevStatus !== status) {
                    mfp.container.removeClass('mfp-s-'+_prevStatus);
                }
    
                if(!text && status === 'loading') {
                    text = mfp.st.tLoading;
                }
    
                var data = {
                    status: status,
                    text: text
                };
                // allows to modify status
                _mfpTrigger('UpdateStatus', data);
    
                status = data.status;
                text = data.text;
    
                mfp.preloader.html(text);
    
                mfp.preloader.find('a').on('click', function(e) {
                    e.stopImmediatePropagation();
                });
    
                mfp.container.addClass('mfp-s-'+status);
                _prevStatus = status;
            }
        },
    
    
        /*
            "Private" helpers that aren't private at all
         */
        // Check to close popup or not
        // "target" is an element that was clicked
        _checkIfClose: function(target) {
    
            if($(target).hasClass(PREVENT_CLOSE_CLASS)) {
                return;
            }
    
            var closeOnContent = mfp.st.closeOnContentClick;
            var closeOnBg = mfp.st.closeOnBgClick;
    
            if(closeOnContent && closeOnBg) {
                return true;
            } else {
    
                // We close the popup if click is on close button or on preloader. Or if there is no content.
                if(!mfp.content || $(target).hasClass('mfp-close') || (mfp.preloader && target === mfp.preloader[0]) ) {
                    return true;
                }
    
                // if click is outside the content
                if(  (target !== mfp.content[0] && !$.contains(mfp.content[0], target))  ) {
                    if(closeOnBg) {
                        // last check, if the clicked element is in DOM, (in case it's removed onclick)
                        if( $.contains(document, target) ) {
                            return true;
                        }
                    }
                } else if(closeOnContent) {
                    return true;
                }
    
            }
            return false;
        },
        _addClassToMFP: function(cName) {
            mfp.bgOverlay.addClass(cName);
            mfp.wrap.addClass(cName);
        },
        _removeClassFromMFP: function(cName) {
            this.bgOverlay.removeClass(cName);
            mfp.wrap.removeClass(cName);
        },
        _hasScrollBar: function(winHeight) {
            return (  (mfp.isIE7 ? _document.height() : document.body.scrollHeight) > (winHeight || _window.height()) );
        },
        _setFocus: function() {
            (mfp.st.focus ? mfp.content.find(mfp.st.focus).eq(0) : mfp.wrap).focus();
        },
        _onFocusIn: function(e) {
            if( e.target !== mfp.wrap[0] && !$.contains(mfp.wrap[0], e.target) ) {
                mfp._setFocus();
                return false;
            }
        },
        _parseMarkup: function(template, values, item) {
            var arr;
            if(item.data) {
                values = $.extend(item.data, values);
            }
            _mfpTrigger(MARKUP_PARSE_EVENT, [template, values, item] );
    
            $.each(values, function(key, value) {
                if(value === undefined || value === false) {
                    return true;
                }
                arr = key.split('_');
                if(arr.length > 1) {
                    var el = template.find(EVENT_NS + '-'+arr[0]);
    
                    if(el.length > 0) {
                        var attr = arr[1];
                        if(attr === 'replaceWith') {
                            if(el[0] !== value[0]) {
                                el.replaceWith(value);
                            }
                        } else if(attr === 'img') {
                            if(el.is('img')) {
                                el.attr('src', value);
                            } else {
                                el.replaceWith( $('<img>').attr('src', value).attr('class', el.attr('class')) );
                            }
                        } else {
                            el.attr(arr[1], value);
                        }
                    }
    
                } else {
                    template.find(EVENT_NS + '-'+key).html(value);
                }
            });
        },
    
        _getScrollbarSize: function() {
            // thx David
            if(mfp.scrollbarSize === undefined) {
                var scrollDiv = document.createElement("div");
                scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
                document.body.appendChild(scrollDiv);
                mfp.scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                document.body.removeChild(scrollDiv);
            }
            return mfp.scrollbarSize;
        }
    
    }; /* MagnificPopup core prototype end */
    
    
    
    
    /**
     * Public static functions
     */
    $.magnificPopup = {
        instance: null,
        proto: MagnificPopup.prototype,
        modules: [],
    
        open: function(options, index) {
            _checkInstance();
    
            if(!options) {
                options = {};
            } else {
                options = $.extend(true, {}, options);
            }
    
            options.isObj = true;
            options.index = index || 0;
            return this.instance.open(options);
        },
    
        close: function() {
            return $.magnificPopup.instance && $.magnificPopup.instance.close();
        },
    
        registerModule: function(name, module) {
            if(module.options) {
                $.magnificPopup.defaults[name] = module.options;
            }
            $.extend(this.proto, module.proto);
            this.modules.push(name);
        },
    
        defaults: {
    
            // Info about options is in docs:
            // http://dimsemenov.com/plugins/magnific-popup/documentation.html#options
    
            disableOn: 0,
    
            key: null,
    
            midClick: false,
    
            mainClass: '',
    
            preloader: true,
    
            focus: '', // CSS selector of input to focus after popup is opened
    
            closeOnContentClick: false,
    
            closeOnBgClick: true,
    
            closeBtnInside: true,
    
            showCloseBtn: true,
    
            enableEscapeKey: true,
    
            modal: false,
    
            alignTop: false,
    
            removalDelay: 0,
    
            prependTo: null,
    
            fixedContentPos: 'auto',
    
            fixedBgPos: 'auto',
    
            overflowY: 'auto',
    
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
    
            tClose: 'Close (Esc)',
    
            tLoading: 'Loading...',
    
            autoFocusLast: true
    
        }
    };
    
    
    
    $.fn.magnificPopup = function(options) {
        _checkInstance();
    
        var jqEl = $(this);
    
        // We call some API method of first param is a string
        if (typeof options === "string" ) {
    
            if(options === 'open') {
                var items,
                    itemOpts = _isJQ ? jqEl.data('magnificPopup') : jqEl[0].magnificPopup,
                    index = parseInt(arguments[1], 10) || 0;
    
                if(itemOpts.items) {
                    items = itemOpts.items[index];
                } else {
                    items = jqEl;
                    if(itemOpts.delegate) {
                        items = items.find(itemOpts.delegate);
                    }
                    items = items.eq( index );
                }
                mfp._openClick({mfpEl:items}, jqEl, itemOpts);
            } else {
                if(mfp.isOpen)
                    mfp[options].apply(mfp, Array.prototype.slice.call(arguments, 1));
            }
    
        } else {
            // clone options obj
            options = $.extend(true, {}, options);
    
            /*
             * As Zepto doesn't support .data() method for objects
             * and it works only in normal browsers
             * we assign "options" object directly to the DOM element. FTW!
             */
            if(_isJQ) {
                jqEl.data('magnificPopup', options);
            } else {
                jqEl[0].magnificPopup = options;
            }
    
            mfp.addGroup(jqEl, options);
    
        }
        return jqEl;
    };
    
    /*>>core*/
    
    /*>>inline*/
    
    var INLINE_NS = 'inline',
        _hiddenClass,
        _inlinePlaceholder,
        _lastInlineElement,
        _putInlineElementsBack = function() {
            if(_lastInlineElement) {
                _inlinePlaceholder.after( _lastInlineElement.addClass(_hiddenClass) ).detach();
                _lastInlineElement = null;
            }
        };
    
    $.magnificPopup.registerModule(INLINE_NS, {
        options: {
            hiddenClass: 'hide', // will be appended with `mfp-` prefix
            markup: '',
            tNotFound: 'Content not found'
        },
        proto: {
    
            initInline: function() {
                mfp.types.push(INLINE_NS);
    
                _mfpOn(CLOSE_EVENT+'.'+INLINE_NS, function() {
                    _putInlineElementsBack();
                });
            },
    
            getInline: function(item, template) {
    
                _putInlineElementsBack();
    
                if(item.src) {
                    var inlineSt = mfp.st.inline,
                        el = $(item.src);
    
                    if(el.length) {
    
                        // If target element has parent - we replace it with placeholder and put it back after popup is closed
                        var parent = el[0].parentNode;
                        if(parent && parent.tagName) {
                            if(!_inlinePlaceholder) {
                                _hiddenClass = inlineSt.hiddenClass;
                                _inlinePlaceholder = _getEl(_hiddenClass);
                                _hiddenClass = 'mfp-'+_hiddenClass;
                            }
                            // replace target inline element with placeholder
                            _lastInlineElement = el.after(_inlinePlaceholder).detach().removeClass(_hiddenClass);
                        }
    
                        mfp.updateStatus('ready');
                    } else {
                        mfp.updateStatus('error', inlineSt.tNotFound);
                        el = $('<div>');
                    }
    
                    item.inlineElement = el;
                    return el;
                }
    
                mfp.updateStatus('ready');
                mfp._parseMarkup(template, {}, item);
                return template;
            }
        }
    });
    
    /*>>inline*/
    
    /*>>ajax*/
    var AJAX_NS = 'ajax',
        _ajaxCur,
        _removeAjaxCursor = function() {
            if(_ajaxCur) {
                $(document.body).removeClass(_ajaxCur);
            }
        },
        _destroyAjaxRequest = function() {
            _removeAjaxCursor();
            if(mfp.req) {
                mfp.req.abort();
            }
        };
    
    $.magnificPopup.registerModule(AJAX_NS, {
    
        options: {
            settings: null,
            cursor: 'mfp-ajax-cur',
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
    
        proto: {
            initAjax: function() {
                mfp.types.push(AJAX_NS);
                _ajaxCur = mfp.st.ajax.cursor;
    
                _mfpOn(CLOSE_EVENT+'.'+AJAX_NS, _destroyAjaxRequest);
                _mfpOn('BeforeChange.' + AJAX_NS, _destroyAjaxRequest);
            },
            getAjax: function(item) {
    
                if(_ajaxCur) {
                    $(document.body).addClass(_ajaxCur);
                }
    
                mfp.updateStatus('loading');
    
                var opts = $.extend({
                    url: item.src,
                    success: function(data, textStatus, jqXHR) {
                        var temp = {
                            data:data,
                            xhr:jqXHR
                        };
    
                        _mfpTrigger('ParseAjax', temp);
    
                        mfp.appendContent( $(temp.data), AJAX_NS );
    
                        item.finished = true;
    
                        _removeAjaxCursor();
    
                        mfp._setFocus();
    
                        setTimeout(function() {
                            mfp.wrap.addClass(READY_CLASS);
                        }, 16);
    
                        mfp.updateStatus('ready');
    
                        _mfpTrigger('AjaxContentAdded');
                    },
                    error: function() {
                        _removeAjaxCursor();
                        item.finished = item.loadError = true;
                        mfp.updateStatus('error', mfp.st.ajax.tError.replace('%url%', item.src));
                    }
                }, mfp.st.ajax.settings);
    
                mfp.req = $.ajax(opts);
    
                return '';
            }
        }
    });
    
    /*>>ajax*/
    
    /*>>image*/
    var _imgInterval,
        _getTitle = function(item) {
            if(item.data && item.data.title !== undefined)
                return item.data.title;
    
            var src = mfp.st.image.titleSrc;
    
            if(src) {
                if($.isFunction(src)) {
                    return src.call(mfp, item);
                } else if(item.el) {
                    return item.el.attr(src) || '';
                }
            }
            return '';
        };
    
    $.magnificPopup.registerModule('image', {
    
        options: {
            markup: '<div class="mfp-figure">'+
                        '<div class="mfp-close"></div>'+
                        '<figure>'+
                            '<div class="mfp-img"></div>'+
                            '<figcaption>'+
                                '<div class="mfp-bottom-bar">'+
                                    '<div class="mfp-title"></div>'+
                                    '<div class="mfp-counter"></div>'+
                                '</div>'+
                            '</figcaption>'+
                        '</figure>'+
                    '</div>',
            cursor: 'mfp-zoom-out-cur',
            titleSrc: 'title',
            verticalFit: true,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
    
        proto: {
            initImage: function() {
                var imgSt = mfp.st.image,
                    ns = '.image';
    
                mfp.types.push('image');
    
                _mfpOn(OPEN_EVENT+ns, function() {
                    if(mfp.currItem.type === 'image' && imgSt.cursor) {
                        $(document.body).addClass(imgSt.cursor);
                    }
                });
    
                _mfpOn(CLOSE_EVENT+ns, function() {
                    if(imgSt.cursor) {
                        $(document.body).removeClass(imgSt.cursor);
                    }
                    _window.off('resize' + EVENT_NS);
                });
    
                _mfpOn('Resize'+ns, mfp.resizeImage);
                if(mfp.isLowIE) {
                    _mfpOn('AfterChange', mfp.resizeImage);
                }
            },
            resizeImage: function() {
                var item = mfp.currItem;
                if(!item || !item.img) return;
    
                if(mfp.st.image.verticalFit) {
                    var decr = 0;
                    // fix box-sizing in ie7/8
                    if(mfp.isLowIE) {
                        decr = parseInt(item.img.css('padding-top'), 10) + parseInt(item.img.css('padding-bottom'),10);
                    }
                    item.img.css('max-height', mfp.wH-decr);
                }
            },
            _onImageHasSize: function(item) {
                if(item.img) {
    
                    item.hasSize = true;
    
                    if(_imgInterval) {
                        clearInterval(_imgInterval);
                    }
    
                    item.isCheckingImgSize = false;
    
                    _mfpTrigger('ImageHasSize', item);
    
                    if(item.imgHidden) {
                        if(mfp.content)
                            mfp.content.removeClass('mfp-loading');
    
                        item.imgHidden = false;
                    }
    
                }
            },
    
            /**
             * Function that loops until the image has size to display elements that rely on it asap
             */
            findImageSize: function(item) {
    
                var counter = 0,
                    img = item.img[0],
                    mfpSetInterval = function(delay) {
    
                        if(_imgInterval) {
                            clearInterval(_imgInterval);
                        }
                        // decelerating interval that checks for size of an image
                        _imgInterval = setInterval(function() {
                            if(img.naturalWidth > 0) {
                                mfp._onImageHasSize(item);
                                return;
                            }
    
                            if(counter > 200) {
                                clearInterval(_imgInterval);
                            }
    
                            counter++;
                            if(counter === 3) {
                                mfpSetInterval(10);
                            } else if(counter === 40) {
                                mfpSetInterval(50);
                            } else if(counter === 100) {
                                mfpSetInterval(500);
                            }
                        }, delay);
                    };
    
                mfpSetInterval(1);
            },
    
            getImage: function(item, template) {
    
                var guard = 0,
    
                    // image load complete handler
                    onLoadComplete = function() {
                        if(item) {
                            if (item.img[0].complete) {
                                item.img.off('.mfploader');
    
                                if(item === mfp.currItem){
                                    mfp._onImageHasSize(item);
    
                                    mfp.updateStatus('ready');
                                }
    
                                item.hasSize = true;
                                item.loaded = true;
    
                                _mfpTrigger('ImageLoadComplete');
    
                            }
                            else {
                                // if image complete check fails 200 times (20 sec), we assume that there was an error.
                                guard++;
                                if(guard < 200) {
                                    setTimeout(onLoadComplete,100);
                                } else {
                                    onLoadError();
                                }
                            }
                        }
                    },
    
                    // image error handler
                    onLoadError = function() {
                        if(item) {
                            item.img.off('.mfploader');
                            if(item === mfp.currItem){
                                mfp._onImageHasSize(item);
                                mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src) );
                            }
    
                            item.hasSize = true;
                            item.loaded = true;
                            item.loadError = true;
                        }
                    },
                    imgSt = mfp.st.image;
    
    
                var el = template.find('.mfp-img');
                if(el.length) {
                    var img = document.createElement('img');
                    img.className = 'mfp-img';
                    if(item.el && item.el.find('img').length) {
                        img.alt = item.el.find('img').attr('alt');
                    }
                    item.img = $(img).on('load.mfploader', onLoadComplete).on('error.mfploader', onLoadError);
                    img.src = item.src;
    
                    // without clone() "error" event is not firing when IMG is replaced by new IMG
                    // TODO: find a way to avoid such cloning
                    if(el.is('img')) {
                        item.img = item.img.clone();
                    }
    
                    img = item.img[0];
                    if(img.naturalWidth > 0) {
                        item.hasSize = true;
                    } else if(!img.width) {
                        item.hasSize = false;
                    }
                }
    
                mfp._parseMarkup(template, {
                    title: _getTitle(item),
                    img_replaceWith: item.img
                }, item);
    
                mfp.resizeImage();
    
                if(item.hasSize) {
                    if(_imgInterval) clearInterval(_imgInterval);
    
                    if(item.loadError) {
                        template.addClass('mfp-loading');
                        mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src) );
                    } else {
                        template.removeClass('mfp-loading');
                        mfp.updateStatus('ready');
                    }
                    return template;
                }
    
                mfp.updateStatus('loading');
                item.loading = true;
    
                if(!item.hasSize) {
                    item.imgHidden = true;
                    template.addClass('mfp-loading');
                    mfp.findImageSize(item);
                }
    
                return template;
            }
        }
    });
    
    /*>>image*/
    
    /*>>zoom*/
    var hasMozTransform,
        getHasMozTransform = function() {
            if(hasMozTransform === undefined) {
                hasMozTransform = document.createElement('p').style.MozTransform !== undefined;
            }
            return hasMozTransform;
        };
    
    $.magnificPopup.registerModule('zoom', {
    
        options: {
            enabled: false,
            easing: 'ease-in-out',
            duration: 300,
            opener: function(element) {
                return element.is('img') ? element : element.find('img');
            }
        },
    
        proto: {
    
            initZoom: function() {
                var zoomSt = mfp.st.zoom,
                    ns = '.zoom',
                    image;
    
                if(!zoomSt.enabled || !mfp.supportsTransition) {
                    return;
                }
    
                var duration = zoomSt.duration,
                    getElToAnimate = function(image) {
                        var newImg = image.clone().removeAttr('style').removeAttr('class').addClass('mfp-animated-image'),
                            transition = 'all '+(zoomSt.duration/1000)+'s ' + zoomSt.easing,
                            cssObj = {
                                position: 'fixed',
                                zIndex: 9999,
                                left: 0,
                                top: 0,
                                '-webkit-backface-visibility': 'hidden'
                            },
                            t = 'transition';
    
                        cssObj['-webkit-'+t] = cssObj['-moz-'+t] = cssObj['-o-'+t] = cssObj[t] = transition;
    
                        newImg.css(cssObj);
                        return newImg;
                    },
                    showMainContent = function() {
                        mfp.content.css('visibility', 'visible');
                    },
                    openTimeout,
                    animatedImg;
    
                _mfpOn('BuildControls'+ns, function() {
                    if(mfp._allowZoom()) {
    
                        clearTimeout(openTimeout);
                        mfp.content.css('visibility', 'hidden');
    
                        // Basically, all code below does is clones existing image, puts in on top of the current one and animated it
    
                        image = mfp._getItemToZoom();
    
                        if(!image) {
                            showMainContent();
                            return;
                        }
    
                        animatedImg = getElToAnimate(image);
    
                        animatedImg.css( mfp._getOffset() );
    
                        mfp.wrap.append(animatedImg);
    
                        openTimeout = setTimeout(function() {
                            animatedImg.css( mfp._getOffset( true ) );
                            openTimeout = setTimeout(function() {
    
                                showMainContent();
    
                                setTimeout(function() {
                                    animatedImg.remove();
                                    image = animatedImg = null;
                                    _mfpTrigger('ZoomAnimationEnded');
                                }, 16); // avoid blink when switching images
    
                            }, duration); // this timeout equals animation duration
    
                        }, 16); // by adding this timeout we avoid short glitch at the beginning of animation
    
    
                        // Lots of timeouts...
                    }
                });
                _mfpOn(BEFORE_CLOSE_EVENT+ns, function() {
                    if(mfp._allowZoom()) {
    
                        clearTimeout(openTimeout);
    
                        mfp.st.removalDelay = duration;
    
                        if(!image) {
                            image = mfp._getItemToZoom();
                            if(!image) {
                                return;
                            }
                            animatedImg = getElToAnimate(image);
                        }
    
                        animatedImg.css( mfp._getOffset(true) );
                        mfp.wrap.append(animatedImg);
                        mfp.content.css('visibility', 'hidden');
    
                        setTimeout(function() {
                            animatedImg.css( mfp._getOffset() );
                        }, 16);
                    }
    
                });
    
                _mfpOn(CLOSE_EVENT+ns, function() {
                    if(mfp._allowZoom()) {
                        showMainContent();
                        if(animatedImg) {
                            animatedImg.remove();
                        }
                        image = null;
                    }
                });
            },
    
            _allowZoom: function() {
                return mfp.currItem.type === 'image';
            },
    
            _getItemToZoom: function() {
                if(mfp.currItem.hasSize) {
                    return mfp.currItem.img;
                } else {
                    return false;
                }
            },
    
            // Get element postion relative to viewport
            _getOffset: function(isLarge) {
                var el;
                if(isLarge) {
                    el = mfp.currItem.img;
                } else {
                    el = mfp.st.zoom.opener(mfp.currItem.el || mfp.currItem);
                }
    
                var offset = el.offset();
                var paddingTop = parseInt(el.css('padding-top'),10);
                var paddingBottom = parseInt(el.css('padding-bottom'),10);
                offset.top -= ( $(window).scrollTop() - paddingTop );
    
    
                /*
    
                Animating left + top + width/height looks glitchy in Firefox, but perfect in Chrome. And vice-versa.
    
                 */
                var obj = {
                    width: el.width(),
                    // fix Zepto height+padding issue
                    height: (_isJQ ? el.innerHeight() : el[0].offsetHeight) - paddingBottom - paddingTop
                };
    
                // I hate to do this, but there is no another option
                if( getHasMozTransform() ) {
                    obj['-moz-transform'] = obj['transform'] = 'translate(' + offset.left + 'px,' + offset.top + 'px)';
                } else {
                    obj.left = offset.left;
                    obj.top = offset.top;
                }
                return obj;
            }
    
        }
    });
    
    
    
    /*>>zoom*/
    
    /*>>iframe*/
    
    var IFRAME_NS = 'iframe',
        _emptyPage = '//about:blank',
    
        _fixIframeBugs = function(isShowing) {
            if(mfp.currTemplate[IFRAME_NS]) {
                var el = mfp.currTemplate[IFRAME_NS].find('iframe');
                if(el.length) {
                    // reset src after the popup is closed to avoid "video keeps playing after popup is closed" bug
                    if(!isShowing) {
                        el[0].src = _emptyPage;
                    }
    
                    // IE8 black screen bug fix
                    if(mfp.isIE8) {
                        el.css('display', isShowing ? 'block' : 'none');
                    }
                }
            }
        };
    
    $.magnificPopup.registerModule(IFRAME_NS, {
    
        options: {
            markup: '<div class="mfp-iframe-scaler">'+
                        '<div class="mfp-close"></div>'+
                        '<iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe>'+
                    '</div>',
    
            srcAction: 'iframe_src',
    
            // we don't care and support only one default type of URL by default
            patterns: {
                youtube: {
                    index: 'youtube.com',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/',
                    id: '/',
                    src: '//player.vimeo.com/video/%id%?autoplay=1'
                },
                gmaps: {
                    index: '//maps.google.',
                    src: '%id%&output=embed'
                }
            }
        },
    
        proto: {
            initIframe: function() {
                mfp.types.push(IFRAME_NS);
    
                _mfpOn('BeforeChange', function(e, prevType, newType) {
                    if(prevType !== newType) {
                        if(prevType === IFRAME_NS) {
                            _fixIframeBugs(); // iframe if removed
                        } else if(newType === IFRAME_NS) {
                            _fixIframeBugs(true); // iframe is showing
                        }
                    }// else {
                        // iframe source is switched, don't do anything
                    //}
                });
    
                _mfpOn(CLOSE_EVENT + '.' + IFRAME_NS, function() {
                    _fixIframeBugs();
                });
            },
    
            getIframe: function(item, template) {
                var embedSrc = item.src;
                var iframeSt = mfp.st.iframe;
    
                $.each(iframeSt.patterns, function() {
                    if(embedSrc.indexOf( this.index ) > -1) {
                        if(this.id) {
                            if(typeof this.id === 'string') {
                                embedSrc = embedSrc.substr(embedSrc.lastIndexOf(this.id)+this.id.length, embedSrc.length);
                            } else {
                                embedSrc = this.id.call( this, embedSrc );
                            }
                        }
                        embedSrc = this.src.replace('%id%', embedSrc );
                        return false; // break;
                    }
                });
    
                var dataObj = {};
                if(iframeSt.srcAction) {
                    dataObj[iframeSt.srcAction] = embedSrc;
                }
                mfp._parseMarkup(template, dataObj, item);
    
                mfp.updateStatus('ready');
    
                return template;
            }
        }
    });
    
    
    
    /*>>iframe*/
    
    /*>>gallery*/
    /**
     * Get looped index depending on number of slides
     */
    var _getLoopedId = function(index) {
            var numSlides = mfp.items.length;
            if(index > numSlides - 1) {
                return index - numSlides;
            } else  if(index < 0) {
                return numSlides + index;
            }
            return index;
        },
        _replaceCurrTotal = function(text, curr, total) {
            return text.replace(/%curr%/gi, curr + 1).replace(/%total%/gi, total);
        };
    
    $.magnificPopup.registerModule('gallery', {
    
        options: {
            enabled: false,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0,2],
            navigateByImgClick: true,
            arrows: true,
    
            tPrev: 'Previous (Left arrow key)',
            tNext: 'Next (Right arrow key)',
            tCounter: '%curr% of %total%'
        },
    
        proto: {
            initGallery: function() {
    
                var gSt = mfp.st.gallery,
                    ns = '.mfp-gallery';
    
                mfp.direction = true; // true - next, false - prev
    
                if(!gSt || !gSt.enabled ) return false;
    
                _wrapClasses += ' mfp-gallery';
    
                _mfpOn(OPEN_EVENT+ns, function() {
    
                    if(gSt.navigateByImgClick) {
                        mfp.wrap.on('click'+ns, '.mfp-img', function() {
                            if(mfp.items.length > 1) {
                                mfp.next();
                                return false;
                            }
                        });
                    }
    
                    _document.on('keydown'+ns, function(e) {
                        if (e.keyCode === 37) {
                            mfp.prev();
                        } else if (e.keyCode === 39) {
                            mfp.next();
                        }
                    });
                });
    
                _mfpOn('UpdateStatus'+ns, function(e, data) {
                    if(data.text) {
                        data.text = _replaceCurrTotal(data.text, mfp.currItem.index, mfp.items.length);
                    }
                });
    
                _mfpOn(MARKUP_PARSE_EVENT+ns, function(e, element, values, item) {
                    var l = mfp.items.length;
                    values.counter = l > 1 ? _replaceCurrTotal(gSt.tCounter, item.index, l) : '';
                });
    
                _mfpOn('BuildControls' + ns, function() {
                    if(mfp.items.length > 1 && gSt.arrows && !mfp.arrowLeft) {
                        var markup = gSt.arrowMarkup,
                            arrowLeft = mfp.arrowLeft = $( markup.replace(/%title%/gi, gSt.tPrev).replace(/%dir%/gi, 'left') ).addClass(PREVENT_CLOSE_CLASS),
                            arrowRight = mfp.arrowRight = $( markup.replace(/%title%/gi, gSt.tNext).replace(/%dir%/gi, 'right') ).addClass(PREVENT_CLOSE_CLASS);
    
                        arrowLeft.click(function() {
                            mfp.prev();
                        });
                        arrowRight.click(function() {
                            mfp.next();
                        });
    
                        mfp.container.append(arrowLeft.add(arrowRight));
                    }
                });
    
                _mfpOn(CHANGE_EVENT+ns, function() {
                    if(mfp._preloadTimeout) clearTimeout(mfp._preloadTimeout);
    
                    mfp._preloadTimeout = setTimeout(function() {
                        mfp.preloadNearbyImages();
                        mfp._preloadTimeout = null;
                    }, 16);
                });
    
    
                _mfpOn(CLOSE_EVENT+ns, function() {
                    _document.off(ns);
                    mfp.wrap.off('click'+ns);
                    mfp.arrowRight = mfp.arrowLeft = null;
                });
    
            },
            next: function() {
                mfp.direction = true;
                mfp.index = _getLoopedId(mfp.index + 1);
                mfp.updateItemHTML();
            },
            prev: function() {
                mfp.direction = false;
                mfp.index = _getLoopedId(mfp.index - 1);
                mfp.updateItemHTML();
            },
            goTo: function(newIndex) {
                mfp.direction = (newIndex >= mfp.index);
                mfp.index = newIndex;
                mfp.updateItemHTML();
            },
            preloadNearbyImages: function() {
                var p = mfp.st.gallery.preload,
                    preloadBefore = Math.min(p[0], mfp.items.length),
                    preloadAfter = Math.min(p[1], mfp.items.length),
                    i;
    
                for(i = 1; i <= (mfp.direction ? preloadAfter : preloadBefore); i++) {
                    mfp._preloadItem(mfp.index+i);
                }
                for(i = 1; i <= (mfp.direction ? preloadBefore : preloadAfter); i++) {
                    mfp._preloadItem(mfp.index-i);
                }
            },
            _preloadItem: function(index) {
                index = _getLoopedId(index);
    
                if(mfp.items[index].preloaded) {
                    return;
                }
    
                var item = mfp.items[index];
                if(!item.parsed) {
                    item = mfp.parseEl( index );
                }
    
                _mfpTrigger('LazyLoad', item);
    
                if(item.type === 'image') {
                    item.img = $('<img class="mfp-img" />').on('load.mfploader', function() {
                        item.hasSize = true;
                    }).on('error.mfploader', function() {
                        item.hasSize = true;
                        item.loadError = true;
                        _mfpTrigger('LazyLoadError', item);
                    }).attr('src', item.src);
                }
    
    
                item.preloaded = true;
            }
        }
    });
    
    /*>>gallery*/
    
    /*>>retina*/
    
    var RETINA_NS = 'retina';
    
    $.magnificPopup.registerModule(RETINA_NS, {
        options: {
            replaceSrc: function(item) {
                return item.src.replace(/\.\w+$/, function(m) { return '@2x' + m; });
            },
            ratio: 1 // Function or number.  Set to 1 to disable.
        },
        proto: {
            initRetina: function() {
                if(window.devicePixelRatio > 1) {
    
                    var st = mfp.st.retina,
                        ratio = st.ratio;
    
                    ratio = !isNaN(ratio) ? ratio : ratio();
    
                    if(ratio > 1) {
                        _mfpOn('ImageHasSize' + '.' + RETINA_NS, function(e, item) {
                            item.img.css({
                                'max-width': item.img[0].naturalWidth / ratio,
                                'width': '100%'
                            });
                        });
                        _mfpOn('ElementParse' + '.' + RETINA_NS, function(e, item) {
                            item.src = st.replaceSrc(item, ratio);
                        });
                    }
                }
    
            }
        }
    });
    
    /*>>retina*/
     _checkInstance(); }));
    
    /***/ }),
    
    /***/ 9154:
    /***/ (function(module, exports, __webpack_require__) {
    
    var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
         _ _      _       _
     ___| (_) ___| | __  (_)___
    / __| | |/ __| |/ /  | / __|
    \__ \ | | (__|   < _ | \__ \
    |___/_|_|\___|_|\_(_)/ |___/
                       |__/
    
     Version: 1.8.1
      Author: Ken Wheeler
     Website: http://kenwheeler.github.io
        Docs: http://kenwheeler.github.io/slick
        Repo: http://github.com/kenwheeler/slick
      Issues: http://github.com/kenwheeler/slick/issues
    
     */
    /* global window, document, define, jQuery, setInterval, clearInterval */
    ;(function(factory) {
        'use strict';
        if (true) {
            !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(9755)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
            __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
            (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
            __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        } else {}
    
    }(function($) {
        'use strict';
        var Slick = window.Slick || {};
    
        Slick = (function() {
    
            var instanceUid = 0;
    
            function Slick(element, settings) {
    
                var _ = this, dataSettings;
    
                _.defaults = {
                    accessibility: true,
                    adaptiveHeight: false,
                    appendArrows: $(element),
                    appendDots: $(element),
                    arrows: true,
                    asNavFor: null,
                    prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                    nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                    autoplay: false,
                    autoplaySpeed: 3000,
                    centerMode: false,
                    centerPadding: '50px',
                    cssEase: 'ease',
                    customPaging: function(slider, i) {
                        return $('<button type="button" />').text(i + 1);
                    },
                    dots: false,
                    dotsClass: 'slick-dots',
                    draggable: true,
                    easing: 'linear',
                    edgeFriction: 0.35,
                    fade: false,
                    focusOnSelect: false,
                    focusOnChange: false,
                    infinite: true,
                    initialSlide: 0,
                    lazyLoad: 'ondemand',
                    mobileFirst: false,
                    pauseOnHover: true,
                    pauseOnFocus: true,
                    pauseOnDotsHover: false,
                    respondTo: 'window',
                    responsive: null,
                    rows: 1,
                    rtl: false,
                    slide: '',
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: true,
                    swipeToSlide: false,
                    touchMove: true,
                    touchThreshold: 5,
                    useCSS: true,
                    useTransform: true,
                    variableWidth: false,
                    vertical: false,
                    verticalSwiping: false,
                    waitForAnimate: true,
                    zIndex: 1000
                };
    
                _.initials = {
                    animating: false,
                    dragging: false,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    scrolling: false,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: false,
                    slideOffset: 0,
                    swipeLeft: null,
                    swiping: false,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: false,
                    unslicked: false
                };
    
                $.extend(_, _.initials);
    
                _.activeBreakpoint = null;
                _.animType = null;
                _.animProp = null;
                _.breakpoints = [];
                _.breakpointSettings = [];
                _.cssTransitions = false;
                _.focussed = false;
                _.interrupted = false;
                _.hidden = 'hidden';
                _.paused = true;
                _.positionProp = null;
                _.respondTo = null;
                _.rowCount = 1;
                _.shouldClick = true;
                _.$slider = $(element);
                _.$slidesCache = null;
                _.transformType = null;
                _.transitionType = null;
                _.visibilityChange = 'visibilitychange';
                _.windowWidth = 0;
                _.windowTimer = null;
    
                dataSettings = $(element).data('slick') || {};
    
                _.options = $.extend({}, _.defaults, settings, dataSettings);
    
                _.currentSlide = _.options.initialSlide;
    
                _.originalSettings = _.options;
    
                if (typeof document.mozHidden !== 'undefined') {
                    _.hidden = 'mozHidden';
                    _.visibilityChange = 'mozvisibilitychange';
                } else if (typeof document.webkitHidden !== 'undefined') {
                    _.hidden = 'webkitHidden';
                    _.visibilityChange = 'webkitvisibilitychange';
                }
    
                _.autoPlay = $.proxy(_.autoPlay, _);
                _.autoPlayClear = $.proxy(_.autoPlayClear, _);
                _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
                _.changeSlide = $.proxy(_.changeSlide, _);
                _.clickHandler = $.proxy(_.clickHandler, _);
                _.selectHandler = $.proxy(_.selectHandler, _);
                _.setPosition = $.proxy(_.setPosition, _);
                _.swipeHandler = $.proxy(_.swipeHandler, _);
                _.dragHandler = $.proxy(_.dragHandler, _);
                _.keyHandler = $.proxy(_.keyHandler, _);
    
                _.instanceUid = instanceUid++;
    
                // A simple way to check for HTML strings
                // Strict HTML recognition (must start with <)
                // Extracted from jQuery v1.11 source
                _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
    
    
                _.registerBreakpoints();
                _.init(true);
    
            }
    
            return Slick;
    
        }());
    
        Slick.prototype.activateADA = function() {
            var _ = this;
    
            _.$slideTrack.find('.slick-active').attr({
                'aria-hidden': 'false'
            }).find('a, input, button, select').attr({
                'tabindex': '0'
            });
    
        };
    
        Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {
    
            var _ = this;
    
            if (typeof(index) === 'boolean') {
                addBefore = index;
                index = null;
            } else if (index < 0 || (index >= _.slideCount)) {
                return false;
            }
    
            _.unload();
    
            if (typeof(index) === 'number') {
                if (index === 0 && _.$slides.length === 0) {
                    $(markup).appendTo(_.$slideTrack);
                } else if (addBefore) {
                    $(markup).insertBefore(_.$slides.eq(index));
                } else {
                    $(markup).insertAfter(_.$slides.eq(index));
                }
            } else {
                if (addBefore === true) {
                    $(markup).prependTo(_.$slideTrack);
                } else {
                    $(markup).appendTo(_.$slideTrack);
                }
            }
    
            _.$slides = _.$slideTrack.children(this.options.slide);
    
            _.$slideTrack.children(this.options.slide).detach();
    
            _.$slideTrack.append(_.$slides);
    
            _.$slides.each(function(index, element) {
                $(element).attr('data-slick-index', index);
            });
    
            _.$slidesCache = _.$slides;
    
            _.reinit();
    
        };
    
        Slick.prototype.animateHeight = function() {
            var _ = this;
            if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
                var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
                _.$list.animate({
                    height: targetHeight
                }, _.options.speed);
            }
        };
    
        Slick.prototype.animateSlide = function(targetLeft, callback) {
    
            var animProps = {},
                _ = this;
    
            _.animateHeight();
    
            if (_.options.rtl === true && _.options.vertical === false) {
                targetLeft = -targetLeft;
            }
            if (_.transformsEnabled === false) {
                if (_.options.vertical === false) {
                    _.$slideTrack.animate({
                        left: targetLeft
                    }, _.options.speed, _.options.easing, callback);
                } else {
                    _.$slideTrack.animate({
                        top: targetLeft
                    }, _.options.speed, _.options.easing, callback);
                }
    
            } else {
    
                if (_.cssTransitions === false) {
                    if (_.options.rtl === true) {
                        _.currentLeft = -(_.currentLeft);
                    }
                    $({
                        animStart: _.currentLeft
                    }).animate({
                        animStart: targetLeft
                    }, {
                        duration: _.options.speed,
                        easing: _.options.easing,
                        step: function(now) {
                            now = Math.ceil(now);
                            if (_.options.vertical === false) {
                                animProps[_.animType] = 'translate(' +
                                    now + 'px, 0px)';
                                _.$slideTrack.css(animProps);
                            } else {
                                animProps[_.animType] = 'translate(0px,' +
                                    now + 'px)';
                                _.$slideTrack.css(animProps);
                            }
                        },
                        complete: function() {
                            if (callback) {
                                callback.call();
                            }
                        }
                    });
    
                } else {
    
                    _.applyTransition();
                    targetLeft = Math.ceil(targetLeft);
    
                    if (_.options.vertical === false) {
                        animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                    } else {
                        animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                    }
                    _.$slideTrack.css(animProps);
    
                    if (callback) {
                        setTimeout(function() {
    
                            _.disableTransition();
    
                            callback.call();
                        }, _.options.speed);
                    }
    
                }
    
            }
    
        };
    
        Slick.prototype.getNavTarget = function() {
    
            var _ = this,
                asNavFor = _.options.asNavFor;
    
            if ( asNavFor && asNavFor !== null ) {
                asNavFor = $(asNavFor).not(_.$slider);
            }
    
            return asNavFor;
    
        };
    
        Slick.prototype.asNavFor = function(index) {
    
            var _ = this,
                asNavFor = _.getNavTarget();
    
            if ( asNavFor !== null && typeof asNavFor === 'object' ) {
                asNavFor.each(function() {
                    var target = $(this).slick('getSlick');
                    if(!target.unslicked) {
                        target.slideHandler(index, true);
                    }
                });
            }
    
        };
    
        Slick.prototype.applyTransition = function(slide) {
    
            var _ = this,
                transition = {};
    
            if (_.options.fade === false) {
                transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
            } else {
                transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
            }
    
            if (_.options.fade === false) {
                _.$slideTrack.css(transition);
            } else {
                _.$slides.eq(slide).css(transition);
            }
    
        };
    
        Slick.prototype.autoPlay = function() {
    
            var _ = this;
    
            _.autoPlayClear();
    
            if ( _.slideCount > _.options.slidesToShow ) {
                _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
            }
    
        };
    
        Slick.prototype.autoPlayClear = function() {
    
            var _ = this;
    
            if (_.autoPlayTimer) {
                clearInterval(_.autoPlayTimer);
            }
    
        };
    
        Slick.prototype.autoPlayIterator = function() {
    
            var _ = this,
                slideTo = _.currentSlide + _.options.slidesToScroll;
    
            if ( !_.paused && !_.interrupted && !_.focussed ) {
    
                if ( _.options.infinite === false ) {
    
                    if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
                        _.direction = 0;
                    }
    
                    else if ( _.direction === 0 ) {
    
                        slideTo = _.currentSlide - _.options.slidesToScroll;
    
                        if ( _.currentSlide - 1 === 0 ) {
                            _.direction = 1;
                        }
    
                    }
    
                }
    
                _.slideHandler( slideTo );
    
            }
    
        };
    
        Slick.prototype.buildArrows = function() {
    
            var _ = this;
    
            if (_.options.arrows === true ) {
    
                _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
                _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');
    
                if( _.slideCount > _.options.slidesToShow ) {
    
                    _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                    _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
    
                    if (_.htmlExpr.test(_.options.prevArrow)) {
                        _.$prevArrow.prependTo(_.options.appendArrows);
                    }
    
                    if (_.htmlExpr.test(_.options.nextArrow)) {
                        _.$nextArrow.appendTo(_.options.appendArrows);
                    }
    
                    if (_.options.infinite !== true) {
                        _.$prevArrow
                            .addClass('slick-disabled')
                            .attr('aria-disabled', 'true');
                    }
    
                } else {
    
                    _.$prevArrow.add( _.$nextArrow )
    
                        .addClass('slick-hidden')
                        .attr({
                            'aria-disabled': 'true',
                            'tabindex': '-1'
                        });
    
                }
    
            }
    
        };
    
        Slick.prototype.buildDots = function() {
    
            var _ = this,
                i, dot;
    
            if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
    
                _.$slider.addClass('slick-dotted');
    
                dot = $('<ul />').addClass(_.options.dotsClass);
    
                for (i = 0; i <= _.getDotCount(); i += 1) {
                    dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
                }
    
                _.$dots = dot.appendTo(_.options.appendDots);
    
                _.$dots.find('li').first().addClass('slick-active');
    
            }
    
        };
    
        Slick.prototype.buildOut = function() {
    
            var _ = this;
    
            _.$slides =
                _.$slider
                    .children( _.options.slide + ':not(.slick-cloned)')
                    .addClass('slick-slide');
    
            _.slideCount = _.$slides.length;
    
            _.$slides.each(function(index, element) {
                $(element)
                    .attr('data-slick-index', index)
                    .data('originalStyling', $(element).attr('style') || '');
            });
    
            _.$slider.addClass('slick-slider');
    
            _.$slideTrack = (_.slideCount === 0) ?
                $('<div class="slick-track"/>').appendTo(_.$slider) :
                _.$slides.wrapAll('<div class="slick-track"/>').parent();
    
            _.$list = _.$slideTrack.wrap(
                '<div class="slick-list"/>').parent();
            _.$slideTrack.css('opacity', 0);
    
            if (_.options.centerMode === true || _.options.swipeToSlide === true) {
                _.options.slidesToScroll = 1;
            }
    
            $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');
    
            _.setupInfinite();
    
            _.buildArrows();
    
            _.buildDots();
    
            _.updateDots();
    
    
            _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);
    
            if (_.options.draggable === true) {
                _.$list.addClass('draggable');
            }
    
        };
    
        Slick.prototype.buildRows = function() {
    
            var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;
    
            newSlides = document.createDocumentFragment();
            originalSlides = _.$slider.children();
    
            if(_.options.rows > 0) {
    
                slidesPerSection = _.options.slidesPerRow * _.options.rows;
                numOfSlides = Math.ceil(
                    originalSlides.length / slidesPerSection
                );
    
                for(a = 0; a < numOfSlides; a++){
                    var slide = document.createElement('div');
                    for(b = 0; b < _.options.rows; b++) {
                        var row = document.createElement('div');
                        for(c = 0; c < _.options.slidesPerRow; c++) {
                            var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                            if (originalSlides.get(target)) {
                                row.appendChild(originalSlides.get(target));
                            }
                        }
                        slide.appendChild(row);
                    }
                    newSlides.appendChild(slide);
                }
    
                _.$slider.empty().append(newSlides);
                _.$slider.children().children().children()
                    .css({
                        'width':(100 / _.options.slidesPerRow) + '%',
                        'display': 'inline-block'
                    });
    
            }
    
        };
    
        Slick.prototype.checkResponsive = function(initial, forceUpdate) {
    
            var _ = this,
                breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
            var sliderWidth = _.$slider.width();
            var windowWidth = window.innerWidth || $(window).width();
    
            if (_.respondTo === 'window') {
                respondToWidth = windowWidth;
            } else if (_.respondTo === 'slider') {
                respondToWidth = sliderWidth;
            } else if (_.respondTo === 'min') {
                respondToWidth = Math.min(windowWidth, sliderWidth);
            }
    
            if ( _.options.responsive &&
                _.options.responsive.length &&
                _.options.responsive !== null) {
    
                targetBreakpoint = null;
    
                for (breakpoint in _.breakpoints) {
                    if (_.breakpoints.hasOwnProperty(breakpoint)) {
                        if (_.originalSettings.mobileFirst === false) {
                            if (respondToWidth < _.breakpoints[breakpoint]) {
                                targetBreakpoint = _.breakpoints[breakpoint];
                            }
                        } else {
                            if (respondToWidth > _.breakpoints[breakpoint]) {
                                targetBreakpoint = _.breakpoints[breakpoint];
                            }
                        }
                    }
                }
    
                if (targetBreakpoint !== null) {
                    if (_.activeBreakpoint !== null) {
                        if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                            _.activeBreakpoint =
                                targetBreakpoint;
                            if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                                _.unslick(targetBreakpoint);
                            } else {
                                _.options = $.extend({}, _.originalSettings,
                                    _.breakpointSettings[
                                        targetBreakpoint]);
                                if (initial === true) {
                                    _.currentSlide = _.options.initialSlide;
                                }
                                _.refresh(initial);
                            }
                            triggerBreakpoint = targetBreakpoint;
                        }
                    } else {
                        _.activeBreakpoint = targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    if (_.activeBreakpoint !== null) {
                        _.activeBreakpoint = null;
                        _.options = _.originalSettings;
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                        triggerBreakpoint = targetBreakpoint;
                    }
                }
    
                // only trigger breakpoints during an actual break. not on initialize.
                if( !initial && triggerBreakpoint !== false ) {
                    _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
                }
            }
    
        };
    
        Slick.prototype.changeSlide = function(event, dontAnimate) {
    
            var _ = this,
                $target = $(event.currentTarget),
                indexOffset, slideOffset, unevenOffset;
    
            // If target is a link, prevent default action.
            if($target.is('a')) {
                event.preventDefault();
            }
    
            // If target is not the <li> element (ie: a child), find the <li>.
            if(!$target.is('li')) {
                $target = $target.closest('li');
            }
    
            unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
            indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;
    
            switch (event.data.message) {
    
                case 'previous':
                    slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                    if (_.slideCount > _.options.slidesToShow) {
                        _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                    }
                    break;
    
                case 'next':
                    slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                    if (_.slideCount > _.options.slidesToShow) {
                        _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                    }
                    break;
    
                case 'index':
                    var index = event.data.index === 0 ? 0 :
                        event.data.index || $target.index() * _.options.slidesToScroll;
    
                    _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                    $target.children().trigger('focus');
                    break;
    
                default:
                    return;
            }
    
        };
    
        Slick.prototype.checkNavigable = function(index) {
    
            var _ = this,
                navigables, prevNavigable;
    
            navigables = _.getNavigableIndexes();
            prevNavigable = 0;
            if (index > navigables[navigables.length - 1]) {
                index = navigables[navigables.length - 1];
            } else {
                for (var n in navigables) {
                    if (index < navigables[n]) {
                        index = prevNavigable;
                        break;
                    }
                    prevNavigable = navigables[n];
                }
            }
    
            return index;
        };
    
        Slick.prototype.cleanUpEvents = function() {
    
            var _ = this;
    
            if (_.options.dots && _.$dots !== null) {
    
                $('li', _.$dots)
                    .off('click.slick', _.changeSlide)
                    .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                    .off('mouseleave.slick', $.proxy(_.interrupt, _, false));
    
                if (_.options.accessibility === true) {
                    _.$dots.off('keydown.slick', _.keyHandler);
                }
            }
    
            _.$slider.off('focus.slick blur.slick');
    
            if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
                _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
                _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);
    
                if (_.options.accessibility === true) {
                    _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
                    _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
                }
            }
    
            _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
            _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
            _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
            _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);
    
            _.$list.off('click.slick', _.clickHandler);
    
            $(document).off(_.visibilityChange, _.visibility);
    
            _.cleanUpSlideEvents();
    
            if (_.options.accessibility === true) {
                _.$list.off('keydown.slick', _.keyHandler);
            }
    
            if (_.options.focusOnSelect === true) {
                $(_.$slideTrack).children().off('click.slick', _.selectHandler);
            }
    
            $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);
    
            $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);
    
            $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);
    
            $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
    
        };
    
        Slick.prototype.cleanUpSlideEvents = function() {
    
            var _ = this;
    
            _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));
    
        };
    
        Slick.prototype.cleanUpRows = function() {
    
            var _ = this, originalSlides;
    
            if(_.options.rows > 0) {
                originalSlides = _.$slides.children().children();
                originalSlides.removeAttr('style');
                _.$slider.empty().append(originalSlides);
            }
    
        };
    
        Slick.prototype.clickHandler = function(event) {
    
            var _ = this;
    
            if (_.shouldClick === false) {
                event.stopImmediatePropagation();
                event.stopPropagation();
                event.preventDefault();
            }
    
        };
    
        Slick.prototype.destroy = function(refresh) {
    
            var _ = this;
    
            _.autoPlayClear();
    
            _.touchObject = {};
    
            _.cleanUpEvents();
    
            $('.slick-cloned', _.$slider).detach();
    
            if (_.$dots) {
                _.$dots.remove();
            }
    
            if ( _.$prevArrow && _.$prevArrow.length ) {
    
                _.$prevArrow
                    .removeClass('slick-disabled slick-arrow slick-hidden')
                    .removeAttr('aria-hidden aria-disabled tabindex')
                    .css('display','');
    
                if ( _.htmlExpr.test( _.options.prevArrow )) {
                    _.$prevArrow.remove();
                }
            }
    
            if ( _.$nextArrow && _.$nextArrow.length ) {
    
                _.$nextArrow
                    .removeClass('slick-disabled slick-arrow slick-hidden')
                    .removeAttr('aria-hidden aria-disabled tabindex')
                    .css('display','');
    
                if ( _.htmlExpr.test( _.options.nextArrow )) {
                    _.$nextArrow.remove();
                }
            }
    
    
            if (_.$slides) {
    
                _.$slides
                    .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                    .removeAttr('aria-hidden')
                    .removeAttr('data-slick-index')
                    .each(function(){
                        $(this).attr('style', $(this).data('originalStyling'));
                    });
    
                _.$slideTrack.children(this.options.slide).detach();
    
                _.$slideTrack.detach();
    
                _.$list.detach();
    
                _.$slider.append(_.$slides);
            }
    
            _.cleanUpRows();
    
            _.$slider.removeClass('slick-slider');
            _.$slider.removeClass('slick-initialized');
            _.$slider.removeClass('slick-dotted');
    
            _.unslicked = true;
    
            if(!refresh) {
                _.$slider.trigger('destroy', [_]);
            }
    
        };
    
        Slick.prototype.disableTransition = function(slide) {
    
            var _ = this,
                transition = {};
    
            transition[_.transitionType] = '';
    
            if (_.options.fade === false) {
                _.$slideTrack.css(transition);
            } else {
                _.$slides.eq(slide).css(transition);
            }
    
        };
    
        Slick.prototype.fadeSlide = function(slideIndex, callback) {
    
            var _ = this;
    
            if (_.cssTransitions === false) {
    
                _.$slides.eq(slideIndex).css({
                    zIndex: _.options.zIndex
                });
    
                _.$slides.eq(slideIndex).animate({
                    opacity: 1
                }, _.options.speed, _.options.easing, callback);
    
            } else {
    
                _.applyTransition(slideIndex);
    
                _.$slides.eq(slideIndex).css({
                    opacity: 1,
                    zIndex: _.options.zIndex
                });
    
                if (callback) {
                    setTimeout(function() {
    
                        _.disableTransition(slideIndex);
    
                        callback.call();
                    }, _.options.speed);
                }
    
            }
    
        };
    
        Slick.prototype.fadeSlideOut = function(slideIndex) {
    
            var _ = this;
    
            if (_.cssTransitions === false) {
    
                _.$slides.eq(slideIndex).animate({
                    opacity: 0,
                    zIndex: _.options.zIndex - 2
                }, _.options.speed, _.options.easing);
    
            } else {
    
                _.applyTransition(slideIndex);
    
                _.$slides.eq(slideIndex).css({
                    opacity: 0,
                    zIndex: _.options.zIndex - 2
                });
    
            }
    
        };
    
        Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {
    
            var _ = this;
    
            if (filter !== null) {
    
                _.$slidesCache = _.$slides;
    
                _.unload();
    
                _.$slideTrack.children(this.options.slide).detach();
    
                _.$slidesCache.filter(filter).appendTo(_.$slideTrack);
    
                _.reinit();
    
            }
    
        };
    
        Slick.prototype.focusHandler = function() {
    
            var _ = this;
    
            _.$slider
                .off('focus.slick blur.slick')
                .on('focus.slick blur.slick', '*', function(event) {
    
                event.stopImmediatePropagation();
                var $sf = $(this);
    
                setTimeout(function() {
    
                    if( _.options.pauseOnFocus ) {
                        _.focussed = $sf.is(':focus');
                        _.autoPlay();
                    }
    
                }, 0);
    
            });
        };
    
        Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {
    
            var _ = this;
            return _.currentSlide;
    
        };
    
        Slick.prototype.getDotCount = function() {
    
            var _ = this;
    
            var breakPoint = 0;
            var counter = 0;
            var pagerQty = 0;
    
            if (_.options.infinite === true) {
                if (_.slideCount <= _.options.slidesToShow) {
                     ++pagerQty;
                } else {
                    while (breakPoint < _.slideCount) {
                        ++pagerQty;
                        breakPoint = counter + _.options.slidesToScroll;
                        counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                    }
                }
            } else if (_.options.centerMode === true) {
                pagerQty = _.slideCount;
            } else if(!_.options.asNavFor) {
                pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
            }else {
                while (breakPoint < _.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + _.options.slidesToScroll;
                    counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                }
            }
    
            return pagerQty - 1;
    
        };
    
        Slick.prototype.getLeft = function(slideIndex) {
    
            var _ = this,
                targetLeft,
                verticalHeight,
                verticalOffset = 0,
                targetSlide,
                coef;
    
            _.slideOffset = 0;
            verticalHeight = _.$slides.first().outerHeight(true);
    
            if (_.options.infinite === true) {
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                    coef = -1
    
                    if (_.options.vertical === true && _.options.centerMode === true) {
                        if (_.options.slidesToShow === 2) {
                            coef = -1.5;
                        } else if (_.options.slidesToShow === 1) {
                            coef = -2
                        }
                    }
                    verticalOffset = (verticalHeight * _.options.slidesToShow) * coef;
                }
                if (_.slideCount % _.options.slidesToScroll !== 0) {
                    if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                        if (slideIndex > _.slideCount) {
                            _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                            verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                        } else {
                            _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                            verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                        }
                    }
                }
            } else {
                if (slideIndex + _.options.slidesToShow > _.slideCount) {
                    _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                    verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
                }
            }
    
            if (_.slideCount <= _.options.slidesToShow) {
                _.slideOffset = 0;
                verticalOffset = 0;
            }
    
            if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
                _.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
            } else if (_.options.centerMode === true && _.options.infinite === true) {
                _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
            } else if (_.options.centerMode === true) {
                _.slideOffset = 0;
                _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
            }
    
            if (_.options.vertical === false) {
                targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
            } else {
                targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
            }
    
            if (_.options.variableWidth === true) {
    
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
                }
    
                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }
    
                if (_.options.centerMode === true) {
                    if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                        targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                    } else {
                        targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                    }
    
                    if (_.options.rtl === true) {
                        if (targetSlide[0]) {
                            targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                        } else {
                            targetLeft =  0;
                        }
                    } else {
                        targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                    }
    
                    targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
                }
            }
    
            return targetLeft;
    
        };
    
        Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {
    
            var _ = this;
    
            return _.options[option];
    
        };
    
        Slick.prototype.getNavigableIndexes = function() {
    
            var _ = this,
                breakPoint = 0,
                counter = 0,
                indexes = [],
                max;
    
            if (_.options.infinite === false) {
                max = _.slideCount;
            } else {
                breakPoint = _.options.slidesToScroll * -1;
                counter = _.options.slidesToScroll * -1;
                max = _.slideCount * 2;
            }
    
            while (breakPoint < max) {
                indexes.push(breakPoint);
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
    
            return indexes;
    
        };
    
        Slick.prototype.getSlick = function() {
    
            return this;
    
        };
    
        Slick.prototype.getSlideCount = function() {
    
            var _ = this,
                slidesTraversed, swipedSlide, centerOffset;
    
            centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;
    
            if (_.options.swipeToSlide === true) {
                _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                    if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                        swipedSlide = slide;
                        return false;
                    }
                });
    
                slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;
    
                return slidesTraversed;
    
            } else {
                return _.options.slidesToScroll;
            }
    
        };
    
        Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {
    
            var _ = this;
    
            _.changeSlide({
                data: {
                    message: 'index',
                    index: parseInt(slide)
                }
            }, dontAnimate);
    
        };
    
        Slick.prototype.init = function(creation) {
    
            var _ = this;
    
            if (!$(_.$slider).hasClass('slick-initialized')) {
    
                $(_.$slider).addClass('slick-initialized');
    
                _.buildRows();
                _.buildOut();
                _.setProps();
                _.startLoad();
                _.loadSlider();
                _.initializeEvents();
                _.updateArrows();
                _.updateDots();
                _.checkResponsive(true);
                _.focusHandler();
    
            }
    
            if (creation) {
                _.$slider.trigger('init', [_]);
            }
    
            if (_.options.accessibility === true) {
                _.initADA();
            }
    
            if ( _.options.autoplay ) {
    
                _.paused = false;
                _.autoPlay();
    
            }
    
        };
    
        Slick.prototype.initADA = function() {
            var _ = this,
                    numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
                    tabControlIndexes = _.getNavigableIndexes().filter(function(val) {
                        return (val >= 0) && (val < _.slideCount);
                    });
    
            _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
                'aria-hidden': 'true',
                'tabindex': '-1'
            }).find('a, input, button, select').attr({
                'tabindex': '-1'
            });
    
            if (_.$dots !== null) {
                _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
                    var slideControlIndex = tabControlIndexes.indexOf(i);
    
                    $(this).attr({
                        'role': 'tabpanel',
                        'id': 'slick-slide' + _.instanceUid + i,
                        'tabindex': -1
                    });
    
                    if (slideControlIndex !== -1) {
                       var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex
                       if ($('#' + ariaButtonControl).length) {
                         $(this).attr({
                             'aria-describedby': ariaButtonControl
                         });
                       }
                    }
                });
    
                _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                    var mappedSlideIndex = tabControlIndexes[i];
    
                    $(this).attr({
                        'role': 'presentation'
                    });
    
                    $(this).find('button').first().attr({
                        'role': 'tab',
                        'id': 'slick-slide-control' + _.instanceUid + i,
                        'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
                        'aria-label': (i + 1) + ' of ' + numDotGroups,
                        'aria-selected': null,
                        'tabindex': '-1'
                    });
    
                }).eq(_.currentSlide).find('button').attr({
                    'aria-selected': 'true',
                    'tabindex': '0'
                }).end();
            }
    
            for (var i=_.currentSlide, max=i+_.options.slidesToShow; i < max; i++) {
              if (_.options.focusOnChange) {
                _.$slides.eq(i).attr({'tabindex': '0'});
              } else {
                _.$slides.eq(i).removeAttr('tabindex');
              }
            }
    
            _.activateADA();
    
        };
    
        Slick.prototype.initArrowEvents = function() {
    
            var _ = this;
    
            if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
                _.$prevArrow
                   .off('click.slick')
                   .on('click.slick', {
                        message: 'previous'
                   }, _.changeSlide);
                _.$nextArrow
                   .off('click.slick')
                   .on('click.slick', {
                        message: 'next'
                   }, _.changeSlide);
    
                if (_.options.accessibility === true) {
                    _.$prevArrow.on('keydown.slick', _.keyHandler);
                    _.$nextArrow.on('keydown.slick', _.keyHandler);
                }
            }
    
        };
    
        Slick.prototype.initDotEvents = function() {
    
            var _ = this;
    
            if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
                $('li', _.$dots).on('click.slick', {
                    message: 'index'
                }, _.changeSlide);
    
                if (_.options.accessibility === true) {
                    _.$dots.on('keydown.slick', _.keyHandler);
                }
            }
    
            if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {
    
                $('li', _.$dots)
                    .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                    .on('mouseleave.slick', $.proxy(_.interrupt, _, false));
    
            }
    
        };
    
        Slick.prototype.initSlideEvents = function() {
    
            var _ = this;
    
            if ( _.options.pauseOnHover ) {
    
                _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
                _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));
    
            }
    
        };
    
        Slick.prototype.initializeEvents = function() {
    
            var _ = this;
    
            _.initArrowEvents();
    
            _.initDotEvents();
            _.initSlideEvents();
    
            _.$list.on('touchstart.slick mousedown.slick', {
                action: 'start'
            }, _.swipeHandler);
            _.$list.on('touchmove.slick mousemove.slick', {
                action: 'move'
            }, _.swipeHandler);
            _.$list.on('touchend.slick mouseup.slick', {
                action: 'end'
            }, _.swipeHandler);
            _.$list.on('touchcancel.slick mouseleave.slick', {
                action: 'end'
            }, _.swipeHandler);
    
            _.$list.on('click.slick', _.clickHandler);
    
            $(document).on(_.visibilityChange, $.proxy(_.visibility, _));
    
            if (_.options.accessibility === true) {
                _.$list.on('keydown.slick', _.keyHandler);
            }
    
            if (_.options.focusOnSelect === true) {
                $(_.$slideTrack).children().on('click.slick', _.selectHandler);
            }
    
            $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));
    
            $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));
    
            $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);
    
            $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
            $(_.setPosition);
    
        };
    
        Slick.prototype.initUI = function() {
    
            var _ = this;
    
            if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
    
                _.$prevArrow.show();
                _.$nextArrow.show();
    
            }
    
            if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
    
                _.$dots.show();
    
            }
    
        };
    
        Slick.prototype.keyHandler = function(event) {
    
            var _ = this;
             //Dont slide if the cursor is inside the form fields and arrow keys are pressed
            if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
                if (event.keyCode === 37 && _.options.accessibility === true) {
                    _.changeSlide({
                        data: {
                            message: _.options.rtl === true ? 'next' :  'previous'
                        }
                    });
                } else if (event.keyCode === 39 && _.options.accessibility === true) {
                    _.changeSlide({
                        data: {
                            message: _.options.rtl === true ? 'previous' : 'next'
                        }
                    });
                }
            }
    
        };
    
        Slick.prototype.lazyLoad = function() {
    
            var _ = this,
                loadRange, cloneRange, rangeStart, rangeEnd;
    
            function loadImages(imagesScope) {
    
                $('img[data-lazy]', imagesScope).each(function() {
    
                    var image = $(this),
                        imageSource = $(this).attr('data-lazy'),
                        imageSrcSet = $(this).attr('data-srcset'),
                        imageSizes  = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
                        imageToLoad = document.createElement('img');
    
                    imageToLoad.onload = function() {
    
                        image
                            .animate({ opacity: 0 }, 100, function() {
    
                                if (imageSrcSet) {
                                    image
                                        .attr('srcset', imageSrcSet );
    
                                    if (imageSizes) {
                                        image
                                            .attr('sizes', imageSizes );
                                    }
                                }
    
                                image
                                    .attr('src', imageSource)
                                    .animate({ opacity: 1 }, 200, function() {
                                        image
                                            .removeAttr('data-lazy data-srcset data-sizes')
                                            .removeClass('slick-loading');
                                    });
                                _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                            });
    
                    };
    
                    imageToLoad.onerror = function() {
    
                        image
                            .removeAttr( 'data-lazy' )
                            .removeClass( 'slick-loading' )
                            .addClass( 'slick-lazyload-error' );
    
                        _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);
    
                    };
    
                    imageToLoad.src = imageSource;
    
                });
    
            }
    
            if (_.options.centerMode === true) {
                if (_.options.infinite === true) {
                    rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                    rangeEnd = rangeStart + _.options.slidesToShow + 2;
                } else {
                    rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                    rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
                }
            } else {
                rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
                rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
                if (_.options.fade === true) {
                    if (rangeStart > 0) rangeStart--;
                    if (rangeEnd <= _.slideCount) rangeEnd++;
                }
            }
    
            loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);
    
            if (_.options.lazyLoad === 'anticipated') {
                var prevSlide = rangeStart - 1,
                    nextSlide = rangeEnd,
                    $slides = _.$slider.find('.slick-slide');
    
                for (var i = 0; i < _.options.slidesToScroll; i++) {
                    if (prevSlide < 0) prevSlide = _.slideCount - 1;
                    loadRange = loadRange.add($slides.eq(prevSlide));
                    loadRange = loadRange.add($slides.eq(nextSlide));
                    prevSlide--;
                    nextSlide++;
                }
            }
    
            loadImages(loadRange);
    
            if (_.slideCount <= _.options.slidesToShow) {
                cloneRange = _.$slider.find('.slick-slide');
                loadImages(cloneRange);
            } else
            if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
                cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
                loadImages(cloneRange);
            } else if (_.currentSlide === 0) {
                cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
                loadImages(cloneRange);
            }
    
        };
    
        Slick.prototype.loadSlider = function() {
    
            var _ = this;
    
            _.setPosition();
    
            _.$slideTrack.css({
                opacity: 1
            });
    
            _.$slider.removeClass('slick-loading');
    
            _.initUI();
    
            if (_.options.lazyLoad === 'progressive') {
                _.progressiveLazyLoad();
            }
    
        };
    
        Slick.prototype.next = Slick.prototype.slickNext = function() {
    
            var _ = this;
    
            _.changeSlide({
                data: {
                    message: 'next'
                }
            });
    
        };
    
        Slick.prototype.orientationChange = function() {
    
            var _ = this;
    
            _.checkResponsive();
            _.setPosition();
    
        };
    
        Slick.prototype.pause = Slick.prototype.slickPause = function() {
    
            var _ = this;
    
            _.autoPlayClear();
            _.paused = true;
    
        };
    
        Slick.prototype.play = Slick.prototype.slickPlay = function() {
    
            var _ = this;
    
            _.autoPlay();
            _.options.autoplay = true;
            _.paused = false;
            _.focussed = false;
            _.interrupted = false;
    
        };
    
        Slick.prototype.postSlide = function(index) {
    
            var _ = this;
    
            if( !_.unslicked ) {
    
                _.$slider.trigger('afterChange', [_, index]);
    
                _.animating = false;
    
                if (_.slideCount > _.options.slidesToShow) {
                    _.setPosition();
                }
    
                _.swipeLeft = null;
    
                if ( _.options.autoplay ) {
                    _.autoPlay();
                }
    
                if (_.options.accessibility === true) {
                    _.initADA();
    
                    if (_.options.focusOnChange) {
                        var $currentSlide = $(_.$slides.get(_.currentSlide));
                        $currentSlide.attr('tabindex', 0).focus();
                    }
                }
    
            }
    
        };
    
        Slick.prototype.prev = Slick.prototype.slickPrev = function() {
    
            var _ = this;
    
            _.changeSlide({
                data: {
                    message: 'previous'
                }
            });
    
        };
    
        Slick.prototype.preventDefault = function(event) {
    
            event.preventDefault();
    
        };
    
        Slick.prototype.progressiveLazyLoad = function( tryCount ) {
    
            tryCount = tryCount || 1;
    
            var _ = this,
                $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
                image,
                imageSource,
                imageSrcSet,
                imageSizes,
                imageToLoad;
    
            if ( $imgsToLoad.length ) {
    
                image = $imgsToLoad.first();
                imageSource = image.attr('data-lazy');
                imageSrcSet = image.attr('data-srcset');
                imageSizes  = image.attr('data-sizes') || _.$slider.attr('data-sizes');
                imageToLoad = document.createElement('img');
    
                imageToLoad.onload = function() {
    
                    if (imageSrcSet) {
                        image
                            .attr('srcset', imageSrcSet );
    
                        if (imageSizes) {
                            image
                                .attr('sizes', imageSizes );
                        }
                    }
    
                    image
                        .attr( 'src', imageSource )
                        .removeAttr('data-lazy data-srcset data-sizes')
                        .removeClass('slick-loading');
    
                    if ( _.options.adaptiveHeight === true ) {
                        _.setPosition();
                    }
    
                    _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
                    _.progressiveLazyLoad();
    
                };
    
                imageToLoad.onerror = function() {
    
                    if ( tryCount < 3 ) {
    
                        /**
                         * try to load the image 3 times,
                         * leave a slight delay so we don't get
                         * servers blocking the request.
                         */
                        setTimeout( function() {
                            _.progressiveLazyLoad( tryCount + 1 );
                        }, 500 );
    
                    } else {
    
                        image
                            .removeAttr( 'data-lazy' )
                            .removeClass( 'slick-loading' )
                            .addClass( 'slick-lazyload-error' );
    
                        _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);
    
                        _.progressiveLazyLoad();
    
                    }
    
                };
    
                imageToLoad.src = imageSource;
    
            } else {
    
                _.$slider.trigger('allImagesLoaded', [ _ ]);
    
            }
    
        };
    
        Slick.prototype.refresh = function( initializing ) {
    
            var _ = this, currentSlide, lastVisibleIndex;
    
            lastVisibleIndex = _.slideCount - _.options.slidesToShow;
    
            // in non-infinite sliders, we don't want to go past the
            // last visible index.
            if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
                _.currentSlide = lastVisibleIndex;
            }
    
            // if less slides than to show, go to start.
            if ( _.slideCount <= _.options.slidesToShow ) {
                _.currentSlide = 0;
    
            }
    
            currentSlide = _.currentSlide;
    
            _.destroy(true);
    
            $.extend(_, _.initials, { currentSlide: currentSlide });
    
            _.init();
    
            if( !initializing ) {
    
                _.changeSlide({
                    data: {
                        message: 'index',
                        index: currentSlide
                    }
                }, false);
    
            }
    
        };
    
        Slick.prototype.registerBreakpoints = function() {
    
            var _ = this, breakpoint, currentBreakpoint, l,
                responsiveSettings = _.options.responsive || null;
    
            if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {
    
                _.respondTo = _.options.respondTo || 'window';
    
                for ( breakpoint in responsiveSettings ) {
    
                    l = _.breakpoints.length-1;
    
                    if (responsiveSettings.hasOwnProperty(breakpoint)) {
                        currentBreakpoint = responsiveSettings[breakpoint].breakpoint;
    
                        // loop through the breakpoints and cut out any existing
                        // ones with the same breakpoint number, we don't want dupes.
                        while( l >= 0 ) {
                            if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                                _.breakpoints.splice(l,1);
                            }
                            l--;
                        }
    
                        _.breakpoints.push(currentBreakpoint);
                        _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
    
                    }
    
                }
    
                _.breakpoints.sort(function(a, b) {
                    return ( _.options.mobileFirst ) ? a-b : b-a;
                });
    
            }
    
        };
    
        Slick.prototype.reinit = function() {
    
            var _ = this;
    
            _.$slides =
                _.$slideTrack
                    .children(_.options.slide)
                    .addClass('slick-slide');
    
            _.slideCount = _.$slides.length;
    
            if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
                _.currentSlide = _.currentSlide - _.options.slidesToScroll;
            }
    
            if (_.slideCount <= _.options.slidesToShow) {
                _.currentSlide = 0;
            }
    
            _.registerBreakpoints();
    
            _.setProps();
            _.setupInfinite();
            _.buildArrows();
            _.updateArrows();
            _.initArrowEvents();
            _.buildDots();
            _.updateDots();
            _.initDotEvents();
            _.cleanUpSlideEvents();
            _.initSlideEvents();
    
            _.checkResponsive(false, true);
    
            if (_.options.focusOnSelect === true) {
                $(_.$slideTrack).children().on('click.slick', _.selectHandler);
            }
    
            _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);
    
            _.setPosition();
            _.focusHandler();
    
            _.paused = !_.options.autoplay;
            _.autoPlay();
    
            _.$slider.trigger('reInit', [_]);
    
        };
    
        Slick.prototype.resize = function() {
    
            var _ = this;
    
            if ($(window).width() !== _.windowWidth) {
                clearTimeout(_.windowDelay);
                _.windowDelay = window.setTimeout(function() {
                    _.windowWidth = $(window).width();
                    _.checkResponsive();
                    if( !_.unslicked ) { _.setPosition(); }
                }, 50);
            }
        };
    
        Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {
    
            var _ = this;
    
            if (typeof(index) === 'boolean') {
                removeBefore = index;
                index = removeBefore === true ? 0 : _.slideCount - 1;
            } else {
                index = removeBefore === true ? --index : index;
            }
    
            if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
                return false;
            }
    
            _.unload();
    
            if (removeAll === true) {
                _.$slideTrack.children().remove();
            } else {
                _.$slideTrack.children(this.options.slide).eq(index).remove();
            }
    
            _.$slides = _.$slideTrack.children(this.options.slide);
    
            _.$slideTrack.children(this.options.slide).detach();
    
            _.$slideTrack.append(_.$slides);
    
            _.$slidesCache = _.$slides;
    
            _.reinit();
    
        };
    
        Slick.prototype.setCSS = function(position) {
    
            var _ = this,
                positionProps = {},
                x, y;
    
            if (_.options.rtl === true) {
                position = -position;
            }
            x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
            y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';
    
            positionProps[_.positionProp] = position;
    
            if (_.transformsEnabled === false) {
                _.$slideTrack.css(positionProps);
            } else {
                positionProps = {};
                if (_.cssTransitions === false) {
                    positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                    _.$slideTrack.css(positionProps);
                } else {
                    positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                    _.$slideTrack.css(positionProps);
                }
            }
    
        };
    
        Slick.prototype.setDimensions = function() {
    
            var _ = this;
    
            if (_.options.vertical === false) {
                if (_.options.centerMode === true) {
                    _.$list.css({
                        padding: ('0px ' + _.options.centerPadding)
                    });
                }
            } else {
                _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
                if (_.options.centerMode === true) {
                    _.$list.css({
                        padding: (_.options.centerPadding + ' 0px')
                    });
                }
            }
    
            _.listWidth = _.$list.width();
            _.listHeight = _.$list.height();
    
    
            if (_.options.vertical === false && _.options.variableWidth === false) {
                _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
                _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));
    
            } else if (_.options.variableWidth === true) {
                _.$slideTrack.width(5000 * _.slideCount);
            } else {
                _.slideWidth = Math.ceil(_.listWidth);
                _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
            }
    
            var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
            if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);
    
        };
    
        Slick.prototype.setFade = function() {
    
            var _ = this,
                targetLeft;
    
            _.$slides.each(function(index, element) {
                targetLeft = (_.slideWidth * index) * -1;
                if (_.options.rtl === true) {
                    $(element).css({
                        position: 'relative',
                        right: targetLeft,
                        top: 0,
                        zIndex: _.options.zIndex - 2,
                        opacity: 0
                    });
                } else {
                    $(element).css({
                        position: 'relative',
                        left: targetLeft,
                        top: 0,
                        zIndex: _.options.zIndex - 2,
                        opacity: 0
                    });
                }
            });
    
            _.$slides.eq(_.currentSlide).css({
                zIndex: _.options.zIndex - 1,
                opacity: 1
            });
    
        };
    
        Slick.prototype.setHeight = function() {
    
            var _ = this;
    
            if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
                var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
                _.$list.css('height', targetHeight);
            }
    
        };
    
        Slick.prototype.setOption =
        Slick.prototype.slickSetOption = function() {
    
            /**
             * accepts arguments in format of:
             *
             *  - for changing a single option's value:
             *     .slick("setOption", option, value, refresh )
             *
             *  - for changing a set of responsive options:
             *     .slick("setOption", 'responsive', [{}, ...], refresh )
             *
             *  - for updating multiple values at once (not responsive)
             *     .slick("setOption", { 'option': value, ... }, refresh )
             */
    
            var _ = this, l, item, option, value, refresh = false, type;
    
            if( $.type( arguments[0] ) === 'object' ) {
    
                option =  arguments[0];
                refresh = arguments[1];
                type = 'multiple';
    
            } else if ( $.type( arguments[0] ) === 'string' ) {
    
                option =  arguments[0];
                value = arguments[1];
                refresh = arguments[2];
    
                if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {
    
                    type = 'responsive';
    
                } else if ( typeof arguments[1] !== 'undefined' ) {
    
                    type = 'single';
    
                }
    
            }
    
            if ( type === 'single' ) {
    
                _.options[option] = value;
    
    
            } else if ( type === 'multiple' ) {
    
                $.each( option , function( opt, val ) {
    
                    _.options[opt] = val;
    
                });
    
    
            } else if ( type === 'responsive' ) {
    
                for ( item in value ) {
    
                    if( $.type( _.options.responsive ) !== 'array' ) {
    
                        _.options.responsive = [ value[item] ];
    
                    } else {
    
                        l = _.options.responsive.length-1;
    
                        // loop through the responsive object and splice out duplicates.
                        while( l >= 0 ) {
    
                            if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {
    
                                _.options.responsive.splice(l,1);
    
                            }
    
                            l--;
    
                        }
    
                        _.options.responsive.push( value[item] );
    
                    }
    
                }
    
            }
    
            if ( refresh ) {
    
                _.unload();
                _.reinit();
    
            }
    
        };
    
        Slick.prototype.setPosition = function() {
    
            var _ = this;
    
            _.setDimensions();
    
            _.setHeight();
    
            if (_.options.fade === false) {
                _.setCSS(_.getLeft(_.currentSlide));
            } else {
                _.setFade();
            }
    
            _.$slider.trigger('setPosition', [_]);
    
        };
    
        Slick.prototype.setProps = function() {
    
            var _ = this,
                bodyStyle = document.body.style;
    
            _.positionProp = _.options.vertical === true ? 'top' : 'left';
    
            if (_.positionProp === 'top') {
                _.$slider.addClass('slick-vertical');
            } else {
                _.$slider.removeClass('slick-vertical');
            }
    
            if (bodyStyle.WebkitTransition !== undefined ||
                bodyStyle.MozTransition !== undefined ||
                bodyStyle.msTransition !== undefined) {
                if (_.options.useCSS === true) {
                    _.cssTransitions = true;
                }
            }
    
            if ( _.options.fade ) {
                if ( typeof _.options.zIndex === 'number' ) {
                    if( _.options.zIndex < 3 ) {
                        _.options.zIndex = 3;
                    }
                } else {
                    _.options.zIndex = _.defaults.zIndex;
                }
            }
    
            if (bodyStyle.OTransform !== undefined) {
                _.animType = 'OTransform';
                _.transformType = '-o-transform';
                _.transitionType = 'OTransition';
                if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
            }
            if (bodyStyle.MozTransform !== undefined) {
                _.animType = 'MozTransform';
                _.transformType = '-moz-transform';
                _.transitionType = 'MozTransition';
                if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
            }
            if (bodyStyle.webkitTransform !== undefined) {
                _.animType = 'webkitTransform';
                _.transformType = '-webkit-transform';
                _.transitionType = 'webkitTransition';
                if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
            }
            if (bodyStyle.msTransform !== undefined) {
                _.animType = 'msTransform';
                _.transformType = '-ms-transform';
                _.transitionType = 'msTransition';
                if (bodyStyle.msTransform === undefined) _.animType = false;
            }
            if (bodyStyle.transform !== undefined && _.animType !== false) {
                _.animType = 'transform';
                _.transformType = 'transform';
                _.transitionType = 'transition';
            }
            _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
        };
    
    
        Slick.prototype.setSlideClasses = function(index) {
    
            var _ = this,
                centerOffset, allSlides, indexOffset, remainder;
    
            allSlides = _.$slider
                .find('.slick-slide')
                .removeClass('slick-active slick-center slick-current')
                .attr('aria-hidden', 'true');
    
            _.$slides
                .eq(index)
                .addClass('slick-current');
    
            if (_.options.centerMode === true) {
    
                var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;
    
                centerOffset = Math.floor(_.options.slidesToShow / 2);
    
                if (_.options.infinite === true) {
    
                    if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
                        _.$slides
                            .slice(index - centerOffset + evenCoef, index + centerOffset + 1)
                            .addClass('slick-active')
                            .attr('aria-hidden', 'false');
    
                    } else {
    
                        indexOffset = _.options.slidesToShow + index;
                        allSlides
                            .slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)
                            .addClass('slick-active')
                            .attr('aria-hidden', 'false');
    
                    }
    
                    if (index === 0) {
    
                        allSlides
                            .eq(allSlides.length - 1 - _.options.slidesToShow)
                            .addClass('slick-center');
    
                    } else if (index === _.slideCount - 1) {
    
                        allSlides
                            .eq(_.options.slidesToShow)
                            .addClass('slick-center');
    
                    }
    
                }
    
                _.$slides
                    .eq(index)
                    .addClass('slick-center');
    
            } else {
    
                if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {
    
                    _.$slides
                        .slice(index, index + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');
    
                } else if (allSlides.length <= _.options.slidesToShow) {
    
                    allSlides
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');
    
                } else {
    
                    remainder = _.slideCount % _.options.slidesToShow;
                    indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;
    
                    if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {
    
                        allSlides
                            .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                            .addClass('slick-active')
                            .attr('aria-hidden', 'false');
    
                    } else {
    
                        allSlides
                            .slice(indexOffset, indexOffset + _.options.slidesToShow)
                            .addClass('slick-active')
                            .attr('aria-hidden', 'false');
    
                    }
    
                }
    
            }
    
            if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
                _.lazyLoad();
            }
        };
    
        Slick.prototype.setupInfinite = function() {
    
            var _ = this,
                i, slideIndex, infiniteCount;
    
            if (_.options.fade === true) {
                _.options.centerMode = false;
            }
    
            if (_.options.infinite === true && _.options.fade === false) {
    
                slideIndex = null;
    
                if (_.slideCount > _.options.slidesToShow) {
    
                    if (_.options.centerMode === true) {
                        infiniteCount = _.options.slidesToShow + 1;
                    } else {
                        infiniteCount = _.options.slidesToShow;
                    }
    
                    for (i = _.slideCount; i > (_.slideCount -
                            infiniteCount); i -= 1) {
                        slideIndex = i - 1;
                        $(_.$slides[slideIndex]).clone(true).attr('id', '')
                            .attr('data-slick-index', slideIndex - _.slideCount)
                            .prependTo(_.$slideTrack).addClass('slick-cloned');
                    }
                    for (i = 0; i < infiniteCount  + _.slideCount; i += 1) {
                        slideIndex = i;
                        $(_.$slides[slideIndex]).clone(true).attr('id', '')
                            .attr('data-slick-index', slideIndex + _.slideCount)
                            .appendTo(_.$slideTrack).addClass('slick-cloned');
                    }
                    _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                        $(this).attr('id', '');
                    });
    
                }
    
            }
    
        };
    
        Slick.prototype.interrupt = function( toggle ) {
    
            var _ = this;
    
            if( !toggle ) {
                _.autoPlay();
            }
            _.interrupted = toggle;
    
        };
    
        Slick.prototype.selectHandler = function(event) {
    
            var _ = this;
    
            var targetElement =
                $(event.target).is('.slick-slide') ?
                    $(event.target) :
                    $(event.target).parents('.slick-slide');
    
            var index = parseInt(targetElement.attr('data-slick-index'));
    
            if (!index) index = 0;
    
            if (_.slideCount <= _.options.slidesToShow) {
    
                _.slideHandler(index, false, true);
                return;
    
            }
    
            _.slideHandler(index);
    
        };
    
        Slick.prototype.slideHandler = function(index, sync, dontAnimate) {
    
            var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
                _ = this, navTarget;
    
            sync = sync || false;
    
            if (_.animating === true && _.options.waitForAnimate === true) {
                return;
            }
    
            if (_.options.fade === true && _.currentSlide === index) {
                return;
            }
    
            if (sync === false) {
                _.asNavFor(index);
            }
    
            targetSlide = index;
            targetLeft = _.getLeft(targetSlide);
            slideLeft = _.getLeft(_.currentSlide);
    
            _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;
    
            if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
                if (_.options.fade === false) {
                    targetSlide = _.currentSlide;
                    if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                        _.animateSlide(slideLeft, function() {
                            _.postSlide(targetSlide);
                        });
                    } else {
                        _.postSlide(targetSlide);
                    }
                }
                return;
            } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
                if (_.options.fade === false) {
                    targetSlide = _.currentSlide;
                    if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                        _.animateSlide(slideLeft, function() {
                            _.postSlide(targetSlide);
                        });
                    } else {
                        _.postSlide(targetSlide);
                    }
                }
                return;
            }
    
            if ( _.options.autoplay ) {
                clearInterval(_.autoPlayTimer);
            }
    
            if (targetSlide < 0) {
                if (_.slideCount % _.options.slidesToScroll !== 0) {
                    animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
                } else {
                    animSlide = _.slideCount + targetSlide;
                }
            } else if (targetSlide >= _.slideCount) {
                if (_.slideCount % _.options.slidesToScroll !== 0) {
                    animSlide = 0;
                } else {
                    animSlide = targetSlide - _.slideCount;
                }
            } else {
                animSlide = targetSlide;
            }
    
            _.animating = true;
    
            _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);
    
            oldSlide = _.currentSlide;
            _.currentSlide = animSlide;
    
            _.setSlideClasses(_.currentSlide);
    
            if ( _.options.asNavFor ) {
    
                navTarget = _.getNavTarget();
                navTarget = navTarget.slick('getSlick');
    
                if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
                    navTarget.setSlideClasses(_.currentSlide);
                }
    
            }
    
            _.updateDots();
            _.updateArrows();
    
            if (_.options.fade === true) {
                if (dontAnimate !== true) {
    
                    _.fadeSlideOut(oldSlide);
    
                    _.fadeSlide(animSlide, function() {
                        _.postSlide(animSlide);
                    });
    
                } else {
                    _.postSlide(animSlide);
                }
                _.animateHeight();
                return;
            }
    
            if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                _.animateSlide(targetLeft, function() {
                    _.postSlide(animSlide);
                });
            } else {
                _.postSlide(animSlide);
            }
    
        };
    
        Slick.prototype.startLoad = function() {
    
            var _ = this;
    
            if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
    
                _.$prevArrow.hide();
                _.$nextArrow.hide();
    
            }
    
            if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
    
                _.$dots.hide();
    
            }
    
            _.$slider.addClass('slick-loading');
    
        };
    
        Slick.prototype.swipeDirection = function() {
    
            var xDist, yDist, r, swipeAngle, _ = this;
    
            xDist = _.touchObject.startX - _.touchObject.curX;
            yDist = _.touchObject.startY - _.touchObject.curY;
            r = Math.atan2(yDist, xDist);
    
            swipeAngle = Math.round(r * 180 / Math.PI);
            if (swipeAngle < 0) {
                swipeAngle = 360 - Math.abs(swipeAngle);
            }
    
            if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
                return (_.options.rtl === false ? 'left' : 'right');
            }
            if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
                return (_.options.rtl === false ? 'left' : 'right');
            }
            if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
                return (_.options.rtl === false ? 'right' : 'left');
            }
            if (_.options.verticalSwiping === true) {
                if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                    return 'down';
                } else {
                    return 'up';
                }
            }
    
            return 'vertical';
    
        };
    
        Slick.prototype.swipeEnd = function(event) {
    
            var _ = this,
                slideCount,
                direction;
    
            _.dragging = false;
            _.swiping = false;
    
            if (_.scrolling) {
                _.scrolling = false;
                return false;
            }
    
            _.interrupted = false;
            _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;
    
            if ( _.touchObject.curX === undefined ) {
                return false;
            }
    
            if ( _.touchObject.edgeHit === true ) {
                _.$slider.trigger('edge', [_, _.swipeDirection() ]);
            }
    
            if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {
    
                direction = _.swipeDirection();
    
                switch ( direction ) {
    
                    case 'left':
                    case 'down':
    
                        slideCount =
                            _.options.swipeToSlide ?
                                _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
                                _.currentSlide + _.getSlideCount();
    
                        _.currentDirection = 0;
    
                        break;
    
                    case 'right':
                    case 'up':
    
                        slideCount =
                            _.options.swipeToSlide ?
                                _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
                                _.currentSlide - _.getSlideCount();
    
                        _.currentDirection = 1;
    
                        break;
    
                    default:
    
    
                }
    
                if( direction != 'vertical' ) {
    
                    _.slideHandler( slideCount );
                    _.touchObject = {};
                    _.$slider.trigger('swipe', [_, direction ]);
    
                }
    
            } else {
    
                if ( _.touchObject.startX !== _.touchObject.curX ) {
    
                    _.slideHandler( _.currentSlide );
                    _.touchObject = {};
    
                }
    
            }
    
        };
    
        Slick.prototype.swipeHandler = function(event) {
    
            var _ = this;
    
            if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
                return;
            } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
                return;
            }
    
            _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
                event.originalEvent.touches.length : 1;
    
            _.touchObject.minSwipe = _.listWidth / _.options
                .touchThreshold;
    
            if (_.options.verticalSwiping === true) {
                _.touchObject.minSwipe = _.listHeight / _.options
                    .touchThreshold;
            }
    
            switch (event.data.action) {
    
                case 'start':
                    _.swipeStart(event);
                    break;
    
                case 'move':
                    _.swipeMove(event);
                    break;
    
                case 'end':
                    _.swipeEnd(event);
                    break;
    
            }
    
        };
    
        Slick.prototype.swipeMove = function(event) {
    
            var _ = this,
                edgeWasHit = false,
                curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;
    
            touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;
    
            if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
                return false;
            }
    
            curLeft = _.getLeft(_.currentSlide);
    
            _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
            _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;
    
            _.touchObject.swipeLength = Math.round(Math.sqrt(
                Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));
    
            verticalSwipeLength = Math.round(Math.sqrt(
                Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
    
            if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
                _.scrolling = true;
                return false;
            }
    
            if (_.options.verticalSwiping === true) {
                _.touchObject.swipeLength = verticalSwipeLength;
            }
    
            swipeDirection = _.swipeDirection();
    
            if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
                _.swiping = true;
                event.preventDefault();
            }
    
            positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
            if (_.options.verticalSwiping === true) {
                positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
            }
    
    
            swipeLength = _.touchObject.swipeLength;
    
            _.touchObject.edgeHit = false;
    
            if (_.options.infinite === false) {
                if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                    swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                    _.touchObject.edgeHit = true;
                }
            }
    
            if (_.options.vertical === false) {
                _.swipeLeft = curLeft + swipeLength * positionOffset;
            } else {
                _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
            }
            if (_.options.verticalSwiping === true) {
                _.swipeLeft = curLeft + swipeLength * positionOffset;
            }
    
            if (_.options.fade === true || _.options.touchMove === false) {
                return false;
            }
    
            if (_.animating === true) {
                _.swipeLeft = null;
                return false;
            }
    
            _.setCSS(_.swipeLeft);
    
        };
    
        Slick.prototype.swipeStart = function(event) {
    
            var _ = this,
                touches;
    
            _.interrupted = true;
    
            if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
                _.touchObject = {};
                return false;
            }
    
            if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
                touches = event.originalEvent.touches[0];
            }
    
            _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
            _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;
    
            _.dragging = true;
    
        };
    
        Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {
    
            var _ = this;
    
            if (_.$slidesCache !== null) {
    
                _.unload();
    
                _.$slideTrack.children(this.options.slide).detach();
    
                _.$slidesCache.appendTo(_.$slideTrack);
    
                _.reinit();
    
            }
    
        };
    
        Slick.prototype.unload = function() {
    
            var _ = this;
    
            $('.slick-cloned', _.$slider).remove();
    
            if (_.$dots) {
                _.$dots.remove();
            }
    
            if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
                _.$prevArrow.remove();
            }
    
            if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
                _.$nextArrow.remove();
            }
    
            _.$slides
                .removeClass('slick-slide slick-active slick-visible slick-current')
                .attr('aria-hidden', 'true')
                .css('width', '');
    
        };
    
        Slick.prototype.unslick = function(fromBreakpoint) {
    
            var _ = this;
            _.$slider.trigger('unslick', [_, fromBreakpoint]);
            _.destroy();
    
        };
    
        Slick.prototype.updateArrows = function() {
    
            var _ = this,
                centerOffset;
    
            centerOffset = Math.floor(_.options.slidesToShow / 2);
    
            if ( _.options.arrows === true &&
                _.slideCount > _.options.slidesToShow &&
                !_.options.infinite ) {
    
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
    
                if (_.currentSlide === 0) {
    
                    _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                    _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
    
                } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {
    
                    _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                    _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
    
                } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {
    
                    _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                    _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
    
                }
    
            }
    
        };
    
        Slick.prototype.updateDots = function() {
    
            var _ = this;
    
            if (_.$dots !== null) {
    
                _.$dots
                    .find('li')
                        .removeClass('slick-active')
                        .end();
    
                _.$dots
                    .find('li')
                    .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                    .addClass('slick-active');
    
            }
    
        };
    
        Slick.prototype.visibility = function() {
    
            var _ = this;
    
            if ( _.options.autoplay ) {
    
                if ( document[_.hidden] ) {
    
                    _.interrupted = true;
    
                } else {
    
                    _.interrupted = false;
    
                }
    
            }
    
        };
    
        $.fn.slick = function() {
            var _ = this,
                opt = arguments[0],
                args = Array.prototype.slice.call(arguments, 1),
                l = _.length,
                i,
                ret;
            for (i = 0; i < l; i++) {
                if (typeof opt == 'object' || typeof opt == 'undefined')
                    _[i].slick = new Slick(_[i], opt);
                else
                    ret = _[i].slick[opt].apply(_[i].slick, args);
                if (typeof ret != 'undefined') return ret;
            }
            return _;
        };
    
    }));
    
    
    /***/ })
    
    /******/ 	});
    /************************************************************************/
    /******/ 	// The module cache
    /******/ 	var __webpack_module_cache__ = {};
    /******/ 	
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
    /******/ 		// Check if module is in cache
    /******/ 		var cachedModule = __webpack_module_cache__[moduleId];
    /******/ 		if (cachedModule !== undefined) {
    /******/ 			return cachedModule.exports;
    /******/ 		}
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = __webpack_module_cache__[moduleId] = {
    /******/ 			// no module.id needed
    /******/ 			// no module.loaded needed
    /******/ 			exports: {}
    /******/ 		};
    /******/ 	
    /******/ 		// Execute the module function
    /******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/ 	
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports;
    /******/ 	}
    /******/ 	
    /************************************************************************/
    /******/ 	/* webpack/runtime/compat get default export */
    /******/ 	!function() {
    /******/ 		// getDefaultExport function for compatibility with non-harmony modules
    /******/ 		__webpack_require__.n = function(module) {
    /******/ 			var getter = module && module.__esModule ?
    /******/ 				function() { return module['default']; } :
    /******/ 				function() { return module; };
    /******/ 			__webpack_require__.d(getter, { a: getter });
    /******/ 			return getter;
    /******/ 		};
    /******/ 	}();
    /******/ 	
    /******/ 	/* webpack/runtime/define property getters */
    /******/ 	!function() {
    /******/ 		// define getter functions for harmony exports
    /******/ 		__webpack_require__.d = function(exports, definition) {
    /******/ 			for(var key in definition) {
    /******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
    /******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
    /******/ 				}
    /******/ 			}
    /******/ 		};
    /******/ 	}();
    /******/ 	
    /******/ 	/* webpack/runtime/global */
    /******/ 	!function() {
    /******/ 		__webpack_require__.g = (function() {
    /******/ 			if (typeof globalThis === 'object') return globalThis;
    /******/ 			try {
    /******/ 				return this || new Function('return this')();
    /******/ 			} catch (e) {
    /******/ 				if (typeof window === 'object') return window;
    /******/ 			}
    /******/ 		})();
    /******/ 	}();
    /******/ 	
    /******/ 	/* webpack/runtime/hasOwnProperty shorthand */
    /******/ 	!function() {
    /******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
    /******/ 	}();
    /******/ 	
    /************************************************************************/
    var __webpack_exports__ = {};
    // This entry need to be wrapped in an IIFE because it need to be in strict mode.
    !function() {
    "use strict";
    
    // EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js
    var jquery = __webpack_require__(9755);
    var jquery_default = /*#__PURE__*/__webpack_require__.n(jquery);
    ;// CONCATENATED MODULE: ./assets/website/js/components/animations.js
    
    var Microlife = window.Microlife || {};
    Microlife.Animations = function ($) {
      "use strict";
    
      var iphone = 700,
        ipadp = 800;
      return {
        init: function () {
          this.initHeaderInfo();
          this.initImageHeadline();
          this.initHeaderimageScroll();
          // called in master -> $(document).ready();
          // list here all functions, that need to be called at that time
        },
    
        load: function () {
          // called in master -> $(window).load();
          // list here all functions, that need to be called at that time
        },
        resize: function () {
          // called in master -> $(window).resize();
          // list here all functions, that need to be called at that time
        },
        productDetailFeature: function () {
          var $window = $(window);
          var $productFeatures = $('.js-animate-product-features');
          var $productFeatureItems = $('.js-animate-product-features .textblock-icon');
          var productFeaturesBottom = 0;
          var windowBottom = $window.scrollTop() + $window.height();
          var animations = [];
          var timings = [0, 1000, 1800, 2600];
          if ($productFeatures.length > 0 && $productFeatureItems.length > 0) {
            $window.on('load scroll', function () {
              productFeaturesBottom = $productFeatures.offset().top + $productFeatures.height();
              windowBottom = $window.scrollTop() + $window.height();
              if (windowBottom > productFeaturesBottom && $window.width() > iphone) {
                if (!$productFeatures.hasClass('feature-animating')) {
                  $productFeatures.addClass('feature-animating');
                  $productFeatureItems.each(function (index) {
                    var $item = $(this);
                    animations[index] = setTimeout(function () {
                      $item.addClass('active');
                      setTimeout(function () {
                        $item.removeClass('active');
                      }, 600);
                    }, timings[index]);
                  });
                }
              } else {
                $productFeatures.removeClass('feature-animating');
                $productFeatureItems.each(function (index) {
                  clearTimeout(animations[index]);
                });
              }
            });
          }
        },
        initHeaderInfo: function () {
          var $window = $(window);
          var $headerinfo = $('.js-header-image-info');
          if ($headerinfo.length > 0) {
            $window.on('load', function () {
              $headerinfo.removeClass('hidden-info');
            });
          }
          var width = $headerinfo.outerWidth();
          $headerinfo.height(width / 2);
    
          // Get the correct offset at which the header info should be hidden.
          var $headerHider = $('.js-header-hider');
          var offset = 70;
          if (0 < $headerHider.length) {
            offset = 270;
          }
    
          // Hide element on scroll down and show on scroll up.
          var lastScrollTop = 0;
          $window.on('load scroll', function () {
            var scrollTop = $window.scrollTop();
            if (scrollTop > lastScrollTop && offset < scrollTop) {
              $headerinfo.addClass('is-hidden');
            } else {
              $headerinfo.removeClass('is-hidden');
            }
            lastScrollTop = scrollTop;
          }.bind(this));
        },
        initImageHeadline: function () {
          var $window = $(window);
          var $headline = $('.js-headline');
          if ($headline.length > 0) {
            $window.on('load', function () {
              $headline.removeClass('hidden-headline');
            });
          }
        },
        initHeaderimageScroll: function () {
          var $window = $(window);
          var $headerImage = $('.js-header-image img');
          var $headerHider = $('.js-header-hider');
          if ($headerImage.length > 0 && $headerHider.length > 0 && $window.width() > iphone) {
            var effectHeight = $headerImage.outerHeight() / 3;
            var newScrollTop = effectHeight / 3;
            $window.on('load scroll', function () {
              effectHeight = $headerImage.outerHeight() / 3;
              newScrollTop = effectHeight / 3;
              if ($window.scrollTop() < effectHeight) {
                newScrollTop = $window.scrollTop() / 3;
              }
              $headerImage.css({
                'top': newScrollTop
              });
            });
          }
        },
        initConsumerProducts: function () {
          var $window = $(window);
          var $consumerBlocks = $('.js-consumer-block');
          if ($consumerBlocks.length > 0) {
            $window.on('load resize scroll', function () {
              $consumerBlocks.each(function () {
                Microlife.Animations.consumerProductScollEffect($(this));
              });
            });
          }
        },
        consumerProductScollEffect: function ($blockObj) {
          var $window = $(window);
          var $block = $blockObj;
          var $blockHeight = $block.height();
          var firstBlock = $block.find('.js-first-block');
          var lastBlock = $block.find('.js-last-block');
          var diff = $blockHeight - ($window.scrollTop() + $window.height() - $block.offset().top);
          var factor = 12;
          if (diff < -$blockHeight) {
            diff = -$blockHeight;
          } else if (diff > $blockHeight) {
            diff = $blockHeight;
          }
          if ($window.width() <= iphone) {
            diff = 0;
          }
          firstBlock.css('top', -diff / factor);
          lastBlock.css('top', diff / factor);
          $block.removeClass('consumer-hidden');
        },
        initProductDetailPage: function () {
          var $window = $(window);
          var $productImage = $('.js-product-image');
          var $productInfo = $('.js-product-info');
          var effectimit = 200;
          if ($productImage.length > 0) {
            $window.on('load', function () {
              $productImage.removeClass('product-hidden');
            });
          }
          if ($productInfo.length > 0) {
            $window.on('load scroll', function () {
              if ($window.width() > ipadp) {
                if ($window.scrollTop() < effectimit) {
                  $productInfo.css({
                    'top': $window.scrollTop() / 2
                  }).removeClass('hidden-product-info');
                } else {
                  $productInfo.css({
                    'top': effectimit / 2
                  }).addClass('hidden-product-info');
                }
              } else {
                $productInfo.css({
                  'top': 0
                }).removeClass('hidden-product-info');
              }
            });
          }
        },
        initToggleShares: function () {
          var $shareToggle = $('.js-toggle-shares');
          var $shares = $('.js-social-shares');
          if ($shares.length > 0 && $shareToggle.length > 0) {
            $shareToggle.on('click', function (e) {
              e.preventDefault();
              $shares.toggleClass('active');
            });
          }
        },
        initFixedShare: function () {
          var $window = $(window);
          var $header = $('.js-header');
          var $shares = $('.js-social-shares');
          var $shareContainer = $('.js-share-container');
          if ($shares.length > 0 && $shareContainer.length > 0) {
            var absoluteTop = parseInt($shares.css('top'));
            var headerHeight = parseInt($header.outerHeight());
            $window.on('load resize scroll', function () {
              if ($window.scrollTop() + headerHeight >= $shareContainer.offset().top) {
                $shares.css({
                  'position': 'fixed',
                  'top': headerHeight + absoluteTop
                });
              } else {
                $shares.css({
                  'position': 'absolute',
                  'top': absoluteTop
                });
              }
            });
          }
        }
      };
    }((jquery_default()));
    window.Microlife = Microlife;
    ;// CONCATENATED MODULE: ./assets/website/js/components/faq.js
    
    var faq_Microlife = window.Microlife || {};
    faq_Microlife.Faq = function ($) {
      "use strict";
    
      return {
        init: function () {
          // called in master -> $(document).ready();
          // list here all functions, that need to be called at that time
          this.showClass = 'show';
          var faqs = $('.js-faq-accordion');
          if (faqs.length > 0) {
            faqs.each(function (index, element) {
              this.initAccordion(element);
            }.bind(this));
          }
        },
        load: function () {
          // called in master -> $(window).load();
          // list here all functions, that need to be called at that time
        },
        resize: function () {
          // called in master -> $(window).resize();
          // list here all functions, that need to be called at that time
        },
        initAccordion: function (element) {
          var $accordion = $(element);
          $accordion.find('.js-faq-accordion-toggle').on('click', this.toggleAccordion.bind(this));
        },
        /**
         * Toggle accordion section.
         *
         * @param {event} e
         */
        toggleAccordion: function (e) {
          var $toggler = $(e.currentTarget);
          var $accordion = $toggler.closest('.js-faq-accordion');
          if ($toggler.next().hasClass(this.showClass)) {
            $toggler.removeClass(this.showClass);
            $toggler.next().removeClass(this.showClass).slideUp(350);
          } else {
            $accordion.find('.js-faq-accordion-toggle').removeClass(this.showClass);
            $toggler.parent().parent().find('div .js-faq-accordion-content').removeClass(this.showClass).slideUp(350);
            $toggler.next().toggleClass(this.showClass);
            $toggler.toggleClass(this.showClass);
            $toggler.next().slideToggle(350);
          }
        }
      };
    }((jquery_default()));
    window.Microlife = faq_Microlife;
    ;// CONCATENATED MODULE: ./node_modules/js-cookie/dist/js.cookie.mjs
    /*! js-cookie v3.0.1 | MIT */
    /* eslint-disable no-var */
    function js_cookie_assign (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          target[key] = source[key];
        }
      }
      return target
    }
    /* eslint-enable no-var */
    
    /* eslint-disable no-var */
    var defaultConverter = {
      read: function (value) {
        if (value[0] === '"') {
          value = value.slice(1, -1);
        }
        return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
      },
      write: function (value) {
        return encodeURIComponent(value).replace(
          /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
          decodeURIComponent
        )
      }
    };
    /* eslint-enable no-var */
    
    /* eslint-disable no-var */
    
    function init (converter, defaultAttributes) {
      function set (key, value, attributes) {
        if (typeof document === 'undefined') {
          return
        }
    
        attributes = js_cookie_assign({}, defaultAttributes, attributes);
    
        if (typeof attributes.expires === 'number') {
          attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
        }
        if (attributes.expires) {
          attributes.expires = attributes.expires.toUTCString();
        }
    
        key = encodeURIComponent(key)
          .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
          .replace(/[()]/g, escape);
    
        var stringifiedAttributes = '';
        for (var attributeName in attributes) {
          if (!attributes[attributeName]) {
            continue
          }
    
          stringifiedAttributes += '; ' + attributeName;
    
          if (attributes[attributeName] === true) {
            continue
          }
    
          // Considers RFC 6265 section 5.2:
          // ...
          // 3.  If the remaining unparsed-attributes contains a %x3B (";")
          //     character:
          // Consume the characters of the unparsed-attributes up to,
          // not including, the first %x3B (";") character.
          // ...
          stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
        }
    
        return (document.cookie =
          key + '=' + converter.write(value, key) + stringifiedAttributes)
      }
    
      function get (key) {
        if (typeof document === 'undefined' || (arguments.length && !key)) {
          return
        }
    
        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all.
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        var jar = {};
        for (var i = 0; i < cookies.length; i++) {
          var parts = cookies[i].split('=');
          var value = parts.slice(1).join('=');
    
          try {
            var foundKey = decodeURIComponent(parts[0]);
            jar[foundKey] = converter.read(value, foundKey);
    
            if (key === foundKey) {
              break
            }
          } catch (e) {}
        }
    
        return key ? jar[key] : jar
      }
    
      return Object.create(
        {
          set: set,
          get: get,
          remove: function (key, attributes) {
            set(
              key,
              '',
              js_cookie_assign({}, attributes, {
                expires: -1
              })
            );
          },
          withAttributes: function (attributes) {
            return init(this.converter, js_cookie_assign({}, this.attributes, attributes))
          },
          withConverter: function (converter) {
            return init(js_cookie_assign({}, this.converter, converter), this.attributes)
          }
        },
        {
          attributes: { value: Object.freeze(defaultAttributes) },
          converter: { value: Object.freeze(converter) }
        }
      )
    }
    
    var api = init(defaultConverter, { path: '/' });
    /* eslint-enable no-var */
    
    /* harmony default export */ var js_cookie = (api);
    
    ;// CONCATENATED MODULE: ./assets/website/js/components/info-overlay.js
    
    
    var info_overlay_Microlife = window.Microlife || {};
    info_overlay_Microlife.InfoOverlay = function ($) {
      "use strict";
    
      return {
        init: function () {
          this.initOverlay();
        },
        /**
         * Initialize info overlay and set cookie if clicked away.
         */
        initOverlay: function () {
          if ('true' === js_cookie.get('infoOverlay')) {
            return;
          }
          this.$infoOverlay = $('.js-info-overlay');
          this.$closebutton = $('.js-close');
          this.$infoOverlay.show();
          this.$closebutton.on('click', function () {
            this.setCookieValue();
            this.hideOverlay();
          }.bind(this));
        },
        /**
         * Set cookie for info overlay.
         */
        setCookieValue: function () {
          js_cookie.set('infoOverlay', true);
        },
        /**
         * Hides info overlay.
         */
        hideOverlay: function () {
          this.$infoOverlay.animate({
            'opacity': 0
          }, 200);
          setTimeout(function () {
            this.$infoOverlay.hide();
          }.bind(this), 200);
        }
      };
    }((jquery_default()));
    window.Microlife = info_overlay_Microlife;
    // EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
    var es_array_push = __webpack_require__(7658);
    // EXTERNAL MODULE: ./node_modules/headroom.js/dist/headroom.js
    var dist_headroom = __webpack_require__(7631);
    var headroom_default = /*#__PURE__*/__webpack_require__.n(dist_headroom);
    ;// CONCATENATED MODULE: ./node_modules/just-extend/index.esm.js
    var objectExtend = extend;
    
    /*
      var obj = {a: 3, b: 5};
      extend(obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
      obj; // {a: 4, b: 5, c: 8}
    
      var obj = {a: 3, b: 5};
      extend({}, obj, {a: 4, c: 8}); // {a: 4, b: 5, c: 8}
      obj; // {a: 3, b: 5}
    
      var arr = [1, 2, 3];
      var obj = {a: 3, b: 5};
      extend(obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
      arr.push(4);
      obj; // {a: 3, b: 5, c: [1, 2, 3, 4]}
    
      var arr = [1, 2, 3];
      var obj = {a: 3, b: 5};
      extend(true, obj, {c: arr}); // {a: 3, b: 5, c: [1, 2, 3]}
      arr.push(4);
      obj; // {a: 3, b: 5, c: [1, 2, 3]}
    
      extend({a: 4, b: 5}); // {a: 4, b: 5}
      extend({a: 4, b: 5}, 3); {a: 4, b: 5}
      extend({a: 4, b: 5}, true); {a: 4, b: 5}
      extend('hello', {a: 4, b: 5}); // throws
      extend(3, {a: 4, b: 5}); // throws
    */
    
    function extend(/* [deep], obj1, obj2, [objn] */) {
      var args = [].slice.call(arguments);
      var deep = false;
      if (typeof args[0] == 'boolean') {
        deep = args.shift();
      }
      var result = args[0];
      if (isUnextendable(result)) {
        throw new Error('extendee must be an object');
      }
      var extenders = args.slice(1);
      var len = extenders.length;
      for (var i = 0; i < len; i++) {
        var extender = extenders[i];
        for (var key in extender) {
          if (Object.prototype.hasOwnProperty.call(extender, key)) {
            var value = extender[key];
            if (deep && isCloneable(value)) {
              var base = Array.isArray(value) ? [] : {};
              result[key] = extend(
                true,
                Object.prototype.hasOwnProperty.call(result, key) && !isUnextendable(result[key])
                  ? result[key]
                  : base,
                value
              );
            } else {
              result[key] = value;
            }
          }
        }
      }
      return result;
    }
    
    function isCloneable(obj) {
      return Array.isArray(obj) || {}.toString.call(obj) == '[object Object]';
    }
    
    function isUnextendable(val) {
      return !val || (typeof val != 'object' && typeof val != 'function');
    }
    
    
    
    ;// CONCATENATED MODULE: ./node_modules/dropzone/dist/dropzone.mjs
    /* provided dependency */ var jQuery = __webpack_require__(9755);
    
    
    function $parcel$interopDefault(a) {
      return a && a.__esModule ? a.default : a;
    }
    
    class $4040acfd8584338d$export$2e2bcd8739ae039 {
        // Add an event listener for given event
        on(event, fn) {
            this._callbacks = this._callbacks || {
            };
            // Create namespace for this event
            if (!this._callbacks[event]) this._callbacks[event] = [];
            this._callbacks[event].push(fn);
            return this;
        }
        emit(event, ...args) {
            this._callbacks = this._callbacks || {
            };
            let callbacks = this._callbacks[event];
            if (callbacks) for (let callback of callbacks)callback.apply(this, args);
            // trigger a corresponding DOM event
            if (this.element) this.element.dispatchEvent(this.makeEvent("dropzone:" + event, {
                args: args
            }));
            return this;
        }
        makeEvent(eventName, detail) {
            let params = {
                bubbles: true,
                cancelable: true,
                detail: detail
            };
            if (typeof window.CustomEvent === "function") return new CustomEvent(eventName, params);
            else {
                // IE 11 support
                // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
                var evt = document.createEvent("CustomEvent");
                evt.initCustomEvent(eventName, params.bubbles, params.cancelable, params.detail);
                return evt;
            }
        }
        // Remove event listener for given event. If fn is not provided, all event
        // listeners for that event will be removed. If neither is provided, all
        // event listeners will be removed.
        off(event, fn) {
            if (!this._callbacks || arguments.length === 0) {
                this._callbacks = {
                };
                return this;
            }
            // specific event
            let callbacks = this._callbacks[event];
            if (!callbacks) return this;
            // remove all handlers
            if (arguments.length === 1) {
                delete this._callbacks[event];
                return this;
            }
            // remove specific handler
            for(let i = 0; i < callbacks.length; i++){
                let callback = callbacks[i];
                if (callback === fn) {
                    callbacks.splice(i, 1);
                    break;
                }
            }
            return this;
        }
    }
    
    
    
    var $fd6031f88dce2e32$exports = {};
    $fd6031f88dce2e32$exports = "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img data-dz-thumbnail=\"\"></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size=\"\"></span></div>\n    <div class=\"dz-filename\"><span data-dz-name=\"\"></span></div>\n  </div>\n  <div class=\"dz-progress\">\n    <span class=\"dz-upload\" data-dz-uploadprogress=\"\"></span>\n  </div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage=\"\"></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54\" height=\"54\" viewBox=\"0 0 54 54\" fill=\"white\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M10.2071 29.7929L14.2929 25.7071C14.6834 25.3166 15.3166 25.3166 15.7071 25.7071L21.2929 31.2929C21.6834 31.6834 22.3166 31.6834 22.7071 31.2929L38.2929 15.7071C38.6834 15.3166 39.3166 15.3166 39.7071 15.7071L43.7929 19.7929C44.1834 20.1834 44.1834 20.8166 43.7929 21.2071L22.7071 42.2929C22.3166 42.6834 21.6834 42.6834 21.2929 42.2929L10.2071 31.2071C9.81658 30.8166 9.81658 30.1834 10.2071 29.7929Z\"></path>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54\" height=\"54\" viewBox=\"0 0 54 54\" fill=\"white\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M26.2929 20.2929L19.2071 13.2071C18.8166 12.8166 18.1834 12.8166 17.7929 13.2071L13.2071 17.7929C12.8166 18.1834 12.8166 18.8166 13.2071 19.2071L20.2929 26.2929C20.6834 26.6834 20.6834 27.3166 20.2929 27.7071L13.2071 34.7929C12.8166 35.1834 12.8166 35.8166 13.2071 36.2071L17.7929 40.7929C18.1834 41.1834 18.8166 41.1834 19.2071 40.7929L26.2929 33.7071C26.6834 33.3166 27.3166 33.3166 27.7071 33.7071L34.7929 40.7929C35.1834 41.1834 35.8166 41.1834 36.2071 40.7929L40.7929 36.2071C41.1834 35.8166 41.1834 35.1834 40.7929 34.7929L33.7071 27.7071C33.3166 27.3166 33.3166 26.6834 33.7071 26.2929L40.7929 19.2071C41.1834 18.8166 41.1834 18.1834 40.7929 17.7929L36.2071 13.2071C35.8166 12.8166 35.1834 12.8166 34.7929 13.2071L27.7071 20.2929C27.3166 20.6834 26.6834 20.6834 26.2929 20.2929Z\"></path>\n    </svg>\n  </div>\n</div>\n";
    
    
    let $4ca367182776f80b$var$defaultOptions = {
        /**
       * Has to be specified on elements other than form (or when the form doesn't
       * have an `action` attribute).
       *
       * You can also provide a function that will be called with `files` and
       * `dataBlocks`  and must return the url as string.
       */ url: null,
        /**
       * Can be changed to `"put"` if necessary. You can also provide a function
       * that will be called with `files` and must return the method (since `v3.12.0`).
       */ method: "post",
        /**
       * Will be set on the XHRequest.
       */ withCredentials: false,
        /**
       * The timeout for the XHR requests in milliseconds (since `v4.4.0`).
       * If set to null or 0, no timeout is going to be set.
       */ timeout: null,
        /**
       * How many file uploads to process in parallel (See the
       * Enqueuing file uploads documentation section for more info)
       */ parallelUploads: 2,
        /**
       * Whether to send multiple files in one request. If
       * this it set to true, then the fallback file input element will
       * have the `multiple` attribute as well. This option will
       * also trigger additional events (like `processingmultiple`). See the events
       * documentation section for more information.
       */ uploadMultiple: false,
        /**
       * Whether you want files to be uploaded in chunks to your server. This can't be
       * used in combination with `uploadMultiple`.
       *
       * See [chunksUploaded](#config-chunksUploaded) for the callback to finalise an upload.
       */ chunking: false,
        /**
       * If `chunking` is enabled, this defines whether **every** file should be chunked,
       * even if the file size is below chunkSize. This means, that the additional chunk
       * form data will be submitted and the `chunksUploaded` callback will be invoked.
       */ forceChunking: false,
        /**
       * If `chunking` is `true`, then this defines the chunk size in bytes.
       */ chunkSize: 2097152,
        /**
       * If `true`, the individual chunks of a file are being uploaded simultaneously.
       */ parallelChunkUploads: false,
        /**
       * Whether a chunk should be retried if it fails.
       */ retryChunks: false,
        /**
       * If `retryChunks` is true, how many times should it be retried.
       */ retryChunksLimit: 3,
        /**
       * The maximum filesize (in MiB) that is allowed to be uploaded.
       */ maxFilesize: 256,
        /**
       * The name of the file param that gets transferred.
       * **NOTE**: If you have the option  `uploadMultiple` set to `true`, then
       * Dropzone will append `[]` to the name.
       */ paramName: "file",
        /**
       * Whether thumbnails for images should be generated
       */ createImageThumbnails: true,
        /**
       * In MB. When the filename exceeds this limit, the thumbnail will not be generated.
       */ maxThumbnailFilesize: 10,
        /**
       * If `null`, the ratio of the image will be used to calculate it.
       */ thumbnailWidth: 120,
        /**
       * The same as `thumbnailWidth`. If both are null, images will not be resized.
       */ thumbnailHeight: 120,
        /**
       * How the images should be scaled down in case both, `thumbnailWidth` and `thumbnailHeight` are provided.
       * Can be either `contain` or `crop`.
       */ thumbnailMethod: "crop",
        /**
       * If set, images will be resized to these dimensions before being **uploaded**.
       * If only one, `resizeWidth` **or** `resizeHeight` is provided, the original aspect
       * ratio of the file will be preserved.
       *
       * The `options.transformFile` function uses these options, so if the `transformFile` function
       * is overridden, these options don't do anything.
       */ resizeWidth: null,
        /**
       * See `resizeWidth`.
       */ resizeHeight: null,
        /**
       * The mime type of the resized image (before it gets uploaded to the server).
       * If `null` the original mime type will be used. To force jpeg, for example, use `image/jpeg`.
       * See `resizeWidth` for more information.
       */ resizeMimeType: null,
        /**
       * The quality of the resized images. See `resizeWidth`.
       */ resizeQuality: 0.8,
        /**
       * How the images should be scaled down in case both, `resizeWidth` and `resizeHeight` are provided.
       * Can be either `contain` or `crop`.
       */ resizeMethod: "contain",
        /**
       * The base that is used to calculate the **displayed** filesize. You can
       * change this to 1024 if you would rather display kibibytes, mebibytes,
       * etc... 1024 is technically incorrect, because `1024 bytes` are `1 kibibyte`
       * not `1 kilobyte`. You can change this to `1024` if you don't care about
       * validity.
       */ filesizeBase: 1000,
        /**
       * If not `null` defines how many files this Dropzone handles. If it exceeds,
       * the event `maxfilesexceeded` will be called. The dropzone element gets the
       * class `dz-max-files-reached` accordingly so you can provide visual
       * feedback.
       */ maxFiles: null,
        /**
       * An optional object to send additional headers to the server. Eg:
       * `{ "My-Awesome-Header": "header value" }`
       */ headers: null,
        /**
       * Should the default headers be set or not?
       * Accept: application/json <- for requesting json response
       * Cache-Control: no-cache <- Request shouldnt be cached
       * X-Requested-With: XMLHttpRequest <- We sent the request via XMLHttpRequest
       */ defaultHeaders: true,
        /**
       * If `true`, the dropzone element itself will be clickable, if `false`
       * nothing will be clickable.
       *
       * You can also pass an HTML element, a CSS selector (for multiple elements)
       * or an array of those. In that case, all of those elements will trigger an
       * upload when clicked.
       */ clickable: true,
        /**
       * Whether hidden files in directories should be ignored.
       */ ignoreHiddenFiles: true,
        /**
       * The default implementation of `accept` checks the file's mime type or
       * extension against this list. This is a comma separated list of mime
       * types or file extensions.
       *
       * Eg.: `image/*,application/pdf,.psd`
       *
       * If the Dropzone is `clickable` this option will also be used as
       * [`accept`](https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept)
       * parameter on the hidden file input as well.
       */ acceptedFiles: null,
        /**
       * **Deprecated!**
       * Use acceptedFiles instead.
       */ acceptedMimeTypes: null,
        /**
       * If false, files will be added to the queue but the queue will not be
       * processed automatically.
       * This can be useful if you need some additional user input before sending
       * files (or if you want want all files sent at once).
       * If you're ready to send the file simply call `myDropzone.processQueue()`.
       *
       * See the [enqueuing file uploads](#enqueuing-file-uploads) documentation
       * section for more information.
       */ autoProcessQueue: true,
        /**
       * If false, files added to the dropzone will not be queued by default.
       * You'll have to call `enqueueFile(file)` manually.
       */ autoQueue: true,
        /**
       * If `true`, this will add a link to every file preview to remove or cancel (if
       * already uploading) the file. The `dictCancelUpload`, `dictCancelUploadConfirmation`
       * and `dictRemoveFile` options are used for the wording.
       */ addRemoveLinks: false,
        /**
       * Defines where to display the file previews – if `null` the
       * Dropzone element itself is used. Can be a plain `HTMLElement` or a CSS
       * selector. The element should have the `dropzone-previews` class so
       * the previews are displayed properly.
       */ previewsContainer: null,
        /**
       * Set this to `true` if you don't want previews to be shown.
       */ disablePreviews: false,
        /**
       * This is the element the hidden input field (which is used when clicking on the
       * dropzone to trigger file selection) will be appended to. This might
       * be important in case you use frameworks to switch the content of your page.
       *
       * Can be a selector string, or an element directly.
       */ hiddenInputContainer: "body",
        /**
       * If null, no capture type will be specified
       * If camera, mobile devices will skip the file selection and choose camera
       * If microphone, mobile devices will skip the file selection and choose the microphone
       * If camcorder, mobile devices will skip the file selection and choose the camera in video mode
       * On apple devices multiple must be set to false.  AcceptedFiles may need to
       * be set to an appropriate mime type (e.g. "image/*", "audio/*", or "video/*").
       */ capture: null,
        /**
       * **Deprecated**. Use `renameFile` instead.
       */ renameFilename: null,
        /**
       * A function that is invoked before the file is uploaded to the server and renames the file.
       * This function gets the `File` as argument and can use the `file.name`. The actual name of the
       * file that gets used during the upload can be accessed through `file.upload.filename`.
       */ renameFile: null,
        /**
       * If `true` the fallback will be forced. This is very useful to test your server
       * implementations first and make sure that everything works as
       * expected without dropzone if you experience problems, and to test
       * how your fallbacks will look.
       */ forceFallback: false,
        /**
       * The text used before any files are dropped.
       */ dictDefaultMessage: "Drop files here to upload",
        /**
       * The text that replaces the default message text it the browser is not supported.
       */ dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
        /**
       * The text that will be added before the fallback form.
       * If you provide a  fallback element yourself, or if this option is `null` this will
       * be ignored.
       */ dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
        /**
       * If the filesize is too big.
       * `{{filesize}}` and `{{maxFilesize}}` will be replaced with the respective configuration values.
       */ dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
        /**
       * If the file doesn't match the file type.
       */ dictInvalidFileType: "You can't upload files of this type.",
        /**
       * If the server response was invalid.
       * `{{statusCode}}` will be replaced with the servers status code.
       */ dictResponseError: "Server responded with {{statusCode}} code.",
        /**
       * If `addRemoveLinks` is true, the text to be used for the cancel upload link.
       */ dictCancelUpload: "Cancel upload",
        /**
       * The text that is displayed if an upload was manually canceled
       */ dictUploadCanceled: "Upload canceled.",
        /**
       * If `addRemoveLinks` is true, the text to be used for confirmation when cancelling upload.
       */ dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
        /**
       * If `addRemoveLinks` is true, the text to be used to remove a file.
       */ dictRemoveFile: "Remove file",
        /**
       * If this is not null, then the user will be prompted before removing a file.
       */ dictRemoveFileConfirmation: null,
        /**
       * Displayed if `maxFiles` is st and exceeded.
       * The string `{{maxFiles}}` will be replaced by the configuration value.
       */ dictMaxFilesExceeded: "You can not upload any more files.",
        /**
       * Allows you to translate the different units. Starting with `tb` for terabytes and going down to
       * `b` for bytes.
       */ dictFileSizeUnits: {
            tb: "TB",
            gb: "GB",
            mb: "MB",
            kb: "KB",
            b: "b"
        },
        /**
       * Called when dropzone initialized
       * You can add event listeners here
       */ init () {
        },
        /**
       * Can be an **object** of additional parameters to transfer to the server, **or** a `Function`
       * that gets invoked with the `files`, `xhr` and, if it's a chunked upload, `chunk` arguments. In case
       * of a function, this needs to return a map.
       *
       * The default implementation does nothing for normal uploads, but adds relevant information for
       * chunked uploads.
       *
       * This is the same as adding hidden input fields in the form element.
       */ params (files, xhr, chunk) {
            if (chunk) return {
                dzuuid: chunk.file.upload.uuid,
                dzchunkindex: chunk.index,
                dztotalfilesize: chunk.file.size,
                dzchunksize: this.options.chunkSize,
                dztotalchunkcount: chunk.file.upload.totalChunkCount,
                dzchunkbyteoffset: chunk.index * this.options.chunkSize
            };
        },
        /**
       * A function that gets a [file](https://developer.mozilla.org/en-US/docs/DOM/File)
       * and a `done` function as parameters.
       *
       * If the done function is invoked without arguments, the file is "accepted" and will
       * be processed. If you pass an error message, the file is rejected, and the error
       * message will be displayed.
       * This function will not be called if the file is too big or doesn't match the mime types.
       */ accept (file, done) {
            return done();
        },
        /**
       * The callback that will be invoked when all chunks have been uploaded for a file.
       * It gets the file for which the chunks have been uploaded as the first parameter,
       * and the `done` function as second. `done()` needs to be invoked when everything
       * needed to finish the upload process is done.
       */ chunksUploaded: function(file, done) {
            done();
        },
        /**
       * Sends the file as binary blob in body instead of form data.
       * If this is set, the `params` option will be ignored.
       * It's an error to set this to `true` along with `uploadMultiple` since
       * multiple files cannot be in a single binary body.
       */ binaryBody: false,
        /**
       * Gets called when the browser is not supported.
       * The default implementation shows the fallback input field and adds
       * a text.
       */ fallback () {
            // This code should pass in IE7... :(
            let messageElement;
            this.element.className = `${this.element.className} dz-browser-not-supported`;
            for (let child of this.element.getElementsByTagName("div"))if (/(^| )dz-message($| )/.test(child.className)) {
                messageElement = child;
                child.className = "dz-message"; // Removes the 'dz-default' class
                break;
            }
            if (!messageElement) {
                messageElement = $3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement('<div class="dz-message"><span></span></div>');
                this.element.appendChild(messageElement);
            }
            let span = messageElement.getElementsByTagName("span")[0];
            if (span) {
                if (span.textContent != null) span.textContent = this.options.dictFallbackMessage;
                else if (span.innerText != null) span.innerText = this.options.dictFallbackMessage;
            }
            return this.element.appendChild(this.getFallbackForm());
        },
        /**
       * Gets called to calculate the thumbnail dimensions.
       *
       * It gets `file`, `width` and `height` (both may be `null`) as parameters and must return an object containing:
       *
       *  - `srcWidth` & `srcHeight` (required)
       *  - `trgWidth` & `trgHeight` (required)
       *  - `srcX` & `srcY` (optional, default `0`)
       *  - `trgX` & `trgY` (optional, default `0`)
       *
       * Those values are going to be used by `ctx.drawImage()`.
       */ resize (file, width, height, resizeMethod) {
            let info = {
                srcX: 0,
                srcY: 0,
                srcWidth: file.width,
                srcHeight: file.height
            };
            let srcRatio = file.width / file.height;
            // Automatically calculate dimensions if not specified
            if (width == null && height == null) {
                width = info.srcWidth;
                height = info.srcHeight;
            } else if (width == null) width = height * srcRatio;
            else if (height == null) height = width / srcRatio;
            // Make sure images aren't upscaled
            width = Math.min(width, info.srcWidth);
            height = Math.min(height, info.srcHeight);
            let trgRatio = width / height;
            if (info.srcWidth > width || info.srcHeight > height) {
                // Image is bigger and needs rescaling
                if (resizeMethod === "crop") {
                    if (srcRatio > trgRatio) {
                        info.srcHeight = file.height;
                        info.srcWidth = info.srcHeight * trgRatio;
                    } else {
                        info.srcWidth = file.width;
                        info.srcHeight = info.srcWidth / trgRatio;
                    }
                } else if (resizeMethod === "contain") {
                    // Method 'contain'
                    if (srcRatio > trgRatio) height = width / srcRatio;
                    else width = height * srcRatio;
                } else throw new Error(`Unknown resizeMethod '${resizeMethod}'`);
            }
            info.srcX = (file.width - info.srcWidth) / 2;
            info.srcY = (file.height - info.srcHeight) / 2;
            info.trgWidth = width;
            info.trgHeight = height;
            return info;
        },
        /**
       * Can be used to transform the file (for example, resize an image if necessary).
       *
       * The default implementation uses `resizeWidth` and `resizeHeight` (if provided) and resizes
       * images according to those dimensions.
       *
       * Gets the `file` as the first parameter, and a `done()` function as the second, that needs
       * to be invoked with the file when the transformation is done.
       */ transformFile (file, done) {
            if ((this.options.resizeWidth || this.options.resizeHeight) && file.type.match(/image.*/)) return this.resizeImage(file, this.options.resizeWidth, this.options.resizeHeight, this.options.resizeMethod, done);
            else return done(file);
        },
        /**
       * A string that contains the template used for each dropped
       * file. Change it to fulfill your needs but make sure to properly
       * provide all elements.
       *
       * If you want to use an actual HTML element instead of providing a String
       * as a config option, you could create a div with the id `tpl`,
       * put the template inside it and provide the element like this:
       *
       *     document
       *       .querySelector('#tpl')
       *       .innerHTML
       *
       */ previewTemplate: (/*@__PURE__*/$parcel$interopDefault($fd6031f88dce2e32$exports)),
        /*
       Those functions register themselves to the events on init and handle all
       the user interface specific stuff. Overwriting them won't break the upload
       but can break the way it's displayed.
       You can overwrite them if you don't like the default behavior. If you just
       want to add an additional event handler, register it on the dropzone object
       and don't overwrite those options.
       */ // Those are self explanatory and simply concern the DragnDrop.
        drop (e) {
            return this.element.classList.remove("dz-drag-hover");
        },
        dragstart (e) {
        },
        dragend (e) {
            return this.element.classList.remove("dz-drag-hover");
        },
        dragenter (e) {
            return this.element.classList.add("dz-drag-hover");
        },
        dragover (e) {
            return this.element.classList.add("dz-drag-hover");
        },
        dragleave (e) {
            return this.element.classList.remove("dz-drag-hover");
        },
        paste (e) {
        },
        // Called whenever there are no files left in the dropzone anymore, and the
        // dropzone should be displayed as if in the initial state.
        reset () {
            return this.element.classList.remove("dz-started");
        },
        // Called when a file is added to the queue
        // Receives `file`
        addedfile (file) {
            if (this.element === this.previewsContainer) this.element.classList.add("dz-started");
            if (this.previewsContainer && !this.options.disablePreviews) {
                file.previewElement = $3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement(this.options.previewTemplate.trim());
                file.previewTemplate = file.previewElement; // Backwards compatibility
                this.previewsContainer.appendChild(file.previewElement);
                for (var node of file.previewElement.querySelectorAll("[data-dz-name]"))node.textContent = file.name;
                for (node of file.previewElement.querySelectorAll("[data-dz-size]"))node.innerHTML = this.filesize(file.size);
                if (this.options.addRemoveLinks) {
                    file._removeLink = $3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement(`<a class="dz-remove" href="javascript:undefined;" data-dz-remove>${this.options.dictRemoveFile}</a>`);
                    file.previewElement.appendChild(file._removeLink);
                }
                let removeFileEvent = (e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    if (file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING) return $3ed269f2f0fb224b$export$2e2bcd8739ae039.confirm(this.options.dictCancelUploadConfirmation, ()=>this.removeFile(file)
                    );
                    else {
                        if (this.options.dictRemoveFileConfirmation) return $3ed269f2f0fb224b$export$2e2bcd8739ae039.confirm(this.options.dictRemoveFileConfirmation, ()=>this.removeFile(file)
                        );
                        else return this.removeFile(file);
                    }
                };
                for (let removeLink of file.previewElement.querySelectorAll("[data-dz-remove]"))removeLink.addEventListener("click", removeFileEvent);
            }
        },
        // Called whenever a file is removed.
        removedfile (file) {
            if (file.previewElement != null && file.previewElement.parentNode != null) file.previewElement.parentNode.removeChild(file.previewElement);
            return this._updateMaxFilesReachedClass();
        },
        // Called when a thumbnail has been generated
        // Receives `file` and `dataUrl`
        thumbnail (file, dataUrl) {
            if (file.previewElement) {
                file.previewElement.classList.remove("dz-file-preview");
                for (let thumbnailElement of file.previewElement.querySelectorAll("[data-dz-thumbnail]")){
                    thumbnailElement.alt = file.name;
                    thumbnailElement.src = dataUrl;
                }
                return setTimeout(()=>file.previewElement.classList.add("dz-image-preview")
                , 1);
            }
        },
        // Called whenever an error occurs
        // Receives `file` and `message`
        error (file, message) {
            if (file.previewElement) {
                file.previewElement.classList.add("dz-error");
                if (typeof message !== "string" && message.error) message = message.error;
                for (let node of file.previewElement.querySelectorAll("[data-dz-errormessage]"))node.textContent = message;
            }
        },
        errormultiple () {
        },
        // Called when a file gets processed. Since there is a cue, not all added
        // files are processed immediately.
        // Receives `file`
        processing (file) {
            if (file.previewElement) {
                file.previewElement.classList.add("dz-processing");
                if (file._removeLink) return file._removeLink.innerHTML = this.options.dictCancelUpload;
            }
        },
        processingmultiple () {
        },
        // Called whenever the upload progress gets updated.
        // Receives `file`, `progress` (percentage 0-100) and `bytesSent`.
        // To get the total number of bytes of the file, use `file.size`
        uploadprogress (file, progress, bytesSent) {
            if (file.previewElement) for (let node of file.previewElement.querySelectorAll("[data-dz-uploadprogress]"))node.nodeName === "PROGRESS" ? node.value = progress : node.style.width = `${progress}%`;
        },
        // Called whenever the total upload progress gets updated.
        // Called with totalUploadProgress (0-100), totalBytes and totalBytesSent
        totaluploadprogress () {
        },
        // Called just before the file is sent. Gets the `xhr` object as second
        // parameter, so you can modify it (for example to add a CSRF token) and a
        // `formData` object to add additional information.
        sending () {
        },
        sendingmultiple () {
        },
        // When the complete upload is finished and successful
        // Receives `file`
        success (file) {
            if (file.previewElement) return file.previewElement.classList.add("dz-success");
        },
        successmultiple () {
        },
        // When the upload is canceled.
        canceled (file) {
            return this.emit("error", file, this.options.dictUploadCanceled);
        },
        canceledmultiple () {
        },
        // When the upload is finished, either with success or an error.
        // Receives `file`
        complete (file) {
            if (file._removeLink) file._removeLink.innerHTML = this.options.dictRemoveFile;
            if (file.previewElement) return file.previewElement.classList.add("dz-complete");
        },
        completemultiple () {
        },
        maxfilesexceeded () {
        },
        maxfilesreached () {
        },
        queuecomplete () {
        },
        addedfiles () {
        }
    };
    var $4ca367182776f80b$export$2e2bcd8739ae039 = $4ca367182776f80b$var$defaultOptions;
    
    
    class $3ed269f2f0fb224b$export$2e2bcd8739ae039 extends $4040acfd8584338d$export$2e2bcd8739ae039 {
        static initClass() {
            // Exposing the emitter class, mainly for tests
            this.prototype.Emitter = $4040acfd8584338d$export$2e2bcd8739ae039;
            /*
         This is a list of all available events you can register on a dropzone object.
    
         You can register an event handler like this:
    
         dropzone.on("dragEnter", function() { });
    
         */ this.prototype.events = [
                "drop",
                "dragstart",
                "dragend",
                "dragenter",
                "dragover",
                "dragleave",
                "addedfile",
                "addedfiles",
                "removedfile",
                "thumbnail",
                "error",
                "errormultiple",
                "processing",
                "processingmultiple",
                "uploadprogress",
                "totaluploadprogress",
                "sending",
                "sendingmultiple",
                "success",
                "successmultiple",
                "canceled",
                "canceledmultiple",
                "complete",
                "completemultiple",
                "reset",
                "maxfilesexceeded",
                "maxfilesreached",
                "queuecomplete", 
            ];
            this.prototype._thumbnailQueue = [];
            this.prototype._processingThumbnail = false;
        }
        // Returns all files that have been accepted
        getAcceptedFiles() {
            return this.files.filter((file)=>file.accepted
            ).map((file)=>file
            );
        }
        // Returns all files that have been rejected
        // Not sure when that's going to be useful, but added for completeness.
        getRejectedFiles() {
            return this.files.filter((file)=>!file.accepted
            ).map((file)=>file
            );
        }
        getFilesWithStatus(status) {
            return this.files.filter((file)=>file.status === status
            ).map((file)=>file
            );
        }
        // Returns all files that are in the queue
        getQueuedFiles() {
            return this.getFilesWithStatus($3ed269f2f0fb224b$export$2e2bcd8739ae039.QUEUED);
        }
        getUploadingFiles() {
            return this.getFilesWithStatus($3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING);
        }
        getAddedFiles() {
            return this.getFilesWithStatus($3ed269f2f0fb224b$export$2e2bcd8739ae039.ADDED);
        }
        // Files that are either queued or uploading
        getActiveFiles() {
            return this.files.filter((file)=>file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING || file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.QUEUED
            ).map((file)=>file
            );
        }
        // The function that gets called when Dropzone is initialized. You
        // can (and should) setup event listeners inside this function.
        init() {
            // In case it isn't set already
            if (this.element.tagName === "form") this.element.setAttribute("enctype", "multipart/form-data");
            if (this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message")) this.element.appendChild($3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement(`<div class="dz-default dz-message"><button class="dz-button" type="button">${this.options.dictDefaultMessage}</button></div>`));
            if (this.clickableElements.length) {
                let setupHiddenFileInput = ()=>{
                    if (this.hiddenFileInput) this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);
                    this.hiddenFileInput = document.createElement("input");
                    this.hiddenFileInput.setAttribute("type", "file");
                    if (this.options.maxFiles === null || this.options.maxFiles > 1) this.hiddenFileInput.setAttribute("multiple", "multiple");
                    this.hiddenFileInput.className = "dz-hidden-input";
                    if (this.options.acceptedFiles !== null) this.hiddenFileInput.setAttribute("accept", this.options.acceptedFiles);
                    if (this.options.capture !== null) this.hiddenFileInput.setAttribute("capture", this.options.capture);
                    // Making sure that no one can "tab" into this field.
                    this.hiddenFileInput.setAttribute("tabindex", "-1");
                    // Not setting `display="none"` because some browsers don't accept clicks
                    // on elements that aren't displayed.
                    this.hiddenFileInput.style.visibility = "hidden";
                    this.hiddenFileInput.style.position = "absolute";
                    this.hiddenFileInput.style.top = "0";
                    this.hiddenFileInput.style.left = "0";
                    this.hiddenFileInput.style.height = "0";
                    this.hiddenFileInput.style.width = "0";
                    $3ed269f2f0fb224b$export$2e2bcd8739ae039.getElement(this.options.hiddenInputContainer, "hiddenInputContainer").appendChild(this.hiddenFileInput);
                    this.hiddenFileInput.addEventListener("change", ()=>{
                        let { files: files  } = this.hiddenFileInput;
                        if (files.length) for (let file of files)this.addFile(file);
                        this.emit("addedfiles", files);
                        setupHiddenFileInput();
                    });
                };
                setupHiddenFileInput();
            }
            this.URL = window.URL !== null ? window.URL : window.webkitURL;
            // Setup all event listeners on the Dropzone object itself.
            // They're not in @setupEventListeners() because they shouldn't be removed
            // again when the dropzone gets disabled.
            for (let eventName of this.events)this.on(eventName, this.options[eventName]);
            this.on("uploadprogress", ()=>this.updateTotalUploadProgress()
            );
            this.on("removedfile", ()=>this.updateTotalUploadProgress()
            );
            this.on("canceled", (file)=>this.emit("complete", file)
            );
            // Emit a `queuecomplete` event if all files finished uploading.
            this.on("complete", (file)=>{
                if (this.getAddedFiles().length === 0 && this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) // This needs to be deferred so that `queuecomplete` really triggers after `complete`
                return setTimeout(()=>this.emit("queuecomplete")
                , 0);
            });
            const containsFiles = function(e) {
                if (e.dataTransfer.types) // Because e.dataTransfer.types is an Object in
                // IE, we need to iterate like this instead of
                // using e.dataTransfer.types.some()
                for(var i = 0; i < e.dataTransfer.types.length; i++){
                    if (e.dataTransfer.types[i] === "Files") return true;
                }
                return false;
            };
            let noPropagation = function(e) {
                // If there are no files, we don't want to stop
                // propagation so we don't interfere with other
                // drag and drop behaviour.
                if (!containsFiles(e)) return;
                e.stopPropagation();
                if (e.preventDefault) return e.preventDefault();
                else return e.returnValue = false;
            };
            // Create the listeners
            this.listeners = [
                {
                    element: this.element,
                    events: {
                        dragstart: (e)=>{
                            return this.emit("dragstart", e);
                        },
                        dragenter: (e)=>{
                            noPropagation(e);
                            return this.emit("dragenter", e);
                        },
                        dragover: (e)=>{
                            // Makes it possible to drag files from chrome's download bar
                            // http://stackoverflow.com/questions/19526430/drag-and-drop-file-uploads-from-chrome-downloads-bar
                            // Try is required to prevent bug in Internet Explorer 11 (SCRIPT65535 exception)
                            let efct;
                            try {
                                efct = e.dataTransfer.effectAllowed;
                            } catch (error) {
                            }
                            e.dataTransfer.dropEffect = "move" === efct || "linkMove" === efct ? "move" : "copy";
                            noPropagation(e);
                            return this.emit("dragover", e);
                        },
                        dragleave: (e)=>{
                            return this.emit("dragleave", e);
                        },
                        drop: (e)=>{
                            noPropagation(e);
                            return this.drop(e);
                        },
                        dragend: (e)=>{
                            return this.emit("dragend", e);
                        }
                    }
                }, 
            ];
            this.clickableElements.forEach((clickableElement)=>{
                return this.listeners.push({
                    element: clickableElement,
                    events: {
                        click: (evt)=>{
                            // Only the actual dropzone or the message element should trigger file selection
                            if (clickableElement !== this.element || evt.target === this.element || $3ed269f2f0fb224b$export$2e2bcd8739ae039.elementInside(evt.target, this.element.querySelector(".dz-message"))) this.hiddenFileInput.click(); // Forward the click
                            return true;
                        }
                    }
                });
            });
            this.enable();
            return this.options.init.call(this);
        }
        // Not fully tested yet
        destroy() {
            this.disable();
            this.removeAllFiles(true);
            if (this.hiddenFileInput != null ? this.hiddenFileInput.parentNode : undefined) {
                this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);
                this.hiddenFileInput = null;
            }
            delete this.element.dropzone;
            return $3ed269f2f0fb224b$export$2e2bcd8739ae039.instances.splice($3ed269f2f0fb224b$export$2e2bcd8739ae039.instances.indexOf(this), 1);
        }
        updateTotalUploadProgress() {
            let totalUploadProgress;
            let totalBytesSent = 0;
            let totalBytes = 0;
            let activeFiles = this.getActiveFiles();
            if (activeFiles.length) {
                for (let file of this.getActiveFiles()){
                    totalBytesSent += file.upload.bytesSent;
                    totalBytes += file.upload.total;
                }
                totalUploadProgress = 100 * totalBytesSent / totalBytes;
            } else totalUploadProgress = 100;
            return this.emit("totaluploadprogress", totalUploadProgress, totalBytes, totalBytesSent);
        }
        // @options.paramName can be a function taking one parameter rather than a string.
        // A parameter name for a file is obtained simply by calling this with an index number.
        _getParamName(n) {
            if (typeof this.options.paramName === "function") return this.options.paramName(n);
            else return `${this.options.paramName}${this.options.uploadMultiple ? `[${n}]` : ""}`;
        }
        // If @options.renameFile is a function,
        // the function will be used to rename the file.name before appending it to the formData
        _renameFile(file) {
            if (typeof this.options.renameFile !== "function") return file.name;
            return this.options.renameFile(file);
        }
        // Returns a form that can be used as fallback if the browser does not support DragnDrop
        //
        // If the dropzone is already a form, only the input field and button are returned. Otherwise a complete form element is provided.
        // This code has to pass in IE7 :(
        getFallbackForm() {
            let existingFallback, form;
            if (existingFallback = this.getExistingFallback()) return existingFallback;
            let fieldsString = '<div class="dz-fallback">';
            if (this.options.dictFallbackText) fieldsString += `<p>${this.options.dictFallbackText}</p>`;
            fieldsString += `<input type="file" name="${this._getParamName(0)}" ${this.options.uploadMultiple ? 'multiple="multiple"' : undefined} /><input type="submit" value="Upload!"></div>`;
            let fields = $3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement(fieldsString);
            if (this.element.tagName !== "FORM") {
                form = $3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement(`<form action="${this.options.url}" enctype="multipart/form-data" method="${this.options.method}"></form>`);
                form.appendChild(fields);
            } else {
                // Make sure that the enctype and method attributes are set properly
                this.element.setAttribute("enctype", "multipart/form-data");
                this.element.setAttribute("method", this.options.method);
            }
            return form != null ? form : fields;
        }
        // Returns the fallback elements if they exist already
        //
        // This code has to pass in IE7 :(
        getExistingFallback() {
            let getFallback = function(elements) {
                for (let el of elements){
                    if (/(^| )fallback($| )/.test(el.className)) return el;
                }
            };
            for (let tagName of [
                "div",
                "form"
            ]){
                var fallback;
                if (fallback = getFallback(this.element.getElementsByTagName(tagName))) return fallback;
            }
        }
        // Activates all listeners stored in @listeners
        setupEventListeners() {
            return this.listeners.map((elementListeners)=>(()=>{
                    let result = [];
                    for(let event in elementListeners.events){
                        let listener = elementListeners.events[event];
                        result.push(elementListeners.element.addEventListener(event, listener, false));
                    }
                    return result;
                })()
            );
        }
        // Deactivates all listeners stored in @listeners
        removeEventListeners() {
            return this.listeners.map((elementListeners)=>(()=>{
                    let result = [];
                    for(let event in elementListeners.events){
                        let listener = elementListeners.events[event];
                        result.push(elementListeners.element.removeEventListener(event, listener, false));
                    }
                    return result;
                })()
            );
        }
        // Removes all event listeners and cancels all files in the queue or being processed.
        disable() {
            this.clickableElements.forEach((element)=>element.classList.remove("dz-clickable")
            );
            this.removeEventListeners();
            this.disabled = true;
            return this.files.map((file)=>this.cancelUpload(file)
            );
        }
        enable() {
            delete this.disabled;
            this.clickableElements.forEach((element)=>element.classList.add("dz-clickable")
            );
            return this.setupEventListeners();
        }
        // Returns a nicely formatted filesize
        filesize(size) {
            let selectedSize = 0;
            let selectedUnit = "b";
            if (size > 0) {
                let units = [
                    "tb",
                    "gb",
                    "mb",
                    "kb",
                    "b"
                ];
                for(let i = 0; i < units.length; i++){
                    let unit = units[i];
                    let cutoff = Math.pow(this.options.filesizeBase, 4 - i) / 10;
                    if (size >= cutoff) {
                        selectedSize = size / Math.pow(this.options.filesizeBase, 4 - i);
                        selectedUnit = unit;
                        break;
                    }
                }
                selectedSize = Math.round(10 * selectedSize) / 10; // Cutting of digits
            }
            return `<strong>${selectedSize}</strong> ${this.options.dictFileSizeUnits[selectedUnit]}`;
        }
        // Adds or removes the `dz-max-files-reached` class from the form.
        _updateMaxFilesReachedClass() {
            if (this.options.maxFiles != null && this.getAcceptedFiles().length >= this.options.maxFiles) {
                if (this.getAcceptedFiles().length === this.options.maxFiles) this.emit("maxfilesreached", this.files);
                return this.element.classList.add("dz-max-files-reached");
            } else return this.element.classList.remove("dz-max-files-reached");
        }
        drop(e) {
            if (!e.dataTransfer) return;
            this.emit("drop", e);
            // Convert the FileList to an Array
            // This is necessary for IE11
            let files = [];
            for(let i = 0; i < e.dataTransfer.files.length; i++)files[i] = e.dataTransfer.files[i];
            // Even if it's a folder, files.length will contain the folders.
            if (files.length) {
                let { items: items  } = e.dataTransfer;
                if (items && items.length && items[0].webkitGetAsEntry != null) // The browser supports dropping of folders, so handle items instead of files
                this._addFilesFromItems(items);
                else this.handleFiles(files);
            }
            this.emit("addedfiles", files);
        }
        paste(e) {
            if ($3ed269f2f0fb224b$var$__guard__(e != null ? e.clipboardData : undefined, (x)=>x.items
            ) == null) return;
            this.emit("paste", e);
            let { items: items  } = e.clipboardData;
            if (items.length) return this._addFilesFromItems(items);
        }
        handleFiles(files) {
            for (let file of files)this.addFile(file);
        }
        // When a folder is dropped (or files are pasted), items must be handled
        // instead of files.
        _addFilesFromItems(items) {
            return (()=>{
                let result = [];
                for (let item of items){
                    var entry;
                    if (item.webkitGetAsEntry != null && (entry = item.webkitGetAsEntry())) {
                        if (entry.isFile) result.push(this.addFile(item.getAsFile()));
                        else if (entry.isDirectory) // Append all files from that directory to files
                        result.push(this._addFilesFromDirectory(entry, entry.name));
                        else result.push(undefined);
                    } else if (item.getAsFile != null) {
                        if (item.kind == null || item.kind === "file") result.push(this.addFile(item.getAsFile()));
                        else result.push(undefined);
                    } else result.push(undefined);
                }
                return result;
            })();
        }
        // Goes through the directory, and adds each file it finds recursively
        _addFilesFromDirectory(directory, path) {
            let dirReader = directory.createReader();
            let errorHandler = (error)=>$3ed269f2f0fb224b$var$__guardMethod__(console, "log", (o)=>o.log(error)
                )
            ;
            var readEntries = ()=>{
                return dirReader.readEntries((entries)=>{
                    if (entries.length > 0) {
                        for (let entry of entries){
                            if (entry.isFile) entry.file((file)=>{
                                if (this.options.ignoreHiddenFiles && file.name.substring(0, 1) === ".") return;
                                file.fullPath = `${path}/${file.name}`;
                                return this.addFile(file);
                            });
                            else if (entry.isDirectory) this._addFilesFromDirectory(entry, `${path}/${entry.name}`);
                        }
                        // Recursively call readEntries() again, since browser only handle
                        // the first 100 entries.
                        // See: https://developer.mozilla.org/en-US/docs/Web/API/DirectoryReader#readEntries
                        readEntries();
                    }
                    return null;
                }, errorHandler);
            };
            return readEntries();
        }
        // If `done()` is called without argument the file is accepted
        // If you call it with an error message, the file is rejected
        // (This allows for asynchronous validation)
        //
        // This function checks the filesize, and if the file.type passes the
        // `acceptedFiles` check.
        accept(file, done) {
            if (this.options.maxFilesize && file.size > this.options.maxFilesize * 1048576) done(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(file.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize));
            else if (!$3ed269f2f0fb224b$export$2e2bcd8739ae039.isValidFile(file, this.options.acceptedFiles)) done(this.options.dictInvalidFileType);
            else if (this.options.maxFiles != null && this.getAcceptedFiles().length >= this.options.maxFiles) {
                done(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles));
                this.emit("maxfilesexceeded", file);
            } else this.options.accept.call(this, file, done);
        }
        addFile(file) {
            file.upload = {
                uuid: $3ed269f2f0fb224b$export$2e2bcd8739ae039.uuidv4(),
                progress: 0,
                // Setting the total upload size to file.size for the beginning
                // It's actual different than the size to be transmitted.
                total: file.size,
                bytesSent: 0,
                filename: this._renameFile(file)
            };
            this.files.push(file);
            file.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.ADDED;
            this.emit("addedfile", file);
            this._enqueueThumbnail(file);
            this.accept(file, (error)=>{
                if (error) {
                    file.accepted = false;
                    this._errorProcessing([
                        file
                    ], error); // Will set the file.status
                } else {
                    file.accepted = true;
                    if (this.options.autoQueue) this.enqueueFile(file);
                     // Will set .accepted = true
                }
                this._updateMaxFilesReachedClass();
            });
        }
        // Wrapper for enqueueFile
        enqueueFiles(files) {
            for (let file of files)this.enqueueFile(file);
            return null;
        }
        enqueueFile(file) {
            if (file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.ADDED && file.accepted === true) {
                file.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.QUEUED;
                if (this.options.autoProcessQueue) return setTimeout(()=>this.processQueue()
                , 0); // Deferring the call
            } else throw new Error("This file can't be queued because it has already been processed or was rejected.");
        }
        _enqueueThumbnail(file) {
            if (this.options.createImageThumbnails && file.type.match(/image.*/) && file.size <= this.options.maxThumbnailFilesize * 1048576) {
                this._thumbnailQueue.push(file);
                return setTimeout(()=>this._processThumbnailQueue()
                , 0); // Deferring the call
            }
        }
        _processThumbnailQueue() {
            if (this._processingThumbnail || this._thumbnailQueue.length === 0) return;
            this._processingThumbnail = true;
            let file = this._thumbnailQueue.shift();
            return this.createThumbnail(file, this.options.thumbnailWidth, this.options.thumbnailHeight, this.options.thumbnailMethod, true, (dataUrl)=>{
                this.emit("thumbnail", file, dataUrl);
                this._processingThumbnail = false;
                return this._processThumbnailQueue();
            });
        }
        // Can be called by the user to remove a file
        removeFile(file) {
            if (file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING) this.cancelUpload(file);
            this.files = $3ed269f2f0fb224b$var$without(this.files, file);
            this.emit("removedfile", file);
            if (this.files.length === 0) return this.emit("reset");
        }
        // Removes all files that aren't currently processed from the list
        removeAllFiles(cancelIfNecessary) {
            // Create a copy of files since removeFile() changes the @files array.
            if (cancelIfNecessary == null) cancelIfNecessary = false;
            for (let file of this.files.slice())if (file.status !== $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING || cancelIfNecessary) this.removeFile(file);
            return null;
        }
        // Resizes an image before it gets sent to the server. This function is the default behavior of
        // `options.transformFile` if `resizeWidth` or `resizeHeight` are set. The callback is invoked with
        // the resized blob.
        resizeImage(file, width, height, resizeMethod, callback) {
            return this.createThumbnail(file, width, height, resizeMethod, true, (dataUrl, canvas)=>{
                if (canvas == null) // The image has not been resized
                return callback(file);
                else {
                    let { resizeMimeType: resizeMimeType  } = this.options;
                    if (resizeMimeType == null) resizeMimeType = file.type;
                    let resizedDataURL = canvas.toDataURL(resizeMimeType, this.options.resizeQuality);
                    if (resizeMimeType === "image/jpeg" || resizeMimeType === "image/jpg") // Now add the original EXIF information
                    resizedDataURL = $3ed269f2f0fb224b$var$ExifRestore.restore(file.dataURL, resizedDataURL);
                    return callback($3ed269f2f0fb224b$export$2e2bcd8739ae039.dataURItoBlob(resizedDataURL));
                }
            });
        }
        createThumbnail(file, width, height, resizeMethod, fixOrientation, callback) {
            let fileReader = new FileReader();
            fileReader.onload = ()=>{
                file.dataURL = fileReader.result;
                // Don't bother creating a thumbnail for SVG images since they're vector
                if (file.type === "image/svg+xml") {
                    if (callback != null) callback(fileReader.result);
                    return;
                }
                this.createThumbnailFromUrl(file, width, height, resizeMethod, fixOrientation, callback);
            };
            fileReader.readAsDataURL(file);
        }
        // `mockFile` needs to have these attributes:
        //
        //     { name: 'name', size: 12345, imageUrl: '' }
        //
        // `callback` will be invoked when the image has been downloaded and displayed.
        // `crossOrigin` will be added to the `img` tag when accessing the file.
        displayExistingFile(mockFile, imageUrl, callback, crossOrigin, resizeThumbnail = true) {
            this.emit("addedfile", mockFile);
            this.emit("complete", mockFile);
            if (!resizeThumbnail) {
                this.emit("thumbnail", mockFile, imageUrl);
                if (callback) callback();
            } else {
                let onDone = (thumbnail)=>{
                    this.emit("thumbnail", mockFile, thumbnail);
                    if (callback) callback();
                };
                mockFile.dataURL = imageUrl;
                this.createThumbnailFromUrl(mockFile, this.options.thumbnailWidth, this.options.thumbnailHeight, this.options.thumbnailMethod, this.options.fixOrientation, onDone, crossOrigin);
            }
        }
        createThumbnailFromUrl(file, width, height, resizeMethod, fixOrientation, callback, crossOrigin) {
            // Not using `new Image` here because of a bug in latest Chrome versions.
            // See https://github.com/enyo/dropzone/pull/226
            let img = document.createElement("img");
            if (crossOrigin) img.crossOrigin = crossOrigin;
            // fixOrientation is not needed anymore with browsers handling imageOrientation
            fixOrientation = getComputedStyle(document.body)["imageOrientation"] == "from-image" ? false : fixOrientation;
            img.onload = ()=>{
                let loadExif = (callback)=>callback(1)
                ;
                if (typeof EXIF !== "undefined" && EXIF !== null && fixOrientation) loadExif = (callback)=>EXIF.getData(img, function() {
                        return callback(EXIF.getTag(this, "Orientation"));
                    })
                ;
                return loadExif((orientation)=>{
                    file.width = img.width;
                    file.height = img.height;
                    let resizeInfo = this.options.resize.call(this, file, width, height, resizeMethod);
                    let canvas = document.createElement("canvas");
                    let ctx = canvas.getContext("2d");
                    canvas.width = resizeInfo.trgWidth;
                    canvas.height = resizeInfo.trgHeight;
                    if (orientation > 4) {
                        canvas.width = resizeInfo.trgHeight;
                        canvas.height = resizeInfo.trgWidth;
                    }
                    switch(orientation){
                        case 2:
                            // horizontal flip
                            ctx.translate(canvas.width, 0);
                            ctx.scale(-1, 1);
                            break;
                        case 3:
                            // 180° rotate left
                            ctx.translate(canvas.width, canvas.height);
                            ctx.rotate(Math.PI);
                            break;
                        case 4:
                            // vertical flip
                            ctx.translate(0, canvas.height);
                            ctx.scale(1, -1);
                            break;
                        case 5:
                            // vertical flip + 90 rotate right
                            ctx.rotate(0.5 * Math.PI);
                            ctx.scale(1, -1);
                            break;
                        case 6:
                            // 90° rotate right
                            ctx.rotate(0.5 * Math.PI);
                            ctx.translate(0, -canvas.width);
                            break;
                        case 7:
                            // horizontal flip + 90 rotate right
                            ctx.rotate(0.5 * Math.PI);
                            ctx.translate(canvas.height, -canvas.width);
                            ctx.scale(-1, 1);
                            break;
                        case 8:
                            // 90° rotate left
                            ctx.rotate(-0.5 * Math.PI);
                            ctx.translate(-canvas.height, 0);
                            break;
                    }
                    // This is a bugfix for iOS' scaling bug.
                    $3ed269f2f0fb224b$var$drawImageIOSFix(ctx, img, resizeInfo.srcX != null ? resizeInfo.srcX : 0, resizeInfo.srcY != null ? resizeInfo.srcY : 0, resizeInfo.srcWidth, resizeInfo.srcHeight, resizeInfo.trgX != null ? resizeInfo.trgX : 0, resizeInfo.trgY != null ? resizeInfo.trgY : 0, resizeInfo.trgWidth, resizeInfo.trgHeight);
                    let thumbnail = canvas.toDataURL("image/png");
                    if (callback != null) return callback(thumbnail, canvas);
                });
            };
            if (callback != null) img.onerror = callback;
            return img.src = file.dataURL;
        }
        // Goes through the queue and processes files if there aren't too many already.
        processQueue() {
            let { parallelUploads: parallelUploads  } = this.options;
            let processingLength = this.getUploadingFiles().length;
            let i = processingLength;
            // There are already at least as many files uploading than should be
            if (processingLength >= parallelUploads) return;
            let queuedFiles = this.getQueuedFiles();
            if (!(queuedFiles.length > 0)) return;
            if (this.options.uploadMultiple) // The files should be uploaded in one request
            return this.processFiles(queuedFiles.slice(0, parallelUploads - processingLength));
            else while(i < parallelUploads){
                if (!queuedFiles.length) return;
                 // Nothing left to process
                this.processFile(queuedFiles.shift());
                i++;
            }
        }
        // Wrapper for `processFiles`
        processFile(file) {
            return this.processFiles([
                file
            ]);
        }
        // Loads the file, then calls finishedLoading()
        processFiles(files) {
            for (let file of files){
                file.processing = true; // Backwards compatibility
                file.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING;
                this.emit("processing", file);
            }
            if (this.options.uploadMultiple) this.emit("processingmultiple", files);
            return this.uploadFiles(files);
        }
        _getFilesWithXhr(xhr) {
            let files;
            return files = this.files.filter((file)=>file.xhr === xhr
            ).map((file)=>file
            );
        }
        // Cancels the file upload and sets the status to CANCELED
        // **if** the file is actually being uploaded.
        // If it's still in the queue, the file is being removed from it and the status
        // set to CANCELED.
        cancelUpload(file) {
            if (file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING) {
                let groupedFiles = this._getFilesWithXhr(file.xhr);
                for (let groupedFile of groupedFiles)groupedFile.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.CANCELED;
                if (typeof file.xhr !== "undefined") file.xhr.abort();
                for (let groupedFile1 of groupedFiles)this.emit("canceled", groupedFile1);
                if (this.options.uploadMultiple) this.emit("canceledmultiple", groupedFiles);
            } else if (file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.ADDED || file.status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.QUEUED) {
                file.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.CANCELED;
                this.emit("canceled", file);
                if (this.options.uploadMultiple) this.emit("canceledmultiple", [
                    file
                ]);
            }
            if (this.options.autoProcessQueue) return this.processQueue();
        }
        resolveOption(option, ...args) {
            if (typeof option === "function") return option.apply(this, args);
            return option;
        }
        uploadFile(file) {
            return this.uploadFiles([
                file
            ]);
        }
        uploadFiles(files) {
            this._transformFiles(files, (transformedFiles)=>{
                if (this.options.chunking) {
                    // Chunking is not allowed to be used with `uploadMultiple` so we know
                    // that there is only __one__file.
                    let transformedFile = transformedFiles[0];
                    files[0].upload.chunked = this.options.chunking && (this.options.forceChunking || transformedFile.size > this.options.chunkSize);
                    files[0].upload.totalChunkCount = Math.ceil(transformedFile.size / this.options.chunkSize);
                }
                if (files[0].upload.chunked) {
                    // This file should be sent in chunks!
                    // If the chunking option is set, we **know** that there can only be **one** file, since
                    // uploadMultiple is not allowed with this option.
                    let file = files[0];
                    let transformedFile = transformedFiles[0];
                    let startedChunkCount = 0;
                    file.upload.chunks = [];
                    let handleNextChunk = ()=>{
                        let chunkIndex = 0;
                        // Find the next item in file.upload.chunks that is not defined yet.
                        while(file.upload.chunks[chunkIndex] !== undefined)chunkIndex++;
                        // This means, that all chunks have already been started.
                        if (chunkIndex >= file.upload.totalChunkCount) return;
                        startedChunkCount++;
                        let start = chunkIndex * this.options.chunkSize;
                        let end = Math.min(start + this.options.chunkSize, transformedFile.size);
                        let dataBlock = {
                            name: this._getParamName(0),
                            data: transformedFile.webkitSlice ? transformedFile.webkitSlice(start, end) : transformedFile.slice(start, end),
                            filename: file.upload.filename,
                            chunkIndex: chunkIndex
                        };
                        file.upload.chunks[chunkIndex] = {
                            file: file,
                            index: chunkIndex,
                            dataBlock: dataBlock,
                            status: $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING,
                            progress: 0,
                            retries: 0
                        };
                        this._uploadData(files, [
                            dataBlock
                        ]);
                    };
                    file.upload.finishedChunkUpload = (chunk, response)=>{
                        let allFinished = true;
                        chunk.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.SUCCESS;
                        // Clear the data from the chunk
                        chunk.dataBlock = null;
                        chunk.response = chunk.xhr.responseText;
                        chunk.responseHeaders = chunk.xhr.getAllResponseHeaders();
                        // Leaving this reference to xhr will cause memory leaks.
                        chunk.xhr = null;
                        for(let i = 0; i < file.upload.totalChunkCount; i++){
                            if (file.upload.chunks[i] === undefined) return handleNextChunk();
                            if (file.upload.chunks[i].status !== $3ed269f2f0fb224b$export$2e2bcd8739ae039.SUCCESS) allFinished = false;
                        }
                        if (allFinished) this.options.chunksUploaded(file, ()=>{
                            this._finished(files, response, null);
                        });
                    };
                    if (this.options.parallelChunkUploads) for(let i = 0; i < file.upload.totalChunkCount; i++)handleNextChunk();
                    else handleNextChunk();
                } else {
                    let dataBlocks = [];
                    for(let i = 0; i < files.length; i++)dataBlocks[i] = {
                        name: this._getParamName(i),
                        data: transformedFiles[i],
                        filename: files[i].upload.filename
                    };
                    this._uploadData(files, dataBlocks);
                }
            });
        }
        /// Returns the right chunk for given file and xhr
        _getChunk(file, xhr) {
            for(let i = 0; i < file.upload.totalChunkCount; i++){
                if (file.upload.chunks[i] !== undefined && file.upload.chunks[i].xhr === xhr) return file.upload.chunks[i];
            }
        }
        // This function actually uploads the file(s) to the server.
        //
        //  If dataBlocks contains the actual data to upload (meaning, that this could
        // either be transformed files, or individual chunks for chunked upload) then
        // they will be used for the actual data to upload.
        _uploadData(files, dataBlocks) {
            let xhr = new XMLHttpRequest();
            // Put the xhr object in the file objects to be able to reference it later.
            for (let file of files)file.xhr = xhr;
            if (files[0].upload.chunked) // Put the xhr object in the right chunk object, so it can be associated
            // later, and found with _getChunk.
            files[0].upload.chunks[dataBlocks[0].chunkIndex].xhr = xhr;
            let method = this.resolveOption(this.options.method, files, dataBlocks);
            let url = this.resolveOption(this.options.url, files, dataBlocks);
            xhr.open(method, url, true);
            // Setting the timeout after open because of IE11 issue: https://gitlab.com/meno/dropzone/issues/8
            let timeout = this.resolveOption(this.options.timeout, files);
            if (timeout) xhr.timeout = this.resolveOption(this.options.timeout, files);
            // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
            xhr.withCredentials = !!this.options.withCredentials;
            xhr.onload = (e)=>{
                this._finishedUploading(files, xhr, e);
            };
            xhr.ontimeout = ()=>{
                this._handleUploadError(files, xhr, `Request timedout after ${this.options.timeout / 1000} seconds`);
            };
            xhr.onerror = ()=>{
                this._handleUploadError(files, xhr);
            };
            // Some browsers do not have the .upload property
            let progressObj = xhr.upload != null ? xhr.upload : xhr;
            progressObj.onprogress = (e)=>this._updateFilesUploadProgress(files, xhr, e)
            ;
            let headers = this.options.defaultHeaders ? {
                Accept: "application/json",
                "Cache-Control": "no-cache",
                "X-Requested-With": "XMLHttpRequest"
            } : {
            };
            if (this.options.binaryBody) headers["Content-Type"] = files[0].type;
            if (this.options.headers) objectExtend(headers, this.options.headers);
            for(let headerName in headers){
                let headerValue = headers[headerName];
                if (headerValue) xhr.setRequestHeader(headerName, headerValue);
            }
            if (this.options.binaryBody) {
                // Since the file is going to be sent as binary body, it doesn't make
                // any sense to generate `FormData` for it.
                for (let file of files)this.emit("sending", file, xhr);
                if (this.options.uploadMultiple) this.emit("sendingmultiple", files, xhr);
                this.submitRequest(xhr, null, files);
            } else {
                let formData = new FormData();
                // Adding all @options parameters
                if (this.options.params) {
                    let additionalParams = this.options.params;
                    if (typeof additionalParams === "function") additionalParams = additionalParams.call(this, files, xhr, files[0].upload.chunked ? this._getChunk(files[0], xhr) : null);
                    for(let key in additionalParams){
                        let value = additionalParams[key];
                        if (Array.isArray(value)) // The additional parameter contains an array,
                        // so lets iterate over it to attach each value
                        // individually.
                        for(let i = 0; i < value.length; i++)formData.append(key, value[i]);
                        else formData.append(key, value);
                    }
                }
                // Let the user add additional data if necessary
                for (let file of files)this.emit("sending", file, xhr, formData);
                if (this.options.uploadMultiple) this.emit("sendingmultiple", files, xhr, formData);
                this._addFormElementData(formData);
                // Finally add the files
                // Has to be last because some servers (eg: S3) expect the file to be the last parameter
                for(let i = 0; i < dataBlocks.length; i++){
                    let dataBlock = dataBlocks[i];
                    formData.append(dataBlock.name, dataBlock.data, dataBlock.filename);
                }
                this.submitRequest(xhr, formData, files);
            }
        }
        // Transforms all files with this.options.transformFile and invokes done with the transformed files when done.
        _transformFiles(files, done) {
            let transformedFiles = [];
            // Clumsy way of handling asynchronous calls, until I get to add a proper Future library.
            let doneCounter = 0;
            for(let i = 0; i < files.length; i++)this.options.transformFile.call(this, files[i], (transformedFile)=>{
                transformedFiles[i] = transformedFile;
                if (++doneCounter === files.length) done(transformedFiles);
            });
        }
        // Takes care of adding other input elements of the form to the AJAX request
        _addFormElementData(formData) {
            // Take care of other input elements
            if (this.element.tagName === "FORM") for (let input of this.element.querySelectorAll("input, textarea, select, button")){
                let inputName = input.getAttribute("name");
                let inputType = input.getAttribute("type");
                if (inputType) inputType = inputType.toLowerCase();
                // If the input doesn't have a name, we can't use it.
                if (typeof inputName === "undefined" || inputName === null) continue;
                if (input.tagName === "SELECT" && input.hasAttribute("multiple")) {
                    // Possibly multiple values
                    for (let option of input.options)if (option.selected) formData.append(inputName, option.value);
                } else if (!inputType || inputType !== "checkbox" && inputType !== "radio" || input.checked) formData.append(inputName, input.value);
            }
        }
        // Invoked when there is new progress information about given files.
        // If e is not provided, it is assumed that the upload is finished.
        _updateFilesUploadProgress(files, xhr, e) {
            if (!files[0].upload.chunked) // Handle file uploads without chunking
            for (let file of files){
                if (file.upload.total && file.upload.bytesSent && file.upload.bytesSent == file.upload.total) continue;
                if (e) {
                    file.upload.progress = 100 * e.loaded / e.total;
                    file.upload.total = e.total;
                    file.upload.bytesSent = e.loaded;
                } else {
                    // No event, so we're at 100%
                    file.upload.progress = 100;
                    file.upload.bytesSent = file.upload.total;
                }
                this.emit("uploadprogress", file, file.upload.progress, file.upload.bytesSent);
            }
            else {
                // Handle chunked file uploads
                // Chunked upload is not compatible with uploading multiple files in one
                // request, so we know there's only one file.
                let file = files[0];
                // Since this is a chunked upload, we need to update the appropriate chunk
                // progress.
                let chunk = this._getChunk(file, xhr);
                if (e) {
                    chunk.progress = 100 * e.loaded / e.total;
                    chunk.total = e.total;
                    chunk.bytesSent = e.loaded;
                } else {
                    // No event, so we're at 100%
                    chunk.progress = 100;
                    chunk.bytesSent = chunk.total;
                }
                // Now tally the *file* upload progress from its individual chunks
                file.upload.progress = 0;
                file.upload.total = 0;
                file.upload.bytesSent = 0;
                for(let i = 0; i < file.upload.totalChunkCount; i++)if (file.upload.chunks[i] && typeof file.upload.chunks[i].progress !== "undefined") {
                    file.upload.progress += file.upload.chunks[i].progress;
                    file.upload.total += file.upload.chunks[i].total;
                    file.upload.bytesSent += file.upload.chunks[i].bytesSent;
                }
                // Since the process is a percentage, we need to divide by the amount of
                // chunks we've used.
                file.upload.progress = file.upload.progress / file.upload.totalChunkCount;
                this.emit("uploadprogress", file, file.upload.progress, file.upload.bytesSent);
            }
        }
        _finishedUploading(files, xhr, e) {
            let response;
            if (files[0].status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.CANCELED) return;
            if (xhr.readyState !== 4) return;
            if (xhr.responseType !== "arraybuffer" && xhr.responseType !== "blob") {
                response = xhr.responseText;
                if (xhr.getResponseHeader("content-type") && ~xhr.getResponseHeader("content-type").indexOf("application/json")) try {
                    response = JSON.parse(response);
                } catch (error) {
                    e = error;
                    response = "Invalid JSON response from server.";
                }
            }
            this._updateFilesUploadProgress(files, xhr);
            if (!(200 <= xhr.status && xhr.status < 300)) this._handleUploadError(files, xhr, response);
            else if (files[0].upload.chunked) files[0].upload.finishedChunkUpload(this._getChunk(files[0], xhr), response);
            else this._finished(files, response, e);
        }
        _handleUploadError(files, xhr, response) {
            if (files[0].status === $3ed269f2f0fb224b$export$2e2bcd8739ae039.CANCELED) return;
            if (files[0].upload.chunked && this.options.retryChunks) {
                let chunk = this._getChunk(files[0], xhr);
                if ((chunk.retries++) < this.options.retryChunksLimit) {
                    this._uploadData(files, [
                        chunk.dataBlock
                    ]);
                    return;
                } else console.warn("Retried this chunk too often. Giving up.");
            }
            this._errorProcessing(files, response || this.options.dictResponseError.replace("{{statusCode}}", xhr.status), xhr);
        }
        submitRequest(xhr, formData, files) {
            if (xhr.readyState != 1) {
                console.warn("Cannot send this request because the XMLHttpRequest.readyState is not OPENED.");
                return;
            }
            if (this.options.binaryBody) {
                if (files[0].upload.chunked) {
                    const chunk = this._getChunk(files[0], xhr);
                    xhr.send(chunk.dataBlock.data);
                } else xhr.send(files[0]);
            } else xhr.send(formData);
        }
        // Called internally when processing is finished.
        // Individual callbacks have to be called in the appropriate sections.
        _finished(files, responseText, e) {
            for (let file of files){
                file.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.SUCCESS;
                this.emit("success", file, responseText, e);
                this.emit("complete", file);
            }
            if (this.options.uploadMultiple) {
                this.emit("successmultiple", files, responseText, e);
                this.emit("completemultiple", files);
            }
            if (this.options.autoProcessQueue) return this.processQueue();
        }
        // Called internally when processing is finished.
        // Individual callbacks have to be called in the appropriate sections.
        _errorProcessing(files, message, xhr) {
            for (let file of files){
                file.status = $3ed269f2f0fb224b$export$2e2bcd8739ae039.ERROR;
                this.emit("error", file, message, xhr);
                this.emit("complete", file);
            }
            if (this.options.uploadMultiple) {
                this.emit("errormultiple", files, message, xhr);
                this.emit("completemultiple", files);
            }
            if (this.options.autoProcessQueue) return this.processQueue();
        }
        static uuidv4() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                let r = Math.random() * 16 | 0, v = c === "x" ? r : r & 3 | 8;
                return v.toString(16);
            });
        }
        constructor(el, options){
            super();
            let fallback, left;
            this.element = el;
            this.clickableElements = [];
            this.listeners = [];
            this.files = []; // All files
            if (typeof this.element === "string") this.element = document.querySelector(this.element);
            // Not checking if instance of HTMLElement or Element since IE9 is extremely weird.
            if (!this.element || this.element.nodeType == null) throw new Error("Invalid dropzone element.");
            if (this.element.dropzone) throw new Error("Dropzone already attached.");
            // Now add this dropzone to the instances.
            $3ed269f2f0fb224b$export$2e2bcd8739ae039.instances.push(this);
            // Put the dropzone inside the element itself.
            this.element.dropzone = this;
            let elementOptions = (left = $3ed269f2f0fb224b$export$2e2bcd8739ae039.optionsForElement(this.element)) != null ? left : {
            };
            this.options = objectExtend(true, {
            }, $4ca367182776f80b$export$2e2bcd8739ae039, elementOptions, options != null ? options : {
            });
            this.options.previewTemplate = this.options.previewTemplate.replace(/\n*/g, "");
            // If the browser failed, just call the fallback and leave
            if (this.options.forceFallback || !$3ed269f2f0fb224b$export$2e2bcd8739ae039.isBrowserSupported()) return this.options.fallback.call(this);
            // @options.url = @element.getAttribute "action" unless @options.url?
            if (this.options.url == null) this.options.url = this.element.getAttribute("action");
            if (!this.options.url) throw new Error("No URL provided.");
            if (this.options.acceptedFiles && this.options.acceptedMimeTypes) throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
            if (this.options.uploadMultiple && this.options.chunking) throw new Error("You cannot set both: uploadMultiple and chunking.");
            if (this.options.binaryBody && this.options.uploadMultiple) throw new Error("You cannot set both: binaryBody and uploadMultiple.");
            // Backwards compatibility
            if (this.options.acceptedMimeTypes) {
                this.options.acceptedFiles = this.options.acceptedMimeTypes;
                delete this.options.acceptedMimeTypes;
            }
            // Backwards compatibility
            if (this.options.renameFilename != null) this.options.renameFile = (file)=>this.options.renameFilename.call(this, file.name, file)
            ;
            if (typeof this.options.method === "string") this.options.method = this.options.method.toUpperCase();
            if ((fallback = this.getExistingFallback()) && fallback.parentNode) // Remove the fallback
            fallback.parentNode.removeChild(fallback);
            // Display previews in the previewsContainer element or the Dropzone element unless explicitly set to false
            if (this.options.previewsContainer !== false) {
                if (this.options.previewsContainer) this.previewsContainer = $3ed269f2f0fb224b$export$2e2bcd8739ae039.getElement(this.options.previewsContainer, "previewsContainer");
                else this.previewsContainer = this.element;
            }
            if (this.options.clickable) {
                if (this.options.clickable === true) this.clickableElements = [
                    this.element
                ];
                else this.clickableElements = $3ed269f2f0fb224b$export$2e2bcd8739ae039.getElements(this.options.clickable, "clickable");
            }
            this.init();
        }
    }
    $3ed269f2f0fb224b$export$2e2bcd8739ae039.initClass();
    // This is a map of options for your different dropzones. Add configurations
    // to this object for your different dropzone elemens.
    //
    // Example:
    //
    //     Dropzone.options.myDropzoneElementId = { maxFilesize: 1 };
    //
    // And in html:
    //
    //     <form action="/upload" id="my-dropzone-element-id" class="dropzone"></form>
    $3ed269f2f0fb224b$export$2e2bcd8739ae039.options = {
    };
    // Returns the options for an element or undefined if none available.
    $3ed269f2f0fb224b$export$2e2bcd8739ae039.optionsForElement = function(element) {
        // Get the `Dropzone.options.elementId` for this element if it exists
        if (element.getAttribute("id")) return $3ed269f2f0fb224b$export$2e2bcd8739ae039.options[$3ed269f2f0fb224b$var$camelize(element.getAttribute("id"))];
        else return undefined;
    };
    // Holds a list of all dropzone instances
    $3ed269f2f0fb224b$export$2e2bcd8739ae039.instances = [];
    // Returns the dropzone for given element if any
    $3ed269f2f0fb224b$export$2e2bcd8739ae039.forElement = function(element) {
        if (typeof element === "string") element = document.querySelector(element);
        if ((element != null ? element.dropzone : undefined) == null) throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
        return element.dropzone;
    };
    // Looks for all .dropzone elements and creates a dropzone for them
    $3ed269f2f0fb224b$export$2e2bcd8739ae039.discover = function() {
        let dropzones;
        if (document.querySelectorAll) dropzones = document.querySelectorAll(".dropzone");
        else {
            dropzones = [];
            // IE :(
            let checkElements = (elements)=>(()=>{
                    let result = [];
                    for (let el of elements)if (/(^| )dropzone($| )/.test(el.className)) result.push(dropzones.push(el));
                    else result.push(undefined);
                    return result;
                })()
            ;
            checkElements(document.getElementsByTagName("div"));
            checkElements(document.getElementsByTagName("form"));
        }
        return (()=>{
            let result = [];
            for (let dropzone of dropzones)// Create a dropzone unless auto discover has been disabled for specific element
            if ($3ed269f2f0fb224b$export$2e2bcd8739ae039.optionsForElement(dropzone) !== false) result.push(new $3ed269f2f0fb224b$export$2e2bcd8739ae039(dropzone));
            else result.push(undefined);
            return result;
        })();
    };
    // Some browsers support drag and drog functionality, but not correctly.
    //
    // So I created a blocklist of userAgents. Yes, yes. Browser sniffing, I know.
    // But what to do when browsers *theoretically* support an API, but crash
    // when using it.
    //
    // This is a list of regular expressions tested against navigator.userAgent
    //
    // ** It should only be used on browser that *do* support the API, but
    // incorrectly **
    $3ed269f2f0fb224b$export$2e2bcd8739ae039.blockedBrowsers = [
        // The mac os and windows phone version of opera 12 seems to have a problem with the File drag'n'drop API.
        /opera.*(Macintosh|Windows Phone).*version\/12/i, 
    ];
    // Checks if the browser is supported
    $3ed269f2f0fb224b$export$2e2bcd8739ae039.isBrowserSupported = function() {
        let capableBrowser = true;
        if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) {
            if (!("classList" in document.createElement("a"))) capableBrowser = false;
            else {
                if ($3ed269f2f0fb224b$export$2e2bcd8739ae039.blacklistedBrowsers !== undefined) // Since this has been renamed, this makes sure we don't break older
                // configuration.
                $3ed269f2f0fb224b$export$2e2bcd8739ae039.blockedBrowsers = $3ed269f2f0fb224b$export$2e2bcd8739ae039.blacklistedBrowsers;
                // The browser supports the API, but may be blocked.
                for (let regex of $3ed269f2f0fb224b$export$2e2bcd8739ae039.blockedBrowsers)if (regex.test(navigator.userAgent)) {
                    capableBrowser = false;
                    continue;
                }
            }
        } else capableBrowser = false;
        return capableBrowser;
    };
    $3ed269f2f0fb224b$export$2e2bcd8739ae039.dataURItoBlob = function(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        let byteString = atob(dataURI.split(",")[1]);
        // separate out the mime component
        let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
        // write the bytes of the string to an ArrayBuffer
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);
        for(let i = 0, end = byteString.length, asc = 0 <= end; asc ? i <= end : i >= end; asc ? i++ : i--)ia[i] = byteString.charCodeAt(i);
        // write the ArrayBuffer to a blob
        return new Blob([
            ab
        ], {
            type: mimeString
        });
    };
    // Returns an array without the rejected item
    const $3ed269f2f0fb224b$var$without = (list, rejectedItem)=>list.filter((item)=>item !== rejectedItem
        ).map((item)=>item
        )
    ;
    // abc-def_ghi -> abcDefGhi
    const $3ed269f2f0fb224b$var$camelize = (str)=>str.replace(/[\-_](\w)/g, (match)=>match.charAt(1).toUpperCase()
        )
    ;
    // Creates an element from string
    $3ed269f2f0fb224b$export$2e2bcd8739ae039.createElement = function(string) {
        let div = document.createElement("div");
        div.innerHTML = string;
        return div.childNodes[0];
    };
    // Tests if given element is inside (or simply is) the container
    $3ed269f2f0fb224b$export$2e2bcd8739ae039.elementInside = function(element, container) {
        if (element === container) return true;
         // Coffeescript doesn't support do/while loops
        while(element = element.parentNode){
            if (element === container) return true;
        }
        return false;
    };
    $3ed269f2f0fb224b$export$2e2bcd8739ae039.getElement = function(el, name) {
        let element;
        if (typeof el === "string") element = document.querySelector(el);
        else if (el.nodeType != null) element = el;
        if (element == null) throw new Error(`Invalid \`${name}\` option provided. Please provide a CSS selector or a plain HTML element.`);
        return element;
    };
    $3ed269f2f0fb224b$export$2e2bcd8739ae039.getElements = function(els, name) {
        let el, elements;
        if (els instanceof Array) {
            elements = [];
            try {
                for (el of els)elements.push(this.getElement(el, name));
            } catch (e) {
                elements = null;
            }
        } else if (typeof els === "string") {
            elements = [];
            for (el of document.querySelectorAll(els))elements.push(el);
        } else if (els.nodeType != null) elements = [
            els
        ];
        if (elements == null || !elements.length) throw new Error(`Invalid \`${name}\` option provided. Please provide a CSS selector, a plain HTML element or a list of those.`);
        return elements;
    };
    // Asks the user the question and calls accepted or rejected accordingly
    //
    // The default implementation just uses `window.confirm` and then calls the
    // appropriate callback.
    $3ed269f2f0fb224b$export$2e2bcd8739ae039.confirm = function(question, accepted, rejected) {
        if (window.confirm(question)) return accepted();
        else if (rejected != null) return rejected();
    };
    // Validates the mime type like this:
    //
    // https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept
    $3ed269f2f0fb224b$export$2e2bcd8739ae039.isValidFile = function(file, acceptedFiles) {
        if (!acceptedFiles) return true;
         // If there are no accepted mime types, it's OK
        acceptedFiles = acceptedFiles.split(",");
        let mimeType = file.type;
        let baseMimeType = mimeType.replace(/\/.*$/, "");
        for (let validType of acceptedFiles){
            validType = validType.trim();
            if (validType.charAt(0) === ".") {
                if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) return true;
            } else if (/\/\*$/.test(validType)) {
                // This is something like a image/* mime type
                if (baseMimeType === validType.replace(/\/.*$/, "")) return true;
            } else {
                if (mimeType === validType) return true;
            }
        }
        return false;
    };
    // Augment jQuery
    if (typeof jQuery !== "undefined" && jQuery !== null) jQuery.fn.dropzone = function(options) {
        return this.each(function() {
            return new $3ed269f2f0fb224b$export$2e2bcd8739ae039(this, options);
        });
    };
    // Dropzone file status codes
    $3ed269f2f0fb224b$export$2e2bcd8739ae039.ADDED = "added";
    $3ed269f2f0fb224b$export$2e2bcd8739ae039.QUEUED = "queued";
    // For backwards compatibility. Now, if a file is accepted, it's either queued
    // or uploading.
    $3ed269f2f0fb224b$export$2e2bcd8739ae039.ACCEPTED = $3ed269f2f0fb224b$export$2e2bcd8739ae039.QUEUED;
    $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING = "uploading";
    $3ed269f2f0fb224b$export$2e2bcd8739ae039.PROCESSING = $3ed269f2f0fb224b$export$2e2bcd8739ae039.UPLOADING; // alias
    $3ed269f2f0fb224b$export$2e2bcd8739ae039.CANCELED = "canceled";
    $3ed269f2f0fb224b$export$2e2bcd8739ae039.ERROR = "error";
    $3ed269f2f0fb224b$export$2e2bcd8739ae039.SUCCESS = "success";
    /*
    
     Bugfix for iOS 6 and 7
     Source: http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
     based on the work of https://github.com/stomita/ios-imagefile-megapixel
    
     */ // Detecting vertical squash in loaded image.
    // Fixes a bug which squash image vertically while drawing into canvas for some images.
    // This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel
    let $3ed269f2f0fb224b$var$detectVerticalSquash = function(img) {
        let iw = img.naturalWidth;
        let ih = img.naturalHeight;
        let canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = ih;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        let { data: data  } = ctx.getImageData(1, 0, 1, ih);
        // search image edge pixel position in case it is squashed vertically.
        let sy = 0;
        let ey = ih;
        let py = ih;
        while(py > sy){
            let alpha = data[(py - 1) * 4 + 3];
            if (alpha === 0) ey = py;
            else sy = py;
            py = ey + sy >> 1;
        }
        let ratio = py / ih;
        if (ratio === 0) return 1;
        else return ratio;
    };
    // A replacement for context.drawImage
    // (args are for source and destination).
    var $3ed269f2f0fb224b$var$drawImageIOSFix = function(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
        let vertSquashRatio = $3ed269f2f0fb224b$var$detectVerticalSquash(img);
        return ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
    };
    // Based on MinifyJpeg
    // Source: http://www.perry.cz/files/ExifRestorer.js
    // http://elicon.blog57.fc2.com/blog-entry-206.html
    class $3ed269f2f0fb224b$var$ExifRestore {
        static initClass() {
            this.KEY_STR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        }
        static encode64(input) {
            let output = "";
            let chr1 = undefined;
            let chr2 = undefined;
            let chr3 = "";
            let enc1 = undefined;
            let enc2 = undefined;
            let enc3 = undefined;
            let enc4 = "";
            let i = 0;
            while(true){
                chr1 = input[i++];
                chr2 = input[i++];
                chr3 = input[i++];
                enc1 = chr1 >> 2;
                enc2 = (chr1 & 3) << 4 | chr2 >> 4;
                enc3 = (chr2 & 15) << 2 | chr3 >> 6;
                enc4 = chr3 & 63;
                if (isNaN(chr2)) enc3 = enc4 = 64;
                else if (isNaN(chr3)) enc4 = 64;
                output = output + this.KEY_STR.charAt(enc1) + this.KEY_STR.charAt(enc2) + this.KEY_STR.charAt(enc3) + this.KEY_STR.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
                if (!(i < input.length)) break;
            }
            return output;
        }
        static restore(origFileBase64, resizedFileBase64) {
            if (!origFileBase64.match("data:image/jpeg;base64,")) return resizedFileBase64;
            let rawImage = this.decode64(origFileBase64.replace("data:image/jpeg;base64,", ""));
            let segments = this.slice2Segments(rawImage);
            let image = this.exifManipulation(resizedFileBase64, segments);
            return `data:image/jpeg;base64,${this.encode64(image)}`;
        }
        static exifManipulation(resizedFileBase64, segments) {
            let exifArray = this.getExifArray(segments);
            let newImageArray = this.insertExif(resizedFileBase64, exifArray);
            let aBuffer = new Uint8Array(newImageArray);
            return aBuffer;
        }
        static getExifArray(segments) {
            let seg = undefined;
            let x = 0;
            while(x < segments.length){
                seg = segments[x];
                if (seg[0] === 255 & seg[1] === 225) return seg;
                x++;
            }
            return [];
        }
        static insertExif(resizedFileBase64, exifArray) {
            let imageData = resizedFileBase64.replace("data:image/jpeg;base64,", "");
            let buf = this.decode64(imageData);
            let separatePoint = buf.indexOf(255, 3);
            let mae = buf.slice(0, separatePoint);
            let ato = buf.slice(separatePoint);
            let array = mae;
            array = array.concat(exifArray);
            array = array.concat(ato);
            return array;
        }
        static slice2Segments(rawImageArray) {
            let head = 0;
            let segments = [];
            while(true){
                var length;
                if (rawImageArray[head] === 255 & rawImageArray[head + 1] === 218) break;
                if (rawImageArray[head] === 255 & rawImageArray[head + 1] === 216) head += 2;
                else {
                    length = rawImageArray[head + 2] * 256 + rawImageArray[head + 3];
                    let endPoint = head + length + 2;
                    let seg = rawImageArray.slice(head, endPoint);
                    segments.push(seg);
                    head = endPoint;
                }
                if (head > rawImageArray.length) break;
            }
            return segments;
        }
        static decode64(input) {
            let output = "";
            let chr1 = undefined;
            let chr2 = undefined;
            let chr3 = "";
            let enc1 = undefined;
            let enc2 = undefined;
            let enc3 = undefined;
            let enc4 = "";
            let i = 0;
            let buf = [];
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            let base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) console.warn("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding.");
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while(true){
                enc1 = this.KEY_STR.indexOf(input.charAt(i++));
                enc2 = this.KEY_STR.indexOf(input.charAt(i++));
                enc3 = this.KEY_STR.indexOf(input.charAt(i++));
                enc4 = this.KEY_STR.indexOf(input.charAt(i++));
                chr1 = enc1 << 2 | enc2 >> 4;
                chr2 = (enc2 & 15) << 4 | enc3 >> 2;
                chr3 = (enc3 & 3) << 6 | enc4;
                buf.push(chr1);
                if (enc3 !== 64) buf.push(chr2);
                if (enc4 !== 64) buf.push(chr3);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
                if (!(i < input.length)) break;
            }
            return buf;
        }
    }
    $3ed269f2f0fb224b$var$ExifRestore.initClass();
    /*
     * contentloaded.js
     *
     * Author: Diego Perini (diego.perini at gmail.com)
     * Summary: cross-browser wrapper for DOMContentLoaded
     * Updated: 20101020
     * License: MIT
     * Version: 1.2
     *
     * URL:
     * http://javascript.nwbox.com/ContentLoaded/
     * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
     */ // @win window reference
    // @fn function reference
    let $3ed269f2f0fb224b$var$contentLoaded = function(win, fn) {
        let done = false;
        let top = true;
        let doc = win.document;
        let root = doc.documentElement;
        let add = doc.addEventListener ? "addEventListener" : "attachEvent";
        let rem = doc.addEventListener ? "removeEventListener" : "detachEvent";
        let pre = doc.addEventListener ? "" : "on";
        var init = function(e) {
            if (e.type === "readystatechange" && doc.readyState !== "complete") return;
            (e.type === "load" ? win : doc)[rem](pre + e.type, init, false);
            if (!done && (done = true)) return fn.call(win, e.type || e);
        };
        var poll = function() {
            try {
                root.doScroll("left");
            } catch (e) {
                setTimeout(poll, 50);
                return;
            }
            return init("poll");
        };
        if (doc.readyState !== "complete") {
            if (doc.createEventObject && root.doScroll) {
                try {
                    top = !win.frameElement;
                } catch (error) {
                }
                if (top) poll();
            }
            doc[add](pre + "DOMContentLoaded", init, false);
            doc[add](pre + "readystatechange", init, false);
            return win[add](pre + "load", init, false);
        }
    };
    function $3ed269f2f0fb224b$var$__guard__(value, transform) {
        return typeof value !== "undefined" && value !== null ? transform(value) : undefined;
    }
    function $3ed269f2f0fb224b$var$__guardMethod__(obj, methodName, transform) {
        if (typeof obj !== "undefined" && obj !== null && typeof obj[methodName] === "function") return transform(obj, methodName);
        else return undefined;
    }
    
    
    
    //# sourceMappingURL=dropzone.mjs.map
    
    // EXTERNAL MODULE: ./node_modules/jquery-datepicker/jquery-datepicker.js
    var jquery_datepicker = __webpack_require__(4850);
    var jquery_datepicker_default = /*#__PURE__*/__webpack_require__.n(jquery_datepicker);
    // EXTERNAL MODULE: ./node_modules/jquery-validation/dist/jquery.validate.js
    var jquery_validate = __webpack_require__(3587);
    // EXTERNAL MODULE: ./node_modules/magnific-popup/dist/jquery.magnific-popup.js
    var jquery_magnific_popup = __webpack_require__(7729);
    ;// CONCATENATED MODULE: ./assets/website/js/components/main.js
    
    
    
    
    
    
    
    jquery_datepicker_default()((jquery_default()));
    var main_Microlife = window.Microlife || {};
    var NAV_HEIGHT = 71;
    var MONTH_NAMES = {
      short: {
        de: ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.'],
        en: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
      },
      long: {
        de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      }
    };
    var DAY_NAMES = {
      short: {
        de: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
      },
      long: {
        de: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
        en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      }
    };
    main_Microlife.Main = function ($) {
      "use strict";
    
      return {
        init: function () {
          this.handleDataHrefLinks();
          this.headerScrolling();
          this.toggleMobileMenuAndSearch();
          this.stickyFooter();
          this.toggleSubmenuMobile();
          this.selectBox();
          this.inputAnimations();
          this.validateForm();
          this.videoPopups();
          this.initTableScroller();
          // this.linksExternalNewTab();
          this.initDatePicker();
          this.initDropzone();
          // called in master -> $(document).ready();
          // list here all functions, that need to be called at that time
        },
    
        load: function () {
          this.stickyFooter();
          // called in master -> $(window).load();
          // list here all functions, that need to be called at that time
        },
    
        resize: function () {
          this.stickyFooter();
          // called in master -> $(window).resize();
          // list here all functions, that need to be called at that time
        },
    
        handleDataHrefLinks: function () {
          var host = window.location.host;
          $('*[data-href]').on('click', function (e) {
            e.preventDefault();
            var target = $(this).data('href');
            if (target !== '') {
              if (target.indexOf("http") >= 0 && target.indexOf(host) === -1 || target.indexOf("www") >= 0 && target.indexOf(host) === -1) {
                window.open(target);
              } else {
                location.href = target;
              }
            }
          });
        },
        toggleMobileMenuAndSearch: function () {
          var $header = $('.header');
          $('.js-toggle-menu').on('click', function () {
            $header.toggleClass('menu-opened');
          });
          $('.js-header-search').on('click', function () {
            if ($(this).parent().find('input').val() !== '') {
              $(this).parent().find('form').submit();
            } else {
              if (!$header.hasClass('search-opened')) {
                $(this).parent().find('input').focus();
              }
              $header.toggleClass('search-opened');
            }
          });
          $('.search-icon').on('click', function () {
            if ($(this).find('input').val() !== '') {
              $(this).find('form').submit();
            }
          });
        },
        toggleSubmenuMobile: function () {
          var $subnavipoints = $('.js-navigation .with-subnavigation > a');
          var $subnavi = '';
          var $languageChooser = $('.js-toggle-languagechooser');
          var $languageChooserDropdown = $('.js-header-language-chooser');
          if ($subnavipoints.length > 0) {
            $subnavipoints.on('click', function (e) {
              if ($(window).width() < 1120) {
                e.preventDefault();
                $subnavi = $(this).closest('.with-subnavigation').find('.sub-navigation');
                $subnavi.stop().slideToggle(400, function () {
                  $subnavi.toggleClass('active').css('display', '');
                });
                $(this).closest('.with-subnavigation').toggleClass('opened');
              }
            });
          }
          if ($languageChooser.length > 0 && $languageChooserDropdown.length > 0) {
            $languageChooser.on('click', function () {
              $languageChooserDropdown.toggleClass('active');
            });
            $(document).on('click', function (e) {
              var $target = $(e.target);
              if ($target.get(0) !== $languageChooserDropdown.get(0) && $target.closest('.js-header-language-chooser').get(0) !== $languageChooserDropdown.get(0)) {
                $languageChooserDropdown.removeClass('active');
              }
            });
          }
        },
        headerScrolling: function () {
          var $headerHider = $('.js-header-hider');
          var offset = 70;
          if ($headerHider.length > 0) {
            offset = 270;
          }
          var header = $('.js-header');
          var headroom = new (headroom_default())(header[0]);
          headroom.init();
        },
        stickyFooter: function () {
          var height = $('.js-footer').outerHeight();
          $('.js-footer-pusher').height(height);
          $('.js-sticky-footer').css('margin-bottom', -height);
        },
        initProductSavings: function () {
          var $productSavingChangers = $('.js-change-product-savings li');
          var $productSavingSlider = $('.js-product-saving-sliders');
          var type = 0;
          var savingSliderCenter = 0;
          var windowBottom = 0;
          if ($productSavingSlider.length > 0) {
            $(window).on('load scroll', function () {
              windowBottom = $(window).scrollTop() + $(window).height();
              savingSliderCenter = $productSavingSlider.offset().top + $productSavingSlider.height() / 2;
              if (windowBottom > savingSliderCenter) {
                $productSavingSlider.removeClass('not-in-view');
              } else {
                $productSavingSlider.addClass('not-in-view');
              }
            });
          }
          if ($productSavingChangers.length > 0) {
            $productSavingChangers.on('click', function () {
              type = $(this).data('type');
              $('.product-savings-article').removeClass('active');
              $('.product-savings-article[data-type="' + type + '"]').addClass('active');
              $('.js-product-saving-slider').removeClass('active');
              $('.js-product-saving-slider[data-type="' + type + '"]').addClass('active');
              $('.js-change-product-savings li').removeClass('active');
              $(this).addClass('active');
            });
          }
        },
        selectBox: function () {
          $('.js-select-link').on('change', function () {
            var target = $(this).val();
            if (target !== '') {
              window.location.href = target;
            }
          });
        },
        submitOverviewForm: function () {
          var $form = $('.js-overview-form'),
            $submitters = $('.js-submit-form'),
            $viewChanger = $('.js-change-view'),
            $typesInput = $('.js-type-input'),
            $viewType = $('.js-view-type'),
            types;
          $submitters.on('change', function () {
            $form.submit();
          });
          $viewChanger.on('click', function () {
            if ($(this).hasClass('js-grid-icon') || $(this).hasClass('icon-Grid')) {
              $viewType.attr('disabled', true);
            } else {
              $viewType.attr('disabled', false);
            }
            $form.submit();
          });
          $form.submit(function () {
            types = '';
            $submitters.each(function (index) {
              if ($(this).val() !== '') {
                if (index !== 0 && types !== '') {
                  types += ',';
                }
                types += $(this).val();
              }
              $(this).attr('disabled', true);
            });
            $typesInput.val(types);
            if (types === '') {
              $typesInput.attr('disabled', true);
            }
          });
        },
        productFinderInit: function () {
          var $questionBlocks = $('.js-finder-block'),
            $answerBlocks = $('.js-finder-answers'),
            $answers = $('.js-finder-answer'),
            $questions = $('.js-finder-question'),
            $evaluate = $('.js-evaluate'),
            $results = $('.js-finder-results'),
            $loading = $('.js-loader'),
            $nextElement,
            dataindex,
            href,
            internal,
            evaluateUrl;
          function hideSameOrLowerQuestions(index) {
            $questionBlocks.each(function () {
              if ($(this).data('index') > index) {
                $(this).find('.js-finder-answers').stop().slideUp();
                $(this).find('.js-finder-answer').removeClass('active');
                $(this).stop().fadeOut();
              }
            });
            $evaluate.stop().fadeOut();
            $results.stop().fadeOut();
          }
          $answers.on('click', function () {
            $(this).closest('.js-finder-answers').find('.js-finder-answer').removeClass('active');
            $(this).addClass('active');
            $nextElement = $($(this).data('next'));
            if ($nextElement.length > 0) {
              dataindex = $(this).closest('.js-finder-block').data('index');
              hideSameOrLowerQuestions(dataindex);
              if ($(this).data('result') !== '') {
                $nextElement.attr('data-internal', $(this).data('result'));
              }
              if ($nextElement.attr('id') === 'evaluate') {
                $nextElement.stop().fadeIn().css('display', 'inline-block');
              } else {
                $nextElement.stop().fadeIn();
              }
              $(this).closest('.js-finder-answers').stop().slideUp();
              $nextElement.find('.js-finder-answers').stop().slideDown(400, 'linear', function () {
                $nextElement.addClass('active-block');
              });
            }
          });
          $questions.on('click', function () {
            $answerBlocks.stop().slideUp();
            $(this).next('.js-finder-answers').stop().slideDown();
          });
          $evaluate.on('click', function (e) {
            e.preventDefault();
            href = $evaluate.attr('href');
            internal = $evaluate.attr('data-internal');
            evaluateUrl = href + '&internals=' + internal;
            $evaluate.stop().fadeOut('100', function () {
              $loading.stop().slideDown('100', function () {
                $.ajax({
                  url: evaluateUrl
                }).done(function (data) {
                  $results.html(data);
                  $loading.stop().slideUp();
                  $results.stop().fadeIn();
                  main_Microlife.Main.handleDataHrefLinks();
                });
              });
            });
          });
        },
        inputAnimations: function () {
          var $inputs = $('.js-input-animation');
          if ($inputs.length > 0) {
            main_Microlife.Main.checkEmptyInputs($inputs);
            $inputs.on('change input', function () {
              main_Microlife.Main.checkEmptyInputs($inputs);
            });
          }
        },
        checkEmptyInputs: function ($inputs) {
          var inputFilledClass = 'input-filled';
          $inputs.each(function () {
            var $input = $(this).find('input');
            var $textarea = $(this).find('textarea');
            if ($input.length > 0) {
              if ($input.val() !== '') {
                $(this).addClass(inputFilledClass);
              } else {
                $(this).removeClass(inputFilledClass);
              }
            }
            if ($textarea.length > 0) {
              if ($textarea.val() !== '') {
                $(this).addClass(inputFilledClass);
              } else {
                $(this).removeClass(inputFilledClass);
              }
            }
          });
        },
        /* Todo: Remove this validation after static form is removed. */
        validateForm: function () {
          var $forms = $('.js-validate-form');
          if ($forms.length > 0) {
            // Dont ignore hidden fields.
            $.validator.setDefaults({
              ignore: []
            });
            $forms.validate({
              highlight: function (element, errorClass, validClass) {
                $(element).addClass(errorClass).removeClass(validClass);
                $(element).closest('.input-container').addClass(errorClass).removeClass(validClass);
                $(element).closest('.input-container').find('label[for="' + element.id + '"]').addClass('error-label');
                main_Microlife.Main.checkAmericaSelectbox();
              },
              unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass(errorClass).addClass(validClass);
                $(element).closest('.input-container').removeClass(errorClass).addClass(validClass);
                $(element).closest('.input-container').find('label[for="' + element.id + '"]').removeClass('error-label');
                main_Microlife.Main.checkAmericaSelectbox();
              },
              errorPlacement: function () {
                // Do not place error labels.
              },
              invalidHandler: function (form, validator) {
                this.checkReCaptcha();
              }.bind(this),
              submitHandler: function (form) {
                if (main_Microlife.Main.checkAmericaSelectbox()) {
                  if (!main_Microlife.Main.checkReCaptcha()) {
                    return false;
                  }
                  form.submit();
                }
              }
            });
          }
        },
        /**
         * Validate form.
         */
        formValidation: function () {
          var $forms = $('.js-form-wrapper').find('form');
          var submitButton = $forms.find('.js-submit');
          if (0 === $forms.length) {
            return;
          }
          if (this.dropzones.length) {
            submitButton.on('click', this.dropzoneRequiredEmpty.bind(this));
          }
          $forms.validate({
            debug: false,
            ignore: '[readonly]:not(.js-datepicker)',
            errorPlacement: function () {
              // Hide default text errors.
            },
            highlight: function (element, errorClass) {
              $(element).closest('.form-item').addClass('error');
            },
            unhighlight: function (element, errorClass) {
              $(element).closest('.form-item').removeClass('error');
            },
            invalidHandler: function (form, validator) {
              if (!validator.numberOfInvalids()) {
                return;
              }
              this.checkReCaptcha();
              $('html, body').animate({
                scrollTop: $(validator.errorList[0].element).closest('.form-item').offset().top - NAV_HEIGHT - 20
              }, 400);
            }.bind(this),
            submitHandler: function (form) {
              // Disable button.
              $forms.find('[type=submit]').prop('disabled', true);
              this.submit(form);
            }.bind(this)
          });
        },
        /**
         * Handles the submit event of form.
         *
         * @param {Object} form
         *
         * @returns {Boolean}
         */
        submit: function (form) {
          if (this.dropzoneRequiredEmpty()) {
            return false;
          }
          if (!this.checkReCaptcha()) {
            return false;
          }
          if (!this.dropzoneHasFiles()) {
            // Default form submit.
            form.submit();
            return true;
          }
    
          // Do submit for first dropzone with files.
          this.submitDropzones();
        },
        /**
         * Checks if dropzone is required and empty and add style class.
         *
         * @return {boolean}
         */
        dropzoneRequiredEmpty: function () {
          // Has dropzones.
          if (!this.dropzones.length) {
            return false;
          }
          for (var i = 0, length = this.dropzones.length; i < length; i++) {
            if ($(this.dropzones[i].element).hasClass('is-required') && !this.dropzones[i].getQueuedFiles().length) {
              $(this.dropzones[i].element).closest('.js-form-item').addClass('error');
              return true;
            }
          }
        },
        /**
         * Checks if dropzone has files.
         *
         * @return {boolean}
         */
        dropzoneHasFiles: function () {
          // Has dropzones.
          if (!this.dropzones.length) {
            return false;
          }
    
          // Has files in dropzone.
          for (var i = 0, length = this.dropzones.length; i < length; i++) {
            if (this.dropzones[i].getQueuedFiles().length) {
              return true;
            }
          }
        },
        /**
         * Upload dropzone files and submit the form afterwards.
         */
        submitDropzones: function () {
          for (var i = 0, length = this.dropzones.length; i < length; i++) {
            if (this.dropzones[i].getQueuedFiles().length) {
              this.dropzones[i].processQueue();
              break;
            }
          }
        },
        /**
         * Check if recaptcha is checked.
         *
         * @return {Boolean}
         */
        checkReCaptcha: function () {
          var valid = false;
          var $forms = $('.js-form-wrapper').find('form');
          var formData = $forms.serializeArray();
          var $formRecaptcha = $forms.find('.g-recaptcha');
          if (!$formRecaptcha.length) {
            return true;
          }
          for (var i = 0; i < formData.length; i++) {
            var data = formData[i];
            if ('g-recaptcha-response' === data.name) {
              if ('' !== data.value) {
                valid = true;
              }
            }
          }
          if (valid) {
            $formRecaptcha.parent().removeClass('error');
          } else {
            $formRecaptcha.parent().addClass('error');
            $forms.find('[type=submit]').prop('disabled', false);
          }
          return valid;
        },
        checkAmericaSelectbox: function () {
          var $countrySelectbox = $('.js-country-selectbox');
          var $americaSelectbox = $('.js-america-selectbox');
          var inputContainer = $americaSelectbox.closest('.input-container');
          var validClass = 'valid';
          var errorClass = 'error';
          if ($countrySelectbox.val() === 'sus') {
            if ($americaSelectbox.val() !== '') {
              inputContainer.removeClass(errorClass).addClass(validClass);
              return true;
            } else {
              inputContainer.addClass(errorClass).removeClass(validClass);
              return false;
            }
          } else {
            inputContainer.removeClass(errorClass).addClass(validClass);
            return true;
          }
        },
        videoPopups: function () {
          var $videoPopups = $('.js-video-overlay');
          if ($videoPopups.length > 0) {
            $videoPopups.magnificPopup({
              type: 'iframe',
              preloader: false
            });
          }
        },
        supportOverviewInit: function () {
          var $resultContainer = $('.js-support-result-container');
          if ($resultContainer.length > 0) {
            $resultContainer.slideDown(800);
            $('html, body').animate({
              'scrollTop': $resultContainer.offset().top
            }, 800);
          }
          $('.js-submit-form').on('click', function () {
            $(this).closest('form').submit();
          });
        },
        compareHeightsInit: function () {
          var $descriptions = $('.js-compare-description, .js-bar-description'),
            height = 0;
          if ($descriptions.length > 0) {
            $descriptions.each(function () {
              if (height < $(this).height()) {
                height = $(this).height();
              }
            });
            $descriptions.height(height);
          }
        },
        initTableScroller: function () {
          var $tableShadows = $('.js-table-shadows');
          var $tableScroller = $('.js-table-shadows .table-scroller');
          var $table = $('.js-table-shadows .table-scroller table');
          function renderShadows() {
            if ($table.width() > $tableScroller.width()) {
              $tableShadows.addClass('shadow-right shadow-left');
              if ($tableScroller.scrollLeft() < 20) {
                $tableShadows.removeClass('shadow-left');
              }
              if ($tableScroller.scrollLeft() + $tableScroller.width() >= $table.width() - 20) {
                $tableShadows.removeClass('shadow-right');
              }
            } else {
              $tableShadows.removeClass('shadow-right shadow-left');
            }
          }
          if ($tableShadows.length > 0 && $tableScroller.length > 0 && $table.length > 0) {
            $(window).on('load resize', function () {
              renderShadows();
            });
            $tableScroller.on('scroll', function () {
              renderShadows();
            });
          }
        },
        linksExternalNewTab: function () {
          var origin = window.location.origin;
          $('a').each(function () {
            var linkValue = $(this).attr('href');
            if (undefined !== linkValue) {
              var startsWith = 0 === linkValue.indexOf(origin);
              if (!(linkValue.indexOf(origin.toString()) > -1 && startsWith)) {
                // Add target blank to link when it is not of the same origin.
                $(this).attr('target', '_blank');
              }
            }
          });
        },
        /**
         * Initialize jquery date picker.
         */
        initDatePicker: function () {
          var $datepickerElement = $('.js-datepicker');
          if (0 === $datepickerElement.length) {
            return;
          }
          var date = new Date();
          var locale = $('#form').data('locale');
          var translationLocale = 'de' === locale ? 'de' : 'en';
          jqueryDatepicker($);
          var $currentDate = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
          };
          $datepickerElement.datepicker({
            nextText: '',
            prevText: '',
            firstDay: 1,
            monthNames: MONTH_NAMES.long[translationLocale],
            monthNamesShort: MONTH_NAMES.short[translationLocale],
            dayNames: DAY_NAMES.long[translationLocale],
            dayNamesShort: DAY_NAMES.short[translationLocale],
            dayNamesMin: DAY_NAMES.short[translationLocale],
            onChangeMonthYear: function () {
              this.deactivatePastDates($currentDate);
            }.bind(this),
            beforeShow: function () {
              this.deactivatePastDates($currentDate);
            }.bind(this)
          });
        },
        /**
         * Adds class to dates in the past.
         *
         * @param {Object} currentDate
         */
        deactivatePastDates: function (currentDate) {
          window.setTimeout(function () {
            var $dates = $(document).find('.ui-datepicker-calendar td:visible');
    
            // If no dates are available, we were too fast and need to try it again.
            if (!$dates.length) {
              this.deactivatePastDates(currentDate);
              return;
            }
            $dates.each(function (index, element) {
              var $el = $(element);
              var elYear = parseInt($el.data('year'));
              var elMonth = parseInt($el.data('month')) + 1;
              var elDay = parseInt($el.text());
              if (elMonth < currentDate.month && elYear <= currentDate.year || elMonth === currentDate.month && elDay < currentDate.day && elYear <= currentDate.year) {
                $el.attr('class', 'ui-state-disabled');
              }
            });
          }.bind(this), 1);
        },
        /**
         * Initialized Dropzone.
         */
        initDropzone: function () {
          var dropzones = [];
          $3ed269f2f0fb224b$export$2e2bcd8739ae039.autoDiscover = false;
          this.$form = $('.js-form-wrapper').find('form');
    
          // Create dropzones.
          $('.js-upload-files').each(function (index, el) {
            var $dropzone = $(el);
    
            // Need to slice [] because its added by dropzone.
            var paramName = $dropzone.data('name');
            paramName = paramName.substr(0, paramName.length - 2);
    
            // Add new dropzone.
            dropzones.push(this.createDropzone($dropzone.attr('id'), paramName, $dropzone.data('max'), $dropzone.data('accept')));
          }.bind(this));
          this.dropzones = dropzones;
        },
        /**
         * Creates a dropzone with the given params.
         *
         * @param {String} id
         * @param {String} paramName
         * @param {Number} maxFiles
         * @param {Boolean} accept
         *
         * @return {Dropzone}
         */
        createDropzone: function (id, paramName, maxFiles, accept) {
          var self = this;
          var url = this.$form.attr('action');
          if (!url) {
            url = window.location.href;
          }
    
          // Create new dropzone.
          return new $3ed269f2f0fb224b$export$2e2bcd8739ae039('#' + id, {
            paramName: paramName,
            url: url,
            autoProcessQueue: false,
            uploadMultiple: true,
            parallelUploads: maxFiles,
            maxFiles: maxFiles,
            maxFilesize: 5,
            // Max. 5 MB.
            acceptedFiles: accept,
            clickable: ['#' + id],
            previewTemplate: ['<div class="form-files-preview">', '    <i class="form-files-close" data-dz-remove></i>', '    <span class="form-files-preview-title">', '        <span data-dz-name></span>', '    </span>', '    <span class="form-files-preview-size">', '        <span data-dz-size></span>', '    </span>', '    <div class="form-files-preview-error"><span data-dz-errormessage></span></div>', '</div>'].join(''),
            init: function () {
              this.on('sendingmultiple', self.sendingDropzone.bind(self));
              this.on('successmultiple', self.successDropzone.bind(self));
              this.on('errormultiple', self.errorDropzone.bind(self));
              this.on('addedfile', self.showOrHideIcon.bind(self));
              this.on('removedfile', self.showOrHideIcon.bind(self));
            }
          });
        },
        /**
         * Create dropzone with the given params.
         *
         * @param {Object} data
         * @param {Object} xhr
         * @param {Object} formData
         */
        sendingDropzone: function (data, xhr, formData) {
          // Disable all submit buttons in form.
          this.$form.find('[type=submit]').prop('disabled', true);
    
          // Add fields to form data.
          $.each(this.$form.serializeArray(), function (index, item) {
            formData.append(item.name, item.value);
          });
    
          // Add other dropzone files.
          for (var i = 0, length = this.dropzones.length; i < length; i++) {
            var files = this.dropzones[i].getQueuedFiles();
    
            // Append files only if it's not the same dropzone.
            if (files.length && files[0].name !== data[0].name) {
              for (var x = 0, fileLength = files.length; x < fileLength; x++) {
                formData.append(this.dropzones[i]._getParamName(x),
                // eslint-disable-line no-underscore-dangle
                files[x], files[x].name);
              }
            }
          }
        },
        /**
         * Called after all dropzones have been sent successfully.
         *
         * @param {Object} file
         * @param {Object} response
         */
        successDropzone: function (file, response) {
          var $newForm = $(response).find('#' + this.id);
    
          // On success no form is displayed we can redirect to.
          if (!$newForm.length) {
            window.location.href = '?send=true';
            return;
          }
    
          // Destroy dropzones on form error to keep files.
          this.destroyDropzones();
    
          // Replace form with.
          this.$form.html($newForm.html());
    
          // Reinitialize dropzones.
          this.initDropzone();
        },
        /**
         * Destroys each dropzone in the form.
         */
        destroyDropzones: function () {
          for (var i = 0, length = this.dropzones.length; i < length; i++) {
            this.dropzones[i].destroy();
          }
        },
        /**
         * Called when a dropzone has an error.
         */
        errorDropzone: function () {
          // Enable submit buttons.
          this.$form.find('[type=submit]').prop('disabled', false);
        },
        /**
         * Show or hide icon depending if there are files or not.
         */
        showOrHideIcon: function () {
          var $icon = this.$form.find('.js-files-icon');
          var $dropzoneFormItem = $('.js-upload-files').closest('.js-form-item');
          $icon.removeClass('is-hidden');
          $dropzoneFormItem.removeClass('is-focused');
    
          // Hide icon if there are no files.
          for (var i = 0, length = this.dropzones.length; i < length; i++) {
            $(this.dropzones[i].element).closest('.form-item').removeClass('error');
            if (0 < this.dropzones[i].files.length) {
              $(this.dropzones[i].element).find('.js-files-icon').addClass('is-hidden');
              $(this.dropzones[i].element).closest('.js-form-item').addClass('is-focused');
            }
          }
        },
        /**
         * Handles the focus on input and selectboxit items of the form.
         */
        formFocus: function () {
          var $form = $('.js-form-wrapper').find('form');
          var $inputFields = $form.find(':input');
          var selectBoxs = $form.find('.js-selectboxit');
          $inputFields.on('focusin', this.addFocusClass.bind(this));
          $inputFields.on('focusout', this.removeFocusClass.bind(this));
          selectBoxs.on('focus', this.addFocusClass.bind(this));
          selectBoxs.on('focusout', this.removeFocusClass.bind(this));
        },
        /**
         * Add class to style focus.
         *
         * @param {Object} event
         */
        addFocusClass: function (event) {
          var $element = $(event.currentTarget);
          var $formItem = $element.closest('.js-form-item');
          $formItem.addClass('is-focused');
        },
        /**
         * Remove class from focused item.
         *
         * @param {Object} event
         */
        removeFocusClass: function (event) {
          var $element = $(event.currentTarget);
          var $formItem = $element.closest('.js-form-item');
          $formItem.removeClass('is-focused');
        }
      };
    }((jquery_default()));
    window.Microlife = main_Microlife;
    // EXTERNAL MODULE: ./node_modules/slick-carousel/slick/slick.js
    var slick = __webpack_require__(9154);
    ;// CONCATENATED MODULE: ./assets/website/js/components/slider.js
    
    
    var slider_Microlife = window.Microlife || {};
    slider_Microlife.Slider = function ($) {
      "use strict";
    
      var iphone = 700,
        ipadp = 800;
      return {
        init: function () {
          // called in master -> $(document).ready();
          // list here all functions, that need to be called at that time
        },
        load: function () {
          // called in master -> $(window).load();
          // list here all functions, that need to be called at that time
        },
        resize: function () {
          // called in master -> $(window).resize();
          // list here all functions, that need to be called at that time
        },
        initNewsSlider: function () {
          var $newsSlider = $('.js-news-slider');
          if ($newsSlider.length > 0) {
            $newsSlider.slick({
              infinite: false,
              arrows: false,
              dots: true,
              variableWidth: true,
              responsive: [{
                breakpoint: iphone,
                settings: {
                  variableWidth: false,
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }]
            });
          }
        },
        initSavingsSlider: function () {
          var $savingSlider = $('.js-product-saving-slider');
          if ($savingSlider.length > 0) {
            $savingSlider.slick({
              infinite: true,
              arrows: true,
              dots: true,
              slidesToShow: 4,
              slidesToScroll: 1,
              responsive: [{
                breakpoint: ipadp,
                settings: {
                  slidesToShow: 3
                }
              }, {
                breakpoint: iphone,
                settings: {
                  slidesToShow: 2
                }
              }]
            });
          }
        },
        initGallerySlider: function () {
          var $gallerySlider = $('.js-gallery-slider');
          if ($gallerySlider.length > 0) {
            $gallerySlider.slick({
              arrows: true,
              slidesToShow: 1,
              slidesToScroll: 1
            });
          }
        }
      };
    }((jquery_default()));
    window.Microlife = slider_Microlife;
    ;// CONCATENATED MODULE: ./assets/website/js/components/store-locator.js
    
    var store_locator_Microlife = window.Microlife || {};
    store_locator_Microlife.StoreLocator = function ($) {
      "use strict";
    
      return {
        init: function () {
          this.initSearch();
          this.initGoogleMap();
          this.showActiveElement();
          this.initShadow();
        },
        /**
         * Initialize shadow if scrolling is possible for accounts.
         */
        initShadow: function () {
          this.$divAccounts = $('.js-store-locator-accounts');
          this.$divAccountsInner = $('.js-store-locator-accounts-inner');
          this.$divShadowBottom = $('.js-store-locator-accounts-shadow-bottom');
          this.$divShadowTop = $('.js-store-locator-accounts-shadow-top');
          if (this.$divAccountsInner.height() < this.$divAccounts.height()) {
            this.$divShadowBottom.hide();
            this.$divShadowTop.hide();
          }
          this.$divAccounts.on('scroll', this.showShadow.bind(this));
        },
        /**
         * Hides or shows a shadow for accounts by scrolling.
         */
        showShadow: function () {
          this.$divShadowBottom.show();
          this.$divShadowTop.show();
    
          /* Start of Table */
          if (0 === this.$divAccounts.scrollTop()) {
            this.$divShadowTop.hide();
          }
    
          /* End of Table */
          if (this.$divAccountsInner.height() <= this.$divAccounts.scrollTop() + this.$divAccounts.height()) {
            this.$divShadowBottom.hide();
          }
        },
        /**
         * Initialize store locator search.
         */
        initSearch: function () {
          var $input = $('.js-store-locator-input');
          var $select = $('.js-store-locator-select');
          var inputValue = '';
          var selectValue = 0;
          $input.on('input', function () {
            inputValue = $input.val().toLowerCase().trim();
            this.filterAccounts(inputValue, selectValue);
            this.updateMap();
          }.bind(this));
          $select.on('change', function () {
            selectValue = $select.val();
    
            // This is to get the correct value of the selectbox on mobile devices.
            if ('' === selectValue) {
              selectValue = $('select.js-store-locator-select').val();
            }
            selectValue = parseInt(selectValue);
            this.filterAccounts(inputValue, selectValue);
            this.updateMap();
          }.bind(this));
        },
        /**
         * Hides or shows accounts by given filters.
         *
         * @param {string} inputValue
         * @param {int} selectValue
         */
        filterAccounts: function (inputValue, selectValue) {
          var $accounts = $('.js-account');
          var allHidden = true;
          var $message = $('.js-message');
          var $map = $('.js-store-locator-map');
          $message.hide();
          $map.show();
          $accounts.each(function (index, element) {
            var $element = $(element);
            var $address = $element.find('.js-address').text();
            var categories = $element.data('categories');
            if ('' !== $address) {
              $address = $address.toLowerCase();
            }
            $element.hide();
            $element.addClass('is-hidden');
            if (('' === inputValue || 0 <= $address.indexOf(inputValue)) && (0 === selectValue || categories.includes(selectValue))) {
              allHidden = false;
              $element.show();
              $element.removeClass('is-hidden');
            }
          });
          if (true === allHidden) {
            $message.show();
            $map.hide();
          }
        },
        /**
         * Appends google maps script.
         */
        initGoogleMap: function () {
          this.locations = {};
          this.markers = {};
          this.$window = $(window);
          this.coordinates = [];
          if (window.google && window.google.maps) {
            return this.onGMapsLoadedCallback.bind(this);
          }
          var script = document.createElement('script');
          var $accounts = $('.js-account');
          $accounts.each(function (index, element) {
            var $element = $(element);
            var id = $element.data('id');
            var coordinates = $element.data('coordinates');
            this.coordinates[id] = coordinates;
          }.bind(this));
          window.onGMapsLoadedCallback = this.onGMapsLoadedCallback.bind(this);
          script.type = 'text/javascript';
          script.src = 'https://maps.googleapis.com/maps/api/js?key=' + window.gMapsApiKey + '&callback=onGMapsLoadedCallback';
          $('body').append(script);
        },
        /**
         * Initialize google map.
         */
        onGMapsLoadedCallback: function () {
          var element = $('.js-store-locator-map').get(0);
          this.map = new window.google.maps.Map(element, {
            zoom: 15,
            maxZoom: 16,
            mapTypeControl: false,
            fullscreenControl: false
          });
          this.appendMarkers();
        },
        /**
         * Set google map markers.
         */
        appendMarkers: function () {
          this.bounds = new window.google.maps.LatLngBounds();
          this.coordinates.forEach(function (value, index) {
            var lat = value.split(',')[0];
            var long = value.split(',')[1];
            var icon = {
              url: '/img/images/pin.svg',
              scaledSize: new window.google.maps.Size(28, 36)
            };
            var marker = new window.google.maps.Marker({
              position: new window.google.maps.LatLng(lat, long),
              map: this.map,
              icon: icon
            });
            this.bounds.extend(marker.position);
            this.markers[index] = marker;
            marker.addListener('click', function () {
              var $account = $('.js-account[data-id="' + index + '"]');
              if ($account.hasClass('clicked')) {
                $account.removeClass('clicked');
                this.map.fitBounds(this.bounds);
              } else {
                this.centerMarker(index);
                $('.js-account').removeClass('clicked');
                $account.addClass('clicked');
              }
            }.bind(this));
          }.bind(this));
          this.map.fitBounds(this.bounds);
        },
        /**
         * Center map on given marker id.
         *
         * @param {number} id
         */
        centerMarker: function (id) {
          this.map.panTo(this.markers[id].position);
          setTimeout(function () {
            this.zoomAnimation(16, this.map.getZoom(), this);
          }.bind(this), 100);
        },
        /**
         * Handles the zoom animation.
         *
         * @param {number} maxZoom
         * @param {number} currentZoom
         */
        zoomAnimation: function (maxZoom, currentZoom) {
          if (currentZoom >= maxZoom) {
            return;
          }
          setTimeout(function () {
            this.map.setZoom(currentZoom);
            this.zoomAnimation(maxZoom, currentZoom + 1);
          }.bind(this), 80);
        },
        /**
         * Updates map after filter.
         */
        updateMap: function () {
          var $accounts = $('.js-account');
          var markersFound = false;
          this.bounds = new window.google.maps.LatLngBounds();
          for (var key in this.markers) {
            this.markers[key].setMap(null);
          }
          $accounts.each(function (index, element) {
            var $element = $(element);
            if (!$element.hasClass('is-hidden')) {
              var $marker = this.markers[$element.data('id')];
              markersFound = true;
              $marker.setMap(this.map);
              this.bounds.extend($marker.position);
            }
          }.bind(this));
          if (markersFound) {
            this.map.fitBounds(this.bounds);
          }
        },
        /**
         * Change active element of store-locator-account.
         */
        showActiveElement: function () {
          $('.js-account').on('click', function (event) {
            $('.js-store-locator-map')[0].scrollIntoView({
              block: 'end',
              behavior: 'smooth'
            });
            var $currentTarget = $(event.currentTarget);
            var accountId = $currentTarget.data('id');
            if ($currentTarget.hasClass('clicked')) {
              $currentTarget.removeClass('clicked');
              this.map.fitBounds(this.bounds);
              return;
            }
            $('.js-account').removeClass('clicked');
            $currentTarget.addClass('clicked');
            this.centerMarker(accountId);
          }.bind(this));
        }
      };
    }((jquery_default()));
    window.Microlife = store_locator_Microlife;
    ;// CONCATENATED MODULE: ./assets/website/js/components/tracking.js
    
    var tracking_Microlife = window.Microlife || {};
    var ga = ga || {};
    tracking_Microlife.Tracking = function ($) {
      "use strict";
    
      return {
        init: function () {
          this.initDownloadTracking();
        },
        initDownloadTracking: function () {
          var $downloads = $('.tracking-download');
          $downloads.on('click', function () {
            var DownloadPage = $(this).data('page');
            var Filename = $(this).data('download');
            if (ga !== undefined) {
              ga('send', 'event', 'Download', 'Download - Click - ' + DownloadPage, Filename);
            }
          });
        }
      };
    }((jquery_default()));
    window.Microlife = tracking_Microlife;
    ;// CONCATENATED MODULE: ./assets/website/js/main.js
    /* provided dependency */ var __webpack_provided_window_dot_jQuery = __webpack_require__(9755);
    
    
    
    // Create global $ and jQuery variables.
    window.$ = __webpack_provided_window_dot_jQuery = (jquery_default());
    
    
    
    
    
    
    
    }();
    /******/ })()
    ;