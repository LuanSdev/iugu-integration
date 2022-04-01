import { ICustomer } from '../../@types/customer';

export interface ICreateCustomerUsecase {
  create(data: ICustomer): Promise<any>;
}
