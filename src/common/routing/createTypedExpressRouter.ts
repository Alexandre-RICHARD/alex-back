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
		validator?: RequestHandler,
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
	const register = (
		method: HttpMethodEnum,
		path: string,
		handler: unknown,
		validator?: RequestHandler,
	) => {
		const handlers = validator
			? [validator, handler as RequestHandler]
			: [handler as RequestHandler];

		switch (method) {
			case HttpMethodEnum.GET:
				expressRouter.get(path, ...handlers);
				break;
			case HttpMethodEnum.POST:
				expressRouter.post(path, ...handlers);
				break;
			case HttpMethodEnum.PUT:
				expressRouter.put(path, ...handlers);
				break;
			case HttpMethodEnum.PATCH:
				expressRouter.patch(path, ...handlers);
				break;
			case HttpMethodEnum.DELETE:
				expressRouter.delete(path, ...handlers);
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
			validator?: RequestHandler,
		) {
			register(HttpMethodEnum.GET, path, handler, validator);
		},
		POST<
			Url extends EndpointUrlByMethod<EndpointRegistry, HttpMethodEnum.POST>,
		>(
			path: Url,
			handler: CustomEndpointHandler<
				EndpointByMethodAndUrl<EndpointRegistry, HttpMethodEnum.POST, Url>
			>,
			validator?: RequestHandler,
		) {
			register(HttpMethodEnum.POST, path, handler, validator);
		},
		PUT<Url extends EndpointUrlByMethod<EndpointRegistry, HttpMethodEnum.PUT>>(
			path: Url,
			handler: CustomEndpointHandler<
				EndpointByMethodAndUrl<EndpointRegistry, HttpMethodEnum.PUT, Url>
			>,
			validator?: RequestHandler,
		) {
			register(HttpMethodEnum.PUT, path, handler, validator);
		},
		PATCH<
			Url extends EndpointUrlByMethod<EndpointRegistry, HttpMethodEnum.PATCH>,
		>(
			path: Url,
			handler: CustomEndpointHandler<
				EndpointByMethodAndUrl<EndpointRegistry, HttpMethodEnum.PATCH, Url>
			>,
			validator?: RequestHandler,
		) {
			register(HttpMethodEnum.PATCH, path, handler, validator);
		},
		DELETE<
			Url extends EndpointUrlByMethod<EndpointRegistry, HttpMethodEnum.DELETE>,
		>(
			path: Url,
			handler: CustomEndpointHandler<
				EndpointByMethodAndUrl<EndpointRegistry, HttpMethodEnum.DELETE, Url>
			>,
			validator?: RequestHandler,
		) {
			register(HttpMethodEnum.DELETE, path, handler, validator);
		},
	};
}
