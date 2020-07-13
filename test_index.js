var myGamePiece;
var sizeRatio = 4/4;
var sizeScaler = 640;
const screenSize = {
    height : sizeRatio * sizeScaler,
    width : sizeScaler
}
var sideBarWidth = screenSize.width / 5;

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
    var hOffset = screenSize.height / 8.4;
    drawGuessButton("red", hOffset);
}

function drawGuessButton (color, hOffset) {
    var buttonSize = sideBarWidth / 3;
    buttonSizePx = buttonSize + 'px';
    var button = document.createElement("BUTTON");
    button.style.position = 'absolute';
    button.setAttribute('class', 'buttonR');
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
    ctx = myGameArea.context
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    ctx.fill();

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
    for (i = 1; i < 11; i++) {
        //horizontal lines
        this.y = i * screenSize.height / 11;
        rectangle(screenSize.width, 1, "black", 0, this.y);
    }
    //dividing vertical lines
    rectangle(1, screenSize.height, "black", guessBarWidth, 0);
    rectangle(1, screenSize.height, "black", guessBarWidth + gradeBarWidth, 0);

    this.guessr = (screenSize.height / 22) * 0.5
    this.grader = (screenSize.height / 22) * 0.2;
    for (i = 0; i < 11; i++) {
        this.y = i * screenSize.height / 11 + screenSize.height / 22;
        for (j = 1; j < 5; j++) {
            //guessing circles
            this.x = j * guessBarWidth / 5;
            circle(this.guessr, "black", this.x, this.y);
            //grading circles
            this.x = guessBarWidth + (j * gradeBarWidth / 5);
            circle(this.grader, "black", this.x, this.y)
        }
        
    }
    
}



