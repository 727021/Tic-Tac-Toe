var express = require('express')
var router = express.Router()
const {Game,Player,getGame} = require('../game')

router.get('/:id', (req, res, next) => {
    if (getGame(req.params.id).id == undefined) {
        let game = new Game(new Player('Player1'))
        console.log(game.id)
        return res.redirect(`/play/${game.id}`)
    }
    res.send(getGame(req.params.id))
})

router.get('/', (req, res, next) => {
    res.redirect('/')
})

module.exports = router;
