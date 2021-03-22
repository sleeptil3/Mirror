/////////////////////////
// CACHED DOM ELEMENTS //
/////////////////////////

/// MAIN PAGE VARS ///
const onloadDiv = document.getElementById('onload');
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

/// STAT VARS ///
const sanityStat = document.getElementById('sanity-stat');
const accuracyStat = document.getElementById('accuracy-stat');
const powerStat = document.getElementById('power-stat');
const shieldingStat = document.getElementById('shielding-stat');

/// MINI GAME VARS ///
const modalBkg = document.getElementById('modal-bkg');
const miniGameWindow = document.getElementById('minigame-window');
const knowledgeMiniGameDiv = document.getElementById('knowledge-minigame');
const miniGameSubmit = document.getElementById('minigame-submit');
const miniGameNext = document.getElementById('minigame-next');
const miniGameInput = document.getElementById('minigame-input');
const miniGameControls = document.getElementById('minigame-controls');
const h1 = document.createElement('h1');
const h2 = document.createElement('h2');
const h3 = document.createElement('h3');
const p = document.createElement('p');
const textWarningP = document.getElementById('text-warning')
miniGameControls.insertBefore(h1, textWarningP);
miniGameControls.insertBefore(h2, textWarningP);
miniGameControls.insertBefore(h3, textWarningP);
miniGameControls.insertBefore(p, textWarningP);
const h1Wu = document.createElement('h1');
const h2Wu = document.createElement('h2');
const h3Wu = document.createElement('h3');
const pWu = document.createElement('p');
const weaponUpgradeModal = document.getElementById('weapon-upgrade-div');
const accuracyButton = document.getElementById('accuracy-button');
const powerButton = document.getElementById('power-button');
const shieldingButton = document.getElementById('shielding-button');
let tokenSpan = document.getElementById('upgrade-token-count');



/////////////////
// GLOBAL VARS //
/////////////////

class User {
	constructor() {
		this.sanity = 20;
		this.accuracy = null;
		this.power = null;
		this.shielding = null;
		this.upgradeTokens = null;

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
		this.accuracy = randomNumberRange(45,55);
		this.power = randomNumberRange(45,55);
		this.shielding = randomNumberRange(45,55);
		accuracyStat.innerText = this.accuracy;
		powerStat.innerText = this.power;
		shieldingStat.innerText = this.shielding;
	}
	upgradeRefractor(feature) {
		switch (feature) {
			case 'accuracy': 	this.accuracy += 5;
								accuracyStat.innerText = this.accuracy;
								user.upgradeTokens--
								break;
			case 'power':		this.power += 5;
								powerStat.innerText = this.power;
								user.upgradeTokens--
								break;
			case 'shielding':	this.shielding += 5;
								shieldingStat.innerText = this.shielding;
								user.upgradeTokens--
								break;
		}
	}
	// add an attack function
	// review space game for accuracy how to
}

const user = new User();
const temis = new User();

let correctAnswers = 0;
let decisionResult = null;
let storyCounter = 0;

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

