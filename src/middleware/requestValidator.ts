import { HttpStatutCodeErrorEnum } from "@specs/specUtils/httpStatutCodeError.enum.ts";
import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";

import { BadRequestError } from "../error/BadRequestError.ts";

type RequestSchemas = {
	params?: ZodType;
	query?: ZodType;
	body?: ZodType;
};

export function requestValidator(schemas: RequestSchemas) {
	return (request: Request, response: Response, next: NextFunction) => {
		const combinedError = new ZodError([]);

		if (schemas.params) {
			const result = schemas.params.safeParse(request.params);
			if (result.success) {
				request.params = result.data as Record<string, string>;
			} else {
				combinedError.issues.push(...result.error.issues);
			}
		}

		if (schemas.query) {
			const result = schemas.query.safeParse(request.query);
			if (result.success) {
				Object.keys(request.query).forEach((key) => {
					delete (request.query as Record<string, unknown>)[key];
				});

				Object.assign(request.query, result.data);
			} else {
				combinedError.issues.push(...result.error.issues);
			}
		}

		if (schemas.body) {
			const result = schemas.body.safeParse(request.body);
			if (result.success) {
				request.body = result.data;
			} else {
				combinedError.issues.push(...result.error.issues);
			}
		}

		if (combinedError.issues.length > 0) {
			response.status(HttpStatutCodeErrorEnum.BAD_REQUEST).json({
				message: "Parsing of request failed",
				issues: combinedError.issues,
			});

			throw new BadRequestError("Parsing of request failed", combinedError);
		}

		next();
	};
}
