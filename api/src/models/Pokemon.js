const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type: DataTypes.UUID,
      unique: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    health:{
      type: DataTypes.INTEGER,
      default: 60
    },
    attack:{
      type: DataTypes.INTEGER,
      deafult: 50
    },
    defense:{
      type: DataTypes.INTEGER,
      default: 50
    },
    speed:{
      type: DataTypes.INTEGER,
      default: 40
    },
    height:{
      type: DataTypes.INTEGER,
      default: 4
    },
    weight:{
      type: DataTypes.INTEGER,
      deafult: 50
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
