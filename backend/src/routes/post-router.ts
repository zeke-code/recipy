import { Router } from "express";
import * as postController from '../controllers/post-controller';
import upload from '../utils/multerConfig';

const router: Router = Router()

router.get('/api/post/allPosts', postController.allPosts)
router.get('/api/post/:id/details', postController.getPostById)
router.post('/api/post/createpost', upload.single('img_post'), postController.createPost)
router.post('/api/post/:id/like', postController.likePost)
router.post('/api/post/:id/favorite', postController.favoritePost)

export default router
