const { Sequelize, DataTypes } = require('sequelize');
var koneksi = require('../koneksi.js');

const Obat = koneksi.define('Obat', {
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  harga: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
}, {
    freezeTableName: true
});

module.exports = Obat;