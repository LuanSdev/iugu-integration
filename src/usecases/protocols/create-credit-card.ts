export interface ICreateCreditCard<TData> {
  create(data: TData): Promise<{ id: string }>;
}
