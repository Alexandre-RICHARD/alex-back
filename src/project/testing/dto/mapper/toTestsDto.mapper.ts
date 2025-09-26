import type { Test } from "../../models/testTable/models.ts";
import type { TestsDto } from "../type/TestsDto.type.ts";
import { toTestDtoMapper } from "./toTestDto.mapper.ts";

export function toTestsDtoMapper(entities: Test[]): TestsDto {
	return entities.map(toTestDtoMapper);
}
