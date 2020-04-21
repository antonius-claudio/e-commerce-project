require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT;
const router = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(router);

app.listen(port, () => {
    console.log('listening on port: ', port);
})