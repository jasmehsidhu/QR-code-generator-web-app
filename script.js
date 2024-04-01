import express from 'express';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import parser from 'qr-image';
import fs from 'fs'
import bodyParser from 'body-parser';

const PORT=1000;
const server=express()
var dir=dirname(fileURLToPath(import.meta.url))

server.use(bodyParser.urlencoded({extended:true}))

server.get("/",(req,res)=>{
    res.sendFile(dir+"/public/index.html")
})
server.post("/",(req,res)=>{
    var qr = parser.image(req.body.url, { type: 'png' });
    qr.pipe(fs.createWriteStream('qr.png'));
    res.sendFile(dir+"/qr.png");
})

server.listen(PORT,()=>{
    console.log("Server started")
})