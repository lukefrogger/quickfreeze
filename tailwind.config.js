/** @format */

module.exports = {
	purge: ["./pages/**/*.{js}", "./components/**/*.{js}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: "#00B2FF",
				danger: "#F22A2A",
				bDark: "#272727",
				bLight: "#3D3D3D",
				offPrimary: "#2D9CDB",
				transBlue: "#E6F7FF",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
