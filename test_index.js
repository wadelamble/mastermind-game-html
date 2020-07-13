var myGamePiece;
var sizeRatio = 4/4;
var sizeScaler = 440;
const screenSize = {
    height : sizeRatio * sizeScaler,
    width : sizeScaler
}
var sideBarWidth = screenSize.width / 5;
var numRows = 11;
var verticalOffseTofCanvas = 10;
var buttonSize = sideBarWidth / 3;

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
    var hOffset = verticalOffseTofCanvas;
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
    button.setAttribute('onclick', 'clicked()');
    document.body.appendChild(button);
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
    ctx.fillText(text, x, y);
}

function clicked() {
    var offset = document.getElementById("board").offsetLeft;
    alert(offset);
}

function drawBoard(screenSize) {
    var sideBarWidth = screenSize.width / 5;
    //Ask dad if we should change this
    var gradeBarWidth = sideBarWidth;
    var guessBarWidth = screenSize.width - sideBarWidth - gradeBarWidth;
    for (i = 1; i < numRows; i++) {
        //horizontal lines
        this.y = i * screenSize.height / numRows;
        rectangle(screenSize.width - sideBarWidth, 1, "black", 0, this.y);
    }
    //dividing vertical lines
    rectangle(1, screenSize.height, "black", guessBarWidth, 0);
    rectangle(1, screenSize.height, "black", guessBarWidth + gradeBarWidth, 0);

    //shade the code box
    rectangle(guessBarWidth, (screenSize.height / numRows), "#331a00", 0, 0)
    rectangle(gradeBarWidth - 1, screenSize.height / numRows, "331a00", guessBarWidth + 1, 0)


    this.guessr = (screenSize.height / (numRows * 2)) * 0.5
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
                circle(this.grader, "black", this.x, this.y)
            }
        }
    }
}



