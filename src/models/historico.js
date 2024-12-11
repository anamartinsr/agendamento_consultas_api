import Sequelize, { Model } from 'sequelize';

export default class Historico extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                descricao: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: 'Campo não pode ficar vazio.',
                        },
                    },
                },
                profissional :{
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: 'Campo não pode ficar vazio.',
                        },
                    },
                },
                procedimento :{
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: 'Campo não pode ficar vazio.',
                        },
                    },
                },
                valor :{
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: 'Campo não pode ficar vazio.',
                        },
                    },
                },
                data: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                usuarios_id:  {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'usuarios',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                cliente_id:  {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    references: {
                        model: 'cliente',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
            },
            {
                sequelize,
                tableName: 'historico',
                timestamps: false,
            },
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Cliente, { foreignKey: 'cliente_id' });
        this.belongsTo(models.User, { foreignKey: 'usuarios_id' });
    }
}
