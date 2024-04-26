import { Router } from "express";
import { addPost, deletePost, editPost, getAllPost, getOnePost } from "../controllers/postController";

const router = Router();

router.get('/', getAllPost);
router.get('/:id', getOnePost);
router.post('/', addPost);
router.put('/:id', editPost);
router.delete('/:id', deletePost);

export default router;