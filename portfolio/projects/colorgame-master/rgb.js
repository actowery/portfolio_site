var numSquares = 6;
var colors = [];
var picked;
var squares = document.querySelectorAll(".square");
var displayedColor = document.getElementById("displayedColor");
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var reset = document.querySelector("#resetButton");
var mode = document.querySelectorAll(".mode");
//prepare game
initiate();
function initiate() {
	setMode();
	setSquares();
	resetAll();
}
//resets squares
function resetAll() {
	colors = generate(numSquares);
	picked = randomColor();
	displayedColor.textContent = picked;
	h1.style.backgroundColor = "steelBlue";
	message.textContent = "";
	reset.textContent = "New Colors";
		for (var i = 0; i < squares.length; i++) {
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
	}
}
//reset button
reset.addEventListener("click", function(){
	resetAll();
});
//after successful guess, change all colors to correct one
function changeAllColors(color) {
	for (var i= 0; i< squares.length; i++) {
		squares[i].style.backgroundColor = color;
	};
	h1.style.backgroundColor = color;
}
//gets which color to guess
function randomColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}
//generates the number of boxes to be guessed
function generate(num) {
	ary = [];
	for (var i = 0; i < num; i++) {
		//get random color and push to ary
		ary.push(genColor());
	}
	return ary;
}
//generates a random colorfor the boxes
function genColor() {
	var r = make256();
	var g = make256();
	var b = make256();
	//rgb(r, g, b)
	return "rgb("+r+", "+g+", "+b+")";
}
function make256() {
	return Math.floor(Math.random() * 256);
}
//setup square listeners
function setSquares(){
	for (var i=0; i<squares.length; i++) {
	//click listeners to squares
		squares[i].addEventListener("click", function(){
			//get color if clicked
			var clickedColor = this.style.backgroundColor;
			if(clickedColor === picked) { //when you get it right
				message.textContent = "Correct!";
				reset.textContent = "Play again?";
				changeAllColors(picked);
			}
			else {
				this.style.backgroundColor = "#232323";
				message.textContent = "Try Again";
			}
		});
	}
}
//create mode buttons
function setMode() {
	for (var i = 0; i < mode.length; i++) {
		mode[i].addEventListener("click", function(){
			for (var i = 0; i < mode.length; i++) {
				mode[i].classList.remove("selected");			
			};
			this.classList.add("selected");
			if(this.textContent == "Easy"){
				numSquares=3;
			}
			else if(this.textContent == "Hard"){
				numSquares=6;
			} 
			else{
				numSquares=9;
			}
			resetAll();
		});
	}
}
