/////////////////////////
// CACHED DOM ELEMENTS //
/////////////////////////

/// MAIN PAGE VARS ///
const introDiv = document.getElementById('intro');

const setImg = document.getElementById('set-img');
const openingModalDiv = document.getElementById('opening-modal-div');
const openingModalButton = document.getElementById('opening-modal-button');

const mirrorMain = document.getElementById('mirror');
const mirrorWorldSection = document.getElementById('mirrorworld');
const narratorDiv = document.getElementById('narrator-div');
const dialogueDiv = document.getElementById('dialogue-div');
const decisionDiv = document.getElementById('decision-div');
const yesButton = document.getElementById('yes');
const noButton = document.getElementById('no');
const advanceButton = document.getElementById('advance-button');
const statsDiv = document.getElementById('stats-div');
const characterDiv = document.getElementById('character-div');
const characterImg = document.getElementById('character');
const mirrorBkg = document.getElementById('mirror-bkg');
const mirrorWorldImge = document.getElementById('mirrorworld-img');

/// STAT VARS ///
const sanityStat = document.getElementById('sanity-stat');
const accuracyStat = document.getElementById('accuracy-stat');
const powerStat = document.getElementById('power-stat');
const shieldingStat = document.getElementById('shielding-stat');


/// MINI GAME VARS ///
const modalBkg = document.getElementById('modal-bkg');
const minigameWindow = document.getElementById('minigame-window');
const minigameKnowledge = document.getElementById('minigame-knowledge');
const minigameText = document.getElementById('minigame-text');
const minigameSubmit = document.getElementById('minigame-submit');
const minigameNext = document.getElementById('minigame-next');
const minigameInput = document.getElementById('minigame-input');
const minigameControls = document.getElementById('minigame-controls');
const textWarning = document.getElementById('text-warning');
const h1 = document.getElementById('minigame-h1')
const h2 = document.getElementById('minigame-h2')
const h3 = document.getElementById('minigame-h3')
const p = document.getElementById('minigame-p')
const h1Wu = document.createElement('h1');
const h2Wu = document.createElement('h2');
const h3Wu = document.createElement('h3');
const pWu = document.createElement('p');
const weaponUpgradeModal = document.getElementById('weapon-upgrade-div');
const accuracyButton = document.getElementById('accuracy-button');
const powerButton = document.getElementById('power-button');
const shieldingButton = document.getElementById('shielding-button');
const tokenSpan = document.getElementById('upgrade-token-count');

/// REFLEX MINI GAME VARS ///
const startButton = document.createElement('button');
minigameKnowledge.appendChild(startButton);
startButton.classList.toggle('hidden');
let startTime = null;
let endTime = null;
let timing = null;

/// FINAL BATTLE VARS ///
const battleMirror = document.getElementById('battle-mirror');
const h1Final = document.getElementById('h1-final');
const h2Final = document.getElementById('h2-final');
const h3Final = document.getElementById('h3-final');
const pFinal = document.getElementById('p-final');
const attackStats = document.getElementById('attack-stats');
const attackButton = document.getElementById('attack');
const battleSanityStat = document.getElementById("battle-sanity-stat");
const battleAccuracyStat = document.getElementById("battle-accuracy-stat");
const battlePowerStat = document.getElementById("battle-power-stat");
const battleShieldingStat = document.getElementById("battle-shielding-stat");

/////////////////
// GLOBAL VARS //
/////////////////
let correctAnswers = 0;
let decisionResult = null;
let storyCounter = 0;
let randomHit = null;
let upgradeDecisions = {
	accuracy: 0,
	power: 0,
	shielding: 0
};

class User {
	constructor() {
		this.sanity = 25;
		this.accuracy = null;
		this.power = null;
		this.shielding = null;
		this.upgradeTokens = 0;
	}
	gainSanity(num) {
		this.sanity += num;
		sanityStat.innerText = this.sanity;
	}
	loseSanity(num) {
		this.sanity -= num;
		sanityStat.innerText = this.sanity;
	}
	generateRefractor() {
		this.accuracy = randomNumberRange(15,18);
		this.power = randomNumberRange(15,18);
		this.shielding = randomNumberRange(10,14);
		accuracyStat.innerText = this.accuracy;
		powerStat.innerText = this.power;
		shieldingStat.innerText = this.shielding;
	}
	upgradeRefractor(feature) {
		switch (feature) {
			case 'accuracy': 	this.accuracy += 1;
								accuracyStat.innerText = this.accuracy;
								user.upgradeTokens--
								break;
			case 'power':		this.power += 1;
								powerStat.innerText = this.power;
								user.upgradeTokens--
								break;
			case 'shielding':	this.shielding += 1;
								shieldingStat.innerText = this.shielding;
								user.upgradeTokens--
								break;
		}
	}
	attack(opponent) {
		randomHit = randomNumberRange(0,20);
		if (randomHit < this.accuracy) {
			// hit
			opponent.sanity = opponent.sanity - this.power + (opponent.shielding / 2);
			console.log(user.sanity);
			if (opponent.shielding > 4) {
				opponent.shielding -= 4;
			} else {
				opponent.shielding = 0;
			}
			return 1;
		} else {
			return 0;
		}
	}
}

