import { IuguCreditCard } from './iugu-credit-card';

export type IuguCreateTokenRequest = {
  account_id: string;
  method: string;
  test?: boolean;
  data: IuguCreditCard;
};
