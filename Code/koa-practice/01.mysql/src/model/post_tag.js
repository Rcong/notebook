module.exports = function(sequelize, DataTypes) {
    return sequelize.define('post_tag', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tagId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'post_tag',
        indexes: [
            {unique: false, fields: ['postId', 'tagId']}
        ]
    });
};