/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brandRed: "#E50914",  
                brandBlack: "#0B0B0B",
            },
        },
    },
    plugins: [],
};
