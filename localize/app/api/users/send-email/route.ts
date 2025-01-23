import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, subject, message, token } = await req.json();

  try {
    // Configurar o transporte SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Ou outro serviço de e-mail, como Outlook ou Yahoo
      auth: {
        user: process.env.EMAIL_USER, // Seu e-mail (use variáveis de ambiente para segurança)
        pass: process.env.EMAIL_PASS, // Senha de app ou senha SMTP
      },
    });

    // Configurar o e-mail
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: `<p>Por favor, confirme seu email clicando no link abaixo:</p>
             <a href="${process.env.BASE_URL}/?token=${token}">Confirmar Email</a>`, // Mensagem em HTML (pode ser texto puro também)
    };

    // Enviar o e-mail
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado:', info.response);

    return NextResponse.json(
      { success: true, message: 'E-mail enviado com sucesso!' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao enviar o e-mail.', error },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  return NextResponse.json(
    { message: `Método ${req.method} não permitido` },
    { status: 405 },
  );
}
