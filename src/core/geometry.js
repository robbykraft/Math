/**
 * Math (c) Kraft
 */
import { EPSILON, TWO_PI } from "./constants";
import { nearestPointOnLine } from "./nearest";
import { cleanNumber } from "../arguments/resize";
import { getLine, getRectParams } from "../arguments/get";
import {
  fnAdd,
  includeL,
  excludeL,
  excludeR,
  excludeS,
} from "../arguments/functions";
import {
  clockwiseAngle2,
  counterClockwiseAngle2,
  clockwiseBisect2,
  clockwiseSubsect2,
  counterClockwiseSubsect2,
} from "./radial";
import {
  dot,
  normalize,
  distance,
  midpoint,
  lerp,
  add,
  subtract,
  flip,
  rotate90,
  parallel,
} from "./algebra";
import overlapLinePoint from "../intersection/overlap-line-point";
import intersectLineLine from "../intersection/intersect-line-line";
/**
 * @description Calculates the circumcircle which lies on three points.
 * @param {number[]} a one 2D point as an array of numbers
 * @param {number[]} b one 2D point as an array of numbers
 * @param {number[]} c one 2D point as an array of numbers
 * @returns {circle} one circle with keys "radius" (number) and "origin" (number[])
 * @example
 * var centroid = polygon.centroid()
 */
export const circumcircle = function (a, b, c) {
  const A = b[0] - a[0];
  const B = b[1] - a[1];
  const C = c[0] - a[0];
  const D = c[1] - a[1];
  const E = A * (a[0] + b[0]) + B * (a[1] + b[1]);
  const F = C * (a[0] + c[0]) + D * (a[1] + c[1]);
  const G = 2 * (A * (c[1] - b[1]) - B * (c[0] - b[0]));
  if (Math.abs(G) < EPSILON) {
    const minx = Math.min(a[0], b[0], c[0]);
    const miny = Math.min(a[1], b[1], c[1]);
    const dx = (Math.max(a[0], b[0], c[0]) - minx) * 0.5;
    const dy = (Math.max(a[1], b[1], c[1]) - miny) * 0.5;
    return {
      origin: [minx + dx, miny + dy],
      radius: Math.sqrt(dx * dx + dy * dy),
    };
  }
  const origin = [(D * E - B * F) / G, (A * F - C * E) / G];
  const dx = origin[0] - a[0];
  const dy = origin[1] - a[1];
  return {
    origin,
    radius: Math.sqrt(dx * dx + dy * dy),
  };
};
/**
 * @description Calculates the signed area of a polygon. This requires the polygon be non-self-intersecting.
 * @param {number[][]} points an array of 2D points, which are arrays of numbers
 * @returns {number} the area of the polygon
 * @example
 * var area = polygon.signedArea()
 */
export const signedArea = points => 0.5 * points
  .map((el, i, arr) => {
    const next = arr[(i + 1) % arr.length];
    return el[0] * next[1] - next[0] * el[1];
  }).reduce(fnAdd, 0);
/**
 * @description Calculates the centroid or the center of mass of the polygon.
 * @param {number[][]} points an array of 2D points, which are arrays of numbers
 * @returns {number[]} one 2D point as an array of numbers
 * @example
 * var centroid = polygon.centroid()
 */
export const centroid = (points) => {
  const sixthArea = 1 / (6 * signedArea(points));
  return points.map((el, i, arr) => {
    const next = arr[(i + 1) % arr.length];
    const mag = el[0] * next[1] - next[0] * el[1];
    return [(el[0] + next[0]) * mag, (el[1] + next[1]) * mag];
  }).reduce((a, b) => [a[0] + b[0], a[1] + b[1]], [0, 0])
    .map(c => c * sixthArea);
};
/**
 * @description Make an axis-aligned bounding box that encloses a set of points.
 * the optional padding is used to make the bounding box inclusive / exclusive
 * by adding padding on all sides, or inset in the case of negative number.
 * (positive=inclusive boundary, negative=exclusive boundary)
 * @param {number[][]} points an array of unsorted points, in any dimension
 * @param {number} [padding=0] optionally add padding around the box
 * @returns {object} "min" and "max" are two points, "span" is the lengths
 */
