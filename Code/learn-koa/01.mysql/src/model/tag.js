module.exports = function(sequelize, DataTypes) {
    return sequelize.define('tag', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'tag',
        indexes: [
            {unique: true, fields: ['name']}
        ]
    });
};