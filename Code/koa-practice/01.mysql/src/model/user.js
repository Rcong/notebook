module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(32),
            allowNull: false
        }
    }, {
        tableName: 'user'
    });
};