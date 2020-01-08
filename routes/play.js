var express = require('express')
var router = express.Router()
const {Game,Player,getGame} = require('../game')

router.get('/test', (req, res, next) => {
    res.render('play', {game: new Game(new Player('Player1'))})
})

router.get('/:id', (req, res, next) => {
    if (!Number(req.params.id) || !getGame(req.params.id).id) return res.redirect('/')
    res.render('play', {game: getGame(req.params.id)})
})

router.get('/', (req, res, next) => {
    res.redirect('/')
})

module.exports = router;
