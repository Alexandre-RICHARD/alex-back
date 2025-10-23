import { HttpStatutCodeEnum } from "@specs/specUtils/httpStatutCode.enum.ts";
import type { Request, Response } from "express";

export function notFound(req: Request, res: Response): void {
	res.status(HttpStatutCodeEnum.NOT_FOUND).json({
		error: `Cette route (${req.method} - ${req.originalUrl}) n'est pas gérée par le serveur.`,
	});
}
