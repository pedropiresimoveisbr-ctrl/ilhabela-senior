export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        verde: '#1B4332',
        verdeclaro: '#2D6A4F',
        verdemedio: '#40916C',
        ouro: '#B7950B',
        ouroclar: '#D4AC0D',
        creme: '#FAF6F0',
        cremescuro: '#F0E8DC',
      },
      fontFamily: {
        titulo: ['"Playfair Display"', 'Georgia', 'serif'],
        corpo: ['"Source Serif 4"', 'Georgia', 'serif'],
      }
    }
  },
  plugins: []
}
