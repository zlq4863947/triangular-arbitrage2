import { EmailHandle } from './email-handle';

describe('EmailHandle', () => {
  let handle: EmailHandle;

  beforeEach(async () => {
    handle = new EmailHandle();
  });

  it('should be send email', async () => {
    await handle.send({
      subject: '[テスト] nodemailer test mail---a',
      title: 'testTitle',
      body: 'zzzzzz',
    });
  });
});
