import { hash } from "bcrypt";
import { ICreate } from "../Interfaces/UsersInterface";
import { UsersRepository } from "../repositories/UsersRepository";

export class UsersServices {
    private usersRepository: UsersRepository;
    constructor() {
        this.usersRepository = new UsersRepository();
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