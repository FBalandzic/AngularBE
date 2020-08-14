var express = require('express')
var router = express.Router();

const oglasi = [
  {ime: 'OGLAS 1', code: 'OG1', opis: 'Prodaja oglasa 1', cena: 180, omiljen: false},
  {ime: 'OGLAS 2', code: 'OG2', opis: 'Prodaja oglasa 2', cena: 280, omiljen: false},
  {ime: 'OGLAS 3', code: 'OG3', opis: 'Prodaja oglasa 3', cena: 380, omiljen: false},
];

router.get('/', (req, res) => {
  var query = (req.query['q'] || '').toLowerCase();
  if (query) {
    const foundOglasi = oglasi.filter(
      (oglas) => oglas.ime.toLowerCase().indexOf(query) != -1);
    return res.status(200).json(foundOglasi);
  }
  return res.status(200).json(oglasi);
});

router.get('/:code', (req, res) => {
  let oglasCode = req.params.code;
  let foundOglas = oglasi.find(each => each.code === oglasCode);
  if (foundOglas) {
    return res.status(200).json(foundOglas);
  }
  return res.status(400).json({msg: 'Oglas sa code ' + oglaskCode + ' nije pronadjen!'});
});

router.post('/', (req, res) => {
  let oglas = req.body;
  let foundOglas = oglasi.find(each => each.code === oglas.code);
  if (foundOglas) {
    return res.status(400)
        .json({msg: 'Oglas sa code ' + oglas.code + ' vec postoji'});
  }
  oglasi.push(oglas);
  return res.status(200).json({msg: 'Oglas with code ' + oglas.code + ' uspesno napravljen'});
});

router.patch('/:code', (req, res) => {
  let oglasCode = req.params.code;
  let foundOglas = oglasi.find(each => each.code === oglasCode);
  if (foundOglas) {
    foundOglas.omiljen = req.body.omiljen;
    let msg = 'Oglas sa code ' + oglasCode + ' sada je ';
    msg += foundOglas.omiljen ? ' omiljen.' : ' nije omiljen';
    return res.status(200).json({msg: msg});
  }
  return res.status(400).json({msg: 'Oglas sa code ' + oglasCode + ' nije pronadjen!'});
});

module.exports = router;
