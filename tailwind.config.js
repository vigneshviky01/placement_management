/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['28px', '50px'],
      '4xl': ['48px', '58px'],
      '8xl': ['96px', '106px']
    },
    extend: {
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        poppins:[ 'Poppins', 'sans-serif'],
        satisfy: ['Satisfy', 'cursive']
      },
      colors: {
        'primary':'#213555',
        'gray_bg': "#F0F0F0",
        'secondary':'#4F709C',
        "sm-elements": "#F9D9AA",
        "slate-gray": "#E5D283",
        "btn-clr":"#e5d283",
        
      },
      boxShadow: {
        '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)',
        '4xl':'10px 10px 17px 0px rgba(0,0,0,0.75)'
      },
      // backgroundImage: {
      //   'coffee-cup':"url('../assets/coffeeCupBg.png')",
      // },
      screens: {
        "wide": "1440px"
      }
    },
    keyframes: {
      scroll: {
        '0%': { transform: 'translateX(100%)' },
        '100%': { transform: 'translateX(-100%)' },
      },
    },
    animation: {
      scroll: 'scroll 20s linear infinite',
    },
    
  },
  plugins: [],
}