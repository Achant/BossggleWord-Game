(function () {

	var chosenLetters = '';

	var alphabet = "AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ";
	var letterBoxes = document.querySelectorAll(".letter")
	var ptValue = 0
	var totalPoints = 0;

	var timeLeft = 60

	function countDown() {
		timeLeft -= 1;
		document.querySelector("#timer").innerText = "0:" + timeLeft;
		if (timeLeft === -1) {
			alert("WHOOOPS Time is up !!! " + totalPoints + ".")
			location.reload();
		}
	}

	setInterval(countDown, 1000);

	function onLetterClick() {
		event.target.classList.add('selected-letter')
		chosenLetters += event.target.innerText
		ptValue = chosenLetters.length * 9;
		document.getElementById("word").innerText = chosenLetters;
	}
//reloading the board in the opening using resetBoard()
	function resetBoard() {
		for (var i = 0; i < letterBoxes.length; i++) {
			var randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];

			letterBoxes[i].innerHTML = randomLetter;
			letterBoxes[i].addEventListener('click', onLetterClick)
		}
	};

	resetBoard();

	function addWordToScoreBoard() {
		var scoreList = document.querySelector("#score-board");
		var scoreRow = document.createElement("div");
		var scoreWord = document.createElement("div");
		var scoreNumber = document.createElement("div");
		scoreRow.className += "points-row";
		scoreWord.innerHTML = chosenLetters;
		scoreNumber.innerHTML = ptValue;
		scoreList.insertBefore(scoreRow, scoreList.childNodes[0]);
		scoreRow.appendChild(scoreWord);
		scoreRow.appendChild(scoreNumber);
	}


	function submit() {
		if (chosenLetters.length >= 3) {
			if (isBasicWord(chosenLetters.toLowerCase()) === true) {
				totalPoints += ptValue;
				document.querySelector('#score').innerText = totalPoints;
				addWordToScoreBoard();
				clearSelectedWordDisplay();
			} else {
				alert("UNKOWN WORD !! not in the Bossggle dictionary.")
			}
		} else {
			alert("WORD TOO SHORT !! At least 3 letters long.");
		}
	}

	function clearSelectedWordDisplay() {
		var selectedLetters = document.querySelectorAll(".selected-letter");
		for (var i = 0; i < selectedLetters.length; i++) {
			selectedLetters[i].classList.remove("selected-letter")
		}
		document.getElementById("word").innerText = chosenLetters = '';
	}
// calling reset will reload the board
	function reset() {
		location.reload();
	}

	document.querySelector('#clear').addEventListener('click', clearSelectedWordDisplay)
	document.querySelector('#submit').addEventListener('click', submit)
	document.querySelector('#reset').addEventListener('click', reset)

})()

//thank you
