//
// Globals
//
var firstTry = true
var $  = require( 'jquery' );
var dt = require( 'datatables.net' )();
require( 'datatables.net-dt' )();

const blobSasUrl = "https://mileswadestorage.blob.core.windows.net/?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-09-02T04:48:45Z&st=2020-09-13T20:48:45Z&spr=https&sig=tSjrhu3vPRx8OjGHFsrj5Xc5jLfAqtjVXm8olr7l4AM%3D";

var myGamePiece;

/*const screenSize = {
    height : 0.6 * screen.height,
    width : 0.6 * screen.height
};*/

const screenSize = {
    height : 0.85 * window.innerHeight,
    width : 0.95 * window.innerWidth
};

var setGameBoardMarginToZero = false;
// never wider than square
if (screenSize.height < screenSize.width) {
    screenSize.width = screenSize.height;
}
else {
    setGameBoardMarginToZero = true;
}

var sideBarWidth = screenSize.width / 5;
//Ask dad if we should change this
var gradeBarWidth = sideBarWidth;
var guessBarWidth = screenSize.width - sideBarWidth - gradeBarWidth;
var numRows = 11;
var buttonSize = sideBarWidth / 3;
var gradeButtonSize = buttonSize * 0.6;
var verticalOffsetOfCanvas = 10;
var color_clicked = 'black';
//grade, guess circle radius
var guessr = (screenSize.height / (numRows * 2)) * 0.5;
var grader = (screenSize.height / (numRows * 2)) * 0.2;
var guess_loc = [1, 1];

var redButton = document.createElement("button");
redButton.id = "redButton";
redButton.style.backgroundColor = 'red';
redButton.addEventListener('click', function() { redButtonClick(); });

var blueButton = document.createElement("button");
blueButton.id = "blueButton";
blueButton.style.backgroundColor = 'blue';
blueButton.addEventListener('click', function() { blueButtonClick(); });

var greenButton = document.createElement("button");
greenButton.id = "greenButton";
greenButton.style.backgroundColor = 'green';
greenButton.addEventListener('click', function() { greenButtonClick(); });

var yellowButton = document.createElement("button");
yellowButton.id = "yellowButton";
yellowButton.style.backgroundColor = 'yellow';
yellowButton.addEventListener('click', function() { yellowButtonClick(); });

var purpleButton = document.createElement("button");
purpleButton.id = "purpleButton";
purpleButton.style.backgroundColor = 'purple';
purpleButton.addEventListener('click', function() { purpleButtonClick(); });

var whiteButton = document.createElement("button");
whiteButton.id = "whiteButton";
whiteButton.style.backgroundColor = 'white';
whiteButton.addEventListener('click', function() { whiteButtonClick(); });

var redGradeButton = document.createElement("button");
redGradeButton.id = "redGradeButton";
redGradeButton.style.backgroundColor = 'red';
redGradeButton.addEventListener('click', function() { redGradeButtonClick(); });

whiteGradeButton = document.createElement("button");
whiteGradeButton.id = "whiteGradeButton";
whiteGradeButton.style.backgroundColor = 'white';
whiteGradeButton.addEventListener('click', function() { whiteGradeButtonClick(); });

var mainButton = document.createElement("button");
mainButton.id = "mainButton";
mainButton.style.backgroundColor = 'purple';
mainButton.addEventListener('click', function() { mainButtonClick(); });


var doneButton = document.createElement("button");
doneButton.id = "doneButton";
doneButton.style.backgroundColor = 'blue';
doneButton.addEventListener('click', function() { doneButtonClick(); });

var helpButton = document.createElement("button");
helpButton.id = "helpButton";
helpButton.style.backgroundColor = 'purple';
helpButton.addEventListener('click', function() { helpButtonClick(); });

var backButton = document.createElement("button");
backButton.id = "backButton";
backButton.style.backgroundColor = 'blue';
backButton.addEventListener('click', function() { backButtonClick(); });

var resetButton = document.createElement("button");
resetButton.id = "resetButton";
resetButton.style.backgroundColor = 'grey';
resetButton.addEventListener('click', function() { resetButtonClick(); });


var modeButton = document.createElement("button");
modeButton.id = "modeButton";
modeButton.style.backgroundColor = 'black';
modeButton.style.border = 'black';
modeButton.addEventListener('click', function() { modeButtonClick(); });

