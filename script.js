const gameBoard = (() => {
    
    const _squares = document.querySelectorAll('.game-square');
    const _mainContainer = document.getElementById('divMain');

    const _placeOverlay = function() {
        const alphaScreen = document.createElement('div');
        alphaScreen.classList.add('div-transparent');
        alphaScreen.id = 'divInitScreen';
        _mainContainer.appendChild(alphaScreen);
    }

    const placeMark = function() {
        if (this.textContent !== "") {
            return;
        }
        this.textContent = gameProcess.getCurrentPlayer().mark;
        gameProcess.addMove(this.dataset.index);
        if (!gameProcess.getIsOver()) {
            setHeading();
        }
    }

    const setGameStart = function() {
        _placeOverlay();
        _createStartScreen();
    }

    const setGameOver = function(result) {

        const alphaScreen = document.getElementById('divInitScreen');
        alphaScreen.style.display = 'flex';
        const textTop = document.createElement('p');
        const textReplay = document.createElement('p');

        textReplay.classList.add('para-replay');
        textReplay.textContent = 'Play again?';
        textReplay.addEventListener('click', _handleReplay);

        alphaScreen.appendChild(textTop);
        alphaScreen.appendChild(textReplay);

        document.querySelector('.topHeading').remove();

        if (result === true) {
            textTop.textContent = `${gameProcess.getCurrentPlayer().name} has won!`;
        } else {
            textTop.textContent = 'The game was drawn.'
        }
    }

    const _handleReplay = function() {
        this.previousSibling.remove();
        this.parentElement.style.display = 'none';
        this.remove();
        _squares.forEach(el => {
            el.textContent = "";
        });
        gameProcess.resetGameState();
        setHeading();
    }

    const _createStartScreen = function() { 
        const alphaScreen = document.getElementById('divInitScreen');
        // Creating elements
        const formPlayers = document.createElement('form');
        const divFirstPlayer = document.createElement('div');
        const divSecondPlayer = document.createElement('div');
        const btnPlayGame = document.createElement('button');
        const btnContainer = document.createElement('div');

        const containerFirstPlayer = document.createElement('div');
        const containerSecondPlayer = document.createElement('div');
        const marksFirst = document.createElement('div');
        const marksSecond = document.createElement('div');
        const markOneX = document.createElement('p');
        const markOneO = document.createElement('p');
        
        const markTwoX = document.createElement('p');
        const markTwoO = document.createElement('p');

        const firstLabel = document.createElement('label');
        const secondLabel = document.createElement('label');
        const firstInput = document.createElement('input');
        const secondInput = document.createElement('input');

        // Setting element-specific attributes/parameters
        marksFirst.id = 'firstPlayerMarks';
        marksSecond.id = 'secondPlayerMarks';

        markOneX.style.textShadow = '1px 1px 2px black, 0 0 5px red, 0 0 15px red, 0 0 15px white';
        markTwoO.style.textShadow = '1px 1px 2px black, 0 0 5px red, 0 0 15px red, 0 0 15px white';

        markOneX.dataset.selected = true;
        markOneO.dataset.selected = false;
        markTwoX.dataset.selected = false;
        markTwoO.dataset.selected = true;

        markOneX.addEventListener('click', _onMarkChoiceP1);
        markOneO.addEventListener('click', _onMarkChoiceP1);
        markTwoX.addEventListener('click', _onMarkChoiceP2);
        markTwoO.addEventListener('click', _onMarkChoiceP2);


        firstLabel.setAttribute('for', 'firstPlayer');
        firstInput.setAttribute('name', 'firstPlayer');
        firstInput.setAttribute('required', '');
        firstInput.setAttribute('autocomplete', 'off');
        firstInput.setAttribute('placeholder', 'Name')
        firstInput.setAttribute('spellcheck', 'false')


        secondLabel.setAttribute('for', 'secondPlayer');
        secondInput.setAttribute('name', 'secondPlayer');
        secondInput.setAttribute('required', '');
        secondInput.setAttribute('autocomplete', 'off');
        secondInput.setAttribute('placeholder', 'Name')
        secondInput.setAttribute('spellcheck', 'false')

        firstLabel.textContent = 'Player 1:';
        secondLabel.textContent = 'Player 2:';

        markOneX.textContent = 'X';
        markOneO.textContent = 'O';

        markTwoX.textContent = 'X';
        markTwoO.textContent = 'O';

        btnPlayGame.textContent = 'Start Tic Tac Toe';
    
        // Appending elements

        marksFirst.appendChild(markOneX);
        marksFirst.appendChild(markOneO);
        
        marksSecond.appendChild(markTwoX);
        marksSecond.appendChild(markTwoO);

        containerFirstPlayer.appendChild(firstInput);
        containerFirstPlayer.appendChild(marksFirst);
        containerSecondPlayer.appendChild(secondInput);
        containerSecondPlayer.appendChild(marksSecond);

        divFirstPlayer.appendChild(firstLabel);
        divFirstPlayer.appendChild(containerFirstPlayer);

        divSecondPlayer.appendChild(secondLabel);
        divSecondPlayer.appendChild(containerSecondPlayer);

        btnContainer.appendChild(btnPlayGame);

        formPlayers.appendChild(divFirstPlayer);
        formPlayers.appendChild(divSecondPlayer);
        formPlayers.appendChild(btnContainer);

        alphaScreen.appendChild(formPlayers);

        // Starting the game
        formPlayers.addEventListener('submit', _handleStartGame);
    }

    const _onMarkChoiceP1 = function() {
        const secondMarks = document.getElementById('secondPlayerMarks');
        let elementTxtShadow = '1px 1px 2px black, 0 0 5px red, 0 0 15px red, 0 0 15px white';
        this.style.textShadow = elementTxtShadow;
        this.dataset.selected = true;

        _handleOtherMarks(this, secondMarks, elementTxtShadow);
    }

    const _onMarkChoiceP2 = function() {
        const firstMarks = document.getElementById('firstPlayerMarks');
        let elementTxtShadow = '1px 1px 2px black, 0 0 5px red, 0 0 15px red, 0 0 15px white';
        this.style.textShadow = elementTxtShadow;
        this.dataset.selected = true;

        _handleOtherMarks(this, firstMarks, elementTxtShadow);
    }

    const _handleOtherMarks = function(el, otherMarks, shadow) {
        if (el.textContent === 'X') {
            el.nextSibling.style.textShadow = '';
            el.nextSibling.dataset.selected = false;
            otherMarks.lastChild.style.textShadow = shadow;
            otherMarks.lastChild.dataset.selected = true;
            otherMarks.firstChild.style.textShadow = '';
            otherMarks.firstChild.dataset.selected = false;
        } else {
            el.previousSibling.style.textShadow = '';
            el.previousSibling.dataset.selected = false;
            otherMarks.firstChild.style.textShadow = shadow;
            otherMarks.firstChild.dataset.selected = true;
            otherMarks.lastChild.style.textShadow = '';
            otherMarks.lastChild.dataset.selected = false;
        }
    }

    const _handleStartGame = function(e) {
        e.preventDefault();
        const firstMarks = document.getElementById('firstPlayerMarks');
        const secondMarks = document.getElementById('secondPlayerMarks');

        let firstPlayerName = firstMarks.parentElement.firstChild.value;
        let secondPlayerName = secondMarks.parentElement.firstChild.value;

        let firstMark;
        let secondMark;

        firstMarks.childNodes.forEach(node => {
            if (node.dataset.selected === "true") { 
                firstMark = node.textContent;
            } 
        });

        secondMarks.childNodes.forEach(node => {
            if (node.dataset.selected === "true") { 
                secondMark = node.textContent;
            } 
        });

        const alphaScreen = document.getElementById('divInitScreen');
        const formCont = document.querySelector('form');

        gameProcess.startGame(firstPlayerName, secondPlayerName, firstMark, secondMark);
        alphaScreen.style.display = 'none';
        alphaScreen.removeChild(formCont);
    }

    const setHeading = function() {
        if (!document.querySelector('.topHeading')) {
            const heading = document.createElement('h1');
            heading.classList.add('topHeading');
            _mainContainer.parentElement.appendChild(heading);
        }

        let turn = gameProcess.getPlayerTurn();
        let player = gameProcess.getCurrentPlayer();

        document.querySelector('.topHeading').textContent = `${player.name}'s turn. Mark: ${player.mark}`;

        if (turn) {
            document.querySelector('.topHeading').style.color = "rgb(23, 175, 23)";
        } else {
            document.querySelector('.topHeading').style.color = "rgb(150, 13, 13)";
        }

    }


    _squares.forEach(el => {
        el.addEventListener('click', placeMark)
    })


    return { placeMark, setGameOver, setGameStart, setHeading }

})();


