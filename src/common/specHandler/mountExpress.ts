/* eslint-disable import/no-unused-modules */
import type { HttpMethodEnum } from "@specss/utils/enum/HttpMethod.enum.ts";
import type { Spec } from "@specss/utils/type/Spec.type.ts";
import type { RequestHandler, Router } from "express";

type MethodLower = Lowercase<HttpMethodEnum>;

function addRoute(
	router: Router,
	method: MethodLower,
	path: string,
	h: RequestHandler,
) {
	switch (method) {
		case "get":
			router.get(path, h);
			break;
		case "post":
			router.post(path, h);
			break;
		case "put":
			router.put(path, h);
			break;
		case "patch":
			router.patch(path, h);
			break;
		case "delete":
			router.delete(path, h);
			break;
		default:
			throw new Error(`Unsupported method`);
	}
}

export function mountExpress(
	router: Router,
	spec: Spec,
	handlers: Record<string, RequestHandler>,
) {
	spec.endpoints.forEach((e) => {
		const key = e.alias ?? `${e.method} ${e.path}`;
		const h = handlers[key];
		if (!h) throw new Error(`Missing handler for ${key}`);
		const m = e.method.toLowerCase() as MethodLower;
		addRoute(router, m, e.path, h);
	});
}
