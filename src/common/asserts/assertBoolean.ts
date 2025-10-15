import { assert } from "./assert.ts";

export function assertBoolean(
	value: unknown,
	errorContext?: string,
): asserts value is boolean {
	assert(
		typeof value === "boolean",
		`${errorContext} → value is not a boolean`,
	);
}
