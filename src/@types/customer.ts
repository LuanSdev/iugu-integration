import { Address } from './address';

export type ICustomer = {
  cc_emails?: string;
  cpf_cnpj?: string;
  email: string;
  name: string;
  notes?: string;
  phone_prefix?: number;
  phone?: number;
  address?: Address;
};
