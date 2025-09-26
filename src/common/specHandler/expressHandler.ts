import type { Endpoint } from "@specss/utils/type/Endpoint.type.ts";
import type { Error } from "@specss/utils/type/Error.type.ts";
import type { Schema } from "@specss/utils/type/Schema.type.ts";
import type { NextFunction, Request, Response } from "express";

type PathOf<E extends Endpoint> = E["params"] extends {
	path: Schema<infer T>;
}
	? T
	: Record<string, never>;

type QueryOf<E extends Endpoint> = E["params"] extends {
	query: Schema<infer T>;
}
	? T
	: Record<string, never>;

type HeadersOf<E extends Endpoint> = E["params"] extends {
	headers: Schema<infer T>;
}
	? T
	: Record<string, never>;

type BodyOf<E extends Endpoint> = E["params"] extends {
	body: Schema<infer T>;
}
	? T
	: unknown;

type MaybeResponse = { status: number; body?: unknown } | void;

export function expressHandler<E extends Endpoint>(
	handler: (ctx: {
		req: Request;
		params: {
			path: PathOf<E>;
			query: QueryOf<E>;
			headers: HeadersOf<E>;
			body: BodyOf<E>;
		};
	}) => Promise<MaybeResponse> | MaybeResponse,
) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	return async (req: Request, res: Response, _next: NextFunction) => {
		try {
			const pathParams = req.params as unknown as PathOf<E>;
			const query = req.query as unknown as QueryOf<E>;
			const headers = req.headers as unknown as HeadersOf<E>;
			const body = req.body as unknown as BodyOf<E>;

			const result = await handler({
				req,
				params: { path: pathParams, query, headers, body },
			});
			if (!result) return res.status(204).end();
			if (result.body === undefined) return res.status(result.status).end();
			return res.status(result.status).json(result.body);
		} catch (err) {
			const isObjectRecord = (x: unknown): x is Record<string, unknown> =>
				typeof x === "object" && x !== null;

			const e = isObjectRecord(err) ? err : {};

			const status = typeof e.status === "number" ? e.status : 500;

			const defaultCodes: Record<number, string> = {
				400: "BAD_REQUEST",
				404: "NOT_FOUND",
				500: "INTERNAL_ERROR",
			};

			const code =
				typeof e.code === "string"
					? e.code
					: (defaultCodes[status] ?? "INTERNAL_ERROR");

			const message =
				typeof e.message === "string" ? e.message : "Unexpected error";

			const details =
				"details" in e ? (e as { details?: unknown }).details : undefined;

			const payload: Error = { code, message, details };
			return res.status(status).json(payload);
		}
	};
}
