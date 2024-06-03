// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

// NOTE: use this to format everything excpet .prettierignore
// prettier --write "**/*.{js,jsx,ts,tsx,json,css,scss,md}" --ignore-path .prettierignore

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: false,
  singleQuote: true,

  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx'],
}

export default config
