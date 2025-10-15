import { assert } from "./assert.ts";

export function assertNumber(
	value: unknown,
	errorContext?: string,
): asserts value is number {
	assert(typeof value === "number", `${errorContext} → value is not a number`);
}
