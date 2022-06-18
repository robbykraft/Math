/**
 * Math (c) Kraft
 */
import typeOf from "../arguments/typeof";

import overlapConvexPolygons from "./overlap-polygons";
import overlapConvexPolygonPoint from "./overlap-polygon-point";
import { overlapCirclePoint } from "./overlap-circle";
import overlapLineLine from "./overlap-line-line";
import overlapLinePoint from "./overlap-line-point";
import { equivalentVector2 } from "../core/equal";
import {
  include, exclude,
  includeL, includeR, includeS,
  excludeL, excludeR, excludeS,
} from "../arguments/functions";

// all intersection functions expect primitives to be in a certain form
// for example all lines are: vector, origin
const overlap_param_form = {
  polygon: a => [a],
  rect: a => [a],
  circle: a => [a.radius, a.origin],
  line: a => [a.vector, a.origin],
  ray: a => [a.vector, a.origin],
  segment: a => [a.vector, a.origin],
  // segment: a => [subtract(a[1], a[0]), a[0]],
  vector: a => [a],
};

const overlap_func = {
  polygon: {
    polygon: (a, b, fnA, fnB, ep) => overlapConvexPolygons(...a, ...b, ep),
    // circle: (a, b) => 
    // line: (a, b) =>
    // ray: (a, b) =>
    // segment: (a, b) =>
    vector: (a, b, fnA, fnB, ep) => overlapConvexPolygonPoint(...a, ...b, fnA, ep),
  },
  circle: {
    // polygon: (a, b) =>
    // circle: (a, b) =>
    // line: (a, b) =>
    // ray: (a, b) =>
    // segment: (a, b) =>
    vector: (a, b, fnA, fnB, ep) => overlapCirclePoint(...a, ...b, exclude, ep),
  },
  line: {
    // polygon: (a, b) =>
    // circle: (a, b) =>
    line: (a, b, fnA, fnB, ep) => overlapLineLine(...a, ...b, fnA, fnB, ep),
    ray: (a, b, fnA, fnB, ep) => overlapLineLine(...a, ...b, fnA, fnB, ep),
    segment: (a, b, fnA, fnB, ep) => overlapLineLine(...a, ...b, fnA, fnB, ep),
    vector: (a, b, fnA, fnB, ep) => overlapLinePoint(...a, ...b, fnA, ep),
  },
  ray: {
    // polygon: (a, b) =>
    // circle: (a, b) =>
    line: (a, b, fnA, fnB, ep) => overlapLineLine(...b, ...a, fnB, fnA, ep),
    ray: (a, b, fnA, fnB, ep) => overlapLineLine(...a, ...b, fnA, fnB, ep),
    segment: (a, b, fnA, fnB, ep) => overlapLineLine(...a, ...b, fnA, fnB, ep),
    vector: (a, b, fnA, fnB, ep) => overlapLinePoint(...a, ...b, fnA, ep),
  },
  segment: {
    // polygon: (a, b) =>
    // circle: (a, b) =>
    line: (a, b, fnA, fnB, ep) => overlapLineLine(...b, ...a, fnB, fnA, ep),
    ray: (a, b, fnA, fnB, ep) => overlapLineLine(...b, ...a, fnB, fnA, ep),
    segment: (a, b, fnA, fnB, ep) => overlapLineLine(...a, ...b, fnA, fnB, ep),
    vector: (a, b, fnA, fnB, ep) => overlapLinePoint(...a, ...b, fnA, ep),
  },
  vector: {
    polygon: (a, b, fnA, fnB, ep) => overlapConvexPolygonPoint(...b, ...a, fnB, ep),
    circle: (a, b, fnA, fnB, ep) => overlapCirclePoint(...b, ...a, exclude, ep),
    line: (a, b, fnA, fnB, ep) => overlapLinePoint(...b, ...a, fnB, ep),
    ray: (a, b, fnA, fnB, ep) => overlapLinePoint(...b, ...a, fnB, ep),
    segment: (a, b, fnA, fnB, ep) => overlapLinePoint(...b, ...a, fnB, ep),
    vector: (a, b, fnA, fnB, ep) => equivalentVector2(...a, ...b, ep),
  },
};

// convert "rect" to "polygon"
const similar_overlap_types = {
  polygon: "polygon",
  rect: "polygon",
  circle: "circle",
  line: "line",
  ray: "ray",
  segment: "segment",
  vector: "vector",
};

const default_overlap_domain_function = {
  polygon: exclude,
  rect: exclude,
  circle: exclude, // not used
  line: excludeL,
  ray: excludeR,
  segment: excludeS,
  vector: excludeL, // not used
};

const overlap = function (a, b, epsilon) {
  const type_a = typeOf(a);
  const type_b = typeOf(b);
  const aT = similar_overlap_types[type_a];
  const bT = similar_overlap_types[type_b];
  const params_a = overlap_param_form[type_a](a);
  const params_b = overlap_param_form[type_b](b);
  const domain_a = a.domain_function || default_overlap_domain_function[type_a];
  const domain_b = b.domain_function || default_overlap_domain_function[type_b];
  return overlap_func[aT][bT](params_a, params_b, domain_a, domain_b, epsilon);
};

export default overlap;

