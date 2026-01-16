import { Router } from "express";
import { searchSuggestionsController } from "../../controllers/everyone/search-suggestion.controller";

const router: Router = Router();

router.get("/search-suggestion", searchSuggestionsController);

export default router;
