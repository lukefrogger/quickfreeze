module.exports = {
	purge: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./atoms/**/*.{js,jsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: "#00B2FF",
				pDark: "#126C93",
				"primary-light": "#4fc6fd",
				danger: "#F22A2A",
				transDanger: "#f22a2a73",
				bDark: "#272727",
				bLight: "#3D3D3D",
				offPrimary: "#2D9CDB",
				transBlue: "#E6F7FF",
				darkPrimary: "#0e2b38",
				lightWhite: "#505050",
			},
			fontFamily: {
				sans: ["rubik", "sans-serif"],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/line-clamp"), require("@tailwindcss/forms")],
};
