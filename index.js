//
// Globals -- eek so many, what's the right pattern here?
//
var myGamePiece;
var sizeRatio = 4/4;
var sizeScaler = 440;
const screenSize = {
    height : sizeRatio * sizeScaler,
    width : sizeScaler
};

var sideBarWidth = screenSize.width / 5;
//Ask dad if we should change this
var gradeBarWidth = sideBarWidth;
var guessBarWidth = screenSize.width - sideBarWidth - gradeBarWidth;
var numRows = 11;
var buttonSize = sideBarWidth / 3;
var verticalOffsetOfCanvas = 10;
var color_clicked = 'black';
//grade, guess circle radius
var guessr = (screenSize.height / (numRows * 2)) * 0.5;
var grader = (screenSize.height / (numRows * 2)) * 0.2;
var guess_loc = [1, 1];

var redButton = document.createElement("button");
redButton.id = "redButton";
redButton.style.backgroundColor = 'red';
redButton.style.border = 'red';
redButton.addEventListener('click', function() { redButtonClick(); });

var blueButton = document.createElement("button");
blueButton.id = "blueButton";
blueButton.style.backgroundColor = 'blue';
blueButton.style.border = 'blue';
blueButton.addEventListener('click', function() { blueButtonClick(); });

var greenButton = document.createElement("button");
greenButton.id = "greenButton";
greenButton.style.backgroundColor = 'green';
greenButton.style.border = 'green';
greenButton.addEventListener('click', function() { greenButtonClick(); });

var yellowButton = document.createElement("button");
yellowButton.id = "yellowButton";
yellowButton.style.backgroundColor = 'yellow';
yellowButton.style.border = 'yellow';
yellowButton.addEventListener('click', function() { yellowButtonClick(); });

var purpleButton = document.createElement("button");
purpleButton.id = "purpleButton";
purpleButton.style.backgroundColor = 'purple';
purpleButton.style.border = 'purple';
purpleButton.addEventListener('click', function() { purpleButtonClick(); });

var whiteButton = document.createElement("button");
whiteButton.id = "whiteButton";
whiteButton.style.backgroundColor = 'white';
whiteButton.style.border = 'white';
whiteButton.addEventListener('click', function() { whiteButtonClick(); });

var redGradeButton = document.createElement("button");
redGradeButton.id = "redGradeButton";
redGradeButton.style.backgroundColor = 'red';
redGradeButton.style.border = 'red';
redGradeButton.addEventListener('click', function() { redGradeButtonClick(); });

var whiteGradeButton = document.createElement("button");
whiteGradeButton.id = "whiteGradeButton";
whiteGradeButton.style.backgroundColor = 'white';
whiteGradeButton.style.border = 'white';
whiteGradeButton.addEventListener('click', function() { whiteGradeButtonClick(); });

var clickRound = 0;

var guessMatrix =   [['0', '0', '0', '0'],
                     ['0', '0', '0', '0'],
                     ['0', '0', '0', '0'],
                     ['0', '0', '0', '0'],
                     ['0', '0', '0', '0'],
                     ['0', '0', '0', '0'],
                     ['0', '0', '0', '0'],
                     ['0', '0', '0', '0'],
                     ['0', '0', '0', '0'],
                     ['0', '0', '0', '0']];
                    
var element = {
    x: 0,
    y: 0
};

var grade = {
    reds: 0,
    whites: 0
};

var code = ["blue", "green", "blue", "green"]

//
// end globals
//

