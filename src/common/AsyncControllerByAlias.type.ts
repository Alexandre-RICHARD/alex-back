import type { ZodiosEndpointDefinitions } from "@zodios/core";
import type { Method } from "@zodios/core/lib/zodios.types";
import { type ZodiosRequestHandler } from "@zodios/express";
import type { ZodObject } from "zod";

export type AsyncControllerByAlias<
	Api extends ZodiosEndpointDefinitions,
	M extends Method,
	P extends string,
	// TODO S'arranger pour ne plus avoir d'any
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Context extends ZodObject = ZodObject<any>,
> = (
	...args: Parameters<ZodiosRequestHandler<Api, Context, M, P>>
) => Promise<unknown>;
