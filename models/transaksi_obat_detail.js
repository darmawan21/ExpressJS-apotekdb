const { Sequelize, DataTypes, Model } = require('sequelize');
var koneksi = require("../koneksi.js");


const Transaksi_Obat_Detail = koneksi.define('transaksi_obat_detail', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  id_transaksi_obat: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  id_obat: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  jumlah: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  harga: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
}, {
    timestamps: true,
    freezeTableName: true
});

module.exports = Transaksi_Obat_Detail;