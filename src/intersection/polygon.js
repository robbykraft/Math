import { EPSILON } from "../core/equal";
import { subtract } from "../core/algebra";
import {
  point_in_convex_poly_inclusive,
  point_in_convex_poly_exclusive,
} from "../overlap/polygon";
import {
  intersect_lines,
  include_l_s,
  include_r_s,
  exclude_r_s,
  include_s_s,
  exclude_s_s,
} from "./lines";

const intersect_line_seg = (vector, origin, pt0, pt1) => intersect_lines(
  vector, origin,
  subtract(pt1, pt0), pt0,
  include_l_s
);
const intersect_ray_seg_include = (vector, origin, pt0, pt1) => intersect_lines(
  vector, origin,
  subtract(pt1, pt0), pt0,
  include_r_s
);
const intersect_ray_seg_exclude = (vector, origin, pt0, pt1) => intersect_lines(
  vector, origin,
  subtract(pt1, pt0), pt0,
  exclude_r_s
);
const intersect_seg_seg_include = (a0, a1, b0, b1) => intersect_lines(
  subtract(a1, a0), a0,
  subtract(b1, b0), b0,
  include_s_s
);
const intersect_seg_seg_exclude = (a0, a1, b0, b1) => intersect_lines(
  subtract(a1, a0), a0,
  subtract(b1, b0), b0,
  exclude_s_s
);

// equivalency test for 2d-vectors
const quick_equivalent_2 = function (a, b) {
  return Math.abs(a[0] - b[0]) < EPSILON && Math.abs(a[1] - b[1]) < EPSILON;
};

// export const convex_poly_circle = function (poly, center, radius) {
//   return [];
// };

/**
 * generalized line-ray-segment intersection with convex polygon function
 * for lines and rays, line1 and line2 are the vector, origin in that order.
 * for segments, line1 and line2 are the two endpoints.
 */
const convex_poly_line_intersect = (intersect_func, poly, line1, line2) => {
  const intersections = poly
    .map((p, i, arr) => [p, arr[(i + 1) % arr.length]]) // into segment pairs
    .map(el => intersect_func(line1, line2, el[0], el[1]))
    .filter(el => el != null);
  switch (intersections.length) {
    case 0: return undefined;
    case 1: return [intersections];
    default:
      // for two intersection points or more, in the case of vertex-
      // collinear intersections the same point from 2 polygon sides
      // can be returned. we need to filter for unique points.
      for (let i = 1; i < intersections.length; i += 1) {
        if (!quick_equivalent_2(intersections[0], intersections[i])) {
          return [intersections[0], intersections[i]];
        }
      }
      // there was only one unique intersection point after all.
      return [intersections[0]];
  }
};

export const convex_poly_line = (poly, vec, org, ep = EPSILON) =>
  convex_poly_line_intersect(intersect_line_seg, poly, vec, org, ep);
export const convex_poly_ray_inclusive = (poly, vec, org, ep = EPSILON) =>
  convex_poly_line_intersect(intersect_ray_seg_include, poly, vec, org, ep);
export const convex_poly_ray_exclusive = (poly, vec, org, ep = EPSILON) =>
  convex_poly_line_intersect(intersect_ray_seg_exclude, poly, vec, org, ep);
export const convex_poly_segment_inclusive = (poly, pt0, pt1, ep = EPSILON) =>
  convex_poly_line_intersect(intersect_seg_seg_include, poly, pt0, pt1, ep);
export const convex_poly_segment_exclusive = (poly, pt0, pt1, ep = EPSILON) =>
  convex_poly_line_intersect(intersect_seg_seg_exclude, poly, pt0, pt1, ep);


// /** clip an infinite line in a polygon, returns a segment or undefined if no intersection */
// export const convex_poly_line = function (poly, lineVector, linePoint) {
//   const intersections = poly
//     .map((p, i, arr) => [p, arr[(i + 1) % arr.length]]) // poly points into segment pairs
//     .map(el => intersect_line_seg(lineVector, linePoint, el[0], el[1]))
//     .filter(el => el != null);
//   switch (intersections.length) {
//     case 0: return undefined;
//     // case 1: return [intersections[0], intersections[0]]; // degenerate segment
//     case 1:
//     case 2: return intersections;
//     default:
//       // special case: line intersects directly on a poly point (2 segments, same point)
//       //  filter to unique points by [x,y] comparison.
//       for (let i = 1; i < intersections.length; i += 1) {
//         if (!quick_equivalent_2(intersections[0], intersections[i])) {
//           return [intersections[0], intersections[i]];
//         }
//       }
//       return undefined;
//   }
// };

// export const convex_poly_ray_inclusive = function (poly, lineVector, linePoint) {
//   const intersections = poly
//     .map((p, i, arr) => [p, arr[(i + 1) % arr.length]]) // poly points into segment pairs
//     .map(el => intersect_ray_seg_include(lineVector, linePoint, el[0], el[1]))
//     .filter(el => el != null);
//   switch (intersections.length) {
//     case 0: return undefined;
//     case 1: return intersections; // [linePoint, intersections[0]];
//     case 2:
//       return quick_equivalent_2(intersections[0], intersections[1])
//         ? [intersections[0]] // [linePoint, intersections[0]]
//         : intersections;
//     // default: throw "clipping ray in a convex polygon resulting in 3 or more points";
//     default:
//       for (let i = 1; i < intersections.length; i += 1) {
//         if (!quick_equivalent_2(intersections[0], intersections[i])) {
//           return [intersections[0], intersections[i]];
//         }
//       }
//       return undefined;
//   }
// };

// export const convex_poly_ray_exclusive = function (poly, lineVector, linePoint) {
//   const intersections = poly
//     .map((p, i, arr) => [p, arr[(i + 1) % arr.length]]) // poly points into segment pairs
//     .map(el => intersect_ray_seg_exclude(lineVector, linePoint, el[0], el[1]))
//     .filter(el => el != null);
//   switch (intersections.length) {
//     case 0: return undefined;
//     case 1: return intersections; // [linePoint, intersections[0]];
//     case 2:
//       return quick_equivalent_2(intersections[0], intersections[1])
//         ? [intersections[0]] // [linePoint, intersections[0]]
//         : intersections;
//     // default: throw "clipping ray in a convex polygon resulting in 3 or more points";
//     default:
//       for (let i = 1; i < intersections.length; i += 1) {
//         if (!quick_equivalent_2(intersections[0], intersections[i])) {
//           return [intersections[0], intersections[i]];
//         }
//       }
//       return undefined;
//   }
// };

// export const convex_poly_segment_inclusive = function (poly, segmentA, segmentB, epsilon = EPSILON) {
//   console.log("todo");
// };

// // todo: double check that this is segment method is exclusive
// export const convex_poly_segment_exclusive = function (poly, segmentA, segmentB, epsilon = EPSILON) {
//   const intersections = poly
//     .map((p, i, arr) => [p, arr[(i + 1) % arr.length]]) // polygon into segment pairs
//     .map(el => intersect_seg_seg_exclude(segmentA, segmentB, el[0], el[1]))
//     .filter(el => el != null);
//   switch (intersections.length) {
//     case 0: return undefined;
//     case 1: return intersections;
//     case 2:
//       return quick_equivalent_2(intersections[0], intersections[1])
//         ? [intersections[0]]
//         : intersections;
//     default: throw new Error("clipping segment in a convex polygon resulting in 3 or more points");
//   }
// };

