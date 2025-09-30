import type { GetTest } from "@specs/endpoint/test/getTest.endpoint.ts";
import type { PostTest } from "@specs/endpoint/test/postTest.endpoint.ts";

import { asyncHandler } from "../../../common/asyncRequestHandler.ts";

export const testController = {
	testGet: asyncHandler<GetTest>(async (_req, res) => {
		res.status(200).json({ user: ["Michel", "Binss"] });
	}),

	fakePostTest: asyncHandler<PostTest>(async (_req, res) => {
		res.status(200).json([1, 2, 3, 5, 8, 13]);
	}),
};