const riddles = [
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
	"It didn’t take long to run into another inhabitant of this place. He seemed friendly enought, but there was a darkness about him, like he carried the weight of an unwanted burden.",
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
	`Hey! It's me, Kendra! Remember? Turns out you got VAR of those riddles correct. Take VAR of my Sanity points. You earned it. Thanks again!`,
	"Welcome to my palace and my realm. I am Temis, ruler of this place.",
	"I suppose you came here to battle to earn a chance to leave the Mirror Realm. Okay, I will oblige your request, however everything you think you can do, I can do better. I'm smarter. I'm faster. You will NEVER win.",
	"In fact, all along your pathetic journey here, I followed every decision you made but my path mirrored your own. That is to say, I chose the opposite of what you did each and every time! This is going to be fun!",
	"Oh, I'm so glad that's over. It's EXHAUSTING pretending to be so mean.",
	"Look, I'm you and you're me. It's the mirror realm, get it?",
	"You're stuck in one of your daydreams again. Standing in front of a mirror or not, stop letting the voice in your head paralyze you.",
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
	miniGameWindow.classList.toggle('hidden')

	
	const questions = [...triviaQuestions]
	const answers = [...triviaAnswers]
	
	h1.innerText = 'Let\'s see what ya got, kid.';
	let randomChoice = null;
	console.log('question 1 started')
	randomChoice = randomNumber(questions.length);
	h2.innerText = `Question 1`
	h3.innerText = questions[randomChoice];
	miniGameSubmit.onclick = () => {
		miniGameNext.classList.toggle('hidden')
		miniGameSubmit.classList.toggle('hidden')
		miniGameInput.classList.toggle('hidden')
		p.innerText = '';
		let answer = miniGameInput.value.toLowerCase();
		miniGameInput.value = '';
		if (answer === answers[randomChoice]) {
			h2.innerText = 'Correct!'
			correctAnswers++;
		} else {
			h2.innerText = 'Incorrect!';
			user.loseSanity(1);
		};
		miniGameNext.onclick = () => {
			miniGameNext.classList.toggle('hidden')
			miniGameSubmit.classList.toggle('hidden')
			miniGameInput.classList.toggle('hidden')	
			questions.splice(randomChoice,1);
			answers.splice(randomChoice,1);
			console.log('question 2 started')
			randomChoice = randomNumber(questions.length);
			h2.innerText = `Question 2`
			h3.innerText = questions[randomChoice];
			miniGameSubmit.onclick = () => {
				miniGameNext.classList.toggle('hidden')
				miniGameSubmit.classList.toggle('hidden')
				miniGameInput.classList.toggle('hidden')
				p.innerText = '';
				answer = miniGameInput.value.toLowerCase();
				miniGameInput.value = '';
				if (answer === answers[randomChoice]) {
					h2.innerText = 'Correct!'
					correctAnswers++;
				} else {
					h2.innerText = 'Incorrect!';
					user.loseSanity(1);
				};
				miniGameNext.onclick = () => {
					miniGameNext.classList.toggle('hidden')
					miniGameSubmit.classList.toggle('hidden')
					miniGameInput.classList.toggle('hidden')
					questions.splice(randomChoice,1);
					answers.splice(randomChoice,1);
					console.log('question 3 started')
					h2.innerText = `Question 3`
					h3.innerText = questions[0];
					miniGameSubmit.onclick = () => {
						miniGameNext.classList.toggle('hidden')
						miniGameSubmit.classList.toggle('hidden')
						miniGameInput.classList.toggle('hidden')
						p.innerText = '';
						answer = miniGameInput.value.toLowerCase();
						miniGameInput.value = '';
						if (answer === answers[0]) {
							h2.innerText = 'Correct!'
							correctAnswers++;
						} else {
							h2.innerText = 'Incorrect!';
							user.loseSanity(1);
						}
						miniGameNext.innerText = `Close`;
						miniGameNext.onclick = () => {
							miniGameSubmit.classList.toggle('hidden')
							miniGameInput.classList.toggle('hidden')
							user.upgradeTokens = correctAnswers;
							tokenSpan.innerText = user.upgradeTokens;
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

// knowledgeMiniGame()

function weaponUpgrade() {
	console.log('weapon upgrade began')
	if (user.upgradeTokens) {
		accuracyButton.onclick = () => {
			user.upgradeRefractor('accuracy');
			user.upgradeTokens--;
			weaponUpgrade()
		}
		powerButton.onclick = () => {
			user.upgradeRefractor('power');
			user.upgradeTokens--;
			weaponUpgrade()
		}
		shieldingButton.onclick = () => {
			user.upgradeRefractor('shielding');
			user.upgradeTokens--;
			weaponUpgrade()
		}

	} else {
		accuracyButton.classList.toggle('hidden');
		shieldingButton.classList.toggle('hidden');
		powerButton.innerText = 'CLOSE';
		powerButton.onclick = () => {
			storyCounter++
			rollGame();
			return console.log('weapon upgraded');
		};
	}
}


function rollGame() {
	switch(storyCounter) {
		case 0:		console.log('case 0 started');
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
						// set image to bathroom set
						sleep(1000).then(() => { 
							setImg.src = ('');
							mirrorMain.classList.toggle('fade-in');
							mirrorMain.classList.toggle('hidden');
							document.getElementById('opening-modal').classList.toggle('hidden');
							storyCounter++;
							rollGame();
						})
					}
					break;

		case 4:		console.log('case 4 started')
					narratorDiv.innerHTML = `<h2>${narrator[4]}</h2>`
					advanceButton.onclick = () => {
						storyCounter++;
						rollGame();
					};
					break;

		case 5:		console.log('case 5 started');
					sleep(1000).then(() => { 
						setImg.src = ''; // ------> MIRROR CRACKED IMAGE FRAME
						sleep(1000).then(() => { 
							mirrorWorldSection.style.backgroundColor = "pink"; // ------> MIRRORWORLD
						});
					});
					break;

		case 6:		console.log('case 6 started');
					narratorDiv.innerHTML = `<h2>${narrator[5]}</h2>`;
					break;

		case 7:		console.log('case 7 started')
					narratorDiv.innerHTML = `<h2>${narrator[6]}</h2>`
					characterImg.setAttribute('src', 'images/chartemp.png');
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
					knowledgeMiniGameDiv.classList.toggle('hidden')
					miniGameBkg.classList.toggle('hidden');
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
					miniGameBkg.style.backgroundColor = 'rgba(66, 0, 0, 0.678)';
					weaponUpgradeModal.classList.toggle('hidden')
					miniGameBkg.classList.toggle('hidden');
					weaponUpgrade();
					break;
					// ADD DELAY THEN REVEAL KENDRA POSITION 1
		case 23:	console.log('case 23 started')
					weaponUpgradeModal.classList.toggle('hidden')
					miniGameBkg.classList.toggle('hidden');
					narratorDiv.innerHTML = `<h2>${narrator[12]}</h2>`
					break;

					// FADE OUT KENDRA 1 AND IN KENDRA SPEAKING
		case 24:	console.log('case 24 started')
					narratorDiv.innerHTML = ''
					characterImg.setAttribute('src', 'images/chartemp.png')
					dialogueDiv.innerHTML = `<h3>${dialogue[11]}</h3>`
					break;

		case 25:	console.log('case 25 started')
					dialogueDiv.innerHTML = `<h3>${dialogue[12]}</h3>`
					break;

		case 26:	console.log('case 26 started')
					dialogueDiv.innerHTML = ''			
					// MODAL GAME 2 RIDDLER
					break;

		case 27:	console.log('case 27 started')
					dialogueDiv.innerHTML = `<h3>${dialogue[13]}</h3>`
					break;

					// FADE OUT KENDRA
		case 28:	console.log('case 28 started')
					dialogueDiv.innerHTML = ''
					narratorDiv.innerHTML = `<h2>You gained one point of sanity for helping Kendra.</h2><br /><h2>Kendra gave you an upgrade token.</h2>`
					break;

		case 29:	console.log('case 29 started')
					// WEAPON UPGRADE MODAL IF YOU HELPED KENDRA
					// incrementing story counter to skip case 30 for now, add back if you make kendra optional later - would need to change kendras fade out on 28
					storyCounter++;
					break;

		case 30:	console.log('case 30 started')
					dialogueDiv.innerHTML = `<h3>${dialogue[14]}</h3>`
					break;

		case 31:	console.log('case 31 started')
					narratorDiv.innerHTML = `<h2>${narrator[13]}</h2>`
					break;

					// MIRRORWORLD IMAGE CHANGE - path, with castle in bkg
		case 32:	console.log('case 32 started')
					narratorDiv.innerHTML = `<h2>${narrator[14]}</h2>`
					break;

					// BRING IN CHAR OF BRIDGE GUY
		case 33:	console.log('case 33 started')
					narratorDiv.innerHTML = ''
					dialogueDiv.innerHTML = `<h3>${dialogue[15]}</h3>`
					break;

		case 34:	console.log('case 34 started')
					dialogueDiv.innerHTML = ''
					// GAME 3 MODAL - REFLEXES
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
					// WEAPON UPGRADE MODAL
					break;

		case 38:	console.log('case 38 started')
					narratorDiv.innerHTML = `<h2>As you were about to enter the palace, a hand grabs you by the arm.</h2>`
					break;

					//CHAR IMAGE OF KENDRA
		case 39:	console.log('case 39 started')
					narratorDiv.innerHTML = ''
					dialogueDiv.innerHTML = `<h3>${dialogue[17]}</h3>`
					break;

					// FADE OUT CHAR KENDRA, CHANGE TO TEMIS FAR
		case 40:	console.log('case 40 started')
					dialogueDiv.innerHTML = ''
					narratorDiv.innerHTML = `<h2>${narrator[16]}</h2>`
					break;

		case 41:	console.log('case 41 started')
					narratorDiv.innerHTML = `<h2>${narrator[17]}</h2>`
					// DELAY THEN REVEAL CHAR-IMG FOR TEMIS
					break;

					// CHAR IMAGE OF TEMIS SPEAKING SHOULD BE UP
		case 42:	console.log('case 42 started')
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
					// BOSS BATTLE SUPER MODAL
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

// window.onload = () => {
// 	setImg.src = 'images/set1.jpg';
// 	console.log('setup complete');
// 	document.getElementById('play').onclick = () => {
// 		console.log('play clicked');
// 		onloadDiv.classList.toggle('fade-out-intro')
// 		setTimeout( () => {
// 			onloadDiv.classList.toggle('hidden');
// 			rollGame();
// 		 }, 3000);
// 	};
// }

// unComment above and delete below to return to normal intro

setImg.src = 'images/set1.jpg';
onloadDiv.classList.toggle('hidden');
rollGame();
