import { IuguInvoiceItem } from './iugu-invoice-item';

export type IuguApproveInvoiceRequest = {
  bank_slip_extra_days?: number;
  customer_id?: string;
  customer_payment_method_id?: string;
  discount_cents?: number;
  email?: string;
  invoice_id?: string;
  items?: IuguInvoiceItem[];
  keep_dunning?: boolean;
  method?: 'bank_slip';
  months?: number;
  restrict_payment_method?: boolean;
  token?: string;
};
