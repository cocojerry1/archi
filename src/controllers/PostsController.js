import { postsService } from '../services/PostsService.js';


class PostsController {
    async createPost(req, res, next) {
        try {
            const { userId } = req.user;
            const { title, content } = req.body;
            const post = await postsService.createPost(userId, title, content);
            res.status(201).json({ data: post });
        } catch (error) {
            next(error);
        }
    }

    async getPosts(req, res, next) {
        try {
            const { orderKey, orderValue } = req.query;
            const posts = await postsService.getPosts(orderKey, orderValue);
            res.status(200).json({ data: posts });
        } catch (error) {
            next(error);
        }
    }

    async getPostById(req, res, next) {
        try {
            const { postId } = req.params;
            const post = await postsService.getPostById(postId);
            res.status(200).json({ data: post });
        } catch (error) {
            next(error);
        }
    }

    async updatePost(req, res, next) {
        try {
            const { postId } = req.params;
            const data = req.body;
            const updatedPost = await postsService.updatePost(postId, data);
            res.status(200).json({ message: "게시물이 수정되었습니다.", data: updatedPost });
        } catch (error) {
            next(error);
        }
    }

    async deletePost(req, res, next) {
        try {
            const { postId } = req.params;
            await postsService.deletePost(postId);
            res.status(200).json({ message: "게시물이 삭제되었습니다." });
        } catch (error) {
            next(error);
        }
    }
}

export const postsController = new PostsController();
