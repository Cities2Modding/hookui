var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "node_modules/react/cjs/react.development.js"(exports, module) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var ReactVersion = "18.2.0";
        var REACT_ELEMENT_TYPE = Symbol.for("react.element");
        var REACT_PORTAL_TYPE = Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = Symbol.for("react.context");
        var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = Symbol.for("react.memo");
        var REACT_LAZY_TYPE = Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
        var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        var ReactCurrentDispatcher = {
          /**
           * @internal
           * @type {ReactComponent}
           */
          current: null
        };
        var ReactCurrentBatchConfig = {
          transition: null
        };
        var ReactCurrentActQueue = {
          current: null,
          // Used to reproduce behavior of `batchedUpdates` in legacy mode.
          isBatchingLegacy: false,
          didScheduleLegacyUpdate: false
        };
        var ReactCurrentOwner = {
          /**
           * @internal
           * @type {ReactComponent}
           */
          current: null
        };
        var ReactDebugCurrentFrame = {};
        var currentExtraStackFrame = null;
        function setExtraStackFrame(stack) {
          {
            currentExtraStackFrame = stack;
          }
        }
        {
          ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
            {
              currentExtraStackFrame = stack;
            }
          };
          ReactDebugCurrentFrame.getCurrentStack = null;
          ReactDebugCurrentFrame.getStackAddendum = function() {
            var stack = "";
            if (currentExtraStackFrame) {
              stack += currentExtraStackFrame;
            }
            var impl = ReactDebugCurrentFrame.getCurrentStack;
            if (impl) {
              stack += impl() || "";
            }
            return stack;
          };
        }
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var ReactSharedInternals = {
          ReactCurrentDispatcher,
          ReactCurrentBatchConfig,
          ReactCurrentOwner
        };
        {
          ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
          ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
        }
        function warn(format) {
          {
            {
              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }
              printWarning("warn", format, args);
            }
          }
        }
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        var didWarnStateUpdateForUnmountedComponent = {};
        function warnNoop(publicInstance, callerName) {
          {
            var _constructor = publicInstance.constructor;
            var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
            var warningKey = componentName + "." + callerName;
            if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
              return;
            }
            error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
            didWarnStateUpdateForUnmountedComponent[warningKey] = true;
          }
        }
        var ReactNoopUpdateQueue = {
          /**
           * Checks whether or not this composite component is mounted.
           * @param {ReactClass} publicInstance The instance we want to test.
           * @return {boolean} True if mounted, false otherwise.
           * @protected
           * @final
           */
          isMounted: function(publicInstance) {
            return false;
          },
          /**
           * Forces an update. This should only be invoked when it is known with
           * certainty that we are **not** in a DOM transaction.
           *
           * You may want to call this when you know that some deeper aspect of the
           * component's state has changed but `setState` was not called.
           *
           * This will not invoke `shouldComponentUpdate`, but it will invoke
           * `componentWillUpdate` and `componentDidUpdate`.
           *
           * @param {ReactClass} publicInstance The instance that should rerender.
           * @param {?function} callback Called after component is updated.
           * @param {?string} callerName name of the calling function in the public API.
           * @internal
           */
          enqueueForceUpdate: function(publicInstance, callback, callerName) {
            warnNoop(publicInstance, "forceUpdate");
          },
          /**
           * Replaces all of the state. Always use this or `setState` to mutate state.
           * You should treat `this.state` as immutable.
           *
           * There is no guarantee that `this.state` will be immediately updated, so
           * accessing `this.state` after calling this method may return the old value.
           *
           * @param {ReactClass} publicInstance The instance that should rerender.
           * @param {object} completeState Next state.
           * @param {?function} callback Called after component is updated.
           * @param {?string} callerName name of the calling function in the public API.
           * @internal
           */
          enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
            warnNoop(publicInstance, "replaceState");
          },
          /**
           * Sets a subset of the state. This only exists because _pendingState is
           * internal. This provides a merging strategy that is not available to deep
           * properties which is confusing. TODO: Expose pendingState or don't use it
           * during the merge.
           *
           * @param {ReactClass} publicInstance The instance that should rerender.
           * @param {object} partialState Next partial state to be merged with state.
           * @param {?function} callback Called after component is updated.
           * @param {?string} Name of the calling function in the public API.
           * @internal
           */
          enqueueSetState: function(publicInstance, partialState, callback, callerName) {
            warnNoop(publicInstance, "setState");
          }
        };
        var assign = Object.assign;
        var emptyObject = {};
        {
          Object.freeze(emptyObject);
        }
        function Component(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        Component.prototype.isReactComponent = {};
        Component.prototype.setState = function(partialState, callback) {
          if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null) {
            throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
          }
          this.updater.enqueueSetState(this, partialState, callback, "setState");
        };
        Component.prototype.forceUpdate = function(callback) {
          this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
        };
        {
          var deprecatedAPIs = {
            isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
            replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
          };
          var defineDeprecationWarning = function(methodName, info) {
            Object.defineProperty(Component.prototype, methodName, {
              get: function() {
                warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
                return void 0;
              }
            });
          };
          for (var fnName in deprecatedAPIs) {
            if (deprecatedAPIs.hasOwnProperty(fnName)) {
              defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
            }
          }
        }
        function ComponentDummy() {
        }
        ComponentDummy.prototype = Component.prototype;
        function PureComponent(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
        pureComponentPrototype.constructor = PureComponent;
        assign(pureComponentPrototype, Component.prototype);
        pureComponentPrototype.isPureReactComponent = true;
        function createRef() {
          var refObject = {
            current: null
          };
          {
            Object.seal(refObject);
          }
          return refObject;
        }
        var isArrayImpl = Array.isArray;
        function isArray(a) {
          return isArrayImpl(a);
        }
        function typeName(value) {
          {
            var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
            var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            return type;
          }
        }
        function willCoercionThrow(value) {
          {
            try {
              testStringCoercion(value);
              return false;
            } catch (e) {
              return true;
            }
          }
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          {
            if (willCoercionThrow(value)) {
              error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
              return testStringCoercion(value);
            }
          }
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var displayName = outerType.displayName;
          if (displayName) {
            return displayName;
          }
          var functionName = innerType.displayName || innerType.name || "";
          return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
        }
        function getContextName(type) {
          return type.displayName || "Context";
        }
        function getComponentNameFromType(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                var outerName = type.displayName || null;
                if (outerName !== null) {
                  return outerName;
                }
                return getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return getComponentNameFromType(init(payload));
                } catch (x) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var RESERVED_PROPS = {
          key: true,
          ref: true,
          __self: true,
          __source: true
        };
        var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
        {
          didWarnAboutStringRefs = {};
        }
        function hasValidRef(config) {
          {
            if (hasOwnProperty.call(config, "ref")) {
              var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.ref !== void 0;
        }
        function hasValidKey(config) {
          {
            if (hasOwnProperty.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.key !== void 0;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          var warnAboutAccessingKey = function() {
            {
              if (!specialPropKeyWarningShown) {
                specialPropKeyWarningShown = true;
                error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function defineRefPropWarningGetter(props, displayName) {
          var warnAboutAccessingRef = function() {
            {
              if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            }
          };
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
        function warnIfStringRefCannotBeAutoConverted(config) {
          {
            if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
              var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (!didWarnAboutStringRefs[componentName]) {
                error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
                didWarnAboutStringRefs[componentName] = true;
              }
            }
          }
        }
        var ReactElement = function(type, key, ref, self, source, owner, props) {
          var element = {
            // This tag allows us to uniquely identify this as a React Element
            $$typeof: REACT_ELEMENT_TYPE,
            // Built-in properties that belong on the element
            type,
            key,
            ref,
            props,
            // Record the component responsible for creating this element.
            _owner: owner
          };
          {
            element._store = {};
            Object.defineProperty(element._store, "validated", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: false
            });
            Object.defineProperty(element, "_self", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: self
            });
            Object.defineProperty(element, "_source", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: source
            });
            if (Object.freeze) {
              Object.freeze(element.props);
              Object.freeze(element);
            }
          }
          return element;
        };
        function createElement(type, config, children) {
          var propName;
          var props = {};
          var key = null;
          var ref = null;
          var self = null;
          var source = null;
          if (config != null) {
            if (hasValidRef(config)) {
              ref = config.ref;
              {
                warnIfStringRefCannotBeAutoConverted(config);
              }
            }
            if (hasValidKey(config)) {
              {
                checkKeyStringCoercion(config.key);
              }
              key = "" + config.key;
            }
            self = config.__self === void 0 ? null : config.__self;
            source = config.__source === void 0 ? null : config.__source;
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
              }
            }
          }
          var childrenLength = arguments.length - 2;
          if (childrenLength === 1) {
            props.children = children;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 2];
            }
            {
              if (Object.freeze) {
                Object.freeze(childArray);
              }
            }
            props.children = childArray;
          }
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps[propName];
              }
            }
          }
          {
            if (key || ref) {
              var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
              if (key) {
                defineKeyPropWarningGetter(props, displayName);
              }
              if (ref) {
                defineRefPropWarningGetter(props, displayName);
              }
            }
          }
          return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
        }
        function cloneAndReplaceKey(oldElement, newKey) {
          var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
          return newElement;
        }
        function cloneElement(element, config, children) {
          if (element === null || element === void 0) {
            throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
          }
          var propName;
          var props = assign({}, element.props);
          var key = element.key;
          var ref = element.ref;
          var self = element._self;
          var source = element._source;
          var owner = element._owner;
          if (config != null) {
            if (hasValidRef(config)) {
              ref = config.ref;
              owner = ReactCurrentOwner.current;
            }
            if (hasValidKey(config)) {
              {
                checkKeyStringCoercion(config.key);
              }
              key = "" + config.key;
            }
            var defaultProps;
            if (element.type && element.type.defaultProps) {
              defaultProps = element.type.defaultProps;
            }
            for (propName in config) {
              if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                if (config[propName] === void 0 && defaultProps !== void 0) {
                  props[propName] = defaultProps[propName];
                } else {
                  props[propName] = config[propName];
                }
              }
            }
          }
          var childrenLength = arguments.length - 2;
          if (childrenLength === 1) {
            props.children = children;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 2];
            }
            props.children = childArray;
          }
          return ReactElement(element.type, key, ref, self, source, owner, props);
        }
        function isValidElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        var SEPARATOR = ".";
        var SUBSEPARATOR = ":";
        function escape(key) {
          var escapeRegex = /[=:]/g;
          var escaperLookup = {
            "=": "=0",
            ":": "=2"
          };
          var escapedString = key.replace(escapeRegex, function(match) {
            return escaperLookup[match];
          });
          return "$" + escapedString;
        }
        var didWarnAboutMaps = false;
        var userProvidedKeyEscapeRegex = /\/+/g;
        function escapeUserProvidedKey(text) {
          return text.replace(userProvidedKeyEscapeRegex, "$&/");
        }
        function getElementKey(element, index) {
          if (typeof element === "object" && element !== null && element.key != null) {
            {
              checkKeyStringCoercion(element.key);
            }
            return escape("" + element.key);
          }
          return index.toString(36);
        }
        function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
          var type = typeof children;
          if (type === "undefined" || type === "boolean") {
            children = null;
          }
          var invokeCallback = false;
          if (children === null) {
            invokeCallback = true;
          } else {
            switch (type) {
              case "string":
              case "number":
                invokeCallback = true;
                break;
              case "object":
                switch (children.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                  case REACT_PORTAL_TYPE:
                    invokeCallback = true;
                }
            }
          }
          if (invokeCallback) {
            var _child = children;
            var mappedChild = callback(_child);
            var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
            if (isArray(mappedChild)) {
              var escapedChildKey = "";
              if (childKey != null) {
                escapedChildKey = escapeUserProvidedKey(childKey) + "/";
              }
              mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
                return c;
              });
            } else if (mappedChild != null) {
              if (isValidElement(mappedChild)) {
                {
                  if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) {
                    checkKeyStringCoercion(mappedChild.key);
                  }
                }
                mappedChild = cloneAndReplaceKey(
                  mappedChild,
                  // Keep both the (mapped) and old keys if they differ, just as
                  // traverseAllChildren used to do for objects as children
                  escapedPrefix + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
                  (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? (
                    // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                    // eslint-disable-next-line react-internal/safe-string-coercion
                    escapeUserProvidedKey("" + mappedChild.key) + "/"
                  ) : "") + childKey
                );
              }
              array.push(mappedChild);
            }
            return 1;
          }
          var child;
          var nextName;
          var subtreeCount = 0;
          var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
          if (isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              child = children[i];
              nextName = nextNamePrefix + getElementKey(child, i);
              subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
            }
          } else {
            var iteratorFn = getIteratorFn(children);
            if (typeof iteratorFn === "function") {
              var iterableChildren = children;
              {
                if (iteratorFn === iterableChildren.entries) {
                  if (!didWarnAboutMaps) {
                    warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                  }
                  didWarnAboutMaps = true;
                }
              }
              var iterator = iteratorFn.call(iterableChildren);
              var step;
              var ii = 0;
              while (!(step = iterator.next()).done) {
                child = step.value;
                nextName = nextNamePrefix + getElementKey(child, ii++);
                subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
              }
            } else if (type === "object") {
              var childrenString = String(children);
              throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
            }
          }
          return subtreeCount;
        }
        function mapChildren(children, func, context) {
          if (children == null) {
            return children;
          }
          var result = [];
          var count = 0;
          mapIntoArray(children, result, "", "", function(child) {
            return func.call(context, child, count++);
          });
          return result;
        }
        function countChildren(children) {
          var n = 0;
          mapChildren(children, function() {
            n++;
          });
          return n;
        }
        function forEachChildren(children, forEachFunc, forEachContext) {
          mapChildren(children, function() {
            forEachFunc.apply(this, arguments);
          }, forEachContext);
        }
        function toArray(children) {
          return mapChildren(children, function(child) {
            return child;
          }) || [];
        }
        function onlyChild(children) {
          if (!isValidElement(children)) {
            throw new Error("React.Children.only expected to receive a single React element child.");
          }
          return children;
        }
        function createContext(defaultValue) {
          var context = {
            $$typeof: REACT_CONTEXT_TYPE,
            // As a workaround to support multiple concurrent renderers, we categorize
            // some renderers as primary and others as secondary. We only expect
            // there to be two concurrent renderers at most: React Native (primary) and
            // Fabric (secondary); React DOM (primary) and React ART (secondary).
            // Secondary renderers store their context values on separate fields.
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            // Used to track how many concurrent renderers this context currently
            // supports within in a single renderer. Such as parallel server rendering.
            _threadCount: 0,
            // These are circular
            Provider: null,
            Consumer: null,
            // Add these to use same hidden class in VM as ServerContext
            _defaultValue: null,
            _globalName: null
          };
          context.Provider = {
            $$typeof: REACT_PROVIDER_TYPE,
            _context: context
          };
          var hasWarnedAboutUsingNestedContextConsumers = false;
          var hasWarnedAboutUsingConsumerProvider = false;
          var hasWarnedAboutDisplayNameOnConsumer = false;
          {
            var Consumer = {
              $$typeof: REACT_CONTEXT_TYPE,
              _context: context
            };
            Object.defineProperties(Consumer, {
              Provider: {
                get: function() {
                  if (!hasWarnedAboutUsingConsumerProvider) {
                    hasWarnedAboutUsingConsumerProvider = true;
                    error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                  }
                  return context.Provider;
                },
                set: function(_Provider) {
                  context.Provider = _Provider;
                }
              },
              _currentValue: {
                get: function() {
                  return context._currentValue;
                },
                set: function(_currentValue) {
                  context._currentValue = _currentValue;
                }
              },
              _currentValue2: {
                get: function() {
                  return context._currentValue2;
                },
                set: function(_currentValue2) {
                  context._currentValue2 = _currentValue2;
                }
              },
              _threadCount: {
                get: function() {
                  return context._threadCount;
                },
                set: function(_threadCount) {
                  context._threadCount = _threadCount;
                }
              },
              Consumer: {
                get: function() {
                  if (!hasWarnedAboutUsingNestedContextConsumers) {
                    hasWarnedAboutUsingNestedContextConsumers = true;
                    error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                  }
                  return context.Consumer;
                }
              },
              displayName: {
                get: function() {
                  return context.displayName;
                },
                set: function(displayName) {
                  if (!hasWarnedAboutDisplayNameOnConsumer) {
                    warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
                    hasWarnedAboutDisplayNameOnConsumer = true;
                  }
                }
              }
            });
            context.Consumer = Consumer;
          }
          {
            context._currentRenderer = null;
            context._currentRenderer2 = null;
          }
          return context;
        }
        var Uninitialized = -1;
        var Pending = 0;
        var Resolved = 1;
        var Rejected = 2;
        function lazyInitializer(payload) {
          if (payload._status === Uninitialized) {
            var ctor = payload._result;
            var thenable = ctor();
            thenable.then(function(moduleObject2) {
              if (payload._status === Pending || payload._status === Uninitialized) {
                var resolved = payload;
                resolved._status = Resolved;
                resolved._result = moduleObject2;
              }
            }, function(error2) {
              if (payload._status === Pending || payload._status === Uninitialized) {
                var rejected = payload;
                rejected._status = Rejected;
                rejected._result = error2;
              }
            });
            if (payload._status === Uninitialized) {
              var pending = payload;
              pending._status = Pending;
              pending._result = thenable;
            }
          }
          if (payload._status === Resolved) {
            var moduleObject = payload._result;
            {
              if (moduleObject === void 0) {
                error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", moduleObject);
              }
            }
            {
              if (!("default" in moduleObject)) {
                error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
              }
            }
            return moduleObject.default;
          } else {
            throw payload._result;
          }
        }
        function lazy(ctor) {
          var payload = {
            // We use these fields to store the result.
            _status: Uninitialized,
            _result: ctor
          };
          var lazyType = {
            $$typeof: REACT_LAZY_TYPE,
            _payload: payload,
            _init: lazyInitializer
          };
          {
            var defaultProps;
            var propTypes;
            Object.defineProperties(lazyType, {
              defaultProps: {
                configurable: true,
                get: function() {
                  return defaultProps;
                },
                set: function(newDefaultProps) {
                  error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                  defaultProps = newDefaultProps;
                  Object.defineProperty(lazyType, "defaultProps", {
                    enumerable: true
                  });
                }
              },
              propTypes: {
                configurable: true,
                get: function() {
                  return propTypes;
                },
                set: function(newPropTypes) {
                  error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                  propTypes = newPropTypes;
                  Object.defineProperty(lazyType, "propTypes", {
                    enumerable: true
                  });
                }
              }
            });
          }
          return lazyType;
        }
        function forwardRef(render) {
          {
            if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
              error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
            } else if (typeof render !== "function") {
              error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
            } else {
              if (render.length !== 0 && render.length !== 2) {
                error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
              }
            }
            if (render != null) {
              if (render.defaultProps != null || render.propTypes != null) {
                error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
              }
            }
          }
          var elementType = {
            $$typeof: REACT_FORWARD_REF_TYPE,
            render
          };
          {
            var ownName;
            Object.defineProperty(elementType, "displayName", {
              enumerable: false,
              configurable: true,
              get: function() {
                return ownName;
              },
              set: function(name) {
                ownName = name;
                if (!render.name && !render.displayName) {
                  render.displayName = name;
                }
              }
            });
          }
          return elementType;
        }
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
        }
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        function memo(type, compare) {
          {
            if (!isValidElementType(type)) {
              error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
            }
          }
          var elementType = {
            $$typeof: REACT_MEMO_TYPE,
            type,
            compare: compare === void 0 ? null : compare
          };
          {
            var ownName;
            Object.defineProperty(elementType, "displayName", {
              enumerable: false,
              configurable: true,
              get: function() {
                return ownName;
              },
              set: function(name) {
                ownName = name;
                if (!type.name && !type.displayName) {
                  type.displayName = name;
                }
              }
            });
          }
          return elementType;
        }
        function resolveDispatcher() {
          var dispatcher = ReactCurrentDispatcher.current;
          {
            if (dispatcher === null) {
              error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
            }
          }
          return dispatcher;
        }
        function useContext(Context) {
          var dispatcher = resolveDispatcher();
          {
            if (Context._context !== void 0) {
              var realContext = Context._context;
              if (realContext.Consumer === Context) {
                error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
              } else if (realContext.Provider === Context) {
                error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
              }
            }
          }
          return dispatcher.useContext(Context);
        }
        function useState(initialState) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useState(initialState);
        }
        function useReducer(reducer, initialArg, init) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useReducer(reducer, initialArg, init);
        }
        function useRef(initialValue) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useRef(initialValue);
        }
        function useEffect(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useEffect(create, deps);
        }
        function useInsertionEffect(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useInsertionEffect(create, deps);
        }
        function useLayoutEffect(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useLayoutEffect(create, deps);
        }
        function useCallback(callback, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useCallback(callback, deps);
        }
        function useMemo(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useMemo(create, deps);
        }
        function useImperativeHandle(ref, create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useImperativeHandle(ref, create, deps);
        }
        function useDebugValue(value, formatterFn) {
          {
            var dispatcher = resolveDispatcher();
            return dispatcher.useDebugValue(value, formatterFn);
          }
        }
        function useTransition() {
          var dispatcher = resolveDispatcher();
          return dispatcher.useTransition();
        }
        function useDeferredValue(value) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useDeferredValue(value);
        }
        function useId() {
          var dispatcher = resolveDispatcher();
          return dispatcher.useId();
        }
        function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
        }
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: assign({}, props, {
                  value: prevLog
                }),
                info: assign({}, props, {
                  value: prevInfo
                }),
                warn: assign({}, props, {
                  value: prevWarn
                }),
                error: assign({}, props, {
                  value: prevError
                }),
                group: assign({}, props, {
                  value: prevGroup
                }),
                groupCollapsed: assign({}, props, {
                  value: prevGroupCollapsed
                }),
                groupEnd: assign({}, props, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix === void 0) {
              try {
                throw Error();
              } catch (x) {
                var match = x.stack.trim().match(/\n( *(at )?)/);
                prefix = match && match[1] || "";
              }
            }
            return "\n" + prefix + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame = componentFrameCache.get(fn);
            if (frame !== void 0) {
              return frame;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher$1.current;
            ReactCurrentDispatcher$1.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x) {
                  control = x;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                control = x;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
              for (; s >= 1 && c >= 0; s--, c--) {
                if (sampleLines[s] !== controlLines[c]) {
                  if (s !== 1 || c !== 1) {
                    do {
                      s--;
                      c--;
                      if (c < 0 || sampleLines[s] !== controlLines[c]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        if (fn.displayName && _frame.includes("<anonymous>")) {
                          _frame = _frame.replace("<anonymous>", fn.displayName);
                        }
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher$1.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component2) {
          var prototype = Component2.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
          if (type == null) {
            return "";
          }
          if (typeof type === "function") {
            {
              return describeNativeComponentFrame(type, shouldConstruct(type));
            }
          }
          if (typeof type === "string") {
            return describeBuiltInComponentFrame(type);
          }
          switch (type) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {
                }
              }
            }
          }
          return "";
        }
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame$1.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location, componentName, element) {
          {
            var has = Function.call.bind(hasOwnProperty);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex) {
                  error$1 = ex;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        function setCurrentlyValidatingElement$1(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              setExtraStackFrame(stack);
            } else {
              setExtraStackFrame(null);
            }
          }
        }
        var propTypesMisspellWarningShown;
        {
          propTypesMisspellWarningShown = false;
        }
        function getDeclarationErrorAddendum() {
          if (ReactCurrentOwner.current) {
            var name = getComponentNameFromType(ReactCurrentOwner.current.type);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }
        function getSourceInfoErrorAddendum(source) {
          if (source !== void 0) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, "");
            var lineNumber = source.lineNumber;
            return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
        function getSourceInfoErrorAddendumForProps(elementProps) {
          if (elementProps !== null && elementProps !== void 0) {
            return getSourceInfoErrorAddendum(elementProps.__source);
          }
          return "";
        }
        var ownerHasKeyUseWarning = {};
        function getCurrentComponentErrorInfo(parentType) {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
            if (parentName) {
              info = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info;
        }
        function validateExplicitKey(element, parentType) {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
            childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
          }
          {
            setCurrentlyValidatingElement$1(element);
            error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
            setCurrentlyValidatingElement$1(null);
          }
        }
        function validateChildKeys(node, parentType) {
          if (typeof node !== "object") {
            return;
          }
          if (isArray(node)) {
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              if (isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement(node)) {
            if (node._store) {
              node._store.validated = true;
            }
          } else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
        function validatePropTypes(element) {
          {
            var type = element.type;
            if (type === null || type === void 0 || typeof type === "string") {
              return;
            }
            var propTypes;
            if (typeof type === "function") {
              propTypes = type.propTypes;
            } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
            // Inner props are checked in the reconciler.
            type.$$typeof === REACT_MEMO_TYPE)) {
              propTypes = type.propTypes;
            } else {
              return;
            }
            if (propTypes) {
              var name = getComponentNameFromType(type);
              checkPropTypes(propTypes, element.props, "prop", name, element);
            } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
              propTypesMisspellWarningShown = true;
              var _name = getComponentNameFromType(type);
              error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
            }
            if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
            }
          }
        }
        function validateFragmentProps(fragment) {
          {
            var keys = Object.keys(fragment.props);
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (key !== "children" && key !== "key") {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                setCurrentlyValidatingElement$1(null);
                break;
              }
            }
            if (fragment.ref !== null) {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid attribute `ref` supplied to `React.Fragment`.");
              setCurrentlyValidatingElement$1(null);
            }
          }
        }
        function createElementWithValidation(type, props, children) {
          var validType = isValidElementType(type);
          if (!validType) {
            var info = "";
            if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
            var sourceInfo = getSourceInfoErrorAddendumForProps(props);
            if (sourceInfo) {
              info += sourceInfo;
            } else {
              info += getDeclarationErrorAddendum();
            }
            var typeString;
            if (type === null) {
              typeString = "null";
            } else if (isArray(type)) {
              typeString = "array";
            } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
              info = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type;
            }
            {
              error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
            }
          }
          var element = createElement.apply(this, arguments);
          if (element == null) {
            return element;
          }
          if (validType) {
            for (var i = 2; i < arguments.length; i++) {
              validateChildKeys(arguments[i], type);
            }
          }
          if (type === REACT_FRAGMENT_TYPE) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }
          return element;
        }
        var didWarnAboutDeprecatedCreateFactory = false;
        function createFactoryWithValidation(type) {
          var validatedFactory = createElementWithValidation.bind(null, type);
          validatedFactory.type = type;
          {
            if (!didWarnAboutDeprecatedCreateFactory) {
              didWarnAboutDeprecatedCreateFactory = true;
              warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
            }
            Object.defineProperty(validatedFactory, "type", {
              enumerable: false,
              get: function() {
                warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                Object.defineProperty(this, "type", {
                  value: type
                });
                return type;
              }
            });
          }
          return validatedFactory;
        }
        function cloneElementWithValidation(element, props, children) {
          var newElement = cloneElement.apply(this, arguments);
          for (var i = 2; i < arguments.length; i++) {
            validateChildKeys(arguments[i], newElement.type);
          }
          validatePropTypes(newElement);
          return newElement;
        }
        function startTransition(scope, options) {
          var prevTransition = ReactCurrentBatchConfig.transition;
          ReactCurrentBatchConfig.transition = {};
          var currentTransition = ReactCurrentBatchConfig.transition;
          {
            ReactCurrentBatchConfig.transition._updatedFibers = /* @__PURE__ */ new Set();
          }
          try {
            scope();
          } finally {
            ReactCurrentBatchConfig.transition = prevTransition;
            {
              if (prevTransition === null && currentTransition._updatedFibers) {
                var updatedFibersCount = currentTransition._updatedFibers.size;
                if (updatedFibersCount > 10) {
                  warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
                }
                currentTransition._updatedFibers.clear();
              }
            }
          }
        }
        var didWarnAboutMessageChannel = false;
        var enqueueTaskImpl = null;
        function enqueueTask(task) {
          if (enqueueTaskImpl === null) {
            try {
              var requireString = ("require" + Math.random()).slice(0, 7);
              var nodeRequire = module && module[requireString];
              enqueueTaskImpl = nodeRequire.call(module, "timers").setImmediate;
            } catch (_err) {
              enqueueTaskImpl = function(callback) {
                {
                  if (didWarnAboutMessageChannel === false) {
                    didWarnAboutMessageChannel = true;
                    if (typeof MessageChannel === "undefined") {
                      error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.");
                    }
                  }
                }
                var channel = new MessageChannel();
                channel.port1.onmessage = callback;
                channel.port2.postMessage(void 0);
              };
            }
          }
          return enqueueTaskImpl(task);
        }
        var actScopeDepth = 0;
        var didWarnNoAwaitAct = false;
        function act(callback) {
          {
            var prevActScopeDepth = actScopeDepth;
            actScopeDepth++;
            if (ReactCurrentActQueue.current === null) {
              ReactCurrentActQueue.current = [];
            }
            var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
            var result;
            try {
              ReactCurrentActQueue.isBatchingLegacy = true;
              result = callback();
              if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
                var queue = ReactCurrentActQueue.current;
                if (queue !== null) {
                  ReactCurrentActQueue.didScheduleLegacyUpdate = false;
                  flushActQueue(queue);
                }
              }
            } catch (error2) {
              popActScope(prevActScopeDepth);
              throw error2;
            } finally {
              ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
            }
            if (result !== null && typeof result === "object" && typeof result.then === "function") {
              var thenableResult = result;
              var wasAwaited = false;
              var thenable = {
                then: function(resolve, reject) {
                  wasAwaited = true;
                  thenableResult.then(function(returnValue2) {
                    popActScope(prevActScopeDepth);
                    if (actScopeDepth === 0) {
                      recursivelyFlushAsyncActWork(returnValue2, resolve, reject);
                    } else {
                      resolve(returnValue2);
                    }
                  }, function(error2) {
                    popActScope(prevActScopeDepth);
                    reject(error2);
                  });
                }
              };
              {
                if (!didWarnNoAwaitAct && typeof Promise !== "undefined") {
                  Promise.resolve().then(function() {
                  }).then(function() {
                    if (!wasAwaited) {
                      didWarnNoAwaitAct = true;
                      error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
                    }
                  });
                }
              }
              return thenable;
            } else {
              var returnValue = result;
              popActScope(prevActScopeDepth);
              if (actScopeDepth === 0) {
                var _queue = ReactCurrentActQueue.current;
                if (_queue !== null) {
                  flushActQueue(_queue);
                  ReactCurrentActQueue.current = null;
                }
                var _thenable = {
                  then: function(resolve, reject) {
                    if (ReactCurrentActQueue.current === null) {
                      ReactCurrentActQueue.current = [];
                      recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                    } else {
                      resolve(returnValue);
                    }
                  }
                };
                return _thenable;
              } else {
                var _thenable2 = {
                  then: function(resolve, reject) {
                    resolve(returnValue);
                  }
                };
                return _thenable2;
              }
            }
          }
        }
        function popActScope(prevActScopeDepth) {
          {
            if (prevActScopeDepth !== actScopeDepth - 1) {
              error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
            }
            actScopeDepth = prevActScopeDepth;
          }
        }
        function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
          {
            var queue = ReactCurrentActQueue.current;
            if (queue !== null) {
              try {
                flushActQueue(queue);
                enqueueTask(function() {
                  if (queue.length === 0) {
                    ReactCurrentActQueue.current = null;
                    resolve(returnValue);
                  } else {
                    recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                  }
                });
              } catch (error2) {
                reject(error2);
              }
            } else {
              resolve(returnValue);
            }
          }
        }
        var isFlushing = false;
        function flushActQueue(queue) {
          {
            if (!isFlushing) {
              isFlushing = true;
              var i = 0;
              try {
                for (; i < queue.length; i++) {
                  var callback = queue[i];
                  do {
                    callback = callback(true);
                  } while (callback !== null);
                }
                queue.length = 0;
              } catch (error2) {
                queue = queue.slice(i + 1);
                throw error2;
              } finally {
                isFlushing = false;
              }
            }
          }
        }
        var createElement$1 = createElementWithValidation;
        var cloneElement$1 = cloneElementWithValidation;
        var createFactory = createFactoryWithValidation;
        var Children = {
          map: mapChildren,
          forEach: forEachChildren,
          count: countChildren,
          toArray,
          only: onlyChild
        };
        exports.Children = Children;
        exports.Component = Component;
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.Profiler = REACT_PROFILER_TYPE;
        exports.PureComponent = PureComponent;
        exports.StrictMode = REACT_STRICT_MODE_TYPE;
        exports.Suspense = REACT_SUSPENSE_TYPE;
        exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
        exports.cloneElement = cloneElement$1;
        exports.createContext = createContext;
        exports.createElement = createElement$1;
        exports.createFactory = createFactory;
        exports.createRef = createRef;
        exports.forwardRef = forwardRef;
        exports.isValidElement = isValidElement;
        exports.lazy = lazy;
        exports.memo = memo;
        exports.startTransition = startTransition;
        exports.unstable_act = act;
        exports.useCallback = useCallback;
        exports.useContext = useContext;
        exports.useDebugValue = useDebugValue;
        exports.useDeferredValue = useDeferredValue;
        exports.useEffect = useEffect;
        exports.useId = useId;
        exports.useImperativeHandle = useImperativeHandle;
        exports.useInsertionEffect = useInsertionEffect;
        exports.useLayoutEffect = useLayoutEffect;
        exports.useMemo = useMemo;
        exports.useReducer = useReducer;
        exports.useRef = useRef;
        exports.useState = useState;
        exports.useSyncExternalStore = useSyncExternalStore;
        exports.useTransition = useTransition;
        exports.version = ReactVersion;
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
      })();
    }
  }
});

