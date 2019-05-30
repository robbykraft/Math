import { point_on_line } from "./query";
import { line_edge_exclusive } from "./intersection";
import { EPSILON, clean_number } from "../parse/clean";
import { normalize, midpoint2 } from "./algebra";

export const make_regular_polygon = function (sides, x = 0, y = 0, radius = 1) {
  const halfwedge = 2 * Math.PI / sides * 0.5;
  const r = radius / Math.cos(halfwedge);
  return Array.from(Array(Math.floor(sides))).map((_, i) => {
    const a = -2 * Math.PI * i / sides + halfwedge;
    const px = clean_number(x + r * Math.sin(a), 14);
    const py = clean_number(y + r * Math.cos(a), 14);
    return [px, py]; // align point along Y
  });
};

export const nearest_point = function (linePoint, lineVec, point, limiterFunc, epsilon = EPSILON) {
  const magSquared = (lineVec[0] ** 2) + (lineVec[1] ** 2);
  const vectorToPoint = [0, 1].map((_, i) => point[i] - linePoint[i]);
  const pTo0 = [0, 1].map((_, i) => point[i] - linePoint[i]);
  const dot = [0, 1].map((_, i) => lineVec[i] * vectorToPoint[i])
    .reduce((a, b) => a + b, 0);
  const distance = dot / magSquared;
  // limit depending on line, ray, edge
  const d = limiterFunc(distance, epsilon);
  return [0, 1].map((_, i) => linePoint[i] + lineVec[i] * d);
};

/** There are 2 interior angles between 2 absolute angle measurements, from A to B return the clock
wise one
 * @param {number} angle in radians, angle PI/2 is along the +Y axis
 * @returns {number} clockwise interior angle (from a to b) in radians
 */
export const clockwise_angle2_radians = function (a, b) {
  // this is on average 50 to 100 times faster than clockwise_angle2
  while (a < 0) { a += Math.PI * 2; }
  while (b < 0) { b += Math.PI * 2; }
  const a_b = a - b;
  return (a_b >= 0)
    ? a_b
    : Math.PI * 2 - (b - a);
};

export const counter_clockwise_angle2_radians = function (a, b) {
  // this is on average 50 to 100 times faster than counter_clockwise_angle2
  while (a < 0) { a += Math.PI * 2; }
  while (b < 0) { b += Math.PI * 2; }
  const b_a = b - a;
  return (b_a >= 0)
    ? b_a
    : Math.PI * 2 - (a - b);
};

/** There are 2 angles between 2 vectors, from A to B return the clockwise one.
 * @param {[number, number]} vector
 * @returns {number} clockwise angle (from a to b) in radians
 */
export const clockwise_angle2 = function (a, b) {
  const dotProduct = b[0] * a[0] + b[1] * a[1];
  const determinant = b[0] * a[1] - b[1] * a[0];
  let angle = Math.atan2(determinant, dotProduct);
  if (angle < 0) { angle += Math.PI * 2; }
  return angle;
};

export const counter_clockwise_angle2 = function (a, b) {
  const dotProduct = a[0] * b[0] + a[1] * b[1];
  const determinant = a[0] * b[1] - a[1] * b[0];
  let angle = Math.atan2(determinant, dotProduct);
  if (angle < 0) { angle += Math.PI * 2; }
  return angle;
};

/** There are 2 interior angles between 2 vectors, return both, the smaller first
 * @param {[number, number]} vector
 * @returns {[number, number]} 2 angle measurements between vectors
 */
export const interior_angles2 = function (a, b) {
  const interior1 = clockwise_angle2(a, b);
  const interior2 = Math.PI * 2 - interior1;
  return (interior1 < interior2)
    ? [interior1, interior2]
    : [interior2, interior1];
};

/** This bisects 2 vectors into both smaller and larger outside angle bisections [small, large]
 * @param {[number, number]} vector
 * @returns {[[number, number],[number, number]]} 2 vectors, the smaller angle first
 */
export const bisect_vectors = function (a, b) {
  const aV = normalize(a);
  const bV = normalize(b);
  const sum = aV.map((_, i) => aV[i] + bV[i]);
  const vecA = normalize(sum);
  const vecB = aV.map((_, i) => -aV[i] + -bV[i]);
  return [vecA, normalize(vecB)];
};

/** This bisects 2 lines
 * @param {[number, number]} all vectors, lines defined by points and vectors
 * @returns [ [number,number], [number,number] ] // line, defined as point, vector, in that order
 *
 * second entry is 90 degrees counter clockwise from first entry
 */
