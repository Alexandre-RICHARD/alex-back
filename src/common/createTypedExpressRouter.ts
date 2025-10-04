import { HttpMethodEnum } from "@specs/specUtils/httpMethod.enum.ts";
import type { RequestHandler, Router as ExpressRouter } from "express";

type ValuesByMethod<
	TUnion extends { request: { url: string; method: HttpMethodEnum } },
	K extends HttpMethodEnum,
> = Extract<TUnion, { request: { method: K } }>["request"]["url"];

type TypedRouterShape<
	TUnion extends { request: { url: string; method: HttpMethodEnum } },
> = {
	[K in HttpMethodEnum]: (
		path: ValuesByMethod<TUnion, K>,
		handler: RequestHandler,
	) => void;
};

export function createTypedExpressRouter<
	TUnion extends { request: { url: string; method: HttpMethodEnum } },
>(expressRouter: ExpressRouter): TypedRouterShape<TUnion> {
	const register = (
		method: HttpMethodEnum,
		path: string,
		handler: RequestHandler,
	) => {
		const controllerHandler: RequestHandler = (req, res, next) => {
			return handler(req, res, next);
		};

		switch (method) {
			case HttpMethodEnum.GET:
				expressRouter.get(path, controllerHandler);
				break;
			case HttpMethodEnum.POST:
				expressRouter.post(path, controllerHandler);
				break;
			case HttpMethodEnum.PUT:
				expressRouter.put(path, controllerHandler);
				break;
			case HttpMethodEnum.PATCH:
				expressRouter.patch(path, controllerHandler);
				break;
			case HttpMethodEnum.DELETE:
				expressRouter.delete(path, controllerHandler);
				break;
			default:
				throw new Error(
					`Méthode non supportée: ${method as unknown as string}`,
				);
		}
	};

	return {
		GET(path: string, handler: RequestHandler) {
			register(HttpMethodEnum.GET, path, handler);
		},
		POST(path: string, handler: RequestHandler) {
			register(HttpMethodEnum.POST, path, handler);
		},
		PUT(path: string, handler: RequestHandler) {
			register(HttpMethodEnum.PUT, path, handler);
		},
		PATCH(path: string, handler: RequestHandler) {
			register(HttpMethodEnum.PATCH, path, handler);
		},
		DELETE(path: string, handler: RequestHandler) {
			register(HttpMethodEnum.DELETE, path, handler);
		},
	};
}
