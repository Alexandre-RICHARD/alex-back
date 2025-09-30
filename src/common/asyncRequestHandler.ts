import type { NextFunction, Request, RequestHandler, Response } from "express";

export function asyncHandler<
	ReqParams = Record<string, string>,
	ResBody = unknown,
	ReqBody = unknown,
	ReqQuery = Record<string, string>,
>(
	fn: (
		req: Request<ReqParams, ResBody, ReqBody, ReqQuery>,
		res: Response<ResBody>,
		next: NextFunction,
	) => Promise<unknown>,
): RequestHandler<ReqParams, ResBody, ReqBody, ReqQuery> {
	return (req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
}
