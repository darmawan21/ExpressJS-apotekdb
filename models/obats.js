
var koneksi = require("../koneksi.js");
const Sequelize = require('sequelize');

const Obat = koneksi.define('obat',   {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  autoIncrement: true
  },
  nama: {
    type: Sequelize.STRING,
    allowNull: false
  },
  harga: {
  type: Sequelize.INTEGER,
  allowNull: false,
},},
{
  timestamps: true,
  freezeTableName: true
}
);


module.exports = Obat;