// node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/react/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_development();
    }
  }
});

// src/jsx/_loader.jsx
var import_react6 = __toESM(require_react());

// node_modules/hookui-framework/src/components/panel.jsx
var import_react = __toESM(require_react());

// node_modules/hookui-framework/src/styles.js
var CLASS_PANEL = "panel_YqS";

// node_modules/hookui-framework/src/components/panel.jsx
var defaultStyle = {
  position: "absolute",
  width: "300rem",
  height: "600rem"
};
var Resizer = ({ onMouseDown }) => {
  const style = {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "20px",
    height: "20px",
    cursor: "nwse-resize",
    zIndex: 10
  };
  const triangle = {
    width: 20,
    height: 20,
    opacity: 0.2,
    background: "linear-gradient(to right bottom, transparent 0%, transparent 50%, var(--accentColorDark) 50%, var(--accentColorDark) 100%)"
  };
  return /* @__PURE__ */ import_react.default.createElement("div", { style, onMouseDown }, /* @__PURE__ */ import_react.default.createElement("div", { style: triangle }));
};
var $CloseButton = ({ onClick }) => {
  return /* @__PURE__ */ import_react.default.createElement("button", { className: "button_bvQ button_bvQ close-button_wKK", onClick }, /* @__PURE__ */ import_react.default.createElement("div", { className: "tinted-icon_iKo icon_PhD", style: { maskImage: "url(Media/Glyphs/Close.svg)" } }));
};
var $Panel = ({
  react,
  children,
  title,
  style,
  onClose,
  initialPosition,
  initialSize,
  onPositionChange = () => {
  },
  onSizeChange = () => {
  }
}) => {
  const [position, setPosition] = react.useState(initialPosition || { top: 100, left: 10 });
  const [size, setSize] = react.useState(initialSize || { width: 300, height: 600 });
  const initialSizeRef = react.useRef({ width: 0, height: 0 });
  const [dragging, setDragging] = react.useState(false);
  const [resizing, setResizing] = react.useState(false);
  const [rel, setRel] = react.useState({ x: 0, y: 0 });
  const onMouseDown = (e) => {
    if (e.button !== 0)
      return;
    setDragging(true);
    const panelElement = e.target.closest("." + CLASS_PANEL);
    const rect = panelElement.getBoundingClientRect();
    setRel({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    e.stopPropagation();
    e.preventDefault();
  };
  const onMouseUp = () => {
    setDragging(false);
    setResizing(false);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    window.removeEventListener("mousemove", onResizeMouseMove);
  };
  const onMouseMove = (e) => {
    if (!dragging || resizing)
      return;
    const newTop = e.clientY - rel.y;
    const newLeft = e.clientX - rel.x;
    const newPosition = {
      top: newTop > 0 ? newTop : 0,
      left: newLeft > 0 ? newLeft : 0
    };
    setPosition(newPosition);
    onPositionChange(newPosition);
    e.stopPropagation();
    e.preventDefault();
  };
  const onResizeMouseDown = (e) => {
    setResizing(true);
    initialSizeRef.current = { width: size.width, height: size.height };
    setRel({ x: e.clientX, y: e.clientY });
    e.stopPropagation();
    e.preventDefault();
  };
  const onResizeMouseMove = (e) => {
    if (!resizing)
      return;
    const widthChange = e.clientX - rel.x;
    const heightChange = e.clientY - rel.y;
    const newSize = {
      width: Math.max(initialSizeRef.current.width + widthChange, 100),
      height: Math.max(initialSizeRef.current.height + heightChange, 100)
    };
    setSize(newSize);
    onSizeChange(newSize);
    setRel({ x: e.clientX, y: e.clientY });
    e.stopPropagation();
    e.preventDefault();
  };
  react.useEffect(() => {
    if (dragging || resizing) {
      window.addEventListener("mousemove", dragging ? onMouseMove : onResizeMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", dragging ? onMouseMove : onResizeMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, resizing]);
  const draggableStyle = {
    ...defaultStyle,
    ...style,
    top: `${position.top}px`,
    left: `${position.left}px`,
    width: `${size.width}px`,
    height: `${size.height}px`
  };
  return /* @__PURE__ */ import_react.default.createElement("div", { className: CLASS_PANEL, style: draggableStyle }, /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: "header_H_U header_Bpo child-opacity-transition_nkS",
      onMouseDown
    },
    /* @__PURE__ */ import_react.default.createElement("div", { className: "title-bar_PF4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "icon-space_h_f" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "title_SVH title_zQN" }, title), /* @__PURE__ */ import_react.default.createElement($CloseButton, { onClick: onClose }))
  ), /* @__PURE__ */ import_react.default.createElement("div", { className: "content_XD5 content_AD7 child-opacity-transition_nkS" }, children), /* @__PURE__ */ import_react.default.createElement(Resizer, { onMouseDown: onResizeMouseDown }));
};
var panel_default = $Panel;

// node_modules/hookui-framework/src/components/field.jsx
var import_react3 = __toESM(require_react());

// node_modules/hookui-framework/src/components/label.jsx
var import_react2 = __toESM(require_react());

// node_modules/hookui-framework/src/components/meter.jsx
var import_react4 = __toESM(require_react());

// node_modules/hookui-framework/src/components/button.jsx
var import_react5 = __toESM(require_react());

// src/jsx/_loader.jsx
var $Loader = ({ react }) => {
  const [visibleComponents, setVisibleComponents] = react.useState([]);
  const plugins = HookUI.getPlugins(HookUIPluginType.LEGACY);
  const panels = Object.keys(plugins).filter((i) => visibleComponents.includes(i)).map((k) => plugins[k]);
  const to_render = panels.map((p) => {
    if (p.component) {
      const el = import_react6.default.createElement(p.component, { react });
      return /* @__PURE__ */ import_react6.default.createElement("div", { key: p.id }, el);
    } else if (p.body) {
      const el = import_react6.default.createElement(p.body, { react });
      return /* @__PURE__ */ import_react6.default.createElement(panel_default, { key: p.id, title: p.name, react, style: p.panel_style || {} }, el);
    } else {
      throw new Error("Unknown panel structure for registerPanel, missing .body or .component");
    }
  });
  return /* @__PURE__ */ import_react6.default.createElement("div", { key: "hookui_loader" }, ...to_render);
};
window._$hookui_loader = $Loader;

// src/jsx/menus/toolbars/_toolbar-start.jsx
var import_react11 = __toESM(require_react());

// src/jsx/components/_icon-toolbar.jsx
var import_react10 = __toESM(require_react());

// src/jsx/components/_icon-button.jsx
var import_react8 = __toESM(require_react());

// src/jsx/components/_tooltip.jsx
var import_react7 = __toESM(require_react());
var $ToolTip = import_react7.default.forwardRef(({ react, style, children, visible, containerStyle, clickable, float, align, inline }, ref) => {
  const tooltipStyle = visible ? { opacity: 1, pointerEvents: clickable ? "auto" : "none" } : { opacity: 0, pointerEvents: "none" };
  const positionStyle = float === "up" && align === "left" ? {
    left: "0",
    right: "inherit",
    top: "inherit",
    bottom: "100%"
  } : float === "up" && align === "center" ? {
    left: "inherit",
    right: "inherit",
    top: "inherit",
    bottom: "100%",
    paddingLeft: "calc(.5* var(--arrowSize) )",
    paddingRight: "calc(.5* var(--arrowSize) )"
  } : float === "up" && align === "right" ? {
    left: "inherit",
    right: "50%",
    top: "inherit",
    bottom: "100%"
  } : float === "down" && align === "left" ? {
    left: "50%",
    right: "inherit",
    top: "100%",
    bottom: "inherit"
  } : float === "down" && align === "right" ? {
    left: "inherit",
    right: "50%",
    top: "100%",
    bottom: "inherit"
  } : float === "left" && align === "left" ? {
    left: "inherit",
    right: "100%",
    top: "0",
    bottom: "inherit"
  } : float === "left" && align === "right" ? {
    left: "100%",
    right: "inherit",
    top: "0",
    bottom: "inherit"
  } : float === "right" && align === "left" ? {
    left: "100%",
    right: "inherit",
    top: "0",
    bottom: "inherit"
  } : float === "right" && align === "right" ? {
    left: "100%",
    right: "inherit",
    top: "0",
    bottom: "inherit"
  } : {};
  let tooltipClassNames = "balloon_ltu balloon_qJY balloon_H23 anchored-balloon_AYp";
  tooltipClassNames += float === "up" ? " up_ehW up_el0" : float == "down" ? " down_ztr down_Xl7" : float == "left" ? " left_LHd left_SI8" : " right_JdH right_RQp";
  tooltipClassNames += " ";
  tooltipClassNames += align === "left" ? " end_EKq" : align === "right" ? " start_wu1" : " center_hug";
  const arrowClassNames = "arrow_R9U arrow_SVb " + (align === " right" ? "" : " arrow_Xfn");
  const inlineStyle = !inline ? { minWidth: "150rem" } : {};
  const inlineSubStyle = !inline ? { flex: 1 } : { width: "auto" };
  return /* @__PURE__ */ import_react7.default.createElement("div", { className: tooltipClassNames, style: {
    position: "absolute",
    ...positionStyle,
    width: "auto",
    ...inlineStyle,
    display: "flex",
    transition: "opacity 0.2s easeOut",
    transitionDelay: "0.2s",
    zIndex: 999,
    ...tooltipStyle,
    ...style
  } }, /* @__PURE__ */ import_react7.default.createElement("div", { ref, className: "bounds__AO", style: {
    ...inlineSubStyle,
    display: "flex",
    transition: "opacity 0.2s easeOut",
    transitionDelay: "0.2s",
    ...containerStyle
  } }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "container_eNL container_zgM container_jfe" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: arrowClassNames })), /* @__PURE__ */ import_react7.default.createElement("div", { className: "content_wfU content_A82 content_JQV" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "main_F2U" }, children))));
});
var tooltip_default = $ToolTip;

// src/jsx/components/_icon-button.jsx
var $IconButton = import_react8.default.forwardRef(({ react, style, children, onClick, selected, hideTooltip, tooltipFloat, tooltipAlign, icon, noBorder, infoModeStyle, infoPanelStyle, tooltipStyle, holdTooltipOnSelected = "true" }, ref) => {
  const [tooltipVisible, setTooltipVisible] = react.useState(false);
  const getButtonClassNames = () => {
    const baseClassName = infoModeStyle ? "button_ke4 button_ke4" : infoPanelStyle ? "button_FBo item_IYJ" : "button_cBV";
    const additionalClassNames = !infoModeStyle && infoPanelStyle ? "button_ECf item_It6 item-mouse-states_Fmi item-selected_tAM item-focused_FuT toggle-states_DTm" : "";
    const selectedClassName = selected ? " selected" : "";
    const borderCondition = noBorder && noBorder !== "false" && !infoModeStyle && !infoPanelStyle;
    const borderClassName = borderCondition ? " button_cBV" : !infoModeStyle && !infoPanelStyle ? " button_s2g toggle-states_X82" : "";
    return `${baseClassName} ${additionalClassNames}${selectedClassName}${borderClassName}`;
  };
  const btnClassNames = getButtonClassNames();
  const onMouseEnter = () => {
    if (tooltipVisible)
      return;
    engine.trigger("audio.playSound", "hover-item", 1);
    setTooltipVisible(true);
  };
  const onMouseLeave = () => {
    setTooltipVisible(false);
  };
  const iconClassName = infoPanelStyle ? "icon_ZjN icon_soN icon_Iwk" : "icon_KJZ icon_soN icon_Iwk";
  const iconElement = infoModeStyle ? /* @__PURE__ */ import_react8.default.createElement("div", { className: "tinted-icon_iKo icon_be5", style: { maskImage: `url(${icon})` } }) : /* @__PURE__ */ import_react8.default.createElement("img", { className: iconClassName, src: icon });
  return /* @__PURE__ */ import_react8.default.createElement(
    "button",
    {
      ref,
      className: btnClassNames,
      onClick,
      onMouseEnter,
      onMouseLeave,
      style: { position: "relative", ...style }
    },
    iconElement,
    /* @__PURE__ */ import_react8.default.createElement(tooltip_default, { inline: infoPanelStyle === "true", visible: tooltipVisible && !hideTooltip || selected && holdTooltipOnSelected === "true", clickable: selected && holdTooltipOnSelected === "true", float: tooltipFloat, align: tooltipAlign, style: tooltipStyle }, children)
  );
});
var icon_button_default = $IconButton;

// src/jsx/components/_tooltip-content.jsx
var import_react9 = __toESM(require_react());
var $ToolTipContent = ({ title, description, align = "left" }) => {
  const additionalContent = description && description.length > 0 ? /* @__PURE__ */ import_react9.default.createElement("div", { className: "paragraphs_nbD description_dNa", style: { textAlign: align, width: "100%", color: "var(--menuText1Normal)" } }, /* @__PURE__ */ import_react9.default.createElement("p", { cohinline: "cohinline" }, description)) : /* @__PURE__ */ import_react9.default.createElement(import_react9.default.Fragment, null);
  return /* @__PURE__ */ import_react9.default.createElement(import_react9.default.Fragment, null, /* @__PURE__ */ import_react9.default.createElement("div", { className: "title_lCJ", style: { textAlign: align, color: "var(--menuText1Normal)" } }, title), additionalContent);
};
var tooltip_content_default = $ToolTipContent;

// src/jsx/components/_icon-toolbar.jsx
var $IconToolBar = ({ react, title, description, icon, active, options, style, onItemClick, onClick, noBorder = false, tooltipAlign = "center", tooltipFloat = "up", infomodeStyle, tooltipStyle, hasSpacer = true }) => {
  const [clicked, setClicked] = react.useState(active);
  const [hoveredItem, setHoveredItem] = react.useState("");
  const buttonRef = react.useRef(null);
  let releaseHoverTimeout = null;
  const toggleDropdownMenu = () => {
    const newVal = !clicked;
    setClicked(newVal);
    engine.trigger("audio.playSound", newVal ? "open-menu" : "close-menu", 1);
    engine.trigger("audio.playSound", "select-item", 1);
    if (onClick)
      onClick(newVal);
  };
  const onMouseEnterItem = (event) => {
    let element = event.target;
    const tooltipText = element.getAttribute("data-tooltip");
    setHoveredItem(tooltipText);
    if (releaseHoverTimeout != null)
      clearTimeout(releaseHoverTimeout);
    engine.trigger("audio.playSound", "hover-item", 1);
  };
  const onMouseLeaveItem = () => {
    if (releaseHoverTimeout != null)
      return;
    releaseHoverTimeout = setTimeout(function() {
      setHoveredItem("");
      releaseHoverTimeout = null;
    }, 300);
  };
  const getToolBarOptions = () => {
    const ks = Object.keys(options);
    return ks.map((k) => {
      const option = options[k];
      let classNames = "button_s2g button_ECf item_It6 item-mouse-states_Fmi item-selected_tAM item-focused_FuT button_s2g button_ECf item_It6 item-mouse-states_Fmi item-selected_tAM item-focused_FuT toggle-states_X82 toggle-states_DTm";
      if (option.isOpen)
        classNames += " selected";
      return /* @__PURE__ */ import_react10.default.createElement(
        "button",
        {
          "data-tooltip": option.name,
          key: "hk_btn_" + k,
          onMouseEnter: onMouseEnterItem,
          onMouseLeave: onMouseLeaveItem,
          onClick: () => onItemClick(option),
          className: classNames,
          style: { marginLeft: "5rem" }
        },
        /* @__PURE__ */ import_react10.default.createElement("img", { className: "icon_KJZ icon_soN icon_Iwk", src: option.icon, style: { maxWidth: "25rem" } })
      );
    });
  };
  const toolTipContent = clicked ? /* @__PURE__ */ import_react10.default.createElement(import_react10.default.Fragment, null, /* @__PURE__ */ import_react10.default.createElement("div", { className: "title_lCJ", style: { textAlign: tooltipAlign, color: "var(--menuText1Normal)" } }, title), /* @__PURE__ */ import_react10.default.createElement("div", { className: "title_lCJ", style: { textAlign: tooltipAlign, fontWeight: "normal", color: "var(--accentColorNormal)" } }, hoveredItem), /* @__PURE__ */ import_react10.default.createElement("div", { style: { display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: "5rem", width: "100%" } }, getToolBarOptions())) : /* @__PURE__ */ import_react10.default.createElement(tooltip_content_default, { title, description });
  const spacerContent = hasSpacer === true ? /* @__PURE__ */ import_react10.default.createElement("div", { className: "spacer_oEi" }) : /* @__PURE__ */ import_react10.default.createElement(import_react10.default.Fragment, null);
  return /* @__PURE__ */ import_react10.default.createElement(import_react10.default.Fragment, null, spacerContent, /* @__PURE__ */ import_react10.default.createElement(
    icon_button_default,
    {
      ref: buttonRef,
      react,
      onClick: toggleDropdownMenu,
      selected: clicked,
      icon,
      noBorder,
      tooltipFloat,
      tooltipAlign,
      infoModeStyle: infomodeStyle,
      tooltipStyle,
      style
    },
    toolTipContent
  ));
};
var icon_toolbar_default = $IconToolBar;

// src/jsx/menus/toolbars/_toolbar-start.jsx
var $HookUIToolBarStartMenu = ({ react }) => {
  const [active, setActive] = react.useState(false);
  const [hasPlugins, setHasPlugins] = react.useState(false);
  HookUIPlugins.useType(react, HookUIPluginType.TOOLBAR_START, (hasPlugins2) => {
    setHasPlugins(hasPlugins2);
  }, (isOpen) => {
    setActive(isOpen);
  });
  const toggleMenu = (n) => {
    const newValue = !active;
    setActive(newValue);
    HookUI.playSound();
    HookUI.togglePluginType(HookUIPluginType.TOOLBAR_START, newValue);
  };
  return hasPlugins ? /* @__PURE__ */ import_react11.default.createElement(import_react11.default.Fragment, null, /* @__PURE__ */ import_react11.default.createElement("div", { className: "spacer_oEi" }), /* @__PURE__ */ import_react11.default.createElement(
    icon_toolbar_default,
    {
      react,
      title: "HookUI - Tools",
      icon: "coui://hookuiresources/toolbox3.svg",
      description: "Select a tool to use",
      active,
      options: HookUI.getPlugins(HookUIPluginType.TOOLBAR_START),
      noBorder: "true",
      tooltipFloat: "up",
      tooltipAlign: "center",
      onClick: toggleMenu,
      onItemClick: (option) => HookUI.toggle(option.id)
    }
  )) : null;
};
window._$hookui.toolbar_start_menu = $HookUIToolBarStartMenu;

// src/jsx/menus/toolbars/_toolbar-end.jsx
var import_react12 = __toESM(require_react());
var $HookUIToolBarEndMenu = ({ react }) => {
  const [active, setActive] = react.useState(false);
  const [hasPlugins, setHasPlugins] = react.useState(false);
  HookUIPlugins.useType(react, HookUIPluginType.TOOLBAR_END, (hasPlugins2) => {
    setHasPlugins(hasPlugins2);
  }, (isOpen) => {
    setActive(isOpen);
  });
  const toggleMenu = (n) => {
    const newValue = !active;
    setActive(newValue);
    HookUI.playSound();
    HookUI.togglePluginType(HookUIPluginType.TOOLBAR_END, newValue);
  };
  return hasPlugins ? /* @__PURE__ */ import_react12.default.createElement(import_react12.default.Fragment, null, /* @__PURE__ */ import_react12.default.createElement("div", { className: "spacer_oEi" }), /* @__PURE__ */ import_react12.default.createElement(
    icon_toolbar_default,
    {
      react,
      title: "HookUI - Systems",
      icon: "coui://hookuiresources/toolbox.svg",
      description: "Misc mods and systems",
      active,
      options: HookUI.getPlugins(HookUIPluginType.TOOLBAR_END),
      noBorder: "false",
      tooltipFloat: "up",
      tooltipAlign: "right",
      onClick: toggleMenu,
      onItemClick: (option) => HookUI.toggle(option.id)
    }
  )) : null;
};
window._$hookui.toolbar_end_menu = $HookUIToolBarEndMenu;

// src/jsx/menus/toolbars/_toolbar-pause.jsx
var import_react13 = __toESM(require_react());
var $HookUIToolBarPauseMenu = ({ react }) => {
  const [active, setActive] = react.useState(false);
  const [hasPlugins, setHasPlugins] = react.useState(false);
  HookUIPlugins.useType(react, HookUIPluginType.ADVISOR_PANEL, (hasPlugins2) => {
    setHasPlugins(hasPlugins2);
  }, (isOpen) => {
    setActive(isOpen);
  });
  const toggleMenu = () => {
    const newValue = !active;
    setActive(newValue);
    HookUI.playSound();
    HookUI.togglePluginType(HookUIPluginType.ADVISOR_PANEL, newValue);
  };
  return hasPlugins ? /* @__PURE__ */ import_react13.default.createElement(
    icon_button_default,
    {
      hideTooltip: active,
      react,
      onClick: toggleMenu,
      selected: active,
      holdTooltipOnSelected: "false",
      icon: "coui://hookuiresources/toolbox_white.svg",
      tooltipFloat: "down",
      tooltipAlign: "right",
      infoModeStyle: "true",
      tooltipStyle: { marginTop: "5rem" },
      style: { marginRight: "9rem" }
    },
    /* @__PURE__ */ import_react13.default.createElement(tooltip_content_default, { title: "HookUI - Settings", description: "Change mod settings" })
  ) : null;
};
window._$hookui.toolbar_pause_menu = $HookUIToolBarPauseMenu;

// src/jsx/menus/toolbars/_toolbar-infomode.jsx
var import_react14 = __toESM(require_react());
var $HookUIToolBarInfomodeMenu = ({ react }) => {
  const [active, setActive] = react.useState(false);
  const [hasPlugins, setHasPlugins] = react.useState(false);
  HookUIPlugins.useType(react, HookUIPluginType.INFO_PANEL, (hasPlugins2) => {
    setHasPlugins(hasPlugins2);
  }, (isOpen) => {
    setActive(isOpen);
  });
  const toggleMenu = () => {
    const newValue = !active;
    setActive(newValue);
    HookUI.playSound();
    HookUI.togglePluginType(HookUIPluginType.INFO_PANEL, newValue);
  };
  return hasPlugins ? /* @__PURE__ */ import_react14.default.createElement(
    icon_button_default,
    {
      hideTooltip: active,
      react,
      onClick: toggleMenu,
      selected: active,
      holdTooltipOnSelected: "false",
      icon: "coui://hookuiresources/toolbox_white.svg",
      tooltipFloat: "down",
      tooltipAlign: "left",
      infoModeStyle: "true",
      tooltipStyle: { marginTop: "5rem" },
      style: { marginLeft: "9rem" }
    },
    /* @__PURE__ */ import_react14.default.createElement(tooltip_content_default, { title: "HookUI - Settings", description: "Change mod settings" })
  ) : null;
};
window._$hookui.toolbar_infomode_menu = $HookUIToolBarInfomodeMenu;

// src/jsx/panels/_pause-panel.jsx
var import_react17 = __toESM(require_react());

// src/jsx/components/_foldout.jsx
var import_react15 = __toESM(require_react());
var $FoldOut = import_react15.default.forwardRef(({ react, style, children, level, icon, label, disableFoldout, onToggle, onItemClick, selected }, ref) => {
  const [expanded, setExpanded] = react.useState(!level || level === "0");
  const isRootLevel = !level || level === "0";
  const nestingStyle = !isRootLevel ? { "--nesting": level } : { "--nesting": 0 };
  const itemIcon = icon ? icon : disableFoldout ? "Media/Game/Icons/TutorialPhase.svg" : "Media/Game/Icons/Water.svg";
  const itemIconElement = isRootLevel ? /* @__PURE__ */ import_react15.default.createElement(import_react15.default.Fragment, null) : /* @__PURE__ */ import_react15.default.createElement("img", { src: itemIcon });
  const foldoutIcon = expanded ? 'url("Media/Glyphs/ThickStrokeArrowDown.svg")' : 'url("Media/Glyphs/ThickStrokeArrowRight.svg")';
  const tintedIconElement = !disableFoldout ? /* @__PURE__ */ import_react15.default.createElement("div", { className: "tinted-icon_iKo toggle_NYV toggle_yQv", style: { maskImage: foldoutIcon } }) : /* @__PURE__ */ import_react15.default.createElement(import_react15.default.Fragment, null);
  const foldoutClassNames = (isRootLevel ? "foldout-item_EBr foldout-item_wOF category_Zf1" : "foldout-item_EBr foldout-item_wOF") + (selected ? " selected" : "");
  const contentElement = !disableFoldout && expanded ? /* @__PURE__ */ import_react15.default.createElement("div", { className: "content_mJm foldout-expanded" }, children) : /* @__PURE__ */ import_react15.default.createElement(import_react15.default.Fragment, null);
  const onHeaderClick = () => {
    if (disableFoldout) {
      engine.trigger("audio.playSound", "select-item", 1);
      if (onItemClick)
        onItemClick();
      return;
    }
    setExpanded(!expanded);
    engine.trigger("audio.playSound", "expand-panel", 1);
    if (onToggle)
      onToggle(expanded);
  };
  const onHeaderHover = () => {
    engine.trigger("audio.playSound", "hover-item", 1);
  };
  return /* @__PURE__ */ import_react15.default.createElement("div", { ref, className: foldoutClassNames, style: { ...nestingStyle, ...style } }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "header_h0B header_8H_ item-mouse-states_Fmi item-focused_FuT", onClick: onHeaderClick, onMouseEnter: onHeaderHover }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "icon_pQQ icon_I32" }, itemIconElement), /* @__PURE__ */ import_react15.default.createElement("div", { className: "header-content_owU header-content_wUX" }, level === "1" ? label.toUpperCase() : label), tintedIconElement), contentElement);
});
var foldout_default = $FoldOut;

