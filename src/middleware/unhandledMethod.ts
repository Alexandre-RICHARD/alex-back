import { HttpStatutCodeErrorEnum } from "@specs/specUtils/httpStatutCodeError.enum.ts";
import type { NextFunction, Request, Response } from "express";

export function unhandledMethod(
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	if (["HEAD", "OPTIONS", "TRACE", "CONNECT"].includes(req.method)) {
		res.status(HttpStatutCodeErrorEnum.METHOD_NOT_ALLOWED).json({
			error: `Cette méthode (${req.method}) n'est pas gérée par le serveur.`,
		});
	}

	next();
}