const gameProcess = (() => {
    let currentBoard = ["", "", "", "", "", "", "", "", ""];
    let playerArray = [];
    let playerTurn = 0;
    let isOver = 0;

    const startGame = function(nameOne, nameTwo, markOne, markTwo) {
        let playerOne = playerFactory(nameOne, markOne);
        let playerTwo = playerFactory(nameTwo, markTwo);
        
        _pushPlayer(playerOne, playerTwo);
        gameBoard.setHeading();
    }

    const resetGameState = function() {
        currentBoard = ["", "", "", "", "", "", "", "", ""];
        playerTurn === 1 ? 0 : 1;
        isOver = 0;
    }

    const getPlayerTurn = function() {
        return playerTurn;
    }

    const getIsOver = () => isOver;

    const _pushPlayer = function(...players) {
        playerArray = players;
    }

    const getCurrentPlayer = function() {
        return playerArray[playerTurn];
    }

    const _nextTurn = function() {
        playerTurn === 0 ? playerTurn = 1 : playerTurn = 0;
    }

    const addMove = function(index) {
        currentBoard[index] = playerArray[playerTurn].mark;
        _checkForResult();
        _nextTurn();
    }

    const _checkForResult = function() {
        let winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        if (winPatterns.some(_checkPatterns)) {
            isOver = 1;
            gameBoard.setGameOver(true);
        } else if (currentBoard.filter(el => {return el === ''}).length === 0) {
            isOver = 1;
            gameBoard.setGameOver(false);
        }
    }

    const _checkPatterns = function(pattern) {
        let [i, j, k] = pattern;
        if (currentBoard[i] !== '' && 
        (currentBoard[i] === currentBoard[j]) && 
        (currentBoard[j] === currentBoard[k])) {
            return true;
        }
    }
    
    return { getCurrentPlayer, addMove, startGame, resetGameState, getPlayerTurn, getIsOver }
})();

const playerFactory = (name, mark) => {

    return { name, mark }
}

gameBoard.setGameStart();