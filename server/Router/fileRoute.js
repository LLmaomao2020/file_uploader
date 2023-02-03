const express = require("express");
const router=express.Router();
const multer=require('multer');
const fs=require('fs');


router.post("/upload", multer({dest:'upload'}).single('file'),(req,res)=>{
    console.log(req.file);
    res.send(req.file);
});

module.exports=router;