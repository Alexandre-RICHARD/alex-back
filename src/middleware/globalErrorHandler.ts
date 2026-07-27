import { HttpStatutCodeErrorEnum } from "@specs/specUtils/httpStatutCodeError.enum.ts";
import type { ErrorRequestHandler } from "express";

export const globalErrorHandler: ErrorRequestHandler = (_e, _r, response) => {
	response
		.status(HttpStatutCodeErrorEnum.SERVER_ERROR)
		.json({ message: "Erreur interne du serveur" });
};
