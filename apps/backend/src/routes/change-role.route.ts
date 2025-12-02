import { Router } from "express";
import { changeRoleController } from "../controller/change-role.controller";

const router: Router = Router();

router.post("/change-role", changeRoleController);

export default router;
