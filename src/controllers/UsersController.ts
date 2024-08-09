import { NextFunction, Request, Response } from "express";
import { UsersServices } from "../service/UsersServices";
// Apenas recebe as requisições da rota
// captura req do body
// e passa pra quem deve receber (service)
export class UsersController {
    private usersServices: UsersServices;
    constructor() {
        this.usersServices = new UsersServices();
    }
    index() {
        //buscar todos
    }
    show(id: string) {
        //buscar somemente um
    }
    // next é necessário para criar um middleware
    async store(request: Request, response: Response, next: NextFunction) {
        //criar user
        const { name, email, password } = request.body;
        try {
            const result = await this.usersServices.create({ name, email, password });
            return response.status(201).json(result)
        } catch (error) {
            next(error);
        }
    }
    async update(request: Request, response: Response, next: NextFunction) {
        const { name, oldPassword, newPassword } = request.body;
        try {
            // Atualizar o avatar_url com a URL do Cloudinary
            const updatedUser = await this.usersServices.update({
                name,
                oldPassword,
                newPassword,
                avatar_url: request.file
            });
            return response.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    }

    auth() {
        //autenticacao do usuario
    }
}