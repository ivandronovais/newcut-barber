import { Request } from "express";
import { prisma } from "../database/prisma";
import { ICreate } from "../Interfaces/UsersInterface";

export class UsersRepository {
    async create({ email, name, password }: ICreate) {
        const result = await prisma.users.create({
            data: {
                email,
                name,
                password
            }
        });
        // retorna user criado
        return result;
    }
    async findUserByEmail(email: string) {
        const result = await prisma.users.findUnique({
            where: {
                email
            }
        })
        return result;
    }
}