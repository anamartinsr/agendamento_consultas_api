import { sendEmail } from '../service/Email.js';

const sendTestEmail = async(req, res) => {
    const { to, subject, html } = req.body;

    if (!to || !subject || !html) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        await sendEmail(to, subject, html);
        return res.json({ message: 'E-mail enviado com sucesso!' });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao enviar e-mail.' });
    }
};

export { sendTestEmail };
