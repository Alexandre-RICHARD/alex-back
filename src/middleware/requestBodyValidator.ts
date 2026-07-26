import { HttpStatutCodeErrorEnum } from "@specs/specUtils/httpStatutCodeError.enum.ts";
import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

export function requestBodyValidator<T>(schema: ZodType<T>) {
	return (request: Request, response: Response, next: NextFunction) => {
		const result = schema.safeParse(request.body);

		if (!result.success) {
			response.status(HttpStatutCodeErrorEnum.BAD_REQUEST).json({
				message: "Validation du body échouée",
				issues: result.error.issues,
			});

			return;
		}

		request.body = result.data;
		next();
	};
}
