import iugu from 'iugu';

import env from './env';

export class IuguConfig {
  protected readonly request: any;

  constructor() {
    iugu.setApiKey = env.iuguApiKey;
    this.request = iugu;
  }
}
