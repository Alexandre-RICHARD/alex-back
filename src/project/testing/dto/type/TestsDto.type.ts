import type { testSpecs } from "@specs/testing/specs/test.specs.ts";
import type { ZodiosResponseByAlias } from "@zodios/core";

export type TestsDto = ZodiosResponseByAlias<typeof testSpecs, "getTests">;
