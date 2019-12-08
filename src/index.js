/**              _                       _                      _   _
                (_)                     (_)                    | | | |
       ___  _ __ _  __ _  __ _ _ __ ___  _      _ __ ___   __ _| |_| |__
      / _ \| '__| |/ _` |/ _` | '_ ` _ \| |    | '_ ` _ \ / _` | __| '_ \
     | (_) | |  | | (_| | (_| | | | | | | |    | | | | | | (_| | |_| | | |
      \___/|_|  |_|\__, |\__,_|_| |_| |_|_|    |_| |_| |_|\__,_|\__|_| |_|
                    __/ |
                   |___/
 */
/*
 * the logic is under ".core", the primitives are under the top level.
 * the primitives have arguments type inference. the logic core is strict:
 *
 * all points are array syntax [x,y]
 * all segments are array syntax [[x,y], [x,y]]
 * all infinite lines are defined as point and vector [[x,y], [x,y]]
 * all polygons are an ordered set of points [[x,y], ...]
 * (it might be the case that counter-clockwise winding direction is preferred)
 *
 * the primitives store object methods under their prototype,
 * the top level has properties like x, y, z.
 */

import * as algebra from "./core/algebra";
import * as matrixCore from "./core/matrix2";
import * as geometry from "./core/geometry";
import * as query from "./core/query";
import * as intersection from "./core/intersection";
import * as equal from "./core/equal";
import * as args from "./parsers/arguments";

import vector from "./primitives/vector";
import {
  Matrix2 as matrix2,
  Matrix as matrix
} from "./primitives/matrix";
import line from "./primitives/line";
import ray from "./primitives/ray";
import segment from "./primitives/segment";
import circle from "./primitives/circle";
import polygon from "./primitives/polygon";
import convexPolygon from "./primitives/convexPolygon";
import rectangle from "./primitives/rectangle";
import junction from "./primitives/junction";
import sector from "./primitives/sector";

const core = Object.create(null);
Object.assign(core, algebra, matrixCore, geometry, query, equal);
// core.EPSILON = EPSILON;
// don't copy over all arguments, only export what is needed
core.clean_number = args.clean_number;
core.is_number = args.is_number;
core.is_vector = args.is_vector;
core.is_iterable = args.is_iterable;
core.flatten_input = args.flatten_input;
core.semi_flatten_input = args.semi_flatten_input;
core.get_vector = args.get_vector;
core.get_vector_of_vectors = args.get_vector_of_vectors;
core.get_matrix2 = args.get_matrix2;
core.get_segment = args.get_segment;
core.get_line = args.get_line;
core.get_ray = args.get_ray;
core.get_two_vec2 = args.get_two_vec2;
core.get_array_of_vec = args.get_array_of_vec;
core.get_array_of_vec2 = args.get_array_of_vec2;

core.intersection = intersection;
Object.freeze(core);

const math = {
  vector,
  matrix2,
  matrix,
  line,
  ray,
  segment,
  circle,
  polygon,
  convexPolygon,
  rectangle,
  junction,
  sector,
  core,
};

export default math;
