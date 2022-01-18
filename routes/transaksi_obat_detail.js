var express = require('express');
var router = express.Router();
const axios = require('axios')
var Obat = require('../models/obats');
var TransaksiObat = require('../models/transaksi_obat');
var TransaksiObatDetail = require('../models/transaksi_obat_detail');

router.get('/', function(req, res, next) {
	TransaksiObatDetail.findAll({raw:true}).then( async data=> {
	
	  await Promise.all(data.map( async (item)=>{
		// baca Transaksi Periksa
		const transaksi_obat = await TransaksiObat.findByPk(item.id_transaksi_obat);
	
		// baca Jenis Penunjang
		const obat = await Obat.findByPk(item.id_obat);
	
		// update itemTampil
		item['biaya_transaksi_obat'] =  transaksi_obat.id_transaksi_obat;
		item['nama_obat'] = obat.nama;
    	item['harga_obat'] = obat.harga;

	  }));
	
	  res.json({
		status:true,
		pesan: "Berhasil Tampil",
		data:data
	  });
	
	}).catch ( err => {
	  res.json({
		status:false,
		pesan: "Gagal tampil: " + err.message,
		data:[]
	  })
	});
});

router.post('/',function(req,res,next){

    TransaksiObatDetail.create(req.body).then( data=>{
        res.json({
            status:true,
            pesan:"Berhasil Tambah",
            data:data
        });
    }).catch( err=>{
        res.json({
            status: false,
            pesan: "Gagal Tambah: " + err.message,
            data:[]
        });
    });

});

router.put('/',function(req,res,next){
	TransaksiObatDetail.update(req.body,{
		where:{id:req.body.id}
	}).then( ()=>{
		res.json({
			status:true,
			pesan:"Berhasil Ubah",
			data:[]
		});
	}).catch( err=>{
		res.json({
			status: false,
			pesan: "Gagal Ubah: " + err.message,
			data:[]
		});
	});
});

router.delete('/',function(req,res,next){
	TransaksiObatDetail.destroy({
		where:{id:req.body.id}
	}).then( ()=>{
		res.json({
			status:true,
			pesan:"Berhasil Hapus",
			data:[]
		});
	}).catch( err=>{
		res.json({
			status: false,
			pesan: "Gagal Hapus: " + err.message,
			data:[]
		});
	});
});

module.exports = router;