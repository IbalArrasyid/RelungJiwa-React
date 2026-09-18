/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F8F3EC',
        espresso: '#292321',
        cocoa: '#815C4D',
        coral: '#D94843',
        'sky-blue': '#8FC4DE',
        'soft-blue': '#E2F0F6',
        'soft-blush': '#F5E1E3',
        sage: '#849578',
        surface: '#FEF9F2',
        'surface-container-low': '#F8F3EC',
        'surface-container': '#F2EDE6',
        'surface-container-high': '#ECE7E1',
        'surface-container-highest': '#E7E2DB',
        'on-surface-variant': '#504440',
        brand: { 50: '#F8F3EC', 500: '#815C4D', 600: '#815C4D', 700: '#604237' },
      },
    },
  },
  plugins: [],
}