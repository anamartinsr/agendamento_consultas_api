import prisma from '../../prisma/index.js';
import bcrypt from 'bcrypt';
class UserService {
    static async create(dados) {
        const SALT_ROUNDS = 10;
        async function hashPassword(password) {
            return await bcrypt.hash(password, SALT_ROUNDS);
        }

        const hashedPassword = await hashPassword(dados.password);

        return prisma.user.create({
            data: {
                name: dados.name,
                dt_birth: dados.dt_birth,
                email: dados.email,
                cpf: dados.cpf,
                phone: dados.phone,
                typeUser: dados.typeUser,
                description: dados.description,
                address: dados.address,
                passwordChanged: dados.passwordChanged,
                password: hashedPassword,
            },
        });
    }

    static async findAll() {
        return prisma.user.findMany();
    }

    static async findById(id) {
        return prisma.user.findUnique({
            where: { id },
        });
    }

    static async update(id, dados) {
        return prisma.user.update({
            where: { id },
            data: dados,
        });
    }

    static async delete(id) {
        return prisma.user.delete({
            where: { id },
        });
    }
}

export default UserService;