export const bisect_lines2 = function (pointA, vectorA, pointB, vectorB) {
  const denominator = vectorA[0] * vectorB[1] - vectorB[0] * vectorA[1];
  if (Math.abs(denominator) < EPSILON) { /* parallel */
    const solution = [midpoint2(pointA, pointB), [vectorA[0], vectorA[1]]];
    const array = [solution, solution];
    const dot = vectorA[0] * vectorB[0] + vectorA[1] * vectorB[1];
    delete (dot > 0 ? array[1] : array[0]);
    return array;
  }
  // const vectorC = [pointB[0] - pointA[0], pointB[1] - pointA[1]];
  const numerator = (pointB[0] - pointA[0]) * vectorB[1] - vectorB[0] * (pointB[1] - pointA[1]);
  const t = numerator / denominator;
  const x = pointA[0] + vectorA[0] * t;
  const y = pointA[1] + vectorA[1] * t;
  const bisects = bisect_vectors(vectorA, vectorB);
  bisects[1] = [bisects[1][1], -bisects[1][0]];
  return bisects.map(el => [[x, y], el]);
};

/** Calculates the signed area of a polygon. This requires the polygon be non-intersecting.
 * @returns {number} the area of the polygon
 * @example
 * var area = polygon.signedArea()
 */
export const signed_area = function (points) {
  return 0.5 * points.map((el, i, arr) => {
    const next = arr[(i + 1) % arr.length];
    return el[0] * next[1] - next[0] * el[1];
  }).reduce((a, b) => a + b, 0);
};

/** Calculates the centroid or the center of mass of the polygon.
 * @returns {XY} the location of the centroid
 * @example
 * var centroid = polygon.centroid()
 */
export const centroid = function (points) {
  const sixthArea = 1 / (6 * signed_area(points));
  return points.map((el, i, arr) => {
    const next = arr[(i + 1) % arr.length];
    const mag = el[0] * next[1] - next[0] * el[1];
    return [(el[0] + next[0]) * mag, (el[1] + next[1]) * mag];
  }).reduce((a, b) => [a[0] + b[0], a[1] + b[1]], [0, 0])
    .map(c => c * sixthArea);
};

/**
 * works in any n-dimension (enclosing cube, hypercube..)
 * @returns array of arrays: [[x, y], [width, height]]
 */
export const enclosing_rectangle = function (points) {
  const l = points[0].length;
  const mins = Array.from(Array(l)).map(() => Infinity);
  const maxs = Array.from(Array(l)).map(() => -Infinity);
  points.forEach(point => point
    .forEach((c, i) => {
      if (c < mins[i]) { mins[i] = c; }
      if (c > maxs[i]) { maxs[i] = c; }
    }));
  const lengths = maxs.map((max, i) => max - mins[i]);
  return [mins, lengths];
};

export const split_polygon = function (poly, linePoint, lineVector) {
  //    point: intersection [x,y] point or null if no intersection
  // at_index: where in the polygon this occurs
  const vertices_intersections = poly.map((v, i) => {
    const intersection = point_on_line(linePoint, lineVector, v);
    return { type: "v", point: intersection ? v : null, at_index: i };
  }).filter(el => el.point != null);
  const edges_intersections = poly.map((v, i, arr) => {
    const intersection = line_edge_exclusive(linePoint, lineVector, v, arr[(i + 1) % arr.length]);
    return { type: "e", point: intersection, at_index: i };
  }).filter(el => el.point != null);

  const sorted = vertices_intersections
    .concat(edges_intersections)
    .sort((a, b) => (Math.abs(a.point[0] - b.point[0]) < EPSILON
      ? a.point[1] - b.point[1]
      : a.point[0] - b.point[0]));
  console.log(sorted);
  return poly;
};

