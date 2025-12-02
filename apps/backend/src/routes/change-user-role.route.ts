import { Router } from "express";
import { changeUserRoleController } from "../controller/change-user-role.controller";

const router: Router = Router();

router.patch("/role", changeUserRoleController);

export default router;
