import { Router } from "express";
import * as postController from '../controllers/post-controller';

const router: Router = Router();

router.get('/api/profile', postController.getPostsFromLoggedUser)
router.get('/api/profile/favorites', postController.getFavoritePostsByUser)

export default router
