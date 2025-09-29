import type { Response } from "express";

// eslint-disable-next-line import/no-unused-modules
export function sendTyped<
	R extends Record<number, unknown>,
	K extends Extract<keyof R, number>,
>(res: Response<unknown>, status: K, body: R[K]) {
	return res.status(status).json(body);
}
