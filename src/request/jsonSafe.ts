export function jsonSafe<T>(val: unknown): T {
	const conv = (v: unknown): unknown => {
		if (typeof v === "bigint") {
			const n = Number(v);
			return Number.isSafeInteger(n) ? n : v.toString();
		}
		if (Array.isArray(v)) return v.map(conv);
		if (v && typeof v === "object") {
			return Object.fromEntries(
				Object.entries(v).map(([k, x]) => [k, conv(x)]),
			);
		}
		return v;
	};
	return conv(val) as T;
}
