import { otherTestSpecs } from "@specs/otherTest.specs.ts";
import type { ZodiosResponseByAlias } from "@zodios/core";
import { zodiosRouter } from "@zodios/express";

import { testAll } from "../../request/testAll.ts";
import { testOne } from "../../request/testOne.ts";

const otherTestRouter = zodiosRouter(otherTestSpecs);

otherTestRouter.get("/test-other/all", (_req, res) => {
	testAll()
		.then((result) => {
			const response: ZodiosResponseByAlias<
				typeof otherTestSpecs,
				"getOtherTests"
			> = result.map((it) => ({
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

otherTestRouter.get("/test-other/unique", (_req, res) => {
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

export { otherTestRouter };
