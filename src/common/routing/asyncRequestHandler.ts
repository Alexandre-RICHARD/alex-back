import type { EndpointModel } from "@specs/specUtils/endpointModel.type.ts";
import type { NextFunction, Request, RequestHandler, Response } from "express";

export function asyncHandler<Endpoint extends EndpointModel>(
	fn: (
		req: Request<
			Endpoint["request"]["pathParams"],
			Endpoint["response"],
			Endpoint["request"]["body"],
			Endpoint["request"]["queryParams"]
		>,
		res: Response<Endpoint["response"]>,
		next: NextFunction,
	) => Promise<unknown>,
): RequestHandler<
	Endpoint["request"]["pathParams"],
	Endpoint["response"],
	Endpoint["request"]["body"],
	Endpoint["request"]["queryParams"]
> {
	return (req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
}
