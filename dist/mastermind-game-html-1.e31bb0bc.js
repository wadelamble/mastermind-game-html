// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
//
// Globals -- eek so many, what's the right pattern here?
//
var myGamePiece;
/*const screenSize = {
    height : 0.6 * screen.height,
    width : 0.6 * screen.height
};*/

const screenSize = {
  height: 0.85 * window.innerHeight,
  width: 0.95 * window.innerWidth
};
var setGameBoardMarginToZero = false; // never wider than square

if (screenSize.height < screenSize.width) {
  screenSize.width = screenSize.height;
} else {
  setGameBoardMarginToZero = true;
}

var sideBarWidth = screenSize.width / 5; //Ask dad if we should change this

var gradeBarWidth = sideBarWidth;
var guessBarWidth = screenSize.width - sideBarWidth - gradeBarWidth;
var numRows = 11;
var buttonSize = sideBarWidth / 3; //this is only useful if it isn't a square

/*
if (buttonSize > ((screenSize.height / numRows) * 0.75)) {
    alert("hi")
    buttonSize = ((screenSize.height / numRows) * 0.75)
}
*/

var gradeButtonSize = buttonSize * 0.6;
var verticalOffsetOfCanvas = 10;
var color_clicked = 'black'; //grade, guess circle radius

var guessr = screenSize.height / (numRows * 2) * 0.5;
var grader = screenSize.height / (numRows * 2) * 0.2;
var guess_loc = [1, 1];
var redButton = document.createElement("button");
redButton.id = "redButton";
redButton.style.backgroundColor = 'red';
redButton.addEventListener('click', function () {
  redButtonClick();
});
var blueButton = document.createElement("button");
blueButton.id = "blueButton";
blueButton.style.backgroundColor = 'blue';
blueButton.addEventListener('click', function () {
  blueButtonClick();
});
var greenButton = document.createElement("button");
greenButton.id = "greenButton";
greenButton.style.backgroundColor = 'green';
greenButton.addEventListener('click', function () {
  greenButtonClick();
});
var yellowButton = document.createElement("button");
yellowButton.id = "yellowButton";
yellowButton.style.backgroundColor = 'yellow';
yellowButton.addEventListener('click', function () {
  yellowButtonClick();
});
var purpleButton = document.createElement("button");
purpleButton.id = "purpleButton";
purpleButton.style.backgroundColor = 'purple';
purpleButton.addEventListener('click', function () {
  purpleButtonClick();
});
var whiteButton = document.createElement("button");
whiteButton.id = "whiteButton";
whiteButton.style.backgroundColor = 'white';
whiteButton.addEventListener('click', function () {
  whiteButtonClick();
});
var redGradeButton = document.createElement("button");
redGradeButton.id = "redGradeButton";
redGradeButton.style.backgroundColor = 'red';
redGradeButton.addEventListener('click', function () {
  redGradeButtonClick();
});
whiteGradeButton = document.createElement("button");
whiteGradeButton.id = "whiteGradeButton";
whiteGradeButton.style.backgroundColor = 'white';
whiteGradeButton.addEventListener('click', function () {
  whiteGradeButtonClick();
});
var mainButton = document.createElement("button");
mainButton.id = "mainButton";
mainButton.style.backgroundColor = 'purple';
mainButton.addEventListener('click', function () {
  mainButtonClick();
});
var doneButton = document.createElement("button");
doneButton.id = "doneButton";
doneButton.style.backgroundColor = 'blue';
doneButton.addEventListener('click', function () {
  doneButtonClick();
});
var helpButton = document.createElement("button");
helpButton.id = "helpButton";
helpButton.style.backgroundColor = 'purple';
helpButton.addEventListener('click', function () {
  helpButtonClick();
});
var backButton = document.createElement("button");
backButton.id = "backButton";
backButton.style.backgroundColor = 'blue';
backButton.addEventListener('click', function () {
  backButtonClick();
});
var resetButton = document.createElement("button");
resetButton.id = "resetButton";
resetButton.style.backgroundColor = 'grey';
resetButton.addEventListener('click', function () {
  resetButtonClick();
});
var modeButton = document.createElement("button");
modeButton.id = "modeButton";
modeButton.style.backgroundColor = 'black';
modeButton.style.border = 'black';
modeButton.addEventListener('click', function () {
  modeButtonClick();
});
var mode = {
  codeBreaker: 'Breaker',
  codeMaker: 'Maker',
  value: 'Breaker'
};
var clickRound = 0;
var guessMatrix = [['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0']];
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
colors = ["red", "blue", "green", "yellow", "purple", "white"];
posCodes = [];
subCode = [];

