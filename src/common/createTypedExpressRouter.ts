import type { EndpointModel } from "@specs/specUtils/endpointModel.type.ts";
import { HttpMethodEnum } from "@specs/specUtils/httpMethod.enum.ts";
import type { RequestHandler, Router as ExpressRouter } from "express";

type EndpointUrlByMethod<
	EndpointRegistry extends EndpointModel,
	Http extends HttpMethodEnum,
> = Extract<EndpointRegistry, { request: { method: Http } }>["request"]["url"];

type TypedRouterShape<Registry extends EndpointModel> = {
	[M in HttpMethodEnum]: <U extends EndpointUrlByMethod<Registry, M>>(
		path: U,
		handler: HandlerFor<EndpointByMethodAndUrl<Registry, M, U>>,
	) => void;
};

type EndpointByMethodAndUrl<
	Registry extends EndpointModel,
	M extends HttpMethodEnum,
	U extends EndpointUrlByMethod<Registry, M>,
> = Extract<Registry, { request: { method: M; url: U } }>;

type HandlerFor<E extends EndpointModel> = RequestHandler<
	E["request"]["pathParams"],
	E["response"],
	E["request"]["body"],
	E["request"]["queryParams"]
>;

export function createTypedExpressRouter<
	EndpointRegistry extends EndpointModel,
>(expressRouter: ExpressRouter): TypedRouterShape<EndpointRegistry> {
	const register = (method: HttpMethodEnum, path: string, handler: unknown) => {
		switch (method) {
			case HttpMethodEnum.GET:
				expressRouter.get(path, handler as RequestHandler);
				break;
			case HttpMethodEnum.POST:
				expressRouter.post(path, handler as RequestHandler);
				break;
			case HttpMethodEnum.PUT:
				expressRouter.put(path, handler as RequestHandler);
				break;
			case HttpMethodEnum.PATCH:
				expressRouter.patch(path, handler as RequestHandler);
				break;
			case HttpMethodEnum.DELETE:
				expressRouter.delete(path, handler as RequestHandler);
				break;
			default:
				throw new Error(
					`Méthode non supportée: ${method as unknown as string}`,
				);
		}
	};

	return {
		GET<U extends EndpointUrlByMethod<EndpointRegistry, HttpMethodEnum.GET>>(
			path: U,
			handler: HandlerFor<
				EndpointByMethodAndUrl<EndpointRegistry, HttpMethodEnum.GET, U>
			>,
		) {
			register(HttpMethodEnum.GET, path, handler);
		},
		POST<U extends EndpointUrlByMethod<EndpointRegistry, HttpMethodEnum.POST>>(
			path: U,
			handler: HandlerFor<
				EndpointByMethodAndUrl<EndpointRegistry, HttpMethodEnum.POST, U>
			>,
		) {
			register(HttpMethodEnum.POST, path, handler);
		},
		PUT<U extends EndpointUrlByMethod<EndpointRegistry, HttpMethodEnum.PUT>>(
			path: U,
			handler: HandlerFor<
				EndpointByMethodAndUrl<EndpointRegistry, HttpMethodEnum.PUT, U>
			>,
		) {
			register(HttpMethodEnum.PUT, path, handler);
		},
		PATCH<
			U extends EndpointUrlByMethod<EndpointRegistry, HttpMethodEnum.PATCH>,
		>(
			path: U,
			handler: HandlerFor<
				EndpointByMethodAndUrl<EndpointRegistry, HttpMethodEnum.PATCH, U>
			>,
		) {
			register(HttpMethodEnum.PATCH, path, handler);
		},
		DELETE<
			U extends EndpointUrlByMethod<EndpointRegistry, HttpMethodEnum.DELETE>,
		>(
			path: U,
			handler: HandlerFor<
				EndpointByMethodAndUrl<EndpointRegistry, HttpMethodEnum.DELETE, U>
			>,
		) {
			register(HttpMethodEnum.DELETE, path, handler);
		},
	};
}
