export interface ICreateToken<TData> {
  create(data: TData): Promise<{ token: string }>;
}