for (i = 0; i < 6; i++) {
  for (j = 0; j < 6; j++) {
    for (k = 0; k < 6; k++) {
      for (l = 0; l < 6; l++) {
        subCode = [colors[i], colors[j], colors[k], colors[l]];
        posCodes.push(subCode);
      }
    }
  }
}

var temp = 0;
var currentUsername;
var overallStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  winRate: 0,
  averageTries: 0,
  highScore: 0,
  timesVisited: 0
};
var userStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  winRate: 0,
  averageTries: 0,
  highScore: 0,
  timesVisited: 0
};
var userName; //azure blob storage globals

testing = 0; //
// end globals
//

window.startMenu = function startMenu() {
  if (!sessionStorage.getItem("test")) {
    sessionStorage.setItem("test", "foo");
    helpButtonClick(); //this would be gotten from dad's thing

    currentUsername = window.prompt("Enter Player Name");

    try {
      usernameInfo = downloadFromBlob("mw-mastermind-usernames", "usernames");

      if (JSON.parse(usernameInfo).includes(currentUsername)) {//sign in
      } else {//create account
        }
    } catch (error) {
      usernameInfo = [currentUsername];
      UNIstr = JSON.stringify(usernameInfo);
      uploadToBlob("mw-mastermind-usernames", "usernames", UNIstr);
    }

    userStats = getStats(currentUsername);
  }

  updateTimesVisited(currentUsername);
};

window.startGame = function startGame() {
  myGameArea.start();
};

window.startStatPage = function startStatPage() {
  //getStats();
  document.getElementById("gamesPlayed").innerHTML = "Games played: " + userStats.gamesPlayed;
  document.getElementById("gamesWon").innerHTML = "Games won: " + userStats.gamesWon;
  document.getElementById("winRate").innerHTML = "Win Rate: " + userStats.winRate + "%";
  document.getElementById("averageTries").innerHTML = "Average number of guesses: " + userStats.averageTries;
  document.getElementById("highScore").innerHTML = "High score (least number of guessses): " + userStats.highScore; //we can un-comment this out, i just don't think its necessary. its kinda cool for us to see
  //document.getElementById("timesVisited").innerHTML = "Times you've visited this site: " + userStats.timesVisited;
};

window.overallStatPage = function overallStatPage() {
  overallStats = downloadFromBlob("mw-mastermind-usernames", "overallStats");
  overallStats = JSON.parse(overallStats);
  document.getElementById("gamesPlayed").innerHTML = "Most games played: " + overallStats.gamesPlayed;
  document.getElementById("gamesWon").innerHTML = "Most games won: " + overallStats.gamesWon;
  document.getElementById("winRate").innerHTML = "Highest win Rate: " + overallStats.winRate + "%";
  document.getElementById("averageTries").innerHTML = "Best average number of guesses: " + overallStats.averageTries;
  document.getElementById("highScore").innerHTML = "Lowest high score (least number of guessses): " + overallStats.highScore;
};

function updateTimesVisited(currentUsername) {
  getStats(currentUsername);
  currentTV = userStats.timesVisited;
  userStats.timesVisited = currentTV + 1;
  uploadStats(currentUsername);
  containerName = "mw-mastermind-usernames";

  try {
    overallStats = downloadFromBlob(containerName, "overallStats");
    overallStats = JSON.parse(overallStats);
    overallStats.timesVisited += 1;
    overallStatsStr = JSON.stringify(overallStats); //uploadToBlob("mw-mastermind-usernames", "overallStats", overallStatsStr);
  } catch (error) {
    overallStats = {
      gamesPlayed: 0,
      gamesWon: 0,
      winRate: 0,
      averageTries: 10,
      highScore: 0,
      timesVisited: 1
    };
    overallStatsStr = JSON.stringify(overallStats); //uploadToBlob("mw-mastermind-usernames", "overallStats", overallStatsStr)
  }
}

