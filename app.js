//Game rules
alert('GAME RULES:\n' +
    '\n' +
    '- The game has 2 players, playing in rounds\n' +
    '- In each turn, a player rolls two dices as many times as he or she wishes. Each result get added to his/her ROUND score\n' +
    '- BUT, if the player rolls and both dices are "LOSING DICE SCORE", all his/her TOTAL score gets lost. After that, it\'s the next player\'s turn\n' +
    '- If the player rolls and one of two dices is "LOSING DICE SCORE", he/she get no scores and it\'s the next player\'s turn\n' +
    '- The player can choose to \'Hold\', which means that his ROUND score gets added to his TOTAL score. After that, it\'s the next player\'s turn\n' +
    '- The first player to reach the "FINAL SCORE" on TOTAL score wins the game\n'+
    '- You can customize "FINAL SCORE" and "LOSING DICE SCORE". The default "FINAL SCORE" is 100 and default "LOSING DICE SCORE" is 6');

//Variables
var scores, roundScore, activePlayer, gamePlaying;
var lastDice1, lastDice2, loseScore;
//Start game
init();

// Roll dice button
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        //Erase lose turn statement
        document.getElementById('lose-turn-0').style.display = 'none';
        document.getElementById('lose-turn-1').style.display = 'none';
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        var losingScore = document.querySelector('.lose-score').value;
        //Default losing dice score is 6
        if (losingScore){
            loseScore = losingScore
        } else {
            loseScore = 6;
        }

        if ((dice1 == loseScore) && (dice2 == loseScore)) {
            //Player looses total score
            lastDice1 = dice1;
            lastDice2 = dice2;
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            // Announce turn change
            document.getElementById('lose-turn-' + activePlayer).style.display = 'block';
            nextPlayer();
        } else if(dice1 == loseScore || dice2 == loseScore) {
            //Player loses round score
            lastDice1 = dice1;
            lastDice2 = dice2;
            // Announce turn change
            document.getElementById('lose-turn-' + activePlayer).style.display = 'block';
            nextPlayer();
        } else {
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        lastDice1 = dice1;
        lastDice2 = dice2;
    }
});

//Hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //Clear statements
        document.getElementById('lose-turn-0').style.display = 'none';
        document.getElementById('lose-turn-1').style.display = 'none';
        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';
        // Add CURRENT score to total score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;

        // Default winning score is 100
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'You Won!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

//Next player turn
function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').src = 'dice-' + lastDice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + lastDice2 + '.png';
}

document.querySelector('.btn-new').addEventListener('click', init);

//New game function
function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('lose-turn-0').style.display = 'none';
    document.getElementById('lose-turn-1').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}