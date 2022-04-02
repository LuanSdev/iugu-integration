import { IuguCreditCardPreview } from './iugu-credit-card-preview';

export type IuguCreateCreditCardResponse = {
  id: string;
  description: string;
  item_type: string;
  data: IuguCreditCardPreview;
};
