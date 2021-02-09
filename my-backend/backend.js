const express = require('express');
const fs = require('fs');
const {spawn} = require('child_process');
const cors = require('cors');
const _ = require('underscore');
const app = express();
//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.post('/addr',(req,res) => {
    let size = req.body.addresses.length;
    let addrArr = req.body.addresses;
    for(let i = 0; i < size; i++){
        if (_.isObject(addrArr[i]))
            let data = addrArr[i].latitude + "," + addrArr[i].longitude + "\n";
        else
            let data = addrArr[i] + ","
        if(i == 0){
            fs.writeFile('addr.txt', data, (err) => {
                if(err) throw err;
            });
        } else {
            fs.appendFile('addr.txt',data,(err) => {
                if(err) throw err;
            })
        }
        
    }
    const python = spawn('python',['init.py']);
    python.on('exit',(code)=>{
        console.log('Python script done');
    });
    res.send();
});

app.listen(8080,()=>{
    console.log('Server Created on 8080');
})