import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

/**
 * Envia um e-mail.
 *
 * @param {string} to - Endereço de e-mail do destinatário.
 * @param {string} subject - Assunto do e-mail.
 * @param {string} html - Conteúdo HTML do e-mail.
 */
const sendEmail = async(to, subject, html) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
        };

        let info = await transporter.sendMail(mailOptions);
        console.log('Email enviado: ', info.response);
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
    }
};

export { sendEmail };
