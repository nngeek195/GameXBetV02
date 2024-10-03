var board,
    game = new Chess();

/*The "AI" part starts here */
const savedName = localStorage.getItem('profileName');
if (savedName) {
    document.getElementById('profileName').textContent = savedName;
}else {
  window.location.href= "/index.html";
}
var minimaxRoot =function(depth, game, isMaximisingPlayer) {

    var newGameMoves = game.ugly_moves();
    var bestMove = -9999;
    var bestMoveFound;

    for(var i = 0; i < newGameMoves.length; i++) {
        var newGameMove = newGameMoves[i]
        game.ugly_move(newGameMove);
        var value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
        game.undo();
        if(value >= bestMove) {
            bestMove = value;
            bestMoveFound = newGameMove;
        }
    }
    return bestMoveFound;
};

var minimax = function (depth, game, alpha, beta, isMaximisingPlayer) {
    positionCount++;
    if (depth === 0) {
        return -evaluateBoard(game.board());
    }

    var newGameMoves = game.ugly_moves();

    if (isMaximisingPlayer) {
        var bestMove = -9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.ugly_move(newGameMoves[i]);
            bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            alpha = Math.max(alpha, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    } else {
        var bestMove = 9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.ugly_move(newGameMoves[i]);
            bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            beta = Math.min(beta, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    }
};

var evaluateBoard = function (board) {
    var totalEvaluation = 0;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i ,j);
        }
    }
    return totalEvaluation;
};

var reverseArray = function(array) {
    return array.slice().reverse();
};

