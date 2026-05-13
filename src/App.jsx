import { useEffect, useRef, useState } from 'react'
import FormularioLead from './components/FormularioLead.jsx'
import {
  img_fachada, img_aerea, img_piscina, img_salao,
  img_playground, img_sala, img_quarto, img_privativa, img_fitness
} from './assets/images.js'

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visivel'); obs.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

// ── Galeria de fotos ──────────────────────────────────────────────────────────
const FOTOS = [
  { src: img_fachada,    label: 'Entrada e portaria com segurança 24h' },
  { src: img_piscina,    label: 'Piscinas adulto e infantil' },
  { src: img_salao,      label: 'Salão de festas com espaço gourmet' },
  { src: img_fitness,    label: 'Espaço funcional' },
  { src: img_sala,       label: 'Sala e cozinha integradas' },
  { src: img_quarto,     label: 'Quarto casal espaçoso' },
  { src: img_privativa,  label: 'Área privativa — quintal próprio' },
  { src: img_aerea,      label: 'Vista aérea do complexo' },
]

// ── FAQ ───────────────────────────────────────────────────────────────────────
const PERGUNTAS = [
  {
    q: 'Preciso ter muito dinheiro guardado para começar?',
    r: 'Não. Com o programa Minha Casa Minha Vida, a entrada pode ser baixa e parcelada durante a obra. Você pode ainda usar o FGTS para reduzir ainda mais o valor inicial.',
  },
  {
    q: 'Tenho mais de 50 anos. Consigo financiar?',
    r: 'Sim. O financiamento pode ser feito por pessoas de qualquer idade. O prazo é ajustado conforme o seu perfil — e o consultor Pedro orienta o melhor caminho para a sua situação.',
  },
  {
    q: 'O condomínio é realmente seguro?',
    r: 'Sim. Portaria 24 horas, câmeras de monitoramento, portão eletrônico e célula de segurança para pedestres. Você entra e sai com tranquilidade.',
  },
  {
    q: 'Posso usar meu FGTS?',
    r: 'Sim. Trabalhadores com carteira assinada podem usar o saldo do FGTS como parte da entrada, reduzindo as parcelas mensais.',
  },
  {
    q: 'Qual o valor das parcelas?',
    r: 'Depende da sua renda e do seu perfil de crédito. O consultor Pedro faz uma simulação gratuita e te mostra o valor exato, sem compromisso.',
  },
]

// ── Componente de pergunta ────────────────────────────────────────────────────
function Pergunta({ q, r }) {
  const [aberta, setAberta] = useState(false)
  return (
    <div className="border-b border-verde/20 py-4">
      <button
        className="w-full text-left flex justify-between items-start gap-4 font-corpo font-semibold text-verde text-lg"
        onClick={() => setAberta(!aberta)}
      >
        <span>{q}</span>
        <span className="text-2xl text-ouro shrink-0 leading-none mt-0.5">{aberta ? '−' : '+'}</span>
      </button>
      {aberta && (
        <p className="mt-3 text-gray-600 text-base leading-relaxed pr-8">{r}</p>
      )}
    </div>
  )
}

