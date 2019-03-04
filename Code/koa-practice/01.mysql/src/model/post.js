module.exports = function(sequelize, DataTypes) {
    return sequelize.define('post', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '0为文章,1为页面'
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '0为草稿，1为已经发布'
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        summary: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        markdownContent: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: 'markdown 原文'
        },
        pathname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        enable: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1
        }
    }, {
        tableName: 'post',
        indexes: [
            {unique: false, fields: ['createdAt']},
            {unique: true, fields: ['pathname']}
        ]
    });
};
