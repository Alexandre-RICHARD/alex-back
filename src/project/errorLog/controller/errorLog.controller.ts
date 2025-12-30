import type { CreateErrorLog } from "@specs/project/errorLog/endpoint/createError.endpoint.ts";
import { HttpStatutCodeErrorEnum } from "@specs/specUtils/httpStatutCodeError.enum.ts";
import { HttpStatutCodeSuccessEnum } from "@specs/specUtils/httpStatutCodeSuccess.enum.ts";

import { assertString } from "../../../common/asserts/assertString.ts";
import { asyncRequestHandler } from "../../../common/routing/asyncRequestHandler.ts";
import { createErrorLog } from "../query/createErrorLog.ts";

export const errorLogController = {
	create: asyncRequestHandler<CreateErrorLog>(async (request, response) => {
		const { errorType, message, stack } = request.body;
		assertString(errorType, "errorController::create> errorType");
		assertString(message, "errorController::create> message");
		assertString(stack, "errorController::create> stack");

		const result = await createErrorLog({ errorType, message, stack });

		if (!result) {
			return response.status(HttpStatutCodeErrorEnum.BAD_REQUEST).json(null);
		}

		return response.status(HttpStatutCodeSuccessEnum.CREATED).json(null);
	}),
};
