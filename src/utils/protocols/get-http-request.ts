export type THttpRequest<TParams> = {
  body: TParams;
  query: any;
  url: string;
};

export interface IGetHttpRequest {
  get<TResponse, TParams>(
    httpRequest: THttpRequest<TParams>
  ): Promise<TResponse>;
}
