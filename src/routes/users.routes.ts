import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { upload } from "../config/multer";

export class UsersRoutes {

    private router: Router;
    private usersController: UsersController;

    constructor() {
        this.router = Router();
        this.usersController = new UsersController();
    }
    //busca todas as rotas
    getRoutes() {
        this.router.post(
            '/',
            this.usersController.store.bind(this.usersController)
        );
        this.router.put(
            '/', upload.single('avatar_url'),
            this.usersController.update.bind(this.usersController)
        );
        return this.router;
    }
}