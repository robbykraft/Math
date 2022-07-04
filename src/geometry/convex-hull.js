/**
 * Math (c) Kraft
 */
import { EPSILON } from "../algebra/constants";
import { radialSortPointIndices } from "../algebra/sort";
import { threePointTurnDirection } from "./radial";
/**
 * @description mirror an array and join it at the end, except
 * do not duplicate the final element, it should only appear once.
 */
const mirror = (arr) => arr.concat(arr.slice(0, -1).reverse());
/**
 * @description Convex hull from a set of 2D points, choose whether to include or exclude
 * points which lie collinear inside one of the boundary lines. modified Graham scan algorithm.
 * @param {number[][]} points array of points, each point is an array of numbers
 * @param {boolean} [includeCollinear=false] true to include points collinear along the boundary
 * @param {number} [epsilon=1e-6] undefined behavior when larger than 0.01
 * @returns {number[]} not the points, but the indices of points in your "points" array
 * @linkcode Math ./src/geometry/convex-hull.js 19
 */
export const convexHullIndices = (points = [], includeCollinear = false, epsilon = EPSILON) => {
	if (points.length < 2) { return []; }
	const order = radialSortPointIndices(points, epsilon)
		.map(arr => (arr.length === 1 ? arr : mirror(arr)))
		.flat();
	order.push(order[0]);
	const stack = [order[0]];
	let i = 1;
	// threePointTurnDirection returns -1,0,1, with 0 as the collinear case.
	// setup our operation for each case, depending on includeCollinear
	const funcs = {
		"-1": () => stack.pop(),
		1: (next) => { stack.push(next); i += 1; },
		undefined: () => { i += 1; },
	};
	funcs[0] = includeCollinear ? funcs["1"] : funcs["-1"];
	while (i < order.length) {
		if (stack.length < 2) {
			stack.push(order[i]);
			i += 1;
			continue;
		}
		const prev = stack[stack.length - 2];
		const curr = stack[stack.length - 1];
		const next = order[i];
		const turn = threePointTurnDirection(...[prev, curr, next].map(j => points[j]), epsilon);
		funcs[turn](next);
	}
	stack.pop();
	return stack;
};
/**
 * @description Convex hull from a set of 2D points, choose whether to include or exclude
 * points which lie collinear inside one of the boundary lines. modified Graham scan algorithm.
 * @param {number[][]} points array of points, each point is an array of numbers
 * @param {boolean} [includeCollinear=false] true to include points collinear along the boundary
 * @param {number} [epsilon=1e-6] undefined behavior when larger than 0.01
 * @returns {number[]} the convex hull as a list of points
 * @linkcode Math ./src/geometry/convex-hull.js 59
 */
export const convexHullPoints = (points = [], includeCollinear = false, epsilon = EPSILON) => (
	convexHullIndices(points, includeCollinear, epsilon)
		.map(i => points[i]));
