import nodemailer, {Transporter} from 'nodemailer';

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachement[];
}

export interface Attachement {
  filename: string;
  path: string;
}


export class EmailService {

  private transporter: Transporter;


  private constructor(
    service: string, 
    email: string, 
    secretKey: string
    ) {
    this.transporter = nodemailer.createTransport({
      service,
      auth: {
        user: email,
        pass: secretKey,
      },
    });
  }



  async sendEmail( options: SendMailOptions ): Promise<boolean> {

    const { to, subject, htmlBody, attachements = [] } = options;
    try {

      const sentInformation = await this.transporter.sendMail( {
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      });

      return true;
    } catch ( error ) {
      return false;
    }

  }



}
