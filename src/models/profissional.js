import Sequelize, { Model } from 'sequelize';

export default class Profissional extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                profissional :{
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: 'Campo não pode ficar vazio.',
                        },
                    },
                },
                procedimentos :{
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: 'Campo não pode ficar vazio.',
                        },
                    },
                },
                valores :{
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: 'Campo não pode ficar vazio.',
                        },
                    },
                },
                datas: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                recomendacao :{
                    allowNull: false,
                    validate: {
                        notEmpty: {
                            msg: 'Campo não pode ficar vazio.',
                        },
                    },
                },
                usuarios_id:  {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'usuarios',
                        key: 'id',
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
            },
            {
                sequelize,
                tableName: 'profissional',
                timestamps: false,
            },
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'usuarios_id' });
    }
}
