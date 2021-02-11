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
    let data = "";
    let data2 = "";
    for(let i = 0; i < size; i++){
        if (_.isObject(addrArr[i]))
            data = addrArr[i].latitude + "," + addrArr[i].longitude + "\n";
        else
            data = addrArr[i] + "\n"
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
        data2 = fs.readFileSync('optimal.txt',{encoding:'utf8', flag:'r'});
        var textBySpace = data2.split(' ');
        var arr = [];
        for (let i = 0; i < textBySpace.length; i++)
            arr.push(Number(textBySpace[i]));
        var obj = {
            optimal:arr
        }
        res.send(obj);
    });
    
});

app.listen(8080,()=>{
    console.log('Server Created on 8080');
})