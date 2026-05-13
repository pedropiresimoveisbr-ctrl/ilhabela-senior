import { useState } from 'react'
import { CheckCircle2, Phone } from 'lucide-react'

const SUPABASE_URL = 'https://okwqamdrgwbfyncqcide.supabase.co'
const SUPABASE_KEY = 'sb_publishable_uDsFJ2ig8oXpcDb5Xmnv0g_Y4bljUI0'
const WPP = '5522998381805'

export default function FormularioLead({ funil = 'parque-ilhabela-v1' }) {
  const [submitted, setSubmitted] = useState(false)
  const [wppMsg, setWppMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    nome: '', tel: '', email: '',
    renda: '', momento: '', fgts: '', obs: '', wpp: true
  })

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleTel = e => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11)
    if (v.length > 6) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`
    else if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`
    else if (v.length) v = `(${v}`
    setForm(f => ({ ...f, tel: v }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.nome.trim() || !form.tel.trim()) {
      alert('Preencha seu nome e WhatsApp.')
      return
    }

    setLoading(true)

    // Salva no Supabase
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          nome: form.nome,
          telefone: form.tel.replace(/\D/g, ''),
          email: form.email,
          renda: form.renda,
          momento: form.momento,
          fgts: form.fgts,
          obs: form.obs,
          status: 'novo',
          origem: 'Parque Ilha Bela',
          funil: funil
        })
      })
    } catch (err) {
      console.error('Erro Supabase:', err)
    }

    // Monta mensagem WhatsApp com todos os dados
    const msg = encodeURIComponent(
      `🏠 *Novo lead – Parque Ilha Bela* (${funil})\n\n` +
      `👤 Nome: ${form.nome}\n` +
      `📱 WhatsApp: ${form.tel}\n` +
      (form.email   ? `📧 E-mail: ${form.email}\n` : '') +
      (form.renda   ? `💰 Renda: ${form.renda}\n` : '') +
      (form.momento ? `🕐 Momento: ${form.momento}\n` : '') +
      (form.fgts    ? `📦 FGTS: ${form.fgts}\n` : '') +
      (form.obs     ? `📝 Obs: ${form.obs}` : '')
    )

    setWppMsg(msg)
    setLoading(false)
    setSubmitted(true)
    setTimeout(() => window.open(`https://wa.me/${WPP}?text=${msg}`, '_blank'), 1500)
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-[#006B3F] rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} className="text-white" />
        </div>
        <h3 className="font-syne font-extrabold text-xl text-[#006B3F] mb-2">
          Recebemos seu contato!
        </h3>
        <p className="text-gray-500 text-sm mb-5">
          Pedro vai entrar em contato via WhatsApp em breve com sua simulação personalizada.
        </p>
        <a
          href={`https://wa.me/${WPP}?text=${wppMsg}`}
          target="_blank" rel="noopener"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1db954] text-white font-syne font-bold text-sm px-6 py-3 rounded-full transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Falar com Pedro agora
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-[#006B3F] uppercase tracking-wide">Nome completo *</label>
          <input name="nome" value={form.nome} onChange={handleChange}
            placeholder="Seu nome" required
            className="px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:border-[#079D56] focus:ring-2 focus:ring-[#079D56]/10 outline-none transition" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-[#006B3F] uppercase tracking-wide">WhatsApp *</label>
          <input name="tel" value={form.tel} onChange={handleTel}
            placeholder="(22) 99999-9999" required
            className="px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:border-[#079D56] focus:ring-2 focus:ring-[#079D56]/10 outline-none transition" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-[#006B3F] uppercase tracking-wide">E-mail</label>
          <input name="email" type="email" value={form.email} onChange={handleChange}
            placeholder="seu@email.com"
            className="px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:border-[#079D56] focus:ring-2 focus:ring-[#079D56]/10 outline-none transition" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-[#006B3F] uppercase tracking-wide">Renda familiar</label>
          <select name="renda" value={form.renda} onChange={handleChange}
            className="px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:border-[#079D56] outline-none appearance-none cursor-pointer">
            <option value="">Selecione</option>
            <option>Até R$ 2.000</option>
            <option>R$ 2.000 – R$ 4.000</option>
            <option>R$ 4.000 – R$ 8.000</option>
            <option>Acima de R$ 8.000</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-[#006B3F] uppercase tracking-wide">Momento de compra</label>
          <select name="momento" value={form.momento} onChange={handleChange}
            className="px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:border-[#079D56] outline-none appearance-none cursor-pointer">
            <option value="">Selecione</option>
            <option>Quero comprar agora</option>
            <option>Em até 3 meses</option>
            <option>Em até 6 meses</option>
            <option>Ainda estou pesquisando</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-[#006B3F] uppercase tracking-wide">Tem FGTS?</label>
          <select name="fgts" value={form.fgts} onChange={handleChange}
            className="px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:border-[#079D56] outline-none appearance-none cursor-pointer">
            <option value="">Selecione</option>
            <option>Sim</option>
            <option>Não</option>
            <option>Não sei</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className="text-xs font-bold text-[#006B3F] uppercase tracking-wide">Observações</label>
          <textarea name="obs" value={form.obs} onChange={handleChange}
            placeholder="Ex: quero térreo, preciso de 2 vagas..." rows={3}
            className="px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:border-[#079D56] focus:ring-2 focus:ring-[#079D56]/10 outline-none transition resize-none" />
        </div>

        <label className="sm:col-span-2 flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
          <input type="checkbox" name="wpp" checked={form.wpp} onChange={handleChange} className="w-4 h-4" />
          Aceito ser contatado via WhatsApp
        </label>

        <button type="submit" disabled={loading}
          className="sm:col-span-2 w-full flex items-center justify-center gap-2 bg-[#006B3F] hover:bg-[#079D56] disabled:opacity-60 text-white font-syne font-black text-base py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[.98] shadow-lg mt-1">
          <Phone size={18} />
          {loading ? 'Enviando...' : 'QUERO MINHA SIMULAÇÃO GRATUITA'}
        </button>
      </div>
      <p className="text-center text-xs text-gray-400 mt-3">🔒 Seus dados estão seguros. Não fazemos spam.</p>
    </form>
  )
}
