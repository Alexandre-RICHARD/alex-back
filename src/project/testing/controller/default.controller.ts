import type { RequestHandler } from "express";

import { sendTyped } from "../../../testingFiles/sendTyped.ts";
import type { SimplePostSpec } from "../../../testingFiles/SimplePostSpec.type.ts";

export const testController: {
	test: RequestHandler<
		SimplePostSpec["/test/:id"]["params"],
		SimplePostSpec["/test/:id"]["responses"][keyof SimplePostSpec["/test/:id"]["responses"]],
		SimplePostSpec["/test/:id"]["body"],
		SimplePostSpec["/test/:id"]["query"]
	>;
} = {
	test: async (req, res) => {
		const { id } = req.params;
		const { rrrrr } = req.body;
		const { fantastic } = req.query;

		if (id === "missing") {
			return sendTyped<SimplePostSpec["/test/:id"]["responses"], 404>(
				res,
				404,
				{
					code: "NOT_FOUND",
					message: "Widget introuvable",
				},
			);
		}

		return sendTyped<SimplePostSpec["/test/:id"]["responses"], 200>(res, 200, {
			ok: true,
			n: rrrrr.length + (fantastic ? 1 : 0),
		});
	},
};
