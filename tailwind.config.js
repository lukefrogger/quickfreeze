module.exports = {
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: "#00B2FF",
				danger: "#F22A2A",
				transDanger: "#f22a2a73",
				bDark: "#272727",
				bLight: "#3D3D3D",
				offPrimary: "#2D9CDB",
				transBlue: "#E6F7FF",
				darkPrimary: "#0e2b38",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/line-clamp"), require("@tailwindcss/forms")],
};
