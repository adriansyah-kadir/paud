const plugin = require("tailwindcss/plugin")

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/routes/**/*.svelte", "./src/lib/components/**/*.svelte"],
  important: true,
  theme: {
    extend: {},
  },
  plugins: [plugin(({addVariant})=>{
    addVariant("child", "& > *")
  })],
}