export const boundingBox = (points, padding = 0) => {
  const min = Array(points[0].length).fill(Infinity);
  const max = Array(points[0].length).fill(-Infinity);
  points.forEach(point => point
    .forEach((c, i) => {
      if (c < min[i]) { min[i] = c - padding; }
      if (c > max[i]) { max[i] = c + padding; }
    }));
  const span = max.map((max, i) => max - min[i]);
  return { min, max, span };
};
/**
 * the radius parameter measures from the center to the midpoint of the edge
 * vertex-axis aligned
 * todo: also possible to parameterize the radius as the center to the points
 * todo: can be edge-aligned
 */
const angleArray = count => Array
  .from(Array(Math.floor(count)))
  .map((_, i) => TWO_PI * (i / count));

const anglesToVecs = (angles, radius) => angles
  .map(a => [radius * Math.cos(a), radius * Math.sin(a)])
  .map(pt => pt.map(n => cleanNumber(n, 14))); // this step is costly!
// a = 2r tan(π/n)
/**
 * make regular polygon is circumradius by default
 */
export const makePolygonCircumradius = (sides = 3, radius = 1) =>
  anglesToVecs(angleArray(sides), radius);

export const makePolygonCircumradiusS = (sides = 3, radius = 1) => {
  const halfwedge = Math.PI / sides;
  const angles = angleArray(sides).map(a => a + halfwedge);
  return anglesToVecs(angles, radius);
};
export const makePolygonInradius = (sides = 3, radius = 1) => 
  makePolygonCircumradius(sides, radius / Math.cos(Math.PI / sides));

export const makePolygonInradiusS = (sides = 3, radius = 1) =>
  makePolygonCircumradiusS(sides, radius / Math.cos(Math.PI / sides));

export const makePolygonSideLength = (sides = 3, length = 1) =>
  makePolygonCircumradius(sides, (length / 2) / Math.sin(Math.PI / sides));

export const makePolygonSideLengthS = (sides = 3, length = 1) =>
  makePolygonCircumradiusS(sides, (length / 2) / Math.sin(Math.PI / sides));
/**
 * @description removes any collinear vertices from a n-dimensional polygon.
 * @param {number[][]} polygon a polygon as an array of ordered points in array form
 * @param {number} [epsilon=1e-6] an optional epsilon
 * @returns {number[][]} a copy of the polygon with collinear points removed
 */
export const makePolygonNonCollinear = (polygon, epsilon = EPSILON) => {
  // index map [i] to [i, i+1]
  const edges_vector = polygon
    .map((v, i, arr) => [v, arr[(i + 1) % arr.length]])
    .map(pair => subtract(pair[1], pair[0]));
  // the vertex to be removed. true=valid, false=collinear.
  // ask if an edge is parallel to its predecessor, this way,
  // the edge index will match to the collinear vertex.
  const vertex_collinear = edges_vector
    .map((vector, i, arr) => [vector, arr[(i + arr.length - 1) % arr.length]])
    .map(pair => !parallel(pair[1], pair[0], epsilon));
  return polygon
    .filter((vertex, v) => vertex_collinear[v]);
};
// export const split_polygon = () => console.warn("split polygon not done");

const pleatParallel = (count, a, b) => {
  const origins = Array.from(Array(count - 1))
    .map((_, i) => (i + 1) / count)
    .map(t => lerp(a.origin, b.origin, t));
  const vector = [...a.vector];
  return origins.map(origin => ({ origin, vector }));
};

const pleatAngle = (count, a, b) => {
  const origin = intersectLineLine(
    a.vector, a.origin,
    b.vector, b.origin);
  const vectors = clockwiseAngle2(a.vector, b.vector) < counterClockwiseAngle2(a.vector, b.vector)
    ? clockwiseSubsect2(count, a.vector, b.vector)
    : counterClockwiseSubsect2(count, a.vector, b.vector);
  return vectors.map(vector => ({ origin, vector }));
};
/**
 * @description between two lines, make a repeating sequence of evenly-spaced lines to simulate a series of pleats.
 * @param {line} object with two keys/values: { vector: [], origin: [] }
 * @param {line} object with two keys/values: { vector: [], origin: [] }
 * @param {number} the number of faces, the number of lines will be n-1.
 * @returns {line[]} an array of lines, objects which contain "vector" and "origin"
 */
