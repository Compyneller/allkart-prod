import { Router } from "express";
import changeRole from "./change-role.route";
import banUser from "./ban-user.route";
import deleteUser from "./delete-use.route";
const router: Router = Router();

router.use("/auth", changeRole);
router.use("/auth", banUser);
router.use("/auth", deleteUser);

export default router;
