import { BANK_NAME, CARD_TYPE } from "../types";
import { faker } from "@faker-js/faker";

export class Card {
	private id: number;
	constructor(
		public number: string,
		private pin: string,
		public expiry: string,
		public cardType: CARD_TYPE,
		private balance: number,
		private ownerId: string,
		public bankName: BANK_NAME
	) {}

	getId() {
		return this.id;
	}

	setId(id: number) {
		this.id = id;
	}

	getOwnerId() {
		return this.ownerId;
	}
}
