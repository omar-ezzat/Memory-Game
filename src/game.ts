import Board from "./board.js";
import Card from "./card.js";

export default class Game {
  private board: Board;
  private firstCard: Card | null = null;
  private secondCard: Card | null = null;
  private lockBoard: boolean = false;
  private matchedPairs: number = 0;
  private totalPairs: number = 10;
  private progressBar: HTMLElement;
  private fulltrack: HTMLAudioElement;
  private flipSound: HTMLAudioElement;
  private goodSound: HTMLAudioElement;
  private failSound: HTMLAudioElement;
  private gameOverSound: HTMLAudioElement;

  constructor(board: Board) {
    this.board = board;
    this.fulltrack = document.getElementById("fulltrack") as HTMLAudioElement;
    this.flipSound = document.getElementById("flipSound") as HTMLAudioElement;
    this.goodSound = document.getElementById("goodSound") as HTMLAudioElement;
    this.failSound = document.getElementById("failSound") as HTMLAudioElement;
    this.gameOverSound = document.getElementById(
      "gameOverSound",
    ) as HTMLAudioElement;

    this.startGame();

    this.progressBar = document.querySelector(".progress-bar") as HTMLElement;
    this.assign();
  }

  private startGame(): void {
    this.fulltrack.volume = 0.3;
    this.fulltrack.play();
  }

  private assign(): void {
    this.board.cardElements.forEach((element, index) => {
      const card = this.board.cards[index];
      if (!card) return;

      element.addEventListener("click", () => this.handleClick(element, card));
    });
  }

  private handleClick(element: HTMLElement, card: Card): void {
    if (this.lockBoard) return;
    if (card.isMatched) return;
    if (element.classList.contains("flip")) return;

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

  private matching(): void {
    if (!this.firstCard || !this.secondCard) return;

    if (this.firstCard.name === this.secondCard.name) {
      this.handleCorrect();
    } else {
      this.handleWrong();
    }
  }

  private handleCorrect(): void {
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

  private handleWrong(): void {
    this.failSound.currentTime = 0;
    this.failSound.play();

    this.loopCards((el) => el.classList.add("wrong"));

    setTimeout(() => {
      this.loopCards((el) => el.classList.remove("flip", "wrong"));

      this.resetTurn();
    }, 1000);
  }

  private loopCards(callback: (el: HTMLElement) => void): void {
    const elements = this.board.cardElements;

    elements.forEach((el, index) => {
      const card = this.board.cards[index];
      if (!card) return;

      if (card.id === this.firstCard!.id || card.id === this.secondCard!.id) {
        callback(el);
      }
    });
  }

  private updateProgress(): void {
    const percent = (this.matchedPairs / this.totalPairs) * 100;
    this.progressBar.style.width = `${percent}%`;
    this.progressBar.textContent = `${percent}%`;
  }

  private resetTurn(): void {
    this.firstCard = null;
    this.secondCard = null;
    this.lockBoard = false;
  }

  private showModal(): void {
    const modalElement = document.getElementById("gameOverModal")!;
    const modal = new (window as any).bootstrap.Modal(modalElement);

    const playBtn = document.getElementById("playAgainBtn")!;
    playBtn.onclick = () => {
      modal.hide();
      this.resetGame();
    };

    modal.show();
  }

  private endGame(): void {
    this.fulltrack.pause();
    this.fulltrack.currentTime = 0;

    this.gameOverSound.currentTime = 0;
    this.gameOverSound.play();

    this.showModal();
  }

  public resetGame(): void {
    this.resetTurn();
    this.matchedPairs = 0;

    this.board.resetBoard();
    this.assign();

    this.progressBar.style.width = "0%";
    this.progressBar.textContent = "0%";

    this.fulltrack.currentTime = 0;
    this.fulltrack.play();
  }
}
