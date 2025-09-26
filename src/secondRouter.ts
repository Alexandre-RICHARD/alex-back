import { testApi } from "@specss/createSpecs.ts";
import { Router } from "express";

import { mountExpress } from "./common/specHandler/mountExpress.ts";
import { testController } from "./testController.ts";

const testRouter = Router();

mountExpress(testRouter, testApi, testController);

export { testRouter };
