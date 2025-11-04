import { HttpStatutCodeErrorEnum } from "@specs/specUtils/httpStatutCodeError.enum.ts";
import type { Request, Response } from "express";

export function notFound(req: Request, res: Response): void {
	res.status(HttpStatutCodeErrorEnum.NOT_FOUND).json({
		error: `Cette route (${req.method} - ${req.originalUrl}) n'est pas gérée par le serveur.`,
	});
}
