import type { EndpointModel } from "@specs/specUtils/endpointModel.type.ts";
import type { NextFunction, Response as ExpressResponse } from "express";

import type { CustomEndpointHandler } from "./customEndpointHandler.type.ts";
import type { CustomEndpointRequest } from "./customEndpointRequest.type.ts";
import type { ResponseMap } from "./responseMap.type.ts";

type JsonFor<ResponseBody> = { json: (body: ResponseBody) => ExpressResponse };

type StatusReturn<
	Map extends Record<number, unknown>,
	Status extends keyof Map & number,
> = Omit<ExpressResponse, "json"> & JsonFor<Map[Status]>;

type TypedResponse<Map extends Record<number, unknown>> = Omit<
	ExpressResponse,
	"status" | "json"
> & {
	status<Status extends keyof Map & number>(
		code: Status,
	): StatusReturn<Map, Status>;
};

export function asyncRequestHandler<Endpoint extends EndpointModel>(
	fn: (
		req: CustomEndpointRequest<Endpoint>,
		res: TypedResponse<ResponseMap<Endpoint>>,
		next: NextFunction,
	) => Promise<unknown>,
): CustomEndpointHandler<Endpoint> {
	return (req, res, next) => {
		Promise.resolve(
			fn(req, res as unknown as TypedResponse<ResponseMap<Endpoint>>, next),
		).catch(next);
	};
}
