/*:
 * =============================================================================
 * Iavra Easing Library.js
 * =============================================================================
 *
 * @plugindesc JavaScript implementation of Robert Penner's easing functions. All Credits go to him.
 * <Iavra Easing Library>
 * @author Iavra
 *
 * @help
 * Each function takes a single parameter k, which is defined as t/d or "current animation step" /
 * "total animation duration".
 *
 * Penner's original functions take 4 parameters and can be translated to these ones as:
 * easingWith4Parameters(b, c, t, d) === b + c * easingWith1Parameter(t/d);
 *
 * This library contains the following functions (each with a sample link showcasing the animation):
 *
 * quad
 *     in:    http://easings.net/en#easeInQuad
 *     out:   http://easings.net/en#easeOutQuad
 *     inOut: http://easings.net/en#easeInOutQuad
 * cubic
 *     in:    http://easings.net/en#easeInCubic
 *     out:   http://easings.net/en#easeOutCubic
 *     inOut: http://easings.net/en#easeInOutCubic
 * quart
 *     in:    http://easings.net/en#easeInQuart
 *     out:   http://easings.net/en#easeOutQuart
 *     inOut: http://easings.net/en#easeInOutQuart
 * quint
 *     in:    http://easings.net/en#easeInQuint
 *     out:   http://easings.net/en#easeOutQuint
 *     inOut: http://easings.net/en#easeInOutQuint
 * sine
 *     in:    http://easings.net/en#easeInSine
 *     out:   http://easings.net/en#easeOutSine
 *     inOut: http://easings.net/en#easeInOutSine
 * exp
 *     in:    http://easings.net/en#easeInExpo
 *     out:   http://easings.net/en#easeOutExpo
 *     inOut: http://easings.net/en#easeInOutExpo
 * circ
 *     in:    http://easings.net/en#easeInCirc
 *     out:   http://easings.net/en#easeOutCirc
 *     inOut: http://easings.net/en#easeInOutCirc
 * elastic
 *     in:    http://easings.net/en#easeInElastic
 *     out:   http://easings.net/en#easeOutElastic
 *     inOut: http://easings.net/en#easeInOutElastic
 * back
 *     in:    http://easings.net/en#easeInBack
 *     out:   http://easings.net/en#easeOutBack
 *     inOut: http://easings.net/en#easeInOutBack
 * bounce
 *     in:    http://easings.net/en#easeInBounce
 *     out:   http://easings.net/en#easeOutBounce
 *     inOut: http://easings.net/en#easeInOutBounce
 */

var Imported = Imported || {};
Imported["iavra_easing"] = true;

//=============================================================================
// namespace IAVRA
//=============================================================================

var IAVRA = IAVRA || {};

//=============================================================================
// module IAVRA.EASING
//=============================================================================

