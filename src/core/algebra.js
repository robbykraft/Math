import { EPSILON } from "./constants";
import {
  fn_square,
  fn_add,
} from "../arguments/functions";

/**
 * algebra operations on vectors (mostly).
 *
 * vectors are assumed to be Javascript Arrays objects /
 * contain the Javascript Array prototype, as these methods depend
 * on the use of "map", "reduce" and other Array functions.
 * 
 * ({x: y:} vectors as Javascript Objects will not work)
 * 
 * many of these operations can handle vectors of arbitrary dimension
 * in which case there are two vectors as input, it will be noted that
 * "dimensions match first parameter", you should verify that the second
 * parameter is at least as long as the first (okay if it is longer)
 * 
 * when a function name ends with a number (magnitude2) the input vector's
 * dimension is assumed to be this number.
 */

/**
 * @param {number[]} v one vector, n-dimensions
 * @returns {number} one scalar, the magnitude of the input vector
 */
export const magnitude = v => Math.sqrt(v
  .map(fn_square)
  .reduce(fn_add, 0));
/**
 * @param {number[]} v one 2D vector
 * @returns {number} one scalar, the magnitude of the input vector
 */
export const magnitude2 = v => Math.sqrt(v[0] * v[0] + v[1] * v[1]);
/**
 * @param {number[]} v one vector, n-dimensions
 * @returns {number} one scalar, the magnitude squared of the input vector
 */
export const mag_squared = v => v
  .map(fn_square)
  .reduce(fn_add, 0);
/**
 * @param {number[]} v one vector, n-dimensions
 * @returns {number[]} one vector, a normalized copy of the input vector
 */
export const normalize = (v) => {
  const m = magnitude(v);
  return m === 0 ? v : v.map(c => c / m);
};
/**
 * @param {number[]} v one 2D vector
 * @returns {number[]} one 2D vector, a normalized copy of the input vector
 */
export const normalize2 = (v) => {
  const m = magnitude2(v);
  return m === 0 ? v : [v[0] / m, v[1] / m];
};
/**
 * @param {number[]} v one vector, n-dimensions
 * @param {number} s one scalar
 * @returns {number[]} one vector, a scaled copy of the input vector
 */
export const scale = (v, s) => v.map(n => n * s);
/**
 * @param {number[]} v one 2D vector
 * @param {number} s one scalar
 * @returns {number[]} one 2D vector, a scaled copy of the input vector
 */
export const scale2 = (v, s) => [v[0] * s, v[1] * s];
/**
 * @param {number[]} v one vector, n-dimensions
 * @param {number[]} u one vector, n-dimensions
 * @returns {number[]} one vector, dimension matching first parameter
 */
export const add = (v, u) => v.map((n, i) => n + (u[i] || 0));
/**
 * @param {number[]} v one 2D vector
 * @param {number[]} u one 2D vector
 * @returns {number[]} one 2D vector
 */
export const add2 = (v, u) => [v[0] + u[0], v[1] + u[1]];
/**
 * @param {number[]} v one vector, n-dimensions
 * @param {number[]} u one vector, n-dimensions
 * @returns {number[]} one vector, dimension matching first parameter
 */
export const subtract = (v, u) => v.map((n, i) => n - (u[i] || 0));
/**
 * @param {number[]} v one 2D vector
 * @param {number[]} u one 2D vector
 * @returns {number[]} one 2D vector
 */
export const subtract2 = (v, u) => [v[0] - u[0], v[1] - u[1]];
/**
 * @param {number[]} v one vector, n-dimensions
 * @param {number[]} u one vector, n-dimensions
 * @returns {number} one scalar, the dot product of the two vectors
 */
export const dot = (v, u) => v
  .map((_, i) => v[i] * u[i])
  .reduce(fn_add, 0);
/**
 * @param {number[]} v one 2D vector
 * @param {number[]} u one 2D vector
 * @returns {number} one scalar, the dot product of the two vectors
 */
export const dot2 = (v, u) => v[0] * u[0] + v[1] * u[1];
/**
 * @param {number[]} v one vector, n-dimensions
 * @param {number[]} u one vector, n-dimensions
 * @returns {number} one vector, dimension matching first parameter
 */
export const midpoint = (v, u) => v.map((n, i) => (n + u[i]) / 2);
/**
 * @param {number[]} v one 2D vector
 * @param {number[]} u one 2D vector
 * @returns {number} one 2D vector
 */
