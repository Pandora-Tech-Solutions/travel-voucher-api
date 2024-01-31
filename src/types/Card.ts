export enum OperationType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export interface CardHistoric {
  operationType: OperationType;
  operationDate: Date;
  value: number;
}

export interface Card {
  cardNumber: string;
  userId: string;
  cardExpiration: Date;
  historic: CardHistoric[];
}