var mode = {
    codeBreaker: 'Breaker',
    codeMaker: 'Maker',
    value: 'Breaker'
};


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


var code = [];

var numPlayerGradeClicks = 0;

var gradeRow = 0;

colors = ["red", "blue", "green", "yellow", "purple", "white"]
posCodes = []
subCode = []
for (i=0; i<6; i++) {
    for (j=0; j<6; j++) {
        for (k=0; k<6; k++) {
            for (l=0; l<6; l++) {
                subCode = [colors[i], colors[j], colors[k], colors[l]];
                posCodes.push(subCode);
            }
        }
    }
}
var temp = 0;
var currentUsername = "bob";

var overallStats = {
    gamesPlayed: 0,
    averageTries: 10,
    highScore: 10,
    timesVisited: 0,
    best: ["nobody, yet", "nobody, yet"]
}

var userStats = {
    gamesPlayed: 0,
    gamesWon: 0,
    winRate: 0,
    averageTries: 0,
    highScore: 0,
    timesVisited: 0
}

var statType = {
    overall: "overallStats",
    user: "individualStats",
    value: "individualStats"
}

//azure blob storage globals
testing = 0

//
// end globals
//

var newSession = true;

var guest = false;


window.startMenu = async function startMenu() {
    if (!sessionStorage.getItem("newSessionStorage")) {
        sessionStorage.setItem("newSessionStorage", "0000000")
        sessionStorage.setItem("guest", "false");
        newSession = true; 
        helpButtonClick();
        currentUsername = window.prompt("Enter Player Name");
        if (currentUsername  === "resetOverallStats") {
            if (confirm("Are you sure you want to reset overall stats")) {
                await uploadOverallStats();
            }
        }

        else if (currentUsername === "" || currentUsername == null) {
            sessionStorage.setItem("guest", "true");
            return;
        }

        sessionStorage.setItem("username", currentUsername);
        blobExists = await checkForBlobs("mw-mastermind-usernames", "usernames")
        if (blobExists) {
            usernameInfo = await downloadFromBlob("mw-mastermind-usernames", "usernames");
            usernameInfo = JSON.parse(usernameInfo);
            if (usernameInfo.includes(currentUsername)) {
                userStats = getUserStats(currentUsername);
            }
            else {
                usernameInfo.push(currentUsername);
                usernameStr = JSON.stringify(usernameInfo);
                await uploadToBlob("mw-mastermind-usernames", "usernames", usernameStr);
                await startStats(currentUsername);
            }
        }
        else {
            usernameInfo = [currentUsername];
            UNIstr = JSON.stringify(usernameInfo)
            await uploadToBlob("mw-mastermind-usernames", "usernames", UNIstr)
            await startStats(currentUsername);
        }
        await updateTimesVisited(currentUsername); 

        
    }
    else {
        newSession = false;
        guest = sessionStorage.getItem("guest");
        if (guest === "false") {
            currentUsername = sessionStorage.getItem("username");
        }
    }

    if (! await checkForBlobs("mw-mastermind-usernames", "overallStats")) {
        //create
        await uploadOverallStats();
    }
}


window.startGame = function startGame() {
    guest = sessionStorage.getItem("guest")
    if (guest === "false") {
        currentUsername = sessionStorage.getItem("username");
    }
    myGameArea.start();
}

window.startStatPage = async function startStatPage() {
    guest = sessionStorage.getItem("guest")
    if (guest === "false") {
        currentUsername = sessionStorage.getItem("username");
    }
    await getOverallStats();
    //
    //setGameBoardMArginToZero is basically saying if its on a phone fyi
    //
    if (setGameBoardMarginToZero == true) {
        width = document.getElementById("scoreboard").offsetWidth;
        document.getElementById("statsDivGlobal").style.minWidth = String(width) + "px";
        document.getElementById("statsDivGlobal").style.left = "0px";
        document.getElementById("gamesPlayed").style.fontSize = "3vw";
        document.getElementById("averageTries").style.fontSize = "3vw";
    }
    document.getElementById("statsDivGlobal").style.minWidth = String(screenSize.width * 1.235) + "px";
    var totalAverageTries = await table();
    document.getElementById("gamesPlayed").innerHTML = "Total Games Played: " + overallStats.gamesPlayed;
    document.getElementById("averageTries").innerHTML = "Average Guesses: " + Math.round(totalAverageTries);
    
}

