/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      screens: {
        sx: '500.1px',
        md: '700.1px',
      },
      fontSize: {
        menu: '16px',
        pageHeader: '24px',
        tbHeader: '12px',
        tbCell: '14px',
        tbCellBolded: '16px',
      },
      colors: {
        cMenu: '#FFFFFF',
        cPageHeader: '#182C62',
        cTb: '#4B5C68',
        cTbPoints: '#025FEB',
        cFooter: '#4B5C68',
      },
      backgroundColor: {
        pageHeader: '#025FEB',
        tbHeader: '#E4EDF2',
        evenRow: '#F6F7F7',
        footer: '#F6F7F7',
      },
      spacing: {
        6.25: '25px',
        9.25: '37px',
        13.25: '53px',
        15: '60px',
        17.5: '70px',
        27.5: '110px',
        ['9/10']: '90%',
      },
    },
  },
  plugins: [],
};
