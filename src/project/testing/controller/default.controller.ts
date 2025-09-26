import type { testSpecs } from "@specs/testing/specs/test.specs.ts";

import type { AsyncControllerByAlias } from "../../../common/AsyncControllerByAlias.type.ts";
import { toTestDtoMapper } from "../dto/mapper/toTestDto.mapper.ts";
import { toTestsDtoMapper } from "../dto/mapper/toTestsDto.mapper.ts";
import { getAllTests } from "../query/getAllTests.ts";
import { getOneTest } from "../query/getOneTest.ts";

type ControllerCustom = {
	getAllTests: AsyncControllerByAlias<typeof testSpecs, "get", "/test/all">;
	getOneTest: AsyncControllerByAlias<typeof testSpecs, "get", "/test/one">;
};

export const testController = {
	getAllTests: async (_req, res) => {
		const result = await getAllTests();
		res.status(200).json(toTestsDtoMapper(result));
	},
	getOneTest: async (_req, res) => {
		const result = await getOneTest();
		if (!result) {
			res.status(500).json({
				code: 500,
				message: "Fail",
			});
		} else {
			res.status(200).json(toTestDtoMapper(result));
		}
	},
} as ControllerCustom;