// src/jsx/components/_scrollable.jsx
var import_react16 = __toESM(require_react());
var $Scrollable = ({ react, children }) => {
  const scrollRef = react.useRef(null);
  const contentRef = react.useRef(null);
  const [thumbHeight, setThumbHeight] = react.useState(0);
  const [thumbTop, setThumbTop] = react.useState(0);
  function getCurrentScrollPosition() {
    if (scrollRef.current) {
      return scrollRef.current.scrollTop;
    }
    return 0;
  }
  const calculateThumbSizeAndPosition = () => {
    if (scrollRef.current && contentRef.current) {
      const viewableHeight = scrollRef.current.clientHeight;
      const totalContentHeight = contentRef.current.scrollHeight;
      if (totalContentHeight > viewableHeight) {
        const newThumbHeight = Math.max(viewableHeight / totalContentHeight * viewableHeight, 30);
        const currentScrollPosition = getCurrentScrollPosition();
        const newThumbTop = currentScrollPosition / totalContentHeight * viewableHeight;
        setThumbHeight(newThumbHeight);
        setThumbTop(newThumbTop);
      }
    }
  };
  const thumbContent = thumbHeight > 0 ? /* @__PURE__ */ import_react16.default.createElement("div", { className: "track_e3O y_SMM" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "thumb_Cib y_SMM", style: { height: `${thumbHeight}px`, top: `${thumbTop}px` } })) : /* @__PURE__ */ import_react16.default.createElement(import_react16.default.Fragment, null);
  react.useEffect(() => {
    calculateThumbSizeAndPosition();
  }, []);
  return /* @__PURE__ */ import_react16.default.createElement("div", { className: "scrollable_DXr y_SMM track-visible-y_RCA scrollable_jAA", onMouseOver: calculateThumbSizeAndPosition }, /* @__PURE__ */ import_react16.default.createElement("div", { ref: scrollRef, onScroll: calculateThumbSizeAndPosition, className: "content_gqa" }, /* @__PURE__ */ import_react16.default.createElement("div", { ref: contentRef }, children), /* @__PURE__ */ import_react16.default.createElement("div", { className: "bottom-padding_JS3" })), thumbContent);
};
var scrollable_default = $Scrollable;

