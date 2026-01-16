import { Router } from "express";
import Category from './category.route'
import GetStores from './near-by-store.route'
import StoreProducts from './store-products.route'
import StoreDetail from './store-detail.route'
import Variants from './variants.route'
import Search from './search.route'
import SearchSuggestion from './search-suggestion.route'
const router: Router = Router();

router.use(Category);
router.use(GetStores)
router.use(StoreProducts)
router.use(StoreDetail)
router.use(Variants)
router.use(Search)
router.use(SearchSuggestion)

export default router;
