import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade | VDA",
  description:
    "Política de Privacidade da VDA – Venda Direta Automática. Saiba como seus dados são coletados, usados e protegidos.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://thiagolima.metodovda.com/politica-de-privacidade" },
};

export default function PoliticaDePrivacidade() {
  return (
    <div className="min-h-screen app-bg px-4 py-16">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-vda-light-gray hover:text-white transition-colors"
          >
            ← Voltar ao início
          </Link>
        </div>

        <div className="glassmorphism rounded-2xl p-8 md:p-12 space-y-8">
          {/* Header */}
          <div className="space-y-2 border-b border-white/10 pb-8">
            <h1 className="text-3xl md:text-4xl font-black text-vda-white tracking-tight">
              Política de Privacidade
            </h1>
            <p className="text-vda-light-gray text-sm">
              VDA – Venda Direta Automática · Última atualização: abril de 2025
            </p>
          </div>

          {/* Intro */}
          <section className="space-y-3">
            <p className="text-vda-light-gray leading-relaxed">
              A <strong className="text-white">VDA – Venda Direta Automática</strong>, de titularidade de{" "}
              <strong className="text-white">Thiago Lima</strong>, está comprometida com a proteção dos seus
              dados pessoais em conformidade com a{" "}
              <strong className="text-white">Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018)</strong>{" "}
              e demais normas aplicáveis.
            </p>
            <p className="text-vda-light-gray leading-relaxed">
              Esta Política descreve como coletamos, usamos, armazenamos e protegemos suas informações ao
              acessar nossos sites, plataformas e adquirir nossos produtos.
            </p>
          </section>

          {/* Sections */}
          {[
            {
              title: "1. Quem somos",
              content: (
                <div className="space-y-2 text-vda-light-gray leading-relaxed">
                  <p><strong className="text-white">Razão Social/Nome:</strong> Thiago Lima (VDA – Venda Direta Automática)</p>
                  <p><strong className="text-white">Produto:</strong> VDA – Venda Direta Automática</p>
                  <p><strong className="text-white">Responsável:</strong> Thiago Lima</p>
                  <p>
                    <strong className="text-white">Canais de contato:</strong>{" "}
                    <a href="mailto:sac@metodovda.com" className="text-white hover:underline">sac@metodovda.com</a>
                    {" · "}
                    <a href="mailto:vendas@metodovda.com" className="text-white hover:underline">vendas@metodovda.com</a>
                    {" · "}
                    <a href="mailto:contato@metodovda.com" className="text-white hover:underline">contato@metodovda.com</a>
                  </p>
                </div>
              ),
            },
            {
              title: "2. Dados que coletamos",
              content: (
                <ul className="space-y-2 text-vda-light-gray leading-relaxed list-none">
                  {[
                    "Nome completo e endereço de e-mail (ao se cadastrar ou adquirir produtos)",
                    "Número de telefone / WhatsApp (quando fornecido voluntariamente)",
                    "Dados de pagamento — processados exclusivamente pela plataforma Kiwify (não armazenamos dados de cartão)",
                    "Dados de navegação: endereço IP, tipo de navegador, páginas visitadas, tempo de sessão (via cookies e ferramentas analíticas)",
                    "Dados de interação com anúncios (Meta Pixel, Google Analytics — mediante consentimento)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-white mt-1 flex-shrink-0">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              title: "3. Finalidade do tratamento",
              content: (
                <ul className="space-y-2 text-vda-light-gray leading-relaxed list-none">
                  {[
                    "Processar e entregar os produtos e serviços adquiridos",
                    "Comunicar atualizações, novidades e ofertas relacionadas ao VDA (com possibilidade de cancelamento)",
                    "Melhorar a experiência de navegação e personalizar conteúdos",
                    "Cumprir obrigações legais e regulatórias",
                    "Prevenir fraudes e garantir a segurança das transações",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-white mt-1 flex-shrink-0">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              title: "4. Compartilhamento de dados",
              content: (
                <div className="space-y-2 text-vda-light-gray leading-relaxed">
                  <p>Seus dados <strong className="text-white">não são vendidos</strong> a terceiros. Podemos compartilhá-los apenas com:</p>
                  <ul className="space-y-1 list-none mt-2">
                    {[
                      "Plataformas de pagamento (Kiwify) — para processamento de compras",
                      "Ferramentas de marketing (Meta Ads, Google Analytics) — para veiculação de anúncios, mediante seu consentimento",
                      "Serviços de e-mail marketing — para envio de comunicações",
                      "Autoridades públicas — quando exigido por lei",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-white mt-1 flex-shrink-0">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            },
            {
              title: "5. Cookies",
              content: (
                <p className="text-vda-light-gray leading-relaxed">
                  Utilizamos cookies próprios e de terceiros (Meta Pixel, Google Analytics) para análise de tráfego e
                  personalização de anúncios. Você pode desativar cookies nas configurações do seu navegador, porém
                  algumas funcionalidades do site podem ser afetadas.
                </p>
              ),
            },
            {
              title: "6. Seus direitos (LGPD)",
              content: (
                <div className="space-y-2 text-vda-light-gray leading-relaxed">
                  <p>Em conformidade com a LGPD, você tem direito a:</p>
                  <ul className="space-y-1 list-none mt-2">
                    {[
                      "Confirmar a existência de tratamento dos seus dados",
                      "Acessar seus dados pessoais em nossa posse",
                      "Corrigir dados incompletos, inexatos ou desatualizados",
                      "Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários",
                      "Revogar o consentimento a qualquer momento",
                      "Solicitar a portabilidade dos dados",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-white mt-1 flex-shrink-0">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3">
                    Para exercer seus direitos, entre em contato:{" "}
                    <a href="mailto:sac@metodovda.com" className="text-white hover:underline">
                      sac@metodovda.com
                    </a>
                  </p>
                </div>
              ),
            },
            {
              title: "7. Segurança",
              content: (
                <p className="text-vda-light-gray leading-relaxed">
                  Adotamos medidas técnicas e administrativas adequadas para proteger seus dados contra acesso
                  não autorizado, alteração, divulgação ou destruição. Todas as transações são processadas com
                  criptografia SSL/TLS.
                </p>
              ),
            },
            {
              title: "8. Retenção de dados",
              content: (
                <p className="text-vda-light-gray leading-relaxed">
                  Seus dados são mantidos pelo tempo necessário para cumprir as finalidades descritas nesta
                  Política ou para atender obrigações legais, o que ocorrer por último.
                </p>
              ),
            },
            {
              title: "9. Alterações nesta Política",
              content: (
                <p className="text-vda-light-gray leading-relaxed">
                  Podemos atualizar esta Política periodicamente. Alterações significativas serão comunicadas
                  por e-mail ou por aviso em destaque em nossos canais. A data de última atualização estará
                  sempre indicada no topo desta página.
                </p>
              ),
            },
            {
              title: "10. Contato",
              content: (
                <div className="space-y-1 text-vda-light-gray">
                  <p>Para dúvidas, solicitações ou reclamações relacionadas à privacidade:</p>
                  <div className="mt-3 space-y-1">
                    <p>📧 <a href="mailto:sac@metodovda.com" className="text-white hover:underline">sac@metodovda.com</a></p>
                    <p>📧 <a href="mailto:vendas@metodovda.com" className="text-white hover:underline">vendas@metodovda.com</a></p>
                    <p>📧 <a href="mailto:contato@metodovda.com" className="text-white hover:underline">contato@metodovda.com</a></p>
                  </div>
                </div>
              ),
            },
          ].map(({ title, content }) => (
            <section key={title} className="space-y-3">
              <h2 className="text-lg font-bold text-vda-white">{title}</h2>
              {content}
            </section>
          ))}

          {/* Footer */}
          <div className="border-t border-white/10 pt-6 text-center">
            <Link
              href="/"
              className="text-sm text-vda-light-gray hover:text-white transition-colors"
            >
              ← Voltar ao início
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
