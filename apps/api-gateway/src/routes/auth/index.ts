import { Router } from "express";
import changeRole from "./change-role.route";
import banUser from "./ban-user.route";
import deleteUser from "./delete-use.route";
import CreateStore from './store.route'
const router: Router = Router();

router.use("/auth", changeRole);
router.use("/auth", banUser);
router.use("/auth", deleteUser);
router.use("/dashboard", CreateStore);

export default router;