/*
window.overallStatPage = async function overallStatPage() {
    await getOverallStats();
    document.getElementById("statsDivGlobal").style.zIndex = "1";
    document.getElementById("statsDivUser").style.zIndex = "0";
    
    await table();

    document.getElementById("gamesPlayed").innerHTML = "Total games played, by everyone: " + overallStats.gamesPlayed;
    document.getElementById("averageTries").innerHTML = "Best average number of guesses: " + overallStats.averageTries + ", set by " + bestATuser;
    document.getElementById("highScore").innerHTML = "Best score EVER: " + overallStats.highScore + ", set by " + bestScoreUser;
    document.getElementById("timesVisited").innerHTML = "Total times visited, by everyone: " + overallStats.timesVisited;
    
}*/

window.table = async function table() {
        data = [];
        averages = [];
        curUserStats = userStats;
        usernameInfo = await downloadFromBlob("mw-mastermind-usernames", "usernames");
        usernameInfo = JSON.parse(usernameInfo)
        var totalAverageTries = 0;

        //get the averages
        for (i=0; i<usernameInfo.length; i++) {
            username = usernameInfo[i];
            await getUserStats(username);
            averages.push([userStats.averageTries, username]);
        }
        
        //calculate and put together data
        sortedAverages = sortArray(averages)
        for (i=0; i<usernameInfo.length; i++) {
            username = sortedAverages[i][1];
            await getUserStats(username);
            totalAverageTries += userStats.averageTries;
            for (j=0; j<sortedAverages.length; j++) {
                minilist = sortedAverages[j]
                if (minilist[1] == username) {
                    rank = sortedAverages.length - j;
                }
            }

            curRow = [rank, username, userStats.gamesPlayed, String(userStats.winRate) + "%", userStats.highScore, userStats.averageTries];
            data.unshift(curRow);
        }

        //sort through ties
        currentAT = 0;
        currentRank = 1;
        for (i=0; i<data.length; i++) {
            curRow = data[i]
            aT = curRow[5];
            if (currentAT == aT) {
                data[i][0] = currentRank;
            }
            else {
                currentRank = curRow[0];
                currentAT = aT;
            }
        }
        //totalAverageTries /= usernameInfo.length; 
        //userStats = curUserStats;
        $(document).ready(function() {
            $('#scoreboard').DataTable( {
                data: data
            } );
        } );
        //alert(totalAverageTries)
        return totalAverageTries;
}



async function updateTimesVisited(currentUsername) {
    await getUserStats(currentUsername);
    currentTV = userStats.timesVisited
    userStats.timesVisited = (currentTV + 1);
    await uploadUserStats(currentUsername);
    await getOverallStats();
    overallStats.timesVisited += 1;
    await uploadOverallStats();

}
    
const uploadToBlob = async (containerName, blobName, data) => {
    // Create a new BlobServiceClient
    const { BlobServiceClient } = require("@azure/storage-blob");
    const blobServiceClient = new BlobServiceClient(blobSasUrl);
    // Get a container client from the BlobServiceClient
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    
    await blockBlobClient.upload(data, data.length);
}

const downloadFromBlob = async (containerName, blobName) => {
    // Create a new BlobServiceClient
    const { BlobServiceClient } = require("@azure/storage-blob");
    const blobServiceClient = new BlobServiceClient(blobSasUrl);
    // Get a container client from the BlobServiceClient
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const blobClient = containerClient.getBlobClient(blobName);
    const downloadBlockBlobResponse = await blobClient.download();

    downloaded = await blobToString(await downloadBlockBlobResponse.blobBody);
    return downloaded;

    async function blobToString(blob)  {
        const fileReader = new FileReader();
        return new Promise((resolve, reject) => {
          fileReader.onloadend = (ev) => {
            resolve(ev.target.result);
          };
          fileReader.onerror = reject;
          fileReader.readAsText(blob);
        });
      }

}

const deleteBlob = async (containerName, blobName) => {
    // Create a new BlobServiceClient
    const { BlobServiceClient } = require("@azure/storage-blob");
    const blobServiceClient = new BlobServiceClient(blobSasUrl);
    // Get a container client from the BlobServiceClient
    const containerClient = blobServiceClient.getContainerClient(containerName);

    await containerClient.deleteBlob(blobName);
}

