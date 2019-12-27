const express = require('express')
const router = express.Router()
const {Game,Player,getGame,gameCount} = require('../../game')

router.get('/:id', (req, res, next) => {
    res.send(getGame(req.params.id))
})

router.get('/', (req, res, next) => {
    res.send({games: gameCount()})
})

router.post('/', (req, res, next) => {

})

module.exports = router