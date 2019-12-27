$(() => {
    const playerNameMax = 24
    $('#playerNameLength').html(playerNameMax)

    $('#playerName').keypress(function(e) {
        if (e.key == ' ' || e.key == '<' || e.key == '>' || e.key == '\\' || $(this).val().trim().length >= playerNameMax) {
            e.preventDefault()
            return false
        }
    })

    $('#playerName').keyup(function(e) {
        let i = $(this).val().trim().length
        $('#playerNameLength').html(playerNameMax - i)
    })

    $('#gameCode').keypress(function(e) {
        if (['1','2','3','4','5','6','7','8','9','0'].indexOf(e.key) == -1 || $(this).val().trim().length >= 8) {
            e.preventDefault()
            return false
        }
    })

    $('#newGame').click(function() {
        $('#modalTitle').html('New Game')
        $('#modalStart').data('new', true)
        $('#gameCodeRow').hide().val('')
        $('#playerName').attr('placeholder', 'Player1').val('')
        $('#modal').modal('show')
    })

    $('#joinGame').click(function() {
        $('#modalTitle').html('Join Game')
        $('#modalStart').data('new', false)
        $('#gameCodeRow').show().val('')
        $('#playerName').attr('placeholder', 'Player2').val('')
        $('#modal').modal('show')
    })
})