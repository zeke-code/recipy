import { Router } from "express";
import * as postController from '../controllers/post-controller';
import upload from '../utils/multerConfig';

const router: Router = Router()

router.get('/api/post', postController.allPosts)
router.post('/api/post/createpost', upload.single('img_post'), postController.createPost)

export default router
