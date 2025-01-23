'use client';
import Link from 'next/link';
import React from 'react';

const TermosPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-5 font-sans leading-relaxed">
      <h1 className="text-4xl font-bold mb-5 text-gray-800">
        Termos de Uso do Sistema de Venda de Ingressos e Controle de Eventos
      </h1>
      <p className="mb-5 text-gray-600">
        Bem-vindo ao <strong>Localize</strong> ! Este documento apresenta os
        Termos de Uso que regem o uso de nossa plataforma. Ao acessar ou
        utilizar nosso sistema, você concorda com estes termos. Leia
        atentamente.
      </p>

      <h2 className="text-3xl font-semibold mt-10 mb-5 text-gray-800">
        Definições
      </h2>
      <p className="mb-3 text-gray-600">
        <strong>Sistema:</strong> Refere-se à plataforma de venda de ingressos e
        controle de eventos disponibilizada por [Nome da Empresa ou Plataforma].
      </p>
      <p className="mb-3 text-gray-600">
        <strong>Usuário:</strong> Pessoa física ou jurídica que utiliza o
        sistema, seja como organizador de eventos ou comprador de ingressos.
      </p>
      <p className="mb-3 text-gray-600">
        <strong>Organizador:</strong> Usuário responsável pela criação,
        gerenciamento e promoção de eventos dentro da plataforma.
      </p>
      <p className="mb-3 text-gray-600">
        <strong>Participante:</strong> Usuário que adquire ingressos e participa
        dos eventos.
      </p>

      <h2 className="text-3xl font-semibold mt-10 mb-5 text-gray-800">
        Aceitação dos Termos
      </h2>
      <p className="mb-5 text-gray-600">
        Ao acessar ou utilizar o sistema, você concorda com estes Termos de Uso
        e com a Política de Privacidade. Caso não concorde, não utilize o
        sistema.
      </p>

      <h2 className="text-3xl font-semibold mt-10 mb-5 text-gray-800">
        Uso da Plataforma
      </h2>
      <h3 className="text-2xl font-semibold mt-8 mb-3 text-gray-800">
        3.1. Cadastro
      </h3>
      <p className="mb-3 text-gray-600">
        Para utilizar o sistema, é necessário criar uma conta informando dados
        verdadeiros e atualizados.
      </p>
      <p className="mb-3 text-gray-600">
        O Usuário é responsável por manter a confidencialidade de sua conta e
        senha.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-3 text-gray-800">
        3.2. Restrições de Uso
      </h3>
      <p className="mb-3 text-gray-600">
        É proibido utilizar o sistema para atividades ilegais, fraudulentas ou
        que violem direitos de terceiros.
      </p>
      <p className="mb-3 text-gray-600">
        O Organizador não pode adquirir ingressos para o próprio evento, salvo
        mediante permissão específica ou em casos previstos pela plataforma.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-3 text-gray-800">
        3.3. Responsabilidade pelo Conteúdo
      </h3>
      <p className="mb-3 text-gray-600">
        O Organizador é exclusivamente responsável pelas informações do evento,
        incluindo descrições, preços, políticas de reembolso e regras gerais.
      </p>

      <h2 className="text-3xl font-semibold mt-10 mb-5 text-gray-800">
        Compra de Ingressos
      </h2>
      <h3 className="text-2xl font-semibold mt-8 mb-3 text-gray-800">
        4.1. Processo de Compra
      </h3>
      <p className="mb-3 text-gray-600">
        O Participante pode adquirir ingressos através do sistema, respeitando
        os valores e condições definidos pelo Organizador.
      </p>
      <p className="mb-3 text-gray-600">
        A confirmação da compra está sujeita à aprovação do pagamento.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-3 text-gray-800">
        4.2. QR Code e Controle de Acesso
      </h3>
      <p className="mb-3 text-gray-600">
        Cada ingresso gera um QR Code único para validação no evento.
      </p>
      <p className="mb-3 text-gray-600">
        O Participante é responsável por preservar o QR Code e garantir que ele
        não seja compartilhado indevidamente.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-3 text-gray-800">
        4.3. Política de Reembolso
      </h3>
      <p className="mb-3 text-gray-600">
        A política de reembolso é definida pelo Organizador e deve estar
        claramente informada no momento da compra.
      </p>
      <p className="mb-3 text-gray-600">
        A plataforma não se responsabiliza por reembolsos, exceto nos casos em
        que atue como intermediária do pagamento.
      </p>

      <h2 className="text-3xl font-semibold mt-10 mb-5 text-gray-800">
        Responsabilidades e Limitação de Garantias
      </h2>
      <h3 className="text-2xl font-semibold mt-8 mb-3 text-gray-800">
        5.1. Responsabilidade do Organizador
      </h3>
      <p className="mb-3 text-gray-600">
        O Organizador é responsável pela realização e qualidade do evento.
      </p>
      <p className="mb-3 text-gray-600">
        A plataforma não se responsabiliza por cancelamentos, alterações ou
        problemas ocorridos no evento.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-3 text-gray-800">
        5.2. Responsabilidade do Usuário
      </h3>
      <p className="mb-3 text-gray-600">
        O Usuário é responsável pelo uso correto do sistema e pela veracidade
        das informações fornecidas.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-3 text-gray-800">
        5.3. Limitação de Garantias
      </h3>
      <p className="mb-3 text-gray-600">
        A plataforma é fornecida "como está", sem garantias de que estará livre
        de erros ou interrupções.
      </p>

      <h2 className="text-3xl font-semibold mt-10 mb-5 text-gray-800">
        Propriedade Intelectual
      </h2>
      <p className="mb-3 text-gray-600">
        Todos os direitos sobre a plataforma, incluindo design, código-fonte,
        marcas e logotipos, pertencem a [Nome da Empresa]. É proibida a
        reprodução ou utilização sem autorização prévia.
      </p>

      <h2 className="text-3xl font-semibold mt-10 mb-5 text-gray-800">
        Política de Privacidade
      </h2>
      <p className="mb-3 text-gray-600">
        A coleta, armazenamento e utilização de dados pessoais estão detalhados
        em nossa Política de Privacidade, que integra estes Termos de Uso.
      </p>

      <h2 className="text-3xl font-semibold mt-10 mb-5 text-gray-800">
        Modificações nos Termos de Uso
      </h2>
      <p className="mb-3 text-gray-600">
        A plataforma pode alterar estes Termos de Uso a qualquer momento. As
        modificações serão comunicadas ao Usuário e entrarão em vigor na data de
        publicação.
      </p>

      <h2 className="text-3xl font-semibold mt-10 mb-5 text-gray-800">
        Disposições Gerais
      </h2>
      <p className="mb-3 text-gray-600">
        Estes Termos de Uso são regidos pelas leis brasileiras.
      </p>
      <p className="mb-3 text-gray-600">
        Qualquer disputa relacionada a estes termos será resolvida no foro da
        comarca de [Cidade/Estado], salvo disposição legal em contrário.
      </p>

      <p className="mb-3 text-gray-600">
        Caso tenha dúvidas ou precise de suporte, entre em contato pelo e-mail{' '}
        <strong>localize@gmail.com</strong>.
      </p>

      <p className="mb-3 text-gray-600">
        Obrigado por utilizar nossa plataforma!
      </p>
    </div>
  );
};

export default TermosPage;
