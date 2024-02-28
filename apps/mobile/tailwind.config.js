/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'inter-thin': ['inter-thin'],
        'inter-extralight': ['inter-extralight'],
        'inter-light': ['inter-light'],
        'inter-regular': ['inter-regular'],
        'inter-medium': ['inter-medium'],
        'inter-semibold': ['inter-semibold'],
        'inter-bold': ['inter-bold'],
        'inter-extrabold': ['inter-extrabold'],
        'inter-black': ['inter-black']
      }
    }
  },
  plugins: []
}
