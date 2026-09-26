(function() {
	
	// DOM ELEMENTS
	const gameFrame = document.querySelector('.game');
	const gameTable = document.querySelector('#game-table');
	const DOMLevel = document.querySelectorAll('.level-number');
	const DOMMinutes = document.querySelector('#minutes');
	const DOMSeconds = document.querySelector('#seconds');
	const DOMMatches = document.querySelector('#matches');
	const DOMCurrentMoves = document.querySelector('#currentMoves');
	const DOMMaxMoves = document.querySelector('#maxMoves');
	const DOMLostScreen = document.querySelector('#lost');
	const DOMWinScreen = document.querySelector('#win');
	const DOMVictoryScreen = document.querySelector('.victory')
	const DOMCardsPerLevel = document.querySelectorAll('.all-level-cards');
	const DOMTotalMinutes = document.querySelector('#total-minutes');
	const DOMTotalSeconds = document.querySelector('#total-seconds');
	const DOMBestCombo = document.querySelector('#best-combo');
	const DOMFailStreak = document.querySelector('#fail-streak');
	
	// DOM BUTTONS
	const playButton = document.querySelector('.main-play_button');
	const levelButtons = document.querySelectorAll('.levels-select');
	const hoverButtons = document.querySelectorAll('.main-play_button, .main-explore_button, .levels-select, .result-button, .footer-media_link');
	const restartButton = document.querySelectorAll('.restart-icon');
	const quitButton = document.querySelectorAll('.quit-icon');
	const nextLevelButton = document.querySelector('#next_level-button');

	// DOM SOUNDS
	const hoverSound = document.querySelector('#hover-sound');
	const clickSound = document.querySelector('#click-sound');
	const flipSound = document.querySelector('#flip-sound');
	const hoverCardSound = document.querySelector('#hoverCard-sound');
	const quitGameSound = document.querySelector('#quitGame-sound');
	const restartGameSound = document.querySelector('#restartGame-sound');
	const compareSuccessSound = document.querySelector('#compareSuccess-sound');
	const compareErrorSound = document.querySelector('#compareError-sound');
	const winSound = document.querySelector('#win-sound');
	const loseSound = document.querySelector('#lose-sound');

	// GLOBAL VARS
	let maxMoves;
	let currentMoves = 0;
	let matches = 0;
	let allCards = [];
	let timer;
	let totalTimer;
	let minutes;
	let seconds;
	let totalMinutes;
	let totalSeconds;
	let cardsLocked = false;
	let currentCombo = 0;
	let bestCombo = 0;
	let currentFail = 0;
	let failStreak = 0;

	let group1 = [];
	let group2 = [];
	const imagesBg = [];

	function preload(...imagePaths) {
		imagePaths.forEach((path) => {
			const image = new Image();
			image.src = path;
			imagesBg.push(image);
		});
	}

	preload(
		"../SVGs/card-back.svg",
		"../SVGs/symbol-1.svg",
		"../SVGs/symbol-2.svg",
		"../SVGs/symbol-3.svg",
		"../SVGs/symbol-4.svg",
		"../SVGs/symbol-5.svg",
		"../SVGs/symbol-6.svg",
		"../SVGs/symbol-7.svg",
		"../SVGs/symbol-8.svg",
		"../SVGs/symbol-9.svg",
		"../SVGs/symbol-10.svg",
		"../SVGs/symbol-11.svg",
		"../SVGs/symbol-12.svg",
		"../SVGs/symbol-13.svg",
		"../SVGs/symbol-14.svg",
		"../SVGs/symbol-15.svg"
	);


	// GAME START EVENTS
	playButton.addEventListener('click', startGame);
	nextLevelButton.addEventListener('click', startGame);
	levelButtons.forEach((button) => {
		button.addEventListener('click', () => startSelectedLevel(Number(button.dataset.level)));
	});


	// SOUNDS
	hoverSound.volume = 0.2;
	clickSound.volume = 0.2;
	hoverCardSound.volume = 0.03;
	flipSound.volume = 0.4;
	quitGameSound.volume = 0.3;
	restartGameSound.volume = 0.4;
	compareSuccessSound.volume = 0.2;
	compareErrorSound.volume = 0.3;
	loseSound.volume = 0.3;
	winSound.volume = 0.3;

	hoverButtons.forEach((button) => {
		button.addEventListener('mouseenter', () => {
			hoverSound.currentTime = 0;
			hoverSound.play().catch(() => {});
		});
		button.addEventListener('click', () => {
			clickSound.currentTime = 0;
			clickSound.play().catch(() => {});
		});
	});

	quitButton.forEach((button) => {
		button.addEventListener('mouseenter', () => {
			hoverSound.currentTime = 0;
			hoverSound.play().catch(() => {});
		});
		button.addEventListener('click', () => {
			quitGameSound.currentTime = 0;
			quitGameSound.play().catch(() => {});
			quitGame()
		});
	});

	restartButton.forEach((button) => {
		button.addEventListener('mouseenter', () => {
			hoverSound.currentTime = 0;
			hoverSound.play().catch(() => {});
		});
		button.addEventListener('click', () => {
			restartGameSound.currentTime = 0;
			restartGameSound.play().catch(() => {});
			restartGame()
		});
	});

	function cardSound() {
		const card = document.querySelectorAll('.card')

		card.forEach((card) => {
			card.addEventListener('mouseenter', () => {
				hoverCardSound.currentTime = 0;
				hoverCardSound.play().catch(() => {});
			})
			card.addEventListener('click', () => {
				if(!cardsLocked) {
					flipSound.currentTime = 0;
					flipSound.play().catch(() => {});
				}
			})
		})
	}


	// START GAME
	function startGame() {
		gameTable.innerHTML = "";

		if(DOMWinScreen.classList[1] !== 'show') {
			firstLevelRules()
			gameFrame.classList.add('show');
			document.body.classList.add('game-open');
		} else {
			nextLevelRules()
			gameFrame.classList.add('show');
			DOMWinScreen.classList.remove('show')
		}

		createCards();
		deadCards();
		if (level === 1) {
			startTotalTimer();
		}
	}

	function startSelectedLevel(selectedLevel) {
		clearInterval(timer);
		clearInterval(totalTimer);
		gameTable.innerHTML = "";
		firstLevelRules(selectedLevel);
		DOMLostScreen.classList.remove('show');
		DOMWinScreen.classList.remove('show');
		DOMVictoryScreen.classList.remove('show');
		gameFrame.classList.add('show');
		document.body.classList.add('game-open');
		createCards();
		deadCards();
		startTotalTimer();
	}

	// LEVELS RULES
	function firstLevelRules(selectedLevel = 1) {
		level = selectedLevel;
		minutes = 0;
		seconds = 0;
		totalMinutes = 0;
		totalSeconds = 0;
		numCards = level + 1;
		maxMoves = level * 3;
		currentMoves = 0;
		matches = 0;
		group1 = [];
		group2 = [];
		allCards = [];
		DOMTotalMinutes.innerHTML = '00';
		DOMTotalSeconds.innerHTML = '00';
	}
	function nextLevelRules() {
		level++;
		minutes = 0;
		seconds = 0;
		numCards++;
		maxMoves = maxMoves + 3;
		matches = 0
		currentMoves = 0
	}

	// CREATE CARDS
	function createCards() {
		for(let i = 0; i < numCards; i++) {
			group1[i] = document.createElement('img');
			group1[i].src = `../SVGs/symbol-${i+1}.svg`;
		}

		for(let i = 0; i < numCards; i++) {
			group2[i] = document.createElement('img');
			group2[i].src = `../SVGs/symbol-${i+1}.svg`;
		}

		allCards = group1.concat(group2);
	}

	// SHUFFLE CARDS
	function shuffleCards() {
		let result = allCards.sort( () => 0.5 - Math.random());
		return result;
	}

	// DEAL CARDS
	function deadCards() {
		let shuffledCards = shuffleCards();

		shuffledCards.forEach(frontSide => {
			let card = document.createElement("div");

			let cardBack = document.createElement('img');
			cardBack.src = "../SVGs/card-back.svg";
			cardBack.draggable = false;
			frontSide.draggable = false;

			card.classList.add("card");

			card.innerHTML =
			"<div class='front'>" + "</div>" +
			"<div class='back'>" + "</div>"

			gameTable.appendChild(card);
			
			let back = document.querySelectorAll(".back");
			back.forEach( e => {
				e.appendChild(cardBack);
			})

			let front = document.querySelectorAll(".front");
			front.forEach( e => {
				e.appendChild(frontSide);
			})
		})
		
		card = document.querySelectorAll('.card')
		card.forEach(function(e) {
			e.addEventListener('click', show);
		})

		cardSound();
		startTimer();
		dinamicDOM()
	}

	// DOM UPDATE
	function dinamicDOM() {
		const currentDOMCards = document.querySelectorAll('.card').length;

		DOMMaxMoves.innerHTML = maxMoves;
		DOMCurrentMoves.innerHTML = currentMoves;
		DOMMatches.innerHTML = matches;

		DOMLevel.forEach( e => {
			e.innerHTML = level;
		})

		DOMCardsPerLevel.forEach( e => {
			e.innerHTML = currentDOMCards
		})
	}

	// CARD INTERACTION
	function show() {
		if(cardsLocked) {
			return
		}

		this.classList.add('shown')
		shownCards = document.querySelectorAll('.shown')
		
		if(shownCards.length === 2) {
			compare(shownCards)
		}
	}

	// COMPARE 2 CARDS
	function compare() {
		cardsLocked = true;
		compareSuccessSound.volume = 0.2
		compareErrorSound.volume = 0.3

		const cardShown1 = shownCards[0].querySelector('.front img').getAttribute('src');
		const cardShown2 = shownCards[1].querySelector('.front img').getAttribute('src');

		currentMoves++;
		DOMCurrentMoves.innerHTML = currentMoves;
		
		if(cardShown1 === cardShown2) {
			matches++;
			DOMMatches.innerHTML = matches;

			updateStats(true);
			
			shownCards.forEach( card => {
				card.classList.add('success')
			})
			
			const remainingCards = document.querySelectorAll('.card:not(.success)');
			let matchesToWin = remainingCards.length / 2;
			let movesRemaining = maxMoves - currentMoves;

			if(movesRemaining < matchesToWin) {
				lostGame()
			}

			if(matchesToWin === 0) {
				successfulCards = document.querySelectorAll('.success')
				if(successfulCards.length === 30) {
					victory()
				} else {
					wonGame()
				}
			}

			compareSuccessSound.currentTime = 0;
			compareSuccessSound.play().catch(() => {});
		} else {
			const remainingCards = document.querySelectorAll('.card:not(.success)');
			let matchesToWin = remainingCards.length / 2;
			let movesRemaining = maxMoves - currentMoves;

			updateStats(false);

			if(movesRemaining < matchesToWin) {
				lostGame()
			}

			compareErrorSound.currentTime = 0;
			compareErrorSound.play().catch(() => {});
		}

		setTimeout(() => {
			shownCards.forEach(shownCard => {
				shownCard.classList.remove('shown');
			})
			cardsLocked = false;
		}, 500);
	}

	// LOSING LEVEL SCREEN
	function lostGame() {
		compareSuccessSound.volume = 0;
		compareErrorSound.volume = 0;
		loseSound.currentTime = 0;
		loseSound.play().catch(() => {});
		cardsLocked = false;
		clearInterval(timer);
		clearInterval(totalTimer);

		gameFrame.classList.remove('show');
		DOMLostScreen.classList.add('show');
	}

	// WINNING LEVEL SCREEN
	function wonGame() {
		compareSuccessSound.volume = 0;
		winSound.currentTime = 0;
		winSound.play().catch(() => {});
		cardsLocked = false;
		clearInterval(timer);

		gameFrame.classList.remove('show');
		DOMWinScreen.classList.add('show');
	}

	// VICTORY SCREEN
	function victory() {
		compareSuccessSound.volume = 0;
		winSound.currentTime = 0;
		winSound.play().catch(() => {});
		cardsLocked = false;
		clearInterval(timer);
		clearInterval(totalTimer);

		gameFrame.classList.remove('show');
		DOMVictoryScreen.classList.add('show');
	}

	// UPDATE TOTAL STATS
	function updateStats(isMatch) {
		if(isMatch) {
			currentCombo++;
			currentFail = 0

			if (currentCombo > bestCombo) {
				bestCombo = currentCombo;
			}
		} else {
			currentFail++
			currentCombo = 0;

			if(currentFail > failStreak) {
				failStreak = currentFail
			}
		}

		DOMBestCombo.innerHTML = bestCombo;
		DOMFailStreak.innerHTML = failStreak;
	}

	// START every LEVEL TIMER
	function startTimer() {
		seconds = 0
		minutes = 0

		function updateTimer() {
			seconds++
			
			if(seconds < 10) {
				DOMSeconds.innerHTML = `0${seconds}`
			} else {
				DOMSeconds.innerHTML = seconds
			}

			if(seconds == 60) {
				seconds = 0
				minutes++
				DOMSeconds.innerHTML = `0${seconds}`
				
				if(minutes < 10) {
					DOMMinutes.innerHTML = `0${minutes}`
				} else {
					DOMMinutes.innerHTML = minutes
				}
			}
		}
		timer = setInterval(updateTimer, 1000);
	}

	// START GLOBAL TIMER
	function startTotalTimer() {
		clearInterval(totalTimer);

		function updateTotalTimer() {
			totalSeconds++;

			if (totalSeconds === 60) {
				totalSeconds = 0;
				totalMinutes++;
			}

			DOMTotalMinutes.innerHTML = totalMinutes < 10 ? `0${totalMinutes}` : totalMinutes;
			DOMTotalSeconds.innerHTML = totalSeconds < 10 ? `0${totalSeconds}` : totalSeconds;
		}

		totalTimer = setInterval(updateTotalTimer, 1000);
	}

	// QUIT GAME INTERACTION
	function quitGame() {
		level = 1
		seconds = 0
		minutes = 0
		matches = 0
		currentMoves = 0
		maxMoves = 3
		currentCombo = 0;
		bestCombo = 0;
		failStreak = 0;
		DOMSeconds.innerHTML = `0${seconds}`
		DOMMinutes.innerHTML = `0${minutes}`
		DOMMatches.innerHTML = matches
		DOMCurrentMoves.innerHTML = currentMoves
		DOMMaxMoves.innerHTML = maxMoves

		clearInterval(timer)
		clearInterval(totalTimer)

		if(gameFrame.classList[1] !== "show") {
			if(DOMLostScreen.classList[1] === 'show') {
				DOMLostScreen.classList.remove('show');
			} else if(DOMWinScreen.classList[1] === 'show') {
				DOMWinScreen.classList.remove('show');
			} else {
				DOMVictoryScreen.classList.remove('show');
			}
			document.body.classList.remove('game-open');
		} else {
			gameFrame.classList.remove('show');
			document.body.classList.remove('game-open');
		}
	}

	// RESTART GAME INTERACTION
	function restartGame() {
		gameTable.innerHTML = "";
		seconds = 0
		minutes = 0
		matches = 0
		currentMoves = 0
		currentCombo = 0;
		bestCombo = 0;
		failStreak = 0;
		DOMSeconds.innerHTML = `0${seconds}`
		DOMMinutes.innerHTML = `0${minutes}`
		DOMMatches.innerHTML = matches
		DOMCurrentMoves.innerHTML = currentMoves

		clearInterval(timer)
		clearInterval(totalTimer)

		if(gameFrame.classList[1] !== "show") {
			if(DOMLostScreen.classList[1] === 'show') {
				DOMLostScreen.classList.remove('show');
			} else if(DOMWinScreen.classList[1] === 'show') {
				DOMWinScreen.classList.remove('show');
			} else {
				firstLevelRules()
				DOMVictoryScreen.classList.remove('show');
			}
			
			gameFrame.classList.add('show');
			document.body.classList.add('game-open');
		}
		createCards()
		deadCards()
		totalMinutes = 0;
		totalSeconds = 0;
		DOMTotalMinutes.innerHTML = '00';
		DOMTotalSeconds.innerHTML = '00';
		startTotalTimer();
	}
})();