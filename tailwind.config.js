const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ["./app/**/*.{ts,tsx,jsx,js}"],
    theme: {
        extend: {
            colors: {
                'charcoal': '#3B3F40'
            },
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            boxShadow: {
                'thought': '0px 2px 4px rgba(0, 0, 0, 0.25)'
            }

        },
    },
    variants: {},
    plugins: [
        require('tailwind-scrollbar-hide')
    ],
};