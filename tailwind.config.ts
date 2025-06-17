
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Paleta Color Hunt: https://colorhunt.co/palette/3334467f8caab8cfceeaefef
				primary: {
					DEFAULT: '#333446', // Azul escuro principal
					foreground: '#EAEFEF'
				},
				secondary: {
					DEFAULT: '#7F8CAA', // Azul médio
					foreground: '#EAEFEF'
				},
				accent: {
					DEFAULT: '#B8CFCE', // Azul claro
					foreground: '#333446'
				},
				background: '#EAEFEF', // Cinza muito claro
				foreground: '#333446',
				card: {
					DEFAULT: '#FFFFFF',
					foreground: '#333446'
				},
				muted: {
					DEFAULT: '#B8CFCE',
					foreground: '#333446'
				},
				border: '#B8CFCE',
				input: '#B8CFCE',
				ring: '#7F8CAA',
			},
			fontFamily: {
				'sans': ['Inter', 'system-ui', 'sans-serif'],
				'heading': ['Poppins', 'system-ui', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 0 0 rgba(127, 140, 170, 0.7)' },
					'70%': { boxShadow: '0 0 0 10px rgba(127, 140, 170, 0)' }
				}
			},
			animation: {
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