const uploadToBlob = async (containerName, blobName, data) => {
  const blobSasUrl = "https://mileswadestorage.blob.core.windows.net/?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2020-09-13T04:53:53Z&st=2020-09-12T20:53:53Z&spr=https,http&sig=0cR8UDG1GAFpT2ig%2FMj%2Bmu2I0yVMfl21U1RgLVKWjpg%3D"; // Create a new BlobServiceClient

  const blobServiceClient = new BlobServiceClient(blobSasUrl); // Get a container client from the BlobServiceClient

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.upload(data, data.length);
};

const downloadFromBlob = async (containerName, blobName) => {
  const blobSasUrl = "https://mileswadestorage.blob.core.windows.net/?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2020-09-13T04:53:53Z&st=2020-09-12T20:53:53Z&spr=https,http&sig=0cR8UDG1GAFpT2ig%2FMj%2Bmu2I0yVMfl21U1RgLVKWjpg%3D"; // Create a new BlobServiceClient

  const blobServiceClient = new BlobServiceClient(blobSasUrl); // Get a container client from the BlobServiceClient

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const blobClient = containerClient.getBlobClient(blobName);
  const downloadBlockBlobResponse = await blobClient.download();
  await blobToString(await downloadBlockBlobResponse.blobBody);
  return downloaded;

  async function blobToString(blob) {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onloadend = ev => {
        resolve(ev.target.result);
      };

      fileReader.onerror = reject;
      fileReader.readAsText(blob);
    });
  }
};

const deleteBlob = async (containerName, blobName) => {
  const blobSasUrl = "https://mileswadestorage.blob.core.windows.net/?sv=2019-12-12&ss=bfqt&srt=sco&sp=rwdlacupx&se=2020-09-13T04:53:53Z&st=2020-09-12T20:53:53Z&spr=https,http&sig=0cR8UDG1GAFpT2ig%2FMj%2Bmu2I0yVMfl21U1RgLVKWjpg%3D"; // Create a new BlobServiceClient

  const blobServiceClient = new BlobServiceClient(blobSasUrl); // Get a container client from the BlobServiceClient

  const containerClient = blobServiceClient.getContainerClient(containerName);
  await containerClient.deleteBlob(option.text);
};

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.setAttribute('id', 'board');
    this.canvas.height = screenSize.height;
    this.canvas.width = screenSize.width; // i.e., on a phone

    if (setGameBoardMarginToZero) {
      this.canvas.style.marginLeft = "0px";
    } else {
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
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  reset: function () {
    // set state variables. this is super unacceptable
    grade.reds = 0;
    grade.whites = 0;
    element.x = 0;
    element.y = 0;
    clickRound = 0;
    guessMatrix = [['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0'], ['0', '0', '0', '0']];
    temp = 0;
    code = [];
    gradeRow = 0;
    this.start();
  },
  backCB: function () {
    if (element.x != 4) {
      guessMatrix[element.y - 1][element.x - 1] = '0';
      drawGuessCircle(element.x, element.y, "black");

      if (element.x == 1) {
        element.x = 4;
        element.y -= 1;
      } else {
        element.x -= 1;
      }
    }
  },
  backCM: function (grading) {
    if (grading) {
      for (i = 0; i < 4; i++) {
        drawGradeCircle(i + 1, element.y, "black");
      }

      grade.reds = 0;
      grade.whites = 0;
    } else {
      drawGuessCircle(temp, 0, "black");
      temp -= 1;
      code.pop();

      if (temp === 3) {
        for (i = 0; i < 4; i++) {
          drawGuessCircle(i + 1, 1, "black");
          guessMatrix[0] = ['0', '0', '0', '0'];
          element.x = 1;
          element.y = 1;
        }
      }
    }
  },
  resetStats: function () {
    if (confirm("Are you sure you want to reset your statistics?")) {
      startStats(currentUsername);
      startStatPage();
    }
  }
};

