import { StorageService } from "./storageService";
import { AuthService } from "./authService";
import { UserService } from "./userService";

export const storageService = new StorageService();
export const authService = new AuthService();
export const userService = new UserService();