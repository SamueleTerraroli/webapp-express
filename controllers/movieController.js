//database import
const connection = require('../data/db');

//index root
const index = (req, res) => {
    const sql = `SELECT M.*, ROUND(AVG(R.vote),1) AS average_vote
                 FROM movies M
                 LEFT JOIN reviews R ON M.id = R.movie_id
                 GROUP BY M.id`;

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Query error on database' });

        const moviesWithImages = results.map(movie => ({
            ...movie,
            image_url: movie.image ? `${req.protocol}://${req.get('host')}/images/movies_cover/${movie.image}` : null

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
            image_url: results[0].image ? `${req.protocol}://${req.get('host')}/images/movies_cover/${results[0].image}` : null

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

const storeReview = (req, res) => {
    const id = req.params.id;
    const { text, name, vote } = req.body

    const sql = 'INSERT INTO reviews(text, name, vote, movie_id) VALUES (?, ?, ?, ?)'

    connection.query(sql, [text, name, vote, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Query error on database' });
        res.status(201);
        res.json({ message: 'Review added', id: results.insertId })
    })

}

const store = (req, res) => {
    console.log(req.file); // Log file information
    const { title, director, abstract } = req.body;
    const imageName = req.file.filename;

    const sql = "INSERT INTO movies (title, director, abstract, image) VALUES (?, ?, ?, ?)";
    connection.query(sql, [title, director, abstract, imageName], (err, results) => {
        if (err) {
            console.error('Database query error: ', err); // Log the error
            return res.status(500).json({ error: 'Query error on database' });
        }
        res.status(201).json({ status: 'success', message: 'Film aggiunto con successo' });
    });
};



module.exports = {
    index,
    show,
    storeReview,
    store
}