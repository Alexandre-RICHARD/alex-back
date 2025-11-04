import type { EndpointModel } from "@specs/specUtils/endpointModel.type.ts";
import type { Request } from "express";

import type { ResponseMap } from "./responseMap.type.ts";

export type CustomEndpointRequest<Endpoint extends EndpointModel> = Request<
	Endpoint["request"]["pathParams"],
	ResponseMap<Endpoint>,
	Endpoint["request"]["body"],
	Endpoint["request"]["queryParams"]
>;
