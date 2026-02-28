export default class Card {
  id: number;
  name: string;
  imageSrc: string;
  isMatched: boolean = false;

  constructor(id: number, name: string, imageSrc: string) {
    this.id = id;
    this.name = name;
    this.imageSrc = imageSrc;
  }
}