const checkForBlobs = async (containerName, blobName) => {
    const { BlobServiceClient } = require("@azure/storage-blob");
    const blobServiceClient = new BlobServiceClient(blobSasUrl);
    // Get a container client from the BlobServiceClient
    const containerClient = blobServiceClient.getContainerClient(containerName);
    
    let iter = containerClient.listBlobsFlat();
    for await (const blob of iter) {
        if (blob.name === blobName) {
            return true;
        }
    }
    return false;
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.setAttribute('id', 'board');
        this.canvas.height = screenSize.height;
        this.canvas.width = screenSize.width;
        // i.e., on a phone
        if (setGameBoardMarginToZero) {
            this.canvas.style.marginLeft = "0px";
        }
        else {
            this.canvas.style.marginLeft = String((window.innerWidth - this.canvas.width) / 2) + "px";
        }
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        rectangle(sideBarWidth, screenSize.height, "#1f1f14", screenSize.width - sideBarWidth, 0);
        drawBoard();
        drawGuessButtons();
        drawGradeButtons();
        drawDoneButton(doneButton);
        drawHelpButton(helpButton);
        drawBackButton(backButton);
        drawResetButton(resetButton);
        drawModeButton(modeButton);
        drawMainButton(mainButton);
        if (mode.value === mode.codeBreaker) {
            computerCode();
        }
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    reset: function() {
        // set state variables. this is super unacceptable
        grade.reds = 0;
        grade.whites = 0;
        element.x = 0;
        element.y = 0;

        clickRound = 0;

        guessMatrix =   [['0', '0', '0', '0'],
                             ['0', '0', '0', '0'],
                             ['0', '0', '0', '0'],
                             ['0', '0', '0', '0'],
                             ['0', '0', '0', '0'],
                             ['0', '0', '0', '0'],
                             ['0', '0', '0', '0'],
                             ['0', '0', '0', '0'],
                             ['0', '0', '0', '0'],
                             ['0', '0', '0', '0']];
        
        temp = 0;        
        code = [];
        gradeRow = 0

        firstTry = true

        this.start();
    },

    backCB: function() {
        if (element.x != 4) {
            guessMatrix[element.y - 1][element.x - 1] = '0'

            drawGuessCircle(element.x, element.y, "black")
            if (element.x == 1) {
                element.x = 4;
                element.y -= 1;
            }
            else {
                element.x -= 1;
            }
        }
    },

    backCM: function(grading) {
        if (grading) {
            for (i=0; i<4; i++) {
                drawGradeCircle(i+1, element.y, "black");
            }
            grade.reds = 0;
            grade.whites = 0;
        }
        else {
            drawGuessCircle(temp, 0, "black")
            temp -= 1
            code.pop()
            if (temp === 3) {

                for (i=0; i<4; i++) {
                    drawGuessCircle(i+1, 1, "black")
                    guessMatrix[0] = ['0', '0', '0', '0']
                    element.x = 1;
                    element.y = 1;

                }
            }
        }
    },
    resetStats: async function() {
        if (guest === "true") {
            alert("You don't have any stats to reset!")
        }
        else if (confirm("Are you sure you want to reset your statistics?")) {
            await startStats(currentUsername);
            await getUserStats(currentUsername);
            location.reload();
        }
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

function drawGradeButtons() {
    var hOffset = verticalOffsetOfCanvas + (screenSize.height / numRows)*7 + (screenSize.height * 1.5 / numRows) - (gradeButtonSize / 2);
    drawGradeButton(redGradeButton, hOffset);
    hOffset += (screenSize.height / numRows);
    drawGradeButton(whiteGradeButton, hOffset);
}

function drawMainButton(button) {
    var hOffset = verticalOffsetOfCanvas;
    button.style.position = 'absolute';
    button.style.width = String(sideBarWidth - 1) + "px";
    button.style.height = String((screenSize.height / numRows) - 1) + "px ";
    button.style.borderRadius = "0px";
    var wOffset = document.getElementById("board").offsetLeft + guessBarWidth + 1;
    //wOffset += screenSize.width - (sideBarWidth / 2) - buttonSize / 2;
    wOffsetStr = wOffset + 'px';
    hOffsetStr = hOffset + 'px';
    button.style.top = hOffsetStr;
    button.style.left = wOffsetStr;
    button.textContent = " Main Menu";
    var arrow = document.createElement("I")
    arrow.classList.add("arrow");
    arrow.classList.add("left")
    //button.appendChild(arrow);
    button.insertBefore(arrow, button.childNodes[0])
    
    //button.style.textAlign = "center";
    //button.style.fontSize = '13px';
    button.style.color = "white";
    document.body.appendChild(button);
}
function drawDoneButton(button) {
    var hOffset = verticalOffsetOfCanvas + (screenSize.height / numRows)* 10 - 1;
    button.style.position = 'absolute';
    button.style.width = String(sideBarWidth - 1) + "px";
    button.style.height = String((screenSize.height / numRows) - 1) + "px ";
    button.style.borderRadius = "0px";
    var wOffset = document.getElementById("board").offsetLeft + guessBarWidth + gradeBarWidth + 1;
    //wOffset += screenSize.width - (sideBarWidth / 2) - buttonSize / 2;
    wOffsetStr = wOffset + 'px';
    hOffsetStr = hOffset + 'px';
    button.style.top = hOffsetStr;
    button.style.left = wOffsetStr;
    button.textContent = "Done";
    button.style.color = "white";
    document.body.appendChild(button);
}

function drawHelpButton(button) {
    var hOffset = verticalOffsetOfCanvas + (screenSize.height / numRows)* 11 - 1;
    button.style.position = 'absolute';
    button.style.width = String(((guessBarWidth + gradeBarWidth) / 3) - 1) + "px";
    button.style.height = String((screenSize.height / numRows) - 1) + "px ";
    button.style.borderRadius = "0px";
    var wOffset = document.getElementById("board").offsetLeft;
    wOffsetStr = wOffset + 'px';
    hOffsetStr = hOffset + 'px';
    button.style.top = hOffsetStr;
    button.style.left = wOffsetStr;
    button.textContent = "Help";
    button.style.color = "white";
    document.body.appendChild(button);
}

function drawBackButton(button) {
    var hOffset = verticalOffsetOfCanvas + (screenSize.height / numRows)* 11 - 1;
    button.style.position = 'absolute';
    button.style.width = String(((guessBarWidth + gradeBarWidth) / 3) - 1) + "px";
    button.style.height = String((screenSize.height / numRows) - 1) + "px ";
    button.style.borderRadius = "0px";
    var baseWidth = document.getElementById("board").offsetLeft;
    var addedWidth = (guessBarWidth + gradeBarWidth) / 3;
    var wOffset = baseWidth + addedWidth;
    wOffsetStr = wOffset + 'px';
    hOffsetStr = hOffset + 'px';
    button.style.top = hOffsetStr;
    button.style.left = wOffsetStr;
    button.textContent = "Back";
    button.style.color = "white";
    document.body.appendChild(button);
}

function drawResetButton(button) {
    var hOffset = verticalOffsetOfCanvas + (screenSize.height / numRows)* 11 - 1;
    button.style.position = 'absolute';
    button.style.width = String(((guessBarWidth + gradeBarWidth) / 3) - 1) + "px";
    button.style.height = String((screenSize.height / numRows) - 1) + "px ";
    button.style.borderRadius = "0px";
    var baseWidth = document.getElementById("board").offsetLeft;
    var addedWidth = ((guessBarWidth + gradeBarWidth) / 3);
    var wOffset = baseWidth + addedWidth * 2 + 1
    wOffsetStr = wOffset + 'px';
    hOffsetStr = hOffset + 'px';
    button.style.top = hOffsetStr;
    button.style.left = wOffsetStr;
    button.textContent = "Reset";
    button.style.color = "white";
    document.body.appendChild(button);
}

function drawModeButton(button) {
    var hOffset = verticalOffsetOfCanvas + (screenSize.height / numRows)* 11 - 1;
    button.style.position = 'absolute';
    button.style.width = String(sideBarWidth - 1) + "px";
    button.style.height = String((screenSize.height / numRows) - 1) + "px ";
    button.style.borderRadius = "0px";
    var wOffset = document.getElementById("board").offsetLeft + guessBarWidth + gradeBarWidth + 1;
    //wOffset += screenSize.width - (sideBarWidth / 2) - buttonSize / 2;
    wOffsetStr = wOffset + 'px';
    hOffsetStr = hOffset + 'px';
    button.style.top = hOffsetStr;
    button.style.left = wOffsetStr;
    button.textContent = mode.value;
    //button.style.textAlign = "center";
    //button.style.fontSize = '13px';
    button.style.color = "grey";
    document.body.appendChild(button);
}

function drawGuessButton(button, hOffset) {
    var buttonSizePx = buttonSize + 'px';
    button.style.position = 'absolute';
    button.style.borderRadius = '100%'
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

function drawGradeButton(button, hOffset) {
    var buttonSizePx = (buttonSize / 2)+ 'px';
    button.style.position = 'absolute';
    button.style.borderRadius = '100%'
    button.style.width = buttonSizePx;
    button.style.height = buttonSizePx;
    var wOffset = document.getElementById("board").offsetLeft;
    wOffset += screenSize.width - (sideBarWidth / 2) - gradeButtonSize / 2;
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

window.mainButtonClick = function mainButtonClick() {
    window.location.href = "index.html";
}

function doneButtonClick() {
    if (mode.value == mode.codeMaker && code != []) {
        for (index=0; index<10; index++) {
            row = guessMatrix[index]
            if (row.includes('0')) {
                gradeRow = index;
                break;
            }
        }
    }
    realGrade = [grade.reds, grade.whites]
    computerGrade(guessMatrix[gradeRow - 1], code)
    if ((grade.reds != realGrade[0]) || (grade.whites != realGrade[1])) {
        alert("hmm. check your work...")
        grade.reds = realGrade[0]
        grade.whites = realGrade[1]
    }
    
    computerGuess(gradeRow)
} 

function modeButtonClick() {
    if (mode.value === mode.codeBreaker) {
        mode.value = mode.codeMaker;
    }
    else {
        mode.value = mode.codeBreaker;
    }
    document.getElementById("modeButton").textContent = mode.value;
    myGameArea.reset();
    if (mode.value === mode.codeBreaker) {
        computerCode();
    }

} 


function helpButtonClick() {
    /*var instructionsButton = document.createElement("button");
    instructionsButton.id = "helpButton";
    instructionsButton.style.backgroundColor = 'white';
    instructionsButton.style.border = 'white';
    helpButton.addEventListener('click', function() { helpButtonClick(); });

    var hOffset = verticalOffsetOfCanvas + (screenSize.height / numRows)* 11 - 1;
    instructionsButton.style.position = 'absolute';
    instructionsButton.style.width = String(guessBarWidth + gradeBarWidth - 1) + "px";
    instructionsButton.style.height = String((screenSize.height / numRows) - 1) + "px ";
    instructionsButton.style.borderRadius = "0px";
    var wOffset = document.getElementById("board").offsetLeft;
    //wOffset += screenSize.width - (sideBarWidth / 2) - instructionsButtonSize / 2;
    wOffsetStr = wOffset + 'px';
    hOffsetStr = hOffset + 'px';
    instructionsButton.style.top = hOffsetStr;
    instructionsButton.style.left = wOffsetStr;
    instructionsButton.textContent = "Just do it";
    instructionsButton.style.color = "black";
    document.body.appendChild(instructionsButton);
    //instructionsButton.addEventListener('click', function() { helpButtonClick(); });
        
    //textBlock.innerText = "Help";
    //document.body.appendChild(textBlock);*/
    var msg = "Welcome to Mastermind. ";
    msg += "Attempt to guess the secret code or create a secret code for the computer to guess.\n\n";
    msg += "To guess or grade, use the buttons on the right-hand side of the game board. ";
    msg += "To change play mode, click the \"Maker/Breaker\" button in the lower right corner of the game board.\n";
    msg += "A red grade peg indicates that a guess is the correct color in the correct position. ";
    msg += "A white grade peg indicates that a guess is the correct color, but in the incorrect position. ";

    alert(msg);

} 

function backButtonClick() {
    if (mode.value == mode.codeMaker) {
        myGameArea.backCM();
    }
    else {
        myGameArea.backCB()
    }
}

function resetButtonClick() {
    myGameArea.reset()
}

window.resetStatClick = async function resetStatClick() {
    await myGameArea.resetStats();
}

window.switchStatClick = async function switchStatClick() {
    if (statType.value == statType.user) {
        statType.value = statType.overall;
        document.getElementById("switchStats").innerHTML = "Overall Stats";
        document.getElementById("statsDivGlobal").style.zIndex = "1";
        document.getElementById("statsDivUser").style.zIndex = "0";
    }
    else if (statType.value == statType.overall) {
        statType.value = statType.user;
        document.getElementById("switchStats").innerHTML = "Individual Stats";
        document.getElementById("statsDivGlobal").style.zIndex = "0";
        document.getElementById("statsDivUser").style.zIndex = "1";
    }
}

window.settingsButtonClick = function settingsButtonClick() {
    alert("coming soon")
}


async function processClick(color) {
    if (mode.value === mode.codeBreaker) {
        getClickIndex();
        drawGuessCircle(element.x, element.y, color);
        guessMatrix[element.y - 1][element.x - 1] = color;
        if (element.x < 4) {
        }
        //finished a guess
        else {
            //make this the actual grade
            gradeRow = element.y - 1
            toBeGraded = guessMatrix[gradeRow]
            computerGrade(toBeGraded, code);
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
                if (guest === "true") {
                    newHighScore = false;
                }
                else {
                    newHighScore = await setStats(true, element.y);
                }
                winScreen();
                setTimeout(function() {
                    msg = "Congratulations, you won! \n";
                    if (newHighScore) {
                        msg += "New high score: " + userStats.highScore + "! \n";
                    }
                    msg += "Play again?"
                    

                    if (confirm(msg)) {
                        myGameArea.reset();
                    }
                    else {
                        //should we leave it how it is, or go to the main menu?
                        //i think main menu
                        //hmm actually maybe just leave it how it is, and then make a button to go back to the main menu
                    }

                }, 2500);

                
            }
            else if (element.y === 10) {
                if (guest === "false") {
                    await setStats(false, 10);
                }
                loseScreen();
                setTimeout(function() {
                    for (j=0; j<4; j++) {
                        drawGuessCircle(j + 1, 0, code[j]);
                    }
                    if (firstTry) {
                        alert("Nice try :(")
                        firstTry = false;
                    }
                    else {
                        alert("FAIL")
                    }
                }, 2000);
            }
        }
    }
    else {
        if (temp < 4) {
            temp += 1
            drawGuessCircle(temp, 0, color);
            code.push(color)
            if (temp === 4) {
                computerGuess(0)
            }
        }
        else {
            alert("You are the code maker, you can't try to crack your own code.");
        }
    }
}

function processGradeClick(color) {
    if (mode.value == mode.codeMaker) {
        numPlayerGradeClicks++;
        if (numPlayerGradeClicks > 4) {
            alert("too many player grades entered");
        }
        else {
            if (color === "red") {
                grade.reds++;
            }
            else if (color === "white") {
                grade.whites++;
            }
            drawGradeCircle(numPlayerGradeClicks, element.y, color);
        }
    }
    else {
        alert("You are the code breaker, you can't grade your own guess.");
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
    ctx.fillText(text, x, y, 0.8 * sideBarWidth);
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

function sortArray(array) {
    sortedArray = array.sort(function(a,b){return b[0] - a[0]})
    return sortedArray
}

function winScreen() {
    var mode = 0;
    var flashing = setInterval(flash, 100);
    function flash() {
        mode++;
        if (mode % 2 == 1) {
            for (j=0; j<4; j++) {
                drawGuessCircle(j + 1, 0, code[j]);
            }
        }
        else {
            for (j=0; j<4; j++) {
                drawGuessCircle(j + 1, 0, "black");
            }
        }
        if (mode == 20) {
            clearInterval(flashing)
        }
    }


}

function loseScreen() {
    var count = 0;
    var flashing = setInterval(change, 200);

    function change() {
        count++;
        if (count == 10) {
            clearInterval(flashing)
        }
        
        else {
            for (j=0; j<4; j++) {
                color = colors[Math.floor(Math.random() * 6)];
                drawGuessCircle(j + 1, 0, color);
            }
        }
        
    }
}


async function uploadUserStats(currentUsername) {
    statsStr = JSON.stringify(userStats);
    containerName = "mw-mastermind-stats";
    await uploadToBlob(containerName, currentUsername, statsStr);
}

async function getUserStats(currentUsername) {
    containerName = "mw-mastermind-stats";
    statsStr = await downloadFromBlob(containerName, currentUsername)
    userStats = JSON.parse(statsStr);
}

async function startStats(currentUsername) {
    userStats = {
        highScore: 10,
        gamesPlayed: 0,
        gamesWon: 0,
        winRate: 0,
        averageTries: 10,
        timesVisited: 1
    }
    await uploadUserStats(currentUsername);
}

async function getOverallStats() {
    containerName = "mw-mastermind-usernames";
    statsStr = await downloadFromBlob(containerName, "overallstats")
    overallStats = JSON.parse(statsStr);
}

async function uploadOverallStats() {
    containerName = "mw-mastermind-usernames";
    statsStr = JSON.stringify(overallStats);
    await uploadToBlob(containerName, "overallstats", statsStr)
    
}


async function setStats(won, score) {
    await getUserStats(currentUsername);
    await getOverallStats();
    if (score < userStats.highScore) {
        userStats.highScore = score;
        newHighScore = true;
        if (score < overallStats.highScore) {
            overallStats.highScore = score;
            overallStats.best = [currentUsername, overallStats.best[1]];
        }
    }
    else {
        newHighScore = false;
    }

    userStats.gamesPlayed++;
    overallStats.gamesPlayed++;
    if (won) {
        userStats.gamesWon++;
    }
    newWR = Math.floor((userStats.gamesWon / userStats.gamesPlayed) * 100);
    userStats.winRate = newWR;
    currentAT = userStats.averageTries;
    currentTotalPoints = currentAT * (userStats.gamesPlayed - 1);
    newTotalPoints = currentTotalPoints + score;
    newAT = Math.round(newTotalPoints / userStats.gamesPlayed);
    userStats.averageTries = newAT;
    if (newAT < overallStats.averageTries) {
        overallStats.averageTries = newAT;
        overallStats.best = [overallStats.best[0], currentUsername];
    }

    await uploadUserStats(currentUsername);  
    await uploadOverallStats();
    return newHighScore;
}


function computerGrade(toBeGraded, code) {
    if (toBeGraded.includes('0')) {
        alert("Error 123: Coding Fail");
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

function removeCodes(posCodes, prevGuess) {
    var newPosCodes = [];
    realGrade = [grade.reds, grade.whites];
    for (index = 0; index < posCodes.length; index++) {
        posCode = posCodes[index];
        
        computerGrade(prevGuess, posCode);
        if ((grade.reds == realGrade[0]) && (grade.whites == realGrade[1])) {
            newPosCodes.push(posCode);
        }
    }
    posCodes = newPosCodes;
    grade.reds = realGrade[0];
    grade.whites = realGrade[1];
    return posCodes;
}


function computerGuess(gradeRow) {
    if (gradeRow === 0) {
        //very random, change
        guess = ["yellow", "green", "blue", "white"]
    }
    else if (grade.reds === 4) {
        alert("Computer Wins!!!");
        myGameArea.reset();
        return;
    }
    else {
        posCodes = removeCodes(posCodes, guessMatrix[gradeRow - 1])
        len = posCodes.length;
        if (len === 0) {
            alert("hmm. check your work...")
        }
        guess = posCodes[len - 1]
    }
    for (index=0; index<4; index++) {
        drawGuessCircle(index + 1, gradeRow + 1, guess[index]);
    }
    guessMatrix[gradeRow] = guess;
    element.y++;
    numPlayerGradeClicks = 0;
    grade.reds = 0;
    grade.whites = 0;
}

function computerCode() {
    code = []
    for (i=0; i<4; i++) {
        code.push(colors[Math.floor(Math.random() * 6)]);
    }
}



function drawBoard() {
    var skip_lines = [1, 7, 8, 10];
    for (i = 1; i < numRows; i++) {
        //horizontal lines
        this.y = i * screenSize.height / numRows;
        if (!(skip_lines.includes(i))) {
            rectangle(screenSize.width - sideBarWidth, 1, "black", 0, this.y);
        } 
        else {
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
    text(this.fontString, "GUESSES", guessBarWidth + gradeBarWidth * 1.5, (screenSize.height / (numRows * 2)) + fontSize / 2);
    text(this.fontString, "GRADES", guessBarWidth + gradeBarWidth * 1.5, screenSize.height - (screenSize.height * 3 / numRows) - fontSize);
    //computerCode();
    //computerGuess(0)
}
