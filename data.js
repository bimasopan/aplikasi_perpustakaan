// models/data_perpus.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('data_perpus', 'postgres', 'akusopan13@#', {
  host: 'localhost',
  dialect: 'postgres',
});

const DataPerpus = sequelize.define('data_perpus', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama: {
    type: DataTypes.STRING(30),
  },
  nim: {
    type: DataTypes.STRING(30),
    unique: true,
  },
  username: {
    type: DataTypes.STRING(255),
  },
  password: {
    type: DataTypes.STRING(72),
  },
  no_telepon: {
    type: DataTypes.STRING(30),
  },
  alamat: {
    type: DataTypes.STRING(30),
  },
});

module.exports = DataPerpus;
