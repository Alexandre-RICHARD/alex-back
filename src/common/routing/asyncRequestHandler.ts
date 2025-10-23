import type { EndpointModel } from "@specs/specUtils/endpointModel.type.ts";
import type { ResponseStatusMap } from "@specs/specUtils/responseStatusMap.type.ts";
import type {
	NextFunction,
	Request,
	RequestHandler,
	Response as ExpressResponse,
} from "express";

type JsonFor<ResponseBody> = { json: (body: ResponseBody) => ExpressResponse };

type StatusReturn<
	EndpointReponse extends ResponseStatusMap,
	Status extends keyof EndpointReponse & number,
> = Omit<ExpressResponse, "json"> & JsonFor<EndpointReponse[Status]>;

type TypedResponse<EndpointReponse extends ResponseStatusMap> = Omit<
	ExpressResponse,
	"status" | "json"
> & {
	status<Status extends keyof EndpointReponse & number>(
		code: Status,
	): StatusReturn<EndpointReponse, Status>;
};

export function asyncRequestHandler<Endpoint extends EndpointModel>(
	fn: (
		req: Request<
			Endpoint["request"]["pathParams"],
			Endpoint["response"],
			Endpoint["request"]["body"],
			Endpoint["request"]["queryParams"]
		>,
		res: TypedResponse<Endpoint["response"]>,
		next: NextFunction,
	) => Promise<unknown>,
): RequestHandler<
	Endpoint["request"]["pathParams"],
	Endpoint["response"],
	Endpoint["request"]["body"],
	Endpoint["request"]["queryParams"]
> {
	return (req, res, next) => {
		Promise.resolve(
			fn(req, res as unknown as TypedResponse<Endpoint["response"]>, next),
		).catch(next);
	};
}
