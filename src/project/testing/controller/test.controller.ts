import type { CreateTest } from "@specs/project/test/endpoint/createTest.endpoint.ts";
import type { DeleteTest } from "@specs/project/test/endpoint/deleteTest.endpoint.ts";
import type { GetAllTest } from "@specs/project/test/endpoint/getAllTest.endpoint.ts";
import type { GetOneTest } from "@specs/project/test/endpoint/getOneTest.endpoint.ts";
import type { UpdateTest } from "@specs/project/test/endpoint/updateTest.endpoint.ts";

import { assertBoolean } from "../../../common/asserts/assertBoolean.ts";
import { assertNumber } from "../../../common/asserts/assertNumber.ts";
import { assertString } from "../../../common/asserts/assertString.ts";
import { asyncHandler } from "../../../common/routing/asyncRequestHandler.ts";
import { toTestDtoMapper } from "../dto/toTestDto.mapper.ts";
import { toTestsDtoMapper } from "../dto/toTestsDto.mapper.ts";
import { createTest } from "../query/createTest.ts";
import { deleteTest } from "../query/deleteTest.ts";
import { getAllTests } from "../query/getAllTests.ts";
import { getOneTest } from "../query/getOneTest.ts";
import { updateTest } from "../query/updateTest.ts";

export const testController = {
	getOne: asyncHandler<GetOneTest>(async (request, response) => {
		const { id } = request.params;
		const parsedId = Number(id);
		assertNumber(parsedId, "testController::getOne> id");

		const result = await getOneTest({ id: parsedId });

		if (!result) {
			response.status(404).json("Pas trouvé");
			return;
		}

		response.status(200).json(toTestDtoMapper(result));
	}),

	getAll: asyncHandler<GetAllTest>(async (_r, response) => {
		const result = await getAllTests();

		if (!result) {
			response.status(404).json("Pas trouvé");
			return;
		}

		response.status(200).json(toTestsDtoMapper(result));
	}),

	create: asyncHandler<CreateTest>(async (request, response) => {
		const { name } = request.body;
		assertString(name, "testController::create> name");

		const result = await createTest({ name });

		if (!result) {
			response.status(404).json("Pas trouvé");
			return;
		}

		response.status(200).json(toTestDtoMapper(result));
	}),

	update: asyncHandler<UpdateTest>(async (request, response) => {
		const { id } = request.params;
		const parsedId = Number(id);
		const { name, isActive } = request.body;
		assertString(name, "testController::getOne> name");
		assertNumber(parsedId, "testController::getOne> id");
		assertBoolean(isActive, "testController::getOne> isActive");

		const result = await updateTest({
			id: parsedId,
			name,
			isActive,
		});

		if (!result) {
			response.status(404).json("Pas trouvé");
			return;
		}

		response.status(200).json(toTestDtoMapper(result));
	}),

	delete: asyncHandler<DeleteTest>(async (request, response) => {
		const { id } = request.params;
		const parsedId = Number(id);
		assertNumber(parsedId, "testController::getOne> id");

		await deleteTest({ id: parsedId });

		response.status(200).json(null);
	}),
};
