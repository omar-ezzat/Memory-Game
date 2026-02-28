import Board from "./board.js";
import Game from "./game.js";

document.addEventListener("DOMContentLoaded", () => {
  const board = new Board("card-grid");
  new Game(board);
});