function drawStartButtons() {//var optionsDiv = document.getElementById("startButtons");
  //optionsDiv.style.height = String(0.9 * screenSize.height) + 'px';

  /*
  var optionsDiv = document.getElementById("Play");
  optionsDiv.style.top = String(0.4 * screenSize.height) + 'px';
  optionsDiv.style.left = String(0.97 * screenSize.height) + 'px';
  
  var optionsDiv = document.getElementById("Stats");
  optionsDiv.style.top = String(0.7 * screenSize.height) + 'px';
  optionsDiv.style.left = String(0.97 * screenSize.height) + 'px';
  
  var optionsDiv = document.getElementById("Settings");
  optionsDiv.style.top = String(screenSize.height) + 'px';
  optionsDiv.style.left = String(0.97 * screenSize.height) + 'px';
  */
}

function drawGuessButtons() {
  var hOffset = verticalOffsetOfCanvas;
  hOffset += screenSize.height * 1.5 / numRows - buttonSize / 2;
  drawGuessButton(redButton, hOffset);
  hOffset += screenSize.height / numRows;
  drawGuessButton(blueButton, hOffset);
  hOffset += screenSize.height / numRows;
  drawGuessButton(greenButton, hOffset);
  hOffset += screenSize.height / numRows;
  drawGuessButton(yellowButton, hOffset);
  hOffset += screenSize.height / numRows;
  drawGuessButton(purpleButton, hOffset);
  hOffset += screenSize.height / numRows;
  drawGuessButton(whiteButton, hOffset);
}

function drawGradeButtons() {
  var hOffset = verticalOffsetOfCanvas + screenSize.height / numRows * 7 + screenSize.height * 1.5 / numRows - gradeButtonSize / 2;
  drawGradeButton(redGradeButton, hOffset);
  hOffset += screenSize.height / numRows;
  drawGradeButton(whiteGradeButton, hOffset);
}

function drawMainButton(button) {
  var hOffset = verticalOffsetOfCanvas;
  button.style.position = 'absolute';
  button.style.width = String(sideBarWidth - 1) + "px";
  button.style.height = String(screenSize.height / numRows - 1) + "px ";
  button.style.borderRadius = "0px";
  var wOffset = document.getElementById("board").offsetLeft + guessBarWidth + 1; //wOffset += screenSize.width - (sideBarWidth / 2) - buttonSize / 2;

  wOffsetStr = wOffset + 'px';
  hOffsetStr = hOffset + 'px';
  button.style.top = hOffsetStr;
  button.style.left = wOffsetStr;
  button.textContent = " Main Menu";
  var arrow = document.createElement("I");
  arrow.classList.add("arrow");
  arrow.classList.add("left"); //button.appendChild(arrow);

  button.insertBefore(arrow, button.childNodes[0]); //button.style.textAlign = "center";
  //button.style.fontSize = '13px';

  button.style.color = "white";
  document.body.appendChild(button);
}

function drawDoneButton(button) {
  var hOffset = verticalOffsetOfCanvas + screenSize.height / numRows * 10 - 1;
  button.style.position = 'absolute';
  button.style.width = String(sideBarWidth - 1) + "px";
  button.style.height = String(screenSize.height / numRows - 1) + "px ";
  button.style.borderRadius = "0px";
  var wOffset = document.getElementById("board").offsetLeft + guessBarWidth + gradeBarWidth + 1; //wOffset += screenSize.width - (sideBarWidth / 2) - buttonSize / 2;

  wOffsetStr = wOffset + 'px';
  hOffsetStr = hOffset + 'px';
  button.style.top = hOffsetStr;
  button.style.left = wOffsetStr;
  button.textContent = "Done";
  button.style.color = "white";
  document.body.appendChild(button);
}