const user = new User();
const temis = new User();
temis.generateRefractor();



const correctResponses = [
	'"A lucky guess."',
	'"Well done."',
	'"That is the correct answer."'
]

const incorrectResponses = [
	'"No, I’m afraid that’s not correct. I’ll have some of your Sanity now."',
	'"Sorry, that’s not right. That’s going to cost you some Sanity."',
	'"Nope, that\'s not it."'
]

const triviaQuestions = [
	'"Which day of the week is named after the Norse god of Thunder?"',
	'"Which American state is the largest?"',
	'"What is the "lead" in a pencil actually made of?"'
]

const triviaAnswers = [
	'thursday',
	'alaska'	,
	'graphite'
]

const riddlesQuestions = [
	'You cannot keep me until you have given me. What am I?',
	'What goes all the way around the world but stays in a corner?',
	'I’m the rare case when today comes before yesterday. What am I?',
	'What gets bigger the more you take away?',
	'What has four fingers and a thumb, but isn’t alive?'
]

const riddleAnswers = [
	'word',
	'stamp',
	'dictionary',
	'hole',
	'glove'
]

const narrator = [
	"The best place for all good stories to start is the beginning, without frills or fanfare. Pomp or circumstance.",
	"Not many things have as little to-do as waking up in the morning. But, on this day, you would be wrong to think that.",
	"You wake up feeling a bit groggy, like you didn't sleep quite right.",
	"You walk to the bathroom to wash your face.",
	"You gaze into the mirror wearily and realize the medicine cabinet is slightly ajar. You reach out to correct it.",
	"You stand, frozen in place unable to move, staring through your mirror which now reveals an entire world on the other side. A different world.",
	"You notice a person, disheveled. As they speak to you, you come to realize something is off with them. They seem...gone.",
	"You have received a RefractiveCanon.",
	"You notice on the side of the device a display panel reading three settings.",
	"You set out to explore the area, but in this place, you explore with your mind, not your body.",
	"It didn’t take long to run into another inhabitant of this place. He seemed friendly enough, but there was a darkness about him, like he carried the weight of an unwanted burden.",
	"He sounds like a high school teacher I once had.<BR />Feeling that you really should take this opportunity to upgrade your Refractor, you accept the man’s offer.",
	"Making your way further down into this mirror world, you come across a woman. She looks like she has something urgent.",
	"You progress further on your journey. As you approach the mirrored gates of a large palace, you come to a pass.",
	"Standing next to the path leading to the palace, is a man of short-stature. He moves to block your path.",
	"You received a token from the man",
	"You enter the palace.",
	"Awaiting you inside the grand hall sits a shadowy figure dressed in long, sleek silver robes.",
	"You think it better not to say anything.",
	"Fun, indeed.",
	"Pretending? What are they talking about?",
	"A new day begins. You wash your face."
]

const dialogue = [
	"Has a lot been on your mind lately?",
	"Sometimes you need to slow down a bit. You can only handle so much.",
	"Well, even the most at-rest minds needs a good night of sleep, which you certainly did not get last night.",
	"I’d tell you turn back now if that were an option. Unfortunately for you, it is not.",
	"If you’re going to make it through this, you’re going to need something to protect yourself incase...incase...",
	"You’ll have to excuse me. I’m no longer myself. —incase you run into…trouble. Take this.",
	"May it bring you better luck than it did me. There are some folk here that may be able to give it a bit more oompf, but they’ll ask for something in return… Watch your Sanity. It goes quick here. So long.",
	"Hey! You!  My name is Kristoff. Nice refractor you got there. I can make it even better, but you see, I have this one small request. You must play a game with me.",
	"I love knowledge. I’m going to ask you three questions, and if you know the answers, I’ll help you out. If you get the answers wrong, well, I might just have to take some of that Sanity of yours.",
	"Excellent! Now, your three questions.",
	"You made it through my game. As promised, I will upgrade your Refractor based on how many correct answers you gave me. Assign the upgrades as you see fit...",
	"Excuse me, could you help me?",
	"Thank you so much. My name is Kendra and someone named Kristoff took something from me of value. In order to get it back, I have to answer three riddles, but I'm terrible at riddles. Please help me answer these...",
	"Thanks for your help. I sure hope these are correct...Take this for your trouble. You should be able to find somewhere to use it.",
	"Okay. Thanks for listening.",
	"You can't go this way! Not unless you pass my test of speed and skill. Only then will I let you by. I have a special prize for you if you win: an upgrade token for that dingy canon you're carrying. Let's play.",
	"Congratulations. You may pass. Here is that token I promised you.",
	`Hey! It's me, Kendra! Remember? Turns out you got ${correctAnswers} of those riddles correct. Take a one Sanity point from me for each correct answer. You earned it! Thanks again.`,
	"Welcome to my palace and my realm. I am Temis, ruler of this place.",
	"I suppose you came here to battle to earn a chance to leave the Mirror Realm. Okay, I will oblige your request, however everything you think you can do, I can do better. I'm smarter. I'm faster. You will NEVER win.",
	"In fact, all along your pathetic journey here, I followed every decision you made but my path mirrored your own. That is to say, I chose the opposite of what you did each and every time! This is going to be fun!",
	"Oh, I'm so glad that's over. It's EXHAUSTING pretending to be so mean.",
	"Look, I'm you and you're me. It's the mirror realm, get it?",
	"You're stuck in one of your daydreams again. Standing in front of a mirror or not, stop letting the voice in your head paralyze you.\n\nWAKE UP!",
]

