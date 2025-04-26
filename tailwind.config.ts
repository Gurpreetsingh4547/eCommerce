import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a237e',
        secondary: '#0d47a1',
        accent: '#2196f3',
        'light-bg': '#f5f5f5',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #1a237e, #0d47a1)',
      },
      ringColor: {
        primary: '#1a237e',
      },
    },
  },
  plugins: [],
}
export default config 