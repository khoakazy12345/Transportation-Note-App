const express = require('express');

const site = express();

site.get('/',(req,res) => {
    res.send('HELLO');
});

site.listen(8080, () => {
    console.log('Listening on 8080');
});