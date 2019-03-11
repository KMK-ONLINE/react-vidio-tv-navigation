(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global['react-focus-navigation'] = {})));
}(this, (function (exports) { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

	var n="function"===typeof Symbol&&Symbol.for,p=n?Symbol.for("react.element"):60103,q=n?Symbol.for("react.portal"):60106,r=n?Symbol.for("react.fragment"):60107,t=n?Symbol.for("react.strict_mode"):60108,u=n?Symbol.for("react.profiler"):60114,v=n?Symbol.for("react.provider"):60109,w=n?Symbol.for("react.context"):60110,x=n?Symbol.for("react.concurrent_mode"):60111,y=n?Symbol.for("react.forward_ref"):60112,z=n?Symbol.for("react.suspense"):60113,aa=n?Symbol.for("react.memo"):
	60115,ba=n?Symbol.for("react.lazy"):60116,A="function"===typeof Symbol&&Symbol.iterator;function ca(a,b,d,c,e,g,h,f){if(!a){a=void 0;if(void 0===b)a=Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[d,c,e,g,h,f],m=0;a=Error(b.replace(/%s/g,function(){return l[m++]}));a.name="Invariant Violation";}a.framesToPop=1;throw a;}}
	function B(a){for(var b=arguments.length-1,d="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=0;c<b;c++)d+="&args[]="+encodeURIComponent(arguments[c+1]);ca(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",d);}var C={isMounted:function(){return !1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},D={};
	function E(a,b,d){this.props=a;this.context=b;this.refs=D;this.updater=d||C;}E.prototype.isReactComponent={};E.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?B("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState");};E.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate");};function F(){}F.prototype=E.prototype;function G(a,b,d){this.props=a;this.context=b;this.refs=D;this.updater=d||C;}var H=G.prototype=new F;
	H.constructor=G;objectAssign(H,E.prototype);H.isPureReactComponent=!0;var I={current:null},J={current:null},K=Object.prototype.hasOwnProperty,L={key:!0,ref:!0,__self:!0,__source:!0};
	function M(a,b,d){var c=void 0,e={},g=null,h=null;if(null!=b)for(c in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(g=""+b.key),b)K.call(b,c)&&!L.hasOwnProperty(c)&&(e[c]=b[c]);var f=arguments.length-2;if(1===f)e.children=d;else if(1<f){for(var l=Array(f),m=0;m<f;m++)l[m]=arguments[m+2];e.children=l;}if(a&&a.defaultProps)for(c in f=a.defaultProps,f)void 0===e[c]&&(e[c]=f[c]);return {$$typeof:p,type:a,key:g,ref:h,props:e,_owner:J.current}}
	function da(a,b){return {$$typeof:p,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function N(a){return "object"===typeof a&&null!==a&&a.$$typeof===p}function escape(a){var b={"=":"=0",":":"=2"};return "$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var O=/\/+/g,P=[];function Q(a,b,d,c){if(P.length){var e=P.pop();e.result=a;e.keyPrefix=b;e.func=d;e.context=c;e.count=0;return e}return {result:a,keyPrefix:b,func:d,context:c,count:0}}
	function R(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>P.length&&P.push(a);}
	function S(a,b,d,c){var e=typeof a;if("undefined"===e||"boolean"===e)a=null;var g=!1;if(null===a)g=!0;else switch(e){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case p:case q:g=!0;}}if(g)return d(c,a,""===b?"."+T(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var h=0;h<a.length;h++){e=a[h];var f=b+T(e,h);g+=S(e,f,d,c);}else if(null===a||"object"!==typeof a?f=null:(f=A&&a[A]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=f.call(a),h=
	0;!(e=a.next()).done;)e=e.value,f=b+T(e,h++),g+=S(e,f,d,c);else"object"===e&&(d=""+a,B("31","[object Object]"===d?"object with keys {"+Object.keys(a).join(", ")+"}":d,""));return g}function U(a,b,d){return null==a?0:S(a,"",b,d)}function T(a,b){return "object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function ea(a,b){a.func.call(a.context,b,a.count++);}
	function fa(a,b,d){var c=a.result,e=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?V(a,c,d,function(a){return a}):null!=a&&(N(a)&&(a=da(a,e+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(O,"$&/")+"/")+d)),c.push(a));}function V(a,b,d,c,e){var g="";null!=d&&(g=(""+d).replace(O,"$&/")+"/");b=Q(b,g,c,e);U(a,fa,b);R(b);}function W(){var a=I.current;null===a?B("307"):void 0;return a}
	var X={Children:{map:function(a,b,d){if(null==a)return a;var c=[];V(a,c,null,b,d);return c},forEach:function(a,b,d){if(null==a)return a;b=Q(null,null,b,d);U(a,ea,b);R(b);},count:function(a){return U(a,function(){return null},null)},toArray:function(a){var b=[];V(a,b,null,function(a){return a});return b},only:function(a){N(a)?void 0:B("143");return a}},createRef:function(){return {current:null}},Component:E,PureComponent:G,createContext:function(a,b){void 0===b&&(b=null);a={$$typeof:w,_calculateChangedBits:b,
	_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:v,_context:a};return a.Consumer=a},forwardRef:function(a){return {$$typeof:y,render:a}},lazy:function(a){return {$$typeof:ba,_ctor:a,_status:-1,_result:null}},memo:function(a,b){return {$$typeof:aa,type:a,compare:void 0===b?null:b}},useCallback:function(a,b){return W().useCallback(a,b)},useContext:function(a,b){return W().useContext(a,b)},useEffect:function(a,b){return W().useEffect(a,b)},useImperativeHandle:function(a,
	b,d){return W().useImperativeHandle(a,b,d)},useDebugValue:function(){},useLayoutEffect:function(a,b){return W().useLayoutEffect(a,b)},useMemo:function(a,b){return W().useMemo(a,b)},useReducer:function(a,b,d){return W().useReducer(a,b,d)},useRef:function(a){return W().useRef(a)},useState:function(a){return W().useState(a)},Fragment:r,StrictMode:t,Suspense:z,createElement:M,cloneElement:function(a,b,d){null===a||void 0===a?B("267",a):void 0;var c=void 0,e=objectAssign({},a.props),g=a.key,h=a.ref,f=a._owner;if(null!=
	b){void 0!==b.ref&&(h=b.ref,f=J.current);void 0!==b.key&&(g=""+b.key);var l=void 0;a.type&&a.type.defaultProps&&(l=a.type.defaultProps);for(c in b)K.call(b,c)&&!L.hasOwnProperty(c)&&(e[c]=void 0===b[c]&&void 0!==l?l[c]:b[c]);}c=arguments.length-2;if(1===c)e.children=d;else if(1<c){l=Array(c);for(var m=0;m<c;m++)l[m]=arguments[m+2];e.children=l;}return {$$typeof:p,type:a.type,key:g,ref:h,props:e,_owner:f}},createFactory:function(a){var b=M.bind(null,a);b.type=a;return b},isValidElement:N,version:"16.8.4",
	unstable_ConcurrentMode:x,unstable_Profiler:u,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentDispatcher:I,ReactCurrentOwner:J,assign:objectAssign}},Y={default:X},Z=Y&&X||Y;var react_production_min=Z.default||Z;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var react_development = createCommonjsModule(function (module) {
	});

	var react = createCommonjsModule(function (module) {

	{
	  module.exports = react_production_min;
	}
	});

	var HORIZONTAL = "horizontal";
	var VERTICAL = "vertical";
	var MATRIX = "matrix";
	var ENTER = "enter";
	var UP = "up";
	var DOWN = "down";
	var LEFT = "left";
	var RIGHT = "right";
	var DEFAULT = "default";
	var POSITIVE = "positive";
	var NEGATIVE = "negative";

	var controllerContext = {
	  addParentToTree: function addParentToTree() {
	    throw new Error("addParentToTree method has to be implemented. It happens because ControllerContext.Provider is not used");
	  },
	  deleteParentFromTree: function deleteParentFromTree() {
	    throw new Error("deleteParentFromTree has to be implemented. It happens because ControllerContext.Provider is not used");
	  },
	  hasFocus: function hasFocus() {
	    throw new Error("hasFocus has to be implemented. It happens because ControllerContext.Provider is not used");
	  },

	  findAnotherParent: function findAnotherParent() {
	    throw new Error("findAnotherParent has to be implemented. It happens because ControllerContext.Provider is not used");
	  }
	};

	var ControllerContext = react.createContext(controllerContext);

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	var inherits = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	var possibleConstructorReturn = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};

	var keyMapping = {
	  "37": LEFT,
	  "38": UP,
	  "39": RIGHT,
	  "40": DOWN,
	  "13": ENTER
	};

	var Controller = function (_React$Component) {
	  inherits(Controller, _React$Component);

	  function Controller(props) {
	    classCallCheck(this, Controller);

	    var _this = possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).call(this, props));

	    _this.currentFocus = 0;
	    _this.state = {
	      tree: [],
	      addParentToTree: _this.addParentToTree.bind(_this),
	      deleteParentFromTree: _this.deleteParentFromTree.bind(_this),
	      hasFocus: _this.hasFocus.bind(_this),
	      findAnotherParent: _this.findAnotherParent.bind(_this)
	    };
	    return _this;
	  }

	  createClass(Controller, [{
	    key: "onKeyDown",
	    value: function onKeyDown(evt) {
	      var keymap = keyMapping[evt.keyCode];

	      if (this.currentFocus === null) return null;

	      if (keymap === ENTER) {
	        return this.handleEnter();
	      } else {
	        this.handleFocus(keymap);
	      }
	    }
	  }, {
	    key: "handleEnter",
	    value: function handleEnter() {
	      var tree = this.state.tree;

	      var currentFocus = this.getFocusState();
	      var parent = tree[currentFocus];
	      var parentState = parent.state;
	      if (parentState.tree[parent.currentFocus].props.onEnter) {
	        return parentState.tree[parent.currentFocus].props.onEnter();
	      }
	    }
	  }, {
	    key: "setFocusState",
	    value: function setFocusState(index, cb) {
	      this.currentFocus = index;
	      if (cb) cb(this.currentFocus);
	    }
	  }, {
	    key: "getFocusState",
	    value: function getFocusState() {
	      return this.currentFocus;
	    }
	  }, {
	    key: "hasFocus",
	    value: function hasFocus(parent) {
	      return this.state.tree[this.currentFocus] === parent;
	    }
	  }, {
	    key: "handleFocus",
	    value: function handleFocus(direction) {
	      var tree = this.state.tree;

	      var index = this.getFocusState();

	      if (tree[index].state.type === HORIZONTAL) this.handleFocusInHorizontalParent(direction);

	      if (tree[index].state.type === VERTICAL) this.handleFocusInVerticalParent(direction);

	      if (tree[index].state.type === MATRIX) this.handleFocusInMatrixParent(direction);
	    }
	  }, {
	    key: "findAnotherParent",
	    value: function findAnotherParent() {
	      if (this.canMoveToNextParent()) {
	        this.moveFocusInTree(POSITIVE);
	      } else if (this.canMoveToPreviousParent()) {
	        this.moveFocusInTree(NEGATIVE);
	      } else {
	        this.setEmptyState();
	      }
	    }
	  }, {
	    key: "setEmptyState",
	    value: function setEmptyState() {
	      this.currentFocus = null;
	    }
	  }, {
	    key: "canMoveToPreviousParent",
	    value: function canMoveToPreviousParent() {
	      return this.getFocusState() > 0;
	    }
	  }, {
	    key: "canMoveToNextParent",
	    value: function canMoveToNextParent() {
	      var tree = this.state.tree;


	      return this.getFocusState() < tree.length - 1;
	    }
	  }, {
	    key: "focusInParentOnInitEdge",
	    value: function focusInParentOnInitEdge() {
	      var tree = this.state.tree;

	      var currentFocus = this.getFocusState();

	      return tree[currentFocus].currentFocus === 0;
	    }
	  }, {
	    key: "focusInParentOnFinalEdge",
	    value: function focusInParentOnFinalEdge() {
	      var tree = this.state.tree;

	      var currentFocus = this.getFocusState();

	      return tree[currentFocus].currentFocus === tree[currentFocus].state.tree.length - 1;
	    }
	  }, {
	    key: "handleFocusInVerticalParent",
	    value: function handleFocusInVerticalParent(direction) {
	      var tree = this.state.tree;

	      var currentFocus = this.getFocusState();

	      if (direction === LEFT && this.canMoveToPreviousParent()) {
	        this.moveFocusInTree(NEGATIVE);
	      }

	      if (direction === RIGHT && this.canMoveToNextParent()) {
	        this.moveFocusInTree(POSITIVE);
	      }

	      if (direction === UP) {
	        if (this.focusInParentOnInitEdge() && this.canMoveToPreviousParent()) {
	          this.moveFocusInTree(NEGATIVE);
	        } else {
	          this.moveFocusInParent(tree[currentFocus], NEGATIVE);
	        }
	      }

	      if (direction === DOWN) {
	        if (this.focusInParentOnFinalEdge() && this.canMoveToNextParent()) {
	          this.moveFocusInTree(POSITIVE);
	        } else {
	          this.moveFocusInParent(tree[currentFocus], POSITIVE);
	        }
	      }
	    }
	  }, {
	    key: "handleFocusInHorizontalParent",
	    value: function handleFocusInHorizontalParent(direction) {
	      var tree = this.state.tree;

	      var currentFocus = this.getFocusState();

	      if (direction === UP && this.canMoveToPreviousParent()) {
	        this.moveFocusInTree(NEGATIVE);
	      }

	      if (direction === DOWN && this.canMoveToNextParent()) {
	        this.moveFocusInTree(POSITIVE);
	      }

	      if (direction === LEFT) {
	        if (this.focusInParentOnInitEdge() && this.canMoveToPreviousParent()) {
	          this.moveFocusInTree(NEGATIVE);
	        } else {
	          this.moveFocusInParent(tree[currentFocus], NEGATIVE);
	        }
	      }

	      if (direction === RIGHT) {
	        if (this.focusInParentOnFinalEdge() && this.canMoveToNextParent()) {
	          this.moveFocusInTree(POSITIVE);
	        } else {
	          this.moveFocusInParent(tree[currentFocus], POSITIVE);
	        }
	      }
	    }
	  }, {
	    key: "handleFocusInMatrixParent",
	    value: function handleFocusInMatrixParent(direction) {
	      var tree = this.state.tree;

	      var currentFocus = this.getFocusState();
	      var parent = tree[currentFocus];

	      if (direction === RIGHT) {
	        if (parent.currentFocus % parent.state.columns !== parent.state.columns - 1) {
	          this.quitFocusInParent(tree[currentFocus], tree[currentFocus].currentFocus);
	          this.moveFocusInParent(parent, POSITIVE);
	        } else if (this.canMoveToNextParent()) {
	          this.moveFocusInTree(POSITIVE);
	        }
	      }

	      if (direction === LEFT) {
	        if (parent.currentFocus % parent.state.columns !== 0) {
	          this.quitFocusInParent(tree[currentFocus], tree[currentFocus].currentFocus);
	          this.moveFocusInParent(parent, NEGATIVE);
	        } else if (this.canMoveToPreviousParent()) {
	          this.moveFocusInTree(NEGATIVE);
	        }
	      }

	      if (direction === DOWN) {
	        if (parent.state.columns * parent.state.rows - parent.currentFocus > parent.state.columns) {
	          this.quitFocusInParent(tree[currentFocus], tree[currentFocus].currentFocus);
	          this.moveFocusInParent(parent, POSITIVE, parent.state.columns);
	        } else if (this.canMoveToNextParent()) {
	          this.moveFocusInTree(POSITIVE);
	        }
	      }

	      if (direction === UP) {
	        if (parent.currentFocus - parent.state.columns >= 0) {
	          this.quitFocusInParent(tree[currentFocus], tree[currentFocus].currentFocus);
	          this.moveFocusInParent(parent, NEGATIVE, parent.state.columns);
	        } else if (this.canMoveToPreviousParent()) {
	          this.moveFocusInTree(NEGATIVE);
	        }
	      }
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      window.removeEventListener("keydown", this.onKeyDown.bind(this));
	    }
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      window.addEventListener("keydown", this.onKeyDown.bind(this));
	      this.setParentFocus(this.getFocusState());
	    }
	  }, {
	    key: "setParentFocus",
	    value: function setParentFocus(index) {
	      var _this2 = this;

	      this.setFocusState(index, function () {
	        if (_this2.state.tree.length > 0) {
	          var parent = _this2.state.tree[index];
	          _this2.moveFocusInParent(parent, DEFAULT);
	        }
	      });
	    }
	  }, {
	    key: "moveFocusInParent",
	    value: function moveFocusInParent(parent, direction) {
	      var threeshold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	      var tree = parent.state.tree;


	      if (direction === DEFAULT) {
	        this.setFocusInParent(parent, parent.currentFocus);
	      }

	      if (direction === NEGATIVE) {
	        if (parent.currentFocus > 0) {
	          this.quitFocusInParent(parent, parent.currentFocus);
	          this.setFocusInParent(parent, threeshold ? parent.currentFocus - threeshold : parent.currentFocus - 1);
	        }
	      }

	      if (direction === POSITIVE) {
	        if (parent.currentFocus < tree.length - 1) {
	          this.quitFocusInParent(parent, parent.currentFocus);
	          this.setFocusInParent(parent, threeshold ? parent.currentFocus + threeshold : parent.currentFocus + 1);
	        }
	      }
	    }
	  }, {
	    key: "moveFocusInTree",
	    value: function moveFocusInTree(direction) {
	      var _this3 = this;

	      var tree = this.state.tree;

	      var currentFocus = this.getFocusState();
	      var nextFocus = direction == NEGATIVE ? currentFocus - 1 : currentFocus + 1;
	      this.quitFocusInParent(tree[currentFocus], tree[currentFocus].currentFocus);
	      this.setFocusState(nextFocus, function (nextFocus) {
	        var parent = _this3.state.tree[nextFocus];
	        _this3.moveFocusInParent(parent, DEFAULT);
	      });
	    }
	  }, {
	    key: "setFocusInParent",
	    value: function setFocusInParent(parent, focusIndex) {
	      if (parent.props.onFocus) {
	        parent.props.onFocus(focusIndex);
	      }
	      if (parent.state.tree[focusIndex] && parent.state.tree[focusIndex].props.onFocus) {
	        parent.state.tree[focusIndex].props.onFocus();
	      }
	      parent.currentFocus = focusIndex;
	    }
	  }, {
	    key: "quitFocusInParent",
	    value: function quitFocusInParent(parent, focusIndex) {
	      if (parent.props.onBlur) {
	        parent.props.onBlur(focusIndex);
	      }
	      if (parent.state.tree[focusIndex] && parent.state.tree[focusIndex].props.onBlur) {
	        parent.state.tree[focusIndex].props.onBlur();
	      }
	      parent.currentFocus = focusIndex;
	    }
	  }, {
	    key: "addParentToTree",
	    value: function addParentToTree(parent) {
	      this.state.tree.push(parent);

	      if (parent.props.withFocus) {
	        var currentFocus = this.getFocusState();
	        var parentWithFocus = this.state.tree[currentFocus];
	        this.quitFocusInParent(parentWithFocus, parentWithFocus.currentFocus);
	        this.setParentFocus(this.state.tree.indexOf(parent));
	      }
	    }
	  }, {
	    key: "deleteParentFromTree",
	    value: function deleteParentFromTree(parent) {
	      var currentFocus = this.getFocusState();
	      var index = this.state.tree.indexOf(parent);

	      if (index === currentFocus) {
	        this.state.tree.splice(index, 1);
	        this.setParentFocus(0);
	      } else {
	        if (index < currentFocus) {
	          this.setFocusState(currentFocus - 1);
	        }
	        this.state.tree.splice(index, 1);
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return react.createElement(
	        ControllerContext.Provider,
	        { value: this.state },
	        this.props.children
	      );
	    }
	  }]);
	  return Controller;
	}(react.Component);

	var parentContext = {
	  columns: 0,
	  rows: 0,
	  tree: [],
	  type: HORIZONTAL,
	  addChildToTree: function addChildToTree() {
	    throw new Error("addChildToTree method has to be implemented. It happens because ParentContext.Consumer has been used without the ParentContext.Provider");
	  },
	  deleteChildFromTree: function deleteChildFromTree() {
	    throw new Error("deleteChildFromTree method has to be implemented. It happens because ParentContext.Consumer has been used without the ParentContext.Provider");
	  }
	};

	var ParentContext = react.createContext(parentContext);

	var FocusableChild = function (_React$Component) {
	  inherits(FocusableChild, _React$Component);

	  function FocusableChild(props) {
	    classCallCheck(this, FocusableChild);

	    var _this = possibleConstructorReturn(this, (FocusableChild.__proto__ || Object.getPrototypeOf(FocusableChild)).call(this, props));

	    _this.state = { className: props.className || "focusable" };
	    return _this;
	  }

	  createClass(FocusableChild, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.addToParentTree();
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      this.deleteFromParentTree();
	    }
	  }, {
	    key: "addToParentTree",
	    value: function addToParentTree() {
	      this.props.context.addChildToTree(this);
	    }
	  }, {
	    key: "deleteFromParentTree",
	    value: function deleteFromParentTree() {
	      this.props.context.deleteChildFromTree(this);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return react.createElement(
	        react.Fragment,
	        null,
	        this.props.children
	      );
	    }
	  }]);
	  return FocusableChild;
	}(react.Component);

	var Child = function (_React$Component2) {
	  inherits(Child, _React$Component2);

	  function Child() {
	    classCallCheck(this, Child);
	    return possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).apply(this, arguments));
	  }

	  createClass(Child, [{
	    key: "render",
	    value: function render() {
	      var _this3 = this;

	      return react.createElement(
	        ParentContext.Consumer,
	        null,
	        function (value) {
	          return react.createElement(FocusableChild, _extends({}, _this3.props, { context: value }));
	        }
	      );
	    }
	  }]);
	  return Child;
	}(react.Component);

	var ParentWithContext = function (_React$Component) {
	  inherits(ParentWithContext, _React$Component);

	  function ParentWithContext(props) {
	    classCallCheck(this, ParentWithContext);

	    var _this = possibleConstructorReturn(this, (ParentWithContext.__proto__ || Object.getPrototypeOf(ParentWithContext)).call(this, props));

	    _this.currentFocus = _this.props.currentFocus ? parseInt(_this.props.currentFocus) : 0;
	    _this.addChildToTree = _this.addChildToTree.bind(_this);
	    _this.deleteChildFromTree = _this.deleteChildFromTree.bind(_this);

	    _this.state = {
	      tree: [],
	      type: props.focusableType,
	      rows: props.rows,
	      columns: props.columns,
	      id: Math.random() * 1000000000,
	      addChildToTree: _this.addChildToTree,
	      deleteChildFromTree: _this.deleteChildFromTree
	    };
	    return _this;
	  }

	  createClass(ParentWithContext, [{
	    key: "addChildToTree",
	    value: function addChildToTree(child) {
	      this.state.tree.push(child);
	    }
	  }, {
	    key: "deleteChildFromTree",
	    value: function deleteChildFromTree(child) {
	      var index = this.state.tree.indexOf(child);

	      if (index === this.currentFocus) {
	        this.state.tree.splice(index, 1);

	        if (this.state.tree.length === 0 && this.hasFocusInController()) {
	          return this.props.context.findAnotherParent();
	        }

	        this.currentFocus = index > 0 ? index - 1 : 0;
	        if (this.hasFocusInController() && this.state.tree[this.currentFocus].props.onFocus) {
	          this.state.tree[this.currentFocus].props.onFocus();
	        }
	      } else {
	        if (index < this.currentFocus) {
	          if (this.state.tree[this.currentFocus].props.onBlur) {
	            this.state.tree[this.currentFocus].props.onBlur(this.currentFocus);
	          }
	          this.currentFocus = this.currentFocus - 1;
	          if (this.state.tree[this.currentFocus].props.onFocus) {
	            this.state.tree[this.currentFocus].props.onFocus(this.currentFocus);
	          }
	        }
	        this.state.tree.splice(index, 1);
	      }
	    }
	  }, {
	    key: "hasFocusInController",
	    value: function hasFocusInController() {
	      return this.props.context.hasFocus(this);
	    }
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.props.context.addParentToTree(this);
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      this.props.context.deleteParentFromTree(this);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return react.createElement(
	        ParentContext.Provider,
	        { value: this.state },
	        react.createElement(
	          "ul",
	          {
	            onFocus: this.props.onFocus,
	            onBlur: this.props.onBlur,
	            className: this.props.className
	          },
	          this.props.children
	        )
	      );
	    }
	  }]);
	  return ParentWithContext;
	}(react.Component);

	var Parent = function (_React$Component2) {
	  inherits(Parent, _React$Component2);

	  function Parent() {
	    classCallCheck(this, Parent);
	    return possibleConstructorReturn(this, (Parent.__proto__ || Object.getPrototypeOf(Parent)).apply(this, arguments));
	  }

	  createClass(Parent, [{
	    key: "render",
	    value: function render() {
	      var _this3 = this;

	      return react.createElement(
	        ControllerContext.Consumer,
	        null,
	        function (state) {
	          return react.createElement(ParentWithContext, _extends({}, _this3.props, { context: state }));
	        }
	      );
	    }
	  }]);
	  return Parent;
	}(react.Component);

	var HorizontalParent = function (_React$Component3) {
	  inherits(HorizontalParent, _React$Component3);

	  function HorizontalParent() {
	    classCallCheck(this, HorizontalParent);
	    return possibleConstructorReturn(this, (HorizontalParent.__proto__ || Object.getPrototypeOf(HorizontalParent)).apply(this, arguments));
	  }

	  createClass(HorizontalParent, [{
	    key: "render",
	    value: function render() {
	      return react.createElement(
	        Parent,
	        _extends({}, this.props, { focusableType: HORIZONTAL }),
	        this.props.children
	      );
	    }
	  }]);
	  return HorizontalParent;
	}(react.Component);

	var MatrixParent = function (_React$Component4) {
	  inherits(MatrixParent, _React$Component4);

	  function MatrixParent() {
	    classCallCheck(this, MatrixParent);
	    return possibleConstructorReturn(this, (MatrixParent.__proto__ || Object.getPrototypeOf(MatrixParent)).apply(this, arguments));
	  }

	  createClass(MatrixParent, [{
	    key: "render",
	    value: function render() {
	      return react.createElement(
	        Parent,
	        _extends({}, this.props, { focusableType: MATRIX }),
	        this.props.children
	      );
	    }
	  }]);
	  return MatrixParent;
	}(react.Component);

	var VerticalParent = function (_React$Component5) {
	  inherits(VerticalParent, _React$Component5);

	  function VerticalParent() {
	    classCallCheck(this, VerticalParent);
	    return possibleConstructorReturn(this, (VerticalParent.__proto__ || Object.getPrototypeOf(VerticalParent)).apply(this, arguments));
	  }

	  createClass(VerticalParent, [{
	    key: "render",
	    value: function render() {
	      return react.createElement(
	        Parent,
	        _extends({}, this.props, { focusableType: VERTICAL }),
	        this.props.children,
	        " "
	      );
	    }
	  }]);
	  return VerticalParent;
	}(react.Component);

	exports.Controller = Controller;
	exports.Child = Child;
	exports.VerticalParent = VerticalParent;
	exports.HorizontalParent = HorizontalParent;
	exports.MatrixParent = MatrixParent;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
