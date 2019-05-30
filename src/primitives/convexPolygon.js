import * as Query from "../core/query";
import * as Geometry from "../core/geometry";
import * as Input from "../parse/input";
import Edge from "./edge";
import Vector from "./vector";

import Prototype from "./prototypes/polygon";

const ConvexPolygon = function (...args) {
  const points = Input.get_array_of_vec(args).map(p => Vector(p));
  // todo, best practices here
  if (points === undefined) { return undefined; }
  const sides = points
    .map((p, i, arr) => [p, arr[(i + 1) % arr.length]])
    .map(ps => Edge(ps[0][0], ps[0][1], ps[1][0], ps[1][1]));

  const polygon = Object.create(Prototype(ConvexPolygon));

  // const liesOnEdge = function (p) {
  //  for(var i = 0; i < this.edges.length; i++) {
  //    if (this.edges[i].collinear(p)) { return true; }
  //  }
  //  return false;
  // }

  // when the prototype implements methods for non-convex, we need to overwrite them
  // const clipEdge = function () { };
  // const clipLine = function () { };
  // const clipRay = function () { };

  const split = function (...innerArgs) {
    const line = Input.get_line(innerArgs);
    return Geometry.split_convex_polygon(points, line.point, line.vector)
      .map(poly => ConvexPolygon(poly));
  };

  const overlaps = function (...innerArgs) {
    const poly2Points = Input.get_array_of_vec(innerArgs);
    return Query.convex_polygons_overlap(points, poly2Points);
  };

  // todo: a ConvexPolygon ConvexPolygon overlap method that returns
  // the boolean space between them as another ConvexPolygon.
  // then, generalize for Polygon

  const scale = function (magnitude, center = Geometry.centroid(polygon.points)) {
    const newPoints = polygon.points
      .map(p => [0, 1].map((_, i) => p[i] - center[i]))
      .map(vec => vec.map((_, i) => center[i] + vec[i] * magnitude));
    return ConvexPolygon(newPoints);
  };

  const rotate = function (angle, centerPoint = Geometry.centroid(polygon.points)) {
    const newPoints = polygon.points.map((p) => {
      const vec = [p[0] - centerPoint[0], p[1] - centerPoint[1]];
      const mag = Math.sqrt((vec[0] ** 2) + (vec[1] ** 2));
      const a = Math.atan2(vec[1], vec[0]);
      return [
        centerPoint[0] + Math.cos(a + angle) * mag,
        centerPoint[1] + Math.sin(a + angle) * mag,
      ];
    });
    return ConvexPolygon(newPoints);
  };

  Object.defineProperty(polygon, "points", { get: () => points });
  Object.defineProperty(polygon, "sides", { get: () => sides });

  // Object.defineProperty(polygon, "clipEdge", { value: clipEdge });
  // Object.defineProperty(polygon, "clipLine", { value: clipLine });
  // Object.defineProperty(polygon, "clipRay", { value: clipRay });
  Object.defineProperty(polygon, "split", { value: split });
  Object.defineProperty(polygon, "overlaps", { value: overlaps });
  Object.defineProperty(polygon, "scale", { value: scale });
  Object.defineProperty(polygon, "rotate", { value: rotate });

  // return Object.freeze(polygon);
  return polygon;
};

ConvexPolygon.regularPolygon = function (sides, x = 0, y = 0, radius = 1) {
  const points = Geometry.make_regular_polygon(sides, x, y, radius);
  return ConvexPolygon(points);
};
ConvexPolygon.convexHull = function (points, includeCollinear = false) {
  const hull = Geometry.convex_hull(points, includeCollinear);
  return ConvexPolygon(hull);
};

export default ConvexPolygon;