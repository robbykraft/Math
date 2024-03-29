const { test, expect } = require("@jest/globals");
const math = require("../math.js");

const equalTest = (a, b) => expect(JSON.stringify(a))
	.toBe(JSON.stringify(b));

test("sortPointsAlongVector", () => {
	const points = [[1, 0], [0, 1], [-1, 0], [0, -1]];
	const result = math.sortPointsAlongVector(points, [1, 0]);
	expect(result[0]).toBe(2);
	expect([result[1], result[2]].sort((a, b) => a - b).join(" ")).toBe("1 3");
	expect(result[3]).toBe(0);
});

test("clusterIndicesOfSortedNumbers", () => {
	const result = math.clusterIndicesOfSortedNumbers([0, 1, 2, 3, 4, 5]);
	equalTest(result, [[0], [1], [2], [3], [4], [5]]);
	const result1 = math.clusterIndicesOfSortedNumbers([0, 1, 2, 3, 4, 5], 1);
	equalTest(result1, [[0], [1], [2], [3], [4], [5]]);
	const result2 = math.clusterIndicesOfSortedNumbers([0, 1, 2, 3, 4, 5], 1 + math.EPSILON * 2);
	equalTest(result2, [[0, 1, 2, 3, 4, 5]]);
});

test("radialSortPointIndices2", () => {
	equalTest(math.radialSortPointIndices2(), []);

	const result0 = math.radialSortPointIndices2([[1, 0], [0, 1], [-1, 0]]);
	equalTest(result0, [[2], [0], [1]]);
	const result1 = math.radialSortPointIndices2([[0, 1], [-1, 0], [1, 0]]);
	equalTest(result1, [[1], [2], [0]]);
	const result2 = math.radialSortPointIndices2([[-1, 0], [1, 0], [0, 1]]);
	equalTest(result2, [[0], [1], [2]]);

	const result3 = math.radialSortPointIndices2([[1, 0], [0, 1], [-1, 0]], 2);
	equalTest(result3, [[2], [1, 0]]);
	const result4 = math.radialSortPointIndices2([[0, 1], [-1, 0], [1, 0]], 2);
	equalTest(result4, [[1], [0, 2]]);
	const result5 = math.radialSortPointIndices2([[-1, 0], [1, 0], [0, 1]], 2);
	equalTest(result5, [[0], [2, 1]]);
});

test("radialSortPointIndices3", () => {
	const points = Array.from(Array(24))
		.map(() => [Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1]);
	points.push([0, 0, 0]);
	const result = math.radialSortPointIndices3(points, [1, 0, 0]);
	expect(result.length).toBe(25);
});

test("radialSortPointIndices3", () => {
	const points = [
		[1, 1, 1],
		[-1, -1, -1],
		[-1, -1, 1],
		[1, 1, -1],
	];
	const resultX = math.radialSortPointIndices3(points, [1, 0, 0]);
	const resultY = math.radialSortPointIndices3(points, [0, 1, 0]);
	const resultZ = math.radialSortPointIndices3(points, [0, 0, 1]);
	const resultXn = math.radialSortPointIndices3(points, [-1, 0, 0]);
	const resultYn = math.radialSortPointIndices3(points, [0, -1, 0]);
	const resultZn = math.radialSortPointIndices3(points, [0, 0, -1]);
	expect(JSON.stringify(resultX)).toBe(JSON.stringify([3, 0, 2, 1]));
	expect(JSON.stringify(resultY)).toBe(JSON.stringify([0, 3, 1, 2]));
	expect(JSON.stringify(resultZ)).toBe(JSON.stringify([0, 3, 1, 2]));
	expect(JSON.stringify(resultXn)).toBe(JSON.stringify([0, 3, 1, 2]));
	expect(JSON.stringify(resultYn)).toBe(JSON.stringify([3, 0, 2, 1]));
	expect(JSON.stringify(resultZn)).toBe(JSON.stringify([0, 3, 1, 2]));
});
