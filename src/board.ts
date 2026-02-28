import Card from "./card.js";

export default class Board {
  public cards: Card[] = [];
  public cardElements: HTMLElement[] = [];
  private grid: HTMLElement | Element;

  private images: string[] = [
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

  constructor(gridSelector: string) {
    this.grid = document.querySelector(`.${gridSelector}`) as HTMLElement;

    if (!this.grid) {
      throw new Error("Card grid element not found!");
    }
    this.generateCards();
    this.shuffle();
    this.createCards();
  }

  private generateCards(): void {
    let idCounter = 0;

    this.images.forEach((img, index) => {
      const card1 = new Card(idCounter++, `card-${index}`,img);
      const card2 = new Card(idCounter++, `card-${index}`,img);
     

      this.cards.push(card1, card2);
    });
  }

  public shuffle(): void {
    this.cards.sort(() => Math.random() - 0.5);
  }

  public createCards(): void {
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

  public resetBoard(): void {
    this.cards = [];
    this.generateCards();
    this.shuffle();
    this.createCards();
  }
}
