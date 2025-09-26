import type {
	TestBody,
	TestDto,
} from "@specss/testEndpoint/testApi.endpoint.ts";
import type { Request } from "express";

export const testController = {
	createWidget: async ({
		req,
		params,
	}: {
		req: Request;
		params: { path: { wid: string }; body: TestBody };
	}) => {
		console.log(req);
		console.log(params);

		const dto: TestDto = {
			id: wid,
			label,
		};

		return { status: 201, body: dto };
	},
};
