//database import
const connection = require('../data/db');

//index root
const index = (req, res) => {
    const sql = 'SELECT * FROM movies';

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Query error on database' });

        const moviesWithImages = results.map(movie => ({
            ...movie,
            image_url: movie.image ? `/${movie.image}` : null
        }));

        res.json(moviesWithImages);
    })

}

//show root
const show = (req, res) => {
    const id = req.params.id;
    const sql = `SELECT M.*, ROUND(AVG(R.vote),1) AS average_vote, M.image
                 FROM movies M
                 LEFT JOIN reviews R ON M.id = R.movie_id
                 WHERE M.id = ?`;

    const sqlReviews = `SELECT *
                        FROM reviews R
                        WHERE R.movie_id = ?`;

    // movie query
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Movie Query Error:', err);
            return res.status(500).json({ error: 'Query error on database' });
        }

        if (results.length === 0 || results[0].id === null) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        const movie = {
            ...results[0],
            image_url: results[0].image ? `/${results[0].image}` : null
        };

        // reviews query
        connection.query(sqlReviews, [id], (err, resultsReviews) => {
            if (err) {
                console.error('Reviews Query Error:', err);
                return res.status(500).json({ error: 'Query error on database' });
            }

            res.json({
                ...movie,
                reviews: resultsReviews
            });
        });
    });
};


module.exports = {
    index,
    show
}