// src/jsx/panels/_pause-panel.jsx
var $HookUIPausePanel = ({ react }) => {
  const [active, setActive] = react.useState(false);
  const [expanded, setExpanded] = react.useState(true);
  const [selectedItem, setSelectedItem] = react.useState("");
  const [visiblePlugins, setVisiblePlugins] = react.useState(HookUIPlugins.getPlugins(HookUIPluginType.ADVISOR_PANEL).filter((p) => p.isOpen == true));
  const onPluginOpen = (detail) => {
    if (!detail)
      return;
    const plugins = HookUIPlugins.getPlugins(HookUIPluginType.ADVISOR_PANEL).filter((p) => p.isOpen == true);
    setVisiblePlugins(plugins);
  };
  const onPluginTypeOpen = (detail) => {
    if (!detail || detail.type != HookUIPluginType.ADVISOR_PANEL)
      return;
    setActive(detail.isOpen);
    if (detai.isOpen)
      setExpanded(true);
    HookUI.playPanelSound(detail.isOpen);
  };
  react.useEffect(() => {
    HookUIEvents.register(HookUIPluginType.ADVISOR_PANEL, onPluginTypeOpen);
    HookUIEvents.register("onPluginOpen", onPluginOpen);
    HookUI.setupPluginType(HookUIPluginType.ADVISOR_PANEL);
    return () => {
      HookUIEvents.unregister(HookUIPluginType.ADVISOR_PANEL, onPluginTypeOpen);
      HookUIEvents.unregister("onPluginOpen", onPluginOpen);
    };
  }, []);
  const onPanelToggle = () => {
    setExpanded(!expanded);
    HookUI.playSound("expand-panel");
  };
  const options = HookUI.getPlugins(HookUIPluginType.ADVISOR_PANEL);
  const getOptions = () => {
    const ks = Object.keys(options);
    return ks.map((k) => {
      const option = options[k];
      const selected = selectedItem === option.name;
      const onItemClick = () => {
        if (selectedItem === option.name)
          setSelectedItem("");
        else
          setSelectedItem(option.name);
        HookUI.playSound();
        HookUI.toggle(option.id);
      };
      return /* @__PURE__ */ import_react17.default.createElement(foldout_default, { key: "hk_btn_" + k, onItemClick, selected, disableFoldout: "true", react, icon: option.icon, label: option.name, level: "1" });
    });
  };
  const panelContent = active && expanded ? /* @__PURE__ */ import_react17.default.createElement("div", { className: "content_XD5 content_AD7 child-opacity-transition_nkS" }, /* @__PURE__ */ import_react17.default.createElement(scrollable_default, { react }, /* @__PURE__ */ import_react17.default.createElement(foldout_default, { react, label: "Mods", level: "0" }, getOptions()), /* @__PURE__ */ import_react17.default.createElement(foldout_default, { react, label: "HookUI", level: "0" }, /* @__PURE__ */ import_react17.default.createElement(foldout_default, { react, label: "Settings", level: "1" }, /* @__PURE__ */ import_react17.default.createElement(foldout_default, { react, label: "Item #2", level: "2" }, /* @__PURE__ */ import_react17.default.createElement(foldout_default, { react, label: "Some content", level: "3", disableFoldout: "true" })))))) : null;
  const onClose = () => {
    HookUI.playSound();
    HookUI.togglePluginType(HookUIPluginType.ADVISOR_PANEL, false);
  };
  const foldoutIcon = expanded ? 'url("Media/Glyphs/ThickStrokeArrowDown.svg")' : 'url("Media/Glyphs/ThickStrokeArrowRight.svg")';
  const panelClassNames = "panel_YqS collapsible advisor-panel_dXi advisor-panel_mrr top-right-panel_A2r" + (!expanded ? " collapsed" : "");
  const content = active ? /* @__PURE__ */ import_react17.default.createElement("div", { className: panelClassNames }, /* @__PURE__ */ import_react17.default.createElement("div", { className: "header_H_U header_Bpo child-opacity-transition_nkS", onClick: onPanelToggle }, /* @__PURE__ */ import_react17.default.createElement("div", { className: "title-bar_PF4" }, /* @__PURE__ */ import_react17.default.createElement("div", { className: "icon-space_h_f" }), /* @__PURE__ */ import_react17.default.createElement("div", { className: "icon-space_h_f" }), /* @__PURE__ */ import_react17.default.createElement("div", { className: "title_SVH title_zQN" }, "HOOKUI - Settings"), /* @__PURE__ */ import_react17.default.createElement("div", { className: "tinted-icon_iKo toggle_Q44", style: { maskImage: foldoutIcon } }), /* @__PURE__ */ import_react17.default.createElement("button", { className: "button_bvQ button_bvQ close-button_wKK", onClick: onClose }, /* @__PURE__ */ import_react17.default.createElement("div", { className: "tinted-icon_iKo icon_PhD", style: { maskImage: "url(Media/Glyphs/Close.svg)" } })))), panelContent) : null;
  return content;
};
window._$hookui.pause_panel = $HookUIPausePanel;

