type Choice = "rock" | "paper" | "scissors";
const choices: Choice[] = ["rock", "paper", "scissors"];

const userChoiceEl = document.getElementById("user-choice")!;
const computerChoiceEl = document.getElementById("computer-choice")!;
const resultText = document.getElementById("result-text")!;
const scoreEl = document.getElementById("score")!;
const triangleContainer = document.querySelector(".triangle-container") as HTMLDivElement;
const resultBox = document.querySelector(".result-box") as HTMLDivElement;
const playAgainBtn = document.getElementById("play-again") as HTMLButtonElement;

let userScore = 0;
hideResults();

document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const choice = (btn as HTMLImageElement).dataset.choice as Choice;
        playGame(choice);
    });
});

async function playGame(userChoice: Choice): Promise<void> {
    triangleContainer.classList.add("hidden");
    resultBox.classList.remove("hidden");
    resultText.classList.remove("hidden");
    playAgainBtn.classList.add("hidden");

    userChoiceEl.innerHTML = "";
    computerChoiceEl.innerHTML = "";
    resultText.textContent = "";

    const computerChoice = getRandomChoice();

    const userImg = createImage(userChoice);
    userChoiceEl.appendChild(userImg);

    const skeleton = document.createElement("div");
    skeleton.className = "skeleton";
    computerChoiceEl.appendChild(skeleton);

    await delay(1300);

    computerChoiceEl.innerHTML = "";
    const compImg = createImage(computerChoice);
    computerChoiceEl.appendChild(compImg);

    const winner = getWinner(userChoice, computerChoice);
    if (winner === "user") {
        userImg.classList.add("winner", "aura");
        userScore++;
    } else if (winner === "computer") {
        compImg.classList.add("winner", "aura");
        if (userScore > 0) userScore--;
    }

    resultText.textContent = getResultText(winner);
    updateScore();
    playAgainBtn.classList.remove("hidden");
}

function hideResults() {
    resultBox.classList.add("hidden");
    resultText.classList.add("hidden");
    playAgainBtn.classList.add("hidden");
}

function updateScore() {
    scoreEl.textContent = `Score: ${userScore}`;
}

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function createImage(choice: Choice): HTMLImageElement {
    const img = document.createElement("img");
    img.src = `img/${choice}.svg`;
    img.alt = choice;
    return img;
}

function getRandomChoice(): Choice {
    return choices[Math.floor(Math.random() * choices.length)];
}

function getWinner(user: Choice, computer: Choice): "user" | "computer" | "draw" {
    if (user === computer) return "draw";
    if (
        (user === "rock" && computer === "scissors") ||
        (user === "paper" && computer === "rock") ||
        (user === "scissors" && computer === "paper")
    ) return "user";
    return "computer";
}

function getResultText(result: "user" | "computer" | "draw"): string {
    if (result === "user") return "You Win!";
    if (result === "computer") return "You Lose!";
    return "It's a Draw!";
}

playAgainBtn.addEventListener("click", () => {
    triangleContainer.classList.remove("hidden");
    hideResults();
    userChoiceEl.innerHTML = "";
    computerChoiceEl.innerHTML = "";
});

// Modal logic
const rulesBtn = document.getElementById("rules-btn")!;
const modalOverlay = document.getElementById("modal-overlay")!;
const closeModalBtn = document.getElementById("close-modal")!;

rulesBtn.addEventListener("click", () => {
    modalOverlay.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {
    modalOverlay.classList.add("hidden");
});

modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.add("hidden");
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        modalOverlay.classList.add("hidden");
    }
});
