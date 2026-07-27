import { HttpStatutCodeErrorEnum } from "@specs/specUtils/httpStatutCodeError.enum.ts";

import { AppError } from "./AppError.ts";

export class DatabaseError extends AppError {
	readonly statusCode = HttpStatutCodeErrorEnum.BAD_REQUEST;
}
