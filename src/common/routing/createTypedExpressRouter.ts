import type { EndpointModel } from "@specs/specUtils/endpointModel.type.ts";
import { HttpMethodEnum } from "@specs/specUtils/httpMethod.enum.ts";
import type { RequestHandler, Router as ExpressRouter } from "express";

import type { CustomEndpointHandler } from "./customEndpointHandler.type.ts";

type EndpointUrlByMethod<
	EndpointRegistry extends EndpointModel,
	Http extends HttpMethodEnum,
> = Extract<EndpointRegistry, { request: { method: Http } }>["request"]["url"];

type TypedRouterShape<Registry extends EndpointModel> = {
	[Method in HttpMethodEnum]: <
		Url extends EndpointUrlByMethod<Registry, Method>,
	>(
		path: Url,
		handler: CustomEndpointHandler<
			EndpointByMethodAndUrl<Registry, Method, Url>
		>,
	) => void;
};

type EndpointByMethodAndUrl<
	Registry extends EndpointModel,
	Method extends HttpMethodEnum,
	Url extends EndpointUrlByMethod<Registry, Method>,
> = Extract<Registry, { request: { method: Method; url: Url } }>;

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
		GET<Url extends EndpointUrlByMethod<EndpointRegistry, HttpMethodEnum.GET>>(
			path: Url,
			handler: CustomEndpointHandler<
				EndpointByMethodAndUrl<EndpointRegistry, HttpMethodEnum.GET, Url>
			>,
		) {
			register(HttpMethodEnum.GET, path, handler);
		},
		POST<
			Url extends EndpointUrlByMethod<EndpointRegistry, HttpMethodEnum.POST>,
		>(
			path: Url,
			handler: CustomEndpointHandler<
				EndpointByMethodAndUrl<EndpointRegistry, HttpMethodEnum.POST, Url>
			>,
		) {
			register(HttpMethodEnum.POST, path, handler);
		},
		PUT<Url extends EndpointUrlByMethod<EndpointRegistry, HttpMethodEnum.PUT>>(
			path: Url,
			handler: CustomEndpointHandler<
				EndpointByMethodAndUrl<EndpointRegistry, HttpMethodEnum.PUT, Url>
			>,
		) {
			register(HttpMethodEnum.PUT, path, handler);
		},
		PATCH<
			Url extends EndpointUrlByMethod<EndpointRegistry, HttpMethodEnum.PATCH>,
		>(
			path: Url,
			handler: CustomEndpointHandler<
				EndpointByMethodAndUrl<EndpointRegistry, HttpMethodEnum.PATCH, Url>
			>,
		) {
			register(HttpMethodEnum.PATCH, path, handler);
		},
		DELETE<
			Url extends EndpointUrlByMethod<EndpointRegistry, HttpMethodEnum.DELETE>,
		>(
			path: Url,
			handler: CustomEndpointHandler<
				EndpointByMethodAndUrl<EndpointRegistry, HttpMethodEnum.DELETE, Url>
			>,
		) {
			register(HttpMethodEnum.DELETE, path, handler);
		},
	};
}
