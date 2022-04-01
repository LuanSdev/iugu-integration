export interface ICreateCustomer<TData> {
  create(data: TData): Promise<{ id: string }>;
}