///////////////
// FUNCTIONS //
///////////////

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
};
function randomNumber(num) {
	return Math.floor(Math.random() * num);
}
function randomNumberRange(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
  }  
function knowledgeMiniGame() {	
	// setup the DOM
	modalBkg.style.backgroundColor = 'rgba(17, 0, 71, 0.678)'
	modalBkg.classList.toggle('hidden');
	minigameWindow.classList.toggle('hidden');
	minigameKnowledge.classList.toggle('hidden');

	const questions = [...triviaQuestions]
	const answers = [...triviaAnswers]
	
	h1.innerText = 'Let\'s see what ya got, kid.';
	let randomChoice = null;
	console.log('question 1 started')
	randomChoice = randomNumber(questions.length);
	h2.innerText = `Question 1`
	h3.innerText = questions[randomChoice];
	minigameSubmit.onclick = () => {
		minigameNext.classList.toggle('hidden')
		minigameSubmit.classList.toggle('hidden')
		minigameInput.classList.toggle('hidden')
		p.innerText = '';
		let answer = minigameInput.value.toLowerCase();
		minigameInput.value = '';
		if (answer === answers[randomChoice]) {
			h2.innerText = 'Correct!'
			correctAnswers++;
		} else {
			h2.innerText = 'Incorrect!';
			user.loseSanity(1);
		};
		minigameNext.onclick = () => {
			minigameNext.classList.toggle('hidden')
			minigameSubmit.classList.toggle('hidden')
			minigameInput.classList.toggle('hidden')	
			questions.splice(randomChoice,1);
			answers.splice(randomChoice,1);
			console.log('question 2 started')
			randomChoice = randomNumber(questions.length);
			h2.innerText = `Question 2`
			h3.innerText = questions[randomChoice];
			minigameSubmit.onclick = () => {
				minigameNext.classList.toggle('hidden')
				minigameSubmit.classList.toggle('hidden')
				minigameInput.classList.toggle('hidden')
				p.innerText = '';
				answer = minigameInput.value.toLowerCase();
				minigameInput.value = '';
				if (answer === answers[randomChoice]) {
					h2.innerText = 'Correct!'
					correctAnswers++;
				} else {
					h2.innerText = 'Incorrect!';
					user.loseSanity(1);
				};
				minigameNext.onclick = () => {
					minigameNext.classList.toggle('hidden')
					minigameSubmit.classList.toggle('hidden')
					minigameInput.classList.toggle('hidden')
					questions.splice(randomChoice,1);
					answers.splice(randomChoice,1);
					console.log('question 3 started')
					h2.innerText = `Question 3`
					h3.innerText = questions[0];
					minigameSubmit.onclick = () => {
						minigameNext.classList.toggle('hidden')
						minigameSubmit.classList.toggle('hidden')
						minigameInput.classList.toggle('hidden')
						p.innerText = '';
						answer = minigameInput.value.toLowerCase();
						minigameInput.value = '';
						if (answer === answers[0]) {
							h2.innerText = 'Correct!'
							correctAnswers++;
						} else {
							h2.innerText = 'Incorrect!';
							user.loseSanity(1);
						}
						minigameNext.innerText = `Close`;
						minigameNext.onclick = () => {
							minigameNext.innerText = `Next`;
							minigameKnowledge.classList.toggle('hidden');
							minigameWindow.classList.toggle('hidden');
							modalBkg.classList.toggle('hidden');
							user.upgradeTokens = correctAnswers;
							tokenSpan.innerText = user.upgradeTokens;
							h1.innerText = '';
							h2.innerText = '';
							h3.innerText = '';
							p.innerText = '';
							correctAnswers = 0;
							storyCounter++
							console.log('Knowledge Game Complete');
							rollGame();
							return;
						}
					}
				}
			}
		}
	}
}

