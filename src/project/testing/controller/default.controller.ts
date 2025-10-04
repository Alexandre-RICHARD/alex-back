import { asyncHandler } from "../../../common/asyncRequestHandler.ts";
// import { toTestDtoMapper } from "../dto/mapper/toTestDto.mapper.ts";
import { toTestsDtoMapper } from "../dto/mapper/toTestsDto.mapper.ts";
import { getAllTests } from "../query/getAllTests.ts";
// import { getOneTest } from "../query/getOneTest.ts";

export const testController = {
	getAllTests: asyncHandler(async (_req, res) => {
		const result = await getAllTests();
		res.status(200).json(toTestsDtoMapper(result));
	}),
	// getOneTest: asyncHandler(async (_req, res) => {
	// 	const result = await getOneTest();
	// 	if (!result) {
	// 		res.status(500).json({
	// 			code: 500,
	// 			message: "Fail",
	// 		});
	// 	} else {
	// 		res.status(200).json(toTestDtoMapper(result));
	// 	}
	// }),
	getOneTest: asyncHandler(async (req, res) => {
		console.log({
			url: req.url,
			method: req.method,
			token: req.headers.authorization,
			params: req.params,
			query: req.query,
			body: req.body,
		});

		res.status(200).json(["Jean-Pierre", "Michel"]);
	}),
	testGet: asyncHandler(async (_req, res) => {
		res.status(200).json({ answer: "Success ? Genre vraiment" });
	}),
};
