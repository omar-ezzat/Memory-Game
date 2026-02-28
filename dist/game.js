// import Modal from "../node_modules/bootstrap/js/dist/modal.js";
import Board from "./board.js";
import Card from "./card.js";
export default class Game {
    constructor(board) {
        this.firstCard = null;
        this.secondCard = null;
        this.lockBoard = false;
        this.matchedPairs = 0;
        this.totalPairs = 10;
        this.board = board;
        this.fulltrack = document.getElementById("fulltrack");
        this.flipSound = document.getElementById("flipSound");
        this.goodSound = document.getElementById("goodSound");
        this.failSound = document.getElementById("failSound");
        this.gameOverSound = document.getElementById("gameOverSound");
        this.startGame();
        this.progressBar = document.querySelector(".progress-bar");
        this.assign();
    }
    startGame() {
        this.fulltrack.volume = 0.3;
        this.fulltrack.play();
    }
    assign() {
        this.board.cardElements.forEach((element, index) => {
            const card = this.board.cards[index];
            if (!card)
                return;
            // const backImage = element.querySelector(
            //   ".card-back img",
            // ) as HTMLImageElement;
            // backImage.src = card.imageSrc;
            element.addEventListener("click", () => this.handleClick(element, card));
        });
    }
    handleClick(element, card) {
        if (this.lockBoard)
            return;
        if (card.isMatched)
            return;
        if (element.classList.contains("flip"))
            return;
        this.flipSound.currentTime = 0;
        this.flipSound.play();
        element.classList.add("flip");
        if (!this.firstCard) {
            this.firstCard = card;
            return;
        }
        this.secondCard = card;
        this.lockBoard = true;
        this.matching();
    }
    matching() {
        if (!this.firstCard || !this.secondCard)
            return;
        if (this.firstCard.name === this.secondCard.name) {
            this.handleCorrect();
        }
        else {
            this.handleWrong();
        }
    }
    handleCorrect() {
        this.goodSound.currentTime = 0;
        this.goodSound.play();
        this.loopCards((el) => el.classList.add("correct"));
        this.matchedPairs++;
        this.updateProgress();
        if (this.matchedPairs === this.totalPairs) {
            this.endGame();
        }
        this.resetTurn();
    }
    handleWrong() {
        this.failSound.currentTime = 0;
        this.failSound.play();
        this.loopCards((el) => el.classList.add("wrong"));
        this.failSound.play();
        setTimeout(() => {
            this.loopCards((el) => el.classList.remove("flip", "wrong"));
            this.resetTurn();
        }, 1000);
    }
    loopCards(callback) {
        const elements = this.board.cardElements;
        elements.forEach((el, index) => {
            const card = this.board.cards[index];
            if (!card)
                return;
            if (card.id === this.firstCard.id || card.id === this.secondCard.id) {
                callback(el);
            }
        });
    }
    updateProgress() {
        const percent = (this.matchedPairs / this.totalPairs) * 100;
        this.progressBar.style.width = `${percent}%`;
        this.progressBar.textContent = `${percent}%`;
    }
    resetTurn() {
        this.firstCard = null;
        this.secondCard = null;
        this.lockBoard = false;
    }
    showModal() {
        const modalElement = document.getElementById("gameOverModal");
        const modal = new window.bootstrap.Modal(modalElement);
        const playBtn = document.getElementById("playAgainBtn");
        playBtn.onclick = () => {
            modal.hide();
            this.resetGame();
        };
        modal.show();
    }
    endGame() {
        this.fulltrack.pause();
        this.fulltrack.currentTime = 0;
        this.gameOverSound.currentTime = 0;
        this.gameOverSound.play();
        this.showModal();
    }
    resetGame() {
        this.resetTurn();
        this.matchedPairs = 0;
        this.board.resetBoard();
        // this.board.shuffle();
        this.assign();
        this.progressBar.style.width = "0%";
        this.progressBar.textContent = "0%";
        this.fulltrack.currentTime = 0;
        this.fulltrack.play();
    }
}
//# sourceMappingURL=game.js.map