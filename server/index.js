const express = require("express");
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

const multer=require('multer');
const fs=require('fs');


app.post("/upload", multer({dest:'upload'}).single('file'),(req,res)=>{
    console.log(req.file);
    fs.renameSync(req.file.path,`upload/${req.file.originalname}`)
    res.send(req.file);
});

app.get("/download",(req,res)=>{
    req.query.url?res.download(`upload/${req.query.url}`):res.send({
        success:false
    })
})

app.listen(8080, () => {
    console.log(`Server started...`);
});