IAVRA.EASING = (function($) {
	
	/**
	 * Quadratic
	 */
	$.quad = {
		in: function(k) {
			return k * k;
		},
		out: function(k) {
			return k * (2 - k);
		},
		inOut: function(k) {
			if ((k *= 2) < 1) {
				return 0.5 * k * k;
			}
			return - 0.5 * (--k * (k - 2) - 1);
		}
	};
	
	/**
	 * Cubic
	 */
	$.cubic = {
		in: function(k) {
			return k * k * k;
		},
		out: function(k) {
			return k * k * k;
		},
		inOut: function(k) {
			if ((k *= 2) < 1) {
				return 0.5 * k * k * k;
			}
			return 0.5 * ((k -= 2) * k * k + 2);
		}
	};
	
	/**
	 * Quartic
	 */
	$.quart = {
		in: function(k) {
			return k * k * k * k;
		},
		out: function(k) {
			return 1 - (--k * k * k * k);
		},
		inOut: function(k) {
			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k;
			}
			return - 0.5 * ((k -= 2) * k * k * k - 2);
		}
	};
	
	/**
	 * Quintic
	 */
	$.quint = {
		in: function(k) {
			return k * k * k * k * k;
		},
		out: function(k) {
			return --k * k * k * k * k + 1;
		},
		inOut: function(k) {
			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k * k;
			}
			return 0.5 * ((k -= 2) * k * k * k * k + 2);
		}
	};
	
	/**
	 * Sinusoidal
	 */
	$.sine = {
		in: function(k) {
			return 1 - Math.cos(k * Math.PI / 2);
		},
		out: function(k) {
			return Math.sin(k * Math.PI / 2);
		},
		inOut: function(k) {
			return 0.5 * (1 - Math.cos(Math.PI * k));
		}
	};
	
	/**
	 * Exponential
	 */
	$.exp = {
		in: function(k) {
			return k === 0.0 ? 0 : Math.pow(1024, k - 1);
		},
		out: function(k) {
			return k === 1.0 ? 1 : 1 - Math.pow(2, - 10 * k);
		},
		inOut: function(k) {
			if (k === 0.0) {
				return 0;
			}
			if (k === 1.0) {
				return 1;
			}
			if ((k *= 2) < 1) {
				return 0.5 * Math.pow(1024, k - 1);
			}
			return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);
		}
	};
	
	/**
	 * Circular
	 */
	$.circ = {
		in: function(k) {
			return 1 - Math.sqrt(1 - k * k);
		},
		out: function(k) {
			return Math.sqrt(1 - (--k * k));
		},
		inOut: function(k) {
			if ((k *= 2) < 1) {
				return - 0.5 * (Math.sqrt(1 - k * k) - 1);
			}
			return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
		}
	};
	
	/**
	 * Elastic
	 */
	$.elastic = {
		in: function(k) {
			var s;
			var a = 0.1;
			var p = 0.4;

			if (k === 0.0) {
				return 0;
			}
			if (k === 1.0) {
				return 1;
			}
			if (!a || a < 1) {
				a = 1;
				s = p / 4;
			} else {
				s = p * Math.asin(1 / a) / (2 * Math.PI);
			}
			return - (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
		},
		out: function(k) {
			var s;
			var a = 0.1;
			var p = 0.4;

			if (k === 0.0) {
				return 0;
			}
			if (k === 1.0) {
				return 1;
			}
			if (!a || a < 1) {
				a = 1;
				s = p / 4;
			} else {
				s = p * Math.asin(1 / a) / (2 * Math.PI);
			}
			return (a * Math.pow(2, - 10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
		},
		inOut: function(k) {
			var s;
			var a = 0.1;
			var p = 0.4;

			if (k === 0.0) {
				return 0;
			}
			if (k === 1.0) {
				return 1;
			}
			if (!a || a < 1) {
				a = 1;
				s = p / 4;
			} else {
				s = p * Math.asin(1 / a) / (2 * Math.PI);
			}
			if ((k *= 2) < 1) {
				return - 0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
			}
			return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
		}
	};
	
	/**
	 * Back
	 */
	$.back = {
		in: function(k) {
			var s = 1.70158;
			return k * k * ((s + 1) * k - s);
		},
		out: function(k) {
			var s = 1.70158;
			return --k * k * ((s + 1) * k + s) + 1;
		},
		inOut: function(k) {
			var s = 1.70158 * 1.525;
			if ((k *= 2) < 1) {
				return 0.5 * (k * k * ((s + 1) * k - s));
			}
			return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
		}
	};
	
	/**
	 * Bounce
	 */
	$.bounce = {
		in: function(k) {
			return 1 - IAVRA.EASING.bounce.out(1 - k);
		},
		out: function(k) {
			if (k < (1 / 2.75)) {
				return 7.5625 * k * k;
			} else if (k < (2 / 2.75)) {
				return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
			} else if (k < (2.5 / 2.75)) {
				return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
			} else {
				return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
			}
		},
		inOut: function(k) {
			if (k < 0.5) {
				return IAVRA.EASING.bounce.in(k * 2) * 0.5;
			}
			return IAVRA.EASING.bounce.out(k * 2 - 1) * 0.5 + 0.5;
		}
	};
	
    return $;
})(IAVRA.EASING || {});