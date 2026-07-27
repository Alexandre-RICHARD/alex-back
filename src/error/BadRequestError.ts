import { HttpStatutCodeErrorEnum } from "@specs/specUtils/httpStatutCodeError.enum.ts";

import { AppError } from "./AppError.ts";

export class BadRequestError extends AppError {
	readonly statusCode = HttpStatutCodeErrorEnum.BAD_REQUEST;

	public readonly details: unknown;

	constructor(message: string, details?: unknown) {
		super(message);
		this.details = details;
	}
}
