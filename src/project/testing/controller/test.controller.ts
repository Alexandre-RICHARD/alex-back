import type { CreateTest } from "@specs/project/test/endpoint/createTest.endpoint.ts";
import type { DeleteTest } from "@specs/project/test/endpoint/deleteTest.endpoint.ts";
import type { GetAllTest } from "@specs/project/test/endpoint/getAllTest.endpoint.ts";
import type { GetOneTest } from "@specs/project/test/endpoint/getOneTest.endpoint.ts";
import type { UpdateTest } from "@specs/project/test/endpoint/updateTest.endpoint.ts";
import { HttpStatutCodeErrorEnum } from "@specs/specUtils/httpStatutCodeError.enum.ts";
import { HttpStatutCodeSuccessEnum } from "@specs/specUtils/httpStatutCodeSuccess.enum.ts";

import { assertBoolean } from "../../../common/asserts/assertBoolean.ts";
import { assertNumber } from "../../../common/asserts/assertNumber.ts";
import { assertString } from "../../../common/asserts/assertString.ts";
import { asyncRequestHandler } from "../../../common/routing/asyncRequestHandler.ts";
import { toTestDtoMapper } from "../dto/toTestDto.mapper.ts";
import { toTestsDtoMapper } from "../dto/toTestsDto.mapper.ts";
import { createTest } from "../query/createTest.ts";
import { deleteTest } from "../query/deleteTest.ts";
import { getAllTests } from "../query/getAllTests.ts";
import { getOneTest } from "../query/getOneTest.ts";
import { updateTest } from "../query/updateTest.ts";

export const testController = {
	getOne: asyncRequestHandler<GetOneTest>(async (request, response) => {
		const { id } = request.params;
		const parsedId = Number(id);
		assertNumber(parsedId, "testController::getOne> id");

		const result = await getOneTest({ id: parsedId });

		if (!result) {
			return response.status(HttpStatutCodeErrorEnum.NOT_FOUND).json(null);
		}

		return response
			.status(HttpStatutCodeSuccessEnum.SUCCESS)
			.json(toTestDtoMapper(result));
	}),

	getAll: asyncRequestHandler<GetAllTest>(async (_r, response) => {
		const result = await getAllTests();

		if (!result) {
			return response.status(HttpStatutCodeSuccessEnum.NO_CONTENT).json([]);
		}

		return response
			.status(HttpStatutCodeSuccessEnum.SUCCESS)
			.json(toTestsDtoMapper(result));
	}),

	create: asyncRequestHandler<CreateTest>(async (request, response) => {
		const { name } = request.body;
		assertString(name, "testController::create> name");

		const result = await createTest({ name });

		if (!result) {
			return response.status(HttpStatutCodeErrorEnum.BAD_REQUEST).json(null);
		}

		return response
			.status(HttpStatutCodeSuccessEnum.CREATED)
			.json(toTestDtoMapper(result));
	}),

	update: asyncRequestHandler<UpdateTest>(async (request, response) => {
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
			return response.status(HttpStatutCodeErrorEnum.NOT_FOUND).json(null);
		}

		return response
			.status(HttpStatutCodeSuccessEnum.SUCCESS)
			.json(toTestDtoMapper(result));
	}),

	delete: asyncRequestHandler<DeleteTest>(async (request, response) => {
		const { id } = request.params;
		const parsedId = Number(id);
		assertNumber(parsedId, "testController::getOne> id");

		await deleteTest({ id: parsedId });
		return response.status(HttpStatutCodeSuccessEnum.SUCCESS).json(null);
	}),
};
