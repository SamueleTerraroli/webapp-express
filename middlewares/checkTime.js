const checkTime = (req, res, next) => {

  // questo middleware blocca la chiamata se è di sabato di domenica o prima delle 9 o dopo le 17 (oriri di ufficio)
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour <= 17) {
    next();
  } else {
    res.send('Siamo chiusi')
  }

}

module.exports = checkTime;