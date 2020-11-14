const express = require('express');

const site = express();


site.listen(8080, () => {
    console.log('Listening on 8080');
});