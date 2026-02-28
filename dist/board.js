import Card from "./card.js";
export default class Board {
    constructor(gridSelector) {
        this.cards = [];
        this.cardElements = [];
        this.images = [
            "images/1.jpg",
            "images/2.jpg",
            "images/3.jpg",
            "images/4.jpg",
            "images/5.jpg",
            "images/6.jpg",
            "images/7.jpg",
            "images/8.jpg",
            "images/9.jpg",
            "images/10.jpg",
        ];
        this.grid = document.querySelector(`.${gridSelector}`);
        if (!this.grid) {
            throw new Error("Card grid element not found!");
        }
        this.generateCards();
        this.shuffle();
        this.createCards();
    }
    generateCards() {
        let idCounter = 0;
        this.images.forEach((img, index) => {
            const card1 = new Card(idCounter++, `card-${index}`, img);
            const card2 = new Card(idCounter++, `card-${index}`, img);
            this.cards.push(card1, card2);
        });
    }
    shuffle() {
        this.cards.sort(() => Math.random() - 0.5);
    }
    createCards() {
        this.grid.innerHTML = "";
        this.cardElements = [];
        this.cards.forEach((card) => {
            const memoryCard = document.createElement("div");
            memoryCard.classList.add("memory-card");
            const cardInner = document.createElement("div");
            cardInner.classList.add("card-inner");
            const cardFront = document.createElement("div");
            cardFront.classList.add("card-front");
            const frontImg = document.createElement("img");
            frontImg.src = "back.jpg";
            const cardBack = document.createElement("div");
            cardBack.classList.add("card-back");
            const backImg = document.createElement("img");
            backImg.src = card.imageSrc;
            cardFront.appendChild(frontImg);
            cardBack.appendChild(backImg);
            cardInner.append(cardFront, cardBack);
            memoryCard.appendChild(cardInner);
            this.grid.appendChild(memoryCard);
            this.cardElements.push(memoryCard);
        });
    }
    resetBoard() {
        this.cards = [];
        this.generateCards();
        this.shuffle();
        this.createCards();
    }
}
//# sourceMappingURL=board.js.map