function drawHelpButton(button) {
  var hOffset = verticalOffsetOfCanvas + screenSize.height / numRows * 11 - 1;
  button.style.position = 'absolute';
  button.style.width = String((guessBarWidth + gradeBarWidth) / 3 - 1) + "px";
  button.style.height = String(screenSize.height / numRows - 1) + "px ";
  button.style.borderRadius = "0px";
  var wOffset = document.getElementById("board").offsetLeft; //alert((guessBarWidth + gradeBarWidth) / 3)
  //wOffset += screenSize.width - (sideBarWidth / 2) - buttonSize / 2;

  wOffsetStr = wOffset + 'px';
  hOffsetStr = hOffset + 'px';
  button.style.top = hOffsetStr;
  button.style.left = wOffsetStr;
  button.textContent = "Help";
  button.style.color = "white";
  document.body.appendChild(button);
}

function drawBackButton(button) {
  var hOffset = verticalOffsetOfCanvas + screenSize.height / numRows * 11 - 1;
  button.style.position = 'absolute';
  button.style.width = String((guessBarWidth + gradeBarWidth) / 3 - 1) + "px";
  button.style.height = String(screenSize.height / numRows - 1) + "px ";
  button.style.borderRadius = "0px";
  var baseWidth = document.getElementById("board").offsetLeft;
  var addedWidth = (guessBarWidth + gradeBarWidth) / 3;
  var wOffset = baseWidth + addedWidth; //alert(addedWidth)
  //wOffset += screenSize.width - (sideBarWidth / 2) - buttonSize / 2;

  wOffsetStr = wOffset + 'px';
  hOffsetStr = hOffset + 'px';
  button.style.top = hOffsetStr;
  button.style.left = wOffsetStr;
  button.textContent = "Back";
  button.style.color = "white";
  document.body.appendChild(button);
}

function drawResetButton(button) {
  var hOffset = verticalOffsetOfCanvas + screenSize.height / numRows * 11 - 1;
  button.style.position = 'absolute';
  button.style.width = String((guessBarWidth + gradeBarWidth) / 3 - 1) + "px";
  button.style.height = String(screenSize.height / numRows - 1) + "px ";
  button.style.borderRadius = "0px";
  var baseWidth = document.getElementById("board").offsetLeft;
  var addedWidth = (guessBarWidth + gradeBarWidth) / 3;
  var wOffset = baseWidth + addedWidth * 2 + 1; //alert(addedWidth)
  //wOffset += screenSize.width - (sideBarWidth / 2) - buttonSize / 2;

  wOffsetStr = wOffset + 'px';
  hOffsetStr = hOffset + 'px';
  button.style.top = hOffsetStr;
  button.style.left = wOffsetStr;
  button.textContent = "Reset";
  button.style.color = "white";
  document.body.appendChild(button);
}

function drawModeButton(button) {
  var hOffset = verticalOffsetOfCanvas + screenSize.height / numRows * 11 - 1;
  button.style.position = 'absolute';
  button.style.width = String(sideBarWidth - 1) + "px";
  button.style.height = String(screenSize.height / numRows - 1) + "px ";
  button.style.borderRadius = "0px";
  var wOffset = document.getElementById("board").offsetLeft + guessBarWidth + gradeBarWidth + 1; //wOffset += screenSize.width - (sideBarWidth / 2) - buttonSize / 2;

  wOffsetStr = wOffset + 'px';
  hOffsetStr = hOffset + 'px';
  button.style.top = hOffsetStr;
  button.style.left = wOffsetStr;
  button.textContent = mode.value; //button.style.textAlign = "center";
  //button.style.fontSize = '13px';

  button.style.color = "grey";
  document.body.appendChild(button);
}

function drawGuessButton(button, hOffset) {
  var buttonSizePx = buttonSize + 'px';
  button.style.position = 'absolute';
  button.style.borderRadius = '100%';
  button.style.width = buttonSizePx;
  button.style.height = buttonSizePx;
  var wOffset = document.getElementById("board").offsetLeft;
  wOffset += screenSize.width - sideBarWidth / 2 - buttonSize / 2;
  wOffsetStr = wOffset + 'px';
  hOffsetStr = hOffset + 'px';
  button.style.top = hOffsetStr;
  button.style.left = wOffsetStr;
  document.body.appendChild(button);
}

