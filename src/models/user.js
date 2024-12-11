import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                },
                nome: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                cpf: {
                    type: Sequelize.STRING,
                    allowNull: true,
                    unique: true,
                },
                email: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                cep: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                numero: {
                    type: Sequelize.STRING(10),
                    allowNull: false,
                },
                rua: {
                    type: Sequelize.STRING(10),
                    allowNull: false,
                },
                cidade: {
                    type: Sequelize.STRING(10),
                    allowNull: false,
                },
                telefone: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                tipo_user: {
                    type: Sequelize.STRING(10),
                    allowNull: false,
                },
                senha: {
                    type: Sequelize.STRING,
                    defaultValue: '',
                },
                password: {
                    type: Sequelize.VIRTUAL,
                    // defaultValue: '',
                    validate: {
                        len: {
                            args: [6, 50],
                            msg: 'A senha precisa ter entre 6 e 50 caracteres'},
                    },
                },
            },
            {
                sequelize,
                tableName: 'user',
                timestamps: false,
            },
        );
        this.addHook('beforeSave', async(cliente) => {
            if (cliente.password) {
                cliente.senha = await bcryptjs.hash(cliente.password, 8);
            }
        });
        return this;
    }

    passwordIsValid(password) {
        return bcryptjs.compare(password, this.senha);
    }
}
