var game = {
	'secret': null,
	'userGuess':"",
	'wrongGuesses':0
}

var engine = {
	'renderEnviroment':function(){
		//Cleaning stuff
		toClean = ['numbers','keyboard'];
		for(i=0;i<toClean.length;i++)
			document.getElementById(toClean[i]).innerHTML = "";

		game = {
			'secret': null,
			'userGuess':"",
			'wrongGuesses':0
		};

		//Generating Keyboard
		for(i=0;i<10;i++)
			document.getElementById('keyboard').innerHTML += '<button id="nk'+i+'" onclick="guessNumber('+i+')">'+i+'</button>';

		//Checking localStorage
		if(localStorage.level === "" || localStorage.level === undefined) localStorage.level = 1;

		engine.renderLevel();
	},
	'renderLevel':function(){
		level = parseInt(localStorage.level);
		if(isNaN(level)) level = 1;
		engine.setSecret(level * 10);

		for(i=0;i<game.secret.length;i++){
			numberSlot = document.createElement('div');
			numberSlot.setAttribute('id','t'+i);
			document.getElementById('numbers').appendChild(numberSlot);
		}
	},
	'setSecret':function(length){
		game.secret = ""; i=0;
		while(i < length.toString().length - 1){
			do{
				secretCandidate = Math.round(Math.random() * (9 - 0) + 0);
				if(game.secret.indexOf(secretCandidate) == -1)
					game.secret += secretCandidate;
			} while(game.secret.length == i);
			i++;
		}
	},
	'nextLevel':function(){
		localStorage.level = parseInt(localStorage.level) * 10;
		engine.renderEnviroment();
	},
	'lostGame':function(){
		localStorage.level = 1;
		engine.renderEnviroment();
	}
};
// First Load Run
engine.renderEnviroment();


function guessNumber(number){
	if(game.secret.indexOf(number) == -1)
		wrongGuess(number);
	else
		rightGuess(number);
}
function wrongGuess(number){
	document.getElementById('nk'+number).setAttribute('wrong', '');
	document.getElementById('nk'+number).setAttribute('disabled', '');

	game.wrongGuesses++;
	if(game.wrongGuesses > 3)
		engine.lostGame();
}
function rightGuess(number){
	document.getElementById('nk'+number).setAttribute('right', '');
	document.getElementById('nk'+number).setAttribute('disabled', '');

	game.userGuess += number;

	document.getElementById('t'+game.secret.indexOf(number)).innerHTML = number;

	if(game.userGuess.length >= game.secret.length)
		engine.nextLevel();
}

