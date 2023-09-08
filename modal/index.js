const dbConfig = require("../Config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,  // Use the correct database name from dbConfig
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        },
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log("CONNECTED!!");
    })
    .catch((err) => {
        console.log("Error" + err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// importing model files 
db.imagesDB = require("./imageModal")(sequelize, DataTypes);


db.sequelize.sync({ force: false }).then(() => {
    console.log("yes re-sync done");
});

module.exports = db;