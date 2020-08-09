const math = require("../math");

const testEqual = function (...args) {
  expect(math.core.equivalent(...args)).toBe(true);
};

test("x, y", () => {
  const result = math.circle(1, [2,3]);
  expect(result.x).toBe(2);
  expect(result.y).toBe(3);

  const result1 = math.circle(1);
  expect(result1.x).toBe(0);
  expect(result1.y).toBe(0);
});

test("circle nearest point", () => {
  const result1 = math.circle(1).nearestPoint([5,0]);
  expect(result1.x).toBeCloseTo(1);
  expect(result1.y).toBeCloseTo(0);
  const result2 = math.circle(2, [4,4]).nearestPoint([0,0]);
  expect(result2.x).toBeCloseTo(4 - Math.sqrt(2));
  expect(result2.y).toBeCloseTo(4 - Math.sqrt(2));
});

test("points", () => {
  const result = math.circle(1, [1,2]).points();
  expect(result.length).toBe(128);
  expect(result[0][0]).toBeCloseTo(2);
  expect(result[0][1]).toBeCloseTo(2);
});

test("points param", () => {
  const result1 = math.circle(1).points(64);
  expect(result1.length).toBe(64);
  const result2 = math.circle(1).points(1);
  expect(result2.length).toBe(1);
  const result3 = math.circle(1).points(3);
  expect(result3.length).toBe(3);
});

test("polygon", () => {
  const result = math.circle(1, [1,2]).polygon();
  expect(result.points.length).toBe(128);
  expect(result.points[0][0]).toBeCloseTo(2);
  expect(result.points[0][1]).toBeCloseTo(2);
});

test("segments", () => {
  const result = math.circle(1, [1,2]).segments();
  expect(result.length).toBe(128);
  expect(result[0][0][0]).toBeCloseTo(2);
  expect(result[0][0][1]).toBeCloseTo(2);
});

test("circle fromPoints", () => {
  const result1 = math.circle.fromPoints([1,2], [0,3], [-1,2]);
  expect(result1.radius).toBeCloseTo(1);
  expect(result1.origin.x).toBeCloseTo(2);
  expect(result1.origin.y).toBeCloseTo(0);

  const result2 = math.circle.fromPoints([1,2], [0,3]);
  expect(result2.radius).toBeCloseTo(Math.sqrt(2));
  expect(result2.origin.x).toBeCloseTo(1);
  expect(result2.origin.y).toBeCloseTo(2);
});

test("circle fromThreePoints", () => {
  const result = math.circle.fromThreePoints([1,2], [0,3], [-1,2]);
  expect(result.origin.x).toBeCloseTo(0);
  expect(result.origin.y).toBeCloseTo(2);
});

test("clip lines", () => {
  testEqual(5, math.circle(5, 1, 2).radius);
  testEqual([1, 2], math.circle(5, 1, 2).origin);
  const clipLine = math.circle(1).intersect(math.line([0, 1], [0.5, 0]));
  const shouldBeLine = [[0.5, -Math.sqrt(3) / 2], [0.5, Math.sqrt(3) / 2]];
  testEqual(clipLine[0], shouldBeLine[0]);
  testEqual(clipLine[1], shouldBeLine[1]);

  const shouldBeRay = [Math.sqrt(2) / 2, Math.sqrt(2) / 2];
  const clipRay = math.circle(1).intersect(math.ray(0.1, 0.1));
  testEqual(shouldBeRay, clipRay[0]);

  const shouldBeSeg = [Math.sqrt(2) / 2, Math.sqrt(2) / 2];
  const clipSeg = math.circle(1).intersect(math.segment(0, 0, 10, 10));
  testEqual(shouldBeSeg, clipSeg[0]);
});
