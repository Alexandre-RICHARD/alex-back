import type { TestDto } from "@specs/project/test/dto/test.dto.ts";

import type { Test } from "../models/Test.ts";

export function toTestDtoMapper(entity: Test): TestDto {
	return {
		id: entity.id,
		name: entity.name,
		isActive: entity.isActive,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
	};
}