export const midpoint2 = (v, u) => scale2(add2(v, u), 0.5);
/**
 * @description average is similar to midpoint but can accept more than 2 inputs
 * @param {...number[]} _ a sequence of vectors
 * @returns {number[]} one vector, dimension matching first parameter
 */
export const average = function () {
  if (arguments.length === 0) { return []; }
  const dimension = (arguments[0].length > 0) ? arguments[0].length : 0;
  const sum = Array(dimension).fill(0);
  Array.from(arguments)
    .forEach(vec => sum.forEach((_, i) => { sum[i] += vec[i] || 0; }));
  return sum.map(n => n / arguments.length);
};
/**
 * @param {number[]} v one vector, n-dimensions
 * @param {number[]} u one vector, n-dimensions
 * @param {number} t one scalar between 0 and 1
 * @returns {number[]} one vector, dimensions matching first parameter
 */
export const lerp = (v, u, t) => {
  const inv = 1.0 - t;
  return v.map((n, i) => n * inv + (u[i] || 0) * t);
};
/**
 * @description technically cross product in 2D is undefined,
 *  this returns the determinant of the matrix of the 2 vectors
 * @param {number[]} v one 2D vector
 * @param {number[]} u one 2D vector
 * @returns {number} one scalar; the determinant; the magnitude of the vector
 */
export const cross2 = (v, u) => v[0] * u[1] - v[1] * u[0];
/**
 * @param {number[]} v one 3D vector
 * @param {number[]} u one 3D vector
 * @returns {number[]} one 3D vector, the cross product of the two vectors
 */
export const cross3 = (v, u) => [
  v[1] * u[2] - v[2] * u[1],
  v[2] * u[0] - v[0] * u[2],
  v[0] * u[1] - v[1] * u[0],
];
/**
 * @param {number[]} v one vector, n-dimensions
 * @param {number[]} u one vector, n-dimensions
 * @returns {number} one scalar, the distance between the two vectors
 */
export const distance = (v, u) => Math.sqrt(v
  .map((_, i) => (v[i] - u[i]) ** 2)
  .reduce(fn_add, 0));
/**
 * @param {number[]} v one 2D vector
 * @param {number[]} u one 2D vector
 * @returns {number} one scalar, the distance between the two vectors
 */
export const distance2 = (v, u) => {
  const p = v[0] - u[0];
  const q = v[1] - u[1];
  return Math.sqrt((p * p) + (q * q));
};
/**
 * @param {number[]} v one 3D vector
 * @param {number[]} u one 3D vector
 * @returns {number} one scalar, the distance between the two vectors
 */
export const distance3 = (v, u) => {
  const a = v[0] - u[0];
  const b = v[1] - u[1];
  const c = v[2] - u[2];
  return Math.sqrt((a * a) + (b * b) + (c * c));
};
/**
 * @param {number[]} v one vector, n-dimensions
 * @returns {number[]} one vector, a copy with each element's sign flipped
 */
export const flip = v => v.map(n => -n);
/**
 * @param {number[]} v one 2D vector
 * @returns {number[]} one 2D vector, 90 degree counter-clockwise rotation
 */
export const rotate90 = v => [-v[1], v[0]];
/**
 * @param {number[]} v one 2D vector
 * @returns {number[]} one 2D vector, 270 degree counter-clockwise rotation
 */
export const rotate270 = v => [v[1], -v[0]];
/**
 * @param {number[]} v one vector, n-dimensions
 * @param {number} [epsilon=1e-6] an optional epsilon (1e-6 default)
 * @returns {boolean} is the magnitude of the vector smaller than the epsilon?
 */
export const degenerate = (v, epsilon = EPSILON) => v
  .map(n => Math.abs(n))
  .reduce(fn_add, 0) < epsilon;
/**
 * @param {number[]} v one vector, n-dimensions
 * @param {number[]} u one vector, n-dimensions
 * @param {number} [epsilon=1e-6] an optional epsilon (1e-6 default)
 * @returns {boolean} are the two vectors parallel within an epsilon?
 */
export const parallel = (v, u, epsilon = EPSILON) => 1 - Math
  .abs(dot(normalize(v), normalize(u))) < epsilon;
/**
 * @param {number[]} v one 2D vector
 * @param {number[]} u one 2D vector
 * @param {number} [epsilon=1e-6] an optional epsilon (1e-6 default)
 * @returns {boolean} are the two vectors parallel within an epsilon?
 */
export const parallel2 = (v, u, epsilon = EPSILON) => Math
  .abs(cross2(v, u)) < epsilon;
