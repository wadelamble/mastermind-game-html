var myGamePiece;
var sizeRatio = 4/4;
var sizeScaler = 440;
const screenSize = {
    height : sizeRatio * sizeScaler,
    width : sizeScaler
}
var sideBarWidth = screenSize.width / 5;
var numRows = 11;
var buttonSize = sideBarWidth / 3;
var verticalOffsetOfCanvas = 10;
var color_clicked = 'black'
//grade, guess circle radius
var guessr = (screenSize.height / (numRows * 2)) * 0.5;
var grader = (screenSize.height / (numRows * 2)) * 0.2;
var guess_loc = [1, 1];


function startGame() {
    myGameArea.start();
    // draw guessing area
    rectangle(sideBarWidth, screenSize.height, "#1f1f14", screenSize.width - sideBarWidth, 0);
    drawBoard(screenSize);
}


var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.setAttribute('id', 'board');
        this.canvas.height = screenSize.height;
        this.canvas.width = screenSize.width;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        drawGuessButtons();
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function drawGuessButtons() {
    var hOffset = verticalOffsetOfCanvas;
    hOffset += (screenSize.height * 1.5 / numRows) - (buttonSize / 2);
    drawGuessButton('buttonR', hOffset);
    hOffset += (screenSize.height / numRows);
    drawGuessButton('buttonB', hOffset);
    hOffset += (screenSize.height / numRows);
    drawGuessButton('buttonG', hOffset);
    hOffset += (screenSize.height / numRows);
    drawGuessButton('buttonY', hOffset);
    hOffset += (screenSize.height / numRows);
    drawGuessButton('buttonP', hOffset);
    hOffset += (screenSize.height / numRows);
    drawGuessButton('buttonW', hOffset);
}

function drawGuessButton (buttonStyle, hOffset) {
    buttonSizePx = buttonSize + 'px';
    var button = document.createElement("BUTTON");
    button.style.position = 'absolute';
    button.setAttribute('class', buttonStyle);
    button.style.width = buttonSizePx;
    button.style.height = buttonSizePx;
    var wOffset = document.getElementById("board").offsetLeft;
    wOffset += screenSize.width - (sideBarWidth / 2) - buttonSize / 2;
    wOffsetStr = wOffset + 'px';
    hOffsetStr = hOffset + 'px';
    
    button.style.top = hOffsetStr;
    button.style.left = wOffsetStr;
    //alert(buttonStyle)
    alert("hey")
    alert(button.style.backgroundColor);
    if (color == 'red') {
        button.setAttribute('onclick', 'red()');
    }
    if (color == 'blue') {
        button.setAttribute('onclick', 'blue()');
    }
    if (color == 'green') {
        button.setAttribute('onclick', 'green()');
    }
    if (color == 'yellow') {
        button.setAttribute('onclick', 'yellow()');
    }
    if (color == 'white') {
        button.setAttribute('onclick', 'white()');
    }
    if (color == 'purple') {
        button.setAttribute('onclick', 'purple()');
    }
    document.body.appendChild(button);
}

function green() {
    color_clicked = 'green';
    alert("hello?");
}
function blue() {
    color_clicked = 'blue';
}
function red() {
    color_clicked = 'red';
}
function purple() {
    color_clicked = 'purple';
}
function yellow() {
    color_clicked = 'yellow';
}
function white() {
    color_clicked = 'white';
}

function clicked(color) {
    drawGuessCircle(guess_loc[0], guess_loc[1]);
    //still in the middle of a guess
    if (guess_loc[0] < 4) {
        guess_loc[0] ++;
    }
    //finished a guess
    else {
        
        //
        //TODO
        //
        //
        //Call a grade function here
        if (guess_loc[1] === 10) {
                //if they got it, its fine
                //if they didn't, they used all the turns so
                //PLAY A LOSE SCREEN HERE
        }
        guess_loc[1] ++;
        guess_loc[0] = 1
    }

}
function rectangle(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
}

function circle(r, color, x, y) {
    this.r = r
    this.x = x
    this.y = y
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    ctx.fill();
}

function text(font, text, x, y) {
    this.font = font
    this.text = text
    this.x = x
    this.y = y
    ctx = myGameArea.context;
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.fillStyle = "white"
    ctx.fillText(text, x, y);
}

function drawGuessCircle(x_loc, y_loc, color) {
    this.x = x_loc * guessBarWidth / 5;
    this.y = y_loc * screenSize.height / numRows + screenSize.height / (numRows * 2 );
    circle(guessr, color, this.x, this.y)
}

function drawGradeCircle(x_loc, y_loc, color) {
    this.x = guessBarWidth + (x_loc * gradeBarWidth / 5)
    this.y = y_loc * screenSize.height / numRows + screenSize.height / (numRows * 2 );
    circle(grader, color, this.x, this.y)
}

function drawBoard(screenSize) {
    var sideBarWidth = screenSize.width / 5;
    //Ask dad if we should change this
    var gradeBarWidth = sideBarWidth;
    var guessBarWidth = screenSize.width - sideBarWidth - gradeBarWidth;
    var skip_lines = [1, 7, 8, 10];
    for (i = 1; i < numRows; i++) {
        //horizontal lines
        this.y = i * screenSize.height / numRows;
        if (!(skip_lines.includes(i))) {
            rectangle(screenSize.width - sideBarWidth, 1, "black", 0, this.y);
        } else {
            rectangle(screenSize.width, 1, "black", 0, this.y);
        }
    }
    //dividing vertical lines
    rectangle(1, screenSize.height, "black", guessBarWidth, 0);
    rectangle(1, screenSize.height, "black", guessBarWidth + gradeBarWidth, 0);

    //shade the code box
    rectangle(guessBarWidth, (screenSize.height / numRows), "#331a00", 0, 0)
    rectangle(gradeBarWidth - 1, screenSize.height / numRows, "331a00", guessBarWidth + 1, 0)


    this.guessr = (screenSize.height / (numRows * 2)) * 0.5;
    this.grader = (screenSize.height / (numRows * 2)) * 0.2;
    for (i = 0; i <  numRows; i++) {
        this.y = i * screenSize.height / numRows + screenSize.height / (numRows * 2 );
        for (j = 1; j < 5; j++) {
            //guessing circles
            this.x = j * guessBarWidth / 5;
            circle(this.guessr, "black", this.x, this.y);
            //grading circles
            //don't need a grade for the code
            if (i !== 0) {
                this.x = guessBarWidth +     (j * gradeBarWidth / 5);
                circle(this.grader, "black", this.x, this.y);
            }
        }
    }
    this.fontSize = screenSize.height / numRows * 0.4;
    this.fontString = fontSize + "px Arial"
    text(this.fontString, "COLORS", guessBarWidth + gradeBarWidth * 1.5, (screenSize.height / (numRows * 2)) + fontSize / 2);
}
/*

for (num_full_guess = 1; num_full_guess < 11; num_full_guess++) {
    this.y = num_full_guess * screenSize.height / numRows + screenSize.height / (numRows * 2 );
    for (num_full_guess = 1; num_full_guess < 5; num_full_guess++) {
        guess_color = 
        this.x = num_part_guess * guessBarWidth / 5
        circle(this.guessr, guess_color, this.x, this.y)
    }
}
*/




