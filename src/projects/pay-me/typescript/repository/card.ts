import { Card } from "../entities";

export class CardRepository {
  private cardList: Array<Card> = [];
  private id: number = 1;

  create(card: Card) {
    if (this.isExist(card.number)) {
      throw new Error(`Card already exists (${card.number})`);
    }
    card.setId(this.id++);
    this.cardList.push(card);
  }

  delete(cardId: number) {
    const currentCard = this.getById(cardId);
    this.cardList = this.cardList.filter((card) => card !== currentCard);
  }

  private isExist(cardNumber: string): boolean {
    return !!this.cardList.find((card) => card.number === cardNumber);
  }

  getList() {
    return this.cardList;
  }

  getById(cardId: number) {
    const card = this.cardList.find((card) => card.getId() === cardId);
    if (!card) {
      throw new Error(`Card not found (${cardId})`);
    }

    return card;
  }

  getListByOwnerId(ownerId: string) {
    const cards: Card[] = this.cardList.filter(
      (card) => card.getOwnerId() === ownerId
    );
    if (!cards.length)
      throw new Error(`No cards found with owner (${ownerId})`);

    return cards;
  }
}