function drawGradeButton(button, hOffset) {
  var buttonSizePx = buttonSize / 2 + 'px';
  button.style.position = 'absolute';
  button.style.borderRadius = '100%';
  button.style.width = buttonSizePx;
  button.style.height = buttonSizePx;
  var wOffset = document.getElementById("board").offsetLeft;
  wOffset += screenSize.width - sideBarWidth / 2 - gradeButtonSize / 2;
  wOffsetStr = wOffset + 'px';
  hOffsetStr = hOffset + 'px';
  button.style.top = hOffsetStr;
  button.style.left = wOffsetStr;
  document.body.appendChild(button);
}

function redButtonClick() {
  processClick(redButton.style.backgroundColor);
}

function blueButtonClick() {
  processClick(blueButton.style.backgroundColor);
}

function greenButtonClick() {
  processClick(greenButton.style.backgroundColor);
}

function yellowButtonClick() {
  processClick(yellowButton.style.backgroundColor);
}

function purpleButtonClick() {
  processClick(purpleButton.style.backgroundColor);
}

function whiteButtonClick() {
  processClick(whiteButton.style.backgroundColor);
}

function redGradeButtonClick() {
  processGradeClick(redGradeButton.style.backgroundColor);
}

function whiteGradeButtonClick() {
  processGradeClick(whiteGradeButton.style.backgroundColor);
}

window.mainButtonClick = function mainButtonClick() {
  window.location.href = "index.html";
};

function doneButtonClick() {
  if (mode.value == mode.codeMaker && code != []) {
    for (index = 0; index < 10; index++) {
      row = guessMatrix[index]; //alert(row)

      if (row.includes('0')) {
        gradeRow = index; //alert("breaking")

        break; //alert(gradeRow)
      }
    }
  } //alert(gradeRow)


  realGrade = [grade.reds, grade.whites];
  computerGrade(guessMatrix[gradeRow - 1], code);

  if (grade.reds != realGrade[0] || grade.whites != realGrade[1]) {
    alert("hmm. check your work...");
    grade.reds = realGrade[0];
    grade.whites = realGrade[1];
  }

  computerGuess(gradeRow);
}

function modeButtonClick() {
  if (mode.value === mode.codeBreaker) {
    mode.value = mode.codeMaker;
  } else {
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
  } else {
    myGameArea.backCB();
  }
}

function resetButtonClick() {
  myGameArea.reset();
}

window.resetStatClick = function resetStatClick() {
  myGameArea.resetStats();
};

window.settingsButtonClick = function settingsButtonClick() {
  alert("coming soon");
};

function processClick(color) {
  if (mode.value === mode.codeBreaker) {
    getClickIndex();
    drawGuessCircle(element.x, element.y, color);
    guessMatrix[element.y - 1][element.x - 1] = color;

    if (element.x < 4) {} //finished a guess
    else {
        //make this the actual grade
        gradeRow = element.y - 1;
        toBeGraded = guessMatrix[gradeRow];
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
          newHighScore = setStats(true, element.y);
          winScreen();
          setTimeout(function () {
            msg = "Congratulations, you won! \n";

            if (newHighScore) {
              msg += "New high score: " + userStats.highScore + "! \n";
            }

            msg += "Play again?";

            for (j = 0; j < 4; j++) {
              drawGuessCircle(j + 1, 0, code[j]);
            }

            if (confirm(msg)) {
              myGameArea.reset();
            } else {//should we leave it how it is, or go to the main menu?
              //i think main menu
              //hmm actually maybe just leave it how it is, and then make a button to go back to the main menu
            }
          }, 2500);
        } else if (element.y === 10) {
          setStats(false, 10);
          loseScreen();
          setTimeout(function () {
            alert("Nice try :(");
          }, 1500);
        }
      }
  } else {
    if (temp < 4) {
      temp += 1;
      drawGuessCircle(temp, 0, color);
      code.push(color);

      if (temp === 4) {
        computerGuess(0);
      }
    } else {
      alert("You are the code maker, you can't try to crack your own code.");
    }
  }
}

