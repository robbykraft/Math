/**
 * Math (c) Kraft
 */
import methods from "../shared/polygon";
import { semiFlattenArrays } from "../../types/resize";
import { include, exclude } from "../../algebra/functions";
import { subtract } from "../../algebra/vectors";
import { convexHullPoints } from "../../geometry/convex-hull";
import { makePolygonCircumradius } from "../../geometry/polygons";

export default {
	polygon: {
		P: Array.prototype,
		A: function () {
			this.push(...semiFlattenArrays(arguments));
			// this.points = semiFlattenArrays(arguments);
			// .map(v => Constructors.vector(v));
			this.sides = this
				.map((p, i, arr) => [p, arr[(i + 1) % arr.length]]);
			// .map(ps => Constructors.segment(ps[0][0], ps[0][1], ps[1][0], ps[1][1]));
			this.vectors = this.sides.map(side => subtract(side[1], side[0]));
			// this.sectors
			Object.defineProperty(this, "domain_function", { writable: true, value: include });
		},
		G: {
			// todo: convex test
			isConvex: function () {
				return undefined;
			},
			points: function () {
				return this;
			},
			// edges: function () {
			//   return this.sides;
			// },
		},
		M: Object.assign({}, methods, {
			inclusive: function () { this.domain_function = include; return this; },
			exclusive: function () { this.domain_function = exclude; return this; },
			segments: function () {
				return this.sides;
			},
		}),
		S: {
			fromPoints: function () {
				return this.constructor(...arguments);
			},
			regularPolygon: function () {
				return this.constructor(makePolygonCircumradius(...arguments));
			},
			convexHull: function () {
				return this.constructor(convexHullPoints(...arguments));
			},
		},
	},
};
