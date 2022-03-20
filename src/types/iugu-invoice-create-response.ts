import {
  IuguBankSlip,
  IuguCreditCardTransaction,
  IuguInvoiceItem,
  IuguPix,
} from '.';

export type IuguInvoiceCreateResponse = {
  bank_slip: IuguBankSlip;
  barcode_data: string;
  barcode: string;
  commission_cents: string;
  commission: string;
  created_at: string;
  credit_card_transaction: IuguCreditCardTransaction;
  currency: string;
  customer_id: string;
  digitable_line: string;
  discount_cents: string;
  discount: string;
  due_date: string;
  email: string;
  id: string;
  installments: string;
  interest: string;
  items_total_cents: number;
  items: IuguInvoiceItem[];
  notification_url: string;
  paid_at: string;
  pix: IuguPix;
  refundable: string;
  return_url: string;
  secure_id: string;
  secure_url: string;
  status: string;
  tax_cents: string;
  taxes_paid: string;
  total_cents: number;
  total: string;
  updated_at: string;
  user_id: string;
};
