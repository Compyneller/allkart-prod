import { Router } from "express";
import {
  deleteUserController,
  getAllUserController,
  updateUserController,
} from "../../controller/admin/users.controller";

const router: Router = Router();

router.get("/users", getAllUserController);
router.patch("/user/:id", updateUserController);
router.delete("/user/:id", deleteUserController);

export default router;
