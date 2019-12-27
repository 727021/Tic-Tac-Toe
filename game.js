var playerID = 0
var gameID = 0
var games = []

function Player(name) {
    this.id = playerID++
    this.name = name
}

function Game(player1) {
    this.id = gameID++
    this.X = player1
    this.O = null
    this.turn = this.X
    this.winner = null
    games[this.id] = this

    this.end = function() {
        delete games[this.id]
    }
}

module.exports = {
    Player: Player,
    Game: Game,
    getGame: (id) => { return games[id] || {} },
    gameCount: () => { console.log(games); return games.length }
}