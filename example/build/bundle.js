var ReactSpatialNavigation = (function (exports) {
	'use strict';

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

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	var invariant_1 = invariant;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var emptyObject = {};

	var emptyObject_1 = emptyObject;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	var emptyFunction_1 = emptyFunction;

	var r="function"===typeof Symbol&&Symbol.for,t=r?Symbol.for("react.element"):60103,u=r?Symbol.for("react.portal"):60106,v=r?Symbol.for("react.fragment"):60107,w=r?Symbol.for("react.strict_mode"):60108,x=r?Symbol.for("react.profiler"):60114,y=r?Symbol.for("react.provider"):60109,z=r?Symbol.for("react.context"):60110,A=r?Symbol.for("react.async_mode"):60111,B=
	r?Symbol.for("react.forward_ref"):60112;var C="function"===typeof Symbol&&Symbol.iterator;function D(a){for(var b=arguments.length-1,e="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=0;c<b;c++)e+="&args[]="+encodeURIComponent(arguments[c+1]);invariant_1(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",e);}
	var E={isMounted:function(){return !1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};function F(a,b,e){this.props=a;this.context=b;this.refs=emptyObject_1;this.updater=e||E;}F.prototype.isReactComponent={};F.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?D("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState");};F.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate");};function G(){}
	G.prototype=F.prototype;function H(a,b,e){this.props=a;this.context=b;this.refs=emptyObject_1;this.updater=e||E;}var I=H.prototype=new G;I.constructor=H;objectAssign(I,F.prototype);I.isPureReactComponent=!0;var J={current:null},K=Object.prototype.hasOwnProperty,L={key:!0,ref:!0,__self:!0,__source:!0};
	function M(a,b,e){var c=void 0,d={},g=null,h=null;if(null!=b)for(c in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(g=""+b.key),b)K.call(b,c)&&!L.hasOwnProperty(c)&&(d[c]=b[c]);var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){for(var l=Array(f),m=0;m<f;m++)l[m]=arguments[m+2];d.children=l;}if(a&&a.defaultProps)for(c in f=a.defaultProps,f)void 0===d[c]&&(d[c]=f[c]);return {$$typeof:t,type:a,key:g,ref:h,props:d,_owner:J.current}}
	function N(a){return "object"===typeof a&&null!==a&&a.$$typeof===t}function escape(a){var b={"=":"=0",":":"=2"};return "$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var O=/\/+/g,P=[];function Q(a,b,e,c){if(P.length){var d=P.pop();d.result=a;d.keyPrefix=b;d.func=e;d.context=c;d.count=0;return d}return {result:a,keyPrefix:b,func:e,context:c,count:0}}function R(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>P.length&&P.push(a);}
	function S(a,b,e,c){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case t:case u:g=!0;}}if(g)return e(c,a,""===b?"."+T(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var h=0;h<a.length;h++){d=a[h];var f=b+T(d,h);g+=S(d,f,e,c);}else if(null===a||"undefined"===typeof a?f=null:(f=C&&a[C]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=f.call(a),
	h=0;!(d=a.next()).done;)d=d.value,f=b+T(d,h++),g+=S(d,f,e,c);else"object"===d&&(e=""+a,D("31","[object Object]"===e?"object with keys {"+Object.keys(a).join(", ")+"}":e,""));return g}function T(a,b){return "object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function U(a,b){a.func.call(a.context,b,a.count++);}
	function V(a,b,e){var c=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?W(a,c,e,emptyFunction_1.thatReturnsArgument):null!=a&&(N(a)&&(b=d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(O,"$&/")+"/")+e,a={$$typeof:t,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}),c.push(a));}function W(a,b,e,c,d){var g="";null!=e&&(g=(""+e).replace(O,"$&/")+"/");b=Q(b,g,c,d);null==a||S(a,"",V,b);R(b);}
	var X={Children:{map:function(a,b,e){if(null==a)return a;var c=[];W(a,c,null,b,e);return c},forEach:function(a,b,e){if(null==a)return a;b=Q(null,null,b,e);null==a||S(a,"",U,b);R(b);},count:function(a){return null==a?0:S(a,"",emptyFunction_1.thatReturnsNull,null)},toArray:function(a){var b=[];W(a,b,null,emptyFunction_1.thatReturnsArgument);return b},only:function(a){N(a)?void 0:D("143");return a}},createRef:function(){return {current:null}},Component:F,PureComponent:H,createContext:function(a,b){void 0===b&&(b=null);a={$$typeof:z,
	_calculateChangedBits:b,_defaultValue:a,_currentValue:a,_currentValue2:a,_changedBits:0,_changedBits2:0,Provider:null,Consumer:null};a.Provider={$$typeof:y,_context:a};return a.Consumer=a},forwardRef:function(a){return {$$typeof:B,render:a}},Fragment:v,StrictMode:w,unstable_AsyncMode:A,unstable_Profiler:x,createElement:M,cloneElement:function(a,b,e){null===a||void 0===a?D("267",a):void 0;var c=void 0,d=objectAssign({},a.props),g=a.key,h=a.ref,f=a._owner;if(null!=b){void 0!==b.ref&&(h=b.ref,f=J.current);void 0!==
	b.key&&(g=""+b.key);var l=void 0;a.type&&a.type.defaultProps&&(l=a.type.defaultProps);for(c in b)K.call(b,c)&&!L.hasOwnProperty(c)&&(d[c]=void 0===b[c]&&void 0!==l?l[c]:b[c]);}c=arguments.length-2;if(1===c)d.children=e;else if(1<c){l=Array(c);for(var m=0;m<c;m++)l[m]=arguments[m+2];d.children=l;}return {$$typeof:t,type:a.type,key:g,ref:h,props:d,_owner:f}},createFactory:function(a){var b=M.bind(null,a);b.type=a;return b},isValidElement:N,version:"16.4.1",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:J,
	assign:objectAssign}},Y={default:X},Z=Y&&X||Y;var react_production_min=Z.default?Z.default:Z;

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

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {

	  canUseDOM: canUseDOM,

	  canUseWorkers: typeof Worker !== 'undefined',

	  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

	  canUseViewport: canUseDOM && !!window.screen,

	  isInWorker: !canUseDOM // For now, this is true - might change in the future.

	};

	var ExecutionEnvironment_1 = ExecutionEnvironment;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */

	/* eslint-disable fb-www/typeof-undefined */

	/**
	 * Same as document.activeElement but wraps in a try-catch block. In IE it is
	 * not safe to call document.activeElement if there is nothing focused.
	 *
	 * The activeElement will be null only if the document or document body is not
	 * yet defined.
	 *
	 * @param {?DOMDocument} doc Defaults to current document.
	 * @return {?DOMElement}
	 */
	function getActiveElement(doc) /*?DOMElement*/{
	  doc = doc || (typeof document !== 'undefined' ? document : undefined);
	  if (typeof doc === 'undefined') {
	    return null;
	  }
	  try {
	    return doc.activeElement || doc.body;
	  } catch (e) {
	    return doc.body;
	  }
	}

	var getActiveElement_1 = getActiveElement;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 * 
	 */

	var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */
	function is(x, y) {
	  // SameValue algorithm
	  if (x === y) {
	    // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    // Added the nonzero y check to make Flow happy, but it is redundant
	    return x !== 0 || y !== 0 || 1 / x === 1 / y;
	  } else {
	    // Step 6.a: NaN == NaN
	    return x !== x && y !== y;
	  }
	}

	/**
	 * Performs equality by iterating through keys on an object and returning false
	 * when any key has values which are not strictly equal between the arguments.
	 * Returns true when the values of all keys are strictly equal.
	 */
	function shallowEqual(objA, objB) {
	  if (is(objA, objB)) {
	    return true;
	  }

	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwnProperty$1.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
	      return false;
	    }
	  }

	  return true;
	}

	var shallowEqual_1 = shallowEqual;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */

	/**
	 * @param {*} object The object to check.
	 * @return {boolean} Whether or not the object is a DOM node.
	 */
	function isNode(object) {
	  var doc = object ? object.ownerDocument || object : document;
	  var defaultView = doc.defaultView || window;
	  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
	}

	var isNode_1 = isNode;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * @typechecks
	 */



	/**
	 * @param {*} object The object to check.
	 * @return {boolean} Whether or not the object is a DOM text node.
	 */
	function isTextNode(object) {
	  return isNode_1(object) && object.nodeType == 3;
	}

	var isTextNode_1 = isTextNode;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */



	/*eslint-disable no-bitwise */

	/**
	 * Checks if a given DOM node contains or is another DOM node.
	 */
	function containsNode(outerNode, innerNode) {
	  if (!outerNode || !innerNode) {
	    return false;
	  } else if (outerNode === innerNode) {
	    return true;
	  } else if (isTextNode_1(outerNode)) {
	    return false;
	  } else if (isTextNode_1(innerNode)) {
	    return containsNode(outerNode, innerNode.parentNode);
	  } else if ('contains' in outerNode) {
	    return outerNode.contains(innerNode);
	  } else if (outerNode.compareDocumentPosition) {
	    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
	  } else {
	    return false;
	  }
	}

	var containsNode_1 = containsNode;

	function A$1(a){for(var b=arguments.length-1,c="https://reactjs.org/docs/error-decoder.html?invariant="+a,d=0;d<b;d++)c+="&args[]="+encodeURIComponent(arguments[d+1]);invariant_1(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",c);}react?void 0:A$1("227");
	function ia(a,b,c,d,e,f,g,h,k){this._hasCaughtError=!1;this._caughtError=null;var n=Array.prototype.slice.call(arguments,3);try{b.apply(c,n);}catch(r){this._caughtError=r,this._hasCaughtError=!0;}}
	var B$1={_caughtError:null,_hasCaughtError:!1,_rethrowError:null,_hasRethrowError:!1,invokeGuardedCallback:function(a,b,c,d,e,f,g,h,k){ia.apply(B$1,arguments);},invokeGuardedCallbackAndCatchFirstError:function(a,b,c,d,e,f,g,h,k){B$1.invokeGuardedCallback.apply(this,arguments);if(B$1.hasCaughtError()){var n=B$1.clearCaughtError();B$1._hasRethrowError||(B$1._hasRethrowError=!0,B$1._rethrowError=n);}},rethrowCaughtError:function(){return ka.apply(B$1,arguments)},hasCaughtError:function(){return B$1._hasCaughtError},clearCaughtError:function(){if(B$1._hasCaughtError){var a=
	B$1._caughtError;B$1._caughtError=null;B$1._hasCaughtError=!1;return a}A$1("198");}};function ka(){if(B$1._hasRethrowError){var a=B$1._rethrowError;B$1._rethrowError=null;B$1._hasRethrowError=!1;throw a;}}var la=null,ma={};
	function na(){if(la)for(var a in ma){var b=ma[a],c=la.indexOf(a);-1<c?void 0:A$1("96",a);if(!oa[c]){b.extractEvents?void 0:A$1("97",a);oa[c]=b;c=b.eventTypes;for(var d in c){var e=void 0;var f=c[d],g=b,h=d;pa.hasOwnProperty(h)?A$1("99",h):void 0;pa[h]=f;var k=f.phasedRegistrationNames;if(k){for(e in k)k.hasOwnProperty(e)&&qa(k[e],g,h);e=!0;}else f.registrationName?(qa(f.registrationName,g,h),e=!0):e=!1;e?void 0:A$1("98",d,a);}}}}
	function qa(a,b,c){ra[a]?A$1("100",a):void 0;ra[a]=b;sa[a]=b.eventTypes[c].dependencies;}var oa=[],pa={},ra={},sa={};function ta(a){la?A$1("101"):void 0;la=Array.prototype.slice.call(a);na();}function ua(a){var b=!1,c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];ma.hasOwnProperty(c)&&ma[c]===d||(ma[c]=d,b=!0);}b&&na();}
	var va={plugins:oa,eventNameDispatchConfigs:pa,registrationNameModules:ra,registrationNameDependencies:sa,possibleRegistrationNames:null,injectEventPluginOrder:ta,injectEventPluginsByName:ua},wa=null,xa=null,ya=null;function za(a,b,c,d){b=a.type||"unknown-event";a.currentTarget=ya(d);B$1.invokeGuardedCallbackAndCatchFirstError(b,c,void 0,a);a.currentTarget=null;}
	function Aa(a,b){null==b?A$1("30"):void 0;if(null==a)return b;if(Array.isArray(a)){if(Array.isArray(b))return a.push.apply(a,b),a;a.push(b);return a}return Array.isArray(b)?[a].concat(b):[a,b]}function Ba(a,b,c){Array.isArray(a)?a.forEach(b,c):a&&b.call(c,a);}var Ca=null;
	function Da(a,b){if(a){var c=a._dispatchListeners,d=a._dispatchInstances;if(Array.isArray(c))for(var e=0;e<c.length&&!a.isPropagationStopped();e++)za(a,b,c[e],d[e]);else c&&za(a,b,c,d);a._dispatchListeners=null;a._dispatchInstances=null;a.isPersistent()||a.constructor.release(a);}}function Ea(a){return Da(a,!0)}function Fa(a){return Da(a,!1)}var Ga={injectEventPluginOrder:ta,injectEventPluginsByName:ua};
	function Ha(a,b){var c=a.stateNode;if(!c)return null;var d=wa(c);if(!d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1;}if(a)return null;c&&"function"!==typeof c?A$1("231",b,typeof c):void 0;
	return c}function Ia(a,b){null!==a&&(Ca=Aa(Ca,a));a=Ca;Ca=null;a&&(b?Ba(a,Ea):Ba(a,Fa),Ca?A$1("95"):void 0,B$1.rethrowCaughtError());}function Ja(a,b,c,d){for(var e=null,f=0;f<oa.length;f++){var g=oa[f];g&&(g=g.extractEvents(a,b,c,d))&&(e=Aa(e,g));}Ia(e,!1);}var Ka={injection:Ga,getListener:Ha,runEventsInBatch:Ia,runExtractedEventsInBatch:Ja},La=Math.random().toString(36).slice(2),C$1="__reactInternalInstance$"+La,Ma="__reactEventHandlers$"+La;
	function Na(a){if(a[C$1])return a[C$1];for(;!a[C$1];)if(a.parentNode)a=a.parentNode;else return null;a=a[C$1];return 5===a.tag||6===a.tag?a:null}function Oa(a){if(5===a.tag||6===a.tag)return a.stateNode;A$1("33");}function Pa(a){return a[Ma]||null}var Qa={precacheFiberNode:function(a,b){b[C$1]=a;},getClosestInstanceFromNode:Na,getInstanceFromNode:function(a){a=a[C$1];return !a||5!==a.tag&&6!==a.tag?null:a},getNodeFromInstance:Oa,getFiberCurrentPropsFromNode:Pa,updateFiberProps:function(a,b){a[Ma]=b;}};
	function F$1(a){do a=a.return;while(a&&5!==a.tag);return a?a:null}function Ra(a,b,c){for(var d=[];a;)d.push(a),a=F$1(a);for(a=d.length;0<a--;)b(d[a],"captured",c);for(a=0;a<d.length;a++)b(d[a],"bubbled",c);}function Sa(a,b,c){if(b=Ha(a,c.dispatchConfig.phasedRegistrationNames[b]))c._dispatchListeners=Aa(c._dispatchListeners,b),c._dispatchInstances=Aa(c._dispatchInstances,a);}function Ta(a){a&&a.dispatchConfig.phasedRegistrationNames&&Ra(a._targetInst,Sa,a);}
	function Ua(a){if(a&&a.dispatchConfig.phasedRegistrationNames){var b=a._targetInst;b=b?F$1(b):null;Ra(b,Sa,a);}}function Va(a,b,c){a&&c&&c.dispatchConfig.registrationName&&(b=Ha(a,c.dispatchConfig.registrationName))&&(c._dispatchListeners=Aa(c._dispatchListeners,b),c._dispatchInstances=Aa(c._dispatchInstances,a));}function Xa(a){a&&a.dispatchConfig.registrationName&&Va(a._targetInst,null,a);}function Ya(a){Ba(a,Ta);}
	function Za(a,b,c,d){if(c&&d)a:{var e=c;for(var f=d,g=0,h=e;h;h=F$1(h))g++;h=0;for(var k=f;k;k=F$1(k))h++;for(;0<g-h;)e=F$1(e),g--;for(;0<h-g;)f=F$1(f),h--;for(;g--;){if(e===f||e===f.alternate)break a;e=F$1(e);f=F$1(f);}e=null;}else e=null;f=e;for(e=[];c&&c!==f;){g=c.alternate;if(null!==g&&g===f)break;e.push(c);c=F$1(c);}for(c=[];d&&d!==f;){g=d.alternate;if(null!==g&&g===f)break;c.push(d);d=F$1(d);}for(d=0;d<e.length;d++)Va(e[d],"bubbled",a);for(a=c.length;0<a--;)Va(c[a],"captured",b);}
	var $a={accumulateTwoPhaseDispatches:Ya,accumulateTwoPhaseDispatchesSkipTarget:function(a){Ba(a,Ua);},accumulateEnterLeaveDispatches:Za,accumulateDirectDispatches:function(a){Ba(a,Xa);}};function ab(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;c["ms"+a]="MS"+b;c["O"+a]="o"+b.toLowerCase();return c}
	var bb={animationend:ab("Animation","AnimationEnd"),animationiteration:ab("Animation","AnimationIteration"),animationstart:ab("Animation","AnimationStart"),transitionend:ab("Transition","TransitionEnd")},cb={},db={};ExecutionEnvironment_1.canUseDOM&&(db=document.createElement("div").style,"AnimationEvent"in window||(delete bb.animationend.animation,delete bb.animationiteration.animation,delete bb.animationstart.animation),"TransitionEvent"in window||delete bb.transitionend.transition);
	function eb(a){if(cb[a])return cb[a];if(!bb[a])return a;var b=bb[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in db)return cb[a]=b[c];return a}var fb=eb("animationend"),gb=eb("animationiteration"),hb=eb("animationstart"),ib=eb("transitionend"),jb="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),kb=null;
	function lb(){!kb&&ExecutionEnvironment_1.canUseDOM&&(kb="textContent"in document.documentElement?"textContent":"innerText");return kb}var G$1={_root:null,_startText:null,_fallbackText:null};function mb(){if(G$1._fallbackText)return G$1._fallbackText;var a,b=G$1._startText,c=b.length,d,e=nb(),f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);G$1._fallbackText=e.slice(a,1<d?1-d:void 0);return G$1._fallbackText}function nb(){return "value"in G$1._root?G$1._root.value:G$1._root[lb()]}
	var ob="dispatchConfig _targetInst nativeEvent isDefaultPrevented isPropagationStopped _dispatchListeners _dispatchInstances".split(" "),pb={type:null,target:null,currentTarget:emptyFunction_1.thatReturnsNull,eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};
	function H$1(a,b,c,d){this.dispatchConfig=a;this._targetInst=b;this.nativeEvent=c;a=this.constructor.Interface;for(var e in a)a.hasOwnProperty(e)&&((b=a[e])?this[e]=b(c):"target"===e?this.target=d:this[e]=c[e]);this.isDefaultPrevented=(null!=c.defaultPrevented?c.defaultPrevented:!1===c.returnValue)?emptyFunction_1.thatReturnsTrue:emptyFunction_1.thatReturnsFalse;this.isPropagationStopped=emptyFunction_1.thatReturnsFalse;return this}
	objectAssign(H$1.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=emptyFunction_1.thatReturnsTrue);},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=emptyFunction_1.thatReturnsTrue);},persist:function(){this.isPersistent=emptyFunction_1.thatReturnsTrue;},isPersistent:emptyFunction_1.thatReturnsFalse,
	destructor:function(){var a=this.constructor.Interface,b;for(b in a)this[b]=null;for(a=0;a<ob.length;a++)this[ob[a]]=null;}});H$1.Interface=pb;H$1.extend=function(a){function b(){}function c(){return d.apply(this,arguments)}var d=this;b.prototype=d.prototype;var e=new b;objectAssign(e,c.prototype);c.prototype=e;c.prototype.constructor=c;c.Interface=objectAssign({},d.Interface,a);c.extend=d.extend;qb(c);return c};qb(H$1);
	function rb(a,b,c,d){if(this.eventPool.length){var e=this.eventPool.pop();this.call(e,a,b,c,d);return e}return new this(a,b,c,d)}function sb(a){a instanceof this?void 0:A$1("223");a.destructor();10>this.eventPool.length&&this.eventPool.push(a);}function qb(a){a.eventPool=[];a.getPooled=rb;a.release=sb;}var tb=H$1.extend({data:null}),ub=H$1.extend({data:null}),vb=[9,13,27,32],wb=ExecutionEnvironment_1.canUseDOM&&"CompositionEvent"in window,xb=null;ExecutionEnvironment_1.canUseDOM&&"documentMode"in document&&(xb=document.documentMode);
	var yb=ExecutionEnvironment_1.canUseDOM&&"TextEvent"in window&&!xb,zb=ExecutionEnvironment_1.canUseDOM&&(!wb||xb&&8<xb&&11>=xb),Ab=String.fromCharCode(32),Bb={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["compositionend","keypress","textInput","paste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:"blur compositionend keydown keypress keyup mousedown".split(" ")},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",
	captured:"onCompositionStartCapture"},dependencies:"blur compositionstart keydown keypress keyup mousedown".split(" ")},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:"blur compositionupdate keydown keypress keyup mousedown".split(" ")}},Cb=!1;
	function Db(a,b){switch(a){case "keyup":return -1!==vb.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "blur":return !0;default:return !1}}function Eb(a){a=a.detail;return "object"===typeof a&&"data"in a?a.data:null}var Fb=!1;function Gb(a,b){switch(a){case "compositionend":return Eb(b);case "keypress":if(32!==b.which)return null;Cb=!0;return Ab;case "textInput":return a=b.data,a===Ab&&Cb?null:a;default:return null}}
	function Hb(a,b){if(Fb)return "compositionend"===a||!wb&&Db(a,b)?(a=mb(),G$1._root=null,G$1._startText=null,G$1._fallbackText=null,Fb=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return zb?null:b.data;default:return null}}
	var Ib={eventTypes:Bb,extractEvents:function(a,b,c,d){var e=void 0;var f=void 0;if(wb)b:{switch(a){case "compositionstart":e=Bb.compositionStart;break b;case "compositionend":e=Bb.compositionEnd;break b;case "compositionupdate":e=Bb.compositionUpdate;break b}e=void 0;}else Fb?Db(a,c)&&(e=Bb.compositionEnd):"keydown"===a&&229===c.keyCode&&(e=Bb.compositionStart);e?(zb&&(Fb||e!==Bb.compositionStart?e===Bb.compositionEnd&&Fb&&(f=mb()):(G$1._root=d,G$1._startText=nb(),Fb=!0)),e=tb.getPooled(e,b,c,d),f?e.data=
	f:(f=Eb(c),null!==f&&(e.data=f)),Ya(e),f=e):f=null;(a=yb?Gb(a,c):Hb(a,c))?(b=ub.getPooled(Bb.beforeInput,b,c,d),b.data=a,Ya(b)):b=null;return null===f?b:null===b?f:[f,b]}},Jb=null,Kb={injectFiberControlledHostComponent:function(a){Jb=a;}},Lb=null,Mb=null;function Nb(a){if(a=xa(a)){Jb&&"function"===typeof Jb.restoreControlledState?void 0:A$1("194");var b=wa(a.stateNode);Jb.restoreControlledState(a.stateNode,a.type,b);}}function Ob(a){Lb?Mb?Mb.push(a):Mb=[a]:Lb=a;}
	function Pb(){return null!==Lb||null!==Mb}function Qb(){if(Lb){var a=Lb,b=Mb;Mb=Lb=null;Nb(a);if(b)for(a=0;a<b.length;a++)Nb(b[a]);}}var Rb={injection:Kb,enqueueStateRestore:Ob,needsStateRestore:Pb,restoreStateIfNeeded:Qb};function Sb(a,b){return a(b)}function Tb(a,b,c){return a(b,c)}function Ub(){}var Vb=!1;function Wb(a,b){if(Vb)return a(b);Vb=!0;try{return Sb(a,b)}finally{Vb=!1,Pb()&&(Ub(),Qb());}}
	var Xb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Yb(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return "input"===b?!!Xb[a.type]:"textarea"===b?!0:!1}function Zb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}
	function $b(a,b){if(!ExecutionEnvironment_1.canUseDOM||b&&!("addEventListener"in document))return !1;a="on"+a;b=a in document;b||(b=document.createElement("div"),b.setAttribute(a,"return;"),b="function"===typeof b[a]);return b}function ac(a){var b=a.type;return (a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
	function bc(a){var b=ac(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a);}});Object.defineProperty(a,b,{enumerable:c.enumerable});return {getValue:function(){return d},setValue:function(a){d=""+a;},stopTracking:function(){a._valueTracker=
	null;delete a[b];}}}}function cc(a){a._valueTracker||(a._valueTracker=bc(a));}function dc(a){if(!a)return !1;var b=a._valueTracker;if(!b)return !0;var c=b.getValue();var d="";a&&(d=ac(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}
	var ec=react.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,fc="function"===typeof Symbol&&Symbol.for,gc=fc?Symbol.for("react.element"):60103,hc=fc?Symbol.for("react.portal"):60106,ic=fc?Symbol.for("react.fragment"):60107,jc=fc?Symbol.for("react.strict_mode"):60108,kc=fc?Symbol.for("react.profiler"):60114,lc=fc?Symbol.for("react.provider"):60109,mc=fc?Symbol.for("react.context"):60110,pc=fc?Symbol.for("react.async_mode"):60111,qc=fc?Symbol.for("react.forward_ref"):60112,rc=fc?Symbol.for("react.timeout"):
	60113,sc="function"===typeof Symbol&&Symbol.iterator;function tc(a){if(null===a||"undefined"===typeof a)return null;a=sc&&a[sc]||a["@@iterator"];return "function"===typeof a?a:null}
	function uc(a){var b=a.type;if("function"===typeof b)return b.displayName||b.name;if("string"===typeof b)return b;switch(b){case pc:return "AsyncMode";case mc:return "Context.Consumer";case ic:return "ReactFragment";case hc:return "ReactPortal";case kc:return "Profiler("+a.pendingProps.id+")";case lc:return "Context.Provider";case jc:return "StrictMode";case rc:return "Timeout"}if("object"===typeof b&&null!==b)switch(b.$$typeof){case qc:return a=b.render.displayName||b.render.name||"",""!==a?"ForwardRef("+
	a+")":"ForwardRef"}return null}function vc(a){var b="";do{a:switch(a.tag){case 0:case 1:case 2:case 5:var c=a._debugOwner,d=a._debugSource;var e=uc(a);var f=null;c&&(f=uc(c));c=d;e="\n    in "+(e||"Unknown")+(c?" (at "+c.fileName.replace(/^.*[\\\/]/,"")+":"+c.lineNumber+")":f?" (created by "+f+")":"");break a;default:e="";}b+=e;a=a.return;}while(a);return b}
	var wc=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,xc={},zc={};function Ac(a){if(zc.hasOwnProperty(a))return !0;if(xc.hasOwnProperty(a))return !1;if(wc.test(a))return zc[a]=!0;xc[a]=!0;return !1}
	function Bc(a,b,c,d){if(null!==c&&0===c.type)return !1;switch(typeof b){case "function":case "symbol":return !0;case "boolean":if(d)return !1;if(null!==c)return !c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return "data-"!==a&&"aria-"!==a;default:return !1}}function Cc(a,b,c,d){if(null===b||"undefined"===typeof b||Bc(a,b,c,d))return !0;if(d)return !1;if(null!==c)switch(c.type){case 3:return !b;case 4:return !1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return !1}
	function I$1(a,b,c,d,e){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;}var J$1={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){J$1[a]=new I$1(a,0,!1,a,null);});
	[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];J$1[b]=new I$1(b,1,!1,a[1],null);});["contentEditable","draggable","spellCheck","value"].forEach(function(a){J$1[a]=new I$1(a,2,!1,a.toLowerCase(),null);});["autoReverse","externalResourcesRequired","preserveAlpha"].forEach(function(a){J$1[a]=new I$1(a,2,!1,a,null);});
	"allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){J$1[a]=new I$1(a,3,!1,a.toLowerCase(),null);});["checked","multiple","muted","selected"].forEach(function(a){J$1[a]=new I$1(a,3,!0,a.toLowerCase(),null);});["capture","download"].forEach(function(a){J$1[a]=new I$1(a,4,!1,a.toLowerCase(),null);});
	["cols","rows","size","span"].forEach(function(a){J$1[a]=new I$1(a,6,!1,a.toLowerCase(),null);});["rowSpan","start"].forEach(function(a){J$1[a]=new I$1(a,5,!1,a.toLowerCase(),null);});var Dc=/[\-:]([a-z])/g;function Ec(a){return a[1].toUpperCase()}
	"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(Dc,
	Ec);J$1[b]=new I$1(b,1,!1,a,null);});"xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(Dc,Ec);J$1[b]=new I$1(b,1,!1,a,"http://www.w3.org/1999/xlink");});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(Dc,Ec);J$1[b]=new I$1(b,1,!1,a,"http://www.w3.org/XML/1998/namespace");});J$1.tabIndex=new I$1("tabIndex",1,!1,"tabindex",null);
	function Fc(a,b,c,d){var e=J$1.hasOwnProperty(b)?J$1[b]:null;var f=null!==e?0===e.type:d?!1:!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1]?!1:!0;f||(Cc(b,c,e,d)&&(c=null),d||null===e?Ac(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c))));}
	function Gc(a,b){var c=b.checked;return objectAssign({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function Hc(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Ic(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value};}function Jc(a,b){b=b.checked;null!=b&&Fc(a,"checked",b,!1);}
	function Kc(a,b){Jc(a,b);var c=Ic(b.value);if(null!=c)if("number"===b.type){if(0===c&&""===a.value||a.value!=c)a.value=""+c;}else a.value!==""+c&&(a.value=""+c);b.hasOwnProperty("value")?Lc(a,b.type,c):b.hasOwnProperty("defaultValue")&&Lc(a,b.type,Ic(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked);}
	function Mc(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){b=""+a._wrapperState.initialValue;var d=a.value;c||b===d||(a.value=b);a.defaultValue=b;}c=a.name;""!==c&&(a.name="");a.defaultChecked=!a.defaultChecked;a.defaultChecked=!a.defaultChecked;""!==c&&(a.name=c);}function Lc(a,b,c){if("number"!==b||a.ownerDocument.activeElement!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c);}
	function Ic(a){switch(typeof a){case "boolean":case "number":case "object":case "string":case "undefined":return a;default:return ""}}var Nc={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:"blur change click focus input keydown keyup selectionchange".split(" ")}};function Oc(a,b,c){a=H$1.getPooled(Nc.change,a,b,c);a.type="change";Ob(c);Ya(a);return a}var Pc=null,Qc=null;function Rc(a){Ia(a,!1);}function Sc(a){var b=Oa(a);if(dc(b))return a}
	function Tc(a,b){if("change"===a)return b}var Uc=!1;ExecutionEnvironment_1.canUseDOM&&(Uc=$b("input")&&(!document.documentMode||9<document.documentMode));function Vc(){Pc&&(Pc.detachEvent("onpropertychange",Wc),Qc=Pc=null);}function Wc(a){"value"===a.propertyName&&Sc(Qc)&&(a=Oc(Qc,a,Zb(a)),Wb(Rc,a));}function Xc(a,b,c){"focus"===a?(Vc(),Pc=b,Qc=c,Pc.attachEvent("onpropertychange",Wc)):"blur"===a&&Vc();}function Yc(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return Sc(Qc)}
	function Zc(a,b){if("click"===a)return Sc(b)}function $c(a,b){if("input"===a||"change"===a)return Sc(b)}
	var ad={eventTypes:Nc,_isInputEventSupported:Uc,extractEvents:function(a,b,c,d){var e=b?Oa(b):window,f=void 0,g=void 0,h=e.nodeName&&e.nodeName.toLowerCase();"select"===h||"input"===h&&"file"===e.type?f=Tc:Yb(e)?Uc?f=$c:(f=Yc,g=Xc):(h=e.nodeName)&&"input"===h.toLowerCase()&&("checkbox"===e.type||"radio"===e.type)&&(f=Zc);if(f&&(f=f(a,b)))return Oc(f,c,d);g&&g(a,e,b);"blur"===a&&(a=e._wrapperState)&&a.controlled&&"number"===e.type&&Lc(e,"number",e.value);}},bd=H$1.extend({view:null,detail:null}),cd={Alt:"altKey",
	Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function dd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=cd[a])?!!b[a]:!1}function ed(){return dd}
	var fd=bd.extend({screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:ed,button:null,buttons:null,relatedTarget:function(a){return a.relatedTarget||(a.fromElement===a.srcElement?a.toElement:a.fromElement)}}),gd=fd.extend({pointerId:null,width:null,height:null,pressure:null,tiltX:null,tiltY:null,pointerType:null,isPrimary:null}),hd={mouseEnter:{registrationName:"onMouseEnter",dependencies:["mouseout","mouseover"]},
	mouseLeave:{registrationName:"onMouseLeave",dependencies:["mouseout","mouseover"]},pointerEnter:{registrationName:"onPointerEnter",dependencies:["pointerout","pointerover"]},pointerLeave:{registrationName:"onPointerLeave",dependencies:["pointerout","pointerover"]}},id={eventTypes:hd,extractEvents:function(a,b,c,d){var e="mouseover"===a||"pointerover"===a,f="mouseout"===a||"pointerout"===a;if(e&&(c.relatedTarget||c.fromElement)||!f&&!e)return null;e=d.window===d?d:(e=d.ownerDocument)?e.defaultView||
	e.parentWindow:window;f?(f=b,b=(b=c.relatedTarget||c.toElement)?Na(b):null):f=null;if(f===b)return null;var g=void 0,h=void 0,k=void 0,n=void 0;if("mouseout"===a||"mouseover"===a)g=fd,h=hd.mouseLeave,k=hd.mouseEnter,n="mouse";else if("pointerout"===a||"pointerover"===a)g=gd,h=hd.pointerLeave,k=hd.pointerEnter,n="pointer";a=null==f?e:Oa(f);e=null==b?e:Oa(b);h=g.getPooled(h,f,c,d);h.type=n+"leave";h.target=a;h.relatedTarget=e;c=g.getPooled(k,b,c,d);c.type=n+"enter";c.target=e;c.relatedTarget=a;Za(h,
	c,f,b);return [h,c]}};function jd(a){var b=a;if(a.alternate)for(;b.return;)b=b.return;else{if(0!==(b.effectTag&2))return 1;for(;b.return;)if(b=b.return,0!==(b.effectTag&2))return 1}return 3===b.tag?2:3}function kd(a){2!==jd(a)?A$1("188"):void 0;}
	function ld(a){var b=a.alternate;if(!b)return b=jd(a),3===b?A$1("188"):void 0,1===b?null:a;for(var c=a,d=b;;){var e=c.return,f=e?e.alternate:null;if(!e||!f)break;if(e.child===f.child){for(var g=e.child;g;){if(g===c)return kd(e),a;if(g===d)return kd(e),b;g=g.sibling;}A$1("188");}if(c.return!==d.return)c=e,d=f;else{g=!1;for(var h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling;}if(!g){for(h=f.child;h;){if(h===c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling;}g?
	void 0:A$1("189");}}c.alternate!==d?A$1("190"):void 0;}3!==c.tag?A$1("188"):void 0;return c.stateNode.current===c?a:b}function md(a){a=ld(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child.return=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return;}b.sibling.return=b.return;b=b.sibling;}}return null}
	function nd(a){a=ld(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child&&4!==b.tag)b.child.return=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return;}b.sibling.return=b.return;b=b.sibling;}}return null}var od=H$1.extend({animationName:null,elapsedTime:null,pseudoElement:null}),pd=H$1.extend({clipboardData:function(a){return "clipboardData"in a?a.clipboardData:window.clipboardData}}),qd=bd.extend({relatedTarget:null});
	function rd(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}
	var sd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},td={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",
	116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ud=bd.extend({key:function(a){if(a.key){var b=sd[a.key]||a.key;if("Unidentified"!==b)return b}return "keypress"===a.type?(a=rd(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?td[a.keyCode]||"Unidentified":""},location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:ed,charCode:function(a){return "keypress"===
	a.type?rd(a):0},keyCode:function(a){return "keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return "keypress"===a.type?rd(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),vd=fd.extend({dataTransfer:null}),wd=bd.extend({touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:ed}),xd=H$1.extend({propertyName:null,elapsedTime:null,pseudoElement:null}),yd=fd.extend({deltaX:function(a){return "deltaX"in a?a.deltaX:"wheelDeltaX"in
	a?-a.wheelDeltaX:0},deltaY:function(a){return "deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:null,deltaMode:null}),zd=[["abort","abort"],[fb,"animationEnd"],[gb,"animationIteration"],[hb,"animationStart"],["canplay","canPlay"],["canplaythrough","canPlayThrough"],["drag","drag"],["dragenter","dragEnter"],["dragexit","dragExit"],["dragleave","dragLeave"],["dragover","dragOver"],["durationchange","durationChange"],["emptied","emptied"],["encrypted","encrypted"],
	["ended","ended"],["error","error"],["gotpointercapture","gotPointerCapture"],["load","load"],["loadeddata","loadedData"],["loadedmetadata","loadedMetadata"],["loadstart","loadStart"],["lostpointercapture","lostPointerCapture"],["mousemove","mouseMove"],["mouseout","mouseOut"],["mouseover","mouseOver"],["playing","playing"],["pointermove","pointerMove"],["pointerout","pointerOut"],["pointerover","pointerOver"],["progress","progress"],["scroll","scroll"],["seeking","seeking"],["stalled","stalled"],
	["suspend","suspend"],["timeupdate","timeUpdate"],["toggle","toggle"],["touchmove","touchMove"],[ib,"transitionEnd"],["waiting","waiting"],["wheel","wheel"]],Ad={},Bd={};function Cd(a,b){var c=a[0];a=a[1];var d="on"+(a[0].toUpperCase()+a.slice(1));b={phasedRegistrationNames:{bubbled:d,captured:d+"Capture"},dependencies:[c],isInteractive:b};Ad[a]=b;Bd[c]=b;}
	[["blur","blur"],["cancel","cancel"],["click","click"],["close","close"],["contextmenu","contextMenu"],["copy","copy"],["cut","cut"],["dblclick","doubleClick"],["dragend","dragEnd"],["dragstart","dragStart"],["drop","drop"],["focus","focus"],["input","input"],["invalid","invalid"],["keydown","keyDown"],["keypress","keyPress"],["keyup","keyUp"],["mousedown","mouseDown"],["mouseup","mouseUp"],["paste","paste"],["pause","pause"],["play","play"],["pointercancel","pointerCancel"],["pointerdown","pointerDown"],
	["pointerup","pointerUp"],["ratechange","rateChange"],["reset","reset"],["seeked","seeked"],["submit","submit"],["touchcancel","touchCancel"],["touchend","touchEnd"],["touchstart","touchStart"],["volumechange","volumeChange"]].forEach(function(a){Cd(a,!0);});zd.forEach(function(a){Cd(a,!1);});
	var Dd={eventTypes:Ad,isInteractiveTopLevelEventType:function(a){a=Bd[a];return void 0!==a&&!0===a.isInteractive},extractEvents:function(a,b,c,d){var e=Bd[a];if(!e)return null;switch(a){case "keypress":if(0===rd(c))return null;case "keydown":case "keyup":a=ud;break;case "blur":case "focus":a=qd;break;case "click":if(2===c.button)return null;case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":a=fd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":a=
	vd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":a=wd;break;case fb:case gb:case hb:a=od;break;case ib:a=xd;break;case "scroll":a=bd;break;case "wheel":a=yd;break;case "copy":case "cut":case "paste":a=pd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":a=gd;break;default:a=H$1;}b=a.getPooled(e,b,c,d);Ya(b);return b}},Ed=Dd.isInteractiveTopLevelEventType,
	Fd=[];function Gd(a){var b=a.targetInst;do{if(!b){a.ancestors.push(b);break}var c;for(c=b;c.return;)c=c.return;c=3!==c.tag?null:c.stateNode.containerInfo;if(!c)break;a.ancestors.push(b);b=Na(c);}while(b);for(c=0;c<a.ancestors.length;c++)b=a.ancestors[c],Ja(a.topLevelType,b,a.nativeEvent,Zb(a.nativeEvent));}var Hd=!0;function Id(a){Hd=!!a;}function K$1(a,b){if(!b)return null;var c=(Ed(a)?Kd:Ld).bind(null,a);b.addEventListener(a,c,!1);}
	function Md(a,b){if(!b)return null;var c=(Ed(a)?Kd:Ld).bind(null,a);b.addEventListener(a,c,!0);}function Kd(a,b){Tb(Ld,a,b);}function Ld(a,b){if(Hd){var c=Zb(b);c=Na(c);null===c||"number"!==typeof c.tag||2===jd(c)||(c=null);if(Fd.length){var d=Fd.pop();d.topLevelType=a;d.nativeEvent=b;d.targetInst=c;a=d;}else a={topLevelType:a,nativeEvent:b,targetInst:c,ancestors:[]};try{Wb(Gd,a);}finally{a.topLevelType=null,a.nativeEvent=null,a.targetInst=null,a.ancestors.length=0,10>Fd.length&&Fd.push(a);}}}
	var Nd={get _enabled(){return Hd},setEnabled:Id,isEnabled:function(){return Hd},trapBubbledEvent:K$1,trapCapturedEvent:Md,dispatchEvent:Ld},Od={},Pd=0,Qd="_reactListenersID"+(""+Math.random()).slice(2);function Rd(a){Object.prototype.hasOwnProperty.call(a,Qd)||(a[Qd]=Pd++,Od[a[Qd]]={});return Od[a[Qd]]}function Sd(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
	function Td(a,b){var c=Sd(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return {node:c,offset:b-a};a=d;}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode;}c=void 0;}c=Sd(c);}}function Ud(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
	var Vd=ExecutionEnvironment_1.canUseDOM&&"documentMode"in document&&11>=document.documentMode,Wd={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:"blur contextmenu focus keydown keyup mousedown mouseup selectionchange".split(" ")}},Xd=null,Yd=null,Zd=null,$d=!1;
	function ae(a,b){if($d||null==Xd||Xd!==getActiveElement_1())return null;var c=Xd;"selectionStart"in c&&Ud(c)?c={start:c.selectionStart,end:c.selectionEnd}:window.getSelection?(c=window.getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}):c=void 0;return Zd&&shallowEqual_1(Zd,c)?null:(Zd=c,a=H$1.getPooled(Wd.select,Yd,a,b),a.type="select",a.target=Xd,Ya(a),a)}
	var be={eventTypes:Wd,extractEvents:function(a,b,c,d){var e=d.window===d?d.document:9===d.nodeType?d:d.ownerDocument,f;if(!(f=!e)){a:{e=Rd(e);f=sa.onSelect;for(var g=0;g<f.length;g++){var h=f[g];if(!e.hasOwnProperty(h)||!e[h]){e=!1;break a}}e=!0;}f=!e;}if(f)return null;e=b?Oa(b):window;switch(a){case "focus":if(Yb(e)||"true"===e.contentEditable)Xd=e,Yd=b,Zd=null;break;case "blur":Zd=Yd=Xd=null;break;case "mousedown":$d=!0;break;case "contextmenu":case "mouseup":return $d=!1,ae(c,d);case "selectionchange":if(Vd)break;
	case "keydown":case "keyup":return ae(c,d)}return null}};Ga.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin TapEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));wa=Qa.getFiberCurrentPropsFromNode;xa=Qa.getInstanceFromNode;ya=Qa.getNodeFromInstance;Ga.injectEventPluginsByName({SimpleEventPlugin:Dd,EnterLeaveEventPlugin:id,ChangeEventPlugin:ad,SelectEventPlugin:be,BeforeInputEventPlugin:Ib});
	var ce="function"===typeof requestAnimationFrame?requestAnimationFrame:void 0,de=Date,ee=setTimeout,fe=clearTimeout,ge=void 0;if("object"===typeof performance&&"function"===typeof performance.now){var he=performance;ge=function(){return he.now()};}else ge=function(){return de.now()};var ie=void 0,je=void 0;
	if(ExecutionEnvironment_1.canUseDOM){var ke="function"===typeof ce?ce:function(){A$1("276");},L$1=null,le=null,me=-1,ne=!1,oe=!1,pe=0,qe=33,re=33,se={didTimeout:!1,timeRemaining:function(){var a=pe-ge();return 0<a?a:0}},ue=function(a,b){var c=a.scheduledCallback,d=!1;try{c(b),d=!0;}finally{je(a),d||(ne=!0,window.postMessage(te,"*"));}},te="__reactIdleCallback$"+Math.random().toString(36).slice(2);window.addEventListener("message",function(a){if(a.source===window&&a.data===te&&(ne=!1,null!==L$1)){if(null!==L$1){var b=ge();if(!(-1===
	me||me>b)){a=-1;for(var c=[],d=L$1;null!==d;){var e=d.timeoutTime;-1!==e&&e<=b?c.push(d):-1!==e&&(-1===a||e<a)&&(a=e);d=d.next;}if(0<c.length)for(se.didTimeout=!0,b=0,d=c.length;b<d;b++)ue(c[b],se);me=a;}}for(a=ge();0<pe-a&&null!==L$1;)a=L$1,se.didTimeout=!1,ue(a,se),a=ge();null===L$1||oe||(oe=!0,ke(ve));}},!1);var ve=function(a){oe=!1;var b=a-pe+re;b<re&&qe<re?(8>b&&(b=8),re=b<qe?qe:b):qe=b;pe=a+re;ne||(ne=!0,window.postMessage(te,"*"));};ie=function(a,b){var c=-1;null!=b&&"number"===typeof b.timeout&&(c=ge()+
	b.timeout);if(-1===me||-1!==c&&c<me)me=c;a={scheduledCallback:a,timeoutTime:c,prev:null,next:null};null===L$1?L$1=a:(b=a.prev=le,null!==b&&(b.next=a));le=a;oe||(oe=!0,ke(ve));return a};je=function(a){if(null!==a.prev||L$1===a){var b=a.next,c=a.prev;a.next=null;a.prev=null;null!==b?null!==c?(c.next=b,b.prev=c):(b.prev=null,L$1=b):null!==c?(c.next=null,le=c):le=L$1=null;}};}else{var we=new Map;ie=function(a){var b={scheduledCallback:a,timeoutTime:0,next:null,prev:null},c=ee(function(){a({timeRemaining:function(){return Infinity},
	didTimeout:!1});});we.set(a,c);return b};je=function(a){var b=we.get(a.scheduledCallback);we.delete(a);fe(b);};}function xe(a){var b="";react.Children.forEach(a,function(a){null==a||"string"!==typeof a&&"number"!==typeof a||(b+=a);});return b}function ye(a,b){a=objectAssign({children:void 0},b);if(b=xe(b.children))a.children=b;return a}
	function ze(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0);}else{c=""+c;b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e]);}null!==b&&(b.selected=!0);}}
	function Ae(a,b){var c=b.value;a._wrapperState={initialValue:null!=c?c:b.defaultValue,wasMultiple:!!b.multiple};}function Be(a,b){null!=b.dangerouslySetInnerHTML?A$1("91"):void 0;return objectAssign({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function Ce(a,b){var c=b.value;null==c&&(c=b.defaultValue,b=b.children,null!=b&&(null!=c?A$1("92"):void 0,Array.isArray(b)&&(1>=b.length?void 0:A$1("93"),b=b[0]),c=""+b),null==c&&(c=""));a._wrapperState={initialValue:""+c};}
	function De(a,b){var c=b.value;null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&(a.defaultValue=c));null!=b.defaultValue&&(a.defaultValue=b.defaultValue);}function Ee(a){var b=a.textContent;b===a._wrapperState.initialValue&&(a.value=b);}var Fe={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
	function Ge(a){switch(a){case "svg":return "http://www.w3.org/2000/svg";case "math":return "http://www.w3.org/1998/Math/MathML";default:return "http://www.w3.org/1999/xhtml"}}function He(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?Ge(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
	var Ie=void 0,Je=function(a){return "undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)});}:a}(function(a,b){if(a.namespaceURI!==Fe.svg||"innerHTML"in a)a.innerHTML=b;else{Ie=Ie||document.createElement("div");Ie.innerHTML="<svg>"+b+"</svg>";for(b=Ie.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild);}});
	function Ke(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b;}
	var Le={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,
	stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Me=["Webkit","ms","Moz","O"];Object.keys(Le).forEach(function(a){Me.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);Le[b]=Le[a];});});
	function Ne(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--");var e=c;var f=b[c];e=null==f||"boolean"===typeof f||""===f?"":d||"number"!==typeof f||0===f||Le.hasOwnProperty(e)&&Le[e]?(""+f).trim():f+"px";"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e;}}var Oe=objectAssign({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
	function Pe(a,b,c){b&&(Oe[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML?A$1("137",a,c()):void 0),null!=b.dangerouslySetInnerHTML&&(null!=b.children?A$1("60"):void 0,"object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML?void 0:A$1("61")),null!=b.style&&"object"!==typeof b.style?A$1("62",c()):void 0);}
	function Qe(a,b){if(-1===a.indexOf("-"))return "string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return !1;default:return !0}}var Re=emptyFunction_1.thatReturns("");
	function Se(a,b){a=9===a.nodeType||11===a.nodeType?a:a.ownerDocument;var c=Rd(a);b=sa[b];for(var d=0;d<b.length;d++){var e=b[d];if(!c.hasOwnProperty(e)||!c[e]){switch(e){case "scroll":Md("scroll",a);break;case "focus":case "blur":Md("focus",a);Md("blur",a);c.blur=!0;c.focus=!0;break;case "cancel":case "close":$b(e,!0)&&Md(e,a);break;case "invalid":case "submit":case "reset":break;default:-1===jb.indexOf(e)&&K$1(e,a);}c[e]=!0;}}}
	function Te(a,b,c,d){c=9===c.nodeType?c:c.ownerDocument;d===Fe.html&&(d=Ge(a));d===Fe.html?"script"===a?(a=c.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):a="string"===typeof b.is?c.createElement(a,{is:b.is}):c.createElement(a):a=c.createElementNS(d,a);return a}function Ue(a,b){return (9===b.nodeType?b:b.ownerDocument).createTextNode(a)}
	function Ve(a,b,c,d){var e=Qe(b,c);switch(b){case "iframe":case "object":K$1("load",a);var f=c;break;case "video":case "audio":for(f=0;f<jb.length;f++)K$1(jb[f],a);f=c;break;case "source":K$1("error",a);f=c;break;case "img":case "image":case "link":K$1("error",a);K$1("load",a);f=c;break;case "form":K$1("reset",a);K$1("submit",a);f=c;break;case "details":K$1("toggle",a);f=c;break;case "input":Hc(a,c);f=Gc(a,c);K$1("invalid",a);Se(d,"onChange");break;case "option":f=ye(a,c);break;case "select":Ae(a,c);f=objectAssign({},c,{value:void 0});
	K$1("invalid",a);Se(d,"onChange");break;case "textarea":Ce(a,c);f=Be(a,c);K$1("invalid",a);Se(d,"onChange");break;default:f=c;}Pe(b,f,Re);var g=f,h;for(h in g)if(g.hasOwnProperty(h)){var k=g[h];"style"===h?Ne(a,k,Re):"dangerouslySetInnerHTML"===h?(k=k?k.__html:void 0,null!=k&&Je(a,k)):"children"===h?"string"===typeof k?("textarea"!==b||""!==k)&&Ke(a,k):"number"===typeof k&&Ke(a,""+k):"suppressContentEditableWarning"!==h&&"suppressHydrationWarning"!==h&&"autoFocus"!==h&&(ra.hasOwnProperty(h)?null!=k&&Se(d,
	h):null!=k&&Fc(a,h,k,e));}switch(b){case "input":cc(a);Mc(a,c,!1);break;case "textarea":cc(a);Ee(a,c);break;case "option":null!=c.value&&a.setAttribute("value",c.value);break;case "select":a.multiple=!!c.multiple;b=c.value;null!=b?ze(a,!!c.multiple,b,!1):null!=c.defaultValue&&ze(a,!!c.multiple,c.defaultValue,!0);break;default:"function"===typeof f.onClick&&(a.onclick=emptyFunction_1);}}
	function We(a,b,c,d,e){var f=null;switch(b){case "input":c=Gc(a,c);d=Gc(a,d);f=[];break;case "option":c=ye(a,c);d=ye(a,d);f=[];break;case "select":c=objectAssign({},c,{value:void 0});d=objectAssign({},d,{value:void 0});f=[];break;case "textarea":c=Be(a,c);d=Be(a,d);f=[];break;default:"function"!==typeof c.onClick&&"function"===typeof d.onClick&&(a.onclick=emptyFunction_1);}Pe(b,d,Re);b=a=void 0;var g=null;for(a in c)if(!d.hasOwnProperty(a)&&c.hasOwnProperty(a)&&null!=c[a])if("style"===a){var h=c[a];for(b in h)h.hasOwnProperty(b)&&(g||
	(g={}),g[b]="");}else"dangerouslySetInnerHTML"!==a&&"children"!==a&&"suppressContentEditableWarning"!==a&&"suppressHydrationWarning"!==a&&"autoFocus"!==a&&(ra.hasOwnProperty(a)?f||(f=[]):(f=f||[]).push(a,null));for(a in d){var k=d[a];h=null!=c?c[a]:void 0;if(d.hasOwnProperty(a)&&k!==h&&(null!=k||null!=h))if("style"===a)if(h){for(b in h)!h.hasOwnProperty(b)||k&&k.hasOwnProperty(b)||(g||(g={}),g[b]="");for(b in k)k.hasOwnProperty(b)&&h[b]!==k[b]&&(g||(g={}),g[b]=k[b]);}else g||(f||(f=[]),f.push(a,g)),
	g=k;else"dangerouslySetInnerHTML"===a?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(f=f||[]).push(a,""+k)):"children"===a?h===k||"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(a,""+k):"suppressContentEditableWarning"!==a&&"suppressHydrationWarning"!==a&&(ra.hasOwnProperty(a)?(null!=k&&Se(e,a),f||h===k||(f=[])):(f=f||[]).push(a,k));}g&&(f=f||[]).push("style",g);return f}
	function Xe(a,b,c,d,e){"input"===c&&"radio"===e.type&&null!=e.name&&Jc(a,e);Qe(c,d);d=Qe(c,e);for(var f=0;f<b.length;f+=2){var g=b[f],h=b[f+1];"style"===g?Ne(a,h,Re):"dangerouslySetInnerHTML"===g?Je(a,h):"children"===g?Ke(a,h):Fc(a,g,h,d);}switch(c){case "input":Kc(a,e);break;case "textarea":De(a,e);break;case "select":a._wrapperState.initialValue=void 0,b=a._wrapperState.wasMultiple,a._wrapperState.wasMultiple=!!e.multiple,c=e.value,null!=c?ze(a,!!e.multiple,c,!1):b!==!!e.multiple&&(null!=e.defaultValue?
	ze(a,!!e.multiple,e.defaultValue,!0):ze(a,!!e.multiple,e.multiple?[]:"",!1));}}
	function Ye(a,b,c,d,e){switch(b){case "iframe":case "object":K$1("load",a);break;case "video":case "audio":for(d=0;d<jb.length;d++)K$1(jb[d],a);break;case "source":K$1("error",a);break;case "img":case "image":case "link":K$1("error",a);K$1("load",a);break;case "form":K$1("reset",a);K$1("submit",a);break;case "details":K$1("toggle",a);break;case "input":Hc(a,c);K$1("invalid",a);Se(e,"onChange");break;case "select":Ae(a,c);K$1("invalid",a);Se(e,"onChange");break;case "textarea":Ce(a,c),K$1("invalid",a),Se(e,"onChange");}Pe(b,
	c,Re);d=null;for(var f in c)if(c.hasOwnProperty(f)){var g=c[f];"children"===f?"string"===typeof g?a.textContent!==g&&(d=["children",g]):"number"===typeof g&&a.textContent!==""+g&&(d=["children",""+g]):ra.hasOwnProperty(f)&&null!=g&&Se(e,f);}switch(b){case "input":cc(a);Mc(a,c,!0);break;case "textarea":cc(a);Ee(a,c);break;case "select":case "option":break;default:"function"===typeof c.onClick&&(a.onclick=emptyFunction_1);}return d}function Ze(a,b){return a.nodeValue!==b}
	var $e={createElement:Te,createTextNode:Ue,setInitialProperties:Ve,diffProperties:We,updateProperties:Xe,diffHydratedProperties:Ye,diffHydratedText:Ze,warnForUnmatchedText:function(){},warnForDeletedHydratableElement:function(){},warnForDeletedHydratableText:function(){},warnForInsertedHydratedElement:function(){},warnForInsertedHydratedText:function(){},restoreControlledState:function(a,b,c){switch(b){case "input":Kc(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;
	c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Pa(d);e?void 0:A$1("90");dc(d);Kc(d,e);}}}break;case "textarea":De(a,c);break;case "select":b=c.value,null!=b&&ze(a,!!c.multiple,b,!1);}}},af=null,bf=null;function cf(a,b){switch(a){case "button":case "input":case "select":case "textarea":return !!b.autoFocus}return !1}
	function df(a,b){return "textarea"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&"string"===typeof b.dangerouslySetInnerHTML.__html}var ef=ge,ff=ie,gf=je;function hf(a){for(a=a.nextSibling;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a}function jf(a){for(a=a.firstChild;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a}var kf=[],lf=-1;function mf(a){return {current:a}}
	function M$1(a){0>lf||(a.current=kf[lf],kf[lf]=null,lf--);}function N$1(a,b){lf++;kf[lf]=a.current;a.current=b;}var nf=mf(emptyObject_1),O$1=mf(!1),of=emptyObject_1;function pf(a){return qf(a)?of:nf.current}
	function rf(a,b){var c=a.type.contextTypes;if(!c)return emptyObject_1;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function qf(a){return 2===a.tag&&null!=a.type.childContextTypes}function sf(a){qf(a)&&(M$1(O$1,a),M$1(nf,a));}function tf(a){M$1(O$1,a);M$1(nf,a);}
	function uf(a,b,c){nf.current!==emptyObject_1?A$1("168"):void 0;N$1(nf,b,a);N$1(O$1,c,a);}function vf(a,b){var c=a.stateNode,d=a.type.childContextTypes;if("function"!==typeof c.getChildContext)return b;c=c.getChildContext();for(var e in c)e in d?void 0:A$1("108",uc(a)||"Unknown",e);return objectAssign({},b,c)}function wf(a){if(!qf(a))return !1;var b=a.stateNode;b=b&&b.__reactInternalMemoizedMergedChildContext||emptyObject_1;of=nf.current;N$1(nf,b,a);N$1(O$1,O$1.current,a);return !0}
	function xf(a,b){var c=a.stateNode;c?void 0:A$1("169");if(b){var d=vf(a,of);c.__reactInternalMemoizedMergedChildContext=d;M$1(O$1,a);M$1(nf,a);N$1(nf,d,a);}else M$1(O$1,a);N$1(O$1,b,a);}
	function yf(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=null;this.index=0;this.ref=null;this.pendingProps=b;this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.effectTag=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.expirationTime=0;this.alternate=null;}
	function zf(a,b,c){var d=a.alternate;null===d?(d=new yf(a.tag,b,a.key,a.mode),d.type=a.type,d.stateNode=a.stateNode,d.alternate=a,a.alternate=d):(d.pendingProps=b,d.effectTag=0,d.nextEffect=null,d.firstEffect=null,d.lastEffect=null);d.expirationTime=c;d.child=a.child;d.memoizedProps=a.memoizedProps;d.memoizedState=a.memoizedState;d.updateQueue=a.updateQueue;d.sibling=a.sibling;d.index=a.index;d.ref=a.ref;return d}
	function Af(a,b,c){var d=a.type,e=a.key;a=a.props;if("function"===typeof d)var f=d.prototype&&d.prototype.isReactComponent?2:0;else if("string"===typeof d)f=5;else switch(d){case ic:return Bf(a.children,b,c,e);case pc:f=11;b|=3;break;case jc:f=11;b|=2;break;case kc:return d=new yf(15,a,e,b|4),d.type=kc,d.expirationTime=c,d;case rc:f=16;b|=2;break;default:a:{switch("object"===typeof d&&null!==d?d.$$typeof:null){case lc:f=13;break a;case mc:f=12;break a;case qc:f=14;break a;default:A$1("130",null==d?
	d:typeof d,"");}f=void 0;}}b=new yf(f,a,e,b);b.type=d;b.expirationTime=c;return b}function Bf(a,b,c,d){a=new yf(10,a,d,b);a.expirationTime=c;return a}function Cf(a,b,c){a=new yf(6,a,null,b);a.expirationTime=c;return a}function Df(a,b,c){b=new yf(4,null!==a.children?a.children:[],a.key,b);b.expirationTime=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
	function Ef(a,b,c){b=new yf(3,null,null,b?3:0);a={current:b,containerInfo:a,pendingChildren:null,earliestPendingTime:0,latestPendingTime:0,earliestSuspendedTime:0,latestSuspendedTime:0,latestPingedTime:0,pendingCommitExpirationTime:0,finishedWork:null,context:null,pendingContext:null,hydrate:c,remainingExpirationTime:0,firstBatch:null,nextScheduledRoot:null};return b.stateNode=a}var Ff=null,Gf=null;function Hf(a){return function(b){try{return a(b)}catch(c){}}}
	function If(a){if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)return !1;var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)return !0;try{var c=b.inject(a);Ff=Hf(function(a){return b.onCommitFiberRoot(c,a)});Gf=Hf(function(a){return b.onCommitFiberUnmount(c,a)});}catch(d){}return !0}function Jf(a){"function"===typeof Ff&&Ff(a);}function Kf(a){"function"===typeof Gf&&Gf(a);}var Lf=!1;
	function Mf(a){return {expirationTime:0,baseState:a,firstUpdate:null,lastUpdate:null,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}function Nf(a){return {expirationTime:a.expirationTime,baseState:a.baseState,firstUpdate:a.firstUpdate,lastUpdate:a.lastUpdate,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}
	function Of(a){return {expirationTime:a,tag:0,payload:null,callback:null,next:null,nextEffect:null}}function Pf(a,b,c){null===a.lastUpdate?a.firstUpdate=a.lastUpdate=b:(a.lastUpdate.next=b,a.lastUpdate=b);if(0===a.expirationTime||a.expirationTime>c)a.expirationTime=c;}
	function Qf(a,b,c){var d=a.alternate;if(null===d){var e=a.updateQueue;var f=null;null===e&&(e=a.updateQueue=Mf(a.memoizedState));}else e=a.updateQueue,f=d.updateQueue,null===e?null===f?(e=a.updateQueue=Mf(a.memoizedState),f=d.updateQueue=Mf(d.memoizedState)):e=a.updateQueue=Nf(f):null===f&&(f=d.updateQueue=Nf(e));null===f||e===f?Pf(e,b,c):null===e.lastUpdate||null===f.lastUpdate?(Pf(e,b,c),Pf(f,b,c)):(Pf(e,b,c),f.lastUpdate=b);}
	function Rf(a,b,c){var d=a.updateQueue;d=null===d?a.updateQueue=Mf(a.memoizedState):Sf(a,d);null===d.lastCapturedUpdate?d.firstCapturedUpdate=d.lastCapturedUpdate=b:(d.lastCapturedUpdate.next=b,d.lastCapturedUpdate=b);if(0===d.expirationTime||d.expirationTime>c)d.expirationTime=c;}function Sf(a,b){var c=a.alternate;null!==c&&b===c.updateQueue&&(b=a.updateQueue=Nf(b));return b}
	function Tf(a,b,c,d,e,f){switch(c.tag){case 1:return a=c.payload,"function"===typeof a?a.call(f,d,e):a;case 3:a.effectTag=a.effectTag&-1025|64;case 0:a=c.payload;e="function"===typeof a?a.call(f,d,e):a;if(null===e||void 0===e)break;return objectAssign({},d,e);case 2:Lf=!0;}return d}
	function Uf(a,b,c,d,e){Lf=!1;if(!(0===b.expirationTime||b.expirationTime>e)){b=Sf(a,b);for(var f=b.baseState,g=null,h=0,k=b.firstUpdate,n=f;null!==k;){var r=k.expirationTime;if(r>e){if(null===g&&(g=k,f=n),0===h||h>r)h=r;}else n=Tf(a,b,k,n,c,d),null!==k.callback&&(a.effectTag|=32,k.nextEffect=null,null===b.lastEffect?b.firstEffect=b.lastEffect=k:(b.lastEffect.nextEffect=k,b.lastEffect=k));k=k.next;}r=null;for(k=b.firstCapturedUpdate;null!==k;){var w=k.expirationTime;if(w>e){if(null===r&&(r=k,null===
	g&&(f=n)),0===h||h>w)h=w;}else n=Tf(a,b,k,n,c,d),null!==k.callback&&(a.effectTag|=32,k.nextEffect=null,null===b.lastCapturedEffect?b.firstCapturedEffect=b.lastCapturedEffect=k:(b.lastCapturedEffect.nextEffect=k,b.lastCapturedEffect=k));k=k.next;}null===g&&(b.lastUpdate=null);null===r?b.lastCapturedUpdate=null:a.effectTag|=32;null===g&&null===r&&(f=n);b.baseState=f;b.firstUpdate=g;b.firstCapturedUpdate=r;b.expirationTime=h;a.memoizedState=n;}}
	function Vf(a,b){"function"!==typeof a?A$1("191",a):void 0;a.call(b);}
	function Wf(a,b,c){null!==b.firstCapturedUpdate&&(null!==b.lastUpdate&&(b.lastUpdate.next=b.firstCapturedUpdate,b.lastUpdate=b.lastCapturedUpdate),b.firstCapturedUpdate=b.lastCapturedUpdate=null);a=b.firstEffect;for(b.firstEffect=b.lastEffect=null;null!==a;){var d=a.callback;null!==d&&(a.callback=null,Vf(d,c));a=a.nextEffect;}a=b.firstCapturedEffect;for(b.firstCapturedEffect=b.lastCapturedEffect=null;null!==a;)b=a.callback,null!==b&&(a.callback=null,Vf(b,c)),a=a.nextEffect;}
	function Xf(a,b){return {value:a,source:b,stack:vc(b)}}var Yf=mf(null),Zf=mf(null),$f=mf(0);function ag(a){var b=a.type._context;N$1($f,b._changedBits,a);N$1(Zf,b._currentValue,a);N$1(Yf,a,a);b._currentValue=a.pendingProps.value;b._changedBits=a.stateNode;}function bg(a){var b=$f.current,c=Zf.current;M$1(Yf,a);M$1(Zf,a);M$1($f,a);a=a.type._context;a._currentValue=c;a._changedBits=b;}var cg={},dg=mf(cg),eg=mf(cg),fg=mf(cg);function gg(a){a===cg?A$1("174"):void 0;return a}
	function ig(a,b){N$1(fg,b,a);N$1(eg,a,a);N$1(dg,cg,a);var c=b.nodeType;switch(c){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:He(null,"");break;default:c=8===c?b.parentNode:b,b=c.namespaceURI||null,c=c.tagName,b=He(b,c);}M$1(dg,a);N$1(dg,b,a);}function jg(a){M$1(dg,a);M$1(eg,a);M$1(fg,a);}function kg(a){eg.current===a&&(M$1(dg,a),M$1(eg,a));}function lg(a,b,c){var d=a.memoizedState;b=b(c,d);d=null===b||void 0===b?d:objectAssign({},d,b);a.memoizedState=d;a=a.updateQueue;null!==a&&0===a.expirationTime&&(a.baseState=d);}
	var pg={isMounted:function(a){return (a=a._reactInternalFiber)?2===jd(a):!1},enqueueSetState:function(a,b,c){a=a._reactInternalFiber;var d=mg();d=ng(d,a);var e=Of(d);e.payload=b;void 0!==c&&null!==c&&(e.callback=c);Qf(a,e,d);og(a,d);},enqueueReplaceState:function(a,b,c){a=a._reactInternalFiber;var d=mg();d=ng(d,a);var e=Of(d);e.tag=1;e.payload=b;void 0!==c&&null!==c&&(e.callback=c);Qf(a,e,d);og(a,d);},enqueueForceUpdate:function(a,b){a=a._reactInternalFiber;var c=mg();c=ng(c,a);var d=Of(c);d.tag=2;void 0!==
	b&&null!==b&&(d.callback=b);Qf(a,d,c);og(a,c);}};function qg(a,b,c,d,e,f){var g=a.stateNode;a=a.type;return "function"===typeof g.shouldComponentUpdate?g.shouldComponentUpdate(c,e,f):a.prototype&&a.prototype.isPureReactComponent?!shallowEqual_1(b,c)||!shallowEqual_1(d,e):!0}
	function rg(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&pg.enqueueReplaceState(b,b.state,null);}
	function sg(a,b){var c=a.type,d=a.stateNode,e=a.pendingProps,f=pf(a);d.props=e;d.state=a.memoizedState;d.refs=emptyObject_1;d.context=rf(a,f);f=a.updateQueue;null!==f&&(Uf(a,f,e,d,b),d.state=a.memoizedState);f=a.type.getDerivedStateFromProps;"function"===typeof f&&(lg(a,f,e),d.state=a.memoizedState);"function"===typeof c.getDerivedStateFromProps||"function"===typeof d.getSnapshotBeforeUpdate||"function"!==typeof d.UNSAFE_componentWillMount&&"function"!==typeof d.componentWillMount||(c=d.state,"function"===typeof d.componentWillMount&&
	d.componentWillMount(),"function"===typeof d.UNSAFE_componentWillMount&&d.UNSAFE_componentWillMount(),c!==d.state&&pg.enqueueReplaceState(d,d.state,null),f=a.updateQueue,null!==f&&(Uf(a,f,e,d,b),d.state=a.memoizedState));"function"===typeof d.componentDidMount&&(a.effectTag|=4);}var tg=Array.isArray;
	function ug(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;var d=void 0;c&&(2!==c.tag?A$1("110"):void 0,d=c.stateNode);d?void 0:A$1("147",a);var e=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===e)return b.ref;b=function(a){var b=d.refs===emptyObject_1?d.refs={}:d.refs;null===a?delete b[e]:b[e]=a;};b._stringRef=e;return b}"string"!==typeof a?A$1("148"):void 0;c._owner?void 0:A$1("254",a);}return a}
	function vg(a,b){"textarea"!==a.type&&A$1("31","[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b,"");}
	function wg(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.effectTag=8;}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b,c){a=zf(a,b,c);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.effectTag=
	2,c):d;b.effectTag=2;return c}function g(b){a&&null===b.alternate&&(b.effectTag=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Cf(c,a.mode,d),b.return=a,b;b=e(b,c,d);b.return=a;return b}function k(a,b,c,d){if(null!==b&&b.type===c.type)return d=e(b,c.props,d),d.ref=ug(a,b,c),d.return=a,d;d=Af(c,a.mode,d);d.ref=ug(a,b,c);d.return=a;return d}function n(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=
	Df(c,a.mode,d),b.return=a,b;b=e(b,c.children||[],d);b.return=a;return b}function r(a,b,c,d,f){if(null===b||10!==b.tag)return b=Bf(c,a.mode,d,f),b.return=a,b;b=e(b,c,d);b.return=a;return b}function w(a,b,c){if("string"===typeof b||"number"===typeof b)return b=Cf(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case gc:return c=Af(b,a.mode,c),c.ref=ug(a,null,b),c.return=a,c;case hc:return b=Df(b,a.mode,c),b.return=a,b}if(tg(b)||tc(b))return b=Bf(b,a.mode,c,null),b.return=
	a,b;vg(a,b);}return null}function P(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case gc:return c.key===e?c.type===ic?r(a,b,c.props.children,d,e):k(a,b,c,d):null;case hc:return c.key===e?n(a,b,c,d):null}if(tg(c)||tc(c))return null!==e?null:r(a,b,c,d,null);vg(a,c);}return null}function nc(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);
	if("object"===typeof d&&null!==d){switch(d.$$typeof){case gc:return a=a.get(null===d.key?c:d.key)||null,d.type===ic?r(b,a,d.props.children,e,d.key):k(b,a,d,e);case hc:return a=a.get(null===d.key?c:d.key)||null,n(b,a,d,e)}if(tg(d)||tc(d))return a=a.get(c)||null,r(b,a,d,e,null);vg(b,d);}return null}function Jd(e,g,h,k){for(var u=null,x=null,t=g,q=g=0,n=null;null!==t&&q<h.length;q++){t.index>q?(n=t,t=null):n=t.sibling;var l=P(e,t,h[q],k);if(null===l){null===t&&(t=n);break}a&&t&&null===l.alternate&&b(e,
	t);g=f(l,g,q);null===x?u=l:x.sibling=l;x=l;t=n;}if(q===h.length)return c(e,t),u;if(null===t){for(;q<h.length;q++)if(t=w(e,h[q],k))g=f(t,g,q),null===x?u=t:x.sibling=t,x=t;return u}for(t=d(e,t);q<h.length;q++)if(n=nc(t,e,q,h[q],k))a&&null!==n.alternate&&t.delete(null===n.key?q:n.key),g=f(n,g,q),null===x?u=n:x.sibling=n,x=n;a&&t.forEach(function(a){return b(e,a)});return u}function E(e,g,h,k){var u=tc(h);"function"!==typeof u?A$1("150"):void 0;h=u.call(h);null==h?A$1("151"):void 0;for(var t=u=null,n=g,x=
	g=0,y=null,l=h.next();null!==n&&!l.done;x++,l=h.next()){n.index>x?(y=n,n=null):y=n.sibling;var r=P(e,n,l.value,k);if(null===r){n||(n=y);break}a&&n&&null===r.alternate&&b(e,n);g=f(r,g,x);null===t?u=r:t.sibling=r;t=r;n=y;}if(l.done)return c(e,n),u;if(null===n){for(;!l.done;x++,l=h.next())l=w(e,l.value,k),null!==l&&(g=f(l,g,x),null===t?u=l:t.sibling=l,t=l);return u}for(n=d(e,n);!l.done;x++,l=h.next())l=nc(n,e,x,l.value,k),null!==l&&(a&&null!==l.alternate&&n.delete(null===l.key?x:l.key),g=f(l,g,x),null===
	t?u=l:t.sibling=l,t=l);a&&n.forEach(function(a){return b(e,a)});return u}return function(a,d,f,h){var k="object"===typeof f&&null!==f&&f.type===ic&&null===f.key;k&&(f=f.props.children);var n="object"===typeof f&&null!==f;if(n)switch(f.$$typeof){case gc:a:{n=f.key;for(k=d;null!==k;){if(k.key===n)if(10===k.tag?f.type===ic:k.type===f.type){c(a,k.sibling);d=e(k,f.type===ic?f.props.children:f.props,h);d.ref=ug(a,k,f);d.return=a;a=d;break a}else{c(a,k);break}else b(a,k);k=k.sibling;}f.type===ic?(d=Bf(f.props.children,
	a.mode,h,f.key),d.return=a,a=d):(h=Af(f,a.mode,h),h.ref=ug(a,d,f),h.return=a,a=h);}return g(a);case hc:a:{for(k=f.key;null!==d;){if(d.key===k)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[],h);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling;}d=Df(f,a.mode,h);d.return=a;a=d;}return g(a)}if("string"===typeof f||"number"===typeof f)return f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f,h),d.return=
	a,a=d):(c(a,d),d=Cf(f,a.mode,h),d.return=a,a=d),g(a);if(tg(f))return Jd(a,d,f,h);if(tc(f))return E(a,d,f,h);n&&vg(a,f);if("undefined"===typeof f&&!k)switch(a.tag){case 2:case 1:h=a.type,A$1("152",h.displayName||h.name||"Component");}return c(a,d)}}var xg=wg(!0),yg=wg(!1),zg=null,Ag=null,Bg=!1;function Cg(a,b){var c=new yf(5,null,null,0);c.type="DELETED";c.stateNode=b;c.return=a;c.effectTag=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c;}
	function Dg(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,!0):!1;default:return !1}}function Eg(a){if(Bg){var b=Ag;if(b){var c=b;if(!Dg(a,b)){b=hf(c);if(!b||!Dg(a,b)){a.effectTag|=2;Bg=!1;zg=a;return}Cg(zg,c);}zg=a;Ag=jf(b);}else a.effectTag|=2,Bg=!1,zg=a;}}
	function Fg(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag;)a=a.return;zg=a;}function Gg(a){if(a!==zg)return !1;if(!Bg)return Fg(a),Bg=!0,!1;var b=a.type;if(5!==a.tag||"head"!==b&&"body"!==b&&!df(b,a.memoizedProps))for(b=Ag;b;)Cg(a,b),b=hf(b);Fg(a);Ag=zg?hf(a.stateNode):null;return !0}function Hg(){Ag=zg=null;Bg=!1;}function Q$1(a,b,c){Ig(a,b,c,b.expirationTime);}function Ig(a,b,c,d){b.child=null===a?yg(b,null,c,d):xg(b,a.child,c,d);}
	function Jg(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.effectTag|=128;}function Kg(a,b,c,d,e){Jg(a,b);var f=0!==(b.effectTag&64);if(!c&&!f)return d&&xf(b,!1),R$1(a,b);c=b.stateNode;ec.current=b;var g=f?null:c.render();b.effectTag|=1;f&&(Ig(a,b,null,e),b.child=null);Ig(a,b,g,e);b.memoizedState=c.state;b.memoizedProps=c.props;d&&xf(b,!0);return b.child}
	function Lg(a){var b=a.stateNode;b.pendingContext?uf(a,b.pendingContext,b.pendingContext!==b.context):b.context&&uf(a,b.context,!1);ig(a,b.containerInfo);}
	function Mg(a,b,c,d){var e=a.child;null!==e&&(e.return=a);for(;null!==e;){switch(e.tag){case 12:var f=e.stateNode|0;if(e.type===b&&0!==(f&c)){for(f=e;null!==f;){var g=f.alternate;if(0===f.expirationTime||f.expirationTime>d)f.expirationTime=d,null!==g&&(0===g.expirationTime||g.expirationTime>d)&&(g.expirationTime=d);else if(null!==g&&(0===g.expirationTime||g.expirationTime>d))g.expirationTime=d;else break;f=f.return;}f=null;}else f=e.child;break;case 13:f=e.type===a.type?null:e.child;break;default:f=
	e.child;}if(null!==f)f.return=e;else for(f=e;null!==f;){if(f===a){f=null;break}e=f.sibling;if(null!==e){e.return=f.return;f=e;break}f=f.return;}e=f;}}
	function Qg(a,b,c){var d=b.type._context,e=b.pendingProps,f=b.memoizedProps,g=!0;if(O$1.current)g=!1;else if(f===e)return b.stateNode=0,ag(b),R$1(a,b);var h=e.value;b.memoizedProps=e;if(null===f)h=1073741823;else if(f.value===e.value){if(f.children===e.children&&g)return b.stateNode=0,ag(b),R$1(a,b);h=0;}else{var k=f.value;if(k===h&&(0!==k||1/k===1/h)||k!==k&&h!==h){if(f.children===e.children&&g)return b.stateNode=0,ag(b),R$1(a,b);h=0;}else if(h="function"===typeof d._calculateChangedBits?d._calculateChangedBits(k,
	h):1073741823,h|=0,0===h){if(f.children===e.children&&g)return b.stateNode=0,ag(b),R$1(a,b)}else Mg(b,d,h,c);}b.stateNode=h;ag(b);Q$1(a,b,e.children);return b.child}function R$1(a,b){null!==a&&b.child!==a.child?A$1("153"):void 0;if(null!==b.child){a=b.child;var c=zf(a,a.pendingProps,a.expirationTime);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=zf(a,a.pendingProps,a.expirationTime),c.return=b;c.sibling=null;}return b.child}
	function Rg(a,b,c){if(0===b.expirationTime||b.expirationTime>c){switch(b.tag){case 3:Lg(b);break;case 2:wf(b);break;case 4:ig(b,b.stateNode.containerInfo);break;case 13:ag(b);}return null}switch(b.tag){case 0:null!==a?A$1("155"):void 0;var d=b.type,e=b.pendingProps,f=pf(b);f=rf(b,f);d=d(e,f);b.effectTag|=1;"object"===typeof d&&null!==d&&"function"===typeof d.render&&void 0===d.$$typeof?(f=b.type,b.tag=2,b.memoizedState=null!==d.state&&void 0!==d.state?d.state:null,f=f.getDerivedStateFromProps,"function"===
	typeof f&&lg(b,f,e),e=wf(b),d.updater=pg,b.stateNode=d,d._reactInternalFiber=b,sg(b,c),a=Kg(a,b,!0,e,c)):(b.tag=1,Q$1(a,b,d),b.memoizedProps=e,a=b.child);return a;case 1:return e=b.type,c=b.pendingProps,O$1.current||b.memoizedProps!==c?(d=pf(b),d=rf(b,d),e=e(c,d),b.effectTag|=1,Q$1(a,b,e),b.memoizedProps=c,a=b.child):a=R$1(a,b),a;case 2:e=wf(b);if(null===a)if(null===b.stateNode){var g=b.pendingProps,h=b.type;d=pf(b);var k=2===b.tag&&null!=b.type.contextTypes;f=k?rf(b,d):emptyObject_1;g=new h(g,f);b.memoizedState=null!==
	g.state&&void 0!==g.state?g.state:null;g.updater=pg;b.stateNode=g;g._reactInternalFiber=b;k&&(k=b.stateNode,k.__reactInternalMemoizedUnmaskedChildContext=d,k.__reactInternalMemoizedMaskedChildContext=f);sg(b,c);d=!0;}else{h=b.type;d=b.stateNode;k=b.memoizedProps;f=b.pendingProps;d.props=k;var n=d.context;g=pf(b);g=rf(b,g);var r=h.getDerivedStateFromProps;(h="function"===typeof r||"function"===typeof d.getSnapshotBeforeUpdate)||"function"!==typeof d.UNSAFE_componentWillReceiveProps&&"function"!==typeof d.componentWillReceiveProps||
	(k!==f||n!==g)&&rg(b,d,f,g);Lf=!1;var w=b.memoizedState;n=d.state=w;var P=b.updateQueue;null!==P&&(Uf(b,P,f,d,c),n=b.memoizedState);k!==f||w!==n||O$1.current||Lf?("function"===typeof r&&(lg(b,r,f),n=b.memoizedState),(k=Lf||qg(b,k,f,w,n,g))?(h||"function"!==typeof d.UNSAFE_componentWillMount&&"function"!==typeof d.componentWillMount||("function"===typeof d.componentWillMount&&d.componentWillMount(),"function"===typeof d.UNSAFE_componentWillMount&&d.UNSAFE_componentWillMount()),"function"===typeof d.componentDidMount&&
	(b.effectTag|=4)):("function"===typeof d.componentDidMount&&(b.effectTag|=4),b.memoizedProps=f,b.memoizedState=n),d.props=f,d.state=n,d.context=g,d=k):("function"===typeof d.componentDidMount&&(b.effectTag|=4),d=!1);}else h=b.type,d=b.stateNode,f=b.memoizedProps,k=b.pendingProps,d.props=f,n=d.context,g=pf(b),g=rf(b,g),r=h.getDerivedStateFromProps,(h="function"===typeof r||"function"===typeof d.getSnapshotBeforeUpdate)||"function"!==typeof d.UNSAFE_componentWillReceiveProps&&"function"!==typeof d.componentWillReceiveProps||
	(f!==k||n!==g)&&rg(b,d,k,g),Lf=!1,n=b.memoizedState,w=d.state=n,P=b.updateQueue,null!==P&&(Uf(b,P,k,d,c),w=b.memoizedState),f!==k||n!==w||O$1.current||Lf?("function"===typeof r&&(lg(b,r,k),w=b.memoizedState),(r=Lf||qg(b,f,k,n,w,g))?(h||"function"!==typeof d.UNSAFE_componentWillUpdate&&"function"!==typeof d.componentWillUpdate||("function"===typeof d.componentWillUpdate&&d.componentWillUpdate(k,w,g),"function"===typeof d.UNSAFE_componentWillUpdate&&d.UNSAFE_componentWillUpdate(k,w,g)),"function"===typeof d.componentDidUpdate&&
	(b.effectTag|=4),"function"===typeof d.getSnapshotBeforeUpdate&&(b.effectTag|=256)):("function"!==typeof d.componentDidUpdate||f===a.memoizedProps&&n===a.memoizedState||(b.effectTag|=4),"function"!==typeof d.getSnapshotBeforeUpdate||f===a.memoizedProps&&n===a.memoizedState||(b.effectTag|=256),b.memoizedProps=k,b.memoizedState=w),d.props=k,d.state=w,d.context=g,d=r):("function"!==typeof d.componentDidUpdate||f===a.memoizedProps&&n===a.memoizedState||(b.effectTag|=4),"function"!==typeof d.getSnapshotBeforeUpdate||
	f===a.memoizedProps&&n===a.memoizedState||(b.effectTag|=256),d=!1);return Kg(a,b,d,e,c);case 3:Lg(b);e=b.updateQueue;if(null!==e)if(d=b.memoizedState,d=null!==d?d.element:null,Uf(b,e,b.pendingProps,null,c),e=b.memoizedState.element,e===d)Hg(),a=R$1(a,b);else{d=b.stateNode;if(d=(null===a||null===a.child)&&d.hydrate)Ag=jf(b.stateNode.containerInfo),zg=b,d=Bg=!0;d?(b.effectTag|=2,b.child=yg(b,null,e,c)):(Hg(),Q$1(a,b,e));a=b.child;}else Hg(),a=R$1(a,b);return a;case 5:a:{gg(fg.current);e=gg(dg.current);d=He(e,
	b.type);e!==d&&(N$1(eg,b,b),N$1(dg,d,b));null===a&&Eg(b);e=b.type;k=b.memoizedProps;d=b.pendingProps;f=null!==a?a.memoizedProps:null;if(!O$1.current&&k===d){if(k=b.mode&1&&!!d.hidden)b.expirationTime=1073741823;if(!k||1073741823!==c){a=R$1(a,b);break a}}k=d.children;df(e,d)?k=null:f&&df(e,f)&&(b.effectTag|=16);Jg(a,b);1073741823!==c&&b.mode&1&&d.hidden?(b.expirationTime=1073741823,b.memoizedProps=d,a=null):(Q$1(a,b,k),b.memoizedProps=d,a=b.child);}return a;case 6:return null===a&&Eg(b),b.memoizedProps=b.pendingProps,
	null;case 16:return null;case 4:return ig(b,b.stateNode.containerInfo),e=b.pendingProps,O$1.current||b.memoizedProps!==e?(null===a?b.child=xg(b,null,e,c):Q$1(a,b,e),b.memoizedProps=e,a=b.child):a=R$1(a,b),a;case 14:return e=b.type.render,c=b.pendingProps,d=b.ref,O$1.current||b.memoizedProps!==c||d!==(null!==a?a.ref:null)?(e=e(c,d),Q$1(a,b,e),b.memoizedProps=c,a=b.child):a=R$1(a,b),a;case 10:return c=b.pendingProps,O$1.current||b.memoizedProps!==c?(Q$1(a,b,c),b.memoizedProps=c,a=b.child):a=R$1(a,b),a;case 11:return c=
	b.pendingProps.children,O$1.current||null!==c&&b.memoizedProps!==c?(Q$1(a,b,c),b.memoizedProps=c,a=b.child):a=R$1(a,b),a;case 15:return c=b.pendingProps,b.memoizedProps===c?a=R$1(a,b):(Q$1(a,b,c.children),b.memoizedProps=c,a=b.child),a;case 13:return Qg(a,b,c);case 12:a:if(d=b.type,f=b.pendingProps,k=b.memoizedProps,e=d._currentValue,g=d._changedBits,O$1.current||0!==g||k!==f){b.memoizedProps=f;h=f.unstable_observedBits;if(void 0===h||null===h)h=1073741823;b.stateNode=h;if(0!==(g&h))Mg(b,d,g,c);else if(k===f){a=
	R$1(a,b);break a}c=f.children;c=c(e);b.effectTag|=1;Q$1(a,b,c);a=b.child;}else a=R$1(a,b);return a;default:A$1("156");}}function Sg(a){a.effectTag|=4;}var Tg=void 0,Ug=void 0,Vg=void 0;Tg=function(){};Ug=function(a,b,c){(b.updateQueue=c)&&Sg(b);};Vg=function(a,b,c,d){c!==d&&Sg(b);};
	function Wg(a,b){var c=b.pendingProps;switch(b.tag){case 1:return null;case 2:return sf(b),null;case 3:jg(b);tf(b);var d=b.stateNode;d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)Gg(b),b.effectTag&=-3;Tg(b);return null;case 5:kg(b);d=gg(fg.current);var e=b.type;if(null!==a&&null!=b.stateNode){var f=a.memoizedProps,g=b.stateNode,h=gg(dg.current);g=We(g,e,f,c,d);Ug(a,b,g,e,f,c,d,h);a.ref!==b.ref&&(b.effectTag|=128);}else{if(!c)return null===b.stateNode?
	A$1("166"):void 0,null;a=gg(dg.current);if(Gg(b))c=b.stateNode,e=b.type,f=b.memoizedProps,c[C$1]=b,c[Ma]=f,d=Ye(c,e,f,a,d),b.updateQueue=d,null!==d&&Sg(b);else{a=Te(e,c,d,a);a[C$1]=b;a[Ma]=c;a:for(f=b.child;null!==f;){if(5===f.tag||6===f.tag)a.appendChild(f.stateNode);else if(4!==f.tag&&null!==f.child){f.child.return=f;f=f.child;continue}if(f===b)break;for(;null===f.sibling;){if(null===f.return||f.return===b)break a;f=f.return;}f.sibling.return=f.return;f=f.sibling;}Ve(a,e,c,d);cf(e,c)&&Sg(b);b.stateNode=
	a;}null!==b.ref&&(b.effectTag|=128);}return null;case 6:if(a&&null!=b.stateNode)Vg(a,b,a.memoizedProps,c);else{if("string"!==typeof c)return null===b.stateNode?A$1("166"):void 0,null;d=gg(fg.current);gg(dg.current);Gg(b)?(d=b.stateNode,c=b.memoizedProps,d[C$1]=b,Ze(d,c)&&Sg(b)):(d=Ue(c,d),d[C$1]=b,b.stateNode=d);}return null;case 14:return null;case 16:return null;case 10:return null;case 11:return null;case 15:return null;case 4:return jg(b),Tg(b),null;case 13:return bg(b),null;case 12:return null;case 0:A$1("167");
	default:A$1("156");}}function Xg(a,b){var c=b.source;null===b.stack&&null!==c&&vc(c);null!==c&&uc(c);b=b.value;null!==a&&2===a.tag&&uc(a);try{b&&b.suppressReactErrorLogging||console.error(b);}catch(d){d&&d.suppressReactErrorLogging||console.error(d);}}function Yg(a){var b=a.ref;if(null!==b)if("function"===typeof b)try{b(null);}catch(c){Zg(a,c);}else b.current=null;}
	function $g(a){"function"===typeof Kf&&Kf(a);switch(a.tag){case 2:Yg(a);var b=a.stateNode;if("function"===typeof b.componentWillUnmount)try{b.props=a.memoizedProps,b.state=a.memoizedState,b.componentWillUnmount();}catch(c){Zg(a,c);}break;case 5:Yg(a);break;case 4:ah(a);}}function bh(a){return 5===a.tag||3===a.tag||4===a.tag}
	function ch(a){a:{for(var b=a.return;null!==b;){if(bh(b)){var c=b;break a}b=b.return;}A$1("160");c=void 0;}var d=b=void 0;switch(c.tag){case 5:b=c.stateNode;d=!1;break;case 3:b=c.stateNode.containerInfo;d=!0;break;case 4:b=c.stateNode.containerInfo;d=!0;break;default:A$1("161");}c.effectTag&16&&(Ke(b,""),c.effectTag&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c.return||bh(c.return)){c=null;break a}c=c.return;}c.sibling.return=c.return;for(c=c.sibling;5!==c.tag&&6!==c.tag;){if(c.effectTag&2)continue b;
	if(null===c.child||4===c.tag)continue b;else c.child.return=c,c=c.child;}if(!(c.effectTag&2)){c=c.stateNode;break a}}for(var e=a;;){if(5===e.tag||6===e.tag)if(c)if(d){var f=b,g=e.stateNode,h=c;8===f.nodeType?f.parentNode.insertBefore(g,h):f.insertBefore(g,h);}else b.insertBefore(e.stateNode,c);else d?(f=b,g=e.stateNode,8===f.nodeType?f.parentNode.insertBefore(g,f):f.appendChild(g)):b.appendChild(e.stateNode);else if(4!==e.tag&&null!==e.child){e.child.return=e;e=e.child;continue}if(e===a)break;for(;null===
	e.sibling;){if(null===e.return||e.return===a)return;e=e.return;}e.sibling.return=e.return;e=e.sibling;}}
	function ah(a){for(var b=a,c=!1,d=void 0,e=void 0;;){if(!c){c=b.return;a:for(;;){null===c?A$1("160"):void 0;switch(c.tag){case 5:d=c.stateNode;e=!1;break a;case 3:d=c.stateNode.containerInfo;e=!0;break a;case 4:d=c.stateNode.containerInfo;e=!0;break a}c=c.return;}c=!0;}if(5===b.tag||6===b.tag){a:for(var f=b,g=f;;)if($g(g),null!==g.child&&4!==g.tag)g.child.return=g,g=g.child;else{if(g===f)break;for(;null===g.sibling;){if(null===g.return||g.return===f)break a;g=g.return;}g.sibling.return=g.return;g=g.sibling;}e?
	(f=d,g=b.stateNode,8===f.nodeType?f.parentNode.removeChild(g):f.removeChild(g)):d.removeChild(b.stateNode);}else if(4===b.tag?d=b.stateNode.containerInfo:$g(b),null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return;b=b.return;4===b.tag&&(c=!1);}b.sibling.return=b.return;b=b.sibling;}}
	function dh(a,b){switch(b.tag){case 2:break;case 5:var c=b.stateNode;if(null!=c){var d=b.memoizedProps;a=null!==a?a.memoizedProps:d;var e=b.type,f=b.updateQueue;b.updateQueue=null;null!==f&&(c[Ma]=d,Xe(c,f,e,a,d));}break;case 6:null===b.stateNode?A$1("162"):void 0;b.stateNode.nodeValue=b.memoizedProps;break;case 3:break;case 15:break;case 16:break;default:A$1("163");}}function eh(a,b,c){c=Of(c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){fh(d);Xg(a,b);};return c}
	function gh(a,b,c){c=Of(c);c.tag=3;var d=a.stateNode;null!==d&&"function"===typeof d.componentDidCatch&&(c.callback=function(){null===hh?hh=new Set([this]):hh.add(this);var c=b.value,d=b.stack;Xg(a,b);this.componentDidCatch(c,{componentStack:null!==d?d:""});});return c}
	function ih(a,b,c,d,e,f){c.effectTag|=512;c.firstEffect=c.lastEffect=null;d=Xf(d,c);a=b;do{switch(a.tag){case 3:a.effectTag|=1024;d=eh(a,d,f);Rf(a,d,f);return;case 2:if(b=d,c=a.stateNode,0===(a.effectTag&64)&&null!==c&&"function"===typeof c.componentDidCatch&&(null===hh||!hh.has(c))){a.effectTag|=1024;d=gh(a,b,f);Rf(a,d,f);return}}a=a.return;}while(null!==a)}
	function jh(a){switch(a.tag){case 2:sf(a);var b=a.effectTag;return b&1024?(a.effectTag=b&-1025|64,a):null;case 3:return jg(a),tf(a),b=a.effectTag,b&1024?(a.effectTag=b&-1025|64,a):null;case 5:return kg(a),null;case 16:return b=a.effectTag,b&1024?(a.effectTag=b&-1025|64,a):null;case 4:return jg(a),null;case 13:return bg(a),null;default:return null}}var kh=ef(),lh=2,mh=kh,nh=0,oh=0,ph=!1,S$1=null,qh=null,T$1=0,rh=-1,sh=!1,U$1=null,th=!1,uh=!1,hh=null;
	function vh(){if(null!==S$1)for(var a=S$1.return;null!==a;){var b=a;switch(b.tag){case 2:sf(b);break;case 3:jg(b);tf(b);break;case 5:kg(b);break;case 4:jg(b);break;case 13:bg(b);}a=a.return;}qh=null;T$1=0;rh=-1;sh=!1;S$1=null;uh=!1;}
	function wh(a){for(;;){var b=a.alternate,c=a.return,d=a.sibling;if(0===(a.effectTag&512)){b=Wg(b,a,T$1);var e=a;if(1073741823===T$1||1073741823!==e.expirationTime){var f=0;switch(e.tag){case 3:case 2:var g=e.updateQueue;null!==g&&(f=g.expirationTime);}for(g=e.child;null!==g;)0!==g.expirationTime&&(0===f||f>g.expirationTime)&&(f=g.expirationTime),g=g.sibling;e.expirationTime=f;}if(null!==b)return b;null!==c&&0===(c.effectTag&512)&&(null===c.firstEffect&&(c.firstEffect=a.firstEffect),null!==a.lastEffect&&
	(null!==c.lastEffect&&(c.lastEffect.nextEffect=a.firstEffect),c.lastEffect=a.lastEffect),1<a.effectTag&&(null!==c.lastEffect?c.lastEffect.nextEffect=a:c.firstEffect=a,c.lastEffect=a));if(null!==d)return d;if(null!==c)a=c;else{uh=!0;break}}else{a=jh(a,sh,T$1);if(null!==a)return a.effectTag&=511,a;null!==c&&(c.firstEffect=c.lastEffect=null,c.effectTag|=512);if(null!==d)return d;if(null!==c)a=c;else break}}return null}
	function xh(a){var b=Rg(a.alternate,a,T$1);null===b&&(b=wh(a));ec.current=null;return b}
	function yh(a,b,c){ph?A$1("243"):void 0;ph=!0;if(b!==T$1||a!==qh||null===S$1)vh(),qh=a,T$1=b,rh=-1,S$1=zf(qh.current,null,T$1),a.pendingCommitExpirationTime=0;var d=!1;sh=!c||T$1<=lh;do{try{if(c)for(;null!==S$1&&!zh();)S$1=xh(S$1);else for(;null!==S$1;)S$1=xh(S$1);}catch(f){if(null===S$1)d=!0,fh(f);else{null===S$1?A$1("271"):void 0;c=S$1;var e=c.return;if(null===e){d=!0;fh(f);break}ih(a,e,c,f,sh,T$1,mh);S$1=wh(c);}}break}while(1);ph=!1;if(d)return null;if(null===S$1){if(uh)return a.pendingCommitExpirationTime=b,a.current.alternate;sh?A$1("262"):
	void 0;0<=rh&&setTimeout(function(){var b=a.current.expirationTime;0!==b&&(0===a.remainingExpirationTime||a.remainingExpirationTime<b)&&Ah(a,b);},rh);Bh(a.current.expirationTime);}return null}
	function Zg(a,b){var c;a:{ph&&!th?A$1("263"):void 0;for(c=a.return;null!==c;){switch(c.tag){case 2:var d=c.stateNode;if("function"===typeof c.type.getDerivedStateFromCatch||"function"===typeof d.componentDidCatch&&(null===hh||!hh.has(d))){a=Xf(b,a);a=gh(c,a,1);Qf(c,a,1);og(c,1);c=void 0;break a}break;case 3:a=Xf(b,a);a=eh(c,a,1);Qf(c,a,1);og(c,1);c=void 0;break a}c=c.return;}3===a.tag&&(c=Xf(b,a),c=eh(a,c,1),Qf(a,c,1),og(a,1));c=void 0;}return c}
	function Ch(){var a=2+25*(((mg()-2+500)/25|0)+1);a<=nh&&(a=nh+1);return nh=a}function ng(a,b){a=0!==oh?oh:ph?th?1:T$1:b.mode&1?Dh?2+10*(((a-2+15)/10|0)+1):2+25*(((a-2+500)/25|0)+1):1;Dh&&(0===Eh||a>Eh)&&(Eh=a);return a}
	function og(a,b){for(;null!==a;){if(0===a.expirationTime||a.expirationTime>b)a.expirationTime=b;null!==a.alternate&&(0===a.alternate.expirationTime||a.alternate.expirationTime>b)&&(a.alternate.expirationTime=b);if(null===a.return)if(3===a.tag){var c=a.stateNode;!ph&&0!==T$1&&b<T$1&&vh();var d=c.current.expirationTime;ph&&!th&&qh===c||Ah(c,d);Fh>Gh&&A$1("185");}else break;a=a.return;}}function mg(){mh=ef()-kh;return lh=(mh/10|0)+2}
	function Hh(a){var b=oh;oh=2+25*(((mg()-2+500)/25|0)+1);try{return a()}finally{oh=b;}}function Ih(a,b,c,d,e){var f=oh;oh=1;try{return a(b,c,d,e)}finally{oh=f;}}var Jh=null,V$1=null,Kh=0,Lh=void 0,W$1=!1,X$1=null,Y$1=0,Eh=0,Mh=!1,Nh=!1,Oh=null,Ph=null,Z$1=!1,Qh=!1,Dh=!1,Rh=null,Gh=1E3,Fh=0,Sh=1;function Th(a){if(0!==Kh){if(a>Kh)return;null!==Lh&&gf(Lh);}var b=ef()-kh;Kh=a;Lh=ff(Uh,{timeout:10*(a-2)-b});}
	function Ah(a,b){if(null===a.nextScheduledRoot)a.remainingExpirationTime=b,null===V$1?(Jh=V$1=a,a.nextScheduledRoot=a):(V$1=V$1.nextScheduledRoot=a,V$1.nextScheduledRoot=Jh);else{var c=a.remainingExpirationTime;if(0===c||b<c)a.remainingExpirationTime=b;}W$1||(Z$1?Qh&&(X$1=a,Y$1=1,Vh(a,1,!1)):1===b?Wh():Th(b));}
	function Xh(){var a=0,b=null;if(null!==V$1)for(var c=V$1,d=Jh;null!==d;){var e=d.remainingExpirationTime;if(0===e){null===c||null===V$1?A$1("244"):void 0;if(d===d.nextScheduledRoot){Jh=V$1=d.nextScheduledRoot=null;break}else if(d===Jh)Jh=e=d.nextScheduledRoot,V$1.nextScheduledRoot=e,d.nextScheduledRoot=null;else if(d===V$1){V$1=c;V$1.nextScheduledRoot=Jh;d.nextScheduledRoot=null;break}else c.nextScheduledRoot=d.nextScheduledRoot,d.nextScheduledRoot=null;d=c.nextScheduledRoot;}else{if(0===a||e<a)a=e,b=d;if(d===V$1)break;
	c=d;d=d.nextScheduledRoot;}}c=X$1;null!==c&&c===b&&1===a?Fh++:Fh=0;X$1=b;Y$1=a;}function Uh(a){Yh(0,!0,a);}function Wh(){Yh(1,!1,null);}function Yh(a,b,c){Ph=c;Xh();if(b)for(;null!==X$1&&0!==Y$1&&(0===a||a>=Y$1)&&(!Mh||mg()>=Y$1);)mg(),Vh(X$1,Y$1,!Mh),Xh();else for(;null!==X$1&&0!==Y$1&&(0===a||a>=Y$1);)Vh(X$1,Y$1,!1),Xh();null!==Ph&&(Kh=0,Lh=null);0!==Y$1&&Th(Y$1);Ph=null;Mh=!1;Zh();}function $h(a,b){W$1?A$1("253"):void 0;X$1=a;Y$1=b;Vh(a,b,!1);Wh();Zh();}
	function Zh(){Fh=0;if(null!==Rh){var a=Rh;Rh=null;for(var b=0;b<a.length;b++){var c=a[b];try{c._onComplete();}catch(d){Nh||(Nh=!0,Oh=d);}}}if(Nh)throw a=Oh,Oh=null,Nh=!1,a;}function Vh(a,b,c){W$1?A$1("245"):void 0;W$1=!0;c?(c=a.finishedWork,null!==c?ai(a,c,b):(c=yh(a,b,!0),null!==c&&(zh()?a.finishedWork=c:ai(a,c,b)))):(c=a.finishedWork,null!==c?ai(a,c,b):(c=yh(a,b,!1),null!==c&&ai(a,c,b)));W$1=!1;}
	function ai(a,b,c){var d=a.firstBatch;if(null!==d&&d._expirationTime<=c&&(null===Rh?Rh=[d]:Rh.push(d),d._defer)){a.finishedWork=b;a.remainingExpirationTime=0;return}a.finishedWork=null;th=ph=!0;c=b.stateNode;c.current===b?A$1("177"):void 0;d=c.pendingCommitExpirationTime;0===d?A$1("261"):void 0;c.pendingCommitExpirationTime=0;mg();ec.current=null;if(1<b.effectTag)if(null!==b.lastEffect){b.lastEffect.nextEffect=b;var e=b.firstEffect;}else e=b;else e=b.firstEffect;af=Hd;var f=getActiveElement_1();if(Ud(f)){if("selectionStart"in
	f)var g={start:f.selectionStart,end:f.selectionEnd};else a:{var h=window.getSelection&&window.getSelection();if(h&&0!==h.rangeCount){g=h.anchorNode;var k=h.anchorOffset,n=h.focusNode;h=h.focusOffset;try{g.nodeType,n.nodeType;}catch(Wa){g=null;break a}var r=0,w=-1,P=-1,nc=0,Jd=0,E=f,t=null;b:for(;;){for(var x;;){E!==g||0!==k&&3!==E.nodeType||(w=r+k);E!==n||0!==h&&3!==E.nodeType||(P=r+h);3===E.nodeType&&(r+=E.nodeValue.length);if(null===(x=E.firstChild))break;t=E;E=x;}for(;;){if(E===f)break b;t===g&&
	++nc===k&&(w=r);t===n&&++Jd===h&&(P=r);if(null!==(x=E.nextSibling))break;E=t;t=E.parentNode;}E=x;}g=-1===w||-1===P?null:{start:w,end:P};}else g=null;}g=g||{start:0,end:0};}else g=null;bf={focusedElem:f,selectionRange:g};Id(!1);for(U$1=e;null!==U$1;){f=!1;g=void 0;try{for(;null!==U$1;){if(U$1.effectTag&256){var u=U$1.alternate;k=U$1;switch(k.tag){case 2:if(k.effectTag&256&&null!==u){var y=u.memoizedProps,D=u.memoizedState,ja=k.stateNode;ja.props=k.memoizedProps;ja.state=k.memoizedState;var mi=ja.getSnapshotBeforeUpdate(y,
	D);ja.__reactInternalSnapshotBeforeUpdate=mi;}break;case 3:case 5:case 6:case 4:break;default:A$1("163");}}U$1=U$1.nextEffect;}}catch(Wa){f=!0,g=Wa;}f&&(null===U$1?A$1("178"):void 0,Zg(U$1,g),null!==U$1&&(U$1=U$1.nextEffect));}for(U$1=e;null!==U$1;){u=!1;y=void 0;try{for(;null!==U$1;){var q=U$1.effectTag;q&16&&Ke(U$1.stateNode,"");if(q&128){var z=U$1.alternate;if(null!==z){var l=z.ref;null!==l&&("function"===typeof l?l(null):l.current=null);}}switch(q&14){case 2:ch(U$1);U$1.effectTag&=-3;break;case 6:ch(U$1);U$1.effectTag&=-3;dh(U$1.alternate,
	U$1);break;case 4:dh(U$1.alternate,U$1);break;case 8:D=U$1,ah(D),D.return=null,D.child=null,D.alternate&&(D.alternate.child=null,D.alternate.return=null);}U$1=U$1.nextEffect;}}catch(Wa){u=!0,y=Wa;}u&&(null===U$1?A$1("178"):void 0,Zg(U$1,y),null!==U$1&&(U$1=U$1.nextEffect));}l=bf;z=getActiveElement_1();q=l.focusedElem;u=l.selectionRange;if(z!==q&&containsNode_1(document.documentElement,q)){null!==u&&Ud(q)&&(z=u.start,l=u.end,void 0===l&&(l=z),"selectionStart"in q?(q.selectionStart=z,q.selectionEnd=Math.min(l,q.value.length)):window.getSelection&&(z=window.getSelection(),
	y=q[lb()].length,l=Math.min(u.start,y),u=void 0===u.end?l:Math.min(u.end,y),!z.extend&&l>u&&(y=u,u=l,l=y),y=Td(q,l),D=Td(q,u),y&&D&&(1!==z.rangeCount||z.anchorNode!==y.node||z.anchorOffset!==y.offset||z.focusNode!==D.node||z.focusOffset!==D.offset)&&(ja=document.createRange(),ja.setStart(y.node,y.offset),z.removeAllRanges(),l>u?(z.addRange(ja),z.extend(D.node,D.offset)):(ja.setEnd(D.node,D.offset),z.addRange(ja)))));z=[];for(l=q;l=l.parentNode;)1===l.nodeType&&z.push({element:l,left:l.scrollLeft,
	top:l.scrollTop});"function"===typeof q.focus&&q.focus();for(q=0;q<z.length;q++)l=z[q],l.element.scrollLeft=l.left,l.element.scrollTop=l.top;}bf=null;Id(af);af=null;c.current=b;for(U$1=e;null!==U$1;){e=!1;q=void 0;try{for(z=d;null!==U$1;){var hg=U$1.effectTag;if(hg&36){var oc=U$1.alternate;l=U$1;u=z;switch(l.tag){case 2:var ca=l.stateNode;if(l.effectTag&4)if(null===oc)ca.props=l.memoizedProps,ca.state=l.memoizedState,ca.componentDidMount();else{var wi=oc.memoizedProps,xi=oc.memoizedState;ca.props=l.memoizedProps;
	ca.state=l.memoizedState;ca.componentDidUpdate(wi,xi,ca.__reactInternalSnapshotBeforeUpdate);}var Ng=l.updateQueue;null!==Ng&&(ca.props=l.memoizedProps,ca.state=l.memoizedState,Wf(l,Ng,ca,u));break;case 3:var Og=l.updateQueue;if(null!==Og){y=null;if(null!==l.child)switch(l.child.tag){case 5:y=l.child.stateNode;break;case 2:y=l.child.stateNode;}Wf(l,Og,y,u);}break;case 5:var yi=l.stateNode;null===oc&&l.effectTag&4&&cf(l.type,l.memoizedProps)&&yi.focus();break;case 6:break;case 4:break;case 15:break;case 16:break;
	default:A$1("163");}}if(hg&128){l=void 0;var yc=U$1.ref;if(null!==yc){var Pg=U$1.stateNode;switch(U$1.tag){case 5:l=Pg;break;default:l=Pg;}"function"===typeof yc?yc(l):yc.current=l;}}var zi=U$1.nextEffect;U$1.nextEffect=null;U$1=zi;}}catch(Wa){e=!0,q=Wa;}e&&(null===U$1?A$1("178"):void 0,Zg(U$1,q),null!==U$1&&(U$1=U$1.nextEffect));}ph=th=!1;"function"===typeof Jf&&Jf(b.stateNode);b=c.current.expirationTime;0===b&&(hh=null);a.remainingExpirationTime=b;}function zh(){return null===Ph||Ph.timeRemaining()>Sh?!1:Mh=!0}
	function fh(a){null===X$1?A$1("246"):void 0;X$1.remainingExpirationTime=0;Nh||(Nh=!0,Oh=a);}function Bh(a){null===X$1?A$1("246"):void 0;X$1.remainingExpirationTime=a;}function bi(a,b){var c=Z$1;Z$1=!0;try{return a(b)}finally{(Z$1=c)||W$1||Wh();}}function ci(a,b){if(Z$1&&!Qh){Qh=!0;try{return a(b)}finally{Qh=!1;}}return a(b)}function di(a,b){W$1?A$1("187"):void 0;var c=Z$1;Z$1=!0;try{return Ih(a,b)}finally{Z$1=c,Wh();}}
	function ei(a,b,c){if(Dh)return a(b,c);Z$1||W$1||0===Eh||(Yh(Eh,!1,null),Eh=0);var d=Dh,e=Z$1;Z$1=Dh=!0;try{return a(b,c)}finally{Dh=d,(Z$1=e)||W$1||Wh();}}function fi(a){var b=Z$1;Z$1=!0;try{Ih(a);}finally{(Z$1=b)||W$1||Yh(1,!1,null);}}
	function gi(a,b,c,d,e){var f=b.current;if(c){c=c._reactInternalFiber;var g;b:{2===jd(c)&&2===c.tag?void 0:A$1("170");for(g=c;3!==g.tag;){if(qf(g)){g=g.stateNode.__reactInternalMemoizedMergedChildContext;break b}(g=g.return)?void 0:A$1("171");}g=g.stateNode.context;}c=qf(c)?vf(c,g):g;}else c=emptyObject_1;null===b.context?b.context=c:b.pendingContext=c;b=e;e=Of(d);e.payload={element:a};b=void 0===b?null:b;null!==b&&(e.callback=b);Qf(f,e,d);og(f,d);return d}
	function hi(a){var b=a._reactInternalFiber;void 0===b&&("function"===typeof a.render?A$1("188"):A$1("268",Object.keys(a)));a=md(b);return null===a?null:a.stateNode}function ii(a,b,c,d){var e=b.current,f=mg();e=ng(f,e);return gi(a,b,c,e,d)}function ji(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}
	function ki(a){var b=a.findFiberByHostInstance;return If(objectAssign({},a,{findHostInstanceByFiber:function(a){a=md(a);return null===a?null:a.stateNode},findFiberByHostInstance:function(a){return b?b(a):null}}))}
	var li={updateContainerAtExpirationTime:gi,createContainer:function(a,b,c){return Ef(a,b,c)},updateContainer:ii,flushRoot:$h,requestWork:Ah,computeUniqueAsyncExpiration:Ch,batchedUpdates:bi,unbatchedUpdates:ci,deferredUpdates:Hh,syncUpdates:Ih,interactiveUpdates:ei,flushInteractiveUpdates:function(){W$1||0===Eh||(Yh(Eh,!1,null),Eh=0);},flushControlled:fi,flushSync:di,getPublicRootInstance:ji,findHostInstance:hi,findHostInstanceWithNoPortals:function(a){a=nd(a);return null===a?null:a.stateNode},injectIntoDevTools:ki};
	function ni(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return {$$typeof:hc,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}Kb.injectFiberControlledHostComponent($e);function oi(a){this._expirationTime=Ch();this._root=a;this._callbacks=this._next=null;this._hasChildren=this._didComplete=!1;this._children=null;this._defer=!0;}
	oi.prototype.render=function(a){this._defer?void 0:A$1("250");this._hasChildren=!0;this._children=a;var b=this._root._internalRoot,c=this._expirationTime,d=new pi;gi(a,b,null,c,d._onCommit);return d};oi.prototype.then=function(a){if(this._didComplete)a();else{var b=this._callbacks;null===b&&(b=this._callbacks=[]);b.push(a);}};
	oi.prototype.commit=function(){var a=this._root._internalRoot,b=a.firstBatch;this._defer&&null!==b?void 0:A$1("251");if(this._hasChildren){var c=this._expirationTime;if(b!==this){this._hasChildren&&(c=this._expirationTime=b._expirationTime,this.render(this._children));for(var d=null,e=b;e!==this;)d=e,e=e._next;null===d?A$1("251"):void 0;d._next=e._next;this._next=b;a.firstBatch=this;}this._defer=!1;$h(a,c);b=this._next;this._next=null;b=a.firstBatch=b;null!==b&&b._hasChildren&&b.render(b._children);}else this._next=
	null,this._defer=!1;};oi.prototype._onComplete=function(){if(!this._didComplete){this._didComplete=!0;var a=this._callbacks;if(null!==a)for(var b=0;b<a.length;b++)(0, a[b])();}};function pi(){this._callbacks=null;this._didCommit=!1;this._onCommit=this._onCommit.bind(this);}pi.prototype.then=function(a){if(this._didCommit)a();else{var b=this._callbacks;null===b&&(b=this._callbacks=[]);b.push(a);}};
	pi.prototype._onCommit=function(){if(!this._didCommit){this._didCommit=!0;var a=this._callbacks;if(null!==a)for(var b=0;b<a.length;b++){var c=a[b];"function"!==typeof c?A$1("191",c):void 0;c();}}};function qi(a,b,c){this._internalRoot=Ef(a,b,c);}qi.prototype.render=function(a,b){var c=this._internalRoot,d=new pi;b=void 0===b?null:b;null!==b&&d.then(b);ii(a,c,null,d._onCommit);return d};
	qi.prototype.unmount=function(a){var b=this._internalRoot,c=new pi;a=void 0===a?null:a;null!==a&&c.then(a);ii(null,b,null,c._onCommit);return c};qi.prototype.legacy_renderSubtreeIntoContainer=function(a,b,c){var d=this._internalRoot,e=new pi;c=void 0===c?null:c;null!==c&&e.then(c);ii(b,d,a,e._onCommit);return e};
	qi.prototype.createBatch=function(){var a=new oi(this),b=a._expirationTime,c=this._internalRoot,d=c.firstBatch;if(null===d)c.firstBatch=a,a._next=null;else{for(c=null;null!==d&&d._expirationTime<=b;)c=d,d=d._next;a._next=d;null!==c&&(c._next=a);}return a};function ri(a){return !(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}Sb=li.batchedUpdates;Tb=li.interactiveUpdates;Ub=li.flushInteractiveUpdates;
	function si(a,b){b||(b=a?9===a.nodeType?a.documentElement:a.firstChild:null,b=!(!b||1!==b.nodeType||!b.hasAttribute("data-reactroot")));if(!b)for(var c;c=a.lastChild;)a.removeChild(c);return new qi(a,!1,b)}
	function ti(a,b,c,d,e){ri(c)?void 0:A$1("200");var f=c._reactRootContainer;if(f){if("function"===typeof e){var g=e;e=function(){var a=ji(f._internalRoot);g.call(a);};}null!=a?f.legacy_renderSubtreeIntoContainer(a,b,e):f.render(b,e);}else{f=c._reactRootContainer=si(c,d);if("function"===typeof e){var h=e;e=function(){var a=ji(f._internalRoot);h.call(a);};}ci(function(){null!=a?f.legacy_renderSubtreeIntoContainer(a,b,e):f.render(b,e);});}return ji(f._internalRoot)}
	function ui(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;ri(b)?void 0:A$1("200");return ni(a,b,null,c)}
	var vi={createPortal:ui,findDOMNode:function(a){return null==a?null:1===a.nodeType?a:hi(a)},hydrate:function(a,b,c){return ti(null,a,b,!0,c)},render:function(a,b,c){return ti(null,a,b,!1,c)},unstable_renderSubtreeIntoContainer:function(a,b,c,d){null==a||void 0===a._reactInternalFiber?A$1("38"):void 0;return ti(a,b,c,!1,d)},unmountComponentAtNode:function(a){ri(a)?void 0:A$1("40");return a._reactRootContainer?(ci(function(){ti(null,null,a,!1,function(){a._reactRootContainer=null;});}),!0):!1},unstable_createPortal:function(){return ui.apply(void 0,
	arguments)},unstable_batchedUpdates:bi,unstable_deferredUpdates:Hh,unstable_interactiveUpdates:ei,flushSync:di,unstable_flushControlled:fi,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{EventPluginHub:Ka,EventPluginRegistry:va,EventPropagators:$a,ReactControlledComponent:Rb,ReactDOMComponentTree:Qa,ReactDOMEventListener:Nd},unstable_createRoot:function(a,b){return new qi(a,!0,null!=b&&!0===b.hydrate)}};ki({findFiberByHostInstance:Na,bundleType:0,version:"16.4.1",rendererPackageName:"react-dom"});
	var Ai={default:vi},Bi=Ai&&vi||Ai;var reactDom_production_min=Bi.default?Bi.default:Bi;

	var reactDom_development = createCommonjsModule(function (module) {
	});

	var reactDom = createCommonjsModule(function (module) {

	function checkDCE() {
	  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
	  if (
	    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
	    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
	  ) {
	    return;
	  }
	  try {
	    // Verify that the code above has been dead code eliminated (DCE'd).
	    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
	  } catch (err) {
	    // DevTools shouldn't crash React, no matter what.
	    // We should still report in case we break this code.
	    console.error(err);
	  }
	}

	{
	  // DCE check should happen before ReactDOM bundle executes so that
	  // DevTools can report bad minification during injection.
	  checkDCE();
	  module.exports = reactDom_production_min;
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
	      findAnotherParent: _this.findAnotherParent.bind(_this),
	      lastParent: -1
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
	    key: "isForceFocused",
	    value: function isForceFocused() {
	      var tree = this.state.tree;

	      var currentFocus = this.getFocusState();

	      return tree[currentFocus].forceFocus >= 0;
	    }
	  }, {
	    key: "handleFocusInVerticalParent",
	    value: function handleFocusInVerticalParent(direction) {
	      var _state = this.state,
	          tree = _state.tree,
	          lastParent = _state.lastParent;

	      var currentFocus = this.getFocusState();

	      if (direction === LEFT && this.canMoveToPreviousParent()) {
	        this.moveFocusInTree(NEGATIVE);
	      }

	      if (direction === RIGHT && this.canMoveToNextParent()) {
	        var focus = lastParent > -1 ? lastParent : POSITIVE;
	        this.moveFocusInTree(focus);
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
	          var nextFocus = this.isForceFocused() ? 0 : NEGATIVE;
	          if (this.isForceFocused()) {
	            this.setState({ lastParent: currentFocus });
	          }
	          this.moveFocusInTree(nextFocus);
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
	      var nextFocus = isNaN(direction) ? direction == NEGATIVE ? currentFocus - 1 : currentFocus + 1 : direction;

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

	var ParentWithContext = function (_React$Component) {
	  inherits(ParentWithContext, _React$Component);

	  function ParentWithContext(props) {
	    classCallCheck(this, ParentWithContext);

	    var _this = possibleConstructorReturn(this, (ParentWithContext.__proto__ || Object.getPrototypeOf(ParentWithContext)).call(this, props));

	    _this.forceFocus = _this.props.forceFocus ? parseInt(_this.props.forceFocus) : -1;
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

	var Item = function (_React$Component) {
	  inherits(Item, _React$Component);

	  function Item(props) {
	    classCallCheck(this, Item);

	    var _this = possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));

	    _this.state = { focused: false };
	    return _this;
	  }

	  createClass(Item, [{
	    key: "focus",
	    value: function focus() {
	      this.setState(function () {
	        return { focused: true };
	      });
	    }
	  }, {
	    key: "blur",
	    value: function blur() {
	      this.setState(function () {
	        return { focused: false };
	      });
	    }
	  }, {
	    key: "enter",
	    value: function enter() {
	      alert("Enter");
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this2 = this;

	      return react.createElement(
	        Child,
	        {
	          onFocus: function onFocus() {
	            return _this2.focus();
	          },
	          onEnter: function onEnter() {
	            return _this2.enter();
	          },
	          onBlur: function onBlur() {
	            return _this2.blur();
	          }
	        },
	        react.createElement("span", {
	          className: this.state.focused ? "focusable focused" : "focusable"
	        })
	      );
	    }
	  }]);
	  return Item;
	}(react.Component);

	var App = function (_React$Component2) {
	  inherits(App, _React$Component2);

	  function App() {
	    classCallCheck(this, App);
	    return possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	  }

	  createClass(App, [{
	    key: "focus",
	    value: function focus(index) {
	      alert("Focus on element " + index);
	    }
	  }, {
	    key: "blur",
	    value: function blur(index) {
	      alert("Blur on element " + index);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return react.createElement(
	        Controller,
	        null,
	        react.createElement(
	          "h1",
	          null,
	          " Horizontal Columns + Vertical Columns "
	        ),
	        react.createElement(
	          "h2",
	          null,
	          " Example merging different kind of parents "
	        ),
	        react.createElement(
	          "div",
	          { className: "horizontal-vertical" },
	          react.createElement(
	            VerticalParent,
	            { className: "vertical-focusable-total" },
	            react.createElement(Item, null),
	            react.createElement(Item, null)
	          ),
	          react.createElement(
	            "div",
	            { className: "horizontal-section" },
	            react.createElement(
	              HorizontalParent,
	              { className: "horizontal-columns-total" },
	              react.createElement(Item, null),
	              react.createElement(Item, null)
	            ),
	            react.createElement(
	              HorizontalParent,
	              { forceFocus: "0", currentFocus: "1", className: "horizontal-columns-total", withFocus: true },
	              react.createElement(Item, null),
	              react.createElement(Item, null),
	              react.createElement(
	                "span",
	                { className: "focusable" },
	                react.createElement(
	                  "p",
	                  null,
	                  " I am not allowed to be focused "
	                ),
	                react.createElement(
	                  "p",
	                  null,
	                  " lorem ipsum "
	                )
	              ),
	              react.createElement(Item, null)
	            ),
	            react.createElement(
	              HorizontalParent,
	              { forceFocus: "0", className: "horizontal-columns-total" },
	              react.createElement(Item, null),
	              react.createElement(
	                "span",
	                { className: "focusable" },
	                react.createElement(
	                  "p",
	                  null,
	                  " I am not allowed to be focused "
	                ),
	                react.createElement(
	                  "p",
	                  null,
	                  " lorem ipsum "
	                )
	              ),
	              react.createElement(Item, null),
	              react.createElement(Item, null)
	            )
	          )
	        )
	      );
	    }
	  }]);
	  return App;
	}(react.Component);

	reactDom.render(react.createElement(App, null), document.querySelector("#root"));

	exports.Item = Item;

	return exports;

}({}));
