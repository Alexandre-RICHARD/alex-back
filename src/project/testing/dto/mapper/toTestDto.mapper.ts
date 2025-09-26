import type { Test } from "../../models/testTable/models.ts";
import type { TestDto } from "../type/TestDto.type.ts";

export function toTestDtoMapper(entity: Test): TestDto {
	return {
		id: entity.id,
		name: entity.name,
		isActive: entity.isActive,
	};
}
