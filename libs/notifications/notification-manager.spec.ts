import { NotificationManager } from './notification-manager';

describe('EmailHandle', () => {
  let manger: NotificationManager;

  beforeEach(async () => {
    manger = new NotificationManager();
  });

  it('should be send email', async () => {
    await manger.sendEmail({
      subject: '[テスト] nodemailer test mail---a',
      title: 'testTitle',
      body: 'zzzzzz',
    });
  });
});