export const pleat = (count, a, b) => {
  const lineA = getLine(a);
  const lineB = getLine(b);
  return parallel(lineA.vector, lineB.vector)
    ? pleatParallel(count, lineA, lineB)
    : pleatAngle(count, lineA, lineB);
};

export const splitConvexPolygon = (poly, lineVector, linePoint) => {
  // todo: should this return undefined if no intersection?
  //       or the original poly?

  //    point: intersection [x,y] point or null if no intersection
  // at_index: where in the polygon this occurs
  let vertices_intersections = poly.map((v, i) => {
    let intersection = overlapLinePoint(lineVector, linePoint, v, includeL);
    return { point: intersection ? v : null, at_index: i };
  }).filter(el => el.point != null);
  let edges_intersections = poly.map((v, i, arr) => ({
      point: intersectLineLine(
        lineVector,
        linePoint,
        subtract(v, arr[(i + 1) % arr.length]),
        arr[(i + 1) % arr.length],
        excludeL,
        excludeS),
      at_index: i }))
    .filter(el => el.point != null);

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
/**
 * @description create a 2D convex hull from a set of 2D points, choose whether to include or exclude points which lie collinear inside one of the boundary lines.
 * @param {number[][]} points an array of 2D points (which are arrays of numbers)
 * @param {boolean} [include_collinear=false] should we include points collinear along a boundary edge? by default, no (false).
 * @param {number} [epsilon=1e-6] an optional epsilon
 * @returns {number[][]} an array of points (which are arrays of numbers)
 */
export const convexHull = (points, include_collinear = false, epsilon = EPSILON) => {
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
    ang = Math.atan2(hull[h][1] - angles[0].node[1], hull[h][0] - angles[0].node[0]);
  } while (infiniteLoop < INFINITE_LOOP);
};
/**
 * @description this recursive algorithm works outwards-to-inwards, each repeat
 * decreases the size of the polygon by one point/side. (removes 2, adds 1)
 * and repeating the algorithm on the smaller polygon.
 *
 * @param {number[][]} array of point objects (arrays of numbers, [x, y]). the
 *   counter-clockwise sorted points of the polygon. as we recurse this list shrinks
 *   by removing the points that are "finished".
 *
 * @returns {object[]} array of line segments as objects with keys:
 *   "points": array of 2 points in array form [ [x, y], [x, y] ]
 *   "type": "skeleton" or "kawasaki", the latter being the projected perpendicular
 *   dropped edges down to the sides of the polygon.
 */
