import { StorageService } from "./storageService";
import { AuthService } from "./authService";
import { UserService } from "./userService";
import { PostService } from './postService';
import { CommentService } from "./commentService";

export const storageService = new StorageService();
export const authService = new AuthService();
export const userService = new UserService();
export const postService = new PostService();
export const commentService = new CommentService();