import { createErrorLog } from "../project/errorLog/query/createErrorLog.ts";
import { ErrorTypeEnum } from "./errorType.enum.ts";

export async function handleBaseError(error: unknown): Promise<void> {
	const errorMessage = error instanceof Error ? error.message : String(error);
	const errorStack = error instanceof Error ? error.stack : undefined;

	await createErrorLog({
		errorType: ErrorTypeEnum.DATABASE_ERROR, // TODO A Probablement de la grosse merde
		message: errorMessage,
		stack: errorStack ?? "",
	});
}
