import { otherTestSpecs } from "@specs/otherTest.specs.ts";
import { zodiosRouter } from "@zodios/express";

const otherTestRouter = zodiosRouter(otherTestSpecs);

otherTestRouter.get("/test-other/all", (_req, res) => {
	const rows = [
		{ id: 1, name: "guillaume", isActive: false },
		{ id: 2, name: "mercier", isActive: true },
	];
	res.json(rows);
});

otherTestRouter.get("/test-other/unique", (_req, res) => {
	const rows = { id: 1, name: "guillaume", isActive: false };
	res.json(rows);
});

export { otherTestRouter };
