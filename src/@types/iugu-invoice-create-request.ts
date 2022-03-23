import { IuguInvoiceItem, IuguMethodOfPayment } from '.';

export type IuguInvoiceCreateRequest = {
  cc_emails?: string;
  credits?: number;
  customer_id: string;
  discount_cents?: number;
  due_date: Date;
  early_payment_discount?: boolean;
  email: string;
  ensure_workday_due_date?: boolean;
  expired_url?: string;
  fines?: boolean;
  ignore_canceled_email?: boolean;
  ignore_due_email?: boolean;
  item: IuguInvoiceItem[];
  late_payment_fine_cents?: number;
  late_payment_fine?: number;
  max_installments_value?: number;
  notification_url?: string;
  order_id?: string;
  payable_with: IuguMethodOfPayment[];
  per_day_interest_cents?: number;
  per_day_interest_value?: number;
  per_day_interest?: boolean;
  return_url?: string;
  subscription_id?: string;
};
