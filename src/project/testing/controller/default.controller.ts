import type { Request } from "express";

import { asyncHandler } from "../../../common/asyncRequestHandler.ts";

function logger(req: Request) {
	console.log({
		url: req.url,
		method: req.method,
		token: req.headers.authorization,
		params: req.params,
		query: req.query,
		body: req.body as unknown,
	});
}

export const testController = {
	testGet: asyncHandler(async (req, res) => {
		logger(req);
		res.status(200).json({ answer: "Success ? Genre vraiment" });
	}),
	fakePostTest: asyncHandler(async (req, res) => {
		logger(req);
		res.status(200).json(["Jean-Pierre", "Michel"]);
	}),
};
