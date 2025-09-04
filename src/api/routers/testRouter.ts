import { testSpecs } from "@specs/test.specs.ts";
import { zodiosRouter } from "@zodios/express";

const testRouter = zodiosRouter(testSpecs);

testRouter.get("/test/all", (_req, res) => {
	const rows = [
		{ id: 1, name: "jean", isActive: true },
		{ id: 2, name: "michel", isActive: false },
	];
	res.json(rows);
});

testRouter.get("/test/unique", (_req, res) => {
	const rows = { id: 2, name: "michel", isActive: false };
	res.json(rows);
});

export { testRouter };
