import Constructors from "../constructors";
import {
  flatten_arrays,
  resize,
} from "../../arguments/resize";
import { get_vector_of_vectors } from "../../arguments/get";
import { distance2 } from "../../core/algebra";

const CircleArgs = function () {
  const vectors = get_vector_of_vectors(arguments);
  const numbers = resize(3, flatten_arrays(arguments));

  if (vectors.length === 2) {
    this.radius = vectors[0].length === 1
      ? vectors[0][0] : distance2(...vectors);
    this.origin = vectors[0].length === 1
      ? Constructors.vector(...vectors[1])
      : Constructors.vector(...vectors[0]);
  } else {
    this.radius = numbers[0];
    this.origin = Constructors.vector(numbers[1], numbers[2]);
  }
};

export default CircleArgs;
