const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const moviesRouter = require('./routers/movies');
const path = require('path');
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:5173' }))

app.use(express.json());


// Servire i file statici dalla cartella 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/movies', require('./routers/movies'))

//middlewares
const errorHandler = require('./middlewares/errorsHandler')
const notFound = require('./middlewares/notFound')

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Entry point')
})

//router
app.use('/api/movies', moviesRouter);

app.use(errorHandler);
app.use(notFound);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

})