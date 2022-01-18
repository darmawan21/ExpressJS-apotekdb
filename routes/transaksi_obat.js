var express = require('express');
var router = express.Router();
var TransaksiObat = require('../models/transaksi_obat');
const axios = require('axios');

router.get('/',function(req,res,next){
	TransaksiObat.findAll({raw:true}).then( async data=>{

		await Promise.all(data.map( async (item)=>{
			//baca Transaksi Periksa
			var transaksiPeriksa = null;
			await axios.get('http://localhost:3001/transaksi-periksa/tampil/'+item.id_transaksi_periksa).then( function (response) {
				transaksiPeriksa = response.data;
			}).catch( err=> {
				res.json({
					status: false,
					pesan: "Gagal tampil: " + err.message,
					data:[]
				});
			});

			//update itemTampil
			item['biaya_transaksi_periksa'] = transaksiPeriksa.data.biaya;
		}));

		res.json({
			status:true,
			pesan:"Berhasil Tampil",
			data:data
		});
	}).catch( err=>{
		res.json({
			status: false,
			pesan: "Gagal tampilll: " + err.message,
			data:[]
		});
	});
});

router.post('/',function(req,res,next){

    TransaksiObat.create(req.body).then( data=>{
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
	TransaksiObat.update(req.body,{
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
	TransaksiObat.destroy({
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

router.get('/transaksi-periksa',function(req,res,next){
	axios.get('http://localhost:3001/transaksi-periksa/options').then(function (response) {
		console.log(response);
		res.json(response.data);
	}).catch( err=> {
		res.json({
			status: false,
			pesan: "Gagal tampil: " + err.message,
			data:[]
		});
	});
});

router.get('/options',function(req,res,next){
	TransaksiObat.findAll({raw:true}).then( async data=>{

		await Promise.all(data.map( async (item)=>{
			//baca transaksi Periksa
			var transaksiPeriksa = null;
			await axios.get('http://localhost:3001/transaksi-periksa/tampil/'+item.id_transaksi_periksa).then( function (response) {
				transaksiPeriksa = response.data;
			}).catch( err=> {
				res.json({
					status: false,
					pesan: "Gagal tampil: " + err.message,
					data:[]
				});
			});

			//update itemTampil
			item['biaya_transaksi_periksa'] =  transaksiPeriksa.data.biaya;
			
			
		}));

		var options = data.map(item=> {
			return{
				id:item.id,
				value:item.biaya_transaksi_periksa
			}
		})

		res.json({
			status:true,
			pesan:"Berhasil Tampil",
			data:options
		});
	}).catch( err=>{
		res.json({
			status: false,
			pesan: "Gagal tampilll: " + err.message,
			data:[]
		});
	});
});

module.exports = router;