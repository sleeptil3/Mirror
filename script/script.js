/////////////////////////
// CACHED DOM ELEMENTS //
/////////////////////////


/////////////////
// GLOBAL VARS //
/////////////////

let storyCounter = 0; // for keeping track of the progress in the story and calling the correct functions to render the DOM
let correctRiddles = 0; // holds number of correct riddle responses to assign extra sanity points to later before boss battle

const correctResponses = [
	'"A lucky guess."',
	'"Well done."',
	'"That is the correct answer."',
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

///////////////
// FUNCTIONS //
///////////////


/////////////////////
// EVENT LISTENERS //
/////////////////////

