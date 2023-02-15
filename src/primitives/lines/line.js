/**
 * Math (c) Kraft
 */
import Constructors from "../constructors.js";
import { resize } from "../../types/resize.js";
import { getLine } from "../../types/get.js";
import {
	rayLineToUniqueLine,
	uniqueLineToRayLine,
} from "../../types/parameterize.js";
import {
	includeL,
	excludeL,
} from "../../algebra/functions.js";
import {
	add,
	scale,
} from "../../algebra/vectors.js";
import Static from "./static.js";
import methods from "./methods.js";

export default {
	line: {
		P: Object.prototype,

		A: function () {
			const l = getLine(...arguments);
			this.vector = Constructors.vector(l.vector);
			this.origin = Constructors.vector(resize(this.vector.length, l.origin));
			const alt = rayLineToUniqueLine({ vector: this.vector, origin: this.origin });
			this.normal = alt.normal;
			this.distance = alt.distance;
			Object.defineProperty(this, "domain_function", { writable: true, value: includeL });
		},

		G: {
			// length: () => Infinity,
			dimension: function () {
				return [this.vector, this.origin]
					.map(p => p.length)
					.reduce((a, b) => Math.max(a, b), 0);
			},
		},

		M: Object.assign({}, methods, {
			inclusive: function () { this.domain_function = includeL; return this; },
			exclusive: function () { this.domain_function = excludeL; return this; },
			clip_function: dist => dist,
			svgPath: function (length = 20000) {
				const start = add(this.origin, scale(this.vector, -length / 2));
				const end = scale(this.vector, length);
				return `M${start[0]} ${start[1]}l${end[0]} ${end[1]}`;
			},
		}),

		S: Object.assign({
			fromNormalDistance: function () {
				return this.constructor(uniqueLineToRayLine(arguments[0]));
			},
		}, Static),

	},
};
