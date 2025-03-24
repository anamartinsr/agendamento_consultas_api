import prisma from '../../prisma/index.js';

class LogService {
    /**
     * Cria uma nova consulta no banco de dados.
     *
     * @param {Object} dados - Dados da consulta a ser criada.
     * @returns {Promise<Object>} - Consulta criada.
     * @throws {Error} - Se o usuário, profissional ou procedimento não for encontrado.
     */
    static async create(dados) {
        const userExistente = await prisma.user.findUnique({
            where: {
                id: dados.usuariosId,
            },
        });

        if (!userExistente) {
            throw new Error('Usuario não encontrado');
        }

        const profissionalExistente = await prisma.profissional.findUnique({
            where: {
                id: dados.profissionalId,
            },
        });

        if (!profissionalExistente) {
            throw new Error('Profissional não encontrado');
        }

        const procedimentoExistente = await prisma.procedimento.findUnique({
            where: {
                id: dados.procedimentoId,
            },
        });

        if (!procedimentoExistente) {
            throw new Error('Procedimento não encontrado');
        }

        return prisma.logConsulta.create({
            data: dados,
        });
    }

    /**
     * Retorna todas as consultas do banco de dados.
     *
     * @returns {Promise<Array>} - Lista de consultas.
     */
    // static async findAll() {
    //     return prisma.consulta.findMany({
    //         include: {
    //             profissional: {
    //                 include: {
    //                     user: {
    //                         select: {
    //                             nome: true,
    //                             email: true,
    //                         },
    //                     },
    //                 },
    //             },
    //             procedimento: true,
    //         },
    //     });
    // }

    /**
     * Retorna uma consulta pelo seu ID.
     *
     * @param {number} id - ID da consulta.
     * @returns {Promise<Object|null>} - Consulta encontrada ou null se não existir.
     */
    // static async findById(id) {
    //     return prisma.consulta.findUnique({
    //         where: { id },
    //         include: {
    //             profissional: {
    //                 include: {
    //                     user: {
    //                         select: {
    //                             nome: true,
    //                             email: true,
    //                         },
    //                     },
    //                 },
    //             },
    //             procedimento: true,
    //         },
    //     });
    // }

    /**
     * Atualiza uma consulta existente no banco de dados.
     *
     * @param {number} id - ID da consulta a ser atualizada.
     * @param {Object} dados - Dados atualizados da consulta.
     * @returns {Promise<Object>} - Consulta atualizada.
     */
    // static async update(id, dados) {
    //     return prisma.consulta.update({
    //         where: { id },
    //         data: dados,
    //     });
    // }

    /**
     * Deleta uma consulta do banco de dados.
     *
     * @param {number} id - ID da consulta a ser deletada.
     * @returns {Promise<Object>} - Consulta deletada.
     */
    // static async delete(id) {
    //     return prisma.consulta.delete({
    //         where: { id },
    //     });
    // }
}

export default LogService;
