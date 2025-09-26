import type { testSpecs } from "@specs/testing/specs/test.specs.ts";
import type { ZodiosResponseByAlias } from "@zodios/core";

export type TestDto = ZodiosResponseByAlias<typeof testSpecs, "getTest">;
