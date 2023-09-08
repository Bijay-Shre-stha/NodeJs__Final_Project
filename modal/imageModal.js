module.exports = (sequelize, DataTypes) => {
    const Images = sequelize.define("image", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Images;
};
