const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.Port || 3000;

//middlewares
const errorHandler = require('./middlewares/errorsHandler')
const notFound = require('./middlewares/notFound')

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Entry point')
})

app.use(errorHandler);
app.use(notFound);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

})