function weaponUpgrade() {
	console.log('weapon upgrade began')	
	// Module
	if (user.upgradeTokens > 0) {
		accuracyButton.onclick = () => {
			user.upgradeRefractor('accuracy');
			upgradeDecisions.accuracy++;
			tokenSpan.innerText = user.upgradeTokens;
			weaponUpgrade()
		}
		powerButton.onclick = () => {
			user.upgradeRefractor('power');
			upgradeDecisions.power++;
			tokenSpan.innerText = user.upgradeTokens;
			weaponUpgrade()
		}
		shieldingButton.onclick = () => {
			user.upgradeRefractor('shielding');
			upgradeDecisions.shielding++;
			tokenSpan.innerText = user.upgradeTokens;	
			weaponUpgrade()
		}

	} else {
		accuracyButton.classList.toggle('hidden');
		shieldingButton.classList.toggle('hidden');
		powerButton.innerText = 'CLOSE';
		powerButton.onclick = () => {
			modalBkg.classList.toggle('hidden');
			minigameWindow.classList.toggle('hidden');
			weaponUpgradeModal.classList.toggle('hidden');	
			accuracyButton.classList.toggle('hidden');
			shieldingButton.classList.toggle('hidden');
			powerButton.innerText = 'POWER';		
			storyCounter++
			rollGame();
			return console.log('weapon upgraded');
		};
	}
}

function riddleGame() {
	modalBkg.style.backgroundColor = 'rgba(0, 62, 10, 0.678)';
	modalBkg.classList.toggle('hidden');
	minigameWindow.classList.toggle('hidden');
	minigameKnowledge.classList.toggle('hidden');
	minigameInput.classList.toggle('hidden');
	minigameSubmit.classList.toggle('hidden');
	minigameNext.classList.toggle('hidden');

	
	const riddles = [...riddlesQuestions];
	const answers = [...riddleAnswers];

	console.log('riddle 1 started')
	h1.innerText = 'Riddle Me This...';
	let randomChoice = randomNumber(riddles.length);;
	h2.innerText = `Riddle 1`
	h3.innerText = riddles[randomChoice];
	minigameSubmit.onclick = () => {
		let answer = minigameInput.value.toLowerCase();
		minigameInput.value = '';
		if (answer === answers[randomChoice]) {
			h2.innerText = 'Correct!'
			correctAnswers++;
		};
		riddles.splice(randomChoice,1);
		answers.splice(randomChoice,1);
		console.log('riddle 2 started')
		randomChoice = randomNumber(riddles.length);
		h2.innerText = `Riddle 2`
		h3.innerText = riddles[randomChoice];
		minigameSubmit.onclick = () => {
			answer = minigameInput.value.toLowerCase();
			minigameInput.value = '';
			if (answer === answers[randomChoice]) {
				h2.innerText = 'Correct!'
				correctAnswers++;
			};
			riddles.splice(randomChoice,1);
			answers.splice(randomChoice,1);
			console.log('riddle 3 started')
			h2.innerText = `Riddle 3`
			h3.innerText = riddles[0];
			minigameSubmit.onclick = () => {
				minigameNext.classList.toggle('hidden')
				minigameSubmit.classList.toggle('hidden')
				minigameInput.classList.toggle('hidden')
				p.innerText = '';
				answer = minigameInput.value.toLowerCase();
				minigameInput.value = '';
				if (answer === answers[0]) {
					h2.innerText = 'Correct!'
					correctAnswers++;
				};
				minigameKnowledge.classList.toggle('hidden');
				minigameWindow.classList.toggle('hidden');
				minigameControls.classList.toggle('hidden');	
				minigameNext.classList.toggle('hidden');
				textWarning.classList.toggle('hidden');
				modalBkg.classList.toggle('hidden');
				h1.innerText = '';
				h2.innerText = '';
				h3.innerText = '';
				p.innerText = '';
				storyCounter++
				console.log('Riddles Game Complete');
				console.log(`Correct answers: ${correctAnswers}`);
				rollGame();
				return;
			}
		}
	}
}

function reflexSetup() {
	modalBkg.style.backgroundColor = 'rgba(62, 37, 0, 0.678)';
	modalBkg.classList.toggle('hidden');
	minigameWindow.classList.toggle('hidden');
	minigameKnowledge.classList.toggle('hidden');
	minigameControls.classList.toggle('hidden');
	reflexMinigame();
}

