import { Router } from "express";
import Category from './category.route'
const router: Router = Router();

router.use(Category);

export default router;
