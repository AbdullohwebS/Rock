var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var choices = ["rock", "paper", "scissors"];
var userChoiceEl = document.getElementById("user-choice");
var computerChoiceEl = document.getElementById("computer-choice");
var resultText = document.getElementById("result-text");
var scoreEl = document.getElementById("score");
var triangleContainer = document.querySelector(".triangle-container");
var resultBox = document.querySelector(".result-box");
var playAgainBtn = document.getElementById("play-again");
var userScore = 0;
// === Initial State ===
resultBox.classList.add("hidden");
resultText.classList.add("hidden");
playAgainBtn.classList.add("hidden");
// === Game Logic ===
document.querySelectorAll(".btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
        var choice = btn.dataset.choice;
        playGame(choice);
    });
});
function playGame(userChoice) {
    return __awaiter(this, void 0, void 0, function () {
        var computerChoice, userImg, skeleton, compImg, winner;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    computerChoice = getRandomChoice();
                    // Hide buttons
                    triangleContainer.classList.add("hidden");
                    // Show result box
                    resultBox.classList.remove("hidden");
                    resultText.classList.remove("hidden");
                    playAgainBtn.classList.remove("hidden");
                    // Clear previous
                    userChoiceEl.innerHTML = "";
                    computerChoiceEl.innerHTML = "";
                    resultText.textContent = "";
                    userImg = createImage(userChoice);
                    userChoiceEl.appendChild(userImg);
                    skeleton = document.createElement("div");
                    skeleton.className = "skeleton";
                    computerChoiceEl.appendChild(skeleton);
                    // Delay
                    return [4 /*yield*/, delay(1300)];
                case 1:
                    // Delay
                    _a.sent();
                    // Show computer choice
                    computerChoiceEl.innerHTML = "";
                    compImg = createImage(computerChoice);
                    computerChoiceEl.appendChild(compImg);
                    winner = getWinner(userChoice, computerChoice);
                    if (winner === "user") {
                        userImg.classList.add("winner");
                        userScore++;
                    }
                    else if (winner === "computer") {
                        compImg.classList.add("winner");
                        if (userScore > 0)
                            userScore--;
                    }
                    updateScore();
                    resultText.textContent = getResultText(winner);
                    return [2 /*return*/];
            }
        });
    });
}
// === Utilities ===
function updateScore() {
    scoreEl.innerHTML = "\n    <span style=\"font-size: 12px;\">SCORE</span>\n    <span style=\"font-size: 28px;\">".concat(userScore, "</span>\n  ");
}
function delay(ms) {
    return new Promise(function (res) { return setTimeout(res, ms); });
}
function createImage(choice) {
    var img = document.createElement("img");
    img.src = "img/".concat(choice, ".svg");
    img.alt = choice;
    img.style.width = "140px";
    img.style.height = "150px";
    return img;
}
function getRandomChoice() {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}
function getWinner(user, computer) {
    if (user === computer)
        return "draw";
    if ((user === "rock" && computer === "scissors") ||
        (user === "paper" && computer === "rock") ||
        (user === "scissors" && computer === "paper"))
        return "user";
    return "computer";
}
function getResultText(result) {
    if (result === "user")
        return "You Win!";
    if (result === "computer")
        return "You Lose!";
    return "It's a Draw!";
}
// === Play Again ===
playAgainBtn.addEventListener("click", function () {
    triangleContainer.classList.remove("hidden");
    resultBox.classList.add("hidden");
    resultText.classList.add("hidden");
    playAgainBtn.classList.add("hidden");
});
// === Modal ===
var rulesBtn = document.getElementById("rules-btn");
var modalOverlay = document.getElementById("modal-overlay");
var closeModalBtn = document.getElementById("close-modal");
rulesBtn.addEventListener("click", function () { return modalOverlay.classList.remove("hidden"); });
closeModalBtn.addEventListener("click", function () { return modalOverlay.classList.add("hidden"); });
modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay)
        modalOverlay.classList.add("hidden");
});
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape")
        modalOverlay.classList.add("hidden");
});
