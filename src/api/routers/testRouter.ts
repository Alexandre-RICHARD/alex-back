import { testSpecs } from "@specs/test.specs.ts";
import type { ZodiosResponseByAlias } from "@zodios/core";
import { zodiosRouter } from "@zodios/express";

import { testAll } from "../../request/testAll.ts";
import { testOne } from "../../request/testOne.ts";

const testRouter = zodiosRouter(testSpecs);

testRouter.get("/test/all", (_req, res) => {
	testAll()
		.then((result) => {
			const response: ZodiosResponseByAlias<typeof testSpecs, "getTests"> =
				result.map((it) => ({
					id: it.tt_test_table_id,
					name: it.tt_name,
					isActive: it.tt_is_active === 1,
				}));
			res.json(response);
		})
		.catch(() => {
			res.status(500).json({
				code: 500,
				message: "Database request failed",
			});
		});
});

testRouter.get("/test/unique", (_req, res) => {
	testOne()
		.then((result) => {
			res.json({
				id: result.tt_test_table_id,
				name: result.tt_name,
				isActive: result.tt_is_active === 1,
			});
		})
		.catch(() => {
			res.status(500).json({
				code: 500,
				message: "Database request failed",
			});
		});
});

export { testRouter };
