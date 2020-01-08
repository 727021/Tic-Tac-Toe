$(() => {
    $('.box').click(function() {
        if ($(this).data('box') == 'X')
            $(this).html('<i class="far fa-circle"></i>').data('box', 'O')
        else if ($(this).data('box') == 'O')
            $(this).empty().data('box', '')
        else
            $(this).html('<i class="fas fa-times"></i>').data('box', 'X')
    })

    var running = true
    async function updateGame() {
        if (!running) return
        // GET game state

        // Call updateGame() in callback
    }

    /**
     *
     * @param {string} action 'turn','move','win'
     * @param {number} move where to make a move
     */
    function player1(action, move) {

    }

    /**
     *
     * @param {string} action
     * @param {number} move
     */
    function player2(action, move) {

    }
})

// For winner: <i class="fas fa-crown"></i>