export const split_convex_polygon = function (poly, linePoint, lineVector) {
  // todo: should this return undefined if no intersection?
  //       or the original poly?

  //    point: intersection [x,y] point or null if no intersection
  // at_index: where in the polygon this occurs
  let vertices_intersections = poly.map((v,i) => {
    let intersection = point_on_line(linePoint, lineVector, v);
    return { point: intersection ? v : null, at_index: i };
  }).filter(el => el.point != null);
  let edges_intersections = poly.map((v,i,arr) => {
    let intersection = line_edge_exclusive(linePoint, lineVector, v, arr[(i+1)%arr.length])
    return { point: intersection, at_index: i };
  }).filter(el => el.point != null);

  // three cases: intersection at 2 edges, 2 points, 1 edge and 1 point
  if (edges_intersections.length == 2) {
    let sorted_edges = edges_intersections.slice()
      .sort((a,b) => a.at_index - b.at_index);

    let face_a = poly
      .slice(sorted_edges[1].at_index+1)
      .concat(poly.slice(0, sorted_edges[0].at_index+1))
    face_a.push(sorted_edges[0].point);
    face_a.push(sorted_edges[1].point);

    let face_b = poly
      .slice(sorted_edges[0].at_index+1, sorted_edges[1].at_index+1);
    face_b.push(sorted_edges[1].point);
    face_b.push(sorted_edges[0].point);
    return [face_a, face_b];
  } else if (edges_intersections.length == 1 && vertices_intersections.length == 1) {
    vertices_intersections[0]["type"] = "v";
    edges_intersections[0]["type"] = "e";
    let sorted_geom = vertices_intersections.concat(edges_intersections)
      .sort((a,b) => a.at_index - b.at_index);

    let face_a = poly.slice(sorted_geom[1].at_index+1)
      .concat(poly.slice(0, sorted_geom[0].at_index+1))
    if (sorted_geom[0].type === "e") { face_a.push(sorted_geom[0].point); }
    face_a.push(sorted_geom[1].point); // todo: if there's a bug, it's here. switch this

    let face_b = poly
      .slice(sorted_geom[0].at_index+1, sorted_geom[1].at_index+1);
    if (sorted_geom[1].type === "e") { face_b.push(sorted_geom[1].point); }
    face_b.push(sorted_geom[0].point); // todo: if there's a bug, it's here. switch this
    return [face_a, face_b];
  } else if (vertices_intersections.length == 2) {
    let sorted_vertices = vertices_intersections.slice()
      .sort((a,b) => a.at_index - b.at_index);
    let face_a = poly
      .slice(sorted_vertices[1].at_index)
      .concat(poly.slice(0, sorted_vertices[0].at_index+1))
    let face_b = poly
      .slice(sorted_vertices[0].at_index, sorted_vertices[1].at_index+1);
    return [face_a, face_b];
  }
  return [poly.slice()];
};

export const convex_hull = function (points, include_collinear = false, epsilon = EPSILON) {
  // # points in the convex hull before escaping function
  let INFINITE_LOOP = 10000;
  // sort points by y. if ys are equivalent, sort by x
  let sorted = points.slice().sort((a, b) =>
    (Math.abs(a[1] - b[1]) < epsilon
      ? a[0] - b[0]
      : a[1] - b[1]))
  let hull = [];
  hull.push(sorted[0]);
  // the current direction the perimeter walker is facing
  let ang = 0;
  let infiniteLoop = 0;
  do {
    infiniteLoop += 1;
    let h = hull.length - 1;
    let angles = sorted
      // remove all points in the same location from this search
      .filter(el => !(Math.abs(el[0] - hull[h][0]) < epsilon
        && Math.abs(el[1] - hull[h][1]) < epsilon))
      // sort by angle, setting lowest values next to "ang"
      .map((el) => {
        let angle = Math.atan2(hull[h][1] - el[1], hull[h][0] - el[0]);
        while (angle < ang) { angle += Math.PI * 2; }
        return { node: el, angle, distance: undefined };
      }) // distance to be set later
      .sort((a, b) => ((a.angle < b.angle) ? -1 : (a.angle > b.angle) ? 1 : 0));
    if (angles.length === 0) { return undefined; }
    // narrowest-most right turn
    let rightTurn = angles[0];
    // collect all other points that are collinear along the same ray
    angles = angles.filter(el => Math.abs(rightTurn.angle - el.angle) < epsilon)
    // sort collinear points by their distances from the connecting point
      .map((el) => {
        let distance = Math.sqrt(((hull[h][0] - el.node[0]) ** 2) + ((hull[h][1] - el.node[1]) ** 2));
        el.distance = distance;
        return el;
      })
    // (OPTION 1) exclude all collinear points along the hull
      .sort((a, b) => ((a.distance < b.distance) ? 1 : (a.distance > b.distance) ? -1 : 0));
    // (OPTION 2) include all collinear points along the hull
    // .sort(function(a,b) {return (a.distance < b.distance)?-1:(a.distance > b.distance)?1:0});
    // if the point is already in the convex hull, we've made a loop. we're done
    // if (contains(hull, angles[0].node)) {
    // if (includeCollinear) {
    //  points.sort(function(a,b) {return (a.distance - b.distance)});
    // } else{
    //  points.sort(function(a,b) {return b.distance - a.distance});
    // }

    if (hull.filter(el => el === angles[0].node).length > 0) {
      return hull;
    }
    // add point to hull, prepare to loop again
    hull.push(angles[0].node);
    // update walking direction with the angle to the new point
    ang = Math.atan2( hull[h][1] - angles[0].node[1], hull[h][0] - angles[0].node[0]);
  } while (infiniteLoop < INFINITE_LOOP);
  return undefined;
};