const recurseSkeleton = (points, lines, bisectors) => {
  // every point has an interior angle bisector vector, this ray is
  // tested for intersections with its neighbors on both sides.
  // "intersects" is fencepost mapped (i) to "points" (i, i+1)
  // because one point/ray intersects with both points on either side,
  // so in reverse, every point (i) relates to intersection (i-1, i)
  const intersects = points
    // .map((p, i) => math.ray(bisectors[i], p))
    // .map((ray, i, arr) => ray.intersect(arr[(i + 1) % arr.length]));
    .map((origin, i) => ({ vector: bisectors[i], origin }))
    .map((ray, i, arr) => intersectLineLine(
      ray.vector,
      ray.origin,
      arr[(i + 1) % arr.length].vector,
      arr[(i + 1) % arr.length].origin,
      excludeR,
      excludeR));
  // project each intersection point down perpendicular to the edge of the polygon
  // const projections = lines.map((line, i) => line.nearestPoint(intersects[i]));
  const projections = lines.map((line, i) => nearestPointOnLine(
    line.vector, line.origin, intersects[i], a => a));
  // when we reach only 3 points remaining, we are at the end. we can return early
  // and skip unnecessary calculations, all 3 projection lengths will be the same.
  if (points.length === 3) {
    return points.map(p => ({ type:"skeleton", points: [p, intersects[0]] }))
      .concat([{ type:"perpendicular", points: [projections[0], intersects[0]] }]);
  }
  // measure the lengths of the projected lines, these will be used to identify
  // the smallest length, or the point we want to operate on this round.
  const projectionLengths = intersects
    .map((intersect, i) => distance(intersect, projections[i]));
  let shortest = 0;
  projectionLengths.forEach((len, i) => {
    if (len < projectionLengths[shortest]) { shortest = i; }
  });
  // we have the shortest length, we now have the solution for this round
  // (all that remains is to prepare the arguments for the next recursive call)
  const solutions = [
    { type:"skeleton",
      points: [points[shortest], intersects[shortest]] },
    { type:"skeleton",
      points: [points[(shortest + 1) % points.length], intersects[shortest]] },
    // perpendicular projection
    // we could expand this algorithm here to include all three instead of just one.
    // two more of the entries in "intersects" will have the same length as shortest
    { type:"perpendicular", points: [projections[shortest], intersects[shortest]] }
    // ...projections.map(p => ({ type: "perpendicular", points: [p, intersects[shortest]] }))
  ];
  // our new smaller polygon, missing two points now, but gaining one more (the intersection)
  // this is to calculate the new angle bisector at this new point.
  // we are now operating on the inside of the polygon, the lines that will be built from
  // this bisection will become interior skeleton lines.
  // first, flip the first vector so that both of the vectors originate at the
  // center point, and extend towards the neighbors.
  const newVector = clockwiseBisect2(
    flip(lines[(shortest + lines.length - 1) % lines.length].vector),
    lines[(shortest + 1) % lines.length].vector
  );
  // delete 2 entries from "points" and "bisectors" and add each array's new element.
  // delete 1 entry from lines.
  const shortest_is_last_index = shortest === points.length - 1;
  points.splice(shortest, 2, intersects[shortest]);
  lines.splice(shortest, 1);
  bisectors.splice(shortest, 2, newVector);
  if (shortest_is_last_index) {
    // in the case the index was at the end of the array,
    // we tried to remove two elements but only removed one because
    // it was the last element. remove the first element too.
    points.splice(0, 1);
    bisectors.splice(0, 1);
    // also, the fencepost mapping of the lines array is off by one,
    // move the first element to the end of the array.
    lines.push(lines.shift());
  }
  return solutions.concat(recurseSkeleton(points, lines, bisectors));
};
/**
 * @description create a straight skeleton inside of a convex polygon
 * @param {number[][]} points counter-clockwise polygon as an array of points
 * (which are arrays of numbers)
 * @returns {object[]} list of objects containing "points" {number[][]}: two points
 * defining a line segment, and "type" {string}: either "skeleton" or "perpendicular"
 *
 * make sure:
 *  - your polygon is convex (todo: make this algorithm work with non-convex)
 *  - your polygon points are sorted counter-clockwise
 */
export const straightSkeleton = (points) => {
  // first time running this function, create the 2nd and 3rd parameters
  // convert the edges of the polygons into lines
  const lines = points
    .map((p, i, arr) => [p, arr[(i + 1) % arr.length]])
    // .map(side => math.line.fromPoints(...side));
    .map(side => ({ vector: subtract(side[1], side[0]), origin: side[0] }))
  // get the interior angle bisectors for every corner of the polygon
  // index map match to "points"
  const bisectors = points
    // each element into 3 (previous, current, next)
    .map((_, i, ar) => [(i - 1 + ar.length) % ar.length, i, (i + 1) % ar.length]
      .map(i => ar[i]))
    // make 2 vectors, from current point to previous/next neighbors
    .map(p => [subtract(p[0], p[1]), subtract(p[2], p[1])])
    // it is a little counter-intuitive but the interior angle between three
    // consecutive points in a counter-clockwise wound polygon is measured
    // in the clockwise direction
    .map(v => clockwiseBisect2(...v));
  // points is modified in place. create a copy
  // const points_clone = JSON.parse(JSON.stringify(points));
  // console.log("ss points", points_clone, points);
  return recurseSkeleton([...points], lines, bisectors);
};
