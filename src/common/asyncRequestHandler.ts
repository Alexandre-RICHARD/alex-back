import type { RequestHandler } from "express";

export const asyncRequestHandler =
	<P, ResBody, ReqBody, ReqQuery, Locals extends Record<string, unknown>>(
		fn: RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>,
	): RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> =>
	(req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
