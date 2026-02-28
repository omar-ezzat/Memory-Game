import Card from "./card.js";
export default class Board {
    cards: Card[];
    cardElements: HTMLElement[];
    private grid;
    private images;
    constructor(gridSelector: string);
    private generateCards;
    shuffle(): void;
    createCards(): void;
    resetBoard(): void;
}
//# sourceMappingURL=board.d.ts.map