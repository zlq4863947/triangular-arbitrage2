import { EmailHandle, SendMailInputs } from './email';

export class NotificationManager {
  private readonly email: EmailHandle;

  constructor() {
    this.email = new EmailHandle();
  }

  public sendEmail(inputs: SendMailInputs): Promise<void> {
    return this.email.send(inputs);
  }
}