function startGame() {
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.setAttribute('id', 'board');
        this.canvas.height = screenSize.height;
        this.canvas.width = screenSize.width;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        rectangle(sideBarWidth, screenSize.height, "#1f1f14", screenSize.width - sideBarWidth, 0);
        drawBoard(screenSize);
        drawGuessButtons();
        drawGradeButtons();
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function drawGuessButtons() {
    var hOffset = verticalOffsetOfCanvas;
    hOffset += (screenSize.height * 1.5 / numRows) - (buttonSize / 2);
    drawGuessButton(redButton, hOffset);
    hOffset += (screenSize.height / numRows);
    drawGuessButton(blueButton, hOffset);
    hOffset += (screenSize.height / numRows);
    drawGuessButton(greenButton, hOffset);
    hOffset += (screenSize.height / numRows);
    drawGuessButton(yellowButton, hOffset);
    hOffset += (screenSize.height / numRows);
    drawGuessButton(purpleButton, hOffset);
    hOffset += (screenSize.height / numRows);
    drawGuessButton(whiteButton, hOffset);
}

function drawGuessButton (button, hOffset) {
    var buttonSizePx = buttonSize + 'px';
    button.style.position = 'absolute';
    button.style.width = buttonSizePx;
    button.style.height = buttonSizePx;
    var wOffset = document.getElementById("board").offsetLeft;
    wOffset += screenSize.width - (sideBarWidth / 2) - buttonSize / 2;
    wOffsetStr = wOffset + 'px';
    hOffsetStr = hOffset + 'px';
    button.style.top = hOffsetStr;
    button.style.left = wOffsetStr;
    document.body.appendChild(button);
}

function drawGradeButtons() {
    var hOffset = verticalOffsetOfCanvas + (screenSize.height / numRows)*7;
    hOffset += (screenSize.height * 1.5 / numRows) - (buttonSize / 2);
    drawGradeButton(redGradeButton, hOffset);
    hOffset += (screenSize.height / numRows);
    drawGradeButton(whiteGradeButton, hOffset);
}

function drawGradeButton (button, hOffset) {
    var buttonSizePx = (buttonSize / 2)+ 'px';
    button.style.position = 'absolute';
    button.style.width = buttonSizePx;
    button.style.height = buttonSizePx;
    var wOffset = document.getElementById("board").offsetLeft;
    wOffset += screenSize.width - (sideBarWidth / 2) - buttonSize / 2;
    wOffsetStr = wOffset + 'px';
    hOffsetStr = hOffset + 'px';
    button.style.top = hOffsetStr;
    button.style.left = wOffsetStr;
    document.body.appendChild(button);
}



function redButtonClick () {
    processClick(redButton.style.backgroundColor);
}

function blueButtonClick () {
    processClick(blueButton.style.backgroundColor);
}

function greenButtonClick () {
    processClick(greenButton.style.backgroundColor);
}

function yellowButtonClick () {
    processClick(yellowButton.style.backgroundColor);
}

function purpleButtonClick () {
    processClick(purpleButton.style.backgroundColor);
}

function whiteButtonClick () {
    processClick(whiteButton.style.backgroundColor);
}

function redGradeButtonClick () {
    processGradeClick(redGradeButton.style.backgroundColor);
}

function whiteGradeButtonClick () {
    processGradeClick(whiteGradeButton.style.backgroundColor);
}

function processClick(color) {
    getClickIndex();
    drawGuessCircle(element.x, element.y, color);
    guessMatrix[element.y - 1][element.x - 1] = color;
    if (element.x < 4) {
    }
    //finished a guess
    else {
        //make this the actual grade
        computerGrade(element.y - 1);
        var y = element.y;
        var x = 0;
        for (i = 1; i <= grade.reds; i++) {
            x++;
            drawGradeCircle(x, y, "red");
        }
        for (i = 1; i <= grade.whites; i++) {
            x++;
            drawGradeCircle(x, y, "white");
        }
        
        if (grade.reds === 4) {
            alert("YAY YOU WON");
        }
        else if (element.y === 10) {
                //PLAY A LOSE SCREEN HERE
                alert("U A LOSER");
        }
    }
}

function processGradeClick(color) {
    drawGradeCircle(numPlayerGradeClicks, element.y, color);
    numPlayerGradeClick++;
    if (numPlayerGradeClick > 4) {
        alert("too many player grades entered");
    }
}

function getClickIndex() {
    for (i=0; i < 10; i++) {
        for (j=0; j < 4; j++) {
            if (guessMatrix[i][j] === '0') {
                element.x = j + 1;
                element.y = i + 1;
                return;
            } 
        }
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
    this.r = r;
    this.x = x;
    this.y = y;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    ctx.fill();
}

function text(font, text, x, y) {
    //this.font = font
    //this.text = text
    //this.x = x
    //this.y = y
    ctx = myGameArea.context;
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.fillStyle = "white"
    ctx.fillText(text, x, y);
    //ctx.fillText(text, x-50, y+50);
}

function drawGuessCircle(x_loc, y_loc, color) {
    this.x = x_loc * guessBarWidth / 5;
    this.y = y_loc * screenSize.height / numRows + screenSize.height / (numRows * 2 );
    circle(guessr, color, this.x, this.y);
}

function drawGradeCircle(x_loc, y_loc, color) {
    this.x = guessBarWidth + (x_loc * gradeBarWidth / 5);
    this.y = y_loc * screenSize.height / numRows + screenSize.height / (numRows * 2 );
    circle(grader, color, this.x, this.y);
}

function computerGrade(gradeRow) {
    toBeGraded = guessMatrix[gradeRow]
    if (toBeGraded.includes('0')) {
        alert("fail");
    }
    grade.reds = 0;
    grade.whites = 0;
    const guess_2 = [];
    const code_2 = [];
    for (i = 0; i < 4; i++) {
        if (code[i] === toBeGraded[i]) {
            grade.reds++;  
        }
        else {
            guess_2.push(toBeGraded[i]);
            code_2.push(code[i]);
        }
    }
    while (guess_2.length !== 0) {
        if (code_2.includes(guess_2[0])) {
            grade.whites++;
            toRemoveIndex = code_2.indexOf(guess_2[0]);
            code_2.splice(toRemoveIndex, 1);
        }
        guess_2.splice(0, 1);
    }
}


function drawBoard(screenSize) {
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
    text(this.fontString, "GRADES", guessBarWidth + gradeBarWidth * 1.5, screenSize.height - (screenSize.height * 3 / numRows) - fontSize);
}




