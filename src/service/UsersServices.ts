import { hash } from "bcrypt";
import { ICreate, IUpdate } from "../Interfaces/UsersInterface";
import { UsersRepository } from "../repositories/UsersRepository";
import { cloudinary } from "../config/cloudinary";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { response } from "express";

export class UsersServices {

    private usersRepository: UsersRepository;
    constructor() {
        this.usersRepository = new UsersRepository();
    }
    async update({ name, oldPassword, newPassword, avatar_url }: IUpdate) {
        const uploadImage = avatar_url?.buffer;

        const uploadResult: UploadApiResponse = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'uploads/newcut_barber',
                    format: 'png' || 'jpg' || 'jpeg',
                },
                (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                }
            );
            stream.end(uploadImage);
        });
    }

    async create({ email, name, password }: ICreate) {
        const findUserByEmail = await this.usersRepository.findUserByEmail(email)
        // verifica se usuario ja existe no bd
        if (findUserByEmail) {
            throw new Error('User exists!')
        }
        // criptografa a senha
        const hashPassword = await hash(password, 10);
        // chama a service e passa os parametros ja com a senha cripografada
        const create = await this.usersRepository.create({ email, name, password: hashPassword })

        return create;
    }
}