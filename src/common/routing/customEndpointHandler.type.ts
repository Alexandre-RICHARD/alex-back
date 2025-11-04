import type { EndpointModel } from "@specs/specUtils/endpointModel.type.ts";
import type { RequestHandler } from "express";

import type { ResponseMap } from "./responseMap.type.ts";

export type CustomEndpointHandler<Endpoint extends EndpointModel> =
	RequestHandler<
		Endpoint["request"]["pathParams"],
		ResponseMap<Endpoint>,
		Endpoint["request"]["body"],
		Endpoint["request"]["queryParams"]
	>;
