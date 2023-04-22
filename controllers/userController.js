const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const user = mongoose.model('User');

router.post('/user', (req, res) => {
    checkUser(req, res)
});

router.post('/user/signup', (req, res) => {
        insertRecord(req, res);

});


router.post('/user/login', (req, res) => {
    signinUser(req, res)
});

function checkUser(req, res){
    user.find({
        _id: req.body.token
    }).select(["-_id", "-password"]).then(data=>{
        if(req.body.token && data){
            res.send({ success: true,  data: data})
        } else {
            res.send({ success: false })
        }
    }).catch(err=>{
        res.send({ success: false })
    })
}


function insertRecord(req, res) {
   
    user.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        qualification: req.body.qualification,
        age: req.body.age,
        password: req.body.password
    }).then(doc=>{
        res.send({ success: true, data: doc })
    }).catch(err=>{
        res.send({ success: false, err: err })
    })
}


function signinUser(req, res){
    user.findOne({
        email: req.body.email,
        password: req.body.password
    }).then(data=>{
        if(data){
            res.send({ success: true, message: "Logged In", token: data._id})
        } else {
            res.send({ success: false, message: "Email or password incorrect"})
        }
    }).catch(err=>{
        res.send({ success: false, message: err})
    })
}


module.exports = router;