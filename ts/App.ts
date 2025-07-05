type Choice = "rock" | "paper" | "scissors";
const choices: Choice[] = ["rock", "paper", "scissors"];

const userChoiceEl = document.getElementById("user-choice")!;
const computerChoiceEl = document.getElementById("computer-choice")!;
const resultText = document.getElementById("result-text")!;
const scoreEl = document.getElementById("score")!;
const triangleContainer = document.querySelector(".triangle-container") as HTMLElement;
const resultBox = document.querySelector(".result-box") as HTMLElement;
const playAgainBtn = document.getElementById("play-again")!;

let userScore = 0;

// === Initial State ===
resultBox.classList.add("hidden");
resultText.classList.add("hidden");
playAgainBtn.classList.add("hidden");

// === Game Logic ===
document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const choice = (btn as HTMLImageElement).dataset.choice as Choice;
        playGame(choice);
    });
});

async function playGame(userChoice: Choice): Promise<void> {
    const computerChoice = getRandomChoice();

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

    // User choice
    const userImg = createImage(userChoice);
    userChoiceEl.appendChild(userImg);

    // Computer skeleton
    const skeleton = document.createElement("div");
    skeleton.className = "skeleton";
    computerChoiceEl.appendChild(skeleton);

    // Delay
    await delay(1300);

    // Show computer choice
    computerChoiceEl.innerHTML = "";
    const compImg = createImage(computerChoice);
    computerChoiceEl.appendChild(compImg);

    // Determine winner
    const winner = getWinner(userChoice, computerChoice);

    if (winner === "user") {
        userImg.classList.add("winner");
        userScore++;
    } else if (winner === "computer") {
        compImg.classList.add("winner");
        if (userScore > 0) userScore--;
    }

    updateScore();
    resultText.textContent = getResultText(winner);
}

// === Utilities ===

function updateScore() {
    scoreEl.innerHTML = `
    <span style="font-size: 12px;">SCORE</span>
    <span style="font-size: 28px;">${userScore}</span>
  `;
}

function delay(ms: number): Promise<void> {
    return new Promise((res) => setTimeout(res, ms));
}

function createImage(choice: Choice): HTMLImageElement {
    const img = document.createElement("img");
    img.src = `img/${choice}.svg`;
    img.alt = choice;
    img.style.width = "140px";
    img.style.height = "150px";
    return img;
}

function getRandomChoice(): Choice {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function getWinner(user: Choice, computer: Choice): "user" | "computer" | "draw" {
    if (user === computer) return "draw";
    if (
        (user === "rock" && computer === "scissors") ||
        (user === "paper" && computer === "rock") ||
        (user === "scissors" && computer === "paper")
    )
        return "user";
    return "computer";
}

function getResultText(result: "user" | "computer" | "draw"): string {
    if (result === "user") return "You Win!";
    if (result === "computer") return "You Lose!";
    return "It's a Draw!";
}

// === Play Again ===
playAgainBtn.addEventListener("click", () => {
    triangleContainer.classList.remove("hidden");
    resultBox.classList.add("hidden");
    resultText.classList.add("hidden");
    playAgainBtn.classList.add("hidden");
});

// === Modal ===
const rulesBtn = document.getElementById("rules-btn")!;
const modalOverlay = document.getElementById("modal-overlay")!;
const closeModalBtn = document.getElementById("close-modal")!;

rulesBtn.addEventListener("click", () => modalOverlay.classList.remove("hidden"));
closeModalBtn.addEventListener("click", () => modalOverlay.classList.add("hidden"));
modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.add("hidden");
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modalOverlay.classList.add("hidden");
});
