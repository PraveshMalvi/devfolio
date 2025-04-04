module.exports = {
    extends: [
      'stylelint-config-standard',
      'stylelint-config-tailwindcss',
      // 'stylelint-config-prettier',
    ],
    plugins: ['stylelint-order'],
    rules: {
      // Optional: Custom rules if you want
      'order/properties-order': [],
      'at-rule-no-unknown': [
        true,
        {
          ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen'],
        },
      ],
    },
  }
  