function processGradeClick(color) {
  if (mode.value == mode.codeMaker) {
    numPlayerGradeClicks++;

    if (numPlayerGradeClicks > 4) {
      alert("too many player grades entered");
    } else {
      if (color === "red") {
        grade.reds++;
      } else if (color === "white") {
        grade.whites++;
      }

      drawGradeCircle(numPlayerGradeClicks, element.y, color);
    }
  } else {
    alert("You are the code breaker, you can't grade your own guess.");
  }
}

function getClickIndex() {
  for (i = 0; i < 10; i++) {
    for (j = 0; j < 4; j++) {
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
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
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
  ctx.fillStyle = "white";
  ctx.fillText(text, x, y, 0.8 * sideBarWidth);
}

function drawGuessCircle(x_loc, y_loc, color) {
  this.x = x_loc * guessBarWidth / 5;
  this.y = y_loc * screenSize.height / numRows + screenSize.height / (numRows * 2);
  circle(guessr, color, this.x, this.y);
}

function drawGradeCircle(x_loc, y_loc, color) {
  this.x = guessBarWidth + x_loc * gradeBarWidth / 5;
  this.y = y_loc * screenSize.height / numRows + screenSize.height / (numRows * 2);
  circle(grader, color, this.x, this.y);
}

function winScreen() {
  var mode = 0;
  var flashing = setInterval(flash, 100);

  function flash() {
    mode++;

    if (mode % 2 == 1) {
      for (j = 0; j < 4; j++) {
        drawGuessCircle(j + 1, 0, code[j]);
      }
    } else {
      for (j = 0; j < 4; j++) {
        drawGuessCircle(j + 1, 0, "black");
      }
    }

    if (mode == 20) {
      clearInterval(flashing);
    }
  }
}

function loseScreen() {
  var count = 0;
  var flashing = setInterval(change, 200);

  function change() {
    count++;

    if (count == 5) {
      clearInterval(flashing);
    } else {
      for (j = 0; j < 4; j++) {
        color = colors[Math.floor(Math.random() * 6)];
        drawGuessCircle(j + 1, 0, color);
      }
    }
  } //alert("real code now...")
  //alert(code)


  setTimeout(function () {
    for (j = 0; j < 4; j++) {
      drawGuessCircle(j + 1, 0, code[j]);
    }
  }, 1000); //alert("drew real code")
}

function uploadStats(currentUsername) {
  statsStr = JSON.stringify(userStats);
  containerName = "mw-mastermind-stats"; //uploadToBlob(containerName, currentUsername, statsStr);
}

function getStats(currentUsername) {
  containerName = "mw-mastermind-stats";

  try {
    statsStr = downloadFromBlob(containerName, currentUsername);
  } catch (error) {
    startStats(currentUsername);
  } //userStats = JSON.parse(statsStr);

}

function startStats(currentUsername) {
  var userStats = {
    highScore: 10,
    gamesPlayed: 0,
    gamesWon: 0,
    winRate: 0,
    averageTries: 0,
    timesVisited: 1
  };
  uploadStats(currentUsername);
}

function setStats(won, score) {
  getStats();

  if (score < userStats.highScore) {
    userStats.highScore = score;
    newHighScore = true;
  } else {
    newHighScore = false;
  }

  currentGP = userStats.gamesPlayed;
  newGP = currentGP + 1;
  userStats.gamesPlayed = newGP;

  if (won) {
    currentGW = userStats.gamesWon;
    newGW = currentGW + 1;
    userStats.gamesWon = newGW;
  }

  newWR = Math.floor(newGW / newGP) * 100;
  userStats.winRate = newWR;
  currentAT = userStats.averageTries;
  currentTotalPoints = currentAT * currentGP; //alert(currentTotalPoints)

  newTotalPoints = currentTotalPoints + score;
  newAT = newTotalPoints / userStats.gamesPlayed; //alert(newAT)

  userStats.averageTries = newAT;
  uploadStats();
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
    } else {
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
  var newPosCodes = []; //alert("in remove codes");
  //alert(length(posCodes));

  realGrade = [grade.reds, grade.whites];

  for (index = 0; index < posCodes.length; index++) {
    //grade.reds = 0;
    //grade.whites = 0;
    //alert(index)
    posCode = posCodes[index]; //alert("grades");
    //alert(realGrade[0]);
    //alert(realGrade[1]);

    computerGrade(prevGuess, posCode); //alert(prevGuess);
    //alert(posCode);
    //alert(grade.reds);
    //alert(grade.whites);

    if (grade.reds == realGrade[0] && grade.whites == realGrade[1]) {
      //alert("idk what to sayyy");
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
    guess = ["yellow", "green", "blue", "white"];
  } else if (grade.reds === 4) {
    alert("Computer Wins!!!");
    myGameArea.reset();
    return; //end program
    //idk how...
    //dad's reset func?
  } else {
    //alert("here")
    //alert(guessMatrix[gradeRow - 1])
    //alert(grade.reds + "," + grade.whites);
    posCodes = removeCodes(posCodes, guessMatrix[gradeRow - 1]); //alert(grade.reds + "," + grade.whites);
    //alert(posCodes)
    //this is just picking a random one, maybe change it

    len = posCodes.length;

    if (len === 0) {
      alert("hmm. check your work...");
    }

    guess = posCodes[len - 1];
  } //alert("drawing...")
  //alert(guess)


  for (index = 0; index < 4; index++) {
    drawGuessCircle(index + 1, gradeRow + 1, guess[index]);
  }

  guessMatrix[gradeRow] = guess;
  element.y++;
  numPlayerGradeClicks = 0;
  grade.reds = 0;
  grade.whites = 0;
}

function computerCode() {
  code = []; //alert()

  for (i = 0; i < 4; i++) {
    code.push(colors[Math.floor(Math.random() * 6)]);
  } //this displays it, which... it definitely shouldn't, 
  //but lets leave it here while we are still working

  /*
  for (index=0; index<4; index++) {
      color = code[index];
      drawGuessCircle(index + 1, 0, color);
  }
  */

}

function drawBoard() {
  var skip_lines = [1, 7, 8, 10];

  for (i = 1; i < numRows; i++) {
    //horizontal lines
    this.y = i * screenSize.height / numRows;

    if (!skip_lines.includes(i)) {
      rectangle(screenSize.width - sideBarWidth, 1, "black", 0, this.y);
    } else {
      rectangle(screenSize.width, 1, "black", 0, this.y);
    }
  } //dividing vertical lines


  rectangle(1, screenSize.height, "black", guessBarWidth, 0);
  rectangle(1, screenSize.height, "black", guessBarWidth + gradeBarWidth, 0); //shade the code box

  rectangle(guessBarWidth, screenSize.height / numRows, "#331a00", 0, 0);
  rectangle(gradeBarWidth - 1, screenSize.height / numRows, "331a00", guessBarWidth + 1, 0);
  this.guessr = screenSize.height / (numRows * 2) * 0.5;
  this.grader = screenSize.height / (numRows * 2) * 0.2;

  for (i = 0; i < numRows; i++) {
    this.y = i * screenSize.height / numRows + screenSize.height / (numRows * 2);

    for (j = 1; j < 5; j++) {
      //guessing circles
      this.x = j * guessBarWidth / 5;
      circle(this.guessr, "black", this.x, this.y); //grading circles
      //don't need a grade for the code

      if (i !== 0) {
        this.x = guessBarWidth + j * gradeBarWidth / 5;
        circle(this.grader, "black", this.x, this.y);
      }
    }
  }

  this.fontSize = screenSize.height / numRows * 0.4;
  this.fontString = fontSize + "px Arial";
  text(this.fontString, "GUESSES", guessBarWidth + gradeBarWidth * 1.5, screenSize.height / (numRows * 2) + fontSize / 2);
  text(this.fontString, "GRADES", guessBarWidth + gradeBarWidth * 1.5, screenSize.height - screenSize.height * 3 / numRows - fontSize); //computerCode();
  //computerGuess(0)
}
},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61485" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/mastermind-game-html-1.e31bb0bc.js.map