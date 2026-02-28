import Board from "./board.js";
import Game from "./game.js";
// import "bootstrap";
document.addEventListener("DOMContentLoaded", () => {
    const board = new Board("card-grid");
    new Game(board);
});
//# sourceMappingURL=main.js.map