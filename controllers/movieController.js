//database import
const connection = require('../data/db');

//index root
const index = (req, res) => {
    res.sen('Movie list');

}

//show root
const show = (req, res) => {
    const id = req.params.id;
    res.send(`Movie detail on id ${id}`)
}

module.exports = {
    index,
    show
}