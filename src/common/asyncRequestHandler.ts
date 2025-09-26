import type { NextFunction } from "express";

export const asyncRequestHandler =
	<Args extends unknown[]>(
		fn: (...args: [...Args, NextFunction]) => Promise<unknown>,
	) =>
	(...args: [...Args, NextFunction]) => {
		Promise.resolve(fn(...args)).catch(args[args.length - 1] as NextFunction);
	};