function reflexMinigame() {
	h1.innerText = "Can you beat this?";
	h2.innerText = 'This game will test how fast your reflexes are...';
	p.innerText = 'When you click start, shortly after the screen will change to green. When that happens, press the Space Bar once as fast as you can after that. If you are successful, you win! A successful time is less than a quarter second.';
	startButton.innerText = 'Start';
	startButton.classList.toggle('hidden');
	startButton.onclick = () => {
		p.innerText = '';
		startButton.classList.toggle('hidden');
		h3.innerText = 'Get ready...'
		sleep(3000).then(() => {
			minigameWindow.style.backgroundColor = 'green';
			startTime = new Date();
			document.body.onkeydown = (e) => {
				minigameWindow.style.backgroundColor = 'white';
				endTime = new Date();
				timing = ((endTime - startTime)/1000).toFixed(2);
				console.log(timing);
				if (timing <= .25){
					console.log('you win');
					h2.innerText = 'You Win!'
					h3.innerText = 'Congratulations!';
					document.body.onkeydown = null;
					startButton.innerText = 'Close';
					startButton.classList.toggle('hidden');
					startButton.onclick = () => {
						reflexSetup();
						user.upgradeTokens++;
						storyCounter++;
						rollGame();
					}
				} else {
					console.log('you lose');
					h2.innerText = 'Try Again'
					h3.innerText = '';
					document.body.onkeydown = null;
					startButton.innerText = 'Restart';
					startButton.classList.toggle('hidden');
					startButton.onclick = () => {
						startButton.classList.toggle('hidden');
						reflexMinigame();
					}
				}
			}
		});	
	}
}

function finalBattleSetup() {
	modalBkg.style.backgroundColor = 'rgba(12, 0, 0, 0.678)';
	modalBkg.classList.toggle('hidden');
	battleMirror.classList.toggle('hidden');
	h1Final.innerText = 'Temis Battle';
	h2Final.innerText = 'Test your skills against your opposite!';
	h3Final.innerText = 'Temis made all of the opposite upgrade choices as you progressed in your adventure! Now, see who will win in a classic turn-based battle!';
	battleSanityStat.innerText = user.sanity;
	battlePowerStat.innerText = user.power;
	battleAccuracyStat.innerText = user.accuracy;
	battleShieldingStat.innerText = user.shielding;
	attackButton.onclick = () => {
		h1Final.innerText = '';
		h2Final.innerText = '';
		h3Final.innerText = '';
		finalBattle()
	}
}

function finalBattle(){
	h1Final.innerText = 'FIGHT!';
	h2Final.innerText = 'Click ATTACK to FIRE your REFRACTOR!';
	h3Final.innerText = '• the accuracy of your weapon will indicate the chances that your attack will succeed •\n• power indicates how much damage you will do if the attack lands •\n• shielding indicates the buffer you have against Temis\'s attack when it\'s their turn! •';
	attackButton.innerText = 'ATTACK!'
	attackButton.onclick = () => {
		if (user.attack(temis)) {
			h2Final.innerText = 'Your attack on Temis was successful!'
			h3Final.innerText = 'Sheilds up, attack from Temis imminent!'
		} else {
			h2Final.innerText = 'Your attack on Temis was NOT successful!'
			h3Final.innerText = 'Sheilds up, attack from Temis imminent!'
		};
		battleSanityStat.innerText = user.sanity;
		battlePowerStat.innerText = user.power;
		battleAccuracyStat.innerText = user.accuracy;
		battleShieldingStat.innerText = user.shielding;	
		attackButton.innerText = 'Shields Up!';
		attackButton.onclick = () => {
			if (user.sanity > 0 && temis.sanity > 0) {
				if (temis.attack(user)) {
					h2Final.innerText = 'Uh oh, Temis\' attack was successful!'
					h3Final.innerText = 'Try and attack again!'
				} else {
					h2Final.innerText = 'Temis\' attack was NOT successful!'
					h3Final.innerText = 'Try and attack again!'
				}
				attackButton.innerText = 'Prepare to Attack';
				battleSanityStat.innerText = user.sanity;
				battlePowerStat.innerText = user.power;
				battleAccuracyStat.innerText = user.accuracy;
				battleShieldingStat.innerText = user.shielding;
			
				attackButton.onclick = finalBattle;
			} else if (temis.sanity <= 0) {
				attackStats.classList.toggle('hidden');
				h1Final.innerText = 'You won!'
				h2Final.innerText = 'You have defeated Temis, the ruler of MirrorRealm!'
				h3Final.innerText = ''
				attackButton.innerText = 'Close';
				attackButton.onclick = () => {
					modalBkg.classList.toggle('hidden');
					battleMirror.classList.toggle('hidden');
					h1Final.innerText = '';
					h2Final.innerText = '';
					h3Final.innerText = '';
					storyCounter++
					rollGame();
				}
			} else if (user.sanity <= 0) {
				attackStats.classList.toggle('hidden');
				h1Final.innerText = 'You lost!';
				h2Final.innerText = 'You have been defeated by Temis, the ruler of MirrorRealm!\nYou are doomed to roam this world for eternity!';
				h3Final.innerText = '';
				attackButton.innerText = 'Close';
				attackButton.onclick = () => {
					modalBkg.classList.toggle('hidden');
					battleMirror.classList.toggle('hidden');
					h1Final.innerText = '';
					h2Final.innerText = '';
					h3Final.innerText = '';
					storyCounter++
					rollGame();
				}
			}
		}
	}
}

