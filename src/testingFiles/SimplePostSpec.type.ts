export type SimplePostSpec = {
	"/test/:id": {
		params: { id: string };
		query: { fantastic?: string };
		body: { rrrrr: string };
		responses: {
			200: { ok: true; n: number };
			404: { code: "NOT_FOUND"; message: string };
		};
	};
};
