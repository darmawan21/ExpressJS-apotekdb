var express = require('express');
var router = express.Router();
var Transaksi_Obat_Detail = require("../models/transaksi_obat_detail");

/*TAMPIL DATA Transaksi_Obat_Detail. */
router.get('/', function(req, res, next) {
Transaksi_Obat_Detail.findAndCountAll().then(data => {
    res.json({
      status: true,
      pesan: "Berhasil Tampil",
      data:data.rows,
      count: data.count
    });
  }).catch(salahnya=>{
    res.json({
      status: false,
      pesan: "Gagal Tampil: " + salahnya.message,
      data: []
    });
  });
});

/* TAMBAH DATA Transaksi_Obat_Detail. */
router.post('/', function(req, res, next) {
Transaksi_Obat_Detail.create(req.body).then(data => {
    res.json({
      status: true,
      pesan: "Berhasil Ditambah",
      data:data
    });
  }).catch(salahnya=>{
    res.json({
      status: false,
      pesan: "Gagal Tampil: " + salahnya.message,
      data: req.body
    });
  });
});

/* UBAH DATA Transaksi_Obat_Detail. */
router.put('/', function(req, res, next) {
Transaksi_Obat_Detail.update(req.body, {
    where : {id:req.body.id}
  }).then(data => {
    res.json({
      status: true,
      pesan: "Berhasil Ubah",
      data:data
    });
  }).catch(salahnya=>{
    res.json({
      status: false,
      pesan: "Gagal Ubah: " + salahnya.message,
      data:req.body
    });
  });
});

/* HAPUS DATA Transaksi_Obat_Detail. */
router.delete('/', function(req, res, next) {
Transaksi_Obat_Detail.destroy({
    where : {id:req.body.id}
  }).then(data => {
    res.json({
      status: true,
      pesan: "Berhasil Hapus",
      data:data
    });
  }).catch(salahnya=>{
    res.json({
      status: false,
      pesan: "Gagal Hapus: " + salahnya.message,
      data:req.body
    });
  });
});

module.exports = router;
