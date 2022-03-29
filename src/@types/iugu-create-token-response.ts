export type IuguCreateTokenResponse = {
  id: string;
  method: string;
  extra_info: {
    brand: string;
    holder_name: string;
    display_number: string;
    bin: string;
    month: number;
    year: number;
  };
  test: boolean;
};
