type Choice = "rock" | "paper" | "scissors";
const choices: Choice[] = ["rock", "paper", "scissors"];

const userChoiceEl = document.getElementById("user-choice")!;
const computerChoiceEl = document.getElementById("computer-choice")!;
const resultText = document.getElementById("result-text")!;

document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const choice = (btn as HTMLImageElement).dataset.choice as Choice;
        playGame(choice);
    });
});

async function playGame(userChoice: Choice): Promise<void> {
    const computerChoice = getRandomChoice();

    userChoiceEl.innerHTML = "";
    computerChoiceEl.innerHTML = "";
    resultText.textContent = "";

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
    } else if (winner === "computer") {
        compImg.classList.add("winner", "aura");
    }

    resultText.textContent = getResultText(winner);
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
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
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

const rulesBtn = document.getElementById("rules-btn")!;
const modalOverlay = document.getElementById("modal-overlay")!;
const closeModalBtn = document.getElementById("close-modal")!;

function openModal() {
    modalOverlay.classList.remove("hidden");
}

function closeModal() {
    modalOverlay.classList.add("hidden");
}

rulesBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});
