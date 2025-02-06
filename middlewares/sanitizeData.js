// Questo middleware si occupa di "sanitizzare" i dati presenti nel corpo della richiesta (req.body).
// La funzione "sanitize" rimuove gli spazi extra all'inizio e alla fine delle stringhe e rimuove eventuali tag HTML.
// Se il corpo della richiesta è un oggetto, il middleware itera su tutte le proprietà dell'oggetto e applica la funzione "sanitize" a ciascuna di esse.
// Infine, chiama "next()" per passare il controllo al prossimo middleware o handler nella catena.
// Questo middleware è stato registrato in routers/pizzas.js per le rotte POST, PUT e PATCH, che gestiscono rispettivamente la creazione, l'aggiornamento e la modifica di una pizza.
// In questo modo, i dati inviati dal client vengono "puliti" prima di essere utilizzati per creare o aggiornare una pizza nel database.

const sanitizeData = (req, res, next) => {
  const sanitize = (value) => {
    if (typeof value === 'string') {
      return value
        .trim() // Rimuove spazi extra all'inizio e alla fine
        .replace(/<[^>]*>/g, ''); // Rimuove tag HTML
    }
    return value;
  };

  if (req.body && typeof req.body === 'object') {
    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        req.body[key] = sanitize(req.body[key]);
      }
    }
  }

  next(); // Passa al prossimo middleware o handler
};

module.exports = sanitizeData;