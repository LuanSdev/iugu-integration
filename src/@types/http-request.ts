export type THttpRequest<TParams> = {
  body: TParams;
  query: any;
  url: string;
};
