const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const job = mongoose.model('Job');

router.post('/', (req, res) => {
    showLatestJob(req,res);
});

router.post('/add', (req, res) => {
        insertRecord(req, res);

});



function showLatestJob(req, res){

    filters = req.body.filters ? req.body.filters : null

    filter = {}
    if(filters && filters.price){

        if(filters.price === "Under $50"){
            filter = {price: { $lt: 50 }}
        } else  if(filters.price === "$50-$100"){
            filter = {price: { $gt: 50, $lt: 100 }}
        } else  if(filters.price === "Over $100"){
            filter = {price: { $gt: 100 }}
        } else  if(filters.price === "Over $500"){
            filter = {price: { $gt: 500 }}
        } 
    }

    if(filters && filters.category){
        filter = {...filter, title: filters.category }
    }
    

    job.find(filter).sort({'createdAt': -1}).then(data=>{
        if(data){
            res.send({ success: true, data: data})
        } else {
            res.send({ success: false })
        }
    }).catch(err=>{
        res.send({ success: false })
    })
}


function insertRecord(req, res) {
   
    job.create({
        title: req.body.title,
        content: req.body.content,
        price: req.body.price,
    }).then(doc=>{
        res.send({ success: true, data: doc })
    }).catch(err=>{
        res.send({ success: false, err: err })
    })
}





module.exports = router;