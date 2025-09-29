import type { SimplePostSpec } from "./SimplePostSpec.type.ts";

// eslint-disable-next-line import/no-unused-modules
export const simplePostSpec: SimplePostSpec = {
	"/test/:id": {
		params: { id: "" },
		query: { fantastic: "" },
		body: { rrrrr: "" },
		responses: {
			200: { ok: true, n: 0 },
			404: { code: "NOT_FOUND", message: "" },
		},
	},
};