var pawnEvalWhite =
    [
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
        [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
        [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
        [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
        [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
        [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
    ];

var pawnEvalBlack = reverseArray(pawnEvalWhite);

var knightEval =
    [
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
        [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
        [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
        [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
        [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
        [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
        [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
    ];

var bishopEvalWhite = [
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
    [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
    [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
    [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
    [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];

var bishopEvalBlack = reverseArray(bishopEvalWhite);

var rookEvalWhite = [
    [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
];

var rookEvalBlack = reverseArray(rookEvalWhite);

var evalQueen = [
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

var kingEvalWhite = [

    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
    [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
];

var kingEvalBlack = reverseArray(kingEvalWhite);




var getPieceValue = function (piece, x, y) {
    if (piece === null) {
        return 0;
    }
    var getAbsoluteValue = function (piece, isWhite, x ,y) {
        if (piece.type === 'p') {
            return 10 + ( isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x] );
        } else if (piece.type === 'r') {
            return 50 + ( isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x] );
        } else if (piece.type === 'n') {
            return 30 + knightEval[y][x];
        } else if (piece.type === 'b') {
            return 30 + ( isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x] );
        } else if (piece.type === 'q') {
            return 90 + evalQueen[y][x];
        } else if (piece.type === 'k') {
            return 900 + ( isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x] );
        }
        throw "Unknown piece type: " + piece.type;
    };

    var absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x ,y);
    return piece.color === 'w' ? absoluteValue : -absoluteValue;
};


/* board visualization and games state handling */

var onDragStart = function (source, piece, position, orientation) {
    if (game.in_checkmate() === true || game.in_draw() === true ||
        piece.search(/^b/) !== -1) {
        return false;
    }
};

var makeBestMove = function () {
    var bestMove = getBestMove(game);
    game.ugly_move(bestMove);
    board.position(game.fen());
    renderMoveHistory(game.history());
    if (game.game_over()) {
        alert('Game over');
    }
};


var positionCount;
var getBestMove = function (game) {
    if (game.game_over()) {
        alert('Game over');
    }

    positionCount = 0;
    var depth = parseInt($('#search-depth').find(':selected').text());

    var d = new Date().getTime();
    var bestMove = minimaxRoot(depth, game, true);
    var d2 = new Date().getTime();
    var moveTime = (d2 - d);
    var positionsPerS = ( positionCount * 1000 / moveTime);

    $('#position-count').text(positionCount);
    $('#time').text(moveTime/1000 + 's');
    $('#positions-per-s').text(positionsPerS);
    return bestMove;
};

var renderMoveHistory = function (moves) {
    var historyElement = $('#move-history').empty();
    historyElement.empty();
    for (var i = 0; i < moves.length; i = i + 2) {
        historyElement.append('<span>' + moves[i] + ' ' + ( moves[i + 1] ? moves[i + 1] : ' ') + '</span><br>')
    }
    historyElement.scrollTop(historyElement[0].scrollHeight);

};

var onDrop = function (source, target) {

    var move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    });

    removeGreySquares();
    if (move === null) {
        return 'snapback';
    }

    renderMoveHistory(game.history());
    window.setTimeout(makeBestMove, 250);
};

var onSnapEnd = function () {
    board.position(game.fen());
};

var onMouseoverSquare = function(square, piece) {
    var moves = game.moves({
        square: square,
        verbose: true
    });

    if (moves.length === 0) return;

    greySquare(square);

    for (var i = 0; i < moves.length; i++) {
        greySquare(moves[i].to);
    }
};

var onMouseoutSquare = function(square, piece) {
    removeGreySquares();
};

var removeGreySquares = function() {
    $('#board .square-55d63').css('background', '');
};

var greySquare = function(square) {
    var squareEl = $('#board .square-' + square);

    var background = '#a9a9a9';
    if (squareEl.hasClass('black-3c85d') === true) {
        background = '#696969';
    }

    squareEl.css('background', background);
};

var cfg = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd
};
board = ChessBoard('board', cfg);
document.addEventListener('DOMContentLoaded', function () {
    let balance = parseFloat(localStorage.getItem('balance')) || 100;
    const balanceElement = document.getElementById('balance');
    balanceElement.innerText = balance.toFixed(2);

    let betAmount = 0;
    let gameStarted = false;
    let game = new Chess();

    const popup = document.getElementById('popup');
    const betForm = document.getElementById('bet-form');
    const msg = document.querySelector('.message');

    // Show popup to place bet before the game starts
    function showPopup() {
        popup.classList.add('show');
    }

    // Handle bet form submission
    betForm.addEventListener('submit', function (e) {
        e.preventDefault();
        betAmount = parseFloat(document.getElementById('bet-amount').value);

        if (betAmount > balance) {
            alert('Insufficient balance!');
            return;
        }

        balance -= betAmount;
        balanceElement.innerText = balance.toFixed(2);
        localStorage.setItem('balance', balance.toFixed(2));

        popup.classList.remove('show');
        gameStarted = true; // Start the game
    });

    // Function to handle game result
    function handleGameOver(isWin) {
        if (isWin) {
            balance += betAmount * 2;
            msg.textContent = 'You win!';
        } else {
            msg.textContent = 'You lose!';
        }
        balanceElement.innerText = balance.toFixed(2);
        localStorage.setItem('balance', balance.toFixed(2));
        gameStarted = false;
    }

    // Handle page unload event to deduct bet amount if the player leaves the game
    window.addEventListener('beforeunload', function () {
        if (gameStarted) {
            balance -= betAmount; // Deduct bet amount if the game was in progress
            balanceElement.innerText = balance.toFixed(2);
            localStorage.setItem('balance', balance.toFixed(2));
        }
    });

    // Chess AI and game logic
    var minimaxRoot = function (depth, game, isMaximisingPlayer) {
        var newGameMoves = game.ugly_moves();
        var bestMove = -9999;
        var bestMoveFound;

        for (var i = 0; i < newGameMoves.length; i++) {
            var newGameMove = newGameMoves[i];
            game.ugly_move(newGameMove);
            var value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
            game.undo();
            if (value >= bestMove) {
                bestMove = value;
                bestMoveFound = newGameMove;
            }
        }
        return bestMoveFound;
    };

    var minimax = function (depth, game, alpha, beta, isMaximisingPlayer) {
        var positionCount = 0;
        if (depth === 0) {
            return -evaluateBoard(game.board());
        }

        var newGameMoves = game.ugly_moves();

        if (isMaximisingPlayer) {
            var bestMove = -9999;
            for (var i = 0; i < newGameMoves.length; i++) {
                game.ugly_move(newGameMoves[i]);
                bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
                game.undo();
                alpha = Math.max(alpha, bestMove);
                if (beta <= alpha) {
                    return bestMove;
                }
            }
            return bestMove;
        } else {
            var bestMove = 9999;
            for (var i = 0; i < newGameMoves.length; i++) {
                game.ugly_move(newGameMoves[i]);
                bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
                game.undo();
                beta = Math.min(beta, bestMove);
                if (beta <= alpha) {
                    return bestMove;
                }
            }
            return bestMove;
        }
    };

    var evaluateBoard = function (board) {
        var totalEvaluation = 0;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i, j);
            }
        }
        return totalEvaluation;
    };

    var getPieceValue = function (piece, x, y) {
        if (piece === null) {
            return 0;
        }
        var getAbsoluteValue = function (piece, isWhite, x, y) {
            if (piece.type === 'p') {
                return 10 + (isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x]);
            } else if (piece.type === 'r') {
                return 50 + (isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x]);
            } else if (piece.type === 'n') {
                return 30 + knightEval[y][x];
            } else if (piece.type === 'b') {
                return 30 + (isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x]);
            } else if (piece.type === 'q') {
                return 90 + evalQueen[y][x];
            } else if (piece.type === 'k') {
                return 900 + (isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x]);
            }
            throw "Unknown piece type: " + piece.type;
        };

        var absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x, y);
        return piece.color === 'w' ? absoluteValue : -absoluteValue;
    };

    var onDrop = function (source, target) {
        var move = game.move({
            from: source,
            to: target,
            promotion: 'q'
        });

        if (move === null) {
            return 'snapback';
        }

        renderMoveHistory(game.history());
        window.setTimeout(makeBestMove, 250);
    };

    var makeBestMove = function () {
        var bestMove = getBestMove(game);
        if (bestMove) {
            game.ugly_move(bestMove);
            board.position(game.fen());
            renderMoveHistory(game.history());
            if (game.game_over()) {
                handleGameOver(game.in_checkmate());
            }
        }
    };

    var getBestMove = function (game) {
        if (game.game_over()) {
            return null;
        }

        var depth = parseInt(document.getElementById('search-depth').value);
        var bestMove = minimaxRoot(depth, game, true);
        return bestMove;
    };

    var renderMoveHistory = function (moves) {
        var historyElement = document.getElementById('move-history');
        historyElement.innerHTML = '';
        for (var i = 0; i < moves.length; i = i + 2) {
            historyElement.innerHTML += '<span>' + moves[i] + ' ' + (moves[i + 1] ? moves[i + 1] : ' ') + '</span><br>';
        }
        historyElement.scrollTop = historyElement.scrollHeight;
    };

    var cfg = {
        draggable: true,
        position: 'start',
        onDrop: onDrop,
        onMouseoutSquare: removeGreySquares,
        onMouseoverSquare: function (square, piece) {
            var moves = game.moves({
                square: square,
                verbose: true
            });

            if (moves.length === 0) return;

            greySquare(square);
            for (var i = 0; i < moves.length; i++) {
                greySquare(moves[i].to);
            }
        },
        onSnapEnd: function () {
            board.position(game.fen());
        }
    };

    var board = ChessBoard('board', cfg);
    showPopup();
});





//user profil update

// Function to update the user's profile photo on page load
function updateProfilePhoto() {
    const profilePhotoElements = document.querySelectorAll('.bg-center.bg-no-repeat.bg-cover');
    const savedImage = localStorage.getItem('profileImage');

    if (savedImage && profilePhotoElements.length > 0) {
        profilePhotoElements.forEach(element => {
            element.style.backgroundImage = `url('${savedImage}')`;
        });
    }
}

// Function to save a new profile photo and update it across all pages
function saveNewProfilePhoto(photoInput) {
    if (photoInput) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newImageUrl = e.target.result;
            localStorage.setItem('profileImage', newImageUrl);
            updateProfilePhoto();  // Update the photo immediately after saving
        };
        reader.readAsDataURL(photoInput);
    }
}

// Call the function when the page loads to ensure the latest photo is shown
window.onload = function() {
    updateProfilePhoto();
};
//................................................................................................................................ 


//update miney....................................................................................................

document.addEventListener('DOMContentLoaded', function () {
    const storedBalance = parseFloat(localStorage.getItem('balance')) || 1;
    document.getElementById('balance').innerText = storedBalance.toFixed(2);
});









