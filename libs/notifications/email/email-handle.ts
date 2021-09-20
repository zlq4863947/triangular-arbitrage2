import { Config } from '@ta2-libs/config';
import { SendMailOptions, createTransport } from 'nodemailer';

import { emailTemplate } from './email.template';

export type SendMailInputs = Pick<SendMailOptions, 'subject'> & {
  title: string;
  body: string;
};

const config = Config.root.notification.email;

export class EmailHandle {
  async send(inputs: SendMailInputs): Promise<void> {
    if (!config.enabled) {
      return;
    }

    const smtp = createTransport({
      service: config.smtpService,
      secure: true,
      auth: {
        user: config.authUser,
        pass: config.authPass,
      },
    });

    // メール情報の作成
    const message: SendMailOptions = {
      from: `"triangular-arbitrage2"<${config.authUser}`,
      to: config.sendList,
      subject: inputs.subject,
      html: emailTemplate(inputs.title, inputs.body),
      attachments: [
        {
          filename: 'logo.png',
          path: 'assets/images/logo_circle.png',
          cid: 'logo',
        },
      ],
    };

    await smtp.sendMail(message);
  }
}