// ── App principal ─────────────────────────────────────────────────────────────
export default function App() {
  useReveal()
  const [fotoAtiva, setFotoAtiva] = useState(0)
  const [lightbox, setLightbox] = useState(null)

  // Troca foto automaticamente
  useEffect(() => {
    const t = setInterval(() => setFotoAtiva(i => (i + 1) % FOTOS.length), 5000)
    return () => clearInterval(t)
  }, [])

  // Lightbox teclado
  useEffect(() => {
    const h = e => {
      if (lightbox === null) return
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox(i => (i + 1) % FOTOS.length)
      if (e.key === 'ArrowLeft') setLightbox(i => (i - 1 + FOTOS.length) % FOTOS.length)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [lightbox])

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>

      {/* ── BARRA SUPERIOR ── */}
      <div className="bg-verde text-white/80 text-sm py-2 px-4 text-center" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
        Atendimento personalizado · Consultor Pedro · Campos dos Goytacazes/RJ
      </div>

      {/* ── NAV ── */}
      <nav className="bg-creme border-b border-verde/15 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-verde font-bold text-xl leading-tight">
            Parque Ilha Bela
            <span className="block text-xs font-normal text-gray-500 tracking-widest uppercase">Campos dos Goytacazes</span>
          </div>
          <a href="#fale-conosco"
            className="bg-verde text-white px-5 py-2.5 rounded text-sm font-semibold hover:bg-verdeclaro transition-colors"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
            Falar com Consultor
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="bg-verde relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="anima">
            <p className="text-ouro text-sm font-semibold tracking-[.2em] uppercase mb-4">
              Lançamento Oficial · Parque Pecuária
            </p>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              Um lar com a <em className="not-italic text-ouroclar">segurança</em> e o <em className="not-italic text-ouroclar">conforto</em> que você merece
            </h1>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Apartamentos de 2 quartos em condomínio fechado, com lazer completo e localização privilegiada em Campos dos Goytacazes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#fale-conosco"
                className="bg-ouro hover:bg-ouroclar text-white font-bold text-lg px-8 py-4 rounded text-center transition-colors shadow-lg"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Quero conhecer
              </a>
              <a href="#galeria"
                className="border-2 border-white/40 hover:border-white text-white font-semibold text-lg px-8 py-4 rounded text-center transition-colors"
                style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
                Ver fotos
              </a>
            </div>
          </div>

          {/* Foto hero com slideshow */}
          <div className="anima-2 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[4/3]">
              <img src={FOTOS[fotoAtiva].src} alt={FOTOS[fotoAtiva].label}
                className="w-full h-full object-cover transition-opacity duration-1000" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white text-sm">{FOTOS[fotoAtiva].label}</p>
              </div>
            </div>
            <div className="flex gap-1.5 justify-center mt-3">
              {FOTOS.map((_, i) => (
                <button key={i} onClick={() => setFotoAtiva(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === fotoAtiva ? 'bg-ouro w-5' : 'bg-white/40'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SELOS DE CONFIANÇA ── */}
      <section className="bg-cremescuro border-y border-verde/10 py-8 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { n: '46+', l: 'anos de mercado' },
            { n: '500mil+', l: 'chaves entregues' },
            { n: '1:30', l: 'moradores em Campos já são clientes' },
            { n: '15', l: 'empreendimentos em Campos' },
          ].map((s, i) => (
            <div key={i} className="reveal">
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-3xl font-bold text-verde">{s.n}</div>
              <div className="text-gray-500 text-sm mt-1 leading-snug">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── POR QUE ESCOLHER ── */}
      <section className="py-16 px-4 sm:px-6 bg-creme">
        <div className="max-w-4xl mx-auto">
          <div className="ornamento"><span>✦</span></div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl font-bold text-verde text-center mb-4 reveal">
            Você trabalhou a vida toda.<br/>Agora é hora de morar bem.
          </h2>
          <p className="text-center text-gray-500 text-lg mb-12 reveal">
            O Parque Ilha Bela foi projetado para quem valoriza tranquilidade, segurança e qualidade de vida.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: '🔒',
                titulo: 'Segurança total',
                texto: 'Portaria 24 horas, câmeras em todo o condomínio, portão eletrônico e célula de segurança para pedestres. Você e sua família protegidos.'
              },
              {
                icon: '🏡',
                titulo: 'Conforto real',
                texto: 'Apartamentos de 2 quartos com sala, cozinha, área de serviço e opção de área privativa — seu quintal particular.'
              },
              {
                icon: '🌳',
                titulo: 'Tranquilidade',
                texto: 'Praça pública ao lado, área verde, bicicletário e praça do bem-estar. Um ambiente pensado para quem merece paz no dia a dia.'
              },
            ].map((c, i) => (
              <div key={i} className="reveal bg-white rounded-xl p-6 border border-verde/10 shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{c.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-xl font-bold text-verde mb-3">{c.titulo}</h3>
                <p className="text-gray-600 text-base leading-relaxed">{c.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERIA ── */}
      <section id="galeria" className="py-16 px-4 sm:px-6 bg-cremescuro">
        <div className="max-w-5xl mx-auto">
          <div className="ornamento"><span>✦</span></div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl font-bold text-verde text-center mb-3 reveal">
            Conheça o empreendimento
          </h2>
          <p className="text-center text-gray-500 mb-10 reveal">Clique nas fotos para ampliar</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {FOTOS.map((f, i) => (
              <div key={i} className="reveal rounded-xl overflow-hidden aspect-[4/3] cursor-zoom-in relative group shadow-md"
                onClick={() => setLightbox(i)}>
                <img src={f.src} alt={f.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-verde/0 group-hover:bg-verde/20 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs">{f.label}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-4">Imagens ilustrativas. Material liberado em 19/02/2026.</p>
        </div>
      </section>

      {/* ── FICHA TÉCNICA ── */}
      <section className="py-16 px-4 sm:px-6 bg-creme">
        <div className="max-w-4xl mx-auto">
          <div className="ornamento"><span>✦</span></div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl font-bold text-verde text-center mb-10 reveal">
            Tudo que o condomínio oferece
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="reveal">
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-xl font-bold text-verde mb-4 border-b border-ouro/30 pb-2">Área de lazer</h3>
              <ul className="space-y-3 text-gray-700">
                {[
                  '🏊 Piscinas adulto e infantil',
                  '🌊 Prainha — área rasa para relaxamento',
                  '🎉 Salão de festas com espaço gourmet',
                  '🔥 Churrasqueira',
                  '🛝 Playground para os netos',
                  '🏋️ Espaço funcional',
                  '🌿 Praça do bem-estar',
                  '🚲 Bicicletário',
                ].map((i, k) => (
                  <li key={k} className="flex items-center gap-3 text-lg">
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal">
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-xl font-bold text-verde mb-4 border-b border-ouro/30 pb-2">Diferenciais do apartamento</h3>
              <ul className="space-y-3 text-gray-700">
                {[
                  '✅ 2 quartos — 41,85 m²',
                  '✅ Piso laminado nos quartos e sala',
                  '✅ Previsão para ar-condicionado',
                  '✅ Medição individualizada de água',
                  '✅ Portão com acionamento elétrico',
                  '✅ Opção de área privativa (quintal)',
                  '✅ 203 vagas de garagem',
                  '✅ 96 vagas de moto',
                ].map((i, k) => (
                  <li key={k} className="text-lg">{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCALIZAÇÃO ── */}
      <section className="py-16 px-4 sm:px-6 bg-verde text-white">
        <div className="max-w-4xl mx-auto">
          <div className="ornamento"><span>✦</span></div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl font-bold text-center mb-3">
            Pertinho de tudo
          </h2>
          <p className="text-center text-white/70 text-lg mb-10">
            Av. Presidente Vargas, 447 – Parque Pecuária, Campos/RJ
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="rounded-xl overflow-hidden shadow-xl border-2 border-white/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726!2d-41.3556057!3d-21.7336517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbdd500590150cd%3A0x3044e14e61e31bd5!2sCondom%C3%ADnio%20MRV%20-%20Parque%20Ilhabela!5e0!3m2!1spt-BR!2sbr!4v1715500000000"
                className="w-full border-0" style={{ aspectRatio: '4/3' }}
                title="Localização" allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <div className="space-y-4">
              {[
                { t: '1 minuto', d: 'Supermercado Dom Atacadista' },
                { t: '5 minutos', d: 'Partage Campos Shopping' },
                { t: '10 minutos', d: 'Centro de Campos' },
                { t: 'Próximo', d: 'Hospital Ferreira Machado' },
                { t: 'Próximo', d: 'Faculdade de Odontologia' },
                { t: 'Acesso fácil', d: 'BR-101 e BR-356' },
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-4 border-b border-white/15 pb-4">
                  <span className="text-ouro font-bold text-sm uppercase tracking-wide w-24 shrink-0">{p.t}</span>
                  <span className="text-white/85 text-lg">{p.d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINANCIAMENTO ── */}
      <section className="py-16 px-4 sm:px-6 bg-creme">
        <div className="max-w-4xl mx-auto text-center">
          <div className="ornamento"><span>✦</span></div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl font-bold text-verde mb-4 reveal">
            Financiamento que cabe no seu bolso
          </h2>
          <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto reveal">
            Com o Minha Casa Minha Vida e parceria com a Caixa Econômica Federal, você tem as melhores condições do mercado — sem burocracia excessiva.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '💰', t: 'Use seu FGTS', d: 'Abata parte da entrada ou das parcelas usando o saldo do seu FGTS sem tirar do bolso.' },
              { icon: '📉', t: 'Menores taxas', d: 'Taxas de juros reduzidas do programa Minha Casa Minha Vida — as melhores do mercado.' },
              { icon: '📅', t: 'Até 420 meses', d: 'Parcelas que cabem na sua renda com prazo estendido para o seu conforto.' },
            ].map((c, i) => (
              <div key={i} className="reveal bg-verde/5 border border-verde/15 rounded-xl p-6 text-left">
                <div className="text-4xl mb-4">{c.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-xl font-bold text-verde mb-2">{c.t}</h3>
                <p className="text-gray-600">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DÚVIDAS ── */}
      <section className="py-16 px-4 sm:px-6 bg-cremescuro">
        <div className="max-w-3xl mx-auto">
          <div className="ornamento"><span>✦</span></div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl font-bold text-verde text-center mb-10 reveal">
            Suas dúvidas respondidas
          </h2>
          <div className="space-y-0 reveal">
            {PERGUNTAS.map((p, i) => <Pergunta key={i} {...p} />)}
          </div>
        </div>
      </section>

      {/* ── FORMULÁRIO ── */}
      <section id="fale-conosco" className="py-16 px-4 sm:px-6 bg-verde">
        <div className="max-w-2xl mx-auto text-center">
          <div className="ornamento"><span>✦</span></div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Fale com o Consultor Pedro
          </h2>
          <p className="text-white/75 text-lg mb-8">
            Simulação gratuita e sem compromisso. Atendimento humano, sem pressa.
          </p>
          <div className="bg-creme rounded-2xl p-6 sm:p-8 text-left shadow-2xl">
            <FormularioLead funil="parque-ilhabela-senior" />
          </div>
          <p className="text-white/40 text-sm mt-4">🔒 Seus dados estão seguros. Atendemos com respeito e discrição.</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0f2a1e] text-white/50 text-center py-8 px-4 text-sm">
        <p style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-white font-semibold text-base mb-1">
          Parque Ilha Bela · Campos dos Goytacazes
        </p>
        <p>Consultor Pedro · Av. Presidente Vargas, 447 – Parque Pecuária</p>
        <p>Loja MRV: Rua Saldanha Marinho, 503 · 0800 728 9000</p>
        <p className="mt-3 text-xs text-white/30">
          Imagens ilustrativas. Sujeito à análise de crédito. Material destinado exclusivamente à divulgação do produto.
        </p>
      </footer>

      {/* ── WPP FLUTUANTE ── */}
      <a href="https://wa.me/5522998381805?text=Ol%C3%A1%20Pedro!%20Vi%20o%20site%20do%20Parque%20Ilha%20Bela%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
        target="_blank" rel="noopener"
        className="fixed bottom-5 right-5 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <div className="fixed inset-0 bg-black/95 z-[500] flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-5 text-white text-4xl leading-none z-10"
            onClick={() => setLightbox(null)}>×</button>
          <button className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-5xl px-3 opacity-60 hover:opacity-100"
            onClick={e => { e.stopPropagation(); setLightbox(i => (i - 1 + FOTOS.length) % FOTOS.length) }}>‹</button>
          <img src={FOTOS[lightbox].src} alt={FOTOS[lightbox].label}
            className="max-w-[92vw] max-h-[85vh] rounded-xl object-contain"
            onClick={e => e.stopPropagation()} />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-5xl px-3 opacity-60 hover:opacity-100"
            onClick={e => { e.stopPropagation(); setLightbox(i => (i + 1) % FOTOS.length) }}>›</button>
          <p className="absolute bottom-4 text-white/50 text-sm">{FOTOS[lightbox].label}</p>
        </div>
      )}
    </div>
  )
}
