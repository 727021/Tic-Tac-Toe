const express = require('express')
const router = express.Router()
const {Game,Player,getGame,gameCount} = require('../../game')

/** GET '/:id'
 * Get the current state of a game
 *
 * Request:
 * id (required) Game id
 *
 * Response:
 * JSON game state
 */
router.get('/:id', (req, res, next) => {
    res.send(getGame(req.params.id))
})

/** GET '/'
 * Get the number of games running
 *
 * Request:
 *
 * Response:
 * JSON {games: N} (where N is the number of games running)
 */
router.get('/', (req, res, next) => {
    res.send({games: gameCount()})
})

/** POST '/'
 * Create a new game
 *
 * Request:
 * name (required) Name of player 1
 *
 * Response:
 * JSON game state
 */
router.post('/', (req, res, next) => {
    if (!req.body.name) return res.send({game: null, error: 'No player name'})
    let g = new Game(req.body.name)
    res.send({game: g, error: null})
})

/** PUT '/:id/player'
 * Add a second player to a game OR create a new game
 *
 * Request:
 * id   (required) Game id
 * name (required) Name of new player
 *
 * Response:
 * JSON game state
 */
router.put('/:id/player', (req, res, next) => {
    if (!req.body.name) return res.send({game: null, error: 'No player name'})
    let p = new Player(req.body.name)
    if (!Number(req.params.id) || getGame(req.params.id).id == undefined) return res.send({game: new Game(p), error: null})
    let g = getGame(req.params.id)
    if (g.O) return res.send({game: g, error: 'Game already has 2 players'})
    g.O = p
    res.send({game: g, error: null})
})

/** PUT '/:id/move'
 * Make a move
 *
 * Request:
 * id     (required) Game id
 * player (required) Player id
 * move   (required) Position of move (0-8 from the top left corner)
 *
 * Response:
 * JSON game state
 */
router.put('/:id/move', (req, res, next) => {
    if (!Number(req.params.id) || !getGame(req.params.id).id) return res.send({})
    let g = getGame(req.params.id)
    if (!req.body.player || req.body.player != g.turn.id) return res.send(g)
    if (!req.body.move || !Number(req.body.move) || +req.body.move < 0 || +req.body.move > 8) return res.send(g)
    if (g.board[+req.body.move] != ' ') return res.send(g)

    if (g.turn == g.X) {
        g.board[+req.body.move] = 'X'
        g.turn = g.O
    } else if (g.turn == g.O) {
        g.board[+req.body.move] = 'O'
        g.turn = g.X
    }

    // TODO Check for wins here

    res.send(g)
})

/** DELETE '/:id'
 * End a game
 *
 * Request:
 * id (required) Game id
 *
 * Response:
 * Final JSON game state
 */
router.delete('/:id', (req, res, next) => {
    if (!Number(req.params.id) || !getGame(req.params.id).id) return res.send({})
    let g = getGame(req.params.id)
    g.end()
    res.send(g)
})

module.exports = router