function rollGame() {
	switch(storyCounter) {
		case 0:		console.log('case 0 started');
					document.getElementById('opening-modal').classList.toggle('hidden');
					openingModalDiv.innerHTML = `<h2>${narrator[0]}</h2>`;
					break;

		case 1:		console.log('case 1 started');
					openingModalDiv.innerHTML = `<h2>${narrator[1]}</h2>`
					break;

		case 2:		console.log('case 2 started')
					openingModalDiv.innerHTML = `<h2>${narrator[2]}</h2>`
					break;

		case 3:		console.log('case 3 started')
					openingModalDiv.innerHTML = `<h2>${narrator[3]}</h2>`
					openingModalButton.onclick = () => {
						document.getElementById('opening-modal').classList.toggle('fade-out');
						sleep(1000).then(() => { 
							setImg.src = 'images/set-bath.png';
							mirrorMain.classList.toggle('fade-in');
							mirrorMain.classList.toggle('hidden');
							document.getElementById('opening-modal').classList.toggle('hidden');
							storyCounter++;
							rollGame();
						})
					}
					break;

		case 4:		console.log('case 4 started')
					narratorDiv.style.color = 'black';
					narratorDiv.innerHTML = `<h2>${narrator[4]}</h2>`
					advanceButton.onclick = () => {
						storyCounter++;
						rollGame();
					};
					break;

		case 5:		console.log('case 5 started');
					narratorDiv.innerHTML = ''
					narratorDiv.style.color = 'white';
					sleep(1000).then(() => { 
						mirrorBkg.src = 'images/mirror-broken.png'
					});
					break;

		case 6:		console.log('case 6 started');
					narratorDiv.innerHTML = `<h2>${narrator[5]}</h2>`;
					sleep(1000).then(() => { 
						mirrorBkg.classList.toggle('fade-out')
						mirrorBkg.classList.toggle('fade-out')
						mirrorBkg.src = 'images/mirrorworld1.png'
						mirrorBkg.classList.toggle('fade-in')
					});
					break;

		case 7:		console.log('case 7 started')
					narratorDiv.innerHTML = `<h2>${narrator[6]}</h2>`
					characterImg.setAttribute('src', 'images/disheveled.png');
					characterImg.classList.toggle('fade-in');
					characterImg.classList.toggle('hidden');
					break;

		case 8:		console.log('case 8 started')
					narratorDiv.classList.toggle('fade-out');
					dialogueDiv.innerHTML = `<h3>${dialogue[3]}</h3>`
					dialogueDiv.classList.toggle('fade-in');
					break;

		case 9:		console.log('case 9 started')
					narratorDiv.innerHTML = ('');
					narratorDiv.classList.toggle('fade-out');
					dialogueDiv.innerHTML = `<h3>${dialogue[4]}</h3>`
					break;

		case 10:	console.log('case 10 started')
					dialogueDiv.innerHTML = `<h3>${dialogue[5]}</h3>`
					break;

		case 11:	console.log('case 11 started')
					// change to popup MODAL - YOU RECEIVED A REFRACTOR
					narratorDiv.innerHTML = `<h2>${narrator[7]}</h2>`
					dialogueDiv.innerHTML = ''
					break;

		case 12:	console.log('case 12 started')
					narratorDiv.innerHTML = `<h2>${narrator[8]}</h2>`
					sanityStat.innerText = user.sanity;
					user.generateRefractor();
					statsDiv.classList.toggle('fade-in')
					statsDiv.classList.toggle('hidden')
					break;

					// REVEAL STATS DIV
		case 13:	console.log('case 13 started')
					narratorDiv.innerHTML = ''
					dialogueDiv.innerHTML = `<h3>${dialogue[6]}</h3>`
					break;
					
		case 14:	console.log('case 14 started')
					characterImg.setAttribute('src', '')
					dialogueDiv.innerHTML = ''
					narratorDiv.innerHTML = `<h2>${narrator[9]}</h2>`
					break;

					// case 15: insert new mirrorworld img after the advance
					// delay: then reveal kristoff in resting position char img
		case 15:	console.log('case 15 started')
					narratorDiv.innerHTML = `<h2>${narrator[10]}</h2>`
					break;

					// change char img to kristoff speaking
		case 16:	console.log('case 16 started')
					narratorDiv.innerHTML = ''
					characterImg.src = 'images/kristoff.png';
					dialogueDiv.innerHTML = `<h3>${dialogue[7]}</h3>`
					break;

		case 17:	console.log('case 17 started')
					dialogueDiv.innerHTML = `<h3>${dialogue[8]}</h3>`
					break;

		case 18:	console.log('case 18 started')
					dialogueDiv.innerHTML = ''
					narratorDiv.innerHTML = `<h2>${narrator[11]}</h2>`
					break;

		case 19:	console.log('case 19 started')
					narratorDiv.innerHTML = ''
					dialogueDiv.innerHTML = `<h3>${dialogue[9]}</h3>`
					break;

		case 20:	console.log('case 20 started')
					dialogueDiv.innerHTML = ''
					knowledgeMiniGame();
					break;

		case 21:	console.log('case 21 started')
					if (user.upgradeTokens) {
						narratorDiv.innerHTML = `<h2>You received ${user.upgradeTokens} upgrade tokens for your Refractor.</h2>`
						dialogueDiv.innerHTML = `<h3>${dialogue[10]}</h3>`
					} else {
						narratorDiv.innerHTML = `<h2>You lost ${20-user.sanity} Sanity.</h2>`
						dialogueDiv.innerHTML = `<h3>Yikes, you better brush up on your knowledge, kid.</h3>`
					}
					
					break;

					// hide charimg and change to KENDRA
		case 22:	console.log('case 22 started')
					dialogueDiv.innerHTML = ''
					narratorDiv.innerHTML = ''
					// DOM Setup
					modalBkg.style.backgroundColor = 'rgba(66, 0, 0, 0.678)';
					modalBkg.classList.toggle('hidden');
					minigameWindow.classList.toggle('hidden');
					weaponUpgradeModal.classList.toggle('hidden');
					tokenSpan.innerText = user.upgradeTokens;
					weaponUpgrade();
					characterImg.src = '';
					break;
					// ADD DELAY THEN REVEAL KENDRA POSITION 1

		case 23:	console.log('case 23 started')
					narratorDiv.innerHTML = `<h2>${narrator[12]}</h2>`
					break;

					// FADE OUT KENDRA 1 AND IN KENDRA SPEAKING
		case 24:	console.log('case 24 started')
					narratorDiv.innerHTML = ''
					characterImg.src = 'images/kendra.png';
					dialogueDiv.innerHTML = `<h3>${dialogue[11]}</h3>`
					break;

		case 25:	console.log('case 25 started')
					dialogueDiv.innerHTML = `<h3>${dialogue[12]}</h3>`
					break;

		case 26:	console.log('case 26 started')
					dialogueDiv.innerHTML = ''			
					riddleGame();
					break;

		case 27:	console.log('case 27 started')
					dialogueDiv.innerHTML = `<h3>${dialogue[13]}</h3>`;

					break;

					// FADE OUT KENDRA
		case 28:	console.log('case 28 started')
					dialogueDiv.innerHTML = ''
					narratorDiv.innerHTML = `<h2>You gained one point of sanity for helping Kendra.</h2><br /><h2>Kendra gave you an upgrade token.</h2>`;
					user.upgradeTokens++;
					break;

		case 29:	console.log('case 29 started')
					dialogueDiv.innerHTML = ''
					narratorDiv.innerHTML = ''
					// DOM Setup
					modalBkg.style.backgroundColor = 'rgba(66, 0, 0, 0.678)';
					modalBkg.classList.toggle('hidden');
					minigameWindow.classList.toggle('hidden');
					weaponUpgradeModal.classList.toggle('hidden');
					tokenSpan.innerText = user.upgradeTokens;
					weaponUpgrade();
					break;

		case 30:	console.log('case 30 started')
					dialogueDiv.innerHTML = `<h3>${dialogue[14]}</h3>`
					break;

		case 31:	console.log('case 31 started')
					characterImg.src = '';
					narratorDiv.innerHTML = `<h2>${narrator[13]}</h2>`
					dialogueDiv.innerHTML = ``
					break;

					// MIRRORWORLD IMAGE CHANGE - path, with castle in bkg
		case 32:	console.log('case 32 started')
					narratorDiv.innerHTML = `<h2>${narrator[14]}</h2>`
					mirrorBkg.classList.toggle('fade-out')
					sleep(500).then(() => { 
						mirrorBkg.classList.toggle('fade-out')
						mirrorBkg.src = 'images/mirrorworld-castle.png'
						mirrorBkg.classList.toggle('fade-in')
					});
					break;

					// BRING IN CHAR OF BRIDGE GUY
		case 33:	console.log('case 33 started')
					narratorDiv.innerHTML = ''
					dialogueDiv.innerHTML = `<h3>${dialogue[15]}</h3>`
					characterImg.src = 'images/passman.png'
					break;

		case 34:	console.log('case 34 started')
					dialogueDiv.innerHTML = ''
					reflexSetup();
					break;

		case 35:	console.log('case 35 started')
					dialogueDiv.innerHTML = `<h3>${dialogue[16]}</h3>`
					break;

		case 36:	console.log('case 36 started')
					dialogueDiv.innerHTML = ''
					narratorDiv.innerHTML = `<h2>${narrator[15]}</h2>`
					break;

					// FADE OUT CHAR OF BRIDGE GUY, CHANGE TO KENDRA
		case 37:	console.log('case 37 started')
					narratorDiv.innerHTML = ''
					// DOM Setup
					modalBkg.style.backgroundColor = 'rgba(66, 0, 0, 0.678)';
					modalBkg.classList.toggle('hidden');
					minigameWindow.classList.toggle('hidden');
					weaponUpgradeModal.classList.toggle('hidden');
					tokenSpan.innerText = user.upgradeTokens;
					characterImg.src = '';
					weaponUpgrade();
					break;

		case 38:	console.log('case 38 started')
					narratorDiv.innerHTML = `<h2>As you were about to enter the palace, a hand grabs you by the arm.</h2>`
					break;

					//CHAR IMAGE OF KENDRA
		case 39:	console.log('case 39 started')
					characterImg.src = 'images/kendra.png'
					narratorDiv.innerHTML = ''
					dialogueDiv.innerHTML = `<h2>Hey! It's me, Kendra! Remember? Turns out you got ${correctAnswers} of those riddles correct. Take a one Sanity point from me for each correct answer. You earned it! Thanks again.
					</h2>`;
					user.sanity += correctAnswers;
					sanityStat.innerText = user.sanity;
					break;

					// FADE OUT CHAR KENDRA, CHANGE TO TEMIS FAR
		case 40:	console.log('case 40 started')
					characterImg.src = '';
					dialogueDiv.innerHTML = ''
					narratorDiv.innerHTML = `<h2>${narrator[16]}</h2>`
					break;

		case 41:	console.log('case 41 started')
					narratorDiv.innerHTML = `<h2>${narrator[17]}</h2>`
					// DELAY THEN REVEAL CHAR-IMG FOR TEMIS
					break;

					// CHAR IMAGE OF TEMIS SPEAKING SHOULD BE UP
		case 42:	console.log('case 42 started')
					characterImg.src = 'images/temis.png'
					narratorDiv.innerHTML = ''
					dialogueDiv.innerHTML = `<h3>${dialogue[18]}</h3>`
					break;

		case 43:	console.log('case 43 started')
					dialogueDiv.innerHTML = ''			
					narratorDiv.innerHTML = `<h2>${narrator[18]}</h2>`
					break;

		case 44:	console.log('case 44 started')			
					narratorDiv.innerHTML = ''
					dialogueDiv.innerHTML = `<h3>${dialogue[19]}</h3>`
					break;

		case 45:	console.log('case 45 started')
					dialogueDiv.innerHTML = `<h3>${dialogue[20]}</h3>`
					break;

		case 46:	console.log('case 46 started')
					dialogueDiv.innerHTML = ''			
					narratorDiv.innerHTML = `<h2>${narrator[19]}</h2>`
					break;

		case 47:	console.log('case 47 started')
					narratorDiv.innerHTML = ''
					finalBattleSetup();
					break;

		case 48:	console.log('case 48 started')
					dialogueDiv.innerHTML = `<h3>${dialogue[21]}</h3>`
					break;

		case 49:	console.log('case 49 started')
					dialogueDiv.innerHTML = ''
					narratorDiv.innerHTML = `<h2>${narrator[20]}</h2>`
					break;

		case 50:	console.log('case 50 started')
					narratorDiv.innerHTML = ''
					dialogueDiv.innerHTML = `<h3>${dialogue[22]}</h3>`
					break;

		case 51:	console.log('case 51 started')
					dialogueDiv.innerHTML = `<h3>${dialogue[23]}</h3>`
					// SNAP OUT OF IT button
					advanceButton.innerText = 'Snap out of it'
					break;

		case 52:	// endGame();
					break;
	}
}

/////////////////////
// EVENT LISTENERS //
/////////////////////

openingModalButton.onclick = () => {
	storyCounter++;
	rollGame();
};

window.onload = () => {
	setImg.src = 'images/set1.jpg';
	console.log('setup complete');
	document.getElementById('play').onclick = () => {
		console.log('play clicked');
		introDiv.classList.toggle('fade-out-intro')
		setTimeout( () => {
			introDiv.classList.toggle('hidden');
			rollGame();
		 }, 3000);
	};
}

// unComment above and delete below to return to normal intro

// introDiv.classList.toggle('hidden');
// rollGame();
