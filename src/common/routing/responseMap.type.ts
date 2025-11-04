import type { EndpointModel } from "@specs/specUtils/endpointModel.type.ts";

export type ResponseMap<Endpoint extends EndpointModel> =
	(Endpoint["error"] extends Record<number, unknown>
		? Endpoint["error"]
		: object) &
		Record<
			Endpoint["response"]["status"] & number,
			Endpoint["response"]["data"]
		>;
