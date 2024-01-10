import { Router } from "express";
import * as postController from '../controllers/post-controller';

const router: Router = Router()

router.get('/api/post', postController.allPosts)

export default router