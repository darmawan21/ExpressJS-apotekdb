const { Sequelize, DataTypes } = require('sequelize');
var koneksi = require('../koneksi.js');
const Obat = require('./obats.js');
const Transaksi_Obat = require('./transaksi_obat.js');

const Transaksi_Obat_Detail = koneksi.define('Transaksi_Obat_Detail', {
  jumlah: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  harga: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  
}, {
    freezeTableName: true
});

Transaksi_Obat_Detail.belongsTo(Transaksi_Obat, {foreignKey: 'id_transaksi_obat'});
Transaksi_Obat_Detail.belongsTo(Obat, {foreignKey: 'id_obat'});

module.exports = Transaksi_Obat_Detail;