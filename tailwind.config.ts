import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '4rem',
          sm: '1rem',
          md: '2rem',
          lg: '3rem',
          xl: '3rem',
          '2xl': '4rem',
        },
      },
      fontFamily: {
        BLight: ['BlauerNue-Light', 'sans-serif'],
        BRegular: ['BlauerNue-Regular', 'sans-serif'],
        BMedium: ['BlauerNue-Medium', 'sans-serif'],
        BSeBold: ['BlauerNue-SemiBold', 'sans-serif'],
        BBold: ['BlauerNue-Bold', 'sans-serif'],
        BExBold: ['BlauerNue-ExtraBold'],
      },
      colors: {
        blue: {
          Pri: "#005DC6",
          Sec: "#378EF1",
        },
        purple: {
          Pri: "#3400A3",
          Sec: "#5D1DE4",
        },
        yellow: {
          Pri: "#FEC22C",
          Sec: "#FFD876",
        },
        gray: {
          Pri: "#212949",
          Sec: "#384168",
          One: "#DFE7EE",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        blueGradient: 'linear-gradient(to right, #5D1DE4, #378EF1)',
        iconGradient: 'linear-gradient(to bottom, #5D1DE4, #378EF1)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config