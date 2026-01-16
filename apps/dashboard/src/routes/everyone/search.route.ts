import { Router } from "express";
import { searchController } from "../../controllers/everyone/search.controller";


const router: Router = Router();

router.get("/search", searchController);

export default router;
