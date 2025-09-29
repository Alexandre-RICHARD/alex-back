import { asyncRequestHandler } from "../../../common/asyncRequestHandler.ts";

export const testController = {
	test: asyncRequestHandler((req, res) => {
		console.log({
			params: req.params,
			query: req.query,
			body: req.body,
		});
		res.json({ test: "réussi" });
	}),
};
