import Board from "./board.js";
export default class Game {
    private board;
    private firstCard;
    private secondCard;
    private lockBoard;
    private matchedPairs;
    private totalPairs;
    private progressBar;
    private fulltrack;
    private flipSound;
    private goodSound;
    private failSound;
    private gameOverSound;
    constructor(board: Board);
    private startGame;
    private assign;
    private handleClick;
    private matching;
    private handleCorrect;
    private handleWrong;
    private loopCards;
    private updateProgress;
    private resetTurn;
    private showModal;
    private endGame;
    resetGame(): void;
}
//# sourceMappingURL=game.d.ts.map