// src/jsx/_main-container.jsx
var import_react19 = __toESM(require_react());

// src/jsx/panels/_infomode-panel.jsx
var import_react18 = __toESM(require_react());
var $HookUIInfomodePanel = ({ react }) => {
  const [active, setActive] = react.useState(false);
  const [visiblePlugins, setVisiblePlugins] = react.useState([]);
  HookUIPlugins.use(react, HookUIPluginType.INFO_PANEL, (plugins) => {
    setVisiblePlugins(plugins);
  });
  HookUIPlugins.useType(react, HookUIPluginType.INFO_PANEL, null, (isOpen) => {
    setActive(isOpen);
    HookUI.playPanelSound(isOpen);
    if (isOpen) {
      engine.trigger("game.closePanel", "Game.UI.InGame.InfoviewMenu");
    }
  });
  const onGameShowPanel = (detail) => {
    if (!detail)
      return;
    const panel = detail.panel;
    if (panel !== "Game.UI.InGame.InfoviewMenu")
      return;
    const plugins = HookUIPlugins.getPlugins(HookUIPluginType.INFO_PANEL).filter((p) => p.isOpen == true);
    HookUI.togglePluginType(HookUIPluginType.INFO_PANEL, false);
    setActive(false);
    plugins.forEach((p) => {
      HookUI.setPluginOpen(p.id, false);
    });
  };
  react.useEffect(() => {
    HookUIEvents.register("onGameShowPanel", onGameShowPanel);
    return () => {
      HookUIEvents.unregister("onGameShowPanel", onGameShowPanel);
    };
  }, []);
  const options = HookUI.getPlugins(HookUIPluginType.INFO_PANEL);
  const getOptions = () => {
    const ks = Object.keys(options);
    const rows = [];
    for (let i = 0; i < ks.length; i += 4) {
      const rowItems = ks.slice(i, i + 4).map((k) => {
        const option = options[k];
        const selected = option.isOpen;
        const onItemClick = () => {
          HookUI.playSound();
          HookUI.toggle(option.id);
        };
        return /* @__PURE__ */ import_react18.default.createElement(
          icon_button_default,
          {
            key: "hk_btn_" + k,
            react,
            selected,
            holdTooltipOnSelected: "false",
            icon: option.icon,
            tooltipFloat: "up",
            tooltipAlign: "left",
            infoPanelStyle: "true",
            onClick: onItemClick
          },
          /* @__PURE__ */ import_react18.default.createElement(tooltip_content_default, { title: option.name })
        );
      });
      rows.push(/* @__PURE__ */ import_react18.default.createElement("div", { key: "hk_row_" + i, className: "row_B8G" }, rowItems));
    }
    return rows;
  };
  const panelContent = active ? /* @__PURE__ */ import_react18.default.createElement("div", { className: "content_XD5 content_AD7 child-opacity-transition_nkS content_Hzl" }, getOptions()) : null;
  const panelElement = visiblePlugins.map((p) => {
    const component = p.component;
    if (component) {
      const el = import_react18.default.createElement(component, { react });
      const onClose = () => {
        HookUI.playSound();
        HookUI.setPluginOpen(p.id, false);
      };
      return /* @__PURE__ */ import_react18.default.createElement("div", { key: p.id, title: p.name, style: p.panel_style || {} }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "panel_YqS active-infoview-panel_aTq", style: { marginRight: "7.5rem" } }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "header_H_U header_Bpo child-opacity-transition_nkS" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "title-bar_PF4 title_HFc" }, /* @__PURE__ */ import_react18.default.createElement("img", { className: "icon_OVK", src: p.icon }), /* @__PURE__ */ import_react18.default.createElement("div", { className: "title_SVH title_zQN" }, p.name), /* @__PURE__ */ import_react18.default.createElement("button", { className: "button_bvQ button_bvQ close-button_wKK", onClick: onClose }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "tinted-icon_iKo icon_PhD", style: { maskImage: "url(Media/Glyphs/Close.svg)" } })))), /* @__PURE__ */ import_react18.default.createElement("div", { className: "content_XD5 content_AD7 child-opacity-transition_nkS" }, /* @__PURE__ */ import_react18.default.createElement(scrollable_default, { react }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "infomodes-panel_B0O" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "labels_L7Q row_S2v uppercase_RJI" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "left_Lgw row_S2v" }, "Another test"), /* @__PURE__ */ import_react18.default.createElement("div", { className: "space_uKL" })))))));
    }
    return null;
  });
  const content = active ? /* @__PURE__ */ import_react18.default.createElement("div", { className: "panel_YqS menu_O_M" }, panelContent) : null;
  return /* @__PURE__ */ import_react18.default.createElement("div", { className: "infoview-menu_LhU infoview-menu_VQI" }, content, panelElement);
};
var infomode_panel_default = $HookUIInfomodePanel;

// src/jsx/_main-container.jsx
var $HookUIMainContainer = ({ react }) => {
  const [visiblePlugins, setVisiblePlugins] = react.useState([]);
  HookUIPlugins.use(react, HookUIPluginType.LEGACY, (plugins) => {
    setVisiblePlugins(plugins);
  });
  const pluginElements = visiblePlugins.map((p) => {
    const component = p.component;
    if (component) {
      const el = import_react19.default.createElement(component, { react });
      return /* @__PURE__ */ import_react19.default.createElement("div", { key: p.id }, el);
    } else {
      throw new Error("Unknown panel structure for registerPanel, missing .body or .component");
    }
  });
  return /* @__PURE__ */ import_react19.default.createElement(import_react19.default.Fragment, null, /* @__PURE__ */ import_react19.default.createElement("div", { className: "info-layout_BVk" }, /* @__PURE__ */ import_react19.default.createElement(infomode_panel_default, { react })), pluginElements);
};
window._$hookui.main_container = $HookUIMainContainer;
/*! Bundled license information:

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
