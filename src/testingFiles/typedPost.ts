import type { RequestHandler, Router } from "express";

import { asyncRequestHandler } from "../common/asyncRequestHandler.ts";

// Utilitaires de base
type PickOr<T, K extends string, D> = T extends Record<K, unknown> ? T[K] : D;

type ResponsesOf<T> = T extends { responses: infer R }
	? R extends Record<number, unknown>
		? R
		: never
	: never;

// eslint-disable-next-line import/no-unused-modules
export function typedPost<
	Spec extends Record<
		string,
		{
			params?: unknown;
			query?: unknown;
			body?: unknown;
			responses?: Record<number, unknown>;
		}
	>,
	P extends keyof Spec & string,
>(
	router: Router,
	_spec: Spec, // utilisé uniquement pour contraindre P ∈ keyof Spec
	path: P,
	handler: RequestHandler<
		// params
		PickOr<Spec[P], "params", Record<string, never>>,
		// res body (union de toutes les réponses possibles)
		ResponsesOf<Spec[P]>[keyof ResponsesOf<Spec[P]>],
		// body
		PickOr<Spec[P], "body", unknown>,
		// query
		PickOr<Spec[P], "query", unknown>
	>,
) {
	router.post(path, asyncRequestHandler(handler));
}
